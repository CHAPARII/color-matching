const gameContainer = document.getElementById("game-container");
const targetColorDisplay = document.getElementById("target-color");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const colorButtons = document.querySelectorAll(".color-button");

let targetColor = "";
let score = 0;

// Generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Set up the game round
function setupRound() {
  // Generate random colors for the buttons
  const colors = Array.from({ length: colorButtons.length }, getRandomColor);

  // Randomly select one color as the target
  targetColor = colors[Math.floor(Math.random() * colors.length)];

  // Display the target color
  targetColorDisplay.textContent = targetColor;

  // Apply colors to the buttons
  colorButtons.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
    button.dataset.color = colors[index];
  });
}

// Handle button clicks
gameContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("color-button")) {
    const selectedColor = e.target.dataset.color;

    if (selectedColor === targetColor) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      setupRound();
    } else {
      alert("Wrong color! Game over.");
      restartButton.style.display = "block";
      gameContainer.style.pointerEvents = "none";
    }
  }
});

// Restart the game
restartButton.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = `Score: 0`;
  restartButton.style.display = "none";
  gameContainer.style.pointerEvents = "auto";
  setupRound();
});

// Start the game
setupRound();
