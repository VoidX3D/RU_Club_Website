# RU Club Motherland — Documentation

## Overview

RU Club Motherland is a single-page application (SPA) for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Built with React 19 + TypeScript 6 + Vite 8, styled with Tailwind CSS v4, backed by Supabase, and deployed on Vercel.

**Domain:** `ruclub.rweb.site` (prod) / `ruclubmss.vercel.app` (test)

**Developer:** Sincere Bhattarai (@VoidX3D)

---

## Architecture

```
/
├── public/
│   ├── static/assets/       — Static brand assets, icons, partner logos, mission images
│   └── sitemap.xml          — 10 URLs, lastmod 2026-06-12
├── src/
│   ├── App.tsx              — Route definitions + VersionBanner + LazyRoute chunk recovery
│   ├── main.tsx             — Entry point + chunk error handlers (vite:preloadError, onerror)
│   ├── index.css            — Tailwind v4 + custom theme tokens + animations + Swiper
│   ├── lib/                 — Core libraries
│   │   ├── supabase.ts      — 9 DB query functions + DataError + retry wrapper
│   │   ├── analytics.ts     — GA4 dual-tag init, consent, scroll/outbound/download tracking
│   │   ├── utils.ts         — cn(), storageUrl(), handleImgError()
│   │   └── changelog-parser.ts  — Pure functions: parseChangelog(), formatVersionCount()
│   ├── hooks/
│   │   ├── useTheme.ts      — Dark/light toggle with localStorage + prefers-color-scheme
│   │   ├── useSiteData.ts   — Generic async fetcher with loading/error/refetch
│   │   ├── usePageTracking.ts  — GA4 page_view on route change
│   │   ├── useDBStatus.ts   — Supabase connectivity (30s polling)
│   │   └── useSiteConfig.tsx — Context provider for hardcoded site config
│   ├── components/
│   │   ├── Layout.tsx       — Root layout (nav+footer+AOS+scroll-to-top+SEO+consent+offline)
│   │   ├── SEOHead.tsx      — OG/Twitter/JSON-LD head tags
│   │   ├── VersionBanner.tsx— "New version available" banner (compares __APP_VERSION__)
│   │   ├── CookieConsent.tsx → GDPR banner (accept/deny via analytics.ts)
│   │   ├── ErrorBoundary.tsx → Class-based error boundary with chunk detection + cache reset
│   │   ├── ConnectionStatus.tsx → Offline/Back-online banner
│   │   ├── layout/          — Navbar, Footer, LegalNav, LegalLayout
│   │   ├── home/            — HeroSection, IntroSection, StatsSection, FeaturesSection,
│   │   │                      MissionCarousel, PartnersSection, CTASection
│   │   └── changelog/       — ParticleField, FadeInView, VersionCard
│   ├── pages/               — 13 page components (all lazy-loaded)
│   ├── types/index.ts       — All TypeScript interfaces
│   └── data/index.ts        — All hardcoded static site text
├── supabase-migration.sql   — 14 tables + seed data + RLS policies
├── vercel.json              — SPA rewrites, CSP, security headers, redirects
├── CHANGELOG.md             — Keep a Changelog format (334 lines)
├── AGENTS.md                — AI assistant project guide
├── DOCUMENTATION.md         — This file
├── README.md
└── LICENSE
```

---

## File-by-File Reference

### `src/App.tsx`
- **Purpose:** Root routing component. Defines all routes with `react-router-dom` (v7).
- **Layout wrappers:**
  - `<Layout />` wraps: `/`, `/missions`, `/mission/:slug`, `/gallery`, `/announcements`, `/announcement/:id`, `/members`, `/contact`, `*` (NotFound)
  - `<LegalLayout />` wraps: `/privacy`, `/license`, `/consent`
  - Standalone (no layout): `/changelog`, `/secret-garden`
- **Key detail:** All pages imported via `React.lazy()` for code splitting. `Suspense` fallback is `<PageLoader />` — full-screen emerald spinner with bouncing dots.
- **Chunk recovery:** Each route wrapped in `<LazyRoute>` which catches chunk load errors and shows a refresh prompt.
- **Version check:** Includes `<VersionBanner />` which compares `__APP_VERSION__` against localStorage to detect new deployments.
- **Error boundary:** Wraps entire app.

