import { createClient } from '@/lib/supabaseServer';
import Link from "next/link";
import { Renungan } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default async function DailyDevotionPreview() {
  const supabase = await createClient();
  const today = format(new Date(), 'yyyy-MM-dd');

  let { data: devotion } = await supabase
    .from('renungan')
    .select('*')
    .eq('tanggal', today)
    .single();

  if (!devotion) {
    const { data: latest } = await supabase
      .from('renungan')
      .select('*')
      .order('tanggal', { ascending: false })
      .limit(1)
      .single();
    devotion = latest;
  }

  if (!devotion) return null;

  const d = devotion as Renungan;

  return (
    <div className="bg-linear-to-br from-indigo-50/50 to-white/50 dark:from-indigo-950/40 dark:to-slate-800/50 py-12 px-4 rounded-[2.5rem] border border-indigo-100/50 dark:border-indigo-900/40 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100/50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold border border-indigo-200/50 dark:border-indigo-800/50">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Renungan Hari Ini</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-slate-100 leading-tight">
            {d.judul}
          </h2>
          <p className="text-xl font-medium text-gray-600 dark:text-slate-400 italic">
            &quot;{d.ayat_referensi}&quot;
          </p>
          <p className="text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-3 md:line-clamp-4">
            {d.isi}
          </p>
          <div className="flex items-center space-x-4">
            <Link href={`/renungan/${d.tanggal}`} className="inline-flex items-center px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900 transition-all duration-300">
              Baca Renungan
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/renungan" className="text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors">
              Lihat Sebelumnya
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-2xl flex flex-col items-center text-center max-w-70">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-1">
                {format(new Date(d.tanggal), 'MMM', { locale: id })}
              </span>
              <span className="text-6xl font-black text-gray-900 dark:text-slate-100 leading-none mb-3">
                {format(new Date(d.tanggal), 'dd')}
              </span>
              <span className="text-sm font-bold text-gray-500 dark:text-slate-400">
                {format(new Date(d.tanggal), 'yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
