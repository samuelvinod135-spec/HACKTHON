import { useState } from 'react';
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
  Trophy,
  Zap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCreditStage, CREDIT_STAGES } from '../utils/creditStages.js';
import CreditStageModal from '../components/CreditStages/CreditStageModal.jsx';

export default function Progress() {
  const { profile } = useAuth();
  const { student, achievements, completions } = useProgress();
  const [stageModalOpen, setStageModalOpen] = useState(false);

  const level = profile?.level ?? (student?.level ?? 1);
  const xp = profile?.xp ?? (student?.xp ?? 0);
  const cap = profile?.xp_for_level ?? (student?.xp_for_level ?? 1000);
  const pct = Math.min(100, Math.round((xp / cap) * 100));
  const stageInfo = getCreditStage(xp);

  // Circular gauge calculations
  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - pct / 100);

  const unlockedAchievementsCount = (achievements || []).filter((a) => a.unlocked).length;

  // Dynamic subject proficiency starting from 0%
  const chemLabs = (completions || []).filter(
    (c) => c.kind === 'experiment' || c.ref?.toLowerCase().includes('chem') || c.ref?.toLowerCase().includes('magnesium')
  ).length;
  const physLabs = (completions || []).filter(
    (c) => c.ref?.toLowerCase().includes('pendulum') || c.ref?.toLowerCase().includes('physic')
  ).length;
  const opticsLabs = (completions || []).filter(
    (c) => c.ref?.toLowerCase().includes('lens') || c.ref?.toLowerCase().includes('optic') || c.ref?.toLowerCase().includes('wave')
  ).length;

  const chemPct = Math.min(100, chemLabs * 25);
  const physPct = Math.min(100, physLabs * 25);
  const opticsPct = Math.min(100, opticsLabs * 25);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            My Progress & Laboratory Milestones
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Track your laboratory milestones, credit stage trajectory, and completed scientific investigations.
          </p>
        </div>
      </div>

      {/* Credit Stage & Scientific Status Hero Card (100% Clay UI) */}
      <div className="clay-card rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-slate-950 shadow-md border-b-4 border-amber-400 shrink-0">
              <Trophy size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-300 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-2xs">
                  Stage {stageInfo.stage} · {stageInfo.status}
                </span>
                <span className="bg-sky-50 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-200">
                  {xp.toLocaleString()} Credits Collected
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {stageInfo.title}
              </h2>
              <p className="text-xs text-slate-500">
                {stageInfo.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setStageModalOpen(true)}
            className="clay-btn-yellow flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black text-slate-950 shadow-sm self-start sm:self-center"
          >
            <Sparkles size={14} />
            <span>View All 6 Stages & Perks</span>
          </button>
        </div>

        {/* Milestone Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-sky-900 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-500 fill-amber-400" />
              <span>Progress to Next Rank</span>
            </span>
            <span className="text-sky-800 font-mono">
              {stageInfo.isMaxStage
                ? 'Maximum Stage Attained'
                : `${stageInfo.creditsToNext.toLocaleString()} Credits remaining for ${stageInfo.nextStageTitle}`}
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-sky-50 border border-sky-200 overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 shadow-xs"
              style={{ width: `${stageInfo.progressPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
            <span>{stageInfo.minCredits.toLocaleString()} XP</span>
            <span className="text-sky-800">{stageInfo.progressPct}% Complete</span>
            <span>{stageInfo.maxCredits.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="clay-card p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Current Level</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Star size={15} fill="currentColor" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">Level {level}</p>
          <p className="mt-1 text-[11px] text-slate-400">
            {cap - xp} XP needed for Level {level + 1}
          </p>
        </div>

        <div className="clay-card p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Credits</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <TrendingUp size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{xp.toLocaleString()} <span className="text-xs font-normal text-slate-400">Credits</span></p>
          <p className="mt-1 text-[11px] text-sky-700 font-bold">
            Rank: {stageInfo.status}
          </p>
        </div>

        <div className="clay-card p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Completed Labs</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <CheckCircle2 size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {completions ? completions.length : 0}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Simulations & quizzes recorded
          </p>
        </div>

        <div className="clay-card p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Achievements</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Award size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {unlockedAchievementsCount} / {achievements.length || 8}
          </p>
          <Link to="/achievements" className="mt-1 inline-block text-[11px] font-bold text-sky-600 hover:underline">
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
                  <span className="font-semibold text-slate-900">{chemPct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-500 transition-all duration-500" style={{ width: `${chemPct}%` }} />
                </div>
              </div>

              {/* Physics */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <Atom size={14} className="text-teal-600" />
                    Physics & Classical Mechanics
                  </span>
                  <span className="font-semibold text-slate-900">{physPct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-teal-500 transition-all duration-500" style={{ width: `${physPct}%` }} />
                </div>
              </div>

              {/* Optics & Waves */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <TrendingUp size={14} className="text-sky-700" />
                    Optics, Waves & Refraction
                  </span>
                  <span className="font-semibold text-slate-900">{opticsPct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-700 transition-all duration-500" style={{ width: `${opticsPct}%` }} />
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

      {/* Credit Stage & Scientific Rank Modal */}
      <CreditStageModal
        isOpen={stageModalOpen}
        onClose={() => setStageModalOpen(false)}
        credits={xp}
      />
    </div>
  );
}
