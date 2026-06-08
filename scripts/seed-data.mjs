import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres:Sincere%401*2*3%23@db.jquzfvhtgbyrssvvhoio.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

const teachers = [
  { name: "Narayan Baral", role: "Patron", type: "patron" },
  { name: "Ananda Sharma", role: "Advisor", type: "advisor" },
  { name: "Srijana Gautam Acharya", role: "Advisor", type: "advisor" }
];

const core = [
  { name: "Anuradha Sharma", class: "8B", role: "Club Coordinator & Act. Event Lead", type: "coord" },
  { name: "Anmol Lamichhane", class: "7B", role: "Campaign Lead", type: "coord" },
  { name: "Aawishkar Pandit", class: "9B", role: "Content & Act. Documentation Coordinator", type: "coord" },
  { name: "Bibek Neupane", class: "9D", role: "Logistics Coordinator", type: "coord" },
  { name: "Ojasvi Tripathi", class: "8B", role: "DIY Lead", type: "coord" },
  { name: "Sincere Bhattarai", class: "10C", role: "Event Lead", type: "coord" }
];

const generalMembers = [
  { name: "Sailesh Tiwari", class: "6B", role: "General Member" },
  { name: "Kritika Acharya", class: "8B", role: "General Member" },
  { name: "Anamika Dhakal", class: "8A", role: "General Member" },
  { name: "Riya Khadka", class: "8B", role: "General Member" },
  { name: "Alice Gurung", class: "8A", role: "General Member" },
  { name: "Grace Gurung", class: "8B", role: "General Member" },
  { name: "Soniya Bhandari", class: "8B", role: "General Member" },
  { name: "Subham Rai", class: "8A", role: "General Member" },
  { name: "Kriti Shrestha", class: "6A", role: "General Member" },
  { name: "Richa Acharya", class: "7B", role: "General Member" },
  { name: "Khushbu Paudel", class: "7B", role: "General Member" },
  { name: "Binita Chhetri", class: "7B", role: "General Member" },
  { name: "Salina Chhetri", class: "7B", role: "General Member" },
  { name: "Prinsa Gurung", class: "7B", role: "General Member" },
  { name: "Karan Rawat", class: "8A", role: "General Member" },
  { name: "Ayush Raut", class: "8A", role: "General Member" },
  { name: "Anish Basnet", class: "8A", role: "General Member" },
  { name: "Nischal Poudel", class: "9D", role: "General Member" },
  { name: "Ayush Chhetri", class: "8B", role: "General Member" },
  { name: "Sagar Tamang", class: "8B", role: "General Member" },
  { name: "Anjali Gurung", class: "8B", role: "General Member" }
];

const contentData = {
  hero_title: "RU CLUB MOTHERLAND",
  hero_subtitle: "Environmental Sustainability Club",
  hero_tagline: "Small Steps, Big Impact — Building a Greener Future Together",
  hero_cta: "Join Us",
  about_title: "Who We Are",
  about_text: "RU Club Motherland is a student-led environmental sustainability club at Motherland Secondary School, Pokhara. Our mission is to inspire and empower students to take meaningful action for a greener, cleaner, and more sustainable future. Through awareness campaigns, cleanliness drives, plantation programs, and DIY initiatives, we turn small steps into big impact.",
  contact_title: "Get In Touch",
  contact_description: "Have questions, ideas, or want to collaborate? We'd love to hear from you!"
};

(async () => {
  await client.connect();
  console.log('Connected!');

  // 1. Update members
  await client.query(
    'UPDATE members SET teachers = $1::jsonb, core = $2::jsonb, general = $3::jsonb, stats = $4::jsonb WHERE id = 1',
    [
      JSON.stringify(teachers),
      JSON.stringify(core),
      JSON.stringify(generalMembers),
      JSON.stringify({ teachers: 3, core: 6, general: 21, total: 30 })
    ]
  );
  console.log('Members updated');

  // 2. Insert mission images for mission-01 (19 imgs), mission-02 (4 imgs), mission-03 (6 imgs)
  const missionImageFiles = {
    'mission-01': 19,
    'mission-02': 4,
    'mission-03': 6
  };

  for (const [missionId, count] of Object.entries(missionImageFiles)) {
    for (let i = 1; i <= count; i++) {
      const filename = `img-${String(i).padStart(2, '0')}.jpg`;
      const url = `/static/assets/mission/${missionId}/${filename}`;
      await client.query(
        `INSERT INTO mission_images (mission_id, url, alt, sort_order) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
        [missionId, url, `Mission ${missionId} - ${filename}`, i]
      );
    }
  }
  console.log('Mission images inserted');

  // 3. Content already seeded - skip

  // 4. Trigger function
  try {
    await client.query(`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $func$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $func$ language plpgsql;
    `);
    console.log('Trigger function created');
  } catch (e) {
    console.log('Trigger function exists:', e.message);
  }

  // 5. Verify all data
  const tableChecks = ['announcements', 'content', 'members', 'mission_images', 'missions', 'partners', 'site_config', 'stats'];
  for (const table of tableChecks) {
    const { rows } = await client.query(`SELECT COUNT(*)::int as count FROM "${table}"`);
    console.log(`  ${table}: ${rows[0].count} rows`);
  }

  // Also show mission_images per mission
  const { rows: imgCounts } = await client.query(
    `SELECT mission_id, COUNT(*)::int as count FROM mission_images GROUP BY mission_id ORDER BY mission_id`
  );
  for (const r of imgCounts) {
    console.log(`  ${r.mission_id} images: ${r.count}`);
  }

  // Show members data
  const { rows: mem } = await client.query(
    `SELECT jsonb_array_length(teachers) as t, jsonb_array_length(core) as c, jsonb_array_length(general) as g, stats FROM members WHERE id = 1`
  );
  console.log(`  Members: ${mem[0].t} teachers, ${mem[0].c} core, ${mem[0].g} general`);

  await client.end();
  console.log('Done!');
})().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
