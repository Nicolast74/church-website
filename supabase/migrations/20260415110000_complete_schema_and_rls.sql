-- Migration: Complete schema and RLS policies for missing tables
-- Tables: kegiatan, kegiatan_foto, jadwal, renungan, pengumuman, lagu

------------------------------------------------------------
-- 1. TABLES
------------------------------------------------------------

-- kegiatan
CREATE TABLE IF NOT EXISTS public.kegiatan (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  judul text NOT NULL,
  deskripsi text NOT NULL,
  tanggal date NOT NULL,
  thumbnail_url text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT kegiatan_pkey PRIMARY KEY (id)
);

-- kegiatan_foto
CREATE TABLE IF NOT EXISTS public.kegiatan_foto (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  kegiatan_id uuid NOT NULL,
  foto_url text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT kegiatan_foto_pkey PRIMARY KEY (id),
  CONSTRAINT kegiatan_foto_kegiatan_id_fkey
    FOREIGN KEY (kegiatan_id)
    REFERENCES public.kegiatan (id)
    ON DELETE CASCADE
);

-- jadwal
CREATE TABLE IF NOT EXISTS public.jadwal (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nama_kegiatan text NOT NULL,
  tanggal date NOT NULL,
  jam text NOT NULL,
  lokasi text NOT NULL,
  deskripsi text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT jadwal_pkey PRIMARY KEY (id)
);

-- renungan
CREATE TABLE IF NOT EXISTS public.renungan (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  judul text NOT NULL,
  ayat_referensi text NOT NULL,
  isi text NOT NULL,
  tanggal date UNIQUE NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT renungan_pkey PRIMARY KEY (id)
);

-- pengumuman
CREATE TABLE IF NOT EXISTS public.pengumuman (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  judul text NOT NULL,
  isi text NOT NULL,
  kategori text NOT NULL,
  tanggal_mulai date NOT NULL,
  tanggal_selesai date NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT pengumuman_pkey PRIMARY KEY (id)
);

-- lagu
CREATE TABLE IF NOT EXISTS public.lagu (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  judul text NOT NULL,
  kategori text NOT NULL,
  lirik text NULL,
  file_url text NULL,
  file_type text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT lagu_pkey PRIMARY KEY (id)
);

------------------------------------------------------------
-- 2. INDEXES
------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_kegiatan_tanggal ON public.kegiatan (tanggal DESC);
CREATE INDEX IF NOT EXISTS idx_jadwal_tanggal ON public.jadwal (tanggal ASC);
CREATE INDEX IF NOT EXISTS idx_renungan_tanggal ON public.renungan (tanggal DESC);
CREATE INDEX IF NOT EXISTS idx_lagu_judul ON public.lagu (judul ASC);

------------------------------------------------------------
-- 3. ENABLE RLS
------------------------------------------------------------

ALTER TABLE public.kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kegiatan_foto ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.renungan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lagu ENABLE ROW LEVEL SECURITY;

------------------------------------------------------------
-- 4. POLICIES
------------------------------------------------------------

-- PUBLIC SELECT
DO $$ BEGIN
    CREATE POLICY "Public activities are viewable by everyone" ON public.kegiatan FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Public activity photos are viewable by everyone" ON public.kegiatan_foto FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Public schedules are viewable by everyone" ON public.jadwal FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Public devotions are viewable by everyone" ON public.renungan FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Public announcements are viewable by everyone" ON public.pengumuman FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Public songs are viewable by everyone" ON public.lagu FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ADMIN ACCESS
-- kegiatan
DO $$ BEGIN
    CREATE POLICY "Admins can insert activities" ON public.kegiatan FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can update activities" ON public.kegiatan FOR UPDATE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can delete activities" ON public.kegiatan FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- kegiatan_foto
DO $$ BEGIN
    CREATE POLICY "Admins can insert photos" ON public.kegiatan_foto FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can delete photos" ON public.kegiatan_foto FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- jadwal
DO $$ BEGIN
    CREATE POLICY "Admins can insert schedules" ON public.jadwal FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can update schedules" ON public.jadwal FOR UPDATE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can delete schedules" ON public.jadwal FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- renungan
DO $$ BEGIN
    CREATE POLICY "Admins can insert devotions" ON public.renungan FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can update devotions" ON public.renungan FOR UPDATE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can delete devotions" ON public.renungan FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- pengumuman
DO $$ BEGIN
    CREATE POLICY "Admins can insert announcements" ON public.pengumuman FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can update announcements" ON public.pengumuman FOR UPDATE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can delete announcements" ON public.pengumuman FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- lagu
DO $$ BEGIN
    CREATE POLICY "Admins can insert songs" ON public.lagu FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can update songs" ON public.lagu FOR UPDATE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Admins can delete songs" ON public.lagu FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

------------------------------------------------------------
-- 5. STORAGE BUCKETS
------------------------------------------------------------

-- kegiatan bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('kegiatan', 'kegiatan', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
    CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'kegiatan' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'kegiatan' AND auth.role() = 'authenticated' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'kegiatan' AND auth.role() = 'authenticated' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'kegiatan' AND auth.role() = 'authenticated' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- lagu bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('lagu', 'lagu', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
    CREATE POLICY "Public Access Lagu" ON storage.objects FOR SELECT USING ( bucket_id = 'lagu' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin Insert Lagu" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'lagu' AND auth.role() = 'authenticated' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin Update Lagu" ON storage.objects FOR UPDATE USING ( bucket_id = 'lagu' AND auth.role() = 'authenticated' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin Delete Lagu" ON storage.objects FOR DELETE USING ( bucket_id = 'lagu' AND auth.role() = 'authenticated' );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
