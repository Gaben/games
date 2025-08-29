document.addEventListener("DOMContentLoaded", () => {
  const dom = {
    wordDisplay: document.querySelector(".word-display"),
    attemptsLeft: document.querySelector(".attempts-left"),
    guessedLettersList: document.querySelector(".guessed-letters-list"),
    message: document.querySelector(".message"),
    hangmanImage: document.querySelector(".hangman-image img"),
    letterInput: document.querySelector("#letter-input"),
    guessButton: document.querySelector(".guess-button"),
  };

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
  const maxAttempts = 6;

  let secretWord = "";
  let displayedWord = [];
  let guessedLetters = [];
  let attemptsLeft = 0;
  let isGameOver = false;

  function initGame() {
    isGameOver = false;
    secretWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(secretWord.length).fill("_");
    guessedLetters = [];
    attemptsLeft = maxAttempts;

    // Reset UI
    dom.message.textContent = "";
    dom.guessButton.disabled = false;
    dom.letterInput.disabled = false;
    dom.letterInput.value = "";
    updateWordDisplay();
    updateGuessedLetters();
    updateAttempts();
    updateHangmanImage();
  }

  function guessLetter(letter) {
    const upperLetter = letter.toUpperCase();

    if (
      isGameOver ||
      !/^[A-Z]$/.test(upperLetter) ||
      guessedLetters.includes(upperLetter)
    ) {
      return;
    }

    guessedLetters.push(upperLetter);

    if (secretWord.includes(upperLetter)) {
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === upperLetter) {
          displayedWord[i] = upperLetter;
        }
      }
    } else {
      attemptsLeft--;
      updateHangmanImage();
    }

    updateWordDisplay();
    updateGuessedLetters();
    updateAttempts();
    checkGameOver();
  }

  function updateWordDisplay() {
    dom.wordDisplay.innerHTML = displayedWord
      .map((char) => `<span class="letter">${char}</span>`)
      .join("");
  }

  function updateGuessedLetters() {
    dom.guessedLettersList.textContent = guessedLetters.join(", ");
  }

  function updateAttempts() {
    dom.attemptsLeft.textContent = attemptsLeft;
  }

  function updateHangmanImage() {
    const stage = maxAttempts - attemptsLeft;
    dom.hangmanImage.src = `./assets/images/hangman${stage}.png`;
  }

  function checkGameOver() {
    if (displayedWord.join("") === secretWord) {
      dom.message.textContent = "Congratulations! You've guessed the word!";
      isGameOver = true;
    } else if (attemptsLeft <= 0) {
      dom.message.textContent = `Game Over! The word was "${secretWord}".`;
      isGameOver = true;
    }

    if (isGameOver) {
      dom.guessButton.disabled = true;
      dom.letterInput.disabled = true;
    }
  }

  dom.guessButton.addEventListener("click", () => {
    guessLetter(dom.letterInput.value);
    dom.letterInput.value = "";
    dom.letterInput.focus();
  });

  dom.letterInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      guessLetter(dom.letterInput.value);
      dom.letterInput.value = "";
    }
  });

  initGame();
});
