-- Enable Row Level Security (RLS) on the push_subscriptions table
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- 1. Allow anyone (anon) to subscribe by inserting a new push subscription
-- We strictly DO NOT allow SELECT to anon to prevent data leaks of endpoints and auth keys.
CREATE POLICY "Enable insert for all users" 
ON public.push_subscriptions
FOR INSERT 
WITH CHECK (true);

-- 2. Allow authenticated users (admins) to SELECT all subscriptions
-- This is necessary for the lib/notifications.ts script to retrieve endpoints and send pushes.
CREATE POLICY "Enable read access for authenticated users" 
ON public.push_subscriptions
FOR SELECT 
TO authenticated 
USING (true);

-- 3. Allow authenticated users (admins) to DELETE expired/invalid subscriptions
-- The notifications.ts script automatically deletes a subscription if the push service returns 404 or 410.
CREATE POLICY "Enable delete for authenticated users" 
ON public.push_subscriptions
FOR DELETE 
TO authenticated 
USING (true);
