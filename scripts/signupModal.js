const modal = document.getElementById("signup-modal");
const closeModalBtn = document.getElementById("close-modal");

export function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("active");
}

export function closeModal() {
  const form = document.querySelector(".signup-form");
  const preview = document.getElementById("profile-preview");

  if (form) {
    form.reset();

    if (preview) {
      preview.src = "";
      preview.classList.add("hidden");
    }

    form.classList.remove("has-image");
  }

  modal.classList.remove("active");
  modal.classList.add("hidden");
}

export function setupModalListeners() {
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
