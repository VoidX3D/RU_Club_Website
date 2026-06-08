# RU Club Motherland 🌿

**Environmental Sustainability Club** at Motherland Secondary School, Pokhara, Nepal.

> Transforming environmental awareness into collective action for a sustainable Pokhara.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)](https://ruclubmss.vercel.app)
[![MIT License](https://img.shields.io/badge/license-MIT-teal)](LICENSE)

---

## About

RU Club Motherland is a student-led environmental initiative at Motherland Secondary School. We organize tree plantations, waste management drives, community clean-ups, and awareness campaigns — working toward a zero-waste ecosystem in Pokhara.

**Website:** [ruclubmss.vercel.app](https://ruclubmss.vercel.app)

## Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript 6 |
| **Build** | Vite 8 + Tailwind CSS v4 |
| **Routing** | React Router DOM v7 |
| **Backend** | Supabase (Postgres + Storage) |
| **Animations** | Framer Motion + AOS |
| **Carousel** | Swiper 12 |
| **SEO** | react-helmet-async |
| **Analytics** | Google Analytics GA4 (G-HWFPCZ4W1Q, G-HJTLGVDNYK) |
| **State** | Zustand |
| **Hosting** | Vercel (auto-deploy from `main`) |

## Project Structure

```
/
├── public/                → Static assets (brand, icons, partners, mission images)
├── src/
│   ├── App.tsx            → All routes
│   ├── main.tsx           → Entry
│   ├── index.css          → Tailwind v4 + theme tokens + animations
│   ├── lib/               → Supabase queries, analytics, utils
│   ├── hooks/             → Theme, data fetching, SEO, page tracking
│   ├── components/        → Layout, SEOHead, CookieConsent, Navbar, Footer, Home sections
│   ├── pages/             → 13 page components
│   └── types/             → TypeScript interfaces
├── supabase-migration.sql → Full schema + seed data
├── .env.example
├── vercel.json
├── AGENTS.md
├── README.md
└── LICENSE
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in Supabase credentials
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# 3. Run DB migration in Supabase SQL Editor (supabase-migration.sql)
# 4. Or seed via script
npx tsx scripts/seed.ts

# 5. Start dev server
npm run dev

# 6. Build for production
npm run build
```

## Pages & Routes

| Route | Page | Data Source |
|---|---|---|
| `/` | Home | Supabase (stats, partners, content, missions) |
| `/missions` | Missions | Supabase (getMissionList) |
| `/mission/:slug` | Mission Detail | Supabase (getMissionInfo) |
| `/gallery` | Gallery | Supabase (getMissionList) |
| `/announcements` | Announcements | Supabase (getAnnouncementList) |
| `/announcement/:id` | Announcement Detail | Supabase (getAnnouncementDetail) |
| `/members` | Members | Supabase (getMembers) |
| `/contact` | Contact | Supabase (submitContactForm) |
| `/privacy` | Privacy Policy | Static |
| `/license` | License | Static |
| `/consent` | Cookie Policy | Static |
| `/secret-garden` | About Me | Static |

## Data Flow

All dynamic content is fetched from Supabase at runtime — **no JSON files** are used. The `src/lib/supabase.ts` file contains all database queries:

- `getSiteConfig()` — site metadata, nav, social links
- `getContent()` — hero, intro, features, CTA text
- `getStats()` — homepage statistics
- `getPartners()` — partner logos and links
- `getMembers()` — teacher advisors, core team, general members
- `getMissionList()` — all active missions
- `getMissionInfo(slug)` — single mission detail with stats/partners
- `getMissionImages(id)` — mission image gallery
- `getAnnouncementList()` — all active announcements
- `getAnnouncementDetail(id)` — single announcement full detail
- `submitContactForm()` — contact form submission

## Adding Content

### New Mission
1. Insert into Supabase `missions` table with `show: true`
2. Upload images to `public/static/assets/mission/mission-NN/` or Supabase Storage

### New Announcement
1. Insert into Supabase `announcements` table with `active: true`
2. Upload image to `public/static/assets/announcements/` or Supabase Storage

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GA_ID=G-HWFPCZ4W1Q
```

## Development

```bash
npm run dev     # Start Vite dev server
npm run build   # TypeScript check + production build
npm run preview # Preview production build locally
```

## License

MIT — see [LICENSE](LICENSE).

---

_Made with care by **Sincere Bhattarai** (@VoidX3D) — Student at Motherland Secondary School, Class 10._

### Quick Links
- **Website:** [ruclubmss.vercel.app](https://ruclubmss.vercel.app)
- **GitHub:** [github.com/VoidX3D](https://github.com/VoidX3D)
- **Facebook:** [RU Club Motherland](https://facebook.com/profile.php?id=61585206314774)
- **Instagram:** [@rucl.ub](https://instagram.com/rucl.ub/)
- **Email:** ruclubmotherland@gmail.com
