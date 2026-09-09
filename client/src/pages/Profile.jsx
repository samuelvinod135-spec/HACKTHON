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
  GraduationCap,
  Building2,
  Users,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import UserAvatar from '../components/UserAvatar.jsx';
import { COHORT_STUDENTS_SAMPLE } from '../components/Heatmap/MasteryHeatmap.jsx';

export default function Profile() {
  const { user, profile, updateProfile, isTeacher, isAdmin } = useAuth();
  const { student, achievements, completions } = useProgress();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 9-10');
  const [department, setDepartment] = useState('Physical Sciences & STEM');
  const [savedMsg, setSavedMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const isFaculty = isTeacher || isAdmin;

  const initialName = profile?.full_name || (isFaculty ? 'Faculty Instructor' : student?.name || 'Scholar');
  const initialEmail = profile?.email || user?.email || (isFaculty ? 'faculty@labxplore.edu' : 'scholar@labxplore.edu');

  useEffect(() => {
    if (profile?.full_name) setName(profile.full_name);
    else if (student?.name && !isFaculty) setName(student.name);
    if (profile?.grade_level) setGradeLevel(profile.grade_level);
  }, [profile, student, isFaculty]);

  // Student metrics
  const level = profile?.level ?? (student?.level ?? 1);
  const xp = profile?.xp ?? (student?.xp ?? 0);
  const xpCap = profile?.xp_for_level ?? (student?.xp_for_level ?? 1000);
  const pct = Math.min(100, Math.round((xp / xpCap) * 100));

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
        grade_level: isFaculty ? department : gradeLevel,
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
    : 'Active Faculty';

  // ---------------------------------------------------------------------------
  // 1. DEDICATED FACULTY & INSTRUCTOR PROFILE (Role-Isolated from student XP/games)
  // ---------------------------------------------------------------------------
  if (isFaculty) {
    const totalScholars = COHORT_STUDENTS_SAMPLE.length;
    const meanMastery = Math.round(
      COHORT_STUDENTS_SAMPLE.reduce((acc, s) => acc + s.overallMastery, 0) / totalScholars
    );

    return (
      <div className="mx-auto max-w-4xl space-y-6 pb-12">
        {/* Faculty Header Card */}
        <div className="clay-card p-6 sm:p-8 bg-white border border-sky-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <UserAvatar
              name={name || initialName}
              email={initialEmail}
              avatarUrl={profile?.avatar_url}
              size="xl"
              className="border-4 border-sky-100 shadow-xl"
            />

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <h1 className="text-2xl font-black text-slate-900">{name || initialName}</h1>
                    <span className="bg-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                      {isAdmin ? 'Campus Administrator' : 'Faculty Instructor'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {initialEmail} · {profile?.institution_name || 'Delhi Public School R.K. Puram'}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-center sm:self-auto">
                  <button
                    onClick={() => setEditing((e) => !e)}
                    className="clay-btn-yellow flex items-center gap-1.5 px-4 py-2 text-xs font-black text-slate-950 shadow-xs cursor-pointer"
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

              {/* Faculty Status Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200">
                  <GraduationCap size={14} className="text-sky-600" />
                  <span>Cohort: {profile?.cohort_name || 'Section 10-A'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Institutional Authority Active</span>
                </span>
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
                    placeholder="Faculty full name"
                    className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 outline-none focus:border-sky-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Department of Physics & Chemistry"
                    className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 outline-none focus:border-sky-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="clay-btn-yellow px-5 py-2 text-xs font-black text-slate-950 shadow-xs"
              >
                {saving ? 'Saving...' : 'Save Faculty Profile'}
              </button>
            </form>
          )}
        </div>

        {/* 3 Faculty Authority Metrics (ZERO student XP or levels) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="clay-card p-5 text-center bg-white border border-sky-100 shadow-xs">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-2">
              <Users size={20} />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalScholars}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Assigned Scholars
            </p>
          </div>

          <div className="clay-card p-5 text-center bg-white border border-emerald-100 shadow-xs">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-2">
              <TrendingUp size={20} />
            </div>
            <p className="text-2xl font-black text-emerald-600">{meanMastery}%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Mean Topic Mastery
            </p>
          </div>

          <div className="clay-card p-5 text-center bg-white border border-yellow-100 shadow-xs">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-50 text-amber-700 mb-2">
              <BookOpen size={20} />
            </div>
            <p className="text-2xl font-black text-slate-900">Active</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Assessment Authority
            </p>
          </div>
        </div>

        {/* Quick Launch Shortcuts to Teacher Tools */}
        <div className="clay-card p-6 bg-white border border-sky-100 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-slate-900">Quick Faculty Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/teacher"
              className="flex items-center justify-between p-3.5 rounded-2xl border border-sky-100 bg-sky-50/50 hover:bg-sky-100/70 transition"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap size={18} className="text-sky-700" />
                <span className="text-xs font-bold text-slate-900">Teacher Cockpit</span>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>

            <Link
              to="/teacher?tab=questions"
              className="flex items-center justify-between p-3.5 rounded-2xl border border-yellow-200 bg-yellow-50/50 hover:bg-yellow-100/70 transition"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen size={18} className="text-amber-800" />
                <span className="text-xs font-bold text-slate-900">Assessment Bank</span>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>

            <Link
              to="/teacher?tab=heatmap"
              className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100/70 transition"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp size={18} className="text-emerald-700" />
                <span className="text-xs font-bold text-slate-900">2D Mastery Matrix</span>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. STUDENT SCHOLAR PROFILE (With learning gamification & XP)
  // ---------------------------------------------------------------------------
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="clay-card p-6 sm:p-8 bg-white">
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
                  className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Grade</label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 outline-none"
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
        <div className="clay-card p-5 text-center bg-white">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-2">
            <FlaskConical size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">{experimentsCount}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Experiments Completed
          </p>
        </div>

        <div className="clay-card p-5 text-center bg-white">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-2">
            <Award size={20} />
          </div>
          <p className="text-2xl font-black text-slate-900">{quizzesCount}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Quizzes Passed
          </p>
        </div>

        <div className="clay-card p-5 text-center bg-white">
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
        <div className="clay-card p-6 bg-white">
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

        <div className="clay-card p-6 bg-white">
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
