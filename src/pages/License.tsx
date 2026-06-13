import SEOHead from '@/components/SEOHead'
import { Link } from 'react-router-dom'

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'ownership', title: 'Content Ownership' },
  { id: 'usage', title: 'Usage Terms' },
  { id: 'mit', title: 'MIT License (Code)' },
  { id: 'partners', title: 'Partner Content' },
  { id: 'open-source', title: 'Open Source Components' },
  { id: 'disclaimer', title: 'Disclaimer' },
  { id: 'contact', title: 'Contact' },
]

export default function License() {
  return (
    <>
      <SEOHead title="License" description="License information for RU Club Motherland website content, code, and brand assets — MIT License for code, all rights reserved for content and branding." keywords="RU Club license, MIT License Nepal, open source school club, environmental club code license, Motherland Secondary School content license" />
      <h1 className="!text-4xl sm:!text-5xl !font-display !font-bold !mb-2">License</h1>
      <p className="!text-sm !text-text-muted dark:!text-dark-text-muted !mt-0 !mb-8">
        Copyright &copy; {new Date().getFullYear()} RU Club Motherland
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

      <section id="overview">
        <h2>Overview</h2>
        <p>All content, images, designs, and materials on this website are the property of <strong>RU Club Motherland</strong> unless otherwise credited. This website is maintained by the students and staff of Motherland Secondary School, Pokhara, Nepal.</p>
        <div className="!rounded-xl !bg-surface-secondary dark:!bg-dark-surface-tertiary !p-4 !my-6 !not-prose">
          <p className="!text-sm !font-medium !text-text-primary dark:!text-dark-text-primary">&copy; {new Date().getFullYear()} RU Club Motherland. All rights reserved.</p>
        </div>
      </section>

      <section id="ownership">
        <h2>Content Ownership</h2>
        <p>The following content is owned exclusively by RU Club Motherland:</p>
        <ul>
          <li>Mission descriptions, stories, and documentation</li>
          <li>Photographs and images taken during club activities</li>
          <li>Club member information and profiles</li>
          <li>Brand assets including logos, color schemes, and design elements</li>
          <li>Written content including announcements, reports, and documentation</li>
        </ul>
      </section>

      <section id="usage">
        <h2>Usage Terms</h2>
        <p>Unless otherwise stated, you may not:</p>
        <ul>
          <li>Reproduce, distribute, or publicly display our content without prior written permission</li>
          <li>Use our images, logos, or brand assets for commercial purposes</li>
          <li>Modify or create derivative works based on our content</li>
          <li>Remove or alter copyright notices or attributions</li>
        </ul>
        <p>You <strong>may</strong> share links to our website and quote brief excerpts with proper attribution.</p>
      </section>

      <section id="mit">
        <h2>MIT License (Website Code)</h2>
        <p>The <strong>source code</strong> for this website's framework (React components, styles, configuration) is licensed under the MIT License. This applies only to the code structure, NOT to the club's content, branding, or images.</p>
        <div className="!rounded-xl !bg-surface-secondary dark:!bg-dark-surface-tertiary !p-5 !my-6 !font-mono !text-sm !not-prose">
          <p className="!mb-2">MIT License</p>
          <p className="!mb-2">Copyright (c) {new Date().getFullYear()} RU Club Motherland</p>
          <p className="!mb-2">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
          <p className="!mb-2">The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
          <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
        </div>
        <p>Note: This MIT License covers only the website's source code. The club's content, mission data, member information, photographs, and brand assets remain under standard copyright and are not covered by this license.</p>
      </section>

      <section id="partners">
        <h2>Partner Content</h2>
        <p>Partner logos, names, and materials displayed on this website are used with permission from their respective organizations. These remain the property of their respective owners:</p>
        <ul>
          <li>Doko Recyclers</li>
          <li>Pokhara Metropolitan City</li>
          <li>Government of Nepal</li>
          <li>KOICA (Korea International Cooperation Agency)</li>
          <li>Chillionaire Productions</li>
        </ul>
      </section>

      <section id="open-source">
        <h2>Open Source Components</h2>
        <p>This website is built using open-source technologies including React, Vite, Tailwind CSS, Framer Motion, Supabase, and others as listed in our package dependencies.</p>
      </section>

      <section id="disclaimer">
        <h2>Disclaimer</h2>
        <p>The information on this website is provided for informational purposes only. While we strive to keep content accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information.</p>
        <p>RU Club Motherland shall not be liable for any loss or damage arising from the use of this website.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>For licensing inquiries, permissions, or attribution requests, please contact us:</p>
        <div className="!rounded-xl !bg-surface-secondary dark:!bg-dark-surface-tertiary !p-4 !my-6 !not-prose">
          <p className="!text-sm"><strong>Email:</strong> <a href="mailto:ruclubmotherland@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">ruclubmotherland@gmail.com</a></p>
          <p className="!text-sm !mt-1"><strong>School:</strong> <span className="text-text-secondary dark:text-dark-text-secondary">Motherland Secondary School, Pokhara, Nepal</span></p>
        </div>
      </section>
    </>
  )
}
