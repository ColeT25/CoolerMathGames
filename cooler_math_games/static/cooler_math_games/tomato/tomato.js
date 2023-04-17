const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 }
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        const game = new Phaser.Game(config);
        let player, stars, maggots, cursors, nextStarTime, spacebar, score, scoreText;

        function preload() {
            this.load.image('sky', 'https://labs.phaser.io/assets/skies/spookysky.jpg');
            this.load.image('star', 'https://labs.phaser.io/assets/sprites/tomato.png');
            this.load.image('ship', 'https://labs.phaser.io/assets/sprites/clown.png');
            this.load.image('maggot', 'https://labs.phaser.io/assets/sprites/slime.png');
        }

        function create() {
            this.add.image(400, 300, 'sky');

            player = this.physics.add.sprite(100, 500, 'ship');
            player.setCollideWorldBounds(true);

            stars = this.physics.add.group();
            maggots = this.physics.add.group();
            nextStarTime = 0;

            cursors = this.input.keyboard.createCursorKeys();
            spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

            this.physics.add.collider(player, stars, collectStar, null, this);
            
            this.physics.add.collider(player, maggots, gameOver, null, this);

            score = 0;
            scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
        }

        let generateMaggot = false;

        function update(time) {
            if (cursors.left.isDown) {
                player.setVelocityX(-200);
            } else if (cursors.right.isDown) {
                player.setVelocityX(200);
            } else {
                player.setVelocityX(0);
            }
            
            if (cursors.down.isDown) {
                player.setVelocityY(200);
            } 

            if (spacebar.isDown && (player.body.onFloor() || player.body.touching.down)) {
                player.setVelocityY(-230);
            }

            if (time > nextStarTime) {
                nextStarTime = time + Phaser.Math.Between(1000, 2000);

                if (generateMaggot) {
                    let maggot = maggots.create(800, 570, 'maggot');
                    maggot.body.allowGravity = false;
                    maggot.setVelocityX(-100);
                } else {
                    let star = stars.create(800, 570, 'star');
                    star.body.allowGravity = false;
                    star.setVelocityX(-100);
                }

                generateMaggot = !generateMaggot;
            }

            // Update crate and maggot positions and remove them if necessary
            stars.children.iterate(function (star) {
                if (star.x < -50) {
                    star.x = 800;
                }
            });

            maggots.children.iterate(function (maggot) {
                if (maggot.x < -50) {
                    maggot.x = 800;
                }
            });
        }

        function collectStar(player, star) {
            star.disableBody(true, true);
            score++; // Increase the score
            scoreText.setText('score: ' + score); // Update score
        }
        
        function gameOver(player, maggot) {
            // Stop the game
            this.physics.pause();

            // Make the player tinted red
            player.setTint(0xff0000);

            // Display 'Game Over' text
            let gameOverText = this.add.text(200, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
        }
