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
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import CommandCenter from '../components/Dashboard/CommandCenter.jsx';
import MasteryDeltaView from '../components/MasteryDelta/MasteryDeltaView.jsx';
import SmartVernacularCard from '../components/Vernacular/SmartVernacularCard.jsx';
import UtilityFocusTab from '../components/Dashboard/UtilityFocusTab.jsx';
import StealthScaffoldingOverlay from '../components/StealthScaffolding/StealthScaffoldingOverlay.jsx';

export default function Home() {
  const { user, profile } = useAuth();
  const { student } = useProgress();
  const { t } = useLanguage();

  // 'engine' (Adaptive Scientific Intelligence Engine) | 'utility' (Utility & Focus Hub)
  const [activeTab, setActiveTab] = useState('engine');

  const name = profile?.full_name?.split(' ')[0] || (student?.name ? student.name.split(' ')[0] : 'Scholar');
  const xp = profile?.xp ?? (student ? student.xp : 0);
  const xpCap = profile?.xp_for_level ?? (student ? student.xp_for_level : 1000);
  const level = profile?.level ?? (student ? student.level : 1);
  const xpPct = Math.min(100, Math.round((xp / xpCap) * 100));

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* 1. Header Greeting & AI Launcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            {t('dashboard.welcomeBack', 'Welcome back')}, {name} <span className="text-2xl">👋</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
            {t('dashboard.greetingSubtitle', 'Ready to explore, experiment and learn today?')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Main Primary View Switcher: Engine vs Utility */}
          <div className="flex items-center gap-1 rounded-2xl border border-sky-200 bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('engine')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'engine'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                  ? 'bg-yellow-300 text-slate-950 shadow-md border border-yellow-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers size={14} />
              <span>Utility & Focus</span>
            </button>
          </div>

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
      {activeTab === 'engine' ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Autonomous Stealth Scaffolding Ambient Layer */}
          <StealthScaffoldingOverlay currentTopic="Kinematics" />

          {/* Centerpiece Component: Adaptive Scientific Intelligence Command Center */}
          <CommandCenter />

          {/* Core Science Benches Quick Launch Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/chemistry?tab=drag-and-drop"
              className="clay-card-blue flex items-center justify-between p-5 rounded-3xl group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-sky-700 shadow-sm">
                  <FlaskConical size={22} />
                </span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">
                    {t('dashboard.chemistryCanvas', 'Chemistry Canvas')}
                  </h4>
                  <p className="text-[11px] text-sky-800/80 mt-0.5">
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
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-emerald-800 shadow-sm">
                  <Atom size={22} />
                </span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">
                    {t('dashboard.physicsWorkspace', 'Physics Optics & Mechanics')}
                  </h4>
                  <p className="text-[11px] text-emerald-800/80 mt-0.5">
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
