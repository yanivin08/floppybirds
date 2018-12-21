let canvas = document.getElementsByTagName('canvas')[0],
	div = document.getElementsByTagName('div')[0];
	ctx = canvas.getContext("2d");
	
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;

let bird, pipes = [];

class Bird{
	constructor(){
		this.x = canvas.width*.20;
		this.y = canvas.height/3;
		this.speed = 0.70;
		this.gravity = 1;
		this.jump = 20;
		this.image = new Image();
		this.image.src = "bird.png"
		this.bg = new Image();
		this.bg.src = "bg.png";
		this.bgX = canvas.width;
	}
	draw(){
		//draw background
		ctx.drawImage(this.bg,this.bgX,0,canvas.width,canvas.height);
		ctx.drawImage(this.bg,this.bgX-canvas.width,0,canvas.width,canvas.height);
		//loop
		if(this.bgX <= 0){
			this.bgX = canvas.width;
		}
		//draw the bird
		ctx.drawImage(this.image,this.x-this.image.width*.28/2,this.y-this.image.height*.28/2,this.image.width*.28,this.image.height*.28);
	}
	update(){
		this.gravity += this.speed;
		this.gravity *= 0.9;
		this.y += this.gravity;
		this.bgX -= 1;
	}
	up(){
		this.gravity -= this.jump
	}
}


class Pipes{
	constructor(){
		this.randomY = Math.random()
	}
	
}


function animate(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	bird.draw();
	bird.update();
	
	requestAnimationFrame(animate)
}

document.addEventListener("keypress",function(e){
	if(e.key == " "){
		bird.up();   
	}
});


function game(){
	bird = new Bird();
	animate();
}

game();