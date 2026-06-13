# Changelog

All notable changes to the RU Club Motherland website are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Changed
- Button/CTA background from `bg-brand-600` to `bg-brand-700` for better contrast with white text across all components
- Associated hover shadows updated (`hover:shadow-brand-600/*` → `hover:shadow-brand-700/*`)
- All remaining `text-brand-600` → `text-brand-700` across 16 files (PageHeader, CTASection, Gallery, Navbar, Announcements, MissionDetail, Missions, AnnouncementDetail, Contact, Footer, LegalNav, FeaturesSection, Privacy, License, Consent, CookieConsent) — covers `hover:text-brand-600`, `group-hover:text-brand-600`, `group-hover/link:text-brand-600`, and standalone `text-brand-600`
- CTASection `border-brand-600` → `border-brand-700` for secondary button border hover

### Removed
- Unused static assets deleted: entire `public/static/assets/icons/` (17 SVG files), `public/static/assets/partners/` (6 partner logos), `public/static/assets/images/heroimg-bg.jpeg` (231KB), `public/favicon.svg`, `public/icons.svg`
- Unused Icons exports: `ChevronLeft`, `ChevronDown`, `ExternalLink`, `Download`
- Duplicate `gtag`/`Window` declarations from `vite-env.d.ts` (already declared in `analytics.ts`)

### Added
- `scripts/cleanup-db.sql` — SQL script to remove old mission 4 data and orphaned records
- `.github/workflows/optimize-images.yml` — GitHub Actions workflow for on-demand Supabase Storage image optimization (resize, compress, WebP conversion)
- `scripts/optimize-storage-images.mjs` — Node.js script that downloads, optimizes, and re-uploads images via Supabase Storage API
- In-memory TTL query cache (60s) in `supabase.ts` — `query()` caches results keyed by table (or custom key for detail queries), cleared on visibility refetch via `clearQueryCache()`
- `storageUrl()` memoization — results cached by path+transform combo to avoid repeated string operations
- `clearQueryCache()` called in `useSiteData` on visibility change — ensures fresh data when user returns to tab
- Preconnect + dns-prefetch for Supabase (`jquzfvhtgbyrssvvhoio.supabase.co`) in `index.html`
- Cache headers for `/assets/(.*)` (immutable, 1 year) and `/sitemap.xml` (24h) in `vercel.json`
- `decoding="async"` on every `<img>` across all components/pages; `loading="lazy"` added where missing (PartnersSection, Members, AnnouncementDetail, SecretGarden, Navbar, Footer); Navbar logo uses `loading="eager" fetchPriority="high"`

### Changed
- `storageUrl()` — render endpoint restored for display images (`format=webp` + responsive `width`/`height` params) to avoid serving full-resolution gallery thumbnails; object URL retained for downloads (untransformed)
- `scripts/optimize-storage-images.mjs` — scoped to `members,mission,announcements,partners` subdirs; added `DELETE_ORIGINALS_SUBDIRS` (default `members,partners`) — WebP-only dirs skip original re-upload and delete JPEG after WebP creation; all uploads include `cacheControl: '31536000'` (1 year)
- `scripts/optimize-storage-images.mjs` — **removed resize step** (was breaking images by capping at 1920×1080); now preserves original resolution and only converts to WebP at quality 80
- `.github/workflows/optimize-images.yml` — removed `MAX_WIDTH`/`MAX_HEIGHT` inputs; simplified to just WebP conversion at original resolution

### Performance
- `logo_icon.png` optimized from 723KB to 27KB (96% reduction) — resized 864×864 → 128×128, compressed at quality 80
- Gallery thumbnails served via render endpoint at 400px width + WebP format (was full-resolution 1440×1080 WebP via object URL — caused 7.8MB waste per PageSpeed)
- Missions, gallery, announcements retain `.jpg` for download alongside render-endpoint WebP for display
- Members and partners WebP-only — originals deleted by optimizer; small enough to serve at full size via object URL
- Optimizer uploads now set `Cache-Control: max-age=31536000` (1 year) — fixes "Use efficient cache lifetimes" warning (was 1h default)
- `logo_icon.png` (27KB) → `logo_icon.webp` (4.3KB, 84% reduction) — Navbar/Footer logo icon now served as WebP via `data/index.ts` path update; `logo.png` (237KB) → `logo.webp` (31KB, 87% reduction) for meta tags
- `--color-text-muted` light-mode value changed from `#94a3b8` to `#64748b` — fixes WCAG AA contrast failures on white/light backgrounds (4.73:1 min); 14 specific elements on `bg-surface-tertiary` changed to `text-text-secondary` where `#64748b` still insufficient
- Gallery: first image of first group now uses `fetchPriority="high"` and eager loading (was `loading="lazy"`, blocking LCP)
- `storageUrl()` cache key now includes `quality` param — fixes incorrect cache hits when same image requested at different qualities

