import { createClient } from '@/lib/supabaseServer';
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Renungan } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function RenunganListPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('renungan')
    .select('*')
    .order('tanggal', { ascending: false });
    
  const devotions = (data as Renungan[] | null);

  return (
    <main>
      <Section>
        <PageHeader 
          title="Renungan Harian" 
          subtitle="Sapaan rohani harian untuk pertumbuhan iman kita bersama" 
        />

        {devotions && devotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devotions.map((devotion) => (
              <Link href={`/renungan/${devotion.tanggal}`} key={devotion.id}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">
                      {format(new Date(devotion.tanggal), 'dd MMMM yyyy', { locale: id })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {devotion.judul}
                  </h2>
                  <p className="text-sm italic text-gray-500 mb-4 line-clamp-1">
                    {devotion.ayat_referensi}
                  </p>
                  <p className="text-gray-600 line-clamp-3 flex-grow">
                    {devotion.isi}
                  </p>
                  <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-2xl font-semibold text-gray-500">Renungan Belum Tersedia</h3>
            <p className="mt-2 text-gray-400 max-w-md mx-auto">
              Maaf, saat ini belum ada renungan yang diunggah. Silakan kembali lagi nanti untuk sapaan rohani terbaru.
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
