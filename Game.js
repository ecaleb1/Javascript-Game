var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var paddleHeight = 20;
var paddleWidth = 20;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = (canvas.height - paddleHeight) / 2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var rightCollide = true;
var leftCollide = true;
var downCollide = true;
var upCollide = true;
var Xmax = 200;
var Xmin = -200;
var Ymax = 200;
var Ymin = -200;
var cameraX = 0;
var cameraY = 0;
var platYadjust = 0;
var platXadjust = 0;
//stage indexes: [0]=X [1]=Y [2]=Width [3]=Height
var stage1 = [0, 270, 500, 10];

//The following two lines listen to see if you have pressed a key.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//The debug function displays the value of a variable as text while I test my game. This makes it easier to find the cause of bugs.
function debug() {
      document.getElementById("myText").innerHTML = cameraY;
    }
//If a key is pressed, the function keyDownHandler will find which key was pressed.
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {  //Check if the Right Arrow key is pressed; Adjust rightPressed variable
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
	if (e.key === "Up" || e.key === "ArrowUp") {
		upPressed = true;
	}
	else if (e.key === "Down" || e.key === "ArrowDown") {
		downPressed = true;
	}
}
//The function keyUpHandler will define the key as unpressed, when the key is no longer pressed.
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } 
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    } 
	if (e.key === "Up" || e.key === "ArrowUp") {
		upPressed = false;
	} 
	else if (e.key === "Down" || e.key === "ArrowDown") {
		downPressed = false;
	} 
}
//The following function defines the character.
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
//The following function defines the platforms.
function drawPlatforms() {
  ctx.beginPath();
  ctx.rect(stage1[0], stage1[1], stage1[2], stage1[3]);
  ctx.fillStyle = "#159838";
  ctx.fill();
  ctx.closePath();
}
//This function causes the player to collide with the sides of the canvas.
function collision() {
	if (paddleX < canvas.width - paddleWidth) {
		rightCollide = false;
	}

	else {
		rightCollide = true;
	}

	if (paddleX > 0) {
		leftCollide = false;
	}

	else {
		leftCollide = true;
	}
	
	if (paddleY > 0) {
		upCollide = false;
	}
	
	else {
		upCollide = true;
	}
	
	if (paddleY < canvas.height - paddleHeight) {
		downCollide = false;
	}
    
	else if(paddleY < stage1[1] - paddleHeight) {
		downCollide = false;
	}
	
	else {
		downCollide = true;
	}
}
//This function causes the player to collide with platforms.
function platformCollision() {
    if(paddleY < stage1[1] - paddleHeight - 1 || paddleX > stage1[2]) {
        return;
    }
    else {
        downCollide = true;
    }
}
//The camera function keeps the character in the center of the screen.
function camera() {
    if(cameraX > Xmax) {
		rightCollide = true;
    }
	if(cameraX < Xmin) {
		leftCollide = true;
	}
	if(cameraY > Ymax) {
		downCollide = true;
	}
	if(cameraY < Ymin) {
		upCollide = true;
	}
	stage1[1] = platYadjust + 270;
	stage1[0] = platXadjust;
}
//The draw function places the character and platforms on the canvas, and causes the character to move, when a key is pressed.
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatforms();
  drawPaddle();

  if(rightPressed && rightCollide === false) {
      platXadjust -= 7;
      cameraX += 7;
  }
  else if(leftPressed && leftCollide === false) {
      platXadjust += 7;
      cameraX -= 7;
  }
  if(upPressed && upCollide === false) {
      platYadjust += 12;
      cameraY -= 12;
  }
  else if(downPressed && downCollide === false) {
      platYadjust -= 7;
      cameraY += 7;
  }
  if(downCollide === false) {
      platYadjust -= 5;
      cameraY += 5;
  }

  camera();
  debug();
  collision();
  platformCollision();
  camera();
  requestAnimationFrame(draw);
}

draw();
