'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Image, 
  Calendar, 
  BookOpen, 
  Megaphone, 
  FileText,
  Music
} from 'lucide-react';

const ICON_MAP = {
  dashboard: LayoutDashboard,
  galeri: Image,
  jadwal: Calendar,
  renungan: BookOpen,
  pengumuman: Megaphone,
  bacaan: FileText,
  lagu: Music,
};

interface NavItemProps {
  href: string;
  label: string;
  iconName: keyof typeof ICON_MAP;
}

export function NavItem({ href, label, iconName }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
  const Icon = ICON_MAP[iconName];

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all group ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-950/20'
          : 'text-(--muted) hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400'
      }`}
    >
      <Icon className={`h-4 w-4 mr-3 transition-colors ${isActive ? 'text-white' : ''}`} />
      {label}
    </Link>
  );
}
