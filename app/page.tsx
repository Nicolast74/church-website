import dynamic from 'next/dynamic';

const UpcomingSchedules = dynamic(() => import('@/components/home/UpcomingSchedules'));
const LatestActivities = dynamic(() => import('@/components/home/LatestActivities'));
const GalleryPreview = dynamic(() => import('@/components/home/GalleryPreview'));

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-100">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Selamat Datang di Gereja Kami
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:text-2xl md:max-w-3xl">
            &quot;Karena di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada di tengah-tengah mereka.&quot;
          </p>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl md:max-w-3xl">
            - Matius 18:20 -
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <UpcomingSchedules />
        <LatestActivities />
        <GalleryPreview />
      </div>
    </>
  );
}
