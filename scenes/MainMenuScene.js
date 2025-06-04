

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        this.load.image('bg', 'assets/images/menu-bg.jpg');
        this.load.image('button', 'assets/images/button.png');
        this.load.image('button-hover', 'assets/images/button-hover.png');
        this.load.audio('menu-music', 'assets/sounds/menu.mp3');
        this.load.audio('hover', 'assets/sounds/hover.mp3');
        this.load.audio('click', 'assets/sounds/click.mp3');
    }

    create() {
        this.scene.launch('AudioManagerScene');

        this.time.delayedCall(100, () => {
            const audioManager = this.scene.get('AudioManagerScene');
            if (audioManager && audioManager.playMusic) {
                audioManager.playMusic('menu-music');
            }
        });

        const centerX = this.cameras.main.width / 2;

        this.add.image(0, 0, 'bg')
          .setOrigin(0, 0)
          .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const title = this.add.text(centerX, 100, 'Carnaval', {
            fontSize: '40px',
            color: '#fff',
            fontFamily: 'Arial',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        const startButton = this.add.image(centerX, 500, 'button').setInteractive();
        const buttonText = this.add.text(centerX, 500, 'Iniciar', {
            fontSize: '24px',
            color: '#000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        const hoverSound = this.sound.add('hover');
        const clickSound = this.sound.add('click');

        startButton.on('pointerover', () => {
            startButton.setTexture('button-hover');
            hoverSound.play()
        });
            startButton.on('pointerout', () => {
            startButton.setTexture('button');
        });
        startButton.on('pointerdown', () => {
            this.scene.start('MapScene');
            clickSound.play()
        });
    }
}