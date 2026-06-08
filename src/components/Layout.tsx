import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import CookieConsent from './CookieConsent'
import { useTheme } from '@/hooks/useTheme'
import { usePageTracking } from '@/hooks/usePageTracking'
import SEOHead from './SEOHead'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  usePageTracking()

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

  return (
    <>
      <SEOHead />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className={isHome ? '' : 'pt-20 min-h-screen'}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}
