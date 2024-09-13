export default class Sound {
  private static stopCallback: (() => void) | null = null;

  private static stopCurrentAudio() {
    if (Sound.stopCallback) {
      Sound.stopCallback();
      Sound.stopCallback = null;
    }
  }

  /**
   * Read text using TTS
   * @param text - Text to read
   */
  public static readTTS(text: string) {
    try {
      this.readTTSGoogle(text);
      return;
    } catch (e) {
      console.info('Google TTS failed');
    }
    try {
      this.readTTSResponsiveVoice(text);
      return;
    } catch (e) {
      console.info('ResponsiveVoice TTS failed');
    }
  }

  private static readTTSGoogle(text: string) {
    Sound.stopCurrentAudio();
    const audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&tl=en-US&client=tw-ob&q="${encodeURIComponent(text)}"`);
    audio.play();
    this.stopCallback = () => {
      audio.pause();
    };
    audio.addEventListener('ended', () => {
      this.stopCallback = null;
    });
  }

  private static readTTSResponsiveVoice(text: string) {
    Sound.stopCurrentAudio();
    const audio = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(audio);
    this.stopCallback = () => {
      window.speechSynthesis.cancel();
    };
  }

  /**
   * Play audio from a URL
   * @param url - URL of the audio file
   * @private
   * @throws {Error} - If the audio file is not found
   */
  public static async playAudio(url: string) {
    if (!url) { throw new Error('Audio file not found'); }
    Sound.stopCurrentAudio();
    const audio = new Audio(url);
    await audio.play();
    this.stopCallback = () => {
      audio.pause();
    };
  }
}