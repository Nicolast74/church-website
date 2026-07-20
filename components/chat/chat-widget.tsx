'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, BookOpen, Sparkles, Compass, HelpCircle, ChevronRight, Check } from 'lucide-react';
import { useChat } from '@/lib/hooks/use-chat';
import { motion, AnimatePresence } from 'framer-motion';

const STARTER_PROMPTS = [
  "Jadwal misa minggu ini",
  "Apa syarat Sakramen Baptis?",
  "Pengumuman warta paroki terbaru",
  "Penjelasan tentang Doa Rosario"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCitations, setExpandedCitations] = useState<Record<string, boolean>>({});
  const { messages, input, setInput, sendMessage, isLoading, mode, setMode } = useChat({ initialMode: 'short' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const toggleCitation = (msgId: string) => {
    setExpandedCitations(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 bg-stone-950/95 backdrop-blur-xl border border-stone-800/80 rounded-3xl shadow-2xl w-[360px] sm:w-[420px] h-[560px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-stone-900/90 border-b border-stone-800 p-4 flex justify-between items-center relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold font-serif text-base tracking-wide flex items-center gap-2">
                    Ecclesia AI
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-500/30">Agentic</span>
                  </h3>
                  <p className="text-stone-400 text-xs">Asisten Katekese & Paroki</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Mode Toggle Button */}
                <button
                  onClick={() => setMode(mode === 'short' ? 'detailed' : 'short')}
                  title="Ganti Mode Mode Jawaban"
                  className="px-2.5 py-1 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-[11px] text-stone-300 font-medium border border-stone-700 transition-all flex items-center gap-1"
                >
                  {mode === 'short' ? '⚡ Ringkas' : '📖 Mendalam'}
                </button>

                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-stone-400 hover:text-white p-1.5 rounded-xl hover:bg-stone-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-stone-800">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Compass size={24} />
                  </div>
                  <div>
                    <h4 className="text-stone-200 font-semibold text-sm">Berkah Dalem! Ada yang bisa saya bantu?</h4>
                    <p className="text-stone-500 text-xs mt-1">Tanyakan kitab suci, katekismus, sakramen, atau warta misa paroki.</p>
                  </div>

                  <div className="w-full space-y-2 pt-2">
                    {STARTER_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(prompt)}
                        className="w-full text-left bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800/80 hover:border-amber-500/40 rounded-xl p-2.5 text-xs transition-all flex items-center justify-between group"
                      >
                        <span>{prompt}</span>
                        <ChevronRight size={14} className="text-stone-600 group-hover:text-amber-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}>
                  
                  {/* Intent Badge */}
                  {msg.role === 'assistant' && msg.intent && (
                    <span className="text-[10px] font-medium text-amber-400/80 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <BookOpen size={10} />
                      {msg.intent === 'PARISH_INFO' ? 'Info Paroki' : msg.intent === 'DOCTRINE_RAG' ? 'Doktrin & Katekese' : 'Respon AI'}
                    </span>
                  )}

                  {/* Message Bubble */}
                  <div 
                    className={`max-w-[90%] rounded-2xl px-4 py-3 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-br-xs shadow-md shadow-amber-950/20'
                        : 'bg-stone-900 text-stone-200 border border-stone-800 rounded-bl-xs shadow-md shadow-black/40'
                    }`}
                  >
                    {msg.content || (msg.role === 'assistant' && isLoading ? (
                      <span className="flex items-center gap-2 text-stone-400 italic">
                        <Loader2 className="animate-spin w-4 h-4 text-amber-500" /> Memproses ajaran teologi...
                      </span>
                    ) : '')}
                  </div>

                  {/* Citations Card Accordion */}
                  {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                    <div className="w-[90%] mt-1">
                      <button
                        onClick={() => toggleCitation(msg.id)}
                        className="text-[11px] text-amber-400/90 hover:text-amber-300 font-medium flex items-center gap-1.5 bg-stone-900/60 border border-stone-800 px-3 py-1.5 rounded-xl transition-all"
                      >
                        <BookOpen size={12} />
                        <span>{msg.citations.length} Referensi Sumber Otoritatif</span>
                      </button>

                      {expandedCitations[msg.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 space-y-1.5"
                        >
                          {msg.citations.map((cit, cIdx) => (
                            <div key={cIdx} className="bg-stone-900/90 border border-stone-800/80 rounded-xl p-2.5 text-[11px] space-y-1">
                              <div className="font-semibold text-amber-300 flex items-center justify-between">
                                <span>{cit.title}</span>
                                <span className="text-[9px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded">{cit.source}</span>
                              </div>
                              <p className="text-stone-400 line-clamp-2 italic">&ldquo;{cit.content}&rdquo;</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}

                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-stone-900/90 border-t border-stone-800/80">
              <form 
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan masalah iman atau jadwal paroki..."
                  className="flex-1 bg-stone-950/90 border border-stone-700 text-white rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-stone-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-amber-600 hover:bg-amber-500 text-white p-2.5 rounded-2xl transition-all shadow-md shadow-amber-950/40 disabled:opacity-40 disabled:hover:bg-amber-600 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send size={18} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-400 text-white p-4 rounded-full shadow-2xl shadow-amber-950/60 transition-all hover:scale-105 active:scale-95 flex items-center justify-center float-right border border-amber-400/30 group"
        aria-label="Tanya Ecclesia AI"
      >
        {isOpen ? <X size={24} /> : (
          <div className="flex items-center gap-2">
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline font-semibold text-xs pr-1">Tanya Ecclesia AI</span>
          </div>
        )}
      </button>
    </div>
  );
}
