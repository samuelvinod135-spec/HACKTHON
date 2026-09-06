import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Calendar,
  Clock,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WEAK_CONCEPTS = [
  {
    id: 'thermo_1',
    chapter: 'Thermodynamics',
    topic: 'Carnot Engine Efficiency & Entropy',
    subject: 'Physics',
    retentionPct: 42,
    decayHours: 4,
    status: 'High Review Need',
    microQuizQuestions: 5,
  },
  {
    id: 'chem_stoich',
    chapter: 'Stoichiometry',
    topic: 'Limiting Reactants & Percent Yield',
    subject: 'Chemistry',
    retentionPct: 58,
    decayHours: 12,
    status: 'Upcoming Decay',
    microQuizQuestions: 5,
  },
  {
    id: 'optics_lens',
    chapter: 'Ray Optics',
    topic: 'Lens Maker Formula & Refraction Index',
    subject: 'Physics',
    retentionPct: 64,
    decayHours: 28,
    status: 'Optimal Review Window',
    microQuizQuestions: 5,
  },
  {
    id: 'chem_electro',
    chapter: 'Electrochemistry',
    topic: 'Nernst Equation & Cell Potential (E°)',
    subject: 'Chemistry',
    retentionPct: 71,
    decayHours: 48,
    status: 'Solid Retention',
    microQuizQuestions: 5,
  },
];

const CALENDAR_DAYS = [
  { day: 'Mon', date: 'Sept 1', sessions: 2, level: 3 },
  { day: 'Tue', date: 'Sept 2', sessions: 4, level: 4 },
  { day: 'Wed', date: 'Sept 3', sessions: 1, level: 2 },
  { day: 'Thu', date: 'Sept 4', sessions: 3, level: 3 },
  { day: 'Fri', date: 'Sept 5', sessions: 5, level: 4 },
  { day: 'Sat', date: 'Sept 6', sessions: 2, level: 2 },
  { day: 'Sun', date: 'Sept 7', sessions: 0, level: 0 },
];

