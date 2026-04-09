import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

async function getLagu(id: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  );

  const { data, error } = await supabase
    .from('lagu')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
}

export default async function LaguDetailPage({ params }: { params: { id: string } }) {
  const lagu = await getLagu(params.id);

  if (!lagu) {
    notFound();
  }

  return (
    <div className="bg-[#f9f6ee] dark:bg-[#1c1917] min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/lagu" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-indigo-600 dark:hover:text-amber-400 mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Library
        </Link>
        
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-bold rounded-lg uppercase tracking-widest mb-4">
            Lagu {lagu.kategori.replace('_', ' ')}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 dark:text-white">
            {lagu.judul}
          </h1>
        </div>

        {/* File Viewer Section */}
        {lagu.file_url ? (
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-4 shadow-xl border border-stone-100 dark:border-stone-700 mb-12 overflow-hidden">
            {lagu.file_type === 'pdf' ? (
              <iframe 
                src={`${lagu.file_url}#toolbar=0`} 
                className="w-full h-[80vh] rounded-2xl border border-stone-200 dark:border-stone-600"
                title={lagu.judul}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : lagu.file_type === 'image' ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={lagu.file_url} 
                  alt={lagu.judul} 
                  className="w-full h-auto rounded-2xl"
                />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-stone-600 dark:text-stone-300 mb-6">File dokumen tersedia dalam format yang tidak dapat di-preview langsung.</p>
                <a 
                  href={lagu.file_url} 
                  download 
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Download Dokumen
                </a>
              </div>
            )}
          </div>
        ) : null}

        {/* Lyrics Section */}
        {lagu.lirik ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-stone-800 rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 dark:border-stone-700">
            <h3 className="text-2xl font-serif font-medium text-stone-900 dark:text-white mb-8 text-center">Lirik</h3>
            <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-stone-700 dark:text-stone-300 text-center">
              {lagu.lirik}
            </div>
          </div>
        ) : null}

        {!lagu.file_url && !lagu.lirik && (
           <div className="text-center py-20 bg-white/50 dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-700">
            <p className="text-stone-500 dark:text-stone-400">Konten lagu belum tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
