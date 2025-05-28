const modal = document.getElementById("signup-modal");
const closeModalBtn = document.getElementById("close-modal");

export function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("active");
}

export function closeModal() {
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
