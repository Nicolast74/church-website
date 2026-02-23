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
        <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-8 border-slate-100 ring-2 ring-indigo-600/10">
          <div className="absolute top-0 right-0 p-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          </div>
          <div className="mb-6 w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-500">
            <Quote size={28} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Renungan Harian</h2>
          <p className="text-gray-500 mb-10 leading-relaxed grow">
            Sapaan rohani harian yang ditulis khusus untuk umat Wilayah Bonaventura Panggang.
          </p>
          <Link href="/renungan" className="inline-flex items-center justify-center px-6 py-4 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all w-full shadow-lg shadow-indigo-100 border-none">
            Baca Renungan
          </Link>
        </Card>

        {/* Bacaan Harian */}
        <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-8 border-slate-100">
          <div className="mb-6 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-500">
            <Calendar size={28} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Bacaan Harian</h2>
          <p className="text-gray-500 mb-10 leading-relaxed grow">
            Renungan dan bacaan Injil harian sesuai dengan Kalender Liturgi Gereja Katolik.
          </p>
          <Link href="/bacaan/harian" className="inline-flex items-center justify-center px-6 py-4 bg-white border-2 border-slate-100 text-slate-700 font-black text-sm uppercase tracking-widest rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all w-full">
            Lihat Bacaan
          </Link>
        </Card>

        {/* Bacaan Ibadah */}
        <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-8 border-slate-100">
          <div className="mb-6 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-500">
            <BookOpen size={28} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Bacaan Ibadah</h2>
          <p className="text-gray-500 mb-10 leading-relaxed grow">
            Kumpulan bacaan untuk persiapan Ekaristi hari Minggu dan Hari Raya Gereja.
          </p>
          <Link href="/bacaan/ibadah" className="inline-block text-center px-6 py-4 bg-white border-2 border-slate-100 text-slate-700 font-black text-sm uppercase tracking-widest rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all w-full">
            Buka Arsip
          </Link>
        </Card>
      </div>
    </Section>
  );
}