### `src/main.tsx`
- **Purpose:** Application entry point. Mounts `<App />` under `<StrictMode>` into `#root`.
- **Chunk error recovery:** Three global handlers auto-reload on chunk load failures:
  - `window.addEventListener('vite:preloadError', ...)` — Vite-specific dynamic import error
  - `window.onerror` — catches `Failed to fetch dynamically imported module`, `ChunkLoadError`, etc.
  - `window.addEventListener('unhandledrejection', ...)` — catches chunk errors in promise chains
- **Imports:** `./index.css` for global styles.

### `src/index.css` (265 lines)
- **Purpose:** Global styles — Tailwind v4 entry, custom design tokens, dark mode variant, animations, Swiper overrides.
- **Key tokens:**
  - `brand-50` through `brand-950` — teal/emerald palette
  - Light surface colors: `surface`, `surface-secondary`, `surface-tertiary`, `border`, `text-primary`, `text-secondary`, `text-muted`
  - Dark variants: `dark-surface`, `dark-surface-secondary`, `dark-surface-tertiary`, `dark-border`, `dark-text-muted`
  - Fonts: `Outfit` (sans), `Space Grotesk` (display)
- **Custom animations:** `fade-in`, `fade-up`, `slide-down`, `float`, `pulse-slow`, `scroll`, `spin-slow`
- **Dark mode:** `.dark` class on `<html>`, variant: `@custom-variant dark (&:where(.dark, .dark *))`
- **Swiper overrides:** `.mission-carousel` styles centered slides (80vw), 16:9 aspect, inactive blurred/greyed, active gets scale(1) + shadow + teal glow. Pagination: active dot is 24px pill. Arrows: glassmorphism, visible on hover.
- **Scrollbar:** Hidden globally (`scrollbar-width: none`).

### `src/types/index.ts` (160 lines)
- **Purpose:** All TypeScript interfaces for the project.
- **Key interfaces:**
  | Interface | Fields | Used By |
  |---|---|---|
  | `SiteConfig` | meta, nav, links, contact, school, logo, social | useSiteConfig, layout components |
  | `NavItem` | label, href | Navbar |
  | `FooterLink` | label, href, section, external? | Footer |
  | `SocialLink` | platform, url | Footer, Contact |
  | `Stat` | value, label | StatsSection |
  | `Partner` | src, alt, name | PartnersSection |
  | `Member` | name, class?, role, memberType, groupName, image? | Members |
  | `MembersData` | teachers[], core[], general[], stats | Members |
  | `MissionEntry` | id, slug, title, tag, date, description, show?, featured? | Missions, MissionCarousel |
  | `MissionImageItem` | url, alt | MissionDetail, Gallery |
  | `MissionInfo` | (incl. images, stats, partners, goals, timeline, participants, budget) | MissionDetail |
  | `MissionTimeline` | title, date?, description? | MissionDetail |
  | `AnnouncementEntry` | id, title, tag, date, day?, summary, image?, active?, status? | Announcements |
  | `AnnouncementFull` | extends Entry + description?, deadline?, issuedBy?, importance?, instructions?, tags[] | AnnouncementDetail |
  | `GalleryImage` | id, url, alt, missionTitle, missionSlug, downloadUrl | Gallery |
  | `ContactFormData` | name, email, subject, message | Contact |

### `src/data/index.ts` (113 lines)
- **Purpose:** ALL hardcoded static site text. Never comes from Supabase.
- **Exports:**
  - `navItems` — 6 items (Home, Announcements, Missions, Gallery, Members, Contact)
  - `footerLinks` — 10 items (7 quick, 3 legal)
  - `socialLinks` — Facebook, Instagram, GitHub (→ /changelog), Email
  - `heroContent` — badge, title, subtitle, CTAs, bg image
  - `introContent` — "Who We Are" with 2 paragraphs (school, gov, KOICA, Doko, UNDP references)
  - `featureCards` — 3 cards: Tree Plantation, Waste Management, Awareness Education
  - `ctaContent` — "Join the Movement" with two buttons
  - `missionSectionContent` — "Latest Missions"
  - `siteConfig` — Full config: name, URL, logo paths, contact info, school info, copyright
