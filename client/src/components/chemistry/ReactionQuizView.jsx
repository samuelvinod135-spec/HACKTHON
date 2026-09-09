import React, { useState, useMemo, useEffect } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Flame,
  Check
} from 'lucide-react';
import { getAllChemistryReactions } from '../../data/chemistry/chemistryDatabase.js';

export default function ReactionQuizView() {
  const allReactions = useMemo(() => getAllChemistryReactions(), []);
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Filter pool by class level
  const filteredPool = useMemo(() => {
    let pool = allReactions;
    if (selectedClass === 'Class 10') pool = pool.filter((r) => r.classLevel === 10);
    else if (selectedClass === 'Class 11') pool = pool.filter((r) => r.classLevel === 11);
    else if (selectedClass === 'Class 12') pool = pool.filter((r) => r.classLevel === 12);
    // Take a shuffled slice of 30 items
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 30);
  }, [allReactions, selectedClass]);

  // Current question generator
  const currentQuestion = useMemo(() => {
    if (filteredPool.length === 0) return null;
    const rx = filteredPool[currentQuestionIndex % filteredPool.length];
    if (!rx) return null;

    // Build question: Product prediction
    const correctProduct = rx.equation.includes('──►')
      ? rx.equation.split('──►')[1]?.trim()
      : rx.equation.split('->')[1]?.trim() || rx.products?.join(' + ');

    // Collect 3 distractor products from other random reactions
    const otherProducts = allReactions
      .filter((r) => r.id !== rx.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((r) => {
        if (r.equation.includes('──►')) return r.equation.split('──►')[1]?.trim();
        return r.products?.join(' + ') || 'Byproducts';
      });

    const options = [correctProduct, ...otherProducts].sort(() => 0.5 - Math.random());

    return {
      reaction: rx,
      questionText: `What are the primary reaction products when the following reactants interact under standard CBSE conditions?`,
      reactantsDisplay: rx.equation.includes('──►')
        ? rx.equation.split('──►')[0]?.trim()
        : rx.reactants?.join(' + ') || rx.name,
      correctAnswer: correctProduct,
      options,
      explanation: rx.explanation || rx.observations || 'Reaction adheres to standard stoichiometric laws.'
    };
  }, [filteredPool, currentQuestionIndex, allReactions]);

  const handleSelectOption = (opt) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((s) => s + 10);
      setStreak((st) => {
        const next = st + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
  };

  if (!currentQuestion) {
    return <div className="p-8 text-center">Loading quiz questions...</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Quiz Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50/50 p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
            <Award size={22} />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Reaction Mastery Quiz</span>
              <span className="rounded-full bg-amber-200 text-amber-900 px-2 py-0.5 text-[10px] font-bold">
                Question {currentQuestionIndex + 1}
              </span>
            </h2>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600 mt-0.5">
              <span>Score: <strong className="text-amber-600">{score} pts</strong></span>
              <span>Streak: <strong className="text-orange-600">🔥 {streak}</strong></span>
              <span>Best: <strong className="text-slate-800">{bestStreak}</strong></span>
            </div>
          </div>
        </div>

        {/* Class Filter Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-amber-200">
          {['All Classes', 'Class 10', 'Class 11', 'Class 12'].map((cls) => (
            <button
              key={cls}
              onClick={() => {
                setSelectedClass(cls);
                handleRestart();
              }}
              className={`rounded-xl px-2.5 py-1 text-xs font-black transition cursor-pointer ${
                selectedClass === cls
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              {currentQuestion.reaction.chapter || 'Organic Chemistry'} • Class {currentQuestion.reaction.classLevel}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Reaction: {currentQuestion.reaction.name}
            </span>
          </div>

          <h3 className="text-sm font-black text-slate-900">
            {currentQuestion.questionText}
          </h3>

          {/* Reactants Prompt Box */}
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 font-mono text-base font-black text-amber-950 text-center shadow-inner overflow-x-auto">
            {currentQuestion.reactantsDisplay} ──► <span className="text-amber-500 underline decoration-dashed">???</span>
          </div>
        </div>

        {/* 4 Options Grid */}
        <div className="flex flex-col gap-2.5">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentQuestion.correctAnswer;

            let buttonStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';
            if (isAnswerSubmitted) {
              if (isCorrect) buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-black';
              else if (isSelected && !isCorrect) buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 line-through';
              else buttonStyle = 'border-slate-100 opacity-40 text-slate-500';
            } else if (isSelected) {
              buttonStyle = 'border-amber-400 bg-amber-50 text-amber-950 shadow-xs font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswerSubmitted}
                className={`flex items-center justify-between rounded-2xl border-2 p-3.5 text-left text-xs transition cursor-pointer ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-white/80 border border-slate-200 text-xs font-black">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-mono text-xs">{opt}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle size={18} className="text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner when Answered */}
        {isAnswerSubmitted && (
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              {selectedOption === currentQuestion.correctAnswer ? (
                <span className="flex items-center gap-1 font-black text-emerald-700">
                  <Check size={16} /> Correct! +10 points
                </span>
              ) : (
                <span className="flex items-center gap-1 font-black text-rose-700">
                  <XCircle size={16} /> Incorrect. Keep practicing!
                </span>
              )}
            </div>
            <p className="text-slate-700 leading-relaxed">
              <strong>Mechanism & Scientific Rationale:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Submit / Next Button */}
        <div className="flex justify-end pt-2">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-2.5 text-xs font-black text-slate-950 shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 active:scale-95 transition cursor-pointer"
            >
              <span>Submit Answer</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-2.5 text-xs font-black text-white shadow-md hover:bg-slate-800 active:scale-95 transition cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
