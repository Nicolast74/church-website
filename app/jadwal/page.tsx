export default function Jadwal() {
  const schedules = [
    {
      title: "Misa Minggu Pagi",
      time: "08:00",
      location: "St. Agustinus",
    },
    {
      title: "Misa Minggu Sore",
      time: "17:00",
      location: "St. Yohanes",
    },
    {
      title: "Misa Harian",
      time: "06:00",
      location: "St. Agustinus",
    },
    {
      title: "Adorasi Sakramen Mahakudus",
      time: "19:00",
      location: "Taman Doa Bintang Samudra",
    },
    {
      title: "Katekumen",
      time: "19:00",
      location: "St. Yohanes",
    },
    {
      title: "Doa Rosario",
      time: "19:00",
      location: "Taman Doa Bintang Samudra",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-center">Jadwal Ibadah & Kegiatan</h1>
      </article>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schedules.map((schedule, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{schedule.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{schedule.time}</p>
            <p className="text-gray-600 dark:text-gray-300">{schedule.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
