"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronRight, MapPin, Calendar, BookOpen, Image, Mail, Home } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (open || isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, isSidebarOpen]);

  const navLinks = [
    { href: "/jadwal", label: "Jadwal", icon: <Calendar size={18} /> },
    { href: "/bacaan", label: "Bacaan", icon: <BookOpen size={18} /> },
    { href: "/galeri", label: "Galeri", icon: <Image size={18} /> },
    { href: "/kontak", label: "Kontak", icon: <Mail size={18} /> },
  ];

  return (
    <header className="floating-header-container">
      <style dangerouslySetInnerHTML={{__html: `
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          color: #1e293b;
          font-weight: 600;
          font-size: 14px;
        }
        .nav-item:hover, .nav-item.active {
          background: rgba(0, 0, 0, 0.05);
          color: #4f46e5;
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
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #374151 !important;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .dropdown-item:hover {
          background: rgba(79, 70, 229, 0.05);
          color: #4f46e5 !important;
          transform: translateX(6px);
        }
        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 300px;
          background: white;
          z-index: 1000;
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 24px;
        }
        .mobile-sidebar.open {
          transform: translateX(0);
        }
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          backdrop-blur: 4px;
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .sidebar-overlay.open {
          opacity: 1;
          visibility: visible;
        }
      `}} />

      <div className="floating-navbar">
        <div className="flex h-16 items-center justify-between px-6">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
              <Home size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-900 leading-tight hidden md:block">
                St. Yohanes Rasul
              </span>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest hidden md:block">
                Girisekar
              </span>
              <span className="text-lg font-black text-slate-900 md:hidden">
                Home
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)} className="nav-item">
                <MapPin size={18} className="text-indigo-500" />
                Lokasi
              </button>
              {open && (
                <div className="dropdown-panel">
                  <Link href="/lokasi/st-yohanes" onClick={() => setOpen(false)} className="dropdown-item">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <ChevronRight size={16} />
                    </div>
                    <span>St. Yohanes Rasul Girisekar</span>
                  </Link>
                  <Link href="/lokasi/taman-doa" onClick={() => setOpen(false)} className="dropdown-item">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <ChevronRight size={16} />
                    </div>
                    <span>Taman Doa Bintang Samudra</span>
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-item">
                <span className="text-indigo-500">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-3 bg-slate-50 rounded-xl text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)} />
      <div ref={sidebarRef} className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-10">
          <Link href="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Home size={20} />
            </div>
            <span className="font-black text-slate-900">Girisekar</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Main Menu</p>
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 font-bold transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                {link.icon}
              </div>
              {link.label}
              <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
          
          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Lokasi</p>
            <Link 
              href="/lokasi/st-yohanes" 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 font-bold transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <MapPin size={18} />
              </div>
              Kapel Girisekar
            </Link>
            <Link 
              href="/lokasi/taman-doa" 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 font-bold transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <MapPin size={18} />
              </div>
              Taman Doa
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 p-6 bg-indigo-50 rounded-[2rem] text-center">
          <p className="text-xs font-bold text-indigo-600 mb-1">Berkah Dalem</p>
          <p className="text-[10px] text-indigo-400 font-medium tracking-wide">St. Yohanes Rasul Girisekar</p>
        </div>
      </div>
    </header>
  );
}
