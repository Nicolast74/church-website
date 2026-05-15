import { supabasePublic } from '@/lib/supabasePublic';
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { Jadwal } from "@/types";

export const revalidate = 60;

export default async function JadwalPage() {
  const supabase = supabasePublic;
  const today = new Date().toISOString().split('T')[0];
  
  const { data } = await supabase
    .from('jadwal')
    .select('*')
    .gte('tanggal', today)
    .order('tanggal', { ascending: true });

  const schedules = (data as Jadwal[] | null) || [];

  // Static data for routine schedules (kept as general info)
  const ibadahRutin = [
    {
      day: "Minggu",
      schedules: [
        { title: "Misa Minggu Pagi", time: "08:00", location: "St. Agustinus" },
        { title: "Misa Minggu Sore", time: "17:00", location: "St. Yohanes" },
      ],
    },
    {
      day: "Senin-Sabtu",
      schedules: [
        { title: "Misa Harian", time: "06:00", location: "St. Agustinus" },
      ],
    },
  ];

  return (
    <main>
      <Section>
        <PageHeader title="Jadwal Ibadah & Kegiatan" />

        <div className="max-w-4xl mx-auto">
          {/* Dynamic Schedules Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-slate-200 mb-8">
              Jadwal Mendatang
            </h2>
            
            {schedules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {schedules.map((item) => (
                  <Card key={item.id} isUpcoming={item.tanggal === today}>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200">
                      {item.nama_kegiatan}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 mt-2 font-medium">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </p>
                    <div className="mt-2 flex items-center text-gray-500 dark:text-slate-400">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {item.jam}
                    </div>
                    <div className="mt-1 flex items-center text-gray-500 dark:text-slate-400">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {item.lokasi}
                    </div>
                    {item.deskripsi && (
                        <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm border-t pt-2 border-gray-100 dark:border-slate-700">
                            {item.deskripsi}
                        </p>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <p className="text-gray-500 dark:text-slate-400">
                  Belum ada jadwal khusus yang akan datang.
                </p>
              </div>
            )}
          </div>

          <Section isGray className="rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-slate-200 mb-8">
              Jadwal Rutin (Umum)
            </h2>
            <div className="space-y-10">
              {ibadahRutin.map((item, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-semibold text-gray-700 dark:text-slate-300 mb-4 border-b-2 border-gray-200 dark:border-slate-700 pb-2">
                    {item.day}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {item.schedules.map((schedule, sIndex) => (
                      <Card key={sIndex} isUpcoming={false}>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-slate-200">
                          {schedule.title}
                        </h4>
                        <p className="text-gray-600 dark:text-slate-400 mt-2 text-lg">
                          {schedule.time}
                        </p>
                        <p className="text-gray-500 dark:text-slate-500 mt-1">
                          {schedule.location}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </Section>
    </main>
  );
}