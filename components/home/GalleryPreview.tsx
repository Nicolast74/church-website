'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Kegiatan } from '@/types';

interface GalleryPreviewProps {
  activities: Kegiatan[];
}

export default function GalleryPreview({ activities }: GalleryPreviewProps) {
  const rotClasses = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];
  if (!activities?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {activities.map((item, i) => (
        <motion.div 
          key={item.id} 
          className={`${rotClasses[i % rotClasses.length]} hover:rotate-0 transition-all duration-500 hover:z-50`}
        >
          <Link href={`/galeri/${item.id}`}>
            <div className="bg-white dark:bg-stone-800 p-5 pb-14 shadow-2xl shadow-black/20 transform hover:scale-105 transition-all duration-700">
              <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900">
                <Image src={item.thumbnail_url || 'https://picsum.photos/seed/1/500/500'} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw" className="object-cover" alt={item.judul} />
              </div>
              <p className="mt-8 text-stone-800 dark:text-stone-200 text-xl text-center" style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}>
                {item.judul}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}