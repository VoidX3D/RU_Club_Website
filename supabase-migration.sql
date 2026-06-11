-- RU Club Motherland — Fresh Migration (from vanilla data)
-- Run via Node.js script against Supabase

BEGIN;

-- Drop all existing tables
DROP TABLE IF EXISTS announcement_gallery CASCADE;
DROP TABLE IF EXISTS announcement_tags CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS mission_budget CASCADE;
DROP TABLE IF EXISTS mission_participants CASCADE;
DROP TABLE IF EXISTS mission_timeline CASCADE;
DROP TABLE IF EXISTS mission_goals CASCADE;
DROP TABLE IF EXISTS mission_partners CASCADE;
DROP TABLE IF EXISTS mission_stats CASCADE;
DROP TABLE IF EXISTS mission_images CASCADE;
DROP TABLE IF EXISTS missions CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS stats CASCADE;

-- NOTE: Hardcoded static content (hero, intro, features, CTA, mission section)
-- is defined in src/data/index.ts and never stored in the database.
-- Supabase is used only for DYNAMIC data.

-- 1. STATS
CREATE TABLE stats (
  id bigint primary key generated always as identity,
  value text not null,
  label text not null,
  sort_order int not null default 0
);
INSERT INTO stats (value, label, sort_order) VALUES
  ('90kg+', 'Waste Collected', 1),
  ('20+', 'Surveyed Areas', 2),
  ('25+', 'Active Members', 3),
  ('5+', 'Partner Organizations', 4);

-- 2. PARTNERS
CREATE TABLE partners (
  id bigint primary key generated always as identity,
  src text not null,
  alt text not null,
  name text not null,
  sort_order int not null default 0
);
INSERT INTO partners (src, alt, name, sort_order) VALUES
  ('partners/motherland.png', 'Motherland Secondary School', 'Motherland', 1),
  ('partners/pokhara_mun.png', 'Pokhara Metropolitan City', 'Pokhara Mun', 2),
  ('partners/gov_nepal.png', 'Government of Nepal', 'Government', 3),
  ('partners/doko.png', 'Doko Recyclers', 'Doko Recyclers', 4),
  ('partners/undp.png', 'United Nations Development Programme', 'UNDP', 5),
  ('partners/koica.png', 'KOICA Nepal', 'KOICA', 6);

