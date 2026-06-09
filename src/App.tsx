import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from '@/components/Layout'
import LegalLayout from '@/components/layout/LegalLayout'
import ErrorBoundary from '@/components/ErrorBoundary'
import Home from '@/pages/Home'
import Missions from '@/pages/Missions'
import MissionDetail from '@/pages/MissionDetail'
import Gallery from '@/pages/Gallery'
import Announcements from '@/pages/Announcements'
import AnnouncementDetail from '@/pages/AnnouncementDetail'
import Members from '@/pages/Members'
import Contact from '@/pages/Contact'
import Privacy from '@/pages/Privacy'
import License from '@/pages/License'
import Consent from '@/pages/Consent'
import SecretGarden from '@/pages/SecretGarden'
import NotFound from '@/pages/NotFound'

function AdminRedirect() {
  const isDev = import.meta.env.DEV
  if (isDev) {
    window.location.href = 'https://ru-admin-site.vercel.app/'
  } else {
    window.location.href = 'https://ru-admin-site.vercel.app/'
  }
  return null
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  )
}
