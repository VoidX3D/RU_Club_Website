import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-transparent to-transparent dark:from-brand-950/20 dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-300/20 dark:bg-brand-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span id="hero-badge-text">Sustainability Leaders</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
        >
          <span className="block">A Greener</span>
          <span className="block gradient-text">Future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed"
          id="hero-subtitle"
        >
          "Leading the community toward a zero-waste ecosystem through innovation and collective responsibility."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/#intro"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-600/25"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
          <a
            href="/gallery"
            className="inline-flex items-center px-6 py-3 rounded-xl border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-all"
          >
            View Gallery
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
