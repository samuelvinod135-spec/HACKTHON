import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  Eye,
  CheckCircle2,
  RotateCcw,
  Layers,
  Filter,
  Flame,
  Plus,
  X,
} from 'lucide-react';
import { api } from '../api.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { MATERIAL_CHEMICALS, CATEGORIES, ORGANIC_SUBGROUPS } from '../chemistryData.js';
import { matchReactionLocally, getReactionCount } from '../data/massiveReactionsData.js';
import ElementCartoon from './ElementCartoon.jsx';

const DURATION_MS = 5000;
const MATERIALS = MATERIAL_CHEMICALS.filter((m) => !m.arrow);

function fmtTime(ms) {
  const total = Math.max(0, ms);
  const s = Math.floor(total / 1000);
  const cs = Math.floor((total % 1000) / 10);
  return `${String(s).padStart(2, '0')}:${String(cs).padStart(2, '0')}`;
}

function MaterialBadge({ formula, tone, phase, size = 'md' }) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div className="flex flex-col items-center gap-1 group/badge transition-transform select-none">
      <div
        className={`relative flex flex-col items-center justify-center rounded-2xl border transition-all ${
          isLarge
            ? 'h-16 w-16 bg-white border-slate-200/90 shadow-md shadow-slate-200/60 p-1.5'
            : isSmall
            ? 'h-11 w-11 bg-white border-slate-200/80 shadow-xs p-1'
            : 'h-13 w-13 bg-white border-slate-200/80 shadow-sm p-1'
        }`}
      >
        <ElementCartoon formula={formula} size={size} />
      </div>
      <div className="flex items-center gap-1">
        <span className="font-mono font-black text-slate-800 text-xs">
          {formula}
        </span>
        <span className="text-[9px] font-bold text-slate-400 uppercase">
          ({phaseLabel(phase) || 's'})
        </span>
      </div>
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
  const m = MATERIALS.find((x) => x.formula.toLowerCase() === formula.toLowerCase());
  if (m) return { formula: m.formula, tone: m.tone, phase: m.phase };
  const tone = formula.includes('O') || formula.includes('CO') || formula.includes('SO')
    ? 'from-gray-200 to-gray-400'
    : 'from-blue-400 to-blue-600';
  return { formula, tone, phase: '' };
}

