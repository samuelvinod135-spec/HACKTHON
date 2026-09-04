import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  Award,
  Star,
  Settings,
  Edit3,
  CheckCircle2,
  TrendingUp,
  FlaskConical,
  Atom,
  Clock,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Profile() {
  const { student, achievements, completions } = useProgress();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student ? student.name : 'Alex Chen');
  const [email, setEmail] = useState('alex@example.com');
  const [savedMsg, setSavedMsg] = useState('');

  const level = student ? student.level : 13;
  const xp = student ? student.xp : 4250;
  const xpCap = student ? student.xp_for_level : 6000;
  const pct = Math.min(100, Math.round((xp / xpCap) * 100));

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setSavedMsg('Profile updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="clay-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-xl">
            <img
              src="/clay/avatar.jpg"
              alt="Alex"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerText = 'AC';
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">{name}</h1>
                <p className="text-xs text-slate-500">{email} · Grade 9 Science Scholar</p>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-auto">
                <button
                  onClick={() => setEditing((e) => !e)}
                  className="clay-btn-yellow flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900 shadow-sm"
                >
                  <Edit3 size={14} /> {editing ? 'Cancel' : 'Edit Profile'}
                </button>
                <Link
                  to="/settings"
                  className="clay-btn-circle flex h-9 w-9 items-center justify-center text-slate-600"
                  title="Settings"
                >
                  <Settings size={16} />
                </Link>
              </div>
            </div>

            {savedMsg && (
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} /> {savedMsg}
              </p>
            )}

            {/* Level Progress */}
            <div className="mt-4 max-w-md">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1 text-amber-600">
                  <Star size={13} fill="currentColor" /> Level {level}
                </span>
                <span className="text-blue-600">{xp.toLocaleString()} / {xpCap.toLocaleString()} XP</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {editing && (
          <form onSubmit={handleSave} className="mt-6 border-t border-slate-100 pt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="clay-input w-full px-4 py-2 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="clay-input w-full px-4 py-2 text-xs font-semibold outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="clay-btn-yellow px-5 py-2 text-xs font-bold text-slate-900 shadow-sm"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>

      {/* 3 Core Stats Grid matching screenshot */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="clay-card p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-2">
            <FlaskConical size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">32</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Experiments</p>
        </div>

        <div className="clay-card p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-2">
            <Award size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">18</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Quizzes Passed</p>
        </div>

        <div className="clay-card p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-2">
            <Clock size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">24.5</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Hours Learned</p>
        </div>
      </div>

      {/* Profile Details & Metadata */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="clay-card p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Academic Credentials</h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Student ID</span>
              <span className="font-mono font-bold text-slate-800">LX-89241</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Joined</span>
              <span className="font-semibold text-slate-800">Jan 15, 2024</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Curriculum</span>
              <span className="font-semibold text-slate-800">NextGen Science (NGSS)</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Streak Record</span>
              <span className="font-bold text-amber-600">14 Days 🔥</span>
            </div>
          </div>
        </div>

        <div className="clay-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Unlocked Medals</h2>
            <Link to="/achievements" className="text-xs font-bold text-blue-600 hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="clay-card p-3 text-center bg-purple-50/50">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white shadow-sm mb-1.5">
                <Star size={18} fill="currentColor" />
              </div>
              <p className="text-[10px] font-bold text-slate-800 truncate">Science Explorer</p>
            </div>
            <div className="clay-card p-3 text-center bg-emerald-50/50">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm mb-1.5">
                <FlaskConical size={18} />
              </div>
              <p className="text-[10px] font-bold text-slate-800 truncate">Quiz Master</p>
            </div>
            <div className="clay-card p-3 text-center bg-amber-50/50">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm mb-1.5">
                <Award size={18} />
              </div>
              <p className="text-[10px] font-bold text-slate-800 truncate">Lab Genius</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
