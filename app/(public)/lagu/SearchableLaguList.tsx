'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lagu } from '@/types';

export default function SearchableLaguList({ initialLagus }: { initialLagus: Lagu[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLagus = initialLagus.filter(lagu => 
    lagu.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lagu.kategori.toLowerCase().replace('_', ' ').includes(searchQuery.toLowerCase()) ||
    lagu.file_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by kategori
  const groupedLagu = filteredLagus.reduce((acc, lagu) => {
    const kategori = lagu.kategori || 'lainnya';
    if (!acc[kategori]) acc[kategori] = [];
    acc[kategori].push(lagu);
    return acc;
  }, {} as Record<string, typeof initialLagus>);

  return (
    <>
      <div className="mb-12 max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-stone-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari lagu berdasarkan judul, kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 rounded-full border border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-md text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-amber-500/50 focus:border-indigo-500 dark:focus:border-amber-500 transition-all shadow-sm focus:shadow-md text-lg"
          />
      </div>

      {Object.keys(groupedLagu).length === 0 ? (
        <div className="text-center py-20 bg-white/50 dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-700">
          <p className="text-stone-500 dark:text-stone-400">
            {searchQuery ? 'Tidak ada lagu yang sesuai pencarian' : 'Belum ada lagu yang tersedia.'}
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {(Object.entries(groupedLagu) as [string, Lagu[]][]).map(([kategori, lagus]) => (
            <div key={kategori}>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8 capitalize flex items-center">
                Lagu {kategori.replace('_', ' ')}
                <span className="ml-4 flex-1 h-px bg-stone-200 dark:bg-stone-700"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lagus.map((lagu: Lagu) => (
                  <Link
                    href={`/lagu/${lagu.id}`}
                    key={lagu.id}
                    className="group bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                        {lagu.file_type}
                      </span>
                      {lagu.lirik && (
                        <span className="text-xs font-medium text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-md">
                          Lirik
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-amber-400 transition-colors">
                      {lagu.judul}
                    </h3>
                    <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 dark:text-amber-400">
                      Buka Dokumen
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
