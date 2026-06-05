const CACHE = 'ruclub-v3';
const STATIC_CACHE = 'ruclub-static-v3';

const PRECACHE_URLS = [
  '/',
  '/static/css/style.css',
  '/static/css/navbar.css',
  '/static/css/responsive.css',
  '/static/js/theme.js',
  '/static/js/navigation.js',
  '/static/js/analytics.js',
  '/static/js/main.js',
  '/static/js/components.js',
  '/static/js/data-loader.js',
  '/static/js/missions.js',
  '/static/js/announcements.js',
  '/static/js/carousel.js',
  '/static/js/animations.js',
  '/static/js/forms.js',
  '/static/js/mobile.js',
  '/static/assets/brand/logo.png',
  '/static/assets/brand/logo_icon.png'
];

const HTML_URLS = [
  '/announcements',
  '/contact',
  '/missions',
  '/members',
  '/gallery',
  '/privacy',
  '/consent',
  '/license',
  '/secret-garden',
  '/404',
  '/failed',
  '/success',
  '/mission',
  '/announcement'
];

// Precache core assets on install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      // Prefetch HTML pages in background
      return caches.open(CACHE).then(cache => {
        return Promise.allSettled(
          HTML_URLS.map(url =>
            fetch(url).then(r => {
              if (r.ok) cache.put(url, r);
            }).catch(() => {})
          )
        );
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE && k !== STATIC_CACHE)
          .map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external requests (Google Analytics, fonts, etc.)
  if (request.method !== 'GET') return;
  if (url.origin !== location.origin) {
    // Cache external fonts and third-party assets
    if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
      event.respondWith(cacheFirst(request));
    }
    return;
  }

  const path = url.pathname;

  // HTML pages: Network First with cache fallback
  if (path.endsWith('.html') || !path.match(/\.\w+$/) || path === '/') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets (CSS, JS, images, JSON): Network First (cache fallback when offline)
  if (path.match(/\.(css|js|json|jpg|jpeg|png|webp|gif|svg|ico|woff2?)$/)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return await caches.match(request);
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Return offline page for HTML navigation
    if (request.headers.get('Accept')?.includes('text/html')) {
      return new Response(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Offline | RU Club Motherland</title><style>body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0a0a0a;color:#fff;text-align:center;padding:2rem}h1{font-size:2.5rem;margin-bottom:0.5rem}p{color:#aaa;margin-bottom:2rem}.btn{display:inline-block;padding:0.75rem 2rem;background:#0D9488;color:#fff;text-decoration:none;border-radius:8px}</style></head><body><div><h1>You're Offline</h1><p>Some pages may not be available without an internet connection.</p><a href="/" class="btn">Go Home</a></div></body></html>`,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }
    return new Response('Offline', { status: 503 });
  }
}
