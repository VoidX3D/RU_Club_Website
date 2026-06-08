// DB keep-alive script — prevents Supabase from pausing due to inactivity.
// Run via: node scripts/db-ping.mjs
// Or via GitHub Action cron (see .github/workflows/db-keep-alive.yml)

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://jquzfvhtgbyrssvvhoio.supabase.co'
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_ANON_KEY) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable')
  process.exit(1)
}

async function ping() {
  const start = Date.now()
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_config?select=name&limit=1`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    const data = await res.json()
    const ms = Date.now() - start
    console.log(`OK — site_config pinged in ${ms}ms, row: ${data?.[0]?.name || 'none'}`)
  } catch (err) {
    console.error('Ping failed:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

ping()
