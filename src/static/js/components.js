const Components = {
    componentCache: {},
    siteData: null,

    async init() {
        await this.loadSiteData();
        this.injectCookieConsent();
        this.loadComponents();
    },

    async loadSiteData() {
        try {
            const res = await fetch('/info/site.json');
            this.siteData = await res.json();
        } catch (e) {
            console.warn('Components: failed to load site.json', e);
        }
    },

    injectCookieConsent() {
        const data = this.siteData?.cookie || {};
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
            <h3 class="cookie-title">${data.title || 'We value your privacy'}</h3>
            <p class="cookie-text">${data.text || 'This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared.'} <a href="/consent">Learn more</a></p>
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
                this.loadComponent('header-placeholder', '/components/navbar.html'),
                this.loadComponent('footer-placeholder', '/components/footer.html')
            ]);

            this.populateFooter();
            this.initAll();
        } catch (error) {
            console.error('Failed to load components:', error);
            this.initAll();
        }
    },

    populateFooter() {
        if (!this.siteData) return;

        const quickLinksContainer = document.getElementById('footer-quick-links');
        const contactContainer = document.getElementById('footer-contact-info');
        const copyrightEl = document.getElementById('footer-copyright');
        const creditEl = document.getElementById('footer-credit');

        if (quickLinksContainer && this.siteData.footerQuickLinks) {
            quickLinksContainer.innerHTML = this.siteData.footerQuickLinks.map(item =>
                `<li><a href="${item.href}">${item.label}</a></li>`
            ).join('');
        }

        if (contactContainer) {
            const loc = this.siteData.location || {};
            contactContainer.innerHTML = `
                <li><a href="mailto:${this.siteData.email}">${this.siteData.email}</a></li>
                <li><a href="tel:${(this.siteData.phone || '').replace(/\s/g, '')}">${this.siteData.phone}</a></li>
                <li><span class="footer-address"><strong>${loc.school || ''}</strong><br>${loc.ward || ''}<br>${loc.district || ''}, ${loc.province || ''}<br>${loc.country || ''}</span></li>
            `;
        }

        if (copyrightEl) {
            copyrightEl.textContent = `\u00A9 ${this.siteData.copyright || '2026'} ${this.siteData.name || 'RU Club Motherland'}. Managed by ${this.siteData.managedBy || 'Motherland Secondary School'}.`;
        }

        if (creditEl) {
            creditEl.innerHTML = `Made with <span class="footer-heart">\u2661</span> by ${this.siteData.madeBy || 'Sincere Bhattarai'}`;
        }
    },

    loadComponent(id, path) {
        return new Promise((resolve, reject) => {
            const el = document.getElementById(id);
            if (!el) {
                resolve();
                return;
            }

            if (this.componentCache[path]) {
                el.innerHTML = this.componentCache[path];
                resolve();
                return;
            }

            fetch(path, {
                signal: AbortSignal.timeout(5000)
            })
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.text();
                })
                .then(data => {
                    this.componentCache[path] = data;
                    el.innerHTML = data;
                    resolve();
                })
                .catch(err => {
                    console.error(`Component load error (${path}):`, err);
                    el.innerHTML = '<p>Component failed to load</p>';
                    resolve();
                });
        });
    },

    initAll() {
        if (typeof Theme !== 'undefined') Theme.init();
        if (typeof Navigation !== 'undefined') Navigation.init(this.siteData);
        if (typeof Animations !== 'undefined') Animations.init();
        if (typeof Mobile !== 'undefined') Mobile.init();
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

        if (overlay) {
            overlay.addEventListener('click', hide);
        }
    }
};
