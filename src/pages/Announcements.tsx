import { motion } from 'framer-motion'
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
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase">Updates</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Announcements</motion.h1>
          </div>

          {error && (
            <div className="max-w-5xl mx-auto text-center py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            </div>
          )}

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
                    className="group block p-6 rounded-2xl bg-white dark:bg-dark-surface-secondary border border-border dark:border-dark-border hover:border-brand-500/50 transition-all duration-300 glow-card"
                  >
                    <div className="flex items-start gap-4">
                      {announcement.image && (
                        <div className="hidden sm:block w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-surface-tertiary dark:bg-dark-surface-tertiary">
                          <img src={announcement.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          {announcement.tag && (
                            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-full">{announcement.tag}</span>
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
                        <h2 className="font-display font-semibold text-xl text-text-primary dark:text-dark-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{announcement.title}</h2>
                        <p className="mt-1 text-base text-text-secondary dark:text-dark-text-secondary line-clamp-2">{announcement.summary}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-text-muted group-hover:text-brand-600 transition-colors mt-1"><polyline points="9 18 15 12 9 6" /></svg>
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
