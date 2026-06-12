import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []
    const MOUSE = { x: -1000, y: -1000 }

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initParticles() {
      particles.length = 0
      const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 1,
          alpha: Math.random() * 0.4 + 0.1,
          hue: 160 + Math.random() * 40,
        })
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const dx = MOUSE.x - p.x
        const dy = MOUSE.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.vx -= dx / dist * 0.02
          p.vy -= dy / dist * 0.02
          p.alpha = Math.min(0.8, p.alpha + 0.01)
        } else {
          p.alpha = Math.max(0.1, p.alpha - 0.002)
        }

        p.vx *= 0.99
        p.vy *= 0.99

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.alpha})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 60%, 55%, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    const handleMouse = (e: MouseEvent) => { MOUSE.x = e.clientX; MOUSE.y = e.clientY }
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('resize', () => { resize(); initParticles() })
    resize()
    initParticles()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
