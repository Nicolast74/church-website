import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
      <Image
        src="/images/bg/st-yohanes-dari-barat-1600.jpg"
        alt="Background Gereja"
        fill
        priority
        sizes="100vw"
        quality={75}
        className="absolute inset-0 z-0 object-cover opacity-50 scale-105"
      />
      {/* Overlay gradien - Warmer overlay */}
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(28,25,23,0.6), transparent, var(--background))' }}></div>
      
      <div className="relative z-20 px-6 max-w-5xl text-center">
        <span className="badge-premium mb-8 text-white! bg-white/10! border-white/20! backdrop-blur-sm!">
          Selamat Datang di Gereja Kami
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-medium tracking-tight text-white leading-tight mb-8 drop-shadow-xl">
          Iman. Kasih. <br className="hidden md:block"/>
          <span className="text-amber-400 italic font-normal">Kebersamaan.</span>
        </h1>
        <p className="text-stone-200 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Menumbuhkan komunitas iman yang inklusif dan penuh kasih di tengah Girisekar.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
          <Link href="/jadwal" className="btn-primary-modern bg-white! text-stone-900! hover:bg-stone-100! w-full! sm:w-60! justify-center">
            Lihat Jadwal Misa
          </Link>
          <Link href="/kontak" className="px-10 py-5 bg-transparent backdrop-blur-md text-white border border-white/30 font-bold rounded-xl hover:bg-white/10 transition-all uppercase text-[12px] tracking-widest leading-none flex items-center justify-center w-full sm:w-60">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;