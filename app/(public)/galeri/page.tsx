import { createClient } from '@/lib/supabaseServer';
import GalleryCard from "@/components/galeri/GalleryCard";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Link from "next/link";
import { Kegiatan } from '@/types';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Galeri() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('kegiatan')
    .select('*')
    .order('tanggal', { ascending: false });
    
  const activities = (data as Kegiatan[] | null);

  return (
    <main>
      <Section>
        <PageHeader title="Galeri Kegiatan" subtitle="Momen-momen kebersamaan di Lingkungan St. Yohanes Girisekar" />

        {activities && activities.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {activities.map((activity) => (
              <Link href={`/galeri/${activity.id}`} key={activity.id}>
                <GalleryCard
                  imageUrl={activity.thumbnail_url || 'https://picsum.photos/seed/default/500/500'}
                  caption={activity.judul}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-700">Galeri Masih Kosong</h3>
            <p className="mt-2 text-gray-500">
              Belum ada foto kegiatan yang diunggah. Silakan kembali lagi nanti.
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}