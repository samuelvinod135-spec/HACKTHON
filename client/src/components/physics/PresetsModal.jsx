import { useState, useMemo } from 'react';
import { X, Sparkles, ArrowRight, Search, Zap, Compass, Atom, RotateCcw } from 'lucide-react';
import {
  ALL_PHYSICS_EXPERIMENTS,
  PHYSICS_CATEGORIES,
  searchPhysicsExperiments,
  getPhysicsExperimentCount,
} from '../../data/massivePhysicsData.js';
import { sounds } from '../../utils/soundEffects.js';

const PAGE_SIZE = 36;

export default function PresetsModal({ isOpen, onClose, onSelectPreset }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const totalAllCount = useMemo(() => getPhysicsExperimentCount(), []);

  // Filter and search experiments
  const filteredExperiments = useMemo(() => {
    const res = searchPhysicsExperiments(searchQuery, selectedCategory, 500, 0);
    return res.experiments;
  }, [searchQuery, selectedCategory]);

  const displayedExperiments = useMemo(() => {
    return filteredExperiments.slice(0, visibleCount);
  }, [filteredExperiments, visibleCount]);

  if (!isOpen) return null;

  const handleSelect = (preset) => {
    sounds.playSimStart();
    onSelectPreset(preset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 sm:p-5 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="clay-card relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-gradient-to-r from-sky-50/60 via-white to-amber-50/40">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md">
              <Sparkles size={22} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Physics Experiment Library
                </h3>
                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-black text-sky-800 border border-sky-200">
                  {totalAllCount.toLocaleString()}+ Interactive Setups
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                CBSE, NCERT, JEE Main & Advanced curriculum: Ballistics, Wave Optics, Pendulums & Dynamics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col gap-3 p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search experiments by topic, velocity, launch angle, lens focal length, planet (e.g. 'jupiter', 'projectile', 'convex 160', 'moon')..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-2 pl-10 pr-10 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 transition shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVisibleCount(PAGE_SIZE);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PHYSICS_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' && <span>🌌 All</span>}
                  {cat === 'Ballistics & Kinematics' && <span>🚀 Ballistics</span>}
                  {cat === 'Optics & Wave Physics' && <span>🔬 Optics</span>}
                  {cat === 'Pendulums & Harmonic Motion' && <span>⏱️ Pendulums</span>}
                  {cat === 'Dynamics & Inclined Planes' && <span>📐 Dynamics</span>}
                  {cat === 'Springs & Elasticity' && <span>🪢 Springs</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experiment Results Count Bar */}
        <div className="flex items-center justify-between px-5 py-2 bg-slate-100/60 border-b border-slate-100 text-[11px] font-semibold text-slate-500">
          <span>
            Showing <b className="text-slate-800">{displayedExperiments.length}</b> of{' '}
            <b className="text-slate-800">{filteredExperiments.length}</b> matching setups
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-slate-400">1-click apparatus canvas injection</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 font-bold">Ready to Run</span>
          </div>
        </div>

        {/* Experiment Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[58vh]">
          {displayedExperiments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Atom size={40} className="text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">No matching experiments found</p>
              <p className="text-xs text-slate-400 mt-1">Try another search term or reset category filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayedExperiments.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => handleSelect(exp)}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-left shadow-2xs transition hover:border-sky-300 hover:bg-white hover:shadow-md cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                        {exp.category}
                      </span>
                      {exp.badge && (
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800 shrink-0">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-2 text-xs font-bold text-slate-900 group-hover:text-sky-600 transition leading-snug">
                      {exp.title}
                    </h4>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                      {exp.desc}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100/80 pt-2 text-[11px] font-bold text-sky-600">
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>{exp.components?.length || 1} Apparatus item(s)</span>
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition">
                      <span>Load Setup</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {displayedExperiments.length < filteredExperiments.length && (
            <div className="mt-6 flex justify-center pb-2">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="clay-card flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-black text-slate-700 shadow-sm hover:border-sky-300 hover:text-sky-600 transition cursor-pointer"
              >
                <span>Show More Experiments (+{PAGE_SIZE})</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
