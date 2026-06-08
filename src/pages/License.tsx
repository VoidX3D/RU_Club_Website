import { Link } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'ownership', title: 'Content Ownership' },
  { id: 'usage', title: 'Usage Terms' },
  { id: 'partners', title: 'Partner Content' },
  { id: 'open-source', title: 'Open Source Components' },
  { id: 'disclaimer', title: 'Disclaimer' },
  { id: 'contact', title: 'Contact' },
]

export default function License() {
  return (
    <>
      <SEOHead
        title="License"
        description="License and usage terms for RU Club Motherland website content, images, and materials."
        url="https://ruclubmss.vercel.app/license"
      />

      <div className="min-h-screen py-20">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-text-muted dark:text-dark-text-muted mb-2">
              <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text-secondary dark:text-dark-text-secondary">License</span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary">License</h1>
                <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">Copyright &copy; {new Date().getFullYear()} RU Club Motherland</p>
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

                  <section id="overview">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Overview
                    </h2>
                    <p>
                      All content, images, designs, and materials on this website are the property of <strong className="text-text-primary dark:text-dark-text-primary">RU Club Motherland</strong> unless otherwise credited. This website is maintained by the students and staff of Motherland Secondary School, Pokhara, Nepal.
                    </p>
                    <div className="bg-surface-secondary dark:bg-dark-surface-tertiary rounded-xl p-4 my-6">
                      <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">&copy; {new Date().getFullYear()} RU Club Motherland. All rights reserved.</p>
                    </div>
                  </section>

                  <section id="ownership">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Content Ownership
                    </h2>
                    <p>The following content is owned exclusively by RU Club Motherland:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Mission descriptions, stories, and documentation</li>
                      <li>Photographs and images taken during club activities</li>
                      <li>Club member information and profiles</li>
                      <li>Brand assets including logos, color schemes, and design elements</li>
                      <li>Written content including announcements, reports, and documentation</li>
                    </ul>
                  </section>

                  <section id="usage">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Usage Terms
                    </h2>
                    <p>Unless otherwise stated, you may not:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Reproduce, distribute, or publicly display our content without prior written permission</li>
                      <li>Use our images, logos, or brand assets for commercial purposes</li>
                      <li>Modify or create derivative works based on our content</li>
                      <li>Remove or alter copyright notices or attributions</li>
                    </ul>
                    <p>You <strong className="text-text-primary dark:text-dark-text-primary">may</strong> share links to our website and quote brief excerpts with proper attribution.</p>
                  </section>

                  <section id="partners">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Partner Content
                    </h2>
                    <p>Partner logos, names, and materials displayed on this website are used with permission from their respective organizations. These remain the property of their respective owners:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Doko Recyclers</li>
                      <li>Pokhara Metropolitan City</li>
                      <li>Government of Nepal</li>
                      <li>KOICA (Korea International Cooperation Agency)</li>
                      <li>Chillionaire Productions</li>
                    </ul>
                  </section>

                  <section id="open-source">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Open Source Components
                    </h2>
                    <p>This website is built using open-source technologies. The source code for the website framework is available for educational reference. However, this license does not grant permission to use the club's content, branding, or images.</p>
                    <p>Open-source libraries used include React, Vite, Tailwind CSS, Framer Motion, Supabase, and others as listed in our package dependencies.</p>
                  </section>

                  <section id="disclaimer">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Disclaimer
                    </h2>
                    <p>The information on this website is provided for informational purposes only. While we strive to keep content accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information.</p>
                    <p>RU Club Motherland shall not be liable for any loss or damage arising from the use of this website.</p>
                  </section>

                  <section id="contact">
                    <h2 className="text-xl font-display font-semibold text-text-primary dark:text-dark-text-primary mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      Contact
                    </h2>
                    <p>For licensing inquiries, permissions, or attribution requests, please contact us:</p>
                    <div className="bg-surface-secondary dark:bg-dark-surface-tertiary rounded-xl p-4 my-6">
                      <p className="text-sm">
                        <strong className="text-text-primary dark:text-dark-text-primary">Email:</strong>{' '}
                        <a href="mailto:ruclubmotherland@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">ruclubmotherland@gmail.com</a>
                      </p>
                      <p className="text-sm mt-1">
                        <strong className="text-text-primary dark:text-dark-text-primary">School:</strong>{' '}
                        <span className="text-text-secondary dark:text-dark-text-secondary">Motherland Secondary School, Pokhara, Nepal</span>
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
