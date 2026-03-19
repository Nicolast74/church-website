import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { NavItem } from './NavItem';
import { 
  LayoutDashboard, 
  Image, 
  Calendar, 
  BookOpen, 
  Megaphone, 
  FileText, 
  ExternalLink 
} from 'lucide-react';

const MENU_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/kegiatan', label: 'Galeri Kegiatan', icon: Image },
  { href: '/admin/jadwal', label: 'Jadwal Misa', icon: Calendar },
  { href: '/admin/renungan', label: 'Renungan Harian', icon: BookOpen },
  { href: '/admin/pengumuman', label: 'Pengumuman', icon: Megaphone },
  { href: '/admin/bacaan', label: 'Bacaan Ibadah', icon: FileText },
];

export function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col sticky top-0 h-screen z-10 border-r border-(--card-border) bg-(--card-bg) transition-colors duration-200">
      {/* Logo */}
      <div className="p-6 border-b border-(--card-border) flex items-center space-x-3">
        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-100">
          GB
        </div>
        <div>
          <h2 className="text-sm font-black leading-tight uppercase tracking-tighter text-(--foreground)">Admin.CH</h2>
          <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">St. Yohanes Rasul</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] mb-4 mt-4 text-(--muted)">Menu Utama</p>
        
        {MENU_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

        <div className="pt-6 mt-6 border-t border-(--card-border)">
          <Link href="/" target="_blank"
            className="flex items-center px-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 text-(--muted)">
            <ExternalLink className="h-4 w-4 mr-3" />
            Lihat Website
          </Link>
        </div>
      </nav>
      
      {/* User + Theme toggle */}
      <div className="p-4 border-t border-(--card-border) space-y-3">
        <div className="flex items-center justify-between px-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-(--muted)">Tema</span>
          <ThemeToggle />
        </div>
        
        <div className="flex items-center p-3 rounded-2xl border border-(--card-border) bg-[color-mix(in_srgb,var(--background)_60%,var(--card-bg)_40%)] transition-colors">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs">A</div>
          <div className="ml-3">
            <p className="text-sm font-black leading-tight text-(--foreground)">Admin</p>
            <p className="text-[10px] text-indigo-600 font-bold">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
