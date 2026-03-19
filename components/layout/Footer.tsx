import PushSubscriptionButton from "../notifications/PushSubscriptionButton";

export default function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Lingkungan St. Yohanes Rasul Girisekar</h3>
            <p className="mt-2 text-gray-500 dark:text-slate-400">
              Dusun Sawah, Desa Girisekar
              <br />
              Kecamatan Panggang, Gunungkidul, D.I. Yogyakarta
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Kontak Kami</h3>
            <p className="mt-2 text-gray-500 dark:text-slate-400">
              Email: <a href="mailto:sekretariat@stmaria.org" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">emailgereja.gmail.com</a>
              <br />
              Telepon: (021) 123-4567
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Notifikasi</h3>
            <p className="mt-2 text-gray-500 dark:text-slate-400 mb-4">
              Dapatkan info kegiatan dan pengumuman terbaru langsung di browser Anda.
            </p>
            <PushSubscriptionButton />
          </div>
        </div>
        <div className="mt-12 border-t border-stone-200 dark:border-stone-800 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500 dark:text-stone-500">
            © {new Date().getFullYear()} Lingkungan St. Yohanes Rasul Girisekar.
          </p>
          <div className="flex gap-4">
            <a href="https://maps.app.goo.gl/6f5s3mF7Fucx4WEo9" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-400 no-underline">Lokasi Gereja</a>
            <a href="/kontak" className="text-xs text-gray-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-400 no-underline">Kontak</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
