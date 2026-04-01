'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const images = [
  "/images/bg/depan.jpg",
  "/images/bg/st-yohanes-1.jpg",
  "/images/bg/st-yohanes-2.jpg",
  "/images/bg/st-yohanes-dari-barat.jpg",
  "/images/bg/taman-doa-2.jpg"
];

const DynamicLocationHero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px", once: false });

  useEffect(() => {
    if (!isInView) return;
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full aspect-video sm:aspect-4/3 lg:aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-200 dark:shadow-black/20 relative lg:sticky lg:top-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full relative"
          style={{ willChange: "opacity, transform" }}
        >
          <Image
            src={images[index]}
            alt={`Suasana Gereja ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle overlay to keep it consistent with the church aesthetic */}
          <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DynamicLocationHero;
