import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

const QUIZZES = [
  {
    id: 'chem-basics',
    subject: 'Chemistry Basics',
    color: 'from-blue-400 to-blue-600',
    questions: [
      { q: 'What is the chemical symbol for Magnesium?', options: ['M', 'Mg', 'Ma', 'Mn'], answer: 1 },
      { q: 'In 2Mg + O₂ → 2MgO, how many products are formed?', options: ['One', 'Two', 'Three', 'Four'], answer: 0 },
      { q: 'The reaction of Mg with O₂ is…', options: ['Endothermic', 'Exothermic', 'Neutral', 'Photosynthesis'], answer: 1 },
      { q: 'What state is MgO at room temperature?', options: ['Gas', 'Liquid', 'Solid', 'Plasma'], answer: 2 },
    ],
    xp: 80,
  },
  {
    id: 'physics-basics',
    subject: 'Physics Fundamentals',
    color: 'from-emerald-400 to-teal-500',
    questions: [
      { q: "Which law describes F = ma?", options: ["Newton's First", "Newton's Second", "Newton's Third", "Hooke's"], answer: 1 },
      { q: 'The SI unit of force is…', options: ['Watt', 'Joule', 'Newton', 'Pascal'], answer: 2 },
      { q: 'Energy of motion is called…', options: ['Potential', 'Gravitational', 'Chemical', 'Kinetic'], answer: 3 },
    ],
    xp: 70,
  },
];

export default function Quizzes() {
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [activeId, setActiveId] = useState(QUIZZES[0].id);
  const { record } = useProgress();

  const quiz = QUIZZES.find((q) => q.id === activeId) || QUIZZES[0];
  const total = quiz.questions.length;
  const question = quiz.questions[index];

  const choose = (optIdx) => {
    if (selected !== null) return;
    setSelected(optIdx);
    if (optIdx === question.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
      record({
        kind: 'quiz',
        ref: quiz.subject,
        xp: quiz.xp,
        achievements: score === total ? ['perfect-score'] : [],
      });
    }
  };

  const reset = () => {
    setSelected(null);
    setIndex(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-xl font-bold text-gray-900">Quizzes</h2>
      <p className="mt-0.5 text-xs text-gray-400">Test your science knowledge & earn XP</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {QUIZZES.map((q) => (
          <button
            key={q.id}
            onClick={() => { setActiveId(q.id); reset(); }}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
              activeId === q.id
                ? 'border-blue-200 bg-blue-50 shadow-sm'
                : 'border-gray-100 bg-white hover:bg-gray-50'
            }`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${q.color} text-white shadow-sm`}>
              <Trophy size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{q.subject}</p>
              <p className="text-[11px] text-gray-400">{q.questions.length} questions · +{q.xp} XP</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {!finished ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Question {index + 1} of {total}
              </span>
              <span className="text-xs text-gray-400">Score: {score}/{total}</span>
            </div>
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all"
                style={{ width: `${((index + (selected !== null ? 1 : 0)) / total) * 100}%` }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{question.q}</h3>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {question.options.map((opt, i) => {
                let cls = 'border-gray-200 bg-gray-50 hover:bg-gray-100';
                if (selected !== null) {
                  if (i === question.answer) cls = 'border-green-300 bg-green-50';
                  else if (i === selected) cls = 'border-red-300 bg-red-50';
                  else cls = 'border-gray-100 bg-gray-50 opacity-50';
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={selected !== null}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium text-gray-800 transition ${cls}`}
                  >
                    {opt}
                    {selected !== null && i === question.answer && <CheckCircle2 size={18} className="text-green-500" />}
                    {selected !== null && i === selected && i !== question.answer && <XCircle size={18} className="text-red-500" />}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <button
                onClick={next}
                className="mt-4 w-full rounded-xl bg-yellow-400 py-2.5 text-sm font-bold text-gray-900 shadow-sm shadow-yellow-200/60 transition hover:shadow-md hover:shadow-yellow-200/80"
              >
                {index + 1 < total ? 'Next Question' : 'Finish Quiz →'}
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <Trophy size={48} className="text-yellow-400" />
            <h3 className="mt-3 text-xl font-bold text-gray-900">Quiz Complete!</h3>
            <p className="mt-1 text-sm text-gray-500">
              You scored <span className="font-bold text-blue-600">{score}/{total}</span> on {quiz.subject}
            </p>
            <p className="mt-1 text-xs font-medium text-emerald-600">+{quiz.xp} XP earned</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
              >
                <RotateCcw size={14} /> Retake
              </button>
              <button
                onClick={() => {
                  setActiveId(activeId === QUIZZES[0].id ? QUIZZES[1].id : QUIZZES[0].id);
                  reset();
                }}
                className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-900 shadow-sm shadow-yellow-200/60 transition hover:shadow-md"
              >
                Try Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
