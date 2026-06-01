/**
 * Components - Header/Footer loader + global UI
 * Enhanced with better error handling, caching, and performance
 */

const Components = {
    componentCache: {},
    
    init() {
        this.injectCookieConsent();
        this.loadComponents();
    },

    injectCookieConsent() {
        const overlay = document.createElement('div');
        overlay.id = 'cookie-overlay';
        overlay.className = 'cookie-overlay';

        const banner = document.createElement('div');
        banner.id = 'cookie-consent';
        banner.className = 'cookie-consent';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-modal', 'true');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
            <div class="cookie-icon">
                <img src="/static/assets/icons/cookie.svg" alt="Cookie" width="32" height="32" loading="lazy">
            </div>
            <h3 class="cookie-title">We value your privacy</h3>
            <p class="cookie-text">This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared. <a href="/consent">Learn more</a></p>
            <div class="cookie-actions">
                <button id="cookie-decline" class="cookie-btn cookie-btn-decline">Decline</button>
                <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accept All</button>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(banner);
    },

    async loadComponents() {
        try {
            await Promise.all([
                this.loadComponent('header-placeholder', '/components/header.html'),
                this.loadComponent('footer-placeholder', '/components/footer.html')
            ]);

            this.initAll();
        } catch (error) {
            console.error('Failed to load components:', error);
            // Still init other features even if components fail
            this.initAll();
        }
    },

    loadComponent(id, path) {
        return new Promise((resolve, reject) => {
            const el = document.getElementById(id);
            if (!el) {
                console.warn(`Component placeholder not found: ${id}`);
                resolve();
                return;
            }

            // Check cache first
            if (this.componentCache[path]) {
                el.innerHTML = this.componentCache[path];
                resolve();
                return;
            }

            fetch(path, { 
                signal: AbortSignal.timeout(5000) // 5 second timeout
            })
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.text();
                })
                .then(data => {
                    // Cache the component
                    this.componentCache[path] = data;
                    el.innerHTML = data;
                    resolve();
                })
                .catch(err => {
                    console.error(`Component load error (${path}):`, err);
                    // Provide fallback content
                    el.innerHTML = '<p>Component failed to load</p>';
                    resolve(); // Don't reject to allow other features to continue
                });
        });
    },

    initAll() {
        // Initialize all feature modules
        if (typeof Theme !== 'undefined') Theme.init();
        if (typeof Navigation !== 'undefined') Navigation.init();
        if (typeof Animations !== 'undefined') Animations.init();
        if (typeof Forms !== 'undefined') Forms.init();
        
        this.initScrollTop();
        this.initCookieConsent();
    },

    initScrollTop() {
        const btn = document.getElementById('scroll-top');
        if (!btn) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    btn.classList.toggle('visible', window.scrollY > 400);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    initCookieConsent() {
        const banner = document.getElementById('cookie-consent');
        const overlay = document.getElementById('cookie-overlay');
        if (!banner) return;
        if (localStorage.getItem('cookie-consent')) return;

        const show = () => {
            banner.classList.add('show');
            if (overlay) overlay.classList.add('show');
        };

        const hide = () => {
            banner.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
        };

        // Show banner after 600ms delay
        setTimeout(show, 600);

        const accept = document.getElementById('cookie-accept');
        const decline = document.getElementById('cookie-decline');

        if (accept) {
            accept.addEventListener('click', () => {
                if (typeof Analytics !== 'undefined') {
                    Analytics.grantConsent();
                } else {
                    localStorage.setItem('cookie-consent', 'accepted');
                }
                hide();
            });
        }

        if (decline) {
            decline.addEventListener('click', () => {
                if (typeof Analytics !== 'undefined') {
                    Analytics.denyConsent();
                } else {
                    localStorage.setItem('cookie-consent', 'declined');
                }
                hide();
            });
        }

        // Close banner on overlay click
        if (overlay) {
            overlay.addEventListener('click', hide);
        }
    }
};