-- 3. MEMBERS
CREATE TABLE members (
  id bigint primary key generated always as identity,
  name text not null,
  class text,
  role text not null,
  member_type text not null default 'member' CHECK (member_type IN ('patron','advisor','coord','member')),
  group_name text not null default 'general' CHECK (group_name IN ('teachers','core','general')),
  image text,
  sort_order int not null default 0
);
INSERT INTO members (name, class, role, member_type, group_name, image, sort_order) VALUES
  ('Narayan Baral', NULL, 'Patron', 'patron', 'teachers', NULL, 1),
  ('Ananda Sharma', NULL, 'Advisor', 'advisor', 'teachers', NULL, 2),
  ('Srijana Gautam Acharya', NULL, 'Advisor', 'advisor', 'teachers', NULL, 3),
  ('Anuradha Sharma', '8B', 'Club Coordinator & Act. Event Lead', 'coord', 'core', NULL, 1),
  ('Anmol Lamichhane', '7B', 'Campaign Lead', 'coord', 'core', NULL, 2),
  ('Aawishkar Pandit', '9B', 'Content & Act. Documentation Coordinator', 'coord', 'core', NULL, 3),
  ('Bibek Neupane', '9D', 'Logistics Coordinator', 'coord', 'core', NULL, 4),
  ('Ojasvi Tripathi', '8B', 'DIY Lead', 'coord', 'core', NULL, 5),
  ('Sincere Bhattarai', '10C', 'Event Lead', 'coord', 'core', NULL, 6),
  ('Sailesh Tiwari', '6B', 'General Member', 'member', 'general', NULL, 1),
  ('Aarogya Paudel', '6E', 'General Member', 'member', 'general', NULL, 2),
  ('Pratik Poudel', '10C', 'General Member', 'member', 'general', NULL, 3),
  ('Aaditya BK', '10C', 'General Member', 'member', 'general', NULL, 4),
  ('Aradhya Parajuli', '10C', 'General Member', 'member', 'general', NULL, 5),
  ('Prasamsha Gautam', '10D', 'General Member', 'member', 'general', NULL, 6),
  ('Dipshika Karki', '10D', 'General Member', 'member', 'general', NULL, 7),
  ('Prasamsha Subedi', '10D', 'General Member', 'member', 'general', NULL, 8),
  ('Anushka Aryal', '9C', 'General Member', 'member', 'general', NULL, 9),
  ('Anusha Thapa', '9A', 'General Member', 'member', 'general', NULL, 10),
  ('Sarbesh Adhikari', '9C', 'General Member', 'member', 'general', NULL, 11),
  ('Pratik Pokhrel', '9C', 'General Member', 'member', 'general', NULL, 12),
  ('Aarjan Khadka', '8B', 'General Member', 'member', 'general', NULL, 13),
  ('Aahanya Bijukchhe', '7B', 'General Member', 'member', 'general', NULL, 14),
  ('Prasanna Baral', '7B', 'General Member', 'member', 'general', NULL, 15),
  ('Rhythm Adhikari', '7B', 'General Member', 'member', 'general', NULL, 16),
  ('Sahanshil Bhattarai', '6E', 'General Member', 'member', 'general', NULL, 17),
  ('Supriya Khadka', '10A', 'General Member', 'member', 'general', NULL, 18),
  ('Krish KC', '8C', 'General Member', 'member', 'general', NULL, 19),
  ('Trishana Jwarchana', '10E', 'General Member', 'member', 'general', NULL, 20),
  ('Ridanta Sapkota', '9C', 'General Member', 'member', 'general', NULL, 21);

