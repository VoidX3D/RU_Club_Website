import { useState, useEffect } from 'react'

export default function ConnectionStatus() {
  const [online, setOnline] = useState(navigator.onLine)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    const goOnline = () => { setOnline(true); setWasOffline(true); setTimeout(() => setWasOffline(false), 3000) }
    const goOffline = () => { setOnline(false) }
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  if (!online) {
    return (
      <div className="fixed top-[70px] md:top-[100px] left-0 right-0 z-40 bg-red-500/90 backdrop-blur-sm text-white text-center text-sm py-2 px-4">
        No internet connection — showing cached content
      </div>
    )
  }

  if (wasOffline) {
    return (
      <div className="fixed top-[70px] md:top-[100px] left-0 right-0 z-40 bg-emerald-500/90 backdrop-blur-sm text-white text-center text-sm py-2 px-4 animate-fade-up">
        Back online — refreshing data
      </div>
    )
  }

  return null
}
