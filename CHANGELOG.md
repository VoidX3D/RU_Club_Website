# Changelog

## [Unreleased]

### Added
- `/changelog` page — renders this file at `/changelog`
- Refactored monolithic pages into reusable component modules
- Composable changelog components: `ParticleField`, `FadeInView`, `VersionCard`
- Animated version cards with expand/collapse, color-coded section badges, staggered entrance
- Particle canvas background with mouse interaction for changelog page
- Scroll-triggered fade-in wrapper component (`FadeInView`)
- Stats counter (Releases, Changes, Categories, Latest) on changelog page

### Changed
- GitHub footer link now points to `/changelog` instead of external GitHub
- GitHub navbar icon replaced with document icon linking to `/changelog`
- KaTeX CSS + JS moved from global bundle to code-split (only loaded on markdown pages)
- Main JS bundle reduced 37% (864 KB → 537 KB), main CSS reduced 20% (143 KB → 115 KB)
- Extracted `handleImgError()` utility — shared across all pages, removes duplicated inline handlers
- Mission cards: removed border-radius for sharp premium look, added border highlight
- Carousel slides: non-rounded with 1px border and teal active border
- Home page sections extracted into 7 reusable components (Hero, Stats, MissionCarousel, Partners, Intro, Features, CTA)
- SecretGarden sub-components extracted into 5 reusable components (ParticleCanvas, GlitchText, TypewriterText, SkillBar, ProjectCard)
- `/changelog` route moved outside Layout — renders as standalone page without navbar/footer
- Changelog page now imports `CHANGELOG.md` locally via Vite `?raw` — zero network requests, works offline
- CSP `connect-src` allows `raw.githubusercontent.com` as safety net

### Fixed
- `renderMd` was bundled into main entry via `utils.ts` re-export — now imported directly from `@/lib/markdown` only in pages that need it
- Unused CSS classes (`gradient-bg`, `mask-fade-right`, `animate-scale-in`, `animate-glow`) removed
- AOS dynamic import in Gallery page clarified
- **Production MIME type errors** — removed `public/_redirects` file whose catch-all `/* /index.html 200` was intercepting CSS/JS asset requests and serving them as `text/html`
- **CSP violation on changelog** — switched from `fetch()` to local `?raw` import so `raw.githubusercontent.com` is never contacted at runtime

## [1.0.0] — 2026-06

### Added
- Full SPA with 13 routes
- Supabase dynamic data (stats, partners, members, missions, announcements)
- Admin panel integration
- Secret garden page
- Lightbox gallery with keyboard nav + download
- Contact form with rate limiting + honeypot
- Cookie consent with GA4 analytics
- Dark/light theme
- SEO with Open Graph + Twitter cards
- Back-to-top button, skip-to-content link
- CSP security headers
