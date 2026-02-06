export default function LatestActivities() {
  return (
    <section className="py-16 bg-gray-100 rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black sm:text-4xl">
          Kegiatan Terbaru
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black">Retret OMK</h3>
            <p className="text-black">Retret tahunan Orang Muda Katolik akan diadakan pada...</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black">Ziarah 9 Gua Maria</h3>
            <p className="text-black">Lingkungan St. Yusuf akan mengadakan ziarah 9 Gua Maria...</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black">Lomba Paduan Suara</h3>
            <p className="text-black">Pendaftaran untuk lomba paduan suara antar lingkungan telah dibuka...</p>
          </div>
        </div>
      </div>
    </section>
  );
}