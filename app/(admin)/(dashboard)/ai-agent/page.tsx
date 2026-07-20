'use client';

import { useState } from 'react';
import { Sparkles, RefreshCw, BarChart3, Bot, Zap, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminAIAgentPage() {
  const [reflectionStatus, setReflectionStatus] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleTriggerReflection = async () => {
    setLoadingAction('reflection');
    setReflectionStatus(null);
    try {
      const res = await fetch('/api/admin/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reflection' }),
      });
      const data = await res.json();
      setReflectionStatus(data);
    } catch (e: any) {
      setReflectionStatus({ error: e.message });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRunAnalytics = async () => {
    setLoadingAction('analytics');
    setAnalyticsData(null);
    try {
      const res = await fetch('/api/admin/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analytics' }),
      });
      const data = await res.json();
      setAnalyticsData(data);
    } catch (e: any) {
      setAnalyticsData({ error: e.message });
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="space-y-8 font-sans p-6 text-stone-100">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-white flex items-center gap-2">
            <Bot className="text-amber-500" /> Control Center Agentic AI
          </h1>
          <p className="text-stone-400 text-xs mt-1">
            Kelola agen otonom: Generasi Renungan Otomatis, Analisis Pertanyaan Umat, & Sync Vector Index.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-medium">
          <Zap size={14} /> Agent Service Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Action Card 1: Daily Reflection Generator */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Generasi Renungan Harian Otomatis</h3>
              <p className="text-stone-400 text-xs">Picu AI untuk membuat renungan Katolik & posting ke Supabase.</p>
            </div>
          </div>

          <button
            onClick={handleTriggerReflection}
            disabled={loadingAction === 'reflection'}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white py-2.5 px-4 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loadingAction === 'reflection' ? <Loader2 className="animate-spin w-4 h-4" /> : <RefreshCw size={16} />}
            <span>Jalankan Agen Renungan Harian</span>
          </button>

          {reflectionStatus && (
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-semibold">
                <span>{reflectionStatus.judul || 'Hasil Agen'}</span>
                {reflectionStatus.saved_to_db && (
                  <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                    <CheckCircle2 size={12} /> Tersimpan di Database
                  </span>
                )}
              </div>
              <p className="text-stone-300 italic">&ldquo;{reflectionStatus.isi}&rdquo;</p>
              <div className="text-[10px] text-stone-500">Referensi: {reflectionStatus.ayat_referensi}</div>
            </div>
          )}
        </div>

        {/* Action Card 2: Query Analytics & Clustering */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <BarChart3 size={22} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Analisis Tren Pertanyaan Umat</h3>
              <p className="text-stone-400 text-xs">Kelompokkan topik pertanyaan AI dan buat rekomendasi aksi.</p>
            </div>
          </div>

          <button
            onClick={handleRunAnalytics}
            disabled={loadingAction === 'analytics'}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loadingAction === 'analytics' ? <Loader2 className="animate-spin w-4 h-4" /> : <BarChart3 size={16} />}
            <span>Analisis Riwayat Pertanyaan</span>
          </button>

          {analyticsData && (
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs space-y-3">
              <div className="font-semibold text-indigo-300">
                Total Pertanyaan Teranalisis: {analyticsData.total_queries}
              </div>

              {analyticsData.top_categories && (
                <div className="space-y-1.5">
                  <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">Kategori Teratas:</span>
                  {analyticsData.top_categories.map((cat: any, i: number) => (
                    <div key={i} className="bg-stone-900 p-2 rounded-lg flex justify-between items-center text-[11px]">
                      <span className="text-stone-200">{cat.category}</span>
                      <span className="text-indigo-400 font-bold">{cat.percentage}%</span>
                    </div>
                  ))}
                </div>
              )}

              {analyticsData.recommended_actions && (
                <div className="space-y-1">
                  <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">Saran Aksi Paroki:</span>
                  <ul className="list-disc list-inside text-stone-300 space-y-0.5">
                    {analyticsData.recommended_actions.map((act: string, idx: number) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
