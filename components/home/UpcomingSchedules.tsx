import { Jadwal } from '@/types';
import { Clock } from 'lucide-react';

interface UpcomingSchedulesProps {
  schedules: Jadwal[];
}

export default function UpcomingSchedules({ schedules }: UpcomingSchedulesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {(schedules?.length ? schedules : Array(3).fill(null)).map((item, i) => (
        <div key={i} className="group p-6 md:p-10 bg-white dark:bg-stone-800 rounded-4xl border border-stone-100 dark:border-stone-700 hover:border-amber-200 dark:hover:border-amber-900/50 hover:shadow-xl hover:shadow-stone-200/40 dark:hover:shadow-black/20 transition-all duration-700">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-stone-50 dark:bg-stone-700 text-stone-400 dark:text-stone-500 rounded-2xl flex items-center justify-center mb-6 md:mb-10 group-hover:bg-amber-700 group-hover:text-white transition-all duration-500">
            <Clock size={20} className="md:w-6 md:h-6" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-medium text-stone-950 dark:text-stone-50 mb-3 tracking-tight">
            {item?.nama_kegiatan || (i === 0 ? "Misa Minggu" : "Misa Harian")}
          </h3>
          <p className="text-amber-700 dark:text-amber-400 font-bold text-[10px] md:text-[11px] mb-6 md:mb-8 uppercase tracking-[0.2em]">
            {item ? new Date(item.tanggal).toLocaleDateString('id-ID', { weekday: 'long' }) : "Setiap Hari"}
          </p>
          <div className="inline-block px-4 py-2 md:px-5 md:py-2.5 bg-stone-100 dark:bg-stone-700 rounded-xl text-[10px] md:text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-widest leading-none">
            Pukul {item?.jam || "08:00"}
          </div>
        </div>
      ))}
    </div>
  );
}