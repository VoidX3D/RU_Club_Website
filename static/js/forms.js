/**
 * Forms - Smooth scroll and form handling with proper data collection
 * Enhanced with validation, analytics, and error handling
 */

const Forms = {
    OLD_FORM_ENDPOINT: 'https://formspree.io/f/xjgzzwej',
    FORM_ENDPOINT: 'https://formspree.io/f/xnjrrwbp',

    init() {
        this.setupSmoothScroll();
        this.setupDualSubmit();
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            errorMessage = 'Please enter a valid email address';
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
            if (!field.nextElementSibling?.classList.contains('error-message')) {
                const errorEl = document.createElement('span');
                errorEl.className = 'error-message';
                errorEl.textContent = errorMessage;
                field.parentNode.insertBefore(errorEl, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            const errorEl = field.parentNode.querySelector('.error-message');
            if (errorEl) errorEl.remove();
        }

        return isValid;
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
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
            console.log(`[Analytics] ${eventName}:`, eventData);
        }
    },

    setupDualSubmit() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const inputs = form.querySelectorAll('input, textarea');
            
            // Validate all fields
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

            try {
                // Track form submission
                this.trackEvent('form_submit_start', {
                    form_name: 'contact_form',
                    timestamp: data.timestamp
                });

                // Submit to primary endpoint
                const response = await fetch(this.FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

                // Check if response is ok (for no-cors, we can't check status directly)
                // So we'll consider any response as success and also submit to backup
                
                // Also submit to backup endpoint
                fetch(this.OLD_FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                }).catch(err => console.error('Backup submission failed:', err));

                // Track successful submission
                this.trackEvent('form_submit_success', {
                    form_name: 'contact_form',
                    email_domain: data.email.split('@')[1]
                });

                // Store submission in localStorage for offline support
                this.storeSubmission(data);

                // Redirect to success page
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
                
                // Redirect to failed page on error
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
