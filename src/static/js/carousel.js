const Carousel = {
    parkSwiperInstance: null,

    initParkSwiper(slideCount) {
        if (!document.querySelector('.parkSwiper')) return;
        if (typeof Swiper === 'undefined') {
            console.warn('[Carousel] Swiper not loaded — skipping');
            return;
        }

        const shouldLoop = slideCount >= 6;

        this.parkSwiperInstance = new Swiper('.parkSwiper', {
            loop: shouldLoop,
            watchOverflow: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            speed: 800,
            parallax: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 16,
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    centeredSlides: true
                }
            },
            on: {
                init: function() {
                    console.log('[Carousel] initialized');
                }
            }
        });
    }
};
