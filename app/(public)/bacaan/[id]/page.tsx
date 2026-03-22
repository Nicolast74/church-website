import { createClient } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import { Bacaan } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const dynamic = 'force-dynamic'; // ensure fresh data on each request

export default async function BacaanDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('bacaan')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    notFound();
    return null;
  }

  const bacaan = data as Bacaan;

  const renderViewer = () => {
    const { file_url, file_type } = bacaan;
    if (file_type === 'pdf') {
      return (
        <iframe src={file_url} className="w-full h-150 border rounded" />
      );
    }
    if (file_type.startsWith('image')) {
      return <img src={file_url} alt={bacaan.judul} className="max-w-full h-auto rounded" />;
    }
    // For docs, use Google Docs viewer fallback
    return (
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(file_url)}&embedded=true`}
        className="w-full h-150 border rounded"
      />
    );
  };

  return (
    <section className="py-12 md:py-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{bacaan.judul}</h1>
        <p className="text-sm text-gray-500 mb-2">
          {format(new Date(bacaan.tanggal_publikasi), 'EEEE, d MMMM yyyy', { locale: id })}
        </p>
        <p className="text-xs text-gray-400 mb-4 capitalize">{bacaan.kategori.replace('_', ' ')}</p>
        {bacaan.deskripsi && (
          <p className="text-gray-700 mb-6">{bacaan.deskripsi}</p>
        )}
        <div className="mb-6">{renderViewer()}</div>
        <a
          href={bacaan.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Download
        </a>
      </div>
    </section>
  );
}