- **Image paths:** All use `/static/assets/...` prefix.

### `src/lib/supabase.ts` (352 lines)
- **Purpose:** ALL Supabase interactions. Single source of truth for DB queries.
- **Internal helpers:**
  - `resolveImageUrl(url, prefix?)` — resolves relative DB paths to Supabase Storage URLs
  - `DataError` class — carries `table` and `code` fields
  - `classifyError(err, table)` — maps errors to user-friendly messages (NOT_FOUND, NETWORK, AUTH, TIMEOUT, CONFIG)
  - `query(fn, table, retries=2)` — retry wrapper with 3s delay
- **Exported functions:**
  - `getStats()` → `Stat[] | null` — from `stats` table, ordered by sort_order
  - `getPartners()` → `Partner[] | null` — from `partners`, resolves images with `partners/` prefix
  - `getMembers()` → `MembersData | null` — from `members`, groups into teachers/core/general with counts
  - `getMissionList()` → `MissionEntry[] | null` — `missions` where `show = true`, ordered by date desc
  - `getMissionInfo(slug)` → `MissionInfo | null` — single mission by slug + 7 parallel sub-queries (images, stats, partners, goals, timeline, participants, budget)
  - `getAllGalleryImages()` → `GalleryImage[] | null` — batch join missions + mission_images
  - `getAnnouncementList()` → `AnnouncementEntry[] | null` — `announcements` where `active = true`
  - `getAnnouncementDetail(id)` → `AnnouncementFull | null` — single announcement + tags
  - `submitContactForm(data)` → `{ data, error }` — inserts into `contact_submissions`
- **Error handling:** All functions return `null` on error (except `submitContactForm`). Errors logged to console. Exported `supabase` client is `null` if env vars missing — functions short-circuit safely.

### `src/lib/analytics.ts` (139 lines)
- **Purpose:** GA4 dual-tag initialization, consent management, event tracking.
- **GA IDs:** `G-HWFPCZ4W1Q` and `G-HJTLGVDNYK`
- **Functions:**
  - `initAnalytics()` — idempotent init; loads gtag, configures dual tags, fires initial page_view, connects Vercel analytics
  - `grantConsent()` — sets cookie-consent, updates gtag consent, enables 2nd tag
  - `denyConsent()` — sets cookie-consent to declined
- **Tracking:** Scroll depth (25/50/75/90/100%), outbound links, downloads (image/pdf/zip/mp4)
- **Linked domains:** `ruclub.rweb.site`, `ruclubmss.vercel.app`, `ruclubadmin.vercel.app`

### `src/lib/utils.ts` (23 lines)
- `cn(...inputs)` — Tailwind class merging via `clsx` + `tailwind-merge`
- `storageUrl(path)` — resolves relative paths to `{VITE_SUPABASE_URL}/storage/v1/object/public/ruclub/static/assets/{path}`
- `handleImgError(e)` — hides broken `<img>` and shows fallback sibling

### `src/lib/changelog-parser.ts` (101 lines)
- **Purpose:** Parses `CHANGELOG.md` (Keep a Changelog format) into structured data at build time.
- **Exports:**
  - `parseChangelog(text)` → `ChangelogVersion[]` — uses 3 regex patterns matching `## [version] date`, `### SectionName`, `- item text`. Strips markdown links and backticks. Skips `# ` and blank lines.
  - `formatVersionCount(versions)` → `{ releases, totalChanges, uniqueCategories, latestVersion }` — computes stats.
  - `ChangelogParseError` — custom error class (currently unused).
- **Dependencies:** None (pure functions).

---

### Hooks

#### `useTheme.ts` (35 lines)
- Returns `{ theme, toggleTheme, setTheme }`
- Persists to `localStorage` key `'theme'`, falls back to `prefers-color-scheme`
- Applies `dark` class to `<html>` via `requestAnimationFrame`

