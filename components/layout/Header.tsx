"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { Menu, Home, Heart } from "lucide-react";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

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
      { href: "/lokasi/gereja", label: "Gereja" },
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
      <style dangerouslySetInnerHTML={{
        __html: `
          /* ── desktop nav items ── */
          .nav-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            color: #374151;
            cursor: pointer;
            background: transparent;
            border: none;
            transition: background 0.18s ease, color 0.18s ease;
            white-space: nowrap;
          }
          .nav-item:hover,
          .nav-item.active {
            background: rgba(79, 70, 229, 0.07);
            color: #4f46e5;
          }

          /* ── desktop dropdown ── */
          .dropdown-panel {
            position: absolute;
            top: calc(100% + 6px);
            left: 50%;
            transform: translateX(-50%);
            min-width: 180px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.10);
            padding: 6px;
            z-index: 100;
          }
          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 14px;
            border-radius: 9px;
            color: #374151;
            font-weight: 600;
            font-size: 13.5px;
            transition: background 0.15s ease, color 0.15s ease;
            white-space: nowrap;
          }
          .dropdown-item:hover {
            background: rgba(79, 70, 229, 0.06);
            color: #4f46e5;
          }
          .dropdown-item-active {
            color: #4f46e5;
            background: rgba(79, 70, 229, 0.06);
          }

          /* ── mobile sidebar ── */
          .mobile-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 290px;
            background: white;
            z-index: 1000;
            box-shadow: -8px 0 28px rgba(0,0,0,0.09);
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 24px 20px;
            overflow-y: auto;
          }
          .mobile-sidebar.open {
            transform: translateX(0);
          }
          .sidebar-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.28);
            backdrop-filter: blur(2px);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          .sidebar-overlay.open {
            opacity: 1;
            visibility: visible;
          }

          /* ── mobile nav items ── */
          .mobile-nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 11px 14px;
            border-radius: 12px;
            font-size: 14px;
            color: #374151;
            cursor: pointer;
            background: transparent;
            border: none;
            transition: background 0.15s ease, color 0.15s ease;
          }
          .mobile-nav-item:hover {
            background: #f8fafc;
          }
          .mobile-nav-child {
            display: block;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 13.5px;
            font-weight: 600;
            color: #6b7280;
            transition: background 0.15s ease, color 0.15s ease;
          }
          .mobile-nav-child:hover {
            background: #f1f5f9;
            color: #4f46e5;
          }
          .mobile-nav-child-active {
            color: #4f46e5;
            background: rgba(79, 70, 229, 0.06);
          }
        `,
      }} />

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

              {/* Donasi CTA */}
              <Link
                href="/donasi"
                className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-indigo-200"
              >
                <Heart size={14} />
                Donasi
              </Link>
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 bg-slate-50 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Buka menu"
            >
              <Menu size={22} />
            </button>

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
