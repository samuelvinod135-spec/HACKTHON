import React, { useState, useEffect } from 'react';
import {
  Languages,
  Sparkles,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  BookOpen,
  Check,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { VERNACULAR_CHEMISTRY_MODULES } from '../../data/vernacularChemistryModules.js';
import { renderSmartVernacular } from '../../utils/smartVernacular.js';

export default function SmartVernacularCard({ className = '' }) {
  const { currentLang } = useLanguage();

  // If user selected English in Header, default strictly to 'full_english'
  // If user selected Hindi, Tamil, or Telugu in Header, default to 'vernacular_tech'
  const [mode, setMode] = useState(() => (currentLang === 'en' ? 'full_english' : 'vernacular_tech'));
  // 'hi' | 'ta' | 'te'
  const [targetLang, setTargetLang] = useState(() => (currentLang !== 'en' ? currentLang : 'hi'));
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  // Synchronize when the user changes language in the top-level Header
  useEffect(() => {
    if (currentLang === 'en') {
      setMode('full_english');
    } else {
      setMode('vernacular_tech');
      setTargetLang(currentLang);
    }
  }, [currentLang]);

  const mod = VERNACULAR_CHEMISTRY_MODULES[activeModuleIndex] || VERNACULAR_CHEMISTRY_MODULES[0];

  const isVernacularActive = mode === 'vernacular_tech';
  // When mode is full_english, displayLangKey is strictly 'en'
  const displayLangKey = isVernacularActive ? targetLang : 'en';

  return (
    <div className={`clay-card rounded-3xl border border-sky-100 bg-white p-5 sm:p-6 shadow-sm space-y-5 ${className}`}>
      {/* 1. Header & Vernacular Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-500 text-slate-900 shadow-xs">
              <Languages size={17} />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Smart Vernacular Layer</span>
                <span className="rounded-full bg-yellow-300 text-slate-900 px-2 py-0.2 text-[9px] font-black uppercase">
                  STEM Hybrid
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Native conceptual pedagogy while strictly preserving standardized English technical keywords.
              </p>
            </div>
          </div>
        </div>

        {/* Dual Mode Switcher Toggle */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Main Mode Toggle: Full English vs Vernacular + Tech English */}
          <div className="flex items-center gap-1 rounded-2xl border border-sky-100 bg-sky-50/60 p-1">
            <button
              type="button"
              onClick={() => setMode('full_english')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                mode === 'full_english'
                  ? 'bg-white text-slate-900 shadow-xs border border-sky-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {mode === 'full_english' && <Check size={12} className="text-sky-600 stroke-[3]" />}
              <span>Full English</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('vernacular_tech')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                mode === 'vernacular_tech'
                  ? 'bg-gradient-to-r from-yellow-300 to-amber-300 text-slate-950 shadow-xs border border-yellow-400/80'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles size={12} />
              <span>Vernacular + Tech English</span>
            </button>
          </div>

          {/* Regional Sub-language Selector (Enabled when Vernacular mode is active) */}
          {isVernacularActive && (
            <div className="flex items-center gap-1 rounded-xl border border-sky-100 bg-white p-1 animate-in fade-in">
              <button
                type="button"
                onClick={() => setTargetLang('hi')}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  targetLang === 'hi'
                    ? 'bg-sky-500 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                हिन्दी (Hindi)
              </button>
              <button
                type="button"
                onClick={() => setTargetLang('ta')}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  targetLang === 'ta'
                    ? 'bg-sky-500 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                தமிழ் (Tamil)
              </button>
              <button
                type="button"
                onClick={() => setTargetLang('te')}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  targetLang === 'te'
                    ? 'bg-sky-500 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                తెలుగు (Telugu)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Rule Assurance Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-sky-50/70 border border-sky-100 px-3.5 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-sky-600 shrink-0" />
          <span className="text-[11px] text-sky-900 font-medium">
            <strong className="font-bold">Crucial Rule Enforced:</strong> Words like{' '}
            <span className="font-mono font-bold text-sky-700 bg-white px-1 py-0.5 rounded border border-sky-200 text-[10px]">
              Enthalpy
            </span>
            ,{' '}
            <span className="font-mono font-bold text-sky-700 bg-white px-1 py-0.5 rounded border border-sky-200 text-[10px]">
              Exothermic
            </span>
            , and{' '}
            <span className="font-mono font-bold text-sky-700 bg-white px-1 py-0.5 rounded border border-sky-200 text-[10px]">
              Magnesium Ribbon
            </span>{' '}
            remain in English to ensure 100% exam curriculum adherence.
          </span>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border shadow-2xs whitespace-nowrap bg-white text-sky-700 border-sky-200">
          {displayLangKey === 'en'
            ? '✓ Mode: Pure English'
            : `✓ Language: ${targetLang.toUpperCase()} + English Terms`}
        </span>
      </div>

      {/* 3. Module Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {VERNACULAR_CHEMISTRY_MODULES.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveModuleIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeModuleIndex === idx
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Module {idx + 1}: {m.chapter}
          </button>
        ))}
      </div>

      {/* 4. Module Display Area */}
      <div className="space-y-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5">
        {/* Module Title & Balanced Equation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              {mod.chapter} · {mod.grade}
            </span>
            <h4 className="text-base font-black text-slate-900 mt-0.5">
              {renderSmartVernacular(
                (mod.title && mod.title[displayLangKey]) || mod.title.en,
                isVernacularActive
              )}
            </h4>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1 font-mono text-xs font-black text-amber-900 self-start sm:self-auto shadow-2xs">
            {mod.equation}
          </div>
        </div>

        {/* Objective */}
        <div className="text-xs text-slate-700 leading-relaxed bg-white rounded-xl p-3 border border-sky-100 shadow-2xs">
          <p className="font-bold text-slate-900 text-[11px] mb-1 flex items-center gap-1.5">
            <Beaker size={13} className="text-sky-600" /> Objective
          </p>
          <p className="text-slate-600">
            {renderSmartVernacular(
              (mod.objective && mod.objective[displayLangKey]) || mod.objective.en,
              isVernacularActive
            )}
          </p>
        </div>

        {/* Key Experimental Steps */}
        {mod.procedureSteps && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Standardized Procedure
            </span>
            <div className="space-y-1.5">
              {mod.procedureSteps.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-2.5 text-xs text-slate-700 shadow-2xs"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[10px] font-mono font-black text-sky-800 mt-0.5">
                    {step.step}
                  </span>
                  <div className="flex-1 leading-relaxed">
                    {renderSmartVernacular(
                      step[displayLangKey] || step.en,
                      isVernacularActive
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Theoretical Derivation / Explanation */}
        <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50/60 to-amber-50/40 p-3 text-xs">
          <p className="font-bold text-slate-900 text-[11px] mb-1 flex items-center gap-1.5">
            <BookOpen size={13} className="text-amber-700" /> Theoretical Foundation
          </p>
          <p className="text-slate-800 leading-relaxed">
            {renderSmartVernacular(
              (mod.theoryExplanation && mod.theoryExplanation[displayLangKey]) ||
                mod.theoryExplanation.en,
              isVernacularActive
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
