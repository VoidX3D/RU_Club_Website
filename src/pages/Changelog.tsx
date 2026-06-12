import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '@/components/SEOHead'

const GH_RAW = 'https://raw.githubusercontent.com/RU-Club-Motherland/ruclub-react/main/CHANGELOG.md'

function simpleMd(text: string): string {
  const lines = text.split('\n')
  let html = ''; let inList = false; let inCode = false
  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) { html += '</pre>\n'; inCode = false; continue }
      html += '<pre class="bg-surface-tertiary dark:bg-dark-surface-tertiary p-4 rounded-xl overflow-x-auto text-sm leading-relaxed">\n'
      inCode = true; continue
    }
    if (inCode) { html += line + '\n'; continue }
    const trimmed = line.trim()
    if (!trimmed) {
      if (inList) { html += '</ul>\n'; inList = false }
      html += '<br />\n'; continue
    }
    if (trimmed.startsWith('### ')) {
      if (inList) { html += '</ul>\n'; inList = false }
      html += `<h3 class="text-lg font-display font-semibold text-text-primary dark:text-dark-text-primary mt-6 mb-2">${trimmed.slice(4)}</h3>\n`
    } else if (trimmed.startsWith('## ')) {
      if (inList) { html += '</ul>\n'; inList = false }
      html += `<h2 class="text-2xl font-display font-bold text-text-primary dark:text-dark-text-primary mt-8 mb-3">${trimmed.slice(3)}</h2>\n`
    } else if (trimmed.startsWith('# ')) {
      if (inList) { html += '</ul>\n'; inList = false }
      html += `<h1 class="text-3xl font-display font-bold text-text-primary dark:text-dark-text-primary mt-10 mb-4">${trimmed.slice(2)}</h1>\n`
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { html += '<ul class="space-y-1.5 ml-4 mb-4">\n'; inList = true }
      html += `<li class="text-text-secondary dark:text-dark-text-secondary">${trimmed.slice(2).replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-tertiary dark:bg-dark-surface-tertiary text-sm font-mono">$1</code>')}</li>\n`
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (!inList) { html += '<ol class="space-y-1.5 ml-4 mb-4">\n'; inList = true }
      html += `<li class="text-text-secondary dark:text-dark-text-secondary">${trimmed.replace(/^\d+\.\s/, '').replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-tertiary dark:bg-dark-surface-tertiary text-sm font-mono">$1</code>')}</li>\n`
    } else if (trimmed.startsWith('> ')) {
      if (inList) { html += '</ul>\n'; inList = false }
      html += `<blockquote class="border-l-4 border-brand-500 pl-4 italic text-text-secondary dark:text-dark-text-secondary my-3">${trimmed.slice(2)}</blockquote>\n`
    } else {
      if (inList) { html += '</ul>\n'; inList = false }
      html += `<p class="text-text-secondary dark:text-dark-text-secondary mb-2">${trimmed.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-tertiary dark:bg-dark-surface-tertiary text-sm font-mono">$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-600 hover:underline">$1</a>')}</p>\n`
    }
  }
  if (inList) html += '</ul>\n'
  if (inCode) html += '</pre>\n'
  return html
}

export default function Changelog() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(GH_RAW)
      .then(r => { if (!r.ok) throw Error(); return r.text() })
      .then(text => { setContent(text); setLoading(false) })
      .catch(() => {
        setContent('# Changelog\n\n> Unable to fetch from GitHub. See [CHANGELOG.md on GitHub](https://github.com/RU-Club-Motherland/ruclub-react/blob/main/CHANGELOG.md) for the full changelog.')
        setLoading(false); setError(true)
      })
  }, [])

  return (
    <>
      <SEOHead title="Changelog" description="Release history and changelog for RU Club Motherland website." />
      <section className="py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <p className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase mb-2">Updates</p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Changelog</h1>
              <p className="mt-2 text-base text-text-secondary dark:text-dark-text-secondary">Release history for the RU Club Motherland website.</p>
            </motion.div>
            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-full" />)}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: error ? content : simpleMd(content) }} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
