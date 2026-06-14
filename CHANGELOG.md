<!--
╔══════════════════════════════════════════════════════════════╗
║            🌱  RU CLUB MOTHERLAND — CHANGELOG              ║
║  Every update, improvement, and fix that shaped this site   ║
╚══════════════════════════════════════════════════════════════╝
-->

<h1 align="center">
  🌿 <strong>RU Club Motherland — Changelog</strong> 🌿
</h1>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/release-1.4.0-emerald?style=for-the-badge&logo=semver&logoColor=white&labelColor=0f172a&color=059669" />
  <img alt="Total Releases" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fruclub.rweb.site%2Fchangelog&query=%24.releases&style=for-the-badge&logo=git&logoColor=white&label=RELEASES&labelColor=0f172a&color=3b82f6" />
  <img alt="Total Changes" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fruclub.rweb.site%2Fchangelog&query=%24.changes&style=for-the-badge&logo=github&logoColor=white&label=CHANGES&labelColor=0f172a&color=8b5cf6" />
  <img alt="Total Commits" src="https://img.shields.io/badge/commits-407-blueviolet?style=for-the-badge&logo=git&logoColor=white&labelColor=0f172a&color=f59e0b" />
  <img alt="Built With" src="https://img.shields.io/badge/React_19_·_TS_6_·_Vite_8-0f172a?style=for-the-badge&logo=react&logoColor=61dafb&labelColor=0f172a&color=0f172a" />
</p>

<p align="center">
  <b>Format:</b> <a href="https://keepachangelog.com/">Keep a Changelog</a> &nbsp;·&nbsp;
  <b>Versioning:</b> <a href="https://semver.org/">Semantic Versioning</a> &nbsp;·&nbsp;
  <b>Repository:</b> <code>RU_Club_Website</code>
</p>

<br />

---

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  🚀  RELEASE OVERVIEW                                        -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<h2 align="center">📊 &nbsp;Release Overview</h2>

<br />

| Metric | Value |
|---|---|
| **Total Releases** | **14** |
| **Total Changes** | **150+** |
| **Total Commits** | **407** |
| **Latest Version** | **v1.4.0** _(2026-06-14)_ |
| **Oldest Recorded** | **v0.1.0** _(2026-05-30)_ |
| **Active Development** | **16 days** |
| **Contributors** | **1** _(Sincere Bhattarai)_ |

<br />

> 🏗️ **Built from scratch** in 16 days — from vanilla HTML/CSS/JS to a full React 19 + TypeScript SPA with Supabase backend, SEO optimization, 92+ Desktop / 69+ Mobile PageSpeed.

> 🎯 **Goal:** A production-ready environmental sustainability club platform for Motherland Secondary School, Pokhara, Nepal.

---

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  📦  VERSION HISTORY                                         -->
<!-- ═══════════════════════════════════════════════════════════════ -->

## [Unreleased]

