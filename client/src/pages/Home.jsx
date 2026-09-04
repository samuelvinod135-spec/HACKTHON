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
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import FunGames from '../components/widgets/FunGames.jsx';
import MyProgress from '../components/widgets/MyProgress.jsx';
import Achievements from '../components/widgets/Achievements.jsx';

function SearchBar({ query, setQuery }) {
  return (
    <div className="relative max-w-md">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search experiments, quizzes, topics…"
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-800 placeholder-gray-400 outline-none shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

const WORKSPACES = [
  {
    to: '/chemistry',
    title: 'Chemistry Lab',
    desc: 'Build reactions, balance equations & observe chemical change',
    icon: FlaskConical,
    bg: 'bg-blue-50',
    iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    ring: 'hover:border-blue-300',
    accent: 'text-blue-600',
    tag: '320+ Reactions',
    tagBg: 'bg-blue-100 text-blue-600',
    sample: '2Mg + O₂ → 2MgO',
  },
  {
    to: '/physics',
    title: 'Physics Lab',
    desc: 'Model motion, forces, light & mechanics from a blank canvas',
    icon: Atom,
    bg: 'bg-emerald-50',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    ring: 'hover:border-emerald-300',
    accent: 'text-emerald-600',
    tag: 'Simulations',
    tagBg: 'bg-emerald-100 text-emerald-600',
    sample: 'F = m · a',
  },
];

const RECENT = [
  { title: 'Magnesium Ribbon Burning', kind: 'Chemistry', link: '/chemistry', icon: Flame, iconBg: 'bg-orange-100 text-orange-500', time: '2d ago' },
  { title: 'Pendulum Motion', kind: 'Physics', link: '/physics', icon: Atom, iconBg: 'bg-emerald-100 text-emerald-500', time: '5d ago' },
  { title: 'Reaction Speed Test', kind: 'Chemistry', link: '/chemistry', icon: FlaskConical, iconBg: 'bg-blue-100 text-blue-500', time: '1w ago' },
  { title: 'Lens Refraction', kind: 'Physics', link: '/physics', icon: Sparkles, iconBg: 'bg-purple-100 text-purple-500', time: '1w ago' },
];

export default function Home() {
  const { student } = useProgress();
  const [query, setQuery] = useState('');
  const name = student ? student.name.split(' ')[0] : 'Alex';

  const filteredRecent = RECENT.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{name}</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Where would you like to experiment today?
          </p>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Create New Workspace */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          <Plus size={14} className="text-blue-500" /> Create New Workspace
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {WORKSPACES.map(({ to, title, desc, icon: Icon, bg, iconBg, ring, accent, tag, tagBg, sample }) => (
            <Link
              key={to}
              to={to}
              className={`card-3d group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition ${ring}`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-[0.07] blur-[50px] transition group-hover:opacity-[0.12]" />
              <div className="flex items-start justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} text-white shadow-lg shadow-blue-200/50 transition group-hover:scale-105`}>
                  <Icon size={26} />
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tagBg}`}>
                  {tag}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-1 text-xs text-gray-500">{desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className={`font-mono text-xs ${accent} bg-gray-50 rounded-lg px-3 py-1.5`}>
                  {sample}
                </span>
                <span className="flex items-center gap-1 rounded-xl bg-yellow-400 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-sm shadow-yellow-200/60 transition group-hover:shadow-md group-hover:shadow-yellow-200/80">
                  Start <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Experiments */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          <Clock size={14} className="text-gray-400" /> Recent Experiments
        </h2>
        {filteredRecent.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-400 shadow-sm">
            No experiments match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRecent.map(({ title, kind, link, icon: Icon, iconBg, time }) => (
              <Link
                key={title}
                to={link}
                className="card-3d group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} shadow-sm`}>
                    <Icon size={20} />
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Timer size={11} /> {time}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">{title}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    {kind}
                  </span>
                  <ArrowUpRight size={15} className="text-gray-300 transition group-hover:text-blue-500" />
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
