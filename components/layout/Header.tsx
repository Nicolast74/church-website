"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="floating-header-container">
      <div className="floating-navbar">
        <div className="flex h-16 items-center justify-between px-6">

          {/* LEFT: TITLE */}
          <Link
            href="/"
            className="nav-item"
          >
            Wilayah Bonaventura Panggang
          </Link>

          {/* RIGHT: NAV MENU */}
          <nav className="flex items-center nav-spacing">

            {/* LOKASI */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="nav-item"
              >
                Lokasi
              </button>

              {open && (
                <div className="dropdown-panel">
                  <Link href="/lokasi/st-agustinus" onClick={() => setOpen(false)} className="dropdown-item">
                    St. Agustinus Panggang
                  </Link>
                  <Link href="/lokasi/st-yohanes" onClick={() => setOpen(false)} className="dropdown-item">
                    St. Yohanes Girisekar
                  </Link>
                  <Link href="/lokasi/taman-doa" onClick={() => setOpen(false)} className="dropdown-item">
                    Taman Doa Bintang Samudra
                  </Link>
                </div>
              )}
            </div>

            <Link href="/jadwal" className="nav-item">Jadwal</Link>
            <Link href="/bacaan" className="nav-item">Bacaan</Link>
            <Link href="/galeri" className="nav-item">Galeri</Link>
            <Link href="/kontak" className="nav-item">Kontak</Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
