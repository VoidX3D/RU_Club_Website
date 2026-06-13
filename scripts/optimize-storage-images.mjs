/**
 * Supabase Storage Image Optimizer
 *
 * Downloads images from Supabase Storage, converts to WebP at original resolution,
 * and re-uploads with 1-year cache headers. Does NOT resize — original dimensions preserved.
 *
 * Usage:
 *   VITE_SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/optimize-storage-images.mjs
 *
 * Required env vars:
 *   VITE_SUPABASE_URL   — Supabase project URL
 *   SUPABASE_SERVICE_KEY — Service role key (NEVER commit this!)
 *
 * Optional env vars:
 *   STORAGE_BUCKET      — Bucket name (default: ruclub)
 *   STORAGE_PREFIX      — Path prefix (default: static/assets)
 *   STORAGE_SUBDIRS     — Comma-separated subdirectories to process (default: members,mission,announcements,partners)
 *   DELETE_ORIGINALS_SUBDIRS — Subdirs where JPEG/PNG are deleted after WebP creation (default: members,partners)
 *   QUALITY             — WebP quality 1-100 (default: 80)
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
  DELETE_ORIGINALS_SUBDIRS = 'members,partners',
  QUALITY = '80',
} = process.env

if (!VITE_SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('ERROR: VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY are required')
  process.exit(1)
}

const quality = parseInt(QUALITY, 10)
const CACHE_CONTROL = '31536000' // 1 year

const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  realtime: { transport: WebSocket },
})
const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'img-opt-'))

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
const optimizedCount = { png: 0, jpeg: 0, webp: 0, skipped: 0, failed: 0 }

async function listAllFiles(prefix) {
  const files = []
  let offset = 0
  const limit = 100

  while (true) {
    const { data, error } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list(prefix, { limit, offset, sortBy: { column: 'name', order: 'asc' } })

    if (error) {
      console.error(`  ERROR listing ${prefix}:`, error.message)
      break
    }
    if (!data || data.length === 0) break

    for (const item of data) {
      if (item.id) {
        files.push({ name: item.name, path: prefix ? `${prefix}/${item.name}` : item.name })
      } else {
        const subFiles = await listAllFiles(prefix ? `${prefix}/${item.name}` : item.name)
        files.push(...subFiles)
      }
    }
    offset += limit
  }

  return files
}

function isImage(filename) {
  const ext = path.extname(filename).toLowerCase()
  return imageExtensions.has(ext)
}

async function optimizeImage(inputPath, outputPath, format) {
  let pipeline = sharp(inputPath)

  if (format === 'webp') {
    pipeline = pipeline.webp({ quality })
  } else if (format === 'png') {
    pipeline = pipeline.png({ quality, compressionLevel: 9 })
  } else {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true })
  }

  await pipeline.toFile(outputPath)
}

async function processFile(filePath) {
  const ext = path.extname(filePath.name).toLowerCase()
  const baseName = path.basename(filePath.name, ext)
  const shouldDeleteOriginal = deletePrefixes.some(p => filePath.path.startsWith(p))

  console.log(`\n  Processing: ${filePath.path}${shouldDeleteOriginal ? ' [WebP-only]' : ''}`)

  // Download the file
  const { data, error } = await supabase
    .storage
    .from(STORAGE_BUCKET)
    .download(filePath.path)

  if (error || !data) {
    console.error(`  ERROR downloading: ${error?.message || 'No data'}`)
    optimizedCount.failed++
    return
  }

  const tmpInput = path.join(tmpDir, filePath.name.replace(/\//g, '_'))
  await fs.writeFile(tmpInput, Buffer.from(await data.arrayBuffer()))

  const inputSize = (await fs.stat(tmpInput)).size

  if (shouldDeleteOriginal && ext !== '.webp') {
    // WebP-only dirs: generate WebP and delete original
    const webpOutput = path.join(tmpDir, `webp_${filePath.name.replace(/\//g, '_')}.webp`)
    await optimizeImage(tmpInput, webpOutput, 'webp')
    const webpSize = (await fs.stat(webpOutput)).size
    const webpPct = inputSize > 0 ? (((inputSize - webpSize) / inputSize) * 100).toFixed(1) : '0.0'
    console.log(`    WebP: ${(webpSize / 1024).toFixed(1)}KB (${webpPct}% savings from original)`)

    const webpPath = `${path.dirname(filePath.path)}/${baseName}.webp`
    const webpContent = await fs.readFile(webpOutput)
    const { error: webpError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .upload(webpPath, webpContent, { upsert: true, contentType: 'image/webp', cacheControl: CACHE_CONTROL })

    if (webpError) {
      console.error(`  ERROR uploading WebP: ${webpError.message}`)
      optimizedCount.failed++
    } else {
      // Delete original file
      const { error: delError } = await supabase.storage.from(STORAGE_BUCKET).remove([filePath.path])
      if (delError) {
        console.error(`  ERROR deleting original: ${delError.message}`)
      }
      optimizedCount.webp++
      console.log(`    Original deleted: ${filePath.path}`)
    }

    await fs.unlink(webpOutput).catch(() => {})
  } else {
    // Keep-original dirs (or already WebP): optimize in-place, then generate WebP alongside
    const origOutput = path.join(tmpDir, `opt_${filePath.name.replace(/\//g, '_')}`)
    await optimizeImage(tmpInput, origOutput, ext === '.png' ? 'png' : ext === '.webp' ? 'webp' : 'jpeg')
    const origSize = (await fs.stat(origOutput)).size
    const saved = inputSize - origSize
    const pct = inputSize > 0 ? ((saved / inputSize) * 100).toFixed(1) : '0.0'

    console.log(`    Input: ${(inputSize / 1024).toFixed(1)}KB → Output: ${(origSize / 1024).toFixed(1)}KB (${pct}% savings)`)

    // Upload optimized version (overwrite original)
    const origContent = await fs.readFile(origOutput)
    const { error: uploadError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .upload(filePath.path, origContent, { upsert: true, contentType: ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg', cacheControl: CACHE_CONTROL })

    if (uploadError) {
      console.error(`  ERROR uploading optimized: ${uploadError.message}`)
      optimizedCount.failed++
    } else {
      if (ext === '.png') optimizedCount.png++
      else if (ext === '.webp') optimizedCount.webp++
      else optimizedCount.jpeg++
    }

    // Generate and upload WebP version (skip if already WebP)
    if (ext !== '.webp') {
      const webpOutput = path.join(tmpDir, `webp_${filePath.name.replace(/\//g, '_')}.webp`)
      await optimizeImage(tmpInput, webpOutput, 'webp')
      const webpSize = (await fs.stat(webpOutput)).size
      const webpPct = inputSize > 0 ? (((inputSize - webpSize) / inputSize) * 100).toFixed(1) : '0.0'
      console.log(`    WebP: ${(webpSize / 1024).toFixed(1)}KB (${webpPct}% savings from original)`)

      const webpPath = `${path.dirname(filePath.path)}/${baseName}.webp`
      const webpContent = await fs.readFile(webpOutput)
      const { error: webpError } = await supabase
        .storage
        .from(STORAGE_BUCKET)
        .upload(webpPath, webpContent, { upsert: true, contentType: 'image/webp', cacheControl: CACHE_CONTROL })

      if (webpError) {
        console.error(`  ERROR uploading WebP: ${webpError.message}`)
      } else {
        optimizedCount.webp++
      }

      await fs.unlink(webpOutput).catch(() => {})
    }

    await fs.unlink(origOutput).catch(() => {})
  }

  // Cleanup temp files
  await fs.unlink(tmpInput).catch(() => {})
}

console.log(`\n🚀 Supabase Storage Image Optimizer`)
console.log(`   Bucket: ${STORAGE_BUCKET}`)
console.log(`   Prefix: ${STORAGE_PREFIX}`)
console.log(`   Quality: ${quality}, original resolution preserved`)
console.log('')

const allowedDirs = STORAGE_SUBDIRS.split(',').map(s => `${STORAGE_PREFIX}/${s.trim()}/`)
const deletePrefixes = DELETE_ORIGINALS_SUBDIRS.split(',').map(s => `${STORAGE_PREFIX}/${s.trim()}/`)

console.log('📂 Listing files...')
const allFiles = await listAllFiles(STORAGE_PREFIX)
const imageFiles = allFiles.filter(f => isImage(f.name) && allowedDirs.some(d => f.path.startsWith(d)))

console.log(`   Found ${allFiles.length} files, ${imageFiles.length} images in [${STORAGE_SUBDIRS}]\n`)

for (const file of imageFiles) {
  await processFile(file)
}

const report = {
  status: optimizedCount.failed > 0 ? 'partial' : 'success',
  filesProcessed: imageFiles.length,
  jpegOptimized: optimizedCount.jpeg,
  pngOptimized: optimizedCount.png,
  webpGenerated: optimizedCount.webp,
  skipped: optimizedCount.skipped,
  failed: optimizedCount.failed,
  timestamp: new Date().toISOString(),
}
const reportPath = path.join(tmpDir, 'optimizer-report.json')
await fs.writeFile(reportPath, JSON.stringify(report, null, 2))
console.log(`\n✅ Done!`)
console.log(`   JPEG optimized: ${optimizedCount.jpeg}`)
console.log(`   PNG optimized:  ${optimizedCount.png}`)
console.log(`   WebP generated: ${optimizedCount.webp}`)
console.log(`   Skipped:        ${optimizedCount.skipped}`)
console.log(`   Failed:         ${optimizedCount.failed}`)
console.log(`   Report: ${reportPath}`)

// Copy report to working dir for GH Actions artifact
try { await fs.copyFile(reportPath, 'optimizer-report.json') } catch {}

// Cleanup temp dir
await fs.rm(tmpDir, { recursive: true, force: true })
