

export class ParadeGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ParadeGameScene' });
    }

    preload() {
        this.load.image('parade-bg', 'assets/images/escenario.jpg');
        this.load.image('child-red', 'assets/sprites/child-red.png');
        this.load.image('child-green', 'assets/sprites/child-green.png');
        this.load.image('child-blue', 'assets/sprites/child-blue.png');
        this.load.image('tutorial', 'assets/images/tutorial-2.png');
        this.load.audio('game-music', 'assets/sounds/game.mp3');
        this.load.audio('point', 'assets/sounds/point.mp3');
        this.load.audio('click', 'assets/sounds/click.mp3');
    }

    create() {
        const filasY = {
            red: 200,
            green: 400,
            blue: 600
        };

        this.add.image(0, 0, 'parade-bg')
        .setOrigin(0, 0)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        this.add.rectangle(this.cameras.main.width/2, filasY.red, this.cameras.main.width, 100, 0xff0000, 0.3);
        this.add.rectangle(this.cameras.main.width/2, filasY.green, this.cameras.main.width, 100, 0x00ff00, 0.3);
        this.add.rectangle(this.cameras.main.width/2, filasY.blue, this.cameras.main.width, 100, 0x0000ff, 0.3);


        this.gameDuration = 40000;
        this.speed = 10000;
        this.speedIncrease = -1000;

        this.childrenGroup = this.physics.add.group();


        this.correct = 0;
        this.total = 0;

        this.filasY = filasY;

        this.physics.world.setBoundsCollision(true, true, false, false);

        this.scoreText = this.add.text(20, 20, 'Puntuació: 0', {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 4
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });

        

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject.active) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });
        

        this.input.on('dragend', (pointer, gameObject) => {
            const fila = this.filaMesPropera(gameObject.y);
            gameObject.y = this.filasY[fila];

            const padding = 60;
            let posX = gameObject.x;

            let overlapped = true;
            let maxTries = 10;
            let direction = 1;

            while (overlapped && maxTries > 0) {
                overlapped = false;

                this.childrenGroup.getChildren().forEach(other => {
                    if (other !== gameObject && Phaser.Math.Distance.Between(posX, gameObject.y, other.x, other.y) < padding) {
                        overlapped = true;
                    }
                });

                if (overlapped) {
                    posX += direction * padding;
                    direction *= -1;
                    maxTries--;
                }
            }

            this.sound.play('click', { 
                volume: 0.4,
                rate: 0.8
            });
            gameObject.x = posX;
        });

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const tutorialImage = this.add.image(centerX, centerY, 'tutorial')
            .setOrigin(0.5)
            .setDepth(10)
            .setScale(0.9);

        this.gamePaused = true;

        this.tweens.add({
            targets: tutorialImage,
            scale: { from: 0.9, to: 1.05 },
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });


        this.time.delayedCall(4000, () => {
            tutorialImage.destroy();
            this.startGame();
            this.gamePaused = false;
        });


        this.scene.launch('AudioManagerScene');

        this.time.delayedCall(100, () => {
            const audioManager = this.scene.get('AudioManagerScene');
            if (audioManager && audioManager.playMusic) {
                audioManager.playMusic('game-music', true);
            }
        });
    }

    startGame() {

        this.time.delayedCall(this.gameDuration, this.endGame, [], this);

        this.spawnTimer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnChild,
            callbackScope: this,
            loop: true
        });

        this.speedTimer = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.speed = Math.max(3000, this.speed + this.speedIncrease);
                console.log('Nueva velocidad (duración tween):', this.speed);
            },
            callbackScope: this,
            loop: true
        });
    }

    spawnChild() {
        const colors = ['red', 'green', 'blue'];
        const color = Phaser.Utils.Array.GetRandom(colors);
        const sprite = this.physics.add.image(-50, this.filasY[color], `child-${color}`);

        if (Math.random() < 0.7) {
            const otherColors = colors.filter(c => c !== color);
            const wrongColor = Phaser.Utils.Array.GetRandom(otherColors);
            sprite.y = this.filasY[wrongColor];
        }

        sprite.setData('targetColor', color);
        sprite.setInteractive({ draggable: true });

        this.tweens.add({
            targets: sprite,
            x: this.cameras.main.width,
            duration: this.speed,
            onComplete: () => {
                this.total++;
                const filaActual = this.filaMesPropera(sprite.y);
                if (filaActual === sprite.getData('targetColor')) {
                    this.correct++;
                    this.scoreText.setText('Puntuació: ' + this.correct);

                    const rates = {
                        red: 1,
                        green: 0.8,
                        blue: 0.6
                    };

                    this.sound.play('point', {
                        volume: 0.2,
                        rate: rates[filaActual] || 1.0
                    });

                    this.mostrarPuntFlotant(filaActual, sprite.x - 100, sprite.y);
                }
                sprite.destroy();
            }
        });
        this.input.setDraggable(sprite);
        this.childrenGroup.add(sprite);
    }

    filaMesPropera(y) {
        const diffs = Object.entries(this.filasY).map(([color, posY]) => {
            return { color, diff: Math.abs(posY - y) };
        });
        diffs.sort((a, b) => a.diff - b.diff);
        return diffs[0].color;
    }

    mostrarPuntFlotant(color, x, y) {
        const coloresHex = {
            red: '#ff4444',
            green: '#44ff44',
            blue: '#4488ff'
        };

        const punto = this.add.text(x, y, '+1', {
            fontSize: '50px',
            fontStyle: 'bold',
            fill: coloresHex[color],
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.tweens.add({
            targets: punto,
            y: y - 40,
            alpha: 0,
            duration: 800,
            ease: 'Power1',
            onComplete: () => punto.destroy()
        });
    }

    endGame() {
        this.spawnTimer.remove();
        this.speedTimer.remove();

        const bgm = this.sound.get('game-music');
        if (bgm) {
            this.tweens.add({
                targets: bgm,
                volume: 0,
                duration: 2000,
                onComplete: () => {
                    bgm.stop();
                }
            });
        }

        this.time.addEvent({
            delay: 500,
            callback: () => {
                const remaining = this.childrenGroup.getChildren().length;
                if (remaining === 0) {
                    this.scene.start('ResultsScene', {
                        score: this.correct,
                        total: this.total
                    });
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    update() {

    }
}