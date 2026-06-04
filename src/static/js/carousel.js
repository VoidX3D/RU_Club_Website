/**
 * Carousel - Swiper initialization
 */

const Carousel = {
    parkSwiperInstance: null,

    initParkSwiper(slideCount) {
        if (!document.querySelector('.parkSwiper')) return;
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper not loaded — skipping carousel init');
            return;
        }

        const shouldLoop = slideCount >= 6;

        this.parkSwiperInstance = new Swiper('.parkSwiper', {
            loop: shouldLoop,
            watchOverflow: true,
            autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
            speed: 600,
            centeredSlides: true,
            slidesPerView: 1,
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

    initPartnerSwiper() {}
};
