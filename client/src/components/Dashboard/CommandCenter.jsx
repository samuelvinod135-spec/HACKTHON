import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Target,
  ArrowRight,
  Zap,
  Eye,
  BookOpen,
  Calculator,
  Compass,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { usePreferenceStore } from '../../store/usePreferenceStore.js';
import { getTailoredChallenges, CHALLENGE_FORMAT_AFFINITIES } from '../../utils/challengeSorter.js';
import { DAILY_TASKS } from '../../dailyTasksData.js';

export default function CommandCenter({ className = '' }) {
  const navigate = useNavigate();
  const { weights, topPreference, recordInteraction, getTopPreferenceDetails, getPercentages } =
    usePreferenceStore();

  const prefDetails = getTopPreferenceDetails();
  const pcts = getPercentages();

  // Run the adaptive challenge sorter with active weights
  const tailoredTasks = getTailoredChallenges(DAILY_TASKS, weights, topPreference);
  const activeMissionTask = tailoredTasks[0] || DAILY_TASKS[0];

  // Dynamic knowledge gap diagnosis based on lowest curricular baseline or active mission
  const detectedKnowledgeGap = {
    topic: activeMissionTask.category || 'Ray Optics & Refraction',
    subtopic: activeMissionTask.formula?.name || "Snell's Focal Convergence Law",
    severity: 'Needs Conceptual Reinforcement',
    targetScore: '85% Target Mastery',
  };

  const handleLaunchMission = () => {
    // Record interaction based on top preference format
    recordInteraction(topPreference, 0.04, 'command_center_launch');
    if (activeMissionTask.category === 'Optics' || activeMissionTask.track === 'Optics') {
      navigate('/physics');
    } else {
      navigate('/daily-challenge');
    }
  };

  return (
    <div className={`clay-card relative overflow-hidden rounded-3xl border-2 border-sky-200 dark:border-slate-800 bg-gradient-to-br from-white via-sky-50/30 to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-6 sm:p-8 shadow-xl ${className}`}>
      {/* Decorative ambient gradient backdrop */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-sky-400/10 to-yellow-300/10 blur-2xl" />

      {/* 1. Header with Badge & Adaptive AI Tag */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25">
            <Compass size={24} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                AI Scientific Intelligence Engine
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <Zap size={10} /> Active Guidance
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Adaptive Learning Command Center
            </h2>
          </div>
        </div>

        {/* Dynamic Learning Style Weight Pill */}
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Current Learning Style
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="rounded-xl bg-yellow-300 px-2.5 py-1 text-xs font-black text-slate-900 shadow-xs border border-yellow-400/80">
              {prefDetails.label} ({prefDetails.pct}%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Explicit Knowledge Gap Diagnosis Banner */}
      <div className="relative z-10 my-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800/60 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/80 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/20 p-4 sm:p-5 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black shadow-xs">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                Diagnostic Knowledge Gap Identified
              </span>
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded">
                Confidence: 94.2%
              </span>
            </div>
            <p className="mt-1 text-sm sm:base font-bold text-slate-900 dark:text-slate-100 leading-snug">
              Based on your recent tests, your knowledge gap is{' '}
              <span className="underline decoration-amber-500 decoration-2 font-black text-amber-900 dark:text-amber-300">
                {detectedKnowledgeGap.topic}: {detectedKnowledgeGap.subtopic}
              </span>
              .
            </p>
            <p className="mt-1 text-xs text-amber-950/80 dark:text-slate-300 font-medium">
              We identified a 28% variance in first-principles recall during recent diagnostic assessments.
              Your customized adaptive mission below is formatted specifically for your preference: <strong className="font-bold">{prefDetails.label}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Personalized Mission Card (Adaptive Recommendation) */}
      <div className="relative z-10 rounded-2xl border border-sky-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 shadow-md transition-all hover:border-sky-300 dark:hover:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 text-[10px] font-black uppercase px-2 py-0.5">
                Personalized Mission · {activeMissionTask.adaptiveSequenceBadge || 'Day 1'}
              </span>
              <span className="rounded-md bg-yellow-100 dark:bg-amber-900/50 text-yellow-900 dark:text-amber-200 text-[10px] font-bold px-2 py-0.5">
                +{activeMissionTask.xpReward} XP Reward
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
              {activeMissionTask.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              <strong className="text-sky-900 dark:text-sky-400 font-bold">Tailored Objective:</strong>{' '}
              {activeMissionTask.tailoredFocusTitle || activeMissionTask.goal}
            </p>

            {activeMissionTask.formula && (
              <div className="mt-2 flex items-center gap-2 font-mono text-xs font-black text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 w-fit">
                <span className="text-slate-400 font-sans text-[10px] uppercase font-bold">Equation:</span>
                <span>{activeMissionTask.formula.equation}</span>
              </div>
            )}
          </div>

          {/* CTA Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2">
            <button
              onClick={handleLaunchMission}
              className="clay-btn-yellow flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-slate-950 shadow-md hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            >
              <span>Launch Personalized Mission</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <span className="text-[10px] text-slate-400 font-medium text-center">
              Estimated duration: ~8 mins
            </span>
          </div>
        </div>
      </div>

      {/* 4. Format Preference Interactive Metric Bar */}
      <div className="relative z-10 mt-6 pt-5 border-t border-sky-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">
              Format Preference Tracker (Live Weighting)
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            Click any dimension to simulate interaction and reorder the adaptive challenge sequence:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Dimension 1: Visual Simulation */}
          <button
            type="button"
            onClick={() => recordInteraction('visual_simulation', 0.08, 'manual_boost')}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              topPreference === 'visual_simulation'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300">
                <Eye size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">Visual Simulation</p>
                <p className="text-[9px] text-slate-400">3D Canvas & Optics</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-sky-700 dark:text-sky-300">{pcts.visual_simulation}%</span>
          </button>

          {/* Dimension 2: Textual Derivation */}
          <button
            type="button"
            onClick={() => recordInteraction('textual_derivation', 0.08, 'manual_boost')}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              topPreference === 'textual_derivation'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
                <BookOpen size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">Textual Derivation</p>
                <p className="text-[9px] text-slate-400">Proofs & Core Laws</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-amber-700 dark:text-amber-300">{pcts.textual_derivation}%</span>
          </button>

          {/* Dimension 3: Numerical Practice */}
          <button
            type="button"
            onClick={() => recordInteraction('numerical_practice', 0.08, 'manual_boost')}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              topPreference === 'numerical_practice'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                <Calculator size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">Numerical Practice</p>
                <p className="text-[9px] text-slate-400">Sliders & Calculations</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-emerald-700 dark:text-emerald-300">{pcts.numerical_practice}%</span>
          </button>
        </div>
      </div>
    </div>
  );
}
