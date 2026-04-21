import { Shield } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi | Gereja St. Agustinus & St. Yohanes",
  description: "Kebijakan privasi dan pengelolaan data pengunjung website Gereja St. Agustinus & St. Yohanes.",
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="flex-1 bg-background pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mb-4 font-playfair text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Kebijakan Privasi
          </h1>
          <p className="text-lg text-muted-foreground">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="prose dark:prose-invert prose-accent mx-auto max-w-none">
          <p className="lead">
            Gereja St. Agustinus & St. Yohanes ("kami", "kita", atau "milik kami") mengoperasikan 
            website ini. Kebijakan Privasi ini menginformasikan kepada Anda mengenai kebijakan kami 
            terkait pengumpulan, penggunaan, dan pengungkapan informasi pribadi saat Anda menggunakan 
            Layanan kami serta pilihan yang Anda miliki terkait dengan informasi tersebut.
          </p>

          <p>
            Kami menggunakan data Anda untuk menyediakan dan meningkatkan Layanan. Dengan menggunakan Layanan, 
            Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.
          </p>

          <h2>Pengumpulan dan Penggunaan Informasi</h2>
          <p>
            Kami mengumpulkan beberapa jenis informasi yang berbeda untuk berbagai tujuan guna menyediakan 
            dan meningkatkan Layanan kami kepada Anda.
          </p>

          <h3>Jenis Data yang Dikumpulkan</h3>
          
          <h4>Data Pribadi</h4>
          <p>
            Saat menggunakan Layanan kami, kami mungkin meminta Anda untuk memberikan kami informasi 
            pengenal pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda 
            ("Data Pribadi"). Informasi yang dapat mengidentifikasi secara pribadi dapat mencakup, namun 
            tidak terbatas pada:
          </p>
          <ul>
            <li>Alamat email (misalnya, saat Anda mendaftar buletin atau menghubungi kami)</li>
            <li>Nama depan dan nama belakang</li>
            <li>Nomor telepon</li>
            <li>Cookie dan Data Penggunaan</li>
          </ul>

          <h4>Data Penggunaan</h4>
          <p>
            Kami juga dapat mengumpulkan informasi tentang bagaimana Layanan diakses dan digunakan 
            ("Data Penggunaan"). Data Penggunaan ini dapat mencakup informasi seperti alamat Protokol 
            Internet komputer Anda (misalnya alamat IP), jenis browser, versi browser, halaman Layanan 
            kami yang Anda kunjungi, waktu dan tanggal kunjungan Anda, waktu yang dihabiskan pada halaman 
            tersebut, pengidentifikasi perangkat unik dan data diagnostik lainnya.
          </p>

          <h2>Pelacakan & Data Cookie</h2>
          <p>
            Kami menggunakan cookie dan teknologi pelacakan serupa untuk melacak aktivitas di Layanan kami 
            dan menyimpan informasi tertentu.
          </p>
          <p>
            Cookie adalah file dengan sejumlah kecil data yang mungkin mencakup pengidentifikasi unik anonim. 
            Cookie dikirim ke browser Anda dari situs web dan disimpan di perangkat Anda. Anda dapat 
            menginstruksikan browser Anda untuk menolak semua cookie atau untuk menunjukkan ketika sebuah 
            cookie sedang dikirim. Namun, jika Anda tidak menerima cookie, Anda mungkin tidak dapat 
            menggunakan beberapa bagian dari Layanan kami.
          </p>
          <p>Contoh Cookie yang kami gunakan:</p>
          <ul>
            <li><strong>Cookie Esensial.</strong> Kami menggunakan Cookie Esensial untuk menjalankan Layanan kami.</li>
            <li><strong>Cookie Preferensi.</strong> Kami menggunakan Cookie Preferensi untuk mengingat preferensi Anda dan berbagai pengaturan.</li>
            <li><strong>Cookie Keamanan.</strong> Kami menggunakan Cookie Keamanan untuk tujuan keamanan.</li>
          </ul>

          <h2>Penggunaan Data</h2>
          <p>Gereja St. Agustinus & St. Yohanes menggunakan data yang terkumpul untuk berbagai tujuan:</p>
          <ul>
            <li>Untuk menyediakan dan memelihara Layanan</li>
            <li>Untuk memberi tahu Anda tentang perubahan pada Layanan kami</li>
            <li>Untuk memungkinkan Anda berpartisipasi dalam fitur interaktif Layanan kami saat Anda memilih untuk melakukannya</li>
            <li>Untuk memberikan layanan dan dukungan kepada umat</li>
            <li>Untuk memberikan analisis atau informasi berharga sehingga kami dapat meningkatkan Layanan</li>
            <li>Untuk memantau penggunaan Layanan</li>
            <li>Untuk mendeteksi, mencegah dan mengatasi masalah teknis</li>
          </ul>

          <h2>Keamanan Data</h2>
          <p>
            Keamanan data Anda penting bagi kami, tetapi ingatlah bahwa tidak ada metode transmisi di atas 
            Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun kami berusaha untuk 
            menggunakan cara yang dapat diterima secara komersial untuk melindungi Data Pribadi Anda, 
            kami tidak dapat menjamin keamanan absolutnya.
          </p>

          <h2>Tautan ke Situs Lain</h2>
          <p>
            Layanan kami mungkin berisi tautan ke situs lain yang tidak dioperasikan oleh kami. Jika Anda 
            mengklik tautan pihak ketiga, Anda akan diarahkan ke situs pihak ketiga tersebut. Kami 
            sangat menyarankan Anda untuk meninjau Kebijakan Privasi dari setiap situs yang Anda kunjungi.
          </p>

          <h2>Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
          </p>
          <ul>
            <li>Melalui email: sekretariat@gereja.example.com</li>
            <li>Melalui telepon: +62 21 1234567</li>
            <li>Dengan mengunjungi halaman ini di website kami: <a href="/kontak">Hubungi Kami</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
