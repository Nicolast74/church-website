export default function Jadwal() {
  const ibadahRutin = [
    {
      day: "Minggu",
      schedules: [
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
      ],
    },
    {
      day: "Senin-Sabtu",
      schedules: [
        {
          title: "Misa Harian",
          time: "06:00",
          location: "St. Agustinus",
        },
      ],
    },
  ];

  const kegiatanGereja = [
    {
      title: "Adorasi Sakramen Mahakudus",
      day: "Jumat Pertama",
      time: "19:00",
      location: "Taman Doa Bintang Samudra",
    },
    {
      title: "Katekumen",
      day: "Setiap Selasa",
      time: "19:00",
      location: "St. Yohanes",
    },
    {
      title: "Doa Rosario",
      day: "Setiap Hari",
      time: "19:00",
      location: "Taman Doa Bintang Samudra",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="text-center text-black">Jadwal Ibadah & Kegiatan</h1>
      </article>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-black mb-6">Ibadah Rutin</h2>
        <div className="space-y-8">
          {ibadahRutin.map((item, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-black mb-4">{item.day}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {item.schedules.map((schedule, sIndex) => (
                  <div key={sIndex} className="p-6 bg-white rounded-lg shadow-md">
                    <h4 className="text-lg font-bold mb-2 text-black">{schedule.title}</h4>
                    <p className="text-black">{schedule.time}</p>
                    <p className="text-black">{schedule.location}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-black mb-6">Kegiatan Gereja</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kegiatanGereja.map((kegiatan, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2 text-black">{kegiatan.title}</h3>
              <p className="text-black">{kegiatan.day} - {kegiatan.time}</p>
              <p className="text-black">{kegiatan.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}