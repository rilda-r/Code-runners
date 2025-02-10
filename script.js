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