import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { getPartners } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import type { Partner } from '@/types'

export default function PartnersSection() {
  const fetcher = useCallback(() => getPartners(), [])
  const { data: partners, loading } = useSiteData<Partner[]>(fetcher)

  if (loading || !partners) return null

  const doubled = [...partners, ...partners]

  return (
    <section className="py-16 bg-surface-secondary dark:bg-dark-surface-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-text-muted dark:text-dark-text-muted tracking-wider uppercase mb-8"
        >
          Trusted By
        </motion.p>
        <div className="relative">
          <div className="flex overflow-hidden mask-fade-right">
            <div className="flex gap-8 animate-scroll">
              {doubled.map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="flex-shrink-0 h-12 flex items-center"
                >
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    title={partner.name}
                    className="h-full w-auto opacity-50 dark:opacity-40 hover:opacity-100 dark:hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
