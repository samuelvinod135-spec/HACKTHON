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
    <div className={`clay-card relative overflow-hidden rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-white via-sky-50/30 to-amber-50/20 p-6 sm:p-8 shadow-xl ${className}`}>
      {/* Decorative ambient gradient backdrop */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-sky-400/10 to-yellow-300/10 blur-2xl" />

      {/* 1. Header with Badge & Adaptive AI Tag */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25">
            <Compass size={24} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-full border border-sky-200">
                AI Scientific Intelligence Engine
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <Zap size={10} /> Active Guidance
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
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
      <div className="relative z-10 my-6 rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/80 p-4 sm:p-5 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black shadow-xs">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
                Diagnostic Knowledge Gap Identified
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                Confidence: 94.2%
              </span>
            </div>
            <p className="mt-1 text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Based on your recent tests, your knowledge gap is{' '}
              <span className="underline decoration-amber-500 decoration-2 font-black text-amber-900">
                {detectedKnowledgeGap.topic}: {detectedKnowledgeGap.subtopic}
              </span>
              .
            </p>
            <p className="mt-1 text-xs text-amber-950/80 font-medium">
              We identified a 28% variance in first-principles recall during recent diagnostic assessments.
              Your customized adaptive mission below is formatted specifically for your preference: <strong className="font-bold">{prefDetails.label}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Personalized Mission Card (Adaptive Recommendation) */}
      <div className="relative z-10 rounded-2xl border border-sky-200 bg-white p-5 sm:p-6 shadow-md transition-all hover:border-sky-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-sky-100 text-sky-800 text-[10px] font-black uppercase px-2 py-0.5">
                Personalized Mission · {activeMissionTask.adaptiveSequenceBadge || 'Day 1'}
              </span>
              <span className="rounded-md bg-yellow-100 text-yellow-900 text-[10px] font-bold px-2 py-0.5">
                +{activeMissionTask.xpReward} XP Reward
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {activeMissionTask.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              <strong className="text-sky-900 font-bold">Tailored Objective:</strong>{' '}
              {activeMissionTask.tailoredFocusTitle || activeMissionTask.goal}
            </p>

            {activeMissionTask.formula && (
              <div className="mt-2 flex items-center gap-2 font-mono text-xs font-black text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-fit">
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
      <div className="relative z-10 mt-6 pt-5 border-t border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-sky-600" />
            <span className="text-xs font-black text-slate-800">
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
                ? 'bg-sky-50 border-sky-300 shadow-xs'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Eye size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Visual Simulation</p>
                <p className="text-[9px] text-slate-400">3D Canvas & Optics</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-sky-700">{pcts.visual_simulation}%</span>
          </button>

          {/* Dimension 2: Textual Derivation */}
          <button
            type="button"
            onClick={() => recordInteraction('textual_derivation', 0.08, 'manual_boost')}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              topPreference === 'textual_derivation'
                ? 'bg-amber-50 border-amber-300 shadow-xs'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <BookOpen size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Textual Derivation</p>
                <p className="text-[9px] text-slate-400">Proofs & Core Laws</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-amber-700">{pcts.textual_derivation}%</span>
          </button>

          {/* Dimension 3: Numerical Practice */}
          <button
            type="button"
            onClick={() => recordInteraction('numerical_practice', 0.08, 'manual_boost')}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              topPreference === 'numerical_practice'
                ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Calculator size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Numerical Practice</p>
                <p className="text-[9px] text-slate-400">Sliders & Calculations</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-emerald-700">{pcts.numerical_practice}%</span>
          </button>
        </div>
      </div>
    </div>
  );
}
