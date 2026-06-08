import { motion } from 'framer-motion'
import SEOHead from '@/components/SEOHead'

export default function SecretGarden() {
  const skills = [
    'HTML/CSS', 'JavaScript/TypeScript', 'React', 'Vite',
    'Tailwind CSS', 'Supabase', 'Git/GitHub', 'Node.js',
    'Python', 'Database Design', 'REST APIs', 'UI/UX Design',
  ]

  return (
    <>
      <SEOHead
        title="About — VoidX3D"
        description="About Sincere Bhattarai (VoidX3D) — student, developer, and creator of RU Club Motherland."
      />

      <div className="min-h-screen bg-gradient-to-br from-brand-950 via-dark-surface to-dark-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/25">
              <span className="text-3xl font-display font-bold text-white">SB</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
              Sincere Bhattarai
            </h1>
            <p className="text-brand-400 font-medium text-lg">@VoidX3D</p>
            <p className="text-white/60 mt-2 max-w-lg mx-auto">
              Student · Developer · Environmental Advocate
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8"
          >
            <h2 className="text-xl font-display font-semibold text-white mb-4">About Me</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                I'm Sincere Bhattarai, a student at Motherland Secondary School, Pokhara,
                and the developer behind the RU Club Motherland website. I go by
                <span className="text-brand-400"> VoidX3D </span> online — a handle
                representing my passion for building things from scratch.
              </p>
              <p>
                As the Event Lead of RU Club and the sole developer of this site, I've
                poured countless hours into designing, coding, and maintaining the club's
                digital presence. From the initial static HTML version to the current React
                + Supabase stack, every line of code is written by me.
              </p>
              <p>
                I believe technology can amplify environmental action. This site is my
                contribution to that vision — a platform where awareness meets action,
                built with care for my club and community.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-lg font-display font-semibold text-white mb-4">Skills & Tools</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/10 text-white/70 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-lg font-display font-semibold text-white mb-4">Connect</h2>
              <div className="space-y-3">
                <a
                  href="https://github.com/VoidX3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="shrink-0">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>github.com/VoidX3D</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-white/40 group-hover:text-brand-400 transition-colors">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/sincere_bhattarai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="shrink-0">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span>@sincere_bhattarai</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-white/40 group-hover:text-brand-400 transition-colors">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  href="mailto:sincerebhattarai01@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>sincerebhattarai01@gmail.com</span>
                </a>
                <a
                  href="https://ruclubmss.vercel.app"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span>RU Club Motherland</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-white/40 text-sm">
              Built with care by{' '}
              <a href="https://github.com/VoidX3D" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">
                Sincere Bhattarai
              </a>
              {' '}· Class 10 · Motherland Secondary School
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
