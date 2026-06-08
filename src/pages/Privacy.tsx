import SEOHead from '@/components/SEOHead'

export default function Privacy() {
  return (
    <>
      <SEOHead title="Privacy Policy" description="Privacy Policy for RU Club Motherland website." url="https://ru.motherland.edu.np/privacy" />

      <div className="min-h-screen py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-6">Privacy Policy</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-text-secondary dark:text-dark-text-secondary">
              <p>Last updated: May 2026</p>
              <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8">Information We Collect</h2>
              <p>We use Google Analytics to collect anonymous usage data including page views, browser type, device type, and general location. This helps us understand how our site is used and improve it.</p>
              <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8">Cookies</h2>
              <p>We use minimal cookies required for Google Analytics to function. You can opt out of analytics cookies at any time using the cookie consent banner.</p>
              <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8">Contact Forms</h2>
              <p>When you submit a contact form, we collect your name, email, and message to respond to your inquiry. This data is stored securely and not shared with third parties.</p>
              <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8">Data Sharing</h2>
              <p>We do not sell, trade, or share your personal data with third parties except as required by law or with your explicit consent.</p>
              <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8">Contact</h2>
              <p>For privacy concerns, email us at ruclubmotherland@gmail.com.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
