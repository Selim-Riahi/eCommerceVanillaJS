document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
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
  });
  //uppercase each lettre of a paragraph
  document.querySelectorAll(".season").forEach((el) => {
    el.textContent = el.textContent.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
  });
});
//swiper2
var swiper2 = new Swiper(".swiper2", {
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
});
//burger nav
