import { useState, useCallback } from 'react';

export type Citation = {
  title: string;
  source: string;
  content: string;
  url?: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  intent?: string;
  citations?: Citation[];
};

export function useChat({ initialMode = 'short' }: { initialMode?: 'short' | 'detailed' } = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'short' | 'detailed'>(initialMode);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content };
    const historyPayload = messages.map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '', citations: [] }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history: historyPayload, mode }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No stream reader available');

      let buffer = '';
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          
          const events = buffer.split('\n\n');
          buffer = events.pop() || '';

          for (const rawEvent of events) {
            if (!rawEvent.trim()) continue;

            let eventName = 'message';
            let dataStr = '';

            const lines = rawEvent.split('\n');
            for (const line of lines) {
              if (line.startsWith('event: ')) {
                eventName = line.substring(7).trim();
              } else if (line.startsWith('data: ')) {
                dataStr = line.substring(6).trim();
              }
            }

            if (!dataStr) continue;

            if (eventName === 'metadata') {
              try {
                const meta = JSON.parse(dataStr);
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, intent: meta.intent, citations: meta.citations || [] }
                      : msg
                  )
                );
              } catch (e) {
                console.error('Metadata parse error:', e);
              }
            } else if (eventName === 'chunk') {
              try {
                const chunkObj = JSON.parse(dataStr);
                const textChunk = chunkObj.text || '';
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: msg.content + textChunk }
                      : msg
                  )
                );
              } catch (e) {
                // Fallback raw string append
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId ? { ...msg, content: msg.content + dataStr } : msg
                  )
                );
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content:
                  msg.content ||
                  '**Maaf, terjadi kendala saat menghubungkan ke Asisten AI.** Mohon pastikan koneksi backend aktif.',
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, mode, isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    mode,
    setMode,
    clearMessages
  };
}
