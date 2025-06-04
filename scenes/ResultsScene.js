

export class ResultsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ResultsScene' });
    }

    preload() {
        this.load.image('star', 'assets/images/star.png');
        this.load.audio('starSound', 'assets/sounds/star.mp3');
        this.load.audio('stars0', 'assets/sounds/0-stars.mp3');
        this.load.audio('stars1', 'assets/sounds/1-stars.mp3');
        this.load.audio('stars2', 'assets/sounds/2-stars.mp3');
        this.load.audio('stars3', 'assets/sounds/3-stars.mp3');
    }

    init(data) {
        this.score = data.score;
        this.total = data.total;
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#222');


        this.add.text(centerX, 80, 'Resultats del minijoc', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);


        this.add.text(centerX, 140, `Puntuació: ${this.score} / ${this.total}`, {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);

        const percent = this.score / this.total;
        let stars = 0;
        if (percent >= 1) stars = 3;
        else if (percent >= 0.75) stars = 2;
        else if (percent >= 0.5) stars = 1;

        const prevStars = parseInt(localStorage.getItem('stars-parade') || '0');
        if (stars > prevStars) {
            localStorage.setItem('stars-parade', stars);
        }

        let rateUp = 0

        for (let i = 0; i < stars; i++) {
            rateUp += 0.2
            const star = this.add.image(centerX - 80 + i * 80, centerY, 'star')
                .setScale(0)
                .setAlpha(0);

            this.tweens.add({
                targets: star,
                scale: 1,
                alpha: 1,
                duration: 1000,
                delay: 500 + i * 300,
                ease: 'Back.easeOut'
            });

            this.sound.play('starSound', { 
                volume: 0.6,
                rate: 0.8 + rateUp
            });
        }

        if (stars === 0) this.sound.play('stars0', {volume: 0.5});
        else if (stars === 1) this.sound.play('stars1', {volume: 0.5});
        else if (stars === 2) this.sound.play('stars2', {volume: 0.5});
        else if (stars === 3) this.sound.play('stars3', {volume: 0.5});

        const mapBtn = this.add.text(centerX, centerY + 120, '[ Tornar al mapa ]', {
            fontSize: '20px',
            fill: '#00ffcc'
        }).setOrigin(0.5).setInteractive();

        mapBtn.on('pointerdown', () => {
            this.scene.start('MapScene');
        });

        const retryBtn = this.add.text(centerX, centerY + 170, '[ Repetir minijoc ]', {
            fontSize: '20px',
            fill: '#ffff00'
        }).setOrigin(0.5).setInteractive();

        retryBtn.on('pointerdown', () => {
            this.scene.start('ParadeGameScene');
        });
    }
}