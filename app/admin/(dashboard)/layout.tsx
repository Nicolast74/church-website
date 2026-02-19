import Link from 'next/link';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-800">
      <Toaster position="top-right" richColors />
      
      {/* Sidebar - Clean Style */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen z-10">
        <div className="p-6 border-b border-gray-50 flex items-center space-x-3">
          <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            GB
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 leading-tight">Admin Panel</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">St. Yohanes Rasul</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto custom-scrollbar">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Menu</p>
            
            <Link href="/admin/dashboard" className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
            </Link>
            
            <Link href="/admin/kegiatan" className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Galeri Kegiatan
            </Link>
            
            <Link href="/admin/jadwal" className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Jadwal Misa
            </Link>

             <div className="pt-4 mt-4 border-t border-gray-100">
                <Link href="/" target="_blank" className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Lihat Website
                </Link>
             </div>
        </nav>
        
        <div className="p-4 border-t border-gray-100">
            <div className="flex items-center p-2 rounded-lg">
                 <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">A</div>
                 <div className="ml-3">
                     <p className="text-sm font-medium text-gray-900">Admin</p>
                     <p className="text-xs text-gray-500">Online</p>
                 </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50/50">
          {/* Mobile Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 md:hidden flex justify-between items-center sticky top-0 z-20">
              <div className="flex items-center space-x-2">
                 <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">GB</div>
                 <h1 className="font-bold text-lg text-gray-900">Admin Panel</h1>
              </div>
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

