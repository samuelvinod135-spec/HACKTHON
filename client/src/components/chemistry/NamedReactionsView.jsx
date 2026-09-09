import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Atom,
  Flame,
  ArrowRight
} from 'lucide-react';
import { getAllNamedReactions } from '../../data/chemistry/chemistryDatabase.js';

export default function NamedReactionsView({ onRunInLab }) {
  const namedReactions = getAllNamedReactions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('All Chapters');
  const [expandedId, setExpandedId] = useState(namedReactions[0]?.id || null);

  const chapters = useMemo(() => {
    const list = new Set(namedReactions.map((r) => r.chapter).filter(Boolean));
    return ['All Chapters', ...Array.from(list)];
  }, [namedReactions]);

  const filtered = useMemo(() => {
    return namedReactions.filter((rx) => {
      const matchQuery =
        !searchQuery ||
        rx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.generalEquation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rx.cbseTips && rx.cbseTips.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchChapter =
        selectedChapter === 'All Chapters' || rx.chapter === selectedChapter;

      return matchQuery && matchChapter;
    });
  }, [namedReactions, searchQuery, selectedChapter]);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-50 via-pink-50/40 to-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-md shadow-rose-500/20">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>CBSE Named Reactions Database</span>
                <span className="rounded-full bg-rose-100 text-rose-800 px-2.5 py-0.5 text-[10px] font-black">
                  {namedReactions.length} Iconic Reactions
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Full step-by-step electron arrow mechanisms, intermediates, conditions, and high-frequency CBSE exam tips.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Chapter Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by named reaction (e.g. Aldol, Sandmeyer, Reimer-Tiemann)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Chapter:</span>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 focus:border-rose-400 focus:outline-none cursor-pointer"
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Accordion List of Named Reactions */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
            No named reactions found matching your search.
          </div>
        ) : (
          filtered.map((rx) => {
            const isExpanded = expandedId === rx.id;
            return (
              <div
                key={rx.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:border-rose-300"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : rx.id)}
                  className="flex items-center justify-between gap-3 p-4 cursor-pointer select-none bg-slate-50/40 hover:bg-slate-50 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Sparkles size={14} className="text-rose-500 shrink-0" />
                      <span>{rx.name}</span>
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-black text-sky-800">
                        Class {rx.classLevel || 12}
                      </span>
                      <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {rx.chapter}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="flex flex-col gap-4 p-5 border-t border-slate-100 text-xs text-slate-700 animate-in fade-in duration-150">
                    {/* General Reaction Formula */}
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400">General Chemical Equation:</span>
                      <div className="mt-1 rounded-xl border border-rose-200 bg-rose-50/60 p-3 font-mono text-xs font-bold text-rose-950 overflow-x-auto">
                        {rx.generalEquation}
                      </div>
                    </div>

                    {/* Conditions, Catalysts & Key Intermediate */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                        <span className="font-bold text-slate-400 text-[10px] uppercase">Conditions:</span>
                        <p className="mt-0.5 font-semibold text-slate-800">{rx.conditions || 'Ambient'}</p>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                        <span className="font-bold text-slate-400 text-[10px] uppercase">Reagents / Catalyst:</span>
                        <p className="mt-0.5 font-semibold text-slate-800">{rx.catalyst || 'None'}</p>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                        <span className="font-bold text-slate-400 text-[10px] uppercase">Key Intermediate:</span>
                        <p className="mt-0.5 font-semibold text-purple-700">{rx.intermediate || 'Concerted'}</p>
                      </div>
                    </div>

                    {/* Step-by-Step Electron Mechanism */}
                    {(() => {
                      const steps = Array.isArray(rx.mechanismSteps)
                        ? rx.mechanismSteps
                        : typeof rx.mechanism === 'string'
                        ? rx.mechanism.split('\n').filter(Boolean)
                        : [];
                      if (steps.length === 0) return null;
                      return (
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400">Detailed Step-by-Step Mechanism:</span>
                          <div className="mt-1 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 font-medium leading-relaxed text-slate-800">
                            {steps.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white">
                                  {idx + 1}
                                </span>
                                <div className="mt-0.5 leading-relaxed">
                                  {step.replace(/^\d+\.\s*/, '')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* CBSE Tips & Pitfalls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(rx.cbseTips || rx.importantNotes) && (
                        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-amber-950">
                          <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-black text-[10px] uppercase">CBSE Board Exam Tip:</span>
                            <p className="mt-0.5 leading-relaxed">{rx.cbseTips || rx.importantNotes}</p>
                          </div>
                        </div>
                      )}

                      {rx.commonMistakes && (
                        <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50/60 p-3 text-rose-950">
                          <AlertTriangle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-black text-[10px] uppercase">Common Student Pitfall:</span>
                            <p className="mt-0.5 leading-relaxed">{rx.commonMistakes}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Run in Lab Action */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => onRunInLab && onRunInLab(rx)}
                        className="flex items-center gap-1.5 rounded-xl bg-sky-500 text-white px-4 py-2 text-xs font-black shadow-xs hover:bg-sky-600 transition cursor-pointer"
                      >
                        <FlaskConical size={14} />
                        <span>Run this Named Reaction in Virtual Lab</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
