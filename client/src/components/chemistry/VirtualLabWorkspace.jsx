import React, { useState, useEffect, useRef } from 'react';
import {
  FlaskConical,
  Flame,
  Thermometer,
  RotateCw,
  Plus,
  Trash2,
  Play,
  RotateCcw,
  Sparkles,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  Layers,
  Compass,
  ArrowDown
} from 'lucide-react';
import { simulateVesselReaction, getExperimentsCatalog } from '../../data/chemistry/chemistryDatabase.js';

export default function VirtualLabWorkspace({ initialPreset = null }) {
  // Equipment Selection
  const [selectedVessel, setSelectedVessel] = useState('beaker_250');
  const [burnerState, setBurnerState] = useState('off'); // 'off' | 'yellow' | 'blue'
  const [burnerTemp, setBurnerTemp] = useState(25); // in °C
  const [isStirring, setIsStirring] = useState(false);
  const [buretteDrip, setBuretteDrip] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState('none');

  // Vessel Contents & Chemical State
  const [vesselContents, setVesselContents] = useState([
    { name: 'Distilled Water', formula: 'H2O', volume: 50, color: 'rgba(56, 189, 248, 0.2)' }
  ]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [gasBubblesActive, setGasBubblesActive] = useState(false);
  const [precipitateState, setPrecipitateState] = useState(null); // null | { name, color, texture }
  const [customChemicalInput, setCustomChemicalInput] = useState('');

  // 18 Standard Pieces of Equipment
  const APPARATUS_LIST = [
    { id: 'beaker_250', name: 'Beaker (250 mL)', capacity: 250, type: 'beaker' },
    { id: 'test_tube', name: 'Test Tube (25 mL)', capacity: 25, type: 'tube' },
    { id: 'conical_flask', name: 'Conical Flask (250 mL)', capacity: 250, type: 'conical' },
    { id: 'round_bottom', name: 'Round-Bottom Flask', capacity: 250, type: 'round' },
    { id: 'burette', name: 'Burette (50 mL)', capacity: 50, type: 'burette' },
    { id: 'measuring_cylinder', name: 'Measuring Cylinder', capacity: 100, type: 'cylinder' },
    { id: 'evaporating_dish', name: 'Evaporating Dish', capacity: 100, type: 'dish' },
    { id: 'crucible', name: 'Crucible with Lid', capacity: 50, type: 'crucible' },
    { id: 'watch_glass', name: 'Watch Glass', capacity: 20, type: 'watch' },
    { id: 'funnel_filter', name: 'Funnel with Filter Paper', capacity: 80, type: 'funnel' },
  ];

  // Reagents Shelf
  const REAGENT_SHELF = [
    { name: 'Hydrochloric Acid (dil. HCl)', formula: 'HCl', type: 'acid', color: 'rgba(239, 68, 68, 0.15)', ph: 1 },
    { name: 'Sulphuric Acid (dil. H2SO4)', formula: 'H2SO4', type: 'acid', color: 'rgba(239, 68, 68, 0.15)', ph: 1 },
    { name: 'Sodium Hydroxide (0.1 M NaOH)', formula: 'NaOH', type: 'base', color: 'rgba(59, 130, 246, 0.15)', ph: 13 },
    { name: 'Copper(II) Sulphate (CuSO4)', formula: 'CuSO4', type: 'salt', color: 'rgba(14, 165, 233, 0.85)', ph: 5 },
    { name: 'Barium Chloride (BaCl2)', formula: 'BaCl2', type: 'salt', color: 'rgba(241, 245, 249, 0.4)', ph: 7 },
    { name: 'Sodium Sulphate (Na2SO4)', formula: 'Na2SO4', type: 'salt', color: 'rgba(241, 245, 249, 0.3)', ph: 7 },
    { name: 'Iron Filings / Nails (Fe)', formula: 'Fe', type: 'metal', color: 'rgba(100, 116, 139, 0.9)', state: 'solid' },
    { name: 'Granulated Zinc (Zn)', formula: 'Zn', type: 'metal', color: 'rgba(148, 163, 184, 0.9)', state: 'solid' },
    { name: 'Lead Nitrate [Pb(NO3)2]', formula: 'Pb(NO3)2', type: 'salt', color: 'rgba(248, 250, 252, 0.5)', ph: 5 },
    { name: 'Potassium Iodide (KI)', formula: 'KI', type: 'salt', color: 'rgba(241, 245, 249, 0.3)', ph: 7 },
    { name: 'Potassium Permanganate (KMnO4)', formula: 'KMnO4', type: 'oxidizer', color: 'rgba(147, 51, 234, 0.9)', ph: 7 },
    { name: 'Oxalic Acid (H2C2O4)', formula: 'H2C2O4', type: 'acid', color: 'rgba(241, 245, 249, 0.3)', ph: 2 },
    { name: 'Mohr\'s Salt [FeSO4·(NH4)2SO4]', formula: 'FeSO4', type: 'salt', color: 'rgba(134, 239, 172, 0.7)', ph: 5 },
    { name: 'Ammonium Hydroxide (NH4OH)', formula: 'NH4OH', type: 'base', color: 'rgba(147, 197, 253, 0.3)', ph: 10 },
    { name: 'Ethanoic Acid (CH3COOH)', formula: 'CH3COOH', type: 'acid', color: 'rgba(251, 191, 36, 0.2)', ph: 3 },
    { name: 'Ethanol (C2H5OH)', formula: 'C2H5OH', type: 'organic', color: 'rgba(241, 245, 249, 0.2)', ph: 7 },
  ];

  // Indicators
  const INDICATORS = [
    { id: 'none', name: 'No Indicator' },
    { id: 'phenolphthalein', name: 'Phenolphthalein (Colorless in acid, Pink in base)' },
    { id: 'methyl_orange', name: 'Methyl Orange (Red in acid, Yellow in base)' },
    { id: 'universal', name: 'Universal Indicator (Full pH rainbow)' },
    { id: 'litmus_blue', name: 'Blue Litmus Solution' },
    { id: 'litmus_red', name: 'Red Litmus Solution' },
  ];

  // Handle Preset Injection (e.g. from Reaction Library or Experiments)
  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.reactants || initialPreset.inputs) {
        const items = (initialPreset.reactants || initialPreset.inputs).map((r, i) => ({
          name: typeof r === 'string' ? r : r.name || `Reactant ${i + 1}`,
          formula: typeof r === 'string' ? r : r.formula || `R${i + 1}`,
          volume: 20,
          color: i === 0 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(245, 158, 11, 0.6)'
        }));
        setVesselContents(items);
      }
    }
  }, [initialPreset]);

  // Compute Active Liquid Color, Volume, and pH
  const vesselState = React.useMemo(() => {
    const totalVol = vesselContents.reduce((acc, c) => acc + (c.volume || 10), 0);
    const hasAcid = vesselContents.some((c) => c.formula === 'HCl' || c.formula === 'H2SO4' || c.formula === 'HNO3' || c.formula === 'CH3COOH');
    const hasBase = vesselContents.some((c) => c.formula === 'NaOH' || c.formula === 'KOH' || c.formula === 'NH4OH');

    let currentPh = 7;
    if (hasAcid && !hasBase) currentPh = 2;
    else if (hasBase && !hasAcid) currentPh = 12;
    else if (hasAcid && hasBase) currentPh = 7; // neutralized

    // Indicator color overrides
    let displayColor = 'rgba(56, 189, 248, 0.4)';
    if (vesselContents.some((c) => c.formula === 'CuSO4')) displayColor = 'rgba(14, 165, 233, 0.85)';
    if (vesselContents.some((c) => c.formula === 'KMnO4')) displayColor = 'rgba(147, 51, 234, 0.9)';
    if (vesselContents.some((c) => c.formula === 'FeCl3')) displayColor = 'rgba(217, 119, 6, 0.85)';

    if (selectedIndicator === 'phenolphthalein') {
      displayColor = currentPh >= 8.3 ? 'rgba(236, 72, 153, 0.85)' : 'rgba(241, 245, 249, 0.3)';
    } else if (selectedIndicator === 'methyl_orange') {
      displayColor = currentPh <= 3.1 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(234, 179, 8, 0.85)';
    } else if (selectedIndicator === 'universal') {
      if (currentPh <= 3) displayColor = 'rgba(239, 68, 68, 0.85)';
      else if (currentPh <= 6) displayColor = 'rgba(249, 115, 22, 0.85)';
      else if (currentPh === 7) displayColor = 'rgba(34, 197, 94, 0.85)';
      else displayColor = 'rgba(147, 51, 234, 0.85)';
    }

    return { totalVol, currentPh, displayColor };
  }, [vesselContents, selectedIndicator]);

  // Thermometer & Burner Temperature Simulation
  useEffect(() => {
    let interval;
    if (burnerState === 'blue') {
      interval = setInterval(() => {
        setBurnerTemp((t) => Math.min(350, t + 4));
      }, 500);
    } else if (burnerState === 'yellow') {
      interval = setInterval(() => {
        setBurnerTemp((t) => Math.min(180, t + 2));
      }, 500);
    } else {
      interval = setInterval(() => {
        setBurnerTemp((t) => Math.max(25, t - 2));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [burnerState]);

  // Chemical Metathesis Simulation Trigger
  const runSimulation = () => {
    const formulas = vesselContents.map((c) => c.formula).filter((f) => f !== 'H2O');
    const conditions = [];
    if (burnerTemp > 60) conditions.push('heat');
    if (isStirring) conditions.push('stirring');

    const result = simulateVesselReaction(formulas, conditions);
    setSimulationResult(result);

    if (result.found) {
      // Check for specific gas or precipitate triggers
      const rxName = (result.reaction?.name || '').toLowerCase();
      const eq = (result.reaction?.equation || '').toLowerCase();

      if (eq.includes('↑') || eq.includes('(g)') || rxName.includes('hydrogen') || rxName.includes('decomposition')) {
        setGasBubblesActive(true);
        setTimeout(() => setGasBubblesActive(false), 8000);
      }

      if (eq.includes('baso4') || rxName.includes('barium sulphate')) {
        setPrecipitateState({ name: 'Barium Sulphate (BaSO4)', color: '#ffffff', texture: 'Dense White Curdy' });
      } else if (eq.includes('pbi2') || rxName.includes('lead iodide')) {
        setPrecipitateState({ name: 'Lead(II) Iodide (PbI2)', color: '#eab308', texture: 'Glittering Golden Spangles' });
      } else if (eq.includes('cu') || rxName.includes('copper')) {
        setPrecipitateState({ name: 'Metallic Copper (Cu)', color: '#b45309', texture: 'Reddish-Brown Granular' });
      } else if (eq.includes('fe(oh)3') || rxName.includes('ferric hydroxide')) {
        setPrecipitateState({ name: 'Ferric Hydroxide Fe(OH)3', color: '#78350f', texture: 'Gelatinous Brown-Red' });
      }
    }
  };

  const addChemical = (chemical) => {
    setVesselContents((prev) => [
      ...prev,
      {
        name: chemical.name,
        formula: chemical.formula,
        volume: chemical.state === 'solid' ? 5 : 20,
        color: chemical.color || 'rgba(56, 189, 248, 0.4)'
      }
    ]);
  };

  const addCustomChemical = () => {
    if (!customChemicalInput.trim()) return;
    const formula = customChemicalInput.trim();
    addChemical({ name: formula, formula, color: 'rgba(148, 163, 184, 0.5)' });
    setCustomChemicalInput('');
  };

  const clearVessel = () => {
    setVesselContents([{ name: 'Distilled Water', formula: 'H2O', volume: 50, color: 'rgba(56, 189, 248, 0.2)' }]);
    setSimulationResult(null);
    setPrecipitateState(null);
    setGasBubblesActive(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* LEFT COLUMN: Physical Bench & Apparatus Simulation (60% width) */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Lab Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
          {/* Apparatus Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Apparatus:</span>
            <select
              value={selectedVessel}
              onChange={(e) => setSelectedVessel(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-black text-slate-800 focus:border-sky-400 focus:outline-none cursor-pointer"
            >
              {APPARATUS_LIST.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </select>
          </div>

          {/* Indicator Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Indicator:</span>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800 focus:border-sky-400 focus:outline-none cursor-pointer"
            >
              {INDICATORS.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsStirring(!isStirring)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-bold transition cursor-pointer ${
                isStirring
                  ? 'border-sky-400 bg-sky-100 text-sky-800 animate-pulse'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <RotateCw size={13} className={isStirring ? 'animate-spin' : ''} />
              <span>{isStirring ? 'Stirring...' : 'Stir Rod'}</span>
            </button>

            <button
              onClick={clearVessel}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Empty Vessel</span>
            </button>
          </div>
        </div>

        {/* VIRTUAL BENCH CANVAS */}
        <div className="relative flex min-h-[440px] flex-col items-center justify-end rounded-3xl border-2 border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 overflow-hidden shadow-2xl">
          {/* Top Sensor Readouts */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
            {/* Thermometer Readout */}
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 px-3 py-1.5 text-white backdrop-blur-md">
              <Thermometer size={16} className={burnerTemp > 60 ? 'text-rose-400 animate-bounce' : 'text-sky-400'} />
              <span className="font-mono font-bold">{burnerTemp}°C</span>
              <span className="text-[10px] text-slate-400">({burnerTemp > 100 ? 'Boiling/Reflux' : burnerTemp > 60 ? 'Thermal Activation' : 'Room Temp'})</span>
            </div>

            {/* pH Meter Readout */}
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 px-3 py-1.5 text-white backdrop-blur-md">
              <span className="font-black text-sky-300">pH:</span>
              <span className="font-mono font-bold text-amber-300">{vesselState.currentPh.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">
                ({vesselState.currentPh < 7 ? 'Acidic' : vesselState.currentPh === 7 ? 'Neutral' : 'Basic'})
              </span>
            </div>

            {/* Total Liquid Volume */}
            <div className="flex items-center gap-1.5 rounded-2xl bg-white/10 border border-white/15 px-3 py-1.5 text-white backdrop-blur-md">
              <Droplets size={14} className="text-sky-300" />
              <span className="font-mono font-bold">{vesselState.totalVol} mL</span>
            </div>
          </div>

          {/* Bubbles / Effervescence Animation */}
          {gasBubblesActive && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative h-64 w-48">
                <span className="absolute left-6 bottom-16 h-3 w-3 rounded-full bg-white/70 animate-ping" />
                <span className="absolute left-14 bottom-24 h-4 w-4 rounded-full bg-white/80 animate-ping delay-150" />
                <span className="absolute right-8 bottom-20 h-3 w-3 rounded-full bg-white/60 animate-ping delay-300" />
                <span className="absolute left-1/2 bottom-32 h-5 w-5 -translate-x-1/2 rounded-full bg-white/90 animate-ping delay-500" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400/20 border border-yellow-400/60 px-3 py-1 text-[11px] font-black text-yellow-300 backdrop-blur-xs whitespace-nowrap animate-bounce">
                  ⚡ Effervescence & Gas Evolution Detected!
                </div>
              </div>
            </div>
          )}

          {/* MAIN GLASS VESSEL GRAPHIC */}
          <div className="relative mb-6 flex flex-col items-center justify-end">
            {/* Beaker Body / Glass Outlines */}
            <div
              className={`relative overflow-hidden rounded-b-3xl border-4 border-t-0 border-white/40 backdrop-blur-xs shadow-2xl transition-all duration-700 ${
                selectedVessel === 'test_tube'
                  ? 'h-64 w-20 rounded-b-full'
                  : selectedVessel === 'conical_flask'
                  ? 'h-64 w-52 [clip-path:polygon(35%_0%,65%_0%,100%_100%,0%_100%)] rounded-b-2xl'
                  : 'h-60 w-44 rounded-b-3xl'
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'inset 0 0 25px rgba(255, 255, 255, 0.1), 0 15px 35px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Stirring Rod Graphic */}
              {isStirring && (
                <div className="absolute left-1/2 -top-10 h-64 w-2.5 -translate-x-1/2 rounded-full bg-white/70 shadow-lg animate-pulse origin-bottom" />
              )}

              {/* Liquid Column */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out"
                style={{
                  height: `${Math.min(90, Math.max(15, (vesselState.totalVol / 250) * 100))}%`,
                  backgroundColor: vesselState.displayColor,
                  backdropFilter: 'blur(2px)'
                }}
              >
                {/* Surface Meniscus Line */}
                <div className="h-2 w-full rounded-t-full bg-white/40 blur-[1px]" />

                {/* Insoluble Precipitate Layer at the bottom */}
                {precipitateState && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 transition-all duration-500"
                    style={{ backgroundColor: precipitateState.color }}
                  >
                    <div className="text-[9px] font-black text-slate-900 text-center uppercase tracking-tighter truncate px-1">
                      {precipitateState.name}↓
                    </div>
                  </div>
                )}
              </div>

              {/* Graduation Markings */}
              <div className="absolute right-2 top-8 flex flex-col gap-4 text-[9px] font-mono text-white/50 select-none">
                <span>- 200mL</span>
                <span>- 150mL</span>
                <span>- 100mL</span>
                <span>- 50mL</span>
              </div>
            </div>

            {/* BUNSEN BURNER GRAPHIC (Below Vessel) */}
            <div className="relative mt-2 flex flex-col items-center">
              {/* Flame Animation */}
              {burnerState !== 'off' && (
                <div
                  className={`mb-1 h-12 w-6 rounded-full blur-[2px] transition-all duration-300 animate-pulse ${
                    burnerState === 'blue'
                      ? 'bg-gradient-to-t from-sky-500 via-blue-400 to-cyan-200 h-16 shadow-[0_0_20px_#38bdf8]'
                      : 'bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 h-14 shadow-[0_0_20px_#f59e0b]'
                  }`}
                />
              )}

              {/* Burner Chimney Pipe */}
              <div className="h-10 w-5 rounded-t-sm bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border border-slate-500 shadow-md" />

              {/* Burner Heavy Cast Base */}
              <div className="h-3 w-16 rounded-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border border-slate-600 shadow-lg" />
            </div>
          </div>

          {/* Burner Flame Mode Switcher */}
          <div className="relative z-10 flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 p-1.5 backdrop-blur-md">
            <span className="text-xs font-bold text-slate-300 pl-2">Flame:</span>
            <button
              onClick={() => setBurnerState('off')}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                burnerState === 'off' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Off
            </button>
            <button
              onClick={() => setBurnerState('yellow')}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                burnerState === 'yellow' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-amber-300 hover:text-amber-200'
              }`}
            >
              Gentle Yellow
            </button>
            <button
              onClick={() => setBurnerState('blue')}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                burnerState === 'blue' ? 'bg-sky-400 text-slate-950 shadow-xs' : 'text-sky-300 hover:text-sky-200'
              }`}
            >
              Roaring Blue (Δ)
            </button>
          </div>
        </div>

        {/* Reaction Trigger Button & Outcome Banner */}
        <div className="flex flex-col gap-3">
          <button
            onClick={runSimulation}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-3.5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-98 transition cursor-pointer"
          >
            <Play size={18} />
            <span>Simulate Reaction & Test Chemical Equilibrium</span>
          </button>

          {/* Live Outcome Box */}
          {simulationResult && (
            <div
              className={`rounded-2xl border p-4 shadow-sm animate-in fade-in duration-200 ${
                simulationResult.found
                  ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                  : 'border-amber-200 bg-amber-50/70 text-amber-950'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {simulationResult.found ? (
                    <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  ) : (
                    <AlertTriangle className="text-amber-600 shrink-0" size={18} />
                  )}
                  <h4 className="font-black text-sm">
                    {simulationResult.found ? simulationResult.reaction?.name : 'Reaction Result'}
                  </h4>
                </div>
                <span
                  className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${
                    simulationResult.found ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {simulationResult.found ? 'Verified Reaction' : 'Zero-Fabrication Guard'}
                </span>
              </div>

              {simulationResult.found ? (
                <div className="mt-2 flex flex-col gap-1.5 text-xs">
                  <div className="font-mono font-bold text-slate-900 bg-white/80 p-2 rounded-xl border border-emerald-200/60 overflow-x-auto">
                    {simulationResult.balancedEquation}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    <strong>Observation:</strong> {simulationResult.observations}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Mechanism:</strong> {simulationResult.explanation}
                  </p>
                </div>
              ) : (
                <div className="mt-2 text-xs leading-relaxed text-amber-900">
                  <p className="font-bold">{simulationResult.message}</p>
                  <p className="mt-0.5 opacity-80">{simulationResult.reason}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Reagents Dispenser & Vessel Chemicals List (40% width) */}
      <div className="flex w-full lg:w-96 flex-col gap-4">
        {/* Chemicals Currently in Vessel Card */}
        <div className="flex flex-col gap-2.5 rounded-3xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Layers size={16} className="text-sky-500" />
              <span>Current Vessel Contents</span>
            </h3>
            <span className="text-[10px] font-bold text-slate-500">{vesselContents.length} Substances</span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            {vesselContents.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-bold text-slate-800">{item.name}</span>
                  <span className="font-mono text-[10px] text-slate-400">({item.formula})</span>
                </div>
                <button
                  onClick={() => setVesselContents((prev) => prev.filter((_, i) => i !== idx))}
                  className="text-slate-400 hover:text-rose-500 transition cursor-pointer"
                  title="Remove substance"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Custom chemical quick input */}
          <div className="mt-1 flex items-center gap-1.5 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={customChemicalInput}
              onChange={(e) => setCustomChemicalInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomChemical()}
              placeholder="Add formula (e.g. AgNO3, NaI)..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
            />
            <button
              onClick={addCustomChemical}
              className="rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-sky-600 transition cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Reagents Dispenser Shelf Card */}
        <div className="flex flex-col gap-3 rounded-3xl border border-sky-100 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <FlaskConical size={16} className="text-sky-500" />
              <span>Laboratory Reagents Shelf</span>
            </h3>
            <span className="text-[10px] font-bold text-sky-600">Click to Dispense</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {REAGENT_SHELF.map((reagent) => (
              <button
                key={reagent.formula}
                onClick={() => addChemical(reagent)}
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2 text-left transition hover:border-sky-300 hover:bg-sky-50/50 hover:shadow-xs cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700 transition">
                    {reagent.name}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    Formula: {reagent.formula}
                  </span>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:border-sky-400 group-hover:bg-sky-500 group-hover:text-white transition">
                  <Plus size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
