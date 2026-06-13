import { useState } from 'react'
import SEOHead from '@/components/SEOHead'
import { grantConsent, denyConsent } from '@/lib/analytics'
import { Link } from 'react-router-dom'

const sections = [
  { id: 'what', title: 'What Are Cookies' },
  { id: 'how', title: 'How We Use Cookies' },
  { id: 'choices', title: 'Your Choices' },
  { id: 'manage', title: 'How to Manage Cookies' },
  { id: 'contact', title: 'Contact' },
]

type ConsentStatus = 'accepted' | 'declined' | null

export default function Consent() {
  const [status, setStatus] = useState<ConsentStatus>(() => {
    const stored = localStorage.getItem('cookie-consent')
    return stored === 'accepted' || stored === 'declined' ? stored : null
  })
  const [animating, setAnimating] = useState<'accept' | 'decline' | null>(null)

  const handleAccept = () => {
    setAnimating('accept')
    grantConsent()
    setStatus('accepted')
    setTimeout(() => setAnimating(null), 800)
  }

  const handleDecline = () => {
    setAnimating('decline')
    denyConsent()
    setStatus('declined')
    setTimeout(() => setAnimating(null), 800)
  }

  return (
    <>
      <SEOHead title="Cookie Policy" description="Cookie policy for RU Club Motherland — learn about our use of Google Analytics cookies and manage your consent preferences for a better browsing experience." keywords="RU Club cookie policy, Google Analytics consent Nepal, cookie preferences school website, environmental club privacy, website cookie settings" />
      <h1 className="!text-4xl sm:!text-5xl !font-display !font-bold !mb-2">Cookie Policy</h1>
      <p className="!text-sm !text-text-muted dark:!text-dark-text-muted !mt-0 !mb-8">
        Manage your cookie preferences
      </p>

      <div className="lg:hidden !mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-3">On this page</p>
        <div className="flex flex-wrap gap-2">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className="text-sm px-3 py-1.5 rounded-lg bg-surface-secondary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary hover:text-brand-700 transition-colors">
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {status && (
        <div className={`!not-prose !mb-8 !rounded-2xl !p-5 flex items-start gap-4 border ${
          status === 'accepted'
            ? '!bg-emerald-50 dark:!bg-emerald-950/20 !border-emerald-200 dark:!border-emerald-900'
            : '!bg-zinc-50 dark:!bg-zinc-900/30 !border-zinc-200 dark:!border-zinc-800'
        }`}>
          <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            status === 'accepted' ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-zinc-200 dark:bg-zinc-800'
          }`}>
            {status === 'accepted' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 dark:text-emerald-400"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary">
              {status === 'accepted' ? 'Analytics Cookies Accepted' : 'Analytics Cookies Declined'}
            </p>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
              {status === 'accepted'
                ? 'Google Analytics is tracking page views, scroll depth, and outbound links to help us improve the site.'
                : 'No tracking cookies are active. You can change your preference at any time.'}
            </p>
            <button onClick={status === 'accepted' ? handleDecline : handleAccept}
              className="text-xs font-medium text-brand-700 dark:text-brand-400 hover:underline mt-1.5">
              {status === 'accepted' ? 'Revoke consent' : 'Accept analytics cookies'}
            </button>
          </div>
        </div>
      )}

      <p>This Cookie Policy explains what cookies are, how we use them on the RU Club Motherland website, and how you can control your preferences.</p>

      <hr />

      <section id="what">
        <h2>What Are Cookies</h2>
        <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, analyze how you use the site, and improve your overall experience.</p>
        <p>Cookies can be &ldquo;persistent&rdquo; (remain on your device for a set period) or &ldquo;session&rdquo; (deleted when you close your browser).</p>
      </section>

      <section id="how">
        <h2>How We Use Cookies</h2>
        <p>We use cookies from <strong>Google Analytics (GA4)</strong> to understand how visitors interact with our website. This helps us:</p>
        <ul>
          <li>Count visits and traffic sources</li>
          <li>Understand which pages and content are most popular</li>
          <li>Identify technical issues and improve site performance</li>
          <li>Make data-driven decisions to enhance user experience</li>
        </ul>
        <p>We do <strong>not</strong> use cookies for advertising, tracking across websites, or collecting personally identifiable information.</p>
        <div className="!not-prose !mt-6 !rounded-xl !bg-surface-secondary dark:!bg-dark-surface-tertiary !p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-2">Active Measurement IDs</p>
          <div className="space-y-1.5">
            {[
              { id: 'G-QC1WT8TF66', desc: 'Always active (core analytics)' },
              { id: 'G-HWFPCZ4W1Q', desc: 'Consent required' },
              { id: 'G-HJTLGVDNYK', desc: 'Consent required' },
            ].map(tag => (
              <div key={tag.id} className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  tag.desc === 'Always active (core analytics)' || status === 'accepted'
                    ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-600'
                }`} />
                <code className="text-xs !text-text-secondary dark:!text-dark-text-secondary !bg-transparent !p-0">{tag.id}</code>
                <span className="text-[10px] text-text-muted dark:text-dark-text-muted">{tag.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="choices">
        <h2>Your Choices</h2>
        <p>You have full control over cookie consent. Use the buttons below to accept or decline analytics cookies. Your preference will be saved for future visits.</p>
        <div className="!not-prose flex flex-wrap gap-4 my-6">
          <button onClick={handleAccept} disabled={animating !== null}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              status === 'accepted'
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 cursor-default'
                : 'bg-brand-700 text-white hover:bg-brand-800 hover:shadow-lg hover:shadow-brand-700/25'
            } ${animating === 'accept' ? 'scale-95 opacity-80' : ''} disabled:opacity-60 disabled:cursor-not-allowed`}>
            {status === 'accepted' ? 'Cookies Accepted' : 'Accept Cookies'}
          </button>
          <button onClick={handleDecline} disabled={animating !== null}
            className={`px-6 py-3 rounded-xl font-semibold transition-all border ${
              status === 'declined'
                ? 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 cursor-default'
                : 'border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary'
            } ${animating === 'decline' ? 'scale-95 opacity-80' : ''} disabled:opacity-60 disabled:cursor-not-allowed`}>
            {status === 'declined' ? 'Cookies Declined' : 'Decline Cookies'}
          </button>
        </div>
      </section>

      <section id="manage">
        <h2>How to Manage Cookies</h2>
        <p>You can manage or delete cookies through your browser settings:</p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
          <li><strong>Mozilla Firefox:</strong> Options → Privacy &amp; Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
          <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
        </ul>
        <p>If you clear your browser cookies, your consent preference will be reset.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>If you have questions about our use of cookies, please contact us:</p>
        <div className="!rounded-xl !bg-surface-secondary dark:!bg-dark-surface-tertiary !p-4 !my-6 !not-prose">
          <p className="!text-sm"><strong>Email:</strong> <a href="mailto:ruclubmotherland@gmail.com" className="text-brand-700 dark:text-brand-400 hover:underline">ruclubmotherland@gmail.com</a></p>
          <p className="!text-sm !mt-1"><strong>More information:</strong> <Link to="/privacy" className="text-brand-700 dark:text-brand-400 hover:underline">View our Privacy Policy</Link></p>
        </div>
      </section>
    </>
  )
}
