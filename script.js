// ===============================
// DOCTOR DRIVING GAME
// CREATED BY NANDHINI
// ===============================



// ===============================
// CANVAS SETUP
// ===============================

// CONNECT CANVAS FROM HTML

const canvas =
document.getElementById("gameCanvas");

// CREATE DRAWING TOOL

const ctx =
canvas.getContext("2d");



// ===============================
// PLAYER CAR
// ===============================

const car = {

  // HORIZONTAL POSITION

  x:170,

  // VERTICAL POSITION

  y:500,

  // SIZE

  width:60,
  height:100,

  // SPEED

  speed:7
};



// ===============================
// ENEMY CAR
// ===============================

const enemy = {

  x:170,
  y:-120,

  width:60,
  height:100,

  speed:5
};



// ===============================
// KEYBOARD CONTROLS
// ===============================

let keys = {};



// KEY DOWN

document.addEventListener(
  "keydown",
  (e) => {

    keys[e.key] = true;

  }
);



// KEY UP

document.addEventListener(
  "keyup",
  (e) => {

    keys[e.key] = false;

  }
);



// ===============================
// MOVING ROAD
// ===============================

let roadOffset = 0;



// DRAW ROAD

function drawRoad(){

  // ROAD COLOR

  ctx.fillStyle = "#333";

  // DRAW ROAD

  ctx.fillRect(
    100,
    0,
    200,
    canvas.height
  );

  // ROAD LINES

  ctx.fillStyle = "white";

  for(

    let i = -80;

    i < canvas.height;

    i += 80

  ){

    ctx.fillRect(

      195,

      i + roadOffset,

      10,

      40

    );

  }

  // MOVE ROAD

  roadOffset += 5;

  // RESET ROAD

  if(roadOffset >= 80){

    roadOffset = 0;
  }

}



// ===============================
// DRAW PLAYER CAR
// ===============================

function drawCar(){

  ctx.fillStyle = "#ec4899";

  ctx.fillRect(

    car.x,
    car.y,

    car.width,
    car.height

  );

}



// ===============================
// DRAW ENEMY CAR
// ===============================

function drawEnemy(){

  ctx.fillStyle = "#ef4444";

  ctx.fillRect(

    enemy.x,
    enemy.y,

    enemy.width,
    enemy.height

  );

}



// ===============================
// MOVE PLAYER CAR
// ===============================

function moveCar(){

  // MOVE RIGHT

  if(keys["ArrowRight"]){

    car.x += car.speed;
  }

  // MOVE LEFT

  if(keys["ArrowLeft"]){

    car.x -= car.speed;
  }

  // ROAD LIMITS

  if(car.x < 100){

    car.x = 100;
  }

  if(car.x > 240){

    car.x = 240;
  }

}



// ===============================
// MOVE ENEMY CAR
// ===============================

function moveEnemy(){

  // MOVE DOWNWARD

  enemy.y += enemy.speed;

  // RESET ENEMY

  if(enemy.y > canvas.height){

    enemy.y = -120;

    // RANDOM LANES

    const lanes = [

      110,
      170,
      230

    ];

    // RANDOM NUMBER

    const randomLane =

    Math.floor(
      Math.random() * lanes.length
    );

    // CHANGE LANE

    enemy.x =
    lanes[randomLane];

  }

}



// ===============================
// COLLISION DETECTION
// ===============================

function checkCollision(){

  if(

    car.x < enemy.x + enemy.width &&

    car.x + car.width > enemy.x &&

    car.y < enemy.y + enemy.height &&

    car.y + car.height > enemy.y

  ){

    alert(
      "💥 Game Over!"
    );

    // RESET ENEMY

    enemy.y = -120;

  }

}



// ===============================
// GAME LOOP
// ===============================

function gameLoop(){

  // CLEAR SCREEN

  ctx.clearRect(

    0,
    0,

    canvas.width,
    canvas.height

  );

  // DRAW EVERYTHING

  drawRoad();

  moveCar();

  moveEnemy();

  drawCar();

  drawEnemy();

  checkCollision();

  // LOOP AGAIN

  requestAnimationFrame(
    gameLoop
  );

}



// ===============================
// START GAME
// ===============================

gameLoop();