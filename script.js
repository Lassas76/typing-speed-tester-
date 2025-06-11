const quotes = [
  "Typing fast takes practice and patience.",
  "Accuracy matters more than speed.",
  "Every expert was once a beginner.",
  "Stay focused and type without distractions.",
  "Never give up on self-improvement."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let startTime, timerInterval, currentQuote = "";

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function renderQuote(quote) {
  quoteDisplay.innerHTML = "";
  quote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteDisplay.appendChild(span);
  });
}

function startTypingTest() {
  currentQuote = getRandomQuote();
  renderQuote(currentQuote);
  quoteInput.value = "";
  quoteInput.disabled = false;
  quoteInput.focus();
  startTime = new Date();
  timeDisplay.innerText = "0s";
  wpmDisplay.innerText = "0";
  accuracyDisplay.innerText = "0%";
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    timeDisplay.innerText = `${elapsed}s`;
  }, 1000);
}

function endTest() {
  clearInterval(timerInterval);
  const timeTaken = (new Date() - startTime) / 1000 / 60; // minutes
  const wordsTyped = quoteInput.value.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / timeTaken);
  wpmDisplay.innerText = isNaN(wpm) ? "0" : wpm;

  const inputChars = quoteInput.value.trim();
  let correct = 0;
  currentQuote.split("").forEach((char, i) => {
    if (inputChars[i] === char) correct++;
  });

  const accuracy = Math.round((correct / currentQuote.length) * 100);
  accuracyDisplay.innerText = isNaN(accuracy) ? "0%" : `${accuracy}%`;
}

quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const arrayInput = quoteInput.value.split("");

  let complete = true;

  arrayQuote.forEach((charSpan, index) => {
    const char = arrayInput[index];
    if (char == null) {
      charSpan.classList.remove("correct", "incorrect");
      complete = false;
    } else if (char === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      complete = false;
    }
  });

  if (complete) {
    quoteInput.disabled = true;
    endTest();
  }
});

startBtn.addEventListener("click", startTypingTest);
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  quoteDisplay.innerHTML = "";
  quoteInput.value = "";
  quoteInput.disabled = true;
  timeDisplay.innerText = "0s";
  wpmDisplay.innerText = "0";
  accuracyDisplay.innerText = "0%";
});