-- 4. MISSIONS
CREATE TABLE missions (
  id text primary key,
  title text not null,
  slug text not null unique,
  tag text,
  date text,
  description text not null,
  detail text,
  featured text,
  show boolean not null default true,
  created_at timestamptz default now()
);
INSERT INTO missions (id, title, slug, tag, date, description, detail, featured, show) VALUES
  ('mission-01', 'Basundhara Park Clean-up', 'mission-01', 'Mission #01', 'May 2025', 'Comprehensive ecological audit and waste management drive in Pokhara.', 'Our flagship mission at Basundhara Park, Pokhara. The RU Club Motherland team conducted a thorough ecological audit, waste segregation drive, and community awareness program. With support from Doko Recyclers and Pokhara Metropolitan City, we surveyed 20+ areas and engaged 25+ volunteers in restoring the park''s natural beauty.', 'mission/mission-01/img-01.jpg', true),
  ('mission-02', 'Recycling & Upcycling Training Program', 'mission-02', 'Mission #02', '21 Dec 2025', 'Three-school training on Recycling and Upcycling with Doko Recyclers, supported by the Government of Nepal and KOICA.', 'In Pokhara-7 Masbar, Motherland Secondary School — a prestigious school of the area — conducted an event attended by two other relevant schools for gaining knowledge on the topic of Recycling and Upcycling, with the support of the Government of Nepal, KOICA and Doko Recyclers.\n\nThe training entailed a series that followed introduction to the topic and its relevancy in today''s modern day and age. It went from 10:45 AM to 3:50 PM, spanning 5 hours and 5 minutes. It involved trainers from Doko Recyclers, with the main person being the project leader and the other an assistant. They gave the basics of knowledge to the students from Motherland Secondary School, Shree Tal Barahi Secondary School, and Shree Barahi Secondary School. With their help, the students — representatives of the respective schools'' clubs — were able to distinguish between waste materials and the definition of waste itself alongside solutions to these problems.\n\nThe training also consisted of a practical work which was further divided into two halves that would all follow the purpose of the training itself: "Recycle and Upcycle" alongside the 7R''s rule. One was to separate waste materials based on their types and recyclability, and another was to use different wastes to create art — to upcycle them in simple words. This came with astonishing results as the students proved better outcomes than what the mentors had expected of them. Even with minimal training from Chillionaire Productions, they showcased pieces that belonged in an art museum and stuck to the objective of the program — Recycle and Upcycle. With this, the teachers ended the program off with a quote: "The students gave a better output than what expectations we had, but we are proud they did."', 'mission/mission-02/img-01.jpg', true),
  ('mission-03', 'RU Club Motherland Hosts a Training Program — Day 2', 'mission-03', 'Mission #03', '22 Dec 2025', 'Second day of the training program — paper recycling, club management, and Kagaz Ghar showcase.', 'The next day, the second half of the training program was initiated again at the same venue: Motherland Secondary School. The training began from 10:30 AM and stretched for another 5 hours, terminating at 3:45 PM. After the review of day 1, the training began. During the long time duration of the occasion, the trainers gave the students information on their roles and tasks going forward, allowing them all to speak what they knew of their presence on the team. The students all gave their opinions on what they thought of their position sincerely, making the event more meaningful just as the trainers wanted. The activity concluded as the teachers went on with what the agenda was set on, letting the students grasp the ideas of proper club management ways and methods of solving any conflicts between members.\n\nAs a token of appreciation, the trainers had the advisors of all the schools'' clubs receive diaries made from recycled paper, and a pen made from it as well. They included a chart sheet for all club coordinators as a reward for the students'' attendance and participation. This was a small portion of the activities that entailed the day, however, it was quite a big one.\n\nThey continued on, allocating students and having them prepare an activity sheet which consisted of the day on which it had occurred, the program they had brought, the items they had brought, and the estimated budget. It was done to teach the students teamwork which resulted in outcomes higher than expected.\n\nThe trainers also had students prepare an identity sheet for their respective clubs at a fixed amount of time. Such work encouraged productivity and engagement from the young students. After a short break, they introduced Kagaz Ghar to the students from where representatives came. The spokespersons from Kagaz Ghar shared how they began and what they did, allowing the students to observe some items they created.\n\nAt last, they showcased how the papers could be recycled and made into new paper sheets. The students were amazed by the demonstration and took part in making recycled paper. After the demonstration, the program ended with a vote of thanks from the school''s principal.', 'mission/mission-03/img-01.jpg', true);

CREATE TABLE mission_images (
  id bigint primary key generated always as identity,
  mission_id text not null REFERENCES missions(id) ON DELETE CASCADE,
  url text not null,
  alt text not null default '',
  sort_order int not null default 0
);
INSERT INTO mission_images (mission_id, url, alt, sort_order) VALUES
  ('mission-01', 'img-01.jpg', 'Basundhara Park Clean-up', 1),
  ('mission-01', 'img-02.jpg', 'Basundhara Park Clean-up', 2),
  ('mission-01', 'img-03.jpg', 'Basundhara Park Clean-up', 3),
  ('mission-01', 'img-04.jpg', 'Basundhara Park Clean-up', 4),
  ('mission-01', 'img-05.jpg', 'Basundhara Park Clean-up', 5),
  ('mission-01', 'img-06.jpg', 'Basundhara Park Clean-up', 6),
  ('mission-01', 'img-07.jpg', 'Basundhara Park Clean-up', 7),
  ('mission-01', 'img-08.jpg', 'Basundhara Park Clean-up', 8),
  ('mission-01', 'img-09.jpg', 'Basundhara Park Clean-up', 9),
  ('mission-01', 'img-10.jpg', 'Basundhara Park Clean-up', 10),
  ('mission-01', 'img-11.jpg', 'Basundhara Park Clean-up', 11),
  ('mission-01', 'img-12.jpg', 'Basundhara Park Clean-up', 12),
  ('mission-01', 'img-13.jpg', 'Basundhara Park Clean-up', 13),
  ('mission-01', 'img-14.jpg', 'Basundhara Park Clean-up', 14),
  ('mission-01', 'img-15.jpg', 'Basundhara Park Clean-up', 15),
  ('mission-01', 'img-16.jpg', 'Basundhara Park Clean-up', 16),
  ('mission-01', 'img-17.jpg', 'Basundhara Park Clean-up', 17),
  ('mission-01', 'img-18.jpg', 'Basundhara Park Clean-up', 18),
  ('mission-01', 'img-19.jpg', 'Basundhara Park Clean-up', 19),
  ('mission-02', 'img-01.jpg', 'Recycling Training', 1),
  ('mission-02', 'img-02.jpg', 'Recycling Training', 2),
  ('mission-02', 'img-03.jpg', 'Recycling Training', 3),
  ('mission-02', 'img-04.jpg', 'Recycling Training', 4),
  ('mission-03', 'img-01.jpg', 'Training Day 2', 1),
  ('mission-03', 'img-02.jpg', 'Training Day 2', 2),
  ('mission-03', 'img-03.jpg', 'Training Day 2', 3),
  ('mission-03', 'img-04.jpg', 'Training Day 2', 4),
  ('mission-03', 'img-05.jpg', 'Training Day 2', 5),
  ('mission-03', 'img-06.jpg', 'Training Day 2', 6);

