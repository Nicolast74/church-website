import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export default function UpcomingSchedules() {
  return (
    <section className="py-4">
      <div className="text-center">
        <PageHeader
          title="Jadwal Ibadah Terdekat"
          subtitle="Beberapa jadwal ibadah mendatang di wilayah Bonaventura Panggang."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-4 border-amber-600 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-serif font-bold mb-3 text-slate-800">Misa Minggu Pagi</h3>
            <p className="text-slate-600 font-medium">Setiap hari Minggu</p>
            <div className="mt-4 inline-block px-4 py-1 bg-amber-50 text-amber-800 rounded-full text-sm font-semibold">
              Pukul 08:00
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-4 border-slate-600 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-serif font-bold mb-3 text-slate-800">Misa Minggu Sore</h3>
            <p className="text-slate-600 font-medium">Setiap hari Minggu</p>
            <div className="mt-4 inline-block px-4 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold">
              Pukul 17:00
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-4 border-amber-600 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-serif font-bold mb-3 text-slate-800">Misa Harian</h3>
            <p className="text-slate-600 font-medium">Senin - Sabtu</p>
            <div className="mt-4 inline-block px-4 py-1 bg-amber-50 text-amber-800 rounded-full text-sm font-semibold">
              Pukul 06:00
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Link href="/jadwal" className="inline-block px-8 py-3 border-2 border-amber-700 text-amber-700 font-bold rounded-full hover:bg-amber-700 hover:text-white transition-colors duration-300">
            Lihat Semua Jadwal
          </Link>
        </div>
      </div>
    </section>
  );
}