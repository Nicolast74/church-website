import Link from "next/link";

export default function Bacaan() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>Bacaan</h1>
      </article>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <article className="prose dark:prose-invert">
            <h2>Bacaan Harian</h2>
            <p>Bacaan harian sesuai dengan kalender liturgi.</p>
            <Link href="/bacaan/harian">
              Lihat Bacaan Harian
            </Link>
          </article>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <article className="prose dark:prose-invert">
            <h2>Bacaan Ibadah</h2>
            <p>Bacaan untuk ibadah hari Minggu dan hari raya.</p>
            <Link href="/bacaan/ibadah">
              Lihat Bacaan Ibadah
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
}
