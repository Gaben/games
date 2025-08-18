const words = [
  "STRUGGLE",
  "OUTREACH",
  "NOTEBOOK",
  "SECURITY",
  "HOSPITAL",
  "MOUNTAIN",
  "SHOULDER",
  "POSSIBLE",
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const maxFails = 6;

let secretWord = "";
let lettersOK = [];
let fails = 0;

function initGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  lettersOK = Array(secretWord.length).fill("_");
  fails = 0;
  document.getElementById("word").textContent = lettersOK.join(" ");
  document.getElementById("fails").textContent = `Fails: ${fails}/${maxFails}`;
  document.getElementById("message").textContent = "";
}

function guessLetter(letter) {
  letter = letter.toUpperCase();
  if (alphabet.includes(letter) && !lettersOK.includes(letter)) {
    if (secretWord.includes(letter)) {
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
          lettersOK[i] = letter;
        }
      }
    } else {
      fails++;
    }
    updateDisplay();
  }
  checkGameOver();

  if (fails >= maxFails) {
    document.getElementById("message").textContent =
      `Game Over! The word was "${secretWord}".`;
    document.getElementById("guessButton").disabled = true;
  } else if (!lettersOK.includes("_")) {
    document.getElementById("message").textContent =
      "Congratulations! You've guessed the word!";
    document.getElementById("guessButton").disabled = true;
  }
}

function updateDisplay() {
  document.getElementById("word").textContent = lettersOK.join(" ");
  document.getElementById("fails").textContent = `Fails: ${fails}/${maxFails}`;
}

function checkGameOver() {
  if (fails >= maxFails) {
    document.getElementById("message").textContent =
      `Game Over! The word was "${secretWord}".`;
    document.getElementById("guessButton").disabled = true;
  } else if (!lettersOK.includes("_")) {
    document.getElementById("message").textContent =
      "Congratulations! You've guessed the word!";
    document.getElementById("guessButton").disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initGame();
  const letterButtons = document.querySelectorAll(".letter-button");
  letterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      guessLetter(button.textContent);
    });
  });

  document.getElementById("guessButton").addEventListener("click", () => {
    const input = document.getElementById("letterInput").value.toUpperCase();
    if (input && alphabet.includes(input)) {
      guessLetter(input);
      document.getElementById("letterInput").value = "";
    }
  });
});
document.getElementById("resetButton").addEventListener("click", () => {
  initGame();
  document.getElementById("guessButton").disabled = false;
  document.getElementById("letterInput").value = "";
  document.getElementById("message").textContent = "";
});
