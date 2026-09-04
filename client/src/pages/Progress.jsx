import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  TrendingUp,
  Star,
  Flame,
  Award,
  FlaskConical,
  Atom,
  CheckCircle2,
  Calendar,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Progress() {
  const { profile } = useAuth();
  const { student, achievements, completions } = useProgress();

  const level = profile?.level ?? (student?.level ?? 1);
  const xp = profile?.xp ?? (student?.xp ?? 0);
  const cap = profile?.xp_for_level ?? (student?.xp_for_level ?? 1000);
  const pct = Math.min(100, Math.round((xp / cap) * 100));

  // Circular gauge calculations
  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - pct / 100);

  const unlockedAchievementsCount = (achievements || []).filter((a) => a.unlocked).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          My Progress
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Track your laboratory milestones, XP progression, and completed scientific investigations.
        </p>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lab-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Current Level</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Star size={15} fill="currentColor" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">Level {level}</p>
          <p className="mt-1 text-[11px] text-slate-400">
            {cap - xp} XP needed for Level {level + 1}
          </p>
        </div>

        <div className="lab-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Experience</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <TrendingUp size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{xp.toLocaleString()} <span className="text-xs font-normal text-slate-400">XP</span></p>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">
            +150 XP earned this week
          </p>
        </div>

        <div className="lab-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed Labs</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CheckCircle2 size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {completions ? completions.length : 0}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Simulations & quizzes recorded
          </p>
        </div>

        <div className="lab-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Achievements</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Award size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {unlockedAchievementsCount} / {achievements.length || 8}
          </p>
          <Link to="/achievements" className="mt-1 inline-block text-[11px] text-sky-600 hover:underline">
            View all badges →
          </Link>
        </div>
      </div>

      {/* Main Section: Level Ring & Category Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Level Ring Card */}
        <div className="lab-card flex flex-col items-center justify-center p-6 text-center lg:col-span-1">
          <h2 className="text-sm font-semibold text-slate-800 self-start">Level Trajectory</h2>
          <div className="relative mt-4 h-40 w-40">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke="#facc15"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={offset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Level
              </span>
              <span className="text-3xl font-bold text-slate-900">{level}</span>
              <span className="text-[11px] font-semibold text-amber-600">{pct}%</span>
            </div>
          </div>

          <div className="mt-4 w-full rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Current Progress</span>
              <span className="font-semibold text-slate-900">
                {xp.toLocaleString()} / {cap.toLocaleString()} XP
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Discipline Proficiency Breakdown */}
        <div className="lab-card flex flex-col justify-between p-6 lg:col-span-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Subject Proficiency</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accumulated scientific mastery across major domains
            </p>

            <div className="mt-5 space-y-4">
              {/* Chemistry */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <FlaskConical size={14} className="text-sky-600" />
                    Chemistry & Reaction Kinetics
                  </span>
                  <span className="font-semibold text-slate-900">72%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: '72%' }} />
                </div>
              </div>

              {/* Physics */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <Atom size={14} className="text-teal-600" />
                    Physics & Classical Mechanics
                  </span>
                  <span className="font-semibold text-slate-900">65%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-teal-500" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Optics & Waves */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <TrendingUp size={14} className="text-sky-700" />
                    Optics, Waves & Refraction
                  </span>
                  <span className="font-semibold text-slate-900">48%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-700" style={{ width: '48%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-slate-400" />
              Active learning streak: <strong className="text-slate-800">{profile?.streak_count || 1} Day{profile?.streak_count === 1 ? '' : 's'}</strong>
            </span>
            <Link
              to="/chemistry"
              className="font-medium text-sky-600 hover:text-sky-700"
            >
              Continue experimenting →
            </Link>
          </div>
        </div>
      </div>

      {/* Activity History Table */}
      <div className="lab-card overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800">Activity & Lab History</h2>
          <p className="text-xs text-slate-500">Record of verified completions</p>
        </div>

        {completions && completions.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {completions.map((comp) => (
              <div key={comp.id || comp.ref} className="flex items-center justify-between px-6 py-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    {comp.kind === 'quiz' ? <CheckCircle2 size={15} /> : <FlaskConical size={15} />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{comp.ref}</p>
                    <p className="text-[11px] text-slate-400 capitalize">{comp.kind}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-slate-400">
                    {comp.completed_at ? new Date(comp.completed_at).toLocaleDateString() : 'Recent'}
                  </span>
                  <span className="rounded-md bg-amber-50 px-2 py-0.5 font-semibold text-amber-700 text-[11px] border border-amber-200/50">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            No activities recorded yet. Complete experiments in Physics or Chemistry lab to build your history!
          </div>
        )}
      </div>
    </div>
  );
}
