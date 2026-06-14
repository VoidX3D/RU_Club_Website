import { motion } from 'framer-motion'
import { PageHeader } from '@/components/PageHeader'
import { ErrorBanner } from '@/components/ErrorBanner'
import { ChevronRight } from '@/components/Icons'
import { Link } from 'react-router-dom'
import { getAnnouncementList } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import SEOHead from '@/components/SEOHead'
import type { AnnouncementEntry } from '@/types'

export default function Announcements() {
  const { data: announcements, loading, error } = useSiteData<AnnouncementEntry[]>(getAnnouncementList)

  return (
    <>
      <SEOHead title="Announcements" description="Latest announcements and updates from RU Club Motherland — including event notices, deadlines, opportunities, and urgent updates for students and the Pokhara community." keywords="school announcements, RU Club updates, Motherland Secondary School notices, student opportunities Pokhara, club events Nepal, environmental club news" />

      <section className="py-20">
        <div className="w-full px-4 sm:px-6">
          <PageHeader badge="Updates" title="Announcements" />

          {error && <ErrorBanner message={error} />}

          {loading ? (
            <div className="space-y-4 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary animate-pulse h-32" />
              ))}
            </div>
          ) : announcements?.length === 0 && !error ? (
            <div className="text-center py-20">
              <p className="text-base text-text-muted dark:text-dark-text-muted">No announcements at this time. Check back later!</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-5xl mx-auto">
              {announcements?.map((announcement, i) => (
                <motion.div key={announcement.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/announcement/${announcement.id}`}
                    className="group block p-6 rounded-2xl bg-white dark:bg-dark-surface-secondary border border-border dark:border-dark-border hover:border-brand-500/50 transition-colors duration-300 glow-card"
                  >
                    <div className="flex items-start gap-4">
                      {announcement.image && (
                        <div className="hidden sm:block w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-surface-tertiary dark:bg-dark-surface-tertiary">
                          <img src={announcement.image} alt="" width="80" height="80" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          {announcement.tag && (
                            <span className="text-xs font-semibold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-full">{announcement.tag}</span>
                          )}
                          <span className="text-xs text-text-muted dark:text-dark-text-muted">{announcement.date}{announcement.day ? ` (${announcement.day})` : ''}</span>
                          {announcement.status === 'urgent' && (
                            <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-full">Urgent</span>
                          )}
                          {announcement.status === 'ongoing' && (
                            <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">Ongoing</span>
                          )}
                          {announcement.status === 'upcoming' && (
                            <span className="text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full">Upcoming</span>
                          )}
                          {announcement.status === 'deadline' && (
                            <span className="text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-950/50 px-2 py-0.5 rounded-full">Deadline</span>
                          )}
                          {announcement.status === 'ended' && (
                            <span className="text-xs font-semibold text-zinc-500 bg-zinc-50 dark:bg-zinc-950/50 px-2 py-0.5 rounded-full">Ended</span>
                          )}
                        </div>
                        <h2 className="font-display font-semibold text-xl text-text-primary dark:text-dark-text-primary group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{announcement.title}</h2>
                        <p className="mt-1 text-base text-text-secondary dark:text-dark-text-secondary line-clamp-2">{announcement.summary}</p>
                      </div>
                      <ChevronRight size={20} className="shrink-0 text-text-muted group-hover:text-brand-700 transition-colors mt-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
