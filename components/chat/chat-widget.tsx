'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useChat } from '@/lib/hooks/use-chat';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, setInput, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-stone-900 border-b border-stone-800 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold font-serif text-lg tracking-wide">Workshop Assistant</h3>
                <p className="text-stone-400 text-xs uppercase tracking-widest">Saint John&apos;s Engine</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-950 text-sm">
              {messages.length === 0 && (
                <div className="text-center text-stone-500 mt-10 italic">
                  Tanya tentang jadwal, dokumen, atau kegiatan gereja...
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user' 
                      ? 'bg-amber-600 text-white rounded-br-none' 
                      : 'bg-stone-800 text-stone-200 border border-stone-700 rounded-bl-none'
                  }`}>
                    {msg.content || (msg.role === 'assistant' && isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : '')}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-stone-900 border-t border-stone-800">
              <form 
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-amber-600 hover:bg-amber-500 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-amber-600 flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-amber-600 hover:bg-amber-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center float-right"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
