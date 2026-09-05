import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Calendar,
  Clock,
  AlertCircle,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  RotateCcw,
  Sparkles,
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
    status: 'High Decay Risk',
    color: 'rose',
    microQuizQuestions: 5,
  },
  {
    id: 'chem_stoich',
    chapter: 'Stoichiometry',
    topic: 'Limiting Reactants & Percent Yield',
    subject: 'Chemistry',
    retentionPct: 58,
    decayHours: 12,
    status: 'Moderate Decay',
    color: 'amber',
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
    color: 'sky',
    microQuizQuestions: 5,
  },
  {
    id: 'chem_electro',
    chapter: 'Electrochemistry',
    topic: 'Nernst Equation & Cell Potential (E°)',
    subject: 'Chemistry',
    retentionPct: 71,
    decayHours: 48,
    status: 'Review Upcoming',
    color: 'indigo',
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <Brain size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Predictive "Forgetting Curve" Dashboard
              </h1>
              <span className="rounded-full bg-indigo-100 text-indigo-800 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-indigo-200">
                Hackathon Feature 4
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ebbinghaus spaced repetition memory model targeting conceptual retention before memory decay.
            </p>
          </div>
        </div>
      </div>

      {/* Main Spaced Repetition Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Retention Curve & Heatmap */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Spaced Repetition Review & Retention Curve
              </h3>
              <p className="text-[11px] text-slate-500">
                Mathematical decay curve tracking memory strength over time
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Retention: 78% Avg
            </span>
          </div>

          {/* SVG Ebbinghaus Retention Curve Visualizer */}
          <div className="relative rounded-2xl bg-slate-950 p-4 overflow-hidden text-white">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-2">
              <span>Memory Retention (%)</span>
              <span>Time Elapsed (Days)</span>
            </div>

            <svg className="w-full h-40" viewBox="0 0 500 160">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />

              {/* Decay without review (Red drop) */}
              <path
                d="M 40 20 Q 120 120 480 145"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="4,3"
              />

              {/* Retention with Spaced Repetition (Green peaks) */}
              <path
                d="M 40 20 Q 100 80 140 30 Q 220 70 260 25 Q 360 55 480 35"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
              />

              {/* Data points */}
              <circle cx="140" cy="30" r="5" fill="#38bdf8" />
              <circle cx="260" cy="25" r="5" fill="#38bdf8" />
              <circle cx="480" cy="35" r="5" fill="#10b981" />

              <text x="145" y="45" fill="#38bdf8" fontSize="10" fontFamily="monospace">Review 1</text>
              <text x="265" y="40" fill="#38bdf8" fontSize="10" fontFamily="monospace">Review 2</text>
              <text x="440" y="55" fill="#10b981" fontSize="10" fontFamily="monospace">Mastery</text>
            </svg>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500" /> Natural Decay (Without Review)
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> Spaced Boost (With LabXplore)
              </span>
            </div>
          </div>

          {/* Calendar Heatmap */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-indigo-600" />
                <span>Upcoming Review Heatmap</span>
              </span>
              <span className="text-[11px] text-slate-400">Next 7 Days</span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-1">
              {CALENDAR_DAYS.map((d) => (
                <div
                  key={d.day}
                  className={`rounded-xl border p-2.5 text-center flex flex-col items-center justify-between ${
                    d.level === 4
                      ? 'bg-indigo-600 text-white border-indigo-700'
                      : d.level === 3
                      ? 'bg-indigo-100 text-indigo-900 border-indigo-200'
                      : d.level === 2
                      ? 'bg-slate-100 text-slate-800 border-slate-200'
                      : 'bg-white text-slate-400 border-slate-100'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">{d.day}</span>
                  <span className="text-xs font-black my-1">{d.date.split(' ')[1]}</span>
                  <span className="text-[9px] font-semibold opacity-90">
                    {d.sessions} revs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weak Concepts Card with Review Now (5 Min) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle size={16} className="text-rose-500" />
                <span>Weak Concepts Requiring Review</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Algorithmically prioritized by forgetting risk
              </p>
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              {WEAK_CONCEPTS.length} Topics
            </span>
          </div>

          <div className="space-y-3">
            {WEAK_CONCEPTS.map((concept) => {
              const isReviewed = reviewedConcepts[concept.id];
              return (
                <div
                  key={concept.id}
                  className={`rounded-2xl border p-4 transition ${
                    isReviewed
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : concept.retentionPct < 50
                      ? 'border-rose-200 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-extrabold uppercase tracking-wide rounded bg-slate-200 px-1.5 py-0.5 text-slate-700">
                          {concept.subject}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {concept.chapter}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-600 mt-1">
                        {concept.topic}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-black text-slate-900">
                        {isReviewed ? '95%' : `${concept.retentionPct}%`}
                      </span>
                      <p className="text-[9px] text-slate-400">retention</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isReviewed
                          ? 'bg-emerald-500'
                          : concept.retentionPct < 50
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${isReviewed ? 95 : concept.retentionPct}%` }}
                    />
                  </div>

                  {/* Action Button */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/50">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <Clock size={11} /> Review in {concept.decayHours}h
                    </span>

                    {isReviewed ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle2 size={13} /> Mastered Today
                      </span>
                    ) : (
                      <button
                        onClick={() => handleReviewNow(concept)}
                        className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-500 active:scale-95 transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600">5-Min Spaced Micro-Quiz</span>
                <h3 className="text-base font-bold text-slate-900">{activeQuizModal.topic}</h3>
              </div>
              <button
                onClick={() => setActiveQuizModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500">Quick Retention Check</span>
              <p className="text-sm font-semibold text-slate-900">
                In a Carnot cycle operating between reservoir temperatures T_hot and T_cold, what is the theoretical maximum thermal efficiency η?
              </p>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={() => handleFinishMicroQuiz(activeQuizModal.id)}
                  className="rounded-xl border border-indigo-300 bg-indigo-50 p-3 text-left text-xs font-bold text-indigo-900 hover:bg-indigo-100"
                >
                  ✓ η = 1 - (T_cold / T_hot)
                </button>
                <button
                  onClick={() => handleFinishMicroQuiz(activeQuizModal.id)}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-left text-xs text-slate-700 hover:bg-slate-50"
                >
                  η = (T_hot + T_cold) / T_hot
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleFinishMicroQuiz(activeQuizModal.id)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                Submit Micro-Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
