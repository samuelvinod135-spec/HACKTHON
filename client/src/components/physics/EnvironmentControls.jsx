import { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Grid,
  Wind,
  Globe,
  Sliders,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { GRAVITY_PRESETS } from '../../physicsData.js';
import { sounds } from '../../utils/soundEffects.js';

export default function EnvironmentControls({
  env,
  onEnvChange,
  running,
  onTogglePlay,
  onReset,
  onOpenPresets,
}) {
  const [showGravityMenu, setShowGravityMenu] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const toggleAudio = () => {
    const newState = sounds.toggleSound();
    setSoundOn(newState);
  };

  const handleGravitySelect = (preset) => {
    sounds.playClick();
    onEnvChange({
      ...env,
      gravity: preset.value,
      gravityName: preset.name,
    });
    setShowGravityMenu(false);
  };

  const toggleAir = () => {
    sounds.playClick();
    onEnvChange({
      ...env,
      airResistance: !env.airResistance,
    });
  };

  const toggleGridSnap = () => {
    sounds.playClick();
    onEnvChange({
      ...env,
      snapToGrid: !env.snapToGrid,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Presets Button */}
      <button
        onClick={onOpenPresets}
        className="clay-card-blue flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-sky-800 shadow-xs transition hover:brightness-105"
      >
        <Sparkles size={13} className="text-sky-600" />
        <span>Experiments</span>
      </button>

      {/* Gravity Selector */}
      <div className="relative">
        <button
          onClick={() => setShowGravityMenu((s) => !s)}
          className="clay-card flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          title="Change Gravitational Acceleration"
        >
          <Globe size={13} className="text-blue-500" />
          <span className="hidden sm:inline">g:</span>
          <span className="font-mono text-slate-900 font-bold">{env.gravity} m/s²</span>
          <ChevronDown size={11} className="text-slate-400" />
        </button>

        {showGravityMenu && (
          <div className="clay-card absolute left-0 z-30 mt-1 w-48 rounded-xl bg-white p-1 shadow-xl border border-slate-100">
            <div className="px-2.5 py-1 text-[9px] font-bold uppercase text-slate-400">Gravitation</div>
            {GRAVITY_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleGravitySelect(p)}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                  env.gravity === p.value ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Air Resistance Toggle */}
      <button
        onClick={toggleAir}
        className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition shadow-xs ${
          env.airResistance
            ? 'bg-sky-100 border border-sky-300 text-sky-800 font-bold'
            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
        }`}
        title="Toggle Air Resistance / Fluid Drag"
      >
        <Wind size={13} className={env.airResistance ? 'text-sky-600 animate-pulse' : 'text-slate-400'} />
        <span className="hidden md:inline">Air Drag:</span>
        <span>{env.airResistance ? 'ON' : 'OFF'}</span>
      </button>

      {/* Grid Snap Toggle */}
      <button
        onClick={toggleGridSnap}
        className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition shadow-xs ${
          env.snapToGrid
            ? 'bg-teal-100 border border-teal-300 text-teal-800 font-bold'
            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
        }`}
        title="Toggle Snap to 20px Grid"
      >
        <Grid size={13} className={env.snapToGrid ? 'text-teal-600' : 'text-slate-400'} />
        <span className="hidden lg:inline">Snap:</span>
        <span>{env.snapToGrid ? '20px' : 'Free'}</span>
      </button>

      {/* Sound Effects Toggle */}
      <button
        onClick={toggleAudio}
        className={`flex h-8 w-8 items-center justify-center rounded-xl border shadow-xs transition ${
          soundOn
            ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            : 'border-red-200 bg-red-50 text-red-500'
        }`}
        title={soundOn ? 'Mute Procedural Audio' : 'Unmute Audio'}
      >
        {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </button>

      {/* Play / Pause Simulation Button */}
      <button
        onClick={() => {
          if (running) {
            sounds.playSimPause();
          } else {
            sounds.playSimStart();
          }
          onTogglePlay();
        }}
        className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-bold shadow-sm transition ${
          running
            ? 'bg-amber-400 text-slate-900 hover:bg-amber-500 animate-pulse'
            : 'clay-btn-yellow text-slate-900 hover:brightness-105'
        }`}
        data-testid="sim-toggle-btn"
      >
        {running ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
        <span>{running ? 'Pause Sim' : 'Start Sim'}</span>
      </button>

      {/* Reset Simulation */}
      <button
        onClick={() => {
          sounds.playClick();
          onReset();
        }}
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition"
        title="Reset Simulation Canvas"
      >
        <RotateCcw size={13} />
      </button>
    </div>
  );
}
