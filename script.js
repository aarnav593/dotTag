var homeScreen = true;
var health;
var healthBar;
var healthBarImage;
var startButton;
var homeInputLabelName;

var database;
var playerRef

var teleport;

let bullets = [];
let bullets2 = [];
let bullets3 = [];

var fire;
var newCount;

let player;
var playerCountGlobal;
let otherPlayers = []
var anotherPlayer;
var anotherPlayerPosition;
var addedPlayer;
var playerName;
var otherAnotherPlayer;
var otherAddedPlayer;
var otherAnotherPlayerPosition;

var firedd;

let addedMouseDir;
let dirOffset2;
let otherAddedMouseDir;
let dirOffset3;

var players = [];
var self
var i;

var dead;

var deadLmao;

var machineGun;



function preload(){
  
spriteImage = loadImage("sprites/characters/characterBlue.png")
healthBarFull = loadImage("sprites/healthBar/fullhealthbar.png")
playButton = loadImage("sprites/characters/normal-eh.png")
}


function setup(){


  
var cnv = createCanvas(1000,700)
machineGun = false;
 
  var lolX = (windowWidth - width) / 2;
  var lolY = (windowHeight - height) / 2;
  dead = false;
  cnv.position(lolX, lolY);
 self = 0
 i = 0
 died = false;

  // healthBar = createSprite(windowWidth-105,25)
  // healthBar.addImage(healthBarFull)
  // healthBar.scale = 4.25
  // healthBar.visible = false;

  startButton = createSprite(250,250,100,30)
  startButton.addImage(playButton)
  startButton.scale = 0.3
  input1 = createInput()
  input1.position(cnv.x+190,cnv.y+290)
  input1.size(125)
  homeInputLabelName = createP("Name")
  homeInputLabelName.position(input1.x+40,input1.y+10)

  deadLmao = createP("You died lmao 💀")
  deadLmao.position(input1.x+40,input1.y+10)
  deadLmao.hide()
  

  slider = createSlider(0, 255, 60, 40);
  slider.position(10, 10);
  slider.style('width', '80px');

  slider2 = createSlider(0,255,60,40)
  slider2.position(10,30)
  slider2.style('width', '80px')

  slider3 = createSlider(0,255,60,40)
  slider3.position(10,50)
  slider3.style('width', '80px')

  database = firebase.database();

  anotherPlayer = false;
  otherAnotherPlayer = false;

  firedd = false;

  health = 450

  teleport = false

  var playerPosition = createVector(width / 2, height / 2)
  console.log(width,height)

  console.log(playerPosition)
  
  player = {
    name:"",
    pos: playerPosition,
    health: 450,
  };

  fire = false;




}

function mouseClicked(){
  if(teleport == false){
    fire = true;
    if(homeScreen == false){
          firebase.database().ref("players/"+playerName).update(({mouseClicked:true}))

}

  }
  if(teleport == true){
    player.pos.x = mouseX
    player.pos.y = mouseY
  }

  
  
}


