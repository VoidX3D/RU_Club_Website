import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import Layout from '@/components/Layout'
import LegalLayout from '@/components/layout/LegalLayout'
import ErrorBoundary from '@/components/ErrorBoundary'

const Home = lazy(() => import('@/pages/Home'))
const Missions = lazy(() => import('@/pages/Missions'))
const MissionDetail = lazy(() => import('@/pages/MissionDetail'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Announcements = lazy(() => import('@/pages/Announcements'))
const AnnouncementDetail = lazy(() => import('@/pages/AnnouncementDetail'))
const Members = lazy(() => import('@/pages/Members'))
const Contact = lazy(() => import('@/pages/Contact'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const License = lazy(() => import('@/pages/License'))
const Consent = lazy(() => import('@/pages/Consent'))
const SecretGarden = lazy(() => import('@/pages/SecretGarden'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

function AdminRedirect() {
  window.location.href = 'https://ru-admin-site.vercel.app/'
  return null
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/mission/:slug" element={<MissionDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/announcement/:id" element={<AnnouncementDetail />} />
                <Route path="/members" element={<Members />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/secret-garden" element={<SecretGarden />} />
                <Route path="/admin" element={<AdminRedirect />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route element={<LegalLayout />}>
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/license" element={<License />} />
                <Route path="/consent" element={<Consent />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  )
}
