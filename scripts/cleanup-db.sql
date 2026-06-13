-- ============================================================
-- Database Cleanup Script — RU Club Motherland
-- Run this in Supabase SQL Editor (service_role required for Storage)
-- ============================================================

BEGIN;

-- 1. Remove old/unused mission 4 and its child data
DELETE FROM mission_budget WHERE mission_id = 'mission-04';
DELETE FROM mission_participants WHERE mission_id = 'mission-04';
DELETE FROM mission_timeline WHERE mission_id = 'mission-04';
DELETE FROM mission_goals WHERE mission_id = 'mission-04';
DELETE FROM mission_partners WHERE mission_id = 'mission-04';
DELETE FROM mission_stats WHERE mission_id = 'mission-04';
DELETE FROM mission_images WHERE mission_id = 'mission-04';
DELETE FROM missions WHERE id = 'mission-04';

-- 2. Remove any orphaned mission_images (mission no longer exists)
DELETE FROM mission_images
WHERE mission_id NOT IN (SELECT id FROM missions);

-- 3. Remove any orphaned announcement_tags (announcement no longer exists)
DELETE FROM announcement_tags
WHERE announcement_id NOT IN (SELECT id FROM announcements);

-- 4. Remove old/unused announcements (set active=false or delete)
-- Uncomment and adjust as needed:
-- UPDATE announcements SET active = false WHERE id = 'announcement-XX';
-- DELETE FROM announcement_tags WHERE announcement_id = 'announcement-XX';
-- DELETE FROM announcements WHERE id = 'announcement-XX';

-- 5. (Manual) Clean up Supabase Storage objects
-- These must be run via the Supabase dashboard or a script with service_role key.
-- Objects to remove:
--   Bucket: ruclub
--   Path:   static/assets/mission/mission-04/
--
-- SQL alternative (requires service_role):
--   SELECT storage.delete_object('ruclub', 'static/assets/mission/mission-04/img-01.jpg');
--   SELECT storage.delete_object('ruclub', 'static/assets/mission/mission-04/img-02.jpg');
--   ... etc, or use the storage admin API in dashboard.

COMMIT;
