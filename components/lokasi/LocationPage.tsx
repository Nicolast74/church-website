"use client";

import React from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { MapPin, Phone, Mail, Clock, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Schedule {
  title: string;
  details: string;
}

interface LocationPageProps {
  name: string;
  heroImage: string;
  description: React.ReactNode;
  address: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  regularSchedules?: Schedule[];
  specialSchedules?: Schedule[];
  jadwalUrl?: string;
  galeriUrl?: string;
}

const LocationPage: React.FC<LocationPageProps> = ({
  name,
  heroImage,
  description,
  address,
  phone,
  email,
  mapUrl,
  regularSchedules,
  specialSchedules,
  jadwalUrl = '/jadwal',
  galeriUrl = '/galeri',
}) => {
  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="absolute inset-0 bg-linear-to-t from-background via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center text-white px-4 pb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-serif font-bold tracking-tight sm:text-5xl md:text-7xl drop-shadow-lg"
          >
            {name}
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <Section noPaddingTop className="relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] p-8 md:p-14 -mt-20 relative z-30 border-t-4 border-indigo-600 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Description */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">Tentang Kami</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 leading-relaxed font-light">
                  {description}
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-1 border-l border-border/50 pl-0 lg:pl-10 space-y-8">
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Alamat
                  </h3>
                  <p className="text-foreground/70 leading-relaxed italic">{address}</p>
                </div>

                {(phone || email) && (
                  <div>
                    <h3 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Hubungi Kami
                    </h3>
                    <div className="space-y-3">
                      {phone && (
                        <p className="flex items-center gap-3 text-foreground/70 group">
                          <span className="p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                            <Phone className="w-3.5 h-3.5" />
                          </span>
                          <a href={`tel:${phone}`} className="hover:text-indigo-600 transition-colors uppercase tracking-tight font-medium text-xs">{phone}</a>
                        </p>
                      )}
                      {email && (
                        <p className="flex items-center gap-3 text-foreground/70 group">
                          <span className="p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                            <Mail className="w-3.5 h-3.5" />
                          </span>
                          <a href={`mailto:${email}`} className="hover:text-indigo-600 transition-colors break-all text-sm font-medium">{email}</a>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Schedules Section */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Regular Schedules */}
            {regularSchedules && regularSchedules.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-8 flex items-center gap-3">
                  <Clock className="text-indigo-600" /> Jadwal Rutin
                </h2>
                <div className="space-y-4">
                  {regularSchedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center p-5 bg-card rounded-xl border border-border/50 hover:border-indigo-500/30 transition-all group">
                      <span className="font-medium text-foreground/80">{schedule.title}</span>
                      <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">{schedule.details}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Special Schedules */}
            {specialSchedules && specialSchedules.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-8 flex items-center gap-3">
                  <Calendar className="text-indigo-600" /> Jadwal Khusus
                </h2>
                <div className="space-y-4">
                  {specialSchedules.map((schedule, index) => (
                    <div key={index} className="p-5 bg-card rounded-xl border border-border/50 border-l-4 border-l-amber-500 hover:shadow-md transition-all">
                      <h4 className="font-bold text-foreground mb-1">{schedule.title}</h4>
                      <p className="text-sm text-foreground/60">{schedule.details}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {mapUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-32 overflow-hidden rounded-3xl border border-border/50 shadow-2xl"
            >
              <div className="p-8 bg-card flex justify-between items-center flex-wrap gap-4 border-b border-border/50">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">Lokasi Peta</h2>
                  <p className="text-foreground/60 text-sm mt-1">Temukan kami melalui petunjuk jalan di bawah ini</p>
                </div>
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                >
                  Buka di Maps <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="aspect-video md:aspect-21/9 w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                <iframe 
                  src={mapUrl.replace('maps.app.goo.gl', 'www.google.com/maps/embed')} // Simplistic attempt, though proper embed URLs are better
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${name}`}
                ></iframe>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="mt-32 mb-20 text-center">
            <h3 className="text-xl font-serif font-medium text-foreground mb-10 italic">Ingin tahu lebih banyak?</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              <Link 
                href={jadwalUrl} 
                className="group relative inline-flex items-center px-10 py-5 bg-indigo-600 text-white text-lg font-bold rounded-full overflow-hidden shadow-xl shadow-indigo-500/20 hover:-translate-y-1 transition-all"
              >
                <span className="relative z-10">Lihat Jadwal Lengkap</span>
                <span className="absolute inset-0 bg-linear-to-r from-indigo-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <Link 
                href={galeriUrl} 
                className="inline-flex items-center px-10 py-5 border-2 border-border text-lg font-bold rounded-full text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all hover:-translate-y-1"
              >
                Explorasi Galeri
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default LocationPage;
