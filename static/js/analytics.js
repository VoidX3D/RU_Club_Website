/**
 * Analytics - Google Analytics 4 (GA4)
 * ------------------------------------
 * "Why did the developer go broke? Because he used up all his cache."
 *
 * Centralized GA4 — change the ID once, it works everywhere.
 * Tracks page views, outbound clicks, scroll depth, CTA clicks,
 * downloads, theme toggles, mobile menu, form submissions, and more.
 *
 * To disable: just delete the GA_MEASUREMENT_ID below.
 * To enable: it's already enabled. You're welcome.
 */

const Analytics = {
  GA_MEASUREMENT_IDS: ['G-HWFPCZ4W1Q', 'G-HJTLGVDNYK'],
  sessionStartTime: Date.now(),
  pageStartTime: Date.now(),

  /* ---------------------------------------------------------------- */
  /*  INIT — the party starter                                        */
  /* ---------------------------------------------------------------- */
  init() {
    if (this.isDisabled()) {
      console.info('🍪 Analytics declined — respecting your privacy like a responsible adult.');
      return;
    }
    this.loadScript();
    this.setupConsent();
    this.trackPageView();
    this.trackOutboundLinks();
    this.trackScrollDepth();
    this.trackTimeOnPage();
    this.trackCtaClicks();
    this.trackDownloads();
    this.trackThemeToggle();
    this.trackMobileMenu();
    this.trackFormSubmissions();
    this.trackUserInteraction();
    this.trackPagePerformance();
    this.trackErrorTracking();
  },

  /* ---------------------------------------------------------------- */
  /*  GUARD — checks if the user said "no thanks" to cookies          */
  /* ---------------------------------------------------------------- */
  isDisabled() {
    const consent = localStorage.getItem('cookie-consent');
    return consent === 'declined';
  },

  /* ---------------------------------------------------------------- */
  /*  LOAD SCRIPT — summons the Google Analytics deity                */
  /* ---------------------------------------------------------------- */
  loadScript() {
    const ids = this.GA_MEASUREMENT_IDS;
    if (!ids || ids.length === 0) {
      console.info('📊 GA4 placeholder detected — no data sent.');
      return;
    }

    const firstId = ids[0];
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${firstId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };

    gtag('consent', 'default', { analytics_storage: 'denied' });
    gtag('js', new Date());
    
    ids.forEach(id => {
        gtag('config', id, { 
            send_page_view: false,
            'allow_google_signals': true,
            'allow_ad_personalization_signals': true
        });
    });
    console.info('📊 GA4 loaded for IDs:', ids.join(', '));
  },

  /* ---------------------------------------------------------------- */
  /*  CONSENT — reads what the cookie modal said                      */
  /* ---------------------------------------------------------------- */
  setupConsent() {
    const saved = localStorage.getItem('cookie-consent');
    if (saved === 'accepted' && typeof gtag !== 'undefined') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  },

  /* ---------------------------------------------------------------- */
  /*  PAGE VIEW — "I exist!" (sent once per page load)                */
  /* ---------------------------------------------------------------- */
  trackPageView() {
    if (typeof gtag === 'undefined') return;
    
    // Determine page type
    const path = window.location.pathname;
    let pageType = 'other';
    if (path === '/' || path === '') pageType = 'home';
    else if (path.includes('missions')) pageType = 'missions';
    else if (path.includes('members')) pageType = 'members';
    else if (path.includes('gallery')) pageType = 'gallery';
    else if (path.includes('announcements')) pageType = 'announcements';
    else if (path.includes('contact')) pageType = 'contact';
    else if (path.includes('success')) pageType = 'success';
    else if (path.includes('failed')) pageType = 'failed';
    else if (path.includes('secret-garden')) pageType = 'secret_garden';

    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_type: pageType,
      referrer: document.referrer || 'direct',
      user_language: navigator.language,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      device_type: this.getDeviceType()
    });

    this.pageStartTime = Date.now();
  },

  /* ---------------------------------------------------------------- */
  /*  DEVICE TYPE — determine if mobile, tablet, or desktop           */
  /* ---------------------------------------------------------------- */
  getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
      return 'mobile';
    } else if (/ipad|android|tablet/i.test(ua)) {
      return 'tablet';
    }
    return 'desktop';
  },

  /* ---------------------------------------------------------------- */
  /*  SCROLL DEPTH — how far down the rabbit hole they went           */
  /* ---------------------------------------------------------------- */
  trackScrollDepth() {
    if (typeof gtag === 'undefined') return;
    const depths = new Set();
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPercent = Math.round(
            (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
          );
          const marks = [25, 50, 75, 90, 100];
          marks.forEach(mark => {
            if (scrollPercent >= mark && !depths.has(mark)) {
              depths.add(mark);
              gtag('event', 'scroll_depth', {
                scroll_depth: mark + '%',
                page_path: window.location.pathname,
                scroll_position: window.scrollY
              });
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  },

  /* ---------------------------------------------------------------- */
  /*  TIME ON PAGE — "they've been here 5 minutes and still reading"  */
  /* ---------------------------------------------------------------- */
  trackTimeOnPage() {
    if (typeof gtag === 'undefined') return;
    const intervals = [10, 30, 60, 120, 300];
    intervals.forEach(seconds => {
      setTimeout(() => {
        const timeSpent = Math.round((Date.now() - this.pageStartTime) / 1000);
        gtag('event', 'time_on_page', {
          engagement_time: seconds + 's',
          page_path: window.location.pathname,
          actual_time_spent: timeSpent + 's'
        });
      }, seconds * 1000);
    });
  },

  /* ---------------------------------------------------------------- */
  /*  OUTBOUND LINKS — every time someone escapes to another site     */
  /* ---------------------------------------------------------------- */
  trackOutboundLinks() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      try {
        const url = new URL(link.href);
        if (url.hostname !== window.location.hostname) {
          gtag('event', 'click', {
            event_category: 'outbound',
            event_label: url.hostname,
            link_url: url.href,
            link_text: link.textContent.trim().slice(0, 100),
            transport_type: 'beacon'
          });
        }
      } catch (_) { /* invalid URL, skip */ }
    });
  },

  /* ---------------------------------------------------------------- */
  /*  CTA CLICKS — did they press the pretty button?                  */
  /* ---------------------------------------------------------------- */
  trackCtaClicks() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-primary, .btn-secondary, .btn-join, .btn-submit');
      if (!btn) return;
      const text = btn.textContent.trim().slice(0, 80);
      gtag('event', 'cta_click', {
        cta_text: text,
        cta_href: btn.getAttribute('href') || '',
        cta_class: btn.className,
        page_path: window.location.pathname
      });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  DOWNLOADS — catching people saving files to their Desktop       */
  /* ---------------------------------------------------------------- */
  trackDownloads() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      const ext = link.href.split('.').pop().toLowerCase();
      if (['pdf', 'zip', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'jpg', 'png', 'gif'].includes(ext)) {
        gtag('event', 'download', {
          file_url: link.href,
          file_type: ext,
          file_name: link.href.split('/').pop()
        });
      }
    });
  },

  /* ---------------------------------------------------------------- */
  /*  THEME TOGGLE — moonlight/sunshine preference tracker            */
  /* ---------------------------------------------------------------- */
  trackThemeToggle() {
    if (typeof gtag === 'undefined') return;
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      gtag('event', 'theme_toggle', {
        theme: theme === 'dark' ? 'dark_mode' : 'light_mode',
        timestamp: new Date().toISOString()
      });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  MOBILE MENU — did they find the hamburger?                      */
  /* ---------------------------------------------------------------- */
  trackMobileMenu() {
    if (typeof gtag === 'undefined') return;
    const menuBtn = document.getElementById('menu-toggle');
    if (!menuBtn) return;
    menuBtn.addEventListener('click', () => {
      const mobileMenu = document.getElementById('mobile-menu');
      const isOpen = mobileMenu?.classList.contains('active');
      gtag('event', 'mobile_menu', { 
        action: isOpen ? 'opened' : 'closed',
        device_type: this.getDeviceType()
      });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  FORM SUBMISSIONS — "they actually filled out the form!"         */
  /* ---------------------------------------------------------------- */
  trackFormSubmissions() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('submit', e => {
      const form = e.target.closest('form');
      if (!form) return;
      const action = form.getAttribute('action') || '';
      gtag('event', 'form_submission', {
        form_action: action,
        form_id: form.id,
        page_path: window.location.pathname,
        form_fields: form.querySelectorAll('input, textarea').length
      });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  USER INTERACTION — track various user interactions              */
  /* ---------------------------------------------------------------- */
  trackUserInteraction() {
    if (typeof gtag === 'undefined') return;
    
    // Track video plays if present
    document.addEventListener('play', (e) => {
      if (e.target.tagName === 'VIDEO') {
        gtag('event', 'video_play', {
          video_title: e.target.title || 'unknown',
          page_path: window.location.pathname
        });
      }
    }, true);

    // Track image interactions
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG' && e.target.closest('.glightbox')) {
        gtag('event', 'image_view', {
          image_src: e.target.src,
          image_alt: e.target.alt,
          page_path: window.location.pathname
        });
      }
    });
  },

  /* ---------------------------------------------------------------- */
  /*  PAGE PERFORMANCE — track Core Web Vitals                        */
  /* ---------------------------------------------------------------- */
  trackPagePerformance() {
    if (typeof gtag === 'undefined' || !window.PerformanceObserver) return;

    // Track Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        gtag('event', 'page_performance', {
          metric_name: 'LCP',
          metric_value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
          page_path: window.location.pathname
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP tracking not supported');
    }

    // Track First Input Delay (FID) via Web Vitals
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          gtag('event', 'page_performance', {
            metric_name: 'FID',
            metric_value: Math.round(entry.processingDuration),
            page_path: window.location.pathname
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID tracking not supported');
    }
  },

  /* ---------------------------------------------------------------- */
  /*  ERROR TRACKING — catch and report JavaScript errors             */
  /* ---------------------------------------------------------------- */
  trackErrorTracking() {
    if (typeof gtag === 'undefined') return;
    
    window.addEventListener('error', (event) => {
      gtag('event', 'exception', {
        description: `${event.filename}:${event.lineno}:${event.colno} - ${event.message}`,
        fatal: false
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      gtag('event', 'exception', {
        description: `Unhandled Promise Rejection: ${event.reason}`,
        fatal: false
      });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  CONSENT HANDLERS — for the cookie modal buttons                 */
  /* ---------------------------------------------------------------- */
  grantConsent() {
    localStorage.setItem('cookie-consent', 'accepted');
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      this.trackPageView();
    }
    console.info('🍪 Cookies accepted. Analytics engaged. Nom nom nom.');
  },

  denyConsent() {
    localStorage.setItem('cookie-consent', 'declined');
    console.info('🍪 Cookies declined. Your secrets are safe with us.');
  }
};

// Auto-init — because remembering to call things is hard.
// This runs right after the script loads (defer guarantees DOM is ready).
document.addEventListener('DOMContentLoaded', () => Analytics.init());
