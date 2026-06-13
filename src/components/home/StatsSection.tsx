import { getStats } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import type { Stat } from '@/types'

const dbFallbackStats = [
  { value: '108kg+', label: 'Waste Collected' },
  { value: '25+', label: 'Surveyed Areas' },
  { value: '33+', label: 'Active Members' },
  { value: '5+', label: 'Partner Organizations' },
]

export default function StatsSection() {
  const { data: stats, loading, error } = useSiteData<Stat[]>(getStats)
  const displayStats = stats || (error ? dbFallbackStats : null)

  if (loading && !stats) {
    return (
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="min-h-[3.5rem] w-24 bg-white/20 rounded mx-auto mb-2" />
                <div className="min-h-[1.5rem] w-20 bg-white/20 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-r from-brand-600 to-brand-700 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {displayStats!.map((stat, i) => (
            <div key={stat.label} data-aos="fade-up" data-aos-delay={i * 100} className="text-white">
              <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-display font-extrabold leading-none mb-2 min-h-[3.5rem]">{stat.value}</div>
              <div className="text-sm md:text-base text-white/85 font-medium min-h-[1.5rem]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
