const Mobile = {
    isMobile: false,

    init() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || window.innerWidth < 768;

        if (this.isMobile) {
            this.optimizeAnimations();
            this.fixTouchInteractions();
            this.disableHeavyEffects();
        }
        console.log('[Mobile] initialized' + (this.isMobile ? ' (mobile mode)' : ''));
    },

    optimizeAnimations() {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.pointerEvents = 'auto';
        });
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    },

    fixTouchInteractions() {
        document.querySelectorAll('.nav-link, .btn-join, .gallery-card').forEach(el => {
            el.addEventListener('touchstart', () => {}, { passive: true });
        });
    },

    disableHeavyEffects() {
        document.querySelectorAll('[data-parallax]').forEach(el => {
            el.style.transform = 'none';
        });
        document.querySelectorAll('.hero-shape, .hero-shape-1, .hero-shape-2, .hero-shape-3').forEach(el => {
            el.style.animation = 'none';
        });
    }
};
