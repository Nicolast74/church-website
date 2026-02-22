import Link from "next/link";

export default function BacaanIbadah() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="text-center text-black">Bacaan Ibadah</h1>
        <p className="text-center text-lg text-black">Minggu, 8 Februari 2026</p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black">Bacaan Pertama</h2>
          <p className="mt-4 text-black leading-relaxed">
            Pembacaan dari Kitab Yesaya (40:21-31)
          </p>
          <p className="mt-4 text-black leading-relaxed">
            Tidakkah kamu tahu, dan tidakkah kamu dengar? Tidakkah diberitahukan kepadamu dari mulanya? Tidakkah kamu mengerti dasar bumi? Dia yang bertakhta di atas bulatan bumi yang penduduknya seperti belalang; Dia yang membentangkan langit seperti kain dan memasangnya seperti kemah kediaman!
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black">Mazmur Tanggapan</h2>
          <p className="mt-4 text-black leading-relaxed">
            Mzm 147:1-6
          </p>
          <p className="mt-4 text-black font-bold leading-relaxed">
            Refren: Tuhanlah yang menyembuhkan orang-orang yang patah hati.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black">Bacaan Kedua</h2>
          <p className="mt-4 text-black leading-relaxed">
            Pembacaan dari Surat Pertama Rasul Paulus kepada Jemaat di Korintus (9:16-19,22-23)
          </p>
          <p className="mt-4 text-black leading-relaxed">
            Karena jika aku memberitakan Injil, aku tidak mempunyai alasan untuk memegahkan diri. Sebab itu adalah keharusan bagiku. Celakalah aku, jika aku tidak memberitakan Injil!
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black">Bacaan Injil</h2>
          <p className="mt-4 text-black leading-relaxed">
            Inilah Injil Yesus Kristus menurut Markus (1:29-39)
          </p>
          <p className="mt-4 text-black leading-relaxed">
            Sekeluarnya dari rumah ibadat itu Yesus dengan Yakobus dan Yohanes pergi ke rumah Simon dan Andreas. Ibu mertua Simon terbaring karena sakit demam. Mereka segera memberitahukan keadaannya kepada Yesus.
          </p>
        </div>

        <div className="mt-12 flex justify-between">
          <Link href="#" className="text-blue-500 hover:underline">
            &larr; Minggu Sebelumnya
          </Link>
          <Link href="#" className="text-blue-500 hover:underline">
            Minggu Berikutnya &rarr;
          </Link>
        </div>
      </article>
    </div>
  );
}