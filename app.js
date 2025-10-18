const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//getContext() 方法傳回一個物件,該物件提供了用於在畫布上繪圖的方法和屬性。
//drawing context 可以用來在canvas上繪圖。
const unit = 20;
const row = canvas.height / unit; // 320/20 = 16
const column = canvas.width / unit; // 320/20 = 16

let snake = []; //snake中每個的元素都是一個物件
//物件的功能是儲存身體的XY座標

function creatSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };

  snake[1] = {
    x: 60,
    y: 0,
  };

  snake[2] = {
    x: 40,
    y: 0,
  };

  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor(x, y) {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  draw() {
    ctx.fillStyle = "purple";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    let overlapping = false;
    let new_x;
    let new_y;

    function checkOverlapping(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == new_x && snake[i].y == new_y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverlapping(new_x, new_y);
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
  }
}

//初始設定
creatSnake();
let myFruit = new Fruit();

let derction = "Right";
const keyToDirection = {
  ArrowLeft: "Left",
  ArrowUp: "Up",
  ArrowRight: "Right",
  ArrowDown: "Down",
};
const oppositeDirection = {
  Left: "Right",
  Right: "Left",
  Up: "Down",
  Down: "Up",
};
let directionLock = false;

function lockDirectionInputs() {
  directionLock = true;
  window.removeEventListener("keydown", changeDirection);
}

function unlockDirectionInputs() {
  if (!directionLock) {
    return;
  }
  directionLock = false;
  window.addEventListener("keydown", changeDirection);
}

function tryChangeDirection(nextDirection) {
  if (!nextDirection || directionLock) {
    return false;
  }
  if (oppositeDirection[nextDirection] === derction) {
    return false;
  }
  derction = nextDirection;
  lockDirectionInputs();
  return true;
}

function changeDirection(e) {
  const nextDirection = keyToDirection[e.key];
  if (tryChangeDirection(nextDirection)) {
    e.preventDefault();
  }
}

window.addEventListener("keydown", changeDirection);

const controlButtons = document.querySelectorAll(".touch-controls__btn");
if (controlButtons.length > 0) {
  const controlEvents = window.PointerEvent
    ? ["pointerdown"]
    : ["touchstart", "click"];

  const handleControlInput = (event) => {
    event.preventDefault();
    const nextDirection = event.currentTarget.getAttribute("data-direction");
    tryChangeDirection(nextDirection);
  };

  controlButtons.forEach((button) => {
    controlEvents.forEach((eventName) => {
      const options = eventName === "touchstart" ? { passive: false } : undefined;
      button.addEventListener(eventName, handleControlInput, options);
    });

    // 在不支援 PointerEvent 時，確保點擊也能觸發
    if (controlEvents.indexOf("click") === -1) {
      button.addEventListener("click", handleControlInput);
    }
  });
}

let score = 0;
document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
let highestScore = 0;
loadHighestScore();
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;

function draw() {
  //每次畫圖前，確認蛇有沒有咬到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(myGame);
      alert("Game Over");
      return;
    }
  }

  //清除畫布，充新開始新的一偵畫面的意思
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myFruit.draw();
  //繪製蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "gray";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white";

    //判斷是否穿牆
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    } else if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    } else if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    } else if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  //以方向變數direction來決定蛇的移動
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (derction == "Right") {
    snakeX += unit;
  } else if (derction == "Left") {
    snakeX -= unit;
  } else if (derction == "Up") {
    snakeY -= unit;
  } else if (derction == "Down") {
    snakeY += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //蛇頭是否吃到果實
  if (snakeX == myFruit.x && snakeY == myFruit.y) {
    //生成新果實
    myFruit.pickALocation();
    //分數增加
    score++;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
    document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  unlockDirectionInputs();
}

let myGame = setInterval(draw, 57);

function loadHighestScore() {
  if (localStorage.getItem("hihgestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("hihgestScore"));
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem("hihgestScore", highestScore);
  }
}
