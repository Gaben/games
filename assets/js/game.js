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
