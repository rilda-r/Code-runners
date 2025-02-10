// Functionality to open and close the popup
const boxes = document.querySelectorAll('.box');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-btn');
const popupContent = document.getElementById('popup-content');

boxes.forEach(box => {
    box.addEventListener('click', function() {
        popup.style.display = 'block';
        popupContent.value = '';  // Clear content on opening
    });
});

closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});


const profileCircle = document.getElementById("profileCircle");
const fileInput = document.getElementById("fileInput");
const profilePic = document.getElementById("profilePic");
const previewPic = document.getElementById("previewPic");
const saveBtn = document.getElementById("saveBtn");

let offsetX, offsetY, isDragging = false;

// Open file input when clicking the profile circle
profileCircle.addEventListener("click", () => fileInput.click());

// Load selected image
fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePic.src = e.target.result;
            profilePic.style.left = "0px";
            profilePic.style.top = "0px";
        };
        reader.readAsDataURL(file);
    }
});

// Dragging functionality to reposition the image
profilePic.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - profilePic.offsetLeft;
    offsetY = e.clientY - profilePic.offsetTop;
    profilePic.style.cursor = "grabbing";
});

document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;
    profilePic.style.left = `${newX}px`;
    profilePic.style.top = `${newY}px`;
});

document.addEventListener("mouseup", function () {
    isDragging = false;
    profilePic.style.cursor = "grab";
});

// Save and show image in the preview circle
saveBtn.addEventListener("click", function () {
    previewPic.src = profilePic.src;
});
