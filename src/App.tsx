import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { lazy, Suspense, useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import LegalLayout from '@/components/layout/LegalLayout'
import ErrorBoundary from '@/components/ErrorBoundary'
import VersionBanner from '@/components/VersionBanner'

const Home = lazy(() => import('@/pages/Home'))
const Missions = lazy(() => import('@/pages/Missions'))
const MissionDetail = lazy(() => import('@/pages/MissionDetail'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Announcements = lazy(() => import('@/pages/Announcements'))
const AnnouncementDetail = lazy(() => import('@/pages/AnnouncementDetail'))
const Members = lazy(() => import('@/pages/Members'))
const Contact = lazy(() => import('@/pages/Contact'))
const Changelog = lazy(() => import('@/pages/Changelog'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const License = lazy(() => import('@/pages/License'))
const Consent = lazy(() => import('@/pages/Consent'))
const SecretGarden = lazy(() => import('@/pages/SecretGarden'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-surface dark:bg-dark-surface z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-2 border-2 border-transparent border-t-emerald-400 border-r-emerald-400 rounded-full animate-spin" style={{ animationDuration: '1s' }} />
          <div className="absolute inset-4 border-2 border-transparent border-b-teal-400 border-l-teal-400 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          <svg className="w-5 h-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22v-4a4 4 0 0 0-4-4H4" /><path d="M20 14h-4a4 4 0 0 0-4 4v4" /><path d="M12 2v6a4 4 0 0 0 4 4h6" /><path d="M2 12h6a4 4 0 0 0 4-4V2" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Loading</span>
          {[0, 1, 2].map(i => (
            <span key={i}
              className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function LazyRoute({ children }: { children: React.ReactNode }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const handler = () => setFailed(true)
    window.addEventListener('vite:preloadError', handler)
    return () => window.removeEventListener('vite:preloadError', handler)
  }, [])
  if (failed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-2">Failed to load page</h2>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">A new version may have been deployed. Please refresh.</p>
          <button onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-brand-700 text-white font-medium hover:bg-brand-800 transition-all"
          >Refresh Page</button>
        </div>
      </div>
    )
  }
  return <>{children}</>
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <VersionBanner />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<LazyRoute><Home /></LazyRoute>} />
                <Route path="/missions" element={<LazyRoute><Missions /></LazyRoute>} />
                <Route path="/mission/:slug" element={<LazyRoute><MissionDetail /></LazyRoute>} />
                <Route path="/gallery" element={<LazyRoute><Gallery /></LazyRoute>} />
                <Route path="/announcements" element={<LazyRoute><Announcements /></LazyRoute>} />
                <Route path="/announcement/:id" element={<LazyRoute><AnnouncementDetail /></LazyRoute>} />
                <Route path="/members" element={<LazyRoute><Members /></LazyRoute>} />
                <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
                <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
              </Route>
              <Route element={<LegalLayout />}>
                <Route path="/privacy" element={<LazyRoute><Privacy /></LazyRoute>} />
                <Route path="/license" element={<LazyRoute><License /></LazyRoute>} />
                <Route path="/consent" element={<LazyRoute><Consent /></LazyRoute>} />
              </Route>
              <Route path="/changelog" element={<LazyRoute><Changelog /></LazyRoute>} />
              <Route path="/secret-garden" element={<LazyRoute><SecretGarden /></LazyRoute>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  )
}
