let canvas = document.getElementsByTagName('canvas')[0],
	div = document.getElementsByTagName('div')[0];
	ctx = canvas.getContext("2d");
	
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;

let min = 50, max = canvas.height - (canvas.height * .50);

let bird, pipes = [], count = 140, games = true, score = 0, start = false;

class Bird{
	constructor(){
		this.x = canvas.width*.20;
		this.y = canvas.height/4 - 45;
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
		ctx.drawImage(this.image,this.x-this.image.width*.25/2,this.y-this.image.height*.30/2,this.image.width*.25,this.image.height*.30);
				
	}
	update(){
		this.gravity += this.speed;
		this.gravity *= 0.9;
		this.y += this.gravity;
		this.bgX -= 1.3;
	}
	up(){
		this.gravity -= this.jump
	}
}


class Pipes{
	constructor(){
		this.randomY = Math.random() * (max - min) + min;
		this.pipeX = canvas.width;
		this.height = 130;
		this.width = 70;
		this.speed = 2;
		this.pipeImg = new Image();
		this.pipeImg.src = "pipe.png"
		this.mouthImg = new Image();
		this.mouthImg.src = "pipemouth.png"
	}
	draw(){
		//pipe
		ctx.lineWidth = 3;
		ctx.drawImage(this.pipeImg,this.pipeX,0,this.width,this.randomY)
		ctx.strokeRect(this.pipeX,0,this.width,this.randomY);
		ctx.drawImage(this.pipeImg,this.pipeX,this.randomY + this.height,this.width,canvas.height)
		ctx.strokeRect(this.pipeX,this.randomY + this.height,this.width,canvas.height);
		//pipe mouth
		ctx.drawImage(this.mouthImg,this.pipeX-5,this.randomY-40,this.width+10,40)
		ctx.strokeRect(this.pipeX-5,this.randomY-40,this.width+10,40);
		ctx.drawImage(this.mouthImg,this.pipeX-5,this.randomY + this.height,this.width+10,40)
		ctx.strokeRect(this.pipeX-5,this.randomY + this.height,this.width+10,40);
	}
	update(){
		this.pipeX -= this.speed;
	}
}


function animate(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if(count == 0){
		pipes.push(new Pipes());
		count = 130;
	}
	bird.draw();
	
	if(start){
		bird.update();
		pipes.forEach(x => x.draw());
		pipes.forEach(x => x.update())
		
		
		pipes.every(x => {
			if(bird.y <= 0 || bird.y >= canvas.height - (canvas.height * .27)){
				games = false;
				return false;
			}else{
				if(detectCollision(bird.x,bird.y,23  ,x.pipeX,0,x.width,x.randomY)){
					games = false;
					return false;
				}else{
					if(detectCollision(bird.x,bird.y,23,x.pipeX,x.randomY+x.height,x.width,canvas.height)){
						games = false;
						return false;
					}else{
						if(detectCollision(bird.x,bird.y,23,x.pipeX-5,x.randomY-40,x.width+10,40)){
							games = false;
							return false;
						}else{
							if(detectCollision(bird.x,bird.y,23,x.pipeX-5,x.randomY+x.height,x.width+10,40)){
								games = false;
								return false;
							}else{
								games = true;
								return true;
							}
						}
					}
				}
			}
		});
		
		pipes.forEach((x,i) => {
			if(x.pipeX + x.width == 0){
				pipes.splice(i,1);
				score += 1;
			}
		});
		
		ctx.font = "bold 50px Courier New";
		ctx.textAlign = "center";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 5;
		ctx.strokeText(score, canvas.width/2, canvas.height*.10);
		ctx.fillStyle = "white";
		ctx.fillText(score, canvas.width/2, canvas.height*.10);
		
		count -= 1;
	}else{
		ctx.font = "bold 40px Courier New"; 
		ctx.strokeStyle = "black";
		ctx.lineWidth = 5;
		ctx.strokeText("FLOPPY BIRD", canvas.width/3, canvas.height*.20);
		ctx.fillStyle = "yellow";
		ctx.fillText("FLOPPY BIRD", canvas.width/3, canvas.height*.20);
	}
	
	if(games){
		requestAnimationFrame(animate);
	}else{
		console.log("game over!");
	}
	
	
	
}

document.addEventListener("keypress",function(e){
	if(e.key == " "){
		bird.up();   
	}
});


function game(){
	bird = new Bird();
	pipes.push(new Pipes());
	bird.draw();
	animate();
}

game();

document.addEventListener("keypress",function(e){
	if(e.key == " "){
		start = true;
	}
});

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function detectCollision(cx,cy,r,rx,ry,rw,rh){
	let testX = cx, testY = cy;
	
	if (cx < rx)         testX = rx;        // left edge
	else if (cx > rx+rw) testX = rx+rw;     // right edge

	if (cy < ry)         testY = ry;        // top edge
	else if (cy > ry+rh) testY = ry+rh;     // bottom edge
	
	let dist = distance(cx,cy,testX,testY);
	
	if(dist <= r) {
		return true;
	}
	return false;
}

