import Link from 'next/link';
import { Toaster } from 'sonner';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex font-sans" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Toaster position="top-right" richColors />
      
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col sticky top-0 h-screen z-10 border-r transition-colors duration-200"
        style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        
        {/* Logo */}
        <div className="p-6 border-b flex items-center space-x-3" style={{ borderColor: 'var(--card-border)' }}>
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-100">
            GB
          </div>
          <div>
            <h2 className="text-sm font-black leading-tight uppercase tracking-tighter" style={{ color: 'var(--foreground)' }}>Admin.CH</h2>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">St. Yohanes Rasul</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] mb-4 mt-4" style={{ color: 'var(--muted)' }}>Menu Utama</p>
          
          {[
            { href: '/admin/dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
            { href: '/admin/kegiatan', label: 'Galeri Kegiatan', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { href: '/admin/jadwal', label: 'Jadwal Misa', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { href: '/admin/renungan', label: 'Renungan Harian', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { href: '/admin/pengumuman', label: 'Pengumuman', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
          ].map(({ href, label, icon }) => (
            <Link key={href} href={href}
              className="flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all group hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
              style={{ color: 'var(--muted)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              {label}
            </Link>
          ))}

          <div className="pt-6 mt-6 border-t" style={{ borderColor: 'var(--card-border)' }}>
            <Link href="/" target="_blank"
              className="flex items-center px-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700"
              style={{ color: 'var(--muted)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Lihat Website
            </Link>
          </div>
        </nav>
        
        {/* User + Theme toggle */}
        <div className="p-4 border-t space-y-3" style={{ borderColor: 'var(--card-border)' }}>
          {/* Theme toggle row */}
          <div className="flex items-center justify-between px-3">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Tema</span>
            <ThemeToggle />
          </div>
          {/* User card */}
          <div className="flex items-center p-3 rounded-2xl border transition-colors"
            style={{ background: 'color-mix(in srgb, var(--background) 60%, var(--card-bg) 40%)', borderColor: 'var(--card-border)' }}>
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs">A</div>
            <div className="ml-3">
              <p className="text-sm font-black leading-tight" style={{ color: 'var(--foreground)' }}>Admin</p>
              <p className="text-[10px] text-indigo-600 font-bold">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ background: 'var(--background)' }}>
        {/* Mobile Header */}
        <header className="backdrop-blur-md border-b p-4 md:hidden flex justify-between items-center sticky top-0 z-20 transition-colors"
          style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">GB</div>
            <h1 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>Admin Panel</h1>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
