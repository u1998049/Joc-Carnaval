

export class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenuScene' });
    }

    preload() {
        this.load.image('button-resume', 'assets/images/button-resume.png');
        this.load.image('button-exit', 'assets/images/button-quit.png');
        this.load.audio('game-music', 'assets/sounds/game.mp3');
        this.load.audio('hover', 'assets/sounds/hover.mp3');
        this.load.audio('click', 'assets/sounds/click.mp3');
    }

    create() {
        const bgm = this.sound.get('game-music');
        if (bgm && bgm.isPlaying) {
            bgm.pause();
        }

        const { width, height } = this.cameras.main;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5);

        this.add.text(width / 2, height / 2 - 100, '⏸ Joc en pausa', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);



        const buttonResume = this.add.image(width / 2, height / 2 + 10, 'button-resume').setInteractive();
        buttonResume.setScale(1);

        const resumeText = this.add.text(width / 2, height / 2 + 10, 'Continuar', {
            fontSize: '24px',
            fill: '#00ff00',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const hoverSound = this.sound.add('hover');
        const clickSound = this.sound.add('click');

        buttonResume.on('pointerover', () => {
            buttonResume.setScale(0.90);
            hoverSound.play()
        });

        buttonResume.on('pointerout', () => {
            buttonResume.setScale(1);
        });

        buttonResume.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('ParadeGameScene');
            clickSound.play()
            bgm.resume();
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop();
            this.scene.resume('ParadeGameScene');
            bgm.resume();
        });



        const buttonExit = this.add.image(width / 2, height / 2 + 110, 'button-exit').setInteractive();
        buttonExit.setScale(1);

        const exitText = this.add.text(width / 2, height / 2 + 110, 'Sortir', {
            fontSize: '24px',
            fill: '#ff0000',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        buttonExit.on('pointerover', () => {
            buttonExit.setScale(0.90);
            hoverSound.play()
        });

        buttonExit.on('pointerout', () => {
            buttonExit.setScale(1);
        });

        buttonExit.on('pointerdown', () => {
            this.scene.stop('ParadeGameScene');
            this.scene.start('MapScene');
            clickSound.play()
        });
    }
}