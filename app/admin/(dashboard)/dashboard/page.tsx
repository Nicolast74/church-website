"use client";

import React from 'react';
import Link from 'next/link';
import { ImageIcon, Calendar, ChevronRight, Sparkles, Clock, Quote } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      
      {/* 1. GREETING SECTION */}
      <FadeIn>
        <header className="glass-card p-10 md:p-16 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors duration-1000" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="badge-premium">Admin Dashboard</span>
              <Sparkles size={14} className="text-indigo-400 animate-pulse mb-6" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.85] tracking-tighter mb-8">
              Shalom, <br/> 
              <span className="text-indigo-600 font-serif italic font-light lowercase">Admin.</span>
            </h1>
            
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg font-medium italic">
              &quot;Kelola pelayanan umat Girisekar dengan penuh kasih dan ketekunan.&quot;
            </p>
          </div>
        </header>
      </FadeIn>

      {/* 2. MAIN CONTROL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Actions (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2 mb-8">Main Control</p>
          
          <FadeIn direction="up">
            <Link href="/admin/kegiatan" className="flex items-center justify-between p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 group">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Galeri Kegiatan</h3>
                  <p className="text-slate-500 font-medium">Upload dan kelola dokumentasi pelayanan.</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-slate-200 group-hover:text-indigo-600 transform group-hover:translate-x-2 transition-all" />
            </Link>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <Link href="/admin/jadwal" className="flex items-center justify-between p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 group">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Jadwal Misa</h3>
                  <p className="text-slate-500 font-medium">Atur agenda ibadah dan kegiatan spesial.</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-slate-200 group-hover:text-indigo-600 transform group-hover:translate-x-2 transition-all" />
            </Link>
          </FadeIn>
        </div>

        {/* Info (Span 4) */}
        <div className="lg:col-span-4 space-y-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2 mb-8">System Status</p>
          
          <FadeIn direction="up" delay={0.2}>
            <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
              <Clock className="absolute -right-10 -bottom-10 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" size={200} />
              <div className="relative z-10">
                <p className="text-indigo-200 font-black text-[10px] tracking-widest uppercase mb-6">Total Dokumentasi</p>
                <h2 className="text-7xl font-black tracking-tighter mb-4">42</h2>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-2/3 rounded-full" />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="dark-card p-10 text-white flex flex-col justify-between h-full group min-h-[250px]">
              <Quote className="text-indigo-500/10 absolute -left-6 -top-6 group-hover:scale-110 transition-transform duration-700" size={120} />
              <div className="relative z-10">
                <p className="text-xl font-serif italic font-light leading-snug text-slate-300">
                  &quot;Melayani dengan rendah hati adalah jalan menuju kekudusan yang nyata.&quot;
                </p>
              </div>
              <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase mt-8 border-t border-slate-800 pt-6 relative z-10">
                Lingkungan Girisekar
              </span>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}