## [1.1.0] — 2026-06-13

### Added
- Chunk error recovery: global `vite:preloadError`, `window.onerror`, and `unhandledrejection` handlers auto-reload on chunk failure
- `LazyRoute` wrapper in `App.tsx` — per-route chunk failure fallback with refresh prompt
- `VersionBanner` component — detects new deployments by comparing `__APP_VERSION__` timestamp, shows "New version available — Refresh?" banner
- `ErrorBoundary` chunk detection — recognizes chunk load errors and shows targeted message + "Clear Cache & Reload" button
- `prebuild` script that cleans `.vite` and `dist` folders before each build
- `build:analyze` npm script for bundle size analysis
- Explicit rollup output hashing in `vite.config.ts` for deterministic chunk names
- `__APP_VERSION__` build-time timestamp injection via Vite `define`
- Empty-table placeholder in `MissionDetail.tsx` — shows "More details coming soon" when all optional data is empty
- Client-side `show` filter in `Missions.tsx` as defense-in-depth
- **Comprehensive SEO overhaul** — `EducationalOrganization` JSON-LD with `School` parent, GeoCoordinates, founding date, employee count
- **Dynamic `BreadcrumbList`** JSON-LD auto-generated from URL path on every page
- **Per-page `Article` JSON-LD** on mission detail and announcement detail pages with headline, datePublished, author, publisher
- **`ImageGallery` JSON-LD** on gallery page
- **`ContactPage` JSON-LD** on contact page with full address + contact info
- **`@graph` batching** — all JSON-LD entities merged into single structured data request
- **`hreflang` tags** — `en` + `x-default` on every page
- **`og:image:width` / `height`** — explicit 512x512 dimensions
- **`og:locale`** — `en_US`
- **`twitter:site`** — `@RUClubMotherland`
- **Per-page SEO keywords** — custom keyword meta tags per page, fallback to global `SITE_KEYWORDS`
- **`noindex` on 404** — not-found page gets `noindex, nofollow` to prevent soft 404 indexing
- **`article:published_time` / `modified_time`** — dynamic OG article dates on detail pages
- **`article:section`** — category tagging for article detail pages
- **`created_at` in types** — added to `MissionInfo` and `AnnouncementFull` for structured data date support
- **`prefix` on `<html>`** — Open Graph namespace prefix for social crawlers
- **GA4 triple-tag `G-QC1WT8TF66` always active** — split consents into `alwaysIds`/`consentIds`; `grantConsent()` configures both with `send_page_view: false`
- **Auto-generated sitemap** — `scripts/generate-sitemap.mjs` fetches dynamic routes from Supabase at build time
- **Email validator** — RFC 5322 regex, 30+ disposable domain block, typo detection with suggestion, role-based prefix block; real-time UI feedback on Contact page
- **Database lint fixes** — `SET search_path = ''`, `SECURITY INVOKER`, `TO anon` policy, rate-limit trigger (max 5/email/hour)

### Changed
- AOS refresh: replaced `setTimeout(100)` with `requestAnimationFrame` + pathname ref guard to eliminate race condition
- ErrorBoundary: added `isChunkError` detection, "Clear Cache & Reload" button that wipes localStorage (preserving theme/cookie-consent) + caches
- `SEOHead.tsx` — complete rewrite: accepts `publishedTime`, `modifiedTime`, `author`, `articleSection`, `keywords`, `noindex`, `jsonLd` props; generates dynamic BreadcrumbList, WebPage/Article JSON-LD, hreflang, OG locale, Twitter site
- `index.html` — replaced 3 separate JSON-LD scripts with single `@graph` containing `EducationalOrganization`, `WebSite`, `ImageObject`; added `og:image:width/height`, `hreflang` links, `dns-prefetch` for Vercel analytics, `google-site-verification`; gtag pre-loaded for `G-QC1WT8TF66`
- All 14 pages — enriched `SEOHead` calls with page-specific keywords, JSON-LD, article dates, author, section, noindex where appropriate
- Changelog/Secret Garden `Helmet` — added keywords + canonical/hreflang
- `font-display: swap` → `optional` in Google Fonts link for CLS prevention
- `useSiteData` — keeps existing data visible on visibility refetch (no skeleton flash)
- `useTheme.ts` — defaults to light mode (ignores `prefers-color-scheme`)
- StatsSection — `min-h` on skeleton matches content font-size to prevent CLS
- Consent page — `alert()` replaced with inline status banner, active ID panel, toggle link
- `initAnalytics()` — simplified (no script creation, gtag pre-loaded from HTML head)

