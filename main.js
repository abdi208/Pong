///---Define variables---///
var player1 = document.getElementById("playerSq");
var player2 = document.getElementById("playerSq2");
var container = document.getElementById('container');
var player1Score = document.getElementById('player1Score');
var player2Score = document.getElementById('player2Score');
var scoreP1 = 0;
var scoreP2 = 0;
var player1Pos = 225;


//---Set interval for the moveBAll callback---///
var ballanimated = setInterval(moveBall, 1000000);

///--Add event listener to the page---///
document.addEventListener("keydown", function(e) {
        movePlayerOne(e);
        movePlayer2(e);
        startGame(e);
})

///----Move both paddles up or down ---///
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
    //-----Enable for AI Mode----////
        // var player2PosUp = ball.y + ball.speed - 3* ball.directionY * ball.directionX;
        // if (player2PosUp >= ball.speed + 2 && player2PosUp > 5 && player2PosUp < 445) {
        //     player2.style.top = player2PosUp + "px";
        // }
        if (e.which === 37 && player2Pos > 5) {
            player2Pos -= 20;
            player2.style.top = player2Pos + "px";
        }else if (e.which === 39 && player2Pos < 445) {
            player2Pos += 20;
            player2.style.top = player2Pos + "px";
        }
}

///---Create an object to set up the balls position and inital speed---///
var ball1 =  {
        speed: 15,
        x: 245,
        y: 245,
        directionX: 1,
        directionY: -1
}
var ball =  ball1;
var speed = ball.speed;
///---Make sure the ball moves and detect collision---///
function moveBall(e) {
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
        document.getElementById("circle").style.left = ball.x + 'px';
        document.getElementById("circle").style.top = ball.y + 'px';
        //---enable for Ai Mode---///
        // movePlayer2(e);
        //-----------------------///
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
            ball.directionX = -1;
            //---- display message if player 2 scores----////
            document.getElementById('message2').style.visibility = "visible";
            //--hide the Score message----////
            setTimeout(function(){document.getElementById('message2').style.visibility = "hidden";},550);
            //--add 1 to the score--///
            scoreP2++;
            //--display the score on scoreboard--///
            player2Score.textContent = scoreP2;
            if(scoreP2 === 3) {
            //---- display message if player 2 is about to win----////
            document.getElementById('player2close').style.visibility = "visible";
            //--hide the about to Win message----////
            setTimeout(function(){document.getElementById('player2close').style.visibility = "hidden";},1000);
            }
            //---if player 2 scores 5 points stop the game and display the win message--//
            if(scoreP2 === 5){
                stopAnimation();
                document.getElementById("circle").style.visibility = "hidden";
                document.getElementById('player2close').style.visibility = "hidden";
                document.getElementById('player2won').style.visibility = "visible";
            }
        }
        // -- if pong passes right side of container reset at middle and serve the pong back to losing player
        if(ball.x + ball.speed * ball.directionX >= 500) {
            ball.x = 245;
            ball.y = 245;
            document.getElementById("circle").style.left = ball.x;
            document.getElementById("circle").style.top = ball.y ;
            ball.directionX = 1;
            //--add 1 to the score--///
            scoreP1++;
            //--display the score on scoreboard--///
            player1Score.textContent = scoreP1;
            //---- display message if player 1 scores----////
            document.getElementById('message1').style.visibility = "visible";
            //--hide the Score message----////
            setTimeout(function(){document.getElementById('message1').style.visibility = "hidden";},550);
            if(scoreP1 === 3) {
            //---- display message if player 1 is about to win----////
            document.getElementById('player1close').style.visibility = "visible";
            //--Quickly hide the about to Win message----////
            setTimeout(function(){document.getElementById('player1close').style.visibility = "hidden";},1000);
            }
            //---if player 1 scores 5 points stop the game and display the win message--//
            if(scoreP1 === 5){
                stopAnimation();
                document.getElementById("circle").style.visibility = "hidden";
                setTimeout(function(){document.getElementById('player1close').style.visibility = "hidden";},0);
                document.getElementById('player1close').style.visibility = "hidden";
                document.getElementById('player1won').style.visibility = "visible";
            }
        }  
    
}

function detectPaddleHit() {
        //----Declare variable to detect hit on both players paddle--//
        var player2Paddle = player2.offsetLeft - player2.offsetWidth;
        var player2Top = player2.offsetTop;
        var player2Height =  player2.offsetHeight + player2Top;

        var player1Paddle = player1.offsetLeft + player1.offsetWidth;
        var player1Top = player1.offsetTop;
        var player1Height =  player1.offsetHeight + player1Top;
        //---Check to see if pong hit right paddle--//
        if(ball.x + ball.speed * ball.directionX >= player2Paddle){
            if(ball.y + ball.speed * ball.directionY <= player2Height && ball.y + ball.speed * ball.directionY >= player2Top){
                ball.directionX = -1;
                console.log(ball.speed);
                
                
            }
        }
        //--- Check to see if pong hit left paddle--/
        if(ball.x + ball.speed * ball.directionX < player1Paddle){
            if(ball.y + ball.speed * ball.directionY <= player1Height && ball.y + ball.speed * ball.directionY >= player1Top){
                ball.directionX = 1;
                console.log(ball.speed);
                
            }
        }  
        
}

function startGame(e) {
        //---Hide the start game screen when the spacebar is hit---//
        //---Display the GameBoard and start the Game---////
        if(e.which === 32) {
            document.getElementById('startScreen').style.visibility = "hidden";
            document.getElementById('container').style.visibility = "visible";
            // wonGame = false;
            moveBall(e);
            resetGame(e);
            }
}

//---Clears the interval to stop the ball from moving---///
function stopAnimation() {
        clearInterval(ballanimated);
}
//---Loop through the title and display---///
anime.timeline({loop: true})
.add({
    targets: '.pong .word',
    scale: [1,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
}).add({
    targets: '.pong',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});
//---Set the game back to its initial state---///
function resetGame(e) {
        document.getElementById('reset').style.visibility = "hidden";
        document.getElementById("circle").style.visibility = "visible";
        document.getElementById("circle").style.backgroundColor = "white";
        player2Score.innerHTML = 0;
        player1Score.innerHTML = 0;
        scoreP1 = 0;
        scoreP2 = 0;
        player1Pos = 225;
        player2Pos = 225;
        player1.style.top = player1Pos + "px";
        player2.style.top = player2Pos + "px";
        ball.x = 245;
        ball.y = 245;
        document.getElementById("circle").style.left = ball.x + 'px';
        document.getElementById("circle").style.top = ball.y + 'px';
        moveBall(e);
        containerBorderHit(e);
        detectPaddleHit(e);
        stopAnimation(e);
        ballanimated = setInterval(moveBall, 70);
        document.getElementById('player1won').style.visibility = "hidden";
        document.getElementById('player2won').style.visibility = "hidden";

}