/**
 * Ambient Audio Engine for LabXplore Pomodoro Study Rooms
 * Synthesizes procedural soundscapes natively using the Web Audio API.
 * No external mp3 files required; zero CORS issues, instant playback.
 */

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.currentTrack = null;
    this.activeNodes = [];
    this.bubbleTimer = null;
    this.volume = 0.5;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  stop() {
    if (this.bubbleTimer) {
      clearInterval(this.bubbleTimer);
      this.bubbleTimer = null;
    }

    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {}
    });
    this.activeNodes = [];
    this.currentTrack = null;
  }

  stopAll() {
    this.stop();
  }

  isPlaying() {
    return !!this.currentTrack;
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  getAnalyserData() {
    if (!this.analyser) return new Uint8Array(32);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  /**
   * 1. Sci-Fi Spaceship Engine (Physics Mode)
   * Deep 55Hz resonant sub-bass drone with modulated LFO
   */
  startSpaceship() {
    if (!this.initContext()) return;
    this.stop();
    this.currentTrack = 'spaceship';

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Sub-oscillator 1 (Fundamental Drone)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, now); // A1 note

    // Sub-oscillator 2 (Detuned harmonic)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110.4, now);

    // Warm Low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, now);
    filter.Q.setValueAtTime(3.5, now);

    // LFO to create a slow pulsating engine hum
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, now); // 0.18 Hz slow cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(35, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Track gain
    const trackGain = ctx.createGain();
    trackGain.gain.setValueAtTime(0.35, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(trackGain);
    trackGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    lfo.start(now);

    this.activeNodes.push(osc1, osc2, lfo, lfoGain, filter, trackGain);
  }

  startSpaceshipDrone(vol) {
    this.startSpaceship();
  }

  startRainfall(vol) {
    this.startCosmicRain();
  }

  /**
   * 2. Bubbling Chemistry Lab (Chemistry Mode)
   * Continuous gentle boiling murmur with procedural popping bubbles
   */
  startBubblingLab() {
    if (!this.initContext()) return;
    this.stop();
    this.currentTrack = 'bubbling';

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Background gentle liquid hiss / murmur
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Pink-brown filter
      lastOut = output[i];
      output[i] *= 1.8;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(420, now);
    noiseFilter.Q.setValueAtTime(1.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    whiteNoise.start(now);
    this.activeNodes.push(whiteNoise, noiseFilter, noiseGain);

    // Function to trigger an individual bubble "bloop"
    const triggerBubble = () => {
      if (this.currentTrack !== 'bubbling' || !this.ctx) return;
      const bCtx = this.ctx;
      const bNow = bCtx.currentTime;

      const osc = bCtx.createOscillator();
      const gain = bCtx.createGain();

      // Pitch sweep upwards (300Hz -> 900Hz)
      const startFreq = 280 + Math.random() * 320;
      const endFreq = startFreq + 250 + Math.random() * 300;
      const duration = 0.06 + Math.random() * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, bNow);
      osc.frequency.exponentialRampToValueAtTime(endFreq, bNow + duration);

      // Volume envelope (quick snap)
      gain.gain.setValueAtTime(0.001, bNow);
      gain.gain.linearRampToValueAtTime(0.18 + Math.random() * 0.12, bNow + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, bNow + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(bNow);
      osc.stop(bNow + duration);
    };

    // Staggered bubble interval
    const scheduleNextBubble = () => {
      if (this.currentTrack !== 'bubbling') return;
      triggerBubble();
      const delay = 120 + Math.random() * 380;
      this.bubbleTimer = setTimeout(scheduleNextBubble, delay);
    };

    scheduleNextBubble();
  }

  /**
   * 3. Cosmic Rain / Deep Focus (Pink Noise Stream)
   * Smooth, relaxing sound of rain droplets & white noise
   */
  startCosmicRain() {
    if (!this.initContext()) return;
    this.stop();
    this.currentTrack = 'cosmic_rain';

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.07;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, now);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(now);
    this.activeNodes.push(noiseSource, filter, gain);
  }
}

export const audioEngine = new AmbientAudioEngine();
