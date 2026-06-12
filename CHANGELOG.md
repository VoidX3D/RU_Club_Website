# Changelog

## [Unreleased]

### Added
- `/changelog` page — renders this file at `/changelog`
- Refactored monolithic pages into reusable component modules

### Changed
- GitHub footer link now points to `/changelog` instead of external GitHub
- KaTeX CSS + JS moved from global bundle to code-split (only loaded on markdown pages)
- Main JS bundle reduced 37% (864 KB → 537 KB), main CSS reduced 20% (143 KB → 115 KB)
- Extracted `handleImgError()` utility — shared across all pages, removes duplicated inline handlers
- Mission cards: removed border-radius for sharp premium look, added border highlight
- Carousel slides: non-rounded with 1px border and teal active border

### Fixed
- `renderMd` was bundled into main entry via `utils.ts` re-export — now imported directly from `@/lib/markdown` only in pages that need it
- Unused CSS classes (`gradient-bg`, `mask-fade-right`, `animate-scale-in`, `animate-glow`) removed
- AOS dynamic import in Gallery page clarified

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
