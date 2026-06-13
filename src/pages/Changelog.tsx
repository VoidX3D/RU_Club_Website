import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ParticleField from '@/components/changelog/ParticleField'
import FadeInView from '@/components/changelog/FadeInView'
import VersionCard from '@/components/changelog/VersionCard'
import { parseChangelog, formatVersionCount } from '@/lib/changelog-parser'
import changelogContent from '../../CHANGELOG.md?raw'

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const heroChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -40 },
  visible: (i: number) => ({ opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as const } }),
}

function AnimatedTitle() {
  const text = 'Changelog'
  return (
    <motion.h1
      className="text-5xl sm:text-7xl font-display font-extrabold text-white inline-flex flex-wrap justify-center gap-x-3"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              custom={wi * 10 + ci}
              variants={letterVariants}
              className="inline-block hover:text-emerald-400 transition-colors duration-300"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
    >
      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
      <span className="text-xs font-medium text-emerald-300 tracking-wider uppercase">Release History</span>
    </motion.div>
  )
}

function VersionCounter({ versions }: { versions: ReturnType<typeof parseChangelog> }) {
  const stats = useMemo(() => formatVersionCount(versions), [versions])
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    violet: 'text-violet-400',
    amber: 'text-amber-400',
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
      {[
        { label: 'Releases', value: stats.releases, color: 'emerald' },
        { label: 'Changes', value: stats.totalChanges, color: 'blue' },
        { label: 'Categories', value: stats.uniqueCategories, color: 'violet' },
        { label: 'Latest', value: stats.latestVersion, color: 'amber' },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/20 transition-colors p-4 text-center rounded-lg"
        >
          <div className={`text-xl sm:text-2xl font-display font-bold ${colorMap[stat.color] || 'text-emerald-400'}`}>{stat.value}</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-widest mt-1 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Changelog() {
  const versions = useMemo(() => parseChangelog(changelogContent), [])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>Changelog — RU Club Motherland</title>
        <meta name="description" content="Release history and version changelog for RU Club Motherland website — track all updates, new features, bug fixes, and improvements to the environmental sustainability club platform." />
        <meta name="keywords" content="RU Club changelog, release history, website updates, environmental club website, Motherland Secondary School changelog, sustainability platform updates" />
        <link rel="canonical" href="https://ruclub.rweb.site/changelog" />
      </Helmet>

      <ParticleField />

      <div className="relative z-10 min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

          {/* HERO */}
          <motion.div
            className="text-center mb-16 sm:mb-24"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroChild} className="flex justify-center mb-6">
              <FloatingBadge />
            </motion.div>
            <motion.div variants={heroChild} className="mb-4">
              <AnimatedTitle />
            </motion.div>
            <motion.p variants={heroChild} className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Every update, improvement, and fix that shaped this project.
              <br className="hidden sm:block" />
              Track the evolution of RU Club Motherland across {versions.length} releases.
            </motion.p>
            <motion.div variants={heroChild} className="mt-4">
              <a href="#versions" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors group">
                <span>Browse releases</span>
                <motion.svg
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          {versions.length > 0 && (
            <FadeInView delay={0.2} className="mb-14">
              <VersionCounter versions={versions} />
            </FadeInView>
          )}

          {/* Timeline */}
          {versions.length > 0 && (
            <div id="versions">
              <FadeInView delay={0.3} className="text-center mb-10">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white/90">Version History</h2>
                <p className="text-sm text-gray-500 mt-1">Chronological record of all releases</p>
              </FadeInView>
              <div className="relative sm:pr-11">
              {/* Vertical timeline line on the RIGHT */}
              <div className="hidden sm:block absolute right-[4.5px] top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent" />

              <div className="space-y-5">
                {versions.map((version, i) => (
                  <VersionCard key={version.version} version={version} index={i} />
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Back to home */}
          <FadeInView delay={0.4} className="mt-16 text-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm font-medium hover:bg-white/[0.06] hover:border-emerald-500/25 hover:text-emerald-300 transition-all duration-300"
            >
              <motion.svg
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </motion.svg>
              Back to Home
            </Link>
          </FadeInView>

          <FadeInView delay={0.6} className="mt-12 pb-8 text-center">
            <p className="text-xs text-gray-600">
              RU Club Motherland &middot; Motherland Secondary School &middot; Pokhara, Nepal
            </p>
          </FadeInView>
        </div>
      </div>
    </>
  )
}
