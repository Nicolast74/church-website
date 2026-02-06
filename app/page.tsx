


import Link from 'next/link';



export default function Home() {

  return (

    <>

      {/* Hero Section */}

      <section

        className="relative h-[75vh] bg-cover bg-center"

        style={{ backgroundImage: "url('https://picsum.photos/seed/church-hero/1920/1080')" }}

      >

        <div className="absolute inset-0 bg-black bg-opacity-60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>

            Selamat Datang di Gereja Kami

          </h1>

          <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:text-2xl md:max-w-3xl" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>

            "Karena di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada di tengah-tengah mereka."

          </p>

          <p className="mt-2 text-lg sm:text-xl md:text-2xl md:max-w-3xl" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>

            - Matius 18:20 -

          </p>

        </div>

      </section>



      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* Upcoming Schedules Section */}

        <section className="py-16">

          <div className="text-center">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">

              Jadwal Mendatang

            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Misa Minggu Pagi</h3>
                <p className="text-gray-600 dark:text-gray-300">Setiap hari Minggu pukul 08:00</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Misa Minggu Sore</h3>
                <p className="text-gray-600 dark:text-gray-300">Setiap hari Minggu pukul 17:00</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Misa Harian</h3>
                <p className="text-gray-600 dark:text-gray-300">Senin-Sabtu pukul 06:00</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/jadwal" className="inline-block bg-blue-500 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-600">
                Lihat Semua Jadwal
              </Link>
            </div>

          </div>

        </section>



        {/* Latest Activities Section */}

        <section className="py-16 bg-gray-100 dark:bg-gray-800 rounded-lg">

          <div className="text-center">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">

              Kegiatan Terbaru

            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Retret OMK</h3>
                <p className="text-gray-600 dark:text-gray-300">Retret tahunan Orang Muda Katolik akan diadakan pada...</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Ziarah 9 Gua Maria</h3>
                <p className="text-gray-600 dark:text-gray-300">Lingkungan St. Yusuf akan mengadakan ziarah 9 Gua Maria...</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Lomba Paduan Suara</h3>
                <p className="text-gray-600 dark:text-gray-300">Pendaftaran untuk lomba paduan suara antar lingkungan telah dibuka...</p>
              </div>
            </div>

          </div>

        </section>



        {/* Gallery Preview Section */}

        <section className="py-16">

          <div className="text-center">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">

              Galeri

            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="https://picsum.photos/seed/picsum1/800/600" alt="Gambar Galeri 1" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="https://picsum.photos/seed/picsum2/800/600" alt="Gambar Galeri 2" className="w-full h-auto object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="https://picsum.photos/seed/picsum3/800/600" alt="Gambar Galeri 3" className="w-full h-auto object-cover" />
              </div>
            </div>

            <div className="mt-8">

              <Link href="/galeri" className="inline-block bg-blue-500 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-600">

                Lihat Galeri

              </Link>

            </div>

          </div>

        </section>

      </div>

    </>

  );

}


