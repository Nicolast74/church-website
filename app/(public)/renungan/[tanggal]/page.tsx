import { createClient } from '@/lib/supabaseServer';
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { Renungan } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ tanggal: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tanggal } = await params;
  const supabase = await createClient();
  const { data: devotion } = await supabase
    .from('renungan')
    .select('*')
    .eq('tanggal', tanggal)
    .single();

  if (!devotion) {
    return {
      title: 'Renungan Tidak Ditemukan',
    };
  }

  const d = devotion as Renungan;
  const formattedDate = format(new Date(d.tanggal), 'dd MMMM yyyy', { locale: id });
  
  return {
    title: `${d.judul} | Renungan Harian ${formattedDate}`,
    description: d.isi.substring(0, 160),
    openGraph: {
      title: d.judul,
      description: d.isi.substring(0, 160),
      type: 'article',
      publishedTime: d.tanggal,
    },
  };
}

export default async function RenunganDetailPage({ params }: Props) {
  const { tanggal } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('renungan')
    .select('*')
    .eq('tanggal', tanggal)
    .single();

  if (!data) {
    notFound();
  }

  const devotion = data as Renungan;
  const formattedDate = format(new Date(devotion.tanggal), 'EEEE, dd MMMM yyyy', { locale: id });

  return (
    <main>
      <Section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/renungan" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-8 group">
            <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Daftar Renungan
          </Link>

          <article>
            <div className="mb-10 text-center">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full mb-4">
                {formattedDate}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {devotion.judul}
              </h1>
              <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mb-8"></div>
              <p className="text-xl md:text-2xl italic text-gray-600 font-medium">
                &quot;{devotion.ayat_referensi}&quot;
              </p>
            </div>

            <Card className="p-8 md:p-12 shadow-xl border-gray-100 bg-white">
              <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                {devotion.isi.split('\n').map((paragraph, index) => (
                   paragraph.trim() && <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Card>

            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 italic mb-6">
                Semoga renungan hari ini menguatkan iman dan langkah kita sepanjang hari ini. Tuhan memberkati.
              </p>
              <Link href="/renungan" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-indigo-200 transition-all">
                Baca Renungan Lainnya
              </Link>
            </div>
          </article>
        </div>
      </Section>
    </main>
  );
}
