import { Link } from 'react-router-dom'
import { ctaContent } from '@/data'

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-display font-extrabold text-text-primary dark:text-dark-text-primary mb-4" data-aos="fade-up">{ctaContent.title}</h2>
        <p className="text-text-secondary dark:text-dark-text-secondary text-base md:text-lg max-w-xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">{ctaContent.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-700 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-800 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-700/30">
            {ctaContent.primaryBtn}
          </Link>
          <Link to="/gallery" className="inline-flex items-center px-8 py-3.5 rounded-full bg-white dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary font-semibold text-sm uppercase tracking-wider hover:border-brand-700 hover:text-brand-700 dark:hover:text-brand-400 transition-all hover:-translate-y-0.5">
            {ctaContent.secondaryBtn}
          </Link>
        </div>
      </div>
    </section>
  )
}
