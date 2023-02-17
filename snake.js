//canvas or board
const blocksize= 25;
const rows= 20;
const cols= 20;
let board;
let context;

//snake head
let snakex= blocksize*5;
let snakey= blocksize*5;

//snake speed
let velocityx=0;
let velocityy=0;

//snake body
let snakebody=[];

//food for snake
let foodx;
let foody;

let gameover=false;

window.onload=function() {
    board=document.getElementById("board");
    board.height= rows*blocksize;
    board.width=cols*blocksize;
    context= board.getContext("2d"); //to draw on the canvas or board
    
    food_place();
    //to move the snake
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update,1000/10); // to redraw multiple tomes & to run 10 times per sec
}
function update() {
    if (gameover){
        return;
    }
    
    //canvas or board 
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    //food color and placement
    context.fillStyle="red";
    context.fillRect(foodx, foody, blocksize, blocksize);

    //when snake collides with the food, it should eat it
    if(snakex == foodx && snakey == foody){
        snakebody.push([foodx, foody])
        food_place();
    }

    //to keep the head attached to the body, so move forward from tail
    for (let  i= snakebody.lenght-1; i > 0; i--) {
        snakebody[i] = snakebody[i-1];
    }
    if (snakebody.length) {
        snakebody[0]=[snakex, snakey];
    }

    //snake color, speed and placement
    context.fillStyle="lime";
    snakex += velocityx * blocksize; //to update the snake position each time
    snakey += velocityy *blocksize;
    context.fillRect(snakex, snakey, blocksize, blocksize);
    //snake body array
    for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0], snakebody[i][1],blocksize, blocksize);
    }

    //----gameover conditions-----
    //when you hit the edges if the canvas or borad
    if(snakex < 0|| snakex > cols*blocksize || snakey < 0 || snakey > rows*blocksize){
        gameover= true;
        alert("GAME OVER!! TRY AGAIN!!!");
    }
    //when the snake bumps onto itself
    for(let i = 0; i< snakebody.lenght; i++){
        if (snakex == snakebody[i][0] && snakey == snakebody[i][0]){
            gameover= true;
            alert("GAME OVER!! TRY AGAIN!!!");
        }
    }
}
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityy != 1)
    {
        velocityx=0;
        velocityy=-1;
    }
    else if (e.code == "ArrowDown" && velocityy != -1)
    {
        velocityx=0;
        velocityy=1;
    }
    else if (e.code == "ArrowLeft" && velocityx != 1)
    {
        velocityx=-1;
        velocityy=0;
    }
    else if (e.code == "ArrowRight" && velocityx != -1)
    {
        velocityx=1;
        velocityy=0;
    }
}
function food_place() {
    foodx = Math.floor(Math.random()* cols)*blocksize;
    foody = Math.floor(Math.random()* rows)*blocksize;
}