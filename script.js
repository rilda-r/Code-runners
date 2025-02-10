// 📸 Profile Picture Upload
document.getElementById("profileCircle").addEventListener("click", function() {
    document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profilePic").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 📋 Toggle To-Do List
function toggleToDoList() {
    let container = document.getElementById("toDoContainer");
    container.style.display = (container.style.display === "block") ? "none" : "block";
}

// 🎤 Toggle Diary Section
function toggleDiary() {
    let diary = document.getElementById("diaryContainer");
    diary.style.display = (diary.style.display === "block") ? "none" : "block";
}

// 🎨 Toggle Dark Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// 📋 To-Do List Functionality
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        let li = document.createElement("li");
        li.innerHTML = `${taskText} <button class="delete-button" onclick="deleteTask(this)">❌</button>`;
        document.getElementById("taskList").appendChild(li);
        saveTasks();
    }
    taskInput.value = "";
});

// ❌ Delete Task
function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

// 💾 Save Tasks to Local Storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.textContent.replace("❌", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔄 Load Tasks on Page Load
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(taskText => {
        let li = document.createElement("li");
        li.innerHTML = `${taskText} <button class="delete-button" onclick="deleteTask(this)">❌</button>`;
        document.getElementById("taskList").appendChild(li);
    });

    // Apply saved dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

// ⚙ Show/Hide To-Do Settings
function toggleToDoSettings() {
    let dropdown = document.getElementById("toDoSettings");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

// 📋 Sort Tasks Alphabetically
function sortTasks() {
    let list = document.getElementById("taskList");
    let tasks = Array.from(list.getElementsByTagName("li"));
    tasks.sort((a, b) => a.textContent.localeCompare(b.textContent));
    list.innerHTML = "";
    tasks.forEach(task => list.appendChild(task));
}

// ⚡ Clear All Tasks
function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}

// 🎤 Voice Recording for Diary
let mediaRecorder;
let audioChunks = [];

// Start Recording
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                let audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                let audioUrl = URL.createObjectURL(audioBlob);
                document.getElementById("audioPlayback").src = audioUrl;
            });

            alert("Recording started...");
        })
        .catch(error => console.error("Error accessing microphone: ", error));
}

// Stop Recording
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        alert("Recording stopped!");
    }
}

// 🔄 Load tasks and settings on page load
window.onload = loadTasks;
