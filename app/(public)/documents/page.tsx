import Link from 'next/link';
import { Search, FileText, Download, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Eksplorasi Dokumen | Gereja St. Agustinus & St. Yohanes',
  description: 'Portal dokumen resmi dan materi katekese gereja.',
};

// Placeholder data since we're using the AI Engine for RAG later
const mockDocuments = [
  { id: 1, title: 'Pedoman Pelayanan Pastoral', category: 'Pedoman', date: '2026-04-10', type: 'PDF' },
  { id: 2, title: 'Teks Misa Minggu Biasa', category: 'Liturgi', date: '2026-05-01', type: 'TXT' },
  { id: 3, title: 'Materi Katekese Pranikah', category: 'Katekese', date: '2026-03-15', type: 'PDF' },
  { id: 4, title: 'Laporan Keuangan Q1 2026', category: 'Laporan', date: '2026-04-05', type: 'PDF' },
  { id: 5, title: 'Surat Gembala Prapaskah', category: 'Surat', date: '2026-02-28', type: 'TXT' },
];

export default function DocumentsPage() {
  return (
    <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 border-b border-stone-800 pb-8">
        <span className="text-amber-500 font-bold text-[11px] tracking-[0.3em] uppercase mb-4 block">
          Pengetahuan
        </span>
        <h1 className="heading-huge text-5xl md:text-7xl mb-6 uppercase">
          Eksplorasi <span className="text-accent-serif">Dokumen</span>
        </h1>
        <p className="text-stone-400 text-lg md:text-xl max-w-2xl font-light">
          Akses berbagai pedoman, teks liturgi, dan materi katekese. Semua dokumen ini menjadi sumber pengetahuan bagi Asisten AI kami.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar / Filter (Placeholder) */}
        <div className="lg:w-1/4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sticky top-24">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-6 border-b border-stone-800 pb-4">
              Pencarian
            </h3>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Cari dokumen..."
                className="w-full bg-stone-950 border border-stone-800 text-white rounded-xl px-4 py-3 pl-11 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <Search className="absolute left-4 top-3.5 text-stone-500" size={18} />
            </div>

            <div className="space-y-4">
              <h4 className="text-stone-400 text-xs font-bold tracking-widest uppercase">Kategori</h4>
              <ul className="space-y-2">
                {['Semua', 'Liturgi', 'Katekese', 'Pedoman', 'Laporan'].map((cat) => (
                  <li key={cat}>
                    <button className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${cat === 'Semua' ? 'bg-amber-600/10 text-amber-500 font-medium' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="lg:w-3/4">
          <div className="grid gap-4">
            {mockDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="bg-stone-900/50 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 md:p-6 transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 group-hover:border-amber-900/50 group-hover:bg-amber-950/20 transition-colors">
                    <FileText className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-500 transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                      <span className="uppercase tracking-wider font-medium">{doc.category}</span>
                      <span className="w-1 h-1 bg-stone-700 rounded-full" />
                      <span>{new Date(doc.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="w-1 h-1 bg-stone-700 rounded-full" />
                      <span className="bg-stone-800 px-2 py-0.5 rounded text-[10px] font-bold text-stone-400">{doc.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex justify-center p-3 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition-colors border border-stone-800">
                    <Download size={18} />
                  </button>
                  <Link 
                    href="#"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-stone-100 hover:bg-white text-stone-950 px-5 py-3 rounded-xl text-sm font-bold transition-colors"
                  >
                    Buka <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
