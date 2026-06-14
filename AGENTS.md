# AGENTS — Project Guide

## Overview
RU Club Motherland is a **React 19 + TypeScript 6 + Vite 8** SPA for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Hardcoded static text from `src/data/index.ts`. Dynamic data from **Supabase**. Sitemap auto-generated at build time. Deployed on **Vercel** (auto-deploys from `main`).

## Tech Stack
- **Framework:** React 19 + TypeScript 6
- **Build:** Vite 8 + Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Backend:** Supabase (Postgres + Storage)
- **Animations:** Framer Motion + AOS
- **Carousel:** Swiper 12
- **Markdown:** marked + DOMPurify + KaTeX
- **SEO:** react-helmet-async
- **Analytics:** GA4 triple-tag (`G-HWFPCZ4W1Q`, `G-HJTLGVDNYK`, `G-QC1WT8TF66`) + @vercel/analytics
- **Email Validation:** `validateEmail()` in `src/lib/utils.ts` (RFC 5322 + disposable block + typo detection)
- **State:** React hooks (no state library)

## Architecture
```
/                       → Root — config only
├── public/
│   ├── static/assets/      → Brand, icons, partner logos, mission images
│   ├── sitemap.xml         → Auto-generated at build time by scripts/generate-sitemap.mjs
│   └── google*.html        → Google Search Console verification files
├── src/
│   ├── App.tsx             → All routes, lazy-loaded with Suspense+PageLoader + VersionBanner + LazyRoute chunk recovery
│   ├── main.tsx            → Entry (StrictMode → #root) + chunk error handlers
│   ├── index.css           → Tailwind v4 + theme tokens + animations + Swiper styles
│   ├── lib/
│   │   ├── supabase.ts     → ALL DB queries (9 exports + DataError + retry with 3s backoff)
│   │   ├── analytics.ts    → GA4 triple-tag init + scroll/outbound/download tracking
│   │   ├── utils.ts        → cn(), storageUrl(), handleImgError(), validateEmail()
│   │   └── markdown.ts       → renderMarkdown() — marked + DOMPurify + KaTeX pipeline
│   ├── hooks/
│   │   ├── useTheme.ts     → Dark/light toggle (localStorage + prefers-color-scheme)
│   │   ├── useSiteData.ts  → Generic fetcher with loading/error/refetch (online+visibility, keeps data on refetch)
│   │   ├── usePageTracking.ts → GA4 page_view on route change
│   │   ├── useDBStatus.ts  → Supabase connectivity (polls every 30s)
│   │   └── useSiteConfig.tsx → React context for hardcoded site config
│   ├── components/
│   │   ├── Layout.tsx      → Root layout (nav+footer+AOS+scroll-to-top+SEO+consent+offline)
│   │   ├── SEOHead.tsx     → OG/Twitter/JSON-LD head tags
│   │   ├── VersionBanner.tsx → New deploy detection via __APP_VERSION__ timestamp
│   │   ├── CookieConsent.tsx → GDPR banner (accept/deny via analytics.ts)
│   │   ├── ErrorBoundary.tsx → Class-based error boundary with chunk detection + cache reset
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
│   │       └── FadeInView.tsx   → Framer Motion scroll-triggered fade wrapper
│   └── pages/              → 13 lazy-loaded pages + 1 legal page
│       ├── Home.tsx, Missions.tsx, MissionDetail.tsx, Gallery.tsx
│       ├── Announcements.tsx, AnnouncementDetail.tsx, Members.tsx, Contact.tsx
│       ├── Changelog.tsx    → Standalone (no Layout), particle bg, animated title, timeline
│       ├── SecretGarden.tsx → Standalone, personal portfolio with particle canvas
│       ├── Privacy.tsx, License.tsx, Consent.tsx  → Static legal via LegalLayout
│       └── NotFound.tsx     → Animated 404 with gradient text
├── scripts/
│   ├── generate-sitemap.mjs  → Auto-generates public/sitemap.xml at build time (static + dynamic routes from Supabase)
│   └── update-domain.sh      → Switches domain across all static files
├── supabase-migration.sql  → Full schema (14 tables) + seed data + RLS + rate-limit trigger
├── .env.example
├── vercel.json             → SPA rewrites + security headers + CSP + redirects
├── AGENTS.md
├── DOCUMENTATION.md
├── README.md
├── CHANGELOG.md            → Keep a Changelog format — MUST update on every major change
└── LICENSE
```

## Data Flow
### HARDCODED (never from DB):
- `src/data/index.ts`: hero section, intro/about, features, CTA, mission section text, nav items, footer links, social links, site config, SITE_URL

