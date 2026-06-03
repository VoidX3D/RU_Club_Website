# AGENTS — Project Guide

## Overview
RU Club Motherland is a static HTML/CSS/JS site for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Deployed on Vercel.

## Tech Stack
- Vanilla HTML, CSS, JS (no frameworks, no backend)
- Swiper 11 for carousels
- AOS 2.3 for scroll animations
- GLightbox for image lightbox
- Formspree for contact form
- Google Analytics GA4 (Dual-Tag: G-HWFPCZ4W1Q, G-HJTLGVDNYK)

## Architecture
```
/                   → Root — config files only
├── src/            → All source files (deployed via Vercel build)
│   ├── *.html          → All HTML pages (clean URLs)
│   ├── static/
│   │   ├── css/style.css   → Single CSS file
│   │   ├── js/             → 12 JS modules
│   │   └── assets/         → brand/, icons/, partners/, images/
│   ├── info/               → JSON data (content, members, stats, site)
│   ├── components/         → navbar.html + footer.html (loaded by components.js)
│   ├── mission/            → Per-mission folders with images + info.json
│   ├── announcements/      → Per-announcement JSON files
│   ├── robots.txt
│   └── sitemap.xml
├── .github/workflows/ → auto-mission.yml, auto-announcements.yml
├── vercel.json        → Build command copies src/ to root, clean URLs
├── _redirects         → Cloudflare Pages routing & redirects
├── AGENTS.md
└── LICENSE
```

## Data Flow
1. `components.js` fetches `/components/navbar.html` and `/components/footer.html` into placeholders
2. `main.js` triggers data loading per page
3. `missions.js` loads `/mission/list.json` then per-mission `/mission/[id]/info.json`
4. `announcements.js` loads `/announcements/list.json` then per-announcement `/announcements/main/[id].json`
5. `data-loader.js` loads stats, partners, members, content from `/info/*.json`

## Adding a New Mission
1. Create folder: `src/mission/mission-NN/` (next sequential number)
2. Drop images (`img-01.jpg`, `img-02.jpg`, ...) + `info.json` inside
3. Push to `main` — GitHub workflow auto-updates `list.json`
4. See `src/mission/README.md` for full details.

## Adding a New Announcement
1. Create JSON: `src/announcements/main/announcement-NN.json` (sequential number)
2. Push to `main` — GitHub workflow auto-updates `list.json`
3. See `src/announcements/README.md` for full details.

## Key Conventions
- All icons are SVG files in `/static/assets/icons/` — never hardcode SVGs in HTML/JS
- All text content lives in `/info/*.json` — edit JSON, not HTML
- All paths (assets, data, links) MUST be absolute (starting with `/`) for reliability across hosting providers
- New missions/announcements need `show: true` or `active: true` to appear
- `.icon-current` class for icons that inherit text color
- `.social-icon` class for brand-colored social media icons
- All pages use clean URLs (no `.html` extension) — Vercel `cleanUrls` and Cloudflare `_redirects` handle routing
- GA4 ID in `static/js/analytics.js:15` — single source of truth

## Build/Deploy
- Build step: `vercel.json` runs `cp -r src/* .` to copy all source to root
- Vercel auto-deploys from `main` branch
- Cloudflare Pages auto-deploys from `main` branch
- `vercel.json` configures build command, clean URLs, and caching
- `_redirects` configures clean URLs and trailing slash behavior for Cloudflare

## SEO
- robots.txt, sitemap.xml (clean URLs), canonical URLs, OG/Twitter tags on all pages
- JSON-LD structured data (Organization + WebSite) on all pages
- All images have descriptive alt text + loading="lazy"
- Root 404.html is self-contained styled page (absolute paths, handles all unknown routes)
