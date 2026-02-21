import React from 'react';
import { LayoutDashboard, Image as ImageIcon, Calendar, LogOut, ChevronRight, User } from 'lucide-react';

export default function GlassDashboard() {
  return (
    // Background Image Utama - Pastikan URL-nya bener!
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1548625361-195fe57724e1?q=80&w=2000')] bg-cover bg-center bg-fixed flex font-sans overflow-hidden">
      
      {/* Dark Overlay biar teks putih lo kebaca, nggak tenggelam di awan */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>

      {/* Sidebar Glassmorphism - Sekarang lebih solid biar navigasi lo kelihatan */}
      <aside className="relative z-10 w-72 m-6 rounded-[2rem] bg-black/20 backdrop-blur-2xl border border-white/10 p-8 flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
            GB
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Admin Panel</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<ImageIcon size={20}/>} label="Galeri Kegiatan" />
          <NavItem icon={<Calendar size={20}/>} label="Jadwal Misa" />
        </nav>

        <div className="pt-6 border-t border-white/10">
          <button className="flex items-center gap-4 w-full px-5 py-4 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all">
            <LogOut size={20} />
            <span className="text-sm font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 p-10 overflow-y-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
            <h1 className="text-4xl font-black text-white tracking-tight">Welcome Back, Admin ✨</h1>
            <p className="text-white/60 text-sm mt-2 font-medium">Manage your community activities with style.</p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-xl hover:bg-white/20 transition-all cursor-pointer">
            <User size={24} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Access List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] ml-4">Quick Access</h3>
            <div className="space-y-4">
              <ActionCard 
                title="Galeri Kegiatan" 
                desc="Update your latest church events and photos." 
                icon={<ImageIcon size={24} className="text-indigo-300" />}
              />
              <ActionCard 
                title="Jadwal Misa" 
                desc="Keep the congregation updated on service hours." 
                icon={<Calendar size={24} className="text-amber-300" />}
              />
            </div>
          </div>

          {/* Info Side Panel */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] ml-4">System Info</h3>
            <div className="bg-gradient-to-b from-white/15 to-transparent backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="bg-indigo-400/20 text-indigo-300 text-[10px] font-black px-3 py-1 rounded-full inline-block mb-4 tracking-tighter">PRO TIP</div>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                Gunakan rasio <b>16:9</b> buat foto galeri biar nggak kepotong pas di-render di landing page.
              </p>
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-indigo-400"></div>
              </div>
              <p className="text-[10px] text-white/20 mt-6 font-mono tracking-widest uppercase">Version 1.0.0-MAX</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components biar nggak berantakan
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${active ? 'bg-white/20 text-white shadow-xl border border-white/10' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}>
      {icon}
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

function ActionCard({ title, desc, icon }: ActionCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-lg p-6 rounded-[2rem] border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-500 cursor-pointer flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-6">
        <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-white text-xl">{title}</h4>
          <p className="text-sm text-white/40 mt-1">{desc}</p>
        </div>
      </div>
      <ChevronRight className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all" size={24} />
    </div>
  );
}