### DYNAMIC (from Supabase):
1. Each page calls its function from `src/lib/supabase.ts`:
   - **Home (StatsSection):** `getStats()`
   - **Home (PartnersSection):** `getPartners()`
   - **Home (MissionCarousel):** `getMissionList()`
   - **Missions:** `getMissionList()`
   - **Mission Detail:** `getMissionInfo(slug)` (7 sub-queries)
   - **Gallery:** `getAllGalleryImages()`
   - **Announcements:** `getAnnouncementList()`
   - **Announcement Detail:** `getAnnouncementDetail(id)`
   - **Members:** `getMembers()`
   - **Contact:** `submitContactForm()`
2. Images served from **Supabase Storage** via `storageUrl()` in `src/lib/utils.ts`
3. Static assets (brand, icons) always use `/static/assets/` paths — never DB
4. Changelog data parsed from `CHANGELOG.md` at build time via `?raw` import (not DB)
5. Sitemap auto-generated at build time by `scripts/generate-sitemap.mjs` (uses Supabase env vars if available)

## Key Conventions
- Static site text hardcoded in `src/data/index.ts` — NEVER use DB
- DB only for: stats, missions (ALL data), announcements, members, partners, contacts
- Image paths in DB use relative paths; `storageUrl()` resolves to Supabase Storage
- All SVGs are hardcoded inline in JSX
- Absolute paths (`/static/...`) for static assets across hosting
- Missions need `show: true`, announcements need `active: true` to appear
- All pages have skeleton loading, error, and empty states
- ErrorBoundary wraps all routes with "Try Again" reset
- GA4 triple-tag in `src/lib/analytics.ts` — single source of truth
- `G-QC1WT8TF66` always fires; `G-HWFPCZ4W1Q`, `G-HJTLGVDNYK` require cookie consent
- Theme persisted in localStorage with `dark` class on `<html>`, respects prefers-color-scheme
- Changelog page is standalone (no Layout wrapper), uses `CHANGELOG.md?raw`
- All pages lazy-loaded via `React.lazy()` for code splitting
- Chunk error recovery: 3 global handlers + LazyRoute per-route wrapper
- Version detection: `__APP_VERSION__` build timestamp, VersionBanner compares on each visit
- **Every `<img>` must have explicit `width` and `height`** attributes to prevent CLS
- `useSiteData` refetch preserves existing data (no skeleton flash on visibility change)
- Sitemap auto-generated at build time — includes static + dynamic routes from Supabase

## CRITICAL — ALWAYS Follow These Rules

