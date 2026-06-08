// RU Club Motherland — Seed Script
// Run: node scripts/seed.mjs
// Requires VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_KEY in .env

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env')

if (!existsSync(envPath)) {
  console.error('❌ No .env file found. Create one from .env.example')
  process.exit(1)
}

const env = readFileSync(envPath, 'utf-8')
const supabaseUrl = env.match(/VITE_SUPABASE_URL=(.+)/)?.[1]?.trim()
const supabaseKey = env.match(/VITE_SUPABASE_SERVICE_KEY=(.+)/)?.[1]?.trim()

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_KEY in .env')
  console.error('   Add VITE_SUPABASE_SERVICE_KEY=your-service-role-key to .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function tableExists(name) {
  const { data, error } = await supabase
    .from(name)
    .select('id', { count: 'exact', head: true })
  return !error
}

async function seed() {
  console.log('🚀 Seeding RU Club Motherland database...\n')

  // --- site_config ---
  const siteConfigExists = await tableExists('site_config')
  if (!siteConfigExists) {
    console.log('❌ Tables do not exist. Run supabase-migration.sql in Supabase SQL Editor first.')
    console.log('   Go to: https://supabase.com/dashboard/project/jquzfvhtgbyrssvvhoio/sql/new')
    console.log('   Paste the contents of supabase-migration.sql and run it.\n')
    process.exit(1)
  }
  console.log('✅ Database tables exist\n')

  // --- Stats ---
  const { error: statsErr } = await supabase.from('stats').upsert([
    { value: '90kg+', label: 'Waste Collected', sort_order: 1 },
    { value: '20+', label: 'Surveyed Areas', sort_order: 2 },
    { value: '25+', label: 'Active Members', sort_order: 3 },
    { value: '5+', label: 'Partner Organizations', sort_order: 4 },
  ], { onConflict: 'id' })
  if (statsErr) console.error('Stats error:', statsErr.message)
  else console.log('✅ Stats seeded')

  // --- Partners ---
  const { error: partnersErr } = await supabase.from('partners').upsert([
    { src: '/static/assets/partners/motherland.png', alt: 'Motherland Secondary School', name: 'Motherland', sort_order: 1 },
    { src: '/static/assets/partners/pokhara_mun.png', alt: 'Pokhara Metropolitan City', name: 'Pokhara Mun', sort_order: 2 },
    { src: '/static/assets/partners/gov_nepal.png', alt: 'Government of Nepal', name: 'Government', sort_order: 3 },
    { src: '/static/assets/partners/doko.png', alt: 'Doko Recyclers', name: 'Doko Recyclers', sort_order: 4 },
    { src: '/static/assets/partners/undp.png', alt: 'United Nations Development Programme', name: 'UNDP', sort_order: 5 },
    { src: '/static/assets/partners/koica.png', alt: 'KOICA Nepal', name: 'KOICA', sort_order: 6 },
  ], { onConflict: 'id' })
  if (partnersErr) console.error('Partners error:', partnersErr.message)
  else console.log('✅ Partners seeded')

  // --- Members ---
  const { error: membersErr } = await supabase.from('members').upsert({
    id: 1,
    teachers: [
      { name: 'Narayan Baral', role: 'Patron', type: 'patron' },
      { name: 'Ananda Sharma', role: 'Advisor', type: 'advisor' },
      { name: 'Srijana Gautam Acharya', role: 'Advisor', type: 'advisor' },
    ],
    core: [
      { name: 'Anuradha Sharma', class: '8B', role: 'Club Coordinator', type: 'coord' },
      { name: 'Anmol Lamichhane', class: '7B', role: 'Campaign Lead', type: 'coord' },
      { name: 'Aawishkar Pandit', class: '9B', role: 'Content Coordinator', type: 'coord' },
      { name: 'Bibek Neupane', class: '9D', role: 'Logistics Coordinator', type: 'coord' },
      { name: 'Ojasvi Tripathi', class: '8B', role: 'DIY Lead', type: 'coord' },
      { name: 'Sincere Bhattarai', class: '10C', role: 'Event Lead', type: 'coord' },
      { name: 'Abhinav Basnet', class: '9B', role: 'Documentation Coordinator', type: 'coord' },
      { name: 'Darsh Kashyap', class: '8B', role: 'Communication Coordinator', type: 'coord' },
      { name: 'Aakriti Gurung', class: '9B', role: 'Finance Coordinator', type: 'coord' },
    ],
    general: [
      { name: 'Sailesh Tiwari', class: '6B', role: 'General Member' },
      { name: 'Aarogya Paudel', class: '6E', role: 'General Member' },
      { name: 'Pratik Poudel', class: '10C', role: 'General Member' },
      { name: 'Aaditya BK', class: '10C', role: 'General Member' },
      { name: 'Aradhya Parajuli', class: '10C', role: 'General Member' },
      { name: 'Prasamsha Gautam', class: '10D', role: 'General Member' },
      { name: 'Dipshika Karki', class: '10D', role: 'General Member' },
      { name: 'Prasamsha Subedi', class: '10D', role: 'General Member' },
      { name: 'Anushka Aryal', class: '9C', role: 'General Member' },
      { name: 'Anusha Thapa', class: '9A', role: 'General Member' },
      { name: 'Sarbesh Adhikari', class: '9C', role: 'General Member' },
      { name: 'Pratik Pokhrel', class: '9C', role: 'General Member' },
      { name: 'Aarjan Khadka', class: '8B', role: 'General Member' },
      { name: 'Aahanya Bijukchhe', class: '7B', role: 'General Member' },
      { name: 'Prasanna Baral', class: '7B', role: 'General Member' },
      { name: 'Rhythm Adhikari', class: '7B', role: 'General Member' },
      { name: 'Sahanshil Bhattarai', class: '6E', role: 'General Member' },
      { name: 'Supriya Khadka', class: '10A', role: 'General Member' },
      { name: 'Krish KC', class: '8C', role: 'General Member' },
      { name: 'Trishana Jwarchana', class: '10E', role: 'General Member' },
      { name: 'Ridanta Sapkota', class: '9C', role: 'General Member' },
    ],
    stats: { teachers: 3, core: 9, general: 21, total: 33 },
  })
  if (membersErr) console.error('Members error:', membersErr.message)
  else console.log('✅ Members seeded')

  // --- Missions ---
  const missions = [
    {
      id: 'mission-01', title: 'Basundhara Park Clean-up', slug: 'mission-01',
      tag: 'Mission #01', date: 'May 2025',
      description: 'Comprehensive ecological audit and waste management drive in Pokhara.',
      detail: 'Our flagship mission at Basundhara Park, Pokhara. The RU Club Motherland team conducted a thorough ecological audit, waste segregation drive, and community awareness program. With support from Doko Recyclers and Pokhara Metropolitan City, we surveyed 20+ areas and engaged 25+ volunteers in restoring the park\'s natural beauty.',
      featured: '/static/assets/mission/mission-01/img-01.jpg',
      show: true,
      stats: { volunteers: '25+', areasSurveyed: '20+', area: 'Basundhara Park, Pokhara' },
      partners: ['Doko Recyclers', 'Pokhara Metropolitan City'],
      images: Array.from({ length: 19 }, (_, i) => `img-${String(i + 1).padStart(2, '0')}.jpg`),
    },
    {
      id: 'mission-02', title: 'Recycling & Upcycling Training Program', slug: 'mission-02',
      tag: 'Mission #02', date: '21 Dec 2025',
      description: 'Three-school training on Recycling and Upcycling with Doko Recyclers.',
      detail: 'In Pokhara-7 Masbar, Motherland Secondary School conducted an event attended by two other schools for gaining knowledge on Recycling and Upcycling, with the support of the Government of Nepal, KOICA and Doko Recyclers.\n\nThe training went from 10:45 AM to 3:50 PM, spanning 5 hours and 5 minutes. It involved trainers from Doko Recyclers who gave basics of knowledge to students from Motherland Secondary School, Shree Tal Barahi Secondary School, and Shree Barahi Secondary School.\n\nThe training consisted of practical work divided into two halves following the 7R\'s rule. One was to separate waste materials based on types and recyclability, and another was to use different wastes to create art.',
      featured: '/static/assets/mission/mission-02/img-01.jpg',
      show: true,
      stats: { participants: '3 Schools', duration: '5 hours 5 min', trainers: 'Doko Recyclers' },
      partners: ['Government of Nepal', 'KOICA Nepal', 'Doko Recyclers'],
      images: ['img-01.jpg', 'img-02.jpg', 'img-03.jpg', 'img-04.jpg'],
    },
    {
      id: 'mission-03', title: 'RU Club Motherland Hosts a Training Program — Day 2', slug: 'mission-03',
      tag: 'Mission #03', date: '22 Dec 2025',
      description: 'Second day of the training program — paper recycling, club management, and Kagaz Ghar showcase.',
      detail: 'The next day, the second half of the training program was initiated again at Motherland Secondary School. The training began from 10:30 AM and stretched for another 5 hours.\n\nAfter review of day 1, trainers gave students information on their roles and tasks going forward. The activity concluded as teachers went on with what the agenda was set on, letting students grasp ideas of proper club management.\n\nAs a token of appreciation, trainers had advisors receive diaries made from recycled paper. They introduced Kagaz Ghar representatives who shared how they began and what they did.\n\nAt last, they showcased how papers could be recycled and made into new papers through a process, after which students crafted papers of their own.',
      featured: '/static/assets/mission/mission-03/img-01.jpg',
      show: true,
      stats: { participants: '3 Schools', duration: '5 hours 15 min', specialGuest: 'Kagaz Ghar' },
      partners: ['Government of Nepal', 'KOICA Nepal', 'Doko Recyclers', 'Kagaz Ghar'],
      images: ['img-01.jpg', 'img-02.jpg', 'img-03.jpg', 'img-04.jpg', 'img-05.jpg', 'img-06.jpg'],
    },
  ]

  for (const mission of missions) {
    const { error } = await supabase.from('missions').upsert(mission, { onConflict: 'id' })
    if (error) console.error(`Mission ${mission.id} error:`, error.message)
    else console.log(`✅ Mission seeded: ${mission.id}`)
  }

  // --- Announcements ---
  const { error: annErr } = await supabase.from('announcements').upsert({
    id: 'announcement-01',
    title: 'URGENT NOTICE — RU CLUB (Recycle & Upcycle Club)',
    tag: 'Notice',
    date: 'May 30, 2026',
    day: 'Saturday',
    summary: 'Every member MUST prepare one DIY decorative item from upcycled/waste materials. Strict deadline this Thursday.',
    description: 'This is a strict and final reminder! As part of our preparation for World Environment Day (June 5th), every single member is REQUIRED to prepare ONE DIY decorative item using waste or upcycled materials only.\n\nYour item must be:\n• Made from upcycled / waste materials only\n• A decorative DIY creation\n• Completed properly and responsibly\n• Hand-made by YOU',
    image: '/static/assets/announcements/event01.jpg',
    active: true,
    status: 'ended',
    deadline: 'June 4, 2026',
    issued_by: 'Anuradha Sharma, Club Coordinator',
    importance: 'Late submissions will NOT be accepted. Failure to submit may result in temporary termination from the club.',
    instructions: 'Items will be collected on Wednesday and Thursday (two days only). FINAL DEADLINE: This Thursday.',
    tags: ['Urgent', 'DIY', 'Upcycling', 'World Environment Day', 'Mandatory'],
    gallery: [],
  }, { onConflict: 'id' })
  if (annErr) console.error('Announcement error:', annErr.message)
  else console.log('✅ Announcement seeded')

  // --- Site Config & Content ---
  const { error: cfgErr } = await supabase.from('site_config').upsert({ id: 1 }, { onConflict: 'id' })
  if (cfgErr) console.error('Site config error:', cfgErr.message)
  else console.log('✅ Site config seeded (defaults)')

  const { error: contentErr } = await supabase.from('content').upsert({ id: 1 }, { onConflict: 'id' })
  if (contentErr) console.error('Content error:', contentErr.message)
  else console.log('✅ Content seeded (defaults)')

  console.log('\n🎉 Seeding complete!')
}

seed().catch(console.error)
