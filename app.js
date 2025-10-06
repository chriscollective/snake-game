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

window.addEventListener("keydown", changeDirection);
let derction = "Right";
function changeDirection(e) {
  if (e.key == "ArrowLeft" && derction != "Right") {
    derction = "Left";
  } else if (e.key == "ArrowUp" && derction != "Down") {
    derction = "Up";
  } else if (e.key == "ArrowRight" && derction != "Left") {
    derction = "Right";
  } else if (e.key == "ArrowDown" && derction != "Up") {
    derction = "Down";
  }

  //每次按下方向鍵的時候，在下一偵畫面被畫出來之前
  //不接受任何keydown事件
  //可以防止連續按按鍵導致的蛇頭180度轉彎的自殺事件。
  window.removeEventListener("keydown", changeDirection);
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
  window.addEventListener("keydown", changeDirection);
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
