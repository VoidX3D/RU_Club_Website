import { useMemo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ParticleField from '@/components/changelog/ParticleField'
import FadeInView from '@/components/changelog/FadeInView'
import { SITE_URL } from '@/data'
import { renderMarkdown } from '@/lib/markdown'
import changelogContent from '../../CHANGELOG.md?raw'

interface VersionBlock {
  version: string
  date: string
  content: string
  isUnreleased: boolean
}

function parseVersions(raw: string): [string, VersionBlock[]] {
  const lines = raw.split('\n')
  const headerLines: string[] = []
  const versions: VersionBlock[] = []
  let currentVersion: VersionBlock | null = null
  let inVersion = false

  const versionRegex = /^##\s+\[(.+?)\]\s*(?:[—–-]\s*)?(.+)?$/

  for (const line of lines) {
    const match = line.match(versionRegex)
    if (match) {
      if (currentVersion) {
        versions.push(currentVersion)
      }
      const version = match[1].trim()
      currentVersion = {
        version,
        date: (match[2] || '').trim(),
        content: '',
        isUnreleased: version.toLowerCase() === 'unreleased',
      }
      inVersion = true
      continue
    }

    if (!inVersion) {
      headerLines.push(line)
    } else if (currentVersion) {
      currentVersion.content += line + '\n'
    }
  }

  if (currentVersion) {
    versions.push(currentVersion)
  }

  return [headerLines.join('\n'), versions]
}

function VersionCard({ version, index }: { version: VersionBlock; index: number }) {
  const [expanded, setExpanded] = useState(index <= 1)
  const html = useMemo(() => renderMarkdown(version.content), [version.content])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.5) }}
    >
      <div className={`relative group transition-all duration-500 ${
        expanded ? 'border-emerald-500/20' : 'border-white/[0.06] hover:border-white/10'
      }`}>
        <div
          onClick={() => setExpanded(!expanded)}
          className="relative bg-white/[0.02] border border-inherit transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/[0.02] to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          <div className="relative px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider border ${
                version.isUnreleased
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}>
                {version.version}
              </span>
              {version.date && (
                <span className="text-xs text-gray-500 font-mono">{version.date}</span>
              )}
              <div className="ml-auto flex items-center gap-1.5">
                <span className="text-[10px] text-gray-600 hidden sm:inline">
                  {expanded ? 'collapse' : 'expand'}
                </span>
                <motion.svg
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>
            </div>

            <motion.div
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/[0.06]">
                <div className="md-content text-gray-400 text-sm leading-relaxed
                  [&_h1]:text-white [&_h2]:text-white/90 [&_h2]:border-none [&_h2]:pb-0 [&_h2]:mt-0
                  [&_h3]:text-white/80 [&_h3]:text-[13px] [&_h3]:uppercase [&_h3]:tracking-wider [&_h3]:font-bold [&_h3]:mt-4
                  [&_strong]:text-white/70
                  [&_hr]:border-white/[0.06] [&_hr]:my-4
                  [&_blockquote]:bg-white/[0.02] [&_blockquote]:border-emerald-500/30 [&_blockquote]:my-3 [&_blockquote]:py-2 [&_blockquote]:px-4
                  [&_a]:text-emerald-400 [&_a:hover]:text-emerald-300
                  [&_code]:bg-emerald-500/10 [&_code]:text-emerald-300 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs
                  [&_pre]:bg-gray-900 [&_pre]:border [&_pre]:border-white/[0.06] [&_pre]:my-3
                  [&_ul]:space-y-1 [&_ul]:my-2
                  [&_li]:text-gray-400 [&_li::marker]:text-emerald-500/40
                  [&_img]:inline [&_img]:max-h-5 [&_img]:align-middle [&_img]:mx-0.5
                  [&_table]:text-xs [&_table]:my-3
                  [&_th]:bg-white/[0.03] [&_th]:text-white/70 [&_th]:border-white/[0.08]
                  [&_td]:border-white/[0.06] [&_td]:text-gray-400
                  [&_details]:border-white/[0.08] [&_details]:my-3
                  [&_details_summary]:bg-white/[0.02] [&_details_summary]:text-white/70 [&_details_summary]:text-sm
                  [&_details_[open]_summary]:border-white/[0.08]
                  [&_p]:m-0 [&_p]:leading-relaxed
                " dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StatsBar({ versions }: { versions: VersionBlock[] }) {
  const stats = useMemo(() => {
    let changes = 0
    for (const v of versions) {
      const sectionMatches = v.content.match(/^###\s+.+/gm)
      changes += sectionMatches ? sectionMatches.length : 0
    }
    return {
      releases: versions.length,
      changes,
      latest: versions[0]?.version || '—',
    }
  }, [versions])

  const items = [
    { label: 'Releases', value: stats.releases, color: 'text-emerald-400' },
    { label: 'Changes', value: `~${stats.changes}`, color: 'text-blue-400' },
    { label: 'Latest', value: stats.latest, color: 'text-amber-400' },
  ]

  return (
    <div className="flex items-center justify-center gap-8 sm:gap-12">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className={`text-2xl sm:text-3xl font-display font-bold ${item.color}`}>{item.value}</div>
          <div className="text-[10px] text-gray-600 uppercase tracking-widest mt-0.5">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function Changelog() {
  const [, versions] = useMemo(() => parseVersions(changelogContent), [])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>Changelog — RU Club Motherland</title>
        <meta name="description" content="Release history and version changelog for RU Club Motherland website — track all updates, new features, bug fixes, and improvements to the environmental sustainability club platform." />
        <meta name="keywords" content="RU Club changelog, release history, website updates, environmental club website, Motherland Secondary School changelog, sustainability platform updates" />
        <link rel="canonical" href={`${SITE_URL}/changelog`} />
      </Helmet>

      <ParticleField />

      <div className="relative z-10 min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

          {/* Hero */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-300 tracking-wider uppercase">Release History</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-display font-extrabold text-white mb-4">
              Changelog
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Every update, improvement, and fix that shaped this project.
              <br />
              Track the evolution of RU Club Motherland.
            </p>
            {versions.length > 0 && (
              <div className="mt-6">
                <StatsBar versions={versions} />
              </div>
            )}
          </motion.div>

          {/* Version timeline */}
          {versions.length > 0 && (
            <div className="relative">
              <div className="hidden sm:block absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent" />

              <div className="space-y-3 sm:pl-12">
                {versions.map((version, i) => (
                  <div key={version.version} className="relative">
                    <div className="hidden sm:flex absolute left-0 top-5 items-center justify-center">
                      <div className={`w-[9px] h-[9px] rounded-full ring-[3px] ring-gray-950 z-10 ${
                        i === 0 ? 'bg-emerald-400' : 'bg-emerald-500/40'
                      }`} />
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
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm font-medium hover:bg-white/[0.06] hover:border-emerald-500/25 hover:text-emerald-300 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:-translate-x-0.5 transition-transform"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
          </FadeInView>

          <div className="mt-12 pb-8 text-center">
            <p className="text-xs text-gray-600">
              RU Club Motherland &middot; Motherland Secondary School &middot; Pokhara, Nepal
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
