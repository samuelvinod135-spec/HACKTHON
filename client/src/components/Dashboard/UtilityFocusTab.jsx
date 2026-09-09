import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Swords,
  Volume2,
  VolumeX,
  Star,
  Award,
  FlaskConical,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Flame,
  Radio,
} from 'lucide-react';

export default function UtilityFocusTab({ className = '' }) {
  // Audio state
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState('432Hz'); // 432Hz (Study) | 528Hz (Focus) | Beta (Active Recall)

  const toggleSynth = () => {
    setIsPlayingSynth((prev) => !prev);
  };

  return (
    <div className={`clay-card rounded-3xl border border-sky-100 bg-white p-6 shadow-sm space-y-6 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Utility & Focus Hub</span>
            <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[9px] font-bold">
              Secondary Support Tools
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Gamified arena challenges and binaural focus tools positioned to support your learning workflow without distraction.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Module 1: 1v1 Peer Battle Arena */}
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/60 to-white p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Swords size={16} />
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200">
                Multiplayer Sandbox
              </span>
            </div>
            <h4 className="text-sm font-black text-slate-900">
              1v1 Peer Science Battles
            </h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Test your reaction kinetics and physics ray-tracing intuition against classmates in real-time synchronized showdowns.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400">Match queue: 14 scholars online</span>
            <Link
              to="/battles"
              className="clay-btn-yellow inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-slate-900 shadow-xs"
            >
              Enter Arena <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Module 2: Binaural Audio Synthesizer */}
        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/40 to-yellow-50/30 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Radio size={16} />
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                Binaural Focus
              </span>
            </div>
            <h4 className="text-sm font-black text-slate-900">
              Scientific Audio Synthesizer
            </h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Synthesize calming ambient frequencies engineered to sustain deep concentration during long stoichiometric derivations.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {['432Hz', '528Hz', 'Alpha'].map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setActiveFrequency(freq)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition ${
                    activeFrequency === freq
                      ? 'bg-amber-400 text-slate-950 font-black shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-amber-100'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleSynth}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition ${
                isPlayingSynth
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isPlayingSynth ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{isPlayingSynth ? 'Playing' : 'Start Tone'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module 3: Medals & Gamified Milestones Summary */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award size={15} className="text-amber-500" />
            <span className="text-xs font-black text-slate-800">Earned Achievement Badges</span>
          </div>
          <Link to="/achievements" className="text-[10px] font-bold text-sky-600 hover:underline">
            View All Badges
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 border border-slate-100 shadow-2xs">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Star size={15} fill="currentColor" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight">Science Explorer</p>
              <span className="text-[9px] text-slate-400 font-medium">Rank I Unlocked</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 border border-slate-100 shadow-2xs">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <FlaskConical size={15} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight">Chem Whiz</p>
              <span className="text-[9px] text-slate-400 font-medium">25 Reactions</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 border border-slate-100 shadow-2xs">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <Rocket size={15} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight">Young Physicist</p>
              <span className="text-[9px] text-slate-400 font-medium">Optics Mastered</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 border border-slate-100 shadow-2xs">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
              <Flame size={15} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight">7-Day Streak</p>
              <span className="text-[9px] text-slate-400 font-medium">Consistent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
