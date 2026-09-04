import { NavLink } from 'react-router-dom';
import {
  FlaskConical,
  Home,
  Atom,
  TestTubes,
  Flame,
  Zap,
  Medal,
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
    <aside className="glass-strong z-20 flex w-64 shrink-0 flex-col border-r border-neon-purple/10">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue text-white shadow-lg shadow-neon-purple/30">
          <FlaskConical size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-white">
            Lab<span className="neon-text">Xplore</span>
          </h1>
          <p className="text-[11px] text-slate-400">Virtual Science Lab</p>
        </div>
      </div>

      <nav className="mt-2 flex flex-col gap-1.5 px-3">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-neon-purple/15 text-white shadow-inner ring-1 ring-neon-purple/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon
              size={18}
              className="transition-colors group-hover:text-neon-cyan"
            />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Daily Challenge card pinned to bottom */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl border border-neon-purple/25 bg-gradient-to-br from-neon-purple/20 to-neon-blue/10 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-purple/30 text-neon-cyan">
              <Zap size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Daily Challenge</p>
              <p className="text-[10px] text-slate-400">+50 XP bonus</p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-300">
            Balance a chemical equation to earn a bonus!
          </p>
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-neon-purple/90 py-2 text-xs font-semibold text-white shadow-lg shadow-neon-purple/30 transition hover:bg-neon-purple">
            <Flame size={14} />
            Take Challenge
          </button>
        </div>
      </div>

      {/* Mini profile */}
      <div className="flex items-center gap-3 border-t border-white/5 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue text-xs font-bold text-white">
          {student ? student.name.split(' ').map((n) => n[0]).join('') : 'AC'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {student ? student.name : 'Loading…'}
          </p>
          <p className="flex items-center gap-1 text-[11px] text-slate-400">
            <Medal size={11} className="text-amber-400" />
            Level {student ? student.level : '…'}
          </p>
        </div>
      </div>
    </aside>
  );
}
