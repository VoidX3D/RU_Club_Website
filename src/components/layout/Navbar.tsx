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

  const navItems = config?.nav || []

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border dark:border-dark-border bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl">
      <div className="flex items-center justify-between h-[70px] md:h-[100px] px-4 sm:px-6 md:px-8">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={config?.logoIcon ? `${config.logoIcon.startsWith('http') ? '' : ''}${config.logoIcon.startsWith('http') ? config.logoIcon : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/ruclub${config.logoIcon}`}` : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/ruclub/static/assets/brand/logo_icon.png`}
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

        <nav className="hidden md:flex items-center gap-8 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'text-sm font-medium transition-colors relative py-1',
                location.pathname === item.href
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
              )}
            >
              {item.label}
              {location.pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {config?.github && (
            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface-secondary dark:bg-dark-surface-tertiary flex items-center justify-center text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
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
