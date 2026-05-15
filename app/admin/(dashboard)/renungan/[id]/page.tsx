'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Renungan } from '@/types';

export default function EditRenungan() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const supabase = useMemo(() => createClient(), []);
  
  const [judul, setJudul] = useState('');
  const [ayatReferensi, setAyatReferensi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [isi, setIsi] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRenungan = async () => {
      const { data, error } = await supabase
        .from('renungan')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        toast.error('Gagal mengambil data: ' + error.message);
        router.push('/admin/renungan');
      } else if (data) {
        const r = data as Renungan;
        setJudul(r.judul);
        setAyatReferensi(r.ayat_referensi);
        setTanggal(r.tanggal);
        setIsi(r.isi);
      }
      setLoading(false);
    };

    if (id) fetchRenungan();
  }, [id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('renungan')
        .update({
            judul,
            ayat_referensi: ayatReferensi,
            tanggal,
            isi,
        })
        .eq('id', id);

      if (error) {
          if (error.code === '23505') {
              throw new Error('Renungan untuk tanggal ini sudah ada. Silakan pilih tanggal lain.');
          }
          throw error;
      };

      toast.success('Perubahan berhasil disimpan!');
      router.push('/admin/renungan');
      router.refresh();
      
    } catch (err: unknown) {
      toast.error('Gagal menyimpan perubahan: ' + (err instanceof Error ? err.message : 'Terjadi kesalahan'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
      <div className="flex items-center justify-center min-h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Renungan</h1>
            <p className="text-gray-500 mt-1">Update isi sapaan rohani harian.</p>
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
                         <p className="mt-1 text-xs text-gray-400 italic">Hati-hati: mengganti tanggal bisa menyebabkan konflik data jika sudah ada renungan lain di tanggal tersebut.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ayat Referensi</label>
                        <input
                            type="text"
                            required
                            value={ayatReferensi}
                            onChange={(e) => setAyatReferensi(e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
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
                    disabled={saving}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all"
                >
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
