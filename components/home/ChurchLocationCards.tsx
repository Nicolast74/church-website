import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';

interface LocationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ imageSrc, title, description, linkHref }) => (
  <div className="w-full bg-white dark:bg-stone-800 rounded-3xl border border-stone-100 dark:border-stone-700 p-4 md:p-6 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)] transition-all duration-500 group">
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl mb-6 md:mb-8">
      <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
    </div>
    <div className="px-1 md:px-2 pb-1 md:pb-2">
      <h3 className="text-xl md:text-2xl font-serif font-medium text-stone-900 dark:text-stone-100 mb-2 md:mb-3">{title}</h3>
      <p className="text-stone-500 dark:text-stone-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed italic">&quot;{description}&quot;</p>
      <Link href={linkHref} className="inline-block w-full py-3.5 md:py-4 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 text-[10px] md:text-[11px] font-bold tracking-[0.2em] rounded-xl hover:bg-stone-900 hover:text-white dark:hover:bg-amber-700 dark:hover:text-white transition-all text-center uppercase">
        Selengkapnya
      </Link>
    </div>
  </div>
);

const ChurchLocationCards: React.FC = () => {
  const locations = [
    {
      imageSrc: "/images/bg/st-yohanes-1.jpg",
      title: "St. Yohanes Girisekar",
      description: "Gereja lingkungan di Girisekar yang melayani umat dengan penuh kasih.",
      linkHref: "/lokasi/st-yohanes",
    },
    {
      imageSrc: "/images/bg/taman-doa-2.jpg",
      title: "Taman Doa Bintang Samudra",
      description: "Tempat ziarah dan retret tenang di tepi samudra yang indah.",
      linkHref: "/lokasi/taman-doa",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {locations.map((location, index) => (
        <FadeIn key={index} direction="up" delay={index * 0.15}>
          <LocationCard {...location} />
        </FadeIn>
      ))}
    </div>
  );
};

export default ChurchLocationCards;