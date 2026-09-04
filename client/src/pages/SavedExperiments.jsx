import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  Atom,
  Clock,
  ArrowUpRight,
  Flame,
  Sparkles,
  Waves,
  Rocket,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

const DEFAULT_SAVED = [
  {
    id: 'chem-mg',
    title: 'Magnesium Ribbon Burning',
    discipline: 'Chemistry',
    link: '/chemistry',
    icon: Flame,
    formula: '2Mg + O₂ → 2MgO',
    desc: 'Combustion reaction of magnesium with atmospheric oxygen forming white solid magnesium oxide with brilliant emission.',
    date: 'Saved 2 days ago',
    completed: true,
  },
  {
    id: 'phys-pendulum',
    title: 'Pendulum Motion & Simple Harmonics',
    discipline: 'Physics',
    link: '/physics',
    icon: Atom,
    formula: 'T = 2π √(L/g)',
    desc: 'Harmonic oscillation simulation modeling gravitational restoring forces and period variation with string length.',
    date: 'Saved 5 days ago',
    completed: true,
  },
  {
    id: 'chem-speed',
    title: 'Reaction Speed & Catalysis Test',
    discipline: 'Chemistry',
    link: '/chemistry',
    icon: FlaskConical,
    formula: 'Rate = k [A]ᵐ [B]ⁿ',
    desc: 'Kinetic investigation of reactant concentration and thermal activation energy on observation rates.',
    date: 'Saved 1 week ago',
    completed: true,
  },
  {
    id: 'phys-lens',
    title: 'Lens Refraction & Ray Optics',
    discipline: 'Physics',
    link: '/physics',
    icon: Sparkles,
    formula: '1/f = 1/dₒ + 1/dᵢ',
    desc: 'Wave and ray optics simulation measuring focal length, refraction angles through curved lenses, and image inversion.',
    date: 'Saved 1 week ago',
    completed: false,
  },
  {
    id: 'chem-electrolysis',
    title: 'Electrolysis of Water',
    discipline: 'Chemistry',
    link: '/chemistry',
    icon: Waves,
    formula: '2H₂O → 2H₂ + O₂',
    desc: 'Electrolytic decomposition of water using electrical current into diatomic hydrogen and oxygen gases at electrodes.',
    date: 'Saved 2 weeks ago',
    completed: false,
  },
  {
    id: 'phys-projectile',
    title: 'Projectile Motion & Trajectory',
    discipline: 'Physics',
    link: '/physics',
    icon: Rocket,
    formula: 'y = v₀yt - ½gt²',
    desc: 'Two-dimensional kinematic trajectory simulation modeling independent horizontal velocity and gravitational acceleration.',
    date: 'Saved 2 weeks ago',
    completed: false,
  },
];

export default function SavedExperiments() {
  const { completions } = useProgress();
  const [filter, setFilter] = useState('all');

  const filtered = DEFAULT_SAVED.filter((exp) => {
    if (filter === 'chemistry') return exp.discipline.toLowerCase() === 'chemistry';
    if (filter === 'physics') return exp.discipline.toLowerCase() === 'physics';
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Saved Experiments
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Access your archived simulations, optics setups, and recorded chemical reactions.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-1 shadow-xs">
          {['all', 'chemistry', 'physics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition ${
                filter === tab
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((exp) => {
          const Icon = exp.icon;
          return (
            <div
              key={exp.id}
              className="lab-card flex flex-col justify-between p-5 transition hover:border-sky-300"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    <Icon size={20} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                    {exp.discipline}
                  </span>
                </div>

                <h3 className="mt-3.5 text-sm font-semibold text-slate-900">{exp.title}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {exp.desc}
                </p>

                <div className="mt-3 rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-[11px] text-slate-700 border border-slate-100">
                  {exp.formula}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock size={12} /> {exp.date}
                </span>

                <Link
                  to={exp.link}
                  className="flex items-center gap-1 rounded-lg bg-yellow-400 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-xs transition hover:bg-yellow-500"
                >
                  Open in Lab <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
