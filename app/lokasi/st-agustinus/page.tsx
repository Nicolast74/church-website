import LocationPage from "@/components/lokasi/LocationPage";

export default function StAgustinus() {
  const locationData = {
    name: "Lingkungan Gereja St. Agustinus Panggang",
    heroImage: "https://picsum.photos/seed/st-agustinus/1920/1080",
    description: (
      <>
        <p>
          Gereja St. Agustinus adalah gereja paroki yang terletak di pusat kota. 
          Kami menyambut semua orang untuk bergabung dengan komunitas kami yang hangat dan ramah. 
          Dengan sejarah yang kaya dan iman yang hidup, kami menawarkan berbagai kegiatan rohani 
          dan sosial untuk semua usia.
        </p>
        <p>
          Misi kami adalah untuk bertumbuh dalam iman kepada Kristus dan melayani sesama 
          dengan kasih. Kami mengundang Anda untuk menghadiri Misa, berpartisipasi dalam 
          kelompok doa, atau menjadi sukarelawan dalam program-program kami.
        </p>
      </>
    ),
    specialSchedules: [
      {
        title: "Misa Jumat Pertama",
        details: "Setiap Jumat pertama bulan, pukul 19:00. Misa khusus untuk menghormati Hati Kudus Yesus.",
      },
      {
        title: "Doa Pagi (Lauds)",
        details: "Setiap hari pukul 05:30 di kapel. Terbuka untuk umum.",
      },
    ],
    galeriUrl: "/galeri?lokasi=st-agustinus",
  };

  return <LocationPage {...locationData} />;
}