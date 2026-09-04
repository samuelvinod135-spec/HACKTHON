import { Puzzle, Brain, Atom, Rocket, Share2, PenLine } from 'lucide-react';

const GAMES = [
  { name: 'Element Bingo', icon: Puzzle, color: 'from-pink-400 to-rose-500' },
  { name: 'Atom Builder', icon: Brain, color: 'from-purple-400 to-indigo-500' },
  { name: 'Reaction Rush', icon: Atom, color: 'from-orange-400 to-amber-500' },
  { name: 'Launch Physics', icon: Rocket, color: 'from-blue-400 to-cyan-500' },
  { name: 'Lab Connect', icon: Share2, color: 'from-green-400 to-emerald-500' },
  { name: 'Formula Quiz', icon: PenLine, color: 'from-red-400 to-pink-500' },
];

export default function FunGames() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Fun Games to Learn</h3>
          <p className="text-[11px] text-gray-400">Play & reinforce concepts</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-500">
          <Puzzle size={16} />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {GAMES.map(({ name, icon: Icon, color }) => (
          <button
            key={name}
            className="group card-3d flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 p-3.5 transition hover:border-purple-200 hover:bg-white"
          >
            <div className={`bg-gradient-to-br ${color} rounded-xl p-2.5 shadow-sm transition group-hover:scale-110`}>
              <Icon size={18} />
            </div>
            <span className="text-[11px] font-medium text-gray-600">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
