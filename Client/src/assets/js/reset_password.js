document.addEventListener("DOMContentLoaded", function () {
  const recoverBtn = document.getElementById("recoverBtn");
  const emailInput = document.getElementById("email");

  if (recoverBtn) {
    recoverBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      // Validation de l'email
      if (!email) {
        alert("Veuillez entrer votre adresse email");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Veuillez entrer une adresse email valide");
        return;
      }

      // Simulation d'envoi d'email
      setTimeout(() => {
        // Redirection vers recover.html avec l'email en paramètre
        window.location.href = `recover.html?email=${encodeURIComponent(
          email
        )}`;
      }, 1000);
    });
  }
});
