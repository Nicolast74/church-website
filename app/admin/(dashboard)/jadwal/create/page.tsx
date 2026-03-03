'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateJadwal() {
  const router = useRouter();
  const supabase = createClient() as any;
  
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('jadwal')
        .insert([
          {
            nama_kegiatan: namaKegiatan,
            tanggal,
            jam,
            lokasi,
            deskripsi: deskripsi || null,
          },
        ] as any);

      if (insertError) throw insertError;

      // Trigger Push Notification
      try {
        await fetch('/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Jadwal Baru',
            body: `Jadwal baru ditambahkan: ${namaKegiatan}`,
            url: '/jadwal',
          }),
        });
      } catch (err) {
        console.error('Failed to send push notification:', err);
      }

      router.push('/admin/jadwal');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Tambah Jadwal Baru</h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Kegiatan</label>
          <input
            type="text"
            required
            value={namaKegiatan}
            onChange={(e) => setNamaKegiatan(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700">Tanggal</label>
            <input
                type="date"
                required
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Jam (ex: 08:00 WIB)</label>
            <input
                type="text"
                required
                value={jam}
                onChange={(e) => setJam(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lokasi</label>
          <input
            type="text"
            required
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
          <textarea
            rows={3}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Link href="/admin/jadwal" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Jadwal'}
          </button>
        </div>
      </form>
    </div>
  );
}
