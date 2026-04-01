'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { convertToWebP } from '@/lib/imageCompression';

export default function CreateKegiatan() {
  const router = useRouter();
  const supabase = createClient();
  
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Preview states
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const raw = e.target.files[0];
      const converted = await convertToWebP(raw);
      setThumbnail(converted);
      setThumbnailPreview(URL.createObjectURL(converted));
    }
  };

  const handleUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('kegiatan')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('kegiatan').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let thumbnailUrl = null;
      if (thumbnail) {
        thumbnailUrl = await handleUpload(thumbnail);
      }

      const { data: kegiatan, error: insertError } = await supabase
        .from('kegiatan')
        .insert([
          {
            judul,
            deskripsi,
            tanggal,
            thumbnail_url: thumbnailUrl,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      if (photos && photos.length > 0 && kegiatan) {
        const uploadPromises = Array.from(photos).map(async (photo) => {
             const converted = await convertToWebP(photo);
             const fileExt = converted.name.split('.').pop();
             const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
             const filePath = `photos/${kegiatan.id}/${fileName}`;
             
             const { error: uploadError } = await supabase.storage
                .from('kegiatan')
                .upload(filePath, converted, { contentType: 'image/webp' });
                
             if (uploadError) throw uploadError;
             
             const { data } = supabase.storage.from('kegiatan').getPublicUrl(filePath);
             return {
                 kegiatan_id: kegiatan.id,
                 foto_url: data.publicUrl
             };
        });

        const photoRecords = await Promise.all(uploadPromises);
        
        const { error: photosError } = await supabase
            .from('kegiatan_foto')
            .insert(photoRecords);
            
        if (photosError) throw photosError;
      }

      toast.success('Kegiatan berhasil ditambahkan!');
      
      // Trigger Push Notification
      try {
        await fetch('/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Kegiatan Baru',
            body: `Ada kegiatan baru: ${judul}`,
            url: `/galeri/${kegiatan.id}`,
          }),
        });
      } catch (err) {
        console.error('Failed to send push notification:', err);
      }

      router.push('/admin/kegiatan');
      router.refresh();
      
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      toast.error('Gagal menambahkan kegiatan: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Kegiatan Baru</h1>
            <p className="text-gray-500 mt-1">Isi formulir di bawah untuk menambahkan kegiatan ke galeri.</p>
          </div>
          <Link href="/admin/kegiatan" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            &larr; Kembali
          </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Basic Info Section */}
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
                            placeholder="Contoh: Misa Natal 2024"
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

            {/* Description Section */}
            <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Detail Kegiatan</h3>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                    <textarea
                        required
                        rows={6}
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                        placeholder="Ceritakan tentang kegiatan ini..."
                    />
                </div>
            </div>

            {/* Media Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Media</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Thumbnail Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail (Poster Utama)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors relative overflow-hidden group">
                            <div className="space-y-1 text-center relative z-10">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="thumbnail-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="thumbnail-upload" name="thumbnail-upload" type="file" className="sr-only" accept="image/*" onChange={handleThumbnailChange} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG (otomatis dikonversi ke WebP)</p>
                            </div>
                            {thumbnailPreview && (
                                <div className="absolute inset-0 bg-white">
                                    {/* eslint-disable-next-line @next/next/no-img-element -- blob: URL from URL.createObjectURL() cannot be optimized by next/image */}
                                    <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Photos Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Foto Dokumentasi (Opsional - Bisa Banyak)</label>
                         <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setPhotos(e.target.files)}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border border-gray-200 rounded-xl"
                        />
                        <p className="mt-2 text-xs text-gray-500">Pilih beberapa foto sekaligus untuk dokumentasi tambahan.</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-end space-x-3">
                <Link href="/admin/kegiatan" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all"
                >
                    {loading ? 'Menyimpan...' : 'Simpan Kegiatan'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
