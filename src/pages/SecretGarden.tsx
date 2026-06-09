import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState, useCallback } from 'react'
import { track } from '@vercel/analytics'

const skills = [
  { category: 'Frontend', items: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Supabase', 'PostgreSQL'] },
  { category: 'Tools', items: ['Git/GitHub', 'Vite', 'Vercel', 'VS Code', 'Linux'] },
  { category: 'Design', items: ['UI/UX Design', 'Responsive Design', 'SVG Animation', 'Prototyping'] },
]

const projects = [
  { name: 'RU Club Motherland', desc: 'Environmental club platform — React, TypeScript, Supabase, Tailwind CSS. Full-stack SPA with real-time DB, gallery, and admin panel.', url: 'https://ruclub.motherland.edu.np', repo: 'https://github.com/RU-Club-Motherland', color: 'emerald', tags: ['React', 'TypeScript', 'Supabase', 'Tailwind'] },
  { name: 'RU Admin Panel', desc: 'Admin dashboard for RU Club — CRUD operations, draft system, real-time preview, dark/light theme.', url: 'https://ru-admin-site.vercel.app', repo: '#', color: 'blue', tags: ['React', 'Zustand', 'Supabase', 'Tailwind'] },
  { name: 'PixelPlayer', desc: 'Pixel art music visualizer — transforms audio into retro pixel animations in real-time.', url: '#', repo: 'https://github.com/VoidX3D/PixelPlayer', color: 'purple', tags: ['JavaScript', 'Canvas', 'Web Audio'] },
]

const timeline = [
  { year: '2018', title: 'First Lines of Code', desc: 'Wrote my first HTML & CSS. Started exploring web development and building small websites.' },
  { year: '2020', title: 'GitHub Projects Begin', desc: 'Started uploading projects to GitHub. Built pixel art tools, music experiments, and mini web apps.' },
  { year: '2025', title: 'Growing Skills', desc: 'Deepened my knowledge of JavaScript, React, and backend development. Contributed to open-source.' },
  { year: '2026', title: 'RU Club & First Major Project', desc: 'Joined RU Club Motherland as Event Lead. Built the club website from scratch with React, TypeScript, Supabase — fully deployed on Vercel.' },
]

const achievements = [
  { label: 'Coding Since', value: '2018' },
  { label: 'GitHub Years', value: '6+' },
  { label: 'School Projects', value: '5+' },
  { label: 'Club Events Led', value: '3' },
]

const techIcons = [
  { name: 'React', emoji: '⚛️' },
  { name: 'TypeScript', emoji: '📘' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'Python', emoji: '🐍' },
  { name: 'Git', emoji: '🔀' },
  { name: 'Docker', emoji: '🐳' },
  { name: 'VS Code', emoji: '💻' },
  { name: 'Supabase', emoji: '🔥' },
  { name: 'Figma', emoji: '🎨' },
  { name: 'Vite', emoji: '⚡' },
]

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number }[] = []
    const count = Math.min(20, Math.floor((w * h) / 50000))

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.pulse += 0.02
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(52, 211, 153, ${alpha})`
        ctx!.fill()
      }


      animId = requestAnimationFrame(draw)
    }

    draw()

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    let count = 0
    intervalRef.current = setInterval(() => {
      if (count > 3) {
        setDisplay(text)
        clearInterval(intervalRef.current!)
        return
      }
      const chars = '!@#$%^&*'
      setDisplay(
        text.split('').map((c) => Math.random() < 0.4 ? chars[Math.floor(Math.random() * chars.length)] : c).join('')
      )
      count++
    }, 60)
    return () => clearInterval(intervalRef.current!)
  }, [text])

  return <span>{display}</span>
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [started, text])

  return <span>{display}<span className="animate-pulse">|</span></span>
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [level, delay])

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{name}</span>
        <span className="text-emerald-400">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -15, y: x * 15 })
  }, [])

  const colors: Record<string, string> = {
    emerald: 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30 hover:border-emerald-500/50',
    blue: 'from-blue-500/20 via-blue-500/5 to-transparent border-blue-500/30 hover:border-blue-500/50',
    purple: 'from-purple-500/20 via-purple-500/5 to-transparent border-purple-500/30 hover:border-purple-500/50',
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }) }}
      className={`relative p-5 rounded-2xl bg-white/[0.03] border ${colors[project.color]} backdrop-blur-sm transition-all duration-300 cursor-default group`}
      style={{ transform: isHovered ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` : 'perspective(600px) rotateX(0) rotateY(0) scale(1)' }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-display font-semibold text-lg group-hover:text-emerald-400 transition-colors">{project.name}</h3>
          <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-500 border border-white/5">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 shrink-0 ml-4">
          {project.url !== '#' && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/20 transition-all border border-white/5 hover:border-emerald-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/20 transition-all border border-white/5 hover:border-emerald-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SecretGarden() {
  useEffect(() => { track('page_view', { page: '/secret-garden' }) }, [])

  return (
    <>
      <Helmet>
        <title>About — VoidX3D | RU Club Motherland</title>
        <meta name="description" content="About Sincere Bhattarai (VoidX3D) — Student, Developer & Environmental Advocate at Motherland Secondary School, Pokhara." />
        <meta name="robots" content="noindex" />
        <style>{`html::-webkit-scrollbar { display: none; } html { scrollbar-width: none; }`}</style>
      </Helmet>

      <ParticleCanvas />

      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-y-auto">

        <div className="relative z-10 pb-20">
          {/* ===== HERO ===== */}
          <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-3xl w-full text-center">
              {/* Avatar with rotating ring */}
              <div className="relative inline-block mb-8" data-aos="zoom-in" data-aos-duration="800">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-600 animate-spin-slow" style={{ padding: '3px' }}>
                  <div className="w-full h-full rounded-full bg-gray-950" />
                </div>
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-emerald-500/30 shadow-2xl shadow-emerald-500/20">
                  <img src="https://avatars.githubusercontent.com/VoidX3D" alt="Sincere Bhattarai" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>

              <div data-aos="fade-up" data-aos-delay="100">
                <h1 className="text-5xl sm:text-7xl font-display font-extrabold text-white mb-3">
                  <GlitchText text="Sincere Bhattarai" />
                </h1>
              </div>

              <div data-aos="fade-up" data-aos-delay="200" className="h-8">
                <p className="text-xl sm:text-2xl text-emerald-400 font-mono">
                  <TypewriterText text="@VoidX3D • Student • Developer • Environmental Advocate" delay={800} />
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-3" data-aos="fade-up" data-aos-delay="600">
                <a href="#about" className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-sm hover:from-emerald-500 hover:to-teal-500 transition-all hover:scale-105 shadow-lg shadow-emerald-600/25">
                  Explore
                </a>
                <a href="mailto:sincerebhattarai01@gmail.com" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium text-sm hover:bg-white/10 hover:border-emerald-500/30 transition-all hover:scale-105">
                  Contact Me
                </a>
              </div>

              {/* Floating tech icons */}
              <div className="relative mt-16 h-20" data-aos="fade-up" data-aos-delay="800">
                <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-6">
                  {techIcons.map((icon, i) => (
                    <span
                      key={icon.name}
                      className="text-xl sm:text-2xl opacity-30 hover:opacity-100 transition-all duration-500 cursor-default hover:scale-125"
                      style={{
                        animation: `float 3s ease-in-out ${i * 0.3}s infinite`,
                        filter: 'grayscale(0.5)',
                      }}
                      title={icon.name}
                    >
                      {icon.emoji}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="mt-12 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mx-auto"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          </section>

          {/* ===== ABOUT ===== */}
          <section id="about" className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-16" data-aos="fade-up">
              <p className="text-emerald-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3">About</p>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">The Story So Far</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16" data-aos="fade-up">
              {achievements.map((a) => (
                <div key={a.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-center hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all group">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 mb-1 group-hover:scale-110 transition-transform">{a.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{a.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-3xl p-8 sm:p-10" data-aos="fade-up" data-aos-delay="100">
              <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>Hey there! I'm <strong className="text-white">Sincere Bhattarai</strong>, currently studying in <strong className="text-emerald-400">Class 10 at Motherland Secondary School</strong>, Pokhara, Nepal. I'm a passionate self-taught developer who started coding back in <strong className="text-white">2018</strong> and has been building things for the web ever since.</p>
                <p>In <strong className="text-white">2026</strong>, I joined <strong className="text-emerald-400">RU Club Motherland</strong> as the <strong className="text-white">Event Lead</strong>. I lead environmental initiatives like park clean-ups, recycling workshops, and awareness campaigns — while also building the digital infrastructure that powers our mission.</p>
                <p>Over the years (<strong className="text-white">2020–2025</strong>), I've built numerous projects on <strong className="text-emerald-400">GitHub</strong> — pixel art tools, music visualizers like <strong className="text-white">PixelPlayer</strong>, mini web apps, and experimental frontends. My first major school project was this very website — <strong className="text-emerald-400">RU Club Motherland</strong> — built from scratch with React, TypeScript, Supabase, and deployed on Vercel.</p>
                <p>I'm driven by the belief that <strong className="text-white">technology and environmental action go hand in hand</strong>. Whether I'm writing code, organizing events, or learning something new — I'm proving that a student from Pokhara can make a real impact.</p>
                <p>When I'm not at a keyboard, you'll find me exploring the lakes and hills of Pokhara, experimenting with pixel art, or diving into the next framework.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-sm text-gray-500 italic">"Code is my canvas. Sustainability is my cause. Pokhara is my home."</p>
              </div>
            </div>
          </section>

          {/* ===== TIMELINE ===== */}
          <section className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-16" data-aos="fade-up">
              <p className="text-emerald-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Journey</p>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">My Path</h2>
            </div>

            <div className="relative">
              <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex items-start gap-6 mb-12 sm:mb-16 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`} data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
                  <div className="hidden sm:flex flex-1" />
                  <div className="shrink-0 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-emerald-500/50 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{item.year}</span>
                    <h3 className="text-white font-display font-semibold text-lg mt-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== SKILLS ===== */}
          <section className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-16" data-aos="fade-up">
              <p className="text-emerald-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Expertise</p>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Skills &amp; Tools</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-up">
              {skills.map((group, i) => (
                <div key={group.category} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all" data-aos="fade-up" data-aos-delay={i * 100}>
                  <h3 className="text-emerald-400 font-display font-semibold text-sm mb-4 uppercase tracking-wider">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-xs font-medium border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill bars */}
            <div className="mt-10 bg-white/[0.03] border border-white/5 rounded-2xl p-6 sm:p-8" data-aos="fade-up">
              <h3 className="text-white font-display font-semibold text-base mb-6">Proficiency</h3>
              <SkillBar name="React / TypeScript" level={85} delay={200} />
              <SkillBar name="Node.js / Backend" level={70} delay={400} />
              <SkillBar name="UI / UX Design" level={75} delay={600} />
              <SkillBar name="Python / Scripting" level={60} delay={800} />
              <SkillBar name="Database / SQL" level={65} delay={1000} />
            </div>
          </section>

          {/* ===== PROJECTS ===== */}
          <section className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-16" data-aos="fade-up">
              <p className="text-emerald-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Work</p>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Projects</h2>
            </div>

            <div className="space-y-5" data-aos="fade-up">
              {projects.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* ===== CONNECT ===== */}
          <section className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-16" data-aos="fade-up">
              <p className="text-emerald-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Network</p>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Let's Connect</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-up">
              {[
                { platform: 'GitHub', handle: '@VoidX3D', url: 'https://github.com/VoidX3D', icon: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />, fill: true },
                { platform: 'Instagram', handle: '@sincerebhattarai', url: 'https://instagram.com/sincerebhattarai', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />, fill: true },
                { platform: 'Facebook', handle: 'RU Club Motherland', url: 'https://facebook.com/profile.php?id=61585206314774', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />, fill: true },
                { platform: 'Email', handle: 'sincerebhattarai01@gmail.com', url: 'mailto:sincerebhattarai01@gmail.com', icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, fill: false },
                { platform: 'RU Club GitHub', handle: 'RU-Club-Motherland', url: 'https://github.com/RU-Club-Motherland', icon: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />, fill: true },
                { platform: 'RU Club Website', handle: 'ruclub.motherland.edu.np', url: '/', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, fill: false },
                { platform: 'Personal Site', handle: 'ubuntu-sincere.vercel.app', url: 'https://ubuntu-sincere.vercel.app', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, fill: false },
              ].map((link) => {
                const isEmail = link.platform === 'Email'
                const href = isEmail ? link.url : link.url
                const isExternal = href.startsWith('http')
                return (
                  <a key={link.platform} href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all shrink-0 relative z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={link.fill ? 'currentColor' : 'none'} stroke={link.fill ? 'none' : 'currentColor'} strokeWidth={link.fill ? 0 : 2} strokeLinecap="round" strokeLinejoin="round">
                        {link.icon}
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <span className="block text-sm font-medium text-gray-200 group-hover:text-emerald-400 transition-colors">{link.platform}</span>
                      <span className="block text-xs text-gray-500">{link.handle}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-gray-600 group-hover:text-emerald-400 transition-colors shrink-0 relative z-10">
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </a>
                )
              })}
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <div className="text-center mt-12 pb-8 px-4">
            <div className="max-w-md mx-auto border-t border-white/5 pt-8">
              <p className="text-sm text-gray-600">Built with care by Sincere Bhattarai &middot; Class 10 &middot; Motherland Secondary School</p>
              <div className="flex justify-center gap-3 mt-4">
                <a href="https://github.com/VoidX3D" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://instagram.com/sincerebhattarai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="mailto:sincerebhattarai01@gmail.com" className="text-gray-600 hover:text-emerald-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
