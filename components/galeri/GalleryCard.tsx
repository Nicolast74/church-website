import React from 'react';
import Image from 'next/image';

interface GalleryCardProps {
  imageUrl: string;
  caption: string;
  rotateClass: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ imageUrl, caption, rotateClass }) => {
  return (
    <div 
      className={`bg-white p-3 pb-8 shadow-2xl transition-all duration-300 transform 
        hover:-translate-y-2 hover:rotate-0 hover:scale-105
        ${rotateClass} w-full max-w-[260px] flex flex-col`}
    >
      <div className="w-full h-[250px] overflow-hidden bg-gray-100 border border-gray-100">
        <Image 
          src={imageUrl} 
          alt={caption}
          fill
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <p className="mt-4 text-center text-gray-800 font-medium text-sm leading-tight">
        {caption}
      </p>
    </div>
  );
};

export default GalleryCard;
