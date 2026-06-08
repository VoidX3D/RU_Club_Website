import { Link } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'
import { useSiteConfig } from '@/hooks/useSiteConfig'

const sections = [
  { id: 'information', title: 'Information We Collect' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'contact-forms', title: 'Contact Forms' },
  { id: 'data-sharing', title: 'Data Sharing & Disclosure' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'children', title: 'Children\'s Privacy' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
]

export default function Privacy() {
  const config = useSiteConfig()

  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Privacy Policy for RU Club Motherland website. Learn how we collect, use, and protect your personal data."
        url="https://ru.motherland.edu.np/privacy"
      />

      <div className="min-h-screen py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-text-muted dark:text-dark-text-muted mb-2">
              <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text-secondary dark:text-dark-text-secondary">Privacy Policy</span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">Privacy Policy</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-text-muted dark:text-dark-text-muted">Last updated: May 2026</span>
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  <span className="text-sm text-text-muted dark:text-dark-text-muted">v1.0</span>
                </div>
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
                    RU Club Motherland ("we," "our," or "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website.
                  </p>

                  <hr className="border-border dark:border-dark-border my-8" />

                  <section id="information">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Information We Collect
                    </h2>
                    <p>We collect minimal information to operate and improve our website:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Analytics Data:</strong> Anonymous usage data including page views, browser type, device type, and general location via Google Analytics.</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Contact Form Data:</strong> When you submit a contact form, we collect your name, email address, and message to respond to your inquiry.</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Technical Data:</strong> IP address, browser user agent, and referring URLs are automatically collected for analytics purposes.</li>
                    </ul>
                  </section>

                  <section id="cookies">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Cookies & Tracking
                    </h2>
                    <p>We use minimal cookies required for Google Analytics to function. These cookies help us understand how visitors interact with our website so we can improve content and user experience.</p>
                    <p>You can opt out of analytics cookies at any time using the cookie consent banner. You may also configure your browser to refuse cookies, though this may affect site functionality.</p>
                    <div className="bg-surface-secondary dark:bg-dark-surface-tertiary rounded-xl p-4 my-6">
                      <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">Cookie Preferences</p>
                      <p className="text-sm">Manage your cookie preferences through our <Link to="/consent" className="text-brand-600 dark:text-brand-400 hover:underline">Cookie Consent page</Link>.</p>
                    </div>
                  </section>

                  <section id="contact-forms">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Contact Forms
                    </h2>
                    <p>When you submit a contact form on our website, we collect your name, email address, and message. This data is stored securely in our database and used solely to respond to your inquiry.</p>
                    <p>We do not use contact form submissions for marketing purposes. Your information is retained only as long as necessary to address your query and comply with legal obligations.</p>
                  </section>

                  <section id="data-sharing">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Data Sharing & Disclosure
                    </h2>
                    <p>We do not sell, trade, or rent your personal data to third parties. We may share data only in the following circumstances:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Service Providers:</strong> We use Google Analytics and Formspree as data processors for analytics and contact form delivery.</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Legal Requirements:</strong> We may disclose information if required to do so by law or in response to valid legal requests.</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Consent:</strong> We may share data with your explicit consent.</li>
                    </ul>
                  </section>

                  <section id="data-security">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Data Security
                    </h2>
                    <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our hosting infrastructure uses encryption in transit (TLS) and follows industry security best practices.</p>
                  </section>

                  <section id="third-party">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Third-Party Services
                    </h2>
                    <p>Our website integrates with the following third-party services:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Google Analytics (GA4):</strong> Tracks anonymous usage data. View <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Google's Privacy Policy</a>.</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Supabase:</strong> Hosts our database. View <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Supabase's Privacy Policy</a>.</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Vercel:</strong> Hosts our website. View <a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Vercel's Privacy Policy</a>.</li>
                      <li><strong className="text-text-primary dark:text-dark-text-primary">Formspree:</strong> Processes contact form submissions. View <a href="https://formspree.io/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Formspree's Privacy Policy</a>.</li>
                    </ul>
                  </section>

                  <section id="children">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Children's Privacy
                    </h2>
                    <p>Our website is used by students, staff, and community members of Motherland Secondary School. We do not knowingly collect personal information from children under 13 without parental consent. If you believe a child has provided us with personal data, please contact us immediately.</p>
                  </section>

                  <section id="changes">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Changes to This Policy
                    </h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.</p>
                    <div className="bg-surface-secondary dark:bg-dark-surface-tertiary rounded-xl p-4 my-6">
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        <strong className="text-text-primary dark:text-dark-text-primary">Previous versions:</strong> v1.0 (May 2026) — Initial policy
                      </p>
                    </div>
                  </section>

                  <section id="contact">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Contact Us
                    </h2>
                    <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
                    <div className="bg-surface-secondary dark:bg-dark-surface-tertiary rounded-xl p-5 my-6 space-y-2">
                      {config.email && (
                        <div className="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          <a href={`mailto:${config.email}`} className="text-sm text-brand-600 dark:text-brand-400 hover:underline">{config.email}</a>
                        </div>
                      )}
                      {config.school && (
                        <div className="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{config.school}, {config.city}, {config.country}</span>
                        </div>
                      )}
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
