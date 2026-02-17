'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GalleryCard from '@/components/galeri/GalleryCard';

export default function GalleryPreview() {
  const galleryItems = [
    { title: "Ibadah Minggu Bersama", src: "/images/galeri/sylwia-bartyzel-tME8s001BNQ-unsplash.jpg", rot: "-rotate-3"},
    { title: "Doa Bersama Lingkungan", src: "/images/galeri/The-Wind-Rises.jpg", rot: "rotate-2" },
    { title: "Perayaan Natal Wilayah", src: "/images/galeri/timon-studler--L3q2Uuz6oY.jpg", rot: "-rotate-2" },
    { title: "Kegiatan Bakti Sosial", src: "/images/galeri/win11-img28.jpg", rot: "rotate-3" }
  ];

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
          {galleryItems.map((item, i) => (
            <motion.div 
              key={i} 
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
              <GalleryCard 
                imageUrl={item.src} 
                caption={item.title} 
                rotateClass={item.rot} 
              />
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