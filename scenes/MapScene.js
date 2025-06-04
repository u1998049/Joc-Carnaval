

export class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    preload() {
        this.load.image('map-bg', 'assets/images/mapa-carnaval.jpg');
        this.load.image('marker1', 'assets/images/map-marker.png');
        this.load.image('marker-disabled', 'assets/images/map-marker-disabled.png');
        this.load.image('marker-hover', 'assets/images/map-marker-hover.png');
        this.load.image('star', 'assets/images/star.png');
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
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, 'map-bg')
          .setOrigin(0, 0)
          .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.text(centerX, 50, 'Selecciona un minijoc', {
            fontFamily: 'Fredoka',
            fontSize: '32px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        const paradeStars = parseInt(localStorage.getItem('stars-parade') || '0');
        const marker1 = this.add.image(200, 300, 'marker1').setInteractive();
        marker1.setScale(1);

        if (paradeStars > 0) {
            marker1.setTint(0xffff00);
        }

        const hoverSound = this.sound.add('hover');
        const clickSound = this.sound.add('click');

        marker1.on('pointerover', () => {
            marker1.setScale(1.55);
            marker1.setTexture('marker-hover');
            hoverSound.play()
        });

        marker1.on('pointerout', () => {
            marker1.setScale(1);
            marker1.setTexture('marker1');
        });

        marker1.on('pointerdown', () => {
            this.scene.start('ParadeGameScene');
            clickSound.play()
        });

        this.add.text(200, 400, 'Desfilada', {
            fontFamily: 'Fredoka',
            fontSize: '16px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        const locked = this.add.image(500, 300, 'marker-disabled');
        locked.setScale(1);
        locked.setAlpha(0.8);

        this.add.text(500, 400, 'Pròximament', {
            fontFamily: 'Fredoka',
            fontSize: '16px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        for (let i = 0; i < paradeStars; i++) {
            this.add.image(180 + i * 20, 340, 'star').setScale(0.5);
        }
        
    }
}