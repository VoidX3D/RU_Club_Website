# AGENTS — Project Guide

## Overview
RU Club Motherland is a **React 19 + TypeScript 6 + Vite 8** SPA for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Hardcoded static text from `src/data/index.ts`. Dynamic data from **Supabase**. Deployed on **Vercel**.

## Tech Stack
- **Framework:** React 19 + TypeScript 6
- **Build:** Vite 8 + Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Backend:** Supabase (Postgres + Storage)
- **Animations:** Framer Motion + AOS
- **Carousel:** Swiper 12
- **Markdown:** marked + DOMPurify + KaTeX
- **SEO:** react-helmet-async
- **Analytics:** GA4 dual-tag (`G-HWFPCZ4W1Q`, `G-HJTLGVDNYK`) + @vercel/analytics
- **State:** React hooks (no state library)

## Architecture
```
/                       → Root — config only
├── public/
│   ├── static/assets/      → Brand, icons, partner logos, mission images
│   └── sitemap.xml         → 10 URLs, all lastmod 2026-06-12
├── src/
│   ├── App.tsx             → All routes, lazy-loaded with Suspense+PageLoader
│   ├── main.tsx            → Entry (StrictMode → #root)
│   ├── index.css           → Tailwind v4 + theme tokens + animations + Swiper styles
│   ├── lib/
│   │   ├── supabase.ts     → ALL DB queries (9 exports + DataError + retry)
│   │   ├── analytics.ts    → GA4 dual-tag init + scroll/outbound/download tracking
│   │   ├── utils.ts        → cn(), storageUrl(), handleImgError()
│   │   └── changelog-parser.ts → parseChangelog(), formatVersionCount() — pure functions
│   ├── hooks/
│   │   ├── useTheme.ts     → Dark/light toggle (localStorage + prefers-color-scheme)
│   │   ├── useSiteData.ts  → Generic fetcher with loading/error/refetch (online+visibility)
│   │   ├── usePageTracking.ts → GA4 page_view on route change
│   │   ├── useDBStatus.ts  → Supabase connectivity (polls every 30s)
│   │   └── useSiteConfig.tsx → React context for hardcoded site config
│   ├── components/
│   │   ├── Layout.tsx      → Root layout (nav+footer+AOS+scroll-to-top+SEO+consent+offline)
│   │   ├── SEOHead.tsx     → OG/Twitter/JSON-LD head tags
│   │   ├── CookieConsent.tsx → GDPR banner (accept/deny via analytics.ts)
│   │   ├── ErrorBoundary.tsx → Class-based error boundary with Try Again
│   │   ├── ConnectionStatus.tsx → Offline/Back-online banner
│   │   ├── layout/
│   │   │   ├── Navbar.tsx  → Fixed nav, logo+text, theme toggle, mobile menu, active link
│   │   │   ├── Footer.tsx  → 4-col grid, social icons, DB dot, staggered entrance
│   │   │   ├── LegalNav.tsx → Sidebar nav for 3 legal pages
│   │   │   └── LegalLayout.tsx → Layout for legal pages (sidebar + prose + Framer Motion)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx → Full-viewport hero with bg image, gradient text, CTAs
│   │   │   ├── IntroSection.tsx → "Who We Are" centered text (dangerouslySetInnerHTML)
│   │   │   ├── StatsSection.tsx  → 4-stat row from DB (fallback to hardcoded)
│   │   │   ├── FeaturesSection.tsx → 3-card grid with inline SVG icons
│   │   │   ├── MissionCarousel.tsx → Swiper carousel, active missions, loading/error/empty
│   │   │   ├── PartnersSection.tsx → Infinite scroll logo strip, pause on hover
│   │   │   └── CTASection.tsx  → Centered CTA with two buttons
│   │   └── changelog/
│   │       ├── ParticleField.tsx → Canvas particle background (mouse-responsive)
│   │       ├── FadeInView.tsx   → Framer Motion scroll-triggered fade wrapper
│   │       └── VersionCard.tsx  → Accordion version card with color-coded badges
│   └── pages/              → 13 lazy-loaded pages + 1 legal page
│       ├── Home.tsx, Missions.tsx, MissionDetail.tsx, Gallery.tsx
│       ├── Announcements.tsx, AnnouncementDetail.tsx, Members.tsx, Contact.tsx
│       ├── Changelog.tsx    → Standalone (no Layout), particle bg, animated title, timeline
│       ├── SecretGarden.tsx → Standalone, personal portfolio with particle canvas
│       ├── Privacy.tsx, License.tsx, Consent.tsx  → Static legal via LegalLayout
│       └── NotFound.tsx     → Animated 404 with gradient text
├── supabase-migration.sql  → Full schema (14 tables) + seed data + RLS
├── .env.example
├── vercel.json             → SPA rewrites + security headers + CSP + redirects
├── AGENTS.md
├── DOCUMENTATION.md
├── README.md
├── CHANGELOG.md            → Keep a Changelog format, parsed at build time for /changelog
└── LICENSE
```

