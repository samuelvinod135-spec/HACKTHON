import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Database,
  Sparkles,
  BookOpen,
  Filter,
  Zap,
  ArrowRight,
  Info,
  Pin,
  Bot,
  BookmarkCheck,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { fetchQuizQuestions, fetchQuestionBankChapters } from '../supabase.js';

const POPULAR_CHAPTERS = [
  { id: 'Kinematics', name: 'Kinematics', subject: 'Physics', count: '500+', desc: '1D & 2D Motion, Projectiles, Circular Motion' },
  { id: 'Units & Measurements', name: 'Units & Measurements', subject: 'Physics', count: '500+', desc: 'Dimensions, Significant Figures & Errors' },
  { id: 'Laws of Motion', name: 'Laws of Motion', subject: 'Physics', count: '500+', desc: 'Newton Laws, Friction & Free Body Diagrams' },
  { id: 'Chemical Bonding & Molecular Structure', name: 'Chemical Bonding', subject: 'Chemistry', count: '500+', desc: 'VSEPR, Hybridization & MO Theory' },
  { id: 'Equilibrium', name: 'Equilibrium', subject: 'Chemistry', count: '500+', desc: 'Le Chatelier, pH & Solubility Products' },
  { id: 'Redox Reactions & Electrochemistry', name: 'Electrochemistry', subject: 'Chemistry', count: '500+', desc: 'Galvanic Cells, Nernst Eq & Faraday Laws' },
];

