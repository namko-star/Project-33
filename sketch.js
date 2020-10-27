const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const Constraint = Matter.Constraint;
 
var particle, score = 0, count = 0;
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) {
      plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {
      plinkos.push(new Plinko(j,175));
  }

    for (var j = 75; j <=width; j=j+50) {
      plinkos.push(new Plinko(j,275));
  }

    for (var j = 50; j <=width-10; j=j+50) {
      plinkos.push(new Plinko(j,375));
  }

}
 
function draw() {
  background("black");
  textSize(20)
  text("Score: "+score,20,30);
  //text("Count: " + count, 20, 60);
  
  for(var q = 25; q <= 320; q = q + 80) {
    text("500", q, 700);
  }

  for (var s = 345; s <= 505; s = s + 80) {
    text("100", s, 700);
  }

  for (var t = 585; t <= 800; t = t + 80) {
    text("200", t, 700);
  }

  stroke("yellow");
  line(0, 450, 800, 450);

  noStroke();
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) { 
    plinkos[i].display();
   }

   if(frameCount % 90 === 0){
     count++;
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
   }

  mousePressed();
 
  for (var j = 0; j < particles.length; j++) {
    particles[j].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(particle !== null) {
    particle.display();
    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 300) {
        score = score + 500;
        particle = null;
      }

      if (particle.body.position.x > 301 && particle.body.position.x < 600) {
        score = score + 100;
        particle = null;
      }

      if (particle.body.position.x > 601 && particle.body.position.x < 900) {
        score = score + 200;
        particle = null;
      }
    }
  }

  if (count >= 5) {
    gameState = "end";
    text("Game Over!", 400, 250);
  }
}

function mousePressed () {
  if (gameState !== "end") {
    count++;
    particle = new Particle(mouseX, 10, 10);
  }
}