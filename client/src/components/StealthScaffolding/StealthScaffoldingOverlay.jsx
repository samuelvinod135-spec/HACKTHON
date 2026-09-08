import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Target,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import { useStealthScaffoldingStore } from '../../store/useStealthScaffoldingStore.js';

export default function StealthScaffoldingOverlay({ currentTopic = 'Kinematics', className = '' }) {
  const {
    strugglingTopics,
    activeScaffolds,
    triggerScaffoldingForTopic,
    resolveScaffoldingForTopic,
  } = useStealthScaffoldingStore();

  const [isExpanded, setIsExpanded] = useState(true);

  // Check if current topic or any topic has an active autonomous scaffold
  const activeScaffold = activeScaffolds[currentTopic] || Object.values(activeScaffolds)[0];
  const isStruggling = strugglingTopics.includes(currentTopic) || !!activeScaffold;

  if (!isStruggling || !activeScaffold) {
    return (
      <div className={`flex items-center justify-between rounded-2xl bg-emerald-50/70 border border-emerald-200/80 px-4 py-2.5 text-xs text-emerald-900 ${className}`}>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold">Autonomous Stealth AI:</span>
          <span className="text-emerald-700">All topic competencies nominal. Zero remediation required.</span>
        </div>
        <button
          type="button"
          onClick={() => triggerScaffoldingForTopic(currentTopic || 'Kinematics')}
          className="text-[10px] font-black text-emerald-800 bg-white hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 transition cursor-pointer"
          title="Simulate student errors to demonstrate auto-scaffolding"
        >
          Simulate Struggle Trigger
        </button>
      </div>
    );
  }

  const { diagnosticGap, visualGuideDescription, suggestedParameter, dynamicMicroExercise } = activeScaffold;

  return (
    <div className={`relative overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white p-4 sm:p-5 shadow-lg transition-all ${className}`}>
      {/* Decorative ambient pulse in background */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/15 blur-xl" />

      {/* Top Banner: Status Header */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-200/70 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-black shadow-xs">
            <Compass size={17} className="animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md border border-amber-300">
                <Sparkles size={11} className="text-amber-800" /> Stealth Scaffolding Active
              </span>
              <span className="text-[10px] font-bold text-slate-500 hidden sm:inline">
                Topic: <strong className="text-slate-800">{activeScaffold.topic}</strong>
              </span>
            </div>
            <p className="mt-0.5 text-xs font-black text-slate-900 leading-tight">
              {diagnosticGap}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-xs font-bold px-2 py-1 rounded-lg hover:bg-amber-100/60 transition cursor-pointer"
          >
            <span>{isExpanded ? 'Collapse' : 'Expand Aid'}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded Remediation Body */}
      {isExpanded && (
        <div className="mt-3.5 space-y-3 animate-in fade-in duration-200 text-xs">
          {/* 1. Ambient Environment Adjustment Description */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-white/90 border border-amber-200/80 p-3 shadow-2xs">
            <Eye size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-slate-900 leading-tight">
                Zero-Friction Environmental Modification Deployed:
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                {visualGuideDescription}. No intrusive dialogs or modals opened.
              </p>
            </div>
          </div>

          {/* 2. Dynamically Injected Micro-Task (Autonomous Practice) */}
          {dynamicMicroExercise && (
            <div className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50/80 via-white to-sky-50/50 p-3.5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-sky-100 text-sky-800 text-[10px] font-black uppercase px-2 py-0.5">
                      Autonomous Practice Task
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {dynamicMicroExercise.equation}
                    </span>
                  </div>
                  <h4 className="mt-1 text-xs font-black text-slate-900">
                    {dynamicMicroExercise.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-slate-600">
                    {dynamicMicroExercise.taskPrompt}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => resolveScaffoldingForTopic(activeScaffold.topic)}
                    className="clay-btn-yellow inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-slate-950 shadow-xs hover:scale-105 transition-all cursor-pointer"
                  >
                    <CheckCircle2 size={13} />
                    <span>Apply Calibration</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Parameter Calibrator Glow */}
          {suggestedParameter && (
            <div className="flex items-center justify-between rounded-xl bg-amber-100/60 border border-amber-200 px-3 py-2 text-[11px] text-amber-950">
              <div className="flex items-center gap-2">
                <Sliders size={13} className="text-amber-700 shrink-0" />
                <span>
                  <strong>Suggested Parameter Anchor:</strong> {suggestedParameter.hint}
                </span>
              </div>
              <span className="font-mono font-bold bg-white px-2 py-0.5 rounded text-[10px] text-amber-900 shadow-2xs">
                {suggestedParameter.recommendedValue}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
