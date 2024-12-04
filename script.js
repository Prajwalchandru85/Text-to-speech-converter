const textarea = document.getElementById("textarea");
const speakBtn = document.getElementById("speakBtn");
const clearBtn = document.getElementById("clearBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const progressBar = document.getElementById("progressBar");
const charCount = document.getElementById("charCount");
const historyList = document.getElementById("historyList");

let isSpeaking = false;


textarea.addEventListener("input", () => {
  charCount.textContent = `Characters: ${textarea.value.length}`;
});

// Function to add to history
const addToHistory = (text) => {
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  listItem.textContent = text;
  historyList.appendChild(listItem);
};

// Text-to-Speech Function
const textToSpeech = () => {
  const synth = window.speechSynthesis;
  const text = textarea.value.trim();

  if (!text) {
    alert("Please enter some text to convert to speech.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  let progress = 0;

  
  synth.speak(utterance);
  isSpeaking = true;

  
  addToHistory(text);

  
  progressBar.style.width = "0%";
  let totalWords = text.split(" ").length;
  let currentWordCount = 0;

  
  utterance.onboundary = (event) => {
    if (event.name === "word") {
      currentWordCount++;
      const percentage = (currentWordCount / totalWords) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  };

  
  utterance.onend = () => {
    isSpeaking = false;
    progressBar.style.width = "100%"; // 
  };
};

// Clear Text Function
const clearText = () => {
  textarea.value = "";
  charCount.textContent = "Characters: 0";
  progressBar.style.width = "0%";
};

// Clear History Function
const clearHistory = () => {
  historyList.innerHTML = ""; // Clears the history list
};

// Event listeners
speakBtn.addEventListener("click", textToSpeech);
clearBtn.addEventListener("click", clearText);
clearHistoryBtn.addEventListener("click", clearHistory);
