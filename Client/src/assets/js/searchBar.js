document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const searchIcon = document.querySelector(".clearProduct button");
  const searchInput = document.getElementById("searchInput");
  const logo = document.querySelector(".logo h3");
  const shoppingIcon = document.querySelector(".shopping-icon");
  let isMobile = window.innerWidth < 768;

  // Safe element check
  if (!searchIcon || !searchInput || !logo || !shoppingIcon) {
    console.warn("One or more search elements not found");
    return;
  }

  function openSearch() {
    searchInput.classList.remove("d-none");
    searchInput.focus();
    if (isMobile) {
      logo.style.display = "none";
      shoppingIcon.style.display = "none";
    }
  }

  function closeSearch() {
    if (!isMobile) return;
    searchInput.classList.add("d-none");
    logo.style.display = "block";
    shoppingIcon.style.display = "block";
  }

  function resetSearch() {
    searchInput.value = "";
  }

  function handleSearch() {
    let query = searchInput.value.trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    } else {
      closeSearch();
    }
  }

  // Event listeners
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

  searchInput.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function (event) {
    if (!searchInput.value.trim()) {
      closeSearch();
    } else {
      resetSearch();
    }
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  // Improved resize handler
  function handleResize() {
    isMobile = window.innerWidth < 768;
    if (!isMobile) {
      searchInput.classList.remove("d-none");
      logo.style.display = "block";
      shoppingIcon.style.display = "block";
    } else if (document.activeElement !== searchInput) {
      closeSearch();
    }
  }

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
  });

  // Initialize mobile state
  if (isMobile) {
    closeSearch();
  }
});
