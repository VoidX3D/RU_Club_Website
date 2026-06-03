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
        const overlay = document.getElementById('mobile-overlay');

        if (!menuBtn || !mobileMenu) return;

        const open = () => {
            mobileMenu.classList.add('active');
            if (overlay) overlay.classList.add('active');
            menuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const close = () => {
            mobileMenu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            menuBtn.focus();
        };

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                close();
            } else {
                open();
            }
        });

        if (menuClose) {
            menuClose.addEventListener('click', close);
        }

        if (overlay) {
            overlay.addEventListener('click', close);
        }

        mobileMenu.querySelectorAll('.nav-link, .btn-join').forEach(link => {
            link.addEventListener('click', close);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                close();
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
        const path = window.location.pathname.replace(/\/$/, '') || '/';
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
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }, 150);
        });
    }
};
