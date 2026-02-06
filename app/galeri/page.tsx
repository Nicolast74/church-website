export default function Galeri() {
  const images = [
    {
      src: "https://picsum.photos/seed/picsum1/800/600",
      caption: "Kegiatan Retret OMK 2023",
    },
    {
      src: "https://picsum.photos/seed/picsum2/800/600",
      caption: "Ziarah 9 Gua Maria Lingkungan St. Yusuf",
    },
    {
      src: "https://picsum.photos/seed/picsum3/800/600",
      caption: "Lomba Paduan Suara Antar Lingkungan",
    },
    {
      src: "https://picsum.photos/seed/picsum4/800/600",
      caption: "Misa Syukur HUT Paroki ke-50",
    },
    {
      src: "https://picsum.photos/seed/picsum5/800/600",
      caption: "Penerimaan Sakramen Krisma",
    },
    {
      src: "https://picsum.photos/seed/picsum6/800/600",
      caption: "Natal Bersama Anak-anak Panti Asuhan",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-center">Galeri Kegiatan</h1>
      </article>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={image.src} alt={image.caption} className="w-full h-auto object-cover" />
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
