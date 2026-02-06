import Link from 'next/link';

export default function GalleryPreview() {
  return (
    <section className="py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black sm:text-4xl">
          Galeri
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg h-48 bg-gray-200"></div>
          <div className="rounded-lg overflow-hidden shadow-lg h-48 bg-gray-200"></div>
          <div className="rounded-lg overflow-hidden shadow-lg h-48 bg-gray-200"></div>
        </div>
        <div className="mt-8">
          <Link href="/galeri" className="inline-block bg-blue-500 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-600">
            Lihat Galeri
          </Link>
        </div>
      </div>
    </section>
  );
}