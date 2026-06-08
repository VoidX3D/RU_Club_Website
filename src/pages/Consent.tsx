import { Link } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'
import { grantConsent, denyConsent } from '@/lib/analytics'

const sections = [
  { id: 'what', title: 'What Are Cookies' },
  { id: 'how', title: 'How We Use Cookies' },
  { id: 'choices', title: 'Your Choices' },
  { id: 'manage', title: 'How to Manage Cookies' },
  { id: 'contact', title: 'Contact' },
]

export default function Consent() {
  return (
    <>
      <SEOHead
        title="Cookie Policy"
        description="Cookie consent policy for RU Club Motherland. Learn how we use cookies and manage your preferences."
        url="https://ruclubmss.vercel.app/consent"
      />

      <div className="min-h-screen py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-text-muted dark:text-dark-text-muted mb-2">
              <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text-secondary dark:text-dark-text-secondary">Cookie Policy</span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Cookie Policy</h1>
                <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">Manage your cookie preferences</p>
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
              <nav className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-3">On this page</p>
                  <ul className="space-y-1.5">
                    {sections.map(s => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="block text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-0.5">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="min-w-0">
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-text-secondary dark:text-dark-text-secondary">
                  <p className="text-lg leading-relaxed">
                    This Cookie Policy explains what cookies are, how we use them on the RU Club Motherland website, and how you can control your preferences.
                  </p>

                  <hr className="border-border dark:border-dark-border my-8" />

                  <section id="what">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      What Are Cookies
                    </h2>
                    <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, analyze how you use the site, and improve your overall experience.</p>
                    <p>Cookies can be "persistent" (remain on your device for a set period) or "session" (deleted when you close your browser).</p>
                  </section>

                  <section id="how">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      How We Use Cookies
                    </h2>
                    <p>We use cookies from <strong className="text-text-primary dark:text-dark-text-primary">Google Analytics (GA4)</strong> to understand how visitors interact with our website. This helps us:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Count visits and traffic sources</li>
                      <li>Understand which pages and content are most popular</li>
                      <li>Identify technical issues and improve site performance</li>
                      <li>Make data-driven decisions to enhance user experience</li>
                    </ul>
                    <p>We do <strong className="text-text-primary dark:text-dark-text-primary">not</strong> use cookies for advertising, tracking across websites, or collecting personally identifiable information.</p>
                  </section>

                  <section id="choices">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Your Choices
                    </h2>
                    <p>You have full control over cookie consent. Use the buttons below to accept or decline analytics cookies. Your preference will be saved for future visits.</p>

                    <div className="flex flex-wrap gap-4 my-6">
                      <button
                        onClick={() => {
                          grantConsent()
                          alert('Thank you! Analytics cookies have been enabled. You can change this anytime by clearing your browser cookies.')
                        }}
                        className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-600/25"
                      >
                        Accept Cookies
                      </button>
                      <button
                        onClick={() => {
                          denyConsent()
                          alert('Cookies declined. Analytics tracking has been disabled for this browser.')
                        }}
                        className="px-6 py-3 rounded-xl border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary font-semibold hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-all"
                      >
                        Decline Cookies
                      </button>
                    </div>
                  </section>

                  <section id="manage">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      How to Manage Cookies
                    </h2>
                    <p>You can manage or delete cookies through your browser settings. Each browser has different controls:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
                    </ul>
                    <p>If you clear your browser cookies, your consent preference will be reset and you will be prompted again on your next visit.</p>
                  </section>

                  <section id="contact">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Contact
                    </h2>
                    <p>If you have questions about our use of cookies, please contact us:</p>
                    <div className="bg-surface-secondary dark:bg-dark-surface-tertiary rounded-xl p-4 my-6">
                      <p className="text-sm">
                        <strong className="text-text-primary dark:text-dark-text-primary">Email:</strong>{' '}
                        <a href="mailto:ruclubmotherland@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">ruclubmotherland@gmail.com</a>
                      </p>
                      <p className="text-sm mt-1">
                        <strong className="text-text-primary dark:text-dark-text-primary">More information:</strong>{' '}
                        <Link to="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline">View our Privacy Policy</Link>
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
