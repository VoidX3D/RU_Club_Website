import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAnnouncementDetail } from '@/lib/supabase'
import { renderMd } from '@/lib/utils'
import SEOHead from '@/components/SEOHead'
import type { AnnouncementFull } from '@/types'

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>()
  const [announcement, setAnnouncement] = useState<AnnouncementFull | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) { setError('Invalid announcement ID.'); setLoading(false); return }
    setLoading(true)
    setError(null)
    getAnnouncementDetail(id)
      .then((data) => {
        if (!data) { setError('Announcement not found.'); setLoading(false); return }
        setAnnouncement(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load announcement.')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-1/2" />
            <div className="h-4 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-1/3" />
            <div className="h-32 bg-surface-secondary dark:bg-dark-surface-tertiary rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl font-display font-bold text-text-muted dark:text-dark-text-muted mb-4">!</div>
          <h1 className="text-3xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-2">Announcement not found</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">{error || 'The announcement you\'re looking for doesn\'t exist.'}</p>
          <Link to="/announcements" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition-all">Back to Announcements</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead title={announcement.title} description={announcement.summary} image={announcement.image || undefined} />

      <article className="min-h-screen">
        <div className="w-full px-4 sm:px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <Link to="/announcements"
              className="inline-flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              Back to Announcements
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {announcement.tag && (
                  <span className="text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-3 py-1 rounded-full">{announcement.tag}</span>
                )}
                {announcement.status === 'urgent' && (
                  <span className="text-sm font-medium text-red-500 bg-red-50 dark:bg-red-950/50 px-3 py-1 rounded-full">Urgent</span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-4">{announcement.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-text-muted dark:text-dark-text-muted mb-6">
                <span className="inline-flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {announcement.date}{announcement.day ? ` (${announcement.day})` : ''}
                </span>
                {announcement.issuedBy && (
                  <span className="inline-flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {announcement.issuedBy}
                  </span>
                )}
                {announcement.deadline && (
                  <span className="inline-flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Deadline: {announcement.deadline}
                  </span>
                )}
              </div>

              {announcement.image && (
                <div className="rounded-2xl overflow-hidden mb-8 bg-surface-tertiary dark:bg-dark-surface-tertiary">
                  <img src={announcement.image} alt={announcement.title} className="w-full aspect-video object-cover" />
                </div>
              )}

              <div className="max-w-none">
                <p className="text-xl font-medium mb-4 text-text-primary dark:text-dark-text-primary">{announcement.summary}</p>
                {announcement.description && (
                  <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-primary"
                    dangerouslySetInnerHTML={{ __html: renderMd(announcement.description) }} />
                )}
                {announcement.importance && (
                  <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <div className="text-sm font-medium text-amber-800 dark:text-amber-300 flex items-start gap-2 prose prose-sm dark:prose-invert max-w-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      <div dangerouslySetInnerHTML={{ __html: renderMd(announcement.importance) }} />
                    </div>
                  </div>
                )}
                {announcement.instructions && (
                  <div className="mt-6 p-4 rounded-xl bg-surface-secondary dark:bg-dark-surface-tertiary border border-border dark:border-dark-border">
                    <h3 className="font-display font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Instructions</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary"
                      dangerouslySetInnerHTML={{ __html: renderMd(announcement.instructions) }} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </>
  )
}
