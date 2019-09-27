console.log('hello');

var player1 = document.getElementById("playerSq");
var player2 = document.getElementById("playerSq2");
var ball = document.getElementById('circle');
var topX = 225;
var top2x = 225;
var cirX = 245;
var cirY = 245;
var gameOver = false;
// var cirY =
console.log(ball.offsetTop);
console.log(ball.offsetLeft);
console.log(player2.offsetLeft);


console.log(player1.offsetTop)
document.addEventListener("keydown", function(e) {
    console.log(e.which);
    movePlayerOne(e);
    movePlayer2(e);
    moveBall(e);
    console.log(player1.offsetTop)
    console.log(player2.offsetTop)
})

function movePlayerOne(e) {
    if (e.which === 38 && topX > 5) {
        topX -= 20;
       player1.style.top = topX + "px";
    }  else if (e.which === 40 && topX < 445) {
        topX += 20;
       player1.style.top = topX + "px";
    }
}
function movePlayer2(e) {
    if (e.which === 37 && top2x > 5) {
        top2x -= 20;
       player2.style.top = top2x + "px";
    }  else if (e.which === 39 && top2x < 445) {
        top2x += 20;
       player2.style.top = top2x + "px";
    }
}
