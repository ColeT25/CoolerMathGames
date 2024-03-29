var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function quit_game(score) {
  // Redirect the user to a certain webpage
  var current_domain_name = window.location.hostname;
  if (current_domain_name == "127.0.0.1"){
    current_domain_name += ":8000"; //make sure to add port number if running on local host
    window.location.href = `http://${current_domain_name}/games/game_end/${score}/hangman/`
  }
  else{
        window.location.href = `https://${current_domain_name}/games/game_end/${score}/hangman/` //use https when not using localhost
  }
}

var title;
var playButton;
var cursors;
var score = 0;
var man = [0,0,0,0,0,0];
var gameOver = false;
var gameStarted = false;
var firstTurnTaken = false;
var scoreText;
var instructionText = "Guess letters until you guess the word. \nDon't make too many wrong guesses or the man will hang!"
var instructions;
var gameWonText;
var gameLostText;
var newButton;
var spaces;
var currentWord = "";
var guessedletters = [];
var wrongGuessCount = 0;
var correctGuessCount = 0;
var guesstext = [0,0,0,0,0,0]; //lol
var words = [
    'absurd','absent','advice','adverb','aliens','almost','almond','ambush','anchor','admire','abduct','armpit','atrium','author','awoken','baguet','beacon',
    'binary','bishop','blouse','bonsai','bother','bougie','brainy','brains','breath','budget','brutal','busted','bustle','burlap','buckle','brunet',
    'campus','canopy','carton','castle','cashew','change',
    'danish','deform','denial','devour','dimple','dingus',
    'earthy','engulf','enigma','exotic','export','equals',
    'fabled','factor','father','facial','fiesta','flakey',
    'gamers','gather','giblet','golden',
    'habits','hanger','hanker','heroic','hiatus','hoards',
    'improv','island','impose','income','impure','import',
    'jacket','jingle','jockey','jungle',
    'kelvin','kidney','knight','keypad',
    'ladies','lancet','launch','length','linear','layers',
    'mangle','margin','marvel','mascot','master','median',
    'nachos','native','nights','nickel','nimble','nordic',
    'object','openly','opiate','orange','orchid','outlaw',
    'parcel','pathos','parole','pastry','phrase','pickle',
    'quartz','quinoa','quaker','quiver',
    'racket','radius','rancid','rating','recoup','reload','remain','remind','resize',
    'satire','sailor','salted','scythe','senior','shaken','shadow','sherif','shiver',
    'tandem','things','thorns','theory','thrive','thrown','tinder','tinker','thread',
    'unclog','uneasy','unpaid','upbeat','upload','unsaid','usable','urgent','uphold',
    'visual','values','vortex','voting','vulgar','vocals','vector','verify','victor',
    'walrus','wealth','weight','weirdo','whiten','wisdom','wizard','wicked','whirly',
    'yogurt','yonder',
    'zenith','zebras','zodiac','zombie','zygote'

]
var validKeys = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

//colors
var lightGrey = 0xD3D3D3;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ground', '../../static/cooler_math_games/hangman/platform.png');
    this.load.image('gallows', '../../static/cooler_math_games/hangman/gallows.png');
    this.load.image('title', '../../static/cooler_math_games/hangman/title.png');
    this.load.image('playButton', '../../static/cooler_math_games/hangman/playButton.png');
    this.load.image('newButton', '../../static/cooler_math_games/hangman/newButton.png');
    this.load.image('background','../../static/cooler_math_games/hangman/background.png');
    this.load.image('space','../../static/cooler_math_games/hangman/space.png');
    this.load.image('head','../../static/cooler_math_games/hangman/head.png');
    this.load.image('arm','../../static/cooler_math_games/hangman/arm.png');
    this.load.image('leg','../../static/cooler_math_games/hangman/leg.png');
    this.load.image('body','../../static/cooler_math_games/hangman/body.png');
}

