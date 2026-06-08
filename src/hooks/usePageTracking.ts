import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics } from '@/lib/analytics'

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
    }
  }, [location])
}
