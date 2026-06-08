import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'

const skills = [
  'HTML/CSS', 'JavaScript/TypeScript', 'React', 'Node.js',
  'Python', 'Tailwind CSS', 'Supabase', 'Git/GitHub',
  'Framer Motion', 'PostgreSQL', 'Vite', 'UI/UX Design',
]

export default function SecretGarden() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    track('page_view', { page: '/secret-garden' })
    const handleMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <Helmet>
        <title>About — VoidX3D</title>
        <meta name="description" content="About Sincere Bhattarai (VoidX3D) — Student, Developer & Environmental Advocate." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-y-auto">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl absolute"
            style={{ left: cursor.x - 192, top: cursor.y - 192, transition: 'all 0.3s ease-out' }}
          />
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-3xl w-full">
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-emerald-500/30 ring-offset-4 ring-offset-gray-950 shadow-2xl shadow-emerald-500/20">
                <img
                  src="https://avatars.githubusercontent.com/VoidX3D"
                  alt="Sincere Bhattarai"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-2">
                Sincere Bhattarai
              </h1>
              <p className="text-xl text-emerald-400 font-mono mb-2">@VoidX3D</p>
              <p className="text-base text-gray-400">Student &middot; Developer &middot; Environmental Advocate</p>
            </div>

            <div className="space-y-8" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-display font-semibold text-white mb-4">About Me</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Hey there! I&apos;m Sincere Bhattarai, a student at Motherland Secondary School in Pokhara, Nepal.
                    I&apos;m passionate about technology, environmental sustainability, and using code to make the world a better place.
                  </p>
                  <p>
                    As the Event Lead of RU Club Motherland, I help organize environmental initiatives while also
                    building the digital tools that support our mission. I believe that technology and environmental action
                    go hand in hand — and I&apos;m proving it, one project at a time.
                  </p>
                  <p>
                    When I&apos;m not coding or leading events, you&apos;ll find me learning new frameworks, contributing to
                    open-source, or exploring the beautiful city of Pokhara.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="150">
                <h2 className="text-2xl font-display font-semibold text-white mb-6">Skills &amp; Tools</h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-xl bg-white/10 text-gray-200 text-sm font-medium border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-2xl font-display font-semibold text-white mb-6">Connect</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="https://github.com/VoidX3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-emerald-400 shrink-0">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-gray-200 group-hover:text-emerald-400">GitHub</span>
                      <span className="block text-xs text-gray-500">github.com/VoidX3D</span>
                    </div>
                  </a>
                  <a
                    href="https://instagram.com/sincerebhattarai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-emerald-400 shrink-0">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-gray-200 group-hover:text-emerald-400">Instagram</span>
                      <span className="block text-xs text-gray-500">@sincerebhattarai</span>
                    </div>
                  </a>
                  <a
                    href="mailto:sincerebhattarai01@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-emerald-400 shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-gray-200 group-hover:text-emerald-400">Email</span>
                      <span className="block text-xs text-gray-500">sincerebhattarai01@gmail.com</span>
                    </div>
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-emerald-400 shrink-0">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-gray-200 group-hover:text-emerald-400">Website</span>
                      <span className="block text-xs text-gray-500">RU Club Motherland</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 pb-8" data-aos="fade-up">
              <p className="text-sm text-gray-600">
                Built with care by Sincere Bhattarai &middot; Class 10 &middot; Motherland Secondary School
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
