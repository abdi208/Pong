
/// define variable.
var player1 = document.getElementById("playerSq");
var player2 = document.getElementById("playerSq2");
var container = document.getElementById('container');
var player1Pos = 225;
var player2Pos = 225;

//---set interval for the moveBAll callback----
var ballAnimated = setInterval(moveBall, 100);
document.addEventListener("keydown", function(e) {
    movePlayerOne(e);
    movePlayer2(e);
   
    
})
///----move both paddles--- up or down
function movePlayerOne(e) {
    if (e.which === 38 && player1Pos > 5) {
        player1Pos -= 20;
        player1.style.top = player1Pos + "px";
    }  else if (e.which === 40 && player1Pos < 445) {
        player1Pos += 20;
        player1.style.top = player1Pos + "px";
    }
}
function movePlayer2(e) {
    if (e.which === 37 && player2Pos > 5) {
        player2Pos -= 20;
        player2.style.top = player2Pos + "px";
    }  else if (e.which === 39 && player2Pos < 445) {
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
// ----make sure the ball moves and detect collision
function moveBall() {
        var ball =  ball1;
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
        document.getElementById("circle").style.left = ball.x + 'px';
        document.getElementById("circle").style.top = ball.y + 'px';

// --if the top or the bottom of the container is hit send the pong Opposite direction
        if (ball.y + ball.speed  * ball.directionY === 500) {
                ball.directionY = -1;
			}
        if (ball.y + ball.speed  * ball.directionY < 0) {
                ball.directionY = 1;
            }
// --- if the pong passes the right side of the container score point for appropriate player serve it back to right side
        if(ball.x + ball.speed * ball.directionX < 0) {
            // ball.x = 245;
            // ball.y = 245;
            ball.directionX = 1
        }
// -- if pong passes left side of container reset at middle and serve the pong back to losing player
        if(ball.x + ball.speed * ball.directionX > 500) {
            // ball.x = 245;
            // ball.y = 245;
            ball.directionX = -1
            
        }
        var player2Paddle = player2.offsetLeft
        var player2Top = player2.offsetTop
        var player2Height =  player2.offsetHeight + player2Top
//--- check to see if pong hit player--/
        if(ball.x + ball.speed * ball.directionX >= player2Paddle){
            if(ball.y + ball.speed * ball.directionY <= player2Height && ball.y + ball.speed * ball.directionY >= player2Top){
                console.log("big dawg")
                ball.directionX = -1
                
            }
        }   
}
 