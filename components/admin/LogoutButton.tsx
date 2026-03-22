'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { useState } from 'react';
import { toast } from 'sonner';

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
       toast.error('Gagal keluar: ' + error.message);
       setLoading(false);
    } else {
       toast.success('Berhasil keluar');
       router.push('/admin/login');
       router.refresh();
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={loading}
      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group"
      title="Keluar"
    >
      <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
    </button>
  );
}
