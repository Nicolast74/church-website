import { Toaster } from 'sonner';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Sidebar } from '@/components/admin/Sidebar';
import { AutoLogout } from '@/components/admin/AutoLogout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex font-sans bg-(--background) text-(--foreground)">
      <Toaster position="top-right" richColors />
      <AutoLogout />
      
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-(--background)">
        {/* Mobile Header */}
        <header className="backdrop-blur-md border-b border-(--card-border) p-4 md:hidden flex justify-between items-center sticky top-0 z-20 transition-colors bg-(--card-bg)">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">GB</div>
            <h1 className="font-bold text-lg text-(--foreground)">Admin Panel</h1>
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

