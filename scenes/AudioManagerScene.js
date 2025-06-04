

export class AudioManagerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AudioManagerScene' });
        this.currentTrackKey = null;
    }

    create() {

    }

    playMusic(key, repeat = false) {
        console.log(this.currentTrackKey)
        if (this.currentTrackKey === key && !repeat) return;

        if(this.currentTrackKey) this.currentTrack.stop();
        this.currentTrack = this.sound.add(key, { loop: true, volume: 0.3 });
        this.currentTrackKey = key;

        this.currentTrack.play();
    }
}