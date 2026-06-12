import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Version {
  version: string
  date: string
  sections: { heading: string; items: string[] }[]
}

interface Props {
  version: Version
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

function getBadgeColor(section: string): string {
  const key = section.toLowerCase()
  return colorMap[key] || 'from-gray-400 to-gray-500'
}

function getDotColor(section: string): string {
  const key = section.toLowerCase()
  return dotColorMap[key] || 'bg-gray-400'
}

function formatItems(items: string[]): string[] {
  return items.map(i => i.replace(/^-\s*/, '').replace(/\[(.+?)\]\(.+?\)/g, '$1'))
}

export default function VersionCard({ version, index }: Props) {
  const [expanded, setExpanded] = useState(index === 0)
  const isUnreleased = version.version === 'Unreleased'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.8), ease: [0.22, 1, 0.36, 1] as const }}
      className="group"
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="relative bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/25 transition-all duration-500 cursor-pointer overflow-hidden rounded-lg"
      >
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>

        <div className="relative p-5 sm:p-7">
          <div className="flex items-center gap-4 mb-2">
            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${isUnreleased ? 'from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/20' : 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/20'}`}>
              {version.version}
            </span>
            {version.date && (
              <span className="text-xs text-gray-500 font-mono">{version.date}</span>
            )}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-gray-600">{expanded ? 'click to collapse' : 'click to expand'}</span>
              <motion.svg
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
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
                <div className="pt-4 space-y-4">
                  {version.sections.map((section) => (
                    <div key={section.heading}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${getDotColor(section.heading)}`} />
                        <h4 className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${getBadgeColor(section.heading)} bg-clip-text text-transparent`}>
                          {section.heading}
                        </h4>
                      </div>
                      <ul className="space-y-1.5 ml-4">
                        {formatItems(section.items).map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03, duration: 0.3 }}
                            className="text-sm text-gray-400 leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-emerald-500/50 mt-1.5 shrink-0">▸</span>
                            <span>{item}</span>
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
    </motion.div>
  )
}
