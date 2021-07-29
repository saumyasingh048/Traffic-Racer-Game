// Importing References from main file for DOM: Document Object Model
const score = document.querySelector("#score");
const startScreen = document.querySelector("#startScreen");
const gamingArea = document.querySelector("#gamingArea");
const btn = document.querySelector(".btn");
let player = { speed: 5, score: 0 };
const hidden = () => {
  startScreen.classList.add("hidden");
};
// Car used for playing
const carDisplay = () => {
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gamingArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
};

// Lines on the road
const roadLinesDisplay = () => {
  for (i = 0; i < 4; i++) {
    let roadLines = document.createElement("div");
    roadLines.setAttribute("class", "roadLines");
    roadLines.y = i * 150;
    roadLines.style.top = roadLines.y + "px";
    gamingArea.appendChild(roadLines);
  }
};
// Enemy Cars on the road
const enemyCarsDisplay = () => {
  let colors = ["blue", "green", "orange", "yellow", "pink", "red", "white"];

  for (i = 0; i < 4; i++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemyCars");
    enemyCar.y = i * 150;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.left = Math.floor(Math.random() * 400) + "px";
    let indexColor = Math.floor(Math.random() * 8);

    let factor = colors[indexColor];

    enemyCar.style.backgroundColor = factor;
    gamingArea.appendChild(enemyCar);
  }
};

// Collision Function
const collision = (car, enemyCar) => {
  let carRect = car.getBoundingClientRect();
  let enemyCarRect = enemyCar.getBoundingClientRect();

  if (
    carRect.top > enemyCarRect.bottom ||
    carRect.left > enemyCarRect.right ||
    carRect.bottom < enemyCarRect.top ||
    carRect.right < enemyCarRect.left
  )
    return false;

  return true;
};

// Moving road lines Animation
const moveLines = () => {
  const lines = document.querySelectorAll(".roadLines");
  lines.forEach((item) => {
    if (item.y > 450) item.y -= 470;
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
};
const scoreBoard = () => {
  score.innerHTML = "Your Score is: " + player.score++;
};
// Moving enemy cars Animation
const moveEnemyCars = (car) => {
  const ememyCars = document.querySelectorAll(".enemyCars");
  ememyCars.forEach((item) => {
    if (collision(car, item)) {
      let finalScore = player.score;
      startScreen.classList.remove("hidden");

      location.reload();
    }
    if (item.y > 480) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 420) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
};
// Using requestAnimationFrame
const animation = () => {
  let car = document.querySelector(".car");
  moveLines();
  moveEnemyCars(car);
  if (keys.ArrowUp && player.y > 80) player.y -= player.speed;
  if (keys.ArrowDown && player.y < 518) player.y += player.speed;
  if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
  if (keys.ArrowRight && player.x < 445) player.x += player.speed;
  car.style.top = player.y + "px";
  car.style.left = player.x + "px";
  window.requestAnimationFrame(animation);

  score.innerHTML = "Your Score is: " + player.score++;
};
const playGame = () => {
  window.requestAnimationFrame(animation);
};
// Audio, when start button is clicked;
const playAudio = () => {
  myAudio = new Audio("audio.mp3");
  if (typeof myAudio.loop == "boolean") {
    myAudio.loop = true;
  } else {
    myAudio.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false,
    );
  }
  myAudio.play();
};

btn.addEventListener("click", hidden);
btn.addEventListener("click", carDisplay);
btn.addEventListener("click", roadLinesDisplay);
btn.addEventListener("click", enemyCarsDisplay);
btn.addEventListener("click", playGame);
btn.addEventListener("click", playAudio);

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
var pressedKey;
const keydown = (e) => {
  e.preventDefault();
  pressedKey = e.key;
  keys[e.key] = true;
};

const keyup = (e) => {
  e.preventDefault();
  keys[e.key] = false;
};
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

// To fetch the dimensions of the gaming area, we are using the method:
// getBoundingClientRect()
// let road = gamingArea.getBoundingClientRect();
