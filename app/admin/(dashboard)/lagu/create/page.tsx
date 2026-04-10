'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { convertToWebP } from '@/lib/imageCompression';

export default function CreateLagu() {
  const router = useRouter();
  const supabase = createClient();

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('misa');
  const [lirik, setLirik] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    // Convert images to WebP before uploading
    const isImage = file.type.startsWith('image/');
    const finalFile = isImage ? await convertToWebP(file) : file;

    const ext = finalFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('lagu').upload(filePath, finalFile);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('lagu').getPublicUrl(filePath);
    return { url: data.publicUrl, type: file.type.includes('pdf') ? 'pdf' : file.type.startsWith('image/') ? 'image' : 'docx' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalUrl = null;
      let finalType = 'text';

      if (file) {
        const { url, type } = await uploadFile(file);
        finalUrl = url;
        finalType = type;
      } else if (!lirik) {
        throw new Error('Pilih file dokumen atau isi lirik lagu.');
      }

      const { error } = await supabase.from('lagu').insert([
        {
          judul,
          kategori,
          lirik: lirik || null,
          file_url: finalUrl,
          file_type: finalType,
        },
      ]);
      if (error) throw error;
      toast.success('Lagu berhasil ditambahkan');
      router.push('/admin/lagu');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      toast.error('Gagal menambahkan lagu: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Lagu Baru</h1>
          <p className="text-gray-500 mt-1">Upload partitur atau isi lirik lagu.</p>
        </div>
        <Link href="/admin/lagu" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Kembali
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Lagu</label>
          <input
            type="text"
            required
            value={judul}
            onChange={e => setJudul(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            placeholder="Contoh: Kami Menghadap Altar-Mu"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select
            value={kategori}
            onChange={e => setKategori(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
          >
            <option value="misa">Misa</option>
            <option value="pujian">Pujian</option>
            <option value="komuni">Komuni</option>
            <option value="penutup">Penutup</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload File (PDF, Image, DOCX) - Opsional</label>
          <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all" />
          <p className="text-xs text-gray-400 mt-2">Format disarankan: PDF untuk partitur. Gambar (JPG/PNG) otomatis dikonversi ke WebP.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lirik Lagu (Opsional)</label>
          <textarea
            rows={8}
            value={lirik}
            onChange={e => setLirik(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            placeholder="Ketik lirik lagu di sini..."
          />
        </div>
        
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
          <Link href="/admin/lagu" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-200">
            {loading ? 'Menyimpan...' : 'Simpan Lagu'}
          </button>
        </div>
      </form>
    </div>
  );
}
