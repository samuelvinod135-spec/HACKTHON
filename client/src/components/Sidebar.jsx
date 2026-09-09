import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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
  Camera,
  Clock,
  Sliders,
  Swords,
  Brain,
  GripVertical,
  Sparkles,
  ChevronDown,
  Building2,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import UserAvatar from './UserAvatar.jsx';
import { getCreditStage } from '../utils/creditStages.js';

export function LabXploreLogo({ className = '' }) {
  const { t } = useLanguage();
  return (
    <Link to="/dashboard" className={`flex items-center gap-3 group ${className}`}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white border border-sky-100 p-1 shadow-md shadow-sky-500/10 group-hover:scale-105 group-hover:shadow-sky-500/20 transition-all">
        <img
          src="/logo-icon-transparent.png"
          alt="LabXplore Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <div>
        <div className="flex items-center text-lg font-black tracking-tight text-slate-900 leading-none">
          <span className="text-sky-500">Lab</span>
          <span className="text-amber-500 ml-0.5">Xplore</span>
        </div>
        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block mt-1">
          {t('nav.virtualScienceLab', 'Virtual Science Lab')}
        </span>
      </div>
    </Link>
  );
}

const PRIMARY_MENU = [
  { to: '/dashboard', label: 'Home', tKey: 'nav.home', icon: Home },
  { to: '/physics', label: 'Physics Lab', tKey: 'nav.physicsLab', icon: Atom },
  {
    to: '/chemistry',
    label: 'Chemistry Lab',
    tKey: 'nav.chemistryLab',
    icon: FlaskConical,
    badge: '2 Modes',
    subItems: [
      {
        to: '/chemistry?tab=drag-and-drop',
        matchTab: 'drag-and-drop',
        label: 'Drag & Drop Lab',
        tKey: 'nav.dragAndDropLab',
        icon: GripVertical,
        badge: 'Canvas',
      },
      {
        to: '/chemistry?tab=organic',
        matchTab: 'organic',
        label: 'Organic Chemistry',
        tKey: 'nav.organicChemistry',
        icon: Sparkles,
        badge: '2,209 Rx',
      },
    ],
  },
  { to: '/quizzes', label: 'Quizzes', tKey: 'nav.quizzes', icon: TestTubes },
  { to: '/daily-challenge', label: 'Daily Challenge', tKey: 'nav.dailyTasks', icon: Zap },
  { to: '/mock-tests', label: 'Mock Tests', tKey: 'nav.mockTests', icon: GraduationCap },
];

const INSTITUTIONAL_MENU = [
  { to: '/teacher', label: 'Teacher Cockpit', icon: GraduationCap, badge: 'Faculty' },
  { to: '/admin', label: 'Admin Dashboard', icon: Building2, badge: 'Campus' },
];

const HACKATHON_MENU = [
  { to: '/snap-solve', label: 'Snap & Solve', tKey: 'nav.snapAndSolve', icon: Camera, badge: 'OCR' },
  { to: '/sandbox', label: 'Sandbox Labs', tKey: 'nav.sandboxLabs', icon: Sliders, badge: 'Sim' },
  { to: '/spaced-repetition', label: 'Spaced Repetition', tKey: 'nav.spacedRepetition', icon: Brain, badge: 'AI' },
  { to: '/experimental', label: 'Experimental / Beta', tKey: 'nav.experimental', icon: Sparkles, badge: 'Beta' },
];