export default function Quizzes() {
  const [selectedChapter, setSelectedChapter] = useState('Kinematics');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [pinnedQuestions, setPinnedQuestions] = useState({}); // { [qId]: boolean }

  // Toast
  const [toast, setToast] = useState(null);

  // Chapters list from database
  const [availableChapters, setAvailableChapters] = useState([]);

  const { record } = useProgress();

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Load available chapters from database on mount
  useEffect(() => {
    fetchQuestionBankChapters()
      .then((data) => {
        if (data && data.length > 0) {
          setAvailableChapters(data);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch 10 random questions whenever chapter changes or retry triggered
  const loadQuiz = async (chapterToLoad) => {
    const chapterName = chapterToLoad || selectedChapter;
    setLoading(true);
    setError(null);
    setSelectedOption(null);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setShowExplanation(false);

    try {
      const fetched = await fetchQuizQuestions({ chapter: chapterName, limit: 10 });
      if (!fetched || fetched.length === 0) {
        throw new Error(`No questions found in Supabase Question Bank for "${chapterName}".`);
      }
      setQuestions(fetched);
    } catch (err) {
      console.error('Quiz fetch error:', err);
      setError(err.message || 'Failed to fetch questions from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz(selectedChapter);
  }, [selectedChapter]);

  const total = questions.length;
  const currentQ = questions[currentIndex];

  // Map database columns to options list
  const getOptions = (q) => {
    if (!q) return [];
    return [
      { key: 'A', text: q.option_a || q.option_A || '' },
      { key: 'B', text: q.option_b || q.option_B || '' },
      { key: 'C', text: q.option_c || q.option_C || '' },
      { key: 'D', text: q.option_d || q.option_D || '' },
    ];
  };

  const handleChoose = (optionKey) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(optionKey);
    setShowExplanation(true);

    const isCorrect = optionKey.toUpperCase() === (currentQ.correct_option || '').toUpperCase();
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      const earnedXp = (score + 1) * 10;
      record({
        kind: 'quiz',
        ref: `${selectedChapter} Quiz`,
        xp: earnedXp,
        achievements: score === total ? ['perfect-score'] : [],
      });
    }
  };

  const handleReset = () => {
    loadQuiz(selectedChapter);
  };

  // -------------------------------------------------------------
  // ASK AI TO EXPLAIN QUESTION IN BRIEF
  // -------------------------------------------------------------
  const handleAskAiToExplain = () => {
    if (!currentQ) return;

    window.dispatchEvent(
      new CustomEvent('labxplore:ask-ai', {
        detail: {
          id: currentQ.id,
          question: currentQ.question,
          chapter: currentQ.chapter,
          subject: currentQ.subject,
          options: getOptions(currentQ),
          answer: `${currentQ.correct_option} (${currentQ.answer})`,
          explanation: currentQ.explanation,
        },
      })
    );
    showToastMsg('🤖 Sent to AI Assistant for brief explanation!');
  };

  // -------------------------------------------------------------
  // PIN QUESTION TO NOTEPAD
  // -------------------------------------------------------------
  const handlePinQuestion = () => {
    if (!currentQ) return;

    const qId = currentQ.id;
    setPinnedQuestions((prev) => ({ ...prev, [qId]: true }));

    window.dispatchEvent(
      new CustomEvent('labxplore:pin-note', {
        detail: {
          id: currentQ.id,
          question: currentQ.question,
          chapter: currentQ.chapter,
          subject: currentQ.subject,
          options: getOptions(currentQ).map((o) => `${o.key}: ${o.text}`),
          answer: currentQ.answer,
          correct_option: currentQ.correct_option,
          explanation: currentQ.explanation,
          studentComment: 'Question pinned because concept was difficult to understand. Review later.',
        },
      })
    );
    showToastMsg('📌 Question pinned to your Notepad! Check Chatbot > Notes tab.');
  };

  const isCurrentPinned = currentQ ? !!pinnedQuestions[currentQ.id] : false;

  return (
    <div className="mx-auto max-w-4xl space-y-6 relative">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-4 py-2.5 text-xs font-bold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3 duration-200">
          <Sparkles size={14} className="text-amber-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-700 mb-2">
            <Database size={13} className="text-sky-600" />
            Supabase Question Bank · 25,000 Questions Available
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Chapter Quizzes</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Queries live Supabase Question Bank: 10 random questions per chapter test
          </p>
        </div>

        {/* 1-Click Kinematics requirement preset */}
        <button
          onClick={() => {
            setSelectedChapter('Kinematics');
            loadQuiz('Kinematics');
          }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs ${
            selectedChapter === 'Kinematics'
              ? 'bg-sky-600 text-white ring-2 ring-sky-300'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Zap size={14} className={selectedChapter === 'Kinematics' ? 'text-amber-300' : 'text-sky-600'} />
          <span>Quiz: Kinematics (10 Questions)</span>
        </button>
      </div>

      {/* Chapter Selector Tabs / Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Filter size={13} /> Select Topic / Chapter
          </label>
          {availableChapters.length > 0 && (
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="text-xs rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-slate-700 focus:border-sky-500 focus:outline-none"
            >
              <option value="">-- All 61 Chapters --</option>
              {availableChapters.map((c) => (
                <option key={`${c.subject}-${c.chapter}`} value={c.chapter}>
                  {c.subject}: {c.chapter} ({c.count} Qs)
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {POPULAR_CHAPTERS.map((ch) => {
            const isSelected = selectedChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? 'border-sky-400 bg-sky-50 shadow-xs ring-2 ring-sky-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      ch.subject === 'Physics'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {ch.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">10 Qs</span>
                </div>
                <p className="text-xs font-bold text-slate-900 line-clamp-1">{ch.name}</p>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{ch.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quiz Card */}
      <div className="lab-card p-6 border border-slate-200 bg-white shadow-sm rounded-2xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
            <p className="text-sm font-semibold text-slate-700">
              Querying Supabase: "Fetch 10 random questions where chapter = '{selectedChapter}'"
            </p>
            <p className="text-xs text-slate-400">Selecting randomized subset from {selectedChapter} collection...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <XCircle size={36} className="text-rose-500" />
            <p className="text-sm font-bold text-rose-700">{error}</p>
            <button
              onClick={handleReset}
              className="mt-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700"
            >
              Retry Database Query
            </button>
          </div>
        ) : !finished && currentQ ? (
          <>
            {/* Quiz progress bar & meta */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Question {currentIndex + 1} of {total}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  {currentQ.exam_level || 'Main'}
                </span>
                <span className="rounded bg-amber-50 text-amber-700 px-2 py-0.5 text-[10px] font-semibold border border-amber-200">
                  +{currentQ.xp || 10} XP
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Score: <strong className="text-slate-800">{score}</strong>/{total}
              </span>
            </div>

            <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-500 transition-all duration-300"
                style={{ width: `${((currentIndex + (selectedOption !== null ? 1 : 0)) / total) * 100}%` }}
              />
            </div>

            {/* Question title & Quick Actions (Ask AI + Pin to Notes) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="text-xs font-medium text-slate-400">
                {currentQ.subject} · {currentQ.chapter} · {currentQ.topic || 'General'}
              </div>

              {/* ACTION BUTTONS: Ask AI & Pin to Notes */}
              <div className="flex items-center gap-2">
                {/* 1. Ask AI to Explain in Brief */}
                <button
                  onClick={handleAskAiToExplain}
                  className="flex items-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 shadow-2xs hover:bg-sky-100 transition active:scale-95"
                  title="Can't understand? Tap to get an immediate brief explanation from Science Chatbot"
                >
                  <Bot size={14} className="text-sky-600" />
                  <span>Ask AI to Explain in Brief</span>
                </button>

                {/* 2. Pin to Notes (Question Pointer) */}
                <button
                  onClick={handlePinQuestion}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold shadow-2xs transition active:scale-95 ${
                    isCurrentPinned
                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title="Point out and pin this question to your Notepad so you can search and review it later"
                >
                  {isCurrentPinned ? (
                    <>
                      <BookmarkCheck size={14} className="text-amber-600" />
                      <span>Pinned to Notes</span>
                    </>
                  ) : (
                    <>
                      <Pin size={13} className="text-slate-400" />
                      <span>Pin to Notes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options grid */}
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {getOptions(currentQ).map((opt) => {
                const optKey = opt.key;
                const isSelected = selectedOption === optKey;
                const isCorrect = optKey === (currentQ.correct_option || '').toUpperCase();

                let btnCls = 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800';
                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnCls = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-300';
                  } else if (isSelected) {
                    btnCls = 'border-rose-300 bg-rose-50 text-rose-900 ring-1 ring-rose-300';
                  } else {
                    btnCls = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optKey}
                    onClick={() => handleChoose(optKey)}
                    disabled={selectedOption !== null}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-xs sm:text-sm transition ${btnCls}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200 font-bold text-xs text-slate-700">
                        {optKey}
                      </span>
                      <span>{opt.text}</span>
                    </div>

                    {selectedOption !== null && isCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0 ml-2" />
                    )}
                    {selectedOption !== null && isSelected && !isCorrect && (
                      <XCircle size={18} className="text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {showExplanation && (
              <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-xs sm:text-sm text-slate-700 animate-in fade-in duration-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sky-800">
                    <Info size={15} />
                    <span>Correct Answer: Option {currentQ.correct_option} ({currentQ.answer})</span>
                  </div>
                  <button
                    onClick={handleAskAiToExplain}
                    className="flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:underline"
                  >
                    <Bot size={13} /> Still unclear? Ask AI for detailed derivation
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentQ.explanation || 'Fundamental physical principles and dimensional analysis govern this question.'}
                </p>
              </div>
            )}

            {/* Next / Finish action */}
            {selectedOption !== null && (
              <button
                onClick={handleNext}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 text-xs sm:text-sm font-bold text-slate-900 shadow-xs transition hover:bg-yellow-500"
              >
                <span>{currentIndex + 1 < total ? 'Next Question' : 'Finish Quiz & Claim XP'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </>
        ) : (
          /* Finished State */
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mb-3 ring-8 ring-amber-50/50">
              <Trophy size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Quiz Completed!</h3>
            <p className="mt-1 text-sm text-slate-600">
              You scored <strong className="text-sky-700 text-base">{score}/{total}</strong> on{' '}
              <strong className="text-slate-900">{selectedChapter}</strong>
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
              <Sparkles size={14} />
              +{(score + 1) * 10} XP Added to Student Profile
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
              >
                <RotateCcw size={14} /> Fetch New 10 Questions
              </button>
              <button
                onClick={() => {
                  const nextChap =
                    selectedChapter === 'Kinematics' ? 'Chemical Bonding & Molecular Structure' : 'Kinematics';
                  setSelectedChapter(nextChap);
                }}
                className="rounded-xl bg-yellow-400 px-5 py-2.5 text-xs font-bold text-slate-900 shadow-xs transition hover:bg-yellow-500"
              >
                Try Another Chapter →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Query Documentation Banner */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex items-start gap-3">
          <Database size={18} className="text-sky-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Active Supabase Question Bank Query
            </h4>
            <code className="text-xs font-mono text-sky-800 bg-white border border-slate-200 px-2 py-1 rounded inline-block">
              supabase.from('question_bank').select('*').eq('chapter', '{selectedChapter}').limit(10)
            </code>
            <p className="text-xs text-slate-500">
              Need help with any question? Tap <b>"Ask AI to Explain in Brief"</b> to automatically launch the Science Chatbot with step-by-step guidance!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
