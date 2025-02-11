// Toggle Settings Dropdown
function toggleDropdown() {
    document.getElementById("settingsDropdown").classList.toggle("show");
}
// Dummy User Credentials
const validUsername = "user";
const validPassword = "1234";

// Function to Handle Login
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        localStorage.setItem("isLoggedIn", "true"); // Store login state
        showMainPage();
    } else {
        document.getElementById("loginError").innerText = "Invalid username or password!";
    }
}

// Function to Show Main Page
function showMainPage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
}

// Function to Logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    location.reload();
}

// Check Login State on Page Load
window.onload = function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainPage();
    }
};

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


document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const profilePic = document.getElementById('profilePic');
    const profileCircle = document.getElementById('profileCircle');

    // Trigger file input when the profile circle is clicked
    profileCircle.addEventListener('click', function() {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
                profilePic.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
});
// Load Water Intake from Local Storage
let waterCount = parseInt(localStorage.getItem("waterCount")) || 0;
updateWaterTracker();

// Function to Increase Water Intake
function increaseWater() {
    if (waterCount < 8) {
        waterCount++;
        updateWaterTracker();
        localStorage.setItem("waterCount", waterCount);
    }
}

// Function to Decrease Water Intake
function decreaseWater() {
    if (waterCount > 0) {
        waterCount--;
        updateWaterTracker();
        localStorage.setItem("waterCount", waterCount);
    }
}

// Function to Update Water Tracker Display
function updateWaterTracker() {
    document.getElementById("waterCount").innerText = waterCount;
    let progress = (waterCount / 8) * 100; // Calculate Progress %
    document.getElementById("progressBar").style.width = progress + "%";
}
// Load Tasks from Local Storage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");

    // Create Task Item
    let li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    taskInput.value = ""; // Clear input field

    saveTasks();
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    saveTasks();
}

// Save Tasks to Local Storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskText => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn" onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });
}
// 📊 Sentiment Analysis using API
function analyzeMood() {
    const text = document.getElementById("moodText").value.trim();
    if (!text) {
        alert("Please enter some text for mood analysis!");
        return;
    }

    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const apiUrl = `https://api.textgears.com/sentiment?key=${apiKey}&text=${encodeURIComponent(text)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.response && data.response.score_tag) {
                let mood = data.response.score_tag;
                let moodText = "Neutral";
                let emoji = "😐";

                // Match the sentiment score to a mood & emoji
                if (mood === "P+") { moodText = "Very Positive"; emoji = "😁"; }
                else if (mood === "P") { moodText = "Positive"; emoji = "😊"; }
                else if (mood === "NEU") { moodText = "Neutral"; emoji = "😐"; }
                else if (mood === "N") { moodText = "Negative"; emoji = "😞"; }
                else if (mood === "N+") { moodText = "Very Negative"; emoji = "😢"; }

                // Display the mood & emoji in the Mood Tracker box
                document.getElementById("moodResult").innerText = moodText + " " + emoji;
            } else {
                document.getElementById("moodResult").innerText = "Unable to detect mood ❌";
            }
        })
        .catch(error => {
            console.error("Error fetching mood:", error);
            document.getElementById("moodResult").innerText = "Mood analysis failed ❌";
        });
}
let recognition;
let isRecording = false;

// 🎤 Initialize Speech Recognition
function initializeRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after one sentence
    recognition.interimResults = false; // No partial results
    recognition.lang = "en-US"; // Set language

    recognition.onresult = (event) => {
        const recordedText = event.results[0][0].transcript;
        document.getElementById("recordedText").innerText = recordedText;
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        document.getElementById("recordedText").innerText = "Voice recognition failed ❌";
    };
}

// 🎙 Start Recording
function startRecording() {
    if (!recognition) initializeRecognition();
    if (isRecording) return;

    document.getElementById("recordedText").innerText = "Listening...";
    recognition.start();
    isRecording = true;
}

// 🛑 Stop Recording
function stopRecording() {
    if (recognition && isRecording) {
        recognition.stop();
        isRecording = false;
    }
}