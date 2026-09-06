import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  FlaskConical,
  Atom,
  Flame,
  Sparkles,
  GripVertical,
  Layers,
} from 'lucide-react';
import ChemistryWorkspace from '../components/ChemistryWorkspace.jsx';
import DragDropChemistryWorkspace from '../components/DragDropChemistryWorkspace.jsx';

export default function ChemistryLab({ initialTab = 'drag-and-drop' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab');
  // If tab is drag-and-drop or canvas, use drag-and-drop; otherwise if specified use it; else fallback to initialTab
  const activeTab = rawTab || initialTab || 'drag-and-drop';

  const isDragDrop = activeTab === 'drag-and-drop' || activeTab === 'canvas';
  const isOrganicRealm = !isDragDrop;

  const handleModeChange = (mode) => {
    setSearchParams({ tab: mode });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4">
      {/* Top Header Card with Two Primary Chemistry Lab Sub-Pages */}
      <div className="flex flex-col gap-3 rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-700 shadow-xs transition hover:bg-sky-100 active:scale-95"
              title="Back to dashboard"
            >
              <ArrowLeft size={18} />
            </Link>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-500 text-white shadow-md shadow-sky-500/20">
              <FlaskConical size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Chemistry Laboratory Hub</span>
                <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-slate-900 shadow-xs">
                  2 Workspaces
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Choose between the classic Drag & Drop Reaction Canvas or the new Organic & Anime RPG Studio
              </p>
            </div>
          </div>

          {/* Primary Two Sub-Page Mode Switcher */}
          <div className="flex items-center gap-2 rounded-2xl border-2 border-sky-100 bg-slate-50/80 p-1.5 shadow-inner">
            {/* Option 1: Drag & Drop Interactive Lab */}
            <button
              onClick={() => handleModeChange('drag-and-drop')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                isDragDrop
                  ? 'bg-gradient-to-r from-yellow-300 to-amber-300 text-slate-900 shadow-md border border-yellow-400/80 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <GripVertical size={16} />
              <div className="text-left">
                <div className="leading-tight">✋ Drag & Drop Lab</div>
                <div className="text-[9px] font-bold opacity-80">Interactive Canvas</div>
              </div>
            </button>

            {/* Option 2: Organic Chemistry & Anime RPG */}
            <button
              onClick={() => handleModeChange('organic')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                isOrganicRealm
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 border border-sky-400 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Sparkles size={16} className={isOrganicRealm ? 'text-yellow-300' : ''} />
              <div className="text-left">
                <div className="leading-tight">🌿 Organic & Anime RPG</div>
                <div className="text-[9px] font-bold opacity-80">2,209 Rx & 118 Heroes</div>
              </div>
            </button>
          </div>
        </div>

        {/* Sub-realm Secondary Pills when in Organic Mode */}
        {isOrganicRealm && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Layers size={14} className="text-sky-500" />
              <span>Organic Studio Realms:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleModeChange('organic')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-black transition cursor-pointer ${
                  activeTab === 'organic'
                    ? 'bg-yellow-300 text-slate-950 border border-yellow-400 shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Sparkles size={13} />
                <span>🌿 Diazonium, Carbonyl & GOC Hub</span>
              </button>

              <button
                onClick={() => handleModeChange('inorganic')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-black transition cursor-pointer ${
                  activeTab === 'inorganic'
                    ? 'bg-sky-500 text-white border border-sky-400 shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Flame size={13} />
                <span>🧪 Inorganic & Flame Lab</span>
              </button>

              <button
                onClick={() => handleModeChange('periodic')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-black transition cursor-pointer ${
                  activeTab === 'periodic'
                    ? 'bg-sky-500 text-white border border-sky-400 shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Atom size={13} />
                <span>👑 118 Anime Champions</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Render the Active Sub-Workspace */}
      {isDragDrop ? (
        <DragDropChemistryWorkspace onSwitchToOrganic={() => handleModeChange('organic')} />
      ) : (
        <ChemistryWorkspace
          activeTab={activeTab === 'drag-and-drop' ? 'organic' : activeTab}
          setActiveTab={handleModeChange}
          onSwitchToDragDrop={() => handleModeChange('drag-and-drop')}
        />
      )}
    </div>
  );
}
