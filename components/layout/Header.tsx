"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = "px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-200 transition-colors duration-300";
  const mobileLinkClasses = "block " + linkClasses;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-black">
              Nama Gereja
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-6 w-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          <nav className={`hidden md:flex md:space-x-2 ${isOpen ? "block" : "hidden"}`}>
            <Link href="/jadwal" className={linkClasses}>
              Jadwal
            </Link>
            <Link href="/bacaan" className={linkClasses}>
              Bacaan
            </Link>
            <Link href="/kalender-liturgi" className={linkClasses}>
              Kalender Liturgi
            </Link>
            <Link href="/galeri" className={linkClasses}>
              Galeri
            </Link>
            <Link href="/kontak" className={linkClasses}>
              Kontak
            </Link>
          </nav>
        </div>
        {isOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/jadwal" className={mobileLinkClasses}>
              Jadwal
            </Link>
            <Link href="/bacaan" className={mobileLinkClasses}>
              Bacaan
            </Link>
            <Link href="/kalender-liturgi" className={mobileLinkClasses}>
              Kalender Liturgi
            </Link>
            <Link href="/galeri" className={mobileLinkClasses}>
              Galeri
            </Link>
            <Link href="/kontak" className={mobileLinkClasses}>
              Kontak
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
