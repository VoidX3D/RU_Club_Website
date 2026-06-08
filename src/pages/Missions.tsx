import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { getMissionList } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import { storageUrl } from '@/lib/utils'
import SEOHead from '@/components/SEOHead'
import type { MissionEntry } from '@/types'

export default function Missions() {
  const fetcher = useCallback(() => getMissionList(), [])
  const { data: missions, loading } = useSiteData<MissionEntry[]>(fetcher)

  return (
    <>
      <SEOHead title="Missions" />

      <section className="pt-[70px] md:pt-[100px] py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-600 dark:text-brand-400 font-semibold text-sm tracking-wider uppercase"
            >
              Our Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary"
            >
              Environmental Missions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto"
            >
              From park clean-ups to recycling workshops — see how we're making a difference.
            </motion.p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary animate-pulse h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {missions?.map((mission, i) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/mission/${mission.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white dark:bg-dark-surface-secondary border border-border dark:border-dark-border hover:border-brand-500/50 transition-all duration-300 glow-card"
                  >
                    <div className="aspect-video overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary">
                      <img
                        src={mission.featured || storageUrl('/static/assets/brand/logo.png')}
                        alt={mission.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {mission.tag && (
                          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-full">
                            {mission.tag}
                          </span>
                        )}
                        {mission.date && (
                          <span className="text-xs text-text-muted dark:text-dark-text-muted">
                            {mission.date}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-semibold text-xl text-text-primary dark:text-dark-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {mission.title}
                      </h3>
                      <p className="mt-1.5 text-base text-text-secondary dark:text-dark-text-secondary line-clamp-2">
                        {mission.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && missions?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-base text-text-muted dark:text-dark-text-muted">No missions published yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
