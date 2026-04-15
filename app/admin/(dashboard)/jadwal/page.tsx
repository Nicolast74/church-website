'use client';

import { createClient } from '@/lib/supabaseClient';
import { Jadwal } from '@/types';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function JadwalList() {
  const [schedules, setSchedules] = useState<Jadwal[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  const fetchSchedules = useCallback(async () => {
    const { data } = await supabase
      .from('jadwal')
      .select('*')
      .order('tanggal', { ascending: true });

    if (data) {
        setSchedules(data as Jadwal[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSchedules();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchSchedules]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) return;

    setLoading(true);
    const { error: deleteError } = await supabase.from('jadwal').delete().eq('id', id);
    if (!deleteError) {
      alert('Jadwal berhasil dihapus');
      fetchSchedules();
    } else {
      alert('Gagal menghapus jadwal: ' + deleteError.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Jadwal / Agenda</h1>
        <Link href="/admin/jadwal/create" className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
          + Tambah Jadwal
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kegiatan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Waktu & Lokasi
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {schedules.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-12 text-center">
                                <div className="mx-auto h-24 w-24 text-gray-200 mb-4 flex items-center justify-center">
                                     <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Belum ada jadwal</h3>
                                <p className="text-gray-500 mt-1 mb-6">Tambahkan jadwal misa atau kegiatan baru.</p>
                                <Link href="/admin/jadwal/create" className="text-amber-600 hover:text-amber-700 font-medium">
                                    + Tambah Jadwal
                                </Link>
                            </td>
                        </tr>
                    ) : (
                        schedules.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4">
                                     <div className="text-sm font-medium text-gray-900">{item.nama_kegiatan}</div>
                                     {item.deskripsi && <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.deskripsi}</div>}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col space-y-1">
                                         <div className="flex items-center text-sm text-gray-900">
                                            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(item.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {item.jam} WIB
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {item.lokasi}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        <Link href={`/admin/jadwal/${item.id}`} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Edit">
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
