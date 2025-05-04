document.addEventListener("DOMContentLoaded", function () {
  // Fetch states from the API
  fetch(
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-united-states-of-america-state/records?limit=100"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const stateSelect = document.getElementById("stateSelect");
      stateSelect.innerHTML =
        '<option selected value="">Select your state...</option>';
      data.results.forEach((state) => {
        const option = document.createElement("option");
        option.value = state.ste_name;
        option.textContent = state.ste_name;
        stateSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching states:", error);
      const stateSelect = document.getElementById("stateSelect");
      stateSelect.innerHTML =
        '<option selected value="">Failed to load states. Please select manually.</option>';
    });
});
