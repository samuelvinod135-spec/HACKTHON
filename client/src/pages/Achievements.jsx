import { useState } from 'react';
import {
  Flame,
  Beaker,
  Atom,
  Star,
  TrendingUp,
  Compass,
  Crown,
  Timer,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

const ICONS = {
  flame: Flame,
  beaker: Beaker,
  atom: Atom,
  star: Star,
  'trending-up': TrendingUp,
  compass: Compass,
  crown: Crown,
  timer: Timer,
};

export default function Achievements() {
  const { achievements } = useProgress();
  const [filter, setFilter] = useState('all');

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length || 8;

  const filteredAchievements = achievements.filter((a) => {
    if (filter === 'unlocked') return !!a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Achievements
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Showcase your science milestones, reaction discoveries, and simulation masteries.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
          <span className="text-xs font-semibold text-slate-700">Completion</span>
          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
            {unlockedCount} / {totalCount}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'all', label: `All Badges (${totalCount})` },
          { key: 'unlocked', label: `Unlocked (${unlockedCount})` },
          { key: 'locked', label: `In Progress (${totalCount - unlockedCount})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              filter === key
                ? 'bg-sky-50 text-sky-700 font-semibold ring-1 ring-sky-200'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredAchievements.map((a) => {
          const Icon = ICONS[a.icon] || Star;
          const unlocked = !!a.unlocked;

          return (
            <div
              key={a.slug}
              className={`lab-card relative flex flex-col justify-between p-5 transition ${
                unlocked
                  ? 'border-amber-200/80 bg-white shadow-xs'
                  : 'border-slate-200 bg-slate-50/50 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                      unlocked
                        ? 'bg-amber-100 text-amber-600 shadow-xs'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {unlocked ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60">
                      <CheckCircle2 size={11} /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                      <Lock size={10} /> Locked
                    </span>
                  )}
                </div>

                <h3 className="mt-3.5 text-sm font-semibold text-slate-900">{a.name}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {a.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Reward</span>
                <span className="font-semibold text-amber-600">+100 XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
