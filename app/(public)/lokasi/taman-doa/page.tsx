import LocationPage from "@/components/lokasi/LocationPage";

export default function TamanDoa() {
  const locationData = {
    name: "Taman Doa Goa Maria Bintang Samudra",
    heroImage: "/images/bg/taman-doa-2-1600.jpg",
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
    address: "Sawah, Girisekar, Panggang, Gunungkidul, DIY",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.6283587461476!2d110.45637699999999!3d-8.037197100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bad2d6ebe6903%3A0x2ccee3f40f4c3041!2sGua%20Maria%20Bintang%20Samudera!5e0!3m2!1sen!2sid!4v1772443643880!5m2!1sen!2sid",
    galeriUrl: "/galeri?lokasi=taman-doa",
  };

  return <LocationPage {...locationData} />;
}
