import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Trash2,
  Play,
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  Sparkles,
  Flame,
  Sun,
  Zap,
  Info,
  ArrowRight
} from 'lucide-react';
import { simulateVesselReaction } from '../../data/chemistry/chemistryDatabase.js';

export default function ReactionSimulatorView({ onTransferToLab }) {
  const [selectedReactants, setSelectedReactants] = useState(['NaOH', 'HCl']);
  const [customInput, setCustomInput] = useState('');
  const [conditions, setConditions] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  const COMMON_CHEMICALS = [
    { label: 'Hydrochloric Acid', formula: 'HCl' },
    { label: 'Sodium Hydroxide', formula: 'NaOH' },
    { label: 'Sulphuric Acid', formula: 'H2SO4' },
    { label: 'Copper Sulphate', formula: 'CuSO4' },
    { label: 'Iron', formula: 'Fe' },
    { label: 'Zinc', formula: 'Zn' },
    { label: 'Barium Chloride', formula: 'BaCl2' },
    { label: 'Sodium Sulphate', formula: 'Na2SO4' },
    { label: 'Lead Nitrate', formula: 'Pb(NO3)2' },
    { label: 'Potassium Iodide', formula: 'KI' },
    { label: 'Magnesium', formula: 'Mg' },
    { label: 'Oxygen', formula: 'O2' },
    { label: 'Hydrogen', formula: 'H2' },
    { label: 'Calcium Oxide', formula: 'CaO' },
    { label: 'Ethanol', formula: 'C2H5OH' },
    { label: 'Ethanoic Acid', formula: 'CH3COOH' },
  ];

  const CONDITION_OPTIONS = [
    { id: 'heat', label: 'Heat (Δ)', icon: Flame },
    { id: 'sunlight', label: 'Diffused Sunlight (hν)', icon: Sun },
    { id: 'catalyst', label: 'Catalyst Presence', icon: Sparkles },
    { id: 'electricity', label: 'Electrolysis', icon: Zap },
  ];

  const handleAddReactant = (formula) => {
    if (!selectedReactants.includes(formula)) {
      setSelectedReactants([...selectedReactants, formula]);
    }
  };

  const handleAddCustom = () => {
    const val = customInput.trim();
    if (val && !selectedReactants.includes(val)) {
      setSelectedReactants([...selectedReactants, val]);
      setCustomInput('');
    }
  };

  const handleRemove = (formula) => {
    setSelectedReactants(selectedReactants.filter((r) => r !== formula));
  };

  const toggleCondition = (id) => {
    if (conditions.includes(id)) {
      setConditions(conditions.filter((c) => c !== id));
    } else {
      setConditions([...conditions, id]);
    }
  };

  const runSimulation = () => {
    const res = simulateVesselReaction(selectedReactants, conditions);
    setSimulationResult(res);
  };

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Reaction Simulator & Predictor</span>
                <span className="rounded-full bg-purple-100 text-purple-800 px-2 py-0.5 text-[10px] font-black">
                  Zero Fabrication
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Predict outcome equations and mechanisms based on strictly authentic NCERT & CBSE chemistry standards.
              </p>
            </div>
          </div>

          <span className="rounded-2xl border border-purple-200 bg-white px-3 py-1.5 text-[11px] font-bold text-purple-700 shadow-2xs">
            10,977+ Reactions Verified
          </span>
        </div>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT CARD: Reactants & Conditions Selection */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              1. Selected Chemical Reactants ({selectedReactants.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Add at least two substances to test their chemical reactivity.
            </p>
          </div>

          {/* Currently Selected Reactants Chips */}
          <div className="flex flex-wrap items-center gap-2 min-h-[42px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-2.5">
            {selectedReactants.length === 0 ? (
              <span className="text-xs font-medium text-slate-400">No chemicals selected yet. Click below or type to add.</span>
            ) : (
              selectedReactants.map((r) => (
                <span
                  key={r}
                  className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-black text-purple-950 shadow-2xs"
                >
                  <span>{r}</span>
                  <button
                    onClick={() => handleRemove(r)}
                    className="text-purple-400 hover:text-rose-600 transition cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Custom Formula Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
              placeholder="Enter chemical formula (e.g. Al, KMnO4, C2H4)..."
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:outline-none transition"
            />
            <button
              onClick={handleAddCustom}
              className="flex items-center gap-1 rounded-2xl bg-purple-600 px-3.5 py-2 text-xs font-black text-white shadow-xs hover:bg-purple-700 transition cursor-pointer"
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>

          {/* Quick Common Chemicals Grid */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Common Educational Chemicals:</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {COMMON_CHEMICALS.map((chem) => (
                <button
                  key={chem.formula}
                  onClick={() => handleAddReactant(chem.formula)}
                  className={`rounded-xl border px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                    selectedReactants.includes(chem.formula)
                      ? 'border-purple-300 bg-purple-100 text-purple-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  {chem.formula}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Reaction Conditions */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Optional Environmental Conditions:</span>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              {CONDITION_OPTIONS.map((cond) => {
                const Icon = cond.icon;
                const active = conditions.includes(cond.id);
                return (
                  <button
                    key={cond.id}
                    onClick={() => toggleCondition(cond.id)}
                    className={`flex items-center gap-2 rounded-xl border p-2 text-xs font-bold transition cursor-pointer ${
                      active
                        ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={14} className={active ? 'text-amber-600' : 'text-slate-400'} />
                    <span>{cond.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Predict Button */}
          <button
            onClick={runSimulation}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-xs font-black text-white shadow-md shadow-purple-500/20 hover:brightness-110 active:scale-98 transition cursor-pointer"
          >
            <Play size={15} />
            <span>Simulate Reaction & Predict Products</span>
          </button>
        </div>

        {/* RIGHT CARD: Predicted Outcome & Strict Zero-Fabrication Card */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              2. Simulation Outcome
            </h3>
            {simulationResult && (
              <span
                className={`rounded-lg px-2.5 py-0.5 text-[10px] font-black ${
                  simulationResult.found ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {simulationResult.found ? 'Verified Match' : 'Zero Fabrication Guard'}
              </span>
            )}
          </div>

          {!simulationResult ? (
            <div className="flex flex-col items-center justify-center my-auto p-8 text-center text-slate-400">
              <Cpu size={36} className="text-slate-300 mb-2" />
              <p className="text-xs font-bold">Select reactants and click "Simulate Reaction" to predict products.</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                The predictor matches verified stoichiometry and mechanisms without hallucinations.
              </p>
            </div>
          ) : simulationResult.found ? (
            <div className="flex flex-col gap-3.5 animate-in fade-in duration-200">
              {/* Match Header */}
              <div className="flex items-start gap-2.5 text-emerald-900">
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-black text-sm">{simulationResult.reaction?.name}</h4>
                  <span className="text-[11px] font-bold text-emerald-700">
                    {simulationResult.reactionType || 'Verified Reaction'}
                  </span>
                </div>
              </div>

              {/* Balanced Equation Display */}
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Balanced Chemical Equation:</span>
                <div className="mt-1 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 font-mono text-xs font-bold text-emerald-950 overflow-x-auto">
                  {simulationResult.balancedEquation}
                </div>
              </div>

              {/* Observations */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                <span className="font-black text-slate-900">Observable Physical Changes:</span>
                <p className="mt-0.5">{simulationResult.observations}</p>
              </div>

              {/* Mechanism */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                <span className="font-black text-slate-900">Scientific Mechanism:</span>
                <p className="mt-0.5">{simulationResult.explanation}</p>
              </div>

              {/* Transfer to Lab Button */}
              <button
                onClick={() => onTransferToLab && onTransferToLab(simulationResult.reaction)}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-sky-500 p-2.5 text-xs font-black text-white shadow-xs hover:bg-sky-600 transition cursor-pointer"
              >
                <FlaskConical size={14} />
                <span>Test this reaction in Virtual Lab Bench</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-3">
                <AlertTriangle size={24} />
              </div>
              <h4 className="text-sm font-black text-amber-950">
                {simulationResult.message}
              </h4>
              <p className="text-xs text-amber-800/80 mt-1 max-w-sm leading-relaxed">
                {simulationResult.reason || 'No verified CBSE/NCERT reaction matches this combination of substances. The engine strictly avoids fabricating fictitious chemistry.'}
              </p>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-2 text-[11px] font-bold text-amber-900">
                💡 Tip: Try mixing active acids with bases (e.g. HCl + NaOH), or metals with salt solutions (e.g. Fe + CuSO4).
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
