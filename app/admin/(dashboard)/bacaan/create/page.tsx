'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CreateBacaan() {
  const router = useRouter();
  const supabase = createClient();

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('bacaan_mingguan');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    const ext = file.name.split('.').pop();
    const fileName = `${Math.random()}.${ext}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('bacaan').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('bacaan').getPublicUrl(filePath);
    return { url: data.publicUrl, type: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'doc' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!file) throw new Error('File is required');
      const { url, type } = await uploadFile(file);
      const { error } = await supabase.from('bacaan').insert([
        {
          judul,
          kategori,
          deskripsi,
          tanggal_publikasi: tanggal,
          file_url: url,
          file_type: type,
        },
      ]);
      if (error) throw error;
      toast.success('Bacaan berhasil ditambahkan');
      router.push('/admin/bacaan');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan tidak terduga';
      toast.error('Gagal menambahkan bacaan: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Bacaan Ibadah</h1>
          <p className="text-gray-500 mt-1">Isi formulir di bawah untuk menambahkan bacaan baru.</p>
        </div>
        <Link href="/admin/bacaan" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Kembali
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
          <input
            type="text"
            required
            value={judul}
            onChange={e => setJudul(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            placeholder="Contoh: Bacaan Minggu 12"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select
            value={kategori}
            onChange={e => setKategori(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
          >
            <option value="bacaan_mingguan">Bacaan Mingguan</option>
            <option value="doa_khusus">Doa Khusus</option>
            <option value="surat_pastoral">Surat Pastoral</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Publikasi</label>
          <input
            type="date"
            required
            value={tanggal}
            onChange={e => setTanggal(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (opsional)</label>
          <textarea
            rows={4}
            value={deskripsi}
            onChange={e => setDeskripsi(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
            placeholder="Ringkasan singkat..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">File (PDF, DOCX, JPG, PNG)</label>
          <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all" />
        </div>
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Link href="/admin/bacaan" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Menyimpan...' : 'Simpan Bacaan'}
          </button>
        </div>
      </form>
    </div>
  );
}