### Fixed
- Chunk load errors after deployment now trigger automatic reload instead of showing a broken page
- AOS animations no longer flicker or skip due to race condition on route changes
- Empty mission detail tables (goals, timeline, participants, budget) now show a "coming soon" message instead of blank space
- **Production MIME type errors** — removed `public/_redirects` whose catch-all `/* /index.html 200` was intercepting CSS/JS asset requests
- **CSP violation on changelog** — switched from `fetch()` to local `?raw` import
- Removed `interest-cohort` from Permissions-Policy (unrecognized feature)
- `renderMd` was bundled into main entry via `utils.ts` re-export
- Unused CSS classes removed (`gradient-bg`, `mask-fade-right`, `animate-scale-in`, `animate-glow`)
- AOS dynamic import in Gallery page clarified
- Contact form CSP violation — added `https://formspree.io` to `connect-src` in vercel.json CSP header
- **useSiteData infinite re-fetch loop** — `data` in `useCallback` deps caused cascade; replaced with `hasDataRef` mutable ref; `.finally()` always calls `setLoading(false)`
- **Missing img width/height** — hero bg, mission carousel, partner logos, `/missions` cards, `/members` avatars
- **Sitemap validation** — CI validates sitemap; weekly CI commits fresh dates
- **Database security** — `search_path` mutable, `SECURITY DEFINER` on RLS functions, permissive `TRUE` policy on contact form

---

## [1.2.0] — 2026-06-13

### Added
- Shared `Lightbox` component (`src/components/Lightbox.tsx`) — reusable full-screen image viewer with keyboard navigation, download button, and optional title
- Download button in MissionDetail lightbox (previously missing)

### Changed
- Gallery and MissionDetail pages now use the same shared `Lightbox` component instead of separate inline implementations
- Lightbox design unified to use clean top-bar layout (mission title, image counter, download, close) — consistent across both pages
- Lightbox keyboard navigation extracted from per-page `onKeyDown` to global `keydown` listener in shared component

### Code Quality
- Removed duplicated lightbox state/focus logic from both Gallery and MissionDetail
- Lightbox extracted as lazy-loaded chunk (3.6 kB) — only loads when first opened
- No `any` types; proper `LightboxImage` interface with `url`, `alt`, and optional `downloadUrl`
- `useRef` and `useEffect` for auto-focus removed from pages (handled internally by Lightbox)

---

## [1.3.0] — 2026-06-13

### Added
- Shared `Icons` component (`src/components/Icons.tsx`) — 14 reusable icon components (ChevronLeft, ChevronRight, ChevronDown, Info, Check, Download, ExternalLink, Users, Mail, GitHub, Facebook, Instagram) with `size` prop, replacing duplicated inline SVGs across 10+ files
- Shared `PageHeader` component — consistent badge + title + description header with Framer Motion animation, used by Missions, Announcements, Members, Gallery, Contact pages
- Shared `ErrorBanner` component — consistent error display with info icon, used by Missions, Announcements, Members, Gallery, Contact pages

### Changed
- Missions, Announcements, Members, Gallery, Contact pages now use shared `PageHeader` and `ErrorBanner` instead of inline duplicated code
- Contact page uses shared Icons for social media links (Facebook, Instagram, GitHub, Mail) and checkmark
- Members page uses shared `Users` icon component
- Announcements page uses shared `ChevronRight` icon
- Missions page uses shared `Info` and `ChevronRight` icons

### Code Quality
- Removed ~30 duplicated inline SVG instances across 5 pages
- Consistent Framer Motion animation timing for all page headers
- Zero `any` types — all new components fully typed with TypeScript

---

## [1.0.0] — 2026-06-11

### Added
- Full React + TypeScript SPA with 13 routes
- Supabase dynamic data (stats, partners, members, missions, announcements)
- Admin panel integration (redirect to ruclubadmin.vercel.app)
- Secret Garden page with social links, projects, timeline
- Lightbox gallery with keyboard navigation + download
- Contact form with rate limiting + honeypot
- Cookie consent with GA4 analytics dual-tag
- Dark/light theme with localStorage persistence
- SEO with Open Graph + Twitter cards + JSON-LD schemas
- Back-to-top button, skip-to-content link
- CSP security headers on all routes
- Markdown rendering with full GFM + KaTeX math support
- Markdown content styling (md-content.css) with tables, blockquotes, code blocks
- Status indicators and tags on announcement cards
- Participants and budget sections on mission detail
- Error boundaries with "Try Again" reset on all routes
- Service worker with network-first strategy (v3 cache)
- Skeleton loading states on all data-driven pages
- 404 page with navigation links
- Vercel Speed Insights + Analytics integration
- `handleImgError()` utility for image fallback placeholders

