import { Link } from 'react-router-dom';
import { Beaker, Magnet, Atom, Waves, Lightbulb, Dna, FlaskConical, Trophy, ChevronRight } from 'lucide-react';

const EXPERIMENTS = [
  { name: 'Magnesium Ribbon Burning', link: '/chemistry', icon: Beaker, color: 'bg-orange-100 text-orange-500' },
  { name: 'Pendulum Motion', link: '/physics', icon: Magnet, color: 'bg-blue-100 text-blue-500' },
  { name: 'Chemical Reactions', link: '/chemistry', icon: FlaskConical, color: 'bg-teal-100 text-teal-600' },
  { name: 'Electrolysis of Water', link: '/chemistry', icon: Waves, color: 'bg-cyan-100 text-cyan-500' },
  { name: 'Projectile Launch', link: '/physics', icon: Atom, color: 'bg-green-100 text-green-500' },
  { name: 'DNA Extraction', link: '/chemistry', icon: Dna, color: 'bg-pink-100 text-pink-500' },
  { name: 'Optics & Refraction', link: '/physics', icon: Lightbulb, color: 'bg-amber-100 text-amber-500' },
];

export default function ExploreExperiments() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Explore Experiments</h3>
          <p className="text-[11px] text-gray-400">Browse the science library</p>
        </div>
        <Link to="/chemistry" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
          View all <ChevronRight size={12} />
        </Link>
      </div>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1" style={{ maxHeight: 200 }}>
        {EXPERIMENTS.map(({ name, link, icon: Icon, color }) => (
          <Link
            key={name}
            to={link}
            className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 transition hover:border-blue-200 hover:bg-white"
          >
            <span className={`flex h-7 w-7 items-center justify-center rounded-md ${color}`}>
              <Icon size={14} />
            </span>
            <span className="text-xs font-medium text-gray-600">{name}</span>
            <Trophy size={12} className="ml-auto text-gray-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