#### `useSiteData.ts` (52 lines)
- Generic fetcher: `useSiteData<T>(fetcher) => { data, loading, error, refetch }`
- Auto-refetches on `online` event and `visibilitychange` (tab becomes visible)
- Uses `useRef` mounted check to prevent stale state updates

#### `usePageTracking.ts` (21 lines)
- Calls `initAnalytics()` once on mount
- Fires `gtag('event', 'page_view')` on every route change (watches `location`)

#### `useDBStatus.ts` (50 lines)
- Returns `'checking' | 'online' | 'offline'`
- Polls Supabase every 30s with minimal query
- Re-checks on `online` event and `visibilitychange`

#### `useSiteConfig.tsx` (17 lines)
- Provides `SiteConfig` via React context
- Provider component: `SiteConfigProvider`
- Hook: `useSiteConfig()` returns the config object

---

### Components

#### `Layout.tsx` (80 lines)
- **Purpose:** Root layout for all routes (except Changelog, SecretGarden, legal pages).
- Renders: Skip-to-content, Navbar, ConnectionStatus, `<Outlet>`, Footer, CookieConsent, BackToTop button
- **AOS init:** `useEffect` with 600ms duration, offset 50, `once: true`. Refreshes on route change via `requestAnimationFrame` + pathname ref guard (replaced `setTimeout(100)` to eliminate race conditions).
- **Scroll-to-top:** On route change via `location.pathname`.
- **Secret Garden override:** If pathname is `/secret-garden`, renders only `<Outlet>` wrapped in `SiteConfigProvider` (no Navbar/Footer).

#### `SEOHead.tsx` (51 lines)
- Sets OG/Twitter/JSON-LD/Canonical meta tags via `<Helmet>`
- Props: `title?`, `description?`, `image?`, `url?`, `type?`
- Falls back to `siteConfig` defaults. Title format: `"Page Title | Site Name"`.

#### `VersionBanner.tsx` (56 lines)
- Detects new deployments by comparing `__APP_VERSION__` (build timestamp injected via Vite `define`) against `localStorage`
- Shows amber "New version available — Refresh?" banner with Refresh/Dismiss buttons
- Persists version to `localStorage` on each visit

#### `CookieConsent.tsx` (74 lines)
- GDPR-style banner with accept/decline buttons
- Appears after 1200ms delay, animated slide-up
- Toggle for "More info" details. Links to `/consent` page.
- Calls `grantConsent()`/`denyConsent()` from analytics lib

#### `ErrorBoundary.tsx` (56 lines)
- Class-based error boundary with chunk load error detection
- `isChunkError` state — recognizes `Failed to fetch dynamically imported module`, `ChunkLoadError`, etc.
- Three action buttons: "Reload Page", "Try Again" (resets error state), "Clear Cache & Reload" (wipes localStorage (preserving theme/cookie-consent) + caches then reloads)

#### `ConnectionStatus.tsx` (35 lines)
- Fixed banner at `top-[70px] md:top-[100px]`
- Shows "No internet connection" when offline
- Shows "Back online" toast for 3s when reconnecting

---

### Layout Components

#### `Navbar.tsx` (148 lines)
- Fixed top navigation (`h-16 md:h-20`)
- Logo: `shortName` + `name` (stripped prefix) from config
- Nav links from `navItems`, active detection via `useLocation`
- Changelog icon (document) shown when `config.github` is truthy
- Theme toggle button, "Join Us" CTA, mobile hamburger with slide-down menu
- Accessibility: close-on-click for mobile links

#### `Footer.tsx` (180 lines)
- 4-column grid: brand + social, quick links, legal, contact info
- Social icons inline SVGs in a `Record<string, ReactNode>`
- GitHub icon links to `/changelog`
- DB status dot from `useDBStatus()` (green/yellow/red)
- Bottom bar: copyright, "Made with care", `new Date().getFullYear()`
- Framer Motion staggered `whileInView` entrance

#### `LegalNav.tsx` (65 lines)
- Sidebar for 3 legal pages (Privacy, Cookie, License)
- Active link: brand background + border + chevron indicator
- Sticky on desktop: `lg:sticky lg:top-24`

