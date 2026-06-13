# RU Club Motherland 🌿

**Environmental Sustainability Club** at Motherland Secondary School, Pokhara, Nepal.

> Transforming environmental awareness into collective action for a sustainable Pokhara.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)](https://ruclub.rweb.site)
[![MIT License](https://img.shields.io/badge/license-MIT-teal)](LICENSE)

---

## About

RU Club Motherland is a student-led environmental initiative at Motherland Secondary School. We organize tree plantations, waste management drives, community clean-ups, and awareness campaigns — working toward a zero-waste ecosystem in Pokhara.

**Website:** [ruclub.rweb.site](https://ruclub.rweb.site)

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
| **State** | React hooks (no state library) |
| **Hosting** | Vercel (auto-deploy from `main`) |

## Project Structure

```
/
├── public/                → Static assets (brand, icons, partners, mission images)
├── src/
│   ├── App.tsx            → All routes, lazy-loaded
│   ├── main.tsx           → Entry point
│   ├── index.css          → Tailwind v4 + theme tokens + animations
│   ├── data/              → Hardcoded static site text (never from DB)
│   ├── lib/               → Supabase queries, analytics, utils
│   ├── hooks/             → Theme, data fetching, DB status, page tracking, site config
│   ├── components/        → Layout, SEOHead, CookieConsent, ErrorBoundary, Navbar, Footer
│   ├── pages/             → 13 page components (lazy-loaded)
│   └── types/             → TypeScript interfaces
├── supabase-migration.sql → Full schema + seed data (dynamic tables only)
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

# 4. Start dev server
npm run dev

# 5. Build for production
npm run build
```

## Pages & Routes

| Route | Page | Data Source |
|---|---|---|
| `/` | Home | Supabase (stats, partners, missions) + hardcoded text |
| `/missions` | Missions | Supabase (getMissionList) |
| `/mission/:slug` | Mission Detail | Supabase (getMissionInfo, getMissionImages) |
| `/gallery` | Gallery | Supabase (getAllGalleryImages — batch query) |
| `/announcements` | Announcements | Supabase (getAnnouncementList) |
| `/announcement/:id` | Announcement Detail | Supabase (getAnnouncementDetail) |
| `/members` | Members | Supabase (getMembers) |
| `/contact` | Contact | Supabase (submitContactForm) + Formspree |
| `/privacy` | Privacy Policy | Static |
| `/license` | License | Static |
| `/consent` | Cookie Policy | Static |
| `/secret-garden` | About Me | Static |
| `*` | 404 | Static |

## Data Flow

All dynamic content is fetched from Supabase at runtime. Static site text (hero, intro, features, CTA, mission heading) is hardcoded in `src/data/index.ts` — never from DB.

### Dynamic queries in `src/lib/supabase.ts`:
- `getStats()` — homepage statistics
- `getPartners()` — partner logos and links
- `getMembers()` — teacher advisors, core team, general members
- `getMissionList()` — all active missions (show: true)
- `getMissionInfo(slug)` — single mission detail with stats/timeline/partners
- `getMissionImages(slug)` — mission image gallery
- `getAllGalleryImages()` — batch query all mission images (handles 100+)
- `getAnnouncementList()` — all active announcements (active: true)
- `getAnnouncementDetail(id)` — single announcement full detail
- `submitContactForm()` — contact form submission

## Adding Content

### New Mission
1. Insert into Supabase `missions` table with `show: true`
2. Upload images to Supabase Storage bucket `ruclub/static/assets/mission/mission-NN/`
3. Add images to `mission_images` table with `mission_id` matching

### New Announcement
1. Insert into Supabase `announcements` table with `active: true`
2. Upload image to Supabase Storage bucket `ruclub/static/assets/announcements/`

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
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
- **Website:** [ruclub.rweb.site](https://ruclub.rweb.site)
- **GitHub:** [github.com/RU-Club-Motherland](https://github.com/RU-Club-Motherland)
- **Facebook:** [RU Club Motherland](https://facebook.com/profile.php?id=61585206314774)
- **Instagram:** [@rucl.ub](https://instagram.com/rucl.ub/)
- **Email:** ruclubmotherland@gmail.com
