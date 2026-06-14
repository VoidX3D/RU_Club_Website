import { createClient } from '@supabase/supabase-js'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SITE_URL = process.env.SITE_URL || 'https://ruclub.rweb.site'
const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''

function xmlSafe(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

const staticRoutes = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/announcements', priority: '0.9', changefreq: 'weekly' },
  { loc: '/missions', priority: '0.9', changefreq: 'weekly' },
  { loc: '/gallery', priority: '0.85', changefreq: 'weekly' },
  { loc: '/members', priority: '0.8', changefreq: 'monthly' },
  { loc: '/rules', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
  { loc: '/changelog', priority: '0.7', changefreq: 'weekly' },
  { loc: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { loc: '/license', priority: '0.5', changefreq: 'yearly' },
  { loc: '/consent', priority: '0.4', changefreq: 'yearly' },
]

const today = new Date().toISOString().slice(0, 10)

async function getDynamicRoutes() {
  const routes = []
  if (!supabaseUrl || !supabaseKey) {
    console.log('[sitemap] No Supabase credentials — skipping dynamic routes')
    return routes
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const [missionsRes, announcementsRes] = await Promise.all([
      supabase.from('missions').select('slug').eq('show', true),
      supabase.from('announcements').select('id').eq('active', true),
    ])

    if (missionsRes.error) {
      console.warn('[sitemap] Failed to fetch missions:', missionsRes.error.message)
    } else if (missionsRes.data) {
      for (const m of missionsRes.data) {
        routes.push({
          loc: `/mission/${m.slug}`,
          priority: '0.8',
          changefreq: 'monthly',
          lastmod: today,
        })
      }
      console.log(`[sitemap] Added ${routes.length} mission detail pages`)
    }

    if (announcementsRes.error) {
      console.warn('[sitemap] Failed to fetch announcements:', announcementsRes.error.message)
    } else if (announcementsRes.data) {
      for (const a of announcementsRes.data) {
        routes.push({
          loc: `/announcement/${a.id}`,
          priority: '0.7',
          changefreq: 'monthly',
          lastmod: today,
        })
      }
      console.log(`[sitemap] Added ${routes.length} announcement detail pages`)
    }
  } catch (err) {
    console.warn('[sitemap] Failed to fetch dynamic routes:', err.message)
  }

  return routes
}

async function generate() {
  const dynamicRoutes = await getDynamicRoutes()
  const allRoutes = [...staticRoutes, ...dynamicRoutes]

  const urls = allRoutes.map((r) => {
    const lastmod = r.lastmod || today
    return `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <lastmod>${xmlSafe(lastmod)}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  }).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  const outputPath = resolve(__dirname, '..', 'public', 'sitemap.xml')
  writeFileSync(outputPath, sitemap, 'utf-8')
  console.log(`[sitemap] Generated ${outputPath} — ${allRoutes.length} URLs (${dynamicRoutes.length} dynamic)`)
}

generate().catch((err) => {
  console.error('[sitemap] Fatal error:', err)
  process.exit(1)
})
