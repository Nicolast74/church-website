'use client';

import { createClient } from '@/lib/supabaseClient';
import { Bacaan } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BacaanList() {
  const [bacaanList, setBacaanList] = useState<Bacaan[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchBacaan = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bacaan')
      .select('*')
      .order('tanggal_publikasi', { ascending: false });
    
    if (data) {
        setBacaanList(data as Bacaan[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBacaan();
  }, []);

  const handleDelete = async (item: Bacaan) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus bacaan ini? File juga akan dihapus.')) return;

    // Delete file from storage first if file_url exists and it's from our storage bucket
    // Assuming file_url might contain the storage path or we can extract it
    // Actually, according to DB structure file_url could just be a string URL. Let's extract path if possible.
    // If we just store filename or path, we can delete it. Supabase storage objects are identified by path.
    // We will handle file deletion in a simple way if we stored just the relative path or if we can parse it from URL.
    try {
        // Find the filename to delete from bucket 'bacaan'. We can guess the path from URL.
        const urlObj = new URL(item.file_url);
        const pathSegments = urlObj.pathname.split('/');
        const fileName = pathSegments[pathSegments.length - 1]; // Assume the last segment is the filename

        if (fileName) {
            await supabase.storage.from('bacaan').remove([fileName]);
        }
    } catch (e) {
        console.warn('Could not extract or delete file. It might be an external URL or invalid URL.', e);
    }

    const { error } = await supabase.from('bacaan').delete().eq('id', item.id);
    if (!error) {
      fetchBacaan();
    } else {
      alert('Gagal menghapus bacaan: ' + error.message);
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
            <h1 className="text-3xl font-bold text-gray-900">Bacaan Ibadah</h1>
            <p className="text-gray-500 mt-1">Kelola pembacaan, renungan, dan doa ibadah.</p>
        </div>
        <Link href="/admin/bacaan/create" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Bacaan
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Informasi Bacaan
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
                    {bacaanList.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-12 text-center">
                                <div className="mx-auto h-24 w-24 text-gray-200 mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Belum ada bacaan</h3>
                                <p className="text-gray-500 mt-1 mb-6">Mulai dengan menambahkan bacaan baru untuk minggu ini.</p>
                                <Link href="/admin/bacaan/create" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                    + Tambah Bacaan
                                </Link>
                            </td>
                        </tr>
                    ) : (
                        bacaanList.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{item.judul}</div>
                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(item.tanggal_publikasi).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    {item.deskripsi && (
                                        <div className="text-xs text-gray-400 mt-1 line-clamp-1">{item.deskripsi}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col space-y-2">
                                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 w-fit">
                                            {item.kategori.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 w-fit">
                                            {item.file_type.toUpperCase()}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Lihat Dokumen">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </a>
                                        <Link href={`/admin/bacaan/${item.id}/edit`} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
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
