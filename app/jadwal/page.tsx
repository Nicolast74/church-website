import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";

export default function Jadwal() {
  const ibadahRutin = [
    {
      day: "Minggu",
      schedules: [
        {
          title: "Misa Minggu Pagi",
          time: "08:00",
          location: "St. Agustinus",
          isUpcoming: true,
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
      isUpcoming: true,
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
    <main>
      <Section>
        <PageHeader title="Jadwal Ibadah & Kegiatan" />

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Ibadah Rutin
          </h2>
          {ibadahRutin.length > 0 ? (
            <div className="space-y-10">
              {ibadahRutin.map((item, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
                    {item.day}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {item.schedules.map((schedule, sIndex) => (
                      <Card key={sIndex} isUpcoming={schedule.isUpcoming}>
                        <h4 className="text-xl font-bold text-gray-800">
                          {schedule.title}
                        </h4>
                        <p className="text-gray-600 mt-2 text-lg">
                          {schedule.time}
                        </p>
                        <p className="text-gray-500 mt-1">
                          {schedule.location}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Jadwal ibadah rutin akan segera diperbarui.
            </p>
          )}
        </div>
      </Section>

      <Section isGray>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Kegiatan Gereja
          </h2>
          {kegiatanGereja.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kegiatanGereja.map((kegiatan, index) => (
                <Card key={index} isUpcoming={kegiatan.isUpcoming}>
                  <h3 className="text-xl font-bold text-gray-800">
                    {kegiatan.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {kegiatan.day} - {kegiatan.time}
                  </p>
                  <p className="text-gray-500 mt-1">{kegiatan.location}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Belum ada kegiatan gereja yang dijadwalkan.
            </p>
          )}
        </div>
      </Section>
    </main>
  );
}