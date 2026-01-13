export class SoundUtil {
    static soundManager = new Map<string, HTMLAudioElement>();


    static addSound(name: string, src: string) {
        this.soundManager.set(name, new Audio(src));
    }


    static playSound(name: string, loop: boolean = false) {
        const audio = this.soundManager.get(name);

        if (!audio) return;
        audio.currentTime = 0;
        audio.loop = loop;
        audio.play();
    }


    static mute(name: string, isMute: boolean) {
        const audio = this.soundManager.get(name);

        if (!audio) return;
        audio.muted = isMute;
    }


    static stop(name: string) {
        const audio = this.soundManager.get(name);

        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
    }
}