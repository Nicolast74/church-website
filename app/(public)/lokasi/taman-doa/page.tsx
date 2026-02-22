import LocationPage from "@/components/lokasi/LocationPage";

export default function TamanDoa() {
  const locationData = {
    name: "Taman Doa Bintang Samudra",
    heroImage: "https://picsum.photos/seed/taman-doa/1920/1080",
    description: (
      <>
        <p>
          Taman Doa Bintang Samudra adalah sebuah oase ketenangan yang didedikasikan 
          untuk Bunda Maria. Tempat ini terbuka bagi siapa saja yang mencari kedamaian, 
          ketenangan, dan tempat untuk berdoa secara pribadi.
        </p>
        <p>
          Dengan suasana yang asri dan pemandangan yang indah, taman ini menjadi tempat 
          yang ideal untuk refleksi dan kontemplasi. Kami mengundang Anda untuk mengunjungi 
          dan merasakan kehadiran Tuhan di tengah alam.
        </p>
      </>
    ),
    specialSchedules: [
      {
        title: "Doa Rosario Bersama",
        details: "Setiap hari Sabtu pukul 17:00, dipimpin oleh legio Maria.",
      },
      {
        title: "Adorasi Sakramen Mahakudus",
        details: "Setiap Jumat pertama bulan, pukul 19:00, setelah Misa Jumat Pertama.",
      },
    ],
    galeriUrl: "/galeri?lokasi=taman-doa",
  };

  return <LocationPage {...locationData} />;
}
