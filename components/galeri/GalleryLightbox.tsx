"use client";

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  photos: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Controls */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
        >
          <X size={28} strokeWidth={2} />
        </button>

        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
            >
              <ChevronLeft size={32} strokeWidth={2} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
            >
              <ChevronRight size={32} strokeWidth={2} />
            </button>
          </>
        )}

        {/* Counter */}
        {photos.length > 1 && (
          <div className="absolute top-6 left-6 z-50 px-4 py-1.5 text-sm font-medium text-white/80 bg-black/40 rounded-full">
            {currentIndex + 1} / {photos.length}
          </div>
        )}

        {/* Image Display */}
        <div 
          className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              src={photos[currentIndex]}
              alt={`Gallery Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;
