import {
  Flame,
  Beaker,
  Atom,
  Star,
  TrendingUp,
  Compass,
  Crown,
  Timer,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext.jsx';

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

const COLORS = {
  flame: 'from-orange-400 to-red-500',
  beaker: 'from-purple-400 to-indigo-500',
  atom: 'from-blue-400 to-cyan-500',
  star: 'from-amber-300 to-yellow-500',
  'trending-up': 'from-green-400 to-emerald-500',
  compass: 'from-cyan-400 to-blue-500',
  crown: 'from-yellow-300 to-amber-500',
  timer: 'from-pink-400 to-fuchsia-500',
};

export default function Achievements() {
  const { achievements } = useProgress();

  return (
    <div className="glass flex flex-col rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Achievements</h3>
          <p className="text-[11px] text-slate-500">
            {achievements.filter((a) => a.unlocked).length}/{achievements.length} unlocked
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {achievements.map((a) => {
          const Icon = ICONS[a.icon] || Star;
          const unlocked = !!a.unlocked;
          return (
            <div
              key={a.slug}
              title={a.name + ' — ' + a.description}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition ${
                unlocked
                  ? 'border-neon-purple/30 bg-neon-purple/10'
                  : 'border-white/5 bg-white/5 opacity-45 grayscale'
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  unlocked ? `bg-gradient-to-br ${COLORS[a.icon] || COLORS.star}` : 'bg-slate-700'
                } text-white shadow`}
              >
                <Icon size={17} />
              </span>
              <span
                className={`text-[9px] font-medium leading-tight text-center ${
                  unlocked ? 'text-white' : 'text-slate-500'
                }`}
              >
                {a.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
