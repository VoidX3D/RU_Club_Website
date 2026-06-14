import { useEffect, useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ErrorBanner } from '@/components/ErrorBanner'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllGalleryImages } from '@/lib/supabase'
import { handleImgError } from '@/lib/utils'
import SEOHead from '@/components/SEOHead'
import { Lightbox } from '@/components/Lightbox'
import AOS from 'aos'
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
      AOS.refresh()
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

  return (
    <>
      <SEOHead title="Gallery" description="Photo gallery showcasing RU Club Motherland's environmental missions and activities — tree planting, clean-ups, workshops, and community events in Pokhara, Nepal." keywords="RU Club gallery, environmental activities photos, tree plantation pictures, community event photos Pokhara, Nepal school club gallery, sustainability images" jsonLd={{ '@type': 'ImageGallery', description: 'Photo gallery showcasing RU Club Motherland environmental missions and activities.', image: groups.length > 0 ? groups[0].images[0]?.url : undefined, author: { '@type': 'Organization', name: 'RU Club Motherland' } }} />

      <section className="py-20">
        <div className="w-full px-4 sm:px-6">
          <PageHeader badge="Moments" title="Photo Gallery" />
          {!loading && groups.length > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="mt-2 text-base text-text-secondary dark:text-dark-text-secondary text-center"
            >{groups.length} missions &middot; {totalImages} images</motion.p>
          )}

          {error && <ErrorBanner message={error} />}

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
              <p className="text-base text-text-secondary dark:text-dark-text-muted">No images available yet.</p>
            </div>
          ) : (
            <>
              <div className="max-w-7xl mx-auto space-y-14">
                {visibleGroups.map((group, gIdx) => (
                  <div key={group.slug}>
                    <div className="flex items-end justify-between mb-5" data-aos="fade-up">
                      <div>
                        <Link to={`/mission/${group.slug}`} className="inline-flex items-center gap-2 group/link">
                          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary dark:text-dark-text-primary group-hover/link:text-brand-700 transition-colors">{group.title}</h2>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary group-hover/link:text-brand-700 transition-colors"><polyline points="9 18 15 12 9 6"/></svg>
                        </Link>
                        <p className="text-xs text-text-secondary dark:text-dark-text-muted mt-0.5">{group.images.length} image{group.images.length > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="50" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {group.images.map((img, iIdx) => (
                        <motion.button key={img.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: iIdx * 0.05 }}
                          onClick={() => openLightbox(gIdx, iIdx)}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary cursor-pointer"
                        >
                          <img src={img.url} alt={img.alt} className="w-full h-full object-scale-down group-hover:scale-110 transition-transform duration-500 p-2"
                            loading={gIdx === 0 && iIdx < 8 ? undefined : 'lazy'}
                            fetchPriority={gIdx === 0 && iIdx < 8 ? 'high' : undefined}
                            decoding="async"
                            onError={handleImgError} />
                          <div className="img-fallback hidden absolute inset-0 bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
                            <span className="text-xs text-text-secondary dark:text-dark-text-muted">Failed to load</span>
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
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-700 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-800 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-700/30 cursor-pointer"
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

      {currentGroup && (
        <Lightbox
          open={lightboxGroupIdx >= 0}
          images={currentGroup.images}
          currentIndex={lightboxImageIdx}
          onClose={closeLightbox}
          onIndexChange={setLightboxImageIdx}
          title={<Link to={`/mission/${currentGroup.slug}`} className="hover:underline">{currentGroup.title}</Link>}
        />
      )}
    </>
  )
}
