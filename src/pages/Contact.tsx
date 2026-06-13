import { useState, useRef, useCallback } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ErrorBanner } from '@/components/ErrorBanner'
import { Mail, Facebook, Instagram, GitHub, Check } from '@/components/Icons'
import { motion } from 'framer-motion'
import SEOHead from '@/components/SEOHead'
import { submitContactForm } from '@/lib/supabase'
import { useSiteConfig } from '@/hooks/useSiteConfig'
import { validateEmail } from '@/lib/utils'

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook size={20} />,
  instagram: <Instagram size={20} />,
  github: <GitHub size={20} />,
  email: <Mail size={20} />,
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [emailValidation, setEmailValidation] = useState<ReturnType<typeof validateEmail> | null>(null)
  const [emailTouched, setEmailTouched] = useState(false)
  const config = useSiteConfig()
  const lastSubmit = useRef(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'email' && emailTouched) {
      setEmailValidation(validateEmail(value))
    }
  }

  const handleEmailBlur = useCallback(() => {
    setEmailTouched(true)
    setEmailValidation(validateEmail(formData.email))
  }, [formData.email])

  const applySuggestion = useCallback((suggestion: string) => {
    setFormData((prev) => ({ ...prev, email: suggestion }))
    setEmailValidation(validateEmail(suggestion))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData._gotcha) return

    setEmailTouched(true)
    const ev = validateEmail(formData.email)
    setEmailValidation(ev)
    if (!ev.valid) {
      setError(ev.error || 'Please enter a valid email address')
      return
    }

    const now = Date.now()
    if (now - lastSubmit.current < 10000) {
      setError('Please wait before sending another message.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const results = await Promise.allSettled([
        submitContactForm({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }),
        fetch('https://formspree.io/f/xjgzzwej', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }),
        }),
        fetch('https://formspree.io/f/xnjrrwbp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }),
        }),
      ])
      const dbResult = results[0]
      if (dbResult.status === 'rejected' || (dbResult.status === 'fulfilled' && dbResult.value?.error)) {
        const msg = dbResult.status === 'rejected'
          ? dbResult.reason?.message || 'Failed to send message.'
          : dbResult.value?.error?.message || 'Failed to send message.'
        setError(msg)
        setSubmitting(false)
        return
      }
      lastSubmit.current = now
      setSubmitted(true)
    } catch {
      setError('Failed to send message. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEOHead title="Contact" description="Get in touch with RU Club Motherland. Send us a message, find our location at Motherland Secondary School, Pokhara, or connect on social media." keywords="contact RU Club, Motherland Secondary School Pokhara address, email environmental club Nepal, RU Club social media, Pokhara environmental organization contact" jsonLd={{ '@type': 'ContactPage', description: 'Contact RU Club Motherland for inquiries about environmental sustainability initiatives.', mainEntity: { '@type': 'Organization', name: 'RU Club Motherland', email: 'ruclubmotherland@gmail.com', telephone: '+977-9856022256', location: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: 'Motherland Secondary School, Pokhara Metropolitan City - 7', addressLocality: 'Pokhara', addressRegion: 'Gandaki Province', postalCode: '33700', addressCountry: 'NP' } } } }} />
      <section className="py-20">
        <div className="w-full px-4 sm:px-6">
          <PageHeader badge="Get in Touch" title="Contact Us" description="Have questions or want to join? We&apos;d love to hear from you." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary dark:text-dark-text-primary">Email</h3>
                    <a href={`mailto:${config.email}`} className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-700 transition-colors">
                      {config.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-700">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary dark:text-dark-text-primary">Location</h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{config.school}</p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{config.city} - {config.ward}, {config.district}, {config.country}</p>
                  </div>
                </div>
                {config.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-700">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-text-primary dark:text-dark-text-primary">Phone</h3>
                      <a href={`tel:${config.phone}`} className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-brand-700 transition-colors">
                        {config.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="pt-4">
                  <h3 className="font-display font-semibold text-text-primary dark:text-dark-text-primary mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {config.socialLinks?.map((link) => {
                      const isEmail = link.platform === 'email'
                      const href = isEmail ? `mailto:${link.url}` : link.url
                      const isExternal = !isEmail
                      const Icon = socialIcons[link.platform as keyof typeof socialIcons]
                      if (!Icon) return null
                      return (
                        <a key={link.platform} href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="w-10 h-10 rounded-xl bg-surface-secondary dark:bg-dark-surface-tertiary flex items-center justify-center hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-700 transition-all"
                        >
                          {Icon}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              {submitted ? (
                <div className="p-8 rounded-2xl bg-surface-secondary dark:bg-dark-surface-tertiary text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-brand-700" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                    <input type="text" name="_gotcha" value={formData._gotcha} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1.5">Name</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1.5">Email</label>
                    <div className="relative">
                      <input type="email" id="email" name="email" required value={formData.email}
                        onChange={handleChange} onBlur={handleEmailBlur}
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                          emailTouched && emailValidation && !emailValidation.valid
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-500/50 focus:border-red-500'
                            : 'border-border dark:border-dark-border focus:ring-brand-500/50 focus:border-brand-500'
                        }`}
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                      {emailTouched && emailValidation && !emailValidation.valid && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        </div>
                      )}
                    </div>
                    {emailTouched && emailValidation && (
                      <div className="mt-1 min-h-[1.25rem]">
                        {!emailValidation.valid && (
                          <p className="text-xs text-red-500">{emailValidation.error}</p>
                        )}
                        {emailValidation.suggestion && (
                          <button type="button" onClick={() => applySuggestion(emailValidation.suggestion!)}
                            className="text-xs text-brand-700 dark:text-brand-400 hover:underline mt-0.5"
                          >
                            Did you mean {emailValidation.suggestion}?
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1.5">Subject</label>
                    <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                      placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1.5">Message</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
                      placeholder="Your message..." />
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>
                  )}
                  <button type="submit" disabled={submitting}
                    className="w-full py-3 rounded-xl bg-brand-700 text-white font-medium hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-brand-700/25"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
