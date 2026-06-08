import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Missions', href: '/missions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Members', href: '/members' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/consent' },
  { label: 'License', href: '/license' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border dark:border-dark-border bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/static/assets/brand/logo_icon.png"
                alt="RU Club"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary block">
                  RU Club Motherland
                </span>
                <span className="text-xs text-text-muted dark:text-dark-text-muted">
                  Environmental Sustainability Club
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-md">
              Transforming environmental awareness into action. Leading the community toward a zero-waste ecosystem through tree plantation, waste management, and education.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://facebook.com/profile.php?id=61585206314774"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center text-text-secondary dark:text-dark-text-secondary hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://instagram.com/rucl.ub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center text-text-secondary dark:text-dark-text-secondary hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="mailto:ruclubmotherland@gmail.com"
                className="w-9 h-9 rounded-xl bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center text-text-secondary dark:text-dark-text-secondary hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-display font-semibold text-sm text-text-primary dark:text-dark-text-primary mt-8 mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <div className="text-sm text-text-secondary dark:text-dark-text-secondary space-y-1.5">
              <p>Motherland Secondary School</p>
              <p>Pokhara Metropolitan City - 7, Kaski</p>
              <p>Gandaki Province, Nepal</p>
              <a
                href="mailto:ruclubmotherland@gmail.com"
                className="block mt-2 text-brand-600 dark:text-brand-400 hover:underline"
              >
                ruclubmotherland@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border dark:border-dark-border mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted dark:text-dark-text-muted text-center sm:text-left">
            &copy; {currentYear} RU Club Motherland. Managed by Motherland Secondary School. All rights reserved.
          </p>
          <p className="text-xs text-text-muted dark:text-dark-text-muted">
            Made with care by <Link to="/secret-garden" className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Sincere Bhattarai</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
