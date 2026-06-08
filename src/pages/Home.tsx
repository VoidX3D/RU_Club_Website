import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getStats, getPartners, getContent, getMissionList } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import { storageUrl } from '@/lib/utils'
import SEOHead from '@/components/SEOHead'
import type { Stat, Partner, Content, MissionEntry } from '@/types'
import '@/styles/home.css'

function HeroSection() {
  const fetcher = useCallback(() => getContent(), [])
  const { data: content } = useSiteData<Content>(fetcher)
  const hero = content?.hero

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-[70px] md:pt-[100px]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/50 z-[1]" />
      <img
        src={storageUrl('/static/assets/images/heroimg-bg.jpeg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full px-4 sm:px-6 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 shadow-lg text-brand-300 text-sm md:text-base font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-3 h-3 rounded-full bg-brand-500 animate-pulse shrink-0" />
          {hero?.badge || 'Sustainability Leaders'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(3.5rem,12vw,8rem)] font-display font-extrabold leading-[1.05] tracking-tight text-white"
        >
          <span className="block">{hero?.titleLine1 || 'A Greener'}</span>
          <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{hero?.titleLine2 || 'Future.'}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-[clamp(1.2rem,2.5vw,1.6rem)] text-white/80 max-w-[800px] mx-auto leading-relaxed font-normal"
        >
          {hero?.subtitle || '"Leading the community toward a zero-waste ecosystem through innovation and collective responsibility."'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-brand-600 text-white font-bold text-lg uppercase tracking-wider hover:bg-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30"
          >
            {hero?.ctaPrimary || 'Get Started'}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center px-12 py-5 rounded-full bg-white/10 border border-white/30 text-white font-bold text-lg uppercase tracking-wider hover:bg-white/20 transition-all hover:-translate-y-0.5"
          >
            {hero?.ctaSecondary || 'View Gallery'}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
          <polyline points="6 9 12 15 18 9" />
        </svg>
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
              <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-display font-extrabold leading-none text-white mb-2">
                {stat.value}
              </div>
              <div className="text-base md:text-lg text-white/85 font-medium">
                {stat.label}
              </div>
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
  const [mission, setMission] = useState<MissionEntry | null>(null)

  useEffect(() => {
    if (!missions || missions.length === 0) return
    const shown = missions.filter(m => m.show !== false)
    if (shown.length === 0) return
    setMission(shown[Math.floor(Math.random() * shown.length)])
  }, [missions])

  if (!mission) return null

  return (
    <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm tracking-wider uppercase">Our Mission</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary">{mission.title}</h2>
          <p className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary max-w-4xl mx-auto">{mission.description}</p>
          <Link to={`/mission/${mission.slug}`} className="mt-6 inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline font-semibold text-base">
            View Mission Details &rarr;
          </Link>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary shadow-xl">
            <img
              src={mission.featured || storageUrl('/static/assets/brand/logo.png')}
              alt={mission.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block text-xs font-semibold text-white bg-brand-600 px-3 py-1 rounded-full mb-2">
                {mission.tag}
              </span>
              <h3 className="text-2xl font-display font-bold text-white">{mission.title}</h3>
            </div>
          </div>
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
    <section className="py-16 bg-surface-secondary dark:bg-dark-surface-secondary overflow-hidden">
      <div className="w-full px-4 sm:px-6">
        <p className="text-center text-sm font-medium text-text-muted dark:text-dark-text-muted tracking-wider uppercase mb-8" data-aos="fade-up">
          Trusted By
        </p>
        <div data-aos="fade-up" className="partners-mask overflow-hidden">
          <div className="partners-track">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="partner-card">
                <img
                  src={partner.src}
                  alt={partner.alt}
                  title={partner.name}
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
  const fetcher = useCallback(() => getContent(), [])
  const { data: content } = useSiteData<Content>(fetcher)

  if (!content) return null

  return (
    <section id="intro" className="py-20">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm tracking-wider uppercase">{content.intro.label}</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary">{content.intro.title}</h2>
        </div>
        <div className="space-y-6 max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          {content.intro.paragraphs.map((p, i) => (
            <p key={i} className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const fetcher = useCallback(() => getContent(), [])
  const { data: content } = useSiteData<Content>(fetcher)

  if (!content) return null

  const iconMap: Record<string, string> = {
    plant: '/static/assets/icons/plant.svg',
    trash: '/static/assets/icons/trash.svg',
    book: '/static/assets/icons/book.svg',
  }

  return (
    <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm tracking-wider uppercase">{content.features.label}</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary">{content.features.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {content.features.cards.map((card, i) => (
            <div
              key={card.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group relative p-6 rounded-2xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <img src={iconMap[card.icon] || `/static/assets/icons/${card.icon}.svg`} alt={card.title} className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-xl text-text-primary dark:text-dark-text-primary mb-2">{card.title}</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-base leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const fetcher = useCallback(() => getContent(), [])
  const { data: content } = useSiteData<Content>(fetcher)

  if (!content) return null

  return (
    <section className="py-20">
      <div className="w-full px-4 sm:px-6 text-center">
        <div data-aos="fade-up" className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 overflow-hidden max-w-6xl mx-auto">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">{content.cta.title}</h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">{content.cta.subtitle}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center px-8 py-3 rounded-full bg-white text-brand-700 font-semibold text-base hover:bg-white/90 transition-all">
                {content.cta.primaryBtn}
              </Link>
              <Link to="/gallery" className="inline-flex items-center px-8 py-3 rounded-full border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all">
                {content.cta.secondaryBtn}
              </Link>
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
