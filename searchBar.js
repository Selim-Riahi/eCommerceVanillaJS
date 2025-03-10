document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".clearProduct button"); // Icône 🔍
  const searchInput = document.getElementById("searchInput"); // Champ de recherche
  const logo = document.querySelector(".logo h3"); // Logo du site
  const shoppingIcon = document.querySelector(".shopping-icon"); // Icône shopping
  let isMobile = window.innerWidth < 768;

  function openSearch() {
    searchInput.classList.remove("d-none");
    searchInput.focus();
    if (isMobile) {
      logo.style.display = "none"; // Cacher le logo en mobile
      shoppingIcon.style.display = "none"; // Cacher l'icône shopping en mobile
    }
  }

  function closeSearch() {
    if (isMobile) {
      searchInput.classList.add("d-none"); // Cacher l'input en mobile
      logo.style.display = "block"; // Réafficher le logo
      shoppingIcon.style.display = "block"; // Réafficher l'icône shopping
    }
  }

  function resetSearch() {
    searchInput.value = ""; // Effacer le texte
  }

  function handleSearch() {
    let query = searchInput.value.trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`; // Aller à la page de recherche
    } else {
      closeSearch(); // Fermer l’input si vide
    }
  }

  // 🔍 Clic sur l'icône : ouvrir/fermer l'input
  searchIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    if (
      searchInput.classList.contains("d-none") ||
      document.activeElement !== searchInput
    ) {
      openSearch();
    } else {
      handleSearch();
    }
  });

  // ✏️ Focus sur l'input (évite la fermeture immédiate)
  searchInput.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // 🎯 Clic en dehors : fermer seulement si input vide
  document.addEventListener("click", function (event) {
    if (!searchInput.value.trim()) {
      closeSearch();
    } else {
      resetSearch(); // Effacer le texte si on clique ailleurs
    }
  });

  // ⏎ Appui sur "Entrée" : Rechercher ou fermer
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  // 📏 Adapter à la taille de l’écran
  window.addEventListener("resize", function () {
    isMobile = window.innerWidth < 768;
    if (!isMobile) {
      searchInput.classList.remove("d-none"); // Toujours visible en desktop
      logo.style.display = "block";
      shoppingIcon.style.display = "block";
    } else {
      closeSearch(); // Revenir au mode mobile
    }
  });
});
