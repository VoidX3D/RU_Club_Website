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
├── src/            → All source files (copied to root by Vercel build)
│   ├── *.html          → All HTML pages (clean URLs)
│   ├── static/
│   │   ├── css/            → style.css, navbar.css, responsive.css
│   │   ├── js/             → 13 JS modules (analytics, theme, navigation, animations,
│   │   │                     carousel, forms, missions, announcements, data-loader,
│   │   │                     components, gallery, mobile, main)
│   │   └── assets/         → brand/, icons/, partners/, images/
│   ├── info/               → JSON data (content, members, stats, site, partners)
│   ├── components/         → navbar.html + footer.html (loaded by components.js)
│   ├── mission/            → Per-mission folders with images + info.json
│   ├── announcements/      → Per-announcement JSON files
│   ├── favicon.ico         → Multi-size ICO from logo_icon.png
│   ├── robots.txt
│   └── sitemap.xml
├── .github/workflows/ → fix-json.yml, auto-mission.yml, auto-announcements.yml,
│                         optimize-images.yml (shared concurrency group)
├── vercel.json        → Build: cp -r src/* . , cleanUrls, security headers, caching
├── _redirects         → Cloudflare Pages routing & clean URLs
├── AGENTS.md
├── README.md
└── LICENSE
```

## Data Flow
1. `components.js` auto-inits on DOMContentLoaded — fetches `/info/site.json`, then loads navbar/footer HTML into placeholders. Idempotent (only runs once).
2. `Theme.init()` sets light/dark mode from localStorage
3. `Navigation.init(siteData)` renders nav links from site.json into desktop + mobile navs
4. `main.js` (home/members/missions/contact only) triggers page-specific data rendering:
   - Home: `DataLoader.renderStats()`, `renderPartners()`, `renderContent()`
   - Members: `DataLoader.renderMembers()` for teachers/core/general
   - Missions: `Missions.renderCarousel()` + `Carousel.initParkSwiper()`
5. `missions.js` loads `/mission/list.json` then per-mission `/mission/[id]/info.json`
6. `gallery.js` loads `/mission/list.json` + per-mission info.json, renders mission cards with image grids, inits GLightbox — auto-inits on DOMContentLoaded
7. `announcements.js` loads `/announcements/list.json` then per-announcement JSONs — auto-inits on DOMContentLoaded (renders cards list on `/announcements` page, populates detail on `/announcement` page)
8. `data-loader.js` provides cached fetchers for stats, partners, members, content from `/info/*.json` — only called when the matching container exists on the page

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
- GA4 ID in `static/js/analytics.js` — single source of truth
- Cache-bust logo URLs with `?v=N` when logo file changes

## Build/Deploy
- Build step: `vercel.json` runs `cp -r src/* .` to copy all source to root
- Vercel auto-deploys from `main` branch
- Cloudflare Pages auto-deploys from `main` branch
- `vercel.json` configures build command, clean URLs, caching, security headers
- `_redirects` configures clean URLs and trailing slash behavior for Cloudflare

## SEO
- robots.txt, sitemap.xml (clean URLs), canonical URLs, OG/Twitter tags on all pages
- JSON-LD structured data (Organization + WebSite) on all pages
- All images have descriptive alt text + loading="lazy"
- favicon.ico at root with 5 sizes (16, 32, 48, 64, 128px)
- Root 404.html is self-contained styled page

## Page JS Module Loading
Each HTML page only loads the JS modules it needs:
- **index.html** (10): theme, navigation, animations, carousel, forms, missions, mobile, components, main, analytics
- **members.html** (7): theme, navigation, animations, data-loader, mobile, components, main, analytics
- **missions.html** (8): theme, navigation, animations, missions, data-loader, mobile, components, main, analytics
- **mission.html** (7): theme, navigation, animations, missions, data-loader, mobile, components, analytics
- **gallery.html** (7): theme, navigation, animations, mobile, components, gallery, analytics
- **announcements.html** (7): theme, navigation, animations, announcements, mobile, components, analytics
- **announcement.html** (7): theme, navigation, animations, announcements, mobile, components, analytics
- **contact.html** (8): theme, navigation, animations, forms, mobile, components, main, analytics
- **light pages** (privacy, license, consent, success, failed, 404): analytics only
- **secret-garden.html**: all inline JS, no external modules
