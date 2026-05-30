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

        menuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));

        if (menuClose) {
            menuClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
        }

        mobileMenu.querySelectorAll('.nav-link, .btn-join').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('active'));
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
                    if (mobileMenu) mobileMenu.classList.remove('active');
                }
            }, 150);
        });
    }
};