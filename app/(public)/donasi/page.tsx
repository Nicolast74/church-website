import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { Heart, Building2, QrCode, Info } from "lucide-react";
import CopyButton from "@/components/donasi/CopyButton";

export const metadata = {
  title: "Donasi | St. Yohanes Rasul Girisekar",
  description:
    "Dukung pelayanan dan karya Lingkungan St. Yohanes Rasul Girisekar melalui donasi Anda.",
};

const accounts = [
  {
    label: "Lingkungan St. Yohanes Rasul",
    bank: "Bank [Nama Bank]",
    number: "000-000-000000",
    holder: "LINGKUNGAN ST. YOHANES RASUL",
    color: "border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/30",
    accent: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300",
  },
  {
    label: "Taman Doa Bintang Samudra",
    bank: "Bank [Nama Bank]",
    number: "000-000-000000",
    holder: "TAMAN DOA BINTANG SAMUDRA",
    color: "border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/30",
    accent: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
  },
];

const steps = [
  "Pilih rekening tujuan sesuai peruntukan donasi.",
  "Transfer sejumlah yang Anda inginkan.",
  "Simpan bukti transfer Anda.",
  "Jika perlu konfirmasi, hubungi pengurus melalui halaman Kontak.",
];

export default function DonasiPage() {
  return (
    <main>
      <Section>
        <PageHeader
          title="Donasi"
          subtitle="Setiap kebaikan yang Anda berikan adalah bagian dari karya Allah di tengah komunitas kita."
        />

        {/* Placeholder notice */}
        <div className="max-w-2xl mx-auto mb-10 flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-4 text-sm text-amber-800 dark:text-amber-300">
          <Info size={16} className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-400" />
          <p>
            Informasi rekening sedang dalam proses konfirmasi dari pengurus.
            Data akan diperbarui segera.{" "}
            <span className="font-semibold">Harap periksa kembali halaman ini dalam waktu dekat.</span>
          </p>
        </div>

        {/* Bank Account Cards */}
        <div className="max-w-2xl mx-auto space-y-5 mb-14">
          {accounts.map((acc) => (
            <div key={acc.label} className={`rounded-2xl border ${acc.color} p-6`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${acc.badge}`}>
                    <Building2 size={11} />
                    {acc.label}
                  </span>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{acc.bank}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-widest mt-1 font-mono">
                    {acc.number}
                  </p>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-1">{acc.holder}</p>
                </div>
                <CopyButton value={acc.number} accent={acc.accent} />
              </div>
            </div>
          ))}
        </div>

        {/* QRIS Placeholder */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-8 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-sm">
              <QrCode size={28} className="text-slate-400 dark:text-slate-500" />
            </div>
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">QRIS</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Kode QRIS akan ditampilkan di sini setelah tersedia.
              </p>
            </div>
          </div>
        </div>

        {/* How to donate */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center">
                <Heart size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Cara Berdonasi</h2>
            </div>
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-50 dark:border-slate-700 pt-4">
              Terima kasih atas kepercayaan dan dukungan Anda. Berkah Dalem.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
