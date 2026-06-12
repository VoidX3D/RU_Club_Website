import { getPartners } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import type { Partner } from '@/types'

export default function PartnersSection() {
  const { data: partners, loading } = useSiteData<Partner[]>(getPartners)

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-extrabold tracking-[0.3em] uppercase text-brand-600 dark:text-brand-400 mb-8">Trusted By</p>
          <div className="flex justify-center gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="w-[160px] h-[90px] bg-surface-tertiary dark:bg-dark-surface-tertiary animate-pulse" />)}
          </div>
        </div>
      </section>
    )
  }

  if (!partners) return null

  return (
    <section className="py-16 md:py-20 bg-surface-secondary dark:bg-dark-surface-secondary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 700px 400px at 15% 50%, rgba(13,148,136,0.07) 0%, transparent 70%), radial-gradient(ellipse 700px 400px at 85% 50%, rgba(13,148,136,0.05) 0%, transparent 70%)'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <p className="text-center text-xs font-extrabold tracking-[0.3em] uppercase text-brand-600 dark:text-brand-400 mb-8" data-aos="fade-up">
          Trusted By
        </p>
        <div data-aos="fade-up" className="overflow-hidden py-6"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0, #000 5rem, #000 calc(100% - 5rem), transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 5rem, #000 calc(100% - 5rem), transparent 100%)'
          }}
        >
          <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.name}-${i}`}
                className="flex items-center justify-center w-[160px] h-[90px] shrink-0 bg-white dark:bg-white/5 border border-border dark:border-white/10 px-4 py-3 transition-all duration-500 hover:border-transparent hover:-translate-y-1.5 hover:scale-105 hover:shadow-lg hover:shadow-brand-600/10 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={partner.src} alt={partner.alt} title={partner.name}
                  className="max-h-10 max-w-[120px] object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 dark:brightness-95"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
