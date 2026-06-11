import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMissionInfo } from '@/lib/supabase'
import { renderMd } from '@/lib/utils'
import SEOHead from '@/components/SEOHead'
import type { MissionInfo } from '@/types'

export default function MissionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [mission, setMission] = useState<MissionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const lightboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lightboxOpen) lightboxRef.current?.focus()
  }, [lightboxOpen])

  useEffect(() => {
    if (!slug) { setError('Invalid mission slug.'); setLoading(false); return }
    setLoading(true)
    setError(null)
    getMissionInfo(slug).then((info) => {
      if (!info) { setError('Mission not found.'); setLoading(false); return }
      setMission(info)
      setLoading(false)
    }).catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to load mission.')
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen">
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

  if (error || !mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl font-display font-bold text-text-muted dark:text-dark-text-muted mb-4">!</div>
          <h1 className="text-3xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-2">Mission not found</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">{error || 'The mission you\'re looking for doesn\'t exist or has been removed.'}</p>
          <Link to="/missions" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition-all">
            Back to Missions
          </Link>
        </div>
      </div>
    )
  }

  const images = mission.images || []
  const imageUrls = images.map(i => i.url)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <SEOHead title={mission.title} description={mission.description} image={imageUrls[0] || undefined} />

      <article className="min-h-screen">
        <div className="w-full px-4 sm:px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <Link to="/missions"
              className="inline-flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              Back to Missions
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                {mission.tag && (
                  <span className="text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-3 py-1 rounded-full">{mission.tag}</span>
                )}
                {mission.date && <span className="text-sm text-text-muted dark:text-dark-text-muted">{mission.date}</span>}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-4">{mission.title}</h1>
              <p className="text-xl leading-relaxed mb-8 text-text-secondary dark:text-dark-text-primary">{mission.description}</p>

              {mission.detail && (
                <div className="mb-8 md-content"
                  dangerouslySetInnerHTML={{ __html: renderMd(mission.detail) }} />
              )}

              {mission.stats && mission.stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {mission.stats.map((s) => (
                    <div key={s.label} className="p-4 rounded-xl bg-surface-secondary dark:bg-dark-surface-tertiary text-center">
                      <div className="text-xl font-display font-bold text-brand-600 dark:text-brand-400">{s.value}</div>
                      <div className="text-xs text-text-muted dark:text-dark-text-muted mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {mission.goals && mission.goals.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary">
                  <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary mb-3">Goals</h3>
                  <ul className="space-y-2">
                    {mission.goals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary dark:text-dark-text-secondary">
                        <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{i + 1}</span>
                        </span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {mission.timeline && mission.timeline.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary">
                  <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary mb-3">Timeline</h3>
                  <div className="space-y-4">
                    {mission.timeline.map((entry, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-brand-500 shrink-0" />
                          {i < mission.timeline!.length - 1 && <div className="w-0.5 flex-1 bg-brand-200 dark:bg-brand-900/50 mt-1" />}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary dark:text-dark-text-primary">{entry.title}</p>
                          {entry.date && <p className="text-xs text-text-muted dark:text-dark-text-muted">{entry.date}</p>}
                          {entry.description && <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">{entry.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {mission.participants && mission.participants.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary">
                  <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary mb-3">Participants</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {mission.participants.map((p, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border text-center">
                        <div className="text-lg font-bold text-brand-600 dark:text-brand-400">{p.participant_count}</div>
                        <div className="text-xs text-text-muted dark:text-dark-text-muted">{p.group_name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mission.budget && mission.budget.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary">
                  <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary mb-3">Budget</h3>
                  <div className="overflow-hidden rounded-xl border border-border dark:border-dark-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface-tertiary dark:bg-dark-surface-tertiary">
                          <th className="px-4 py-2 text-left font-medium text-text-primary dark:text-dark-text-primary">Item</th>
                          <th className="px-4 py-2 text-right font-medium text-text-primary dark:text-dark-text-primary">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border dark:divide-dark-border">
                        {mission.budget.map((b, i) => (
                          <tr key={i} className="bg-white dark:bg-dark-surface">
                            <td className="px-4 py-2 text-text-secondary dark:text-dark-text-secondary">{b.item}</td>
                            <td className="px-4 py-2 text-right font-medium text-text-primary dark:text-dark-text-primary">{b.amount || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>

            {images.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-dark-text-primary mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => openLightbox(i)}
                      className="aspect-video rounded-xl overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary group cursor-pointer relative"
                    >
                      <img src={img.url} alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"
                        onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; el.parentElement!.querySelector('.img-fallback')?.classList.remove('hidden') }} />
                      <div className="img-fallback hidden absolute inset-0 flex items-center justify-center bg-surface-tertiary dark:bg-dark-surface-tertiary">
                        <span className="text-xs text-text-muted dark:text-dark-text-muted">Failed to load</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {mission.partners && mission.partners.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="mt-8 p-6 rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary"
              >
                <h3 className="font-display font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-3">Partners</h3>
                <div className="flex flex-wrap gap-2">
                  {mission.partners.map((partner) => (
                    <span key={partner} className="px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary">
                      {partner}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </article>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightboxOpen(false)
            if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
            if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
          }}
          tabIndex={-1}
          ref={lightboxRef}
        >
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white z-10" aria-label="Close lightbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)) }}
            className="absolute left-4 text-white/80 hover:text-white" aria-label="Previous image">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <img src={imageUrls[lightboxIndex]} alt={images[lightboxIndex]?.alt || `Image ${lightboxIndex + 1}`} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)) }}
            className="absolute right-4 text-white/80 hover:text-white" aria-label="Next image">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">{lightboxIndex + 1} / {images.length}</div>
        </div>
      )}
    </>
  )
}
