import { Metadata } from 'next';
import Section from '@/components/ui/Section';
import PageHeader from '@/components/ui/PageHeader';
import FadeIn from '@/components/ui/FadeIn';
import { Sparkles, Heart, Users, Target, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profil Lingkungan | Gereja Bonaventura Panggang',
  description: 'Mengenal lebih dekat Wilayah Bonaventura Panggang, visi, misi, dan semangat kebersamaan kami dalam melayani umat.',
};

export default function ProfilPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="bg-[#F8FAFC] py-20 px-4">
        <PageHeader
          title="Profil Lingkungan"
          subtitle="Membangun Iman, Mempererat Kasih, dan Melayani Sesama di Girisekar."
        />
      </div>

      {/* About Section */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6 justify-center">
              <span className="badge-premium">Sejarah & Identitas</span>
            </div>
            <h2 className="heading-huge text-center mb-10 text-4xl!">
              Lingkungan <span className="text-accent-serif">St. Yohanes Rasul</span> Girisekar
            </h2>
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed text-center italic">
              <p>
                Lingkungan St. Yohanes Rasul Girisekar merupakan bagian dari Wilayah St. Agustinus Bonaventura Panggang yang termasuk dalam naungan Paroki St. Yusuf Bandung. 
                Kami adalah komunitas umat Katolik yang dinamis, berkomitmen untuk menumbuhkan iman di tengah masyarakat 
                melalui semangat persaudaraan dan pelayanan yang inklusif.
              </p>
              <p className="mt-6">
                Nama St. Yohanes Rasul diambil dari sosok murid terkasih yang dikenal karena kedalaman spiritualitasnya dan pesan cinta kasih yang radikal—semangat inilah yang menjadi fondasi kami dalam membangun persaudaraan umat yang tulus, hangat, dan penuh pengabdian di tengah masyarakat.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section className="bg-slate-950 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -ml-48 -mb-48" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest">
                  <Target size={14} /> Visi Kita
                </div>
                <h2 className="text-5xl font-black leading-tight">
                  Menjadi komunitas umat yang <span className="text-indigo-500">berakar</span> kuat dalam sabda & <span className="text-indigo-500">berbuat</span> nyata dalam kasih.
                </h2>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pelayanan Kasih</h3>
                    <p className="text-slate-400">Menjangkau sesama dengan kepedulian tulus tanpa membeda-bedakan.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Persaudaraan Umat</h3>
                    <p className="text-slate-400">Menciptakan ruang kolaborasi piritual yang hangat dan inklusif bagi seluruh usia.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Integritas Iman</h3>
                    <p className="text-slate-400">Menjunjung tinggi ajaran gereja dalam setiap aspek kehidupan sehari-hari.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <FadeIn>
              <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Nilai Inti</p>
              <h2 className="text-4xl font-black text-slate-900">Apa yang Kita <span className="text-accent-serif">Yakini</span></h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Kebersamaan",
                desc: "Wilayah adalah keluarga besar yang saling menjaga dan menguatkan.",
                icon: <Users className="w-8 h-8" />
              },
              {
                title: "Keterbukaan",
                desc: "Kami menyambut setiap umat dengan tangan terbuka dan hati yang lapang.",
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                title: "Semangat Pelayanan",
                desc: "Melayani bukan untuk dilayani adalah nafas utama penggerak wilayah kami.",
                icon: <Heart className="w-8 h-8" />
              }
            ].map((value, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {value.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
