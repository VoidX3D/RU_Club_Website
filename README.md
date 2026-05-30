# RU Club Motherland 🌿

**Environmental Sustainability Club** at Motherland Secondary School, Pokhara, Nepal.

> Transforming environmental awareness into collective action for a sustainable Pokhara.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)](https://ruclubmotherland.vercel.app)
[![MIT License](https://img.shields.io/badge/license-MIT-teal)](LICENSE)
[![GitHub Actions](https://img.shields.io/badge/workflow-auto--discover-brightgreen)](.github/workflows/auto-mission.yml)

---

## About

RU Club Motherland is a student-led environmental initiative at Motherland Secondary School. We organize tree plantations, waste management drives, community clean-ups, and awareness campaigns — working toward a zero-waste ecosystem in Pokhara.

**Website:** [ruclubmotherland.vercel.app](https://ruclubmotherland.vercel.app)

## Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | Vanilla HTML, CSS, JavaScript (zero frameworks) |
| **Carousel** | Swiper 11 |
| **Animations** | AOS 2.3 (scroll animations) |
| **Lightbox** | GLightbox |
| **Forms** | Formspree (dual-endpoint for reliability) |
| **Analytics** | Google Analytics GA4 (`G-7ZT4XY1D1B`) |
| **Hosting** | Vercel (auto-deploy from `main`) |
| **CI/CD** | GitHub Actions (auto mission discovery) |

## Project Structure

```
/
├── index.html              → Homepage (/)
├── missions.html           → All missions (/missions)
├── mission.html            → Single mission detail (/mission?id=xxx)
├── members.html            → Team roster (/members)
├── gallery.html            → Photo gallery (/gallery)
├── contact.html            → Contact form (/contact)
├── privacy.html            → Privacy policy (/privacy)
├── consent.html            → Cookie consent info (/consent)
├── license.html            → License page (/license)
├── success.html            → Form submission success (/success)
├── failed.html             → Form submission failure (/failed)
├── secret-garden.html      → Easter egg page (/secret-garden)
├── 404.html                → Styled error page (self-contained)
│
├── static/
│   ├── css/style.css       → All styles (single file)
│   ├── js/
│   │   ├── analytics.js    → GA4 + event tracking
│   │   ├── theme.js        → Light/dark mode toggle
│   │   ├── navigation.js   → Mobile menu, scroll, active link
│   │   ├── animations.js   → AOS, GLightbox, easter egg
│   │   ├── carousel.js     → Swiper carousels
│   │   ├── forms.js        → Dual-endpoint Formspree submit
│   │   ├── missions.js     → Load & display missions
│   │   ├── data-loader.js  → JSON data → DOM rendering
│   │   ├── components.js   → Header/footer/cookie injection
│   │   └── main.js         → Async bootstrap
│   └── assets/
│       ├── brand/          → logo.png, logo_icon.png
│       ├── icons/          → SVG icons (sun, moon, menu, etc.)
│       └── partners/       → Partner org logos
│
├── info/                   → JSON data files (content, members, stats, etc.)
├── components/             → header.html, footer.html (loaded via JS)
├── mission/                → Per-mission folders with images + info.json
│   └── list.json           → Auto-generated mission manifest
│
├── .github/workflows/      → auto-mission.yml
├── vercel.json             → Clean URLs, rewrites, caching, security headers
├── sitemap.xml             → Search engine sitemap (clean URLs)
└── robots.txt              → Crawler directives
```

## Pages & URLs

All URLs are clean (no `.html` extension) — handled by Vercel's `cleanUrls` feature.

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, stats, featured mission, CTA |
| Missions | `/missions` | All missions grid + carousel |
| Mission Detail | `/mission?id=slug` | Single mission with gallery |
| Members | `/members` | Team roster (teachers + students) |
| Gallery | `/gallery` | Event photo gallery |
| Contact | `/contact` | Form + contact details |
| Privacy | `/privacy` | Privacy policy |
| Consent | `/consent` | Cookie consent details |
| License | `/license` | MIT license |
| 404 | `/404` | Styled error page |

## SEO & Performance

- **Clean URLs** — no `.html` extensions (Vercel `cleanUrls`)
- **Canonical URLs** — absolute URLs on every page
- **Structured Data** — JSON-LD for Organization + WebSite on all pages
- **Open Graph** — og:title, og:description, og:image, og:url on every page
- **Twitter Cards** — summary_large_image cards on all pages
- **Sitemap** — `sitemap.xml` with clean URLs, priorities, change frequencies
- **Robots.txt** — allows all crawlers, points to sitemap
- **Analytics** — GA4 with page views, scroll depth, outbound clicks, form tracking
- **Caching** — immutable cache for assets, stale-while-revalidate for HTML
- **Security** — X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy
- **Theme Flash Prevention** — inline script stores/restores theme before render

## Adding a New Mission

The site automatically discovers new missions via GitHub Actions.

### Steps

1. **Create a folder** under `mission/` with a hyphenated name:
   ```
   mission/your-mission-name/
   ```

2. **Add images** (`.jpg`, `.png`, or `.webp`) inside the folder.

3. **Create `info.json`** in the folder:
   ```json
   {
     "title": "Your Mission Title",
     "description": "Short description (1-2 sentences)",
     "tag": "Tree Plantation",
     "date": "2026-05-30",
     "detail": "Full description of the mission activities and impact.",
     "show": true
   }
   ```

4. **Push to `main`** — the workflow will:
   - Scan the folder
   - Auto-detect images
   - Generate `list.json`
   - Deploy to Vercel

To hide a mission from the site, set `"show": false` in its `info.json`.

### Manual `list.json` Edit

Edit `mission/list.json` directly to override auto-generated values or add custom fields. The workflow preserves any fields it doesn't recognize.

## Editing Content

All text content is in `info/*.json` — no HTML changes needed.

| File | Content |
|---|---|
| `info/content.json` | Hero text, features, CTA, intro |
| `info/members.json` | Team member roster |
| `info/partners.json` | Partner organization logos |
| `info/stats.json` | Homepage statistics |
| `info/site.json` | Social links, contact info, config |

## Icon System

- All icons are individual SVG files in `static/assets/icons/`
- **Never hardcode SVGs inline** in HTML or JS
- Brand-colored icons (social media) — direct colors in the SVG
- Functional icons — use `.icon-current` class to inherit text color

## Development

The site is pure static — no build step required.

```bash
# Serve locally
npx serve .
# or
python3 -m http.server 8000
# or
npx live-server .
```

Open `http://localhost:8000` in your browser.

### Testing

- Check all pages render correctly
- Test form submission (redirects to `/success` or `/failed`)
- Toggle light/dark theme
- Verify mobile menu at 320px, 480px, 768px
- Check mission carousel on `/missions`

## Deployment

Pushing to `main` triggers automatic Vercel deployment.

**Vercel configuration** (`vercel.json`):
- `cleanUrls: true` — automatic clean URL routing
- Security headers on all routes
- Cache-Control: immutable for assets, 1 hour for HTML
- Cache-Control: 1 day for JS/CSS with stale-while-revalidate

**Environment**: No environment variables needed — all configuration is in `info/*.json`.

## Analytics

GA4 is configured with ID `G-7ZT4XY1D1B` in `static/js/analytics.js`.

Tracked events:
- Page views (automatic)
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page
- Outbound link clicks
- CTA button clicks
- Form submissions
- Theme toggle
- Mobile menu open/close

## Cookie Consent

A cookie consent banner appears on first visit. Users can:
- **Accept** — GA4 loads and tracks
- **Decline** — GA4 is blocked

Preferences are stored in `localStorage`. Cookie details are at `/consent`.

## License

MIT — see [LICENSE](LICENSE).

---

_Made with ❤️ by Sincere Bhattarai and the RU Club Motherland team._

---

### Links

- **Website:** [ruclubmotherland.vercel.app](https://ruclubmotherland.vercel.app)
- **GitHub:** [github.com/RU-Club-Motherland](https://github.com/RU-Club-Motherland)
- **Facebook:** [RU Club Motherland](https://facebook.com/profile.php?id=61585206314774)
- **Instagram:** [@rucl.ub](https://instagram.com/rucl.ub/)
- **Email:** ruclubmotherland@gmail.com
