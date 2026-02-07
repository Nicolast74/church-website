export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800">Wilayah Bonaventura Panggang</h3>
            <p className="mt-2 text-gray-500">
              Jl. Damai Sejahtera No. 123
              <br />
              Kota Harapan, 12345
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800">Kontak Kami</h3>
            <p className="mt-2 text-gray-500">
              Email: <a href="mailto:sekretariat@stmaria.org" className="hover:text-blue-600">sekretariat@stmaria.org</a>
              <br />
              Telepon: (021) 123-4567
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800">Tautan</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="/lokasi/st-agustinus" className="text-gray-500 hover:text-blue-600">Lokasi Gereja</a></li>
              <li><a href="/kontak" className="text-gray-500 hover:text-blue-600">Formulir Kontak</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Wilayah Bonaventura Panggang. Hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
}
