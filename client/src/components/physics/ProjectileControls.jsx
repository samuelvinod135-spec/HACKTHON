import { useState } from 'react';
import {
  Rocket,
  Sliders,
  X,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Activity,
  Zap,
  Gauge,
  Compass,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects.js';

export default function ProjectileControls({
  launcher,
  onChange,
  env,
  running,
  onToggleRun,
  onReset,
  onClose,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!launcher) return null;

  const params = launcher.params || {};
  const speed = params.speed ?? 25; // m/s
  const angle = params.angle ?? 45; // degrees
  const mass = params.mass ?? 2.0; // kg
  const direction = params.direction || 'right'; // 'left' | 'right'
  const g = env?.gravity ?? 9.81;

  // Theoretical physics calculations
  const angleRad = (angle * Math.PI) / 180;
  const vy0 = speed * Math.sin(angleRad);
  const vx0 = speed * Math.cos(angleRad);
  const flightTime = g > 0 ? (2 * vy0) / g : 0;
  const maxRange = Math.abs(vx0 * flightTime);
  const maxHeight = (vy0 * vy0) / (2 * (g || 0.01));
  const kineticEnergy = 0.5 * mass * speed * speed;

  const updateParam = (key, value) => {
    sounds.playTick?.();
    onChange({
      ...launcher,
      params: {
        ...params,
        [key]: value,
      },
    });
  };

  return (
    <div
      data-testid="projectile-controls-panel"
      className="clay-card pointer-events-auto absolute right-4 top-16 z-30 w-80 rounded-3xl bg-white/95 p-4 shadow-2xl backdrop-blur-md border border-amber-200/90 transition-all duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-sm">
            <Rocket size={16} />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-black tracking-tight text-slate-900">
                Projectile Motion Controls
              </h4>
              <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-800">
                2D Kinematics
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400">
              Interactive Launch Physics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            title={isCollapsed ? 'Expand Controls' : 'Collapse Controls'}
            aria-label={isCollapsed ? 'Expand Controls' : 'Collapse Controls'}
          >
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Close Controls"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Collapsed State Summary */}
      {isCollapsed ? (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-amber-50/70 px-3 py-2 text-xs">
          <span className="font-bold text-amber-900">
            {speed} m/s @ {angle}° ({direction === 'left' ? '← Left' : 'Right →'})
          </span>
          <span className="font-mono text-[11px] font-extrabold text-amber-700">
            Range: {maxRange.toFixed(1)}m
          </span>
        </div>
      ) : (
        <div className="mt-3 space-y-3.5">
          {/* 1. Muzzle Velocity (Speed) Control */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-slate-600">
                <Gauge size={13} className="text-orange-500" />
                <span>Muzzle Velocity (v₀)</span>
              </span>
              <span className="font-mono text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-100">
                {speed} m/s
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={1}
              value={speed}
              onChange={(e) => updateParam('speed', Number(e.target.value))}
              className="w-full accent-orange-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
            />
            {/* Quick Speed Presets */}
            <div className="flex items-center gap-1.5">
              {[15, 25, 40, 60].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateParam('speed', s)}
                  className={`flex-1 rounded-lg py-0.5 text-[10px] font-bold border transition ${
                    speed === s
                      ? 'bg-orange-500 text-white border-orange-500 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {s} m/s
                </button>
              ))}
            </div>
          </div>

          {/* 2. Launch Angle Control */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-slate-600">
                <Compass size={13} className="text-amber-500" />
                <span>Launch Angle (θ)</span>
              </span>
              <span className="font-mono text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                {angle}°
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={85}
              step={1}
              value={angle}
              onChange={(e) => updateParam('angle', Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
            />
            {/* Quick Angle Presets */}
            <div className="flex items-center gap-1.5">
              {[
                { val: 30, label: '30°' },
                { val: 45, label: '45° (Max R)' },
                { val: 60, label: '60°' },
                { val: 75, label: '75°' },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => updateParam('angle', val)}
                  className={`flex-1 rounded-lg py-0.5 text-[10px] font-bold border transition ${
                    angle === val
                      ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Mass Control */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-slate-600">
                <Activity size={13} className="text-teal-600" />
                <span>Shell Mass (m)</span>
              </span>
              <span className="font-mono text-xs font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100">
                {mass.toFixed(1)} kg
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={10.0}
              step={0.5}
              value={mass}
              onChange={(e) => updateParam('mass', Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex items-center gap-1.5">
              {[1.0, 2.0, 5.0, 10.0].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => updateParam('mass', m)}
                  className={`flex-1 rounded-lg py-0.5 text-[10px] font-bold border transition ${
                    Math.abs(mass - m) < 0.1
                      ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {m} kg
                </button>
              ))}
            </div>
          </div>

          {/* 4. Launch Direction Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Firing Direction</span>
              <span className="font-mono text-[10px] uppercase font-extrabold text-slate-400">
                {direction === 'left' ? 'Westward (←)' : 'Eastward (→)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateParam('direction', 'left')}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold border transition ${
                  direction === 'left'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ArrowLeft size={13} />
                <span>Launch Left</span>
              </button>
              <button
                type="button"
                onClick={() => updateParam('direction', 'right')}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold border transition ${
                  direction === 'right'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Launch Right</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Theoretical Trajectory Summary Box */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 p-2.5 border border-amber-200/70 shadow-inner space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-500">Max Ground Range (R):</span>
              <span className="font-mono font-black text-amber-900">
                {maxRange.toFixed(2)} m
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-500">Peak Height (H_max):</span>
              <span className="font-mono font-black text-amber-900">
                {maxHeight.toFixed(2)} m
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-slate-500">
                <span>Flight Time (T):</span>
              </span>
              <span className="font-mono font-black text-amber-900">
                {flightTime.toFixed(2)} s
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] border-t border-amber-200/50 pt-1">
              <span className="text-slate-500">Initial Kinetic Energy:</span>
              <span className="font-mono font-bold text-orange-700">
                {kineticEnergy.toFixed(1)} J
              </span>
            </div>
          </div>

          {/* In-Panel Run / Reset Execution CTAs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onToggleRun}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-black shadow-sm transition active:scale-98 cursor-pointer ${
                running
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-500 animate-pulse'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {running ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
              <span>{running ? 'Pause Sim' : 'Launch Simulation'}</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              title="Reset simulation time and reload cannon"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
