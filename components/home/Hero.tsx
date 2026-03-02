import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      <Image
        src="/images/bg/gereja.jpg"
        alt="Background Gereja"
        fill
        priority
        className="absolute inset-0 z-0 object-cover opacity-60 scale-105"
      />
      {/* Overlay gradien */}
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent, var(--background))' }}></div>
      
      <div className="relative z-20 px-6 max-w-6xl text-center">
        <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.5em] text-white bg-indigo-950/20 backdrop-blur-md rounded-full uppercase border border-white/30">
          Welcome to Our Community
        </span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-10 drop-shadow-2xl">
          IMAN. KASIH. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-white font-serif italic font-light lowercase">Kebersamaan.</span>
        </h1>
        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/jadwal" className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-1">
            Lihat Jadwal
          </Link>
          <Link href="/kontak" className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/40 font-black rounded-2xl hover:bg-white/20 transition-all">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;