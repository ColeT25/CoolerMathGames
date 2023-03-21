// Get the player and enemy elements
var player = document.getElementById("player");
var enemy = document.getElementById("enemy");

// Move the player towards the cursor on mousemove event
document.addEventListener('mousemove', function(event) {
    player.style.left = event.clientX - player.offsetWidth / 2 + "px";
    player.style.top = event.clientY - player.offsetHeight / 2 + "px";
});

// Set the enemy's starting position
var enemyX = 10;
var enemyY = 10;

enemy.style.top = enemyY + "px";
enemy.style.left = enemyX + "px";

// Move the enemy towards the player every 50 milliseconds
setInterval(function() {
    var playerX = parseInt(player.style.left, 10) + player.offsetWidth / 2;
    var playerY = parseInt(player.style.top, 10) + player.offsetHeight / 2;

    if (enemyX < playerX) {
        enemyX++;
    } else if (enemyX > playerX) {
        enemyX--;
    }

    if (enemyY < playerY) {
        enemyY++;
    } else if (enemyY > playerY) {
        enemyY--;
    }

    enemy.style.top = enemyY + "px";
    enemy.style.left = enemyX + "px";
}, 50);