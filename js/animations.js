/**
 * Animations - AOS, GLightbox, scroll animations
 */

const Animations = {
    init() {
        this.initAOS();
        this.initGLightbox();
        this.initScrollObserver();
        this.setupEasterEgg();
    },

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                once: true,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                offset: 40,
                delay: 50,
                disable: 'mobile'
            });
        }
    },

    initGLightbox() {
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true,
                zoomable: true
            });
        }
    },

    initScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    },

    setupEasterEgg() {
        const poll = () => {
            const cells = document.querySelectorAll('td');
            let cell = null;
            cells.forEach(c => { if (c.textContent.includes('Sincere')) cell = c; });
            if (!cell) { setTimeout(poll, 300); return; }

            cell.title = '🌿';
            cell.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ctext y=\'18\' font-size=\'18\'%3E🌿%3C/text%3E%3C/svg%3E") 12 12, pointer';

            cell.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = '/secret-garden';
            });

            let lastTap = 0;
            cell.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) {
                    e.stopPropagation();
                    window.location.href = '/secret-garden';
                    e.preventDefault();
                }
                lastTap = now;
            });
        };
        setTimeout(poll, 300);
    }
};