document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const loginForm = document.getElementById("loginForm");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userSection = document.getElementById("userSection");
  const authHeader = document.getElementById("authHeader");
  const authMessage = document.getElementById("authMessage");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userAvatar = document.getElementById("userAvatar");
  const customGoogleBtn = document.getElementById("customGoogleBtn");
  const togglePassword = document.getElementById("togglePassword");
  // Check if user is already logged in
  checkAuthStatus();

  // Event Listeners
  if (loginBtn) {
    loginBtn.addEventListener("click", handleLogin);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  if (customGoogleBtn) {
    customGoogleBtn.addEventListener("click", triggerGoogleSignIn);
  }

  // Functions
  function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // User is logged in
      showUserSection(user);
    } else {
      // User is not logged in
      showLoginForm();
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // In a real app, you would send this to your backend
    // For demo purposes, we'll simulate a successful login
    const user = {
      name: "Demo User",
      email: email,
      avatar: "https://via.placeholder.com/150",
    };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Update UI
    showUserSection(user);
  }

  function handleLogout() {
    // Remove user from localStorage
    localStorage.removeItem("user");

    // Reset form
    if (loginForm) loginForm.reset();

    // Update UI
    showLoginForm();

    // Google signout if needed
    if (window.google && window.google.accounts) {
      google.accounts.id.disableAutoSelect();
      google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
        console.log("Google session revoked");
      });
    }
  }

  function showUserSection(user) {
    // Hide login form
    if (loginForm) loginForm.style.display = "none";
    if (document.querySelector(".button-register"))
      document.querySelector(".button-register").style.display = "none";
    if (document.querySelector(".social-login"))
      document.querySelector(".social-login").style.display = "none";

    // Show user section
    userSection.style.display = "block";

    // Update user info
    userName.textContent = user.name || "User";
    userEmail.textContent = user.email;
    if (user.avatar) {
      userAvatar.src = user.avatar;
      userAvatar.style.display = "block";
    }

    // Update header message
    if (authHeader && authMessage) {
      authHeader.querySelector("h2").textContent = `Welcome back, ${
        user.name.split(" ")[0]
      }!`;
      authMessage.textContent = "You are now logged in to your account.";
    }
  }

  function showLoginForm() {
    // Show login form
    if (loginForm) loginForm.style.display = "block";
    if (document.querySelector(".button-register"))
      document.querySelector(".button-register").style.display = "block";
    if (document.querySelector(".social-login"))
      document.querySelector(".social-login").style.display = "block";

    // Hide user section
    userSection.style.display = "none";

    // Reset header message
    if (authHeader && authMessage) {
      authHeader.querySelector("h2").textContent = "Welcome to E-commerce";
      authMessage.textContent =
        "Thanks for coming back, now get into your account with a simple login through your email and password.";
    }
  }

  // Google Sign-In Functions
  function triggerGoogleSignIn() {
    // Trigger the Google Sign-In flow
    if (window.google && window.google.accounts) {
      google.accounts.id.prompt();
    } else {
      console.error("Google Sign-In library not loaded");
    }
  }

  // This function will be called by Google Sign-In
  window.onGoogleSignIn = function (googleUser) {
    const profile = googleUser.getBasicProfile();
    const user = {
      name: profile.getName(),
      email: profile.getEmail(),
      avatar: profile.getImageUrl(),
      idToken: googleUser.getAuthResponse().id_token,
    };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Update UI
    showUserSection(user);
  };
  function handleLogout() {
    // Remove user from localStorage
    localStorage.removeItem("user");

    // Reload the current page
    window.location.reload();

    // Google signout if needed
    if (window.google && window.google.accounts) {
      google.accounts.id.disableAutoSelect();
      google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
        console.log("Google session revoked");
      });
    }
  }
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      } else {
        passwordInput.type = "password";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      }
    });
  }
});
