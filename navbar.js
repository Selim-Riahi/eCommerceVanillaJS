document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerContent = document.querySelector(".burger-content");

  if (burgerMenu && burgerContent) {
    burgerMenu.addEventListener("click", function () {
      burgerContent.classList.toggle("active");
    });
  } else {
    console.error(
      "Le bouton burger ou le contenu du menu n'a pas été trouvé !"
    );
  }
});
