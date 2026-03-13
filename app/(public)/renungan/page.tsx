import { supabasePublic } from '@/lib/supabasePublic';
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Renungan } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function RenunganListPage() {
  const supabase = supabasePublic;
  const { data } = await supabase
    .from('renungan')
    .select('*')
    .order('tanggal', { ascending: false });
    
  const devotions = (data as Renungan[] | null);

  return (
    <main>
      <Section>
        <PageHeader 
          title="Renungan Harian" 
          subtitle="Sapaan rohani harian untuk pertumbuhan iman kita bersama" 
        />

        {devotions && devotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devotions.map((devotion) => (
              <Link href={`/renungan/${devotion.tanggal}`} key={devotion.id}>
                <Card className="h-full hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full uppercase">
                      {format(new Date(devotion.tanggal), 'dd MMMM yyyy', { locale: id })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                    {devotion.judul}
                  </h2>
                  <p className="text-xs italic text-slate-500 dark:text-slate-400 mb-6 line-clamp-1 border-l-2 border-indigo-200 dark:border-indigo-800 pl-3">
                    {devotion.ayat_referensi}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 grow leading-relaxed">
                    {devotion.isi}
                  </p>
                  <div className="mt-8 flex items-center text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                    Baca Selengkapnya
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-2xl font-semibold text-gray-500">Renungan Belum Tersedia</h3>
            <p className="mt-2 text-gray-400 max-w-md mx-auto">
              Maaf, saat ini belum ada renungan yang diunggah. Silakan kembali lagi nanti untuk sapaan rohani terbaru.
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
