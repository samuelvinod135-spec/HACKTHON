import { NavLink } from 'react-router-dom';
import {
  FlaskConical,
  Home,
  Atom,
  TestTubes,
  Flame,
  Zap,
  Star,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

const NAV = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/physics', label: 'Physics Lab', icon: Atom },
  { to: '/chemistry', label: 'Chemistry Lab', icon: FlaskConical },
  { to: '/quizzes', label: 'Quizzes', icon: TestTubes },
];

export default function Sidebar() {
  const { student } = useProgress();

  return (
    <aside className="glass-strong z-20 flex w-64 shrink-0 flex-col border-r border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md shadow-blue-200/60">
          <FlaskConical size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-gray-900">
            Lab<span className="neon-text">Xplore</span>
          </h1>
          <p className="text-[11px] text-gray-400">Virtual Science Lab</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex flex-col gap-1.5 px-3">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <Icon size={18} className="transition-colors" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Daily Challenge */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl border border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <Zap size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Daily Challenge</p>
              <p className="text-[10px] text-gray-400">+50 XP bonus</p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-500">
            Balance a chemical equation to earn a bonus!
          </p>
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-2 text-xs font-bold text-gray-900 shadow-sm shadow-yellow-200/60 transition hover:bg-yellow-400 hover:shadow-md">
            <Flame size={14} />
            Take Challenge
          </button>
        </div>
      </div>

      {/* Mini profile + XP */}
      <div className="mx-4 mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white shadow">
            {student ? student.name.split(' ').map((n) => n[0]).join('') : 'AC'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              {student ? student.name : 'Loading…'}
            </p>
            <p className="flex items-center gap-1 text-[11px] text-gray-400">
              <Star size={11} className="text-yellow-400" fill="currentColor" />
              Level {student ? student.level : '…'}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span>{student ? `${student.xp} / ${student.xp_for_level} XP` : '…'}</span>
            <span>{student ? Math.round((student.xp / student.xp_for_level) * 100) : 0}%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 transition-all"
              style={{ width: `${student ? Math.min(100, Math.round((student.xp / student.xp_for_level) * 100)) : 0}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
