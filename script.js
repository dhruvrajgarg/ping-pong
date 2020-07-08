var ball = document.getElementById("ball");
var rod1 = document.getElementById("rod-1");
var rod2 = document.getElementById("rod-2");
var scoreBoard = document.getElementById("score-board");
var highScoreBoard = document.getElementById("high-score");
var topInc = true,leftInc = true;
var intervalId = -1;
var yourScore;
var highScore;
setHighScore();
window.addEventListener("keydown",function(event){
    var key = event.code;
    var rodPos = rod1.getBoundingClientRect();
    var rodInc = 30;

    if(key=="Enter"||key=="NumpadEnter"){
        if(intervalId!==-1) {
            clearInterval(intervalId);
            intervalId = -1;
            resetBall();
        }else{
            resetBall();
            alert("High Score   "+ highScore);
            intervalId = setInterval(ballMovement,1);
        }
    }else if(key=="ArrowLeft"||key=="KeyA"){
        if(rodPos.left>0){
            rod1.style.left = rodPos.left-rodInc;
            rod2.style.left = rodPos.left-rodInc;
        }
    }else if(key=="ArrowRight"||key=="KeyD"){
        if(rodPos.left+rodInc<(window.innerWidth-rodPos.width)){
            rod1.style.left = rodPos.left+rodInc;
            rod2.style.left = rodPos.left+rodInc;
        }
    }
});

function resetBall(){
    ball.style.left = "50%";
    ball.style.top = "5%";
    yourScore = 0;
    topInc = true,leftInc = true;
    scoreBoard.innerText = "Your Score : "+yourScore;
    rod1.style.left = "45%";
    rod2.style.left = "45%";
}
function setHighScore(){
    if(localStorage.getItem("high-score")!==undefined){
        highScore = localStorage.getItem("high-score")*1;
    }else {
        highScore = 0;
        localStorage.setItem("high-score",0);
    }
    highScoreBoard.innerText = "High Score : "+highScore;
}
function ballMovement(){
    var ballPos = ball.getBoundingClientRect();
    var rodPos = rod1.getBoundingClientRect();
    var maxLeft = window.innerWidth-ballPos.width;
    var inc = setSpeed();
    if(ballPos.top<=rodPos.height){
        if(ballPos.left+ballPos.width>=rodPos.left && ballPos.left+ballPos.width<=(rodPos.left+rodPos.width)){
            topInc = true;
            yourScore+=10;
            scoreBoard.innerText = "Your Score : "+yourScore;
        }else if(ballPos.top<=0){// stop Interval
            clearInterval(intervalId);
            intervalId = -1;
            if(yourScore>=highScore){
                localStorage.setItem("high-score",yourScore);
                setHighScore();
                alert("Your Score  "+yourScore+"  is High Score.");
            }else{
                alert("Your Score  "+yourScore);
            }
        }
    }
    else if(ballPos.top>=(window.innerHeight-(rodPos.height+ballPos.height))){
        if(ballPos.left+ballPos.width>=rodPos.left && ballPos.left+ballPos.width<=(rodPos.left+rodPos.width)){
            topInc = false;
            yourScore+=10;
            scoreBoard.innerText = "Your Score : "+yourScore;
        }else if(ballPos.top>=window.innerHeight-ballPos.height){// stop Interval
            clearInterval(intervalId);
            intervalId = -1;
            if(yourScore>=highScore){
                localStorage.setItem("high-score",yourScore);
                setHighScore();
                alert("Your Score  "+yourScore+"  is High Score.");
            }else{
                alert("Your Score  "+yourScore);
            }

        }
    }

    if(ballPos.left<=0) leftInc = true;
    else if(ballPos.left>=maxLeft) leftInc = false;

    if(topInc) ball.style.top = ballPos.top+inc;
    else ball.style.top = ballPos.top-inc;
    if(leftInc) ball.style.left = ballPos.left+inc;
    else ball.style.left = ballPos.left-inc;
}
function setSpeed(){
    if(yourScore<=100) return 1;
    else if(yourScore<=250) return 1.5;
    return 2.5;
}
