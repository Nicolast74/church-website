import LocationPage from "@/components/lokasi/LocationPage";

export default function StYohanes() {
  const locationData = {
    name: "Lingkungan Gereja St. Yohanes Girisekar",
    heroImage: "/images/bg/st-yohanes-1.jpg",
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
    address: "Sawah, Girisekar, Panggang, Gunungkidul, DIY",
    phone: "021-123-4567",
    email: "st.yohanes.girisekar@gmail.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.6299048315836!2d110.4564573!3d-8.0370383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bad00434b0e4d%3A0x3d9f8067e8544bb3!2sGereja%20Katolik%20Stasi%20Santo%20Yohanes%20Rasul%2C%20Girisekar!5e0!3m2!1sen!2sid!4v1772771261888!5m2!1sen!2sid",
    galeriUrl: "/galeri?lokasi=st-yohanes",
  };

  return <LocationPage {...locationData} />;
}