"use client";

import React, { useState } from 'react';
import GalleryLightbox from './GalleryLightbox';
import { KegiatanFoto } from '@/types';

interface GalleryGridProps {
  photos: KegiatanFoto[];
  activityTitle: string;
}

export default function GalleryGrid({ photos, activityTitle }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract photo URLs for the lightbox
  const photoUrls = photos.map(photo => photo.foto_url);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold font-serif mb-6 border-b pb-4">Dokumentasi Foto</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={photo.foto_url} 
              alt={`Dokumentasi ${activityTitle}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <GalleryLightbox
        photos={photoUrls}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
