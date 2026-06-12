import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import CookieConsent from './CookieConsent'
import ConnectionStatus from './ConnectionStatus'
import { useTheme } from '@/hooks/useTheme'
import { usePageTracking } from '@/hooks/usePageTracking'
import { SiteConfigProvider } from '@/hooks/useSiteConfig'
import SEOHead from './SEOHead'
import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg hover:bg-brand-700 transition-all"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  ) : null
}

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const pathnameRef = useRef(location.pathname)
  usePageTracking()

  const isSecretGarden = location.pathname === '/secret-garden'

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (pathnameRef.current !== location.pathname) {
      pathnameRef.current = location.pathname
      requestAnimationFrame(() => AOS.refresh())
    }
  }, [location.pathname])

  if (isSecretGarden) {
    return (
      <SiteConfigProvider>
        <Outlet />
      </SiteConfigProvider>
    )
  }

  return (
    <SiteConfigProvider>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg">
        Skip to main content
      </a>
      <SEOHead />
      <ConnectionStatus />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content" className="min-h-screen pt-[70px] md:pt-[100px] flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CookieConsent />
      <BackToTop />
    </SiteConfigProvider>
  )
}
