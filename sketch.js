const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var hit = 0;
var lives = 5;

var engine, world;
var gameState = "onSling";
var level = "start";

function preload(){
  bg = loadImage("Images/space.jpg");
  star = loadImage("Images/lives.png");
  spade = loadImage("Images/spade.png");
}
function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  asteroid1 = new Asteroid(700, 100, 30);
  asteroid2 = new Asteroid(900, 300, 30);
  asteroid3 = new Asteroid(500, 350, 30);
  asteroid4 = new Asteroid(330, 100, 30);
  asteroid5 = new Asteroid(800, 500, 30);

  earth = new Earth(100, 350, 80);

  plane = new Plane(1000, 100, 30);

  slingshot = new Slingshot(plane.body, {x: 1000, y: 100})

  play = createSprite(600, 350, 50, 50);
  play.addImage(spade);
  play.scale = 0.15;
  

  //Render
  //var render = Render.create({
	  //element: document.body,
	  //engine: engine,
	  //options: {
	    //width: 1200,
	    //height: 600,
	    //wireframes: false
	  //}
	//});

	//Render.run(render);
}

function draw() {
  Engine.update(engine);

  if(level === "start"){
    background(bg);
  
    textSize(20);
    fill("white");
    text("Welcome To Mission Space", 450, 200);
    text("Press Space to start the game and drag the plane to hit the asteroids", 300, 250);
    play.visible = true;
    lives = 5;
    if(keyDown("space")){
      level = "play";
    }
    drawSprites();
  }

  if(level === "play"){
    //Matter.Body.setStatic(plane.body, false);
    background(bg);
  play.visible = false
    textSize(20);
    fill("white");
    text("Targets Hit: "+hit, 50, 50);
  
    for(var i = lives; i > 0; i--){
      image(star, i*38, 75, 50, 50);
    }
    
    textSize(15);
    fill("white");
    text("Drag to play", )

    asteroid1.display();
    asteroid2.display();
    asteroid3.display();
    asteroid4.display();
    asteroid5.display();
  
    asteroid1.hits();
    asteroid2.hits();
    asteroid3.hits();
    asteroid4.hits();
    asteroid5.hits();
  
    earth.display();
  
    plane.display();
  
    //slingshot.display();
  
    detectCollision(plane, asteroid1);
    detectCollision(plane, asteroid2);
    detectCollision(plane, asteroid3);
    detectCollision(plane, asteroid4);
    detectCollision(plane, asteroid5);
  
    if(hit === 500){
      level = "victory";
    }
    if(lives <= 0 && hit != 500){
      level = "end";
    }
  }
  else if(level === "victory"){
    background(bg);
    textSize(25);
    fill("white");
    text("Victory Is Yours", 500, 200);
  }
  else if(level === "end"){
    background(bg);
    textSize(25);
    fill("white");
    text("Better Luck Next Time", 500, 200);
  }

}

function detectCollision(lplane, lasteroid){
	planeBodyPosition = lplane.body.position
	asteroidBodyPosition = lasteroid.body.position

	var distance = dist(planeBodyPosition.x, planeBodyPosition.y, asteroidBodyPosition.x, asteroidBodyPosition.y)
	if(distance<=lasteroid.r+lplane.r){
		Matter.Body.setStatic(lasteroid.body, false)
	}
}

function mouseDragged(){
 // if(gameState === "onSling"){
      Matter.Body.setPosition(plane.body, {x: mouseX , y: mouseY});
 // }
}

function mouseReleased(){
  slingshot.fly();
  //gameState = "launched";
}

function keyPressed(){
  if(keyCode===32){
    lives = lives-1
    Matter.Body.setPosition(plane.body, {x: 1000, y:100})
    slingshot.attach(plane.body)
  }
}


