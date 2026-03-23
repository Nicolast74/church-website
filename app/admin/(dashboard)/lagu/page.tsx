'use client';

import { createClient } from '@/lib/supabaseClient';
import { Lagu } from '@/types';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

export default function LaguList() {
  const [laguList, setLaguList] = useState<Lagu[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const supabase = createClient();

  const fetchLagu = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('lagu')
      .select('*')
      .order('judul', { ascending: true });
    
    if (error) console.error('Gagal fetch lagu:', error.message);

    if (data) {
        setLaguList(data as Lagu[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    let ignore = false;
    
    const initFetch = async () => {
      // Avoids the strict linter warning about synchronous setState from within useEffect
      if (!ignore) {
        await fetchLagu();
      }
    };
    initFetch();

    return () => {
      ignore = true;
    };
  }, [fetchLagu]);

  const handleDelete = async (item: Lagu) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus lagu ini? File dokumen juga akan dihapus.')) return;

    if (item.file_url) {
      try {
          const urlObj = new URL(item.file_url);
          const pathSegments = urlObj.pathname.split('/');
          const fileName = pathSegments[pathSegments.length - 1];

          if (fileName) {
              await supabase.storage.from('lagu').remove([fileName]);
          }
      } catch (e) {
          console.warn('Could not extract or delete file. It might be an external URL or invalid URL.', e);
      }
    }

    const { error } = await supabase.from('lagu').delete().eq('id', item.id);
    if (!error) {
      fetchLagu();
    } else {
      alert('Gagal menghapus lagu: ' + error.message);
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
            <h1 className="text-3xl font-bold text-gray-900">Library Lagu</h1>
            <p className="text-gray-500 mt-1">Kelola arsip lagu gereja, partitur, dan lirik.</p>
        </div>
        <Link href="/admin/lagu/create" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Lagu
        </Link>
      </div>

      <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan judul, kategori, atau tipe file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
          />
      </div>

      <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Informasi Lagu
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kategori & Format
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {laguList.filter(lagu => 
                      lagu.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      lagu.kategori.toLowerCase().replace('_', ' ').includes(searchQuery.toLowerCase()) ||
                      lagu.file_type.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-12 text-center">
                                <div className="mx-auto h-24 w-24 text-gray-200 mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {searchQuery ? 'Tidak ada lagu yang sesuai pencarian' : 'Belum ada lagu'}
                                </h3>
                                {!searchQuery && (
                                  <>
                                    <p className="text-gray-500 mt-1 mb-6">Mulai dengan menambahkan partitur atau lirik lagu gereja.</p>
                                    <Link href="/admin/lagu/create" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                        + Tambah Lagu
                                    </Link>
                                  </>
                                )}
                            </td>
                        </tr>
                    ) : (
                        laguList.filter(lagu => 
                          lagu.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lagu.kategori.toLowerCase().replace('_', ' ').includes(searchQuery.toLowerCase()) ||
                          lagu.file_type.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{item.judul}</div>
                                    <div className="text-xs text-gray-500 flex items-center mt-1">
                                        Diunggah: {new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    {item.lirik && (
                                        <div className="text-xs text-indigo-500 mt-1">Lirik Tersedia ✓</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col space-y-2">
                                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 w-fit capitalize">
                                            {item.kategori}
                                        </span>
                                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 w-fit">
                                            {item.file_type.toUpperCase()}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        {item.file_url ? (
                                          <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Lihat Dokumen">
                                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                              </svg>
                                          </a>
                                        ) : (
                                          <div className="w-9"></div>
                                        )}
                                        <Link href={`/admin/lagu/${item.id}/edit`} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleDelete(item)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
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
