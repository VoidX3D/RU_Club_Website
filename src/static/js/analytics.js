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
/*  VERCEL ANALYTICS — load Vercel Insights (auto-served when enabled)  */
/* ---------------------------------------------------------------- */
const VercelAnalytics = {
  init() {
    window.va = window.va || function(){ (window.vaq = window.vaq || []).push(arguments); };
    const s = document.createElement('script');
    s.defer = true;
    s.src = '/_vercel/insights/script.js';
    document.head.appendChild(s);
    console.info('📈 Vercel Analytics initialized (if enabled in dashboard).');
  }
};

const Analytics = {
  GA_MEASUREMENT_IDS: ['G-HWFPCZ4W1Q', 'G-HJTLGVDNYK'],
  sessionStartTime: Date.now(),
  pageStartTime: Date.now(),

  /* ---------------------------------------------------------------- */
  /*  GET ACTIVE IDS — declined → only primary, accepted → both       */
  /* ---------------------------------------------------------------- */
  getActiveIds() {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') return this.GA_MEASUREMENT_IDS;
    return [this.GA_MEASUREMENT_IDS[0]];
  },

  /* ---------------------------------------------------------------- */
  /*  INIT — loads GA with consent-aware ID set                       */
  /* ---------------------------------------------------------------- */
  init() {
    this.captureUtm();
    VercelAnalytics.init();
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
    this.trackUserProperties();
    this.trackSocialShares();
    this.trackVisibility();
    this.trackClicks();
    this.trackCarousel();
    this.trackGalleryCards();
    this.trackSession();
    this.trackNavigation();
    this.trackTextSelection();
  },

/* ---------------------------------------------------------------- */
/*  LOAD SCRIPT — loads gtag.js for the primary ID, configures all  */
/* ---------------------------------------------------------------- */
loadScript() {
    const ids = this.getActiveIds();
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
            'allow_ad_personalization_signals': true,
            linker: {
                domains: [
                    'ruclubmss.vercel.app'
                ]
            }
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
/*  UTM TRACKING — persist UTM params across session                */
/* ---------------------------------------------------------------- */
captureUtm() {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utmData = {};
    let found = false;

    utmKeys.forEach(key => {
        const val = params.get(key);
        if (val) {
            utmData[key.replace('utm_', '')] = val;
            found = true;
        }
    });

    if (found) {
        sessionStorage.setItem('utm_data', JSON.stringify(utmData));
    }
},

getUtmData() {
    try {
        return JSON.parse(sessionStorage.getItem('utm_data')) || {};
    } catch {
        return {};
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
    else if (path.includes('mission')) pageType = 'mission_detail';
    else if (path.includes('members')) pageType = 'members';
    else if (path.includes('gallery-view')) pageType = 'gallery_view';
    else if (path.includes('gallery')) pageType = 'gallery';
    else if (path.includes('announcements')) pageType = 'announcements';
    else if (path.includes('announcement')) pageType = 'announcement_detail';
    else if (path.includes('contact')) pageType = 'contact';
    else if (path.includes('success')) pageType = 'success';
    else if (path.includes('failed')) pageType = 'failed';
    else if (path.includes('secret-garden')) pageType = 'secret_garden';
    else if (path.includes('privacy')) pageType = 'privacy';
    else if (path.includes('consent')) pageType = 'consent';
    else if (path.includes('license')) pageType = 'license';

    // Check if referrer is our own domain → mark as internal
    let referrerSource = document.referrer || 'direct';
    let trafficMedium = 'none';
    let trafficSource = 'direct';
    try {
        const refUrl = new URL(document.referrer);
        const hostname = refUrl.hostname.replace('www.', '');
        if (refUrl.hostname === window.location.hostname) {
            referrerSource = 'internal';
        } else if (hostname.includes('facebook.com') || hostname.includes('fb.com') || hostname.includes('fb.me')) {
            referrerSource = 'facebook';
            trafficMedium = 'social';
            trafficSource = 'facebook';
        } else if (hostname.includes('instagram.com')) {
            referrerSource = 'instagram';
            trafficMedium = 'social';
            trafficSource = 'instagram';
        } else if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
            referrerSource = 'youtube';
            trafficMedium = 'social';
            trafficSource = 'youtube';
        } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
            referrerSource = 'twitter';
            trafficMedium = 'social';
            trafficSource = 'twitter';
        } else if (hostname.includes('linkedin.com')) {
            referrerSource = 'linkedin';
            trafficMedium = 'social';
            trafficSource = 'linkedin';
        } else if (hostname.includes('t.me') || hostname.includes('telegram.org')) {
            referrerSource = 'telegram';
            trafficMedium = 'social';
            trafficSource = 'telegram';
        } else if (hostname.includes('whatsapp.com')) {
            referrerSource = 'whatsapp';
            trafficMedium = 'social';
            trafficSource = 'whatsapp';
        } else if (hostname.includes('tiktok.com')) {
            referrerSource = 'tiktok';
            trafficMedium = 'social';
            trafficSource = 'tiktok';
        } else if (hostname.includes('reddit.com')) {
            referrerSource = 'reddit';
            trafficMedium = 'social';
            trafficSource = 'reddit';
        } else if (hostname.includes('messenger.com')) {
            referrerSource = 'messenger';
            trafficMedium = 'social';
            trafficSource = 'messenger';
        } else if (hostname.includes('google.')) {
            referrerSource = 'google';
            trafficMedium = 'organic';
            trafficSource = 'google';
        } else if (hostname.includes('bing.com')) {
            referrerSource = 'bing';
            trafficMedium = 'organic';
            trafficSource = 'bing';
        } else if (hostname.includes('yahoo.com')) {
            referrerSource = 'yahoo';
            trafficMedium = 'organic';
            trafficSource = 'yahoo';
        } else if (hostname.includes('duckduckgo.com')) {
            referrerSource = 'duckduckgo';
            trafficMedium = 'organic';
            trafficSource = 'duckduckgo';
        } else if (hostname.includes('yandex.com') || hostname.includes('yandex.ru')) {
            referrerSource = 'yandex';
            trafficMedium = 'organic';
            trafficSource = 'yandex';
        } else {
            referrerSource = hostname;
            trafficMedium = 'referral';
            trafficSource = hostname;
        }
    } catch (_) {}

    const utm = this.getUtmData();
    const eventParams = {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_type: pageType,
        referrer: referrerSource,
        traffic_source: utm.source || trafficSource,
        traffic_medium: utm.medium || trafficMedium,
        user_language: navigator.language,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        device_type: this.getDeviceType()
    };

    // UTM overrides referrer-based source if present
    if (utm.source) eventParams.traffic_source = utm.source;
    if (utm.medium) eventParams.traffic_medium = utm.medium;
    if (utm.campaign) eventParams.traffic_campaign = utm.campaign;
    if (utm.term) eventParams.traffic_term = utm.term;
    if (utm.content) eventParams.traffic_content = utm.content;

    gtag('event', 'page_view', eventParams);

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

    // Track Interaction to Next Paint (INP) via Web Vitals
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          gtag('event', 'page_performance', {
            metric_name: 'INP',
            metric_value: Math.round(entry.duration),
            page_path: window.location.pathname
          });
        });
      });
      inpObserver.observe({ entryTypes: ['event'] });
    } catch (e) {
      console.warn('INP tracking not supported');
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
      // If only primary was loaded, add secondary now
      if (this.GA_MEASUREMENT_IDS.length > 1 && !window._gaSecondaryLoaded) {
        gtag('config', this.GA_MEASUREMENT_IDS[1], {
          send_page_view: false,
          'allow_google_signals': true,
          'allow_ad_personalization_signals': true
        });
        window._gaSecondaryLoaded = true;
      }
      this.trackPageView();
    }
    console.info('🍪 Cookies accepted. Analytics engaged. Nom nom nom.');
  },

  denyConsent() {
    localStorage.setItem('cookie-consent', 'declined');
    console.info('🍪 Cookies declined. Your secrets are safe with us.');
  },

  /* ---------------------------------------------------------------- */
  /*  USER PROPERTIES — rich device & connection profiling            */
  /* ---------------------------------------------------------------- */
  trackUserProperties() {
    if (typeof gtag === 'undefined') return;

    const props = {
      user_language: navigator.language || 'unknown',
      user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      color_depth: window.screen.colorDepth || 'unknown',
      device_memory: navigator.deviceMemory || 'unknown',
      hardware_concurrency: navigator.hardwareConcurrency || 'unknown',
      platform: navigator.platform || 'unknown',
      cookie_enabled: navigator.cookieEnabled,
      do_not_track: navigator.doNotTrack || 'unspecified',
      touch_supported: 'ontouchstart' in window,
      connection_type: 'unknown',
      effective_bandwidth: 'unknown',
      rtt: 'unknown',
      session_count: parseInt(localStorage.getItem('ruclub_session_count') || '0'),
      time_of_day: new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : new Date().getHours() < 21 ? 'evening' : 'night',
      day_of_week: ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][new Date().getDay()],
      is_return_visitor: localStorage.getItem('ruclub_visited_before') === 'true' ? 'returning' : 'new'
    };

    if (navigator.connection) {
      props.connection_type = navigator.connection.effectiveType || 'unknown';
      props.effective_bandwidth = navigator.connection.downlink || 'unknown';
      props.rtt = navigator.connection.rtt || 'unknown';
      navigator.connection.addEventListener('change', () => {
        gtag('event', 'connection_change', {
          connection_type: navigator.connection.effectiveType,
          bandwidth: navigator.connection.downlink,
          rtt: navigator.connection.rtt
        });
      });
    }

    gtag('event', 'user_properties', props);
  },

  /* ---------------------------------------------------------------- */
  /*  SOCIAL SHARES — track share button clicks                       */
  /* ---------------------------------------------------------------- */
  trackSocialShares() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href*="facebook.com/share"], a[href*="twitter.com/share"], a[href*="linkedin.com/share"], a[href*="wa.me"], a[href*="web.whatsapp.com"]');
      if (link) {
        const platform = link.href.includes('facebook') ? 'facebook' :
                         link.href.includes('twitter') || link.href.includes('x.com') ? 'twitter' :
                         link.href.includes('linkedin') ? 'linkedin' : 'whatsapp';
        gtag('event', 'social_share', {
          platform: platform,
          url: link.href,
          page_path: window.location.pathname
        });
      }
    });
  },

  /* ---------------------------------------------------------------- */
  /*  VISIBILITY — track tab focus/blur for engagement                */
  /* ---------------------------------------------------------------- */
  trackVisibility() {
    if (typeof gtag === 'undefined') return;
    let hiddenTime = 0;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        hiddenTime = Date.now();
        gtag('event', 'tab_hidden', { page_path: window.location.pathname });
      } else {
        const away = Math.round((Date.now() - hiddenTime) / 1000);
        gtag('event', 'tab_visible', {
          away_duration: away + 's',
          page_path: window.location.pathname
        });
      }
    });

    window.addEventListener('blur', () => {
      gtag('event', 'window_blur', { page_path: window.location.pathname });
    });

    window.addEventListener('focus', () => {
      gtag('event', 'window_focus', { page_path: window.location.pathname });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  CLICK TRACKING — detailed engagement analytics                  */
  /* ---------------------------------------------------------------- */
  trackClicks() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('click', e => {
      const target = e.target;
      const tag = target.tagName.toLowerCase();
      const id = target.id ? `#${target.id}` : '';
      const classes = target.className ? `.${target.className.split(' ').join('.')}` : '';

      gtag('event', 'click_detail', {
        element_tag: tag,
        element_id: target.id || '(none)',
        element_class: target.className || '(none)',
        element_text: (target.textContent || '').trim().slice(0, 80),
        click_x: e.clientX,
        click_y: e.clientY,
        page_x: e.pageX,
        page_y: e.pageY,
        page_path: window.location.pathname
      });
    }, { passive: true });
  },

  /* ---------------------------------------------------------------- */
  /*  CAROUSEL — track Swiper interactions                            */
  /* ---------------------------------------------------------------- */
  trackCarousel() {
    if (typeof gtag === 'undefined') return;
    const swiperEl = document.querySelector('.parkSwiper');
    if (!swiperEl) return;

    document.addEventListener('click', e => {
      const next = e.target.closest('.swiper-button-next');
      const prev = e.target.closest('.swiper-button-prev');
      if (next || prev) {
        gtag('event', 'carousel_nav', {
          direction: next ? 'next' : 'prev',
          page_path: window.location.pathname
        });
      }
    });

    const slides = swiperEl.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        const img = slide.querySelector('img');
        gtag('event', 'carousel_slide_click', {
          image_alt: img?.alt || 'unknown',
          page_path: window.location.pathname
        });
      });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  GALLERY CARDS — track mission & gallery card interactions       */
  /* ---------------------------------------------------------------- */
  trackGalleryCards() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('click', e => {
      const card = e.target.closest('.gallery-card, .gallery-mission-card');
      if (!card) return;

      const img = card.querySelector('img');
      const title = card.querySelector('.gallery-title, .gallery-mission-title');
      const link = card.querySelector('a[href]');

      gtag('event', 'card_click', {
        card_type: card.classList.contains('gallery-card') ? 'gallery_card' : 'mission_card',
        card_title: title?.textContent?.trim()?.slice(0, 100) || 'unknown',
        card_image: img?.src || '',
        card_link: link?.getAttribute('href') || '',
        page_path: window.location.pathname
      });
    });
  },

  /* ---------------------------------------------------------------- */
  /*  SESSION — increment & track session count                       */
  /* ---------------------------------------------------------------- */
  trackSession() {
    const count = parseInt(localStorage.getItem('ruclub_session_count') || '0');
    localStorage.setItem('ruclub_session_count', (count + 1).toString());
    localStorage.setItem('ruclub_visited_before', 'true');

    const firstVisit = localStorage.getItem('ruclub_first_visit');
    if (!firstVisit) {
      localStorage.setItem('ruclub_first_visit', new Date().toISOString());
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'session_info', {
        session_number: count + 1,
        first_visit: firstVisit || new Date().toISOString(),
        previous_visit: localStorage.getItem('ruclub_last_visit') || 'first_visit',
        pages_this_session: parseInt(sessionStorage.getItem('ruclub_pages_in_session') || '0') + 1
      });
    }

    sessionStorage.setItem('ruclub_pages_in_session',
      (parseInt(sessionStorage.getItem('ruclub_pages_in_session') || '0') + 1).toString());
    localStorage.setItem('ruclub_last_visit', new Date().toISOString());
  },

  /* ---------------------------------------------------------------- */
  /*  NAVIGATION — track internal navigation behavior                 */
  /* ---------------------------------------------------------------- */
  trackNavigation() {
    if (typeof gtag === 'undefined') return;
    document.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      try {
        const url = new URL(link.href);
        if (url.hostname === window.location.hostname || !url.hostname) {
          gtag('event', 'internal_nav', {
            destination: url.pathname,
            link_text: (link.textContent || '').trim().slice(0, 80),
            nav_type: link.closest('.main-nav') ? 'main_nav' :
                     link.closest('.footer-links') ? 'footer' :
                     link.closest('.mobile-menu') ? 'mobile_menu' : 'inline',
            page_path: window.location.pathname
          });
        }
      } catch (_) {}
    });
  },

  /* ---------------------------------------------------------------- */
  /*  TEXT SELECTION — track when users select text (engagement)      */
  /* ---------------------------------------------------------------- */
  trackTextSelection() {
    if (typeof gtag === 'undefined') return;
    let selectionTimeout;
    document.addEventListener('mouseup', () => {
      clearTimeout(selectionTimeout);
      selectionTimeout = setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString()?.trim();
        if (text && text.length > 10) {
          gtag('event', 'text_selection', {
            selected_length: text.length,
            selected_preview: text.slice(0, 100),
            page_path: window.location.pathname
          });
        }
      }, 500);
    });
  }

};

// Auto-init — works regardless of script load timing (async or defer).
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
  Analytics.init();
}
