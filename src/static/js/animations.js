/**
 * Animations - AOS, GLightbox, scroll animations
 * Enhanced for mobile with proper performance optimization
 */

const Animations = {
    init() {
        this.initAOS();
        this.initGLightbox();
        this.initScrollObserver();
        this.setupParallaxEffects();
    },

    initAOS() {
        if (typeof AOS !== 'undefined') {
            // Detect if device is mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            AOS.init({
                duration: isMobile ? 400 : 600,
                once: true,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                offset: isMobile ? 20 : 40,
                delay: 50,
                disable: false, // Enable animations on mobile with optimized settings
                mirror: false,
                anchorPlacement: 'top-bottom',
                startEvent: 'DOMContentLoaded'
            });
            
            // Refresh AOS after dynamic content loads
            window.addEventListener('load', () => {
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
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
                zoomable: true,
                draggable: true
            });
        }
    },

    initScrollObserver() {
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Trigger custom scroll event for parallax
                    entry.target.dispatchEvent(new CustomEvent('scrollIntoView', { detail: entry }));
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up, [data-aos]').forEach(el => {
            observer.observe(el);
        });
    },

    setupParallaxEffects() {
        // Lightweight parallax for hero section on scroll
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (parallaxElements.length === 0) return;

        let ticking = false;
        const updateParallax = () => {
            const scrollY = window.scrollY;
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const offset = scrollY * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    },

    setupEasterEgg() {
        // Easter egg removed — secret garden is now accessed directly
    }
};
