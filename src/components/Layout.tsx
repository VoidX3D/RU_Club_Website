import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import CookieConsent from './CookieConsent'
import { useTheme } from '@/hooks/useTheme'
import { usePageTracking } from '@/hooks/usePageTracking'
import { SiteConfigProvider } from '@/hooks/useSiteConfig'
import SEOHead from './SEOHead'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/styles/home.css'

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
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
    AOS.refresh()
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isHome = location.pathname === '/'

  if (isSecretGarden) {
    return (
      <SiteConfigProvider>
        <Outlet />
      </SiteConfigProvider>
    )
  }

  return (
    <SiteConfigProvider>
      <SEOHead />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className={isHome ? '' : 'min-h-screen pt-[80px] md:pt-[120px]'}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </SiteConfigProvider>
  )
}
