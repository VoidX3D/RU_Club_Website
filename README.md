# RU Club Motherland 🌿

**Environmental Sustainability Club** at Motherland Secondary School, Pokhara, Nepal.

> Transforming environmental awareness into collective action for a sustainable Pokhara.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)](https://ruclubmotherland.vercel.app)
[![MIT License](https://img.shields.io/badge/license-MIT-teal)](LICENSE)

---

## About

RU Club Motherland is a student-led environmental initiative at Motherland Secondary School. We organize tree plantations, waste management drives, community clean-ups, and awareness campaigns — working toward a zero-waste ecosystem in Pokhara.

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (zero frameworks)
- **Carousel:** Swiper 11
- **Animations:** AOS 2.3
- **Lightbox:** GLightbox
- **Form handling:** Formspree
- **Analytics:** Google Analytics (GA4)
- **Hosting:** Vercel (auto-deploy from `main`)

## Project Structure

```
├── assets/          → Brand assets, SVG icons, partner logos
├── css/style.css    → All styles (single file, ~1800 lines)
├── js/              → Modular JS (theme, nav, animations, carousel, data)
├── data/            → JSON files for stats, partners, members, content
├── components/      → header.html + footer.html (loaded dynamically)
├── mission/         → Per-mission folders with images + metadata
├── .github/workflows/ → Auto-mission discovery on push
├── vercel.json      → Vercel deployment config
├── 404.html         → Custom error page
└── *.html           → Pages: index, missions, mission, members, gallery, contact, privacy, consent, license
```

## Adding a New Mission

1. Create a folder: `mission/your-project-name/`
2. Drop images inside (`.jpg`, `.png`, or `.webp`)
3. Push to the `main` branch
4. GitHub Actions auto-creates `info.json` and updates `mission/list.json`

To hide a mission from the site, set `"show": false` in its `info.json`.

## Editing Content

All text content is in `data/content.json`. Edit the JSON — no HTML changes needed.

- **Hero text, intro, features, CTA** → `data/content.json`
- **Member roster** → `data/members.json`
- **Partner logos** → `data/partners.json`
- **Homepage stats** → `data/stats.json`
- **Site config** → `data/site.json` (social links, contact info)

## Icon System

All icons are individual SVG files in `assets/icons/`. Never hardcode SVGs inline.

- Brand-colored icons use direct colors (Facebook blue, Instagram gradient, etc.)
- Functional icons use `.icon-current` to inherit the current text color

## Development

```bash
# Serve locally (any static server)
npx serve .
# or
python3 -m http.server 8000
```

The site is pure static — no build step required.

## Deployment

Pushing to `main` triggers automatic Vercel deployment. Configured via `vercel.json`.

## License

MIT — see [LICENSE](LICENSE).

---

_Made with ❤️ by Sincere Bhattarai and the RU Club Motherland team._
