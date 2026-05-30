/**
 * Analytics - Google Analytics 4 (GA4)
 * ------------------------------------
 * "Why did the developer go broke? Because he used up all his cache."
 *
 * Centralized GA4 — change the ID once, it works everywhere.
 * Tracks page views, outbound clicks, scroll depth, CTA clicks,
 * downloads, theme toggles, mobile menu, and form submissions.
 *
 * To disable: just delete the GA_MEASUREMENT_ID below.
 * To enable: it's already enabled. You're welcome.
 */

const Analytics = {
  GA_MEASUREMENT_ID: 'G-7ZT4XY1D1B',

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
    const id = this.GA_MEASUREMENT_ID;
    if (!id || id === 'G-XXXXXXXXXX') {
      console.info('📊 GA4 placeholder detected — no data sent. Drop your real ID in and watch the magic.');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };

    gtag('consent', 'default', { analytics_storage: 'denied' });
    gtag('js', new Date());
    gtag('config', id, { send_page_view: false });
    console.info('📊 GA4 loaded — big brother is watching (anonymously).');
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
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
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
                page_path: window.location.pathname
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
        gtag('event', 'time_on_page', {
          engagement_time: seconds + 's',
          page_path: window.location.pathname
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
      const url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        gtag('event', 'click', {
          event_category: 'outbound',
          event_label: url.href,
          transport_type: 'beacon'
        });
      }
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
      if (['pdf', 'zip', 'doc', 'docx', 'xls', 'xlsx', 'csv'].includes(ext)) {
        gtag('event', 'download', {
          file_url: link.href,
          file_type: ext
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
        theme: theme === 'dark' ? 'dark_mode' : 'light_mode'
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
      gtag('event', 'mobile_menu', { action: 'opened' });
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
        page_path: window.location.pathname
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
