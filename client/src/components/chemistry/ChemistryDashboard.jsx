import React from 'react';
import {
  FlaskConical,
  Atom,
  Flame,
  Search,
  BookOpen,
  Sparkles,
  Scale,
  Network,
  Cpu,
  Bookmark,
  Award,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Beaker,
  CheckCircle2
} from 'lucide-react';
import { getChemistryReactionCount } from '../../data/chemistry/chemistryDatabase.js';

export default function ChemistryDashboard({ onNavigate, stats }) {
  const reactionCount = stats?.reactions || getChemistryReactionCount();
  const experimentsCount = stats?.experiments || 107;
  const namedCount = stats?.named || 31;
  const moleculesCount = stats?.molecules || 65;

  const quickFeatures = [
    {
      id: 'lab',
      title: 'Virtual Chemistry Laboratory',
      subtitle: '18+ Equipment items, burner with yellow/blue flame, titration burette, indicators & live physical changes',
      icon: FlaskConical,
      color: 'from-sky-500 to-blue-600',
      tag: 'Interactive Bench'
    },
    {
      id: 'library',
      title: '10,000+ Chemical Reactions Library',
      subtitle: `Explore ${reactionCount.toLocaleString()} verified reactions across Classes 10, 11, and 12 with full mechanisms`,
      icon: Search,
      color: 'from-emerald-500 to-teal-600',
      tag: 'NCERT / CBSE Complete'
    },
    {
      id: 'simulator',
      title: 'Reaction Simulator & Predictor',
      subtitle: 'Mix chemicals with strict zero-fabrication verification; test reactivity without guessing',
      icon: Cpu,
      color: 'from-purple-500 to-indigo-600',
      tag: 'Zero Hallucination'
    },
    {
      id: 'balancer',
      title: 'Chemical Equation Balancer',
      subtitle: 'Linear algebraic matrix balancing with before & after atom counts and step-by-step solution',
      icon: Scale,
      color: 'from-amber-500 to-orange-600',
      tag: 'Algebraic Nullspace'
    },
    {
      id: 'named',
      title: 'Iconic Named Reactions',
      subtitle: '31+ NCERT named reactions with detailed electron arrow mechanisms, conditions & student pitfalls',
      icon: Sparkles,
      color: 'from-rose-500 to-pink-600',
      tag: 'CBSE Board Priority'
    },
    {
      id: 'experiments',
      title: '107 Virtual Lab Experiments',
      subtitle: 'CBSE practicals with full aim, apparatus, procedure, observations, results and viva voce questions',
      icon: BookOpen,
      color: 'from-cyan-500 to-sky-600',
      tag: 'Class 10, 11, 12 Practicals'
    },
    {
      id: 'synthesis',
      title: 'Reaction Graph & Synthesis Pathways',
      subtitle: 'Visual roadmap of organic conversions: Alkanes ➔ Alcohols ➔ Carbonyls ➔ Carboxylic Acids ➔ Esters',
      icon: Network,
      color: 'from-violet-500 to-purple-600',
      tag: 'Synthesis Roadmap'
    },
    {
      id: 'molecules',
      title: 'Molecule Explorer (65+ Compounds)',
      subtitle: 'Inspect 2D structural formulas, IUPAC names, geometries, hybridization, and SMILES notation',
      icon: Atom,
      color: 'from-blue-500 to-cyan-600',
      tag: '2D Structures'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Banner with Stats */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-sky-800/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 px-3 py-1 text-xs font-bold text-sky-300">
                <Sparkles size={13} className="text-yellow-400" />
                Next-Gen Chemistry Virtual Lab
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300">
                CBSE Classes 10, 11 & 12
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Interactive Chemical Reaction & Virtual Laboratory
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Experience hands-on chemistry with <strong className="text-sky-300">{reactionCount.toLocaleString()}+ verified reactions</strong>, 
              18+ virtual apparatus, authentic qualitative salt analysis, titrations, algebraic equation balancing, and named reaction mechanisms.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('lab')}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-sky-500/30 hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                <FlaskConical size={16} />
                <span>Launch Virtual Lab</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('library')}
                className="flex items-center gap-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 transition cursor-pointer"
              >
                <Search size={15} />
                <span>Search 10,000+ Reactions</span>
              </button>

              <button
                onClick={() => onNavigate('experiments')}
                className="flex items-center gap-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 transition cursor-pointer"
              >
                <BookOpen size={15} />
                <span>107 Experiments</span>
              </button>
            </div>
          </div>

          {/* Metric Badges Column */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto min-w-[240px]">
            <div className="flex flex-col rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-sky-300">Total Reactions</span>
              <span className="text-2xl font-black text-white">{reactionCount.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400">Class 10, 11 & 12 NCERT</span>
            </div>

            <div className="flex flex-col rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-emerald-300">Experiments</span>
              <span className="text-2xl font-black text-white">{experimentsCount}</span>
              <span className="text-[10px] text-slate-400">Practicals & Viva Voce</span>
            </div>

            <div className="flex flex-col rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-pink-300">Named Reactions</span>
              <span className="text-2xl font-black text-white">{namedCount}+</span>
              <span className="text-[10px] text-slate-400">Step-by-step Mechanisms</span>
            </div>

            <div className="flex flex-col rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-amber-300">Molecules</span>
              <span className="text-2xl font-black text-white">{moleculesCount}+</span>
              <span className="text-[10px] text-slate-400">2D Chemical Structures</span>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Class Level Quick Access Pills */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
          <span>CBSE Class-Wise Learning Modules</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">3 Tiers</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={() => onNavigate('library', { classLevel: 'Class 10' })}
            className="group flex flex-col justify-between rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/60 to-white p-4 transition hover:border-sky-400 hover:shadow-md cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-xl bg-sky-500 text-white px-2.5 py-1 text-xs font-black">Class 10</span>
                <span className="text-xs font-bold text-sky-700">4 Chapters</span>
              </div>
              <h3 className="mt-2 text-base font-black text-slate-900 group-hover:text-sky-600 transition">
                Foundations of Chemical Reactions
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Combination, Decomposition, Displacement, Double Displacement, Neutralization, Limewater test, pH scale, Soap & Esterification.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-sky-600">
              <span>View Class 10 Reactions</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('library', { classLevel: 'Class 11' })}
            className="group flex flex-col justify-between rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 to-white p-4 transition hover:border-emerald-400 hover:shadow-md cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-xl bg-emerald-600 text-white px-2.5 py-1 text-xs font-black">Class 11</span>
                <span className="text-xs font-bold text-emerald-700">13 Chapters</span>
              </div>
              <h3 className="mt-2 text-base font-black text-slate-900 group-hover:text-emerald-600 transition">
                Physical, Inorganic & Hydrocarbons
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Thermodynamics, Equilibrium shifts (Fe³⁺/SCN⁻), Redox balancing, Alkanes, Alkenes Markownikoff addition, Alkynes, s-Block & p-Block.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span>View Class 11 Reactions</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('library', { classLevel: 'Class 12' })}
            className="group flex flex-col justify-between rounded-2xl border border-purple-200/80 bg-gradient-to-br from-purple-50/60 to-white p-4 transition hover:border-purple-400 hover:shadow-md cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-xl bg-purple-600 text-white px-2.5 py-1 text-xs font-black">Class 12</span>
                <span className="text-xs font-bold text-purple-700">16 Chapters</span>
              </div>
              <h3 className="mt-2 text-base font-black text-slate-900 group-hover:text-purple-600 transition">
                Advanced Organic & Coordination
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Haloalkanes, Alcohols, Phenols, Aldehydes, Ketones, Carboxylic Acids, Amines, Coordination complexes, KMnO₄ titrations, Salt analysis.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-purple-600">
              <span>View Class 12 Reactions</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Module Grid */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
          <span>Primary Interactive Chemistry Workspaces</span>
          <span className="rounded-full bg-sky-100 text-sky-700 px-2 py-0.5 text-[10px] font-bold">8 Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onNavigate(feat.id)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-sky-400 hover:shadow-lg cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${feat.color} text-white shadow-md`}>
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-sky-600 transition">
                    {feat.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-3">
                    {feat.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-sky-600">
                  <span>Open Module</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Assessment & Practice Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigate('quiz')}
          className="group flex items-center justify-between rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 shadow-xs transition hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition">
                Interactive Reaction Quiz Mode
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Test your mastery with 4-choice dynamic MCQs generated from the 10,000+ reactions database.
              </p>
            </div>
          </div>
          <ArrowRight size={18} className="text-amber-600 group-hover:translate-x-1 transition shrink-0 ml-2" />
        </div>

        <div
          onClick={() => onNavigate('flashcards')}
          className="group flex items-center justify-between rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-blue-50 p-5 shadow-xs transition hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md">
              <HelpCircle size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-sky-600 transition">
                3D Reaction Flashcard Mode
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Active recall system: reactants & conditions on front, 3D flip to reveal balanced products and CBSE tips.
              </p>
            </div>
          </div>
          <ArrowRight size={18} className="text-sky-600 group-hover:translate-x-1 transition shrink-0 ml-2" />
        </div>
      </div>
    </div>
  );
}
