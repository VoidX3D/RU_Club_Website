import { track } from '@vercel/analytics'
import { SITE_URL } from '@/data'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let initialized = false
let scrollTracked = new Set<string>()

export function initAnalytics() {
  if (initialized) return
  initialized = true

  // gtag.js is pre-loaded in index.html with G-QC1WT8TF66 (always active)
  // Here we just set up the consent-based IDs and event tracking
  const consent = localStorage.getItem('cookie-consent')

  if (consent === 'accepted') {
    gtag('consent', 'update', { analytics_storage: 'granted' })
    const consentIds = ['G-HWFPCZ4W1Q', 'G-HJTLGVDNYK']
    consentIds.forEach((id) => {
      gtag('config', id, {
        send_page_view: false,
        allow_google_signals: true,
        allow_ad_personalization_signals: true,
        linker: { domains: [SITE_URL.replace('https://', ''), 'ruclubadmin.vercel.app'] },
      })
    })
  }

  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_referrer: document.referrer || undefined,
  })

  track('page_view', { page: window.location.pathname })

  trackScrollDepth()
  trackOutboundLinks()
  trackDownloads()
}

function trackScrollDepth() {
  let maxDepth = 0
  const handler = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const depth = Math.round((scrollTop / docHeight) * 100)
    if (depth > maxDepth) {
      maxDepth = depth
      const thresholds = [25, 50, 75, 90, 100]
      for (const t of thresholds) {
        if (depth >= t && !scrollTracked.has(`${t}_${window.location.pathname}`)) {
          scrollTracked.add(`${t}_${window.location.pathname}`)
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
              percent: t,
              page_path: window.location.pathname,
              page_title: document.title,
            })
          }
          track('scroll', { depth: t, path: window.location.pathname })
        }
      }
    }
  }
  window.addEventListener('scroll', handler, { passive: true })
}

function trackOutboundLinks() {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a')
    if (!target || !target.href) return
    const url = target.href
    if (url.includes(window.location.hostname)) return
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'outbound',
        event_label: url,
        link_url: url,
        link_domain: new URL(url).hostname,
      })
    }
    track('outbound_link', { url })
  })
}

function trackDownloads() {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a')
    if (!target || !target.href) return
    const url = target.href
    const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf', '.zip', '.mp4']
    const isDownload = extensions.some((ext) => url.toLowerCase().includes(ext))
    if (!isDownload && target.download === '') return
    if (typeof gtag !== 'undefined') {
      gtag('event', 'file_download', {
        file_url: url,
        file_name: url.split('/').pop() || 'unknown',
        link_text: target.textContent?.trim() || '',
      })
    }
    track('download', { url })
  })
}

export function grantConsent() {
  localStorage.setItem('cookie-consent', 'accepted')
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', { analytics_storage: 'granted' })
    const consentIds = ['G-HWFPCZ4W1Q', 'G-HJTLGVDNYK']
    consentIds.forEach((id) => {
      gtag('config', id, { send_page_view: false })
    })
  }
}

export function denyConsent() {
  localStorage.setItem('cookie-consent', 'declined')
}
