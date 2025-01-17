let gameState = "start";
let paddle_1 = document.querySelector(".paddle_1");
let paddle_2 = document.querySelector(".paddle_2");
let board = document.querySelector(".board");
let initial_ball = document.querySelector(".ball");
let ball = document.querySelector(".ball");
let score_1 = document.querySelector(".player_1_score");
let score_2 = document.querySelector(".player_2_score");
let message = document.querySelector(".message");
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector(".paddle").getBoundingClientRect();
let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);
let startSlow = false;
let startMedium = false;
let startFast = false;
let gameOver = false;
document.addEventListener("keydown", (e) => {
  if (!gameOver) {
    if (e.key == "Enter") {
      if (startSlow) {
        speed = 0.5;
        startMedium = false;
        startFast = false;
      }
      if (startMedium) {
        speed = 1;
        startSlow = false;
        startFast = false;
      }
      if (startFast) {
        speed = 1.2;
        startSlow = false;
        startMedium = false;
      }
      gameState = gameState == "start" ? "play" : "start";
      if (gameState == "play") {
        message.innerHTML = "10 points to win";
        message.style.left = 42 + "vw";
        requestAnimationFrame(() => {
          dx = Math.floor(Math.random() * 4) + 3;
          dy = Math.floor(Math.random() * 4) + 3;
          dxd = Math.floor(Math.random() * 2);
          dyd = Math.floor(Math.random() * 2);
          moveBall(dx, dy, dxd, dyd, speed);
        });
      }
    }

    //Key set
    if (gameState == "play") {
      if (e.key == "w") {
        paddle_1.style.top =
          Math.max(
            board_coord.top,
            paddle_1_coord.top - window.innerHeight * 0.06
          ) + "px";
        paddle_1_coord = paddle_1.getBoundingClientRect();
      }
      if (e.key == "s") {
        paddle_1.style.top =
          Math.min(
            board_coord.bottom - paddle_common.height,
            paddle_1_coord.top + window.innerHeight * 0.06
          ) + "px";
        paddle_1_coord = paddle_1.getBoundingClientRect();
      }

      if (e.key == "ArrowUp") {
        paddle_2.style.top =
          Math.max(
            board_coord.top,
            paddle_2_coord.top - window.innerHeight * 0.1
          ) + "px";
        paddle_2_coord = paddle_2.getBoundingClientRect();
      }
      if (e.key == "ArrowDown") {
        paddle_2.style.top =
          Math.min(
            board_coord.bottom - paddle_common.height,
            paddle_2_coord.top + window.innerHeight * 0.1
          ) + "px";
        paddle_2_coord = paddle_2.getBoundingClientRect();
      }
    }
  }
});

function moveBall(dx, dy, dxd, dyd, speed) {
  if (ball_coord.top <= board_coord.top) {
    dyd = 1;
  }
  if (ball_coord.bottom >= board_coord.bottom) {
    dyd = 0;
  }
  if (
    ball_coord.left <= paddle_1_coord.right &&
    ball_coord.top >= paddle_1_coord.top &&
    ball_coord.bottom <= paddle_1_coord.bottom
  ) {
    dxd = 1;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.right >= paddle_2_coord.left &&
    ball_coord.top >= paddle_2_coord.top &&
    ball_coord.bottom <= paddle_2_coord.bottom
  ) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.left <= board_coord.left ||
    ball_coord.right >= board_coord.right
  ) {
    if (ball_coord.left <= board_coord.left) {
      score_2.innerHTML = +score_2.innerHTML + 1;
      if (score_2.innerHTML == "10") {
        startSlow = false;
        startMedium = false;
        startFast = false;
        message.innerHTML =
          'Right side player wins!<button onclick="resetBtn()" id="reset">Reset</button>';
        score_2.innerHTML = "0";
        score_1.innerHTML = "0";
        gameState = "stop";
        gameOver = true;
        return;
      }
    } else {
      score_1.innerHTML = +score_1.innerHTML + 1;
      if (score_1.innerHTML == "10") {
        startSlow = false;
        startMedium = false;
        startFast = false;
        message.innerHTML =
          'Left side player wins!<button onclick="resetBtn()" id="reset">Reset</button>';
        score_2.innerHTML = "0";
        score_1.innerHTML = "0";
        gameState = "stop";
        gameOver = true;
        return;
      }
    }

    gameState = "play";

    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;
    message.innerHTML = "Press Enter to Play Pong";
    message.style.left = 38 + "vw";
    return;
  }

  ball.style.top = ball_coord.top + dy * (dyd == 0 ? -speed : speed) + "px";
  ball.style.left = ball_coord.left + dx * (dxd == 0 ? -speed : speed) + "px";
  ball_coord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd, speed);
  });
}
const slow = document.getElementById("slow");
const medium = document.getElementById("medium");
const fast = document.getElementById("fast");

function resetBtnshow() {
  document.getElementById("resetDiv").classList.remove("hide");
  document.getElementById("resetDiv").classList.add("show");
}
function showhide() {
  console.log("helo");
  document.getElementById("btns").classList.add("hide");
  document.getElementById("board").classList.remove("hide");
  document.getElementById("board").classList.add("show");
}

slow.addEventListener("click", (e) => {
  startSlow = true;
  startMedium = false;
  startFast = false;
  showhide();
});
medium.addEventListener("click", (e) => {
  startMedium = true;
  startSlow = false;
  startFast = false;
  showhide();
});
fast.addEventListener("click", (e) => {
  startMedium = false;
  startSlow = false;
  startFast = true;
  showhide();
});

function resetBtn() {
  window.location.reload();
}
