/**
 * Navigation - Mobile menu, header scroll, active link
 */

const Navigation = {
    init() {
        this.setupMobileMenu();
        this.setupHeaderScroll();
        this.setActiveLink();
        this.setupResizeHandler();
    },

    setupMobileMenu() {
        const menuBtn = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!menuBtn || !mobileMenu) return;

        // Toggle menu open/close
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
        });

        // Close menu button
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        }

        // Close menu when clicking links
        mobileMenu.querySelectorAll('.nav-link, .btn-join').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
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
                    const menuBtn = document.getElementById('menu-toggle');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
                }
            }, 150);
        });
    }
};
