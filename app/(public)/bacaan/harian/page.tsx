import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import ReadingPane from "@/components/bacaan/ReadingPane";

export default function BacaanHarian() {
  const dailyReading = {
    date: "Jumat, 6 Februari 2026",
    readings: [
      {
        title: "Bacaan Pertama",
        subtitle: "Pembacaan dari Kitab Kejadian (1:1-19)",
        content: [
          "Pada mulanya Allah menciptakan langit dan bumi. Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya, dan Roh Allah melayang-layang di atas permukaan air. Berfirmanlah Allah: \"Jadilah terang.\" Lalu terang itu jadi. Allah melihat bahwa terang itu baik, lalu dipisahkan-Nyalah terang itu dari gelap. Dan Allah menamai terang itu siang, dan gelap itu malam. Jadilah petang dan jadilah pagi, itulah hari pertama.",
        ],
      },
      {
        title: "Mazmur Tanggapan",
        subtitle: "Mzm 104:1-2a,5-6,10,12,24,35c",
        content: [],
        refrain: "Pujilah Tuhan, hai jiwaku!",
      },
      {
        title: "Bacaan Injil",
        subtitle: "Inilah Injil Yesus Kristus menurut Markus (6:53-56)",
        content: [
          "Setibanya di seberang Yesus dan murid-murid-Nya mendarat di Genesaret dan berlabuh di situ. Ketika mereka keluar dari perahu, orang segera mengenal Yesus.",
          "Maka berlari-larilah mereka ke seluruh daerah itu dan mulai mengusung orang-orang sakit di atas tilamnya kepada Yesus, di mana saja kabarnya Ia berada. Ke mana pun Ia pergi, ke desa-desa, ke kota-kota, atau ke kampung-kampung, orang meletakkan orang-orang sakit di pasar dan memohon kepada-Nya, supaya mereka diperkenankan hanya menjamah jumbai jubah-Nya saja. Dan semua orang yang menjamah-Nya menjadi sembuh.",
        ],
      },
    ],
  };

  return (
    <main>
      <Section isGray>
        <PageHeader title="Bacaan Harian" />
        <ReadingPane date={dailyReading.date} readings={dailyReading.readings} />

        <div className="mt-12 flex justify-center gap-4">
          <Link href="#" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            &larr; Hari Sebelumnya
          </Link>
          <Link href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Hari Berikutnya &rarr;
          </Link>
        </div>
      </Section>
    </main>
  );
}