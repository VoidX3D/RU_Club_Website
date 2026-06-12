import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

declare const __APP_VERSION__: string

export default function VersionBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const currentVersion = __APP_VERSION__
    const storedVersion = localStorage.getItem('app-version')
    if (storedVersion && storedVersion !== currentVersion) {
      setVisible(true)
    }
    localStorage.setItem('app-version', currentVersion)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white px-4 py-3 shadow-lg"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              New version available — refresh to update
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-1.5 rounded-lg bg-white text-amber-700 text-xs font-semibold hover:bg-amber-50 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={() => setVisible(false)}
                className="text-white/80 hover:text-white"
                aria-label="Dismiss"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
