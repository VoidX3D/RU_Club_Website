/**
 * Components - Header/Footer loader + global UI
 * ---------------------------------------------
 * Loads header and footer HTML into placeholders,
 * then injects the cookie consent popup directly
 * into the body (not tied to any component).
 */

const Components = {
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
                <img src="assets/icons/cookie.svg" alt="Cookie" width="32" height="32">
            </div>
            <h3 class="cookie-title">We value your privacy</h3>
            <p class="cookie-text">This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared. <a href="consent.html">Learn more</a></p>
            <div class="cookie-actions">
                <button id="cookie-decline" class="cookie-btn cookie-btn-decline">Decline</button>
                <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accept All</button>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(banner);
    },

    async loadComponents() {
        await Promise.all([
            this.loadComponent('header-placeholder', 'components/header.html'),
            this.loadComponent('footer-placeholder', 'components/footer.html')
        ]);

        this.initAll();
    },

    loadComponent(id, path) {
        return fetch(path)
            .then(res => res.text())
            .then(data => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = data;
            })
            .catch(err => console.error('Component error:', err));
    },

    initAll() {
        Theme.init();
        Navigation.init();
        Animations.init();
        Forms.init();
        this.initScrollTop();
        this.initCookieConsent();
    },

    initScrollTop() {
        const btn = document.getElementById('scroll-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
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

        setTimeout(show, 600);

        const accept = document.getElementById('cookie-accept');
        const decline = document.getElementById('cookie-decline');

        if (accept) {
            accept.addEventListener('click', () => {
                if (typeof Analytics !== 'undefined') Analytics.grantConsent();
                else localStorage.setItem('cookie-consent', 'accepted');
                hide();
            });
        }

        if (decline) {
            decline.addEventListener('click', () => {
                if (typeof Analytics !== 'undefined') Analytics.denyConsent();
                else localStorage.setItem('cookie-consent', 'declined');
                hide();
            });
        }
    }
};