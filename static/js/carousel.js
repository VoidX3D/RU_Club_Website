/**
 * Carousel - Swiper initialization
 */

const Carousel = {
    parkSwiperInstance: null,

    initParkSwiper() {
        if (!document.querySelector('.parkSwiper')) return;

        this.parkSwiperInstance = new Swiper('.parkSwiper', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            speed: 600,
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: { el: '.swiper-pagination', clickable: true }
        });
    },

    initPartnerSwiper() {
        if (!document.querySelector('.partnerSwiper')) return;

        new Swiper('.partnerSwiper', {
            slidesPerView: 2,
            spaceBetween: 24,
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
