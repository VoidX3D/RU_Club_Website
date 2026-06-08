-- RU Club Motherland — Supabase Migration
-- Run this in Supabase SQL Editor to set up the database

-- 1. site_config
CREATE TABLE IF NOT EXISTS site_config (
  id bigint primary key default 1,
  name text not null default 'RU Club Motherland',
  short_name text not null default 'RU Club',
  tagline text not null default 'Environmental Sustainability Club',
  description text not null default 'Environmental sustainability club at Motherland Secondary School, Pokhara, Nepal.',
  url text not null default 'https://ruclubmss.vercel.app',
  logo text not null default '/static/assets/brand/logo.png',
  logo_icon text not null default '/static/assets/brand/logo_icon.png',
  email text not null default 'ruclubmotherland@gmail.com',
  phone text not null default '+977 9856022256',
  location jsonb not null default '{"school":"Motherland Secondary School","city":"Pokhara","ward":"Pokhara Metropolitan City - 7","district":"Kaski","province":"Gandaki Province","country":"Nepal"}',
  social jsonb not null default '{"facebook":"https://facebook.com/profile.php?id=61585206314774","instagram":"https://instagram.com/sincerebhattarai/"}',
  github text not null default 'https://github.com/RU-Club-Motherland',
  copyright text not null default '2026',
  managed_by text not null default 'Motherland Secondary School',
  made_by text not null default 'Sincere Bhattarai',
  nav jsonb not null default '[{"label":"Home","href":"/"},{"label":"Announcements","href":"/announcements"},{"label":"Missions","href":"/missions"},{"label":"Gallery","href":"/gallery"},{"label":"Members","href":"/members"},{"label":"Contact","href":"/contact"}]',
  footer_quick_links jsonb not null default '[{"label":"Home","href":"/"},{"label":"Announcements","href":"/announcements"},{"label":"Missions","href":"/missions"},{"label":"Gallery","href":"/gallery"},{"label":"Members","href":"/members"},{"label":"Contact","href":"/contact"},{"label":"Privacy Policy","href":"/privacy"},{"label":"Cookie Policy","href":"/consent"},{"label":"License","href":"/license"}]',
  cookie jsonb not null default '{"title":"We value your privacy","text":"This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared."}',
  updated_at timestamptz default now()
);

