import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getStats, getPartners, getMissionList } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import SEOHead from '@/components/SEOHead'
import { heroContent, introContent, featureCards, ctaContent, missionSectionContent } from '@/data'
import type { Stat, Partner, MissionEntry } from '@/types'

const iconSVGs: Record<string, React.ReactNode> = {
  plant: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-4a4 4 0 0 0-4-4H4"/><path d="M20 14h-4a4 4 0 0 0-4 4v4"/><path d="M12 2v6a4 4 0 0 0 4 4h6"/><path d="M2 12h6a4 4 0 0 0 4-4V2"/></svg>,
  trash: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  book: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
}

const dbFallbackStats = [
  { value: '108kg+', label: 'Waste Collected' },
  { value: '25+', label: 'Surveyed Areas' },
  { value: '33+', label: 'Active Members' },
  { value: '5+', label: 'Partner Organizations' },
]

const h = heroContent
const intro = introContent
const cards = featureCards
const cta = ctaContent
const ms = missionSectionContent

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/50 z-[1]" />
      <img src={h.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" loading="eager" />
      <div className="relative z-10 w-full px-4 sm:px-6 text-center py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 shadow-lg text-brand-300 text-sm md:text-base font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-3 h-3 rounded-full bg-brand-500 animate-pulse shrink-0" />
          {h.badge}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(3.25rem,10vw,7rem)] font-display font-extrabold leading-[1.05] tracking-tight text-white"
        >
          <span className="block">{h.titleLine1}</span>
          <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{h.titleLine2}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-[clamp(1.1rem,2.2vw,1.4rem)] text-white/80 max-w-[700px] mx-auto leading-relaxed font-normal"
        >
          {h.subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30">
            {h.ctaPrimary}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </Link>
          <Link to="/gallery" className="inline-flex items-center px-8 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/20 transition-all hover:-translate-y-0.5">
            {h.ctaSecondary}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function StatsSection() {
  const fetcher = useCallback(() => getStats(), [])
  const { data: stats, loading } = useSiteData<Stat[]>(fetcher)
  const displayStats = stats || dbFallbackStats

  if (!displayStats && loading) {
    return (
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-10 w-24 bg-white/20 rounded mx-auto mb-2" />
                <div className="h-4 w-20 bg-white/20 rounded mx-auto" />
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
          {displayStats.map((stat, i) => (
            <div key={stat.label} data-aos="fade-up" data-aos-delay={i * 100} className="text-white">
              <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-display font-extrabold leading-none mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-white/85 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MissionCarousel() {
  const fetcher = useCallback(() => getMissionList(), [])
  const { data: missions, loading } = useSiteData<MissionEntry[]>(fetcher)
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

  const activeMissions = missions?.filter(m => m.show !== false) || []

  return (
    <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary overflow-hidden">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          {loading ? (
            <>
              <div className="h-3 w-24 bg-surface-tertiary dark:bg-dark-surface-tertiary rounded animate-pulse mx-auto mb-4" />
              <div className="h-10 w-96 max-w-full bg-surface-tertiary dark:bg-dark-surface-tertiary rounded animate-pulse mx-auto mb-3" />
              <div className="h-5 w-72 max-w-full bg-surface-tertiary dark:bg-dark-surface-tertiary rounded animate-pulse mx-auto" />
            </>
          ) : (
            <>
              <p className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
                {ms.label}
              </p>
              <h2 className="text-[clamp(2.75rem,6vw,4.25rem)] font-display font-extrabold tracking-tight text-text-primary dark:text-dark-text-primary">
                {ms.title}
              </h2>
              {ms.subtitle && (
                <p className="mt-4 text-base text-text-secondary dark:text-dark-text-secondary max-w-xl mx-auto">
                  {ms.subtitle}
                </p>
              )}
            </>
          )}
          <Link to="/missions" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-brand-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30">
            View All Missions
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>

        {loading ? (
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video rounded-2xl bg-surface-tertiary dark:bg-dark-surface-tertiary animate-pulse" />
          </div>
        ) : activeMissions.length > 0 ? (
          <div data-aos="fade-up" data-aos-delay="100" className="mission-arrows">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              centeredSlides
              slidesPerView={1}
              spaceBetween={16}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={700}
              navigation={{ prevEl, nextEl }}
              pagination={{ clickable: true }}
              grabCursor
              loop={true}
              watchOverflow
              breakpoints={{
                640: { slidesPerView: 'auto', spaceBetween: 24, centeredSlides: true }
              }}
              className="mission-carousel !pb-14"
            >
              {activeMissions.map((m) => (
                <SwiperSlide key={m.id}>
                  <Link to={`/mission/${m.slug}`} className="group block w-full h-full rounded-2xl md:rounded-3xl overflow-hidden relative bg-surface-tertiary dark:bg-dark-surface-tertiary">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    {m.featured ? (
                      <img src={m.featured} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
                        <span className="text-text-muted dark:text-dark-text-muted text-sm">No image</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8">
                      {m.tag && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.1em] text-white bg-brand-600 px-3 py-1 rounded-full mb-2">{m.tag}</span>
                      )}
                      <h3 className="text-white font-display font-bold text-lg sm:text-xl md:text-2xl leading-tight">{m.title}</h3>
                      <p className="text-white/80 text-sm mt-1 line-clamp-1 max-w-xl">{m.description}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <button ref={setPrevEl} className="mission-arrow mission-arrow-prev" aria-label="Previous slide">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button ref={setNextEl} className="mission-arrow mission-arrow-next" aria-label="Next slide">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted dark:text-dark-text-muted"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <p className="text-text-muted dark:text-dark-text-muted text-lg font-medium">No missions yet</p>
            <p className="text-text-muted dark:text-dark-text-muted text-sm mt-1">Check back soon for upcoming missions.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function PartnersSection() {
  const fetcher = useCallback(() => getPartners(), [])
  const { data: partners, loading } = useSiteData<Partner[]>(fetcher)

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-extrabold tracking-[0.3em] uppercase text-brand-600 dark:text-brand-400 mb-8">Trusted By</p>
          <div className="flex justify-center gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="w-[160px] h-[90px] rounded-xl bg-surface-tertiary dark:bg-dark-surface-tertiary animate-pulse" />)}
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
              <div
                key={`${partner.name}-${i}`}
                className="flex items-center justify-center w-[160px] h-[90px] shrink-0 bg-white dark:bg-white/5 border border-border dark:border-white/10 rounded-xl md:rounded-2xl px-4 py-3 transition-all duration-500 hover:border-transparent hover:-translate-y-1.5 hover:scale-105 hover:shadow-lg hover:shadow-brand-600/10 relative overflow-hidden group"
              >
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

function IntroSection() {
  return (
    <section id="intro" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-bold text-xs tracking-[0.2em] uppercase mb-4">{intro.label}</p>
          <h2 className="text-[clamp(2.75rem,6vw,4.25rem)] font-display font-extrabold tracking-tight text-text-primary dark:text-dark-text-primary mb-8">{intro.title}</h2>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" className="space-y-6">
          {intro.paragraphs.map((p, i) => (
            <p key={i} className="text-base md:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed md:leading-8" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-bold text-xs tracking-[0.2em] uppercase mb-4">What We Do</p>
          <h2 className="text-[clamp(2.75rem,6vw,4.25rem)] font-display font-extrabold tracking-tight text-text-primary dark:text-dark-text-primary">Our Initiatives</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <div key={card.title} data-aos="fade-up" data-aos-delay={i * 100}
              className="group relative bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl md:rounded-2xl px-6 py-10 md:px-8 md:py-12 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-400/50 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              <div className="w-[70px] h-[70px] mx-auto mb-6 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 transition-transform duration-500 group-hover:scale-110">
                {iconSVGs[card.icon]}
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary dark:text-dark-text-primary mb-3">{card.title}</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm md:text-base leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 md:py-28 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-display font-extrabold text-text-primary dark:text-dark-text-primary mb-4" data-aos="fade-up">{cta.title}</h2>
        <p className="text-text-secondary dark:text-dark-text-secondary text-base md:text-lg max-w-xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">{cta.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30">
            {cta.primaryBtn}
          </Link>
          <Link to="/gallery" className="inline-flex items-center px-8 py-3.5 rounded-full bg-white dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary font-semibold text-sm uppercase tracking-wider hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:-translate-y-0.5">
            {cta.secondaryBtn}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <SEOHead title="Home" description="RU Club Motherland — Environmental Sustainability Club at Motherland Secondary School, Pokhara, Nepal. Join us in creating a zero-waste ecosystem." />
      <HeroSection />
      <StatsSection />
      <MissionCarousel />
      <PartnersSection />
      <IntroSection />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
