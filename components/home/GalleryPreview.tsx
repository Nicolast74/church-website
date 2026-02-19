'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GalleryCard from '@/components/galeri/GalleryCard';
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
    <section 
      style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }} 
      className="py-16 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-12">
          {/* Judul tetap dikasih text-white manual karena background-nya gelap */}
          <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-wide">Galeri Kegiatan</h2>
          <p className="text-gray-300 font-light text-lg">Momen indah di Wilayah Bonaventura Panggang.</p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            width: '100%',
            justifyItems: 'center'
          }}
          className="lg:!grid-cols-4" 
        >
          {activities.map((item, i) => (
            <motion.div 
              key={item.id} 
              style={{ width: '100%', maxWidth: '250px' }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.15,
                ease: "easeOut"
              }}
            >
              <Link href={`/galeri/${item.id}`}>
                <GalleryCard 
                    imageUrl={item.thumbnail_url || 'https://picsum.photos/seed/default/500/500'} 
                    caption={item.judul} 
                    rotateClass={rotClasses[i % rotClasses.length]} 
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/galeri" 
            className="inline-block px-6 py-2 border border-white/50 text-white rounded-full hover:bg-white hover:text-black transition-all text-sm"
          >
            Lihat Galeri Lainnya
          </Link>
        </div>
      </div>
    </section>
  );
}