# RU Club Motherland - Documentation

## Overview
Environmental sustainability club website at Motherland Secondary School, Pokhara.
Static HTML/CSS/JS, hosted on Vercel + Cloudflare Pages.

## Tech Stack
- Vanilla HTML, CSS, JS (no frameworks)
- Swiper 11 for carousels
- AOS 2.3 for scroll animations
- GLightbox for image lightbox
- Formspree for contact forms
- Google Analytics GA4 (G-HWFPCZ4W1Q, G-HJTLGVDNYK)

## Project Structure
```
/
├── src/                  → All source files (copied to root by Vercel build)
│   ├── *.html            → All HTML pages
│   ├── static/
│   │   ├── css/
│   │   │   ├── style.css       # Base: variables, reset, typography, components
│   │   │   ├── navbar.css      # Header/nav/mobile-menu styles
│   │   │   └── responsive.css  # All @media queries (imported by style.css)
│   │   ├── js/
│   │   │   ├── analytics.js    # GA4 dual-tag + consent
│   │   │   ├── animations.js   # AOS, GLightbox, IntersectionObserver
│   │   │   ├── announcements.js # Load + render announcement cards
│   │   │   ├── carousel.js     # Swiper init (park carousel)
│   │   │   ├── components.js   # Header/footer loader + module orchestrator
│   │   │   ├── data-loader.js  # Fetch JSON, render stats/partners/members
│   │   │   ├── forms.js        # Formspree submission + validation
│   │   │   ├── main.js         # App entry point
│   │   │   ├── mobile.js       # Mobile optimizations
│   │   │   ├── missions.js     # Load + render missions grid/carousel
│   │   │   ├── navigation.js   # Mobile menu, scroll header, active link
│   │   │   └── theme.js        # Light/dark mode toggle
│   │   └── assets/
│   │       ├── brand/          # Logo files
│   │       ├── icons/          # SVG icons (all use currentColor)
│   │       └── partners/       # Partner logo PNGs
│   ├── components/
│   │   ├── navbar.html         # Nav + theme toggle + mobile menu
│   │   └── footer.html         # Footer with links + social
│   ├── info/                   # JSON data files (content, members, etc.)
│   ├── mission/                # mission-NN folders with images + info.json
│   ├── announcements/          # announcement-NN.json files
│   ├── robots.txt
│   └── sitemap.xml
├── docs/                   # This folder
├── vercel.json
├── _redirects
└── AGENTS.md
```

## Adding Content

### New Mission
1. Create `src/mission/mission-NN/` folder (next sequential number)
2. Add images + `info.json` (set `"show": true` to display)
3. Push to `main` — GitHub Action auto-updates `mission/list.json`

### New Announcement
1. Create `src/announcements/main/announcement-NN.json` (sequential number)
2. Set `"active": true` to display
3. Push to `main` — GitHub Action auto-updates `announcements/list.json`

## CSS Architecture
- `style.css` — CSS variables, reset, layout, all component styles
- `responsive.css` — All @media queries (loaded via @import in style.css)
- No build step — pure static files served directly

## Hosting
- Vercel: `ruclubmss.vercel.app` (primary, auto-deploys from main)
- Cloudflare Pages: `ruclub.vercel.app` (secondary)
- `vercel.json` handles clean URLs and security headers
- `_redirects` handles Cloudflare Pages routing
