import SEOHead from '@/components/SEOHead'
import { grantConsent, denyConsent } from '@/lib/analytics'

export default function Consent() {
  return (
    <>
      <SEOHead title="Cookie Policy" description="Cookie consent policy for RU Club Motherland." url="https://ru.motherland.edu.np/consent" />

      <div className="min-h-screen py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-6">Cookie Policy</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-text-secondary dark:text-dark-text-secondary">
              <p>We use cookies from Google Analytics to understand how visitors interact with our website. This helps us improve our content and user experience.</p>
              <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8">Your Choices</h2>
              <p>You can accept or decline cookies using the buttons below. You can also change your preference at any time by clearing your browser cookies.</p>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => { grantConsent(); alert('Cookies accepted.') }}
                  className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-all"
                >
                  Accept Cookies
                </button>
                <button
                  onClick={() => { denyConsent(); alert('Cookies declined.') }}
                  className="px-6 py-3 rounded-xl border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary font-semibold hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-all"
                >
                  Decline Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
