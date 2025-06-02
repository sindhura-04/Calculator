// Select elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

// Append clicked button value to display
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (value) {
      display.value += value;
    }
  });
});

// Clear the display
clearButton.addEventListener("click", () => {
  display.value = "";
});

// Calculate the result (used for button and keyboard input)
function calculate() {
  try {
    const input = display.value;
    const result = eval(input);
    display.value = result;

    saveToHistory(input + " = " + result);
    showHistory();
  } catch {
    display.value = "Error";
  }
}

// Use calculate() when equals button is clicked
equalsButton.addEventListener("click", calculate);

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[\d+\-*/.]/.test(key)) {
    display.value += key;
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    display.value = "";
  }
});

// Save to localStorage
function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(entry);
  history = history.slice(0, 10); // Keep only last 10 entries
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

// Show history in UI
function showHistory() {
  const historyList = document.getElementById("history-list");
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Clear history
function clearHistory() {
  localStorage.removeItem("calcHistory");
  showHistory();
}

// Initial load
showHistory();
