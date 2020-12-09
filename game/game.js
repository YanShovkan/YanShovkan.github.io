const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const fieldIMG = new Image();
fieldIMG.src = "field.png";

let score = 0;

let cellSize = 32;
let food = {
	x: Math.floor((Math.random()* 9 + 2))* cellSize,
	y: Math.floor((Math.random()* 9 + 2))* cellSize
};

let snake = [];
snake[0] = {
	x: 5 * cellSize,
	y: 5 * cellSize
};
snake[1] = {
	x: 4 * cellSize,
	y: 5 * cellSize
};
snake[2] = {
	x: 3 * cellSize,
	y: 5 * cellSize
};

document.addEventListener("keydown", direction);

let dir = "right";
var paused = new Boolean(true);

function direction(event){
	if(event.keyCode == 37 && dir != "right"){
		dir = "left";
	} else if (event.keyCode == 38 && dir != "down"){
		dir = "up";
	}else if (event.keyCode == 39 && dir != "left"){
		dir = "right";
	}else if (event.keyCode == 40 && dir != "up"){
		dir = "down";
	}else if (event.keyCode == 32){
		if (paused == false){
			paused = true;
		} else {
			paused = false;
		}
	}
}

function drawGame(){
	ctx.drawImage(fieldIMG, 0, 0);
	drawApple();
	drawSnake();
	checkStatus();
	document.getElementById("score").innerHTML = "Score: " + score;
}

function drawApple(){
	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, cellSize, cellSize);
}

function drawSnake(){
	ctx.fillStyle = "green";
	for(let i = 0; i < snake.length;i++){
		ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
	}
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if(paused == false){
		if (snakeX == food.x && snakeY == food.y){
			score+=10;
			food = {
				x: Math.floor((Math.random()* 9 + 2))* cellSize,
				y: Math.floor((Math.random()* 9 + 2))* cellSize
			};
		} else {
			snake.pop();	
		}
		
		if(dir == "left"){
			snakeX -= cellSize;
		} else if(dir == "right"){
			snakeX += cellSize;
		} else if(dir == "up"){
			snakeY -= cellSize;
		} else if(dir == "down"){
			snakeY += cellSize;
		} 
		
		let newHead = {
			x: snakeX,
			y: snakeY
		};
		
		snake.unshift(newHead);
	}
}

function checkStatus(){
	if(snake[0].x == cellSize*12 || snake[0].x == -cellSize 
		||snake[0].y == cellSize*12 || snake[0].y == -cellSize){
		clearInterval(game);
		Swal.fire(
			'Поражение!',
			'Вы врезались в стену!',
			'error'
		)
	}
	for(let i = 1; i < snake.length;i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			clearInterval(game);
			Swal.fire(
			'Поражение!',
			'Вы съели свой хвост!',
			'error'
			)
		}
	}
}

let game = setInterval(drawGame, 100);
