'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Kegiatan } from '@/types';
import { toast } from 'sonner';

export default function EditKegiatan() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const supabase = createClient() as any;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);


  useEffect(() => {
    const fetchKegiatan = async () => {
      const { data, error } = await supabase
        .from('kegiatan')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        toast.error(error.message);
      } else if (data) {
        const k = data as Kegiatan;
        setJudul(k.judul);
        setDeskripsi(k.deskripsi);
        setTanggal(k.tanggal);
        setThumbnailUrl(k.thumbnail_url);
      }
      setLoading(false);
    };

    if (id) fetchKegiatan();
  }, [id]);

  const handleUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('kegiatan')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('kegiatan').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalThumbnailUrl = thumbnailUrl;

      if (newThumbnail) {
        finalThumbnailUrl = await handleUpload(newThumbnail);
      }

      const { error: updateError } = await supabase
        .from('kegiatan')
        .update({
            judul,
            deskripsi,
            tanggal,
            thumbnail_url: finalThumbnailUrl
        } as any)
        .eq('id', id);

      if (updateError) throw updateError;

      toast.success('Perubahan berhasil disimpan!');
      router.push('/admin/kegiatan');
      router.refresh();
      
    } catch (err: any) {
      toast.error('Gagal menyimpan perubahan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
      <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Kegiatan</h1>
            <p className="text-gray-500 mt-1">Update informasi kegiatan yang sudah ada.</p>
          </div>
          <Link href="/admin/kegiatan" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            &larr; Kembali
          </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Info */}
            <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Informasi Dasar</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul Kegiatan</label>
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
                    </div>
                 </div>
            </div>

             {/* Description */}
             <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Detail</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    required
                    rows={6}
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                  />
                </div>
            </div>

            {/* Media */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Media</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Saat Ini</label>
                  {thumbnailUrl && (
                      <div className="relative h-48 w-full md:w-80 rounded-xl overflow-hidden mb-4 border border-gray-200">
                          <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                  )}
                  
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-6">Ganti Thumbnail (Opsional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewThumbnail(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border border-gray-200 rounded-xl"
                  />
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-end space-x-3">
                <Link href="/admin/kegiatan" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
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
