import LocationPage from "@/components/lokasi/LocationPage";

export default function StYohanes() {
  const locationData = {
    name: "Lingkungan Gereja St. Yohanes Girisekar",
    heroImage: "https://picsum.photos/seed/st-yohanes/1920/1080",
    description: (
      <>
        <p>
          Gereja St. Yohanes adalah gereja stasi yang melayani umat di wilayah pinggiran kota. 
          Kami bangga dengan komunitas kami yang erat dan bersemangat dalam pelayanan.
        </p>
        <p>
          Kami menawarkan berbagai program katekese dan pendalaman iman untuk anak-anak, 
          remaja, dan dewasa. Bergabunglah bersama kami dalam membangun keluarga Allah yang 
          semakin kuat.
        </p>
      </>
    ),
    specialSchedules: [
      {
        title: "Misa Anak & Remaja",
        details: "Setiap hari Minggu pukul 10:00, dengan liturgi yang hidup dan menarik bagi kaum muda.",
      },
      {
        title: "Pendalaman Alkitab",
        details: "Setiap hari Kamis pukul 19:00. Mari bersama-sama merenungkan Sabda Tuhan.",
      },
    ],
    galeriUrl: "/galeri?lokasi=st-yohanes",
  };

  return <LocationPage {...locationData} />;
}