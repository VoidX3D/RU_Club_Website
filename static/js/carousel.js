/**
 * Carousel - Swiper initialization
 */

const Carousel = {
    parkSwiperInstance: null,

    initParkSwiper() {
        if (!document.querySelector('.parkSwiper')) return;
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper not loaded — skipping carousel init');
            return;
        }

        this.parkSwiperInstance = new Swiper('.parkSwiper', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
            speed: 600,
            centeredSlides: true,
            slidesPerView: 1.15,
            spaceBetween: 16,
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 'auto', spaceBetween: 30, centeredSlides: true }
            }
        });
    },

    initPartnerSwiper() {
        if (!document.querySelector('.partnerSwiper')) return;
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper not loaded — skipping partner carousel init');
            return;
        }

        new Swiper('.partnerSwiper', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            speed: 4000,
            autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
            breakpoints: {
                480: { slidesPerView: 3, spaceBetween: 24 },
                768: { slidesPerView: 4, spaceBetween: 28 },
                1024: { slidesPerView: 5, spaceBetween: 32 }
            }
        });
    }
};
