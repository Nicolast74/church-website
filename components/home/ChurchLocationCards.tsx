import React from 'react';
import Link from 'next/link';

interface LocationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ imageSrc, title, description, linkHref }) => {
  return (
    // w-full tapi kita kunci max-width-nya biar kaga jadi raksasa
    // Grid: Tetap side-by-side (2 kol) di semua layar. Card jadi verikal.
    <div className="w-full bg-white rounded-2xl shadow-lg flex flex-col items-center p-4 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 group h-full text-center">
      
      {/* BOX GAMBAR: Full width di atas */}
      <div className="w-full aspect-[4/3] shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 mb-4">
        <img
          src={imageSrc} 
          alt={title}
          /* object-cover biar kaga penyet */
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* KONTEN TEKS */}
      {/* KONTEN TEKS */}
      <div className="w-full flex flex-col items-center min-w-0 grow">
        <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-xs mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>
        <Link 
          href={linkHref} 
          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 transition-all shadow-md"
        >
          Detail
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
      <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto justify-items-center items-stretch">
        {locations.map((location, index) => (
          <LocationCard key={index} {...location} />
        ))}
      </div>
    </div>
  );
};

export default ChurchLocationCards;