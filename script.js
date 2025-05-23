const signupButton = document.getElementById("signup-button");
const signupModal = document.getElementById("signup-modal");
const closeModalButton = document.getElementById("close-modal");
const modalWrapper = signupModal.querySelector(".modal-wrapper");

let inAddPhotoSection = false;

function openModal() {
  signupModal.style.display = "flex";
  signupModal.setAttribute("aria-hidden", "false");
  inAddPhotoSection = false;
}

function closeModal() {
  signupModal.style.display = "none";
  signupModal.setAttribute("aria-hidden", "true");
  inAddPhotoSection = false;
  resetModal();
}

signupButton.addEventListener("click", openModal);

closeModalButton.addEventListener("click", function () {
  if (inAddPhotoSection) {
    return;
  }
  closeModal();
});

signupModal.addEventListener("click", (e) => {
  if (e.target === signupModal && !inAddPhotoSection) {
    closeModal();
  }
});

const addPhotoButton = document.createElement("button");
addPhotoButton.classList.add("add-photo-button");

const form = signupModal.querySelector("form");
form.prepend(addPhotoButton);

addPhotoButton.textContent = "Ajouter une photo";

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.name = "photo";
fileInput.accept = "image/*";
fileInput.style.display = "none";
form.appendChild(fileInput);

const imagePreviewContainer = document.createElement("div");
imagePreviewContainer.classList.add("image-preview-container");

form.prepend(imagePreviewContainer);

addPhotoButton.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);

    imagePreviewContainer.innerHTML = "";

    const imagePreview = document.createElement("img");
    imagePreview.src = imageUrl;
    imagePreview.alt = "Aperçu de la photo";
    imagePreview.classList.add("image-preview");

    imagePreviewContainer.appendChild(imagePreview);

    addPhotoButton.style.display = "none";

    imagePreviewContainer.addEventListener("click", function () {
      fileInput.click();
    });
  }
});

function resetModal() {
  const titleAndCloseDiv = modalWrapper.querySelector("h2");
  const worksDiv = modalWrapper.querySelector("form");
  const lineDivider = modalWrapper.querySelector("hr");

  if (titleAndCloseDiv) titleAndCloseDiv.style.display = "block";
  if (worksDiv) worksDiv.style.display = "block";
  if (lineDivider) lineDivider.style.display = "block";

  const photoForm = modalWrapper.querySelector(".photo-upload-form");
  if (photoForm) photoForm.remove();

  imagePreviewContainer.innerHTML = "";
  addPhotoButton.style.display = "block";
  inAddPhotoSection = false;
}
