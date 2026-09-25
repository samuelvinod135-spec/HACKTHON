import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  FlaskConical,
  Atom,
  Target,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  TestTubes,
  GraduationCap,
  Award,
  Search,
  Check,
  Flame,
  Clock,
  Star,
  Play,
  Share2,
  Brain,
  Rocket,
  Grid,
  CheckCircle2,
  RefreshCw,
  Trophy,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { usePerformance } from '../context/PerformanceContext.jsx';
import CommandCenter from '../components/Dashboard/CommandCenter.jsx';
import MasteryDeltaView from '../components/MasteryDelta/MasteryDeltaView.jsx';
import SmartVernacularCard from '../components/Vernacular/SmartVernacularCard.jsx';
import UtilityFocusTab from '../components/Dashboard/UtilityFocusTab.jsx';
import StealthScaffoldingOverlay from '../components/StealthScaffolding/StealthScaffoldingOverlay.jsx';
import AutonomousIntelligenceCard from '../components/Dashboard/AutonomousIntelligenceCard.jsx';
import { extractUsername } from '../utils/userUtils.js';

// Realistic Bunsen Burner, Tripod & Crucible SVG Schematic
function BunsenApparatusIllustration({ isIgnited = false, ribbonPlaced = false, isReacting = false }) {
  return (
    <div className="relative w-full h-40 flex items-center justify-center select-none overflow-hidden">
      <svg viewBox="0 0 240 180" className="w-full h-full max-h-40 object-contain drop-shadow-sm">
        {/* Benchtop Surface */}
        <line x1="20" y1="168" x2="220" y2="168" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

        {/* Tripod Stand */}
        {/* Tripod Ring */}
        <ellipse cx="120" cy="78" rx="42" ry="10" fill="none" stroke="#64748B" strokeWidth="4" />
        {/* Pipeclay Triangle */}
        <polygon points="120,68 85,83 155,83" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
        {/* Tripod Legs */}
        <line x1="82" y1="80" x2="52" y2="168" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="120" y1="88" x2="120" y2="168" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="158" y1="80" x2="188" y2="168" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />

        {/* Bunsen Burner */}
        {/* Burner Heavy Base */}
        <rect x="94" y="156" width="52" height="12" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
        {/* Gas Tube Inlet */}
        <path d="M142 162 C 160 162, 175 165, 195 166" fill="none" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        {/* Burner Chimney / Barrel */}
        <rect x="114" y="112" width="12" height="46" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
        {/* Air Hole Collar */}
        <rect x="113" y="146" width="14" height="7" rx="1.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
        <circle cx="120" cy="149.5" r="2" fill="#1E293B" />

        {/* Burner Flame (Animated if active) */}
        {isIgnited && (
          <g className="animate-pulse">
            {/* Outer Flame Cone */}
            <path
              d="M120 112 C 111 106, 110 88, 120 74 C 130 88, 129 106, 120 112 Z"
              fill={isReacting ? "#FFFFFF" : "#38BDF8"}
              opacity={isReacting ? "0.95" : "0.75"}
            />
            {/* Inner Flame Cone */}
            <path
              d="M120 112 C 114 108, 114 96, 120 86 C 126 96, 126 108, 120 112 Z"
              fill={isReacting ? "#FEF08A" : "#FACC15"}
              opacity="0.9"
            />
          </g>
        )}

        {/* Porcelain Crucible with Lid */}
        {/* Crucible Bowl */}
        <path
          d="M102 68 C 102 82, 138 82, 138 68 Z"
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="2"
        />
        {/* Crucible Rim */}
        <ellipse cx="120" cy="68" rx="18" ry="4" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />

        {/* Magnesium Ribbon inside/above crucible */}
        {ribbonPlaced && !isReacting && (
          <path
            d="M112 66 Q 116 61, 120 66 T 128 66"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}

        {/* Brilliant Dazzling Oxidation Light Burst when Reacting */}
        {isReacting && (
          <g className="animate-spin" style={{ transformOrigin: '120px 66px', animationDuration: '4s' }}>
            <circle cx="120" cy="66" r="16" fill="url(#dazzleGlow)" opacity="0.9" />
            <line x1="120" y1="42" x2="120" y2="90" stroke="#FEF08A" strokeWidth="2" />
            <line x1="96" y1="66" x2="144" y2="66" stroke="#FEF08A" strokeWidth="2" />
            <line x1="103" y1="49" x2="137" y2="83" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="103" y1="83" x2="137" y2="49" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        )}

        <defs>
          <radialGradient id="dazzleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Home() {
  const { user, profile } = useAuth();
  const { student } = useProgress();
  const { t } = useLanguage();
  const { isLiteMode } = usePerformance();
  const navigate = useNavigate();

  // Primary View Switcher: 'dashboard' (1:1 Exact Soft-UI) | 'engine' (Adaptive Scientific Intelligence) | 'utility' (Focus Tools)
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dynamic user identity with default 'samuel'
  const userEmail = user?.email || profile?.email;
  const greetingName = userEmail
    ? extractUsername(userEmail, 'samuel')
    : (profile?.full_name?.split(' ')[0] || (student?.name && student.name !== 'Student Scholar' ? student.name.split(' ')[0] : 'samuel'));

  const name = greetingName || 'samuel';
  const xp = profile?.xp ?? (student?.xp ? student.xp : 4645);
  const xpCap = profile?.xp_for_level ?? (student ? student.xp_for_level : 1000);
  const level = profile?.level ?? (student ? student.level : 1);
  const xpPct = Math.min(100, Math.round((xp / xpCap) * 100));

  // Interactive Bottom Grid State: Step-by-Step Workspace
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    {
      num: 1,
      title: 'Step 1: Setup the Apparatus',
      desc: 'Position the tripod stand securely over the Bunsen burner. Place the pipeclay triangle across the ring and seat the porcelain crucible firmly.',
    },
    {
      num: 2,
      title: 'Step 2: Clean the Magnesium Ribbon',
      desc: 'Rub the ribbon surface with fine emery paper to remove dark magnesium oxide coating and reveal the reactive silvery-white metal.',
    },
    {
      num: 3,
      title: 'Step 3: Ignite the Bunsen Burner',
      desc: 'Rotate the air collar to open the air hole, creating a hot, non-luminous blue oxidizing flame with complete methane combustion.',
    },
    {
      num: 4,
      title: 'Step 4: Heat the Crucible & Ribbon',
      desc: 'Hold the coiled magnesium ribbon with tongs into the flame. Watch for rapid ignition producing an intense dazzling white flare.',
    },
    {
      num: 5,
      title: 'Step 5: Collect & Test Ash',
      desc: 'Collect the white magnesium oxide residue. Dissolve slightly in distilled water; test basicity with red litmus paper turning blue.',
    },
  ];

  // Interactive Bottom Grid State: Virtual Lab Interactive Canvas
  const [labState, setLabState] = useState({
    burnerIgnited: true,
    ribbonPlaced: true,
    isReacting: false,
    observationRecorded: false,
    toastMessage: '',
  });

  const triggerReaction = () => {
    setLabState((prev) => ({
      ...prev,
      isReacting: true,
      toastMessage: 'Ignition initiated: 2Mg(s) + O₂(g) → 2MgO(s) + Heat + Light!',
    }));
    setTimeout(() => {
      setLabState((prev) => ({
        ...prev,
        isReacting: false,
        toastMessage: 'Reaction complete: White powdery magnesium oxide residue formed.',
      }));
    }, 3500);
  };

  const handleRecordObservation = () => {
    setLabState((prev) => ({
      ...prev,
      observationRecorded: true,
      toastMessage: '✅ Observation recorded in Student Journal: +50 Credits earned!',
    }));
    setTimeout(() => {
      setLabState((prev) => ({ ...prev, toastMessage: '' }));
    }, 4000);
  };

  // Explore Experiments Filter State
  const [exploreFilter, setExploreFilter] = useState('All');
  const [exploreSearch, setExploreSearch] = useState('');

  const exploreList = [
    { id: 1, title: 'Acid-Base Titration', category: 'Chemistry', duration: '15 min', to: '/chemistry' },
    { id: 2, title: "Snell's Law & Optics", category: 'Physics', duration: '20 min', to: '/physics' },
    { id: 3, title: 'Flame Emission Colors', category: 'Chemistry', duration: '10 min', to: '/chemistry' },
    { id: 4, title: "Hooke's Spring Law", category: 'Physics', duration: '12 min', to: '/physics' },
    { id: 5, title: 'Electrolysis of Water', category: 'Chemistry', duration: '25 min', to: '/chemistry' },
  ];

  const filteredExplores = exploreList.filter((exp) => {
    const matchesCat = exploreFilter === 'All' || exp.category.toLowerCase() === exploreFilter.toLowerCase();
    const matchesSearch = exp.title.toLowerCase().includes(exploreSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16 font-sans">
      {/* View Mode Switcher Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Hero Text: "Welcome back, samuel 👋" with subtext */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            Welcome back, {name} <span className="text-3xl">👋</span>
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-[#A0A0A0]">
            Ready to explore, experiment and learn today?
          </p>
        </div>

        {/* View Switcher Pills */}
        {!isLiteMode && (
          <div className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-[#3D3D3D] bg-white dark:bg-[#2D2D2D] p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-yellow-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50'
              }`}
            >
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('engine')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'engine'
                  ? 'bg-sky-500 text-white font-black shadow-xs'
                  : 'text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50'
              }`}
            >
              <Cpu size={13} />
              <span>Adaptive Engine</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('utility')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'utility'
                  ? 'bg-sky-500 text-white font-black shadow-xs'
                  : 'text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50'
              }`}
            >
              <Layers size={13} />
              <span>Utility & Focus</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: EXACT 1:1 SOFT-UI (NEUMORPHIC) DASHBOARD                         */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* ===================================================================== */}
          {/* SECTION A: TOP CARD GRID (4 Columns, Pastel & Pure White Backgrounds) */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 (Light Blue bg): Chemistry Canvas */}
            <div className="rounded-3xl p-6 bg-[#EBF5FF] dark:bg-[#1E293B]/70 border border-sky-100 dark:border-sky-900/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-sky-600 shadow-xs mb-3">
                  <FlaskConical size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  Chemistry Canvas
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  118 elements, 5,000+ reactions & stoichiometry
                </p>
              </div>
              <div className="mt-5">
                <Link
                  to="/chemistry?tab=drag-and-drop"
                  className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-4 py-2 text-xs shadow-xs transition-transform active:scale-95"
                >
                  <span>Open Canvas &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Card 2 (Light Green bg): New Physics Workspace */}
            <div className="rounded-3xl p-6 bg-[#F0FDF4] dark:bg-[#064E3B]/20 border border-emerald-100 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-emerald-600 shadow-xs mb-3">
                  <Atom size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  New Physics Workspace
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Harmonics & kinematics
                </p>
              </div>
              <div className="mt-5">
                <Link
                  to="/physics"
                  className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-4 py-2 text-xs shadow-xs transition-transform active:scale-95"
                >
                  <span>Start Experiment &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Card 3 (White bg): My Progress (4,645 / 1,000 XP) */}
            <div className="rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">
                    My Progress
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-[#A0A0A0]">
                    ({xp.toLocaleString()} / {xpCap.toLocaleString()} XP)
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Level {level}</span>
                    <span className="text-sky-600 font-semibold">{xpPct}%</span>
                  </div>
                  {/* Blue Progress Bar */}
                  <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-[#2D2D2D] p-0.5">
                    <div
                      className="h-full rounded-full bg-sky-500 transition-all duration-500"
                      style={{ width: `${xpPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Achievements Section with 3 Colorful Icons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#333333]">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-[#A0A0A0] block mb-2">
                  Achievements
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-2xs"
                    title="Oxidation Master"
                  >
                    <Flame size={15} />
                  </div>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-2xs"
                    title="Quantum Pioneer"
                  >
                    <Atom size={15} />
                  </div>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-2xs"
                    title="Top Scholar Streak"
                  >
                    <Trophy size={15} />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 (White bg): Learn by Doing */}
            <div className="rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-xs mb-3">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  Learn by Doing
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Interactive guided simulations, test theoretical hypotheses, and master STEM concepts.
                </p>
              </div>
              <div className="mt-5">
                <Link
                  to="/saved"
                  className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-4 py-2 text-xs shadow-xs transition-transform active:scale-95"
                >
                  <span>Explore Experiments &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SECTION B: MIDDLE GRID (3 Columns: 2 wide or balanced, 1 narrow right) */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left/Center (Recent Experiments): White Card with Recent Tasks */}
            <div className="lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#333333]">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Clock size={16} className="text-sky-500" />
                    <span>Recent Experiments</span>
                  </h3>
                  <Link to="/saved" className="text-xs font-bold text-sky-600 hover:underline">
                    View all
                  </Link>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-[#333333] mt-2">
                  {/* Task 1 */}
                  <Link
                    to="/chemistry?tab=drag-and-drop"
                    className="flex items-center justify-between py-3 group hover:bg-slate-50 dark:hover:bg-[#2D2D2D] px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform">
                        <Flame size={17} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-sky-600 transition-colors">
                          Magnesium Ribbon Burning
                        </p>
                        <span className="inline-block mt-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-2 py-0.2 border border-sky-100 dark:border-sky-900">
                          Chemistry
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-[#A0A0A0]">
                      2 days ago
                    </span>
                  </Link>

                  {/* Task 2 */}
                  <Link
                    to="/physics"
                    className="flex items-center justify-between py-3 group hover:bg-slate-50 dark:hover:bg-[#2D2D2D] px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-105 transition-transform">
                        <Atom size={17} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-sky-600 transition-colors">
                          Pendulum Motion
                        </p>
                        <span className="inline-block mt-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.2 border border-indigo-100 dark:border-indigo-900">
                          Physics
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-[#A0A0A0]">
                      3 days ago
                    </span>
                  </Link>

                  {/* Task 3 */}
                  <Link
                    to="/chemistry"
                    className="flex items-center justify-between py-3 group hover:bg-slate-50 dark:hover:bg-[#2D2D2D] px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                        <FlaskConical size={17} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-sky-600 transition-colors">
                          Reaction Speed Test
                        </p>
                        <span className="inline-block mt-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-2 py-0.2 border border-sky-100 dark:border-sky-900">
                          Chemistry
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-[#A0A0A0]">
                      4 days ago
                    </span>
                  </Link>

                  {/* Task 4 */}
                  <Link
                    to="/physics"
                    className="flex items-center justify-between py-3 group hover:bg-slate-50 dark:hover:bg-[#2D2D2D] px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:scale-105 transition-transform">
                        <Sparkles size={17} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-sky-600 transition-colors">
                          Lens Refraction
                        </p>
                        <span className="inline-block mt-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.2 border border-indigo-100 dark:border-indigo-900">
                          Physics
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-[#A0A0A0]">
                      5 days ago
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right (Fun Games to Learn): White Card with 2x3 Grid of Square Buttons */}
            <div className="lg:col-span-4 rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#333333]">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Target size={16} className="text-amber-500" />
                    <span>Fun Games to Learn</span>
                  </h3>
                  <Link to="/games" className="text-xs font-bold text-amber-600 hover:underline">
                    All games
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {/* Game 1: Element Bingo */}
                  <Link
                    to="/games"
                    className="aspect-square p-2.5 rounded-2xl bg-slate-50 dark:bg-[#2D2D2D] hover:bg-yellow-50 dark:hover:bg-[#3D3D3D] hover:border-yellow-300 border border-slate-100 dark:border-[#3D3D3D] flex flex-col items-center justify-center text-center group transition shadow-2xs"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-sky-500 shadow-2xs group-hover:scale-110 transition-transform mb-1.5">
                      <Grid size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                      Element Bingo
                    </span>
                  </Link>

                  {/* Game 2: Atom Builder */}
                  <Link
                    to="/games"
                    className="aspect-square p-2.5 rounded-2xl bg-slate-50 dark:bg-[#2D2D2D] hover:bg-yellow-50 dark:hover:bg-[#3D3D3D] hover:border-yellow-300 border border-slate-100 dark:border-[#3D3D3D] flex flex-col items-center justify-center text-center group transition shadow-2xs"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-indigo-500 shadow-2xs group-hover:scale-110 transition-transform mb-1.5">
                      <Atom size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                      Atom Builder
                    </span>
                  </Link>

                  {/* Game 3: Reaction Rush */}
                  <Link
                    to="/games"
                    className="aspect-square p-2.5 rounded-2xl bg-slate-50 dark:bg-[#2D2D2D] hover:bg-yellow-50 dark:hover:bg-[#3D3D3D] hover:border-yellow-300 border border-slate-100 dark:border-[#3D3D3D] flex flex-col items-center justify-center text-center group transition shadow-2xs"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-amber-500 shadow-2xs group-hover:scale-110 transition-transform mb-1.5">
                      <Zap size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                      Reaction Rush
                    </span>
                  </Link>

                  {/* Game 4: Launch Physics */}
                  <Link
                    to="/games"
                    className="aspect-square p-2.5 rounded-2xl bg-slate-50 dark:bg-[#2D2D2D] hover:bg-yellow-50 dark:hover:bg-[#3D3D3D] hover:border-yellow-300 border border-slate-100 dark:border-[#3D3D3D] flex flex-col items-center justify-center text-center group transition shadow-2xs"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-emerald-500 shadow-2xs group-hover:scale-110 transition-transform mb-1.5">
                      <Rocket size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                      Launch Physics
                    </span>
                  </Link>

                  {/* Game 5: Lab Connect */}
                  <Link
                    to="/games"
                    className="aspect-square p-2.5 rounded-2xl bg-slate-50 dark:bg-[#2D2D2D] hover:bg-yellow-50 dark:hover:bg-[#3D3D3D] hover:border-yellow-300 border border-slate-100 dark:border-[#3D3D3D] flex flex-col items-center justify-center text-center group transition shadow-2xs"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-purple-500 shadow-2xs group-hover:scale-110 transition-transform mb-1.5">
                      <Share2 size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                      Lab Connect
                    </span>
                  </Link>

                  {/* Game 6: Formula Match */}
                  <Link
                    to="/games"
                    className="aspect-square p-2.5 rounded-2xl bg-slate-50 dark:bg-[#2D2D2D] hover:bg-yellow-50 dark:hover:bg-[#3D3D3D] hover:border-yellow-300 border border-slate-100 dark:border-[#3D3D3D] flex flex-col items-center justify-center text-center group transition shadow-2xs"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-rose-500 shadow-2xs group-hover:scale-110 transition-transform mb-1.5">
                      <Brain size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                      Formula Match
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Far Right (Explore Experiments): Sidebar Widget with Search & Filters */}
            <div className="lg:col-span-3 rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white mb-3">
                  Explore Experiments
                </h3>

                {/* Rounded Search Bar */}
                <div className="relative flex items-center rounded-full bg-slate-50 dark:bg-[#1A1A1A] px-3 py-1.5 border border-slate-200 dark:border-[#3D3D3D] mb-3">
                  <Search size={14} className="text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={exploreSearch}
                    onChange={(e) => setExploreSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-xs font-medium text-slate-800 dark:text-white outline-none placeholder-slate-400"
                  />
                </div>

                {/* Filter Pills: All, Chemistry, Physics */}
                <div className="flex items-center gap-1.5 mb-3">
                  {['All', 'Chemistry', 'Physics'].map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setExploreFilter(pill)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                        exploreFilter === pill
                          ? 'bg-yellow-400 text-slate-950 font-black shadow-2xs'
                          : 'bg-slate-100 dark:bg-[#2D2D2D] text-slate-600 dark:text-[#A0A0A0] hover:bg-slate-200'
                      }`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                {/* List of experiments */}
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {filteredExplores.map((exp) => (
                    <Link
                      key={exp.id}
                      to={exp.to}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#2D2D2D] hover:bg-yellow-50 dark:hover:bg-[#3D3D3D] transition group border border-transparent hover:border-yellow-200"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {exp.title}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {exp.category} · {exp.duration}
                        </span>
                      </div>
                      <span className="h-6 w-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:bg-yellow-400 shadow-2xs shrink-0 transition-colors">
                        <ArrowRight size={12} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SECTION C: BOTTOM GRID (3 Equal Columns)                             */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 (Step-by-Step Workspace) */}
            <div className="rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                {/* Horizontal Step Indicator (Circles 1 through 5, Step 1 active) */}
                <div className="flex items-center justify-between mb-4 px-2">
                  {[1, 2, 3, 4, 5].map((stepNum, idx) => {
                    const isActive = currentStep === stepNum;
                    const isPassed = currentStep > stepNum;
                    return (
                      <React.Fragment key={stepNum}>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(stepNum)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-sky-500 text-white ring-4 ring-sky-100 dark:ring-sky-950 font-black shadow-xs'
                              : isPassed
                              ? 'bg-emerald-500 text-white font-bold'
                              : 'bg-slate-100 dark:bg-[#2D2D2D] text-slate-400 font-semibold'
                          }`}
                        >
                          {isPassed ? <Check size={14} strokeWidth={3} /> : stepNum}
                        </button>
                        {idx < 4 && (
                          <div
                            className={`flex-1 h-0.5 mx-1.5 transition-colors ${
                              currentStep > stepNum ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-[#3D3D3D]'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Title & Description */}
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  {steps[currentStep - 1].title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[44px]">
                  {steps[currentStep - 1].desc}
                </p>

                {/* Image Illustration of Bunsen Burner & Crucible on Tripod */}
                <div className="mt-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] p-2 border border-slate-100 dark:border-[#3D3D3D]">
                  <BunsenApparatusIllustration
                    isIgnited={currentStep >= 3}
                    ribbonPlaced={currentStep >= 2}
                    isReacting={currentStep === 4}
                  />
                </div>
              </div>

              {/* Bottom Navigation Buttons: "Back" & "Next ->" */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100 dark:border-[#333333]">
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    currentStep === 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                  className="rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-4 py-2 text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  {currentStep === 5 ? 'Finish Steps ✓' : 'Next \u2192'}
                </button>
              </div>
            </div>

            {/* Card 2 (Experiment Details) */}
            <div className="rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                {/* Header Tag & Rating */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 px-3 py-1 text-xs font-bold border border-sky-200 dark:border-sky-900">
                    Chemistry
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>4.8 (120 reviews)</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className="mt-3 text-lg font-extrabold text-slate-800 dark:text-white">
                  Magnesium Ribbon Burning
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Observe the intense white dazzling flame and formation of magnesium oxide powder through rapid oxidation in atmospheric oxygen.
                </p>

                {/* Tags: "Medium Difficulty" and "20 min" */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 px-3 py-0.5 text-xs font-bold">
                    Medium Difficulty
                  </span>
                  <span className="rounded-full bg-slate-100 dark:bg-[#2D2D2D] text-slate-600 dark:text-slate-300 px-3 py-0.5 text-xs font-semibold">
                    20 min
                  </span>
                </div>

                {/* Burner Preview Illustration */}
                <div className="mt-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] p-2 border border-slate-100 dark:border-[#3D3D3D]">
                  <BunsenApparatusIllustration isIgnited={true} ribbonPlaced={true} isReacting={false} />
                </div>
              </div>

              {/* Wide Yellow Button: "Start Experiment ->" */}
              <div className="mt-5">
                <Link
                  to="/chemistry?tab=drag-and-drop"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-2.5 text-xs shadow-xs transition-transform active:scale-95"
                >
                  <span>Start Experiment &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Card 3 (Virtual Lab Interactive) */}
            <div className="rounded-3xl p-6 bg-white dark:bg-[#222222] border border-slate-100 dark:border-[#333333] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-slate-800 dark:text-white">
                    Virtual Lab Interactive
                  </h4>
                  <button
                    onClick={triggerReaction}
                    className="text-[10px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-full transition cursor-pointer"
                  >
                    Ignite Ribbon ⚡
                  </button>
                </div>

                {/* Mock Interactive Canvas Area with Dashed Outlines */}
                <div
                  onClick={triggerReaction}
                  className="rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border-2 border-dashed border-slate-300 dark:border-[#3D3D3D] p-3 flex flex-col items-center justify-center relative cursor-pointer group hover:border-yellow-400 transition-colors"
                >
                  {/* Dashed Outlines for "Magnesium Ribbon" and "Crucible" */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="border border-dashed border-slate-400 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[9px] font-mono">
                      [Magnesium Ribbon]
                    </span>
                    <span className="border border-dashed border-slate-400 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[9px] font-mono">
                      [Crucible]
                    </span>
                  </div>

                  <BunsenApparatusIllustration
                    isIgnited={labState.burnerIgnited}
                    ribbonPlaced={labState.ribbonPlaced}
                    isReacting={labState.isReacting}
                  />

                  <div className="mt-1 text-center">
                    <p className="text-[10px] font-mono font-bold text-slate-500">
                      2Mg(s) + O₂(g) &rarr; 2MgO(s) + ΔH
                    </p>
                    <span className="text-[9px] text-slate-400 group-hover:text-amber-600 font-semibold transition-colors">
                      Click canvas to ignite reaction
                    </span>
                  </div>
                </div>

                {/* Status Toast */}
                {labState.toastMessage && (
                  <div className="mt-2 text-center text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl py-1 px-2 animate-in fade-in">
                    {labState.toastMessage}
                  </div>
                )}
              </div>

              {/* Wide Yellow Button: "Record Observation" */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleRecordObservation}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-2.5 text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 size={15} />
                  <span>Record Observation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ADAPTIVE SCIENTIFIC INTELLIGENCE ENGINE (Optional Tab)           */}
      {/* ========================================================================= */}
      {activeTab === 'engine' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <StealthScaffoldingOverlay currentTopic="Kinematics" />
          <AutonomousIntelligenceCard />
          <CommandCenter />
          <MasteryDeltaView />
          <SmartVernacularCard />
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: UTILITY & FOCUS TOOLS (Optional Tab)                             */}
      {/* ========================================================================= */}
      {activeTab === 'utility' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <UtilityFocusTab />
        </div>
      )}
    </div>
  );
}
