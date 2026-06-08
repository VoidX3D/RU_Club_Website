import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { getContent } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import type { Content } from '@/types'

export default function CTASection() {
  const fetcher = useCallback(() => getContent(), [])
  const { data: content, loading } = useSiteData<Content>(fetcher)

  if (loading || !content) return null

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              {content.cta.title}
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto">
              {content.cta.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-brand-700 font-medium hover:bg-white/90 transition-all"
              >
                {content.cta.primaryBtn}
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
              >
                {content.cta.secondaryBtn}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
