import { motion } from 'framer-motion'
import { PageHeader } from '@/components/PageHeader'
import { ErrorBanner } from '@/components/ErrorBanner'
import { Info, ChevronRight } from '@/components/Icons'
import { Link } from 'react-router-dom'
import { getMissionList } from '@/lib/supabase'
import { handleImgError } from '@/lib/utils'
import { useSiteData } from '@/hooks/useSiteData'
import SEOHead from '@/components/SEOHead'
import type { MissionEntry } from '@/types'

export default function Missions() {
  const { data: missions, loading, error } = useSiteData<MissionEntry[]>(getMissionList)
  const visibleMissions = missions?.filter(m => m.show !== false) || []

  return (
    <>
      <SEOHead title="Missions" description="Explore RU Club Motherland's environmental missions — from park clean-ups and tree plantation drives to recycling workshops and community awareness campaigns in Pokhara, Nepal." keywords="environmental missions, tree plantation drives, park clean-up Pokhara, recycling workshops Nepal, community awareness, zero-waste missions, RU Club projects" />

      <section className="py-20">
        <div className="w-full px-4 sm:px-6">
          <PageHeader badge="Our Work" title="Environmental Missions" description="From park clean-ups to recycling workshops — see how we&apos;re making a difference." />

          {error && <ErrorBanner message={error} className="max-w-7xl mx-auto" />}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface-secondary dark:bg-dark-surface-tertiary animate-pulse h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {visibleMissions?.map((mission, i) => (
                <motion.div key={mission.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex"
                >
                  <Link to={`/mission/${mission.slug}`}
                    className="group flex flex-col w-full bg-white dark:bg-dark-surface-secondary border border-border dark:border-dark-border hover:border-brand-500/40 transition-colors duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary">
                      {mission.featured ? (
                        <img src={mission.featured} alt={mission.title} width="800" height="600"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async"
                          onError={handleImgError} />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center bg-surface-tertiary dark:bg-dark-surface-tertiary ${mission.featured ? 'hidden' : ''}`}>
                        <span className="text-text-secondary dark:text-dark-text-muted text-xs">{mission.featured ? 'Failed to load' : 'No image'}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        {mission.tag && (
                          <span className="text-[10px] font-semibold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-full">{mission.tag}</span>
                        )}
                        {mission.date && <span className="text-[10px] text-text-secondary dark:text-dark-text-muted">{mission.date}</span>}
                      </div>
                      <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{mission.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-2">{mission.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && visibleMissions.length === 0 && (
            <div className="text-center py-20">
              <p className="text-base text-text-muted dark:text-dark-text-muted">No missions published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
