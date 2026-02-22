'use client';

import Link from 'next/link';
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
            <div className="bg-white p-4 pb-12 shadow-2xl shadow-black/30 transform hover:scale-105 transition-all">
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img src={item.thumbnail_url || 'https://picsum.photos/seed/1/500/500'} className="w-full h-full object-cover" alt={item.judul} />
              </div>
              <p className="mt-6 text-slate-800 text-xl text-center" style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}>
                {item.judul}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}