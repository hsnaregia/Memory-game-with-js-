const startButton = document.querySelector(".start_game");
const card = document.querySelectorAll(".card");
const heart = document.querySelectorAll(".health_bar img");
const gamepart = document.querySelector(".game_place");
const deathscreen = document.querySelector(".lost_screen");
const number = document.querySelector(".score");
const reset = document.querySelector(".again_button");
let score_count = 0;
let heartArr = Array.from(heart);
let health_param = heartArr.length;
let start_btn = false;

let flippedCards = [];
let lockBoard = false;

function game() {
  card.forEach((x) => {
    x.addEventListener("click", function () {
      if (lockBoard) return;
      if (this === flippedCards[0]) return;

      const inside = x.querySelector(".image img");
      const imgsrc = inside.getAttribute("src");

      flipCard(inside);

      if (flippedCards.length === 0) {
        flippedCards.push(this);
      } else {
        flippedCards.push(this);

        if (
          flippedCards[0].querySelector(".image img").getAttribute("src") ===
          flippedCards[1].querySelector(".image img").getAttribute("src")
        ) {
          disableCards();
          score();
        } else {
          unflipCards();
          lose_heart();
        }
      }
    });
  });
}

reset.addEventListener("click", function () {
  reset_game();
});
function reset_game() {
  score_count = 0;
  number.innerHTML = score_count;

  heart.forEach((heart) => heart.classList.remove("hide"));
  heartArr = Array.from(heart);

  deathscreen.classList.add("hide");
  gamepart.classList.remove("hide");
  startButton.style.display = "block";
}

function score() {
  score_count = score_count + 200;
  number.innerHTML = score_count;
}

function lose_heart() {
  heartArr.pop();

  if (heartArr.length > 0) {
    heartArr[heartArr.length - 1].classList.add("hide");
  }

  console.log("Remaining hearts:", heartArr.length); // Debugging statement to check remaining hearts

  // Check if all hearts are lost
  if (heartArr.length === 0) {
    gamepart.classList.add("hide");
    deathscreen.classList.remove("hide");
  }
}

function flipCard(card) {
  card.style.display = "block";
}

function disableCards() {
  flippedCards[0].classList.add("card_done");
  flippedCards[1].classList.add("card_done");

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    flippedCards[0].querySelector(".image img").style.display = "none";
    flippedCards[1].querySelector(".image img").style.display = "none";

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [lockBoard] = [false];
  flippedCards = [];
}

document.addEventListener("DOMContentLoaded", function () {
  deathscreen.classList.add("hide");
  startButton.addEventListener("click", function () {
    start_btn = true;
    if (start_btn) {
      startButton.style.display = "none";
      game();
    }
  });
});