### Changed
- Migrated from vanilla HTML/CSS/JS to React 19 + TypeScript + Vite
- All hardcoded site text moved to `src/data/index.ts`
- Layout split into Layout (navbar + footer) and LegalLayout (sidebar + prose)
- Footer renders social links dynamically from config
- Gallery uses batch query with pagination for 100+ images
- Missions filtered by `show: true`, announcements by `active: true`
- Image URLs resolved through `storageUrl()` utility
- Admin redirect opens in new tab (`target="_blank"`)
- Mission cards use video aspect ratio (16:9)
- Swiper loop conditional (disabled when < 2 slides)

### Fixed
- SPA routes returning 404 on Vercel (removed `cleanUrls` and `404.html` plugin)
- `useNavigation()` runtime crash — reverted to `setTimeout` AOS refresh
- Empty mission_images causing broken image src
- Full URL handling in mission_images (http prefix detection)
- Preload warning suppression
- DB error propagation to error states
- AOS timing on route transitions
- Keyboard accessibility on interactive elements
- Social links cleanup and Contact page icon
- Mission carousel dynamic heading showing latest mission title
- Infinite carousel loop with single slide
- Image gap/white space in gallery
- Partner hover clipping and card sizing
- Secret Garden performance (lag fix, dead code removal)
- Form double-submit prevention
- Email validation (RFC 5322 with real TLD checks)
- Hero background image sizing on mobile
- Navbar/footer layout shift with placeholder min-height
- Mobile carousel slidesPerView with peek effect
- Broken asset paths after restructuring
- Font loading with non-blocking preconnect hints
- Race conditions in script initialization

---

## [0.9.0] — 2026-06-08

### Added
- Full React migration from vanilla HTML/CSS/JS
- TypeScript type definitions for all data structures
- Supabase client with retry logic
- Site configuration context (`useSiteConfig`)
- Lazy-loaded page components via `React.lazy()`
- Layout system with nested routes
- Production Supabase project connection

### Changed
- Complete rewrite from static HTML to React SPA
- All data fetching moved to `src/lib/supabase.ts`
- Routing handled by React Router DOM v7
- Build system switched to Vite + TypeScript
- Environment variables via `.env` + Vite import.meta.env

---

## [0.8.0] — 2026-06-06

### Added
- Admin panel HTML page (basic CRUD interface)
- Admin update workflow automation
- Stats management through admin interface

### Changed
- Members list updated through admin workflow
- Auto-fix JSON pipeline for data consistency

---

## [0.7.0] — 2026-06-05

### Added
- Vercel Speed Insights integration
- Service worker with network-first strategy (v3 cache)

### Changed
- Announcement updates via admin workflow
- Auto-update announcement list on changes

---

## [0.6.0] — 2026-06-04

### Added
- Full offline support via service worker
- Skeleton loading placeholders on all content pages
- PWA manifest with favicon and theme-color
- Favicon with multi-size solid logo
- Gallery-view as dedicated mission gallery page
- Image optimization workflow
- Carousel blur transition with fade arrows
- Console init messages to all JS modules

### Changed
- Major UI overhaul — carousel, partners, gallery, hover animations
- Gallery page rewritten as pure image grid
- Theme sun/moon icons replaced with inline SVGs
- Partners marquee: double-pass loop, glass cards, gradient border hover
- Mission detail page simplified, matches gallery card format
- LCP optimization with preload and non-blocking CSS

### Fixed
- Hero background image on mobile (proper fit, dark bg fallback)
- iPhone/mobile viewport, touch scroll, -webkit-fill-available
- Mobile carousel slidesPerView 1.15 with peek
- Broken CSS non-blocking links across all pages
- Font loading with Google Fonts non-blocking links
- Mission data loading and auto-workflows
- Race condition in page initialization
- Secret Garden performance (glow orbs, fireflies)
- Partner hover clipping
- Gallery image gaps
- Service worker cache busting

---

## [0.5.0] — 2026-06-03

### Added
- Brand-colored social icon backgrounds (Facebook blue, Instagram gradient, email red, GitHub dark)
- Vercel Analytics with GA4 referral tracking
- Standalone legal pages (Privacy, License, Consent) with pill-box back-link
- Hero background image with gradient overlay
- No-image fallback SVG
- Dedicated mobile animation engine (mobile.js)
- Responsive.css with all media queries extracted
- docs/ folder with comprehensive project guide
- AI agent documentation