### 1. CHANGELOG & Version
- **Every major change** (new feature, fix, refactor, SEO update, DB change) **MUST** update `CHANGELOG.md`
- Format: [Keep a Changelog](https://keepachangelog.com/) — `### Added | Changed | Fixed | Removed | Security`
- Mark each change with date: `### [Unreleased]` → move to version on deploy
- Update `package.json` version (`"version": "0.0.0"`) on significant releases

### 2. Security — No Secrets in Code
- **NEVER** put API keys, tokens, passwords in source code
- All secrets go in `.env` (gitignored)
- Service role keys (`service_role`, `SUPABASE_SERVICE_KEY`) must **NEVER** be imported in `src/`
- Anon key is safe for client-side use (RLS protects the DB)
- Before committing: run `rg -n 'eyJ\|sk_\|pk_\|ghp_\|secret\|password\|token' src/` to check
- Google verification files (`google*.html`) belong in `public/` (served at root)

### 3. Rate Limiting
- Contact form: **max 5 submissions per email per hour** (DB trigger `check_contact_rate_limit()`)
- Client-side: **10s cooldown** between form submissions (`lastSubmit` ref)
- Data fetching: 3 retries with 3s backoff (`supabase.ts:59`)
- Visibility refetch: debounce via React state guard (no rapid re-fetches)

### 4. Data Cleaning & Malicious Input Protection
- **Email**: `validateEmail()` in `utils.ts` — RFC 5322 regex, disposable domain block (30+ domains), common typo detection (gmail.com variants), role-based prefix block (admin@, info@)
- **Contact form**: Column validation (`name/email/subject/message IS NOT NULL AND != ''`) in RLS policy + DB trigger
- **Markdown rendering**: `DOMPurify.sanitize()` before `dangerouslySetInnerHTML`
- **Supabase queries**: Parameterized queries via supabase-js (no SQL injection)
- **All user input**: Trimming via `.trim()` before validation/storage
- **DB rate-limit trigger**: Prevents spam even if client validation is bypassed

### 5. Performance (CLS Prevention)
- Every `<img>` **MUST** have `width` and `height` attributes (even if CSS `object-cover` overrides)
- Skeleton placeholders must match content dimensions (use `min-h` matching the font-size)
- `useSiteData` must NEVER re-render skeletons when data already exists
- Font loading: use `display=optional` (no FOUT reflow)
- Swiper/Slider containers: never put `data-aos` directly on them — wrap in a `<div>`

### 6. Domain Management
- Single source of truth: `SITE_URL` constant in `src/data/index.ts`
- All TS/TSX files import from it
- Static files updated via `bash scripts/update-domain.sh OLD NEW`
- Sitemap generator reads `SITE_URL` from env or defaults to `https://ruclub.rweb.site`

## Build/Deploy
- `npm run build` → `node scripts/generate-sitemap.mjs && rm -rf .vite dist && tsc -b && vite build` → `dist/`
- `npm run build:analyze` → `vite build --mode analyze` (bundle visualization)
- Vercel auto-deploys from `main` via `vercel.json`
- CI runs on push to `main`/`feat-*` and PRs: build + typecheck + sitemap validation
- Weekly CI (Monday) auto-commits updated sitemap with fresh dates

## Environment Variables (required)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Optional:
```
SITE_URL=https://ruclub.rweb.site           # Override default domain for sitemap
VITE_SUPABASE_SERVICE_KEY=your-service-key  # NEVER import in src/ — use only in scripts/migrations
```

## Pages & Routes
| Route | Component | Data Source | Layout | Notes |
|---|---|---|---|---|
| `/` | Home | stats, partners, missions (DB) | Layout | 7 sub-components |
| `/missions` | Missions | getMissionList (DB) | Layout | Grid of mission cards |
| `/mission/:slug` | MissionDetail | getMissionInfo (7 sub-queries) | Layout | Lightbox, markdown, budget |
| `/gallery` | Gallery | getAllGalleryImages (DB) | Layout | Grouped by mission, paginated |
| `/announcements` | Announcements | getAnnouncementList (DB) | Layout | Status badges |
| `/announcement/:id` | AnnouncementDetail | getAnnouncementDetail (DB) | Layout | Markdown + tags |
| `/members` | Members | getMembers (DB) | Layout | 3 tables + stats grid |
| `/contact` | Contact | submitContactForm (DB + Formspree) | Layout | Email validation, rate-limited |
| `/changelog` | Changelog | CHANGELOG.md?raw (static) | none (standalone) | Particle bg, timeline |
| `/privacy` | Privacy | static | LegalLayout | 9 sections |
| `/license` | License | static | LegalLayout | 8 sections |
| `/consent` | Consent | static | LegalLayout | 5 sections + accept/decline |
| `/secret-garden` | SecretGarden | static | none (standalone) | Portfolio, particle canvas |
| `*` | NotFound | static | Layout | Animated 404 |

## Critical File Map
| File | Purpose | Touched When |
|---|---|---|
| `src/data/index.ts` | All hardcoded site text + SITE_URL | Content changes, domain change |
| `src/lib/supabase.ts` | ALL DB query functions | Schema changes, new queries |
| `src/lib/utils.ts` | cn(), storageUrl(), validateEmail() | New utilities |
| `src/hooks/useSiteData.ts` | Generic data fetcher (BE CAREFUL — infinite loop risk) | Any data fetching logic change |
| `src/lib/analytics.ts` | GA4 triple-tag, consent, scroll tracking | Analytics changes |
| `src/components/SEOHead.tsx` | Structured data, OG/Twitter, JSON-LD | SEO changes |
| `public/sitemap.xml` | Auto-generated at build time | N/A (read-only output) |
| `scripts/generate-sitemap.mjs` | Sitemap generator | New routes, domain changes |
| `supabase-migration.sql` | Full DB schema + migrations | Schema, RLS, trigger changes |
| `CHANGELOG.md` | Change log (Keep a Changelog) | **Every major change** |
| `vercel.json` | Vercel config, CSP headers, rewrites | Security header changes |

## Security Checklist (Run Before Every Deploy)
1. [ ] No secrets in staged files: `rg -n 'eyJ\|sk_\|pk_\|ghp_\|secret\|password\|token' src/`
2. [ ] `.env.*` files not staged: `git status` shows no `.env` files
3. [ ] `google-site-verification` meta tag is the real code, not `"verified"`
4. [ ] Service role key not imported anywhere in `src/` (only in `scripts/` or migration tools)
5. [ ] Contact form rate-limit trigger exists in Supabase (max 5/email/hour)
6. [ ] `npm run build` succeeds (typescript + vite)
7. [ ] CHANGELOG.md updated for the change
8. [ ] Every new `<img>` has `width` and `height` attributes

## Credits
Built by **Sincere Bhattarai** (@VoidX3D) — Student at Motherland Secondary School, Class 10.
Managed by **Motherland Secondary School**, Pokhara, Nepal.
