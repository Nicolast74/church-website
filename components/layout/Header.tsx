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

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
                <Home size={18} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-black text-slate-900 hidden md:block">
                  St. Yohanes Rasul
                </span>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest hidden md:block">
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
                className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-indigo-200"
              >
                <Heart size={14} />
                Donasi
              </Link>
            </nav>

            {/* MOBILE TOGGLE & THEME */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
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
