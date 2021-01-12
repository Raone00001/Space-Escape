var player, playerIMG;

var alienS, alienSIMG;
var alienSGroup;

var bgIMG, bg;

var laser, laserIMG, laserGroup;

var score = 0;
var goal = 10000;

var canvas;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {

    playerIMG = loadImage("Images/Spaceship 2.jpg");
    alienSIMG = loadImage("Images/Alien Ship 1.png");
    
    bgIMG = loadImage("Images/Background.jpg");

    laserIMG = loadImage("Images/Vertical Line.png");

}

function setup(){
    canvas = createCanvas(400,500);

    //bg = createSprite(200,250,400,0);
    //bg.addImage("background", bgIMG);
    //bg.y = bg.height/6;
    //bg.velocityY = 10;
    //bg.scale = 1.15

    player = createSprite(200, 480, 10, 10);
    player.addImage("player", playerIMG);
    player.scale = 0.25;

    alienSGroup = new Group();
    laserGroup = new Group();

    //player.debug = true;
    player.setCollider("rectangle", 0, 0, 15, 15);

}

function draw(){
    background(bgIMG);

    fill("White");
    textSize(20);
    textFont("Cinzel");
    text("Score: " + score, 5,20);
    text("Goal: " + goal, 270, 490);
    textSize(10);
    text("Use Your Left and Right keys to move around! To Shoot, Press Space. :)",50,35);

    if (gameState === PLAY){

            spawnAlien();

        if (keyDown(LEFT_ARROW)){

            player.x = player.x-20;

        } else if (keyDown(RIGHT_ARROW)){

            player.x = player.x+20;

        }

        if (keyDown("space")){

            spawnLasers();

        }

        //bg.y = bg.y+0.1;

        //if (bg.y > height){

           // bg.y = 0;

        //}

        if (laserGroup.isTouching(alienSGroup)){

            score = score+250;
            laserGroup.destroyEach();
            alienSGroup.destroyEach();

        }

        if (alienSGroup.isTouching(player)){

            gameState = END;
            //bg.velocityY = 0;
            textSize(40);
            text("Game Over!", 100, 280);
            score = "Game Over!";
            goal = 0;
            alienSGroup.destroyEach();
            player.destroy();

        } 

        if (score > 100){

            gameState = END;
            textSize(40);
            text("You Win!", 100, 280);
            score = 0;
            goal = "You Win!";
            alienSGroup.destroyEach();
            player.destroy();

        }

    } 

    drawSprites();

}

function spawnAlien(){

    if(frameCount % 8 === 0) {

        alienS = createSprite(400,0,10,40);
        alienS.x = Math.round(random(0, 400));
        alienS.addImage("aliens", alienSIMG);

        //pancake.debug = true;

        alienS.scale = 0.2;
        alienS.velocityY = (10 + 1*score/50);

        //pancake.velocityY = -(6 + 3*score/100);
        alienSGroup.add(alienS);
        
    }

}

function spawnLasers(){

    laser = createSprite(player.x, player.y-20, 5, 5);
    laser.addImage("lasers", laserIMG);
    laser.width = 5;
    laser.height = 5;
    laser.scale = 0.02;

    laser.velocityY = -10;

    laser.lifeTime = 10;

    laserGroup.add(laser);

}