import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Flame,
  BookOpen
} from 'lucide-react';
import { getAllChemistryReactions } from '../../data/chemistry/chemistryDatabase.js';

export default function ReactionFlashcardView() {
  const allReactions = useMemo(() => getAllChemistryReactions(), []);
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState(new Set());
  const [reviewIds, setReviewIds] = useState(new Set());

  // Filter pool
  const deck = useMemo(() => {
    let pool = allReactions;
    if (selectedClass === 'Class 10') pool = pool.filter((r) => r.classLevel === 10);
    else if (selectedClass === 'Class 11') pool = pool.filter((r) => r.classLevel === 11);
    else if (selectedClass === 'Class 12') pool = pool.filter((r) => r.classLevel === 12);
    return pool.slice(0, 50); // 50 card deck
  }, [allReactions, selectedClass]);

  const currentCard = deck[cardIndex % deck.length];

  const handleNext = () => {
    setIsFlipped(false);
    setCardIndex((i) => (i + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCardIndex((i) => (i - 1 + deck.length) % deck.length);
  };

  const markMastered = () => {
    if (!currentCard) return;
    const next = new Set(masteredIds);
    next.add(currentCard.id);
    setMasteredIds(next);
    handleNext();
  };

  const markReview = () => {
    if (!currentCard) return;
    const next = new Set(reviewIds);
    next.add(currentCard.id);
    setReviewIds(next);
    handleNext();
  };

  if (!currentCard) {
    return <div className="p-8 text-center">Loading flashcards...</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Top Banner & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 to-blue-50/50 p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md">
            <HelpCircle size={22} />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Reaction Flashcards (3D Flip)</span>
              <span className="rounded-full bg-sky-200 text-sky-900 px-2 py-0.5 text-[10px] font-bold">
                Card {cardIndex + 1} of {deck.length}
              </span>
            </h2>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600 mt-0.5">
              <span>Mastered: <strong className="text-emerald-600">{masteredIds.size}</strong></span>
              <span>Needs Review: <strong className="text-amber-600">{reviewIds.size}</strong></span>
            </div>
          </div>
        </div>

        {/* Class Filter */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-sky-200">
          {['All Classes', 'Class 10', 'Class 11', 'Class 12'].map((cls) => (
            <button
              key={cls}
              onClick={() => {
                setSelectedClass(cls);
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`rounded-xl px-2.5 py-1 text-xs font-black transition cursor-pointer ${
                selectedClass === cls
                  ? 'bg-sky-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="group relative h-96 w-full cursor-pointer [perspective:1000px] select-none"
      >
        <div
          className={`relative h-full w-full rounded-3xl transition-all duration-500 [transform-style:preserve-3d] shadow-xl ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* FRONT SIDE: Reactants & Question */}
          <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 border-sky-200 bg-gradient-to-b from-white to-sky-50/40 p-8 [backface-visibility:hidden]">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-sky-100 text-sky-800 px-3 py-1 text-xs font-black">
                Class {currentCard.classLevel} • {currentCard.chapter}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-sky-600 transition">
                <RotateCw size={13} />
                <span>Click to Flip</span>
              </span>
            </div>

            <div className="my-auto text-center flex flex-col items-center">
              <span className="text-xs font-bold uppercase text-slate-400">Chemical Reaction:</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                {currentCard.name}
              </h3>

              {/* Reactants Formula Prompt */}
              <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50/80 px-6 py-4 font-mono text-lg font-black text-sky-950 shadow-inner">
                {currentCard.equation.split('──►')[0]?.trim() || currentCard.reactants?.join(' + ')}
              </div>

              {currentCard.conditions && currentCard.conditions !== 'Standard Ambient' && (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Flame size={14} className="text-orange-500" />
                  <span>Conditions: {currentCard.conditions}</span>
                </div>
              )}
            </div>

            <div className="text-center text-xs font-bold text-slate-400">
              Can you recall the balanced products and mechanism?
            </div>
          </div>

          {/* BACK SIDE: Balanced Equation & Mechanism */}
          <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 border-emerald-300 bg-gradient-to-b from-white to-emerald-50/40 p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-black">
                Balanced Stoichiometry
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                <RotateCw size={13} />
                <span>Click to Flip</span>
              </span>
            </div>

            <div className="my-auto flex flex-col gap-3">
              {/* Full Equation */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400">Complete Chemical Equation:</span>
                <div className="mt-1 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 font-mono text-sm font-black text-emerald-950 shadow-inner overflow-x-auto">
                  {currentCard.equation}
                </div>
              </div>

              {/* Mechanism / Scientific Principle */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400">Mechanism & Observations:</span>
                <p className="mt-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-xs leading-relaxed text-slate-700 font-medium line-clamp-4">
                  {currentCard.explanation || currentCard.observations || 'Stoichiometric transformation governed by reaction kinetics.'}
                </p>
              </div>
            </div>

            <div className="text-center text-[11px] font-black text-emerald-700 uppercase">
              Reaction Verified in NCERT Syllabus
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Self-Rating Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Self Rating */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={markReview}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-black text-amber-900 shadow-2xs hover:bg-amber-100 transition cursor-pointer"
          >
            <AlertCircle size={14} className="text-amber-600" />
            <span>Need Review</span>
          </button>

          <button
            onClick={markMastered}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-5 py-2 text-xs font-black text-white shadow-md hover:bg-emerald-700 transition cursor-pointer"
          >
            <CheckCircle2 size={14} />
            <span>Mastered!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
