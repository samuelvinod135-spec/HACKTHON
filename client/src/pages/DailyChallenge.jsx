import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  CheckCircle2,
  XCircle,
  Flame,
  ArrowRight,
  FlaskConical,
  Award,
  RotateCcw,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

export default function DailyChallenge() {
  const { student, record } = useProgress();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const challenge = {
    title: 'Equation Balancing: Combustion of Magnesium',
    xpReward: 50,
    prompt: 'Balance the chemical reaction when magnesium ribbon is ignited in atmospheric oxygen:',
    equation: '? Mg + ? O₂ → ? MgO',
    options: [
      { label: '1 Mg + 1 O₂ → 1 MgO', correct: false },
      { label: '2 Mg + 1 O₂ → 2 MgO', correct: true },
      { label: '2 Mg + 2 O₂ → 2 MgO', correct: false },
      { label: '1 Mg + 2 O₂ → 1 MgO', correct: false },
    ],
    explanation:
      'Oxygen gas exists as a diatomic molecule (O₂). Therefore, 2 atoms of Magnesium (2Mg) react with 1 molecule of O₂ to produce 2 formula units of Magnesium Oxide (2MgO), conserving mass on both sides.',
  };

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    setSubmitted(true);
    const isCorrect = challenge.options[selectedAnswer].correct;
    if (isCorrect) {
      setCompleted(true);
      await record({
        kind: 'daily-challenge',
        ref: 'Balance 2Mg + O₂ → 2MgO',
        xp: challenge.xpReward,
      });
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
          <Zap size={14} fill="currentColor" /> Daily Science Challenge
        </div>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {challenge.title}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Solve daily science puzzles to maintain your streak and earn bonus experience points.
        </p>
      </div>

      {/* Challenge Card */}
      <div className="lab-card p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Award size={16} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Today's Bonus</span>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200/60">
            +{challenge.xpReward} XP
          </span>
        </div>

        {/* Prompt */}
        <div className="mt-5">
          <p className="text-sm text-slate-700">{challenge.prompt}</p>

          <div className="my-5 rounded-xl bg-slate-50 py-4 px-6 text-center border border-slate-100">
            <span className="font-mono text-base sm:text-lg font-bold text-sky-800 tracking-wide">
              {challenge.equation}
            </span>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {challenge.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

              if (submitted) {
                if (opt.correct) {
                  btnClass = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-medium';
                } else if (isSelected && !opt.correct) {
                  btnClass = 'border-rose-300 bg-rose-50 text-rose-900';
                } else {
                  btnClass = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnClass = 'border-sky-500 bg-sky-50/60 text-sky-900 ring-1 ring-sky-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={submitted}
                  className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm transition ${btnClass}`}
                >
                  <span className="font-mono">{opt.label}</span>
                  {submitted && opt.correct && (
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  )}
                  {submitted && isSelected && !opt.correct && (
                    <XCircle size={18} className="text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action / Feedback */}
          <div className="mt-6">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full rounded-xl bg-yellow-400 py-3 text-xs sm:text-sm font-bold text-slate-900 shadow-xs transition hover:bg-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
              >
                Submit Answer
              </button>
            ) : completed ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                  <CheckCircle2 size={18} />
                  <span>Brilliant! You earned +{challenge.xpReward} XP!</span>
                </div>
                <p className="mt-2 text-xs text-emerald-700 leading-relaxed">
                  {challenge.explanation}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/chemistry"
                    className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-sky-700 transition"
                  >
                    <FlaskConical size={14} /> Open in Chemistry Lab
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Back to Dashboard <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-4">
                <div className="flex items-center gap-2 text-rose-800 font-semibold text-sm">
                  <XCircle size={18} />
                  <span>Not quite balanced yet</span>
                </div>
                <p className="mt-1 text-xs text-rose-700">
                  Remember that mass must be conserved: count the number of atoms of each element on both sides of the arrow.
                </p>
                <button
                  onClick={handleRetry}
                  className="mt-3 flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition"
                >
                  <RotateCcw size={13} /> Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
