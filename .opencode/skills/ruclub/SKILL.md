---
name: ruclub
description: Work on the RU Club Motherland website — React 19 + TypeScript 6 + Vite 8 + Supabase SPA. Use when the user mentions ruclub, Motherland, building, deploying, or any site-related task.
---

# RU Club Motherland

## Quick Commands
- `npm run dev` — Start dev server
- `npm run build` — Full production build (sitemap → clean → tsc → vite)
- `npx tsc --noEmit` — TypeScript check only
- `node scripts/generate-sitemap.mjs` — Regenerate sitemap

## Architecture Notes
- Static text: `src/data/index.ts` — NEVER use DB for text content
- DB queries: `src/lib/supabase.ts` — ALL database access lives here
- Images in DB use relative paths; resolved via `storageUrl()` in `src/lib/utils.ts`
- Static assets: `/static/assets/` paths only
- SEO: `src/components/SEOHead.tsx` and `index.html` structured data
- GA4: `src/lib/analytics.ts` — `G-QC1WT8TF66` always on, consent needed for the other two

## Critical Rules
1. **CHANGELOG.md MUST be updated** on every major change (Added/Changed/Fixed/Removed/Security)
2. **No secrets in code** — run `rg -n 'eyJ\\|sk_\\|pk_\\|ghp_' src/` before committing
3. **Every `<img>`** must have explicit `width` and `height` attributes
4. **CLS prevention** — skeleton `min-h` must match content font-size
5. **`useSiteData`** refetch must NOT clear existing data or show skeletons again
6. **Zero `any` types** in new code
7. **Sitemap** auto-generates on build via `scripts/generate-sitemap.mjs`

## Git Workflow
- `main` branch auto-deploys to Vercel
- CI runs on push: build + typecheck + sitemap validation
- Weekly CI refreshes sitemap dates
- Commit messages: conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`)

## Security Checklist
1. No secrets in staged files
2. No `.env.*` files staged
3. `npm run build` succeeds
4. CHANGELOG.md updated
5. Every new image has width/height