CREATE TABLE mission_stats (
  id bigint primary key generated always as identity,
  mission_id text not null REFERENCES missions(id) ON DELETE CASCADE,
  label text not null,
  value text not null,
  sort_order int not null default 0
);
INSERT INTO mission_stats (mission_id, label, value, sort_order) VALUES
  ('mission-01', 'Volunteers', '25+', 1),
  ('mission-01', 'Areas Surveyed', '20+', 2),
  ('mission-01', 'Area', 'Basundhara Park, Pokhara', 3),
  ('mission-02', 'Participants', '3 Schools', 1),
  ('mission-02', 'Duration', '5 hours 5 min', 2),
  ('mission-02', 'Trainers', 'Doko Recyclers', 3),
  ('mission-03', 'Participants', '3 Schools', 1),
  ('mission-03', 'Duration', '5 hours 15 min', 2),
  ('mission-03', 'Special Guest', 'Kagaz Ghar', 3);

CREATE TABLE mission_partners (
  id bigint primary key generated always as identity,
  mission_id text not null REFERENCES missions(id) ON DELETE CASCADE,
  name text not null,
  sort_order int not null default 0
);
INSERT INTO mission_partners (mission_id, name, sort_order) VALUES
  ('mission-01', 'Doko Recyclers', 1),
  ('mission-01', 'Pokhara Metropolitan City', 2),
  ('mission-02', 'Government of Nepal', 1),
  ('mission-02', 'KOICA Nepal', 2),
  ('mission-02', 'Doko Recyclers', 3),
  ('mission-03', 'Government of Nepal', 1),
  ('mission-03', 'KOICA Nepal', 2),
  ('mission-03', 'Doko Recyclers', 3),
  ('mission-03', 'Kagaz Ghar', 4);

CREATE TABLE mission_goals (
  id bigint primary key generated always as identity,
  mission_id text not null REFERENCES missions(id) ON DELETE CASCADE,
  goal text not null,
  sort_order int not null default 0
);
CREATE TABLE mission_timeline (
  id bigint primary key generated always as identity,
  mission_id text not null REFERENCES missions(id) ON DELETE CASCADE,
  title text not null,
  date text,
  description text,
  sort_order int not null default 0
);
CREATE TABLE mission_participants (
  id bigint primary key generated always as identity,
  mission_id text not null REFERENCES missions(id) ON DELETE CASCADE,
  group_name text not null,
  participant_count text not null,
  sort_order int not null default 0
);
CREATE TABLE mission_budget (
  id bigint primary key generated always as identity,
  mission_id text not null REFERENCES missions(id) ON DELETE CASCADE,
  item text not null,
  amount text,
  sort_order int not null default 0
);

