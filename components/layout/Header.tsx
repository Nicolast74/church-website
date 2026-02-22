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
      <style dangerouslySetInnerHTML={{__html: `
        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px 20px;
          border-radius: 18px;
          transition: all 0.3s ease;
          cursor: pointer;
          color: #1e293b; /* Dark Slate */
          font-weight: 600;
        }
        .nav-item:hover, .nav-item.active {
          background: rgba(0, 0, 0, 0.05);
          color: #000000;
          transform: translateY(-2px);
        }
        .dropdown-panel {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 10px;
          min-width: 260px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 8px;
          z-index: 100;
          overflow: hidden;
        }
        .dropdown-item {
          display: block;
          padding: 14px 20px;
          border-radius: 14px;
          color: #374151 !important; /* Dark Gray text */
          font-weight: 600;
          text-decoration: none !important;
          transition: all 0.3s ease;
        }
        .dropdown-item:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #000000 !important;
          transform: translateX(8px);
        }
        `}} />
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