function create ()
{
    //background for the game
    this.add.image(400, 300, 'background');
    var gallows = this.add.image(150, 370, 'gallows').setScale(2);
    gallows.flipX=true;
    this.add.image(400, 568, 'ground').setScale(2);

    //title screen
    title = this.add.sprite(400, 100, 'title').setScale(1.5);
    playButton = this.add.sprite(400, 200, 'playButton').setInteractive();

    playButton.on('pointerdown', function (pointer) {

        this.setTint(lightGrey);

    });
    playButton.on('pointerup', function (pointer) {

        this.clearTint();
        startGame();

    });

    //screen after end of game
    gameWonText = this.add.text(330, 200, "You Won!", { fontSize: '32px', fill: '#000', align: "center" });
    gameWonText.setActive(false).setVisible(false);
    gameLostText = this.add.text(330, 200, "You Lost!", { fontSize: '32px', fill: '#000', align: "center" });
    gameLostText.setActive(false).setVisible(false);
    newButton = this.add.sprite(400, 300, 'newButton').setInteractive();
    newButton.on('pointerdown', function (pointer) {

        this.setTint(lightGrey);

    });
    newButton.on('pointerup', function (pointer) {

        this.clearTint();
        newGame(this);

    });
    newButton.setActive(false).setVisible(false);

    //spaces to place letters on during gameplay
    spaces = this.physics.add.staticGroup({
        key: 'space',
        repeat: 5,
        setScale: 2,
        setXY: { x: 400, y: 500, stepX: 50 }
    });
    spaces.children.iterate(function (child) {
        child.disableBody(true, true);
    });

    //the stick man that will be filled in on wrong guesses
    man[0] = this.add.image(222, 340, 'head').setScale(0.5);
    man[1] = this.add.image(222, 393, 'body').setScale(0.6);
    man[2] = this.add.image(235, 390, 'leg').setScale(1.4);
    man[3] = this.add.image(208, 390, 'leg').setScale(1.4); man[3].flipX=true;
    man[4] = this.add.image(235, 435, 'leg').setScale(1.4);
    man[5] = this.add.image(208, 435, 'leg').setScale(1.4); man[5].flipX=true;
    for(let i = 0; i < man.length; i++){
        man[i].setActive(false).setVisible(false);
    }

    //place empty strings on screen where letters will be placed later
    for(let i = 0; i < guesstext.length; i++){
        guesstext[i] = scoreText = this.add.text(390 + 50*i, 465, '', { fontSize: '32px', fill: '#000' });
    }

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  The score
    scoreText = this.add.text(16, 16, 'streak: 0', { fontSize: '32px', fill: '#000' });
    scoreText.setActive(false).setVisible(false);

    //instructions for the first turn of the game
    instructions = this.add.text(10, 180, instructionText, { fontSize: '24px', fill: '#000', align: "center" });
    instructions.setActive(false).setVisible(false);

    //setup listner for keyboard input
    this.input.keyboard.on('keydown', function (event) {
        if(gameStarted){
            console.dir(event);
            checkInput(event);
        }
    });
}

function update ()
{
    //disable instructions after first turn
    if(firstTurnTaken){
        instructions.setActive(false).setVisible(false);
    }


}

function startGame(){
    //turn off features from main menu and enable some game elements
    gameStarted = true;
    title.setActive(false).setVisible(false);
    playButton.setActive(false).setVisible(false);
    instructions.setActive(true).setVisible(true);
    scoreText.setActive(true).setVisible(true);
    spaces.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
    });

    //get the word for the round
    currentWord = words[Math.floor(Math.random()*words.length)];
}

function newGame(lastRoundWon){
    gameWonText.setActive(false).setVisible(false);
    gameLostText.setActive(false).setVisible(false);
    newButton.setActive(false).setVisible(false);
    for(let i = 0; i < guesstext.length; i++){
        guesstext[i].setText("");
    }
    for(let i = 0; i < man.length; i++){
        man[i].setActive(false).setVisible(false);
    }
    correctGuessCount = 0;
    wrongGuessCount = 0;
    gameOver = false;
    guessedletters = [];
    currentWord = words[Math.floor(Math.random()*words.length)];
}

function displayGameWonScreen(){
    gameWonText.setActive(true).setVisible(true);
    newButton.setActive(true).setVisible(true);
    scoreText.setText('streak: ' + score);
}

function displayGameLostScreen(){
    gameLostText.setActive(true).setVisible(true);
    scoreText.setText('streak: ' + score);
    for (let i = 0; i < currentWord.length; i++){
        guesstext[i].setText(currentWord[i]);
    }
    quit_game(score);
    score = 0;
}
function checkInput(event){
    firstTurnTaken = true;

    //don't process input if not in a game
    if(gameOver){
        return;
    }

    //abort if keystroke was not a letter
    if(!validKeys.includes(event.key)){
        return;
    }

    //check input against all letters in current word
    for (let i = 0; i < currentWord.length; i++){
        if (event.key === currentWord[i]){
            if(!guessedletters.includes(event.key)){ //if letter is a match and hasn't been guessed yet (words will have unique letters)
                guesstext[i].setText(event.key);
                correctGuessCount ++;
                guessedletters.push(event.key);

                //remove an incorrect guess as a reward
                if(wrongGuessCount > 0){
                    wrongGuessCount--;
                    man[wrongGuessCount].setActive(false).setVisible(false);
                }

                //check if there was a winning guess
                if(correctGuessCount == guesstext.length){
                    score++;
                    gameOver = true;
                    displayGameWonScreen();
                }
            }
            return;
        }
    };
    //made it here if letter wasn't found in word
    if(!guessedletters.includes(event.key)){
        wrongGuessCount++;
        man[wrongGuessCount - 1].setActive(true).setVisible(true);
        guessedletters.push(event.key);

        //check if game was lost
        if(wrongGuessCount >= currentWord.length){

            gameOver = true;
            displayGameLostScreen();
        }
    }
}