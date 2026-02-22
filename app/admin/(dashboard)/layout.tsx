import Link from 'next/link';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800">
      <Toaster position="top-right" richColors />
      
      {/* Sidebar - Clean Style */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col sticky top-0 h-screen z-10 shadow-sm">
        <div className="p-6 border-b border-slate-50 flex items-center space-x-3">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-100">
            GB
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tighter">Admin.CH</h2>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">St. Yohanes Rasul</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
            <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 mt-4">Menu Utama</p>
            
            <Link href="/admin/dashboard" className="flex items-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 mr-3 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
            </Link>
            
            <Link href="/admin/kegiatan" className="flex items-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 mr-3 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Galeri Kegiatan
            </Link>
            
            <Link href="/admin/jadwal" className="flex items-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 mr-3 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Jadwal Misa
            </Link>
 
             <div className="pt-6 mt-6 border-t border-slate-50">
                <Link href="/" target="_blank" className="flex items-center px-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all group uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Lihat Website
                </Link>
             </div>
        </nav>
        
        <div className="p-4 border-t border-slate-50">
            <div className="flex items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                 <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs">A</div>
                 <div className="ml-3">
                     <p className="text-sm font-black text-slate-900 leading-tight">Admin</p>
                     <p className="text-[10px] text-indigo-500 font-bold">Administrator</p>
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

