import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import ChurchLocationCards from '@/components/home/ChurchLocationCards';
import Section from '@/components/ui/Section';
import PageHeader from '@/components/ui/PageHeader';

const UpcomingSchedules = dynamic(() => import('@/components/home/UpcomingSchedules'));
const GalleryPreview = dynamic(() => import('@/components/home/GalleryPreview'));

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] overflow-x-hidden">
      <Hero />

      {/* 1. Section Tentang Wilayah - Pake Putih Bersih */}
      <Section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <PageHeader
            title="Tentang Gereja Lingkungan St. Yohanes Girisekar"
            subtitle="Lingkungan St. Yohanes Rasul Girisekar merupakan bagian dari Wilayah St. Agustinus Bonaventura Panggang. Kami melayani umat melalui kegiatan ibadah, pastoral, dan kebersamaan umat."
          />
        </div>
      </Section>

      {/* 2. Section Lokasi - KITA KASIH BACKGROUND GELAP BIAR CARD PUTIHNYA POP OUT! */}
      <section className="py-24 bg-[#0f172a] relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ChurchLocationCards />
        </div>
      </section>

      {/* 3. Section Jadwal - Balik ke White atau White Smoke biar ada variasi */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <UpcomingSchedules />
        </div>
      </section>

      {/* 4. Section Gallery (Polaroid) - Full Width Background Gelap */}
      <section className="w-full py-24 bg-[#0f172a] overflow-hidden">
        <div className="container mx-auto px-4">
           <GalleryPreview />
        </div>
      </section>
    </main>
  );
}