import { useEffect, useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllGalleryImages } from '@/lib/supabase'
import SEOHead from '@/components/SEOHead'
import type { GalleryImage } from '@/types'

interface MissionGroup {
  slug: string
  title: string
  images: GalleryImage[]
}

const PER_PAGE = 3

function groupImages(imgs: GalleryImage[]): MissionGroup[] {
  const map = new Map<string, MissionGroup>()
  for (const img of imgs) {
    const key = img.missionSlug
    if (!map.has(key)) {
      map.set(key, {
        title: img.missionTitle,
        slug: img.missionSlug,
        images: [],
      })
    }
    map.get(key)!.images.push(img)
  }
  return Array.from(map.values())
}

export default function Gallery() {
  const [groups, setGroups] = useState<MissionGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lightboxGroupIdx, setLightboxGroupIdx] = useState(-1)
  const [lightboxImageIdx, setLightboxImageIdx] = useState(0)
  const [visible, setVisible] = useState(PER_PAGE)

  const totalImages = useMemo(() => groups.reduce((s, g) => s + g.images.length, 0), [groups])
  const visibleGroups = groups.slice(0, visible)
  const hasMore = visible < groups.length

  useEffect(() => {
    getAllGalleryImages().then((data) => {
      if (!data) { setError('Could not load gallery images. Check database connection.'); setLoading(false); return }
      setGroups(groupImages(data))
      setLoading(false)
      import('aos').then(m => m.default.refresh())
    }).catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to load gallery.')
      setLoading(false)
    })
  }, [])

  const openLightbox = (gIdx: number, iIdx: number) => {
    setLightboxGroupIdx(gIdx)
    setLightboxImageIdx(iIdx)
  }
  const closeLightbox = () => setLightboxGroupIdx(-1)

  const currentGroup = lightboxGroupIdx >= 0 && lightboxGroupIdx < visibleGroups.length ? visibleGroups[lightboxGroupIdx] : null
  const currentImg = currentGroup ? currentGroup.images[lightboxImageIdx] : null
  const lightboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lightboxGroupIdx >= 0) lightboxRef.current?.focus()
  }, [lightboxGroupIdx])

  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <>
      <SEOHead title="Gallery" description="Photo gallery showcasing RU Club Motherland's environmental missions and activities." />

      <section className="py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase">Moments</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Photo Gallery</motion.h1>
            {!loading && groups.length > 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-2 text-base text-text-secondary dark:text-dark-text-secondary">{groups.length} missions &middot; {totalImages} images</motion.p>
            )}
          </div>

          {error && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-12 max-w-7xl mx-auto">
              {[1, 2, 3].map((g) => (
                <div key={g}>
                  <div className="h-5 w-48 bg-surface-secondary dark:bg-dark-surface-tertiary rounded animate-pulse mb-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-[4/3] rounded-xl bg-surface-secondary dark:bg-dark-surface-tertiary animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : groups.length === 0 && !error ? (
            <div className="text-center py-20">
              <p className="text-base text-text-muted dark:text-dark-text-muted">No images available yet.</p>
            </div>
          ) : (
            <>
              <div className="max-w-7xl mx-auto space-y-14">
                {visibleGroups.map((group, gIdx) => (
                  <div key={group.slug}>
                    <div className="flex items-end justify-between mb-5" data-aos="fade-up">
                      <div>
                        <Link to={`/mission/${group.slug}`} className="inline-flex items-center gap-2 group/link">
                          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary dark:text-dark-text-primary group-hover/link:text-brand-600 transition-colors">{group.title}</h2>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted group-hover/link:text-brand-600 transition-colors"><polyline points="9 18 15 12 9 6"/></svg>
                        </Link>
                        <p className="text-xs text-text-muted dark:text-dark-text-muted mt-0.5">{group.images.length} image{group.images.length > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="50" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {group.images.map((img, iIdx) => (
                        <motion.button key={img.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: iIdx * 0.05 }}
                          onClick={() => openLightbox(gIdx, iIdx)}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary cursor-pointer"
                        >
                          <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"
                            onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; el.parentElement!.querySelector('.img-fallback')?.classList.remove('hidden') }} />
                          <div className="img-fallback hidden absolute inset-0 bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
                            <span className="text-xs text-text-muted dark:text-dark-text-muted">Failed to load</span>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                            <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity px-2 text-center line-clamp-1">{img.alt}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="text-center mt-12">
                  <button onClick={() => setVisible((v) => v + PER_PAGE)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30 cursor-pointer"
                  >
                    Load More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {currentImg && currentGroup && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') setLightboxImageIdx((prev) => prev > 0 ? prev - 1 : currentGroup.images.length - 1)
            if (e.key === 'ArrowRight') setLightboxImageIdx((prev) => prev < currentGroup.images.length - 1 ? prev + 1 : 0)
          }}
          tabIndex={-1}
          ref={lightboxRef}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 min-w-0">
              <Link to={`/mission/${currentGroup.slug}`} className="text-sm text-white/70 hover:text-white truncate hover:underline">{currentGroup.title}</Link>
              <span className="text-white/40 text-xs shrink-0">{lightboxImageIdx + 1} / {currentGroup.images.length}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleDownload(currentImg.downloadUrl, `${currentGroup.slug}-${lightboxImageIdx + 1}.jpg`)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" title="Download">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
              <button onClick={closeLightbox} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 min-h-0" onClick={(e) => e.stopPropagation()}>
            <button onClick={(e) => { e.stopPropagation(); setLightboxImageIdx((prev) => prev > 0 ? prev - 1 : currentGroup.images.length - 1) }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <img src={currentImg.url} alt={currentImg.alt} className="max-h-full max-w-full object-contain rounded-lg" />
            <button onClick={(e) => { e.stopPropagation(); setLightboxImageIdx((prev) => prev < currentGroup.images.length - 1 ? prev + 1 : 0) }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
