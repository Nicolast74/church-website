import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Lagu } from '@/types';

export const revalidate = 0; // Don't cache for now, or use ISR

async function getLagu() {
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
    .order('judul', { ascending: true });

  if (error) {
    console.error('Error fetching lagu:', error);
    return [];
  }
  return data;
}

export default async function LaguListPage() {
  const laguList = await getLagu();

  // Group by kategori
  const groupedLagu = laguList.reduce((acc, lagu) => {
    const kategori = lagu.kategori || 'lainnya';
    if (!acc[kategori]) acc[kategori] = [];
    acc[kategori].push(lagu);
    return acc;
  }, {} as Record<string, typeof laguList>);

  return (
    <div className="bg-[#f9f6ee] dark:bg-[#1c1917] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 rounded-full uppercase border border-stone-200 dark:border-stone-700 mb-6">
            Library Lagu
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-stone-900 dark:text-white mb-6">
            Buku <span className="italic font-normal text-amber-900 dark:text-amber-400">Lagu & Partitur</span>
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            Kumpulan lagu gereja, partitur, dan lirik untuk keperluan ibadah dan paduan suara.
          </p>
        </div>

        {Object.keys(groupedLagu).length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-700">
            <p className="text-stone-500 dark:text-stone-400">Belum ada lagu yang tersedia.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {(Object.entries(groupedLagu) as [string, Lagu[]][]).map(([kategori, lagus]) => (
              <div key={kategori}>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8 capitalize flex items-center">
                  Lagu {kategori.replace('_', ' ')}
                  <span className="ml-4 flex-1 h-px bg-stone-200 dark:bg-stone-700"></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lagus.map((lagu: Lagu) => (
                    <Link
                      href={`/lagu/${lagu.id}`}
                      key={lagu.id}
                      className="group bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                          {lagu.file_type}
                        </span>
                        {lagu.lirik && (
                          <span className="text-xs font-medium text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-md">
                            Lirik
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-amber-400 transition-colors">
                        {lagu.judul}
                      </h3>
                      <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 dark:text-amber-400">
                        Buka Dokumen
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
