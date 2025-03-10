document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const closeMenu = document.querySelector(".close-menu");
  const burgerContent = document.querySelector(".burger-content");

  if (burgerMenu && closeMenu && burgerContent) {
    // Ouvrir le menu burger
    burgerMenu.addEventListener("click", function () {
      burgerContent.classList.add("active");
      burgerMenu.style.display = "none"; // Cache le bouton burger
      closeMenu.style.display = "block"; // Affiche le bouton "X"
    });

    // Fermer le menu burger
    closeMenu.addEventListener("click", function () {
      burgerContent.classList.remove("active");
      closeMenu.style.display = "none"; // Cache le bouton "X"
      burgerMenu.style.display = "flex"; // Affiche le bouton burger
    });
  } else {
    console.error("Un ou plusieurs éléments du menu n'ont pas été trouvés !");
  }
});
//fix mobile nav display on desk :fixed
