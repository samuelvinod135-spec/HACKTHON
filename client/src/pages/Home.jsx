import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  FlaskConical,
  Atom,
  Plus,
  ArrowUpRight,
  Flame,
  Timer,
  Clock,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import FunGames from '../components/widgets/FunGames.jsx';
import MyProgress from '../components/widgets/MyProgress.jsx';
import Achievements from '../components/widgets/Achievements.jsx';

/* eslint-disable-next-line react/prop-types */
function SearchBar({ query, setQuery }) {
  return (
    <div className="relative max-w-md">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search experiments, quizzes, topics…"
        className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/30"
      />
    </div>
  );
}

const WORKSPACES = [
  {
    to: '/chemistry',
    title: 'New Chemistry Workspace',
    desc: 'Build reactions, balance equations & observe chemical change',
    icon: FlaskConical,
    iconBg: 'from-neon-purple to-fuchsia-500',
    ring: 'hover:border-neon-purple/50',
    hoverGlow: 'group-hover:shadow-neon-purple/40',
    accent: 'text-neon-purple',
    sample: '2Mg + O₂ → 2MgO',
  },
  {
    to: '/physics',
    title: 'New Physics Workspace',
    desc: 'Model motion, forces, light & mechanics from a blank canvas',
    icon: Atom,
    iconBg: 'from-neon-blue to-cyan-500',
    ring: 'hover:border-neon-blue/50',
    hoverGlow: 'group-hover:shadow-neon-blue/40',
    accent: 'text-neon-blue',
    sample: 'F = m · a',
  },
];

const RECENT = [
  {
    title: 'Magnesium Ribbon Burning',
    kind: 'Chemistry',
    link: '/chemistry',
    icon: Flame,
    grad: 'from-orange-400 to-red-500',
    time: '2d ago',
  },
  {
    title: 'Pendulum Motion',
    kind: 'Physics',
    link: '/physics',
    icon: Atom,
    grad: 'from-blue-400 to-cyan-500',
    time: '5d ago',
  },
  {
    title: 'Reaction Speed Test',
    kind: 'Chemistry',
    link: '/chemistry',
    icon: FlaskConical,
    grad: 'from-neon-purple to-fuchsia-500',
    time: '1w ago',
  },
  {
    title: 'Lens Refraction',
    kind: 'Physics',
    link: '/physics',
    icon: Atom,
    grad: 'from-cyan-400 to-teal-500',
    time: '1w ago',
  },
];

export default function Home() {
  const { student } = useProgress();
  const [query, setQuery] = useState('');
  const name = student ? student.name.split(' ')[0] : 'Alex';

  const filteredRecent = RECENT.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="neon-text">{name}</span> 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Where would you like to experiment today?
          </p>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Create New Workspace */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
          <Plus size={15} className="text-neon-purple" /> Create New Workspace
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {WORKSPACES.map(({ to, title, desc, icon: Icon, iconBg, ring, hoverGlow, sample }) => (
            <Link
              key={to}
              to={to}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition ${ring} hover:bg-white/5`}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${iconBg} opacity-20 blur-[70px] transition group-hover:opacity-40`}
              />
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} text-white shadow-lg ${hoverGlow} transition group-hover:scale-105`}
                >
                  <Icon size={26} />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-neon-cyan">
                  Start <ArrowUpRight size={13} />
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
              <p className="mt-1 text-xs text-slate-400">{desc}</p>
              <span className="mt-4 inline-block w-fit rounded-lg bg-black/30 px-3 py-1.5 font-mono text-xs text-slate-300">
                {sample}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Experiments */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
          <Clock size={15} className="text-neon-blue" /> Recent Experiments
        </h2>
        {filteredRecent.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-sm text-slate-500">
            No experiments match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRecent.map(({ title, kind, link, icon: Icon, grad, time }) => (
              <Link
                key={title}
                to={link}
                className="glass group flex flex-col rounded-2xl p-4 transition hover:border-neon-purple/40"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-white shadow`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Timer size={11} /> {time}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{title}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">
                    {kind}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-slate-500 transition group-hover:text-neon-purple"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Dashboard widgets */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MyProgress />
        <Achievements />
        <FunGames />
      </section>
    </div>
  );
}
