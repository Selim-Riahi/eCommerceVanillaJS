// Google Sign-In callback
function onGoogleSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());

  // Send the ID token to your backend
  const id_token = googleUser.getAuthResponse().id_token;

  // Here you would typically send this to your server for verification
  fetch("/api/google-auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: id_token }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle successful authentication
      window.location.href = "/dashboard"; // Redirect after login
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// For the custom button
document.getElementById("customGoogleBtn").addEventListener("click", () => {
  google.accounts.id.prompt();
});

// Initialize Google Auth
function initializeGoogleAuth() {
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    callback: onGoogleSignIn,
    auto_select: false,
  });

  // Optional: Display the One Tap dialog
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkipped()) {
      // Try next method if One Tap isn't displayed
    }
  });
}

// Call initialize when loaded
window.onload = initializeGoogleAuth;
