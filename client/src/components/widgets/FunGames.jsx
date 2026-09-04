import {
  Puzzle,
  Brain,
  Atom,
  Rocket,
  Share2,
  PenLine,
} from 'lucide-react';

const GAMES = [
  { name: 'Element Bingo', icon: Puzzle, color: 'from-pink-500 to-rose-500' },
  { name: 'Atom Builder', icon: Brain, color: 'from-purple-500 to-indigo-500' },
  { name: 'Reaction Rush', icon: Atom, color: 'from-orange-500 to-amber-500' },
  { name: 'Launch Physics', icon: Rocket, color: 'from-blue-500 to-cyan-500' },
  { name: 'Lab Connect', icon: Share2, color: 'from-green-500 to-emerald-500' },
  { name: 'Formula Quiz', icon: PenLine, color: 'from-red-500 to-pink-500' },
];

export default function FunGames() {
  return (
    <div className="glass flex flex-col rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Fun Games to Learn</h3>
          <p className="text-[11px] text-slate-500">Play & reinforce concepts</p>
        </div>
        <Puzzle size={16} className="text-neon-purple" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {GAMES.map(({ name, icon: Icon, color }) => (
          <button
            key={name}
            className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 p-3.5 text-white transition hover:border-neon-purple/30 hover:bg-white/10"
          >
            <div className={`bg-gradient-to-br ${color} rounded-xl p-2.5 shadow-md transition group-hover:scale-110`}>
              <Icon size={18} />
            </div>
            <span className="text-[11px] font-medium text-slate-200">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
