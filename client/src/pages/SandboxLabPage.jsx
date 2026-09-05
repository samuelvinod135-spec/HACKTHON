import React, { useState } from 'react';
import {
  Atom,
  FlaskConical,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  AlertTriangle,
  Beaker,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function SandboxLabPage() {
  const [labMode, setLabMode] = useState('physics'); // 'physics' | 'chemistry'

  // Physics Controls
  const [gravity, setGravity] = useState(9.8);
  const [friction, setFriction] = useState(0.05);
  const [mass, setMass] = useState(5.0);
  const [isSimRunning, setIsSimRunning] = useState(false);

  // Chemistry Controls
  const [beakerContents, setBeakerContents] = useState(['H2O']);
  const [reactionAlert, setReactionAlert] = useState(null);

  const ELEMENTS = [
    { symbol: 'Na', name: 'Sodium', type: 'Alkali Metal', reactive: true, desc: 'Highly reactive with water' },
    { symbol: 'Cl', name: 'Chlorine', type: 'Halogen', reactive: true, desc: 'Toxic yellowish gas' },
    { symbol: 'H2O', name: 'Water', type: 'Solvent', reactive: false, desc: 'Neutral aqueous medium' },
    { symbol: 'HCl', name: 'Hydrochloric Acid', type: 'Acid', reactive: true, desc: 'Strong monoprotic acid' },
    { symbol: 'NaOH', name: 'Sodium Hydroxide', type: 'Base', reactive: true, desc: 'Strong caustic base' },
    { symbol: 'Mg', name: 'Magnesium', type: 'Alkaline Earth', reactive: true, desc: 'Burns with bright white flame' },
  ];

  const handleAddElement = (elem) => {
    if (beakerContents.includes(elem.symbol)) return;
    const newContents = [...beakerContents, elem.symbol];
    setBeakerContents(newContents);

    // Dynamic reaction alert logic
    if (newContents.includes('Na') && newContents.includes('H2O')) {
      setReactionAlert({
        type: 'danger',
        title: '⚠️ Violent Exothermic Reaction Detected!',
        equation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g) ↑ + Heat',
        note: 'Sodium vigorously reduces water, generating hydrogen gas which ignites with an orange/yellow flame.',
      });
    } else if (newContents.includes('HCl') && newContents.includes('NaOH')) {
      setReactionAlert({
        type: 'info',
        title: '🧪 Acid-Base Neutralization',
        equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) + Heat',
        note: 'Exothermic enthalpy of neutralization ΔH ≈ -57.1 kJ/mol.',
      });
    } else if (newContents.includes('Mg') && newContents.includes('HCl')) {
      setReactionAlert({
        type: 'warning',
        title: '⚡ Single Displacement Reaction',
        equation: 'Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g) ↑',
        note: 'Rapid effervescence of hydrogen bubbles.',
      });
    }
  };

  const handleResetChemistry = () => {
    setBeakerContents(['H2O']);
    setReactionAlert(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-4 space-y-6">
      {/* Header with Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Interactive Sandbox Labs
            </h1>
            <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-amber-200">
              Hackathon Feature 2
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Open-ended virtual laboratory with Physics mechanics and Chemistry reaction engines.
          </p>
        </div>

        {/* Physics vs Chemistry Mode Toggle Switch */}
        <div className="flex items-center rounded-2xl bg-white p-1.5 border border-slate-200 shadow-xs">
          <button
            onClick={() => setLabMode('physics')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              labMode === 'physics'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Atom size={15} />
            <span>Physics Mode</span>
          </button>
          <button
            onClick={() => setLabMode('chemistry')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              labMode === 'chemistry'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical size={15} />
            <span>Chemistry Mode</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PHYSICS MODE VIEW                                             */}
      {/* ------------------------------------------------------------- */}
      {labMode === 'physics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders size={16} className="text-sky-600" />
                <span>Simulation Parameters</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">2D Rigid-Body</span>
            </div>

            {/* Slider 1: Gravity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Gravity ($g$)</span>
                <span className="font-mono text-sky-600 font-bold">{gravity} m/s²</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
                className="w-full h-2 accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 (Zero-G)</span>
                <span>9.8 (Earth)</span>
                <span>24.8 (Jupiter)</span>
              </div>
            </div>

            {/* Slider 2: Friction */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Surface Friction ($\mu$)</span>
                <span className="font-mono text-sky-600 font-bold">{friction}</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={friction}
                onChange={(e) => setFriction(parseFloat(e.target.value))}
                className="w-full h-2 accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 (Ice)</span>
                <span>0.2 (Wood)</span>
                <span>0.5 (Rubber)</span>
              </div>
            </div>

            {/* Slider 3: Mass */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Object Mass ($m$)</span>
                <span className="font-mono text-sky-600 font-bold">{mass} kg</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={mass}
                onChange={(e) => setMass(parseFloat(e.target.value))}
                className="w-full h-2 accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.5 kg</span>
                <span>10 kg</span>
                <span>20 kg</span>
              </div>
            </div>

            {/* Run Button */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setIsSimRunning((r) => !r)}
                className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-black shadow-md transition active:scale-95 ${
                  isSimRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25'
                }`}
              >
                <Play size={15} />
                <span>{isSimRunning ? 'Pause Simulation' : 'Run Simulation'}</span>
              </button>

              <button
                onClick={() => {
                  setGravity(9.8);
                  setFriction(0.05);
                  setMass(5.0);
                  setIsSimRunning(false);
                }}
                className="flex items-center justify-center rounded-2xl border border-slate-200 px-3.5 text-slate-600 hover:bg-slate-50"
                title="Reset Parameters"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* 2D Physics Canvas Viewport */}
          <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Atom size={16} className="text-sky-600" />
                <span className="text-xs font-bold text-slate-800">2D Dynamics Canvas</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                {isSimRunning ? '● SIMULATION RUNNING (60 FPS)' : '○ STANDBY'}
              </span>
            </div>

            {/* Visual Canvas Placeholder */}
            <div className="relative aspect-16/9 w-full rounded-2xl border-2 border-slate-200 bg-slate-950 overflow-hidden flex items-center justify-center">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px]" />

              {/* Animated rigid body ball */}
              <div
                className={`relative z-10 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg transition-transform ${
                  isSimRunning ? 'animate-bounce duration-700' : ''
                }`}
                style={{
                  width: `${Math.min(100, 40 + mass * 3)}px`,
                  height: `${Math.min(100, 40 + mass * 3)}px`,
                }}
              >
                <span className="text-[10px] font-mono font-black">{mass}kg</span>
              </div>

              {/* Ground Plane */}
              <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-800 border-t-2 border-slate-700 flex items-center justify-center">
                <span className="text-[10px] font-mono text-slate-400">
                  Frictional Incline Plane (μ = {friction})
                </span>
              </div>

              {/* Dynamic HUD */}
              <div className="absolute top-3 left-3 rounded-xl bg-slate-900/80 backdrop-blur-md px-3 py-2 text-[11px] font-mono text-slate-300 border border-slate-800 space-y-1">
                <div>g = {gravity} m/s²</div>
                <div>v = {isSimRunning ? (gravity * 0.75).toFixed(2) : '0.00'} m/s</div>
                <div>KE = {isSimRunning ? (0.5 * mass * (gravity * 0.75) ** 2).toFixed(1) : '0.0'} J</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CHEMISTRY MODE VIEW                                           */}
      {/* ------------------------------------------------------------- */}
      {labMode === 'chemistry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Elements Sidebar */}
          <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FlaskConical size={16} className="text-emerald-600" />
                <span>Reagent Palette</span>
              </h3>
              <button
                onClick={handleResetChemistry}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Tap any reagent to add it to the virtual beaker and observe reactions.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {ELEMENTS.map((elem) => {
                const isAdded = beakerContents.includes(elem.symbol);
                return (
                  <button
                    key={elem.symbol}
                    onClick={() => handleAddElement(elem)}
                    className={`flex flex-col items-start p-3 rounded-2xl border text-left transition active:scale-95 ${
                      isAdded
                        ? 'border-emerald-300 bg-emerald-50 ring-1 ring-emerald-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-base font-black text-slate-900">
                        {elem.symbol}
                      </span>
                      {isAdded && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Added
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 mt-0.5">{elem.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{elem.type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Virtual Beaker Center Workspace */}
          <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Beaker size={16} className="text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">Reaction Chamber & Beaker</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Contents: {beakerContents.join(' + ')}
              </span>
            </div>

            {/* Reaction Alert Banner */}
            {reactionAlert && (
              <div
                className={`rounded-2xl p-4 border transition animate-in fade-in ${
                  reactionAlert.type === 'danger'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : reactionAlert.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-blue-50 border-blue-200 text-blue-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <span>{reactionAlert.title}</span>
                </div>
                <div className="mt-1 font-mono text-xs sm:text-sm font-bold bg-white/80 rounded-lg p-2 border border-black/5">
                  {reactionAlert.equation}
                </div>
                <p className="mt-1.5 text-xs opacity-90">{reactionAlert.note}</p>
              </div>
            )}

            {/* Beaker Illustration Area */}
            <div className="relative aspect-16/9 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-6">
              {/* Virtual Beaker Vessel */}
              <div className="relative w-44 h-56 border-x-4 border-b-4 border-slate-400 rounded-b-3xl bg-white/40 backdrop-blur-xs flex flex-col justify-end p-2 shadow-inner">
                {/* Measurement Markings */}
                <div className="absolute top-8 left-2 text-[9px] font-mono text-slate-400">─ 250ml</div>
                <div className="absolute top-20 left-2 text-[9px] font-mono text-slate-400">─ 150ml</div>
                <div className="absolute top-32 left-2 text-[9px] font-mono text-slate-400">─ 50ml</div>

                {/* Liquid in Beaker */}
                <div
                  className={`w-full rounded-b-2xl transition-all duration-700 flex items-center justify-center ${
                    reactionAlert?.type === 'danger'
                      ? 'h-36 bg-gradient-to-t from-orange-400 to-amber-300 animate-pulse'
                      : beakerContents.includes('HCl') && beakerContents.includes('NaOH')
                      ? 'h-36 bg-gradient-to-t from-emerald-400 to-teal-200'
                      : 'h-28 bg-gradient-to-t from-sky-400 to-blue-200'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {beakerContents.join(' + ')}
                  </span>
                </div>
              </div>

              <span className="mt-4 text-xs font-semibold text-slate-500">
                500mL Borosilicate Glass Beaker · Standard Temperature & Pressure
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
