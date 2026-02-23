-- Enable required extension (usually already enabled in Supabase)
create extension if not exists "pgcrypto";

------------------------------------------------------------
-- TABLE: kegiatan
------------------------------------------------------------

create table public.kegiatan (
  id uuid not null default gen_random_uuid(),
  judul text not null,
  deskripsi text not null,
  tanggal date not null,
  thumbnail_url text null,
  created_at timestamp with time zone not null default now(),
  constraint kegiatan_pkey primary key (id)
);

------------------------------------------------------------
-- TABLE: kegiatan_foto
------------------------------------------------------------

create table public.kegiatan_foto (
  id uuid not null default gen_random_uuid(),
  kegiatan_id uuid not null,
  foto_url text not null,
  created_at timestamp with time zone not null default now(),
  constraint kegiatan_foto_pkey primary key (id),
  constraint kegiatan_foto_kegiatan_id_fkey
    foreign key (kegiatan_id)
    references public.kegiatan (id)
    on delete cascade
);

------------------------------------------------------------
-- TABLE: jadwal
------------------------------------------------------------

create table public.jadwal (
  id uuid not null default gen_random_uuid(),
  nama_kegiatan text not null,
  tanggal date not null,
  jam text not null,
  lokasi text not null,
  deskripsi text null,
  created_at timestamp with time zone not null default now(),
  constraint jadwal_pkey primary key (id)
);

------------------------------------------------------------
-- INDEXES (Performance Optimization)
------------------------------------------------------------

create index idx_kegiatan_tanggal
  on public.kegiatan (tanggal desc);

create index idx_jadwal_tanggal
  on public.jadwal (tanggal asc);

------------------------------------------------------------
-- ENABLE ROW LEVEL SECURITY
------------------------------------------------------------

alter table public.kegiatan enable row level security;
alter table public.kegiatan_foto enable row level security;
alter table public.jadwal enable row level security;

------------------------------------------------------------
-- PUBLIC READ ACCESS
------------------------------------------------------------

create policy "Public activities are viewable by everyone"
  on public.kegiatan
  for select
  using (true);

create policy "Public activity photos are viewable by everyone"
  on public.kegiatan_foto
  for select
  using (true);

create policy "Public schedules are viewable by everyone"
  on public.jadwal
  for select
  using (true);

------------------------------------------------------------
-- ADMIN (AUTHENTICATED) ACCESS
------------------------------------------------------------

-- KEGIATAN
create policy "Admins can insert activities"
  on public.kegiatan
  for insert
  to authenticated
  with check (true);

create policy "Admins can update activities"
  on public.kegiatan
  for update
  to authenticated
  using (true);

create policy "Admins can delete activities"
  on public.kegiatan
  for delete
  to authenticated
  using (true);

-- KEGIATAN FOTO
create policy "Admins can insert photos"
  on public.kegiatan_foto
  for insert
  to authenticated
  with check (true);

create policy "Admins can delete photos"
  on public.kegiatan_foto
  for delete
  to authenticated
  using (true);

-- JADWAL
create policy "Admins can insert schedules"
  on public.jadwal
  for insert
  to authenticated
  with check (true);

create policy "Admins can update schedules"
  on public.jadwal
  for update
  to authenticated
  using (true);

create policy "Admins can delete schedules"
  on public.jadwal
  for delete
  to authenticated
  using (true);

------------------------------------------------------------
-- STORAGE BUCKET: kegiatan
------------------------------------------------------------

-- Create bucket if not exists
insert into storage.buckets (id, name, public)
values ('kegiatan', 'kegiatan', true)
on conflict (id) do nothing;

-- Set up RLS for Storage
-- Note: storage.objects RLS is usually enabled by default in newer Supabase projects, 
-- but we define the policies explicitly for the 'kegiatan' bucket.

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'kegiatan' );

create policy "Admin Insert"
  on storage.objects for insert
  with check ( bucket_id = 'kegiatan' AND auth.role() = 'authenticated' );

create policy "Admin Update"
  on storage.objects for update
  using ( bucket_id = 'kegiatan' AND auth.role() = 'authenticated' );

create policy "Admin Delete"
  on storage.objects for delete
  using ( bucket_id = 'kegiatan' AND auth.role() = 'authenticated' );

------------------------------------------------------------
-- TABLE: renungan
------------------------------------------------------------

create table public.renungan (
  id uuid not null default gen_random_uuid(),
  judul text not null,
  ayat_referensi text not null,
  isi text not null,
  tanggal date unique not null,
  created_at timestamp with time zone not null default now(),
  constraint renungan_pkey primary key (id)
);

-- Index for date-based retrieval
create index idx_renungan_tanggal
  on public.renungan (tanggal desc);

-- RLS for renungan
alter table public.renungan enable row level security;

create policy "Public devotions are viewable by everyone"
  on public.renungan
  for select
  using (true);

create policy "Admins can insert devotions"
  on public.renungan
  for insert
  to authenticated
  with check (true);

create policy "Admins can update devotions"
  on public.renungan
  for update
  to authenticated
  using (true);

create policy "Admins can delete devotions"
  on public.renungan
  for delete
  to authenticated
  using (true);
