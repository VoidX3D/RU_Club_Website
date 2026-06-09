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

export default function Consent() {
  return (
    <>
      <SEOHead title="Cookie Policy" description="Cookie policy for RU Club Motherland — learn about our use of Google Analytics cookies and manage your preferences." />
      <h1 className="!text-4xl sm:!text-5xl !font-display !font-bold !mb-2">Cookie Policy</h1>
      <p className="!text-sm !text-text-muted dark:!text-dark-text-muted !mt-0 !mb-8">
        Manage your cookie preferences
      </p>

      <div className="lg:hidden !mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-3">On this page</p>
        <div className="flex flex-wrap gap-2">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className="text-sm px-3 py-1.5 rounded-lg bg-surface-secondary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary hover:text-brand-600 transition-colors">
              {s.title}
            </a>
          ))}
        </div>
      </div>

      <p>This Cookie Policy explains what cookies are, how we use them on the RU Club Motherland website, and how you can control your preferences.</p>

      <hr />

      <section id="what">
        <h2>What Are Cookies</h2>
        <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, analyze how you use the site, and improve your overall experience.</p>
        <p>Cookies can be "persistent" (remain on your device for a set period) or "session" (deleted when you close your browser).</p>
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
      </section>

      <section id="choices">
        <h2>Your Choices</h2>
        <p>You have full control over cookie consent. Use the buttons below to accept or decline analytics cookies. Your preference will be saved for future visits.</p>
        <div className="!not-prose flex flex-wrap gap-4 my-6">
          <button onClick={() => { grantConsent(); alert('Cookies accepted. Analytics tracking has been enabled.') }}
            className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-600/25">Accept Cookies</button>
          <button onClick={() => { denyConsent(); alert('Cookies declined. Analytics tracking has been disabled.') }}
            className="px-6 py-3 rounded-xl border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary font-semibold hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-all">Decline Cookies</button>
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
          <p className="!text-sm"><strong>Email:</strong> <a href="mailto:ruclubmotherland@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">ruclubmotherland@gmail.com</a></p>
          <p className="!text-sm !mt-1"><strong>More information:</strong> <Link to="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline">View our Privacy Policy</Link></p>
        </div>
      </section>
    </>
  )
}
