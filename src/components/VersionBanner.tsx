import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

declare const __APP_VERSION__: string

export default function VersionBanner() {
  const [visible, setVisible] = useState(false)
  const [newVersion, setNewVersion] = useState('')

  useEffect(() => {
    const currentVersion = __APP_VERSION__
    const storedVersion = localStorage.getItem('app-version')
    if (storedVersion && storedVersion !== currentVersion) {
      setNewVersion(currentVersion)
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
          className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-brand-700 to-brand-600 text-white px-4 py-3 shadow-lg shadow-brand-700/20"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-xs font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                v{newVersion}
              </span>
              <span>Site updated</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/changelog"
                onClick={() => setVisible(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                What's new
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-1.5 rounded-lg bg-white text-brand-700 text-xs font-semibold hover:bg-brand-50 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={() => setVisible(false)}
                className="text-white/60 hover:text-white p-1"
                aria-label="Dismiss"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}