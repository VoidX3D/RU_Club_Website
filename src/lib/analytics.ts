const GA_MEASUREMENT_IDS = ['G-HWFPCZ4W1Q', 'G-HJTLGVDNYK']
let initialized = false

export function initAnalytics() {
  if (initialized) return
  initialized = true

  const consent = localStorage.getItem('cookie-consent')

  const ids = consent === 'accepted' ? GA_MEASUREMENT_IDS : [GA_MEASUREMENT_IDS[0]]
  const firstId = ids[0]

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${firstId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    // @ts-expect-error
    dataLayer.push(arguments)
  }

  gtag('consent', 'default', { analytics_storage: 'denied' })
  gtag('js', new Date())

  ids.forEach((id) => {
    gtag('config', id, {
      send_page_view: false,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      linker: { domains: ['ru.motherland.edu.np', 'ruclubmss.vercel.app'] },
    })
  })

  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
  })

  if (consent === 'accepted') {
    gtag('consent', 'update', { analytics_storage: 'granted' })
  }

  // Load Vercel Analytics
  const va = document.createElement('script')
  va.defer = true
  va.src = '/_vercel/insights/script.js'
  document.head.appendChild(va)
}

export function grantConsent() {
  localStorage.setItem('cookie-consent', 'accepted')
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', { analytics_storage: 'granted' })
    if (GA_MEASUREMENT_IDS.length > 1) {
      gtag('config', GA_MEASUREMENT_IDS[1], { send_page_view: false })
    }
  }
}

export function denyConsent() {
  localStorage.setItem('cookie-consent', 'declined')
}
