import { useState, useEffect } from 'react'
import { grantConsent, denyConsent } from '@/lib/analytics'
import { useSiteConfig } from '@/hooks/useSiteConfig'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const config = useSiteConfig()

  const cookieConfig = config?.cookie || { title: 'We value your privacy', text: 'This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared.' }

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  const handleAccept = () => {
    grantConsent()
    setVisible(false)
  }

  const handleDecline = () => {
    denyConsent()
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up">
      <div className="max-w-2xl mx-auto bg-white dark:bg-dark-surface-secondary border border-border dark:border-dark-border rounded-2xl shadow-2xl p-6">
        <div className="flex items-start gap-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600 shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
          </svg>
          <div>
            <h3 className="font-display font-semibold text-text-primary dark:text-dark-text-primary">
              {cookieConfig.title}
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1 leading-relaxed">
              {cookieConfig.text}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
