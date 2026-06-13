import { introContent } from '@/data'

export default function IntroSection() {
  return (
    <section id="intro" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div data-aos="fade-up">
          <p className="text-brand-700 dark:text-brand-400 font-bold text-xs tracking-[0.2em] uppercase mb-4">{introContent.label}</p>
          <h2 className="text-[clamp(2.75rem,6vw,4.25rem)] font-display font-extrabold tracking-tight text-text-primary dark:text-dark-text-primary mb-8">{introContent.title}</h2>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" className="space-y-6">
          {introContent.paragraphs.map((p, i) => (
            <p key={i} className="text-base md:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed md:leading-8" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </div>
    </section>
  )
}
