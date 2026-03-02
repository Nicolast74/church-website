import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { BookOpen, Calendar, Quote } from "lucide-react";

export default function Bacaan() {
  return (
    <Section className="py-12 md:py-24">
      <PageHeader 
        title="Bacaan & Renungan" 
        subtitle="Sumber inspirasi harian dari Kalender Liturgi dan Sapaan Rohani harian."
      />
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Renungan Harian */}
        <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-none ring-1 ring-indigo-600/10">
          <div className="absolute top-0 right-0 p-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          </div>
          <div className="mb-6 w-14 h-14 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500">
            <Quote size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Renungan Harian</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed grow">
            Sapaan rohani harian yang ditulis khusus untuk umat Wilayah Bonaventura Panggang.
          </p>
          <Link href="/renungan" className="inline-flex items-center justify-center px-6 py-4 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all w-full shadow-lg shadow-indigo-600/20 border-none">
            Baca Renungan
          </Link>
        </Card>

        {/* Bacaan Harian */}
        <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-slate-100 dark:border-slate-800">
          <div className="mb-6 w-14 h-14 bg-slate-100/50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100/50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500">
            <Calendar size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Bacaan Harian</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed grow">
            Renungan dan bacaan Injil harian sesuai dengan Kalender Liturgi Gereja Katolik.
          </p>
          <Link href="/bacaan/harian" className="inline-flex items-center justify-center px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-black text-sm uppercase tracking-widest rounded-xl hover:border-indigo-600 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-500 transition-all w-full shadow-sm hover:shadow-md">
            Lihat Bacaan
          </Link>
        </Card>

        {/* Bacaan Ibadah */}
        <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-slate-100 dark:border-slate-800">
          <div className="mb-6 w-14 h-14 bg-slate-100/50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100/50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500">
            <BookOpen size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Bacaan Ibadah</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed grow">
            Kumpulan bacaan untuk persiapan Ekaristi hari Minggu dan Hari Raya Gereja.
          </p>
          <Link href="/bacaan/ibadah" className="inline-block text-center px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-black text-sm uppercase tracking-widest rounded-xl hover:border-indigo-600 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-500 transition-all w-full shadow-sm hover:shadow-md">
            Buka Arsip
          </Link>
        </Card>
      </div>
    </Section>
  );
}