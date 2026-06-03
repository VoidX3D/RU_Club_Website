# AI Agent Guide — RU Club Motherland

This file is for AI coding agents (Claude, Manus, Cursor, etc.) to understand and fix this project.

## Quick Facts
- **Domain**: `https://ruclubmss.vercel.app` (official primary)
- **Deploy**: Vercel auto-deploys from `main` branch
- **Stack**: Vanilla HTML/CSS/JS — NO frameworks, NO build step
- **Host**: Vercel (clean URLs via `vercel.json`) + Cloudflare Pages (`_redirects`)

## Architecture
```
/                         → Root — config files only
├── src/                  → All source files (deployed via Vercel build)
│   ├── *.html            → All HTML pages (clean URLs)
│   ├── static/
│   │   ├── css/
│   │   │   ├── style.css     # Base: variables, reset, typography, all components
│   │   │   ├── navbar.css    # Header/nav/mobile-menu styles
│   │   │   └── responsive.css # All @media queries (imported by style.css)
│   │   ├── js/                # 12 modules (see below)
│   │   └── assets/
│   ├── components/            # navbar.html + footer.html (fetched by components.js)
│   ├── info/                  # JSON: content, members, stats, partners, site
│   ├── mission/               # mission-NN/ folders (images + info.json)
│   ├── announcements/         # announcement-NN.json files + assets
│   ├── robots.txt
│   └── sitemap.xml
├── .github/workflows/
├── vercel.json
├── _redirects
├── AGENTS.md
└── LICENSE
```

## JS Module Pipeline (load order matters)
1. analytics.js — GA4 dual-tag
2. theme.js — dark/light mode
3. navigation.js — mobile menu, scroll header
4. animations.js — AOS, GLightbox, scroll observer, parallax, easter egg
5. carousel.js — Swiper init
6. forms.js — Formspree submission, validation
7. missions.js — load/render missions
8. announcements.js — load/render announcements
9. data-loader.js — fetch JSON, render stats/partners/members/content
10. mobile.js — disable heavy animations on mobile
11. components.js — fetch header/footer html, init all modules
12. main.js — DOMContentLoaded entry point

## Common Fixes

### "Workflow set all active/show to true"
The auto-announcements workflow (`auto-announcements.yml`) reads `active` from each JSON file.
If `active` is not explicitly set in the JSON, it falls back to the existing value in `list.json`,
then defaults to `true`. To hide an announcement, set `"active": false` in its JSON file.

The auto-missions workflow (`auto-mission.yml`) works the same way with `"show": false`.

### "Announcement/mission still showing after deletion"
Both workflows already handle deletions correctly. When a JSON file (or mission folder) is deleted,
the workflow skips it on the next run, so it won't appear in the regenerated `list.json`.
The trigger path `announcements/main/**` catches file deletions.

### "Mobile menu icon stays black"
SVG icons are loaded as `<img>` tags. The `.icon-current` class applies `filter: invert(1)` in dark mode.
If adding new icons, ensure they have `class="icon-current"` and use `stroke="currentColor"` in the SVG.

### "Forms not submitting"
- `forms.js` uses Formspree with CORS mode (no `no-cors` — that was a bug)
- Submits to primary endpoint first, then backup
- Redirects to `/success` or `/failed` based on response
- `process.env.NODE_ENV` was a bug (browser crash) — now uses `window.location.hostname`

### "Animations broken on mobile"
- `mobile.js` disables AOS transforms, parallax, and hero shape animations on mobile
- Sets `opacity: 1; transform: none` on all AOS elements for mobile
- Simplifies touch interactions (single-tap for secret garden)
- If adding new animated elements, `mobile.js` may need updating

### "Secret garden not working"
- Access: Click "Sincere Bhattarai" on the members page
- Click handler uses event delegation on `document` (works for dynamically loaded content)
- Mobile: single tap (mobile.js overrides the old double-tap handler)
- AOS must be loaded synchronously on `secret-garden.html` (no `defer` — inline script calls `AOS.init()`)

## Adding Content

### New Announcement
1. Create `announcements/main/announcement-NN.json` (sequential number)
2. Include fields: `id`, `title`, `tag`, `date`, `summary`, `image`, `active`
3. Set `"active": true` to display
4. Push to `main` — workflow auto-updates `list.json`
5. If no image, put image in `announcements/assets/` or leave blank (uses `no-image.svg` fallback)

### New Mission
1. Create `mission/mission-NN/` folder (next sequential number)
2. Add images + `info.json` with `"show": true`
3. Push to `main` — workflow auto-creates `list.json`

## CSS Conventions
- All CSS variables defined in `:root` and `html[data-theme="dark"]`
- Use `var(--brand-primary)` etc. instead of hardcoded colors
- All media queries in `responsive.css` (imported by `style.css`)
- Mobile breakpoints: 768px, 480px, 360px
- Touch targets minimum 44x44px on mobile

## No-Image Fallback
When an announcement has no `image` field, `announcements.js` automatically uses
`/announcements/assets/no-image.svg` as the default. The image gets `class="announcement-no-image"`
for styling (centered, 30% opacity, contain fit).
