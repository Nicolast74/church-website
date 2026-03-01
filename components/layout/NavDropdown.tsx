"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export interface NavChild {
  href: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  items: NavChild[];
}

export default function NavDropdown({ label, items }: NavDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = items.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`nav-item${isActive ? " active" : ""}`}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="dropdown-panel">
          {items.map((child) => {
            const childActive = pathname === child.href || pathname.startsWith(child.href + "/");
            return (
              <Link
                key={child.href}
                href={child.href}
                className={`dropdown-item${childActive ? " dropdown-item-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    childActive ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                />
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
