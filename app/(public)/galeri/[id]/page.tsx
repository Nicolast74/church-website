import { createClient } from '@/lib/supabaseServer';
import Section from "@/components/ui/Section";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Kegiatan, KegiatanFoto } from '@/types';
import GalleryGrid from '@/components/galeri/GalleryGrid';

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const id = (await params).id
  
  const supabase = await createClient();
  const { data } = await supabase
    .from('kegiatan')
    .select('judul, deskripsi, thumbnail_url')
    .eq('id', id)
    .single();
    
  const activity = data as Kegiatan | null;

  if (!activity) {
    return {
      title: 'Kegiatan Tidak Ditemukan',
    }
  }

  return {
    title: `${activity.judul} | Gallery Kegiatan`,
    description: activity.deskripsi?.substring(0, 160) || 'Detail kegiatan',
    openGraph: {
      images: activity.thumbnail_url ? [activity.thumbnail_url] : [],
    },
  }
}

export default async function GalleryDetail({ params }: Props) {
  const id = (await params).id;
  const supabase = await createClient();

  const [activityRes, photosRes] = await Promise.all([
    supabase.from('kegiatan').select('*').eq('id', id).single(),
    supabase.from('kegiatan_foto').select('*').eq('kegiatan_id', id)
  ]);

  const activity = activityRes.data as Kegiatan | null;
  const photos = photosRes.data as KegiatanFoto[] | null;

  if (!activity) {
    notFound();
  }

  return (
    <main>
      <Section className="py-20">
        <div className="container mx-auto px-4 lg:px-20">
            <Link href="/galeri" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Galeri
            </Link>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{activity.judul}</h1>
                <p className="text-gray-500 mb-8 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(activity.tanggal).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>

                {activity.thumbnail_url && (
                    <div className="aspect-video w-full overflow-hidden rounded-xl mb-10 shadow-lg relative">
                        <Image 
                            src={activity.thumbnail_url} 
                            alt={activity.judul} 
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none text-gray-700 mb-16">
                    <p className="whitespace-pre-line">{activity.deskripsi}</p>
                </div>

                <GalleryGrid photos={photos || []} activityTitle={activity.judul} />
            </div>
        </div>
      </Section>
    </main>
  );
}
