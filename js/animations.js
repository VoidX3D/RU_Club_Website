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
            let row = null;
            cells.forEach(c => { if (c.textContent.includes('Sincere')) row = c.closest('tr'); });
            if (!row) { setTimeout(poll, 300); return; }

            row.title = '🌿';
            row.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ctext y=\'18\' font-size=\'18\'%3E🌿%3C/text%3E%3C/svg%3E") 12 12, pointer';

            row.addEventListener('dblclick', () => this.burstLeaves(row));

            let lastTap = 0;
            row.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) { this.burstLeaves(row); e.preventDefault(); }
                lastTap = now;
            });
        };
        setTimeout(poll, 300);
    },

    burstLeaves() {
        if (this._bursting) return;
        this._bursting = true;
        console.info('🌿 Easter egg activated!');
        const NS = 'http://www.w3.org/2000/svg';
        const colors = ['#0D9488', '#14B8A6', '#CCFBF1', '#059669', '#34D399', '#A7F3D0'];
        const leaves = [];
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        for (let i = 0; i < 50; i++) {
            const svg = document.createElementNS(NS, 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', colors[Math.floor(Math.random() * colors.length)]);
            svg.setAttribute('stroke-width', '1.5');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.innerHTML = '<path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>';

            const size = 20 + Math.random() * 24;
            const startX = Math.random() * vw;
            const startY = -40 - Math.random() * 60;
            svg.style.cssText = `position:fixed;width:${size}px;height:${size}px;left:${startX}px;top:${startY}px;pointer-events:none;z-index:9999;opacity:1;`;
            document.body.appendChild(svg);
            leaves.push(svg);

            const fallX = (Math.random() - 0.5) * vw * 0.6;
            const fallY = vh + 80 + Math.random() * 100;
            const rot = Math.random() * 1080 - 540;

            svg.offsetHeight;
            svg.style.transition = `all ${1.5 + Math.random() * 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${0.8 + Math.random() * 0.6}s ease`;
            svg.style.transform = `translate(${fallX}px, ${fallY}px) rotate(${rot}deg) scale(${0.5 + Math.random() * 0.8})`;
            svg.style.opacity = '0';
        }

        setTimeout(() => {
            leaves.forEach(l => l.remove());
            this._bursting = false;
        }, 3000);
    }
};