var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "../img/flappy_bird_bird.png";
bg.src = "../img/flappy_bird_bg.png";
fg.src = "../img/flappy_bird_fg.png";
pipeUp.src = "../img/flappy_bird_pipeUp.png";
pipeBottom.src = "../img/flappy_bird_pipeBottom.png";

var gap = 90;
//to move
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}
//boxes
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

//bird position

var xPos = 10;
var yPos = 150;
var grav = 1.5;

function drawb() {
    ctx.drawImage(bg,0, 0);

    for(var i =0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if(pipe[i].x == 125) {
        pipe.push( {
            x : cvs.width,
            y : Math.floor(Math.random()* pipeUp.height) - pipeUp.height
            });
        }
    }

    if(xPos + bird.width >= pipe[i] && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
        location.reload(); //reload
        }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;

    requestAnimationFrame(drawb);
}

pipeBottom.onload = drawb;