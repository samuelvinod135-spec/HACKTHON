import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  FlaskConical,
  HelpCircle,
  ShieldAlert,
  CheckCircle2,
  X,
  ChevronRight,
  ListOrdered,
  Sparkles,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { getExperimentsCatalog } from '../../data/chemistry/chemistryDatabase.js';

export default function ExperimentLibraryView({ onLaunchInLab }) {
  const experiments = getExperimentsCatalog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [revealedVivaAnswers, setRevealedVivaAnswers] = useState({});

  const categories = useMemo(() => {
    const set = new Set(experiments.map((e) => e.category).filter(Boolean));
    return ['All Categories', ...Array.from(set)];
  }, [experiments]);

  const filtered = useMemo(() => {
    return experiments.filter((exp) => {
      const matchQuery =
        !searchQuery ||
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.aim.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.chemicalEquation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchClass =
        selectedClass === 'All Classes' ||
        (selectedClass === 'Class 10' && exp.classLevel === 10) ||
        (selectedClass === 'Class 11' && exp.classLevel === 11) ||
        (selectedClass === 'Class 12' && exp.classLevel === 12);

      const matchCat =
        selectedCategory === 'All Categories' || exp.category === selectedCategory;

      return matchQuery && matchClass && matchCat;
    });
  }, [experiments, searchQuery, selectedClass, selectedCategory]);

  const toggleViva = (idx) => {
    setRevealedVivaAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-sky-50/50 to-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md shadow-cyan-500/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>107 CBSE Chemistry Practicals & Virtual Labs</span>
              <span className="rounded-full bg-cyan-100 text-cyan-800 px-2.5 py-0.5 text-[10px] font-black">
                Official Curriculum
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Qualitative salt analysis, volumetric titrations, chemical kinetics, colloids, functional group tests, and viva voce questions.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experiments by aim, salt, titration, or keyword..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Class Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['All Classes', 'Class 10', 'Class 11', 'Class 12'].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-black transition cursor-pointer ${
                selectedClass === cls
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 focus:border-cyan-400 focus:outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition hover:border-cyan-400 hover:shadow-md"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-lg bg-cyan-100 text-cyan-800 px-2 py-0.5 text-[10px] font-black">
                    Class {exp.classLevel}
                  </span>
                  <span className="rounded-lg bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px] font-bold truncate max-w-[130px]">
                    {exp.category}
                  </span>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  {exp.difficulty}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-black text-slate-900 group-hover:text-cyan-600 transition line-clamp-2">
                {exp.title}
              </h3>

              {/* Aim */}
              <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {exp.aim}
              </p>

              {/* Chemical Equation Box */}
              {exp.chemicalEquation && (
                <div className="mt-2.5 rounded-xl border border-cyan-100 bg-cyan-50/40 p-2 font-mono text-[11px] font-bold text-cyan-950 truncate">
                  {exp.chemicalEquation}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedExperiment(exp);
                  setRevealedVivaAnswers({});
                }}
                className="text-xs font-bold text-slate-600 hover:text-cyan-600 transition cursor-pointer"
              >
                Procedure & Viva ({exp.vivaQuestions?.length || 3})
              </button>

              <button
                onClick={() => onLaunchInLab && onLaunchInLab(exp)}
                className="flex items-center gap-1 rounded-xl bg-cyan-600 px-3 py-1.5 text-xs font-black text-white shadow-xs hover:bg-cyan-700 transition cursor-pointer"
              >
                <FlaskConical size={13} />
                <span>Open in Lab</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Experiment Details & Viva Voce Modal */}
      {selectedExperiment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50/80 p-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-lg bg-cyan-600 text-white px-2 py-0.5 text-[10px] font-black">
                    Class {selectedExperiment.classLevel}
                  </span>
                  <span className="rounded-lg bg-slate-200 text-slate-700 px-2 py-0.5 text-[10px] font-bold">
                    {selectedExperiment.category}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {selectedExperiment.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedExperiment(null)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex flex-col gap-4 overflow-y-auto p-5 text-xs text-slate-700">
              {/* Aim Box */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 leading-relaxed">
                <span className="text-[11px] font-black uppercase text-slate-400">Aim:</span>
                <p className="mt-0.5 font-semibold text-slate-900">{selectedExperiment.aim}</p>
              </div>

              {/* Chemical Equation */}
              {selectedExperiment.chemicalEquation && (
                <div>
                  <span className="text-[11px] font-black uppercase text-slate-400">Chemical Equation & Reaction:</span>
                  <div className="mt-1 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-3 font-mono text-xs font-bold text-cyan-950 overflow-x-auto">
                    {selectedExperiment.chemicalEquation}
                  </div>
                </div>
              )}

              {/* Apparatus & Chemicals Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <span className="font-bold text-slate-400 text-[10px] uppercase">Apparatus Required:</span>
                  <ul className="mt-1 flex flex-col gap-1 list-disc list-inside text-slate-800">
                    {selectedExperiment.apparatus?.map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <span className="font-bold text-slate-400 text-[10px] uppercase">Chemicals Required:</span>
                  <ul className="mt-1 flex flex-col gap-1 list-disc list-inside text-slate-800">
                    {selectedExperiment.chemicals?.map((chem, idx) => (
                      <li key={idx}>{chem}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Procedure */}
              <div>
                <span className="text-[11px] font-black uppercase text-slate-400">Step-by-Step Laboratory Procedure:</span>
                <div className="mt-1 flex flex-col gap-1.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 leading-relaxed text-slate-800 font-medium">
                  {selectedExperiment.procedure?.map((step, idx) => (
                    <div key={idx}>{step}</div>
                  ))}
                </div>
              </div>

              {/* Observations & Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-3 text-amber-950">
                  <span className="font-black text-[10px] uppercase text-amber-800">Observation:</span>
                  <p className="mt-0.5 leading-relaxed">{selectedExperiment.observation}</p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-emerald-950">
                  <span className="font-black text-[10px] uppercase text-emerald-800">Result & Conclusion:</span>
                  <p className="mt-0.5 leading-relaxed">{selectedExperiment.result}</p>
                </div>
              </div>

              {/* Safety Warning */}
              {selectedExperiment.safety && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/60 p-3.5 text-rose-900">
                  <ShieldAlert size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-[10px] uppercase">Laboratory Safety Precautions:</span>
                    <p className="mt-0.5">{selectedExperiment.safety}</p>
                  </div>
                </div>
              )}

              {/* Viva Voce Questions & Answers */}
              {selectedExperiment.vivaQuestions && selectedExperiment.vivaQuestions.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    <span className="text-xs font-black uppercase text-slate-900">
                      CBSE Practical Viva Voce Questions ({selectedExperiment.vivaQuestions.length})
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {selectedExperiment.vivaQuestions.map((vq, idx) => {
                      const isRevealed = !!revealedVivaAnswers[idx];
                      return (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                          <div className="font-bold text-slate-900 flex items-start justify-between gap-2">
                            <span>Q{idx + 1}: {vq.q}</span>
                            <button
                              onClick={() => toggleViva(idx)}
                              className="text-[10px] font-black text-cyan-600 hover:text-cyan-800 whitespace-nowrap cursor-pointer"
                            >
                              {isRevealed ? 'Hide Answer' : 'Show Answer'}
                            </button>
                          </div>
                          {isRevealed && (
                            <div className="mt-2 rounded-lg bg-cyan-50/70 p-2.5 text-slate-700 font-medium border border-cyan-100 leading-relaxed animate-in fade-in duration-100">
                              <strong className="text-cyan-900">Answer:</strong> {vq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 p-4">
              <span className="text-xs text-slate-500 font-medium">
                Standard CBSE Chemistry Practical Syllabus
              </span>

              <button
                onClick={() => {
                  const exp = selectedExperiment;
                  setSelectedExperiment(null);
                  onLaunchInLab && onLaunchInLab(exp);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-600 text-white px-4 py-2 text-xs font-black shadow-md hover:bg-cyan-700 transition cursor-pointer"
              >
                <FlaskConical size={15} />
                <span>Launch in Virtual Lab Bench</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
