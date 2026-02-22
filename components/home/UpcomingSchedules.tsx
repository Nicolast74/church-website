import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import { Jadwal } from '@/types';
import { Clock } from 'lucide-react';

interface UpcomingSchedulesProps {
  schedules: Jadwal[];
}

export default function UpcomingSchedules({ schedules }: UpcomingSchedulesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(schedules?.length ? schedules : Array(3).fill(null)).map((item, i) => (
        <div key={i} className="group p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Clock size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
            {item?.nama_kegiatan || (i === 0 ? "Misa Minggu" : "Misa Harian")}
          </h3>
          <p className="text-indigo-600 font-bold text-sm mb-6 uppercase tracking-widest">
            {item ? new Date(item.tanggal).toLocaleDateString('id-ID', { weekday: 'long' }) : "Setiap Hari"}
          </p>
          <div className="inline-block px-4 py-2 bg-slate-50 rounded-xl text-xs font-black text-slate-600 uppercase">
            Pukul {item?.jam || "08:00"}
          </div>
        </div>
      ))}
    </div>
  );
}