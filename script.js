// Toggle Settings Dropdown
function toggleDropdown() {
    document.getElementById("settingsDropdown").classList.toggle("show");
}

// Toggle Dark Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// Delete Task Function (if needed)
function deleteTask(button) {
    button.parentElement.remove();
}

// Function to Open Popups
function openPopup(popupId) {
    document.getElementById(popupId).style.display = "block";
    document.getElementById("overlay").style.display = "block"; // Show Overlay
}

// Function to Close Popups
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
    document.getElementById("overlay").style.display = "none"; // Hide Overlay
}

// Attach Click Events to Functional Boxes
document.getElementById("box1").addEventListener("click", () => openPopup("popup1"));
document.getElementById("box2").addEventListener("click", () => openPopup("popup2"));
document.getElementById("box3").addEventListener("click", () => openPopup("popup3"));
document.getElementById("box4").addEventListener("click", () => openPopup("popup4"));

// Speech-to-Text for Diary
let recognition;
function startRecording() {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Your browser does not support speech recognition.");
        return;
    }

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
        document.getElementById("recordedText").innerText = "Listening...";
    };

    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        document.getElementById("recordedText").innerText = "You said: " + transcript;
    };

    recognition.onerror = () => {
        document.getElementById("recordedText").innerText = "Error in recording.";
    };

    recognition.start();
}

function stopRecording() {
    if (recognition) {
        recognition.stop();
        document.getElementById("recordedText").innerText += " (Recording Stopped)";
    }
}
