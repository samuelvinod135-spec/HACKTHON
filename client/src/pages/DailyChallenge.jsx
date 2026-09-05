import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Atom,
  RotateCcw,
  Sliders,
  Check,
  Compass,
  Play,
  Layers,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { DAILY_TASKS, getRecommendedTasks } from '../dailyTasksData.js';
import { sounds } from '../utils/soundEffects.js';

export default function DailyChallenge() {
  const { student, record } = useProgress();
  const navigate = useNavigate();

  // Active day and completed tasks state (persisted in localStorage or default to Day 1)
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('labxplore_completed_tasks');
      return saved ? JSON.parse(saved) : [1]; // Day 1 completed by default
    } catch {
      return [1];
    }
  });

  const [activeDay, setActiveDay] = useState(() => {
    try {
      const saved = localStorage.getItem('labxplore_completed_tasks');
      const list = saved ? JSON.parse(saved) : [1];
      // Next uncompleted day
      const nextUnfinished = DAILY_TASKS.find((t) => !list.includes(t.day));
      return nextUnfinished ? nextUnfinished.day : 2;
    } catch {
      return 2;
    }
  });

  const [selectedTrack, setSelectedTrack] = useState('All');
  const [interactiveParam, setInteractiveParam] = useState(170);
  const [simRunning, setSimRunning] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const activeTask = DAILY_TASKS.find((t) => t.day === activeDay) || DAILY_TASKS[0];
  const isCompleted = completedDays.includes(activeTask.day);
  const streak = completedDays.length;

  const currentLevel = student?.level || 1;
  const filteredTasks = getRecommendedTasks(currentLevel, selectedTrack);

  // Sync interactiveParam with active task defaults
  useEffect(() => {
    if (activeTask.day === 1) setInteractiveParam(170);
    else if (activeTask.day === 2) setInteractiveParam(190);
    else if (activeTask.day === 3) setInteractiveParam(1.58);
    else if (activeTask.day === 4) setInteractiveParam(45);
    else if (activeTask.day === 5) setInteractiveParam(35);
    else if (activeTask.day === 6) setInteractiveParam(30);
    else if (activeTask.day === 7) setInteractiveParam(140);
    setJustCompleted(false);
  }, [activeTask.day]);

  const handleVerifyTask = async () => {
    sounds.playClick();
    setVerifying(true);

    setTimeout(async () => {
      setVerifying(false);
      sounds.playSimStart();
      setJustCompleted(true);

      const newCompleted = Array.from(new Set([...completedDays, activeTask.day]));
      setCompletedDays(newCompleted);
      localStorage.setItem('labxplore_completed_tasks', JSON.stringify(newCompleted));

      await record({
        kind: 'daily-challenge',
        ref: activeTask.title,
        xp: activeTask.xpReward,
        achievements: newCompleted.length >= 3 ? ['experiment-streak'] : [],
      });
    }, 900);
  };

  const handleLaunchInLab = () => {
    sounds.playClick();
    navigate('/physics');
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* ================= HEADER & STREAK BANNER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <Zap size={14} fill="currentColor" /> Daily Science Laboratory Tasks
          </div>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Task-Based Experiment Progression
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Hands-on daily scientific investigations replacing passive quizzes with real interactive simulations.
          </p>
        </div>

        {/* Gamified Streak & XP Widget */}
        <div className="flex items-center gap-3">
          <div className="clay-card flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xs border border-amber-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
              <Flame size={18} fill="currentColor" />
            </span>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-slate-900">{streak} Days</span>
                <span className="text-[10px] font-bold text-amber-600">Active Streak!</span>
              </div>
              <p className="text-[9px] font-semibold text-slate-400">1.5x Daily XP Multiplier</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ADAPTIVE TRACK FILTER & PROGRESS ROADMAP ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Day Roadmap Navigation Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {DAILY_TASKS.map((task) => {
            const isDone = completedDays.includes(task.day);
            const isSelected = activeDay === task.day;
            return (
              <button
                key={task.day}
                onClick={() => {
                  sounds.playClick();
                  setActiveDay(task.day);
                }}
                className={`group flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-xs ${
                  isSelected
                    ? 'clay-btn-yellow text-slate-900 ring-2 ring-amber-400'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 size={13} className="text-emerald-600" />
                ) : (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px]">
                    {task.day}
                  </span>
                )}
                <span>Day {task.day}</span>
              </button>
            );
          })}
        </div>

        {/* Adaptive Track Pills */}
        <div className="flex items-center gap-1 rounded-2xl bg-white p-1 border border-slate-200 shadow-xs text-xs">
          {['All', 'Optics', 'Mechanics'].map((track) => (
            <button
              key={track}
              onClick={() => {
                sounds.playClick();
                setSelectedTrack(track);
              }}
              className={`rounded-xl px-3 py-1 text-xs font-semibold transition ${
                selectedTrack === track
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {track === 'All' ? 'Curriculum Recommended' : `${track} Track`}
            </button>
          ))}
        </div>
      </div>

      {/* ================= ACTIVE TASK SHOWCASE ================= */}
      <div className="clay-card rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 text-white shadow-md">
              <Atom size={22} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-teal-100 px-2 py-0.5 text-[10px] font-extrabold text-teal-800">
                  {activeTask.category}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  {activeTask.difficulty}
                </span>
              </div>
              <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-slate-900">
                {activeTask.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-800 border border-amber-200/60 shadow-xs">
              +{activeTask.xpReward} XP Reward
            </span>
          </div>
        </div>

        {/* Mission Goal & Description */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Mission Goal</p>
              <p className="mt-1 text-sm font-semibold text-slate-800 leading-relaxed">
                {activeTask.goal}
              </p>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {activeTask.description}
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Required Experimental Steps
              </p>
              <div className="space-y-2">
                {activeTask.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl bg-white p-3 border border-slate-100 shadow-xs text-xs text-slate-700"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-normal">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Criteria Box */}
            <div className="rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 p-4 border border-teal-200/60">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
                <Compass size={15} />
                <span>Verification Objective</span>
              </div>
              <p className="mt-1 text-xs text-teal-900 font-semibold">
                {activeTask.targetCondition.targetDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Verification Sandbox & Formula */}
          <div className="space-y-4">
            {/* Key Formula Card */}
            <div className="rounded-2xl bg-sky-50/70 p-4 border border-sky-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                Governing Equation
              </p>
              <p className="mt-1 text-xs font-bold text-slate-900">{activeTask.formula.name}</p>
              <div className="my-2 rounded-xl bg-white p-2.5 text-center font-mono text-xs font-black text-sky-900 shadow-inner">
                {activeTask.formula.equation}
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {activeTask.formula.explanation}
              </p>
            </div>

            {/* Interactive Quick-Tweak Simulator Card */}
            <div className="clay-card rounded-2xl bg-white p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">In-Card Calibrator</span>
                <span className="font-mono text-xs font-bold text-teal-600">
                  {activeTask.day === 1 ? `${interactiveParam} px` :
                   activeTask.day === 2 ? `${interactiveParam} cm` :
                   activeTask.day === 3 ? `n = ${interactiveParam}` :
                   activeTask.day === 4 ? `${interactiveParam}°` :
                   activeTask.day === 5 ? `${interactiveParam} N/m` :
                   activeTask.day === 6 ? `${interactiveParam}°` :
                   `${interactiveParam} px`}
                </span>
              </div>

              {/* Dynamic Slider based on task */}
              <input
                type="range"
                min={activeTask.day === 1 ? 100 : activeTask.day === 3 ? 1.3 : activeTask.day === 4 ? 15 : 20}
                max={activeTask.day === 1 ? 250 : activeTask.day === 3 ? 1.9 : activeTask.day === 4 ? 75 : 60}
                step={activeTask.day === 3 ? 0.02 : 1}
                value={interactiveParam}
                onChange={(e) => {
                  sounds.playTick();
                  setInteractiveParam(parseFloat(e.target.value));
                }}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-teal-600"
              />

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Adjust parameter</span>
                <span className="text-teal-600 font-semibold">Ready to verify</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleVerifyTask}
                  disabled={verifying || isCompleted}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold shadow-sm transition ${
                    isCompleted || justCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'clay-btn-yellow text-slate-900 hover:brightness-105'
                  }`}
                >
                  {isCompleted || justCompleted ? (
                    <>
                      <Check size={14} strokeWidth={3} />
                      <span>Task Completed (+{activeTask.xpReward} XP)!</span>
                    </>
                  ) : verifying ? (
                    <span>Verifying Experiment Physics...</span>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Verify & Complete Task</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleLaunchInLab}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                >
                  <Atom size={14} className="text-teal-600" />
                  <span>Open in Full Physics Lab</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ALL 7 DAYS PROGRESSION GRID ================= */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
          7-Day Curriculum Progression Roadmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTasks.map((task) => {
            const isDone = completedDays.includes(task.day);
            const isCurrent = activeDay === task.day;

            return (
              <div
                key={task.day}
                onClick={() => {
                  sounds.playClick();
                  setActiveDay(task.day);
                }}
                className={`clay-card group flex flex-col justify-between rounded-2xl p-4 text-left shadow-xs transition hover:shadow-md cursor-pointer border ${
                  isCurrent
                    ? 'border-teal-400 bg-teal-50/30 ring-2 ring-teal-200'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-black text-slate-700">
                        {task.day}
                      </span>
                      <span>Day {task.day}</span>
                    </span>

                    {isDone ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        <Check size={11} strokeWidth={3} /> Done
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200/50">
                        +{task.xpReward} XP
                      </span>
                    )}
                  </div>

                  <h4 className="mt-2 text-xs font-bold text-slate-900 group-hover:text-teal-700 transition line-clamp-1">
                    {task.title.replace(/^Day \d+ Task: /, '')}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                    {task.goal}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] font-semibold text-teal-600">
                  <span>{task.category} · {task.difficulty}</span>
                  <ArrowRight size={12} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
