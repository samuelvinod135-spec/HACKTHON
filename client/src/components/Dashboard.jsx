import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Atom, FlaskConical, ArrowRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Dashboard() {
  const { student } = useProgress();
  const [query, setQuery] = useState('');

  const xpPct = student
    ? Math.min(100, Math.round((student.xp / student.xp_for_level) * 100))
    : 0;

  const links = [
    { to: '/physics', title: 'Physics Lab', desc: 'Mechanics, motion & forces', icon: Atom, grad: 'from-emerald-400 to-teal-500' },
    { to: '/chemistry', title: 'Chemistry Lab', desc: 'Reactions & elements', icon: FlaskConical, grad: 'from-blue-400 to-blue-600' },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="relative flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{student ? student.name.split(' ')[0] : 'Scholar'}</span>
          </h2>
          <p className="mt-0.5 text-xs text-gray-400">Ready to explore the wonders of science today?</p>
        </div>

        <div className="relative max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search experiments, quizzes, topics…"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-800 placeholder-gray-400 outline-none shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {links.map(({ to, title, desc, icon: Icon, grad }) => (
            <Link key={to} to={to} className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/50">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-white shadow`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-[11px] text-gray-400">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
            </Link>
          ))}
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-medium text-gray-500">Continue Exploring</span>
            <span className="text-[11px] font-bold text-blue-600">
              {student ? `${student.xp.toLocaleString()} / ${student.xp_for_level.toLocaleString()} XP` : '…'}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 transition-all duration-500" style={{ width: `${xpPct}%` }} />
          </div>
          <p className="mt-1.5 text-[10px] text-gray-400">
            {100 - xpPct}% until next level — keep experimenting!
          </p>
        </div>
      </div>
    </section>
  );
}
