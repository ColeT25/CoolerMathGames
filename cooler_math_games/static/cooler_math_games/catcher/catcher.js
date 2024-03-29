function quit_game(score) {
  // Redirect the user to a certain webpage
  var current_domain_name = window.location.hostname;
  if (current_domain_name == "127.0.0.1"){
    current_domain_name += ":8000"; //make sure to add port number if running on local host
    window.location.href = `http://${current_domain_name}/games/game_end/${score}/Catcher/`
  }
  else{
        window.location.href = `https://${current_domain_name}/games/game_end/${score}/Catcher/` //use https when not using localhost
  }
}

const gameState = {
    //game starts out at zero
    score: 0
  }
  
  function preload() {
    this.load.image('bug1', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_1.png');
    this.load.image('bug2', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_2.png');
    this.load.image('bug3', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png');
    this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
    this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
  }
  
  function create() {
    const platforms = this.physics.add.staticGroup();
  
    platforms.create(320, 350, 'platform').setScale(2, 0.5).refreshBody();
  
    gameState.scoreText = this.add.text(320, 340, 'Score: 0', { fontSize: '20px', fill: '#000' });
    gameState.timeText = this.add.text(10, 10, 'Time: 15', { fontSize: '20px', fill: '#000' });
  
    this.player = this.physics.add.sprite(320, 300, 'codey').setScale(.5);
  
    this.player.setCollideWorldBounds(true);
  
    this.physics.add.collider(this.player, platforms);
  
    const bugs = this.physics.add.group();
  
    const bugList = ['bug1', 'bug2', 'bug3'];
  
    const bugGen = () => {
      const xCoord = Math.random() * 640;
      let randomBug = bugList[Math.floor(Math.random() * 3)];
      bugs.create(xCoord, 10, randomBug);
    }
  
    const bugGenLoop = this.time.addEvent({
      //controls how many bugs are generated 
      delay: 100,
      callback: bugGen,
      loop: true,
    });
  
    this.physics.add.collider(this.player, bugs, (player, bug) => {
      bug.destroy();
      gameState.score++;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    });
    
    //set timer to 15 seconds
    let timeLimit = 15;
    gameState.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        timeLimit--;
        gameState.timeText.setText(`Time: ${timeLimit}`);
        if (timeLimit === 0) {
          bugGenLoop.remove();
          gameState.timer.remove();
          this.physics.pause();
          this.add.text(200, 150, 'Time\'s up!', { fontSize: '40px', fill: '#000' });
          setTimeout(quit_game(gameState.score), 5000);
        }
      },
      loop: true,
    });

      // Add a restart button
    gameState.restartButton = this.add.text(550, 20, 'Restart', { fontSize: '20px', fill: '#000' });
    gameState.restartButton.setInteractive();
    gameState.restartButton.on('pointerdown', () => {
    // Reload the current scene to restart the game
        this.scene.restart();
    });

  }
  
  function update() {
    const cursors = this.input.keyboard.createCursorKeys();
  
    if (cursors.left.isDown) {
      this.player.setVelocityX(-400)
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(400)
    } else {
      this.player.setVelocityX(0);
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    backgroundColor: "b9eaff",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 150 },
        enableBody: true,
        debug: false,
      }
    },
    scene: {
      preload,  
	  create,
	  update
	}
}

const game = new Phaser.Game(config)