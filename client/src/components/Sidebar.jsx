import { NavLink, Link } from 'react-router-dom';
import {
  FlaskConical,
  Home,
  Atom,
  TestTubes,
  Zap,
  Star,
  TrendingUp,
  Award,
  Bookmark,
  User,
  Settings,
  HelpCircle,
  X,
  GraduationCap,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import UserAvatar from './UserAvatar.jsx';

export function LabXploreLogo() {
  return (
    <Link to="/dashboard" className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-md">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M9 3h6" />
          <path d="M10 3v4.5L5.5 17a3 3 0 0 0 2.5 4h8a3 3 0 0 0 2.5-4L14 7.5V3" />
          <ellipse cx="12" cy="14" rx="7" ry="2.5" transform="rotate(-15 12 14)" strokeWidth="1.5" strokeOpacity="0.85" />
        </svg>
      </div>
      <div>
        <div className="flex items-center text-lg font-extrabold tracking-tight text-slate-900">
          <span>Lab</span>
          <span className="text-blue-600">Xplore</span>
        </div>
      </div>
    </Link>
  );
}

const PRIMARY_MENU = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/physics', label: 'Physics Lab', icon: Atom },
  { to: '/chemistry', label: 'Chemistry Lab', icon: FlaskConical },
  { to: '/quizzes', label: 'Quizzes', icon: TestTubes },
  { to: '/daily-challenge', label: 'Daily Challenge', icon: Zap },
  { to: '/mock-tests', label: 'Mock Tests', icon: GraduationCap },
];

const SECONDARY_MENU = [
  { to: '/saved', label: 'Saved Experiments', icon: Bookmark },
  { to: '/progress', label: 'My Progress', icon: TrendingUp },
  { to: '/achievements', label: 'Achievements', icon: Award },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help & Support', icon: HelpCircle },
  { to: '/landing', label: 'Public Landing Page', icon: Star },
];

export default function Sidebar({ isOpen, onClose }) {
  const { student } = useProgress();
  const { profile } = useAuth();

  const xp = profile?.xp ?? (student ? student.xp : 0);
  const xpCap = profile?.xp_for_level ?? (student ? student.xp_for_level : 1000);
  const level = profile?.level ?? (student ? student.level : 1);
  const name = profile?.full_name?.split(' ')[0] || (student?.name ? student.name.split(' ')[0] : 'Scholar');
  const avatarUrl = profile?.avatar_url || '';
  const xpPct = Math.min(100, Math.round((xp / xpCap) * 100));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs transition-opacity md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-slate-100 shadow-sm transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between px-6">
          <Link to="/dashboard" onClick={onClose}>
            <LabXploreLogo />
          </Link>
          <button
            onClick={onClose}
            className="clay-btn-circle flex h-8 w-8 items-center justify-center text-slate-400 hover:text-slate-600 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {/* Main Navigation */}
          <nav className="flex flex-col gap-1.5">
            {PRIMARY_MENU.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sky-100/80 text-sky-800 font-bold border border-sky-200 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 active:bg-sky-50'
                  }`
                }
              >
                <Icon size={17} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Secondary Navigation */}
          <nav className="flex flex-col gap-1.5 border-t border-slate-100 pt-4">
            {SECONDARY_MENU.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sky-100/80 text-sky-800 font-bold border border-sky-200 shadow-xs'
                      : 'text-slate-500 hover:bg-slate-100/70 hover:text-slate-800 active:bg-sky-50'
                  }`
                }
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer / Student Profile Summary (matching reference image) */}
        <div className="p-4">
          <Link
            to="/profile"
            onClick={onClose}
            className="clay-card block p-3.5 transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <UserAvatar
                name={name}
                avatarUrl={profile?.avatar_url}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs font-bold text-slate-900">
                    {name}
                  </p>
                  <span className="text-[10px] font-bold text-slate-500">
                    Level {level}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-500"
                    style={{ width: `${xpPct}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-[9px] font-semibold text-slate-400">
                  {xp.toLocaleString()} / {xpCap.toLocaleString()} XP
                </p>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}


