import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

interface LocationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ imageSrc, title, description, linkHref }) => {
  return (
    <div className="w-full bg-white rounded-[2.5rem] border border-slate-100 p-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group h-full">
      <div className="w-full aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 relative">
        <img
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <span className="text-white font-bold text-sm">Lihat Detail →</span>
        </div>
      </div>

      <div className="px-4 pb-4 text-center">
        <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2 italic">"{description}"</p>
        <Link 
          href={linkHref} 
          className="inline-block w-full py-4 bg-slate-50 text-slate-900 text-xs font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all"
        >
          EXPLORE LOKASI
        </Link>
      </div>
    </div>
  );
};

const ChurchLocationCards: React.FC = () => {
  const locations = [
    {
      imageSrc: "/images/bg/gereja.jpg",
      title: "St. Yohanes Girisekar",
      description: "Gereja lingkungan di Girisekar yang melayani umat dengan penuh kasih.",
      linkHref: "/lokasi/st-yohanes",
    },
    {
      imageSrc: "/images/galeri/The-Wind-Rises.jpg",
      title: "Taman Doa Bintang Samudra",
      description: "Tempat ziarah dan retret tenang di tepi samudra yang indah.",
      linkHref: "/lokasi/taman-doa",
    },
  ];

  return (
    <div className="w-full py-10">
      <h2 className="text-2xl font-bold text-white text-center mb-12 uppercase tracking-widest">
        Gereja & Lingkungan
      </h2>
      
      {/* GRID: Force 2 kolom (grid-cols-2) di semua layar (gap-4 buat HP) */}
      <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-2xl mx-auto justify-items-center items-stretch">
        {locations.map((location, index) => (
          <FadeIn 
            key={index} 
            direction={index % 2 === 0 ? "right" : "left"} 
            delay={index * 0.2}
            className="h-full w-full"
          >
            <LocationCard {...location} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ChurchLocationCards;