import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

//Service Swiper
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    autoplay: {
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        540: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 4,
        },
    }
});

//memberCenter Swiper
let dogInfoSwiper = new Swiper(".dogInfoSwiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});