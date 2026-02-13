"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";


export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);






  return (
    <header className="floating-header-container">
      <div className="floating-navbar">
        <div className="flex h-16 items-center justify-between px-6">

          {/* LEFT: TITLE */}
          <Link
            href="/"
            className="nav-item"
          >
            Lingkungan St. Yohanes Rasul Girisekar
          </Link>

          {/* RIGHT: NAV MENU */}
          <nav className="flex items-center nav-spacing">

            {/* LOKASI */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="nav-item"
              >
                Lokasi
              </button>

              {open && (
                <div className="dropdown-panel">
                  <Link href="/lokasi/st-yohanes" onClick={() => setOpen(false)} className="dropdown-item">
                    St. Yohanes Rasul Girisekar
                  </Link>
                  <Link href="/lokasi/taman-doa" onClick={() => setOpen(false)} className="dropdown-item">
                    Taman Doa Goa Maria Bintang Samudra
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