function draw(){
  
  let val = slider.value();
  let val2 = slider2.value();
  let val3 = slider3.value();
  
  // <-- whut???
  let bullet;
  let bullet2;
  let bullet3;
  bullet = {
    damage: 15,
  };

  bullet2 = {
    damage: 15
  };

  bullet3 = {
    damage:15
  };

  if(mousePressedOver(startButton)&&input1.value() != ""){
   homeScreen = false
    playerRef = firebase.database().ref("players/"+input1.value())
     playerName = input1.value();
    console.log(playerName)
    playerRef.set({
    name:playerName,
    x:player.pos.x,
    y:player.pos.y,
    mX:mouseX,
    mY:mouseY,
    mouseClicked:false,
    pW:width,
    pH:height,
    fired:false,
    pos:"",
    healthL:health,
    width:width,
    height:height,
    machineGun:false
       

    
  
});
/*firebase.database().ref("playerCount").once('value').then((snapshot)=>{
  var count = snapshot.val();
   newCount = count + 1;
  firebase.database().ref("/").update({
    playerCount: newCount
  })
  
})*/
    


firebase.database().ref("players").on("child_added",(snapshot)=>{
 
  if(snapshot.val().name == playerName){
    if(self == 0){
     players.push(snapshot.val())
   }
  
  
    self++
  }

  if(snapshot.val().name != playerName){
    players.push(snapshot.val())
  }
   for (let playerIncrementLol of players){
    console.log(players[i])
     console.log(playerIncrementLol)
    
   i++
    console.log(i)
  }

  i = 0;
  console.log(players)
  
  // console.log(snapshot.val().name)
  // if(snapshot.val().name != playerName){
  //   if(anotherPlayer == false){
  // addedPlayer = snapshot.val();
  // console.log(addedPlayer)
  // anotherPlayer = true;
  // anotherPlayerPosition = createVector(addedPlayer.width/2,addedPlayer.height/2)
  // addedPlayer.pos = anotherPlayerPosition  
  // console.log(addedPlayer.pos)
  
  
  // }
  // if(anotherPlayer == true){
  //   otherAddedPlayer = snapshot.val();
  //   console.log(otherAddedPlayer)
  //   otherAnotherPlayer = true;
  //   otherAnotherPlayerPosition = createVector(addedPlayer.width/2,addedPlayer.height/2)
  // otherAddedPlayer.pos = otherAnotherPlayerPosition  
  // console.log(otherAddedPlayer.pos)
    
  // }
  // }
  
  
  

 
})

 firebase.database().ref("players").on("child_removed",(snapshot)=>{
  for(playerInc of players){
    if(playerInc.name == snapshot.val().name){
       players.splice(players.indexOf(playerInc),1)
      console.log("done")
    }
  }
})

    
    
   console.log("lol")
    //healthBar.visible = true;
    startButton.x = 10000000000000000000000
    startButton.y = 100000000000000000000000
    firebase.database().ref("players/"+input1.value()).onDisconnect().remove()
   
    input1.hide() 
    //lmao
    homeInputLabelName.position(10000000,100000000)
     
 }
else if(mousePressedOver(startButton)&&input1.value() == ""){
  homeInputLabelName.html("You must enter a name")
  homeInputLabelName.position(input1.x,input1.y+10)
}
  if(homeScreen == false){
    background(220);
    textSize(20)
  text(health,windowWidth-125,65)
  }
if(homeScreen == false){
  firebase.database().ref("players/"+playerName).update({x:player.pos.x,y:player.pos.y,mX:mouseX,mY:mouseY,pW:width,pH:height})
  
}
if(homeScreen == true){
  background(256)
}
  
  let mouseDir = createVector(mouseX, mouseY).sub(player.pos);
  
  mouseDir.setMag(30);
  
  let dirOffset = p5.Vector.add(player.pos, mouseDir);
 // console.log(dirOffset)
  
  // line(player.pos.x, player.pos.y, dirOffset.x, dirOffset.y);
  // fill("gray");
  // ellipse(dirOffset.x, dirOffset.y, 10, 10);
  
  
  // fill(val,val2,val3);
  // ellipse(player.pos.x, player.pos.y, 20, 20);

if(dead == false){
    for(playerIncrementLol2 of players){
      var buffir = false;
         // console.log(playerIncrementLol2.name)
        firebase.database().ref("players/"+playerIncrementLol2.name).once('value').then((snapshot)=>{
          var otherPlayerThing = snapshot.val()
          
          var otherPlayerThingPosition = createVector(snapshot.val().pW/2,snapshot.val().pH/2)
          //console.log(otherPlayerThingPosition)
          otherPlayerThingPosition.x = otherPlayerThing.x
          otherPlayerThingPosition.y = otherPlayerThing.y
          var otherPlayerMouseDir = createVector(otherPlayerThing.mX,otherPlayerThing.mY).sub(otherPlayerThingPosition)
          //console.log(otherPlayerMouseDir)
          otherPlayerMouseDir.setMag(30)
          var otherDirOffset = p5.Vector.add(otherPlayerThingPosition,otherPlayerMouseDir)
         
          line(otherPlayerThing.x,otherPlayerThing.y,otherDirOffset.x,otherDirOffset.y)
           if(playerName != otherPlayerThing.name){
            fill("red")
          }else{
            fill("gray")
          }
          ellipse(otherPlayerThing.x,otherPlayerThing.y,20,20)

          var otherPlayerMachineGun = otherPlayerThing.machineGun
          console.log(otherPlayerMachineGun)

          if(otherPlayerThing.machineGun == true && playerName != otherPlayerThing.name){
             buffir = true
          }
          var c = color(0,255,0)
          if(machineGun == true && playerName == otherPlayerThing.name){
            fill(c)
          }else if (playerName !=otherPlayerThing.name && buffir == true){
            fill(c)
          }
          
          ellipse(otherDirOffset.x,otherDirOffset.y,10,10)
          

          fill("gray")

          text(otherPlayerThing.name,otherPlayerThing.x,otherPlayerThing.y-30)
          text(otherPlayerThing.healthL,otherPlayerThing.x,otherPlayerThing.y-20)

          if(snapshot.val().fired == true){

      var otherDirOffset = p5.Vector.add(otherPlayerThingPosition,otherPlayerMouseDir)
      
      bullets.push(bullet)
      bullet.firing = true;
    
     bullet.dir = otherPlayerMouseDir;
    
    bullet.dir.setMag(5);
    
  bullet.initialPos = otherDirOffset;
   
  bullet.pos = bullet.initialPos.copy();


       
  

      
   
   
    
     if (bullet.pos.dist(bullet.initialPos) > 500) {
     bullet.firing = false;
      
    
   }
        }

    

      
    })

      
        
    }
}

    fill("gray")

//   if(anotherPlayer == true){
// addedMouseDir = createVector(addedPlayer.mX, addedPlayer.mY).sub(addedPlayer.pos);
//     addedMouseDir.setMag(30)
//     dirOffset2 = p5.Vector.add(addedPlayer.pos, addedMouseDir);
    
//     line(addedPlayer.pos.x, addedPlayer.pos.y, dirOffset2.x, dirOffset2.y)
//   ellipse(addedPlayer.x,addedPlayer.y,20,20)
    
//   fill("red");
//   ellipse(dirOffset2.x, dirOffset2.y, 10, 10);
      
//       firebase.database().ref("players/"+addedPlayer.name+"/x").once('value').then((snapshot)=>{
//         addedPlayer.x = snapshot.val()
//         addedPlayer.pos.x = snapshot.val();
//       })
//     firebase.database().ref("players/"+addedPlayer.name+"/y").once('value').then((snapshot)=>{
//         addedPlayer.y = snapshot.val()
//         addedPlayer.pos.y = snapshot.val()
//       })
//     firebase.database().ref("players/"+addedPlayer.name+"/mX").once('value').then((snapshot)=>{
//       addedPlayer.mX = snapshot.val()
//     })
//     firebase.database().ref("players/"+addedPlayer.name+"/mY").once('value').then((snapshot)=>{
//       addedPlayer.mY = snapshot.val()
//     })
//     firebase.database().ref("players/"+addedPlayer.name+"/fired").once('value').then((snapshot)=>{
//       addedPlayer.fired = snapshot.val()
//     })
//     if(addedPlayer.fired == true){

//     addedMouseDir = createVector(addedPlayer.mX, addedPlayer.mY).sub(addedPlayer.pos);
//     addedMouseDir.setMag(30)
//     dirOffset2 = p5.Vector.add(addedPlayer.pos, addedMouseDir);
      
//       bullets2.push(bullet2)
//       bullet2.firing = true;
    
//     bullet2.dir = addedMouseDir;
    
//     bullet2.dir.setMag(5);
    
//     bullet2.initialPos = dirOffset2;
   
//     bullet2.pos = bullet2.initialPos.copy();


       
  

      
   
   
    
//     if (bullet2.pos.dist(bullet2.initialPos) > 500) {
//       bullet2.firing = false;
      
    
//     }
//   }

    
//   }
    
 
//     //THIS IS WHERE THE CODE SPLITS 
//     //ITS HERE IDIOT
//     //SO YOU DONT HAVE TO LOOK
//   if(otherAnotherPlayer == true){
//     otherAddedMouseDir = createVector(otherAddedPlayer.mX, otherAddedPlayer.mY).sub(otherAddedPlayer.pos);
//     otherAddedMouseDir.setMag(30)
//     dirOffset3 = p5.Vector.add(otherAddedPlayer.pos, otherAddedMouseDir);
//       line(otherAddedPlayer.pos.x, otherAddedPlayer.pos.y, dirOffset3.x, dirOffset3.y);
//      ellipse(otherAddedPlayer.x,otherAddedPlayer.y,20,20)
     
//   fill("red");
//   ellipse(dirOffset3.x, dirOffset3.y, 10, 10);
      
//       firebase.database().ref("players/"+otherAddedPlayer.name+"/x").once('value').then((snapshot)=>{
//         otherAddedPlayer.x = snapshot.val() 
//         otherAddedPlayer.pos.x = snapshot.val()
//       })
//     firebase.database().ref("players/"+otherAddedPlayer.name+"/y").once('value').then((snapshot)=>{
//         otherAddedPlayer.y = snapshot.val()
//         otherAddedPlayer.pos.y = snapshot.val()
//       })
//     firebase.database().ref("players/"+otherAddedPlayer.name+"/mX").once('value').then((snapshot)=>{
//       otherAddedPlayer.mX = snapshot.val()
//     })
//     firebase.database().ref("players/"+otherAddedPlayer.name+"/mY").once('value').then((snapshot)=>{
//       otherAddedPlayer.mY = snapshot.val()
//     })
//     firebase.database().ref("players/"+otherAddedPlayer.name+"/fired").once('value').then((snapshot)=>{
//       otherAddedPlayer.fired = snapshot.val()
//     })

//     if(otherAddedPlayer.fired == true){
//     otherAddedMouseDir = createVector(otherAddedPlayer.mX, otherAddedPlayer.mY).sub(otherAddedPlayer.pos);
//     otherAddedMouseDir.setMag(30)
//     dirOffset3 = p5.Vector.add(otherAddedPlayer.pos, otherAddedMouseDir);
      
//       bullets3.push(bullet3)
//       bullet3.firing = true;
    
//     bullet3.dir = otherAddedMouseDir;
    
//     bullet3.dir.setMag(5);
    
//     bullet3.initialPos = dirOffset3;
   
//     bullet3.pos = bullet3.initialPos.copy();


       
  

      
   
   
    
//     if (bullet3.pos.dist(bullet3.initialPos) > 500) {
//       bullet3.firing = false;
      
//     }
    
//   }
//   }
  
  if(health <= 0) {
  
  dead = true;
  homeScreen = true;
  homeInputLabelName.position(input1.x,input1.y+10)
  
  
}


  if(dead == true){
        firebase.database().ref("players/"+input1.value()).remove();
homeInputLabelName.html("You died lmao 💀")
    
  }

   

  if (keyIsDown(87)) {
    player.pos.y -= 2;
  }
  if (keyIsDown(83)) {
    player.pos.y += 2;
  } 
  if (keyIsDown(65)) {
    player.pos.x -= 2;
  }
  if (keyIsDown(68)) {
    player.pos.x += 2;
  }
  
  firedd = false;


     if (mouseIsPressed&&fire == true) {
   
    firedd = true;


    
    
   fire = false
       if(homeScreen == false){
      firebase.database().ref("players/"+playerName).update({mouseClicked:false})
       }

 


       
  }
     firebase.database().ref("players/"+playerName).update({fired:firedd})

  
fill("gray")
  
    for(let bullet of bullets){
    circle(bullet.pos.x, bullet.pos.y,10)
       bullet.pos.add(bullet.dir);
  
       if(dist(player.pos.x,player.pos.y,bullet.pos.x,bullet.pos.y)<25){
     health-=15
    console.log("Hit")
   }
  }
     
//    for(let bullet2 of bullets2){
//     circle(bullet2.pos.x, bullet2.pos.y,10)
//        bullet2.pos.add(bullet2.dir);
       
//   }

//  for(let bullet3 of bullets3){
//     circle(bullet3.pos.x, bullet3.pos.y,10)
//        bullet3.pos.add(bullet3.dir);
       
//   }
// for(let bullet of bullets){
//   if(anotherPlayer == true){
//     if(dist(bullet.pos.x,bullet.pos.y,addedPlayer.pos.x,addedPlayer.pos.y)<10){
//     bullets.splice(bullets.indexOf(bullet),1)
    
//   }
//  if(otherAnotherPlayer == true){
//    if(dist(bullet.pos.x,bullet.pos.y,otherAddedPlayer.pos.x,otherAddedPlayer.pos.y)<10){
//      bullets.splice(bullets.indexOf(bullet),1)
//    }
//  }
//   }
  
// }
    
//     for(let bullet2 of bullets2){
      
//   if(dist(bullet2.pos.x,bullet2.pos.y,player.pos.x,player.pos.y)<10){
//     console.log("hit")
//     bullets2.splice(bullets2.indexOf(bullet2),1)
//     health -=15
    
//   }
//   if(otherAnotherPlayer == true){
//     if(dist(bullet2.pos.x,bullet2.pos.y,otherAddedPlayer.pos.x,otherAddedPlayer.pos.y)<10){
//      bullets2.splice(bullets2.indexOf(bullet2),1)
//    }
//   }

  
// }

//     for(let bullet3 of bullets3){
//   if(dist(bullet3.pos.x,bullet3.pos.y,player.pos.x,player.pos.y)<10){
//     bullets3.splice(bullets3.indexOf(bullet3),1)
//     health -=15
    
//   }
//   if(dist(bullet3.pos.x,bullet3.pos.y,addedPlayer.pos.x,addedPlayer.pos.y)<10){
//     bullets3.splice(bullets3.indexOf(bullet3),1)
//   }
// }
 firebase.database().ref("players/"+playerName).update({healthL:health,machineGun:machineGun})
  
  
 
 
  

  

  

  

  if(keyDown("x")&&homeScreen == false){
    health = 0;
  }

  //TODO 318

  
  drawSprites();
  
}


function keyPressed(){
  var buffer = true;
  if(key == "e"){
    if(teleport == true&&buffer == true){
      teleport = false
      console.log(false)
      buffer = false
    }
    if(teleport == false&&buffer == true){
      teleport = true
      console.log("true")
      
    }

    buffer = false
    
  }

  if(key == "m"){
    if(machineGun == true){
      machineGun = false
      console.log("machine gun deequipped")
       f

    }
    else if (machineGun == false){
      machineGun = true
      console.log("machine gun equipped")
      
    }
  }
  
  
}


function mousePressed(){
  
}

