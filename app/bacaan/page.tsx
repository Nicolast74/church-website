import Link from "next/link";

export default function Bacaan() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="text-center text-black">Bacaan</h1>
      </article>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2 text-black">Bacaan Harian</h2>
          <p className="text-black">Bacaan harian sesuai dengan kalender liturgi.</p>
          <Link href="/bacaan/harian" className="text-blue-500 hover:underline mt-4 inline-block">
            Lihat Bacaan Harian
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2 text-black">Bacaan Ibadah</h2>
          <p className="text-black">Bacaan untuk ibadah hari Minggu dan hari raya.</p>
          <Link href="/bacaan/ibadah" className="text-blue-500 hover:underline mt-4 inline-block">
            Lihat Bacaan Ibadah
          </Link>
        </div>
      </div>
    </div>
  );
}