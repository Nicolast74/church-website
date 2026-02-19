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
    <main className="min-h-screen  overflow-x-hidden">
      <Hero />

      {/* 1. Section Tentang Wilayah - Pake Background Stone lembut */}
      <Section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 lg:px-20">
          <FadeIn>
            <PageHeader
              title="Tentang Gereja"
              subtitle="Lingkungan St. Yohanes Rasul Girisekar merupakan bagian dari Wilayah St. Agustinus Bonaventura Panggang. Kami melayani umat melalui kegiatan ibadah, pastoral, dan kebersamaan umat."
            />
          </FadeIn>
        </div>
      </Section>

      {/* 2. Section Lokasi - Transparent biar background gereja kelihatan dikit, tapi dikasih overlay putih transparan */}
      <section className="py-24 bg-white/90 backdrop-blur-sm relative z-10 border-t border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ChurchLocationCards />
        </div>
      </section>

      {/* 3. Section Jadwal - Stone-100 biar agak beda dikit */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4 lg:px-20">
          <FadeIn>
            <UpcomingSchedules schedules={schedules || []} />
          </FadeIn>
        </div>
      </section>

      {/* 4. Section Gallery (Polaroid) - Slate Gelap Elegant */}
      <section className="w-full py-24 bg-slate-900 overflow-hidden text-white">
        <div className="container mx-auto px-4">
           <GalleryPreview activities={activities || []} />
        </div>
      </section>
    </main>
  );
}