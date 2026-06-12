import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChangelogItem { text: string }
interface ChangelogSection { heading: string; items: ChangelogItem[] }
interface ChangelogVersion { version: string; date: string; sections: ChangelogSection[] }

interface Props {
  version: ChangelogVersion
  index: number
}

const colorMap: Record<string, string> = {
  unreleased: 'from-amber-400 to-orange-500',
  added: 'from-emerald-400 to-teal-500',
  changed: 'from-blue-400 to-indigo-500',
  fixed: 'from-violet-400 to-purple-500',
  removed: 'from-rose-400 to-pink-500',
  deprecated: 'from-yellow-400 to-amber-500',
  security: 'from-red-400 to-rose-500',
}

const dotColorMap: Record<string, string> = {
  added: 'bg-emerald-400',
  changed: 'bg-blue-400',
  fixed: 'bg-violet-400',
  removed: 'bg-rose-400',
  deprecated: 'bg-yellow-400',
  security: 'bg-red-400',
}

const bgColorMap: Record<string, string> = {
  added: 'bg-emerald-500/10',
  changed: 'bg-blue-500/10',
  fixed: 'bg-violet-500/10',
  removed: 'bg-rose-500/10',
  deprecated: 'bg-yellow-500/10',
  security: 'bg-red-500/10',
}

function getBadgeColor(section: string): string {
  const key = section.toLowerCase()
  return colorMap[key] || 'from-gray-400 to-gray-500'
}

function getDotColor(section: string): string {
  const key = section.toLowerCase()
  return dotColorMap[key] || 'bg-gray-400'
}

function getBgColor(section: string): string {
  const key = section.toLowerCase()
  return bgColorMap[key] || 'bg-gray-500/10'
}

export default function VersionCard({ version, index }: Props) {
  const [expanded, setExpanded] = useState(index === 0)
  const isUnreleased = version.version === 'Unreleased'

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.6), ease: [0.22, 1, 0.36, 1] as const }}
      className="relative flex items-stretch gap-0 group"
    >
      {/* Card */}
      <div className="flex-1 min-w-0">
        <div
          onClick={() => setExpanded(!expanded)}
          className="relative bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/25 transition-all duration-500 cursor-pointer overflow-hidden rounded-lg"
        >
          {/* Shine */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          <div className="relative p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r ${isUnreleased ? 'from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/20' : 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/20'}`}>
                {version.version}
              </span>
              {version.date && (
                <span className="text-[11px] text-gray-500 font-mono">{version.date}</span>
              )}
              <div className="ml-auto flex items-center gap-1.5">
                <span className="text-[10px] text-gray-600 hidden sm:inline">{expanded ? 'collapse' : 'expand'}</span>
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

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-3">
                    {version.sections.map((section) => (
                      <div key={section.heading}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`w-1.5 h-1.5 ${getDotColor(section.heading)}`} />
                          <h4 className={`text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r ${getBadgeColor(section.heading)} bg-clip-text text-transparent`}>
                            {section.heading}
                          </h4>
                          <span className={`text-[10px] px-1.5 ${getBgColor(section.heading)} text-gray-500`}>
                            {section.items.length}
                          </span>
                        </div>
                        <ul className="space-y-1 ml-3.5">
                          {section.items.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.02, duration: 0.25 }}
                              className="text-sm text-gray-400 leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-emerald-500/40 mt-1.5 shrink-0 text-[10px]">▸</span>
                              <span>{item.text}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Connector + Timeline dot (desktop only) */}
      <div className="hidden sm:flex items-center shrink-0 relative" style={{ width: '40px' }}>
        {/* Horizontal connector line */}
        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-emerald-500/15 to-emerald-500/30" />
        {/* Timeline dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(index * 0.08, 0.6), type: 'spring', stiffness: 250, damping: 15 }}
          className="w-[11px] h-[11px] bg-emerald-400 ring-[3px] ring-gray-950 z-10 absolute right-0"
          style={{ transform: 'translateX(50%)' }}
        />
      </div>
    </motion.div>
  )
}
