const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const W=1210;
const H=560;
const cs = 10;
let food = null;
let score = 0;
const snake={
    // legth of snake intiall0y
     lengthsk : 5,
    // direction
    direction: 'right',
    //cells containing array {x,y}
    cells: [],
    createSnake: function () {
        for(let i = 0 ;i<this.lengthsk;i++){
            this.cells.push({
                x: i,
                y: 0
            });
        }
    },
    drawSnake: function (){
        for(let cell of this.cells){
            ctx.fillRect(cell.x*(cs),cell.y*(cs),cs-1,cs-1);
        }
    },
    
    updateSnake: function (){
        let headX = this.cells[this.cells.length-1].x;
        let headY = this.cells[this.cells.length-1].y;
         console.log(headX,food.x,headY,food.y);
        if(headX===food.x && headY===food.y){
            food = getRandomFood();
            score++;
        }else{
            // remove from the front
        this.cells.shift();
        }

        let nextX=headX;
        let nextY=headY;

        if(this.direction==='right'){
            nextX+=1;
            if(nextX>29){clearInterval(id);
            ctx.fillStyle='lightgreen';
            ctx.fillText('Game Over',10,20);}
        }
        else if(this.direction==='left'){
            nextX-=1;
            if(nextX<0){
                clearInterval(id);
                ctx.fillStyle='lightgreen';
                ctx.fillText('Game Over',10,20);
            }
        }
        else if(this.direction=='up'){nextY-=1; if(nextY<0){clearInterval(id);ctx.fillStyle='lightgreen';
        ctx.fillText('Game Over',10,20);}}
        else {nextY+=1; if(nextY>14){clearInterval(id);ctx.fillStyle='lightgreen';
        ctx.fillText('Game Over',10,20);}}

        

        this.cells.push(
            {
                x: nextX,
                y: nextY
            }
        );
    }
}
// init 
function init(){
               
    snake.createSnake();
    food = getRandomFood();
    function keyPressed(e){
        //console.log(e.key);
        if(e.key==='ArrowLeft')snake.direction= 'left';
        else if(e.key==='ArrowDown')snake.direction= 'down';
        else if(e.key==='ArrowRight')snake.direction='right';
        else snake.direction= 'up';
        console.log(snake.direction);
    }
    document.addEventListener('keydown',keyPressed);
}
// draw
function draw(){
    ctx.clearRect(0,0,W,H);
    
    ctx.fillStyle='aqua';
    ctx.fillRect(food.x*cs,food.y*cs,cs-1,cs-1);
    ctx.fillStyle='#ffd100';
    snake.drawSnake();   
    ctx.fillStyle='red';
    ctx.fillText(`score: ${score}`,10,10);

}
// update
function update(){
    snake.updateSnake();
}
// gameloop
function gameLoop(){
    console.log("INSIDE GAME LOOP");
    draw();
    update();
    
}
function getRandomFood(){
    const foodX = Math.floor(Math.random()*30);
    const foodY = Math.floor(Math.random()*13);
    console.log(foodX,foodY);
    const food = {
        x: foodX,
        y: foodY
    }
    return food;
}
// start the game 
init();

const id = setInterval(gameLoop,150);
