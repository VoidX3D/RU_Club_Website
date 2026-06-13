import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { heroContent } from '@/data'

const h = heroContent

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/50 z-[1]" />
      <img src={h.bgImage} alt="" width="1920" height="1146" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" loading="eager" decoding="async" />
      <div className="relative z-10 w-full px-4 sm:px-6 text-center py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 shadow-lg text-brand-300 text-sm md:text-base font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-3 h-3 rounded-full bg-brand-500 animate-pulse shrink-0" />
          {h.badge}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(3.25rem,10vw,7rem)] font-display font-extrabold leading-[1.05] tracking-tight text-white"
        >
          <span className="block">{h.titleLine1}</span>
          <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{h.titleLine2}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-[clamp(1.1rem,2.2vw,1.4rem)] text-white/80 max-w-[700px] mx-auto leading-relaxed font-normal"
        >
          {h.subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-700 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-800 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-700/30">
            {h.ctaPrimary}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </Link>
          <Link to="/gallery" className="inline-flex items-center px-8 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/20 transition-all hover:-translate-y-0.5">
            {h.ctaSecondary}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
