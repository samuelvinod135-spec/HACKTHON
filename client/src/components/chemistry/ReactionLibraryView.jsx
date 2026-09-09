import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  FlaskConical,
  GripVertical,
  Bookmark,
  Share2,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Flame,
  Check,
  Eye,
  Info
} from 'lucide-react';
import {
  getAllChemistryReactions,
  searchChemistryReactions,
  CHEMISTRY_FILTER_OPTIONS
} from '../../data/chemistry/chemistryDatabase.js';

export default function ReactionLibraryView({ onRunInLab, onAddToWorkspace, onOpenExplain, initialFilters = {} }) {
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState(initialFilters.classLevel || 'All Classes');
  const [categoryFilter, setCategoryFilter] = useState(initialFilters.category || 'All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulties');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  const [selectedReaction, setSelectedReaction] = useState(null);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('labxplore_saved_chemistry_reactions') || '[]');
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState(null);

  // Filtered and searched reactions
  const searchResults = useMemo(() => {
    return searchChemistryReactions(query, {
      classLevel: classFilter,
      category: categoryFilter,
      difficulty: difficultyFilter
    }, 12000, 0);
  }, [query, classFilter, categoryFilter, difficultyFilter]);

  const totalResults = searchResults.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  // Current page slice
  const pagedReactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return searchResults.slice(start, start + pageSize);
  }, [searchResults, currentPage, pageSize]);

  const handleFilterChange = (setter, val) => {
    setter(val);
    setCurrentPage(1);
  };

  const toggleSave = (reaction) => {
    const isSaved = savedIds.includes(reaction.id);
    let next;
    if (isSaved) {
      next = savedIds.filter((id) => id !== reaction.id);
    } else {
      next = [...savedIds, reaction.id];
    }
    setSavedIds(next);
    try {
      localStorage.setItem('labxplore_saved_chemistry_reactions', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = (reaction) => {
    const text = `LabXplore Reaction: ${reaction.name}\n${reaction.equation}\nClass: ${reaction.classLevel || 12} | ${reaction.chapter || 'Chemistry'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(reaction.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-3 rounded-3xl border border-sky-100 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Search className="text-sky-500" size={22} />
              <span>Chemical Reactions Library</span>
              <span className="rounded-full bg-sky-100 text-sky-700 px-2.5 py-0.5 text-xs font-black">
                {totalResults.toLocaleString()} Reactions
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant multi-token search across chemical names, formulas, reactants, products, and mechanisms.
            </p>
          </div>

          {/* Quick Clear Button if search is active */}
          {(query || classFilter !== 'All Classes' || categoryFilter !== 'All Categories' || difficultyFilter !== 'All Difficulties') && (
            <button
              onClick={() => {
                setQuery('');
                setClassFilter('All Classes');
                setCategoryFilter('All Categories');
                setDifficultyFilter('All Difficulties');
                setCurrentPage(1);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={14} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by formula (e.g. NaOH, H2SO4, C2H5OH), reaction name (e.g. Esterification), or chapter..."
            className="w-full rounded-2xl border-2 border-sky-100 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none transition"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Class Filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-400 mr-1">Class:</span>
            {CHEMISTRY_FILTER_OPTIONS.classes.map((cls) => (
              <button
                key={cls}
                onClick={() => handleFilterChange(setClassFilter, cls)}
                className={`rounded-xl px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  classFilter === cls
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden md:block" />

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => handleFilterChange(setCategoryFilter, e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 focus:border-sky-400 focus:outline-none cursor-pointer"
            >
              {CHEMISTRY_FILTER_OPTIONS.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-1.5">
            <select
              value={difficultyFilter}
              onChange={(e) => handleFilterChange(setDifficultyFilter, e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 focus:border-sky-400 focus:outline-none cursor-pointer"
            >
              {CHEMISTRY_FILTER_OPTIONS.difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header with Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        <span className="text-xs font-bold text-slate-500">
          Showing <strong className="text-slate-900">{Math.min(totalResults, (currentPage - 1) * pageSize + 1)}-{Math.min(totalResults, currentPage * pageSize)}</strong> of <strong className="text-slate-900">{totalResults.toLocaleString()}</strong> reactions
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="px-3 text-xs font-black text-slate-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Reaction Cards Grid */}
      {pagedReactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Search size={40} className="text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No chemical reactions match your query</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Try adjusting your search keywords, clearing filters, or searching for broader chemical formulas like "HCl", "NaOH", or "Ethanol".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagedReactions.map((rx) => {
            const isSaved = savedIds.includes(rx.id);
            const isCopied = copiedId === rx.id;

            return (
              <div
                key={rx.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition hover:border-sky-400 hover:shadow-md"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-lg bg-sky-100 text-sky-800 px-2 py-0.5 text-[10px] font-black">
                        Class {rx.classLevel || 12}
                      </span>
                      <span className="rounded-lg bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px] font-bold line-clamp-1 max-w-[130px]">
                        {rx.chapter || 'Chemistry'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleSave(rx)}
                        title={isSaved ? 'Remove from saved' : 'Save reaction'}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition cursor-pointer ${
                          isSaved ? 'bg-amber-100 text-amber-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                        }`}
                      >
                        <Bookmark size={14} className={isSaved ? 'fill-current' : ''} />
                      </button>

                      <button
                        onClick={() => handleShare(rx)}
                        title="Copy reaction details"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
                      >
                        {isCopied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Reaction Name */}
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-sky-600 transition line-clamp-1">
                    {rx.name}
                  </h3>

                  {/* Chemical Equation Box */}
                  <div className="mt-2.5 rounded-xl border border-sky-100 bg-sky-50/40 p-2.5 font-mono text-xs font-bold text-slate-900 overflow-x-auto whitespace-nowrap">
                    {rx.equation}
                  </div>

                  {/* Conditions & Reaction Type */}
                  <div className="mt-2 flex flex-col gap-1 text-[11px] text-slate-600">
                    {rx.reactionType && (
                      <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <Sparkles size={12} className="text-yellow-500 shrink-0" />
                        <span className="line-clamp-1">{rx.reactionType}</span>
                      </div>
                    )}
                    {rx.conditions && rx.conditions !== 'Standard Ambient' && (
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Flame size={12} className="text-orange-500 shrink-0" />
                        <span className="line-clamp-1">Conditions: {rx.conditions}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5">
                  <button
                    onClick={() => setSelectedReaction(rx)}
                    className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-sky-600 transition cursor-pointer"
                  >
                    <Info size={13} />
                    <span>Details</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onAddToWorkspace && onAddToWorkspace(rx)}
                      title="Add to Visual Workspace"
                      className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <GripVertical size={13} />
                      <span className="hidden sm:inline">Workspace</span>
                    </button>

                    <button
                      onClick={() => onRunInLab && onRunInLab(rx)}
                      className="flex items-center gap-1 rounded-lg bg-sky-500 text-white px-2.5 py-1 text-xs font-black shadow-xs hover:bg-sky-600 transition cursor-pointer"
                    >
                      <FlaskConical size={13} />
                      <span>Run in Lab</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <span className="px-3 text-xs font-bold text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Detailed Reaction Information Modal */}
      {selectedReaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50/80 p-5">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-sky-500 text-white px-2 py-0.5 text-[10px] font-black">
                    Class {selectedReaction.classLevel || 12}
                  </span>
                  <span className="rounded-lg bg-slate-200 text-slate-700 px-2 py-0.5 text-[10px] font-bold">
                    {selectedReaction.chapter || 'Chemistry'}
                  </span>
                  {selectedReaction.reactionType && (
                    <span className="rounded-lg bg-yellow-100 text-yellow-800 px-2 py-0.5 text-[10px] font-bold">
                      {selectedReaction.reactionType}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                  {selectedReaction.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedReaction(null)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex flex-col gap-4 overflow-y-auto p-5 text-xs text-slate-700">
              {/* Equation Box */}
              <div>
                <label className="text-[11px] font-black uppercase text-slate-400">Chemical Equation</label>
                <div className="mt-1 rounded-2xl border border-sky-200 bg-sky-50/70 p-3.5 font-mono text-sm font-bold text-sky-950 overflow-x-auto">
                  {selectedReaction.equation}
                </div>
              </div>

              {/* Conditions & Reagents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <span className="font-bold text-slate-500">Conditions:</span>
                  <p className="mt-0.5 font-medium text-slate-800">
                    {selectedReaction.conditions || 'Room temperature / standard ambient'}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <span className="font-bold text-slate-500">Catalyst / Medium:</span>
                  <p className="mt-0.5 font-medium text-slate-800">
                    {selectedReaction.catalysts ? selectedReaction.catalysts.join(', ') : 'None'}
                  </p>
                </div>
              </div>

              {/* Mechanism / Explanation */}
              {selectedReaction.explanation && (
                <div>
                  <label className="text-[11px] font-black uppercase text-slate-400">Reaction Mechanism & Principles</label>
                  <div className="mt-1 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 leading-relaxed text-slate-700">
                    {selectedReaction.explanation}
                  </div>
                </div>
              )}

              {/* Observations */}
              {selectedReaction.observations && (
                <div>
                  <label className="text-[11px] font-black uppercase text-slate-400">Laboratory Observations</label>
                  <div className="mt-1 rounded-2xl border border-amber-100 bg-amber-50/60 p-3.5 leading-relaxed text-amber-900 font-medium">
                    {selectedReaction.observations}
                  </div>
                </div>
              )}

              {/* Safety Precautions */}
              {selectedReaction.safety && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/60 p-3.5 text-rose-900">
                  <ShieldAlert size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-[11px] uppercase">Safety Warning:</span>
                    <p className="mt-0.5">{selectedReaction.safety}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 p-4">
              <button
                onClick={() => {
                  toggleSave(selectedReaction);
                }}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition cursor-pointer ${
                  savedIds.includes(selectedReaction.id)
                    ? 'border-amber-300 bg-amber-100 text-amber-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bookmark size={15} />
                <span>{savedIds.includes(selectedReaction.id) ? 'Saved in Collection' : 'Save to Collection'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const rx = selectedReaction;
                    setSelectedReaction(null);
                    onAddToWorkspace && onAddToWorkspace(rx);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  <GripVertical size={15} />
                  <span>Add to Workspace</span>
                </button>

                <button
                  onClick={() => {
                    const rx = selectedReaction;
                    setSelectedReaction(null);
                    onRunInLab && onRunInLab(rx);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-sky-500 text-white px-4 py-2 text-xs font-black shadow-md hover:bg-sky-600 transition cursor-pointer"
                >
                  <FlaskConical size={15} />
                  <span>Run in Virtual Lab</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
