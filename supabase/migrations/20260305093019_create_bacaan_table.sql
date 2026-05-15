-- Enable uuid-ossp extension if not already enabled (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the bacaan table
CREATE TABLE public.bacaan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul TEXT NOT NULL,
    kategori TEXT NOT NULL,
    deskripsi TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    tanggal_publikasi DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Note: In Supabase, you can create the storage bucket via UI or API. 
-- Here is the SQL equivalent, but UI is often easier.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bacaan', 'bacaan', true);

-- Enable RLS for table
ALTER TABLE public.bacaan ENABLE ROW LEVEL SECURITY;

-- Policies for public.bacaan table
-- 1. Allow public read access to everyone
CREATE POLICY "Public read access for bacaan" 
ON public.bacaan FOR SELECT USING (true);

-- 2. Allow full access only to authenticated users (admins)
CREATE POLICY "Authenticated users can insert bacaan" 
ON public.bacaan FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update bacaan" 
ON public.bacaan FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete bacaan" 
ON public.bacaan FOR DELETE TO authenticated USING (true);


-- Policies for storage.objects (Bucket: 'bacaan')
-- 1. Allow public read access to files in the bucket
CREATE POLICY "Public read access for bacaan files"
ON storage.objects FOR SELECT
USING (bucket_id = 'bacaan');

-- 2. Allow full access only to authenticated users (admins)
CREATE POLICY "Authenticated users can upload bacaan files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'bacaan');

CREATE POLICY "Authenticated users can update bacaan files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'bacaan');

CREATE POLICY "Authenticated users can delete bacaan files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'bacaan');
