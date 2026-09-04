import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Atom, FlaskConical, ArrowRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Dashboard() {
  const { student } = useProgress();
  const [query, setQuery] = useState('');

  // Continue Exploring: total progress from completions (simple heuristic)
  const xpPct = student
    ? Math.min(100, Math.round((student.xp / student.xp_for_level) * 100))
    : 0;

  const links = [
    {
      to: '/physics',
      title: 'Physics Lab',
      desc: 'Mechanics, motion & forces',
      icon: Atom,
      grad: 'from-blue-500 to-cyan-500',
    },
    {
      to: '/chemistry',
      title: 'Chemistry Lab',
      desc: 'Reactions & elements',
      icon: FlaskConical,
      grad: 'from-neon-purple to-fuchsia-500',
    },
  ];

  return (
    <section className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-neon-purple/20 blur-[80px]" />
      <div className="pointer-events-none absolute -left-6 bottom-0 h-32 w-32 rounded-full bg-neon-blue/20 blur-[70px]" />

      <div className="relative flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            Welcome back, <span className="neon-text">{student ? student.name.split(' ')[0] : 'Alex'}</span>
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Ready to explore the wonders of science today?
          </p>
        </div>

        {/* Search bar */}
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

        {/* Quick links */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {links.map(({ to, title, desc, icon: Icon, grad }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-3.5 transition hover:border-neon-purple/40 hover:from-neon-purple/10"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-white shadow-lg`}
              >
                <Icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-[11px] text-slate-400">{desc}</p>
              </div>
              <ArrowRight
                size={16}
                className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-neon-purple"
              />
            </Link>
          ))}
        </div>

        {/* Continue Exploring progress bar */}
        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-medium text-slate-300">
              Continue Exploring
            </span>
            <span className="text-[11px] font-bold text-neon-cyan">
              {student ? `${student.xp.toLocaleString()} / ${student.xp_for_level.toLocaleString()} XP` : '…'}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-slate-500">
            {100 - xpPct}% until next level — keep experimenting!
          </p>
        </div>
      </div>
    </section>
  );
}
