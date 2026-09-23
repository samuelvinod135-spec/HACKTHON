import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function Home() {
  const { user, profile } = useAuth();
  const { student } = useProgress();
  const { t } = useLanguage();
  const { isLiteMode } = usePerformance();

  // 'engine' (Adaptive Scientific Intelligence Engine) | 'utility' (Utility & Focus Hub)
  const [activeTab, setActiveTab] = useState('engine');

  // Dynamic Welcome Greeting derived from authenticated user's email address
  const userEmail = user?.email || profile?.email;
  const greetingName = userEmail
    ? extractUsername(userEmail, 'Scholar')
    : (profile?.full_name?.split(' ')[0] || (student?.name ? student.name.split(' ')[0] : 'Scholar'));

  const name = greetingName;
  const xp = profile?.xp ?? (student ? student.xp : 0);
  const xpCap = profile?.xp_for_level ?? (student ? student.xp_for_level : 1000);
  const level = profile?.level ?? (student ? student.level : 1);
  const xpPct = Math.min(100, Math.round((xp / xpCap) * 100));

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* 1. Header Greeting & Launcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Welcome {greetingName} <span className="text-2xl">👋</span>
            </h1>
            {isLiteMode && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-[#1A1A1A] border border-amber-300 dark:border-[#3D3D3D] px-2.5 py-0.5 text-[11px] font-black text-amber-900 dark:text-white">
                <Zap size={11} className="fill-amber-500 text-amber-500 dark:fill-white dark:text-white" />
                <span>Lite Mode Active</span>
              </span>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-[#A0A0A0]">
            {isLiteMode
              ? 'Streamlined mode active: displaying essential lab workspaces and core practice.'
              : t('dashboard.greetingSubtitle', 'Ready to explore, experiment and learn today?')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Main Primary View Switcher: Hidden in Lite Mode to keep only necessary functions */}
          {!isLiteMode && (
            <div className="flex items-center gap-1 rounded-2xl border border-sky-200 dark:border-[#3D3D3D] bg-white dark:bg-[#2D2D2D] p-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab('engine')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'engine'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-white dark:to-white dark:bg-white text-white dark:text-[#1A1A1A] shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1A1A1A]'
                }`}
              >
                <Cpu size={14} />
                <span>Adaptive Engine</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('utility')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'utility'
                    ? 'bg-yellow-300 dark:bg-white text-slate-950 dark:text-[#1A1A1A] shadow-md border border-yellow-400 dark:border-white'
                    : 'text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1A1A1A]'
                }`}
              >
                <Layers size={14} />
                <span>Utility & Focus</span>
              </button>
            </div>
          )}

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent('labxplore:ask-ai', {
                  detail: { prompt: 'Hello! Can you guide me through my current physics & chemistry knowledge gap today?' },
                })
              )
            }
            className="clay-btn-yellow inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black text-slate-900 shadow-md hover:scale-105 transition-transform"
          >
            <Sparkles size={15} className="text-slate-950" />
            <span className="hidden sm:inline">{t('dashboard.launchAiTutor', 'Launch AI Science Tutor')}</span>
            <span className="sm:hidden">AI Tutor</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content View */}
      {isLiteMode ? (
        /* LITE MODE: Lightweight, fast, displaying only essential necessary functions */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Essential Science Benches Quick Launch Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/chemistry?tab=drag-and-drop"
              className="clay-card-blue flex items-center justify-between p-6 rounded-3xl group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 dark:bg-slate-800 text-sky-700 dark:text-sky-300 shadow-sm">
                  <FlaskConical size={24} />
                </span>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-slate-100 leading-tight">
                    {t('dashboard.chemistryCanvas', 'Chemistry Canvas')}
                  </h4>
                  <p className="text-xs text-sky-800/80 dark:text-sky-300/80 mt-1">
                    118 Elements, 5,000+ reactions & stoichiometry
                  </p>
                </div>
              </div>
              <span className="clay-btn-yellow flex h-9 w-9 items-center justify-center rounded-full text-slate-900 shadow-xs group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </Link>

            <Link
              to="/physics"
              className="clay-card-green flex items-center justify-between p-6 rounded-3xl group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 shadow-sm">
                  <Atom size={24} />
                </span>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-slate-100 leading-tight">
                    {t('dashboard.physicsWorkspace', 'Physics Optics & Mechanics')}
                  </h4>
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-1">
                    Harmonic pendulum oscillation & ray tracing benches
                  </p>
                </div>
              </div>
              <span className="clay-btn-yellow flex h-9 w-9 items-center justify-center rounded-full text-slate-900 shadow-xs group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </Link>
          </div>

          {/* Quick Practice Essentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/quizzes"
              className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-300 dark:hover:border-sky-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  <TestTubes size={18} />
                </span>
                <div>
                  <h5 className="text-xs font-black text-slate-900 dark:text-slate-100">Science Quizzes</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Concept practice questions</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>

            <Link
              to="/daily-challenge"
              className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-300 dark:hover:border-amber-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  <Zap size={18} />
                </span>
                <div>
                  <h5 className="text-xs font-black text-slate-900 dark:text-slate-100">Daily Challenge</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Daily XP bonus task</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>

            <Link
              to="/mock-tests"
              className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <GraduationCap size={18} />
                </span>
                <div>
                  <h5 className="text-xs font-black text-slate-900 dark:text-slate-100">Mock Tests</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Full exam simulations</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>
          </div>

          {/* Simple Clean Progress Overview */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 text-xl font-black">
                ★
              </span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Current Academic Standing
                </h4>
                <p className="text-sm font-black text-slate-900 dark:text-slate-100">
                  Level {level} Scholar · {xp.toLocaleString()} Total Credits
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/progress"
                className="px-4 py-2 rounded-xl text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                View Full Progress &rarr;
              </Link>
            </div>
          </div>
        </div>
      ) : activeTab === 'engine' ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Autonomous Stealth Scaffolding Ambient Layer */}
          <StealthScaffoldingOverlay currentTopic="Kinematics" />

          {/* Fully Autonomous AI Progress & Mastery Intelligence Monitor */}
          <AutonomousIntelligenceCard />

          {/* Centerpiece Component: Adaptive Scientific Intelligence Command Center */}
          <CommandCenter />

          {/* Core Science Benches Quick Launch Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/chemistry?tab=drag-and-drop"
              className="clay-card-blue flex items-center justify-between p-5 rounded-3xl group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 dark:bg-slate-800 text-sky-700 dark:text-sky-300 shadow-sm">
                  <FlaskConical size={22} />
                </span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight">
                    {t('dashboard.chemistryCanvas', 'Chemistry Canvas')}
                  </h4>
                  <p className="text-[11px] text-sky-800/80 dark:text-sky-300/80 mt-0.5">
                    118 Elements, 5,000+ reactions & stoichiometry
                  </p>
                </div>
              </div>
              <span className="clay-btn-yellow flex h-8 w-8 items-center justify-center rounded-full text-slate-900 shadow-xs group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} strokeWidth={2.5} />
              </span>
            </Link>

            <Link
              to="/physics"
              className="clay-card-green flex items-center justify-between p-5 rounded-3xl group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 shadow-sm">
                  <Atom size={22} />
                </span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight">
                    {t('dashboard.physicsWorkspace', 'Physics Optics & Mechanics')}
                  </h4>
                  <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 mt-0.5">
                    Harmonic pendulum oscillation & ray tracing benches
                  </p>
                </div>
              </div>
              <span className="clay-btn-yellow flex h-8 w-8 items-center justify-center rounded-full text-slate-900 shadow-xs group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} strokeWidth={2.5} />
              </span>
            </Link>
          </div>

          {/* Proof of Learning: Mastery Delta Dashboard Component */}
          <MasteryDeltaView />

          {/* Smart Vernacular Demonstration Module (Preserving Technical Terms) */}
          <SmartVernacularCard />
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Secondary Demoted Gamification & Focus Tools */}
          <UtilityFocusTab />
        </div>
      )}
    </div>
  );
}
