# AGENTS — Project Guide

## Overview
RU Club Motherland is a **React + TypeScript + Vite** SPA for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. All data is served from **Supabase** (no JSON files). Deployed on **Vercel**.

## Tech Stack
- **Framework:** React 19 + TypeScript 6
- **Build:** Vite 8 + Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Backend:** Supabase (Postgres + Storage)
- **Animations:** Framer Motion + AOS
- **Carousel:** Swiper 12
- **SEO:** react-helmet-async
- **Analytics:** GA4 (G-HWFPCZ4W1Q, G-HJTLGVDNYK)
- **State:** Zustand

## Architecture
```
/                   → Root — config only
├── public/             → Static assets (brand, icons, partners, mission images)
├── src/
│   ├── App.tsx             → All routes
│   ├── main.tsx            → Entry
│   ├── index.css           → Tailwind v4 + theme tokens + animations
│   ├── lib/
│   │   ├── supabase.ts     → ALL DB queries (site_config, content, stats, partners,
│   │   │                     members, missions, announcements, contact_submissions)
│   │   ├── analytics.ts    → GA4 dual-tag init
│   │   └── utils.ts        → cn(), formatDate()
│   ├── hooks/
│   │   ├── useTheme.ts     → Dark/light toggle (localStorage)
│   │   ├── useSiteData.ts  → Generic fetcher with loading/error states
│   │   ├── usePageTracking.ts → GA4 page view tracking
│   │   └── useSEO.ts       → Per-page SEO helper
│   ├── components/
│   │   ├── Layout.tsx       → Root layout (navbar + footer + AOS + scroll-to-top)
│   │   ├── SEOHead.tsx      → OG/Twitter/JSON-LD tags
│   │   ├── CookieConsent.tsx → GDPR consent banner
│   │   ├── layout/
│   │   │   ├── Navbar.tsx   → Fixed nav, left logo+text, theme toggle, mobile menu
│   │   │   └── Footer.tsx   → Brand info, social, quick links, legal, contact
│   │   └── home/            → Home page section components
│   ├── pages/               → 13 page components
│   └── types/index.ts       → All TypeScript interfaces
├── supabase-migration.sql   → Full schema + seed data
├── .env.example
├── vercel.json              → SPA rewrites
├── AGENTS.md
├── README.md
└── LICENSE
```

## Data Flow (ALL from Supabase, NO JSON files)
1. `Layout.tsx` wraps all routes — inits AOS + scroll-to-top on route change
2. `Navbar.tsx` gets nav items from site_config DB table
3. Each page calls its DB function from `lib/supabase.ts`:
   - **Home:** `getStats()`, `getPartners()`, `getContent()`, `getMissionList()`
   - **Missions/Gallery:** `getMissionList()`
   - **Mission Detail:** `getMissionInfo(slug)`, `getMissionImages(id)`
   - **Announcements:** `getAnnouncementList()`
   - **Announcement Detail:** `getAnnouncementDetail(id)`
   - **Members:** `getMembers()`
   - **Contact:** `submitContactForm()`
4. Images served from **Supabase Storage** with fallback to `/static/assets/` local paths

## Adding a New Mission
1. Insert into Supabase `missions` table with `show: true`
2. Upload images to Supabase Storage bucket `ruclub/static/assets/mission/mission-NN/`
3. Or place images in `public/static/assets/mission/mission-NN/` for local fallback

## Adding a New Announcement
1. Insert into Supabase `announcements` table with `active: true`
2. Upload image to Supabase Storage bucket `ruclub/static/assets/announcements/`

## Key Conventions
- All dynamic data from Supabase DB — never use JSON files
- Image paths in DB use relative paths; `getImageUrl()` resolves to Storage/local
- All SVGs in `/static/assets/icons/` — never hardcode in JSX
- Absolute paths (`/static/...`) for reliability across hosting
- Missions need `show: true`, announcements need `active: true` to appear
- Clean URLs via Vercel `rewrites` + Cloudflare `_redirects`
- GA4 dual-tag in `src/lib/analytics.ts` — single source of truth
- Theme persisted in localStorage with `dark` class on `<html>`

## Build/Deploy
- `npm run build` → `tsc -b && vite build` → `dist/`
- Vercel auto-deploys from `main` via `vercel.json`
- `vercel.json`: SPA rewrites, clean URLs, no trailing slashes

## Environment Variables (required)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GA_ID=G-HWFPCZ4W1Q
```

## Pages & Routes
| Route | Component | Data |
|---|---|---|
| `/` | Home | stats, partners, content, missions |
| `/missions` | Missions | getMissionList |
| `/mission/:slug` | MissionDetail | getMissionInfo |
| `/gallery` | Gallery | getMissionList |
| `/announcements` | Announcements | getAnnouncementList |
| `/announcement/:id` | AnnouncementDetail | getAnnouncementDetail |
| `/members` | Members | getMembers |
| `/contact` | Contact | submitContactForm |
| `/privacy` | Privacy | static |
| `/license` | License | static |
| `/consent` | Consent | static |
| `/secret-garden` | SecretGarden | static |
| `*` | NotFound | static |

## Credits
Built by **Sincere Bhattarai** (@VoidX3D) — Student at Motherland Secondary School, Class 10.
Managed by **Motherland Secondary School**, Pokhara, Nepal.
