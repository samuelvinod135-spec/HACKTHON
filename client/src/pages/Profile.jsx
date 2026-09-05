import { useState, useEffect } from 'react';
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
  Sparkles,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import UserAvatar from '../components/UserAvatar.jsx';

export default function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const { student, achievements, completions } = useProgress();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 9-10');
  const [savedMsg, setSavedMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const initialName = profile?.full_name || student?.name || 'Scholar';
  const initialEmail = profile?.email || user?.email || 'scholar@labxplore.edu';

  useEffect(() => {
    if (profile?.full_name) setName(profile.full_name);
    else if (student?.name) setName(student.name);
    if (profile?.grade_level) setGradeLevel(profile.grade_level);
  }, [profile, student]);

  const level = profile?.level ?? (student?.level ?? 1);
  const xp = profile?.xp ?? (student?.xp ?? 0);
  const xpCap = profile?.xp_for_level ?? (student?.xp_for_level ?? 1000);
  const pct = Math.min(100, Math.round((xp / xpCap) * 100));

  // Dynamic statistics from live completions
  const experimentsCount = completions.filter(
    (c) => c.kind === 'experiment' || c.kind === 'observation'
  ).length;
  const quizzesCount = completions.filter(
    (c) => c.kind === 'quiz' || c.kind === 'challenge'
  ).length;
  const hoursLearned = Math.max(
    0,
    Number(((experimentsCount * 0.4) + (quizzesCount * 0.2)).toFixed(1))
  );

  const unlockedAchievements = (achievements || []).filter((a) => Boolean(a.unlocked));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        full_name: name.trim() || initialName,
        grade_level: gradeLevel,
      });
      setSavedMsg('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSavedMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Active';

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="clay-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <UserAvatar
            name={name || initialName}
            email={initialEmail}
            avatarUrl={profile?.avatar_url}
            size="xl"
            className="border-4 border-white shadow-xl"
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">{name || initialName}</h1>
                <p className="text-xs text-slate-500">
                  {initialEmail} · {profile?.grade_level || 'Grade 9-10'} Science Scholar
                </p>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-auto">
                <button
                  onClick={() => setEditing((e) => !e)}
                  className="clay-btn-yellow flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900 shadow-xs"
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
                <span className="text-blue-600">
                  {xp.toLocaleString()} / {xpCap.toLocaleString()} XP
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-500"
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
                  placeholder="Your full student name"
                  className="clay-input w-full px-4 py-2 text-xs font-semibold outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Grade</label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="clay-input w-full px-4 py-2 text-xs font-semibold outline-none"
                >
                  <option value="Grade 7-8">Grade 7–8 (Middle School)</option>
                  <option value="Grade 9-10">Grade 9–10 (Secondary Scholar)</option>
                  <option value="Grade 11-12">Grade 11–12 (Advanced Placement)</option>
                  <option value="Undergraduate">Undergraduate Research</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="clay-btn-yellow px-5 py-2 text-xs font-bold text-slate-900 shadow-xs"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>

      {/* 3 Core Stats Grid: 100% dynamic from actual database completions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="clay-card p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-2">
            <FlaskConical size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">{experimentsCount}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Experiments Completed
          </p>
        </div>

        <div className="clay-card p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-2">
            <Award size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">{quizzesCount}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Quizzes Passed
          </p>
        </div>

        <div className="clay-card p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-2">
            <Clock size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">{hoursLearned}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Hours Logged
          </p>
        </div>
      </div>

      {/* Profile Details & Metadata */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="clay-card p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Academic Details</h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Joined</span>
              <span className="font-semibold text-slate-800">{joinedDate}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Curriculum</span>
              <span className="font-semibold text-slate-800">NextGen Science (NGSS)</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Streak Record</span>
              <span className="font-bold text-amber-600">
                {profile?.streak_count || 1} Day{profile?.streak_count === 1 ? '' : 's'} 🔥
              </span>
            </div>
          </div>
        </div>

        <div className="clay-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Unlocked Medals</h2>
            <Link to="/achievements" className="text-xs font-bold text-blue-600 hover:underline">
              View All ({unlockedAchievements.length}) →
            </Link>
          </div>

          {unlockedAchievements.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {unlockedAchievements.slice(0, 3).map((ach) => (
                <div key={ach.slug || ach.id} className="clay-card p-3 text-center bg-amber-50/50">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs mb-1.5">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 truncate">{ach.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-center">
              <Sparkles className="w-6 h-6 text-sky-500 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-slate-800">No medals unlocked yet</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Run experiments or complete daily challenges to unlock your first award!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
