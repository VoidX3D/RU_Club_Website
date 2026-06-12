import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useSiteConfig } from '@/hooks/useSiteConfig'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const config = useSiteConfig()

  const navItems = config?.navItems || []

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border dark:border-dark-border bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl">
      <div className="flex items-center justify-between h-[70px] md:h-[100px] px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={config?.logoIcon || '/static/assets/brand/logo_icon.png'}
            alt={config?.shortName || 'RU Club'}
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg md:text-xl text-text-primary dark:text-dark-text-primary leading-tight tracking-wide">
              {config?.shortName?.toUpperCase() || 'RU CLUB'}
            </span>
            <span className="text-xs md:text-sm font-semibold text-brand-600 dark:text-brand-400 tracking-widest uppercase">
              {config?.name?.replace('RU Club ', '') || 'Motherland'}
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'text-base font-semibold transition-colors relative py-1 tracking-wide',
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {config?.github && (
            <Link
              to="/changelog"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface-secondary dark:bg-dark-surface-tertiary flex items-center justify-center text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              aria-label="Changelog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
              </svg>
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface-secondary dark:bg-dark-surface-tertiary flex items-center justify-center text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold uppercase tracking-wider hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-600/25"
          >
            Join Us
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-full md:hidden text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border dark:border-dark-border bg-white dark:bg-dark-surface shadow-lg animate-slide-down">
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className={cn(
                  'block px-4 py-3.5 rounded-xl text-base font-medium transition-colors',
                  location.pathname === item.href
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                    : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-4 py-3 rounded-full bg-brand-600 text-white text-center font-semibold"
            >
              Join Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
