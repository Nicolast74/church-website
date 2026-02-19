import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Selamat datang kembali, Admin.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Actions Panel */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Akses Cepat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/admin/kegiatan" className="flex items-center p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all group">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">Galeri Kegiatan</div>
                        <div className="text-xs text-gray-500">Kelola foto & acara</div>
                    </div>
                </Link>

                <Link href="/admin/jadwal" className="flex items-center p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-amber-200 hover:shadow-sm transition-all group">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mr-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">Jadwal Misa</div>
                        <div className="text-xs text-gray-500">Kelola agenda gereja</div>
                    </div>
                </Link>
            </div>
        </div>

        {/* System Info / Help */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Informasi</h3>
            <div className="space-y-4">
                 <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                         <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-blue-900">Tips Admin</p>
                            <p className="text-xs text-blue-700 mt-1">
                                Pastikan gambar yang diupload untuk galeri memiliki rasio landscape agar tampil optimal.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-400 text-center pt-4">
                    Church Admin v1.0.0
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

