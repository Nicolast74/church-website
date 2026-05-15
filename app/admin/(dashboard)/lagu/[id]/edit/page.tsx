'use client';

import { createClient } from '@/lib/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Lagu } from '@/types';

export default function EditLagu() {
  const router = useRouter();
  const supabase = createClient();
  const params = useParams();
  const id = params.id as string;

  const [lagu, setLagu] = useState<Lagu | null>(null);
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('misa');
  const [lirik, setLirik] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchLagu = async () => {
      const { data, error } = await supabase.from('lagu').select('*').eq('id', id).single();
      if (error) {
        console.error(error);
        toast.error('Gagal memuat lagu');
        return;
      }
      const laguData = data as Lagu;
      setLagu(laguData);
      setJudul(laguData.judul);
      setKategori(laguData.kategori);
      setLirik(laguData.lirik || '');
    };
    fetchLagu();
  }, [id, supabase]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    const ext = file.name.split('.').pop();
    const fileName = `${Math.random()}.${ext}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('lagu').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('lagu').getPublicUrl(filePath);
    return { url: data.publicUrl, type: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'docx' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    
    try {
      let fileUrl = lagu?.file_url;
      let fileType = lagu?.file_type;
      
      if (file) {
        // delete old file if exists
        try {
          if (lagu?.file_url) {
            const oldUrl = new URL(lagu.file_url);
            const oldPath = oldUrl.pathname.replace(/^.*\/lagu\//, '');
            await supabase.storage.from('lagu').remove([oldPath]);
          }
        } catch (e) {
          console.warn('Could not delete old file', e);
        }
        const uploaded = await uploadFile(file);
        fileUrl = uploaded.url;
        fileType = uploaded.type;
      }

      if (!fileUrl && !lirik) {
        throw new Error('Pilih file dokumen atau isi lirik lagu.');
      }

      const updateData = {
        judul,
        kategori,
        lirik: lirik || null,
        ...(fileUrl ? { file_url: fileUrl } : {}),
        ...(fileType ? { file_type: fileType } : {}),
      };
      
      const { error } = await supabase.from('lagu').update(updateData).eq('id', id);
      if (error) throw error;
      toast.success('Lagu berhasil diperbarui');
      router.push('/admin/lagu');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      toast.error('Gagal memperbarui lagu: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!lagu) return <div className="flex items-center justify-center min-h-50">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Lagu</h1>
          <p className="text-gray-500 mt-1">Perbarui partitur atau lirik lagu.</p>
        </div>
        <Link href="/admin/lagu" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Kembali
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Lagu</label>
          <input type="text" required value={judul} onChange={e => setJudul(e.target.value)} className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select value={kategori} onChange={e => setKategori(e.target.value)} className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none">
            <option value="misa">Misa</option>
            <option value="pujian">Pujian</option>
            <option value="komuni">Komuni</option>
            <option value="penutup">Penutup</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ganti File (kosong untuk tidak mengubah)</label>
          <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all" />
          {lagu.file_url && (
            <p className="text-xs text-gray-500 mt-2">File saat ini: <a href={lagu.file_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Lihat file</a></p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lirik Lagu</label>
          <textarea rows={8} value={lirik} onChange={e => setLirik(e.target.value)} className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" placeholder="Ketik lirik lagu di sini..." />
        </div>
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
          <Link href="/admin/lagu" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Batal</Link>
          <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