### Changed
- Restructured project: all source moved to `src/` with Vercel build step
- GitHub icon moved next to logo as 44px circle
- Partner logos changed to CSS marquee (full-width continuous scroll)
- Mission folders standardized to `mission-NN` naming
- Image naming standardized to `img-NN.jpg`
- list.json simplified — minimal config, detail in info.json
- Navbar and footer redesigned for all devices
- Scrolled navbar made more transparent (light 0.75, dark 0.7)
- Contact form placeholders made natural/conversational
- Email validation made strict (RFC 5322 with real TLD check)

### Fixed
- Header/footer layout shift with placeholder min-height
- Mobile spacing — header-height reduced to 70px
- Announcement page title alignment (center-aligned hero)
- Hero background z-index, opacity, gradient overlay
- Theme-specific hero styling (white text with shadow both themes)
- JSON syntax errors in mission list.json
- Broken asset paths in partners.json
- AOS animations removed from standalone legal pages
- Zero padding on standalone legal pages for flush layout
- GitHub text hidden on mobile nav (icon-only)
- Form double-submit prevention
- Workflow skip patterns for auto-discovery

---

## [0.4.0] — 2026-06-02

### Added
- Important notice announcement (imp-notice.json)

### Changed
- Auto-update announcement list workflow
- Active/show flags preserved in auto-discovery

---

## [0.3.0] — 2026-06-01

### Added
- Complete mobile responsiveness for all pages
- Scrolling animations (AOS integration)
- Comprehensive SEO meta tags
- Secret Garden enhancements
- PR summary documentation

### Changed
- Full audit and UI improvements
- Mobile-first responsive design pass
- Touch targets, hover/focus states, print/reduced-motion styles

### Fixed
- Various broken things across the site
- Navigation and layout on mobile devices

---

## [0.2.0] — 2026-05-31

### Added
- Dual GA4 measurement IDs (multiple tags)
- Domain-specific sitemaps for deployment flexibility

### Changed
- Mobile responsiveness fixes for production
- SEO enhancements for production launch
- Vercel configuration updates
- Members list updated

---

## [0.1.0] — 2026-05-30

### Added
- Initial vanilla HTML/CSS/JS site with 15+ pages
- Announcements page with expandable cards, workflow, urgent/upcoming status
- Announcement detail page with full formatting (missions-style)
- Missions system with auto-discovery workflow
- Mission detail pages with image galleries, participants, budget
- Secret Garden easter egg (double-click Sincere's name)
  - 80 falling leaves, 30 glowing orbs, 20 fireflies, 30 sparkles
  - Click burst, shimmer text, glow ring, mouse trail
  - Leaf SVG burst on activation
- Contact form with Formspree integration (dual endpoints)
- Partners section with marquee scroll
- Gallery page with lightbox
- Members page with profile cards
- Legal pages (Privacy, License, Consent) with detailed sections
- Cookie consent banner with GA4 analytics
- Navigation with mobile hamburger menu
- Theme toggle (dark/light)
- Sitemap.xml with clean URLs
- robots.txt
- GitHub issue/PR templates
- Python-based auto-mission scanner workflow
- Service worker (v1)
- _redirects for Cloudflare/Vercel SPA support
- Comprehensive README with architecture docs
- AGENTS.md with project conventions

### Changed
- Multiple iterations of navigation, footer, and layout design
- Various image and asset optimizations
- Mission data structure evolved through auto-discovery
- Announcement system from basic to status/tag system
- Secret Garden from simple leaf animation → full interactive experience
- Deployment config through multiple iterations (Vercel, Cloudflare)

### Fixed
- Path issues for Vercel and Cloudflare deployment
- Clean URL routing (no .html extension)
- Mission fetch paths and workflow skip patterns
- Announcement rendering race conditions
- SEO meta tags across all pages
- AOS animation timing
- Mobile navigation spacing and touch targets
- Hero background image sizing
- Partner logo paths
- JSON-LD schema placement
- Form submission reliability
- Various asset path issues (static/ prefix)
- 404 page styling
- Footer copyright year
- Sitemap URL format
- Service worker cache strategy
- Preconnect and font loading order

---

## Credits

Built by **Sincere Bhattarai** (@VoidX3D) — Student at Motherland Secondary School, Class 10, Pokhara, Nepal.

Managed by **Motherland Secondary School**, Pokhara, Nepal.

Full commit history: 325 commits across all releases.
