import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import SearchableLaguList from './SearchableLaguList';

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
  const laguList = await getLagu() || [];

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

        <SearchableLaguList initialLagus={laguList} />
      </div>
    </div>
  );
}
