console.log("Javascript is Working!");

const context = document.querySelector("canvas").getContext("2d");
const buffer = document.createElement("canvas").getContext("2d");

buffer.canvas.width = 500;
buffer.canvas.height = 500; 

let gravity = 1.5; 

// function gravity(){
//     if (controller.reverseGavity){
//         return gravity = -1.5;
//     }
// }

class Background{
    constructor(){
        this.color = "Orange";
        this.startingPoint = 0;
        this.width = buffer.canvas.width;
        this.height = buffer.canvas.height;
    }

    draw = function(){
        buffer.fillStyle = this.color;
        buffer.fillRect(this.startingPoint, this.startingPoint, this.width, this.height);
    }

    clear = function(){
        buffer.fillRect(this.startingPoint, this.startingPoint, this.width, this.height);
    }
}

class Player{
    constructor(){
        this.color = "Red";
        this.x = 50;
        this.y = 50;
        this.width = 25;
        this.height = 25;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.jumping = true;
        this.jumpForce = 18;
    }
    
    draw = function(){
        buffer.fillStyle = this.color;
        buffer.fillRect(this.x, this.y, this.width, this.height);
    }

    move = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed; 
        this.xSpeed *= 0.9;
        this.ySpeed *= 0.9; 

        if (controller.up && !this.jumping && gamerunning){
            this.ySpeed -= this.jumpForce;
            this.jumping = true; 
        }
        if (!controller.reverseGavity && gamerunning){
            this.ySpeed += gravity;
        }
        if (controller.reverseGavity && gamerunning){
            this.ySpeed += gravity*(-3);
        }
    }

    collision = function(){
        if(this.y >= buffer.canvas.height - this.height){
            this.jumping = false;
            this.y = buffer.canvas.height - this.height;
            this.ySpeed -= gravity;
        }
        if(this.y === buffer.canvas.height ){
            this.y = buffer.canvas.height
        }
    }
}

let controller = {
    up : false, 
    reverseGavity : false, 

    keyUpDown : function(event){
        let key_state = (event.type == "keydown") ? true : false;

        switch(event.keyCode){
            case 38:
                controller.up = key_state;
                break;
            case 32:
                controller.reverseGavity = key_state;
                break;     
        }
    }
}

class Obstacle {
    constructor(){
        this.width = 15;
        this.height = ObstacleHeight; 
        this.x = buffer.canvas.width;
        this.y = buffer.canvas.height * Math.random();
        this.xSpeed = -3;
        this.ySpeed = 0;
        // Math.ceil(Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1);
        this.color = "Cyan"; 
    }

    draw = function(){
        buffer.fillStyle = this.color;
        buffer.fillRect(this.x, this.y, this.width, this.height);
    }

    move = function(){
        if(gamerunning){
            this.x += this.xSpeed;
        this.y += this.ySpeed; 
        }
    }

    hit = function(object){
        if (object.x + object.width >= this.x && object.x + object.width <= this.width + this.x){
            if(object.y + object.height >= this.y && object.y + object.height <= this.height +this.y){
                return true;
            } else{
                return false;
            }
        }

    }
}

function drawBuffer(){
    // context.drawImage("https://media.npr.org/assets/img/2020/08/27/nasa-goods-real_wide-9168d715c2d4c488d7a0e594b397d7abdd969d9d.png", 10, 10)
    context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height)
}

function resize(){
    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    let min_size = height < width ? height : width;
    context.canvas.width = min_size;
    context.canvas.height = min_size; 
}

let background1 = new Background();
let player1 = new Player(); 
let ObstacleHeight = Math.floor(Math.random() * (100 - player1.height) + player1.height);
let obstacles = [];
let frameCounter = 0; 
let timeInterval = 100; 
let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth; 

function gameOver(){
    buffer.fillStyle = "Indigo";
    buffer.fillText("YOU LOST", buffer.canvas.width / 2 - 50, buffer.canvas.height / 2 - 50);
    buffer.fillText("PRESS SPACE TO PLAY AGAIN", buffer.canvas.width / 2 - 100, buffer.canvas.height / 2 - 40); 

    window.addEventListener("keydown", function(event){
        if(event.keyCode == 32){
            location.reload(); 
            // gamerunning = true; 
        }
    })
}

// window.onload = function(){
//     let gamerunning = false;
//     gamerunning = true;
// }

function loop(){
    frameCounter++; console.log(timeInterval); 
    ObstacleHeight = Math.floor(Math.random() * (150) + player1.height);
    resize(); 
    background1.clear(); 
    background1.draw();
    player1.draw(); 
    player1.move(); 
    player1.collision(); 
    
    if (frameCounter % timeInterval == 0){
        obstacles.push(new Obstacle());
        timeInterval--;
    }
    for(let i = obstacles.length - 1; i >= 0; i--){
        obstacles[i].draw();
        obstacles[i].move(); 

        if(obstacles[i].x < 0 - obstacles[i].width){
            obstacles.shift(); 
        }

        if(obstacles[i].hit(player1)){
            gamerunning = false; 
            gameOver(); 
        }
    }
    // obstacle1.draw(); 
    // obstacle1.move(); 
    // buffer.fillStyle = "Black";
    // buffer.fillRect(0,0,20,20);
    drawBuffer();
    requestAnimationFrame(loop);
}

window.addEventListener("keydown",controller.keyUpDown);
window.addEventListener("keyup", controller.keyUpDown); 
gamerunning = true;
requestAnimationFrame(loop);