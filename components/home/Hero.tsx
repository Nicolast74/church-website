import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/bg/gereja.jpg"
        alt="Background Gereja"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute inset-0 z-0 scale-105"
      />
      {/* Masking Gradient - Biar transisi ke section bawah mulus banget */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white z-10"></div>
      
      <div className="relative z-20 px-6 max-w-5xl text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.4em] text-white/80 bg-white/10 backdrop-blur-md rounded-full uppercase border border-white/20">
          Welcome to Our Community
        </span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-8 drop-shadow-2xl">
          Iman. Kasih. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">Kebersamaan.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-medium text-white/80 leading-relaxed">
          Lingkungan St. Yohanes Rasul Girisekar melayani dengan kasih dan menumbuhkan iman dalam setiap langkah.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jadwal" className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-2xl hover:-translate-y-1">
            Lihat Jadwal Ibadah
          </Link>
          <Link href="/kontak" className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;