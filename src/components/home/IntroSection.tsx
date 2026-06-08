import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { getContent } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import type { Content } from '@/types'

export default function IntroSection() {
  const fetcher = useCallback(() => getContent(), [])
  const { data: content, loading } = useSiteData<Content>(fetcher)

  if (loading || !content) return null

  return (
    <section id="intro" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 dark:text-brand-400 font-medium text-sm tracking-wider uppercase"
          >
            {content.intro.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary"
          >
            {content.intro.title}
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {content.intro.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
