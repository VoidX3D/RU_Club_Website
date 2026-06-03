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
├── static/
│   ├── css/
│   │   ├── style.css       # Base: variables, reset, typography, components
│   │   └── responsive.css  # All @media queries extracted here
│   ├── js/
│   │   ├── analytics.js    # GA4 dual-tag + consent
│   │   ├── animations.js   # AOS, GLightbox, IntersectionObserver
│   │   ├── announcements.js # Load + render announcement cards
│   │   ├── carousel.js     # Swiper init
│   │   ├── components.js   # Header/footer loader + module orchestrator
│   │   ├── data-loader.js  # Fetch JSON, render stats/partners/members
│   │   ├── forms.js        # Formspree submission + validation
│   │   ├── main.js         # App entry point
│   │   ├── mobile.js       # Mobile optimizations (disables heavy effects)
│   │   ├── missions.js     # Load + render missions grid/carousel
│   │   ├── navigation.js   # Mobile menu, scroll header, active link
│   │   └── theme.js        # Light/dark mode toggle
│   └── assets/
│       ├── brand/          # Logo files
│       ├── icons/          # SVG icons (all use currentColor)
│       └── partners/       # Partner logo PNGs
├── components/
│   ├── header.html         # Nav + theme toggle + mobile menu
│   └── footer.html         # Footer with links + social
├── info/                   # JSON data files (content, members, etc.)
├── mission/                # Mission folders with images + info.json
├── announcements/          # Announcement JSON files
└── docs/                   # This folder
```

## Adding Content

### New Mission
1. Create `mission/your-mission/` folder
2. Add images + `info.json` (set `"show": true` to display)
3. Push to `main` — GitHub Action auto-updates `mission/list.json`

### New Announcement
1. Create `announcements/main/your-announcement.json`
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
