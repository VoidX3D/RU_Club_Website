import { useState, useEffect, useRef } from 'react'

export default function GlitchText({ text }: { text: string }) {
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
