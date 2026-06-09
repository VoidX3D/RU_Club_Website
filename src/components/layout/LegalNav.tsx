import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useSiteConfig } from '@/hooks/useSiteConfig'

interface LegalPage {
  label: string
  href: string
  icon: string
}

const pages: LegalPage[] = [
  { label: 'Privacy Policy', href: '/privacy', icon: 'shield' },
  { label: 'Cookie Policy', href: '/consent', icon: 'cookie' },
  { label: 'License', href: '/license', icon: 'license' },
]

export default function LegalNav() {
  const location = useLocation()
  const config = useSiteConfig()

  return (
    <aside className="lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-24 space-y-6">
        <div>
          <Link to="/" className="flex items-center gap-2 text-sm text-text-muted dark:text-dark-text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Back to {config?.shortName || 'Home'}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-3">Legal</p>
          <nav className="space-y-1">
            {pages.map((page) => {
              const isActive = location.pathname === page.href
              return (
                <Link
                  key={page.href}
                  to={page.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary hover:text-text-primary dark:hover:text-dark-text-primary'
                  )}
                >
                  {page.icon === 'shield' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  )}
                  {page.icon === 'cookie' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  )}
                  {page.icon === 'license' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  )}
                  <span>{page.label}</span>
                  {isActive && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
