'use client';

import { useState } from 'react';
import { Sparkles, BookOpen, Send, Loader2, RefreshCw, Layers, Check, Copy, Share2, Compass, ShieldCheck } from 'lucide-react';
import { useChat } from '@/lib/hooks/use-chat';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { label: 'Kitab Suci (TB)', icon: '📖' },
  { label: 'Katekismus (KKGK)', icon: '⛪' },
  { label: 'Hukum Kanonik (KHK)', icon: '📜' },
  { label: 'Ensiklik Paus', icon: '🕊️' },
  { label: 'Warta Paroki', icon: '📢' },
];

const SUGGESTED_RESEARCH_TOPICS = [
  'Apa makna dan konsekuensi teologis Sakramen Ekaristi?',
  'Jelaskan 10 Perintah Allah berdasarkan Katekismus Gereja Katolik',
  'Apa saja syarat sah Sakramen Perkawinan menurut Kanon KHK 1055?',
  'Jadwal misa minggu ini dan kegiatan seksi katekese'
];

export default function KatekeseAIPage() {
  const { messages, input, setInput, sendMessage, isLoading, mode, setMode, clearMessages } = useChat({ initialMode: 'detailed' });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Hero Banner */}
        <div className="text-center space-y-4 pt-4 border-b border-stone-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles size={14} /> Ecclesia-RAG Agentic AI Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Pusat Riset & Katekese <span className="text-amber-500">Agentic AI</span>
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Asisten cerdas berbasis dokumen resmi Gereja Katolik (Alkitab, KKGK, KHK, Ensiklik Paus) dan basis data paroki real-time.
          </p>
        </div>

        {/* Control Toolbar */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Cakupan Dokumen:</span>
            {CATEGORIES.map((cat, idx) => (
              <span key={idx} className="text-xs bg-stone-950 border border-stone-800 text-stone-300 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
              <button
                onClick={() => setMode('short')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  mode === 'short' ? 'bg-amber-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
                }`}
              >
                Ringkas
              </button>
              <button
                onClick={() => setMode('detailed')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  mode === 'detailed' ? 'bg-amber-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
                }`}
              >
                Mendalam
              </button>
            </div>

            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="p-2 text-stone-400 hover:text-rose-400 bg-stone-950 border border-stone-800 rounded-xl transition-colors"
                title="Bersihkan Percakapan"
              >
                <RefreshCw size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Chat Threads Box */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 min-h-[480px] shadow-2xl flex flex-col justify-between">
          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-stone-800">
            {messages.length === 0 ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                  <Compass size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-serif">Selamat Datang di Portal Katekese AI</h3>
                  <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto">
                    Pilih topik rekomendasi di bawah ini atau ketik pertanyaan teologis maupun seputar paroki.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left pt-4">
                  {SUGGESTED_RESEARCH_TOPICS.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(topic)}
                      className="bg-stone-950 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/50 p-3.5 rounded-2xl text-xs text-stone-300 hover:text-amber-300 transition-all shadow-sm flex items-start justify-between group"
                    >
                      <span className="pr-2">{topic}</span>
                      <Sparkles size={14} className="text-stone-600 group-hover:text-amber-400 shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-400">
                      {msg.role === 'user' ? 'Pertanyaan Anda' : 'Jawaban Ecclesia AI'}
                    </span>
                    {msg.intent && (
                      <span className="text-[10px] bg-amber-950 border border-amber-800 text-amber-300 px-2 py-0.5 rounded-md">
                        {msg.intent}
                      </span>
                    )}
                  </div>

                  <div
                    className={`p-5 rounded-3xl leading-relaxed text-sm sm:text-base whitespace-pre-wrap max-w-full sm:max-w-[88%] shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-amber-600 text-white rounded-tr-xs'
                        : 'bg-stone-950 text-stone-100 border border-stone-800 rounded-tl-xs'
                    }`}
                  >
                    {msg.content || (msg.role === 'assistant' && isLoading ? (
                      <div className="flex items-center gap-3 text-stone-400">
                        <Loader2 className="animate-spin w-5 h-5 text-amber-500" />
                        <span>Menganalisis dokumen teologi dan mencari rujukan...</span>
                      </div>
                    ) : '')}
                  </div>

                  {/* Actions & Citations for Assistant */}
                  {msg.role === 'assistant' && msg.content && (
                    <div className="w-full sm:max-w-[88%] space-y-3 pt-1">
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                          >
                            {copiedId === msg.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            <span>{copiedId === msg.id ? 'Tersalin' : 'Salin Jawaban'}</span>
                          </button>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400/90">
                          <ShieldCheck size={13} /> Terverifikasi RAG Engine
                        </span>
                      </div>

                      {msg.citations && msg.citations.length > 0 && (
                        <div className="bg-stone-950/80 border border-stone-800/90 rounded-2xl p-4 space-y-2">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen size={14} /> Referensi Sumber Teologi Otoritatif ({msg.citations.length})
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {msg.citations.map((cit, cIdx) => (
                              <div key={cIdx} className="bg-stone-900 border border-stone-800/80 rounded-xl p-3 text-xs space-y-1">
                                <div className="font-semibold text-stone-200">{cit.title}</div>
                                <div className="text-[10px] text-amber-300/80">{cit.source}</div>
                                <p className="text-stone-400 text-[11px] line-clamp-2 italic">&ldquo;{cit.content}&rdquo;</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pertanyaan teologi Katolik atau jadwal gereja..."
              className="flex-1 bg-stone-950 border border-stone-700 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-stone-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-6 py-3.5 rounded-2xl font-semibold transition-all shadow-lg shadow-amber-950/40 disabled:opacity-40 flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                <>
                  <span>Kirim</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
