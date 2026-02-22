'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Kegiatan } from '@/types';

interface GalleryPreviewProps {
  activities: Kegiatan[];
}

export default function GalleryPreview({ activities }: GalleryPreviewProps) {
  const rotClasses = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center"
      >
        {activities.map((item, i) => (
          <motion.div 
            key={item.id} 
            className={`${rotClasses[i % rotClasses.length]} hover:rotate-0 transition-transform duration-500`}
            style={{ width: '100%', maxWidth: '280px' }}
          >
            <Link href={`/galeri/${item.id}`}>
              <div className="bg-white p-3 pb-10 shadow-2xl shadow-black/50 transform transition-all hover:scale-105 hover:z-50">
                <div className="aspect-square overflow-hidden bg-slate-800">
                  <img 
                    src={item.thumbnail_url || 'https://picsum.photos/seed/default/500/500'} 
                    className="w-full h-full object-cover"
                    alt={item.judul}
                  />
                </div>
                <div className="mt-4 px-2">
                  <p 
                    className="text-slate-800 font-handwriting text-lg leading-tight truncate" 
                    style={{ fontFamily: 'var(--font-permanent_marker), cursive' }}
                  >
                    {item.judul}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 md:hidden">
        <Link 
          href="/galeri" 
          className="inline-block px-6 py-2 border border-white/50 text-white rounded-full hover:bg-white hover:text-black transition-all text-sm"
        >
          Lihat Galeri Lainnya
        </Link>
      </div>
    </div>
  );
}