import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

document.addEventListener("DOMContentLoaded", function () {
  // Main Swiper with all modules
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination, Autoplay], // Explicitly register modules
    loop: true,
    loopAdditionalSlides: 1,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    slidesPerView: 3.75,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3.75,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
    on: {
      init: function () {
        console.log("Main Swiper initialized");
      },
    },
  });

  // Second Swiper
  const swiper2 = new Swiper(".swiper2", {
    modules: [Navigation],
    slidesPerView: 3,
    spaceBetween: 0,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper2__right-button",
      prevEl: ".swiper2__left-button",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3.75,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
    on: {
      init: function () {
        console.log("Second Swiper initialized");
      },
    },
  });

  document.querySelectorAll(".season").forEach((el) => {
    el.textContent = el.textContent.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
  });
});