#### `LegalLayout.tsx` (35 lines)
- Wraps legal pages with sidebar + prose-styled content
- Framer Motion fade-up entrance on content area
- No Navbar/Footer — standalone layout

---

### Home Components

#### `HeroSection.tsx`
- **Data:** `heroContent` from `@/data`
- Full-viewport hero with dark overlay bg image (fetchPriority="high", loading="eager")
- Animated badge with pulsing dot, gradient title (clamp sizing), subtitle, two CTA buttons
- Framer Motion staggered entrance (badge → headline → subtitle → CTAs)

#### `IntroSection.tsx`
- **Data:** `introContent` from `@/data`
- Centered text with label, title, paragraphs via `dangerouslySetInnerHTML`
- AOS `fade-up` with delay

#### `StatsSection.tsx`
- **Data:** `getStats()` from Supabase via `useSiteData`
- 4-column stat row on brand gradient background
- Fallback to hardcoded stats if DB errors
- Skeleton during loading (white translucent bars), AOS `fade-up`

#### `FeaturesSection.tsx`
- **Data:** `featureCards` from `@/data`
- 3-column card grid with inline SVG icons (plant/trash/book)
- Gradient top border on hover, scale-up icon, shadow lift
- AOS `fade-up` with staggered delay

#### `MissionCarousel.tsx`
- **Data:** `getMissionList()` from Supabase via `useSiteData`
- Swiper carousel: centered slides, autoplay, navigation arrows, pagination dots
- Filters `show !== false`
- Loading: skeleton text + pulsing block
- Error: banner with icon
- Empty: icon + message
- "View All Missions" CTA above carousel

#### `PartnersSection.tsx`
- **Data:** `getPartners()` from Supabase via `useSiteData`
- Infinite horizontal scrolling logo strip with duplicate set for seamless loop
- Hover pauses animation, lifts card, scales logo
- CSS `animate-scroll` with `hover:[animation-play-state:paused]`
- `maskImage` for fade edges

#### `CTASection.tsx`
- **Data:** `ctaContent` from `@/data`
- Centered CTA with title, subtitle, two buttons
- AOS `fade-up` with staggered delays

---

### Changelog Components

#### `ParticleField.tsx` (108 lines)
- Canvas 2D particle background
- 80 particles, teal/green hues, drift slowly
- Mouse interaction: particles attract toward cursor within 150px radius
- Connection lines between nearby particles (<120px)
- Responsive: re-initializes on resize

#### `FadeInView.tsx` (24 lines)
- Scroll-triggered fade-in wrapper via Framer Motion `whileInView`
- Configurable: `delay`, `y` (default 40), `once` (default true)
- Easing: `[0.22, 1, 0.36, 1]`

#### `VersionCard.tsx` (162 lines)
- Accordion-style version card with collapsible sections
- Color-coded badges per category (added/green, changed/blue, fixed/amber, etc.)
- First version (index 0) starts expanded
- Timeline dot on right side (desktop only) with spring animation
- Hover shine effect via CSS `skew-x`
- Items animate in with staggered delay

---

### Page Components

#### `Home.tsx`
- Composes all 7 home sub-components in order
- Wraps with `SEOHead` — no data fetching of its own

#### `Missions.tsx`
- Grid: 3-col desktop, 2-col tablet, 1-col mobile
- Cards: featured image, tag, date, title, truncated description
- Equal-height cards via `flex flex-col` on Link + `flex-1` on content
- Loading: 3 skeleton blocks. Error: red banner. Empty: "No missions published yet"
- Framer Motion staggered entrance

#### `MissionDetail.tsx`
- Full mission detail: hero image, stats, markdown description, goals, timeline, participants, budget table, partners, gallery lightbox
- Markdown rendering via `marked` + `DOMPurify` + `KaTeX` (for math)
- Lightbox: keyboard nav (Esc, arrows), click-to-close, image counter
- Loading: skeleton. Error: "Mission not found" with back button
- Empty tables: shows "More details coming soon" placeholder when all optional data (goals, timeline, participants, budget) is empty