const SECONDARY_MENU = [
  { to: '/saved', label: 'Saved Experiments', tKey: 'nav.savedExperiments', icon: Bookmark },
  { to: '/progress', label: 'My Progress', tKey: 'nav.progress', icon: TrendingUp },
  { to: '/achievements', label: 'Achievements', tKey: 'nav.achievements', icon: Award },
  { to: '/profile', label: 'Profile', tKey: 'nav.profile', icon: User },
  { to: '/settings', label: 'Settings', tKey: 'nav.settings', icon: Settings },
  { to: '/help', label: 'Help & Support', tKey: 'nav.helpSupport', icon: HelpCircle },
  { to: '/landing', label: 'Public Landing Page', tKey: 'nav.landingPage', icon: Star },
];

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { student } = useProgress();
  const { profile, isTeacher, isAdmin, isStudent } = useAuth();
  const location = useLocation();
  const [chemExpanded, setChemExpanded] = useState(true);

  const xp = profile?.xp ?? (student ? student.xp : 0);
  const xpCap = profile?.xp_for_level ?? (student ? student.xp_for_level : 1000);
  const level = profile?.level ?? (student ? student.level : 1);
  const stageInfo = getCreditStage(xp);
  const name = profile?.full_name?.split(' ')[0] || (student?.name ? student.name.split(' ')[0] : 'Scholar');
  const avatarUrl = profile?.avatar_url || '';
  const xpPct = Math.min(100, Math.round((xp / xpCap) * 100));

  const isChemRoute = location.pathname.startsWith('/chemistry') || location.pathname === '/organic';
  const currentTab = new URLSearchParams(location.search).get('tab') || (location.pathname === '/organic' ? 'organic' : 'drag-and-drop');

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
          <div onClick={onClose} className="cursor-pointer">
            <LabXploreLogo />
          </div>
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
          {/* Role-Specific Navigation Isolation */}
          {isAdmin ? (
            /* 1. ADMIN EXCLUSIVE NAVIGATION */
            <nav className="flex flex-col gap-1.5">
              <div className="px-4 pb-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center justify-between">
                <span>Institutional Admin</span>
                <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold text-[8px] border border-emerald-200">
                  Campus
                </span>
              </div>
              <NavLink
                to="/admin"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                    isActive
                      ? 'bg-emerald-100/80 text-emerald-950 font-black border border-emerald-300 shadow-xs'
                      : 'text-slate-700 hover:bg-emerald-50/60 hover:text-emerald-900 active:bg-emerald-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-emerald-700" />
                  <span>Admin Dashboard</span>
                </div>
                <span className="rounded bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 text-[9px] font-mono font-bold">
                  Executive
                </span>
              </NavLink>
              <NavLink
                to="/teacher"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                    isActive
                      ? 'bg-amber-100/80 text-amber-950 font-black border border-amber-300 shadow-xs'
                      : 'text-slate-700 hover:bg-amber-50/60 hover:text-amber-900 active:bg-amber-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-amber-700" />
                  <span>Faculty Oversight</span>
                </div>
                <span className="rounded bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 text-[9px] font-mono font-bold">
                  Audit
                </span>
              </NavLink>
              <NavLink
                to="/settings"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sky-100/80 text-sky-800 font-bold border border-sky-200 shadow-xs'
                      : 'text-slate-500 hover:bg-slate-100/70 hover:text-slate-800 active:bg-sky-50'
                  }`
                }
              >
                <Settings size={16} />
                <span>Institutional Settings</span>
              </NavLink>
            </nav>
          ) : isTeacher ? (
            /* 2. TEACHER EXCLUSIVE NAVIGATION */
            <nav className="flex flex-col gap-1.5">
              <div className="px-4 pb-1 text-[10px] font-black uppercase tracking-wider text-sky-800 flex items-center justify-between">
                <span>Teacher Cockpit</span>
                <span className="bg-sky-100 text-sky-900 px-1.5 py-0.2 rounded font-extrabold text-[8px] border border-sky-200">
                  Faculty
                </span>
              </div>
              <NavLink
                to="/teacher"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                    isActive && !location.search
                      ? 'bg-sky-500 text-white font-black shadow-xs'
                      : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900 active:bg-sky-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-sky-600" />
                  <span>Cohort Analytics</span>
                </div>
                <span className="rounded bg-yellow-300 text-slate-950 px-1.5 py-0.5 text-[9px] font-mono font-black">
                  Live
                </span>
              </NavLink>
              <NavLink
                to="/teacher?tab=questions"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                    location.search.includes('tab=questions')
                      ? 'bg-sky-500 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-sky-50 hover:text-slate-900 active:bg-sky-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <TestTubes size={16} />
                  <span>Assessment Bank</span>
                </div>
                <span className="rounded bg-sky-100 text-sky-800 px-1.5 py-0.5 text-[9px] font-mono font-bold">
                  Authority
                </span>
              </NavLink>
              <NavLink
                to="/teacher?tab=heatmap"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                    location.search.includes('tab=heatmap')
                      ? 'bg-sky-500 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-sky-50 hover:text-slate-900 active:bg-sky-50'
                  }`
                }
              >
                <TrendingUp size={16} />
                <span>2D Mastery Matrix</span>
              </NavLink>
              <NavLink
                to="/teacher?tab=ai-insights"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                    location.search.includes('tab=ai-insights')
                      ? 'bg-sky-500 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-sky-50 hover:text-slate-900 active:bg-sky-50'
                  }`
                }
              >
                <Brain size={16} />
                <span>AI Pedagogical Insights</span>
              </NavLink>
              <NavLink
                to="/settings"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sky-100/80 text-sky-800 font-bold border border-sky-200 shadow-xs'
                      : 'text-slate-500 hover:bg-slate-100/70 hover:text-slate-800 active:bg-sky-50'
                  }`
                }
              >
                <Settings size={16} />
                <span>Faculty Settings</span>
              </NavLink>
            </nav>
          ) : (
            /* 3. STUDENT EXCLUSIVE NAVIGATION (Institutional Menu Strictly Hidden) */
            <>
              <nav className="flex flex-col gap-1.5">
                {PRIMARY_MENU.map(({ to, label, tKey, icon: Icon, badge, subItems }) => {
                  if (subItems) {
                    const isMainActive = isChemRoute;
                    return (
                      <div key={to} className="flex flex-col gap-1">
                        <div
                          className={`flex items-center justify-between rounded-2xl px-4 py-2 text-xs font-semibold transition ${
                            isMainActive
                              ? 'bg-sky-50/90 text-sky-900 font-bold border border-sky-200/80 shadow-xs'
                              : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                          }`}
                        >
                          <Link
                            to={to}
                            onClick={onClose}
                            className="flex flex-1 items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <Icon size={17} className={isMainActive ? 'text-sky-600' : ''} />
                              <span>{t(tKey, label)}</span>
                            </div>
                            {badge && (
                              <span className="rounded-full bg-yellow-300 text-slate-900 px-2 py-0.5 text-[9px] font-black shadow-xs mr-1">
                                {badge}
                              </span>
                            )}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setChemExpanded((prev) => !prev);
                            }}
                            className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                            title="Toggle sub-pages"
                          >
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-200 ${
                                chemExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {chemExpanded && (
                          <div className="ml-4 pl-3 border-l-2 border-sky-100 flex flex-col gap-1 my-0.5">
                            {subItems.map((sub) => {
                              const isSubActive =
                                isChemRoute &&
                                (currentTab === sub.matchTab ||
                                  (sub.matchTab === 'organic' &&
                                    (currentTab === 'inorganic' || currentTab === 'periodic')));
                              const SubIcon = sub.icon;

                              return (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  onClick={onClose}
                                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                                    isSubActive
                                      ? 'bg-sky-100/90 text-sky-900 font-bold shadow-2xs'
                                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <SubIcon size={15} />
                                    <span>{t(sub.tKey, sub.label)}</span>
                                  </div>
                                  {sub.badge && (
                                    <span
                                      className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                                        isSubActive
                                          ? 'bg-sky-200 text-sky-800'
                                          : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {sub.badge}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                          isActive
                            ? 'bg-sky-100/80 text-sky-800 font-bold border border-sky-200 shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 active:bg-sky-50'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={17} />
                        <span>{t(tKey, label)}</span>
                      </div>
                      {badge && (
                        <span className="rounded-full bg-yellow-300 text-slate-900 px-2 py-0.5 text-[9px] font-black shadow-xs">
                          {badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Hackathon Innovations Navigation */}
              <nav className="flex flex-col gap-1.5 border-t border-slate-100 pt-4">
                <div className="px-4 pb-1 text-[10px] font-black uppercase tracking-wider text-sky-600 flex items-center justify-between">
                  <span>{t('nav.smartInnovations', 'Smart Innovations')}</span>
                  <span className="bg-sky-100 text-sky-700 px-1.5 py-0.2 rounded font-extrabold text-[8px]">
                    NEW
                  </span>
                </div>
                {HACKATHON_MENU.map(({ to, label, tKey, icon: Icon, badge }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                        isActive
                          ? 'bg-sky-100/80 text-sky-800 font-bold border border-sky-200 shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 active:bg-sky-50'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span>{t(tKey, label)}</span>
                    </div>
                    {badge && (
                      <span className="rounded bg-sky-50 text-sky-600 border border-sky-200/80 px-1.5 py-0.5 text-[9px] font-mono font-bold">
                        {badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </>
          )}

          {/* Secondary Navigation */}
          <nav className="flex flex-col gap-1.5 border-t border-slate-100 pt-4">
            {SECONDARY_MENU.filter(({ to }) => {
              if (isTeacher || isAdmin) {
                return !['/progress', '/achievements', '/saved'].includes(to);
              }
              return true;
            }).map(({ to, label, tKey, icon: Icon }) => (
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
                <span>{t(tKey, label)}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer: Role-Isolated Faculty Card vs Student Profile Summary */}
        <div className="p-4">
          {isTeacher || isAdmin ? (
            <Link
              to="/profile"
              onClick={onClose}
              className="clay-card block p-3.5 transition hover:shadow-md border border-sky-100 bg-white"
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
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${
                        isAdmin
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-yellow-100 text-slate-950 border-yellow-300'
                      }`}
                    >
                      {isAdmin ? 'Campus Admin' : 'Faculty'}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 truncate mt-0.5">
                    {profile?.institution_name || 'DPS R.K. Puram'}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span>{profile?.cohort_name || 'Section 10-A'}</span>
                    <span className="text-sky-600 font-bold">Active Lead</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
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
                    <span className="text-[9px] font-black text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                      Stage {stageInfo.stage}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 truncate mt-0.5">
                    {stageInfo.title}
                  </p>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100 p-0.5 border border-sky-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-sky-400 transition-all duration-500"
                      style={{ width: `${xpPct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[9px] font-semibold text-slate-400">
                    {xp.toLocaleString()} Credits · Level {level}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}


