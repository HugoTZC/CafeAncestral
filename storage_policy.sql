-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- Allow public read access to the Images bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'Images' );

-- Allow authenticated users to upload to the Images bucket
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'Images' AND auth.role() = 'authenticated' );

-- Allow authenticated users to update their own uploads
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'Images' AND auth.role() = 'authenticated' );

-- Allow authenticated users to delete their own uploads
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'Images' AND auth.role() = 'authenticated' );