#### `Gallery.tsx`
- Groups images by mission slug into expandable cards
- Paginated: 3 missions per "Load More"
- Full-screen lightbox with download, prev/next, keyboard nav
- Loading: group headers + image placeholders. Error: banner. Empty: message
- AOS refresh after data load via static `import AOS from 'aos'`

#### `Announcements.tsx`
- Card list with thumbnail, tag, date, status badges, title, summary
- Statuses: urgent (red), ongoing (green), upcoming (blue), deadline (amber), ended (gray)
- Loading: 3 skeleton blocks. Error: red banner. Empty: message
- Framer Motion staggered entrance

#### `AnnouncementDetail.tsx`
- Full announcement: back link, tag/status badges, date/issuer/deadline, tags, featured image, summary, markdown description, importance warning, instructions
- Loading: skeleton. Error: back button
- Amber warning box for importance field

#### `Members.tsx`
- 3 tables: Teachers & Advisors, Core Members, General Members
- Stats cards at top: Total, Teachers, Core, General (2×2 → 4-col grid, icon + value + label)
- Avatar/initial fallback, developer badge links to `/secret-garden`
- Role-specific color mapping (patron=purple, advisor=blue, coord=amber, member=emerald)
- Loading: 3 grouped skeletons. Error: banner. Empty: icon + message
- Framer Motion `whileInView` with `once: true`

#### `Contact.tsx`
- 2-column layout: contact info (email, location, phone, social) + form (name, email, subject, message)
- Dual submission: `submitContactForm()` to Supabase + `fetch()` to 2 Formspree endpoints
- Honeypot `_gotcha` field + 10-second cooldown to prevent spam
- Loading: form error display. Submitted: checkmark card. Submitting: spinner + disabled

#### `Privacy.tsx` / `License.tsx` / `Consent.tsx`
- Static legal pages within LegalLayout (sidebar + prose)
- Anchor-linked sections with mobile "On this page" tag nav
- `Consent.tsx` has Accept/Decline buttons calling analytics consent functions
- All use `useSiteConfig()` for email/info. License uses `new Date().getFullYear()` for copyright.

#### `SecretGarden.tsx`
- Personal portfolio: Sincere Bhattarai's about page
- Particle canvas background, glitch name, typewriter subtitle, floating tech icons
- Sections: hero, about (with achievement stats), timeline, skills (categorized + bars), projects, connect links
- No nav/footer layout, custom scrollbar hidden, `noindex` meta tag
- All data hardcoded within the file

#### `Changelog.tsx` (202 lines)
- Parses `CHANGELOG.md?raw` via `parseChangelog()` in `useMemo`
- Dark gradient theme with ParticleField background
- Animated title (letter-by-letter stagger), floating badge pulse
- Version stats counter + Version History section header
- Vertical timeline with VersionCards (right-aligned dot + line)
- Scroll-to-top on mount via `useEffect(() => window.scrollTo(0,0), [])`
- Internal components: `AnimatedTitle`, `FloatingBadge`, `VersionCounter`

#### `NotFound.tsx`
- Animated 404 with gradient text
- Framer Motion: scale for "404", then slide-up for heading/text/button
- Back to Home link

---

## Routes Table

| Path | Page | Layout | Data Source | Key Features |
|---|---|---|---|---|
| `/` | Home | Layout | Supabase (stats, partners, missions) + hardcoded | 7 sub-components, Swiper carousel |
| `/missions` | Missions | Layout | Supabase (getMissionList) | 3-col grid, equal-height cards |
| `/mission/:slug` | MissionDetail | Layout | Supabase (getMissionInfo) | Lightbox, markdown, 7 sub-queries |
| `/gallery` | Gallery | Layout | Supabase (getAllGalleryImages) | Grouped by mission, paginated, lightbox |
| `/announcements` | Announcements | Layout | Supabase (getAnnouncementList) | Status badges |
| `/announcement/:id` | AnnouncementDetail | Layout | Supabase (getAnnouncementDetail) | Markdown, tags, importance |
| `/members` | Members | Layout | Supabase (getMembers) | 3 tables, stats cards, roles |
| `/contact` | Contact | Layout | Supabase (submitContactForm) + Formspree | Honeypot, dual submission |
| `/changelog` | Changelog | none (standalone) | CHANGELOG.md?raw (build-time) | Particle bg, timeline, accordion |
| `/privacy` | Privacy | LegalLayout | hardcoded | 9 sections |
| `/license` | License | LegalLayout | hardcoded | 8 sections, MIT |
| `/consent` | Consent | LegalLayout | hardcoded | Accept/Decline buttons |
| `/secret-garden` | SecretGarden | none (standalone) | hardcoded | Portfolio, particle canvas |
| `*` | NotFound | Layout | none | Animated 404 |

