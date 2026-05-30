# AGENTS — Project Guide

## Overview
RU Club Motherland is a static HTML/CSS/JS site for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Deployed on Vercel.

## Tech Stack
- Vanilla HTML, CSS, JS (no frameworks, no backend)
- Swiper 11 for carousels
- AOS 2.3 for scroll animations
- GLightbox for image lightbox
- Formspree for contact form (dual-endpoint)
- Google Analytics GA4 (ID: G-7ZT4XY1D1B)

## Architecture
```
/                   → Root — all HTML pages (clean URLs via Vercel)
├── static/
│   ├── css/style.css      → Single CSS file
│   ├── js/                → 10 JS modules (analytics, theme, nav, etc.)
│   └── assets/            → brand/, icons/, partners/
├── info/                  → JSON data (content, members, stats, etc.)
├── components/            → header.html + footer.html (loaded by components.js)
├── mission/               → Per-mission folders with images + info.json
├── .github/workflows/     → auto-mission.yml
├── vercel.json            → cleanUrls, security headers, caching
├── sitemap.xml            → Clean URLs
└── robots.txt
```

## Data Flow
1. `components.js` fetches `/components/header` and `/components/footer` into placeholders
2. `main.js` triggers data loading per page
3. `missions.js` loads `mission/list.json` then per-mission `info.json`
4. `data-loader.js` loads stats, partners, members, content from `/info/*.json`

## Adding a New Mission
1. Create folder: `mission/your-mission-name/`
2. Drop images + `info.json` inside
3. Push to `main` — GitHub workflow auto-updates `list.json`

## Key Conventions
- All icons are SVG files in `static/assets/icons/` — never hardcode SVGs in HTML/JS
- All text content lives in `info/*.json` — edit JSON, not HTML
- New missions need `show: true` in `list.json` to appear on the site
- `.icon-current` class for icons that inherit text color
- `.social-icon` class for brand-colored social media icons
- All pages use clean URLs (no `.html` extension) — Vercel `cleanUrls` handles routing
- GA4 ID in `static/js/analytics.js:15` — single source of truth

## Build/Deploy
- No build step — pure static files
- Vercel auto-deploys from `main` branch
- `vercel.json` configures clean URLs, security headers, caching

## SEO
- robots.txt, sitemap.xml (clean URLs), canonical URLs, OG/Twitter tags on all pages
- JSON-LD structured data (Organization + WebSite) on all pages
- All images have descriptive alt text + loading="lazy"
- Root 404.html is self-contained styled page (absolute paths, handles all unknown routes)
