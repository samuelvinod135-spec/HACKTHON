import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Minimize2,
  Atom,
  FlaskConical,
  CloudRain,
  CheckCircle2,
  Flame,
  Award,
  Clock,
  Coffee,
  Brain,
  Headphones,
  Sliders,
} from 'lucide-react';
import { audioEngine } from '../../utils/ambientAudioEngine.js';

const TIMER_MODES = [
  { id: 'focus', label: 'Deep Focus', duration: 25 * 60, icon: Brain, color: 'text-sky-500' },
  { id: 'shortBreak', label: 'Short Break', duration: 5 * 60, icon: Coffee, color: 'text-emerald-500' },
  { id: 'longBreak', label: 'Long Break', duration: 15 * 60, icon: Sparkles, color: 'text-purple-500' },
];

const SOUND_TRACKS = [
  {
    id: 'spaceship',
    title: 'Sci-Fi Spaceship Engine',
    subtitle: 'Physics · Deep Resonant 55Hz Fusion Hum',
    icon: Atom,
    themeColor: 'from-sky-500 to-blue-600',
    borderColor: 'border-sky-300',
    bgActive: 'bg-sky-50',
    badgeText: 'Physics Focus',
  },
  {
    id: 'bubbling',
    title: 'Bubbling Chemistry Lab',
    subtitle: 'Chemistry · Procedural Beaker Boiling & Plops',
    icon: FlaskConical,
    themeColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-300',
    bgActive: 'bg-emerald-50',
    badgeText: 'Chemistry Focus',
  },
  {
    id: 'cosmic_rain',
    title: 'Cosmic Rain & Focus Static',
    subtitle: 'Astronomy · Ambient Pink Noise Soundscape',
    icon: CloudRain,
    themeColor: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-300',
    bgActive: 'bg-purple-50',
    badgeText: 'Zen Calm',
  },
];

