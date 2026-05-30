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
        const leafSVG = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%230D9488%27 stroke-width=%271.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z%27/%3E%3Cpath d=%27M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12%27/%3E%3C/svg%3E';

        const findCell = () => {
            const cells = document.querySelectorAll('td');
            for (const c of cells) {
                if (c.textContent.includes('Sincere')) return c;
            }
            return null;
        };

        const apply = () => {
            const cell = findCell();
            if (!cell) { setTimeout(apply, 200); return; }
            if (cell.dataset.easterEgg) return;
            cell.dataset.easterEgg = '1';
            cell.title = '🌿';
            cell.style.cursor = `url("${leafSVG}") 12 12, pointer`;
        };

        document.addEventListener('click', (e) => {
            const td = e.target.closest('td');
            if (!td || !td.textContent.includes('Sincere')) return;
            e.stopPropagation();
            window.location.href = '/secret-garden';
        });

        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const td = e.target.closest('td');
            if (!td || !td.textContent.includes('Sincere')) return;
            const now = Date.now();
            if (now - lastTap < 300) {
                e.stopPropagation();
                window.location.href = '/secret-garden';
                e.preventDefault();
            }
            lastTap = now;
        });

        apply();
    }
};