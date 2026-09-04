import { Star, TrendingUp } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext.jsx';

export default function MyProgress() {
  const { student } = useProgress();

  const level = student ? student.level : 12;
  const xp = student ? student.xp : 2450;
  const cap = student ? student.xp_for_level : 3000;
  const pct = Math.min(100, Math.round((xp / cap) * 100));

  const R = 44;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - pct / 100);

  return (
    <div className="glass flex flex-col items-center rounded-2xl p-4">
      <h3 className="self-start text-sm font-semibold text-white">My Progress</h3>
      <div className="relative mt-3 h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#donutGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Level
          </span>
          <span className="neon-text text-3xl font-extrabold">{level}</span>
        </div>
      </div>

      <div className="mt-3 w-full rounded-xl bg-white/5 px-4 py-3 text-center">
        <p className="text-xs text-slate-400">
          <span className="mr-1 inline-flex align-middle">
            <Star size={12} className="text-amber-400" />
          </span>
          {xp.toLocaleString()} / {cap.toLocaleString()} XP
          <TrendingUp size={12} className="ml-1 inline-flex align-middle text-neon-cyan" />
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
