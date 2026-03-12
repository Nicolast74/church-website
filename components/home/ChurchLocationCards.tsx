import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

interface LocationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ imageSrc, title, description, linkHref }) => (
  <div className="w-full bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 p-4 hover:shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_32px_64px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 group">
    <div className="w-full aspect-video overflow-hidden rounded-[2rem] mb-6">
      <img src={imageSrc} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    </div>
    <div className="px-4 pb-4">
      <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 italic">&quot;{description}&quot;</p>
      <Link href={linkHref} className="inline-block w-full py-4 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-[10px] font-black tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all text-center">
        DIREKSI LOKASI
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