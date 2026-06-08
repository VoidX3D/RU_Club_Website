import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { getMissionList } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import { storageUrl } from '@/lib/utils'
import SEOHead from '@/components/SEOHead'
import type { MissionEntry } from '@/types'

export default function Gallery() {
  const fetcher = useCallback(() => getMissionList(), [])
  const { data: missions, loading } = useSiteData<MissionEntry[]>(fetcher)

  return (
    <>
      <SEOHead title="Gallery" />

      <section className="pt-[70px] md:pt-[100px] py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-600 dark:text-brand-400 font-semibold text-sm tracking-wider uppercase"
            >
              Moments
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary"
            >
              Photo Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary"
            >
              A visual journey through our environmental initiatives.
            </motion.p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary animate-pulse aspect-[4/3]" />
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
                    <div className="aspect-[4/3] overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary">
                      <img
                        src={mission.featured || storageUrl('/static/assets/brand/logo.png')}
                        alt={mission.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-1">
                        {mission.tag && (
                          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                            {mission.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {mission.title}
                      </h3>
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