---

## Data Flow

### Hardcoded (never from DB)
All text in `src/data/index.ts`:
- Hero section text, buttons, background image path
- Intro/About paragraphs
- Feature cards (3 items with SVG icon names)
- CTA section text and buttons
- Navigation items (6 items)
- Footer links (10 items across quick/legal sections)
- Social links (4 platforms)
- Site config (name, URL, contact info, school info, logo paths, copyright)
- SecretGarden page content (bio, skills, projects, timeline)

### Dynamic (from Supabase)
All queries in `src/lib/supabase.ts`:
- **Stats:** 4-row table (label + value + sort_order)
- **Partners:** Logo images with alt text
- **Missions:** Full CRUD — list, detail (7 sub-tables), images
- **Announcements:** List with status, full detail with tags
- **Members:** 30 members across 3 groups with stats
- **Contact submissions:** Write-only insert

### Image Resolution
DB stores relative paths like `mission-01/hero.jpg`. `storageUrl()` resolves to:
`{VITE_SUPABASE_URL}/storage/v1/object/public/ruclub/static/assets/{path}`

---

## Error Handling Patterns

All pages follow a consistent error handling pattern:

1. **Loading state:** Skeleton placeholders matching the content shape
2. **Error state:** Red banner with error icon + message + optional retry button
3. **Empty state:** Icon + descriptive message (e.g., "No missions published yet")
4. **Global errors:** `ErrorBoundary` wraps all routes with "Try Again" reset

### `supabase.ts` Error Classification
- `NOT_FOUND` — "The requested information could not be found"
- `NETWORK` — "Unable to reach the server"
- `AUTH` — "Authentication required"
- `TIMEOUT` — "Request timed out"
- `CONFIG` — "The system is not properly configured"
- Generic — falls through to original error message

### Retry Logic
`query(fn, table, retries=2)` wraps every DB call with up to 2 retries at 3-second intervals. Only retries on network/timeout errors.

---

## Key Conventions

1. **Static vs Dynamic:** Site text NEVER from DB; DB only for stats, missions, announcements, members, partners, contacts
2. **Image paths:** DB uses relative paths; `storageUrl()` resolves to Supabase Storage
3. **SVGs:** All inlined in JSX (Footer, Navbar, Home pages) — no external icon libraries
4. **Asset paths:** Absolute `/static/...` paths across hosting
5. **Visibility:** Missions need `show: true`, announcements need `active: true`
6. **Loading/Error/Empty:** Every page has all three states
7. **ErrorBoundary:** Global wrapper with reset capability
8. **GA4:** Dual-tag in `analytics.ts` — single source of truth
9. **Theme:** localStorage `theme` key, `dark` class on `<html>`, respects `prefers-color-scheme`
10. **Code splitting:** All pages lazy-loaded via `React.lazy()`
11. **AOS:** Init in Layout (600ms, offset 50, `once: true`), refresh 100ms after route change
12. **Framer Motion:** Used for staggered entrances and `whileInView` alongside AOS
13. **Changelog:** Standalone page (no Layout), `CHANGELOG.md?raw` Vite import
14. **Chunk error recovery:** Three layers — global `vite:preloadError`, `window.onerror`, `unhandledrejection` handlers auto-reload on chunk failure; `LazyRoute` wrapper per route catches remaining failures
15. **Version detection:** `__APP_VERSION__` injected at build time via Vite `define`; `VersionBanner` compares against localStorage on each visit
16. **AOS:** Uses `requestAnimationFrame` + pathname ref guard for refresh (no arbitrary timers)
17. **Secret Garden:** Standalone (no Navbar/Footer), particle canvas, hidden scrollbar