export default function PomodoroStudyRoom({ isFullscreenOverlay = false, onClose }) {
  // Timer states
  const [currentMode, setCurrentMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    return parseInt(localStorage.getItem('labxplore_pomodoro_completed') || '3', 10);
  });
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(() => {
    return parseInt(localStorage.getItem('labxplore_pomodoro_focus_min') || '75', 10);
  });

  // Audio states
  const [activeSoundId, setActiveSoundId] = useState('spaceship');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Focus Task input
  const [focusTask, setFocusTask] = useState('Solve 15 Physics Problems on Kinematics');
  const [isTaskDone, setIsTaskDone] = useState(false);

  // Fullscreen UI toggle
  const [zenMode, setZenMode] = useState(isFullscreenOverlay);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const initialDuration = TIMER_MODES.find((m) => m.id === currentMode)?.duration || 25 * 60;
  const progressPct = ((initialDuration - timeLeft) / initialDuration) * 100;

  // Countdown Interval
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Handle Timer Finish
  const handleTimerComplete = () => {
    setIsRunning(false);
    if (currentMode === 'focus') {
      const newSessions = sessionsCompleted + 1;
      const newMinutes = totalFocusMinutes + 25;
      setSessionsCompleted(newSessions);
      setTotalFocusMinutes(newMinutes);
      localStorage.setItem('labxplore_pomodoro_completed', String(newSessions));
      localStorage.setItem('labxplore_pomodoro_focus_min', String(newMinutes));

      // Play soft completion bell if AudioContext exists
      try {
        const ctx = audioEngine.ctx;
        if (ctx) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        }
      } catch {}
    }
  };

  // Change Timer Mode
  const handleSelectMode = (modeId) => {
    const mode = TIMER_MODES.find((m) => m.id === modeId);
    if (!mode) return;
    setCurrentMode(modeId);
    setIsRunning(false);
    setTimeLeft(mode.duration);
  };

  // Audio Playback handler
  const toggleAudio = (soundId = activeSoundId) => {
    if (isAudioPlaying && activeSoundId === soundId) {
      audioEngine.stop();
      setIsAudioPlaying(false);
    } else {
      setActiveSoundId(soundId);
      audioEngine.setVolume(isMuted ? 0 : volume);
      if (soundId === 'spaceship') audioEngine.startSpaceship();
      else if (soundId === 'bubbling') audioEngine.startBubblingLab();
      else if (soundId === 'cosmic_rain') audioEngine.startCosmicRain();
      setIsAudioPlaying(true);
    }
  };

  const handleVolumeChange = (newVal) => {
    setVolume(newVal);
    if (!isMuted) {
      audioEngine.setVolume(newVal);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Visualizer Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderVisualizer = () => {
      const data = audioEngine.getAnalyserData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 24;
      const barWidth = 4;
      const gap = (canvas.width - numBars * barWidth) / (numBars - 1);

      for (let i = 0; i < numBars; i++) {
        let val = isAudioPlaying ? data[i % data.length] || 0 : 4;
        const height = Math.max(3, (val / 255) * (canvas.height - 4));
        const x = i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = isAudioPlaying
          ? activeSoundId === 'spaceship'
            ? '#38bdf8'
            : activeSoundId === 'bubbling'
            ? '#34d399'
            : '#a855f7'
          : '#cbd5e1';

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAudioPlaying, activeSoundId]);

  // Format MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative w-full transition-all duration-300 ${
        zenMode
          ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white p-6 overflow-y-auto'
          : 'max-w-5xl mx-auto py-4 space-y-6'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md">
            <Clock size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${zenMode ? 'text-white' : 'text-slate-900'}`}>
                Pomodoro Study Lounge
              </h1>
              <span className="rounded-full bg-sky-100 text-sky-700 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-sky-200">
                Hackathon Feature 5
              </span>
            </div>
            <p className={`text-xs ${zenMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Distraction-free focus timer powered by procedural ambient soundscapes.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZenMode((z) => !z)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition shadow-xs ${
              zenMode
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {zenMode ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{zenMode ? 'Exit Zen' : 'Zen Fullscreen'}</span>
          </button>

          {isFullscreenOverlay && onClose && (
            <button
              onClick={onClose}
              className="rounded-xl bg-slate-800/80 p-2 text-slate-400 hover:text-white transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Focus Hub Card */}
      <div
        className={`w-full rounded-3xl border transition-all p-6 sm:p-8 shadow-xl ${
          zenMode
            ? 'bg-slate-900/90 border-slate-800 backdrop-blur-md max-w-2xl'
            : 'bg-white border-slate-200/90'
        }`}
      >
        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center rounded-2xl bg-slate-100/90 p-1.5 border border-slate-200/80">
            {TIMER_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = currentMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleSelectMode(mode.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon size={14} className={isActive ? mode.color : 'text-slate-400'} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Circular Progress Ring & Timer */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative flex items-center justify-center">
            {/* SVG Circular Progress */}
            <svg className="h-64 w-64 sm:h-72 sm:w-72 -rotate-90 transform" viewBox="0 0 240 240">
              <circle
                cx="120"
                cy="120"
                r="102"
                className={`${zenMode ? 'stroke-slate-800' : 'stroke-slate-100'}`}
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="120"
                cy="120"
                r="102"
                className="transition-all duration-500 ease-out"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 102}
                strokeDashoffset={2 * Math.PI * 102 * (1 - progressPct / 100)}
                strokeLinecap="round"
                fill="transparent"
                stroke="url(#timerGradient)"
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content (Clock + State) */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-mono text-5xl sm:text-6xl font-extrabold tracking-tight select-none">
                {formatTime(timeLeft)}
              </span>
              <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${zenMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isRunning ? '✨ Focused Session' : timeLeft === 0 ? '🎉 Time Completed!' : 'Paused'}
              </span>
              <span className="text-[11px] font-bold text-sky-500 mt-0.5">
                {Math.round(progressPct)}% elapsed
              </span>
            </div>
          </div>

          {/* Timer Controls (Play, Pause, Reset, Quick adjustments) */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => setIsRunning((r) => !r)}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition active:scale-95"
              title={isRunning ? 'Pause Timer' : 'Start Focus Timer'}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(initialDuration);
              }}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition active:scale-95 ${
                zenMode
                  ? 'border-slate-800 bg-slate-800/60 text-slate-300 hover:bg-slate-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
              title="Reset Timer"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={() => setTimeLeft((t) => Math.min(60 * 60, t + 5 * 60))}
              className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition active:scale-95 ${
                zenMode
                  ? 'border-slate-800 bg-slate-800/60 text-slate-300 hover:bg-slate-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              +5 Min
            </button>
          </div>

          {/* Current Focus Task Banner */}
          <div className={`mt-8 w-full max-w-md rounded-2xl border p-3.5 flex items-center gap-3 ${
            zenMode ? 'bg-slate-800/70 border-slate-700' : 'bg-sky-50/70 border-sky-100'
          }`}>
            <button
              onClick={() => setIsTaskDone((d) => !d)}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${
                isTaskDone
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-slate-300 bg-white hover:border-sky-400'
              }`}
            >
              {isTaskDone && <CheckCircle2 size={16} />}
            </button>
            <input
              type="text"
              value={focusTask}
              onChange={(e) => setFocusTask(e.target.value)}
              placeholder="What are you studying right now?"
              className={`w-full bg-transparent text-xs font-semibold outline-none ${
                isTaskDone ? 'line-through opacity-60' : ''
              } ${zenMode ? 'text-white' : 'text-slate-800'}`}
            />
          </div>
        </div>

        {/* Ambient Audio Soundscape Console */}
        <div className={`mt-10 rounded-2xl border p-5 ${
          zenMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2.5">
              <Headphones size={18} className="text-sky-500" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-inherit">
                  Procedural Ambient Soundscapes
                </h3>
                <p className={`text-[11px] ${zenMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Synthesized live using the Web Audio API · Zero external mp3 dependencies
                </p>
              </div>
            </div>

            {/* Live Audio Visualizer Canvas */}
            <div className="flex items-center gap-3">
              <canvas
                ref={canvasRef}
                width={120}
                height={28}
                className="rounded-lg bg-black/10 px-2 py-1"
                title="Real-time Audio Visualizer"
              />
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                isAudioPlaying ? 'bg-emerald-500/20 text-emerald-600' : 'bg-slate-200 text-slate-500'
              }`}>
                {isAudioPlaying ? 'LIVE AUDIO' : 'MUTED'}
              </span>
            </div>
          </div>

          {/* Sound Track Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SOUND_TRACKS.map((track) => {
              const TrackIcon = track.icon;
              const isSelected = activeSoundId === track.id;
              const isCurrentPlaying = isSelected && isAudioPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => toggleAudio(track.id)}
                  className={`group relative cursor-pointer rounded-2xl border p-3.5 transition-all active:scale-98 ${
                    isSelected
                      ? `${track.borderColor} ${track.bgActive} ring-2 ring-sky-300/60 shadow-sm`
                      : zenMode
                      ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${track.themeColor} text-white shadow-xs`}>
                      <TrackIcon size={16} />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                      {track.badgeText}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{track.title}</p>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{track.subtitle}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/50">
                    <span className="text-[10px] font-semibold text-sky-600">
                      {isCurrentPlaying ? 'Now Playing' : isSelected ? 'Selected' : 'Tap to Play'}
                    </span>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      isCurrentPlaying ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isCurrentPlaying ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Volume Control Slider */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-slate-500 hover:text-slate-800 transition"
              >
                {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="h-1.5 w-32 sm:w-44 accent-sky-500 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-500">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold">
                <Flame size={14} className="text-amber-500" />
                <span>{sessionsCompleted} Sessions Completed Today</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1 font-semibold">
                <Award size={14} className="text-blue-500" />
                <span>{totalFocusMinutes} Total Focus Mins</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