-- 5. ANNOUNCEMENTS
CREATE TABLE announcements (
  id text primary key,
  title text not null,
  tag text,
  date text not null,
  day text,
  summary text not null,
  description text,
  image text,
  active boolean not null default true,
  status text default 'active' CHECK (status IN ('active','ended','urgent','upcoming','ongoing','deadline')),
  deadline text,
  issued_by text,
  importance text,
  instructions text,
  created_at timestamptz default now()
);
INSERT INTO announcements (id, title, tag, date, day, summary, description, image, active, status, deadline, issued_by, importance, instructions) VALUES
  ('announcement-01', 'URGENT NOTICE — RU CLUB (Recycle & Upcycle Club)', 'Notice', 'May 30, 2026', 'Saturday', 'Every member MUST prepare one DIY decorative item from upcycled/waste materials. Strict deadline this Thursday.', 'This is a strict and final reminder! As part of our preparation for World Environment Day (June 5th), every single member is REQUIRED to prepare ONE DIY decorative item using waste or upcycled materials only. No excuses. No delays. No exceptions.\n\nYour item must be:\n• Made from upcycled / waste materials only\n• A decorative DIY creation (creative and presentable)\n• Completed properly and responsibly\n• Hand-made by YOU — not bought, not outsourced!', 'announcements/event01.jpg', true, 'ended', 'June 4, 2026', 'Anuradha Sharma, Club Coordinator', 'Late submissions will NOT be accepted under any circumstances. Failure to submit may result in temporary termination from the club.', 'Items will be collected on Wednesday and Thursday (two days only). FINAL DEADLINE: This Thursday (strict cutoff after collection ends!).');

CREATE TABLE announcement_tags (
  id bigint primary key generated always as identity,
  announcement_id text not null REFERENCES announcements(id) ON DELETE CASCADE,
  tag text not null,
  sort_order int not null default 0
);
INSERT INTO announcement_tags (announcement_id, tag, sort_order) VALUES
  ('announcement-01', 'Urgent', 1),
  ('announcement-01', 'DIY', 2),
  ('announcement-01', 'Upcycling', 3),
  ('announcement-01', 'World Environment Day', 4),
  ('announcement-01', 'Mandatory', 5);

CREATE TABLE announcement_gallery (
  id bigint primary key generated always as identity,
  announcement_id text not null REFERENCES announcements(id) ON DELETE CASCADE,
  url text not null,
  alt text not null default '',
  sort_order int not null default 0
);

-- 6. CONTACT FORM
CREATE TABLE contact_submissions (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- RLS
DO $$ BEGIN
  EXECUTE (
    SELECT string_agg(format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tablename), E'\n')
    FROM pg_tables WHERE schemaname = 'public'
  );
END $$;

DO $$ BEGIN
  EXECUTE (
    SELECT string_agg(format(
      'CREATE POLICY "Public read" ON %I FOR SELECT USING (true);', tablename
    ), E'\n')
    FROM pg_tables
    WHERE schemaname = 'public' AND tablename != 'contact_submissions'
  );
END $$;

CREATE POLICY "Public insert" ON contact_submissions FOR INSERT WITH CHECK (
  name IS NOT NULL AND name != '' AND
  email IS NOT NULL AND email != '' AND
  subject IS NOT NULL AND subject != '' AND
  message IS NOT NULL AND message != ''
);

-- ============================================================
-- LINT FIXES
-- ============================================================

-- Fix: function_search_path_mutable — set explicit search_path
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix: anon/authenticated_security_definer_function_executable
-- Switch rls_auto_enable to SECURITY INVOKER (skip if function doesn't exist)
DO $$ BEGIN
  ALTER FUNCTION public.rls_auto_enable() SECURITY INVOKER;
EXCEPTION WHEN undefined_function THEN
  RAISE NOTICE 'rls_auto_enable does not exist, skipping';
END $$;

COMMIT;
