import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { getMembers } from '@/lib/supabase'
import { useSiteData } from '@/hooks/useSiteData'
import SEOHead from '@/components/SEOHead'
import type { MembersData, Member } from '@/types'

const typeMap: Record<string, { label: string; title: string; headers: string[] }> = {
  teachers: { label: 'Leadership', title: 'Teachers & Advisors', headers: ['#', 'Name', 'Position'] },
  core: { label: 'Team', title: 'Core Members', headers: ['#', 'Name', 'Class', 'Role'] },
  general: { label: 'Membership', title: 'General Members', headers: ['#', 'Name', 'Class', 'Role'] },
}

const roleStyles: Record<string, string> = {
  patron: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  advisor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  coord: 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300',
  dev: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  member: 'bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary',
}

export default function Members() {
  const fetcher = useCallback(() => getMembers(), [])
  const { data: members, loading } = useSiteData<MembersData>(fetcher)

  const renderTable = (group: 'teachers' | 'core' | 'general') => {
    if (!members || !members[group]) return null
    const cfg = typeMap[group]
    const hasClass = cfg.headers.includes('Class')
    const items = members[group]

    return (
      <motion.div
        key={group}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 last:mb-0"
      >
        <div className="mb-6">
          <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm tracking-wider uppercase">{cfg.label}</p>
          <h2 className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">{cfg.title}</h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface-secondary">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-secondary dark:bg-dark-surface-tertiary">
                  {cfg.headers.map((h) => (
                    <th
                      key={h}
                      className={`text-left text-xs font-bold text-text-muted dark:text-dark-text-muted uppercase tracking-wider px-4 py-3 ${h === '#' ? 'w-14' : ''}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-dark-border">
                {items.map((member: Member, i: number) => {
                  const isDev = member.name === 'Sincere Bhattarai'
                  return (
                    <tr
                      key={member.name}
                      className="hover:bg-surface-secondary dark:hover:bg-dark-surface-tertiary transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm text-text-muted dark:text-dark-text-muted font-mono">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                          {isDev ? (
                            <Link to="/secret-garden" className="text-base font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                              {member.name}
                            </Link>
                          ) : (
                            <span className="text-base font-semibold text-text-primary dark:text-dark-text-primary">
                              {member.name}
                            </span>
                          )}
                        </td>
                      {hasClass && (
                        <td className="px-4 py-3">
                          <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{member.class || '-'}</span>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        {isDev ? (
                          <span className="inline-flex text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                            Developer &amp; Event Lead
                          </span>
                        ) : (
                          <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${roleStyles[member.type || 'member'] || roleStyles.member}`}>
                            {member.role}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <SEOHead title="Members" />

      <section className="pt-[70px] md:pt-[100px] py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-600 dark:text-brand-400 font-semibold text-sm tracking-wider uppercase"
            >
              Our Team
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-4xl sm:text-5xl font-display font-bold text-text-primary dark:text-dark-text-primary"
            >
              Meet the Members
            </motion.h1>
            {members?.stats && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary"
              >
                {members.stats.total} members &middot; {members.stats.teachers} teachers &middot; {members.stats.core} core &middot; {members.stats.general} general
              </motion.p>
            )}
          </div>

          {loading ? (
            <div className="space-y-12 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="h-6 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-1/4" />
                  <div className="h-64 bg-surface-secondary dark:bg-dark-surface-tertiary rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {renderTable('teachers')}
              {renderTable('core')}
              {renderTable('general')}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
