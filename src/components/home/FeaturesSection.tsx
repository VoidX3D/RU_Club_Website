import { featureCards } from '@/data'

const iconSVGs: Record<string, React.ReactNode> = {
  plant: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-4a4 4 0 0 0-4-4H4"/><path d="M20 14h-4a4 4 0 0 0-4 4v4"/><path d="M12 2v6a4 4 0 0 0 4 4h6"/><path d="M2 12h6a4 4 0 0 0 4-4V2"/></svg>,
  trash: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  book: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
}

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <p className="text-brand-600 dark:text-brand-400 font-bold text-xs tracking-[0.2em] uppercase mb-4">What We Do</p>
          <h2 className="text-[clamp(2.75rem,6vw,4.25rem)] font-display font-extrabold tracking-tight text-text-primary dark:text-dark-text-primary">Our Initiatives</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featureCards.map((card, i) => (
            <div key={card.title} data-aos="fade-up" data-aos-delay={i * 100}
              className="group relative bg-white dark:bg-dark-surface border border-border dark:border-dark-border px-6 py-10 md:px-8 md:py-12 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-400/50 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              <div className="w-[70px] h-[70px] mx-auto mb-6 bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 transition-transform duration-500 group-hover:scale-110">
                {iconSVGs[card.icon]}
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary dark:text-dark-text-primary mb-3">{card.title}</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm md:text-base leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
