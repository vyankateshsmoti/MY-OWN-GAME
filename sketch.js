var track, track_Img;
var I_track1, I_track2, I_track3, I_track4;
var circle, circle_Img;
var square, square1;
var obstacle_G,spawnPoints_G
var play,play_Img;
var start_Img;
var start
var gameState = start;
var score = 0;
var Hi;
var restart,restart_IMG;
var last_IMG;

function preload() {
  track_Img = loadImage("track.png");
  circle_Img = loadImage("circle.png");
  start_Img = loadImage("start.png");
  play_Img = loadImage("play.png");
  restart_IMG = loadImage("restart.png");
  last_IMG = loadImage("last.jpg");
}

function setup() {
  var canvas = createCanvas(400, 550);
  canvas.position(400, 10);

 
  track = createSprite(200, 300, 400, 20);
  track.addImage("track.png", track_Img);
  track.scale = 0.8

  I_track3 = createSprite(80, 300, 5, 40);
  I_track3.visible = false;

  I_track4 = createSprite(315, 300, 5, 40);
  I_track4.visible = false;

  circle = createSprite(250, 300, 10, 10);
  circle.addImage("circle.png", circle_Img);
  circle.scale = 0.03

  play = createSprite(200,210,20,20);
  play.addImage("play.png",play_Img);
  play.scale = 0.3

  restart = createSprite(100,400,20,20);
  restart.addImage("restart.png",restart_IMG);
  restart.visible = false;
  restart.scale = 0.5

  obstacle_G = new Group();
  spawnPoints_G = new Group();

}

function draw() {
  background(133, 173, 173);

  if(gameState === start){
    background(start_Img);
    track.visible = false;
    circle.visible = false;
    play.visible = true;

    if(mousePressedOver(play)){
       gameState = play;
    }
  
  }
 
   if(gameState === play){
    background(133,173,173);
    track.visible = true;
    circle.visible = true;
    play.visible = false;
    restart.visible = false;

  circle.x = mouseX;

  circle.collide(I_track3);
  circle.collide(I_track4);

  if(circle.isTouching(spawnPoints_G)){
    score = score + 1;
    spawnPoints_G.destroyEach();
   }
   

   if(circle.isTouching(obstacle_G)){
    gameState = "end";
}

  textSize(80);
  fill("yellow")
  text(score,200,450);

   spawnPoints();
  obstacles();
  }

  if(gameState === "end"){
    background(last_IMG);

    obstacle_G.destroyEach();
    spawnPoints_G.destroyEach();

    play.visible = false;
    circle.visible = false;
    track.visible = false;
    restart.visible = true;


    textSize(100);
    fill("red");
    text(score,50,150);

    textSize(20);
    text("YOUR SCORE",30,200)

    if(mousePressedOver(restart)){
      gameState = play;
      score = 0;
    }


  }

 
  drawSprites();
}

function obstacles() {
  if (frameCount % 20 === 0) {
    square = createSprite(Math.round(random(10, 400)), 0, 20, 20);

    if (square.x > 214) {
      square.velocityX = -3
    }

    if (square.x < 214) {
      square.velocityX = 3
    }
    square.velocityY = (6 + 3* score/10);

    square.shapeColor = "white"

    obstacle_G.add(square);
  }
  
}

function spawnPoints() {
  if (frameCount % 60 === 0) {
    square1 = createSprite(Math.round(random(10, 400)), 0, 20, 20);

    if (square1.x > 214) {
      square1.velocityX = -3
    }

    if (square1.x < 214) {
      square1.velocityX = 3
    }
    square1.velocityY = (6 + 3* score/10);

    square1.shapeColor = "green"

    spawnPoints_G.add(square1);
  }
  
}