---

## Build & Deploy

### Local Development
```bash
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build → dist/ (runs prebuild first: cleans .vite + dist)
npm run build:analyze  # vite build with bundle analysis
npm run lint      # ESLint
npm run preview   # Vite preview of built dist/
```

### Environment Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
# Optional:
VITE_SUPABASE_SERVICE_KEY=...     # For scripts/seed.mjs and scripts/upload-assets.mjs
VITE_GA_ID=...                    # Already hardcoded in analytics.ts
```

### Deployment
- Vercel auto-deploys from `main` branch
- `vercel.json` configures:
  - SPA rewrites (all paths → /index.html)
  - Security headers (CSP, X-Frame-Options, HSTS, etc.)
  - Redirects (/admin → admin site, /gallery-view → /gallery, /success → /contact)
  - Cache headers: `/static/*` immutable 1 year, `/index.html` no-cache

### Known Deployment Issues
- **404 on refresh:** Handled by `vercel.json` SPA rewrites
- **Chunk load errors:** Auto-recovered — `window.onerror` + `vite:preloadError` + `unhandledrejection` handlers catch chunk failures and reload the page. Additionally, `VersionBanner` compares build timestamps to proactively notify users of new versions.
- **MIME type errors:** Previously caused by `public/_redirects` file — removed. SPA routing handled by `vercel.json` only.

---

## Database Schema (14 tables)

| Table | Key Columns | Seed Data |
|---|---|---|
| `stats` | value, label, sort_order | 4 rows |
| `partners` | src, alt, name, sort_order | 6 rows |
| `members` | name, class, role, member_type, group_name, image, sort_order | 30 rows |
| `missions` | id, title, slug, tag, date, description, detail, featured, show | 3 rows |
| `mission_images` | mission_id FK, url, alt, sort_order | 29 rows |
| `mission_stats` | mission_id FK, label, value, sort_order | 9 rows |
| `mission_partners` | mission_id FK, name, sort_order | 8 rows |
| `mission_goals` | mission_id FK, goal, sort_order | empty |
| `mission_timeline` | mission_id FK, title, date, description, sort_order | empty |
| `mission_participants` | mission_id FK, group_name, participant_count, sort_order | empty |
| `mission_budget` | mission_id FK, item, amount, sort_order | empty |
| `announcements` | id, title, tag, date, day, summary, description, image, active, status, deadline, issued_by, importance, instructions | 1 row |
| `announcement_tags` | announcement_id FK, tag, sort_order | 5 rows |
| `contact_submissions` | name, email, subject, message, created_at | empty |

RLS: SELECT on all tables (except `contact_submissions` which has INSERT with validation).

---

## Changelog Format

The changelog follows [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

## [Unreleased] — 2026-06-12

### Added
- New feature description

### Changed
- Modification description

## [1.0.0] — 2026-06-11

### Added
- First feature
```

Parsed at build time via `CHANGELOG.md?raw` import → `parseChangelog()` → `VersionCard[]` components.

---

## Environment Configuration

- `vercel.json` CSP allows: self, GA (analytics.google.com, googletagmanager.com), Supabase storage, GitHub avatars, Google Fonts/APIs, Vercel Analytics
- Domain-linked GA4 linker: `ruclub.rweb.site`, `ruclubmss.vercel.app`, `ruclubadmin.vercel.app`
- Formspree endpoints: Contact form submits to 2 endpoints simultaneously
- Static assets: `VITE_SUPABASE_URL` + `storage/v1/object/public/ruclub/static/assets/`
- Sitemap: 10 URLs, all `lastmod 2026-06-12`
- Build version: `__APP_VERSION__` injected by Vite `define` as `YYYYMMDD` timestamp — used by `VersionBanner` for deploy detection

---

## Credits

**Built by Sincere Bhattarai (@VoidX3D)** — Student at Motherland Secondary School, Class 10.

**Managed by Motherland Secondary School**, Pokhara, Nepal.

*"Cultivating environmental stewardship through action and education."*
