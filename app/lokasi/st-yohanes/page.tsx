import Link from "next/link";

export default function StYohanes() {
  return (
    <div>
      <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/st-yohanes/1920/1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Gereja St. Yohanes</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <article className="prose max-w-none">
          <p className="text-lg">
            Gereja St. Yohanes adalah gereja stasi yang melayani umat di wilayah sekitar. Kami memiliki komunitas yang hangat dan ramah.
          </p>
          <h2 className="text-2xl font-bold mt-8">Jadwal Khusus</h2>
          <ul className="list-disc list-inside">
            <li>Misa Anak: Setiap Minggu pukul 10:00</li>
            <li>Pendalaman Alkitab: Setiap Kamis pukul 19:00</li>
          </ul>
          <div className="mt-8">
            <Link href="/jadwal" className="text-blue-500 hover:underline">
              Lihat Jadwal Lengkap
            </Link>
            <span className="mx-4">|</span>
            <Link href="/galeri?lokasi=st-yohanes" className="text-blue-500 hover:underline">
              Lihat Galeri
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}