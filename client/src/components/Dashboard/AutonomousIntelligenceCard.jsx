import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Compass,
  Award,
  FlaskConical,
  Atom,
  RefreshCw,
  ChevronRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { useAutonomousProfileStore } from '../../store/useAutonomousProfileStore.js';

export default function AutonomousIntelligenceCard({ className = '' }) {
  const navigate = useNavigate();
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('insights'); // 'insights' | 'path' | 'achievements'

  const {
    overallScore,
    overallExplanation,
    topicsMastery,
    weaknesses,
    strengths,
    trend,
    trendDelta,
    earlyWarnings,
    nextBestAction,
    learningPath,
    achievements,
    quizStats,
    labEvaluations,
    recordQuizResponse,
    recordLabInteraction,
  } = useAutonomousProfileStore();

  // Helper for trend badge
  const renderTrendBadge = () => {
    if (trend === 'rapid_improvement' || trend === 'improving') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
          <TrendingUp size={14} className="text-emerald-600" />
          <span>+{trendDelta > 0 ? trendDelta : 3} pts · Accelerating</span>
        </span>
      );
    }
    if (trend === 'declining' || trend === 'at_risk') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-xs">
          <TrendingDown size={14} className="text-rose-600" />
          <span>{trendDelta} pts · Needs Attention</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-700 border border-slate-300 shadow-xs">
        <Minus size={14} className="text-slate-500" />
        <span>Steady Trajectory</span>
      </span>
    );
  };

  // Color gradient for the circular health gauge
  const getScoreColor = (score) => {
    if (score >= 80) return { stroke: '#10b981', bg: 'from-emerald-500 to-teal-600', text: 'text-emerald-700' };
    if (score >= 65) return { stroke: '#0284c7', bg: 'from-sky-500 to-indigo-600', text: 'text-sky-700' };
    return { stroke: '#f59e0b', bg: 'from-amber-500 to-rose-600', text: 'text-amber-700' };
  };

  const scoreTheme = getScoreColor(overallScore);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 border-indigo-200/80 bg-gradient-to-br from-white via-sky-50/40 to-indigo-50/30 p-6 sm:p-8 shadow-xl transition-all ${className}`}
      id="autonomous-intelligence-card"
    >
      {/* Decorative ambient backdrop */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/15 via-indigo-400/10 to-amber-300/15 blur-3xl" />

      {/* 1. Header Bar: Autonomous AI Monitor Status */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100/80 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-500/25">
            <Brain size={26} className="animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-100/90 px-2.5 py-0.5 rounded-full border border-indigo-200">
                <Zap size={11} className="text-indigo-600" />
                100% Autonomous AI Progress Monitor
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                Zero Manual Input · Live Telemetry
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Cognitive Learning Health & Guidance
            </h2>
          </div>
        </div>

        {/* Dynamic Mode Switcher (Insights | Dynamic Path | Achievements) */}
        <div className="flex items-center gap-1 rounded-2xl border border-indigo-100 bg-white/90 p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'insights'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Insights & Gaps
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('path')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'path'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Learning Path ({learningPath.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Achievements ({achievements.length})
          </button>
        </div>
      </div>

      {/* 2. Top Metric Showcase: Overall Learning Health Score + Explainability */}
      <div className="relative z-10 my-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Dynamic Circular Health Gauge */}
        <div className="md:col-span-4 flex items-center gap-4 p-4 rounded-2xl bg-white/80 border border-indigo-100 shadow-sm">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
            {/* SVG Circular Progress */}
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeDasharray={`${overallScore}, 100`}
                strokeWidth="3.5"
                strokeDashoffset="0"
                strokeLinecap="round"
                stroke={scoreTheme.stroke}
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-slate-900 tracking-tight">{overallScore}</span>
              <span className="text-[9px] font-bold text-slate-400 -mt-1">/ 100</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Learning Health Score
            </span>
            <div className="mt-1">{renderTrendBadge()}</div>
            <p className="mt-1 text-[11px] font-medium text-slate-500 truncate">
              {quizStats.totalQuestionsAnswered} responses · {labEvaluations.length} lab runs
            </p>
          </div>
        </div>

        {/* Right: Explainable AI Rationale ("Why did my score change?") */}
        <div className="md:col-span-8 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/70">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Sparkles size={18} className="text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-900">
                  AI Autonomous Score Rationale
                </h4>
                <p className="mt-1 text-xs font-medium text-slate-700 leading-relaxed">
                  {overallExplanation}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowExplanationModal(!showExplanationModal)}
              className="shrink-0 text-indigo-700 hover:text-indigo-900 text-[11px] font-bold underline cursor-pointer"
            >
              {showExplanationModal ? 'Hide Breakdown' : 'View Formula'}
            </button>
          </div>

          {/* Collapsible Transparent Formula Details */}
          {showExplanationModal && (
            <div className="mt-3 pt-3 border-t border-indigo-200/60 text-[11px] text-slate-600 space-y-1">
              <p>
                • <strong>Bayesian Mastery Base:</strong> Average of all CBSE/NCERT curriculum domains ({Math.round(
                  Object.values(topicsMastery).reduce((acc, t) => acc + (t.score || 50), 0) /
                    Math.max(1, Object.keys(topicsMastery).length)
                )} pts).
              </p>
              <p>
                • <strong>Empirical Lab Bonus:</strong> Evaluated from {labEvaluations.length} interactive apparatus runs.
              </p>
              <p>
                • <strong>Practice Accuracy:</strong> {quizStats.accuracy}% correct across {quizStats.totalQuestionsAnswered} live questions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Multivariate Early Warning Banner (if triggered) */}
      {earlyWarnings && earlyWarnings.length > 0 && (
        <div className="relative z-10 mb-6 space-y-2">
          {earlyWarnings.map((warn) => (
            <div
              key={warn.id}
              className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-amber-300 bg-amber-50/95 text-amber-900 shadow-sm"
            >
              <ShieldAlert size={20} className="text-amber-600 shrink-0" />
              <div className="flex-1 text-xs">
                <span className="font-black uppercase tracking-wider mr-1.5 text-amber-950">
                  {warn.title}:
                </span>
                <span className="font-medium text-amber-800">{warn.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Centerpiece: AI Next-Best-Action (NBA) Direct Execution Banner */}
      {nextBestAction && (
        <div className="relative z-10 mb-6 rounded-2xl border-2 border-sky-300 bg-gradient-to-r from-sky-500 to-indigo-600 p-5 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white font-black shadow-xs">
                <Compass size={24} className="animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-200 bg-sky-900/40 px-2 py-0.5 rounded">
                    Autonomous Next Best Action
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded">
                    Priority: {nextBestAction.priority.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-1 leading-snug">
                  {nextBestAction.title}
                </h3>
                <p className="text-xs text-sky-100 mt-1 font-medium leading-relaxed max-w-2xl">
                  {nextBestAction.prompt}
                </p>
                {nextBestAction.whyExplanation && (
                  <p className="text-[11px] text-sky-200/90 mt-1 italic">
                    💡 Rationale: {nextBestAction.whyExplanation}
                  </p>
                )}
              </div>
            </div>

            <Link
              to={nextBestAction.link}
              className="clay-btn-yellow shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black text-slate-950 shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <span>{nextBestAction.buttonText}</span>
              <ArrowRight size={15} strokeWidth={3} />
            </Link>
          </div>
        </div>
      )}

      {/* 5. Tab Content Panes */}
      {activeTab === 'insights' && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Discovered Conceptual Weaknesses */}
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-rose-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-rose-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-950">
                    Discovered Conceptual Friction ({weaknesses.length})
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  Signature Matched
                </span>
              </div>

              {weaknesses.length === 0 ? (
                <div className="py-8 text-center text-xs font-medium text-slate-500">
                  <CheckCircle2 size={24} className="mx-auto text-emerald-500 mb-1" />
                  No recurring conceptual misconceptions detected. All verified competencies nominal.
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  {weaknesses.map((w) => (
                    <div
                      key={w.id}
                      className="p-3 rounded-xl bg-white/95 border border-rose-200 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                          {w.topic}
                        </span>
                        <span className="text-[10px] font-bold text-rose-600">
                          {w.evidenceCount} error signals
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-snug">
                        {w.label}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {w.explanation}
                      </p>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-rose-700">
                          AI: {w.whyExplanation}
                        </span>
                        <Link
                          to={w.remediationLink}
                          className="inline-flex items-center gap-1 text-[11px] font-black text-indigo-700 hover:text-indigo-900 underline"
                        >
                          <span>{w.remediationBtn}</span>
                          <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-rose-200/50 text-[10px] text-slate-500">
              * Inferred autonomously from incorrect answer selections and lab coordinate discrepancies.
            </div>
          </div>

          {/* Right Column: Verified Empirical Strengths */}
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                    Empirical Strengths ({strengths.length})
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  &gt;80% Retention
                </span>
              </div>

              {strengths.length === 0 ? (
                <div className="py-8 text-center text-xs font-medium text-slate-500">
                  Continue answering questions and calibrating labs to validate empirical strengths.
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  {strengths.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/95 border border-emerald-200 shadow-2xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {s.topic}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md">
                          {s.badge}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800">{s.label}</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{s.evidence}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/50 text-[10px] text-slate-500">
              * Validated through consistent high-accuracy responses and zero hesitation latency.
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Learning Path Stepper Tab */}
      {activeTab === 'path' && (
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              Individualized Cognitive Sequence (Calculated from live mastery gaps)
            </span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              Auto-Adaptive
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {learningPath.map((step) => (
              <div
                key={step.step}
                className={`p-4 rounded-2xl border transition-all ${
                  step.status === 'completed'
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                    : step.status === 'current'
                    ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-400/30'
                    : 'bg-white/80 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      step.status === 'completed'
                        ? 'bg-emerald-200 text-emerald-900'
                        : step.status === 'current'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {step.stage}
                  </span>
                  <span className="text-[11px] font-black text-slate-900">
                    {step.currentScore}
                  </span>
                </div>

                <h5 className="text-xs font-black text-slate-900 mt-2 leading-snug">
                  {step.title}
                </h5>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-500">Target: {step.targetScore}</span>
                  <Link
                    to={step.link}
                    className="inline-flex items-center gap-1 text-[11px] font-black text-indigo-700 hover:text-indigo-900"
                  >
                    <span>Launch</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empirical Autonomous Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              Autonomous Achievements Unlocked (Purely Earned from Telemetry Events)
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Zero Manual Assignment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.slug}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-indigo-100 shadow-2xs"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-2xl shadow-xs">
                  {ach.icon}
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-900">{ach.name}</h5>
                  <p className="text-[11px] font-medium text-slate-600 mt-0.5 leading-snug">
                    {ach.description}
                  </p>
                  <span className="text-[9px] font-bold text-slate-400">
                    Autonomous unlock: {new Date(ach.unlockedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Real-time Telemetry Simulator for Instant Visual Proof (Dev / Demo Mode) */}
      {import.meta.env.DEV && (
        <div className="relative z-10 mt-6 pt-4 border-t border-indigo-100/70 flex flex-wrap items-center justify-between gap-3 text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Live Autonomous Pipeline Test Harness:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() =>
                recordQuizResponse({
                  topic: 'Kinematics',
                  isCorrect: true,
                  difficulty: 2.0,
                  questionText: 'Calculated projectile range with correct g vector',
                })
              }
              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 cursor-pointer transition-colors"
            >
              + Answer Kinematics Correctly
            </button>
            <button
              onClick={() =>
                recordQuizResponse({
                  topic: 'Kinematics',
                  isCorrect: false,
                  difficulty: 1.5,
                  questionText: 'Vector direction sign of velocity during freefall downward',
                  pickedOption: 'Positive sign downwards',
                  notes: 'Sign convention confusion',
                })
              }
              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 cursor-pointer transition-colors"
            >
              - Trigger Kinematics Error
            </button>
            <button
              onClick={() =>
                recordLabInteraction({
                  topic: 'Ray Optics',
                  experimentName: 'Snell Law Refraction & Critical Angle Bench',
                  procedureScore: 96,
                  conceptScore: 92,
                  accuracyScore: 95,
                  link: '/physics',
                })
              }
              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 cursor-pointer transition-colors"
            >
              + Complete 96% Lab Run
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
