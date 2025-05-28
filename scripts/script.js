import { openModal, setupModalListeners } from "./signupModal.js";

document.addEventListener("DOMContentLoaded", () => {
  const openSignupBtn = document.getElementById("signup-button");

  if (openSignupBtn) {
    openSignupBtn.addEventListener("click", openModal);
  }

  setupModalListeners();

  const profileInput = document.getElementById("profile-picture");
  const preview = document.getElementById("profile-preview");
  const form = document.querySelector(".signup-form");

  if (profileInput && preview && form) {
    profileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (event) {
          preview.src = event.target.result;
          preview.classList.remove("hidden");
          form.classList.add("has-image");
        };

        reader.readAsDataURL(file);
      } else {
        preview.src = "";
        preview.classList.add("hidden");
        form.classList.remove("has-image");
      }
    });
  }
});
