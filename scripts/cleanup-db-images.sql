-- Cleanup script: clear broken image references from DB
-- Run this after deleting files from Supabase Storage
-- All brand assets are served from local /static/assets/brand/

-- Clear partner logos that don't exist in storage
UPDATE partners SET src = '' WHERE src IS NOT NULL AND src != '';

-- Clear member images that don't exist in storage
UPDATE members SET image = '' WHERE image IS NOT NULL AND image != '';

-- Clear announcement images that don't exist in storage
UPDATE announcements SET image = '' WHERE image IS NOT NULL AND image != '';

-- Clear mission featured images that don't exist in storage (only if you want to remove all mission images)
-- UPDATE missions SET featured = '' WHERE featured IS NOT NULL AND featured != '';

-- Clear mission images (only if you want to remove all mission images)
-- DELETE FROM mission_images;

-- Verify results
SELECT 'partners' as table_name, COUNT(*) as total, COUNT(src) as with_image, COUNT(*) - COUNT(src) as without_image FROM partners
UNION ALL
SELECT 'members', COUNT(*), COUNT(image), COUNT(*) - COUNT(image) FROM members
UNION ALL
SELECT 'announcements', COUNT(*), COUNT(image), COUNT(*) - COUNT(image) FROM announcements;
