import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import ChurchLocationCards from '@/components/home/ChurchLocationCards';
import Section from '@/components/ui/Section';
import PageHeader from '@/components/ui/PageHeader';
import FadeIn from '@/components/ui/FadeIn';
import { createClient } from '@/lib/supabaseServer';

const UpcomingSchedules = dynamic(() => import('@/components/home/UpcomingSchedules'));
const GalleryPreview = dynamic(() => import('@/components/home/GalleryPreview'));

export default async function Home() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

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

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* CSS Custom biar makin mantap */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-section {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        .soft-gradient {
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent),
                      radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.05), transparent);
        }
      `}} />

      <Hero />

      {/* 1. Section Tentang - Dibikin lebih berwibawa */}
      <Section className="py-24 soft-gradient">
        <div className="max-w-5xl mx-auto px-6 lg:px-20 text-center">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-indigo-600 bg-indigo-50 rounded-full uppercase">
              Profile Lingkungan
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
              Menumbuhkan Iman dalam <span className="text-indigo-600">Kebersamaan.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Lingkungan St. Yohanes Rasul Girisekar merupakan bagian dari Wilayah St. Agustinus Bonaventura Panggang. 
              Kami melayani umat melalui kegiatan ibadah, pastoral, dan kebersamaan umat yang inklusif.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* 2. Section Lokasi - Floating Card Style */}
      <section className="py-24 glass-section relative z-10">
        <div className="container mx-auto px-6 lg:px-20">
           <div className="flex flex-col items-center mb-16 text-center">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Kunjungi Kami</h3>
            <div className="h-1 w-12 bg-indigo-600 mt-4 rounded-full"></div>
          </div>
          <ChurchLocationCards />
        </div>
      </section>

      {/* 3. Section Jadwal - Dibikin Minimalis ala Apple */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-20">
          <FadeIn>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
               <UpcomingSchedules schedules={schedules || []} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. Section Gallery - Modern Dark Mode */}
      <section className="w-full py-32 bg-[#0F172A] overflow-hidden text-white relative">
        {/* Background Blur Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex justify-between items-end mb-16 px-4">
              <div>
                <h2 className="text-4xl font-black tracking-tighter">Galeri Kegiatan</h2>
                <p className="text-slate-400 mt-2">Momen kebersamaan dalam iman.</p>
              </div>
              <button className="hidden md:block px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all">
                Lihat Semua
              </button>
           </div>
           <GalleryPreview activities={activities || []} />
        </div>
      </section>
    </main>
  );
}