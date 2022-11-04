let ground;
let lander;
var lander_img;
var bg_img;
var player, player_img, player_fire1, player_fire2
var player_right, player_left
var pouso
var crash
var gas = 20
var rock, rock_img
var pouso, pouso_animation

//vx = Velocidade X, g = Gravidade, vy = Velocidade Y
var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
lander_img = loadImage("plataforma.png")
bg_img = loadImage("bg.png")
player_img = loadAnimation("normal.png")
player_fire1 = loadAnimation("normal.png","b_thrust_2.png.png","b_thrust_3.png")
player_fire2 = loadImage("b_thrust_3.png")
player_left = loadAnimation("left_thruster_1.png","left_thruster_2.png")
player_right = loadAnimation("right_thruster_1.png","right_thruster_2.png")
crash_img = loadAnimation("crash1.png","crash2.png","crash3.png")
crash_img.looping = false
rock_img = loadImage("rock.png")
pouso_animation = loadAnimation("pouso1.png","pouso2.png","pouso3.png")
pouso_animation.looping = false

}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  crash_img.frameDelay = 10
//criar sprite lander e add imagem e scale
  ground = createSprite(200,650,1050,40)
  ground.visible = false
  lander = createSprite(880,595,180,120)
  lander.setCollider("rectangle",0,180,500,50)
  rock = createSprite(330,550,50,50)
  rock.scale = 0.5
  rock.setCollider("rectangle",-50,150,160,150)
 

  lander.addImage(lander_img)
  lander.scale = 0.4
  player = createSprite(100,50,30,30)
  player.addAnimation("noAnimation",player_img)
  player.scale = 0.1
  player.addAnimation("playerUp",player_fire1)
  player.addAnimation("playerLeft",player_left)
  player.addAnimation("playerRight",player_right)
  player.addAnimation("crash",crash_img)
  rock.addAnimation("rock",rock_img)
  player.addAnimation("pouso",pouso_animation)
  player.setCollider("rectangle",0,0,200,200)



  rectMode(CENTER);
  textSize(15);
}

function draw() 
{

  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  //colocar texto na tela para velocidade vertical
  text("Velocidade Vertical " + round(vy), 800, 140)
  //texto da velocidade horizontal
  text("Velocidade Horizontal " + round(vx), 800, 180)
  //barra de combustível
  text("Combustível " + gas, 800, 100)
  pop();

  if (player.isTouching(ground) || gas <= 0 || player.isTouching(rock)) {
    player.changeAnimation("crash")
    vx = 0
    vy = 0
    g = 0
    gas = 0
    setTimeout(() => {
      player.destroy()
    }, 2000);
  }

  if (player.isTouching(lander)) {
    player.changeAnimation("pouso")
    vy = 0; vx = 0; g = 0
  }

  //configurar a descida da nave em y + gravidade
  vy = vy + g
  player.y = player.y + vy
  player.x = player.x + vx
  drawSprites();
}

function keyPressed(){
  if (keyCode == UP_ARROW && gas > 0) {
    vy = - 1.5
    player.changeAnimation("playerUp")
    gas = gas-1
    
  }
  if (keyCode == LEFT_ARROW && gas > 0) {
    vx = - 1.5
    player.changeAnimation("playerRight")
    gas = gas-1
    player.scale = 0.11
  }
  if (keyCode == RIGHT_ARROW && gas > 0) {
    vx = + 1.5
    player.changeAnimation("playerLeft")
    gas = gas-1
    player.scale = 0.11
  }
}

function keyReleased(){
  if (keyCode == UP_ARROW||keyCode == LEFT_ARROW||keyCode == RIGHT_ARROW ) {  
    player.changeAnimation("noAnimation")
    player.scale = 0.1
  }
  
  
}

