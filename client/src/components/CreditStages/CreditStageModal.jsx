import React from 'react';
import {
  Sparkles,
  Trophy,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  X,
  Star,
  Award,
  ChevronRight,
  FlaskConical,
  Atom,
} from 'lucide-react';
import { CREDIT_STAGES, getCreditStage } from '../../utils/creditStages.js';
import { useNavigate } from 'react-router-dom';

export default function CreditStageModal({ isOpen, onClose, credits = 0 }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const currentStageInfo = getCreditStage(credits);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="clay-card relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-sky-100 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="clay-btn-circle absolute top-6 right-6 flex h-9 w-9 items-center justify-center text-slate-400 hover:text-slate-700 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header: Tactile 3D Stage Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-sky-100 pb-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-amber-300 text-slate-900 shadow-md border-b-4 border-amber-400">
            <Trophy size={32} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-300 text-slate-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider shadow-xs">
                Stage {currentStageInfo.stage} · {currentStageInfo.status}
              </span>
              <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[10px] font-bold border border-sky-200">
                {currentStageInfo.currentCredits.toLocaleString()} Total Credits
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {currentStageInfo.title}
            </h2>
            <p className="text-xs text-slate-500">
              {currentStageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Current Stage Progress Gauge */}
        <div className="rounded-2xl border-2 border-sky-200/80 bg-sky-50/50 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-sky-900 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-500 fill-amber-400" />
              <span>Next Milestone Progression</span>
            </span>
            <span className="text-sky-700 font-mono">
              {currentStageInfo.isMaxStage
                ? 'Apex Level Attained'
                : `${currentStageInfo.creditsToNext.toLocaleString()} Credits until ${currentStageInfo.nextStageTitle}`}
            </span>
          </div>

          {/* 3D Tactile Dual Progress Bar */}
          <div className="h-3.5 w-full rounded-full bg-white p-0.5 border border-sky-200 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-700 shadow-xs"
              style={{ width: `${currentStageInfo.progressPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>{currentStageInfo.minCredits.toLocaleString()} Credits</span>
            <span className="font-bold text-sky-800">{currentStageInfo.progressPct}% Completed</span>
            <span>{currentStageInfo.maxCredits.toLocaleString()} Credits</span>
          </div>
        </div>

        {/* Unlocked Perks at Current Stage */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            <span>Active Stage Privileges & Perks</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {currentStageInfo.perks.map((perk, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-2xl border border-sky-100 bg-white p-3 shadow-xs hover:border-sky-300 transition"
              >
                <CheckCircle2 size={15} className="text-sky-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800 leading-snug">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete 6-Stage Roadmap */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Laboratory Credit Stages Roadmap
            </h3>
            <span className="text-[10px] font-bold text-slate-400">6 Scientific Tiers</span>
          </div>

          <div className="space-y-2">
            {CREDIT_STAGES.map((stg) => {
              const isCurrent = stg.stage === currentStageInfo.stage;
              const isPast = stg.stage < currentStageInfo.stage;
              const isLocked = stg.stage > currentStageInfo.stage;

              return (
                <div
                  key={stg.stage}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                    isCurrent
                      ? 'border-2 border-amber-400 bg-amber-50/60 shadow-sm'
                      : isPast
                      ? 'border-sky-200 bg-sky-50/30'
                      : 'border-slate-100 bg-white opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                        isCurrent
                          ? 'bg-amber-300 text-slate-950 shadow-xs'
                          : isPast
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isPast ? <CheckCircle2 size={16} /> : isLocked ? <Lock size={14} /> : stg.stage}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{stg.title}</span>
                        {isCurrent && (
                          <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-2xs">
                            CURRENT STAGE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{stg.description}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-sky-800">
                      {stg.minCredits.toLocaleString()}+ XP
                    </span>
                    <p className="text-[10px] font-semibold text-slate-400">{stg.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Footer: Collect More Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-sky-100">
          <span className="text-xs font-medium text-slate-500 text-center sm:text-left">
            Earn credits by solving Quizzes, Mock Tests, Peer Battles, and OCR problems.
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                navigate('/quizzes');
              }}
              className="clay-btn-yellow flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-black text-slate-900 shadow-md"
            >
              <span>Solve Quizzes (+50 XP)</span>
              <ArrowRight size={13} />
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/battles');
              }}
              className="clay-btn-sky flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white shadow-md"
            >
              <span>Peer Battle (+100 XP)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
