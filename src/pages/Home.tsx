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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-50/50 via-transparent to-transparent dark:from-brand-950/20 dark:via-transparent dark:to-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-300/20 dark:bg-brand-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          {hero?.badge || 'Sustainability Leaders'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-tight"
        >
          <span className="block">{hero?.titleLine1 || 'A Greener'}</span>
          <span className="block gradient-text">{hero?.titleLine2 || 'Future.'}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-xl sm:text-2xl text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed"
        >
          {hero?.subtitle || '"Leading the community toward a zero-waste ecosystem through innovation and collective responsibility."'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 text-white font-medium text-lg hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-600/25"
          >
            {hero?.ctaPrimary || 'Get Started'}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center px-8 py-4 rounded-xl border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary font-medium text-lg hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-all"
          >
            {hero?.ctaSecondary || 'View Gallery'}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
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
    <section className="relative -mt-20 z-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="stat-card relative bg-white dark:bg-dark-surface-secondary border border-border dark:border-dark-border rounded-2xl p-6 text-center">
                <div className="text-4xl sm:text-5xl font-display font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-base text-text-secondary dark:text-dark-text-secondary">
                  {stat.label}
                </div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-medium text-sm tracking-wider uppercase">Our Mission</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary">{mission.title}</h2>
          <p className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">{mission.description}</p>
          <Link to={`/mission/${mission.slug}`} className="mt-6 inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline font-medium text-base">
            View Mission Details &rarr;
          </Link>
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <div className="relative rounded-2xl overflow-hidden bg-surface-tertiary dark:bg-dark-surface-tertiary max-w-4xl mx-auto shadow-xl">
            <img
              src={mission.featured || storageUrl('/static/assets/brand/logo.png')}
              alt={mission.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block text-xs font-medium text-white bg-brand-600 px-3 py-1 rounded-full mb-2">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-medium text-sm tracking-wider uppercase">{content.intro.label}</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary">{content.intro.title}</h2>
        </div>
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
          {content.intro.paragraphs.map((p, i) => (
            <p key={i} className="text-xl text-text-secondary dark:text-dark-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-medium text-sm tracking-wider uppercase">{content.features.label}</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary">{content.features.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div data-aos="fade-up" className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">{content.cta.title}</h2>
            <p className="mt-4 text-xl text-white/80 max-w-lg mx-auto">{content.cta.subtitle}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-brand-700 font-medium hover:bg-white/90 transition-all">
                {content.cta.primaryBtn}
              </Link>
              <Link to="/gallery" className="inline-flex items-center px-6 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-all">
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
