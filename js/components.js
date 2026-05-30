/**
 * Components - Header/Footer loader
 */

const Components = {
    init() {
        this.loadComponents();
    },

    async loadComponents() {
        await Promise.all([
            this.loadComponent('header-placeholder', 'components/header.html'),
            this.loadComponent('footer-placeholder', 'components/footer.html')
        ]);

        // Initialize all modules after components are loaded
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
        // Initialize all modules
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