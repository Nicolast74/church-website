import React from 'react';

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
        
        /* Padding merata di semua sisi, bawah lebih besar untuk caption */
        p-4 pb-12
      `}
      style={{ backgroundColor: '#ffffff', opacity: 1 }}
    >
      {/* 1. Box Gambar: Pastikan ini lebar penuh (w-full) */}
      <div className="w-full h-[230px] overflow-hidden bg-gray-100 border border-gray-100">
        <img 
          src={imageUrl} 
          alt={caption}
          /* object-cover biar nggak penyet, w-full biar simetris */
          className="w-full h-full object-cover grayscale-10 group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* 2. Box Caption: Gunakan padding-top, jangan margin agar tidak overlap */}
      <div className="pt-6 flex items-center justify-center w-full">
        <p 
          className="text-center font-bold text-lg tracking-tight text-black"
          style={{ 
            fontFamily: 'cursive', 
            lineHeight: '1.2',
            color: '#000000' 
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  );
};

export default GalleryCard;