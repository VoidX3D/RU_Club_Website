import { useState, useEffect, useRef } from 'react'

export default function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setTimeout(() => setWidth(level), delay); observer.disconnect() }
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
      <div className="h-2 bg-white/5 border border-white/10 overflow-hidden rounded-full">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}
