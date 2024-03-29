
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platformSpawnTimeSpeedup = 0.99;
var platformVelocitySpeedup = 1.01
var playerJumpIncrease = 1.001;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tile', '../../static/cooler_math_games/climber/tile.png');
    this.load.image('platform', '../../static/cooler_math_games/climber/platform.png');
    this.load.image('player', '../../static/cooler_math_games/climber/player.png');
    this.load.image('background', '../../static/cooler_math_games/climber/background2.png');
}

var platforms;
var playerJumpVelocity = -785;
var playerHorizontalVelocity = 400;
var spawnPlatform;
var player;
var score = 0;
var scoreText;
var gameOver = false;

var platformz;

function create ()
{
    platformz = this.physics.add.group();

    //background for the game
    this.add.image(400, 300, 'background');

    //start timer to make first platform
    var timer = this.time.delayedCall(2500, makePlatformz, [2500,50], this);  // delay in ms

    //create temporary platform for the player to spawn on
    spawnPlatform = this.physics.add.image(400, 300, 'platform').setImmovable(true)
    spawnPlatform.body.setAllowGravity(false);
    spawnPlatform.setScale(1);

    // The player and its settings
    player = this.physics.add.sprite(400, 250, 'player');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setScale(0.35);
    player.setCollideWorldBounds(true);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platformz);
    this.physics.add.collider(player, spawnPlatform);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //set timer to destroy spawn platform
    var timer = this.time.delayedCall(6000, destroySpawnPlatform, [], this);  // delay in ms

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //set timer to add 10 to the score every second
    var scoreTimer = this.time.addEvent({
    delay: 1000,                // ms
    callback: updateScore,
    //args: [],
    callbackScope: this,
    loop: true
});
}


function update ()
{
    if (gameOver)
    {
        return;
    }
    if (cursors.left.isDown)
    {
        player.setVelocityX(-playerHorizontalVelocity);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(playerHorizontalVelocity);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(playerJumpVelocity);
    }

    if(player.y >= 590){
        gameOver = true;
        setTimeout(quit_game, 1, score)
    }
}

function destroySpawnPlatform(){
    spawnPlatform.destroy();
}

function updateScore(){
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
}

//function that creates 2 randomly placed platforms and sets timer to call itself again
function makePlatformz(timeout,velocity){

    var chance = Phaser.Math.Between(0, 10);
    var platform;

    //create one platform near center in chance < 5
    if (chance < 4){
        platform = platformz.create(Phaser.Math.Between(200, 600), 100, 'platform').setImmovable(true);
        platform.body.setAllowGravity(false);
        platform.setVelocity(0, velocity);
        platform.setScale(1);
    }
    else{
        platform = platformz.create(Phaser.Math.Between(50, 350), 100, 'platform').setImmovable(true);
        platform.body.setAllowGravity(false);
        platform.setVelocity(0, velocity);
        platform.setScale(1);

        platform = platformz.create(Phaser.Math.Between(450, 750), 100, 'platform').setImmovable(true);
        platform.body.setAllowGravity(false);
        platform.setVelocity(0, velocity);
        platform.setScale(1);
    }

    //update player jump height to make it fair
    playerJumpVelocity *= playerJumpIncrease;

    //set a timer to call this again to create next platform group
    var timer = this.time.delayedCall(timeout, makePlatformz, [timeout * platformSpawnTimeSpeedup,velocity * platformVelocitySpeedup], this);  // delay in ms
}




function quit_game(score) {
  // Redirect the user to a certain webpage
  var current_domain_name = window.location.hostname;
  if (current_domain_name == "127.0.0.1"){
    current_domain_name += ":8000"; //make sure to add port number if running on local host
    window.location.href = `http://${current_domain_name}/games/game_end/${score}/Climber/`
  }
  else{
        window.location.href = `https://${current_domain_name}/games/game_end/${score}/Climber/` //use https when not using localhost
  }
}