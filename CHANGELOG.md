# Changelog

All notable changes to the RU Club Motherland website are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased] — 2026-06-12

### Added
- `/changelog` page — renders this file at `/changelog` with heavy animations
- Composable changelog components: `ParticleField` (canvas particles), `FadeInView` (scroll-triggered), `VersionCard` (expand/collapse)
- Animated version cards with color-coded section badges (Added=emerald, Changed=blue, Fixed=violet, Removed=rose, Security=red)
- Particle canvas background with mouse interaction and connecting lines
- Stats counter grid: Releases, Changes, Categories, Latest version
- 7 Home section components: HeroSection, StatsSection, MissionCarousel, PartnersSection, IntroSection, FeaturesSection, CTASection
- 5 SecretGarden sub-components: ParticleCanvas, GlitchText, TypewriterText, SkillBar, ProjectCard

### Changed
- Main JS bundle reduced 37% (864 KB → 537 KB), main CSS reduced 20% (143 KB → 115 KB)
- KaTeX CSS + JS code-split — only loaded on markdown pages via dynamic import
- Home page from 337-line monolithic file → 23-line import shell
- SecretGarden from 369-line monolithic file → 140-line composition layer
- Changelog page imports CHANGELOG.md via Vite `?raw` — zero network requests
- Navbar GitHub icon replaced with document icon linking to `/changelog`
- Footer GitHub link now points to `/changelog` instead of external GitHub
- Mission cards: removed border-radius for sharp look, 1px border with teal hover
- Carousel slides: non-rounded with border and teal active border-color

### Fixed
- **Production MIME type errors** — removed `public/_redirects` whose catch-all `/* /index.html 200` was intercepting CSS/JS asset requests
- **CSP violation on changelog** — switched from `fetch()` to local `?raw` import
- Removed `interest-cohort` from Permissions-Policy (unrecognized feature)
- `renderMd` was bundled into main entry via `utils.ts` re-export
- Unused CSS classes removed (`gradient-bg`, `mask-fade-right`, `animate-scale-in`, `animate-glow`)
- AOS dynamic import in Gallery page clarified

---

## [1.0.0] — 2026-06-11

### Added
- Full React + TypeScript SPA with 13 routes
- Supabase dynamic data (stats, partners, members, missions, announcements)
- Admin panel integration (redirect to ru-admin-site.vercel.app)
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
