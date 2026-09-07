import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Volume2, Swords, Sparkles, FlaskConical, Info } from 'lucide-react';
import PomodoroStudyRoom from '../components/Pomodoro/PomodoroStudyRoom.jsx';
import PeerBattlesPage from './PeerBattlesPage.jsx';

export default function ExperimentalBetaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  
  // Default tab: 'audio' | 'battles'
  const [activeTab, setActiveTab] = useState(requestedTab === 'battles' ? 'battles' : 'audio');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      {/* Experimental / Beta Header Banner */}
      <div className="clay-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-sky-100/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300/80 text-[11px] font-black uppercase tracking-wider mb-2 shadow-2xs">
            <Sparkles size={12} className="text-amber-600" />
            <span>Innovation Lab · Experimental & Beta</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Experimental <span className="text-sky-500">Modules</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Specialized prototype engines curated separately from the primary laboratory curriculum.
          </p>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="segmented-sky-yellow flex p-1 rounded-2xl bg-slate-100/80 w-full md:w-auto">
          <button
            onClick={() => handleTabChange('audio')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'audio'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Volume2 size={15} className={activeTab === 'audio' ? 'text-amber-500' : 'text-slate-400'} />
            <span>Web Audio Synthesizer</span>
          </button>
          <button
            onClick={() => handleTabChange('battles')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'battles'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Swords size={15} className={activeTab === 'battles' ? 'text-sky-500' : 'text-slate-400'} />
            <span>Multiplayer Battles (1v1)</span>
          </button>
        </div>
      </div>

      {/* Sub-Module Notice */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-50/70 border border-sky-200/60 text-xs font-medium text-sky-800">
        <Info size={15} className="shrink-0 text-sky-600" />
        <span>
          {activeTab === 'audio'
            ? 'Procedural Web Audio Synthesizer: Pure client-side mathematical sound synthesis with zero external audio assets.'
            : 'Multiplayer Battles: Real-time peer-to-peer science problem duel engine synchronized via WebSockets.'}
        </span>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-200">
        {activeTab === 'audio' ? (
          <div className="animate-in fade-in duration-200">
            <PomodoroStudyRoom />
          </div>
        ) : (
          <div className="animate-in fade-in duration-200">
            <PeerBattlesPage />
          </div>
        )}
      </div>
    </div>
  );
}
