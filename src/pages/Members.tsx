import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSiteData } from '@/hooks/useSiteData'
import { getMembers } from '@/lib/supabase'
import SEOHead from '@/components/SEOHead'
import type { MembersData, Member } from '@/types'

const typeMap: Record<string, { label: string; title: string; headers: string[] }> = {
  teachers: { label: 'Leadership', title: 'Teachers & Advisors', headers: ['#', 'Name', 'Position'] },
  core: { label: 'Team', title: 'Core Members', headers: ['#', 'Name', 'Class', 'Role'] },
  general: { label: 'Membership', title: 'General Members', headers: ['#', 'Name', 'Class', 'Role'] },
}

const roleStyles: Record<string, string> = {
  patron: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  advisor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  coord: 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300',
  member: 'bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary',
}

export default function Members() {
  const { data: members, loading, error } = useSiteData<MembersData>(getMembers)

  const renderTable = (group: 'teachers' | 'core' | 'general') => {
    if (!members || !members[group]) return null
    const cfg = typeMap[group]
    const hasClass = cfg.headers.includes('Class')
    const items = members[group]

    return (
      <motion.div key={group} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 last:mb-0">
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
                    <th key={h} className={`text-left text-[10px] font-bold text-text-muted dark:text-dark-text-muted uppercase tracking-wider px-3 py-2.5 ${h === '#' ? 'w-10' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-dark-border">
                {items.map((member: Member, i: number) => {
                  const isDev = member.name === 'Sincere Bhattarai'
                  return (
                    <tr key={member.name} className="hover:bg-surface-secondary dark:hover:bg-dark-surface-tertiary transition-colors">
                      <td className="px-3 py-2.5"><span className="text-xs text-text-muted dark:text-dark-text-muted font-mono">{String(i + 1).padStart(2, '0')}</span></td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full object-cover bg-surface-tertiary dark:bg-dark-surface-tertiary shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{member.name.charAt(0)}</span>
                            </div>
                          )}
                          {isDev ? (
                            <Link to="/secret-garden" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">{member.name}</Link>
                          ) : (
                            <span className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{member.name}</span>
                          )}
                        </div>
                      </td>
                      {hasClass && <td className="px-3 py-2.5"><span className="text-xs text-text-secondary dark:text-dark-text-secondary">{member.class || '-'}</span></td>}
                      <td className="px-3 py-2.5">
                        {isDev ? (
                          <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">Developer &amp; Event Lead</span>
                        ) : (
                          <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleStyles[member.memberType] || roleStyles.member}`}>{member.role}</span>
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
      <SEOHead title="Members" description="Meet the members of RU Club Motherland — teachers, core team, and general members." />
      <section className="py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase">Our Team</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Meet the Members</motion.h1>
            {members?.stats && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto"
              >
                {[
                  { label: 'Total', value: members.stats.total, icon: 'users', color: 'text-brand-600 dark:text-brand-400' },
                  { label: 'Teachers', value: members.stats.teachers, icon: 'graduation', color: 'text-purple-600 dark:text-purple-400' },
                  { label: 'Core', value: members.stats.core, icon: 'star', color: 'text-amber-600 dark:text-amber-400' },
                  { label: 'General', value: members.stats.general, icon: 'team', color: 'text-emerald-600 dark:text-emerald-400' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-surface-secondary dark:bg-dark-surface-tertiary rounded-xl p-4 text-center border border-border dark:border-dark-border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${stat.color} mx-auto mb-1.5`}>
                      {stat.icon === 'users' ? <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> : null}
                      {stat.icon === 'graduation' ? <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></> : null}
                      {stat.icon === 'star' ? <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></> : null}
                      {stat.icon === 'team' ? <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> : null}
                    </svg>
                    <div className={`text-xl sm:text-2xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] text-text-muted dark:text-dark-text-muted uppercase tracking-widest mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {error && (
            <div className="max-w-6xl mx-auto text-center py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-12 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="h-6 bg-surface-secondary dark:bg-dark-surface-tertiary rounded w-1/4" />
                  <div className="h-64 bg-surface-secondary dark:bg-dark-surface-tertiary rounded-2xl" />
                </div>
              ))}
            </div>
          ) : !members ? (
            <div className="max-w-6xl mx-auto text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted dark:text-dark-text-muted"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <p className="text-text-muted dark:text-dark-text-muted text-lg font-medium">No members loaded</p>
              <p className="text-text-muted dark:text-dark-text-muted text-sm mt-1">Check database connection.</p>
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
