import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Save,
  Pencil,
  Search,
  ChevronDown,
  Trash2,
  FlaskConical,
  Flame,
  Sparkles,
  Droplets,
  RotateCcw,
  BookOpen,
  Eye,
  CheckCircle2,
  Shield,
  Zap,
  Layers,
  Thermometer,
  Wind,
  Info,
  X,
  Plus,
  Atom,
} from 'lucide-react';
import { api } from '../api.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { MATERIAL_CHEMICALS, CATEGORIES, APPARATUS_ITEMS } from '../chemistryData.js';
import { ALL_118_ELEMENTS, ELEMENT_AFFINITIES } from '../data/elementsAnimeData.js';
import {
  ALL_REACTIONS,
  REACTION_CATEGORIES,
  matchReactionLocally,
  getReactionCount,
} from '../data/massiveReactionsData.js';
import ElementCartoon from './ElementCartoon.jsx';

const DURATION_MS = 3800;

export default function ChemistryWorkspace() {
  const { record } = useProgress();

  // Experiment & Bench Title
  const [title, setTitle] = useState('Organic & Inorganic Alchemical Realm');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');

  // Gamification & Alchemist Level System
  const [alchemistXp, setAlchemistXp] = useState(1450);
  const [comboCount, setComboCount] = useState(1);
  const [discoveredReactions, setDiscoveredReactions] = useState(new Set(['rx_diazotization', 'rx_aldol_condensation', 'rx_flame_sodium']));
  const [xpToast, setXpToast] = useState(null);

  // Active Apparatus Setup
  const [selectedApparatus, setSelectedApparatus] = useState('app_beaker_250');
  const [vesselVolumeMax, setVesselVolumeMax] = useState(250);

  // Vessel Contents & Multi-Chemical Mixing State
  const [vesselChemicals, setVesselChemicals] = useState([
    { id: 'c6h5nh2', formula: 'C6H5NH2', name: 'Aniline', amount: 15, tone: 'from-amber-100 to-amber-300', phase: 'l', color: '#fef08a' },
    { id: 'nano2', formula: 'NaNO2', name: 'Sodium Nitrite', amount: 5, tone: 'from-yellow-100 to-yellow-200', phase: 's', color: '#fef9c3' },
    { id: 'hcl', formula: 'HCl', name: 'Hydrochloric Acid', amount: 20, tone: 'from-rose-300 to-rose-500', phase: 'aq', color: '#f8fafc' },
  ]);
  const [vesselTemp, setVesselTemp] = useState(4); // Celsius (ice cold for diazotization)
  const [isStirring, setIsStirring] = useState(false);

  // Bunsen Burner "Fire Fire Equipment" Controls
  const [burnerActive, setBurnerActive] = useState(false);
  const [flameMode, setFlameMode] = useState('blue_roaring'); // 'blue_roaring' (oxidizing 1200°C) | 'yellow_luminous' (safety 300°C)
  const [heatIntensity, setHeatIntensity] = useState(50); // 0 - 100%

  // Simulation & Reaction Results
  const [simulating, setSimulating] = useState(false);
  const [outputReaction, setOutputReaction] = useState(null);
  const [lastMessage, setLastMessage] = useState('');
  const [dropletAnimation, setDropletAnimation] = useState(null);

  // Material Inventory & Palette
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);
  const [showReactionCodex, setShowReactionCodex] = useState(false);
  const [selectedChampion, setSelectedChampion] = useState(ALL_118_ELEMENTS[0]); // Hydrogen
  const [codexSearch, setCodexSearch] = useState('');
  const [codexCategory, setCodexCategory] = useState('All');
  const [affinityFilter, setAffinityFilter] = useState('ALL');

  // Thermal Physics Loop (Bunsen Burner heats the vessel)
  useEffect(() => {
    let timer;
    if (burnerActive) {
      const targetTemp = flameMode === 'blue_roaring' ? 120 + heatIntensity * 9 : 45 + heatIntensity * 2.5;
      timer = setInterval(() => {
        setVesselTemp((prev) => {
          if (prev < targetTemp) return Math.min(targetTemp, prev + 3);
          return prev;
        });
      }, 400);
    } else {
      timer = setInterval(() => {
        setVesselTemp((prev) => (prev > 25 ? Math.max(25, prev - 1.5) : prev));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [burnerActive, flameMode, heatIntensity]);

  // Alchemist Rank Calculation
  const alchemistRank =
    alchemistXp >= 4000
      ? { title: 'Grand Arch-Alchemist of Elements', level: 6, nextXp: 6000, badge: '👑' }
      : alchemistXp >= 2600
      ? { title: 'Master Organic Synthesizer', level: 5, nextXp: 4000, badge: '⚗️' }
      : alchemistXp >= 1600
      ? { title: 'Diazonium & Carbonyl Sorcerer', level: 4, nextXp: 2600, badge: '🔮' }
      : alchemistXp >= 900
      ? { title: 'Catalyst Conjuror', level: 3, nextXp: 1600, badge: '⚡' }
      : alchemistXp >= 400
      ? { title: 'Elemental Summoner', level: 2, nextXp: 900, badge: '✨' }
      : { title: 'Novice Glassware Apprentice', level: 1, nextXp: 400, badge: '🧪' };

  // Calculate Liquid Volume & Blended Color
  const currentVolume = vesselChemicals.reduce((acc, c) => acc + (c.amount || 10), 0);
  const liquidFillPct = Math.min(94, Math.max(12, (currentVolume / vesselVolumeMax) * 85));

  // Determine Liquid Color dynamically
  const liquidColor = outputReaction?.color
    ? outputReaction.color
    : vesselChemicals.length === 0
    ? '#e0f2fe'
    : vesselChemicals.some((c) => c.formula.includes('Cu'))
    ? '#0ea5e9'
    : vesselChemicals.some((c) => c.formula.includes('Fe') || c.formula.includes('I'))
    ? '#f59e0b'
    : vesselChemicals.some((c) => c.formula.includes('C6H5') || c.formula.includes('Aniline'))
    ? '#fde047'
    : '#e0f2fe';

  // Add Chemical into the active Vessel
  const addChemicalToVessel = (chemical, amount = 10) => {
    // Droplet Splash Effect
    setDropletAnimation(chemical.formula);
    setTimeout(() => setDropletAnimation(null), 700);

    setVesselChemicals((prev) => {
      const existing = prev.find((c) => c.formula === chemical.formula);
      if (existing) {
        return prev.map((c) =>
          c.formula === chemical.formula ? { ...c, amount: Math.min(80, c.amount + amount) } : c
        );
      }
      return [
        ...prev,
        {
          id: chemical.id || chemical.formula.toLowerCase(),
          formula: chemical.formula,
          name: chemical.name,
          amount,
          phase: chemical.phase || 'aq',
          tone: chemical.tone || 'from-sky-100 to-sky-300',
        },
      ];
    });
    setOutputReaction(null);
    setLastMessage(`Added ${amount}mL of ${chemical.name} to vessel.`);
  };

  const removeChemicalFromVessel = (formula) => {
    setVesselChemicals((prev) => prev.filter((c) => c.formula !== formula));
    setOutputReaction(null);
  };

  const cleanVessel = () => {
    setVesselChemicals([]);
    setOutputReaction(null);
    setVesselTemp(25);
    setLastMessage('Vessel rinsed clean with pure distilled H₂O.');
  };

  // Run Alchemical Simulation / Reaction Matcher
  const runSimulation = useCallback(async () => {
    if (simulating || vesselChemicals.length === 0) return;
    setSimulating(true);
    setLastMessage('Triggering molecular collisions & thermal excitation...');

    const inFormulas = vesselChemicals.map((c) => c.formula);
    const conditions = [];
    if (burnerActive) conditions.push('heat', flameMode);
    if (vesselTemp < 10) conditions.push('ice_cold', '0_5C');
    if (vesselTemp > 80) conditions.push('high_temp', 'heat');

    // 1. Fast Local Matcher across 2,200+ reactions
    let match = matchReactionLocally(inFormulas, conditions);

    // 2. Fallback to server endpoint if local has no hit
    if (!match) {
      try {
        const res = await api.matchReaction(inFormulas, conditions);
        if (res?.matched && res.reaction) {
          match = res.reaction;
        }
      } catch {
        // Continue with local
      }
    }

    setTimeout(() => {
      setSimulating(false);
      if (match) {
        setOutputReaction(match);
        const earnedXp = (match.xp || 150) * comboCount;
        setAlchemistXp((prev) => prev + earnedXp);
        setComboCount((prev) => Math.min(5, prev + 1));
        setDiscoveredReactions((prev) => new Set([...prev, match.id || match.name]));

        setXpToast(`+${earnedXp} XP! ${match.name}`);
        setTimeout(() => setXpToast(null), 3500);

        setLastMessage(`✨ SUCCESS: ${match.name} verified! (${match.equation})`);
        record({ kind: 'experiment', ref: match.equation, xp: earnedXp, achievements: ['chemical-mastery'] });
      } else {
        setComboCount(1);
        setLastMessage('No reaction occurred. Check temperature, reagent compatibility, or Bunsen flame conditions.');
      }
    }, 1200);
  }, [simulating, vesselChemicals, burnerActive, flameMode, vesselTemp, comboCount, record]);

  // Load a Reaction directly from the 2,000+ Reaction Codex onto the workbench
  const autoSetupReaction = (rx) => {
    const newChemicals = rx.inputs.map((formula) => {
      const mat = MATERIAL_CHEMICALS.find((m) => m.formula.toLowerCase() === formula.toLowerCase());
      return {
        id: formula.toLowerCase(),
        formula,
        name: mat?.name || formula,
        amount: 15,
        phase: mat?.phase || 'aq',
        tone: mat?.tone || 'from-sky-200 to-sky-400',
      };
    });
    setVesselChemicals(newChemicals);

    if (rx.conditions?.includes('heat') || rx.conditions?.includes('high_temp') || rx.conditions?.includes('reflux')) {
      setBurnerActive(true);
      setFlameMode('blue_roaring');
      setVesselTemp(95);
    } else if (rx.conditions?.includes('ice_cold') || rx.conditions?.includes('0_5C')) {
      setBurnerActive(false);
      setVesselTemp(3);
    } else {
      setVesselTemp(25);
    }

    setShowReactionCodex(false);
    setOutputReaction(rx);
    setLastMessage(`🧪 Auto-Loaded Reaction: ${rx.name}`);
  };

  // Filtered Materials Palette
  const filteredMaterials = MATERIAL_CHEMICALS.filter((m) => {
    if (m.arrow) return false;
    const matchesCat =
      selectedCategory === 'All' ||
      m.category === selectedCategory ||
      (selectedCategory === '118 Elements (Anime)' && m.category === '118 Elements (Anime)');
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.formula.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered Codex Reactions
  const filteredReactions = ALL_REACTIONS.filter((rx) => {
    const matchesCat = codexCategory === 'All' || rx.category === codexCategory;
    const matchesSearch =
      rx.name.toLowerCase().includes(codexSearch.toLowerCase()) ||
      rx.equation.toLowerCase().includes(codexSearch.toLowerCase()) ||
      rx.inputs.some((i) => i.toLowerCase().includes(codexSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Filtered Elements for Periodic Table
  const filteredElements = ALL_118_ELEMENTS.filter((el) => {
    return affinityFilter === 'ALL' || el.affinity === affinityFilter;
  });

  return (
    <div className="flex h-[calc(100vh-7.5rem)] min-h-[640px] flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-xl shadow-sky-900/5 select-none" data-testid="chemistry-workspace">
      {/* 1. Top Clay Toolbar: Level, XP Bar, Gamification Combos & Quick Tools */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-sky-100 bg-gradient-to-r from-sky-50/70 via-white to-amber-50/50 px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* Alchemist Rank Pill */}
          <div className="flex items-center gap-2 rounded-2xl border border-sky-200/80 bg-white px-3 py-1.5 shadow-sm">
            <span className="text-lg">{alchemistRank.badge}</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-wider text-sky-800 uppercase">
                {alchemistRank.title}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-sky-100">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-yellow-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, (alchemistXp / alchemistRank.nextXp) * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] font-extrabold text-slate-600">
                  {alchemistXp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Combo Multiplier */}
          {comboCount > 1 && (
            <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 px-3 py-1 text-xs font-black text-slate-900 shadow-sm animate-bounce">
              <Zap size={13} className="fill-slate-900" />
              <span>{comboCount}x COMBO STREAK!</span>
            </div>
          )}
        </div>

        {/* Action Controls: 118 Anime Periodic Table & 2,000+ Reaction Codex */}
        <div className="flex items-center gap-2">
          {/* XP Floating Toast */}
          {xpToast && (
            <div className="animate-fade-in flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-slate-900 shadow-md">
              <Sparkles size={14} />
              {xpToast}
            </div>
          )}

          <button
            onClick={() => setShowPeriodicTable(true)}
            className="flex items-center gap-1.5 rounded-xl border border-sky-200 bg-white px-3 py-2 text-xs font-extrabold text-sky-700 shadow-xs transition hover:bg-sky-50 active:scale-95"
            title="Open 118 Anime Element Champions Codex"
          >
            <Atom size={15} className="text-sky-600" />
            <span className="hidden sm:inline">118 Anime Champions</span>
          </button>

          <button
            onClick={() => setShowReactionCodex(true)}
            className="flex items-center gap-1.5 rounded-xl border border-yellow-300 bg-yellow-100/70 px-3 py-2 text-xs font-black text-slate-800 shadow-xs transition hover:bg-yellow-200 active:scale-95"
            title="Search 2,000+ Chemical Reactions"
          >
            <BookOpen size={15} className="text-yellow-700" />
            <span>2,000+ Reactions ({getReactionCount()})</span>
          </button>

          <button
            onClick={runSimulation}
            disabled={simulating || vesselChemicals.length === 0}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 px-4 py-2 text-xs font-black text-slate-900 shadow-md shadow-yellow-500/25 transition hover:brightness-105 active:scale-95 disabled:opacity-40"
          >
            <Play size={14} className="fill-slate-900" />
            {simulating ? 'Reacting…' : 'Ignite Reaction'}
          </button>
        </div>
      </div>

      {/* 2. Main Studio Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Reagent & Element Cabinet */}
        <div className="flex w-72 shrink-0 flex-col border-r border-sky-100 bg-sky-50/30 p-3">
          {/* Search Box */}
          <div className="relative mb-2.5">
            <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search chemicals & elements…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-sky-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mb-2.5 flex flex-wrap gap-1">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-sky-100 hover:bg-sky-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Materials List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1.5">
            {filteredMaterials.map((chem) => (
              <div
                key={chem.id}
                onClick={() => addChemicalToVessel(chem, 10)}
                className="group flex items-center justify-between rounded-xl border border-sky-100 bg-white p-2 shadow-xs transition hover:border-sky-300 hover:bg-sky-50/50 hover:shadow-sm cursor-pointer active:scale-98"
                title={`Click to pour ${chem.name} into vessel`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white p-0.5 shadow-xs">
                    <ElementCartoon formula={chem.formula} size="sm" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs font-black text-slate-800 truncate">
                      {chem.formula}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                      {chem.name}
                    </span>
                  </div>
                </div>
                <button
                  className="rounded-lg bg-sky-100 p-1 text-sky-700 opacity-0 group-hover:opacity-100 transition hover:bg-sky-200"
                  title="Add to vessel"
                >
                  <Plus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Interactive Apparatus Workbench */}
        <div
          className="relative flex flex-1 flex-col overflow-hidden bg-white p-4"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(14, 165, 233, 0.08) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          {/* Workbench Top Controls */}
          <div className="flex items-center justify-between gap-3 border-b border-sky-100 pb-3">
            {/* Apparatus Selector Tabs */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-sky-100 bg-sky-50/60 p-1">
              {APPARATUS_ITEMS.filter((a) => a.capacity).map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setSelectedApparatus(app.id);
                    setVesselVolumeMax(app.capacity);
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-black transition ${
                    selectedApparatus === app.id
                      ? 'bg-white text-sky-800 shadow-sm border border-sky-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span>{app.icon}</span>
                  <span>{app.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Vessel Controls: Clean & Stir */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsStirring(true);
                  setTimeout(() => setIsStirring(false), 2000);
                  setLastMessage('Solution stirred with glass rod.');
                }}
                className={`flex items-center gap-1.5 rounded-xl border border-sky-200 bg-white px-2.5 py-1.5 text-xs font-bold text-sky-700 shadow-xs transition hover:bg-sky-50 active:scale-95 ${
                  isStirring ? 'animate-spin' : ''
                }`}
                title="Stir with Glass Rod"
              >
                <RotateCcw size={13} />
                <span>Stir</span>
              </button>
              <button
                onClick={cleanVessel}
                className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-600 shadow-xs transition hover:bg-slate-50 hover:text-red-600"
                title="Clean Vessel with H2O"
              >
                <Trash2 size={13} />
                <span>Empty</span>
              </button>
            </div>
          </div>

          {/* Central Lab Rig: Vessel & Bunsen Burner */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative flex flex-col items-center">
              {/* Droplet Drop Animation */}
              {dropletAnimation && (
                <div className="absolute -top-10 z-30 flex flex-col items-center animate-droplet-drop">
                  <div className="h-4 w-4 rounded-full bg-sky-400 shadow-md shadow-sky-400/50" />
                  <span className="mt-1 font-mono text-[10px] font-black text-sky-700">
                    +{dropletAnimation}
                  </span>
                </div>
              )}

              {/* Digital Thermometer Mounted on Vessel */}
              <div className="absolute -right-24 top-6 flex items-center gap-1.5 rounded-2xl border border-sky-200 bg-white/90 px-3 py-1.5 shadow-md backdrop-blur-xs">
                <Thermometer size={16} className={vesselTemp > 70 ? 'text-amber-500 animate-pulse' : 'text-sky-500'} />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-black text-slate-800">
                    {Math.round(vesselTemp)}°C
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    {vesselTemp > 80 ? 'Boiling' : vesselTemp < 10 ? 'Ice Bath' : 'Ambient'}
                  </span>
                </div>
              </div>

              {/* Steam Wisps when Heated */}
              {vesselTemp > 70 && (
                <div className="absolute -top-12 z-10 flex gap-2 pointer-events-none">
                  <div className="h-10 w-2 rounded-full bg-slate-200/60 blur-xs animate-smoke-wisp" />
                  <div className="h-12 w-2.5 rounded-full bg-slate-300/50 blur-xs animate-smoke-wisp" style={{ animationDelay: '0.4s' }} />
                  <div className="h-8 w-2 rounded-full bg-slate-200/60 blur-xs animate-smoke-wisp" style={{ animationDelay: '0.8s' }} />
                </div>
              )}

              {/* THE CHEMICAL VESSEL (Beaker / Test Tube) */}
              <div
                className={`relative overflow-hidden border-2 border-sky-200/90 bg-white/40 backdrop-blur-xs shadow-lg transition-all duration-300 ${
                  selectedApparatus === 'app_test_tube'
                    ? 'h-64 w-20 rounded-b-full'
                    : selectedApparatus === 'app_beaker_500'
                    ? 'h-64 w-52 rounded-b-3xl'
                    : 'h-56 w-44 rounded-b-2xl'
                }`}
                style={{
                  boxShadow: 'inset 0 0 15px rgba(14, 165, 233, 0.1), 0 12px 28px -4px rgba(14, 165, 233, 0.15)',
                }}
              >
                {/* Measurement Markings */}
                <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-[8px] font-mono font-bold text-sky-400/80 pointer-events-none z-20">
                  <span>{vesselVolumeMax} mL</span>
                  <span>{Math.round(vesselVolumeMax * 0.75)} mL</span>
                  <span>{Math.round(vesselVolumeMax * 0.5)} mL</span>
                  <span>{Math.round(vesselVolumeMax * 0.25)} mL</span>
                </div>

                {/* Liquid Contents Column */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out z-10"
                  style={{
                    height: `${liquidFillPct}%`,
                    backgroundColor: liquidColor,
                    opacity: 0.85,
                  }}
                >
                  {/* Liquid Meniscus Curve on Top */}
                  <div className="absolute -top-2 left-0 right-0 h-4 rounded-[100%] bg-white/30 border-b border-sky-300/40" />

                  {/* Boiling Bubbles */}
                  {(vesselTemp > 75 || simulating || outputReaction?.observation?.includes('bubbling')) && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="obs-bubble absolute bottom-2 left-4 h-2.5 w-2.5 rounded-full bg-white/70" />
                      <div className="obs-bubble absolute bottom-4 left-10 h-3 w-3 rounded-full bg-white/80" style={{ animationDelay: '0.3s' }} />
                      <div className="obs-bubble absolute bottom-1 right-6 h-2 w-2 rounded-full bg-white/70" style={{ animationDelay: '0.6s' }} />
                    </div>
                  )}

                  {/* Precipitate Solids Settled at Bottom */}
                  {outputReaction?.observation?.includes('precipitate') && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-6 border-t border-white/40 shadow-inner"
                      style={{
                        backgroundColor: outputReaction.color || '#eab308',
                        opacity: 0.95,
                      }}
                    >
                      <div className="flex h-full items-center justify-center text-[8px] font-black text-slate-900 uppercase tracking-wider">
                        Precipitate Formed
                      </div>
                    </div>
                  )}

                  {/* Stirring Vortex Animation */}
                  {isStirring && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-4 bg-white/40 blur-xs animate-spin" />
                    </div>
                  )}
                </div>

                {/* Empty Glass State */}
                {vesselChemicals.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 text-slate-400">
                    <FlaskConical size={28} className="text-sky-300 mb-1 opacity-60" />
                    <span className="text-[11px] font-bold">Vessel Empty</span>
                    <span className="text-[9px]">Click chemicals on the left to add</span>
                  </div>
                )}
              </div>

              {/* Wire Gauze & Tripod Stand */}
              <div className="relative mt-1 flex flex-col items-center w-56">
                <div className="h-1.5 w-48 rounded-full bg-slate-400 shadow-xs" />
                <div className="flex justify-between w-40 h-8">
                  <div className="w-2 h-full bg-slate-300 rounded-b-sm transform -rotate-12" />
                  <div className="w-2 h-full bg-slate-300 rounded-b-sm transform rotate-12" />
                </div>
              </div>

              {/* BUNSEN BURNER ("Fire Fire Equipment") */}
              <div className="relative flex flex-col items-center -mt-6">
                {/* Active Flame */}
                {burnerActive && (
                  <div className="relative z-10 flex flex-col items-center -mb-2 pointer-events-none">
                    {flameMode === 'blue_roaring' ? (
                      /* Roaring Hot Sky Blue Flame (Double Cone, ~1200°C) */
                      <div className="animate-flame-blue flex flex-col items-center">
                        <div className="relative h-20 w-10">
                          {/* Outer Blue Flame */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sky-600 via-sky-400 to-sky-200 blur-[2px] opacity-90" />
                          {/* Inner Unburnt Cone */}
                          <div className="absolute bottom-1 left-2.5 right-2.5 h-10 rounded-full bg-gradient-to-t from-sky-200 to-white blur-[1px]" />
                        </div>
                      </div>
                    ) : (
                      /* Luminous Yellow Flame (~300°C) */
                      <div className="animate-flame-yellow flex flex-col items-center">
                        <div className="relative h-20 w-12">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-500 via-yellow-400 to-yellow-200 blur-[2px] opacity-95" />
                          <div className="absolute bottom-1 left-3 right-3 h-8 rounded-full bg-gradient-to-t from-yellow-100 to-white blur-[1px]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Burner Chimney & Base */}
                <div className="h-12 w-6 rounded-t-sm bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border border-slate-400" />
                <div className="h-3 w-16 rounded-full bg-slate-600 shadow-md border border-slate-700" />
              </div>
            </div>
          </div>

          {/* Workbench Bottom: Loaded Chemicals Badges & Bunsen Flame Adjuster */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 pt-3 bg-sky-50/20 rounded-2xl p-2.5">
            {/* Loaded Chemicals in Vessel */}
            <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-[280px]">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 mr-1">
                Contents:
              </span>
              {vesselChemicals.map((c) => (
                <span
                  key={c.formula}
                  className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-2.5 py-1 text-xs font-mono font-black text-slate-800 shadow-xs"
                >
                  <ElementCartoon formula={c.formula} size="sm" />
                  <span>{c.formula}</span>
                  <span className="text-[9px] font-normal text-slate-400">({c.amount}mL)</span>
                  <button
                    onClick={() => removeChemicalFromVessel(c.formula)}
                    className="hover:text-red-500 ml-0.5"
                    title="Remove"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Bunsen Burner Controls */}
            <div className="flex items-center gap-2.5 rounded-2xl border border-sky-100 bg-white px-3 py-1.5 shadow-sm">
              <button
                onClick={() => setBurnerActive((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-black transition ${
                  burnerActive
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 shadow-xs'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <Flame size={14} className={burnerActive ? 'fill-slate-900 animate-pulse' : ''} />
                <span>{burnerActive ? 'Burner Lit' : 'Ignite Flame'}</span>
              </button>

              {burnerActive && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setFlameMode('blue_roaring')}
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-extrabold transition ${
                      flameMode === 'blue_roaring'
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    Roaring Blue (1200°C)
                  </button>
                  <button
                    onClick={() => setFlameMode('yellow_luminous')}
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-extrabold transition ${
                      flameMode === 'yellow_luminous'
                        ? 'bg-yellow-400 text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    Luminous (300°C)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Reaction Verification & Result Stage (Bottom Drawer / Observation) */}
      {outputReaction && (
        <div className="border-t border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50/50 p-4 transition-all">
          <div className="mx-auto max-w-5xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-yellow-400 text-slate-900 font-black text-sm">
                  ⚡
                </span>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {outputReaction.name}
                  </h4>
                  <span className="text-[11px] font-bold text-sky-700">
                    {outputReaction.type}
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-white border border-sky-200 px-3 py-1 text-xs font-mono font-black text-slate-800 shadow-xs">
                +{outputReaction.xp || 150} XP
              </span>
            </div>

            {/* Balanced Equation */}
            <div className="rounded-xl border border-sky-200 bg-white p-2.5 font-mono text-xs font-black text-slate-800 shadow-xs">
              {outputReaction.equation}
            </div>

            {/* Observation & Mechanism Description */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Eye size={14} className="text-sky-600" />
                <span>
                  <strong>Observation:</strong> {outputReaction.description}
                </span>
              </div>
              {outputReaction.jeeRelevance && (
                <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
                  <Shield size={13} />
                  <span>{outputReaction.jeeRelevance}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: 118 Anime Periodic Table Champions */}
      {showPeriodicTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="flex h-[90vh] w-full max-w-6xl flex-col rounded-3xl border border-sky-100 bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Atom size={22} />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    118 Periodic Table Anime Champions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inspect all 118 cartoon element champions and summon them to your vessel!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPeriodicTable(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Affinity Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-sky-100 bg-sky-50/30 px-6 py-2.5">
              <button
                onClick={() => setAffinityFilter('ALL')}
                className={`rounded-xl px-3 py-1 text-xs font-bold transition ${
                  affinityFilter === 'ALL'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-sky-100'
                }`}
              >
                All 118 Champions
              </button>
              {Object.entries(ELEMENT_AFFINITIES).map(([key, aff]) => (
                <button
                  key={key}
                  onClick={() => setAffinityFilter(key)}
                  className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition ${
                    affinityFilter === key
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-sky-100 hover:bg-sky-50'
                  }`}
                >
                  <span>{aff.icon}</span>
                  <span>{aff.name}</span>
                </button>
              ))}
            </div>

            {/* Modal Body: Elements Grid + Champion Profile Drawer */}
            <div className="flex flex-1 overflow-hidden">
              {/* 118 Elements Cards Grid */}
              <div className="flex-1 overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
                {filteredElements.map((el) => (
                  <div
                    key={el.number}
                    onClick={() => setSelectedChampion(el)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-2 text-center cursor-pointer transition active:scale-95 ${
                      selectedChampion.number === el.number
                        ? 'border-sky-400 bg-sky-50/80 shadow-sm'
                        : 'border-sky-100 bg-white hover:border-sky-200 hover:bg-sky-50/30'
                    }`}
                  >
                    <span className="self-start text-[9px] font-mono font-extrabold text-slate-400">
                      {el.number}
                    </span>
                    <div className="my-1">
                      <ElementCartoon formula={el.symbol} size="md" />
                    </div>
                    <span className="font-mono text-xs font-black text-slate-800">
                      {el.symbol}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate max-w-full">
                      {el.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Champion Details Side Drawer */}
              {selectedChampion && (
                <div className="w-80 border-l border-sky-100 bg-sky-50/20 p-5 flex flex-col justify-between overflow-y-auto">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-sky-200 bg-white p-2 shadow-md">
                      <ElementCartoon formula={selectedChampion.symbol} size="lg" />
                    </div>
                    <h4 className="mt-3 font-mono text-xl font-black text-slate-900">
                      {selectedChampion.name} ({selectedChampion.symbol})
                    </h4>
                    <span className="text-xs font-black text-sky-700">
                      {selectedChampion.animeTitle}
                    </span>

                    {/* Stats Pill Matrix */}
                    <div className="mt-4 grid grid-cols-2 gap-2 w-full text-left">
                      <div className="rounded-xl border border-sky-100 bg-white p-2 shadow-xs">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Atomic #</span>
                        <p className="font-mono text-xs font-black text-slate-800">{selectedChampion.number}</p>
                      </div>
                      <div className="rounded-xl border border-sky-100 bg-white p-2 shadow-xs">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Mass</span>
                        <p className="font-mono text-xs font-black text-slate-800">{selectedChampion.atomicMass} u</p>
                      </div>
                      <div className="rounded-xl border border-sky-100 bg-white p-2 shadow-xs">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Power</span>
                        <p className="font-mono text-xs font-black text-amber-600">{selectedChampion.power} / 100</p>
                      </div>
                      <div className="rounded-xl border border-sky-100 bg-white p-2 shadow-xs">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Reactivity</span>
                        <p className="font-mono text-xs font-black text-sky-700">{selectedChampion.reactivity}</p>
                      </div>
                    </div>

                    {/* Lore description */}
                    <p className="mt-4 text-xs text-slate-600 leading-relaxed text-left bg-white border border-sky-100 rounded-2xl p-3 shadow-xs">
                      {selectedChampion.lore}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addChemicalToVessel(selectedChampion, 15);
                      setShowPeriodicTable(false);
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 py-3 text-xs font-black text-slate-900 shadow-md hover:brightness-105 active:scale-98"
                  >
                    <Sparkles size={15} />
                    <span>Summon into Active Vessel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: Master 2,000+ Chemical Reaction Codex */}
      {showReactionCodex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="flex h-[90vh] w-full max-w-5xl flex-col rounded-3xl border border-sky-100 bg-white shadow-2xl overflow-hidden">
            {/* Codex Header */}
            <div className="flex items-center justify-between border-b border-sky-100 bg-gradient-to-r from-yellow-50 via-white to-sky-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-800">
                  <BookOpen size={22} />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Master Chemical Reaction Codex (2,209 Reactions)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comprehensive catalog of organic & inorganic named reactions, mechanisms, and 1-click bench setups.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReactionCodex(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search & Category Tabs */}
            <div className="flex flex-col gap-2.5 border-b border-sky-100 bg-sky-50/20 px-6 py-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by reaction name, reactant, product, or keyword (e.g. Diazonium, Aldol, Sandmeyer, Iodoform)..."
                  value={codexSearch}
                  onChange={(e) => setCodexSearch(e.target.value)}
                  className="w-full rounded-2xl border border-sky-200 bg-white pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 shadow-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {REACTION_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCodexCategory(cat)}
                    className={`rounded-xl px-2.5 py-1 text-xs font-bold transition ${
                      codexCategory === cat
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-sky-100 hover:bg-sky-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Reactions Grid */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {filteredReactions.slice(0, 100).map((rx) => (
                <div
                  key={rx.id}
                  className="rounded-2xl border border-sky-100 bg-white p-4 shadow-xs transition hover:border-sky-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-sky-50 px-2 py-0.5 text-[10px] font-black text-sky-700 border border-sky-100">
                        {rx.category}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900">{rx.name}</h4>
                    </div>
                    <button
                      onClick={() => autoSetupReaction(rx)}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 px-3 py-1 text-xs font-black text-slate-900 shadow-xs hover:brightness-105 active:scale-95"
                    >
                      <Sparkles size={13} />
                      <span>Auto-Setup on Bench</span>
                    </button>
                  </div>

                  {/* Balanced Equation */}
                  <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-2 font-mono text-xs font-black text-slate-800 mb-2">
                    {rx.equation}
                  </div>

                  {/* Description & Mechanism */}
                  <p className="text-xs text-slate-600 mb-1">{rx.description}</p>
                  {rx.mechanism && (
                    <p className="text-[11px] text-slate-500 italic">
                      <strong>Mechanism:</strong> {rx.mechanism}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