## Data Flow
### HARDCODED (never from DB):
- `src/data/index.ts`: hero section, intro/about, features, CTA, mission section text, nav items, footer links, social links, site config

### DYNAMIC (from Supabase):
1. Each page calls its function from `src/lib/supabase.ts`:
   - **Home (StatsSection):** `getStats()`
   - **Home (PartnersSection):** `getPartners()`
   - **Home (MissionCarousel):** `getMissionList()`
   - **Missions:** `getMissionList()`
   - **Mission Detail:** `getMissionInfo(slug)` (7 sub-queries: images, stats, partners, goals, timeline, participants, budget)
   - **Gallery:** `getAllGalleryImages()` (batch query, handles 100+ images)
   - **Announcements:** `getAnnouncementList()`
   - **Announcement Detail:** `getAnnouncementDetail(id)`
   - **Members:** `getMembers()`
   - **Contact:** `submitContactForm()`
2. Images served from **Supabase Storage** via `storageUrl()` in `src/lib/utils.ts`
3. Static assets (brand, icons) always use `/static/assets/` paths — never DB
4. Changelog data parsed from `CHANGELOG.md` at build time via `?raw` import (not DB)

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
- Changelog page is standalone (no Layout wrapper), uses `CHANGELOG.md?raw` Vite import
- AOS init in Layout with 600ms duration, offset 50, `once: true`, refreshes 100ms after route change
- Framer Motion used for staggered entrances and `whileInView` animations alongside AOS
- All pages lazy-loaded via `React.lazy()` for code splitting

## Build/Deploy
- `npm run build` → `tsc -b && vite build` → `dist/`
- Vercel auto-deploys from `main` via `vercel.json`
- `vercel.json`: SPA rewrites, clean URLs, no trailing slashes, /admin redirect, security headers + CSP

## Environment Variables (required)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Pages & Routes
| Route | Component | Data | Layout | Notes |
|---|---|---|---|---|
| `/` | Home | stats, partners, missions | Layout | 7 sub-components |
| `/missions` | Missions | getMissionList | Layout | Grid of mission cards |
| `/mission/:slug` | MissionDetail | getMissionInfo | Layout | Lightbox, markdown, budget |
| `/gallery` | Gallery | getAllGalleryImages | Layout | Grouped by mission, paginated |
| `/announcements` | Announcements | getAnnouncementList | Layout | Status badges |
| `/announcement/:id` | AnnouncementDetail | getAnnouncementDetail | Layout | Markdown + tags |
| `/members` | Members | getMembers | Layout | 3 tables + stats grid |
| `/contact` | Contact | submitContactForm | Layout | Formspree + Supabase |
| `/changelog` | Changelog | CHANGELOG.md?raw | none (standalone) | Particle bg, timeline |
| `/privacy` | Privacy | static | LegalLayout | 9 sections |
| `/license` | License | static | LegalLayout | 8 sections |
| `/consent` | Consent | static | LegalLayout | 5 sections + accept/decline |
| `/secret-garden` | SecretGarden | static | none (standalone) | Portfolio, particle canvas |
| `*` | NotFound | static | Layout | Animated 404 |

## Credits
Built by **Sincere Bhattarai** (@VoidX3D) — Student at Motherland Secondary School, Class 10.
Managed by **Motherland Secondary School**, Pokhara, Nepal.
