"use client";

import { useState } from "react";
import { Calendar, Tag, ChevronDown } from "lucide-react";
import { Pengumuman } from "@/types";

const kategoriConfig: Record<string, { label: string; color: string }> = {
  umum: { label: "Umum", color: "bg-slate-100 text-slate-600" },
  liturgi: { label: "Liturgi", color: "bg-amber-100 text-amber-700" },
  kegiatan: { label: "Kegiatan", color: "bg-indigo-100 text-indigo-700" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PengumumanCard({ item }: { item: Pengumuman }) {
  const [expanded, setExpanded] = useState(false);
  const kat = kategoriConfig[item.kategori] ?? kategoriConfig.umum;

  // Show preview (first ~160 chars) vs full text
  const isLong = item.isi.length > 160;
  const preview = isLong ? item.isi.slice(0, 160).trimEnd() + "…" : item.isi;

  return (
    <article className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${kat.color}`}
            >
              <Tag size={10} />
              {kat.label}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 leading-snug">{item.judul}</h2>
        </div>
      </div>

      {/* Body */}
      <div className="mt-3">
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
          {expanded ? item.isi : preview}
        </p>

        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {expanded ? "Tutup" : "Selengkapnya"}
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
        <Calendar size={12} />
        {formatDate(item.tanggal_mulai)}
        {item.tanggal_selesai && item.tanggal_selesai !== item.tanggal_mulai && (
          <> – {formatDate(item.tanggal_selesai)}</>
        )}
      </div>
    </article>
  );
}
