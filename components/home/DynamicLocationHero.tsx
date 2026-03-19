'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "/images/bg/depan.jpg",
  "/images/bg/st-yohanes-1.jpg",
  "/images/bg/st-yohanes-2.jpg",
  "/images/bg/st-yohanes-dari-barat.jpg",
  "/images/bg/taman-doa-2.jpg"
];

const DynamicLocationHero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-200 dark:shadow-black/20 sticky top-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src={images[index]}
            alt={`Suasana Gereja ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Subtle overlay to keep it consistent with the church aesthetic */}
          <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DynamicLocationHero;
