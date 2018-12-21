let canvas = document.getElementsByTagName('canvas')[0],
	div = document.getElementsByTagName('div')[0];
	ctx = canvas.getContext("2d");
	
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;

var num, game = true, floppyUp = false;

class Bird{
	constructor(){
		this.x = canvas.width * .30;
		this.y = canvas.height/3;
		this.r = 25;
		this.wallX = canvas.width;
		this.wallY = 50;
		this.start = canvas.height/2;
		this.drawAsset();
		this.speed = 2;
	}
	drawAsset(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.stroke();
		ctx.closePath();
	}
	play(){
		if(!floppyUp){
			if(this.y < canvas.height - (canvas.height * .20)){
				num = (this.y - this.start)/98.5;
				num = num < 1 ? 1 : num;
				this.y += this.speed*num;
				this.drawAsset();
			}else{
				game = false;
			}
			this.createWall()
		}else{
			this.y -= 40;
			floppyUp = false;
		}
		
	}
	createWall(){

	}
}

let floppy = new Bird();

function start(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	floppy.play();
	if(game){
		requestAnimationFrame(start);
	}else{
		floppy.drawAsset();
	}
}


document.addEventListener("keydown",(e) => {
	if(e.key == "ArrowUp"){
		floppyUp = true;
	}
});

start();