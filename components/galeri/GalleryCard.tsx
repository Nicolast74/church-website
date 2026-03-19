import React from 'react';
import Image from 'next/image';

interface GalleryCardProps {
  imageUrl: string;
  caption: string;
  rotateClass?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ imageUrl, caption, rotateClass = "" }) => {
  return (
    <div 
      className={`
        /* Container Putih Solid */
        bg-white shadow-[0_15px_40px_rgba(0,0,0,0.5)]
        transition-all duration-500 transform 
        hover:-translate-y-6 hover:rotate-0 hover:scale-105 hover:z-50
        ${rotateClass} w-full max-w-[280px] group cursor-pointer
        rounded-lg
        
        /* Padding merata di semua sisi, bawah lebih besar untuk caption */
        p-4 pb-12
      `}
      style={{ backgroundColor: '#ffffff', opacity: 1 }}
    >
      {/* 1. Box Gambar: Pastikan ini lebar penuh (w-full) */}
      <div className="relative w-full h-[230px] overflow-hidden bg-gray-100 border border-gray-100 rounded-md">
        <Image 
          src={imageUrl} 
          alt={caption}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /* object-cover biar nggak penyet, w-full biar simetris */
          className="object-cover grayscale-10 group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* 2. Box Caption: Gunakan padding-top, jangan margin agar tidak overlap */}
      <div className="pt-6 flex items-center justify-center w-full">
        <p 
          className="text-center font-bold text-lg tracking-tight text-slate-900"
          style={{ 
            fontFamily: 'var(--font-playfair), serif', 
            lineHeight: '1.2'
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  );
};

export default GalleryCard;