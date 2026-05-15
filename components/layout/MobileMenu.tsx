"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { X, ChevronDown, Heart, Home } from "lucide-react";
import { NavChild } from "./NavDropdown";

interface NavGroup {
  label: string;
  children: NavChild[];
}

interface MobileMenuProps {
  groups: NavGroup[];
  simpleLinks: NavChild[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ groups, simpleLinks, isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
      />

      {/* Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Home size={18} />
            </div>
            <span className="font-black text-slate-900 text-sm">St. Yohanes Rasul</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-1">
          {/* Grouped dropdown items */}
          {groups.map((group) => {
            const isExpanded = expanded === group.label;
            const parentActive = group.children.some(
              (c) => pathname === c.href || pathname.startsWith(c.href + "/")
            );

            return (
              <div key={group.label}>
                <button
                  onClick={() => toggle(group.label)}
                  className={`mobile-nav-item w-full ${parentActive ? "text-indigo-600 bg-indigo-50" : ""}`}
                >
                  <span className={`font-bold ${parentActive ? "text-indigo-600" : "text-slate-700"}`}>
                    {group.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`ml-auto text-slate-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-indigo-100 pl-3">
                    {group.children.map((child) => {
                      const childActive = pathname === child.href || pathname.startsWith(child.href + "/");
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`mobile-nav-child${childActive ? " mobile-nav-child-active" : ""}`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Simple links (Kontak) */}
          {simpleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`mobile-nav-item block ${isActive ? "text-indigo-600 bg-indigo-50" : "text-slate-700"}`}
              >
                <span className="font-bold">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Donasi CTA */}
        <div className="mt-6">
          <Link
            href="/donasi"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-indigo-200"
          >
            <Heart size={16} />
            Donasi
          </Link>
        </div>

        {/* Footer brand */}
        <div className="absolute bottom-8 left-6 right-6 text-center">
          <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
            Berkah Dalem
          </p>
        </div>
      </div>
    </>
  );
}
