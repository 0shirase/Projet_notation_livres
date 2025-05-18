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
  const formElement = modalWrapper.querySelector("form");

  if (titleAndCloseDiv) titleAndCloseDiv.style.display = "block";

  const inputs = formElement.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
  const photoForm = modalWrapper.querySelector(".photo-upload-form");
  if (photoForm) photoForm.remove();

  imagePreviewContainer.innerHTML = "";
  addPhotoButton.style.display = "block";
  addPhotoButton.textContent = "Ajouter une photo";

  fileInput.value = "";

  addPhotoButton.classList.remove("image-chosen");

  inAddPhotoSection = false;
}
