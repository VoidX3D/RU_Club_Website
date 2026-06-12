import { Link } from 'react-router-dom'
import { useSiteConfig } from '@/hooks/useSiteConfig'
import { useDBStatus } from '@/hooks/useDBStatus'
import { motion } from 'framer-motion'

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  instagram: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  github: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  email: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  youtube: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  globe: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
}

const statusConfig: Record<string, { dot: string; label: string }> = {
  checking: { dot: 'bg-yellow-400', label: 'DB: Checking…' },
  online: { dot: 'bg-green-400', label: 'DB: Online' },
  offline: { dot: 'bg-red-400', label: 'DB: Offline' },
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const config = useSiteConfig()
  const dbStatus = useDBStatus()
  const s = statusConfig[dbStatus]

  const quickLinks = config?.footerLinks?.filter(l => l.section === 'quick') || []
  const legalLinks = config?.footerLinks?.filter(l => l.section === 'legal') || []

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  } as const
  const childVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  } as const

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className="border-t border-border dark:border-dark-border bg-surface-secondary dark:bg-dark-surface-secondary"
    >
      <div className="w-full px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          <motion.div variants={childVariants} className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-4 mb-5">
              <img
                src={config?.logoIcon || '/static/assets/brand/logo_icon.png'}
                alt={config?.shortName || 'RU Club'}
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="font-display font-semibold text-xl text-text-primary dark:text-dark-text-primary block">
                  {config?.name || 'RU Club Motherland'}
                </span>
                <span className="text-sm text-text-muted dark:text-dark-text-muted">
                  {config?.tagline || 'Environmental Sustainability Club'}
                </span>
              </div>
            </Link>
            <p className="text-base md:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-xl">
              {config?.description || 'Environmental sustainability club at Motherland Secondary School, Pokhara, Nepal.'}
            </p>
            <div className="flex gap-4 mt-6">
              {config?.socialLinks?.map((link) => {
                const isEmail = link.platform === 'email'
                const isGithub = link.platform === 'github'
                const href = isEmail ? `mailto:${link.url}` : link.url
                const label = isGithub ? 'Changelog' : link.platform.charAt(0).toUpperCase() + link.platform.slice(1)
                const Icon = socialIcons[link.platform as keyof typeof socialIcons]
                if (!Icon) return null
                const cls = "w-11 h-11 rounded-xl bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center text-text-secondary dark:text-dark-text-secondary hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                return isGithub ? (
                  <Link key={link.platform} to="/changelog" className={cls} aria-label={label}>
                    {Icon}
                  </Link>
                ) : (
                  <a key={link.platform} href={href} {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className={cls} aria-label={label}>
                    {Icon}
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={childVariants}>
            <h3 className="font-display font-semibold text-base text-text-primary dark:text-dark-text-primary mb-5 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-lg text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-base md:text-lg text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={childVariants}>
            <h3 className="font-display font-semibold text-base text-text-primary dark:text-dark-text-primary mb-5 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base md:text-lg text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-display font-semibold text-base text-text-primary dark:text-dark-text-primary mt-10 mb-5 uppercase tracking-wider">
              Contact
            </h3>
            <div className="text-base md:text-lg text-text-secondary dark:text-dark-text-secondary space-y-2">
              <p>{config?.school}</p>
              <p>{config?.city} - {config?.ward}, {config?.district}</p>
              <p>{config?.province}, {config?.country}</p>
              {config?.email && (
                <a
                  href={`mailto:${config.email}`}
                  className="block mt-3 text-brand-600 dark:text-brand-400 hover:underline font-medium"
                >
                  {config.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="border-t border-border dark:border-dark-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-text-muted dark:text-dark-text-muted text-center sm:text-left">
            &copy; {config?.copyright || currentYear} {config?.name || 'RU Club Motherland'}. Managed by {config?.managedBy || 'Motherland Secondary School'}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-text-muted dark:text-dark-text-muted" title={s.label}>
              <span className={`inline-block w-2 h-2 rounded-full ${s.dot} ${dbStatus === 'checking' ? 'animate-pulse' : ''}`} />
              {s.label}
            </span>
            <p className="text-sm text-text-muted dark:text-dark-text-muted">
              Made with care by <Link to="/secret-garden" className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-semibold">{config?.madeBy || 'Sincere Bhattarai'}</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
