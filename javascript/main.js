// Create an array of the symbols to be used
const symbols = ["&#x2630", "&#x2630", "&#x2631", "&#x2631", "&#x2632", "&#x2632", "&#x2633", "&#x2633", "&#x2634", "&#x2634", "&#x2635", "&#x2635", "&#x2636", "&#x2636", "&#x2637", "&#x2637"];
//Destructure the array, so that we can use it without losing the original array when we splice later
const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = symbols;

//Import the necessary elements from the html
let classes = document.getElementsByClassName('grid-item');
let stars = document.getElementsByClassName('starScore');
let scoreCount = document.getElementById('count');
let resetGame = document.getElementById('reset');
let secondStar = document.getElementById('secondStar');
let thirdStar = document.getElementById('thirdStar');
let timer = document.getElementById('timer');
let modal = document.getElementById('modal');
let victoryMessage = document.getElementById('victoryMessage');
let resetButton = document.getElementById('resetButton');

//Initialize some necessary variables
let count = 0;
let firstCard = null;
let matchCount = 0;
let totalTime = null;
let timerVar = null;

//The code to be ran to start the game. Randomly assigning symbols to cards.
function start() {
  let symbolsArray = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
  for (clas of classes) {
    let number = Math.floor(Math.random() * symbolsArray.length);
    clas.innerHTML = `<p>${symbolsArray[number]}</p>`;
    symbolsArray.splice(number, 1);
    clas.firstElementChild.style.display = "none";
  };
  for (star of stars) {
    star.innerHTML = "&#x2605";
  };
}

//The code for flipping cards
function cardFlip(event) {
  //Only accept it if we're clicking on a blank card
  if (event.target.firstElementChild.style.display = "none") {
    event.target.firstElementChild.style.display = "block";
    count = count + 1;
    //Start the timer for the game
    if (count === 1) startTimer();
    if (count % 2 === 1) {
      firstCard = event.target.firstElementChild;
    } else {
      //Compare the revelaed cards to see if they match
      if (firstCard.textContent === event.target.firstElementChild.textContent) {
        firstCard.style.backgroundColor = "blue";
        event.target.firstElementChild.style.backgroundColor = "blue";
        matchCount = matchCount + 1;
        //Endgame condition
        if (matchCount === 8) {
          endGame();
        }
      //Otherwise hide the cards again
      } else {
        setTimeout(function resetCards() {
        firstCard.style.display = "none";
        event.target.firstElementChild.style.display = "none";}, 500);
      }
      //Keep track of the number of turns taken, and remove stars based on that number
      scoreCount.textContent = `Turns: ${count / 2}`;
      if (count === 24) {
        thirdStar.innerHTML = "&#x2606";
      }
      if (count === 32) {
        secondStar.innerHTML = "&#x2606";
      }
    }
  }
}

function startTimer() {
  let secs = 0;
  let mins = 0;
  timerVar = setInterval(function startTime() {
    if (secs === 15) {
      mins = mins + 1;
      secs = 0;
    } else {
      secs = secs + 1;
    }
    seconds = ("0" + secs).slice(-2);
    if (mins === 0) {
      timer.textContent = `Time: ${seconds}`;
    } else {
      timer.textContent = `Time: ${mins}:${seconds}`;
    }
    //Keep track of time since the first card was clicked, for the victory modal
    totalTime = `${mins} Minutes, and ${seconds} Seconds`;
  }, 1000);
}

//Restart the game, either from the reset button, or when the game is won
function restart() {
  modal.style.display = "none";
  scoreCount.textContent = `Turns: 0`;
  count = 0;
  timer.textContent = `Time: `;
  start();
}

//Create and display the victory modal
function endGame() {
  modal.style.display = "block";
  clearInterval(timerVar);
  let starsVar = 0;
  for (star of stars) {
    if (star.innerHTML = "&#x2605") {
      starsVar = starsVar + 1;
    };
  };
  victoryMessage.textContent = `You got ${starsVar} stars, with ${count / 2} moves, in ${totalTime}!`;
}

resetGame.innerHTML = "&#x21bb";
//Event listeners
const grid = document.querySelector('.grid');
grid.addEventListener('click', cardFlip);
resetGame.addEventListener('click', restart);
resetButton.addEventListener('click', restart);

start()
