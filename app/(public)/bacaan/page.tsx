import { createClient } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Bacaan } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const dynamic = 'force-dynamic'; // ensure fresh data

export default async function BacaanList() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('bacaan')
    .select('*')
    .order('tanggal_publikasi', { ascending: false });
  if (error) {
    console.error(error);
    return <div className="p-8">Gagal memuat bacaan.</div>;
  }
  const bacaanList = data as Bacaan[];
  return (
    <section className="py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bacaan Ibadah</h1>
        {bacaanList.length === 0 ? (
          <p className="text-gray-600">Belum ada bacaan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bacaanList.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.judul}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {format(new Date(item.tanggal_publikasi), 'EEEE, d MMMM yyyy', { locale: id })}
                </p>
                <p className="text-xs text-gray-400 mb-4">{item.kategori.replace('_', ' ')}</p>
                <div className="flex space-x-4">
                  <Link
                    href={`/bacaan/${item.id}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Baca
                  </Link>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}