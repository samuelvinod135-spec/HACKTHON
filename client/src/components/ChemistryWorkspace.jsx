import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Save,
  Pencil,
  Search,
  ChevronDown,
  GripVertical,
  ArrowRight,
  Trash2,
  FlaskConical,
  Atom,
  Wind,
  TestTube,
  Gauge,
  Timer,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { api } from '../api.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { MATERIAL_CHEMICALS, CATEGORIES } from '../chemistryData.js';

const DURATION_MS = 5000;

const MATERIALS = MATERIAL_CHEMICALS.filter((m) => !m.arrow);

function fmtTime(ms) {
  const total = Math.max(0, ms);
  const s = Math.floor(total / 1000);
  const cs = Math.floor((total % 1000) / 10);
  return `${String(s).padStart(2, '0')}:${String(cs).padStart(2, '0')}`;
}

// ---- Material / product visual ----
function MaterialBadge({ formula, tone, phase, size = 'md' }) {
  const sizes =
    size === 'lg'
      ? 'h-14 w-14 text-sm'
      : size === 'sm'
      ? 'h-9 w-9 text-[11px]'
      : 'h-11 w-11 text-xs';
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex ${sizes} items-center justify-center rounded-full bg-gradient-to-br ${
          tone || 'from-neon-purple to-neon-blue'
        } font-bold text-white shadow-lg ring-1 ring-white/20`}
      >
        {formula}
      </div>
      <span className="text-[9px] uppercase text-slate-500">{phaseLabel(phase)}</span>
    </div>
  );
}

function phaseLabel(phase) {
  switch (phase) {
    case 's': return 'solid';
    case 'l': return 'liquid';
    case 'g': return 'gas';
    case 'aq': return 'aq';
    default: return '';
  }
}

function productMeta(formula) {
  const m = MATERIALS.find((x) => x.formula === formula);
  if (m) return { formula, tone: m.tone, phase: m.phase };
  // fallback tone by formula heuristic
  const tone =
    formula.includes('O') || formula.includes('CO') || formula.includes('SO')
      ? 'from-slate-200 to-slate-400'
      : 'from-neon-purple to-neon-blue';
  return { formula, tone, phase: '' };
}

// ---- Observation helper (OUTPUT zone only) ----
function ObservationEffect({ key, active }) {
  if (!active) return null;
  switch (key) {
    case 'white_light':
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="obs-whiteflash absolute inset-0" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />
        </div>
      );
    case 'bubbling':
    case 'colorless_gas':
    case 'pungent_gas':
    case 'rotten_egg':
      return (
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-2">
          {[0, 0.15, 0.3, 0.45, 0.6].map((d) => (
            <span
              key={d}
              className="obs-bubble h-2.5 w-2.5 rounded-full bg-cyan-300/80"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </div>
      );
    case 'precipitate':
    case 'precipitate_blue':
    case 'precipitate_yellow':
    case 'black_solid':
      return (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="obs-precip h-20 w-20 rounded-full"
            style={{
              background:
                key === 'precipitate_blue'
                  ? 'radial-gradient(circle, #93c5fd, #2563eb)'
                  : key === 'precipitate_yellow'
                  ? 'radial-gradient(circle, #fde047, #ca8a04)'
                  : key === 'black_solid'
                  ? 'radial-gradient(circle, #78716c, #1c1917)'
                  : 'radial-gradient(circle, #f8fafc, #cbd5e1)',
            }}
          />
        </div>
      );
    case 'color_clear_pink':
    case 'color_clear_blue':
    case 'color_clear':
    case 'color_clear_orange':
    case 'blood_red':
      return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-24 rounded-b-2xl rounded-t-sm border-2 border-t-0 border-white/30 bg-gradient-to-b opacity-80"
            style={{
              background:
                key === 'color_clear_pink'
                  ? 'linear-gradient(#fecdd3,#f43f5e)'
                  : key === 'color_clear_blue'
                  ? 'linear-gradient(#bfdbfe,#2563eb)'
                  : key === 'color_clear_orange'
                  ? 'linear-gradient(#fed7aa,#ea580c)'
                  : key === 'blood_red'
                  ? 'linear-gradient(#fecaca,#dc2626)'
                  : 'linear-gradient(#e2e8f0,#94a3b8)',
            }}
          />
        </div>
      );
    case 'squeaky_pop':
      return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="obs-pop rounded-full border-2 border-amber-300 px-4 py-1 text-xs font-bold text-amber-300">
            POP!
          </div>
        </div>
      );
    case 'green_rust':
      return (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center gap-1 p-4">
          {['#65a30d', '#4d7c0f', '#3f6212'].map((c) => (
            <span key={c} className="h-6 w-3 rounded-sm" style={{ background: c }} />
          ))}
        </div>
      );
    case 'blue_to_white':
      return (
        <div className="pointer-events-none absolute ml-auto mr-3 text-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wide opacity-90">→ white</span>
        </div>
      );
    default:
      return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Sparkles className="animate-pulse text-amber-300" size={28} />
        </div>
      );
  }
}

export default function ChemistryWorkspace() {
  const { record } = useProgress();

  const [title, setTitle] = useState('Magnesium Combustion');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCategory, setShowCategory] = useState(false);

  // Reaction flow state
  const [inputs, setInputs] = useState([]); // {id, formula, tone, phase}
  const [arrow, setArrow] = useState({ placed: false, conditions: [], comingFrom: null });
  const [output, setOutput] = useState(null); // matched reaction
  const [simulating, setSimulating] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [saved, setSaved] = useState(false);
  const [dragOverInput, setDragOverInput] = useState(false);
  const [dragOverArrow, setDragOverArrow] = useState(false);
  const [lastError, setLastError] = useState('');
  const [showHelp, setShowHelp] = useState(true);

  const rafRef = useRef(null);
  const runId = useRef(0);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/labxplore-mat', item.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDropInput = (e) => {
    e.preventDefault();
    setDragOverInput(false);
    const id = e.dataTransfer.getData('application/labxplore-mat');
    const m = MATERIALS.find((x) => x.id === id);
    if (!m) return;
    setInputs((prev) =>
      prev.some((x) => x.formula === m.formula)
        ? prev
        : [...prev, { id: m.id, formula: m.formula, tone: m.tone, phase: m.phase }]
    );
  };

  const handleDropArrow = (e) => {
    e.preventDefault();
    setDragOverArrow(false);
    const id = e.dataTransfer.getData('application/labxplore-mat');
    const m = MATERIAL_CHEMICALS.find((x) => x.id === id && x.arrow);
    if (!m) return;
    setArrow((prev) => ({
      placed: true,
      conditions: prev.conditions.includes(m.arrow)
        ? prev.conditions
        : [...prev.conditions, m.arrow],
    }));
  };

  const removeInput = (formula) => {
    setInputs((prev) => prev.filter((x) => x.formula !== formula));
    setOutput(null);
  };

  const clearConditions = () => setArrow((prev) => ({ ...prev, conditions: [] }));

  // Start simulation: match inputs+conditions -> output
  const run = useCallback(async () => {
    if (simulating) return;
    setOutput(null);
    setLastError('');
    const inFormulas = inputs.map((i) => i.formula);
    const conds = arrow.conditions;
    if (inFormulas.length === 0) {
      setLastError('Add at least one reactant to the Input zone.');
      return;
    }
    let match;
    try {
      const res = await api.matchReaction(inFormulas, conds);
      match = res.reaction;
    } catch {
      setLastError('Reaction engine is offline. Is the server running?');
      return;
    }
    if (!match) {
      setLastError('No reaction found for these reactants. Try adding other chemicals or an action arrow.');
      return;
    }
    setOutput(match);
    setSimulating(true);
    setElapsed(0);
    const id = ++runId.current;
    const start = performance.now();
    const tick = () => {
      const t = performance.now() - start;
      setElapsed(t);
      if (t < DURATION_MS) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        if (runId.current === id) {
          setSimulating(false);
          setSaved(true);
          record({
            kind: 'experiment',
            ref: match.equation,
            xp: 120,
            achievements: ['first-burn'],
          });
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [simulating, inputs, arrow.conditions, record]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); runId.current++; }, []);

  const progress = Math.min(1, elapsed / DURATION_MS);

  const visible = MATERIALS.filter(
    (m) =>
      (category === 'All' || category === 'Action Arrows' || m.category === category) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );
  const arrows = MATERIAL_CHEMICALS.filter((m) => m.arrow && (category === 'Action Arrows' || category === 'All'));

  return (
    <div className="flex h-[calc(100vh-2.5rem)] flex-col overflow-hidden rounded-2xl" data-testid="chemistry-workspace">
      {/* Top toolbar */}
      <div className="glass-strong flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-t-2xl px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => { setTitle(titleDraft.trim() || 'Untitled'); setEditingTitle(false); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { setTitle(titleDraft.trim() || 'Untitled'); setEditingTitle(false); } if (e.key === 'Escape') setEditingTitle(false); }}
              className="w-56 rounded-lg border border-neon-purple/40 bg-black/30 px-2 py-1 text-sm font-semibold text-white outline-none"
            />
          ) : (
            <button onClick={() => { setTitleDraft(title); setEditingTitle(true); }} className="group flex items-center gap-2 text-sm font-semibold text-white" title="Edit name">
              {title}
              <Pencil size={14} className="text-slate-500 opacity-0 transition group-hover:opacity-100 hover:text-neon-purple" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp((s) => !s)} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10" title="Help">
            <BookOpen size={14} />
            <span className="hidden sm:inline">{showHelp ? 'Hide' : ''} Help</span>
          </button>
          <button
            onClick={run}
            disabled={simulating}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue px-4 py-2 text-xs font-bold text-white shadow-lg shadow-neon-purple/30 transition hover:brightness-110 disabled:opacity-50"
            data-testid="run-button"
          >
            <Play size={14} />
            {simulating ? 'Reacting…' : './ Run Simulation'}
          </button>
          <button onClick={() => setSaved(true)} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">
            <Save size={14} /> Save / Export
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* Flow canvas */}
        <div className="relative flex flex-1 flex-col bg-navy-900 ring-1 ring-inset ring-white/10"
          style={{ backgroundImage: 'radial-gradient(rgba(139,92,246,0.14) 1px, transparent 1px)', backgroundSize: '26px 26px' }}>
          {/* legend/help */}
          {showHelp && (
            <div className="absolute right-3 top-3 z-10 w-64 rounded-xl border border-white/10 bg-navy-950/85 p-3 text-[11px] leading-relaxed text-slate-300 backdrop-blur-md">
              <p className="mb-1 font-semibold text-neon-cyan">How it works</p>
              <ul className="space-y-1">
                <li>1. Drag reactants into the <b>Input</b> zone.</li>
                <li>2. Drop a <b>Heat/Electricity arrow</b> in the middle.</li>
                <li>3. Hit <b>Run Simulation</b> to see products & observations.</li>
              </ul>
            </div>
          )}

          {lastError && (
            <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-lg border border-red-500/40 bg-red-500/15 px-4 py-2 text-xs font-medium text-red-200">
              {lastError}
            </div>
          )}

          {/* Flow: Input -> Arrow -> Output */}
          <div className="relative flex h-full items-stretch gap-2 p-4 sm:p-6">
            {/* INPUT zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverInput(true); }}
              onDragLeave={() => setDragOverInput(false)}
              onDrop={handleDropInput}
              className={`flex flex-1 flex-col rounded-2xl border-2 border-dashed p-3 transition ${
                dragOverInput
                  ? 'border-neon-purple bg-neon-purple/10'
                  : 'border-emerald-400/30 bg-emerald-400/5'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  <FlaskConical size={13} /> Reactants — Input
                </span>
                <span className="text-[10px] text-slate-500">drop here</span>
              </div>
              <div className="flex flex-1 flex-wrap content-start items-start justify-center gap-3">
                {inputs.map((inp) => (
                  <div key={inp.formula} className="group relative">
                    <MaterialBadge formula={inp.formula} tone={inp.tone} phase={inp.phase} size="lg" />
                    <button
                      onClick={() => removeInput(inp.formula)}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 transition group-hover:opacity-100"
                      title="Remove"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
                {inputs.length === 0 && (
                  <div className="m-auto text-center text-slate-600">
                    <TestTube size={30} className="mx-auto opacity-60" />
                    <p className="mt-2 text-xs">Drag starting chemicals here</p>
                  </div>
                )}
              </div>
            </div>

            {/* ARROW zone */}
            <div className="flex w-24 flex-col items-center justify-center">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOverArrow(true); }}
                onDragLeave={() => setDragOverArrow(false)}
                onDrop={handleDropArrow}
                onClick={arrow.placed && arrow.conditions.length > 0 ? clearConditions : undefined}
                className={`flex h-full w-16 flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${
                  dragOverArrow
                    ? 'border-neon-blue bg-neon-blue/10'
                    : arrow.placed
                    ? 'border-neon-purple/50 bg-neon-purple/10'
                    : 'border-amber-400/30 bg-amber-400/5'
                }`}
                title="Drop a Heat/Electricity/Catalyst arrow here. Click to clear conditions."
              >
                <ArrowRight
                  size={34}
                  className={arrow.placed ? 'text-neon-purple drop-shadow' : 'text-slate-500'}
                  strokeWidth={2.5}
                />
                <div className="mt-1 flex max-w-full flex-wrap justify-center gap-1">
                  {arrow.conditions.map((c) => (
                    <span key={c} className="rounded bg-neon-purple/30 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {arrowSymbol(c)}
                    </span>
                  ))}
                  {arrow.placed && arrow.conditions.length === 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); clearConditions(); }}
                      className="text-[9px] text-slate-400 underline"
                    >
                      (no condition)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* OUTPUT zone */}
            <div className="relative flex flex-1 flex-col rounded-2xl border-2 border-neon-blue/30 bg-neon-blue/5 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neon-blue">
                  <Atom size={13} /> Products — Output
                </span>
                <span className="text-[10px] text-slate-500">appears after reaction</span>
              </div>
              <div className="relative flex flex-1 flex-wrap content-start items-start justify-center gap-3">
                {output && output.outputs.map((p) => {
                  const meta = productMeta(p);
                  return <MaterialBadge key={p} formula={meta.formula} tone={meta.tone} phase={meta.phase} size="lg" />;
                })}
                {!output && (
                  <div className="m-auto text-center text-slate-600">
                    <Sparkles size={30} className="mx-auto opacity-60" />
                    <p className="mt-2 text-xs">Products will appear here</p>
                  </div>
                )}

                {/* observation effects ONLY in output zone */}
                {output && <ObservationEffect key={output.observation} active={simulating} />}
              </div>

              {/* equation + observation text */}
              {output && (
                <div className="mt-2 rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="text-center font-mono text-sm font-bold text-white">{output.equation}</p>
                  <p className="mt-1.5 flex items-center justify-center gap-1 text-center text-[11px] text-amber-300">
                    <Sparkles size={12} /> Observation: {obsText(output.observation)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* bottom progress strip */}
          <div className="flex shrink-0 items-center gap-3 border-t border-white/10 bg-navy-950/60 px-4 py-2">
            <span className="flex items-center gap-1 text-[11px] text-slate-400"><Gauge size={12} className="text-orange-400" /> Temp <b className="text-orange-300">{(25 + progress * 200).toFixed(0)}°C</b></span>
            <span className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1 text-[11px] text-slate-400"><Wind size={12} className="text-cyan-400" /> Pressure <b className="text-cyan-300">{(1.0 + progress * 0.05).toFixed(2)} atm</b></span>
            <span className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1 text-[11px] text-slate-400"><Timer size={12} className="text-neon-purple" /> <b className="font-mono text-white">{fmtTime(DURATION_MS - elapsed)}</b></span>
            <div className="ml-2 h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Right component palette */}
        <div className="flex w-60 shrink-0 flex-col border-l border-white/10 bg-navy-850/70 backdrop-blur-md">
          <div className="border-b border-white/10 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <GripVertical size={12} /> Component Library
            </p>
            <div className="relative">
              <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chemicals…"
                className="w-full rounded-lg border border-white/10 bg-black/30 py-1.5 pl-8 pr-2 text-xs text-white placeholder-slate-500 outline-none focus:border-neon-purple/50"
              />
            </div>
            <div className="relative mt-2">
              <button onClick={() => setShowCategory((s) => !s)} className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10">
                {search ? `in ${category}` : category} <ChevronDown size={13} className={showCategory ? 'rotate-180' : ''} />
              </button>
              {showCategory && (
                <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/10 bg-navy-800 shadow-xl">
                  {['All', ...CATEGORIES].map((c) => (
                    <button key={c} onClick={() => { setCategory(c); setShowCategory(false); }} className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-white/10 ${category === c ? 'text-neon-purple' : 'text-slate-300'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2">
              {visible.map((m) => (
                <div
                  key={m.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, m)}
                  className="group flex cursor-grab flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-2 text-center transition hover:border-neon-purple/40 hover:bg-white/10 active:cursor-grabbing"
                  title={m.name}
                >
                  <MaterialBadge formula={m.formula} tone={m.tone} phase={m.phase} size="sm" />
                  <span className="text-[9px] font-medium leading-tight text-slate-300">{m.name}</span>
                </div>
              ))}
            </div>

            {/* Action arrows section */}
            <div className="mt-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300/70">Action Arrows</p>
              <div className="grid grid-cols-2 gap-2">
                {arrows.map((a) => (
                  <div
                    key={a.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, a)}
                    className="group flex cursor-grab flex-col items-center gap-1 rounded-lg border border-amber-400/20 bg-amber-400/5 p-2 text-center transition hover:border-amber-400/50 hover:bg-amber-400/10 active:cursor-grabbing"
                    title={a.name}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow">
                      {a.symbol}
                    </span>
                    <span className="text-[9px] font-medium leading-tight text-amber-200">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {visible.length === 0 && arrows.length === 0 && (
              <p className="text-center text-xs text-slate-600">No components found</p>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <p className="text-[10px] leading-relaxed text-slate-500">
              Drag chemicals into <b className="text-emerald-300">Input</b> and an arrow between them, then Run.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function arrowSymbol(c) {
  switch (c) {
    case 'heat': return 'Δ';
    case 'electricity': return '⚡';
    case 'sunlight': return '☀';
    case 'catalyst': return 'cat.';
    case 'pressure': return 'P';
    case 'high_temp': return 'T';
    default: return c;
  }
}

function obsText(key) {
  const map = {
    white_light: 'Dazzling white light',
    bubbling: 'Effervescence / gas bubbles',
    color_clear_pink: 'Solution turns pink',
    color_clear_blue: 'Solution turns blue',
    color_clear: 'Colourless (permanganate decolourises)',
    color_clear_orange: 'Orange goes green',
    precipitate: 'White precipitate forms',
    precipitate_yellow: 'Yellow precipitate forms',
    precipitate_blue: 'Blue precipitate forms',
    black_solid: 'Black solid forms',
    colorless_gas: 'Colourless gas released',
    pungent_gas: 'Pungent gas detected',
    rotten_egg: 'Rotten-egg smell (H2S)',
    squeaky_pop: 'Popping sound (H2)',
    turns_limewater: 'Limewater turns milky',
    blue_to_white: 'Blue crystals turn white',
    heat_light: 'Heat & light released',
    greenish_gas: 'Green chlorine gas',
    white_fumes: 'White fumes',
    fruity_smell: 'Fruity smell',
    blood_red: 'Blood-red colour',
    solid_formed: 'Polymer solid forms',
    green_rust: 'Greenish rust forms',
  };
  return map[key] || key;
}