function ProductVisualObservationStage({ output, simulating, replayingFlare, onReplayFlare }) {
  if (!output) return null;

  const isDazzlingWhiteLight =
    output.observation === 'white_light' ||
    (output.equation && output.equation.includes('MgO')) ||
    (output.description && output.description.toLowerCase().includes('dazzling white flame')) ||
    (output.equation && output.equation.includes('P2O5'));

  const isBubbling = output.observation === 'bubbling' || output.observation === 'squeaky_pop';
  const isPrecipitate = output.observation && output.observation.includes('precipitate');

  const showFlare = simulating || replayingFlare;

  return (
    <div className="mt-3 flex w-full flex-col gap-3">
      {/* 1. Interactive Visual Observation Display Stage */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-2.5 border-b border-slate-100 pb-2">
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
            <Eye size={13} className="text-slate-600" /> Reaction Observation Stage
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-800 border border-slate-200 flex items-center gap-1">
            <CheckCircle2 size={10} className="text-slate-700" /> Reaction Verified
          </span>
        </div>

        {/* Observation 1: Dazzling White Light & Flare (Magnesium Reaction) */}
        {isDazzlingWhiteLight && (
          <div className="relative flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-4 text-center overflow-hidden min-h-[175px] text-white">
            {/* Blinding Radiant White-Hot Starburst Flare Animation */}
            {showFlare ? (
              <div className="relative flex flex-col items-center justify-center py-4 w-full">
                {/* Rotating Sunburst Rays */}
                <div className="absolute h-44 w-44 rounded-full animate-dazzling-rays pointer-events-none opacity-90">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="50"
                        x2={50 + 48 * Math.cos((deg * Math.PI) / 180)}
                        y2={50 + 48 * Math.sin((deg * Math.PI) / 180)}
                        stroke="#fef08a"
                        strokeWidth={deg % 60 === 0 ? '4' : '2'}
                        strokeLinecap="round"
                        opacity={deg % 60 === 0 ? '0.95' : '0.55'}
                      />
                    ))}
                  </svg>
                </div>

                {/* White-Hot Core with Pulsating Aura */}
                <div className="animate-dazzling-pulse relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_0_50px_#ffffff,0_0_90px_#fde047]">
                  <Sparkles size={36} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                </div>

                {/* Live Banner */}
                <div className="relative z-10 mt-3 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 border border-white/40">
                  <span className="text-xs font-black tracking-wide text-yellow-200 flex items-center gap-1.5 animate-pulse">
                    ⚡ DAZZLING WHITE FLAME & LUMINESCENCE!
                  </span>
                </div>
              </div>
            ) : (
              /* Settled State: Crucible with White Ash (MgO) */
              <div className="relative z-10 flex flex-col items-center justify-center py-2 w-full">
                {/* Wispy Smoke rising from hot ash */}
                <div className="relative h-6 w-16 pointer-events-none mb-1">
                  <div className="animate-smoke-wisp absolute left-5 w-4 h-4 rounded-full bg-white/30 blur-xs" />
                  <div className="animate-smoke-wisp absolute right-5 w-3 h-3 rounded-full bg-white/25 blur-xs" style={{ animationDelay: '0.8s' }} />
                </div>

                {/* Illustrated Laboratory Crucible with Powdery White Ash */}
                <svg width="110" height="60" viewBox="0 0 110 60" fill="none" className="drop-shadow-lg">
                  <ellipse cx="55" cy="56" rx="42" ry="4" fill="#000000" opacity="0.3" />
                  {/* Porcelain crucible cup */}
                  <path d="M16 16 L30 50 C32 53 40 55 55 55 C70 55 78 53 80 50 L94 16 Z" fill="url(#cruc-body)" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Crucible rim */}
                  <ellipse cx="55" cy="16" rx="39" ry="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Powdery White Ash (MgO) Pile */}
                  <ellipse cx="55" cy="18" rx="31" ry="6" fill="url(#ash-powder)" className="animate-ash-shimmer" />
                  {/* Crumbly white ash granule texture */}
                  <circle cx="48" cy="17" r="1.6" fill="#ffffff" />
                  <circle cx="62" cy="18" r="2" fill="#ffffff" />
                  <circle cx="55" cy="20" r="1.8" fill="#f8fafc" />
                  <circle cx="41" cy="19" r="1.4" fill="#e2e8f0" />
                  <circle cx="69" cy="17" r="1.3" fill="#e2e8f0" />
                  <defs>
                    <linearGradient id="cruc-body" x1="16" y1="16" x2="94" y2="55" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f8fafc" />
                      <stop offset="0.6" stopColor="#e2e8f0" />
                      <stop offset="1" stopColor="#cbd5e1" />
                    </linearGradient>
                    <linearGradient id="ash-powder" x1="24" y1="12" x2="86" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffffff" />
                      <stop offset="0.7" stopColor="#f8fafc" />
                      <stop offset="1" stopColor="#e2e8f0" />
                    </linearGradient>
                  </defs>
                </svg>

                <p className="mt-1 text-xs font-black text-white flex items-center gap-1">
                  <span>🍚</span> Magnesium Oxide Ash (<span className="text-yellow-300 font-mono">MgO</span>)
                </p>
                <p className="text-[10px] text-slate-300">
                  Brittle, powdery white residue collected in crucible
                </p>

                {/* Replay Dazzling Light Button */}
                <button
                  onClick={onReplayFlare}
                  className="clay-btn-yellow mt-2.5 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-sm flex items-center gap-1"
                >
                  <Sparkles size={12} /> Replay Dazzling Light ⚡
                </button>
              </div>
            )}
          </div>
        )}

        {/* Observation: Bubbling / Gas Effervescence */}
        {isBubbling && (
          <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-sky-50 to-blue-50/80 p-4 border border-sky-100 text-center">
            <div className="relative h-16 w-8 rounded-full border-2 border-sky-400 bg-sky-200/40 overflow-hidden flex flex-col justify-end p-1">
              <div className="h-8 bg-sky-400/50 rounded-b-full relative overflow-hidden">
                <div className="obs-bubble absolute bottom-1 left-1.5 w-2 h-2 rounded-full bg-white shadow-xs" />
                <div className="obs-bubble absolute bottom-2 right-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-xs" style={{ animationDelay: '0.4s' }} />
                <div className="obs-bubble absolute bottom-0.5 left-3 w-2.5 h-2.5 rounded-full bg-white shadow-xs" style={{ animationDelay: '0.8s' }} />
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-900">Vigorous Gas Effervescence 💨</p>
            <p className="text-[10px] text-slate-500">Gas bubbles escaping rapidly</p>
          </div>
        )}

        {/* Observation: Precipitate */}
        {isPrecipitate && (
          <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-slate-50 to-amber-50/50 p-4 border border-slate-200 text-center">
            <div className="relative h-16 w-8 rounded-full border-2 border-slate-400 bg-white overflow-hidden flex flex-col justify-end p-1">
              <div className="h-6 bg-amber-100 rounded-b-full relative">
                <div className="obs-precip absolute top-0 left-1.5 w-2 h-2 rounded-full bg-amber-400" />
                <div className="obs-precip absolute top-1 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-300" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-900">Solid Precipitate Settling 🧪</p>
            <p className="text-[10px] text-slate-500">Insoluble crystals accumulating at bottom</p>
          </div>
        )}

        {/* 2. Structured Observation Cards for Students */}
        <div className="mt-3 space-y-2 text-left">
          {isDazzlingWhiteLight ? (
            <>
              {/* Mandatory Class 10 NCERT Result Quote Banner */}
              <div className="rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 shadow-xs">
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-slate-950 text-xs font-black">
                    ⚡
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-900">Verified NCERT Visual & Textual Output</p>
                    <p className="text-xs font-black text-slate-950 mt-0.5 leading-snug">
                      "Burns with a dazzling white flame to form a white ash."
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-amber-50/70 border border-amber-200/70 p-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                  🔥
                </span>
                <div>
                  <p className="text-[11px] font-black text-amber-950">Observation 1: Dazzling White Flame</p>
                  <p className="text-[10px] text-amber-900/90 leading-tight">
                    Magnesium burns vigorously in oxygen with a blinding, white-hot luminous glare due to high combustion energy release.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-800 text-xs font-black">
                  🍚
                </span>
                <div>
                  <p className="text-[11px] font-black text-slate-900">Observation 2: White Ash Residue (MgO)</p>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    The shiny metallic ribbon is completely converted into a brittle, crumbly white powder called <b>Magnesium Oxide (MgO)</b>.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-2.5">
              <Sparkles size={14} className="text-slate-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-black text-slate-900">Key Observation</p>
                <p className="text-[10px] text-slate-700 leading-tight">
                  {output.description || obsText(output.observation)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DragDropChemistryWorkspace({ onSwitchToOrganic }) {
  const { record } = useProgress();

  const [title, setTitle] = useState('Magnesium Combustion Lab');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCategory, setShowCategory] = useState(false);
  const [organicSubGroup, setOrganicSubGroup] = useState('all');
  const [displayLimit, setDisplayLimit] = useState(36);

  const [inputs, setInputs] = useState([]);
  const [arrow, setArrow] = useState({ placed: false, conditions: [] });
  const [output, setOutput] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [replayingFlare, setReplayingFlare] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [saved, setSaved] = useState(false);
  const [dragOverInput, setDragOverInput] = useState(false);
  const [dragOverArrow, setDragOverArrow] = useState(false);
  const [lastError, setLastError] = useState('');
  const [showHelp, setShowHelp] = useState(true);

  // Reset pagination limit when search or filters change
  useEffect(() => {
    setDisplayLimit(36);
  }, [search, category, organicSubGroup]);

  const handleReplayFlare = () => {
    setReplayingFlare(true);
    setTimeout(() => setReplayingFlare(false), 3200);
  };

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
    const m = MATERIAL_CHEMICALS.find((x) => x.id === id);
    if (!m) return;
    setInputs((prev) =>
      prev.some((x) => x.formula.toLowerCase() === m.formula.toLowerCase())
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

  const handleItemClick = (m) => {
    if (m.arrow) {
      setArrow((prev) => ({
        placed: true,
        conditions: prev.conditions.includes(m.arrow) ? prev.conditions : [...prev.conditions, m.arrow],
      }));
      return;
    }
    if (inputs.some((x) => x.formula.toLowerCase() === m.formula.toLowerCase())) return;
    setInputs((prev) => [...prev, { id: m.id, formula: m.formula, tone: m.tone, phase: m.phase }]);
  };

  const removeInput = (formula) => {
    setInputs((prev) => prev.filter((x) => x.formula.toLowerCase() !== formula.toLowerCase()));
    setOutput(null);
  };

  const clearAllInputs = () => {
    setInputs([]);
    setOutput(null);
    setLastError('');
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

    let match = matchReactionLocally(inFormulas, conds);
    if (!match) {
      try {
        const res = await api.matchReaction(inFormulas, conds);
        match = res?.reaction || res?.match;
      } catch {
        // Fallback silently if offline
      }
    }
    if (!match) {
      setLastError('No reaction found for these reactants. Try adding other chemicals or an action arrow (Heat, Light, etc.).');
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

  // --- Optimized & Hoisted Filtering Logic ---
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = MATERIALS.filter((m) => {
      // 1. Category & Organic Subgroup filter
      let categoryMatch = false;
      if (category === 'All') {
        categoryMatch = true;
      } else if (category === 'Action Arrows') {
        categoryMatch = false; // Arrows have dedicated section
      } else if (category === 'Organic Chemistry') {
        const isOrg = Boolean(m.organicGroup) ||
          m.category === 'Diazonium & Benzene' ||
          m.category === 'Aldehydes & Ketones' ||
          m.category === 'Haloalkanes & Alkyls';
        if (!isOrg) return false;

        if (organicSubGroup === 'all') {
          categoryMatch = true;
        } else {
          categoryMatch = m.organicGroup === organicSubGroup;
        }
      } else if (category === 'Diazonium & Benzene') {
        categoryMatch = m.category === 'Diazonium & Benzene' || m.organicGroup === 'diazonium' || m.organicGroup === 'benzene';
      } else if (category === 'Aldehydes & Ketones') {
        categoryMatch = m.category === 'Aldehydes & Ketones' || m.organicGroup === 'aldehydes' || m.organicGroup === 'ketones';
      } else if (category === 'Haloalkanes & Alkyls') {
        categoryMatch = m.category === 'Haloalkanes & Alkyls' || m.organicGroup === 'haloalkanes';
      } else {
        categoryMatch = m.category === category;
      }

      if (!categoryMatch) return false;
      if (!q) return true;

      // 2. Multi-field search matching (formula, name, rawName, animeTitle, category, keywords)
      if (m.formula && m.formula.toLowerCase() === q) return true;
      if (m.formula && m.formula.toLowerCase().includes(q)) return true;
      if (m.name && m.name.toLowerCase().includes(q)) return true;
      if (m.rawName && m.rawName.toLowerCase().includes(q)) return true;
      if (m.animeTitle && m.animeTitle.toLowerCase().includes(q)) return true;
      if (m.category && m.category.toLowerCase().includes(q)) return true;
      if (m.organicGroup && m.organicGroup.toLowerCase().includes(q)) return true;
      if (m.keywords && m.keywords.some((k) => k.toLowerCase().includes(q))) return true;

      return false;
    });

    // Sort: Exact matches on formula or name hoisted to the very top
    if (!q) return filtered;

    return filtered.sort((a, b) => {
      const aExactFormula = a.formula && a.formula.toLowerCase() === q;
      const bExactFormula = b.formula && b.formula.toLowerCase() === q;
      if (aExactFormula && !bExactFormula) return -1;
      if (!aExactFormula && bExactFormula) return 1;

      const aStartsFormula = a.formula && a.formula.toLowerCase().startsWith(q);
      const bStartsFormula = b.formula && b.formula.toLowerCase().startsWith(q);
      if (aStartsFormula && !bStartsFormula) return -1;
      if (!aStartsFormula && bStartsFormula) return 1;

      const aStartsName = a.name && a.name.toLowerCase().startsWith(q);
      const bStartsName = b.name && b.name.toLowerCase().startsWith(q);
      if (aStartsName && !bStartsName) return -1;
      if (!aStartsName && bStartsName) return 1;

      return 0;
    });
  }, [search, category, organicSubGroup]);

  // Action arrows filtered by search query
  const arrows = useMemo(() => {
    if (category !== 'All' && category !== 'Action Arrows') return [];
    const q = search.trim().toLowerCase();
    return MATERIAL_CHEMICALS.filter((m) => {
      if (!m.arrow) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        (m.keywords && m.keywords.some((k) => k.toLowerCase().includes(q))) ||
        (m.arrow && m.arrow.toLowerCase().includes(q))
      );
    });
  }, [category, search]);

  const totalReactionsCount = useMemo(() => getReactionCount(), []);
  const isOrganicCategory =
    category === 'Organic Chemistry' ||
    category === 'Diazonium & Benzene' ||
    category === 'Aldehydes & Ketones' ||
    category === 'Haloalkanes & Alkyls';

  return (
    <div className="flex h-[calc(100vh-8.5rem)] min-h-[540px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs" data-testid="chemistry-workspace">
      {/* Top toolbar */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-50/70 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => { setTitle(titleDraft.trim() || 'Untitled'); setEditingTitle(false); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { setTitle(titleDraft.trim() || 'Untitled'); setEditingTitle(false); } if (e.key === 'Escape') setEditingTitle(false); }}
              className="w-56 rounded-lg border border-sky-400 bg-white px-2 py-1 text-sm font-semibold text-slate-900 outline-none"
            />
          ) : (
            <button onClick={() => { setTitleDraft(title); setEditingTitle(true); }} className="group flex items-center gap-2 text-sm font-semibold text-slate-900" title="Edit name">
              {title}
              <Pencil size={14} className="text-slate-300 opacity-0 transition group-hover:opacity-100 hover:text-sky-600" />
            </button>
          )}

          {/* Database counter tag */}
          <span className="hidden sm:flex items-center gap-1 rounded-full bg-yellow-100/90 border border-yellow-300 px-2.5 py-0.5 text-[10px] font-black text-amber-900">
            <Sparkles size={11} className="text-amber-600" />
            {totalReactionsCount.toLocaleString()}+ Reactions Database
          </span>
        </div>

        <div className="flex items-center gap-2">
          {inputs.length > 0 && (
            <button
              onClick={clearAllInputs}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              title="Clear all reactants"
            >
              <RotateCcw size={13} /> Clear
            </button>
          )}
          <button onClick={() => setShowHelp((s) => !s)} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-xs transition hover:bg-slate-50 hover:text-slate-900" title="Help">
            <BookOpen size={14} />
            <span className="hidden sm:inline">{showHelp ? 'Hide' : ''} Help</span>
          </button>
          <button onClick={run} disabled={simulating} className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-xs font-bold text-slate-900 shadow-xs transition hover:bg-yellow-500 disabled:opacity-50 active:scale-98" data-testid="run-button">
            <Play size={14} />
            {simulating ? 'Reacting…' : 'Run Simulation'}
          </button>
          <button onClick={() => setSaved(true)} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-xs transition hover:bg-slate-50">
            <Save size={14} /> Save / Export
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* Flow canvas with Physics Lab graph-paper grid background */}
        <div
          className="relative flex flex-1 flex-col bg-white"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(203, 213, 225, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.45) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {showHelp && (
            <div className="absolute right-3 top-3 z-10 w-72 rounded-xl border border-slate-200 bg-white/95 p-3 text-[11px] leading-relaxed text-slate-700 shadow-lg backdrop-blur-xs">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-slate-900">Interactive Chemistry Lab</p>
                <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              </div>
              <ul className="space-y-1">
                <li>1. Drag (or click) chemicals into the <b>Reactants</b> zone.</li>
                <li>2. Optionally add an arrow condition (Heat <b>Δ</b>, Electricity <b>⚡</b>).</li>
                <li>3. Hit <b>Run Simulation</b> to observe reactions & visual outputs.</li>
                <li className="text-[10px] text-amber-700 font-semibold mt-1">
                  💡 Try: Drag <b>Magnesium (Mg)</b> and <b>Oxygen (O2)</b> for the classic Class 10 dazzling flame reaction!
                </li>
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
            {/* INPUT zone (retaining reactant background panel/card) */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverInput(true); }}
              onDragLeave={() => setDragOverInput(false)}
              onDrop={handleDropInput}
              className={`flex flex-1 flex-col rounded-2xl border-2 border-dashed p-3 transition ${
                dragOverInput ? 'border-slate-400 bg-slate-50' : 'border-emerald-300 bg-emerald-50/50'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
                  <FlaskConical size={13} className="text-slate-700" /> Reactants — Input
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-medium">drop or click to add</span>
                  {inputs.length > 0 && (
                    <button onClick={clearAllInputs} className="text-[10px] text-red-500 font-bold hover:underline">
                      clear
                    </button>
                  )}
                </div>
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
                  <div className="m-auto text-center text-slate-400">
                    <TestTube size={30} className="mx-auto opacity-50" />
                    <p className="mt-2 text-xs font-medium text-slate-600">Drag or click starting chemicals here</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">e.g., Magnesium + Oxygen Gas</p>
                  </div>
                )}
              </div>
            </div>

            {/* ARROW zone (retaining yellow border styling specifically on reaction arrow) */}
            <div className="flex w-24 flex-col items-center justify-center">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOverArrow(true); }}
                onDragLeave={() => setDragOverArrow(false)}
                onDrop={handleDropArrow}
                onClick={arrow.placed && arrow.conditions.length > 0 ? clearConditions : undefined}
                className={`flex h-full w-16 flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${
                  dragOverArrow
                    ? 'border-yellow-400 bg-yellow-100/70'
                    : arrow.placed
                    ? 'border-yellow-400 bg-yellow-50/80 shadow-xs'
                    : 'border-yellow-300 bg-yellow-50/60'
                }`}
                title="Drop a Heat/Electricity/Catalyst arrow here. Click to clear conditions."
              >
                <ArrowRight
                  size={34}
                  className={arrow.placed ? 'text-amber-500 drop-shadow-xs' : 'text-amber-300/80'}
                  strokeWidth={2.5}
                />
                <div className="mt-1 flex max-w-full flex-wrap justify-center gap-1">
                  {arrow.conditions.map((c) => (
                    <span key={c} className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 border border-amber-200">
                      {arrowSymbol(c)}
                    </span>
                  ))}
                  {arrow.placed && arrow.conditions.length === 0 && (
                    <button onClick={(e) => { e.stopPropagation(); clearConditions(); }} className="text-[9px] text-slate-500 underline">
                      (ambient)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* OUTPUT zone (retaining product background panel/card, clean neutral typography) */}
            <div className="relative flex flex-1 flex-col rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-3 overflow-y-auto">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
                  <Atom size={13} className="text-slate-700" /> Products — Output
                </span>
                <span className="text-[10px] text-slate-500 font-medium">appears after reaction</span>
              </div>
              <div className="relative flex flex-wrap content-start items-start justify-center gap-3">
                {output && output.outputs.map((p) => {
                  const meta = productMeta(p);
                  return <MaterialBadge key={p} formula={meta.formula} tone={meta.tone} phase={meta.phase} size="lg" />;
                })}
                {!output && (
                  <div className="m-auto text-center text-slate-400 py-10">
                    <Sparkles size={30} className="mx-auto opacity-50" />
                    <p className="mt-2 text-xs font-medium text-slate-600">Products will appear here</p>
                  </div>
                )}
              </div>

              {output && (
                <div className="mt-2 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xs text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Verified Chemical Equation</span>
                  <p className="font-mono text-sm font-black text-slate-900 mt-0.5">{output.equation}</p>
                </div>
              )}

              {output && (
                <ProductVisualObservationStage
                  output={output}
                  simulating={simulating}
                  replayingFlare={replayingFlare}
                  onReplayFlare={handleReplayFlare}
                />
              )}
            </div>
          </div>

          {/* bottom progress strip */}
          <div className="flex shrink-0 items-center gap-3 border-t border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-xs">
            <span className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
              <Gauge size={12} className="text-slate-500" /> Temp <b className="text-slate-900">{(25 + progress * 200).toFixed(0)}°C</b>
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
              <Wind size={12} className="text-slate-500" /> Pressure <b className="text-slate-900">{(1.0 + progress * 0.05).toFixed(2)} atm</b>
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
              <Timer size={12} className="text-slate-500" /> <b className="font-mono text-slate-900 font-bold">{fmtTime(DURATION_MS - elapsed)}</b>
            </span>
            <div className="ml-2 h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-slate-600 to-slate-900 transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Right component palette with Search & Organic Filters */}
        <div className="flex w-64 shrink-0 flex-col border-l border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <GripVertical size={12} /> Component Library
              </p>
              <span className="text-[10px] font-semibold text-sky-600">
                {visible.length} items
              </span>
            </div>

            {/* Quick Filter Pill Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
              <button
                data-testid="filter-all-pill"
                onClick={() => { setCategory('All'); setOrganicSubGroup('all'); }}
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                  category === 'All'
                    ? 'bg-yellow-400 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                data-testid="filter-organic-pill"
                onClick={() => { setCategory('Organic Chemistry'); setOrganicSubGroup('all'); }}
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold transition flex items-center gap-1 ${
                  isOrganicCategory
                    ? 'bg-sky-400 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>🌿</span> Organic
              </button>
              <button
                data-testid="filter-elements-pill"
                onClick={() => { setCategory('118 Elements (Anime)'); setOrganicSubGroup('all'); }}
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold transition flex items-center gap-1 ${
                  category === '118 Elements (Anime)'
                    ? 'bg-yellow-400 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>⚡</span> Elements
              </button>
              <button
                data-testid="filter-salts-pill"
                onClick={() => { setCategory('Salts & Reagents'); setOrganicSubGroup('all'); }}
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                  category === 'Salts & Reagents'
                    ? 'bg-yellow-400 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Salts
              </button>
            </div>

            {/* Search Input Bar (Matches name, formula, symbol, keywords) */}
            <div className="relative">
              <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                data-testid="library-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search (e.g. Mg, Magnesium, O2, Benzene)…"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-7 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 focus:bg-white"
              />
              {search && (
                <button
                  data-testid="clear-search-btn"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Category Dropdown Selector */}
            <div className="relative">
              <button
                data-testid="category-dropdown-btn"
                onClick={() => setShowCategory((s) => !s)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-100"
              >
                <span className="truncate">
                  {category === 'All' ? 'Filter: All Categories' : `Filter: ${category}`}
                </span>
                <ChevronDown size={13} className={`shrink-0 transition-transform ${showCategory ? 'rotate-180' : ''}`} />
              </button>
              {showCategory && (
                <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      data-testid={`category-option-${c}`}
                      onClick={() => {
                        setCategory(c);
                        setShowCategory(false);
                        if (c !== 'Organic Chemistry') setOrganicSubGroup('all');
                      }}
                      className={`block w-full px-3 py-1.5 text-left text-xs transition hover:bg-slate-50 ${
                        category === c ? 'text-sky-600 font-bold bg-sky-50' : 'text-slate-700'
                      }`}
                    >
                      {c === 'Organic Chemistry' ? '🌿 Organic Chemistry' : c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dedicated Organic Chemistry Submenu Filter (Diazonium, Benzene, Aldehydes, Ketones, Haloalkanes) */}
            {isOrganicCategory && (
              <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-2 space-y-1.5" data-testid="organic-groups-submenu">
                <p className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-sky-800">
                  <Filter size={10} /> Organic Groups Submenu
                </p>
                <div className="flex flex-wrap gap-1">
                  {ORGANIC_SUBGROUPS.map((og) => (
                    <button
                      key={og.id}
                      data-testid={`organic-subgroup-${og.id}`}
                      onClick={() => {
                        setCategory('Organic Chemistry');
                        setOrganicSubGroup(og.id);
                      }}
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition ${
                        organicSubGroup === og.id
                          ? 'bg-yellow-400 text-slate-950 shadow-xs font-black'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-sky-100'
                      }`}
                    >
                      {og.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Component items grid */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2">
              {visible.slice(0, displayLimit).map((m) => (
                <div
                  key={m.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, m)}
                  onClick={() => handleItemClick(m)}
                  className="group flex cursor-grab flex-col items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 p-2 text-center transition hover:border-sky-300 hover:bg-white hover:shadow-xs active:cursor-grabbing hover:scale-102"
                  title={`${m.name} (${m.formula}) - Click or drag to add to Reactants`}
                >
                  <MaterialBadge formula={m.formula} tone={m.tone} phase={m.phase} size="sm" />
                  <span className="text-[9px] font-medium leading-tight text-slate-700 line-clamp-2">
                    {m.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Pagination / Load More */}
            {visible.length > displayLimit && (
              <div className="mt-3 text-center">
                <button
                  onClick={() => setDisplayLimit((prev) => prev + 36)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-sky-300 flex items-center justify-center gap-1"
                >
                  <Plus size={12} />
                  Load More ({Math.min(36, visible.length - displayLimit)} of {visible.length - displayLimit} remaining)
                </button>
              </div>
            )}

            {/* Action Arrows Section */}
            {arrows.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1">
                  <Flame size={12} /> Reaction Condition Arrows
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {arrows.map((a) => (
                    <div
                      key={a.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, a)}
                      onClick={() => handleItemClick(a)}
                      className="group flex cursor-grab flex-col items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 p-2 text-center transition hover:border-amber-300 hover:bg-white hover:shadow-xs active:cursor-grabbing hover:scale-102"
                      title={`${a.name} - Drop on arrow zone`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm font-bold text-sm">
                        {a.symbol}
                      </span>
                      <span className="text-[9px] font-medium leading-tight text-amber-800">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {visible.length === 0 && arrows.length === 0 && (
              <div className="py-8 text-center text-slate-400">
                <TestTube size={24} className="mx-auto opacity-40 mb-1" />
                <p className="text-xs font-medium text-slate-600">No matching chemicals found</p>
                <p className="text-[10px] text-slate-400 mt-1">Try searching by symbol (e.g. "Mg", "O2", "HCl") or category.</p>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="mt-2 text-xs font-bold text-sky-600 hover:underline"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 p-2.5 bg-slate-50/50">
            <p className="text-[10px] leading-relaxed text-slate-500">
              Drag or click chemicals into <b className="text-slate-800">Reactants</b>, add conditions, then hit <b className="text-slate-800">Run</b>.
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
    white_light: 'Burns with a dazzling white flame to form a white ash.',
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