export default function SpacedRepetitionPage() {
  const [reviewedConcepts, setReviewedConcepts] = useState({});
  const [activeQuizModal, setActiveQuizModal] = useState(null);

  const handleReviewNow = (concept) => {
    setActiveQuizModal(concept);
  };

  const handleFinishMicroQuiz = (conceptId) => {
    setReviewedConcepts((prev) => ({ ...prev, [conceptId]: true }));
    setActiveQuizModal(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-slate-950 shadow-md border-b-4 border-amber-400">
            <Brain size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Predictive "Forgetting Curve" Dashboard
              </h1>
              <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-sky-200">
                Spaced Repetition
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ebbinghaus spaced repetition memory model targeting conceptual retention before memory decay.
            </p>
          </div>
        </div>
      </div>

      {/* Main Spaced Repetition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Retention Curve & Heatmap */}
        <div className="clay-card lg:col-span-7 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-sky-100">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Spaced Repetition Review & Retention Curve
              </h3>
              <p className="text-[11px] text-slate-500">
                Mathematical decay curve tracking memory strength over time
              </p>
            </div>
            <span className="text-[10px] font-mono font-black text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
              Retention: 78% Avg
            </span>
          </div>

          {/* SVG Ebbinghaus Retention Curve Visualizer (Clay White Canvas) */}
          <div className="relative rounded-2xl border-2 border-sky-100 bg-sky-50/40 p-4 overflow-hidden text-slate-800 shadow-inner">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold mb-2">
              <span>Memory Retention (%)</span>
              <span>Time Elapsed (Days)</span>
            </div>

            <svg className="w-full h-44" viewBox="0 0 500 160">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#bae6fd" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#bae6fd" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#bae6fd" strokeWidth="1" strokeDasharray="4,4" />

              {/* Natural Decay Without Review (Banana Yellow Dashed Curve) */}
              <path
                d="M 40 20 Q 120 120 480 145"
                fill="none"
                stroke="#facc15"
                strokeWidth="3"
                strokeDasharray="6,4"
              />

              {/* Retention with Spaced Repetition (Sky Blue Solid Peaks) */}
              <path
                d="M 40 20 Q 100 80 140 30 Q 220 70 260 25 Q 360 55 480 35"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="3.5"
              />

              {/* Data Points */}
              <circle cx="140" cy="30" r="6" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
              <circle cx="260" cy="25" r="6" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
              <circle cx="480" cy="35" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="2" />

              <text x="145" y="48" fill="#0369a1" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Review 1
              </text>
              <text x="265" y="43" fill="#0369a1" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Review 2
              </text>
              <text x="430" y="55" fill="#854d0e" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Mastery (95%)
              </text>
            </svg>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 pt-2 border-t border-sky-200">
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Natural Decay (Without Review)
              </span>
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Spaced Boost (With LabXplore)
              </span>
            </div>
          </div>

          {/* Calendar Heatmap */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-sky-600" />
                <span>Upcoming Review Heatmap</span>
              </span>
              <span className="text-[11px] text-slate-400">Next 7 Days</span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-1">
              {CALENDAR_DAYS.map((d) => (
                <div
                  key={d.day}
                  className={`rounded-2xl border p-2.5 text-center flex flex-col items-center justify-between shadow-2xs transition ${
                    d.level === 4
                      ? 'bg-amber-300 text-slate-950 border-amber-400 font-bold'
                      : d.level === 3
                      ? 'bg-sky-100 text-sky-900 border-sky-200'
                      : d.level === 2
                      ? 'bg-sky-50 text-sky-800 border-sky-100'
                      : 'bg-white text-slate-400 border-slate-100'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">{d.day}</span>
                  <span className="text-xs font-black my-1">{d.date.split(' ')[1]}</span>
                  <span className="text-[9px] font-semibold opacity-90">{d.sessions} revs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weak Concepts Card with Review Now (5 Min) */}
        <div className="clay-card lg:col-span-5 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-100">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Zap size={16} className="text-amber-500 fill-amber-400" />
                <span>Weak Concepts Requiring Review</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Prioritized by Ebbinghaus forgetting rate
              </p>
            </div>
            <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
              {WEAK_CONCEPTS.length} Topics
            </span>
          </div>

          <div className="space-y-3">
            {WEAK_CONCEPTS.map((concept) => {
              const isReviewed = reviewedConcepts[concept.id];
              return (
                <div
                  key={concept.id}
                  className={`rounded-2xl border p-4 transition shadow-2xs ${
                    isReviewed
                      ? 'border-sky-300 bg-sky-50/60'
                      : 'border-sky-100 bg-white hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-wide rounded-full bg-sky-100 px-2 py-0.5 text-sky-800 border border-sky-200">
                          {concept.subject}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {concept.chapter}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700 mt-1">
                        {concept.topic}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-black text-slate-900">
                        {isReviewed ? '95%' : `${concept.retentionPct}%`}
                      </span>
                      <p className="text-[9px] text-slate-400 font-bold">retention</p>
                    </div>
                  </div>

                  {/* Progress Bar (Banana Yellow to Sky Blue) */}
                  <div className="mt-3 h-2 w-full rounded-full bg-sky-50 border border-sky-200 overflow-hidden p-0.5 shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 shadow-xs"
                      style={{ width: `${isReviewed ? 95 : concept.retentionPct}%` }}
                    />
                  </div>

                  {/* Action Button */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-sky-100">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                      <Clock size={11} /> Review in {concept.decayHours}h
                    </span>

                    {isReviewed ? (
                      <span className="flex items-center gap-1 text-xs font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                        <CheckCircle2 size={13} /> Mastered Today (+50 XP)
                      </span>
                    ) : (
                      <button
                        onClick={() => handleReviewNow(concept)}
                        className="clay-btn-yellow flex items-center gap-1 px-4 py-1.5 text-xs font-black text-slate-950 shadow-xs active:scale-95 transition"
                      >
                        <Zap size={12} />
                        <span>Review Now (5 Min)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Micro-Quiz Modal */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="clay-card w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 border-2 border-sky-200">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  5-Min Spaced Micro-Quiz
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">{activeQuizModal.topic}</h3>
              </div>
              <button
                onClick={() => setActiveQuizModal(null)}
                className="clay-btn-circle flex h-7 w-7 items-center justify-center text-slate-400 hover:text-slate-700 font-bold"
              >
                <X size={15} />
              </button>
            </div>

            <div className="rounded-2xl bg-sky-50/50 p-4 border border-sky-100 space-y-2">
              <span className="text-xs font-bold text-slate-500">Quick Retention Check</span>
              <p className="text-sm font-semibold text-slate-900">
                In a Carnot cycle operating between reservoir temperatures T_hot and T_cold, what is the theoretical maximum thermal efficiency η?
              </p>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={() => handleFinishMicroQuiz(activeQuizModal.id)}
                  className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3 text-left text-xs font-black text-slate-950 hover:bg-amber-100 transition shadow-xs"
                >
                  ✓ η = 1 - (T_cold / T_hot)
                </button>
                <button
                  onClick={() => handleFinishMicroQuiz(activeQuizModal.id)}
                  className="rounded-xl border border-sky-100 bg-white p-3 text-left text-xs text-slate-700 hover:bg-sky-50 transition"
                >
                  η = (T_hot + T_cold) / T_hot
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleFinishMicroQuiz(activeQuizModal.id)}
                className="clay-btn-yellow px-6 py-2.5 text-xs font-black text-slate-950 shadow-md"
              >
                Submit Micro-Quiz (+50 XP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
