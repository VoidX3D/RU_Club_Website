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

    initPartnerSwiper() {} // No-op — replaced by CSS marquee
};
