import {
  Beaker,
  Magnet,
  Atom,
  Waves,
  Lightbulb,
  Dna,
  FlaskConical,
  Trophy,
} from 'lucide-react';

const EXPERIMENTS = [
  { name: 'Magnesium Ribbon Burning', icon: Beaker, color: 'bg-orange-500/20 text-orange-300' },
  { name: 'Pendulum Motion', icon: Magnet, color: 'bg-blue-500/20 text-blue-300' },
  { name: 'Chemical Reactions', icon: FlaskConical, color: 'bg-purple-500/20 text-purple-300' },
  { name: 'Electrolysis of Water', icon: Waves, color: 'bg-cyan-500/20 text-cyan-300' },
  { name: 'Projectile Launch', icon: Atom, color: 'bg-green-500/20 text-green-300' },
  { name: 'DNA Extraction', icon: Dna, color: 'bg-pink-500/20 text-pink-300' },
  { name: 'Optics & Refraction', icon: Lightbulb, color: 'bg-amber-500/20 text-amber-300' },
];

export default function ExploreExperiments() {
  return (
    <div className="glass flex flex-col rounded-2xl p-4">
      <h3 className="text-sm font-semibold text-white">Explore Experiments</h3>
      <p className="text-[11px] text-slate-500">Browse the science library</p>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1" style={{ maxHeight: 200 }}>
        {EXPERIMENTS.map(({ name, icon: Icon, color }) => (
          <div
            key={name}
            className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/5 px-3 py-2 transition hover:border-neon-purple/30 hover:bg-white/10"
          >
            <span className={`flex h-7 w-7 items-center justify-center rounded-md ${color}`}>
              <Icon size={14} />
            </span>
            <span className="text-xs font-medium text-slate-200">{name}</span>
            <Trophy size={12} className="ml-auto text-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
}
