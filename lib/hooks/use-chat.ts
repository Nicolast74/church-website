import { useState, useCallback } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENGINE_API_URL || 'http://localhost:8000'}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history: messages }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader available');

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // Basic text parsing. Adapt based on actual RAG Engine response format (SSE vs raw)
          const text = chunk.replace(/^data: /gm, '').replace(/\n\n$/gm, '\n');
          
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === assistantId ? { ...msg, content: msg.content + text } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === assistantId ? { ...msg, content: msg.content + '\n\n**Error:** Could not reach the engine.' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
  };
}
