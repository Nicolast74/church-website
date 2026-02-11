import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
      <Image
        src="/images/bg/hero.jpg" // Assuming this image exists based on brief
        alt="Background Gereja / Taman Doa"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-tight">
          Wilayah Bonaventura Panggang
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
          Informasi dan kegiatan Gereja St. Agustinus Panggang dan St. Yohanes Girisekar
        </p>
        <div className="mt-8">
          <Link href="/jadwal" legacyBehavior>
            <a className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out">
              Lihat Jadwal Ibadah
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
