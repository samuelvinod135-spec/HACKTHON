import { Flame, Beaker, Atom, Star, TrendingUp, Compass, Crown, Timer } from 'lucide-react';
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
  beaker: 'from-sky-400 to-blue-500',
  atom: 'from-blue-400 to-cyan-500',
  star: 'from-amber-300 to-yellow-500',
  'trending-up': 'from-green-400 to-emerald-500',
  compass: 'from-cyan-400 to-blue-500',
  crown: 'from-yellow-300 to-amber-500',
  timer: 'from-amber-400 to-orange-500',
};

export default function Achievements() {
  const { achievements } = useProgress();

  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Achievements</h3>
          <p className="text-[11px] text-gray-400">
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
                  ? 'border-yellow-200 bg-yellow-50 shadow-sm'
                  : 'border-gray-100 bg-gray-50 opacity-40 grayscale'
              }`}
            >
              <span className={`hex-badge flex h-10 w-10 items-center justify-center ${unlocked ? `bg-gradient-to-br ${COLORS[a.icon] || COLORS.star}` : 'bg-gray-200'} text-white shadow`}>
                <Icon size={17} />
              </span>
              <span className={`text-[9px] font-medium leading-tight text-center ${unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                {a.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
