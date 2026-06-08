import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMissionInfo, getMissionImages } from '@/lib/supabase'
import SEOHead from '@/components/SEOHead'
import type { MissionInfo } from '@/types'

export default function MissionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [mission, setMission] = useState<MissionInfo | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    Promise.all([
      getMissionInfo(slug),
      getMissionImages(slug),
    ]).then(([info, imgs]) => {
      setMission(info)
      if (imgs) {
        setImages(imgs.map((i) => i.url))
      } else if (info?.images) {
        setImages(info.images.map((f) => `/static/assets/mission/${slug}/${f}`))
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-1/3" />
            <div className="aspect-video bg-surface-secondary dark:bg-dark-surface-tertiary rounded-2xl" />
            <div className="h-4 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-full" />
            <div className="h-4 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!mission) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-text-primary dark:text-dark-text-primary">Mission not found</h1>
          <Link to="/missions" className="mt-4 inline-flex text-brand-600 hover:underline">Back to missions</Link>
        </div>
      </div>
    )
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <SEOHead
        title={mission.title}
        description={mission.description}
        image={images[0] || mission.images?.[0] || '/static/assets/brand/logo.png'}
        url={`https://ru.motherland.edu.np/mission/${mission.slug}`}
      />

      <article className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/missions"
            className="inline-flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Missions
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {mission.tag && (
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-3 py-1 rounded-full">
                  {mission.tag}
                </span>
              )}
              {mission.date && (
                <span className="text-sm text-text-muted dark:text-dark-text-muted">{mission.date}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-4">
              {mission.title}
            </h1>

            <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-8">
              {mission.description}
            </p>

            {mission.detail && (
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed whitespace-pre-line">
                  {mission.detail}
                </p>
              </div>
            )}

            {mission.stats && Object.keys(mission.stats).length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(mission.stats).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-xl bg-surface-secondary dark:bg-dark-surface-tertiary text-center">
                    <div className="text-xl font-display font-bold text-brand-600 dark:text-brand-400">{value}</div>
                    <div className="text-xs text-text-muted dark:text-dark-text-muted mt-1 capitalize">{key.replace(/_/g, ' ')}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="aspect-video rounded-xl overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary group cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`${mission.title} - Image ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {mission.partners && mission.partners.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary"
            >
              <h3 className="font-display font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-3">
                Partners
              </h3>
              <div className="flex flex-wrap gap-2">
                {mission.partners.map((partner) => (
                  <span
                    key={partner}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
            }}
            className="absolute left-4 text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={images[lightboxIndex]}
            alt={`Image ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
            }}
            className="absolute right-4 text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
