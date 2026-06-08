import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMissionList, getMissionImages } from '@/lib/supabase'
import SEOHead from '@/components/SEOHead'
import type { GalleryImage } from '@/types'

async function loadAllImages(missions: MissionEntry[]): Promise<GalleryImage[]> {
  const results: GalleryImage[] = []
  for (const m of missions) {
    const imgs = await getMissionImages(m.id)
    if (imgs) {
      imgs.forEach((img) => {
        results.push({
          id: img.id,
          url: img.url,
          alt: img.alt,
          missionTitle: m.title,
          missionSlug: m.slug,
          downloadUrl: img.url,
        })
      })
    }
  }
  return results
}

export default function Gallery() {
  const fetcher = useCallback(() => getMissionList(), [])
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  useEffect(() => {
    getMissionList().then(async (data) => {
      if (!data) { setLoading(false); return }
      const all = await loadAllImages(data)
      setImages(all)
      setLoading(false)
    })
  }, [])

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(-1)

  const handleDownload = async (url: string, filename: string) => {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      a.click()
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(url, '_blank')
    }
  }

  return (
    <>
      <SEOHead title="Gallery" />

      <section className="pt-[70px] md:pt-[100px] py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase">Moments</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Photo Gallery</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-2 text-base text-text-secondary dark:text-dark-text-secondary">{images.length} images across our missions</motion.p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-7xl mx-auto">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-surface-secondary dark:bg-dark-surface-tertiary animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base text-text-muted dark:text-dark-text-muted">No images available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-7xl mx-auto">
              {images.map((img, i) => (
                <motion.button
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary cursor-pointer"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.missionTitle}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex >= 0 && images[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={closeLightbox}>
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 min-w-0">
              <Link to={`/mission/${images[lightboxIndex].missionSlug}`} className="text-sm text-white/70 hover:text-white truncate hover:underline">{images[lightboxIndex].missionTitle}</Link>
              <span className="text-white/40 text-xs shrink-0">{lightboxIndex + 1} / {images.length}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleDownload(images[lightboxIndex].downloadUrl, `${images[lightboxIndex].missionSlug}-${lightboxIndex + 1}.jpg`)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Download"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
              <button onClick={closeLightbox} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 min-h-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => prev > 0 ? prev - 1 : images.length - 1) }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => prev < images.length - 1 ? prev + 1 : 0) }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
