import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Missions', href: '/missions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Members', href: '/members' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border dark:border-dark-border bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-20 px-0 sm:px-0">
        <Link to="/" className="flex items-center gap-4 shrink-0 pl-4 sm:pl-6 lg:pl-8">
          <img
            src="/static/assets/brand/logo_icon.png"
            alt="RU Club"
            className="w-12 h-12 object-contain"
          />
          <div>
            <span className="font-display font-semibold text-xl text-text-primary dark:text-dark-text-primary whitespace-nowrap block leading-tight">
              RU Club Motherland
            </span>
            <span className="text-xs text-text-muted dark:text-dark-text-muted hidden sm:block">
              Environmental Sustainability Club
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'px-4 py-2.5 rounded-xl text-base font-medium transition-colors',
                location.pathname === item.href
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 pr-4 sm:pr-6 lg:pr-8">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-3 rounded-xl md:hidden text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          </nav>
        </div>
      )}
    </header>
  )
}
