# AGENTS — Project Guide

## Overview
RU Club Motherland is a **React + TypeScript + Vite** SPA for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Hardcoded static text from `src/data/index.ts`. Dynamic data from **Supabase**. Deployed on **Vercel**.

## Tech Stack
- **Framework:** React 19 + TypeScript 6
- **Build:** Vite 8 + Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Backend:** Supabase (Postgres + Storage)
- **Animations:** Framer Motion + AOS
- **Carousel:** Swiper 12
- **SEO:** react-helmet-async
- **Analytics:** GA4 (G-HWFPCZ4W1Q, G-HJTLGVDNYK)
- **State:** React hooks (no state library)

## Architecture
```
/                   → Root — config only
├── public/             → Static assets (brand, icons, partners, mission images)
├── src/
│   ├── App.tsx             → All routes, lazy-loaded pages
│   ├── main.tsx            → Entry
│   ├── index.css           → Tailwind v4 + theme tokens + animations
│   ├── lib/
│   │   ├── supabase.ts     → ALL DB queries (stats, partners, members, missions,
│   │   │                     announcements, contact_submissions)
│   │   ├── analytics.ts    → GA4 dual-tag init + consent
│   │   └── utils.ts        → cn(), storageUrl()
│   ├── hooks/
│   │   ├── useTheme.ts     → Dark/light toggle (localStorage + prefers-color-scheme)
│   │   ├── useSiteData.ts  → Generic fetcher with loading/error/refetch states
│   │   ├── usePageTracking.ts → GA4 page view tracking
│   │   ├── useDBStatus.ts  → Supabase connectivity indicator
│   │   └── useSiteConfig.tsx → React context for hardcoded site config
│   ├── components/
│   │   ├── Layout.tsx       → Root layout (navbar + footer + AOS + scroll-to-top)
│   │   ├── SEOHead.tsx      → OG/Twitter/JSON-LD tags
│   │   ├── CookieConsent.tsx → GDPR consent banner
│   │   ├── ErrorBoundary.tsx → Global error boundary with Try Again
│   │   ├── ConnectionStatus.tsx → Offline/online banner
│   │   ├── layout/
│   │   │   ├── Navbar.tsx   → Fixed nav, left logo+text, theme toggle, mobile menu
│   │   │   ├── Footer.tsx   → Brand info, social, DB status, quick links, legal, contact
│   │   │   ├── LegalNav.tsx → Sidebar nav for legal pages
│   │   │   └── LegalLayout.tsx → Layout for legal pages (sidebar + prose)
│   └── pages/               → 13 page components (lazy-loaded)
│   └── types/index.ts       → All TypeScript interfaces
├── supabase-migration.sql   → Full schema + seed data (dynamic tables only)
├── .env.example
├── vercel.json              → SPA rewrites + admin redirect
├── AGENTS.md
├── README.md
└── LICENSE
```

## Data Flow
### HARDCODED (never from DB):
- `src/data/index.ts`: hero section, intro/about, features, CTA, mission section text, nav items, footer links, social links, site config

### DYNAMIC (from Supabase):
1. Each page calls its DB function from `src/lib/supabase.ts`:
   - **Home:** `getStats()`, `getPartners()`, `getMissionList()`
   - **Missions/Gallery:** `getMissionList()`
   - **Mission Detail:** `getMissionInfo(slug)` (includes structured images with alt text, participants, budget)
   - **Gallery:** `getAllGalleryImages()` (batch query, handles 100+ images)
   - **Announcements:** `getAnnouncementList()`
   - **Announcement Detail:** `getAnnouncementDetail(id)`
   - **Members:** `getMembers()`
   - **Contact:** `submitContactForm()`
2. Images served from **Supabase Storage** via `storageUrl()` in `src/lib/utils.ts`
3. Static assets (brand, icons) always use `/static/assets/` paths — never DB

## Key Conventions
- Static site text hardcoded in `src/data/index.ts` — NEVER use DB
- DB only for: stats, missions (ALL data), announcements, members, partners, contacts
- Image paths in DB use relative paths; `storageUrl()` resolves to Supabase Storage
- All SVGs are hardcoded inline in JSX (in Footer, Navbar, Home pages)
- Absolute paths (`/static/...`) for static assets across hosting
- Missions need `show: true`, announcements need `active: true` to appear
- All pages have skeleton loading, error, and empty states
- ErrorBoundary wraps all routes with "Try Again" reset
- GA4 dual-tag in `src/lib/analytics.ts` — single source of truth
- Theme persisted in localStorage with `dark` class on `<html>`, respects prefer-color-scheme
- Inventory of 3 static pages (Privacy, License, Consent) with LegalLayout sidebar
- Secret Garden infinite canvas particle background + custom scrollbar hidden

## Build/Deploy
- `npm run build` → `tsc -b && vite build` → `dist/`
- Vercel auto-deploys from `main` via `vercel.json`
- `vercel.json`: SPA rewrites, clean URLs, no trailing slashes, /admin redirect

## Environment Variables (required)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Pages & Routes
| Route | Component | Data | Layout |
|---|---|---|---|
| `/` | Home | stats, partners, missions | Layout |
| `/missions` | Missions | getMissionList | Layout |
| `/mission/:slug` | MissionDetail | getMissionInfo | Layout |
| `/gallery` | Gallery | getAllGalleryImages | Layout |
| `/announcements` | Announcements | getAnnouncementList | Layout |
| `/announcement/:id` | AnnouncementDetail | getAnnouncementDetail | Layout |
| `/members` | Members | getMembers | Layout |
| `/contact` | Contact | submitContactForm | Layout |
| `/privacy` | Privacy | static | LegalLayout |
| `/license` | License | static | LegalLayout |
| `/consent` | Consent | static | LegalLayout |
| `/secret-garden` | SecretGarden | static | none (no nav/footer) |
| `*` | NotFound | static | Layout |

## Credits
Built by **Sincere Bhattarai** (@VoidX3D) — Student at Motherland Secondary School, Class 10.
Managed by **Motherland Secondary School**, Pokhara, Nepal.
