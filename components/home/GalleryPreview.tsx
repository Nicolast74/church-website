import Link from 'next/link';
import GalleryCard from '@/components/galeri/GalleryCard';

export default function GalleryPreview() {
  const galleryItems = [
    { title: "Ibadah Minggu Bersama", src: "/images/galeri/sylwia-bartyzel-tME8s001BNQ-unsplash.jpg", rot: "-rotate-3" },
    { title: "Doa Bersama Lingkungan", src: "/images/galeri/The-Wind-Rises.jpg", rot: "rotate-2" },
    { title: "Perayaan Natal Wilayah", src: "/images/galeri/timon-studler--L3q2Uuz6oY.jpg", rot: "-rotate-2" },
    { title: "Kegiatan Bakti Sosial", src: "/images/galeri/win11-img28.jpg", rot: "rotate-3" }
  ];

  return (
    <section className="w-full py-16 flex justify-center">
      <div className="container max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2 font-serif">Galeri Kegiatan</h2>
          <p className="text-gray-200 italic text-sm">Cuplikan kegiatan dan momen indah di Wilayah Bonaventura Panggang.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-start">
          
          {galleryItems.map((item, i) => (
            <GalleryCard 
              key={i}
              imageUrl={item.src} 
              caption={item.title} 
              rotateClass={item.rot} 
            />
          ))}

        </div>

        <div className="text-center mt-12">
          <Link href="/galeri" legacyBehavior>
            <a className="px-6 py-2 border border-white/50 text-white rounded-full hover:bg-white hover:text-black transition-all text-sm">
              Lihat Galeri Lainnya
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
