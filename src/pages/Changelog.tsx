import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ParticleField from '@/components/changelog/ParticleField'
import FadeInView from '@/components/changelog/FadeInView'
import VersionCard from '@/components/changelog/VersionCard'

const GH_RAW = 'https://raw.githubusercontent.com/RU-Club-Motherland/ruclub-react/main/CHANGELOG.md'

interface Section { heading: string; items: string[] }
interface Version { version: string; date: string; sections: Section[] }

function parseChangelog(text: string): Version[] {
  const versions: Version[] = []
  let current: Version | null = null
  let currentSection: Section | null = null

  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    const versionMatch = trimmed.match(/^##\s+\[(.+?)\]\s*(?:—\s*)?(.+)?$/)
    if (versionMatch) {
      if (current) { if (currentSection) { current.sections.push(currentSection) }; versions.push(current) }
      current = { version: versionMatch[1], date: versionMatch[2] || '', sections: [] }
      currentSection = null
      continue
    }
    if (!current) continue
    const sectionMatch = trimmed.match(/^###\s+(.+)/)
    if (sectionMatch) {
      if (currentSection) current.sections.push(currentSection)
      currentSection = { heading: sectionMatch[1], items: [] }
      continue
    }
    if (currentSection && (trimmed.startsWith('- ') || trimmed.startsWith('* '))) {
      currentSection.items.push(trimmed)
    }
  }
  if (current) { if (currentSection) current.sections.push(currentSection); versions.push(current) }
  return versions
}

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

function AnimatedTitle({ text }: { text: string }) {
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

function VersionCounter({ versions }: { versions: Version[] }) {
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    violet: 'text-violet-400',
    amber: 'text-amber-400',
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
      {[
        { label: 'Releases', value: versions.length, color: 'emerald' },
        { label: 'Changes', value: versions.reduce((a, v) => a + v.sections.reduce((b, s) => b + s.items.length, 0), 0), color: 'blue' },
        { label: 'Categories', value: [...new Set(versions.flatMap(v => v.sections.map(s => s.heading)))].length, color: 'violet' },
        { label: 'Latest', value: versions[0]?.version || '', color: 'amber' },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="bg-white/[0.03] border border-white/[0.06] p-3 text-center"
        >
          <div className={`text-lg sm:text-xl font-display font-bold ${colorMap[stat.color] || 'text-emerald-400'}`}>{stat.value}</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Changelog() {
  const [raw, setRaw] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(height > 0 ? winScroll / height : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch(GH_RAW)
      .then(r => { if (!r.ok) throw Error(); return r.text() })
      .then(text => { setRaw(text); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const versions = useMemo(() => parseChangelog(raw), [raw])

  return (
    <>
      <Helmet>
        <title>Changelog — RU Club Motherland</title>
        <meta name="description" content="Release history and changelog for RU Club Motherland website." />
      </Helmet>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      />

      {/* Particle background */}
      <ParticleField />

      {/* Main content wrapper */}
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

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
              <AnimatedTitle text="Changelog" />
            </motion.div>
            <motion.p variants={heroChild} className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Every update, improvement, and fix that shaped this project.
              <br className="hidden sm:block" />
              Track the evolution of RU Club Motherland.
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

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] p-7">
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="space-y-3"
                  >
                    <div className="h-5 w-24 bg-white/5" />
                    <div className="h-3 w-full bg-white/5" />
                    <div className="h-3 w-3/4 bg-white/5" />
                    <div className="h-3 w-5/6 bg-white/5" />
                  </motion.div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <FadeInView>
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h2 className="text-xl font-display font-bold text-white mb-2">Unable to fetch changelog</h2>
                <p className="text-sm text-gray-400 mb-6">GitHub may be unreachable. View directly on GitHub:</p>
                <a
                  href="https://github.com/RU-Club-Motherland/ruclub-react/blob/main/CHANGELOG.md"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  View on GitHub
                </a>
              </div>
            </FadeInView>
          )}

          {/* Stats counter */}
          {!loading && !error && versions.length > 0 && (
            <FadeInView delay={0.2} className="mb-12">
              <VersionCounter versions={versions} />
            </FadeInView>
          )}

          {/* Timeline / Versions */}
          {!loading && !error && versions.length > 0 && (
            <div id="versions" className="relative">
              {/* Timeline line */}
              <div className="absolute left-[17px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent -translate-x-1/2 hidden sm:block" />

              <div className="space-y-5">
                {versions.map((version, i) => (
                  <div key={version.version} className="relative">
                    {/* Timeline dot */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 -top-1 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                        className="w-[10px] h-[10px] bg-emerald-400 ring-[3px] ring-gray-950"
                      />
                    </div>
                    <VersionCard version={version} index={i} />
                  </div>
                ))}
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

          {/* Footer */}
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