> [!IMPORTANT]
> 🏁 **Project archived.** No further code changes will be made. All content management continues via the admin panel at [ru-admin-site.vercel.app](https://ru-admin-site.vercel.app). The site remains fully functional on Vercel + Supabase.

### 🏁 Final
- **Project archived** — repository set to read-only. Future updates exclusively through admin panel (DB). 407 commits, 16 days, one complete SPA. 🌱

### 🎨 Changed
- **Changelog page redesigned** — now renders via `renderMarkdown()` (proper marked + DOMPurify pipeline), per-version cards with timeline dots, expand/collapse, stats bar, cleaner dark theme ✨
- Removed custom `changelog-parser.ts` and `VersionCard.tsx` — replaced by simple version splitter that feeds raw markdown blocks through the shared render pipeline

### ✨ Added
- **Member images** — upload member profile photos via admin panel, display on `/members` page with `object-cover` fallback initials; images stored in Supabase Storage `members/` directory
- **Partner logos** — upload/replace partner logos via admin panel; stored in Supabase Storage `partners/` directory
- **Search engine visibility** — submit sitemap to Google Search Console (`/sitemap.xml`), Bing Webmaster Tools; monitor indexing coverage
- **Realtime data fallback** — display last-fetched timestamp on dynamic sections (stats, missions, gallery); stale-while-revalidate pattern via `useSiteData` keepDataOnRefetch
- **Analytics dashboard** — track page views, outbound clicks, scroll depth, and form submissions via GA4 events; visible in Google Analytics realtime view
- **CLS & INP monitoring** — add `PerformanceObserver` for Layout Shifts and Interaction-to-Next-Paint in development mode
- **SEO completion** — per-page `Article`, `BreadcrumbList`, `ItemList`, `ImageGallery` JSON-LD verified across all 13 routes; missing `datePublished`/`author` filled in
- **Contact form confirmation** — success toast + in-app confirmation page instead of redirect to external Formspree page
- **Load testing** — run Lighthouse CI on every PR to catch regressions before merge

### 🛠️ Fixed
- Member image 400 errors: `handleImgError` fallback shows initials; broken image URLs cleared from DB
- Partner logo 400 errors: entries with unresolvable paths filtered at data layer
- Render endpoint cache TTL: increase `max-age` from 3600 to 86400 on Supabase Storage bucket

### 🎨 Changed
- Gallery images: WebP quality 85 → 90 for better visual fidelity at same display size
- Mission carousel featured images: served at `width=1000` via render endpoint for consistent quality across devices

## [1.4.0] — 2026-06-14

> [!IMPORTANT]
> ✅ **Ready for deployment.** These changes are live in the current build — awaiting version tag.

### ✨ Added
- CHANGELOG.md completely restyled with **shields.io badges**, **GitHub Alert boxes** (`> [!IMPORTANT]`, `> [!NOTE]`, `> [!TIP]`), **emoji decorations**, **statistics tables**, **collapsible `<details>` sections**, and **decorative HTML comment banners** between versions 🎨
- VersionCard now renders item text with **full inline markdown** (`**bold**`, `` `code` ``, `[links](url)`, emoji, etc.) via `marked.parseInline()` + DOMPurify sanitization
- Changelog parser updated: section headings auto-strip emoji prefixes (e.g. `### 🛠️ Fixed` → `Fixed`), links/backticks preserved in item text instead of stripped
- **`/rules` page** — Club Rules & Regulations page with full markdown content from Supabase (`club_rules` table), rendered via `renderMarkdown()` 🔖
- **`club_rules` Supabase table** — single-row table seeded with 10 sections of club rules (code of conduct, membership, meetings, events, projects, discipline, dress code, resources, communication, amendments)
- **Navbar "Club Rules" link** — positioned after Missions
- **Footer "Club Rules" link** — Quick Links section
- **Sitemap** — `/rules` added to static routes
- **Admin site RulesPage** — view/edit toggle with RichTextEditor for markdown, saves to DB via `rules:save` API with audit logging
- **Admin sidebar** — "Club Rules" nav entry
- **Admin API** — `rules:list` / `rules:save` endpoints

### 🛠️ Fixed
- All server-side image resizing reverted — images served at original resolution with `?format=webp` only (no `&width=`, no `&height=`, no `&quality=` params) — [Read more](https://opencode.ai)
- Hero image restored to original 1920×1146 WebP (138 KiB) — no dimension reduction 🔄
- `storageUrl()` signature simplified: removed optional `width` param
- `resolveImageUrl()` signature simplified: removed optional `width` param

### 🎨 Changed
- Partner logos: `max-h-10` → `max-h-14` (56px) to prevent clipping on square logos like Motherland, UNDP, KOICA

### 🗑️ Removed
- `downloadAndUploadImage()` from admin API — external URL download no longer supported 🔌
- URL text input in admin MembersPage — images can only be added via file picker (click avatar)
- External URL handling from `members:save`, `announcements:save`, `partners:save` — only file upload supported now
- Orphaned `googleb4f18c2145156fe6.html` — Google Search Console file-based verification (meta tag is active)
- Old 128×128 `logo_icon.png` — replaced by properly-sized 180×180, 192×192, and 512×512 icons
- Unused `clsx` and `tailwind-merge` dependencies from admin site
- Partners without valid image src are now filtered out at data layer (no 400 console errors) 🧹
- Empty string image/src values now treated as null by `resolveImageUrl` (no render endpoint calls for missing files)

### 🎨 Changed
- `site.webmanifest` now references `logo_icon_192.png` and `logo_icon_512.png` instead of same file for both sizes
- `apple-touch-icon` now points to 180×180 version for correct sizing
- Hero background image optimized: 1920×1146 → 1600×955, recompressed at WebP quality 75 (138KB → 95KB, 31% smaller)
- Hero image further compressed: 1600×955 → 1400×840 at quality 70 (95KB → 71KB, −25%) for faster mobile LCP 🚀
- `getPartners()` now filters out entries with empty/null/unresolvable image src
- Partner logos: served at width=120 via render endpoint (was full resolution 225×225)
- Mission carousel featured images: served at width=1000 (was 1920×1078)
- Mission detail images: served at width=1400 (was full resolution on detail pages)
- Gallery thumbnails: served at width=320 via render endpoint (matches displayed 322px size) 📐
- Gallery download URLs now use `storageObjectUrl()` — raw object URL without format/width transforms
- MissionCarousel loading skeleton now mirrors real layout (label, title, button, card) 🦴
- All `transition-all` with `hover:border-*` changed to `transition-colors` (+ `transition-transform` where needed) — fixes 4 non-composited animations flagged by PageSpeed

### ✨ Added
- Source maps in production (`build.sourcemap: 'hidden'`) — Lighthouse can debug without exposing source to browser 🗺️
- `storageObjectUrl()` in `utils.ts` — returns raw Supabase object URL for downloads
- Optional `width` param in `storageUrl(path, width?)` — appends `&width=N` to render endpoint
- Optional `width` param in `resolveImageUrl(url, prefix?, width?)` — threaded through to `storageUrl()`
- Supabase HTTP URLs in DB are now auto-converted to render endpoint (was returning object URLs as-is, bypassing WebP) 🔗
- Optimizer script now purges old `.webp` files before regenerating fresh ones from originals

### 🎨 Changed
- ALL image display uses `object-contain` instead of `object-cover` or `object-scale-down` — images are NEVER cropped, ever 🖼️
- `storageUrl()` now returns direct public object URL instead of render endpoint — no format conversion, no resize, no quality reduction
- Removed `StorageTransform` interface and all responsive width params
- Image naming format: `{entityType}_{sanitizedName}_{timestamp}.{ext}` for member and partner uploads 📛

### 🎨 Changed
- Optimizer `STORAGE_SUBDIRS` expanded to cover ALL assets: `members,mission,announcements,partners,gallery,brand,icons,images,hero`
- `storageUrl()` default WebP quality raised from 80 → 90 across both main site and admin site
- Optimizer quality raised from 80 → 90 in workflow and script defaults
- GitHub workflow `optimize-images.yml` now includes `STORAGE_SUBDIRS` env var covering all directories
- All existing images (59 total) re-optimized to WebP quality 90 with full resolution preserved 📸
- Button/CTA background from `bg-brand-600` to `bg-brand-700` for better contrast with white text across all components
- All remaining `text-brand-600` → `text-brand-700` across 16 files — covers `hover:text-brand-600`, `group-hover:text-brand-600`, `group-hover/link:text-brand-600`, and standalone `text-brand-600`
- CTASection `border-brand-600` → `border-brand-700` for secondary button border hover

### 🗑️ Removed
- Unused static assets: entire `public/static/assets/icons/` (17 SVG files), `public/static/assets/partners/` (6 partner logos), `public/static/assets/images/heroimg-bg.jpeg` (231KB), `public/favicon.svg`, `public/icons.svg`
- Unused Icons exports: `ChevronLeft`, `ChevronDown`, `ExternalLink`, `Download` 🎯
- Duplicate `gtag`/`Window` declarations from `vite-env.d.ts`

### ✨ Added
- `scripts/cleanup-db.sql` — SQL script to remove old mission 4 data and orphaned records
- `.github/workflows/optimize-images.yml` — GitHub Actions workflow for on-demand Supabase Storage image optimization 📦
- `scripts/optimize-storage-images.mjs` — Node.js script that downloads, optimizes, and re-uploads images via Supabase Storage API
- In-memory TTL query cache (60s) in `supabase.ts` — `query()` caches results keyed by table ⚡
- `storageUrl()` memoization — results cached by path+transform combo
- `clearQueryCache()` called in `useSiteData` on visibility change — ensures fresh data when user returns to tab
- Preconnect + dns-prefetch for Supabase in `index.html` 🌐
- Cache headers for `/assets/(.*)` (immutable, 1 year) and `/sitemap.xml` (24h) in `vercel.json`
- `decoding="async"` on every `<img>` across all components/pages; `loading="lazy"` added where missing

### 🎨 Changed
- `storageUrl()` — render endpoint restored for display images; object URL retained for downloads (untransformed)
- `scripts/optimize-storage-images.mjs` — scoped to `members,mission,announcements,partners` subdirs; all uploads include `cacheControl: '31536000'` (1 year)
- `scripts/optimize-storage-images.mjs` — **removed resize step** (was breaking images by capping at 1920×1080); now preserves original resolution and only converts to WebP at quality 80
- `.github/workflows/optimize-images.yml` — removed `MAX_WIDTH`/`MAX_HEIGHT` inputs; simplified to just WebP conversion at original resolution

### ⚡ Performance
- `logo_icon.png` optimized from 723KB to 27KB (96% reduction) — resized 864×864 → 128×128, compressed at quality 80
- Gallery thumbnails served via render endpoint at 400px width + WebP format (was full-resolution 1440×1080) 📉
- Members and partners WebP-only — originals deleted by optimizer
- Optimizer uploads now set `Cache-Control: max-age=31536000` (1 year) — fixes "Use efficient cache lifetimes" warning
- `logo_icon.png` (27KB) → `logo_icon.webp` (4.3KB, 84% reduction) — Navbar/Footer logo icon now WebP
- `logo.png` (237KB) → `logo.webp` (31KB, 87% reduction) for meta tags
- `--color-text-muted` light-mode value changed from `#94a3b8` to `#64748b` — fixes WCAG AA contrast failures 🎨
- Gallery: first 8 images of first group now use `fetchPriority="high"` and eager loading
- Gallery: render endpoint width reduced from 400 to 320px to match actual displayed size (322px)
- `storageUrl()` cache key now includes `quality` param — fixes incorrect cache hits
- CSS no longer blocks initial render — injected as `<link rel="preload" as="style">` with `onload="this.rel='stylesheet'"` 📄
- `vite.config.ts` — added `nonBlockingStylesheet()` plugin (transforms Vite-injected CSS `<link>` to async load)

---

<!-- ═══════════════════════════════════════════════════════════════ -->

## [1.1.0] — 2026-06-13

> [!NOTE]
> 🧩 **Major infrastructure update.** Added chunk error recovery, SEO overhaul, changelog page, auto-generated sitemap, and email validation.

### ✨ Added
- Chunk error recovery: global `vite:preloadError`, `window.onerror`, and `unhandledrejection` handlers auto-reload on chunk failure 🔄
- `LazyRoute` wrapper in `App.tsx` — per-route chunk failure fallback with refresh prompt
- `VersionBanner` component — detects new deployments by comparing `__APP_VERSION__` timestamp
- `ErrorBoundary` chunk detection — recognizes chunk load errors with "Clear Cache & Reload" button 🧹
- `prebuild` script that cleans `.vite` and `dist` folders before each build
- `build:analyze` npm script for bundle size analysis 📊
- Explicit rollup output hashing in `vite.config.ts` for deterministic chunk names
- `__APP_VERSION__` build-time timestamp injection via Vite `define`
- Empty-table placeholder in `MissionDetail.tsx` — shows "More details coming soon" 🎯
- Client-side `show` filter in `Missions.tsx` as defense-in-depth
- **Comprehensive SEO overhaul** — `EducationalOrganization` JSON-LD with `School` parent, GeoCoordinates, founding date, employee count 🔍
- **Dynamic `BreadcrumbList`** JSON-LD auto-generated from URL path on every page
- **Per-page `Article` JSON-LD** on mission detail and announcement detail pages
- **`ImageGallery` JSON-LD** on gallery page
- **`ContactPage` JSON-LD** on contact page with full address + contact info
- **`@graph` batching** — all JSON-LD entities merged into single structured data request 📐
- **`hreflang` tags** — `en` + `x-default` on every page
- **`og:image:width` / `height`** — explicit 512×512 dimensions
- **`og:locale`** — `en_US` 🌐
- **`twitter:site`** — `@RUClubMotherland`
- **Per-page SEO keywords** — custom keyword meta tags per page, fallback to global `SITE_KEYWORDS`
- **`noindex` on 404** — not-found page gets `noindex, nofollow` to prevent soft 404 indexing 🚫
- **`article:published_time` / `modified_time`** — dynamic OG article dates on detail pages
- **`article:section`** — category tagging for article detail pages
- **`created_at` in types** — added to `MissionInfo` and `AnnouncementFull` for structured data date support
- **`prefix` on `<html>`** — Open Graph namespace prefix for social crawlers
- **GA4 triple-tag `G-QC1WT8TF66` always active** — split consents into `alwaysIds`/`consentIds` 📈
- **Auto-generated sitemap** — `scripts/generate-sitemap.mjs` fetches dynamic routes from Supabase at build time 🗺️
- **Email validator** — RFC 5322 regex, 30+ disposable domain block, typo detection with suggestion, role-based prefix block 📧
- **Database lint fixes** — `SET search_path = ''`, `SECURITY INVOKER`, `TO anon` policy, rate-limit trigger (max 5/email/hour)

### 🎨 Changed
- AOS refresh: replaced `setTimeout(100)` with `requestAnimationFrame` + pathname ref guard ⚡
- ErrorBoundary: added `isChunkError` detection, "Clear Cache & Reload" button that wipes localStorage (preserving theme/cookie-consent) + caches
- `SEOHead.tsx` — complete rewrite: accepts `publishedTime`, `modifiedTime`, `author`, `articleSection`, `keywords`, `noindex`, `jsonLd` props 🏗️
- `index.html` — replaced 3 separate JSON-LD scripts with single `@graph` containing `EducationalOrganization`, `WebSite`, `ImageObject`
- All 14 pages — enriched `SEOHead` calls with page-specific keywords, JSON-LD, article dates, author, section, noindex where appropriate
- Changelog/Secret Garden `Helmet` — added keywords + canonical/hreflang
- `font-display: swap` → `optional` in Google Fonts link for CLS prevention
- `useSiteData` — keeps existing data visible on visibility refetch (no skeleton flash)
- `useTheme.ts` — defaults to light mode (ignores `prefers-color-scheme`) ☀️
- StatsSection — `min-h` on skeleton matches content font-size to prevent CLS
- Consent page — `alert()` replaced with inline status banner, active ID panel, toggle link
- `initAnalytics()` — simplified (no script creation, gtag pre-loaded from HTML head)

### 🛠️ Fixed
- Chunk load errors after deployment now trigger automatic reload instead of showing a broken page 🩹
- AOS animations no longer flicker or skip due to race condition on route changes
- Empty mission detail tables (goals, timeline, participants, budget) now show a "coming soon" message ✨
- **Production MIME type errors** — removed `public/_redirects` whose catch-all was intercepting CSS/JS asset requests 🔥
- **CSP violation on changelog** — switched from `fetch()` to local `?raw` import
- Removed `interest-cohort` from Permissions-Policy (unrecognized feature)
- `renderMd` was bundled into main entry via `utils.ts` re-export
- Unused CSS classes removed (`gradient-bg`, `mask-fade-right`, `animate-scale-in`, `animate-glow`) 🧹
- AOS dynamic import in Gallery page clarified
- Contact form CSP violation — added `https://formspree.io` to `connect-src` in vercel.json CSP header
- **useSiteData infinite re-fetch loop** — `data` in `useCallback` deps caused cascade; replaced with `hasDataRef` mutable ref 🔄
- **Missing img width/height** — hero bg, mission carousel, partner logos, `/missions` cards, `/members` avatars
- **Sitemap validation** — CI validates sitemap; weekly CI commits fresh dates
- **Database security** — `search_path` mutable, `SECURITY DEFINER` on RLS functions, permissive `TRUE` policy on contact form 🛡️

---

<!-- ═══════════════════════════════════════════════════════════════ -->

## [1.2.0] — 2026-06-13

> [!TIP]
> 💡 **Code quality release.** Shared components, reduced duplication, and unified patterns.

### ✨ Added
- Shared `Lightbox` component (`src/components/Lightbox.tsx`) — reusable full-screen image viewer with keyboard navigation, download button, and optional title 🖼️
- Download button in MissionDetail lightbox (previously missing)

### 🎨 Changed
- Gallery and MissionDetail pages now use the same shared `Lightbox` component instead of separate inline implementations
- Lightbox design unified to use clean top-bar layout (mission title, image counter, download, close) 📐
- Lightbox keyboard navigation extracted from per-page `onKeyDown` to global `keydown` listener in shared component

### 🧹 Code Quality
- Removed duplicated lightbox state/focus logic from both Gallery and MissionDetail
- Lightbox extracted as lazy-loaded chunk (3.6 kB) — only loads when first opened 🎯
- No `any` types; proper `LightboxImage` interface with `url`, `alt`, and optional `downloadUrl`
- `useRef` and `useEffect` for auto-focus removed from pages (handled internally by Lightbox)

### 🎨 Changed
- `Layout` and `LegalLayout` lazy-loaded in App.tsx — removes framer-motion & AOS from main entry bundle (645 kB → 260 kB, −57% initial JS) ⚡
- `VersionBanner` framer-motion replaced with pure CSS animation (`slide-down-banner` keyframe) — removes `AnimatePresence` + `motion.div` from entry chunk
- `LegalLayout` `motion.div` replaced with CSS `animate-fade-up` — removes `framer-motion` import from legal pages chunk
- Added `.highlight` CSS class (`color: brand-500; font-weight: 700`) — fixes broken span styling in IntroSection "Quality Education For Everyone"
- Removed unused `.scrollbar-none` utility class from index.css

### 🧹 Code Quality
- Removed unused `Info` icon import from `Missions.tsx` and `Announcements.tsx`
- Removed unused `ChevronRight` icon import from `Missions.tsx`

### 🖼️ Image Dimensions (CLS Fix)
- Added `width="400" height="300"` to Gallery grid images (parent has `aspect-[4/3]`)
- Added `width="128" height="128"` to SecretGarden GitHub avatar (parent `w-32 h-32`)
- Added `width="1600" height="900"` to MissionDetail gallery grid images (parent `aspect-video` 16:9)
- Added `width="80" height="80"` to Announcements list thumbnails (parent `w-20 h-20`)
- Added `width="1600" height="900"` to AnnouncementDetail banner image (CSS `aspect-video`)
- Every `<img>` in the codebase now has explicit width+height attributes — zero CLS from images ✅

### 🗑️ Removed
- `clsx` and `tailwind-merge` unused CSS `.scrollbar-none` class

---

<!-- ═══════════════════════════════════════════════════════════════ -->

## [1.3.0] — 2026-06-13

> [!TIP]
> 🎨 **UI unification.** Shared `Icons`, `PageHeader`, and `ErrorBanner` components replace duplicated code across 5+ pages.

### ✨ Added
- Shared `Icons` component (`src/components/Icons.tsx`) — 14 reusable icon components (ChevronLeft, ChevronRight, ChevronDown, Info, Check, Download, ExternalLink, Users, Mail, GitHub, Facebook, Instagram) with `size` prop 🎯
- Shared `PageHeader` component — consistent badge + title + description header with Framer Motion animation
- Shared `ErrorBanner` component — consistent error display with info icon

### 🎨 Changed
- Missions, Announcements, Members, Gallery, Contact pages now use shared `PageHeader` and `ErrorBanner` instead of inline duplicated code
- Contact page uses shared Icons for social media links (Facebook, Instagram, GitHub, Mail) and checkmark
- Members page uses shared `Users` icon component
- Announcements page uses shared `ChevronRight` icon
- Missions page uses shared `Info` and `ChevronRight` icons

### 🧹 Code Quality
- Removed ~30 duplicated inline SVG instances across 5 pages 📉
- Consistent Framer Motion animation timing for all page headers
- Zero `any` types — all new components fully typed with TypeScript ✅

---

<!-- ═══════════════════════════════════════════════════════════════ -->

## [1.0.0] — 2026-06-11

> [!IMPORTANT]
> 🚀 **Initial production release.** Complete rewrite from vanilla HTML → React 19 + TypeScript SPA with Supabase backend.

### ✨ Added
- Full React + TypeScript SPA with 13 routes ⚛️
- Supabase dynamic data (stats, partners, members, missions, announcements)
- Admin panel integration (redirect to ruclubadmin.vercel.app)
- Secret Garden page with social links, projects, timeline 🌸
- Lightbox gallery with keyboard navigation + download
- Contact form with rate limiting + honeypot 📧
- Cookie consent with GA4 analytics dual-tag 🍪
- Dark/light theme with localStorage persistence 🌓
- SEO with Open Graph + Twitter cards + JSON-LD schemas
- Back-to-top button, skip-to-content link
- CSP security headers on all routes
- Markdown rendering with full GFM + KaTeX math support
- Markdown content styling (md-content.css) with tables, blockquotes, code blocks
- Status indicators and tags on announcement cards
- Participants and budget sections on mission detail
- Error boundaries with "Try Again" reset on all routes
- Service worker with network-first strategy (v3 cache)
- Skeleton loading states on all data-driven pages 🦴
- 404 page with navigation links
- Vercel Speed Insights + Analytics integration
- `handleImgError()` utility for image fallback placeholders

### 🎨 Changed
- Migrated from vanilla HTML/CSS/JS to React 19 + TypeScript + Vite
- All hardcoded site text moved to `src/data/index.ts`
- Layout split into Layout (navbar + footer) and LegalLayout (sidebar + prose)
- Footer renders social links dynamically from config
- Gallery uses batch query with pagination for 100+ images
- Missions filtered by `show: true`, announcements by `active: true` 🔍
- Image URLs resolved through `storageUrl()` utility
- Admin redirect opens in new tab (`target="_blank"`)
- Mission cards use video aspect ratio (16:9)
- Swiper loop conditional (disabled when < 2 slides)

### 🛠️ Fixed
- SPA routes returning 404 on Vercel (removed `cleanUrls` and `404.html` plugin)
- `useNavigation()` runtime crash — reverted to `setTimeout` AOS refresh
- Empty mission_images causing broken image src
- Full URL handling in mission_images (http prefix detection)
- Preload warning suppression
- DB error propagation to error states
- AOS timing on route transitions ⏰
- Keyboard accessibility on interactive elements
- Social links cleanup and Contact page icon
- Mission carousel dynamic heading showing latest mission title
- Infinite carousel loop with single slide
- Image gap/white space in gallery
- Partner hover clipping and card sizing
- Secret Garden performance (lag fix, dead code removal)
- Form double-submit prevention 🚫
- Email validation (RFC 5322 with real TLD checks)
- Hero background image sizing on mobile
- Navbar/footer layout shift with placeholder min-height
- Mobile carousel slidesPerView with peek effect
- Broken asset paths after restructuring
- Font loading with non-blocking preconnect hints
- Race conditions in script initialization

---

<!-- ═══════════════════════════════════════════════════════════════ -->

<details>
<summary><h2 style="display:inline">📜 &nbsp;Earlier Releases (v0.1.0 — v0.9.0)</h2></summary>

<br />

> [!NOTE]
> These releases document the journey from initial vanilla HTML/CSS/JS prototype through progressive feature additions before the React rewrite.

<br />

## [0.9.0] — 2026-06-08

### 🚀 Added
- Full React migration from vanilla HTML/CSS/JS
- TypeScript type definitions for all data structures
- Supabase client with retry logic
- Site configuration context (`useSiteConfig`)
- Lazy-loaded page components via `React.lazy()`
- Layout system with nested routes
- Production Supabase project connection

### 🎨 Changed
- Complete rewrite from static HTML to React SPA
- All data fetching moved to `src/lib/supabase.ts`
- Routing handled by React Router DOM v7
- Build system switched to Vite + TypeScript
- Environment variables via `.env` + Vite import.meta.env

---

## [0.8.0] — 2026-06-06

### ✨ Added
- Admin panel HTML page (basic CRUD interface)
- Admin update workflow automation
- Stats management through admin interface

### 🎨 Changed
- Members list updated through admin workflow
- Auto-fix JSON pipeline for data consistency

---

## [0.7.0] — 2026-06-05

### ✨ Added
- Vercel Speed Insights integration 📊
- Service worker with network-first strategy (v3 cache)

### 🎨 Changed
- Announcement updates via admin workflow
- Auto-update announcement list on changes

---

## [0.6.0] — 2026-06-04

### ✨ Added
- Full offline support via service worker 📡
- Skeleton loading placeholders on all content pages
- PWA manifest with favicon and theme-color 🎯
- Favicon with multi-size solid logo
- Gallery-view as dedicated mission gallery page
- Image optimization workflow
- Carousel blur transition with fade arrows
- Console init messages to all JS modules

### 🎨 Changed
- Major UI overhaul — carousel, partners, gallery, hover animations 🎨
- Gallery page rewritten as pure image grid
- Theme sun/moon icons replaced with inline SVGs
- Partners marquee: double-pass loop, glass cards, gradient border hover
- Mission detail page simplified, matches gallery card format
- LCP optimization with preload and non-blocking CSS

### 🛠️ Fixed
- Hero background image on mobile (proper fit, dark bg fallback)
- iPhone/mobile viewport, touch scroll, -webkit-fill-available 📱
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

### ✨ Added
- Brand-colored social icon backgrounds (Facebook blue, Instagram gradient, email red, GitHub dark)
- Vercel Analytics with GA4 referral tracking
- Standalone legal pages (Privacy, License, Consent) with pill-box back-link ⚖️
- Hero background image with gradient overlay
- No-image fallback SVG
- Dedicated mobile animation engine (mobile.js)
- Responsive.css with all media queries extracted
- docs/ folder with comprehensive project guide 📚
- AI agent documentation

### 🎨 Changed
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

### 🛠️ Fixed
- Header/footer layout shift with placeholder min-height 📐
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

### ✨ Added
- Important notice announcement (imp-notice.json)

### 🎨 Changed
- Auto-update announcement list workflow
- Active/show flags preserved in auto-discovery

---

## [0.3.0] — 2026-06-01

### ✨ Added
- Complete mobile responsiveness for all pages 📱
- Scrolling animations (AOS integration)
- Comprehensive SEO meta tags
- Secret Garden enhancements 🌸
- PR summary documentation

### 🎨 Changed
- Full audit and UI improvements 🔍
- Mobile-first responsive design pass
- Touch targets, hover/focus states, print/reduced-motion styles

### 🛠️ Fixed
- Various broken things across the site
- Navigation and layout on mobile devices

---

## [0.2.0] — 2026-05-31

### ✨ Added
- Dual GA4 measurement IDs (multiple tags) 📈
- Domain-specific sitemaps for deployment flexibility

### 🎨 Changed
- Mobile responsiveness fixes for production
- SEO enhancements for production launch
- Vercel configuration updates
- Members list updated

---

## [0.1.0] — 2026-05-30

### ✨ Added
- Initial vanilla HTML/CSS/JS site with 15+ pages 🏗️
- Announcements page with expandable cards, workflow, urgent/upcoming status
- Announcement detail page with full formatting (missions-style)
- Missions system with auto-discovery workflow 🔍
- Mission detail pages with image galleries, participants, budget
- Secret Garden easter egg (double-click Sincere's name) 🌸
  - 80 falling leaves, 30 glowing orbs, 20 fireflies, 30 sparkles
  - Click burst, shimmer text, glow ring, mouse trail
  - Leaf SVG burst on activation
- Contact form with Formspree integration (dual endpoints)
- Partners section with marquee scroll
- Gallery page with lightbox 🖼️
- Members page with profile cards
- Legal pages (Privacy, License, Consent) with detailed sections ⚖️
- Cookie consent banner with GA4 analytics
- Navigation with mobile hamburger menu
- Theme toggle (dark/light) 🌓
- Sitemap.xml with clean URLs
- robots.txt
- GitHub issue/PR templates
- Python-based auto-mission scanner workflow
- Service worker (v1)
- _redirects for Cloudflare/Vercel SPA support
- Comprehensive README with architecture docs 📚
- AGENTS.md with project conventions

### 🎨 Changed
- Multiple iterations of navigation, footer, and layout design
- Various image and asset optimizations
- Mission data structure evolved through auto-discovery
- Announcement system from basic to status/tag system
- Secret Garden from simple leaf animation → full interactive experience
- Deployment config through multiple iterations (Vercel, Cloudflare)

### 🛠️ Fixed
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

</details>

---

<!-- ═══════════════════════════════════════════════════════════════ -->

<h2 align="center">📈 &nbsp;Change Statistics</h2>

<br />

<p align="center">
  <img alt="Total Commits" src="https://img.shields.io/badge/Total_Commits-325-0f172a?style=flat-square&logo=git" />
  <img alt="Releases" src="https://img.shields.io/badge/Releases-13-0f172a?style=flat-square&logo=semver" />
  <img alt="Days Active" src="https://img.shields.io/badge/Days_Active-14-0f172a?style=flat-square&logo=calendar" />
  <img alt="Files Changed" src="https://img.shields.io/badge/Files-200+-0f172a?style=flat-square&logo=files" />
</p>

<br />

| Category | Count |
|:---|---:|
| ✨ **Added** | 45+ new features |
| 🎨 **Changed** | 35+ improvements |
| 🛠️ **Fixed** | 40+ bug fixes |
| 🗑️ **Removed** | 15+ deletions |
| ⚡ **Performance** | 12 optimizations |
| 🧹 **Code Quality** | 8 refactors |
| **Total Changes** | **155+** |

---

<!-- ═══════════════════════════════════════════════════════════════ -->

<h2 align="center">🙏 &nbsp;Credits</h2>

<br />

<p align="center">
  <a href="https://github.com/VoidX3D">
    <img alt="Sincere Bhattarai" src="https://img.shields.io/badge/Built_by-Sincere_Bhattarai-0f172a?style=for-the-badge&logo=github&logoColor=white&labelColor=059669&color=059669" />
  </a>
</p>

<p align="center">
  <strong>Sincere Bhattarai</strong> <em>(@VoidX3D)</em><br />
  Student at <strong>Motherland Secondary School</strong>, Class 10<br />
  Pokhara, Nepal 🇳🇵
</p>

<p align="center">
  <a href="https://ruclub.rweb.site">
    <img alt="Website" src="https://img.shields.io/badge/🌐_ruclub.rweb.site-0f172a?style=flat-square" />
  </a>
  &nbsp;
  <a href="https://github.com/VoidX3D/RU_Club_Website">
    <img alt="GitHub" src="https://img.shields.io/badge/📦_Repository-0f172a?style=flat-square" />
  </a>
</p>

<p align="center">
  <i>Managed by <strong>Motherland Secondary School</strong>, Pokhara, Nepal</i>
</p>

<br />

---

<p align="center">
  <sub>📝 &nbsp;Full commit history: <strong>407 commits</strong> across all releases &nbsp;·&nbsp; 🏗️ &nbsp;Built with React 19 · TypeScript 6 · Vite 8 · Supabase · Tailwind CSS v4</sub>
</p>

<p align="center">
  <sub>📄 &nbsp;Format: <a href="https://keepachangelog.com/">Keep a Changelog</a> &nbsp;·&nbsp; 📐 &nbsp;Versioning: <a href="https://semver.org/">Semantic Versioning</a></sub>
</p>
