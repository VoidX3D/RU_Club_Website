import { useState, useEffect } from 'react'

export default function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t) }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) { setDisplay(text.slice(0, i + 1)); i++ }
      else clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [started, text])

  return <span>{display}<span className="animate-pulse">|</span></span>
}
