'use client';

import { createClient } from '@/lib/supabaseClient';
import { Renungan } from '@/types';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';

export default function RenunganAdminList() {
  const [devotions, setDevotions] = useState<Renungan[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  const fetchDevotions = useCallback(async () => {
    const { data } = await supabase
      .from('renungan')
      .select('*')
      .order('tanggal', { ascending: false });
    
    if (data) {
        setDevotions(data as Renungan[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDevotions();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchDevotions]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus renungan ini?')) return;

    setLoading(true);
    const { error: deleteError } = await supabase.from('renungan').delete().eq('id', id);
    if (!deleteError) {
      toast.success('Renungan berhasil dihapus');
      fetchDevotions();
    } else {
      toast.error('Gagal menghapus renungan: ' + deleteError.message);
      setLoading(false);
    }
  };

  if (loading) return (
      <div className="flex items-center justify-center min-h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Renungan Harian</h1>
            <p className="text-gray-500 mt-1">Kelola sapaan rohani harian untuk umat.</p>
        </div>
        <Link href="/admin/renungan/create" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Renungan
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Judul & Ayat
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {devotions.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-12 text-center">
                                <div className="mx-auto h-24 w-24 text-gray-200 mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Belum ada renungan</h3>
                                <p className="text-gray-500 mt-1 mb-6">Mulai dengan menambahkan renungan baru.</p>
                                <Link href="/admin/renungan/create" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                    + Tambah Renungan
                                </Link>
                            </td>
                        </tr>
                    ) : (
                        devotions.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-indigo-600">
                                            {format(new Date(item.tanggal), 'dd MMM yyyy', { locale: id })}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {format(new Date(item.tanggal), 'EEEE', { locale: id })}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-gray-900 truncate max-w-md">{item.judul}</div>
                                    <div className="text-xs text-gray-500 italic mt-1 truncate max-w-md">{item.ayat_referensi}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        <Link href={`/admin/renungan/${item.id}`} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
