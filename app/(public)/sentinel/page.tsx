'use client';

import { useRef, useEffect } from 'react';
import { Send, Loader2, Info } from 'lucide-react';
import { useChat } from '@/lib/hooks/use-chat';
import { motion } from 'framer-motion';

export default function SentinelPage() {
  const { messages, input, setInput, sendMessage, isLoading } = useChat({ mode: 'detailed' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto min-h-screen flex flex-col">
      <div className="mb-8 border-b border-stone-800 pb-8">
        <span className="text-amber-500 font-bold text-[11px] tracking-[0.3em] uppercase mb-4 block">
          Asisten Teologi & Katekese
        </span>
        <h1 className="heading-huge text-5xl md:text-7xl mb-4 uppercase">
          <span className="text-accent-serif">Sentinel</span>
        </h1>
        <p className="text-stone-400 text-lg md:text-xl max-w-2xl font-light">
          Diskusi mendalam dengan Asisten AI kami. Sentinel akan memberikan jawaban yang komprehensif beserta kutipan dokumen yang relevan.
        </p>
      </div>

      <div className="flex-1 bg-stone-900 border border-stone-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-stone-950/50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-stone-500">
              <Info size={48} className="mb-6 opacity-20" />
              <p className="text-xl font-serif italic max-w-md">
                &quot;Tanyakan apa saja seputar ajaran Gereja, liturgi, atau katekese.&quot;
              </p>
            </div>
          )}
          
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] md:max-w-[75%] rounded-[2rem] px-6 py-5 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-amber-600 text-white rounded-br-none' 
                  : 'bg-stone-800 text-stone-200 border border-stone-700 rounded-bl-none prose prose-invert prose-amber max-w-none'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="mb-3 text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" /> Sentinel
                  </div>
                )}
                
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.content || (msg.role === 'assistant' && isLoading ? (
                    <div className="flex items-center gap-3 text-stone-400">
                      <Loader2 className="animate-spin w-5 h-5" /> Menggali dokumen...
                    </div>
                  ) : '')}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-stone-900 border-t border-stone-800">
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex items-end gap-3 max-w-4xl mx-auto"
          >
            <div className="flex-1 bg-stone-950 border border-stone-700 rounded-2xl overflow-hidden focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Tuliskan pertanyaan Anda secara spesifik..."
                className="w-full bg-transparent text-white px-5 py-4 focus:outline-none resize-none placeholder:text-stone-600 min-h-[60px] max-h-[200px]"
                rows={2}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-amber-600 hover:bg-amber-500 text-white p-4 md:px-8 md:py-4 rounded-2xl transition-colors disabled:opacity-50 disabled:hover:bg-amber-600 flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-wider h-[60px]"
            >
              <span className="hidden md:inline">Kirim</span>
              <Send size={18} />
            </button>
          </form>
          <div className="text-center mt-4 text-xs text-stone-500">
            Sentinel dapat melakukan kesalahan. Harap verifikasi kutipan dengan dokumen resmi gereja.
          </div>
        </div>
      </div>
    </main>
  );
}
