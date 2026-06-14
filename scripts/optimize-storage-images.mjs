/**
 * Supabase Storage Image Optimizer
 *
 * Downloads images, converts to WebP at original resolution (no resize),
 * and re-uploads with 1-year cache headers.
 *
 * Usage:
 *   VITE_SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/optimize-storage-images.mjs
 *
 * Required env vars:
 *   VITE_SUPABASE_URL   — Supabase project URL
 *   SUPABASE_SERVICE_KEY — Service role key
 *
 * Optional:
 *   STORAGE_BUCKET      — Bucket name (default: ruclub)
 *   STORAGE_PREFIX      — Path prefix (default: static/assets)
 *   STORAGE_SUBDIRS     — Comma-separated subdirs (default: members,mission,announcements,partners)
 *   QUALITY             — WebP quality 1-100 (default: 90)
 */

import { createClient } from '@supabase/supabase-js'
import { WebSocket } from 'ws'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import os from 'os'

const {
  VITE_SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  STORAGE_BUCKET = 'ruclub',
  STORAGE_PREFIX = 'static/assets',
  STORAGE_SUBDIRS = 'members,mission,announcements,partners',
  QUALITY = '90',
} = process.env

if (!VITE_SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('ERROR: VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY are required')
  process.exit(1)
}

const quality = parseInt(QUALITY, 10)
const CACHE_CONTROL = '31536000'
const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  realtime: { transport: WebSocket },
})
const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'img-opt-'))

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif'])
let webpCreated = 0
let failed = 0
let skipped = 0

async function listAllFiles(prefix) {
  const files = []
  let offset = 0
  while (true) {
    const { data, error } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list(prefix, { limit: 100, offset, sortBy: { column: 'name', order: 'asc' } })
    if (error || !data || data.length === 0) break
    for (const item of data) {
      if (item.id) {
        files.push({ name: item.name, path: prefix ? `${prefix}/${item.name}` : item.name })
      } else {
        const subFiles = await listAllFiles(prefix ? `${prefix}/${item.name}` : item.name)
        files.push(...subFiles)
      }
    }
    offset += 100
  }
  return files
}

const allowedDirs = STORAGE_SUBDIRS.split(',').map(s => `${STORAGE_PREFIX}/${s.trim()}/`)

console.log(`\nImage Optimizer — ${STORAGE_BUCKET}/${STORAGE_PREFIX}`)
console.log(`   Quality: ${quality}, original resolution preserved`)
console.log(`   Cache: ${CACHE_CONTROL}s (1 year)\n`)

const allFiles = await listAllFiles(STORAGE_PREFIX)
const imageFiles = allFiles.filter(f =>
  imageExtensions.has(path.extname(f.name).toLowerCase()) &&
  !f.name.endsWith('.webp') &&
  allowedDirs.some(d => f.path.startsWith(d))
)

console.log(`Found ${allFiles.length} files, ${imageFiles.length} images to convert\n`)

for (const file of imageFiles) {
  const ext = path.extname(file.name).toLowerCase()
  const baseName = path.basename(file.name, ext)

  console.log(`  Processing: ${file.path}`)

  const { data, error } = await supabase.storage.from(STORAGE_BUCKET).download(file.path)
  if (error || !data) {
    console.error(`  ERROR downloading: ${error?.message || 'No data'}`)
    failed++
    continue
  }

  const tmpInput = path.join(tmpDir, file.name.replace(/\//g, '_'))
  await fs.writeFile(tmpInput, Buffer.from(await data.arrayBuffer()))

  const inputSize = (await fs.stat(tmpInput)).size

  // Convert to WebP at original resolution
  const webpOutput = path.join(tmpDir, `webp_${file.name.replace(/\//g, '_')}.webp`)
  await sharp(tmpInput).webp({ quality }).toFile(webpOutput)

  const webpSize = (await fs.stat(webpOutput)).size
  const pct = inputSize > 0 ? (((inputSize - webpSize) / inputSize) * 100).toFixed(1) : '0.0'
  console.log(`    ${(inputSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${pct}% smaller) @${quality}q`)

  const webpPath = `${path.dirname(file.path)}/${baseName}.webp`
  const webpContent = await fs.readFile(webpOutput)
  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(webpPath, webpContent, { upsert: true, contentType: 'image/webp', cacheControl: CACHE_CONTROL })

  if (uploadError) {
    console.error(`  ERROR uploading WebP: ${uploadError.message}`)
    failed++
  } else {
    webpCreated++
  }

  await fs.unlink(tmpInput).catch(() => {})
  await fs.unlink(webpOutput).catch(() => {})
}

const report = {
  status: failed > 0 ? 'partial' : 'success',
  filesFound: imageFiles.length,
  webpCreated,
  failed,
  skipped,
  quality,
  timestamp: new Date().toISOString(),
}
const reportPath = path.join(tmpDir, 'optimizer-report.json')
await fs.writeFile(reportPath, JSON.stringify(report, null, 2))

console.log(`\nDone! WebP created for ${webpCreated}/${imageFiles.length} images (quality ${quality})`)
console.log(`   Failed: ${failed}`)
try { await fs.copyFile(reportPath, 'optimizer-report.json') } catch {}
await fs.rm(tmpDir, { recursive: true, force: true })