import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { getStats } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import type { Stat } from '@/types'

export default function StatsSection() {
  const fetcher = useCallback(() => getStats(), [])
  const { data: stats, loading } = useSiteData<Stat[]>(fetcher)

  if (loading || !stats) return null

  return (
    <section className="relative -mt-20 z-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white dark:bg-dark-surface-secondary border border-border dark:border-dark-border rounded-2xl p-6 text-center group-hover:border-brand-500/50 group-hover:text-white transition-all duration-300">
                <div className="text-3xl sm:text-4xl font-display font-bold gradient-text group-hover:bg-none group-hover:text-white transition-all">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary group-hover:text-white/80 transition-colors">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
