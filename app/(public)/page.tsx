import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseServer';
import { Clock, Quote, ArrowRight, Sparkles } from 'lucide-react';

import Hero from '@/components/home/Hero';
import ChurchLocationCards from '@/components/home/ChurchLocationCards';
import FadeIn from '@/components/ui/FadeIn';

const UpcomingSchedules = dynamic(() => import('@/components/home/UpcomingSchedules'));
const GalleryPreview = dynamic(() => import('@/components/home/GalleryPreview'));
const DailyDevotionPreview = dynamic(() => import('@/components/home/DailyDevotionPreview'));

export default async function Home() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  // Fetch Data dari Supabase
  const { data: activities } = await supabase
    .from('kegiatan')
    .select('*')
    .order('tanggal', { ascending: false })
    .limit(4);

  const { data: schedules } = await supabase
    .from('jadwal')
    .select('*')
    .gte('tanggal', today)
    .order('tanggal', { ascending: true })
    .limit(3);

  const nextMisa = schedules?.[0] || { nama_kegiatan: "Misa Minggu", jam: "08:00" };

  return (
    <main className="bg-[#F8FAFC]">
      <Hero />

      {/* SECTION BENTO */}
      <section className="relative z-30 -mt-24 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 glass-card p-10 md:p-20 group">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <span className="badge-premium">Profil Lingkungan</span>
                <Sparkles size={14} className="text-indigo-400 animate-pulse mb-6" />
              </div>
              <h2 className="heading-huge mb-10">
                <span className="text-5xl md:text-7xl! block md:inline">Menumbuhkan</span> <br className="hidden md:block"/> <span className="text-accent-serif">iman</span> dalam kasih.
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium italic mb-12 max-w-lg">
                &quot;Melayani umat melalui ibadah dan semangat kebersamaan yang inklusif di Girisekar.&quot;
              </p>
              <Link href="/profil" className="btn-primary-modern">
                Selengkapnya <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <FadeIn direction="up">
              <div className="bg-indigo-600 rounded-[2.5rem] p-12 text-white shadow-2xl shadow-indigo-200 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
                  <Clock size={140} />
                </div>
                <div className="relative z-10">
                  <p className="text-indigo-200 font-black text-[10px] tracking-widest uppercase mb-8">Misa Terdekat</p>
                  <h3 className="text-8xl font-black tracking-tighter">{nextMisa.jam}</h3>
                  <p className="text-indigo-50 mt-4 text-xl font-bold flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-indigo-300 rounded-full animate-ping" /> {nextMisa.nama_kegiatan}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="bg-slate-950 rounded-[3rem] p-12 text-white flex flex-col justify-between h-full group relative overflow-hidden border border-slate-800 shadow-2xl">
                <Quote className="text-indigo-500/10 absolute -left-6 -top-6 group-hover:scale-110 transition-transform duration-700" size={140} />
                <div className="relative z-10">
                  <p className="text-2xl font-serif italic font-light leading-snug text-slate-300">
                    &quot;Sebab di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada...&quot;
                  </p>
                </div>
                <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase mt-8 border-t border-slate-800 pt-6 relative z-10">
                  Matius 18:20
                </span>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* SECTION LOKASI */}
      <section className="py-40 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="heading-huge text-5xl! uppercase italic">Kunjungi Kami</h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-8 rounded-full" />
        </div>
        <ChurchLocationCards />
      </section>

      {/* SECTION GALLERY */}
      <section className="py-32 bg-slate-950 rounded-[4rem] mx-4 mb-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <h2 className="heading-huge text-white!">Galeri <br/><span className="text-accent-serif">pelayanan.</span></h2>
            <Link href="/galeri" className="px-8 py-4 border border-white/20 rounded-2xl font-black text-[10px] uppercase hover:bg-white hover:text-black transition-all tracking-widest">
              Explore
            </Link>
          </div>
          <GalleryPreview activities={activities || []} />
        </div>
      </section>

      {/* SECTION JADWAL */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <UpcomingSchedules schedules={schedules || []} />
      </section>
    </main>
  );
}