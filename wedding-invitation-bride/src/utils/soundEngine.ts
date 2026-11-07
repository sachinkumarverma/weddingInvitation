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
  private masterGain: GainNode | null = null;
  private isMuted = false;
  private userMuted = false;
  private isPlayPending = false;
  private audioElement: HTMLAudioElement | null = null;
  private autoplayInitialized = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private getAudioElement(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioElement) {
      this.audioElement = new Audio('/Song.webm');
      this.audioElement.loop = true;
      this.audioElement.volume = 0.5;
      this.audioElement.preload = 'auto';
      this.audioElement.setAttribute('playsinline', 'true');
      (this.audioElement as any).playsInline = true;

      this.audioElement.addEventListener('play', () => {
        this.isPlayingMusic = true;
        this.notifyListeners();
      });
      this.audioElement.addEventListener('pause', () => {
        this.isPlayingMusic = false;
        this.notifyListeners();
      });
      this.audioElement.addEventListener('ended', () => {
        this.isPlayingMusic = false;
        this.notifyListeners();
      });
    }
    return this.audioElement;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlayingMusic);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.isPlayingMusic);
      } catch (e) {
        console.warn('Sound listener error:', e);
      }
    });
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
  public async startAmbientMelody(): Promise<boolean> {
    if (this.userMuted) return false;

    const audio = this.getAudioElement();
    if (!audio) return false;

    if (this.isPlayingMusic && !audio.paused) {
      return true;
    }

    if (this.isPlayPending) {
      return true;
    }

    try {
      this.isPlayPending = true;
      await audio.play();
      this.isPlayingMusic = true;
      this.initContext();
      this.notifyListeners();
      return true;
    } catch {
      // Autoplay blocked by browser policy without gesture; waiting for interaction
      this.isPlayingMusic = false;
      this.notifyListeners();
      return false;
    } finally {
      this.isPlayPending = false;
    }
  }

  public stopAmbientMelody() {
    this.isPlayingMusic = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notifyListeners();
  }

  public toggleMusic(): boolean {
    if (this.userMuted) {
      this.userMuted = false;
      this.startAmbientMelody();
      this.notifyListeners();
      return true;
    } else {
      if (this.isPlayingMusic) {
        this.userMuted = true;
        this.stopAmbientMelody();
        this.notifyListeners();
        return false;
      } else {
        this.userMuted = false;
        this.startAmbientMelody();
        this.notifyListeners();
        return true;
      }
    }
  }

  public getMusicStatus(): boolean {
    return this.isPlayingMusic;
  }

  public isUserMuted(): boolean {
    return this.userMuted;
  }

  // Autoplay by default: attempts immediate playback, and registers gesture unlock fallback
  public initAutoplay() {
    if (this.autoplayInitialized || typeof window === 'undefined') return;
    this.autoplayInitialized = true;

    // 1. Preload and attempt playback immediately
    this.startAmbientMelody();

    // 2. Set up fallback interaction listeners in case browser blocks unmuted playback without gesture
    const interactionEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];

    const removeListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true);
        document.removeEventListener(evt, handleFirstInteraction, true);
      });
    };

    const handleFirstInteraction = () => {
      if (this.userMuted) {
        removeListeners();
        return;
      }

      this.startAmbientMelody().then((success) => {
        if (success || this.isPlayingMusic) {
          removeListeners();
        }
      });
    };

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
      document.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
    });
  }
}

export const sound = new SoundEngine();

// Auto-initialize sound playback by default on load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => sound.initAutoplay());
  } else {
    sound.initAutoplay();
  }
}
