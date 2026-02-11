import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';

interface LocationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ imageSrc, title, description, linkHref }) => {
  return (
    <Card className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Link href={linkHref} legacyBehavior>
        <a className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out">
          Detail
        </a>
      </Link>
    </Card>
  );
};

const ChurchLocationCards: React.FC = () => {
  const locations = [
    {
      imageSrc: "/images/galeri/foto-1.jpg", // Placeholder image
      title: "St. Agustinus Panggang",
      description: "Gereja pusat Wilayah Bonaventura Panggang.",
      linkHref: "/lokasi/st-agustinus",
    },
    {
      imageSrc: "/images/galeri/foto-2.jpg", // Placeholder image
      title: "St. Yohanes Girisekar",
      description: "Gereja lingkungan di Girisekar.",
      linkHref: "/lokasi/st-yohanes",
    },
    {
      imageSrc: "/images/bg/taman-doa.jpg", // Assuming another image exists
      title: "Taman Doa Bintang Samudra",
      description: "Tempat ziarah dan retret yang tenang.",
      linkHref: "/lokasi/taman-doa",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Gereja & Lingkungan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <LocationCard key={index} {...location} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChurchLocationCards;
