import { useState } from 'react';
import {
  Search,
  ChevronDown,
  GripVertical,
  Atom,
  Timer,
  Rocket,
  TrendingUp,
  Waves,
  Magnet,
  Box,
  Sliders,
  Sparkles,
  Zap,
  Flame,
  Scale,
} from 'lucide-react';
import { PHYSICS_COMPONENTS, PHYSICS_CATEGORIES } from '../../physicsData.js';
import { sounds } from '../../utils/soundEffects.js';

function ComponentIcon({ id, type, size = 18 }) {
  const p = { size };
  switch (id || type) {
    case 'laser': return <Sparkles {...p} />;
    case 'convex_lens': return <Atom {...p} />;
    case 'concave_lens': return <Atom {...p} />;
    case 'prism': return <Sparkles {...p} />;
    case 'mirror': return <Sliders {...p} />;
    case 'pendulum': return <Timer {...p} />;
    case 'projectile': return <Rocket {...p} />;
    case 'ramp': return <TrendingUp {...p} />;
    case 'spring': return <Waves {...p} />;
    case 'pulley': return <Box {...p} />;
    case 'buoyancy': return <Waves {...p} />;
    case 'vernier': return <Scale {...p} />;
    case 'screw_gauge': return <Scale {...p} />;
    case 'wave_gen': return <Waves {...p} />;
    case 'doppler': return <Waves {...p} />;
    case 'gas_cylinder': return <Flame {...p} />;
    case 'circuit_dc': return <Zap {...p} />;
    case 'magnet': return <Magnet {...p} />;
    case 'photoelectric': return <Zap {...p} />;
    default: return <Atom {...p} />;
  }
}

export default function PhysicsPalette({ onSelectComponent }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleDragStart = (e, comp) => {
    sounds.playClick();
    e.dataTransfer.setData('application/labxplore-physics-comp', JSON.stringify(comp));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const filteredComponents = PHYSICS_COMPONENTS.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-l border-slate-100 bg-white/90 backdrop-blur-md">
      {/* Search & Category Filter Header */}
      <div className="border-b border-slate-100 p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Physics Palette
          </p>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
            {filteredComponents.length} items
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search apparatus..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 pl-8 pr-2 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-teal-400 focus:bg-white focus:shadow-xs"
          />
        </div>

        {/* Category Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown((s) => !s)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <span>{selectedCategory}</span>
            <ChevronDown size={13} className={`text-slate-400 transition ${showCategoryDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showCategoryDropdown && (
            <div className="clay-card absolute left-0 right-0 z-30 mt-1 max-h-56 overflow-y-auto rounded-xl bg-white p-1 shadow-lg border border-slate-100">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setShowCategoryDropdown(false);
                }}
                className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition ${
                  selectedCategory === 'All' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Categories
              </button>
              {PHYSICS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition ${
                    selectedCategory === cat ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Component Cards Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredComponents.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No apparatus matching "{search}"
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                draggable
                onDragStart={(e) => handleDragStart(e, comp)}
                onClick={() => onSelectComponent && onSelectComponent(comp)}
                className="group relative flex cursor-grab flex-col items-center gap-1.5 rounded-2xl border border-slate-100 bg-white p-2.5 text-center shadow-xs transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md active:cursor-grabbing"
                title={comp.description}
              >
                <GripVertical
                  size={11}
                  className="absolute right-1.5 top-1.5 text-slate-300 opacity-0 transition group-hover:opacity-100"
                />
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${comp.tone} text-white shadow-sm transition group-hover:scale-105`}
                >
                  <ComponentIcon id={comp.id} type={comp.type} size={20} />
                </span>
                <span className="text-[10px] font-bold text-slate-800 leading-tight">
                  {comp.name}
                </span>
                <span className="text-[9px] text-slate-400 font-medium truncate w-full">
                  {comp.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drag Instruction Footer */}
      <div className="border-t border-slate-100 p-2.5 text-center text-[10px] font-semibold text-slate-400">
        ⇄ Drag items onto canvas to build
      </div>
    </div>
  );
}
