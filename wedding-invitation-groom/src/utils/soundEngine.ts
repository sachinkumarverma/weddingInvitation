/**
 * Luxury Web Audio API Sound Engine
 * Provides an authentic, soothing ambient Indian wedding musical landscape
 * (Flute, Sitar & Tanpura acoustic harmonic drone) and physical interaction FX:
 * - Envelope opening / paper unseal
 * - Wax stamp break sound
 * - Gold shimmer / chime
 * - Confetti celebration chime
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicInterval: any = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private isMuted = false;
  private audioElement: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft acoustic chime / sitar pluck note
  public playSitarNote(freq: number, duration = 1.8, type: OscillatorType = 'triangle', gainFactor = 0.25) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Add gentle Indian sitar meend (pitch glide)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.008, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.4);

      // Subtle harmonic overtone for metallic string warmth
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(gainFactor, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      oscHarmonic.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      oscHarmonic.start(now);

      osc.stop(now + duration);
      oscHarmonic.stop(now + duration);
    } catch (e) {
      console.warn('Audio note error:', e);
    }
  }

  // Envelope Opening Paper Rustle / Unseal Sound
  public playEnvelopeOpen() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;

      // Soft whoosh filter sweep
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.7);

      // Accompanied by auspicious temple chime scale (Sa-Re-Ga-Pa-Dha Raag Yaman notes)
      const ragaNotes = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33];
      ragaNotes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playSitarNote(freq, 2.2, 'sine', 0.12);
        }, 150 + idx * 120);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Auspicious Temple Bell / Gong Sound
  public playBellGong() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const fundamental = 440; // A4
      const harmonics = [1, 2.76, 5.4, 8.93];
      const gains = [0.2, 0.1, 0.05, 0.02];

      harmonics.forEach((h, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * h, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(gains[i], now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {
      console.warn('Bell error:', e);
    }
  }

  // Wax Seal Tap/Snap Sound

  public playWaxSealSnap() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.09);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn(e);
    }
  }

  // Gold Shimmer / Scratch Card Reveal Sound
  public playGoldShimmer() {
    const scale = [587.33, 659.25, 739.99, 880.00, 987.77, 1174.66];
    scale.forEach((freq, i) => {
      setTimeout(() => {
        this.playSitarNote(freq, 1.2, 'sine', 0.08);
      }, i * 70);
    });
  }

  // Celebration Harp & Auspicious Chime (For RSVP submission / Easter Egg)
  public playCelebrationChimes() {
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playSitarNote(freq, 2.5, 'triangle', 0.14);
      }, i * 90);
    });
  }

  // Start continuous soothing ambient wedding background melody
  public startAmbientMelody() {
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    if (!this.audioElement) {
      this.audioElement = new Audio('/Song.webm');
      this.audioElement.loop = true;
      this.audioElement.volume = 0.5;
    }
    
    this.audioElement.play().catch(e => {
      console.warn('Audio playback failed', e);
      this.isPlayingMusic = false;
    });
  }

  public stopAmbientMelody() {
    this.isPlayingMusic = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.stopAmbientMelody();
      return false;
    } else {
      this.startAmbientMelody();
      return true;
    }
  }

  public getMusicStatus(): boolean {
    return this.isPlayingMusic;
  }
}

export const sound = new SoundEngine();
