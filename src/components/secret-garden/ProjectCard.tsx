import { useRef, useState, useCallback } from 'react'

interface ProjectCardProps {
  project: { name: string; desc: string; url: string; repo: string; color: string; tags: string[] }
  index: number
}

const colors: Record<string, string> = {
  emerald: 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30 hover:border-emerald-500/50',
  blue: 'from-blue-500/20 via-blue-500/5 to-transparent border-blue-500/30 hover:border-blue-500/50',
  purple: 'from-purple-500/20 via-purple-500/5 to-transparent border-purple-500/30 hover:border-purple-500/50',
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
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

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }) }}
      className={`relative p-5 bg-white/[0.03] border ${colors[project.color]} backdrop-blur-sm transition-all duration-300 cursor-default group`}
      style={{ transform: isHovered ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` : 'perspective(600px) rotateX(0) rotateY(0) scale(1)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-display font-semibold text-lg group-hover:text-emerald-400 transition-colors">{project.name}</h3>
          <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 text-gray-500 border border-white/5">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 shrink-0 ml-4">
          {project.url !== '#' && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/20 transition-all border border-white/5 hover:border-emerald-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 bg-white/5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/20 transition-all border border-white/5 hover:border-emerald-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}
