import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { getContent } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import type { Content } from '@/types'

export default function FeaturesSection() {
  const fetcher = useCallback(() => getContent(), [])
  const { data: content, loading } = useSiteData<Content>(fetcher)

  if (loading || !content) return null

  const iconMap: Record<string, string> = {
    plant: '/static/assets/icons/plant.svg',
    trash: '/static/assets/icons/trash.svg',
    book: '/static/assets/icons/book.svg',
  }

  return (
    <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 dark:text-brand-400 font-medium text-sm tracking-wider uppercase"
          >
            {content.features.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary"
          >
            {content.features.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.features.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:border-brand-500/50 transition-all duration-300 glow-card"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <img
                  src={iconMap[card.icon] || `/static/assets/icons/${card.icon}.svg`}
                  alt={card.title}
                  className="w-6 h-6 icon-current text-brand-600 dark:text-brand-400"
                />
              </div>
              <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary mb-2">
                {card.title}
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
