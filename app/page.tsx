import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import ChurchLocationCards from '@/components/home/ChurchLocationCards';
import Section from '@/components/ui/Section';
import PageHeader from '@/components/ui/PageHeader';


const UpcomingSchedules = dynamic(() => import('@/components/home/UpcomingSchedules'));
const GalleryPreview = dynamic(() => import('@/components/home/GalleryPreview'));

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Tentang Wilayah Section */}
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PageHeader
            title="Tentang Wilayah Bonaventura Panggang"
            subtitle="Wilayah Bonaventura Panggang merupakan bagian dari Paroki Gereja St. Agustinus Panggang. Wilayah ini melayani umat melalui kegiatan ibadah, pastoral, dan kebersamaan umat."
          />
        </div>
      </Section>

      <ChurchLocationCards />

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <UpcomingSchedules />
      </div>

      {/* Pisahkan GalleryPreview ke luar container jadwal agar lebarnya maksimal */}
      <section className="w-full bg-transparent overflow-hidden">
        <GalleryPreview />
      </section>
    </main>
  );
}
