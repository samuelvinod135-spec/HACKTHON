import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Atom, Flame, Sparkles } from 'lucide-react';
import ChemistryWorkspace from '../components/ChemistryWorkspace.jsx';

export default function ChemistryLab({ initialTab = 'organic' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || initialTab;
  const [activeTab, setActiveTab] = useState(activeTabParam);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4">
      {/* Clay UI Header with Dedicated Organic Chemistry Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-100 bg-white p-3.5 shadow-sm">
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
              <span>{activeTab === 'organic' ? '🌿 Organic Chemistry Realm' : '🧪 Chemistry Gamified Studio'}</span>
              <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-slate-900 shadow-xs">
                2,209 Reactions Live
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Diazonium Salts · Benzene · Aldehydes & Ketones · Haloalkanes · GOC · 118 Anime Champions
            </p>
          </div>
        </div>

        {/* Realm Selector Tabs */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-sky-100 bg-sky-50/60 p-1">
          <button
            onClick={() => handleTabChange('organic')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black transition ${
              activeTab === 'organic'
                ? 'bg-gradient-to-r from-yellow-300 to-amber-300 text-slate-900 shadow-sm border border-yellow-400/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={14} className={activeTab === 'organic' ? 'fill-slate-900' : ''} />
            <span>🌿 Organic Chemistry Realm</span>
          </button>

          <button
            onClick={() => handleTabChange('inorganic')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black transition ${
              activeTab === 'inorganic'
                ? 'bg-white text-sky-800 shadow-sm border border-sky-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame size={14} className="text-sky-600" />
            <span>🧪 Inorganic & Flame Lab</span>
          </button>

          <button
            onClick={() => handleTabChange('periodic')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black transition ${
              activeTab === 'periodic'
                ? 'bg-white text-sky-800 shadow-sm border border-sky-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Atom size={14} className="text-sky-600" />
            <span>👑 118 Anime Champions</span>
          </button>
        </div>
      </div>

      <ChemistryWorkspace activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
}