INSERT INTO site_config (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 2. content
CREATE TABLE IF NOT EXISTS content (
  id bigint primary key default 1,
  hero jsonb not null default '{"badge":"Sustainability Leaders","titleLine1":"A Greener","titleLine2":"Future.","subtitle":"\"Leading the community toward a zero-waste ecosystem through innovation and collective responsibility.\"","ctaPrimary":"Get Started","ctaSecondary":"View Gallery"}',
  intro jsonb not null default '{"label":"Who We Are","title":"The RU Identity","paragraphs":["Rooted in the vision of <strong>Motherland Secondary School</strong> to provide <span class=\"highlight\">\"Quality Education For Everyone\"</span>, the <strong>RU Club Motherland</strong> serves as a dynamic platform where environmental awareness meets collective action.","We believe true education extends beyond the classroom — into our communities and natural spaces. Supported by <strong>The Government of Nepal</strong>, <strong>KOICA Nepal</strong>, <strong>Doko Recyclers</strong>, and <strong>UNDP</strong>."]}',
  features jsonb not null default '{"label":"What We Do","title":"Our Initiatives","cards":[{"title":"Tree Plantation","description":"Organizing community tree plantation drives to restore green cover in Pokhara region.","icon":"plant"},{"title":"Waste Management","description":"Promoting zero-waste practices and proper waste segregation in communities.","icon":"trash"},{"title":"Awareness Education","description":"Conducting workshops and campaigns to educate students and communities.","icon":"book"}]}',
  cta jsonb not null default '{"title":"Join the Movement","subtitle":"Be part of the change. Together, we can create a sustainable future for Pokhara.","primaryBtn":"Become a Member","secondaryBtn":"View Our Work"}',
  mission jsonb not null default '{"label":"Our Mission","title":"Basundhara Park Project","subtitle":"Comprehensive ecological restoration in Pokhara"}',
  updated_at timestamptz default now()
);

INSERT INTO content (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 3. stats
CREATE TABLE IF NOT EXISTS stats (
  id bigint primary key generated always as identity,
  value text not null,
  label text not null,
  sort_order int not null default 0
);

INSERT INTO stats (value, label, sort_order) VALUES
  ('90kg+', 'Waste Collected', 1),
  ('20+', 'Surveyed Areas', 2),
  ('25+', 'Active Members', 3),
  ('5+', 'Partner Organizations', 4)
ON CONFLICT DO NOTHING;

-- 4. partners
CREATE TABLE IF NOT EXISTS partners (
  id bigint primary key generated always as identity,
  src text not null,
  alt text not null,
  name text not null,
  sort_order int not null default 0
);

INSERT INTO partners (src, alt, name, sort_order) VALUES
  ('/static/assets/partners/motherland.png', 'Motherland Secondary School', 'Motherland', 1),
  ('/static/assets/partners/pokhara_mun.png', 'Pokhara Metropolitan City', 'Pokhara Mun', 2),
  ('/static/assets/partners/gov_nepal.png', 'Government of Nepal', 'Government', 3),
  ('/static/assets/partners/doko.png', 'Doko Recyclers', 'Doko Recyclers', 4),
  ('/static/assets/partners/undp.png', 'United Nations Development Programme', 'UNDP', 5),
  ('/static/assets/partners/koica.png', 'KOICA Nepal', 'KOICA', 6)
ON CONFLICT DO NOTHING;

-- 5. members
CREATE TABLE IF NOT EXISTS members (
  id bigint primary key default 1,
  teachers jsonb not null default '[]',
  core jsonb not null default '[]',
  general jsonb not null default '[]',
  stats jsonb not null default '{"teachers":0,"core":0,"general":0,"total":0}',
  updated_at timestamptz default now()
);

INSERT INTO members (id, teachers, core, general, stats) VALUES (1, '[
  {"name": "Narayan Baral", "role": "Patron", "type": "patron"},
  {"name": "Ananda Sharma", "role": "Advisor", "type": "advisor"},
  {"name": "Srijana Gautam Acharya", "role": "Advisor", "type": "advisor"}
]', '[
  {"name": "Anuradha Sharma", "class": "8B", "role": "Club Coordinator \\u0026 Act. Event Lead", "type": "coord"},
  {"name": "Anmol Lamichhane", "class": "7B", "role": "Campaign Lead", "type": "coord"},
  {"name": "Aawishkar Pandit", "class": "9B", "role": "Content \\u0026 Act. Documentation Coordinator", "type": "coord"},
  {"name": "Bibek Neupane", "class": "9D", "role": "Logistics Coordinator", "type": "coord"},
  {"name": "Ojasvi Tripathi", "class": "8B", "role": "DIY Lead", "type": "coord"},
  {"name": "Sincere Bhattarai", "class": "10C", "role": "Event Lead", "type": "coord"}
]', '[
  {"name": "Sailesh Tiwari", "class": "6B", "role": "General Member"},
  {"name": "Kritika Acharya", "class": "8B", "role": "General Member"},
  {"name": "Anamika Dhakal", "class": "8A", "role": "General Member"},
  {"name": "Riya Khadka", "class": "8B", "role": "General Member"},
  {"name": "Alice Gurung", "class": "8A", "role": "General Member"},
  {"name": "Grace Gurung", "class": "8B", "role": "General Member"},
  {"name": "Soniya Bhandari", "class": "8B", "role": "General Member"},
  {"name": "Subham Rai", "class": "8A", "role": "General Member"},
  {"name": "Kriti Shrestha", "class": "6A", "role": "General Member"},
  {"name": "Richa Acharya", "class": "7B", "role": "General Member"},
  {"name": "Khushbu Paudel", "class": "7B", "role": "General Member"},
  {"name": "Binita Chhetri", "class": "7B", "role": "General Member"},
  {"name": "Salina Chhetri", "class": "7B", "role": "General Member"},
  {"name": "Prinsa Gurung", "class": "7B", "role": "General Member"},
  {"name": "Karan Rawat", "class": "8A", "role": "General Member"},
  {"name": "Ayush Raut", "class": "8A", "role": "General Member"},
  {"name": "Anish Basnet", "class": "8A", "role": "General Member"},
  {"name": "Nischal Poudel", "class": "9D", "role": "General Member"},
  {"name": "Ayush Chhetri", "class": "8B", "role": "General Member"},
  {"name": "Sagar Tamang", "class": "8B", "role": "General Member"},
  {"name": "Anjali Gurung", "class": "8B", "role": "General Member"}
]', '{"teachers":3,"core":6,"general":21,"total":30}') ON CONFLICT DO NOTHING;

-- 6. missions
CREATE TABLE IF NOT EXISTS missions (
  id text primary key,
  title text not null,
  slug text not null unique,
  tag text,
  date text,
  description text not null,
  detail text,
  featured text,
  show boolean not null default true,
  stats jsonb default '{}',
  partners jsonb default '[]',
  images jsonb default '[]',
  created_at timestamptz default now()
);

INSERT INTO missions (id, title, slug, tag, date, description, detail, featured, show, stats, partners, images) VALUES
('mission-01', 'Basundhara Park Clean-up', 'mission-01', 'Mission #01', 'May 2025', 'Comprehensive ecological audit and waste management drive in Pokhara.', 'Our flagship mission at Basundhara Park, Pokhara. The RU Club Motherland team conducted a thorough ecological audit, waste segregation drive, and community awareness program. With support from Doko Recyclers and Pokhara Metropolitan City, we surveyed 20+ areas and engaged 25+ volunteers in restoring the park''s natural beauty.',
 '/static/assets/mission/mission-01/img-01.jpg', true,
 '{"volunteers":"25+","areasSurveyed":"20+","area":"Basundhara Park, Pokhara"}',
 '["Doko Recyclers","Pokhara Metropolitan City"]',
 '["img-01.jpg","img-02.jpg","img-03.jpg","img-04.jpg","img-05.jpg","img-06.jpg","img-07.jpg","img-08.jpg","img-09.jpg","img-10.jpg","img-11.jpg","img-12.jpg","img-13.jpg","img-14.jpg","img-15.jpg","img-16.jpg","img-17.jpg","img-18.jpg","img-19.jpg"]'),

('mission-02', 'Recycling & Upcycling Training Program', 'mission-02', 'Mission #02', '21 Dec 2025', 'Three-school training on Recycling and Upcycling with Doko Recyclers, supported by the Government of Nepal and KOICA.', 'In Pokhara-7 Masbar, Motherland Secondary School — a prestigious school of the area — conducted an event attended by two other relevant schools for gaining knowledge on the topic of Recycling and Upcycling, with the support of the Government of Nepal, KOICA and Doko Recyclers.\n\nThe training entailed a series that followed introduction to the topic and its relevancy in today''s modern day and age. It went from 10:45 AM to 3:50 PM, spanning 5 hours and 5 minutes. It involved trainers from Doko Recyclers, with the main person being the project leader and the other an assistant. They gave the basics of knowledge to the students from Motherland Secondary School, Shree Tal Barahi Secondary School, and Shree Barahi Secondary School. With their help, the students — representatives of the respective schools'' clubs — were able to distinguish between waste materials and the definition of waste itself alongside solutions to these problems.\n\nThe training also consisted of a practical work which was further divided into two halves that would all follow the purpose of the training itself: "Recycle and Upcycle" alongside the 7R''s rule. One was to separate waste materials based on their types and recyclability, and another was to use different wastes to create art — to upcycle them in simple words. This came with astonishing results as the students proved better outcomes than what the mentors had expected of them. Even with minimal training from Chillionaire Productions, they showcased pieces that belonged in an art museum and stuck to the objective of the program — Recycle and Upcycle. With this, the teachers ended the program off with a quote: "The students gave a better output than what expectations we had, but we are proud they did."',
 '/static/assets/mission/mission-02/img-01.jpg', true,
 '{"participants":"3 Schools","duration":"5 hours 5 min","trainers":"Doko Recyclers"}',
 '["Government of Nepal","KOICA Nepal","Doko Recyclers"]',
 '["img-01.jpg","img-02.jpg","img-03.jpg","img-04.jpg"]'),

('mission-03', 'RU Club Motherland Hosts a Training Program — Day 2', 'mission-03', 'Mission #03', '22 Dec 2025', 'Second day of the training program — paper recycling, club management, and Kagaz Ghar showcase.', 'The next day, the second half of the training program was initiated again at the same venue: Motherland Secondary School. The training began from 10:30 AM and stretched for another 5 hours, terminating at 3:45 PM. After the review of day 1, the training began. During the long time duration of the occasion, the trainers gave the students information on their roles and tasks going forward, allowing them all to speak what they knew of their presence on the team. The students all gave their opinions on what they thought of their position sincerely, making the event more meaningful just as the trainers wanted. The activity concluded as the teachers went on with what the agenda was set on, letting the students grasp the ideas of proper club management ways and methods of solving any conflicts between members.\n\nAs a token of appreciation, the trainers had the advisors of all the schools'' clubs receive diaries made from recycled paper, and a pen made from it as well. They included a chart sheet for all club coordinators as a reward for the students'' attendance and participation. This was a small portion of the activities that entailed the day, however, it was quite a big one.\n\nThey continued on, allocating students and having them prepare an activity sheet which consisted of the day on which it had occurred, the program they had brought, the items they had brought, and the estimated budget. It was done to teach the students teamwork which resulted in outcomes higher than expected.\n\nThe trainers also had students prepare an identity sheet for their respective clubs at a fixed amount of time. Such work encouraged productivity and engagement from the young students. After a short break, they introduced Kagaz Ghar to the students from where representatives came. The spokespersons from Kagaz Ghar shared how they began and what they did, allowing the students to observe some items they created.\n\nAt last, they showcased how the papers could be recycled and made into new papers through a process and how it could become a circular economy, after which they had students craft papers of their own. Whilst this was being held, the trainers from Kagaz Ghar also made sure to show students ways to make decorations out of paper, such as an envelope, a bookmark and even a postcard.\n\nThe program soon came to an end as the trainers had the principal of Motherland Secondary School, Narayan Baral speak his opinion and conclude the session itself. He quoted in his words a lesson to be learnt: "I hope that what''s been taught here has brought fruitfulness to all students present and I wish that on any day in the future, when our schools may collaborate, this friendliness will remain and passionate care for the environment itself will be maintained."',
 '/static/assets/mission/mission-03/img-01.jpg', true,
 '{"participants":"3 Schools","duration":"5 hours 15 min","specialGuest":"Kagaz Ghar"}',
 '["Government of Nepal","KOICA Nepal","Doko Recyclers","Kagaz Ghar"]',
 '["img-01.jpg","img-02.jpg","img-03.jpg","img-04.jpg","img-05.jpg","img-06.jpg"]')
ON CONFLICT (id) DO NOTHING;

-- 7. mission_images (legacy support, though images are stored in JSONB array on missions)
CREATE TABLE IF NOT EXISTS mission_images (
  id bigint primary key generated always as identity,
  mission_id text not null references missions(id) on delete cascade,
  url text not null,
  alt text not null default '',
  sort_order int not null default 0,
  UNIQUE(mission_id, url)
);

-- 8. announcements
CREATE TABLE IF NOT EXISTS announcements (
  id text primary key,
  title text not null,
  tag text,
  date text not null,
  day text,
  summary text not null,
  description text,
  image text,
  active boolean not null default true,
  status text default 'active',
  deadline text,
  issued_by text,
  importance text,
  instructions text,
  tags jsonb default '[]',
  gallery jsonb default '[]',
  created_at timestamptz default now()
);

INSERT INTO announcements (id, title, tag, date, day, summary, description, image, active, status, deadline, issued_by, importance, instructions, tags, gallery) VALUES
('announcement-01', 'URGENT NOTICE — RU CLUB (Recycle & Upcycle Club)', 'Notice', 'May 30, 2026', 'Saturday', 'Every member MUST prepare one DIY decorative item from upcycled/waste materials. Strict deadline this Thursday.',
 'This is a strict and final reminder! As part of our preparation for World Environment Day (June 5th), every single member is REQUIRED to prepare ONE DIY decorative item using waste or upcycled materials only. No excuses. No delays. No exceptions.\n\nYour item must be:\n• Made from upcycled / waste materials only\n• A decorative DIY creation (creative and presentable)\n• Completed properly and responsibly\n• Hand-made by YOU — not bought, not outsourced!',
 '/static/assets/announcements/event01.jpg', true, 'ended', 'June 4, 2026',
 'Anuradha Sharma, Club Coordinator',
 'Late submissions will NOT be accepted under any circumstances. Failure to submit may result in temporary termination from the club.',
 'Items will be collected on Wednesday and Thursday (two days only). FINAL DEADLINE: This Thursday (strict cutoff after collection ends!).',
 '["Urgent","DIY","Upcycling","World Environment Day","Mandatory"]', '[]')
ON CONFLICT (id) DO NOTHING;

-- 9. contact_submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for all content tables
CREATE POLICY "Public read access" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read access" ON content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read access" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read access" ON members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON missions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mission_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON announcements FOR SELECT USING (true);

-- Public insert for contact_submissions
CREATE POLICY "Public insert" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_site_config_timestamp BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_content_timestamp BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_members_timestamp BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();
