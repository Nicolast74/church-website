import { supabasePublic } from '@/lib/supabasePublic';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import { Pengumuman } from '@/types';
import { Megaphone } from 'lucide-react';
import PengumumanCard from '@/components/pengumuman/PengumumanCard';

export const revalidate = 60;

export default async function PengumumanPage() {
  const supabase = supabasePublic;
  const today = new Date().toISOString().split('T')[0];

  const { data } = await supabase
    .from('pengumuman')
    .select('*')
    .or(`tanggal_selesai.is.null,tanggal_selesai.gte.${today}`)
    .order('tanggal_mulai', { ascending: false });

  const list = (data as Pengumuman[] | null) || [];

  return (
    <main>
      <Section>
        <PageHeader
          title="Pengumuman"
          subtitle="Informasi dan warta terkini dari komunitas St. Yohanes Rasul Girisekar."
        />

        <div className="max-w-3xl mx-auto">
          {list.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Megaphone size={28} className="text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Belum ada pengumuman</h3>
              <p className="text-slate-400 dark:text-slate-500 mt-1 text-sm">Pantau terus halaman ini untuk informasi terbaru.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {list.map((item) => (
                <PengumumanCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}

