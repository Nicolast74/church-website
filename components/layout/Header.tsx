"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT: TITLE */}
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 no-underline"
          >
            Wilayah Bonaventura Panggang
          </Link>

          {/* RIGHT: NAV MENU */}
          <nav className="flex items-center gap-x-[5px]">
            <Link href="/" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 transition-colors">Home</Link>

            {/* LOKASI */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 transition-colors"
              >
                Lokasi
              </button>

              {open && (
                <div className="absolute left-0 mt-2 w-80 rounded-md bg-white border shadow-lg">
                  <Link href="/lokasi/st-agustinus" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    St. Agustinus Panggang
                  </Link>
                  <Link href="/lokasi/st-yohanes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    St. Yohanes Girisekar
                  </Link>
                  <Link href="/lokasi/taman-doa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Taman Doa Bintang Samudra
                  </Link>
                </div>
              )}
            </div>

            <Link href="/jadwal" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 transition-colors">Jadwal</Link>
            <Link href="/bacaan" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 transition-colors">Bacaan</Link>
            <Link href="/galeri" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 transition-colors">Galeri</Link>
            <Link href="/kontak" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 transition-colors">Kontak</Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
