"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  value: string;
  accent: string;
}

export default function CopyButton({ value, accent }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: silent fail
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Salin nomor rekening"
      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all ${
        copied
          ? "bg-green-50 border-green-200 text-green-600"
          : `bg-white border-slate-200 ${accent} hover:border-current`
      }`}
    >
      {copied ? (
        <>
          <Check size={13} />
          Disalin
        </>
      ) : (
        <>
          <Copy size={13} />
          Salin
        </>
      )}
    </button>
  );
}
