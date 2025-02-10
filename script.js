// ✅ Profile Picture Upload
document.getElementById("profileCircle").addEventListener("click", function() {
    document.getElementById("fileInput").click();
});
document.getElementById("fileInput").addEventListener("change", function(event) {
    let reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("profilePic").src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

// ✅ To-Do List Functions
function openToDoList() {
    document.getElementById("todo-popup").style.display = "block";
}
function closeToDoList() {
    document.getElementById("todo-popup").style.display = "none";
}
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let taskText = document.getElementById("taskInput").value.trim();
    if (taskText) {
        let li = document.createElement("li");
        li.textContent = taskText;
        document.getElementById("taskList").appendChild(li);
    }
    document.getElementById("taskInput").value = "";
});
function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
}

// ✅ Diary (Voice Recorder)
function openDiary() {
    document.getElementById("diary-popup").style.display = "block";
}
function closeDiary() {
    document.getElementById("diary-popup").style.display = "none";
}
function startVoiceRecording() {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;
        document.getElementById("voice-output").innerText = "You said: " + text;
        analyzeMood(text);
    };
}

// ✅ Mood Tracker & API Integration
function openMoodTracker() {
    document.getElementById("mood-popup").style.display = "block";
}
function closeMoodTracker() {
    document.getElementById("mood-popup").style.display = "none";
}
async function analyzeMood(text) {
    let response = await fetch("https://api.textanalysis.com/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });
    let data = await response.json();
    let mood = data.mood;
    let emoji = mood === "positive" ? "😊" : mood === "negative" ? "😢" : "😐";
    document.getElementById("mood-output").innerHTML = `Mood Detected: ${mood} ${emoji}`;
}
