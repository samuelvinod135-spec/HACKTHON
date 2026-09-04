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

function MaterialBadge({ formula, tone, phase, size = 'md' }) {
  const sizes = size === 'lg' ? 'h-14 w-14 text-sm' : size === 'sm' ? 'h-9 w-9 text-[11px]' : 'h-11 w-11 text-xs';
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`flex ${sizes} items-center justify-center rounded-full bg-gradient-to-br ${tone || 'from-blue-400 to-blue-600'} font-bold text-white shadow-lg`}>
        {formula}
      </div>
      <span className="text-[9px] uppercase text-gray-400">{phaseLabel(phase)}</span>
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
  const tone = formula.includes('O') || formula.includes('CO') || formula.includes('SO')
    ? 'from-gray-200 to-gray-400'
    : 'from-blue-400 to-blue-600';
  return { formula, tone, phase: '' };
}

function ObservationEffect({ active }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="obs-whiteflash absolute inset-0 rounded-2xl" />
    </div>
  );
}

export default function ChemistryWorkspace() {
  const { record } = useProgress();

  const [title, setTitle] = useState('Magnesium Combustion');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCategory, setShowCategory] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [arrow, setArrow] = useState({ placed: false, conditions: [] });
  const [output, setOutput] = useState(null);
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
      conditions: prev.conditions.includes(m.arrow) ? prev.conditions : [...prev.conditions, m.arrow],
    }));
  };

  const removeInput = (formula) => {
    setInputs((prev) => prev.filter((x) => x.formula !== formula));
    setOutput(null);
  };

  const clearConditions = () => setArrow((prev) => ({ ...prev, conditions: [] }));

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
          record({ kind: 'experiment', ref: match.equation, xp: 120, achievements: ['first-burn'] });
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [simulating, inputs, arrow.conditions, record]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); runId.current++; }, []);

  const progress = Math.min(1, elapsed / DURATION_MS);

  const visible = MATERIALS.filter(
    (m) => (category === 'All' || category === 'Action Arrows' || m.category === category) && m.name.toLowerCase().includes(search.toLowerCase())
  );
  const arrows = MATERIAL_CHEMICALS.filter((m) => m.arrow && (category === 'Action Arrows' || category === 'All'));

  return (
    <div className="flex h-[calc(100vh-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm" data-testid="chemistry-workspace">
      {/* Top toolbar */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-t-2xl border-b border-gray-100 bg-gray-50/80 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => { setTitle(titleDraft.trim() || 'Untitled'); setEditingTitle(false); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { setTitle(titleDraft.trim() || 'Untitled'); setEditingTitle(false); } if (e.key === 'Escape') setEditingTitle(false); }}
              className="w-56 rounded-lg border border-blue-300 bg-white px-2 py-1 text-sm font-semibold text-gray-900 outline-none"
            />
          ) : (
            <button onClick={() => { setTitleDraft(title); setEditingTitle(true); }} className="group flex items-center gap-2 text-sm font-semibold text-gray-900" title="Edit name">
              {title}
              <Pencil size={14} className="text-gray-300 opacity-0 transition group-hover:opacity-100 hover:text-blue-500" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp((s) => !s)} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 shadow-sm transition hover:bg-gray-50" title="Help">
            <BookOpen size={14} />
            <span className="hidden sm:inline">{showHelp ? 'Hide' : ''} Help</span>
          </button>
          <button onClick={run} disabled={simulating} className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-xs font-bold text-gray-900 shadow-sm shadow-yellow-200/60 transition hover:shadow-md hover:shadow-yellow-200/80 disabled:opacity-50" data-testid="run-button">
            <Play size={14} />
            {simulating ? 'Reacting…' : './ Run Simulation'}
          </button>
          <button onClick={() => setSaved(true)} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50">
            <Save size={14} /> Save / Export
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* Flow canvas */}
        <div className="relative flex flex-1 flex-col bg-gray-50"
          style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '26px 26px' }}>
          {showHelp && (
            <div className="absolute right-3 top-3 z-10 w-64 rounded-xl border border-gray-200 bg-white p-3 text-[11px] leading-relaxed text-gray-600 shadow-lg">
              <p className="mb-1 font-bold text-blue-600">How it works</p>
              <ul className="space-y-1">
                <li>1. Drag reactants into the <b>Input</b> zone.</li>
                <li>2. Drop a <b>Heat/Electricity arrow</b> in the middle.</li>
                <li>3. Hit <b>Run Simulation</b> to see products & observations.</li>
              </ul>
            </div>
          )}

          {lastError && (
            <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 shadow">
              {lastError}
            </div>
          )}

          {/* Flow: Input -> Arrow -> Output */}
          <div className="relative flex h-full items-stretch gap-3 p-4 sm:p-6">
            {/* INPUT zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverInput(true); }}
              onDragLeave={() => setDragOverInput(false)}
              onDrop={handleDropInput}
              className={`flex flex-1 flex-col rounded-2xl border-2 border-dashed p-3 transition ${
                dragOverInput ? 'border-blue-400 bg-blue-50' : 'border-emerald-300 bg-emerald-50/50'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  <FlaskConical size={13} /> Reactants — Input
                </span>
                <span className="text-[10px] text-gray-400">drop here</span>
              </div>
              <div className="flex flex-1 flex-wrap content-start items-start justify-center gap-3">
                {inputs.map((inp) => (
                  <div key={inp.formula} className="group relative">
                    <MaterialBadge formula={inp.formula} tone={inp.tone} phase={inp.phase} size="lg" />
                    <button onClick={() => removeInput(inp.formula)} className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100" title="Remove">
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
                {inputs.length === 0 && (
                  <div className="m-auto text-center text-gray-300">
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
                  dragOverArrow ? 'border-blue-400 bg-blue-50' : arrow.placed ? 'border-blue-300 bg-blue-50' : 'border-yellow-300 bg-yellow-50'
                }`}
                title="Drop a Heat/Electricity/Catalyst arrow here. Click to clear conditions."
              >
                <ArrowRight size={34} className={arrow.placed ? 'text-blue-500 drop-shadow-sm' : 'text-gray-300'} strokeWidth={2.5} />
                <div className="mt-1 flex max-w-full flex-wrap justify-center gap-1">
                  {arrow.conditions.map((c) => (
                    <span key={c} className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-600">
                      {arrowSymbol(c)}
                    </span>
                  ))}
                  {arrow.placed && arrow.conditions.length === 0 && (
                    <button onClick={(e) => { e.stopPropagation(); clearConditions(); }} className="text-[9px] text-gray-400 underline">
                      (no condition)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* OUTPUT zone */}
            <div className="relative flex flex-1 flex-col rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  <Atom size={13} /> Products — Output
                </span>
                <span className="text-[10px] text-gray-400">appears after reaction</span>
              </div>
              <div className="relative flex flex-1 flex-wrap content-start items-start justify-center gap-3">
                {output && output.outputs.map((p) => {
                  const meta = productMeta(p);
                  return <MaterialBadge key={p} formula={meta.formula} tone={meta.tone} phase={meta.phase} size="lg" />;
                })}
                {!output && (
                  <div className="m-auto text-center text-gray-300">
                    <Sparkles size={30} className="mx-auto opacity-60" />
                    <p className="mt-2 text-xs">Products will appear here</p>
                  </div>
                )}
                {output && <ObservationEffect active={simulating} />}
              </div>

              {output && (
                <div className="mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                  <p className="text-center font-mono text-sm font-bold text-gray-900">{output.equation}</p>
                  <p className="mt-1.5 flex items-center justify-center gap-1 text-center text-[11px] text-amber-600">
                    <Sparkles size={12} /> Observation: {obsText(output.observation)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* bottom progress strip */}
          <div className="flex shrink-0 items-center gap-3 border-t border-gray-200 bg-gray-50 px-4 py-2">
            <span className="flex items-center gap-1 text-[11px] text-gray-500"><Gauge size={12} className="text-orange-400" /> Temp <b className="text-orange-500">{(25 + progress * 200).toFixed(0)}°C</b></span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="flex items-center gap-1 text-[11px] text-gray-500"><Wind size={12} className="text-teal-400" /> Pressure <b className="text-teal-500">{(1.0 + progress * 0.05).toFixed(2)} atm</b></span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="flex items-center gap-1 text-[11px] text-gray-500"><Timer size={12} className="text-purple-500" /> <b className="font-mono text-gray-800">{fmtTime(DURATION_MS - elapsed)}</b></span>
            <div className="ml-2 h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Right component palette */}
        <div className="flex w-60 shrink-0 flex-col border-l border-gray-200 bg-white">
          <div className="border-b border-gray-100 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <GripVertical size={12} /> Component Library
            </p>
            <div className="relative">
              <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chemicals…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400"
              />
            </div>
            <div className="relative mt-2">
              <button onClick={() => setShowCategory((s) => !s)} className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600 transition hover:bg-gray-100">
                {search ? `in ${category}` : category} <ChevronDown size={13} className={showCategory ? 'rotate-180' : ''} />
              </button>
              {showCategory && (
                <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                  {['All', ...CATEGORIES].map((c) => (
                    <button key={c} onClick={() => { setCategory(c); setShowCategory(false); }} className={`block w-full px-3 py-1.5 text-left text-xs transition hover:bg-gray-50 ${category === c ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
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
                  className="group flex cursor-grab flex-col items-center gap-1 rounded-xl border border-gray-100 bg-gray-50 p-2 text-center transition hover:border-blue-200 hover:bg-white hover:shadow-sm active:cursor-grabbing"
                  title={m.name}
                >
                  <MaterialBadge formula={m.formula} tone={m.tone} phase={m.phase} size="sm" />
                  <span className="text-[9px] font-medium leading-tight text-gray-500">{m.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500">Action Arrows</p>
              <div className="grid grid-cols-2 gap-2">
                {arrows.map((a) => (
                  <div
                    key={a.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, a)}
                    className="group flex cursor-grab flex-col items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 p-2 text-center transition hover:border-amber-300 hover:bg-white hover:shadow-sm active:cursor-grabbing"
                    title={a.name}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm">
                      {a.symbol}
                    </span>
                    <span className="text-[9px] font-medium leading-tight text-amber-600">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {visible.length === 0 && arrows.length === 0 && (
              <p className="text-center text-xs text-gray-300">No components found</p>
            )}
          </div>

          <div className="border-t border-gray-100 p-3">
            <p className="text-[10px] leading-relaxed text-gray-400">
              Drag chemicals into <b className="text-emerald-600">Input</b> and an arrow between them, then Run.
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
