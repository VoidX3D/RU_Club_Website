import SEOHead from '@/components/SEOHead'
import { useSiteConfig } from '@/hooks/useSiteConfig'

const sections = [
  { id: 'information', title: 'Information We Collect' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'contact-forms', title: 'Contact Forms' },
  { id: 'data-sharing', title: 'Data Sharing & Disclosure' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'children', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
]

export default function Privacy() {
  const config = useSiteConfig()

  return (
    <>
      <SEOHead title="Privacy Policy" description="RU Club Motherland's privacy policy — how we collect, use, and safeguard your personal information through Google Analytics and contact forms." keywords="RU Club privacy policy, Motherland Secondary School data privacy, cookie policy Nepal, environmental club privacy, personal data protection school" />
      <h1 className="!text-4xl sm:!text-5xl !font-display !font-bold !mb-2">Privacy Policy</h1>
      <p className="!text-sm !text-text-muted dark:!text-dark-text-muted !mt-0 !mb-8">
        Last updated: May 2026 &middot; v1.0
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

      <p>RU Club Motherland ("we," "our," or "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website.</p>

      <hr />

      <section id="information">
        <h2>Information We Collect</h2>
        <p>We collect minimal information to operate and improve our website:</p>
        <ul>
          <li><strong>Analytics Data:</strong> Anonymous usage data including page views, browser type, device type, and general location via Google Analytics.</li>
          <li><strong>Contact Form Data:</strong> When you submit a contact form, we collect your name, email address, and message to respond to your inquiry.</li>
          <li><strong>Technical Data:</strong> IP address, browser user agent, and referring URLs are automatically collected for analytics purposes.</li>
        </ul>
      </section>

      <section id="cookies">
        <h2>Cookies &amp; Tracking</h2>
        <p>We use minimal cookies required for Google Analytics to function. These cookies help us understand how visitors interact with our website so we can improve content and user experience.</p>
        <p>You can opt out of analytics cookies at any time using the cookie consent banner. You may also configure your browser to refuse cookies, though this may affect site functionality.</p>
      </section>

      <section id="contact-forms">
        <h2>Contact Forms</h2>
        <p>When you submit a contact form on our website, we collect your name, email address, and message. This data is stored securely in our database and used solely to respond to your inquiry.</p>
        <p>We do not use contact form submissions for marketing purposes. Your information is retained only as long as necessary to address your query.</p>
      </section>

      <section id="data-sharing">
        <h2>Data Sharing &amp; Disclosure</h2>
        <p>We do not sell, trade, or rent your personal data to third parties. We may share data only in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> We use Google Analytics and Formspree as data processors.</li>
          <li><strong>Legal Requirements:</strong> We may disclose information if required to do so by law.</li>
          <li><strong>Consent:</strong> We may share data with your explicit consent.</li>
        </ul>
      </section>

      <section id="data-security">
        <h2>Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our hosting infrastructure uses encryption in transit (TLS) and follows industry security best practices.</p>
      </section>

      <section id="third-party">
        <h2>Third-Party Services</h2>
        <p>Our website integrates with the following third-party services:</p>
        <ul>
          <li><strong>Google Analytics (GA4):</strong> Tracks anonymous usage data. View <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
          <li><strong>Supabase:</strong> Hosts our database. View <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase's Privacy Policy</a>.</li>
          <li><strong>Vercel:</strong> Hosts our website. View <a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</a>.</li>
          <li><strong>Formspree:</strong> Processes contact form submissions. View <a href="https://formspree.io/privacy" target="_blank" rel="noopener noreferrer">Formspree's Privacy Policy</a>.</li>
        </ul>
      </section>

      <section id="children">
        <h2>Children's Privacy</h2>
        <p>Our website is used by students, staff, and community members of Motherland Secondary School. We do not knowingly collect personal information from children under 13 without parental consent.</p>
      </section>

      <section id="changes">
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.</p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
        <div className="!rounded-xl !bg-surface-secondary dark:!bg-dark-surface-tertiary !p-5 !my-6 !space-y-2 !not-prose">
          {config.email && (
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-700 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href={`mailto:${config.email}`} className="text-brand-700 dark:text-brand-400 hover:underline">{config.email}</a>
            </div>
          )}
          {config.school && (
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-700 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-text-secondary dark:text-dark-text-secondary">{config.school}, {config.city}, {config.country}</span>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
