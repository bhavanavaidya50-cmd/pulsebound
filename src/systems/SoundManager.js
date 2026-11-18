/**
 * PULSEBOUND – SoundManager
 * Procedural Web Audio API Synthesizer for 100% reliable, zero-dependency,
 * rich futuristic sci-fi sound effects and atmospheric background ambient music.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.bgmOscs = [];
    this.bgmGain = null;
    this.isBgmPlaying = false;
    this.chordStep = 0;
    this.bgmInterval = null;

    // Load mute preference
    try {
      const savedMute = localStorage.getItem('pulsebound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
    } catch (e) {
      // Ignore local storage error
    }
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
    }
    try {
      localStorage.setItem('pulsebound_muted', this.isMuted);
    } catch (e) {}
    return this.isMuted;
  }

  // Play a synthesized sound effect
  playJump() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.14);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  playPulse() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;

    // Sub rumble
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, t);
    subOsc.frequency.exponentialRampToValueAtTime(35, t + 0.6);

    subGain.gain.setValueAtTime(0.5, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(t);
    subOsc.stop(t + 0.6);

    // Ethereal sweep
    const sweepOsc = this.ctx.createOscillator();
    const sweepGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    sweepOsc.type = 'sawtooth';
    sweepOsc.frequency.setValueAtTime(320, t);
    sweepOsc.frequency.exponentialRampToValueAtTime(880, t + 0.45);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, t);
    filter.frequency.linearRampToValueAtTime(1400, t + 0.45);
    filter.Q.value = 4.0;

    sweepGain.gain.setValueAtTime(0.25, t);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    sweepOsc.connect(filter);
    filter.connect(sweepGain);
    sweepGain.connect(this.masterGain);

    sweepOsc.start(t);
    sweepOsc.stop(t + 0.45);
  }

  playCrystalCollect() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    
    // Melodic crystalline chime (notes: E5, B5, G#6)
    const notes = [659.25, 987.77, 1661.22];
    notes.forEach((freq, idx) => {
      const start = t + idx * 0.055;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.28, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + 0.36);
    });
  }

  playHurt() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(60, t + 0.22);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.23);
  }

  playPortal() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const start = t + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + 0.52);
    });
  }

  playGameOver() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    const notes = [329.63, 293.66, 261.63, 220.00]; // E4, D4, C4, A3
    notes.forEach((freq, idx) => {
      const start = t + idx * 0.16;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + 0.42);
    });
  }

  playVictory() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    // Major triumphant flourish: C4, E4, G4, C5, E5, G5
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const start = t + idx * 0.1;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + 0.72);
    });
  }

  playButtonHover() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, t);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  playButtonClick() {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(450, t + 0.08);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Atmospheric ambient drone music
  startAmbientMusic() {
    if (!this.ctx || this.isBgmPlaying) return;
    this.resumeContext();
    this.isBgmPlaying = true;

    // Ambient chords (Am9, Fmaj7, Cmaj7, Em7)
    const chords = [
      [110.0, 164.81, 220.0, 261.63, 329.63], // A2, E3, A3, C4, E4
      [87.31, 130.81, 174.61, 261.63, 329.63], // F2, C3, F3, C4, E4
      [130.81, 196.0, 261.63, 329.63, 392.0],  // C3, G3, C4, E4, G4
      [82.41, 123.47, 164.81, 246.94, 329.63]  // E2, B2, E3, B3, E4
    ];

    const playChordStep = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const currentChord = chords[this.chordStep % chords.length];
      this.chordStep++;

      const t = this.ctx.currentTime;
      const stepDuration = 5.0;

      currentChord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(480, t);
        filter.frequency.linearRampToValueAtTime(650, t + stepDuration * 0.5);
        filter.frequency.linearRampToValueAtTime(420, t + stepDuration);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.045 / currentChord.length, t + 1.2);
        gain.gain.linearRampToValueAtTime(0.001, t + stepDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + stepDuration + 0.1);
      });
    };

    playChordStep();
    this.bgmInterval = setInterval(playChordStep, 4500);
  }

  stopAmbientMusic() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
