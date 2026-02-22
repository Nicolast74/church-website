import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

export default function Bacaan() {
  return (
    <Section>
      <PageHeader 
        title="Bacaan & Renungan" 
        subtitle="Sumber inspirasi harian dari Kalender Liturgi dan Bacaan Ibadah."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:border-amber-600 transition-colors">
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">Bacaan Harian</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Renungan dan bacaan Injil harian sesuai dengan Kalender Liturgi Gereja Katolik.
            </p>
            <Link href="/bacaan/harian" className="inline-block text-center w-full px-6 py-3 border border-amber-600 text-amber-700 font-semibold rounded-full hover:bg-amber-600 hover:text-white transition-all">
              Lihat Bacaan Harian
            </Link>
          </div>
        </Card>

        <Card className="hover:border-amber-600 transition-colors">
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">Bacaan Ibadah Minggu</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Kumpulan bacaan pertama, kedua, dan Injil untuk persiapan Ekaristi hari Minggu dan Hari Raya.
            </p>
            <Link href="/bacaan/ibadah" className="inline-block text-center w-full px-6 py-3 border border-amber-600 text-amber-700 font-semibold rounded-full hover:bg-amber-600 hover:text-white transition-all">
              Lihat Bacaan Ibadah
            </Link>
          </div>
        </Card>
      </div>
    </Section>
  );
}