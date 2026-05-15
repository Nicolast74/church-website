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
    address: "Jl. Gereja No. 1, Panggang, Gunungkidul, DIY",
    phone: "0812-3456-7890",
    email: "paroki.agustinus@gmail.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.829982993638!2d110.4192616!3d-8.016461699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bab8c6f790891%3A0x659d6d3a8c96520a!2sGereja%20Katolik%20Santo%20Agustinus%2C%20Panggang!5e0!3m2!1sen!2sid!4v1772442585852!5m2!1sen!2sid",
    galeriUrl: "/galeri?lokasi=st-agustinus",
  };

  return <LocationPage {...locationData} />;
}