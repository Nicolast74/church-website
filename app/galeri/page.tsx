import GalleryCard from "@/components/galeri/GalleryCard";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";

export default function Galeri() {
  // A single, unified list of all images for an Instagram-style grid.
  const allImages = [
    { src: "https://picsum.photos/seed/event1-1/500/500", caption: "Sesi Pembukaan Retret" },
    { src: "https://picsum.photos/seed/event1-2/500/500", caption: "Kerja Kelompok OMK" },
    { src: "https://picsum.photos/seed/event2-1/500/500", caption: "Perarakan Misa Syukur" },
    { src: "https://picsum.photos/seed/event1-3/500/500", caption: "Malam Keakraban" },
    { src: "https://picsum.photos/seed/event2-2/500/500", caption: "Pemotongan Tumpeng HUT Paroki" },
    { src: "https://picsum.photos/seed/event3-1/500/500", caption: "Ziarah ke Taman Doa" },
    { src: "https://picsum.photos/seed/event2-3/500/500", caption: "Ramah Tamah Umat" },
    { src: "https://picsum.photos/seed/event4-1/500/500", caption: "Penerimaan Sakramen Krisma" },
    { src: "https://picsum.photos/seed/event3-2/500/500", caption: "Doa Rosario di Taman Doa" },
    { src: "https://picsum.photos/seed/event2-4/500/500", caption: "Foto Bersama Panitia" },
  ];

  return (
    <main>
      <Section>
        <PageHeader title="Galeri Kegiatan" subtitle="Momen-momen kebersamaan di Wilayah Bonaventura Panggang" />

        {allImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allImages.map((image, index) => (
              <GalleryCard
                key={index}
                imageUrl={image.src}
                caption={image.caption}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-700">Galeri Masih Kosong</h3>
            <p className="mt-2 text-gray-500">
              Belum ada foto kegiatan yang diunggah. Silakan kembali lagi nanti.
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}