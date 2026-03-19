import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { supabasePublic } from '@/lib/supabasePublic';
import { Clock, Quote, ArrowRight } from 'lucide-react';

import Hero from '@/components/home/Hero';
import ChurchLocationCards from '@/components/home/ChurchLocationCards';
import FadeIn from '@/components/ui/FadeIn';

const UpcomingSchedules = dynamic(() => import('@/components/home/UpcomingSchedules'));
const GalleryPreview = dynamic(() => import('@/components/home/GalleryPreview'));

export const revalidate = 60; // ISR validation every 60 seconds

export default async function Home() {
  const supabase = supabasePublic;
  const today = new Date().toISOString().split('T')[0];

  // Fetch Data dari Supabase secara paralel
  const [
    { data: activities },
    { data: schedules }
  ] = await Promise.all([
    supabase
      .from('kegiatan')
      .select('*')
      .order('tanggal', { ascending: false })
      .limit(4),
    supabase
      .from('jadwal')
      .select('*')
      .gte('tanggal', today)
      .order('tanggal', { ascending: true })
      .limit(3)
  ]);

  const nextMisa = schedules?.[0] || { nama_kegiatan: "Misa Minggu", jam: "08:00" };

  return (
    <main style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Hero />

      {/* SECTION EDITORIAL / BENTO REPLACEMENT */}
      <section className="relative z-30 -mt-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          <div className="lg:col-span-8 glass-card p-10 md:p-16 group flex flex-col justify-center">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <span className="badge-premium">Profil Lingkungan</span>
              </div>
              <h2 className="heading-huge mb-8">
                Menumbuhkan <span className="text-accent-serif underline decoration-amber-200 decoration-4 underline-offset-8">Iman</span> dalam kasih.
              </h2>
              <p className="text-stone-500 text-lg md:text-xl font-normal italic mb-10 max-w-xl leading-relaxed">
                &quot;Melayani umat melalui ibadah dan semangat kebersamaan yang inklusif di lingkungan Girisekar.&quot;
              </p>
              <Link href="/profil" className="btn-primary-modern">
                Selengkapnya <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-10">
            <FadeIn direction="up">
              <div className="bg-stone-900 rounded-[2.5rem] p-12 text-white shadow-2xl group relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000">
                  <Clock size={180} />
                </div>
                <div className="relative z-10">
                  <p className="text-amber-400 font-bold text-[11px] tracking-[0.3em] uppercase mb-8">Ekaristi Terdekat</p>
                  <h3 className="text-7xl font-serif font-medium tracking-tight mb-4">{nextMisa.jam}</h3>
                  <p className="text-stone-300 text-lg font-medium flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> {nextMisa.nama_kegiatan}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white border border-stone-200 rounded-[2.5rem] p-12 text-stone-900 flex flex-col justify-between h-full group relative overflow-hidden shadow-xl">
                <Quote className="text-amber-600/5 absolute -left-8 -top-8 group-hover:scale-110 transition-transform duration-1000" size={160} />
                <div className="relative z-10">
                  <p className="text-2xl font-serif italic font-normal leading-relaxed text-stone-800">
                    &quot;Sebab di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada...&quot;
                  </p>
                </div>
                <span className="text-[11px] font-bold text-amber-700 tracking-[0.2em] uppercase mt-10 border-t border-stone-100 pt-8 relative z-10">
                  Matius 18:20
                </span>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* SECTION LOKASI */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* Image Column - 3:4 ratio */}
          <div className="lg:w-5/12 shrink-0">
            <div className="w-full aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 sticky top-24">
              <Image
                src="/images/bg/depan.jpg"
                alt="Gereja St. Yohanes Girisekar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:w-7/12 flex flex-col justify-center">
            <div className="mb-12">
              <h2 className="heading-huge text-5xl! uppercase italic">Kunjungi<br /><span className="text-accent-serif">Kami</span></h2>
              <div className="w-16 h-1.5 bg-indigo-600 mt-8 rounded-full" />
            </div>
            <ChurchLocationCards />
          </div>
        </div>
      </section>

      {/* SECTION GALLERY */}
      <section className="py-32 bg-stone-950 rounded-[3rem] mx-4 mb-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
            <div>
              <span className="text-amber-500 font-bold text-[11px] tracking-[0.3em] uppercase mb-6 block">Dokumentasi</span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tight">Galeri <br/><span className="text-amber-400 italic font-normal capitalize">Kegiatan</span></h2>
            </div>
            <Link href="/galeri" className="px-10 py-4 border border-white/20 rounded-xl font-bold text-[12px] uppercase hover:bg-white hover:text-stone-950 transition-all tracking-widest leading-none">
              Lihat Semua
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