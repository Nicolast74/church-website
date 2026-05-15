'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

const KATEGORI_OPTIONS = [
  { value: 'umum', label: 'Umum' },
  { value: 'liturgi', label: 'Liturgi' },
  { value: 'kegiatan', label: 'Kegiatan' },
];

export default function CreatePengumuman() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState('umum');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('pengumuman').insert([{
        judul,
        isi,
        kategori,
        tanggal_mulai: tanggalMulai,
        tanggal_selesai: tanggalSelesai || null,
      }]);

      if (error) throw error;

      toast.success('Pengumuman berhasil ditambahkan!');

      // Trigger Push Notification
      try {
        await fetch('/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Pengumuman Baru',
            body: `Ada pengumuman baru: ${judul}`,
            url: '/pengumuman',
          }),
        });
      } catch (err) {
        console.error('Failed to send push notification:', err);
      }

      router.push('/admin/pengumuman');
      router.refresh();
    } catch (err: unknown) {
      toast.error('Gagal menambahkan: ' + (err instanceof Error ? err.message : 'Terjadi kesalahan'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Pengumuman</h1>
          <p className="text-gray-500 mt-1">Buat warta baru untuk ditampilkan di halaman publik.</p>
        </div>
        <Link href="/admin/pengumuman" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Kembali
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Info Utama */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Informasi Utama</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Pengumuman</label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="Contoh: Perubahan Jadwal Misa Paskah"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white"
                >
                  {KATEGORI_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
                <input
                  type="date"
                  required
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Selesai <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="date"
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                  min={tanggalMulai}
                  className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                />
                <p className="mt-1 text-xs text-gray-400 italic">Kosongkan jika pengumuman berlaku terus-menerus.</p>
              </div>
            </div>
          </div>

          {/* Isi */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Isi Pengumuman</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konten</label>
              <textarea
                required
                rows={10}
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                placeholder="Tuliskan isi pengumuman di sini..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-end space-x-3">
            <Link href="/admin/pengumuman" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all"
            >
              {loading ? 'Menyimpan...' : 'Simpan Pengumuman'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
