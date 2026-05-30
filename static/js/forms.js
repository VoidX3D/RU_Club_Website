/**
 * Forms - Smooth scroll and form handling
 */

const Forms = {
    OLD_FORM_ENDPOINT: 'https://formspree.io/f/xjgzzwej',

    init() {
        this.setupSmoothScroll();
        this.setupDualSubmit();
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    },

    setupDualSubmit() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            btn.disabled = true;
            btn.textContent = 'Sending...';

            const data = new FormData(form);

            const results = await Promise.allSettled([
                fetch(form.action, { method: 'POST', body: data, mode: 'no-cors' }),
                fetch(this.OLD_FORM_ENDPOINT, { method: 'POST', body: data, mode: 'no-cors' })
            ]);

            const allOk = results.every(r => r.status === 'fulfilled');
            window.location.href = allOk ? 'success.html' : 'failed.html';
        });
    }
};