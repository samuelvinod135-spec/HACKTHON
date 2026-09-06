import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  Timer,
  Check,
  Lightbulb,
  Award,
  Database,
  Flag,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Layers,
  BarChart3,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { MOCK_TEST_QUESTIONS, CONCEPTS } from '../mockTestData.js';
import { fetchMockTestQuestions } from '../supabase.js';
import { sounds } from '../utils/soundEffects.js';

export default function MockTests() {
  const { record } = useProgress();

  // Test Mode in INTRO: 'QB_50' (Supabase Question Bank 50-Q Test) | 'ADAPTIVE_10' (Diagnostic Intervention)
  const [testMode, setTestMode] = useState('QB_50');

  // Test Flow States:
  // 'INTRO'
  // 'QB_TESTING' | 'QB_COMPLETED' (50 Questions from Supabase)
  // 'TESTING' | 'INTERVENTION' | 'REMEDIATION' | 'COMPLETED' (10-Q Adaptive Diagnostic)
  const [phase, setPhase] = useState('INTRO');

  // Timer state
  const [elapsedSec, setElapsedSec] = useState(0);

  // -------------------------------------------------------------
  // 1. SUPABASE QUESTION BANK 50-Q TEST STATE
  // -------------------------------------------------------------
  const [examLevel, setExamLevel] = useState('Main-Moderate'); // Default requirement
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [qbQuestions, setQbQuestions] = useState([]);
  const [qbLoading, setQbLoading] = useState(false);
  const [qbError, setQbError] = useState(null);
  const [qbCurrentIndex, setQbCurrentIndex] = useState(0);
  const [qbAnswers, setQbAnswers] = useState({}); // { [index]: 'A' | 'B' | 'C' | 'D' }
  const [qbFlags, setQbFlags] = useState({}); // { [index]: boolean }
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // -------------------------------------------------------------
  // 2. 10-QUESTION ADAPTIVE DIAGNOSTIC STATE
  // -------------------------------------------------------------
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [activeIntervention, setActiveIntervention] = useState(null);
  const [remedialQuestions, setRemedialQuestions] = useState([]);
  const [remedialIndex, setRemedialIndex] = useState(0);
  const [remedialSelected, setRemedialSelected] = useState(null);
  const [remedialSubmitted, setRemedialSubmitted] = useState(false);
  const [remedialScore, setRemedialScore] = useState(0);
  const [remediatedConcepts, setRemediatedConcepts] = useState([]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (phase === 'QB_TESTING' || phase === 'TESTING' || phase === 'REMEDIATION') {
      interval = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);

  const fmtTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // SUPABASE 50-Q MOCK TEST HANDLERS
  // -------------------------------------------------------------
  const handleStartQbTest = async () => {
    setQbLoading(true);
    setQbError(null);
    sounds.playSimStart();

    try {
      // Direct query to Supabase: Fetch 50 random questions where exam_level = :examLevel
      const questions = await fetchMockTestQuestions({
        examLevel,
        limit: 50,
        subject: selectedSubject === 'All' ? undefined : selectedSubject,
      });

      if (!questions || questions.length === 0) {
        throw new Error(`No questions returned from Supabase for exam_level = '${examLevel}'.`);
      }

      setQbQuestions(questions);
      setQbAnswers({});
      setQbFlags({});
      setQbCurrentIndex(0);
      setElapsedSec(0);
      setShowSubmitModal(false);
      setPhase('QB_TESTING');
    } catch (err) {
      console.error('Supabase Mock Test query error:', err);
      setQbError(err.message || 'Failed to query Question Bank.');
    } finally {
      setQbLoading(false);
    }
  };

  const handleSelectQbAnswer = (optionKey) => {
    sounds.playClick();
    setQbAnswers((prev) => ({
      ...prev,
      [qbCurrentIndex]: optionKey,
    }));
  };

  const toggleFlagCurrent = () => {
    sounds.playClick();
    setQbFlags((prev) => ({
      ...prev,
      [qbCurrentIndex]: !prev[qbCurrentIndex],
    }));
  };

  const handleFinishQbTest = async () => {
    setShowSubmitModal(false);
    setPhase('QB_COMPLETED');
    sounds.playSimStart();

    // Calculate score
    let correctCount = 0;
    qbQuestions.forEach((q, idx) => {
      const chosen = qbAnswers[idx];
      const correct = (q.correct_option || '').toUpperCase();
      if (chosen && chosen.toUpperCase() === correct) {
        correctCount++;
      }
    });

    const earnedXp = 200 + correctCount * 12;
    await record({
      kind: 'quiz',
      ref: `50-Question Mock Test (${examLevel})`,
      xp: earnedXp,
      achievements: correctCount >= 40 ? ['master-physicist'] : [],
    });
  };

  // -------------------------------------------------------------
  // 10-Q ADAPTIVE TEST HANDLERS
  // -------------------------------------------------------------
  const currentQ = MOCK_TEST_QUESTIONS[currentIndex];
  const activeConcept = activeIntervention ? CONCEPTS[activeIntervention.conceptId] : null;

  const handleStartAdaptiveTest = () => {
    sounds.playSimStart();
    setPhase('TESTING');
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setTestScore(0);
    setQuestionHistory([]);
    setElapsedSec(0);
    setRemediatedConcepts([]);
  };

  const handleSubmitMainAnswer = (optionIdx) => {
    if (submitted) return;
    setSelectedOption(optionIdx);
    setSubmitted(true);

    const isCorrect = optionIdx === currentQ.correctAnswer;

    if (isCorrect) {
      sounds.playSimStart();
      setTestScore((s) => s + 1);
      setQuestionHistory((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          answeredCorrectly: true,
          chosenOption: optionIdx,
          remediated: false,
        },
      ]);
    } else {
      sounds.playClick();
      const misconception =
        currentQ.misconceptionAnalysis[optionIdx] ||
        'Concept misunderstanding regarding fundamental formulas or vector directions.';

      setTimeout(() => {
        setActiveIntervention({
          questionIndex: currentIndex,
          conceptId: currentQ.conceptId,
          chosenOption: optionIdx,
          misconceptionText: misconception,
        });
        setPhase('INTERVENTION');
      }, 750);
    }
  };

  const handleNextMainQuestion = () => {
    sounds.playClick();
    setSelectedOption(null);
    setSubmitted(false);

    if (currentIndex + 1 < MOCK_TEST_QUESTIONS.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishAdaptiveTest();
    }
  };

  const handleStartRemediation = () => {
    sounds.playClick();
    const concept = CONCEPTS[activeIntervention.conceptId];
    if (concept && concept.practiceQuestions) {
      setRemedialQuestions(concept.practiceQuestions);
      setRemedialIndex(0);
      setRemedialSelected(null);
      setRemedialSubmitted(false);
      setRemedialScore(0);
      setPhase('REMEDIATION');
    }
  };

  const handleRemedialAnswer = (optionIdx) => {
    if (remedialSubmitted) return;
    setRemedialSelected(optionIdx);
    setRemedialSubmitted(true);

    const remQ = remedialQuestions[remedialIndex];
    if (optionIdx === remQ.answer) {
      sounds.playSimStart();
      setRemedialScore((s) => s + 1);
    } else {
      sounds.playClick();
    }
  };

  const handleNextRemedialQuestion = () => {
    sounds.playClick();
    setRemedialSelected(null);
    setRemedialSubmitted(false);

    if (remedialIndex + 1 < remedialQuestions.length) {
      setRemedialIndex((i) => i + 1);
    }
  };

  const handleCompleteRemediationAndResume = async () => {
    sounds.playSimStart();
    setRemediatedConcepts((prev) => [
      ...prev,
      {
        conceptId: activeIntervention.conceptId,
        score: remedialScore,
        total: remedialQuestions.length,
      },
    ]);

    setQuestionHistory((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        answeredCorrectly: false,
        chosenOption: activeIntervention.chosenOption,
        remediated: true,
      },
    ]);

    await record({
      kind: 'quiz',
      ref: `Remediated Concept: ${activeConcept?.name}`,
      xp: 40,
    });

    setSelectedOption(null);
    setSubmitted(false);
    setActiveIntervention(null);

    if (currentIndex + 1 < MOCK_TEST_QUESTIONS.length) {
      setCurrentIndex((i) => i + 1);
      setPhase('TESTING');
    } else {
      finishAdaptiveTest();
    }
  };

  const finishAdaptiveTest = async () => {
    setPhase('COMPLETED');
    sounds.playSimStart();
    await record({
      kind: 'quiz',
      ref: '10-Question Adaptive Mock Test',
      xp: 150 + testScore * 15,
      achievements: testScore >= 8 ? ['master-physicist'] : [],
    });
  };

  // -------------------------------------------------------------
  // RENDER HELPERS
  // -------------------------------------------------------------
  const currentQbQ = qbQuestions[qbCurrentIndex];
  const qbTotalAnswered = Object.keys(qbAnswers).length;
  const qbTotalFlagged = Object.values(qbFlags).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ========================================================= */}
      {/* PHASE 1: WELCOME & MOCK TEST SELECTION INTRO */}
      {/* ========================================================= */}
      {phase === 'INTRO' && (
        <div className="clay-card rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-slate-100 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-sky-400 text-white shadow-md">
                <GraduationCap size={28} />
              </span>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-200 px-3 py-0.5 text-[10px] font-extrabold text-sky-800">
                  <Database size={12} className="text-sky-600" />
                  Supabase Question Bank · 25,000 Questions Available
                </div>
                <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
                  JEE Science Mock Tests
                </h1>
              </div>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setTestMode('QB_50')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  testMode === 'QB_50'
                    ? 'bg-white text-sky-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap size={14} className="text-amber-500" />
                <span>50-Question Bank Test</span>
              </button>
              <button
                onClick={() => setTestMode('ADAPTIVE_10')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  testMode === 'ADAPTIVE_10'
                    ? 'bg-white text-sky-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles size={14} className="text-sky-500" />
                <span>10-Q Adaptive Diagnostic</span>
              </button>
            </div>
          </div>

          {/* MODE 1: 50-QUESTION QUESTION BANK MOCK TEST */}
          {testMode === 'QB_50' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Experience a full examination session powered directly by your backend Supabase Question Bank.
                Tests contain 50 questions selected randomly according to your chosen exam difficulty level.
              </p>

              {/* Requirement Query Callout */}
              <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-200 text-sky-800">
                    <Database size={16} />
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider">
                      Supabase Question Bank Query
                    </h4>
                    <code className="text-xs font-mono text-sky-900 bg-white border border-sky-200 px-2.5 py-1 rounded-md inline-block">
                      supabase.from('question_bank').select('*').eq('exam_level', '{examLevel}').limit(50)
                    </code>
                    <p className="text-[11px] text-sky-800">
                      Instantly queries 50 randomized questions matching your selected JEE difficulty across Physics and Chemistry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Filter Selectors: Exam Level & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Exam Level Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Exam Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { level: 'Main-Moderate', label: 'Main-Moderate (Default)', badge: 'Most Balanced' },
                      { level: 'Main-Easy', label: 'Main-Easy', badge: 'Fundamentals' },
                      { level: 'Main-Hard', label: 'Main-Hard', badge: 'High Difficulty' },
                      { level: 'Advanced', label: 'Advanced', badge: 'JEE Advanced' },
                    ].map((lvl) => (
                      <button
                        key={lvl.level}
                        onClick={() => setExamLevel(lvl.level)}
                        className={`p-3 rounded-xl border text-left transition ${
                          examLevel === lvl.level
                            ? 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-200 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <p className="text-xs font-extrabold text-slate-900">{lvl.level}</p>
                        <span className="text-[10px] font-semibold text-slate-500">{lvl.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject Selector & Test Metrics */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Discipline Focus
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['All', 'Physics', 'Chemistry'].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubject(sub)}
                        className={`p-3 rounded-xl border text-center transition ${
                          selectedSubject === sub
                            ? 'border-sky-500 bg-sky-50 text-sky-900 font-extrabold ring-2 ring-sky-200'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs font-bold">{sub}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
                      <p className="text-[9px] uppercase font-bold text-slate-400">Total</p>
                      <p className="text-sm font-black text-slate-800">50 Questions</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
                      <p className="text-[9px] uppercase font-bold text-slate-400">Target Time</p>
                      <p className="text-sm font-black text-sky-600">60 Minutes</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
                      <p className="text-[9px] uppercase font-bold text-slate-400">Reward</p>
                      <p className="text-sm font-black text-amber-600">+800 XP</p>
                    </div>
                  </div>
                </div>
              </div>

              {qbError && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
                  {qbError}
                </div>
              )}

              {/* Start 50-Q Button */}
              <button
                onClick={handleStartQbTest}
                disabled={qbLoading}
                className="clay-btn-yellow flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-slate-900 shadow-md hover:brightness-105 transition"
              >
                {qbLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                    <span>Querying Supabase Question Bank...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} className="text-amber-800" />
                    <span>Fetch 50 Questions & Begin Mock Test ({examLevel})</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* MODE 2: 10-QUESTION ADAPTIVE DIAGNOSTIC */}
          {testMode === 'ADAPTIVE_10' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This 10-question adaptive assessment evaluates your fundamental understanding with real-time
                concept intervention.
              </p>

              {/* Adaptive Concept Intervention Notice Callout */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-200/70 text-amber-800">
                    <AlertTriangle size={15} />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">
                      Concept Intervention & Immediate Remediation Active
                    </h4>
                    <p className="mt-1 text-[11px] text-amber-800 leading-relaxed">
                      If you answer any question incorrectly, the test will <b>immediately pause</b>. Our
                      diagnostic engine will analyze your misconception, teach you the concept with a
                      targeted <b>micro-lesson</b>, and generate <b>5 practice questions</b> before resuming!
                    </p>
                  </div>
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Questions</p>
                  <p className="mt-0.5 text-base font-black text-slate-800">10 MCQs</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Remediation</p>
                  <p className="mt-0.5 text-base font-black text-sky-600">5 Qs / Concept</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Target XP</p>
                  <p className="mt-0.5 text-base font-black text-amber-600">+300 XP</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Time Limit</p>
                  <p className="mt-0.5 text-base font-black text-teal-600">Untimed</p>
                </div>
              </div>

              <button
                onClick={handleStartAdaptiveTest}
                className="clay-btn-yellow flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-slate-900 shadow-md hover:brightness-105 transition"
              >
                <Sparkles size={16} />
                <span>Begin Adaptive Diagnostic Test</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 2A: SUPABASE 50-QUESTION MOCK TEST ACTIVE */}
      {/* ========================================================= */}
      {phase === 'QB_TESTING' && currentQbQ && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Top Bar: Exam Level, Timer & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 font-extrabold text-sm">
                Q{qbCurrentIndex + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-sky-100 text-sky-800 px-2 py-0.5 text-[10px] font-bold">
                    {currentQbQ.subject}
                  </span>
                  <span className="rounded bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold">
                    {examLevel}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {currentQbQ.chapter} · {currentQbQ.topic || 'General'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-mono font-bold text-slate-700">
                <Timer size={14} className="text-slate-500" />
                <span>{fmtTime(elapsedSec)}</span>
              </div>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="clay-btn-yellow px-4 py-1.5 text-xs font-bold text-slate-900 shadow-xs"
              >
                Submit Test ({qbTotalAnswered}/50)
              </button>
            </div>
          </div>

          {/* Question Navigator Palette Grid (1 to 50) */}
          <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={13} /> Question Palette (50 Questions)
              </span>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Answered ({qbTotalAnswered})
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Flagged ({qbTotalFlagged})
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200 border" /> Remaining ({50 - qbTotalAnswered})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-10 sm:grid-cols-25 gap-1.5 max-h-24 overflow-y-auto p-1">
              {qbQuestions.map((q, idx) => {
                const isCurrent = idx === qbCurrentIndex;
                const isAnswered = qbAnswers[idx] !== undefined;
                const isFlagged = qbFlags[idx];

                let cellCls = 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50';
                if (isCurrent) {
                  cellCls = 'bg-sky-500 text-white font-extrabold ring-2 ring-sky-300';
                } else if (isFlagged) {
                  cellCls = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                } else if (isAnswered) {
                  cellCls = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                }

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => setQbCurrentIndex(idx)}
                    className={`h-7 w-full rounded-md border text-[11px] flex items-center justify-center transition ${cellCls}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="clay-card rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                {currentQbQ.question}
              </h3>
              <button
                onClick={toggleFlagCurrent}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold shrink-0 transition ${
                  qbFlags[qbCurrentIndex]
                    ? 'border-amber-400 bg-amber-50 text-amber-800'
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Flag size={13} className={qbFlags[qbCurrentIndex] ? 'fill-amber-500 text-amber-500' : ''} />
                <span>{qbFlags[qbCurrentIndex] ? 'Flagged' : 'Flag'}</span>
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {[
                { key: 'A', text: currentQbQ.option_a || currentQbQ.option_A },
                { key: 'B', text: currentQbQ.option_b || currentQbQ.option_B },
                { key: 'C', text: currentQbQ.option_c || currentQbQ.option_C },
                { key: 'D', text: currentQbQ.option_d || currentQbQ.option_D },
              ].map((opt) => {
                const isSelected = qbAnswers[qbCurrentIndex] === opt.key;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectQbAnswer(opt.key)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-xs sm:text-sm transition ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/80 text-sky-950 font-bold ring-2 ring-sky-200 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-bold text-xs ${
                          isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 size={18} className="text-sky-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setQbCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={qbCurrentIndex === 0}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {qbAnswers[qbCurrentIndex] !== undefined && (
                  <button
                    onClick={() => {
                      setQbAnswers((prev) => {
                        const copy = { ...prev };
                        delete copy[qbCurrentIndex];
                        return copy;
                      });
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-2"
                  >
                    Clear Choice
                  </button>
                )}

                {qbCurrentIndex + 1 < 50 ? (
                  <button
                    onClick={() => setQbCurrentIndex((i) => i + 1)}
                    className="clay-btn-yellow flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-slate-900 shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="clay-btn-yellow px-5 py-2.5 text-xs font-bold text-slate-900 shadow-xs"
                  >
                    Review & Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="rounded-3xl bg-white p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <BarChart3 size={20} />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">Submit Mock Test?</h3>
                <p className="text-xs text-slate-500">Review your test progress summary below</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-700 uppercase">Answered</p>
                <p className="text-xl font-black text-emerald-900">{qbTotalAnswered}</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 border border-amber-100">
                <p className="text-[10px] font-bold text-amber-700 uppercase">Flagged</p>
                <p className="text-xl font-black text-amber-900">{qbTotalFlagged}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Unanswered</p>
                <p className="text-xl font-black text-slate-800">{50 - qbTotalAnswered}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Return to Test
              </button>
              <button
                onClick={handleFinishQbTest}
                className="clay-btn-yellow flex-1 py-2.5 text-xs font-bold text-slate-900 shadow-xs"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 2B: SUPABASE 50-QUESTION MOCK TEST COMPLETED */}
      {/* ========================================================= */}
      {phase === 'QB_COMPLETED' && (
        <div className="clay-card rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-slate-100 space-y-8 animate-in zoom-in-95 duration-200">
          {(() => {
            let correct = 0;
            qbQuestions.forEach((q, idx) => {
              if (qbAnswers[idx] && qbAnswers[idx].toUpperCase() === (q.correct_option || '').toUpperCase()) {
                correct++;
              }
            });
            const pct = Math.round((correct / 50) * 100);

            return (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-md">
                      <Award size={32} />
                    </span>
                    <div>
                      <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                        50-Question Examination Completed
                      </span>
                      <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
                        Mock Test Results · {examLevel}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleStartQbTest}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
                    >
                      <RotateCcw size={13} /> Fetch 50 New Random Questions
                    </button>
                    <button
                      onClick={() => setPhase('INTRO')}
                      className="clay-btn-yellow flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-slate-900 shadow-xs"
                    >
                      <span>Choose Different Level</span>
                    </button>
                  </div>
                </div>

                {/* Score Breakdown Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-100">
                    <p className="text-[10px] font-bold uppercase text-emerald-800">Total Score</p>
                    <p className="mt-1 text-2xl font-black text-emerald-900">{correct} / 50</p>
                    <p className="text-[10px] text-emerald-700">{pct}% Overall Accuracy</p>
                  </div>
                  <div className="rounded-2xl bg-sky-50/70 p-4 border border-sky-100">
                    <p className="text-[10px] font-bold uppercase text-sky-800">Time Taken</p>
                    <p className="mt-1 text-2xl font-black text-sky-900">{fmtTime(elapsedSec)}</p>
                    <p className="text-[10px] text-sky-700">Pace: {Math.round(elapsedSec / 50)}s / question</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-100">
                    <p className="text-[10px] font-bold uppercase text-amber-800">Attempted</p>
                    <p className="mt-1 text-2xl font-black text-amber-900">{qbTotalAnswered} / 50</p>
                    <p className="text-[10px] text-amber-700">{50 - qbTotalAnswered} Skipped</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-100">
                    <p className="text-[10px] font-bold uppercase text-amber-800">XP Awarded</p>
                    <p className="mt-1 text-2xl font-black text-amber-900">+{200 + correct * 12} XP</p>
                    <p className="text-[10px] text-amber-700">Logged to Profile</p>
                  </div>
                </div>

                {/* Comprehensive 50-Question Answer Key & Explanations */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen size={14} /> Comprehensive 50-Question Solution Key & Explanations
                  </h3>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {qbQuestions.map((q, idx) => {
                      const userChoice = qbAnswers[idx];
                      const correctOpt = (q.correct_option || '').toUpperCase();
                      const isCorrect = userChoice && userChoice.toUpperCase() === correctOpt;

                      return (
                        <div
                          key={q.id || idx}
                          className={`rounded-2xl border p-4 text-xs transition ${
                            isCorrect
                              ? 'border-emerald-200 bg-emerald-50/40'
                              : userChoice
                              ? 'border-rose-200 bg-rose-50/40'
                              : 'border-slate-200 bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <span className="font-bold text-slate-900">
                              Q{idx + 1}. {q.question}
                            </span>
                            <span
                              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                isCorrect
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : userChoice
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isCorrect ? 'Correct (+4)' : userChoice ? 'Incorrect (-1)' : 'Unattempted (0)'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3 text-[11px] text-slate-600">
                            <div>A: {q.option_a || q.option_A}</div>
                            <div>B: {q.option_b || q.option_B}</div>
                            <div>C: {q.option_c || q.option_C}</div>
                            <div>D: {q.option_d || q.option_D}</div>
                          </div>

                          <div className="rounded-xl bg-white border border-slate-200/70 p-3 space-y-1">
                            <div className="flex items-center gap-2 font-bold text-slate-800">
                              <span>Your Choice: <b>{userChoice || 'None'}</b></span>
                              <span>·</span>
                              <span className="text-emerald-700">Correct Option: <b>{correctOpt} ({q.answer})</b></span>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-[11px]">
                              <b>Explanation: </b>{q.explanation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 3: 10-QUESTION ADAPTIVE DIAGNOSTIC ACTIVE */}
      {/* ========================================================= */}
      {phase === 'TESTING' && currentQ && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Top Bar */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-100 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800 border border-sky-200">
                Question {currentIndex + 1} of {MOCK_TEST_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Direct Score: {testScore} / {currentIndex + (submitted ? 1 : 0)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Timer size={14} className="text-slate-400" />
              <span>{fmtTime(elapsedSec)}</span>
            </div>
          </div>

          {/* Navigator Tracker */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {MOCK_TEST_QUESTIONS.map((q, idx) => {
              const hist = questionHistory.find((h) => h.questionId === q.id);
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={q.id}
                  className={`flex h-7 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition ${
                    isCurrent
                      ? 'bg-sky-500 text-white shadow-xs'
                      : hist?.answeredCorrectly
                      ? 'bg-emerald-100 text-emerald-800'
                      : hist?.remediated
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {q.id}
                </div>
              );
            })}
          </div>

          {/* Question Card */}
          <div className="clay-card rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-100 space-y-5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                if (submitted) {
                  if (optIdx === currentQ.correctAnswer) {
                    btnStyle = 'border-emerald-400 bg-emerald-50/90 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-bold';
                  } else {
                    btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSubmitMainAnswer(optIdx)}
                    disabled={submitted}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-xs sm:text-sm transition shadow-xs ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {submitted && optIdx === currentQ.correctAnswer && (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    )}
                    {submitted && isSelected && optIdx !== currentQ.correctAnswer && (
                      <XCircle size={18} className="text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {submitted && selectedOption === currentQ.correctAnswer && (
              <div className="pt-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 size={16} />
                    <span>Correct! Great reasoning.</span>
                  </div>
                  <button
                    onClick={handleNextMainQuestion}
                    className="clay-btn-yellow flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-slate-900 shadow-xs"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 4: ADAPTIVE INTERVENTION OVERLAY */}
      {/* ========================================================= */}
      {phase === 'INTERVENTION' && activeConcept && (
        <div className="clay-card rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-amber-300 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md animate-bounce">
                <AlertTriangle size={22} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-extrabold text-rose-800">
                    Test Paused at Question #{activeIntervention.questionIndex + 1}
                  </span>
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-800">
                    Concept Intervention Triggered
                  </span>
                </div>
                <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-slate-900">
                  Targeted Micro-Lesson: {activeConcept.name}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4">
            <span className="text-rose-700 font-bold text-xs uppercase tracking-wider">
              Predicted Misconception:
            </span>
            <p className="mt-1 text-xs text-rose-900 font-semibold leading-relaxed">
              "{activeIntervention.misconceptionText}"
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-sky-50/70 p-5 border border-sky-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800">
                <BookOpen size={15} />
                <span>Core Theoretical Principle</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {activeConcept.coreIdea}
              </p>
              <div className="rounded-xl bg-white p-3 text-center border border-sky-200/70 shadow-inner">
                <span className="font-mono text-sm sm:text-base font-black text-sky-900 tracking-wide">
                  {activeConcept.formula}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/60">
              <Lightbulb size={18} className="shrink-0 text-amber-600 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Golden Memory Rule</p>
                <p className="mt-0.5 text-xs text-amber-800 font-medium">
                  {activeConcept.memoryRule}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Complete 5 targeted practice questions to master this concept and resume the mock test.
            </span>
            <button
              onClick={handleStartRemediation}
              className="clay-btn-yellow flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-extrabold text-slate-900 shadow-md hover:brightness-105 transition"
            >
              <span>Start 5-Question Remediation</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 5: 5-QUESTION TARGETED REMEDIATION BRANCH */}
      {/* ========================================================= */}
      {phase === 'REMEDIATION' && remedialQuestions.length > 0 && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 border border-amber-200 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-200 text-amber-900 font-black text-xs">
                {remedialIndex + 1}/5
              </span>
              <div>
                <p className="text-xs font-bold text-amber-900">
                  Targeted Remediation Practice ({remedialIndex + 1} of 5)
                </p>
                <p className="text-[10px] text-amber-700">Concept: {activeConcept?.name}</p>
              </div>
            </div>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
              Remedial Score: {remedialScore} / {remedialIndex + (remedialSubmitted ? 1 : 0)}
            </span>
          </div>

          {(() => {
            const remQ = remedialQuestions[remedialIndex];
            const isLast = remedialIndex === remedialQuestions.length - 1;

            return (
              <div className="clay-card rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-100 space-y-5">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
                  {remQ.q}
                </h3>

                <div className="space-y-2.5">
                  {remQ.options.map((opt, optIdx) => {
                    const isSelected = remedialSelected === optIdx;
                    let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                    if (remedialSubmitted) {
                      if (optIdx === remQ.answer) {
                        btnStyle = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-bold';
                      } else {
                        btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleRemedialAnswer(optIdx)}
                        disabled={remedialSubmitted}
                        className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left text-xs sm:text-sm transition shadow-xs ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                            {optIdx + 1}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {remedialSubmitted && optIdx === remQ.answer && (
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        )}
                        {remedialSubmitted && isSelected && optIdx !== remQ.answer && (
                          <XCircle size={16} className="text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {remedialSubmitted && (
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3 animate-in fade-in duration-150">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <b className="text-slate-800">Explanation: </b>
                      {remQ.explanation}
                    </p>

                    <div className="flex justify-end pt-2">
                      {!isLast ? (
                        <button
                          onClick={handleNextRemedialQuestion}
                          className="clay-btn-yellow flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-slate-900 shadow-xs"
                        >
                          <span>Next Remedial Question</span>
                          <ArrowRight size={13} />
                        </button>
                      ) : (
                        <button
                          onClick={handleCompleteRemediationAndResume}
                          className="clay-btn-yellow flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold text-slate-900 shadow-sm"
                        >
                          <Check size={14} strokeWidth={3} />
                          <span>Concept Mastered! Resume Main Mock Test</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 6: 10-Q ADAPTIVE TEST COMPLETED */}
      {/* ========================================================= */}
      {phase === 'COMPLETED' && (
        <div className="clay-card rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-slate-100 space-y-8 animate-in zoom-in-95 duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md">
                <Award size={28} />
              </span>
              <div>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                  Diagnostic Test Completed
                </span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
                  Adaptive Assessment Report
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartAdaptiveTest}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
              >
                <RotateCcw size={13} /> Retake Test
              </button>
              <button
                onClick={() => setPhase('INTRO')}
                className="clay-btn-yellow flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-slate-900 shadow-xs"
              >
                <span>Back to All Tests</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-100">
              <p className="text-[10px] font-bold uppercase text-emerald-800">Direct Accuracy</p>
              <p className="mt-1 text-2xl font-black text-emerald-900">
                {Math.round((testScore / MOCK_TEST_QUESTIONS.length) * 100)}%
              </p>
              <p className="text-[10px] text-emerald-700">{testScore} of 10 Direct Correct</p>
            </div>

            <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-100">
              <p className="text-[10px] font-bold uppercase text-amber-800">Interventions</p>
              <p className="mt-1 text-2xl font-black text-amber-900">
                {remediatedConcepts.length}
              </p>
              <p className="text-[10px] text-amber-700">Concepts Remediated</p>
            </div>

            <div className="rounded-2xl bg-sky-50/70 p-4 border border-sky-100">
              <p className="text-[10px] font-bold uppercase text-sky-800">Remedial Mastery</p>
              <p className="mt-1 text-2xl font-black text-sky-900">100%</p>
              <p className="text-[10px] text-sky-700">All Weak Concepts Fixed</p>
            </div>

            <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-100">
              <p className="text-[10px] font-bold uppercase text-amber-800">Total XP Earned</p>
              <p className="mt-1 text-2xl font-black text-amber-900">
                +{150 + testScore * 15 + remediatedConcepts.length * 40} XP
              </p>
              <p className="text-[10px] text-amber-700">Logged to Profile</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
