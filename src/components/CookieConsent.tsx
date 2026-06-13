import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { grantConsent, denyConsent } from '@/lib/analytics'
import { useSiteConfig } from '@/hooks/useSiteConfig'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const config = useSiteConfig()

  const cookieTitle = config?.cookieTitle || 'We value your privacy'
  const cookieText = config?.cookieText || 'We use Google Analytics cookies to understand how you use our site. No personal data is sold or shared.'

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  const handleAccept = () => { grantConsent(); setVisible(false) }
  const handleDecline = () => { denyConsent(); setVisible(false) }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleDecline} />
      <div className="relative w-full sm:max-w-lg animate-fade-up bg-gradient-to-br from-white via-white to-brand-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-brand-950/30 border-t sm:border border-gray-200/80 dark:border-gray-800/80 rounded-none sm:rounded-2xl shadow-2xl shadow-brand-900/20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-500" />
        <div className="relative p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/25">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v1H7a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4h-2V5a3 3 0 0 0-3-3z"/><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M12 15h.01"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{cookieTitle}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                {cookieText}
              </p>
              {showDetails && (
                <div className="mt-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 space-y-1.5 leading-relaxed">
                  <p>Google Analytics (GA4) cookies collect anonymous data about page visits, time spent, and interactions. No personal data is collected, sold, or shared with third parties.</p>
                  <p>You can change your preference anytime via our <Link to="/consent" className="text-brand-700 dark:text-brand-400 hover:underline font-medium" onClick={() => setVisible(false)}>Cookie Policy page</Link>.</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
            <button onClick={() => setShowDetails(!showDetails)}
              className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center gap-1">
              {showDetails ? 'Less info' : 'More info'}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform ${showDetails ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="flex gap-2">
              <button onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-[0.97]">
                Decline
              </button>
              <button onClick={handleAccept}
                className="px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-brand-600 to-emerald-600 text-white hover:from-brand-700 hover:to-emerald-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-600/25 hover:shadow-brand-600/35">
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
