/**
 * Forms - Smooth scroll and form handling with proper data collection
 * Enhanced with validation, analytics, and error handling
 */

const Forms = {
    FORM_ENDPOINT: 'https://formspree.io/f/xnjrrwbp',

    init() {
        this.setupSmoothScroll();
        this.setupSubmit();
        this.setupFormValidation();
        this.setupAnalyticsTracking();
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

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.type === 'email') {
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!this.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address (e.g. you@example.com)';
            }
        } else if (field.name === 'name') {
            isValid = value.length >= 2;
            errorMessage = 'Name must be at least 2 characters';
        } else if (field.name === 'message') {
            isValid = value.length >= 10;
            errorMessage = 'Message must be at least 10 characters';
        } else if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        if (!isValid) {
            field.classList.add('error');
            const existing = field.parentNode.querySelector('.error-message');
            if (!existing) {
                const errorEl = document.createElement('span');
                errorEl.className = 'error-message';
                errorEl.textContent = errorMessage;
                field.parentNode.insertBefore(errorEl, field.nextSibling);
            } else {
                existing.textContent = errorMessage;
            }
        } else {
            field.classList.remove('error');
            const errorEl = field.parentNode.querySelector('.error-message');
            if (errorEl) errorEl.remove();
        }

        return isValid;
    },

    isValidEmail(email) {
        // Stripped-down practical check: must look like a real email, not just valid format
        if (email.length > 254) return false;
        const parts = email.split('@');
        if (parts.length !== 2) return false;
        const [local, domain] = parts;
        if (local.length < 2 || local.length > 64) return false;
        if (domain.length < 4 || domain.length > 255) return false;
        // Must have at least one dot in domain with a proper TLD
        const domainParts = domain.split('.');
        if (domainParts.length < 2) return false;
        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2 || tld.length > 6) return false;
        // TLD must be only letters
        if (!/^[a-z]{2,6}$/i.test(tld)) return false;
        // Reject obviously fake domains
        const fakeDomains = ['example.com', 'test.com', 'domain.com', 'email.com', 'mail.com', 'fake.com', 'dummy.com', 'yopmail.com', 'tempmail.com'];
        if (fakeDomains.includes(domain.toLowerCase())) return false;
        // Local part must not start/end with dot or have consecutive dots
        if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
        // Domain must not start/end with dot or have consecutive dots
        if (domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) return false;
        // Final format regex check
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(email);
    },

    setupAnalyticsTracking() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Track form interactions
        form.addEventListener('focus', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.trackEvent('form_field_focus', {
                    field_name: e.target.name,
                    field_type: e.target.type
                });
            }
        }, true);
    },

    trackEvent(eventName, eventData = {}) {
        // Send to Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`[Analytics] ${eventName}:`, eventData);
        }
    },

    setupSubmit() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const inputs = form.querySelectorAll('input, textarea');
            
            let allValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    allValid = false;
                }
            });

            if (!allValid) {
                this.trackEvent('form_validation_failed', {
                    form_name: 'contact_form'
                });
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Sending...';

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer,
                language: navigator.language
            };

            this.trackEvent('form_submit_start', {
                form_name: 'contact_form',
                timestamp: data.timestamp
            });

            try {
                const response = await fetch(this.FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                const result = await response.json();

                if (!result.ok) {
                    throw new Error(result.error || 'Formspree returned error');
                }

                this.trackEvent('form_submit_success', {
                    form_name: 'contact_form',
                    email_domain: data.email.split('@')[1]
                });

                this.storeSubmission(data);

                setTimeout(() => {
                    window.location.href = '/success';
                }, 500);

            } catch (error) {
                console.error('Form submission error:', error);
                this.trackEvent('form_submit_error', {
                    form_name: 'contact_form',
                    error_message: error.message
                });

                btn.disabled = false;
                btn.textContent = 'Send Message';
                
                setTimeout(() => {
                    window.location.href = '/failed';
                }, 500);
            }
        });
    },

    storeSubmission(data) {
        try {
            const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
            submissions.push(data);
            // Keep only last 10 submissions
            if (submissions.length > 10) {
                submissions.shift();
            }
            localStorage.setItem('contact_submissions', JSON.stringify(submissions));
        } catch (e) {
            console.warn('Could not store submission:', e);
        }
    }
};
