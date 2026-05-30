/**
 * Analytics - Google Analytics 4 (GA4) management
 *
 * Centralized GA4 initialization, consent, and page tracking.
 * To enable analytics, replace GA_MEASUREMENT_ID below with your real GA4 ID.
 */

const Analytics = {
  GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',

  init() {
    if (this.isDisabled()) return;
    this.loadScript();
    this.setupConsent();
    this.trackPageView();
  },

  isDisabled() {
    const consent = localStorage.getItem('cookie-consent');
    return consent === 'declined';
  },

  loadScript() {
    const id = this.GA_MEASUREMENT_ID;
    if (!id || id === 'G-XXXXXXXXXX') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };

    gtag('consent', 'default', { analytics_storage: 'denied' });
    gtag('js', new Date());
    gtag('config', id, { send_page_view: false });
  },

  setupConsent() {
    const saved = localStorage.getItem('cookie-consent');
    if (saved === 'accepted' && typeof gtag !== 'undefined') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  },

  trackPageView() {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  },

  grantConsent() {
    localStorage.setItem('cookie-consent', 'accepted');
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      this.trackPageView();
    }
  },

  denyConsent() {
    localStorage.setItem('cookie-consent', 'declined');
  }
};
