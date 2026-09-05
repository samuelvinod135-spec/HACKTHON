import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  Atom,
  ArrowRight,
  ArrowUpRight,
  Flame,
  Sparkles,
  Rocket,
  Search,
  CheckCircle2,
  Volume2,
  Maximize2,
  Star,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user, profile } = useAuth();
  const { student, completions, record } = useProgress();

  const [exploreFilter, setExploreFilter] = useState('All');
  const [exploreSearch, setExploreSearch] = useState('');
  const [step, setStep] = useState(1);
  const [observationRecorded, setObservationRecorded] = useState(false);

  const name = profile?.full_name?.split(' ')[0] || (student?.name ? student.name.split(' ')[0] : 'Scholar');
  const xp = profile?.xp ?? (student ? student.xp : 0);
  const xpCap = profile?.xp_for_level ?? (student ? student.xp_for_level : 1000);
  const level = profile?.level ?? (student ? student.level : 1);
  const xpPct = Math.min(100, Math.round((xp / xpCap) * 100));

  const handleRecordObservation = async () => {
    setObservationRecorded(true);
    await record({
      kind: 'experiment',
      ref: 'Magnesium Ribbon Burning Observation',
      xp: 80,
    });
    setTimeout(() => setObservationRecorded(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* 1. Page Header Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Welcome back, {name} <span className="text-2xl">👋</span>
        </h1>
        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
          Ready to explore, experiment and learn today?
        </p>
      </div>

      {/* 2. Top Hero Modules Grid (matches reference image row 1) */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {/* Card 1: New Chemistry Workspace (Blue-Tinted White Clay) */}
        <div className="clay-card-blue relative flex flex-col justify-between p-6 overflow-hidden min-h-[220px]">
          <div className="z-10">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100/70 text-[10px] font-bold text-sky-800 mb-2">
              Chemistry Lab
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              New Chemistry Workspace
            </h3>
            <p className="mt-1 text-[11px] font-medium text-sky-700/90">
              Reaction balancing & synthesis
            </p>
          </div>

          <div className="z-10 mt-6">
            <Link
              to="/chemistry"
              className="clay-btn-yellow inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900"
            >
              Start Experiment <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Card 2: New Physics Workspace (Green-Tinted White Clay) */}
        <div className="clay-card-green relative flex flex-col justify-between p-6 overflow-hidden min-h-[220px]">
          <div className="z-10">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-[10px] font-bold text-emerald-800 mb-2">
              Physics Lab
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              New Physics Workspace
            </h3>
            <p className="mt-1 text-[11px] font-medium text-emerald-700/90">
              Harmonics & kinematics
            </p>
          </div>

          <div className="z-10 mt-6">
            <Link
              to="/physics"
              className="clay-btn-yellow inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900"
            >
              Start Experiment <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Card 3: My Progress & Medals Summary */}
        <div className="clay-card flex flex-col justify-between p-5 min-h-[220px]">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800">My Progress</h4>
              <span className="text-[10px] font-bold text-slate-400">
                {xp.toLocaleString()} / {xpCap.toLocaleString()} XP
              </span>
            </div>

            <p className="mt-2 text-xl font-black text-slate-900">Level {level}</p>

            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-500 transition-all duration-500"
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <p className="mt-1.5 text-[10px] font-medium text-slate-400">
              Keep going! You're doing great.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-700">Achievements</span>
              <Link to="/achievements" className="text-[10px] font-bold text-blue-600 hover:underline">
                View all
              </Link>
            </div>

            {/* 3D Medals Row */}
            <div className="flex items-center gap-2">
              <div className="clay-btn-circle h-9 w-9 flex items-center justify-center bg-amber-100 text-amber-600 shadow-xs" title="Science Explorer">
                <Star size={16} fill="currentColor" />
              </div>
              <div className="clay-btn-circle h-9 w-9 flex items-center justify-center bg-emerald-100 text-emerald-600 shadow-xs" title="Chem Whiz">
                <FlaskConical size={16} />
              </div>
              <div className="clay-btn-circle h-9 w-9 flex items-center justify-center bg-rose-100 text-rose-600 shadow-xs" title="Young Physicist">
                <Rocket size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Learn by Doing. (Teal Clay) */}
        <div className="clay-card-teal relative flex flex-col justify-between p-5 min-h-[220px] overflow-hidden">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-100/80 text-[10px] font-bold text-teal-800 mb-2">
              Interactive
            </span>
            <h3 className="text-base font-black text-teal-950">Learn by Doing.</h3>
            <p className="mt-1.5 text-[11px] font-medium text-teal-800/80 leading-relaxed">
              Explore science through interactive experiments and fun challenges.
            </p>
          </div>

          <div className="mt-4">
            <Link
              to="/saved"
              className="clay-btn-yellow inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900"
            >
              Explore Experiments <ArrowRight size={13} strokeWidth={2.5} />
            </Link>

            {/* Carousel Dots */}
            <div className="mt-3 flex items-center gap-1.5">
              <span className="h-1.5 w-4 rounded-full bg-teal-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-teal-200" />
              <span className="h-1.5 w-1.5 rounded-full bg-teal-200" />
              <span className="h-1.5 w-1.5 rounded-full bg-teal-200" />
            </div>
          </div>
        </div>

        {/* Card 5: Explore Experiments List & Filters */}
        <div className="clay-card flex flex-col justify-between p-5 min-h-[220px]">
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2">Explore Experiments</h4>
            <div className="clay-input flex items-center px-3 py-1 mb-2.5">
              <Search size={12} className="text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={exploreSearch}
                onChange={(e) => setExploreSearch(e.target.value)}
                placeholder="Search experiments..."
                className="w-full bg-transparent text-[11px] font-medium text-slate-800 outline-none placeholder-slate-400"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
              {['All', 'Chemistry', 'Physics', 'Popular'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setExploreFilter(tab)}
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                    exploreFilter === tab ? 'clay-pill-active' : 'clay-pill-inactive'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Experiments compact list */}
            <div className="space-y-2">
              <Link to="/chemistry" className="flex items-center gap-2.5 text-xs group">
                <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FlaskConical size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-slate-800 group-hover:text-blue-600">Magnesium Ribbon</p>
                  <span className="text-[9px] text-slate-400">Chemistry</span>
                </div>
              </Link>
              <Link to="/physics" className="flex items-center gap-2.5 text-xs group">
                <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Atom size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-slate-800 group-hover:text-emerald-600">Pendulum Motion</p>
                  <span className="text-[9px] text-slate-400">Physics</span>
                </div>
              </Link>
            </div>
          </div>

          <Link to="/saved" className="mt-3 text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
            View All Experiments <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* 3. Middle Modules: Recent Experiments & Fun Games Row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent Experiments (2 Cols on lg) */}
        <div className="clay-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Recent Experiments</h3>
            <Link to="/saved" className="text-xs font-bold text-blue-600 hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Magnesium Ribbon Burning', discipline: 'Chemistry', time: '2 days ago', to: '/chemistry', icon: Flame, color: 'text-amber-500 bg-amber-50' },
              { title: 'Pendulum Motion', discipline: 'Physics', time: '3 days ago', to: '/physics', icon: Atom, color: 'text-teal-600 bg-teal-50' },
              { title: 'Reaction Speed Test', discipline: 'Chemistry', time: '5 days ago', to: '/chemistry', icon: FlaskConical, color: 'text-blue-600 bg-blue-50' },
              { title: 'Lens Refraction', discipline: 'Physics', time: '1 week ago', to: '/physics', icon: Sparkles, color: 'text-sky-600 bg-sky-50' },
            ].map((exp) => {
              const Icon = exp.icon;
              return (
                <Link
                  key={exp.title}
                  to={exp.to}
                  className="clay-card flex items-center justify-between p-3.5 hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${exp.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{exp.title}</p>
                      <span className="text-[10px] font-semibold text-slate-400">{exp.discipline}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">{exp.time}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Fun Games to Learn */}
        <div className="clay-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Fun Games to Learn</h3>
              <Link to="/games" className="text-xs font-bold text-blue-600 hover:underline">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: 'Element Bingo', sub: 'Na', to: '/games', bg: 'bg-rose-50 text-rose-600' },
                { name: 'Atom Builder', sub: 'Atom', to: '/games', bg: 'bg-sky-50 text-sky-600' },
                { name: 'Reaction Rush', sub: 'Reaction', to: '/games', bg: 'bg-amber-50 text-amber-600' },
                { name: 'Launch Physics', sub: 'Launch', to: '/games', bg: 'bg-sky-50 text-sky-600' },
                { name: 'Lab Connect', sub: 'Connect', to: '/games', bg: 'bg-emerald-50 text-emerald-600' },
              ].map((g) => (
                <Link
                  key={g.name}
                  to={g.to}
                  className="clay-card flex flex-col items-center justify-center p-3 text-center hover:scale-105 transition"
                >
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-xs mb-1.5 shadow-xs ${g.bg}`}>
                    {g.sub}
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">{g.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/games"
            className="clay-btn-yellow mt-4 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-900"
          >
            Play Science Games <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {/* 4. Interactive Simulation & Workspace Showcase (matches lower sections in screenshot) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Step-by-Step Workspace Apparatus Card */}
        <div className="clay-card p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Step-by-Step Workspace</h3>
            <span className="text-[10px] font-bold text-sky-600">Active Task</span>
          </div>

          {/* Stepper numbers 1..5 */}
          <div className="my-4 flex items-center justify-between px-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                  step === s
                    ? 'clay-pill-active shadow-sm'
                    : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800">Step {step}: Setup the Apparatus</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Take a clean crucible and place the magnesium ribbon inside the wire gauze stand.
            </p>
          </div>

          {/* Apparatus 3D preview */}
          <div className="my-4 h-36 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
            <img src="/clay/apparatus.jpg" alt="Apparatus" className="h-full object-contain" />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="clay-btn-circle px-4 py-1.5 text-xs font-bold text-slate-600 disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="clay-btn-yellow px-5 py-1.5 text-xs font-bold text-slate-900"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Featured Experiment: Magnesium Ribbon Burning */}
        <div className="clay-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600">
                Chemistry
              </span>
              <span className="text-[11px] font-semibold text-slate-400">★ 4.8 (120 reviews)</span>
            </div>

            <h3 className="mt-3 text-base font-black text-slate-900">Magnesium Ribbon Burning</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Observe the reaction of magnesium ribbon with atmospheric oxygen and learn about combustion thermochemistry.
            </p>

            <div className="my-3 flex items-center gap-3 text-[11px] font-medium text-slate-500">
              <span>⚡ Medium Difficulty</span>
              <span>⏱ 20 min</span>
            </div>

            <div className="h-32 rounded-2xl bg-slate-50 p-2 flex items-center justify-center overflow-hidden border border-slate-100">
              <img src="/clay/apparatus.jpg" alt="Burning Ribbon" className="h-full object-contain" />
            </div>
          </div>

          <Link
            to="/chemistry"
            className="clay-btn-yellow mt-4 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-slate-900"
          >
            Start Experiment <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Virtual Lab (Interactive) Live Canvas preview */}
        <div className="clay-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Virtual Lab (Interactive)</h3>
              <div className="flex items-center gap-1.5">
                <button className="clay-btn-circle h-7 w-7 flex items-center justify-center text-slate-500" title="Toggle audio">
                  <Volume2 size={13} />
                </button>
                <Link to="/chemistry" className="clay-btn-circle h-7 w-7 flex items-center justify-center text-slate-500" title="Full workspace">
                  <Maximize2 size={13} />
                </Link>
              </div>
            </div>

            {/* Interactive burner preview */}
            <div className="relative h-44 rounded-2xl bg-gradient-to-b from-sky-50/50 to-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/80">
              <img src="/clay/apparatus.jpg" alt="Interactive Burner" className="h-36 object-contain" />

              {/* Labels matching screenshot */}
              <span className="absolute top-3 left-3 text-[9px] font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
                Magnesium Ribbon
              </span>
              <span className="absolute bottom-3 left-3 text-[9px] font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
                Bunsen Burner
              </span>
              <span className="absolute top-3 right-3 text-[9px] font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
                Crucible
              </span>
            </div>

            {observationRecorded && (
              <p className="mt-2 text-center text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                <CheckCircle2 size={13} /> Observation recorded: Brilliant white luminescence observed! (+80 XP)
              </p>
            )}
          </div>

          <button
            onClick={handleRecordObservation}
            className="clay-btn-yellow mt-4 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-slate-900"
          >
            Record Observation
          </button>
        </div>
      </div>
    </div>
  );
}
