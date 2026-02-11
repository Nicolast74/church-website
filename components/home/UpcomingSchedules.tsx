import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export default function UpcomingSchedules() {
  return (
    <section className="py-16">
      <div className="text-center">
        <PageHeader
          title="Jadwal Ibadah Terdekat"
          description="Beberapa jadwal ibadah mendatang di wilayah Bonaventura Panggang."
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black">Misa Minggu Pagi</h3>
            <p className="text-black">Setiap hari Minggu pukul 08:00</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black">Misa Minggu Sore</h3>
            <p className="text-black">Setiap hari Minggu pukul 17:00</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black">Misa Harian</h3>
            <p className="text-black">Senin-Sabtu pukul 06:00</p>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/jadwal" className="inline-block bg-blue-500 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-600">
            Lihat Semua Jadwal
          </Link>
        </div>
      </div>
    </section>
  );
}