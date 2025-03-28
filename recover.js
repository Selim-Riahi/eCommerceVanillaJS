document.addEventListener("DOMContentLoaded", function () {
  // Récupère l'email depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  // Affiche l'email dans le span
  const emailSpan = document.getElementById("userEmail");
  if (emailSpan && email) {
    emailSpan.textContent = email;
  } else {
    // Redirection si aucun email n'est trouvé
    window.location.href = "reset_password.html";
  }
});
