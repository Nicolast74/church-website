import React from 'react';
import Image from 'next/image';

interface GalleryCardProps {
  imageUrl: string;
  caption: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ imageUrl, caption }) => {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group">
      <Image
        src={imageUrl}
        alt={caption}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
        <p className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
          {caption}
        </p>
      </div>
    </div>
  );
};

export default GalleryCard;
