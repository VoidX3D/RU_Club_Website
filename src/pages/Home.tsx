import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { getStats, getPartners, getMissionList, getHeroContent, getIntroContent, getFeatureCards, getCTAContent } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import { formatDate } from '@/lib/utils'
import SEOHead from '@/components/SEOHead'
import type { Stat, Partner, MissionEntry, HeroContent, IntroContent, FeatureCard, CTAContent } from '@/types'

const iconSVGs: Record<string, React.ReactNode> = {
  plant: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-4a4 4 0 0 0-4-4H4"/><path d="M20 14h-4a4 4 0 0 0-4 4v4"/><path d="M12 2v6a4 4 0 0 0 4 4h6"/><path d="M2 12h6a4 4 0 0 0 4-4V2"/></svg>,
  trash: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  book: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
}

function HeroSection() {
  const fetcher = useCallback(() => getHeroContent(), [])
  const { data: h } = useSiteData<HeroContent>(fetcher)
  if (!h) return null
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-[80px] md:pt-[120px]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/50 z-[1]" />
      <img src={h.bgImage || ''} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 w-full px-4 sm:px-6 text-center py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 shadow-lg text-brand-300 text-sm md:text-base font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-3 h-3 rounded-full bg-brand-500 animate-pulse shrink-0" />
          {h.badge}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(2.5rem,8vw,5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-white"
        >
          <span className="block">{h.titleLine1}</span>
          <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{h.titleLine2}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-[clamp(1rem,2vw,1.25rem)] text-white/80 max-w-[700px] mx-auto leading-relaxed font-normal"
        >
          {h.subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30">
            {h.ctaPrimary}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle"><polyline points="6 9 12 15 18 9" /></svg>
          </Link>
          <Link to="/gallery" className="inline-flex items-center px-8 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/20 transition-all hover:-translate-y-0.5">
            {h.ctaSecondary}
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </section>
  )
}

function StatsSection() {
  const fetcher = useCallback(() => getStats(), [])
  const { data: stats } = useSiteData<Stat[]>(fetcher)
  if (!stats) return null
  return (
    <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} data-aos="fade-up" data-aos-delay={i * 100} className="text-center">
              <div className="text-[clamp(2rem,4vw,3rem)] font-display font-extrabold leading-none text-white mb-1">{stat.value}</div>
              <div className="text-sm md:text-base text-white/85 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MissionBanner() {
  const fetcher = useCallback(() => getMissionList(), [])
  const { data: missions } = useSiteData<MissionEntry[]>(fetcher)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  if (!missions || missions.length === 0) return null
  const shown = missions.filter(m => m.show !== false)
  if (shown.length === 0) return null

  return (
    <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10" data-aos="fade-up">
          <div>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase">Our Mission</p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Recent Missions</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button ref={prevRef} className="w-10 h-10 rounded-full bg-white dark:bg-dark-surface border border-border dark:border-dark-border flex items-center justify-center text-text-secondary hover:text-brand-600 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button ref={nextRef} className="w-10 h-10 rounded-full bg-white dark:bg-dark-surface border border-border dark:border-dark-border flex items-center justify-center text-text-secondary hover:text-brand-600 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
              }
            }}
            spaceBetween={20} slidesPerView={1.1}
            breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 24 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }}
            className="!pb-2"
          >
            {shown.map((m) => (
              <SwiperSlide key={m.id}>
                <Link to={`/mission/${m.slug}`} className="group block rounded-2xl overflow-hidden bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:border-brand-500/50 transition-all duration-300 glow-card h-full">
                  <div className="aspect-[16/10] overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary">
                    <img src={m.featured || ''} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      {m.tag && <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-full">{m.tag}</span>}
                      {m.date && <span className="text-[10px] text-text-muted dark:text-dark-text-muted">{formatDate(m.date)}</span>}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">{m.title}</h3>
                    <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary line-clamp-2">{m.description}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

function PartnersSection() {
  const fetcher = useCallback(() => getPartners(), [])
  const { data: partners } = useSiteData<Partner[]>(fetcher)
  if (!partners) return null
  return (
    <section className="py-16 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="w-full px-4 sm:px-6">
        <p className="text-center text-sm font-medium text-text-muted dark:text-dark-text-muted tracking-wider uppercase mb-8" data-aos="fade-up">Trusted By</p>
        <div data-aos="fade-up" className="partners-mask overflow-hidden">
          <div className="partners-track">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="partner-card">
                <img src={partner.src} alt={partner.alt} title={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IntroSection() {
  const fetcher = useCallback(() => getIntroContent(), [])
  const { data: intro } = useSiteData<IntroContent>(fetcher)
  if (!intro) return null
  return (
    <section id="intro" className="py-20">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase">{intro.label}</p>
          <h2 className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">{intro.title}</h2>
        </div>
        <div className="space-y-5 max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          {intro.paragraphs.map((p, i) => (
            <p key={i} className="text-base text-text-secondary dark:text-dark-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const fetcher = useCallback(() => getFeatureCards(), [])
  const { data: cards } = useSiteData<FeatureCard[]>(fetcher)
  if (!cards) return null
  return (
    <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase">Why Join</p>
          <h2 className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">What We Do</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {cards.map((card, i) => (
            <div key={card.title} data-aos="fade-up" data-aos-delay={i * 100}
              className="group relative p-5 rounded-2xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {iconSVGs[card.icon]}
              </div>
              <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary mb-1.5">{card.title}</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const fetcher = useCallback(() => getCTAContent(), [])
  const { data: cta } = useSiteData<CTAContent>(fetcher)
  if (!cta) return null
  return (
    <section className="py-20">
      <div className="w-full px-4 sm:px-6 text-center">
        <div data-aos="fade-up" className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 overflow-hidden max-w-6xl mx-auto">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">{cta.title}</h2>
            <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">{cta.subtitle}</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center px-6 py-2.5 rounded-full bg-white text-brand-700 font-semibold text-sm hover:bg-white/90 transition-all">{cta.primaryBtn}</Link>
              <Link to="/gallery" className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all">{cta.secondaryBtn}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <SEOHead title="Home" />
      <HeroSection />
      <StatsSection />
      <MissionBanner />
      <PartnersSection />
      <IntroSection />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
