export default function LatestActivities() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-slate-900 rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black dark:text-slate-100 sm:text-4xl">
          Kegiatan Terbaru
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black dark:text-slate-100">Retret OMK</h3>
            <p className="text-black dark:text-slate-300">Retret tahunan Orang Muda Katolik akan diadakan pada...</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black dark:text-slate-100">Ziarah 9 Gua Maria</h3>
            <p className="text-black dark:text-slate-300">Lingkungan St. Yusuf akan mengadakan ziarah 9 Gua Maria...</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black dark:text-slate-100">Lomba Paduan Suara</h3>
            <p className="text-black dark:text-slate-300">Pendaftaran untuk lomba paduan suara antar lingkungan telah dibuka...</p>
          </div>
        </div>
      </div>
    </section>
  );
}