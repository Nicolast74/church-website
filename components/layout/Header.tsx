"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { Menu, Home, Heart } from "lucide-react";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";

// ─── Nav data ────────────────────────────────────────────────────────────────

const navGroups = [
  {
    label: "Rohani",
    children: [
      { href: "/bacaan", label: "Bacaan" },
      { href: "/renungan", label: "Renungan" },
      { href: "/lagu", label: "Lagu" },
    ],
  },
  {
    label: "Komunitas",
    children: [
      { href: "/jadwal", label: "Jadwal" },
      { href: "/galeri", label: "Galeri" },
      { href: "/pengumuman", label: "Pengumuman" },
    ],
  },
  {
    label: "Lokasi",
    children: [
      { href: "/lokasi/st-yohanes", label: "Gereja" },
      { href: "/lokasi/taman-doa", label: "Taman Doa" },
    ],
  },
];

const simpleLinks = [{ href: "/kontak", label: "Kontak" }];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>

      <header className="floating-header-container">
        <div className="floating-navbar">
          <div className="flex h-16 items-center justify-between px-5">

            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-900/10 group-hover:rotate-12 transition-transform duration-500 font-serif">
                <Home size={20} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-serif font-medium text-stone-900 dark:text-stone-50 hidden md:block group-hover:text-amber-700 transition-colors">
                  St. Yohanes Rasul
                </span>
                <span className="text-[10px] font-bold text-stone-500 dark:text-amber-500/80 uppercase tracking-[0.2em] hidden md:block">
                  Girisekar
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1">
              {navGroups.map((group) => (
                <NavDropdown key={group.label} label={group.label} items={group.children} />
              ))}

              {simpleLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-item${isActive ? " active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <ThemeToggle className="mx-1" />

              {/* Donasi CTA */}
              <Link
                href="/donasi"
                className="ml-2 flex items-center gap-1.5 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-900/10 hover:-translate-y-0.5"
              >
                <Heart size={14} className="fill-white" />
                Donasi
              </Link>
            </nav>

            {/* MOBILE TOGGLE & THEME */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2.5 bg-stone-50 dark:bg-stone-800 rounded-xl text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors"
                aria-label="Buka menu"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <MobileMenu
        groups={navGroups}
        simpleLinks={simpleLinks}
        isOpen={mobileOpen}
        onClose={closeMobile}
      />
    </>
  );
}
