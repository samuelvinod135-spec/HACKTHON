import { Beaker, Magnet, Atom, Waves, Lightbulb, Dna, FlaskConical, Trophy } from 'lucide-react';

const EXPERIMENTS = [
  { name: 'Magnesium Ribbon Burning', icon: Beaker, color: 'bg-orange-100 text-orange-500' },
  { name: 'Pendulum Motion', icon: Magnet, color: 'bg-blue-100 text-blue-500' },
  { name: 'Chemical Reactions', icon: FlaskConical, color: 'bg-teal-100 text-teal-600' },
  { name: 'Electrolysis of Water', icon: Waves, color: 'bg-cyan-100 text-cyan-500' },
  { name: 'Projectile Launch', icon: Atom, color: 'bg-green-100 text-green-500' },
  { name: 'DNA Extraction', icon: Dna, color: 'bg-pink-100 text-pink-500' },
  { name: 'Optics & Refraction', icon: Lightbulb, color: 'bg-amber-100 text-amber-500' },
];

export default function ExploreExperiments() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900">Explore Experiments</h3>
      <p className="text-[11px] text-gray-400">Browse the science library</p>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1" style={{ maxHeight: 200 }}>
        {EXPERIMENTS.map(({ name, icon: Icon, color }) => (
          <div key={name} className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 transition hover:border-blue-200 hover:bg-white">
            <span className={`flex h-7 w-7 items-center justify-center rounded-md ${color}`}>
              <Icon size={14} />
            </span>
            <span className="text-xs font-medium text-gray-600">{name}</span>
            <Trophy size={12} className="ml-auto text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
