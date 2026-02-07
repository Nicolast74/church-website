import React from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';

interface Schedule {
  title: string;
  details: string;
}

interface LocationPageProps {
  name: string;
  heroImage: string;
  description: React.ReactNode;
  specialSchedules?: Schedule[];
  jadwalUrl?: string;
  galeriUrl?: string;
}

const LocationPage: React.FC<LocationPageProps> = ({
  name,
  heroImage,
  description,
  specialSchedules,
  jadwalUrl = '/jadwal',
  galeriUrl = '/galeri',
}) => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center text-white px-4 pb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{name}</h1>
        </div>
      </section>

      {/* Content Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {description}
          </div>

          {specialSchedules && specialSchedules.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Jadwal Khusus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {specialSchedules.map((schedule, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-bold text-xl text-gray-800">{schedule.title}</h3>
                    <p className="text-gray-600 mt-2">{schedule.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href={jadwalUrl} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Lihat Jadwal Lengkap
              </Link>
              <Link href={galeriUrl} className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Lihat Galeri
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default LocationPage;
