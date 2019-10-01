
/// define variable.
var player1 = document.getElementById("playerSq");
var player2 = document.getElementById("playerSq2");
var container = document.getElementById('container');
var player1Score = document.getElementById('player1Score');
var player2Score = document.getElementById('player2Score');
var scoreP1 = 0;
var scoreP2 = 0;
var player1Pos = 225;
var player2Pos = 225;

//---set interval for the moveBAll callback----

document.addEventListener("keydown", function(e) {
    movePlayerOne(e);
    movePlayer2(e);
    startGame(e);
   
    
})
///----move both paddles--- up or down
function movePlayerOne(e) {
    if (e.which === 38 && player1Pos > 5) {
        player1Pos -= 20;
        player1.style.top = player1Pos + "px";
    }else if (e.which === 40 && player1Pos < 445) {
        player1Pos += 20;
        player1.style.top = player1Pos + "px";
    }
}
function movePlayer2(e) {
    if (e.which === 37 && player2Pos > 5) {
        player2Pos -= 20;
        player2.style.top = player2Pos + "px";
    }else if (e.which === 39 && player2Pos < 445) {
        player2Pos += 20;
        player2.style.top = player2Pos + "px";
    }
}

/// Create an object to set up the balls postion and inital speed------
var ball1 =  {
    speed: 15,
    x: 245,
    y: 245,
    directionX: 1,
    directionY: -1
}
var ball =  ball1;
// ----make sure the ball moves and detect collision
function moveBall() {
        
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
        document.getElementById("circle").style.left = ball.x + 'px';
        document.getElementById("circle").style.top = ball.y + 'px';

        containerBorderHit();
        detectPaddleHit();
 
}
function containerBorderHit() {
    
        // --if the top or the bottom of the container is hit send the pong Opposite direction
        if (ball.y + ball.speed  * ball.directionY === 500) {
            ball.directionY = -1;
        }
        if (ball.y + ball.speed  * ball.directionY < 0) {
            ball.directionY = 1;
        }
// --- if the pong passes the left side of the container score point for appropriate player serve it back to left side
        if(ball.x + ball.speed * ball.directionX <= 0) {
            ball.x = 245;
            ball.y = 245;
            document.getElementById("circle").style.left = ball.x + 'px';
            document.getElementById("circle").style.top = ball.y + 'px';
            ball.directionX = -1
            scoreP2++
            player2Score.textContent = scoreP2
        }
// -- if pong passes right side of container reset at middle and serve the pong back to losing player
        if(ball.x + ball.speed * ball.directionX >= 500) {
            ball.x = 245;
            ball.y = 245;
            document.getElementById("circle").style.left = ball.x;
            document.getElementById("circle").style.top = ball.y ;
            ball.directionX = 1
            scoreP1++
            player1Score.textContent = scoreP1
        }
}

function detectPaddleHit() {
    var player2Paddle = player2.offsetLeft + player2.offsetWidth
    var player2Top = player2.offsetTop
    var player2Height =  player2.offsetHeight + player2Top

    var player1Paddle = player1.offsetLeft + player1.offsetWidth
    var player1Top = player1.offsetTop
    var player1Height =  player1.offsetHeight + player1Top

    //--- check to see if pong hit right paddle--/
    if(ball.x + ball.speed * ball.directionX >= player2Paddle){
        if(ball.y + ball.speed * ball.directionY <= player2Height && ball.y + ball.speed * ball.directionY >= player2Top){
            ball.directionX = -1
            
        }
    }
    
//--- check to see if pong hit left paddle--/
    if(ball.x + ball.speed * ball.directionX < player1Paddle){
        if(ball.y + ball.speed * ball.directionY <= player1Height && ball.y + ball.speed * ball.directionY >= player1Top){
            ball.directionX = 1
            
        }
    }  
}
function startGame(e) {
    if(e.which === 32) {
        document.getElementById('startScreen').style.visibility = "hidden";
        document.getElementById('container').style.visibility = "visible";
        var ballAnimated = setInterval(moveBall, 100);
    }

}