'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CreateRenungan() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  
  const [judul, setJudul] = useState('');
  const [ayatReferensi, setAyatReferensi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [isi, setIsi] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('renungan')
        .insert([
          {
            judul,
            ayat_referensi: ayatReferensi,
            tanggal,
            isi,
          },
        ]);

      if (error) {
          if (error.code === '23505') {
              throw new Error('Renungan untuk tanggal ini sudah ada. Silakan pilih tanggal lain.');
          }
          throw error;
      };

      toast.success('Renungan berhasil ditambahkan!');
      router.push('/admin/renungan');
      router.refresh();
      
    } catch (err: unknown) {
      toast.error('Gagal menambahkan renungan: ' + (err instanceof Error ? err.message : 'Terjadi kesalahan'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Renungan Baru</h1>
            <p className="text-gray-500 mt-1">Tulis sapaan rohani harian untuk umat.</p>
          </div>
          <Link href="/admin/renungan" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            &larr; Kembali
          </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Basic Info Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Informasi Utama</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul Renungan</label>
                        <input
                            type="text"
                            required
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                            placeholder="Contoh: Hidup dalam Kasih"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                        <input
                            type="date"
                            required
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        />
                        <p className="mt-1 text-xs text-gray-400 italic">Satu tanggal hanya boleh memiliki satu renungan.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ayat Referensi</label>
                        <input
                            type="text"
                            required
                            value={ayatReferensi}
                            onChange={(e) => setAyatReferensi(e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                            placeholder="Contoh: Matius 5:1-12"
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Isi Renungan</h3>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Konten</label>
                    <textarea
                        required
                        rows={12}
                        value={isi}
                        onChange={(e) => setIsi(e.target.value)}
                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                        placeholder="Tuliskan isi renungan secara lengkap di sini..."
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-end space-x-3">
                <Link href="/admin/renungan" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all"
                >
                    {loading ? 'Menyimpan...' : 'Simpan Renungan'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
