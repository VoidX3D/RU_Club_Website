const Navigation = {
    siteData: null,

    async init(existingData) {
        if (existingData && existingData.nav) {
            this.siteData = existingData;
        } else {
            await this.loadSiteData();
        }
        if (this.siteData && this.siteData.nav) {
            this.renderNav(this.siteData.nav);
        }
        this.setupMobileMenu();
        this.setupHeaderScroll();
        this.setActiveLink();
        this.setupResizeHandler();
    },

    async loadSiteData() {
        try {
            const res = await fetch('/info/site.json');
            this.siteData = await res.json();
        } catch (e) {
            console.warn('Navigation: failed to load site.json', e);
        }
    },

    renderNav(navItems) {
        const desktopContainer = document.getElementById('nav-desktop');
        const mobileContainer = document.getElementById('mobile-menu-body');

        if (desktopContainer) {
            desktopContainer.innerHTML = navItems.map(item =>
                `<a href="${item.href}" class="nav-link" data-nav="">${item.label}</a>`
            ).join('');
        }

        if (mobileContainer) {
            mobileContainer.innerHTML = navItems.map(item =>
                `<a href="${item.href}" class="nav-link" data-nav="">${item.label}</a>`
            ).join('');
        }
    },

    setupMobileMenu() {
        const menuBtn = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-overlay');
        if (!menuBtn || !mobileMenu) return;

        const open = () => {
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            if (overlay) overlay.classList.add('active');
        };

        const close = () => {
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuBtn.setAttribute('aria-expanded', 'false');
            if (overlay) overlay.classList.remove('active');
        };

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.contains('active') ? close() : open();
        });

        if (menuClose) menuClose.addEventListener('click', close);

        mobileMenu.addEventListener('click', (e) => {
            const link = e.target.closest('.nav-link, .btn-join');
            if (link) close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                close();
                menuBtn.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
                close();
            }
        });

        if (overlay) overlay.addEventListener('click', close);
    },

    setupHeaderScroll() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    },

    setActiveLink() {
        const path = window.location.pathname.replace(/\/$/, '');
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            }
        });
    },

    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth >= 768) {
                    const mobileMenu = document.getElementById('mobile-menu');
                    const overlay = document.getElementById('mobile-overlay');
                    const menuBtn = document.getElementById('menu-toggle');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                        mobileMenu.setAttribute('aria-hidden', 'true');
                    }
                    if (overlay) overlay.classList.remove('active');
                    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
                }
            }, 150);
        });
    }
};
