import { MainMenuScene } from './scenes/MainMenuScene.js';
import { MapScene } from './scenes/MapScene.js';
import { ParadeGameScene } from './scenes/ParadeGameScene.js';
import { PauseMenuScene } from './scenes/PauseMenuScene.js';
import { ResultsScene } from './scenes/ResultsScene.js';
import { AudioManagerScene } from './scenes/AudioManagerScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Carnaval',
    width: 1280,
    height: 720,
    backgroundColor: '#ffffff',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 0 },
        debug: false
        }
    },
    scene: [
        MainMenuScene,
        MapScene,
        ParadeGameScene,
        PauseMenuScene,
        ResultsScene,
        AudioManagerScene
    ]
};

const game = new Phaser.Game(config);