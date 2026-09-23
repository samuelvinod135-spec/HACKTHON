import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  Bell,
  ShoppingBag,
  ChevronDown,
  Atom,
  FlaskConical,
  TestTubes,
  Zap,
  Sparkles,
  Flame,
  ArrowRight,
  User,
  Settings,
  LogIn,
  LogOut,
  GraduationCap,
  Camera,
  Clock,
  Sliders,
  Swords,
  Brain,
  Languages,
  Check,
  Building2,
  Sun,
  Moon,
} from 'lucide-react';
import { api } from '../api.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { extractUsername } from '../utils/userUtils.js';
import { supabase } from '../supabase.js';
import UserAvatar from './UserAvatar.jsx';
import CreditStageModal from './CreditStages/CreditStageModal.jsx';
import { getCreditStage } from '../utils/creditStages.js';
import { usePerformance } from '../context/PerformanceContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const SEARCH_INDEX = [
  { title: 'Snap & Solve (Smart OCR)', type: 'Innovation', to: '/snap-solve', icon: Camera },
  { title: 'Pomodoro Study Lounge & Audio', type: 'Focus Room', to: '/pomodoro', icon: Clock },
  { title: 'Interactive Sandbox Labs', type: 'Simulation', to: '/sandbox', icon: Sliders },
  { title: 'Real-Time Peer Battles (1v1)', type: 'Multiplayer', to: '/battles', icon: Swords },
  { title: 'Spaced Repetition & Forgetting Curve', type: 'Retention AI', to: '/spaced-repetition', icon: Brain },
  { title: 'Adaptive Physics Mock Test', type: 'Mock Test', to: '/mock-tests', icon: GraduationCap },
  { title: 'Magnesium Ribbon Burning', type: 'Chemistry', to: '/chemistry', icon: Flame },
  { title: 'Pendulum Motion', type: 'Physics', to: '/physics', icon: Atom },
  { title: 'Reaction Speed Test', type: 'Chemistry', to: '/chemistry', icon: FlaskConical },
  { title: 'Lens Refraction & Optics', type: 'Physics', to: '/physics', icon: Sparkles },
  { title: 'Projectile Launch', type: 'Physics', to: '/physics', icon: Atom },
  { title: 'Electrolysis of Water', type: 'Chemistry', to: '/chemistry', icon: FlaskConical },
  { title: 'Chemistry Basics Quiz', type: 'Quiz', to: '/quizzes', icon: TestTubes },
  { title: 'Daily Science Challenge', type: 'Challenge', to: '/daily-challenge', icon: Zap },
];

export default function Header({ onMenuClick }) {
  const { student } = useProgress();
  const { user, session, profile, signOut, isAuthenticated, isTeacher, isAdmin, switchPersona } = useAuth();
  const { isLiteMode, toggleLiteMode } = usePerformance();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const { currentLang, setLanguage, supportedLanguages, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef(null);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [stageModalOpen, setStageModalOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const containerRef = useRef(null);
  const profileRef = useRef(null);
  const inputRef = useRef(null);

  const xp = profile?.xp ?? (student ? student.xp : 0);
  const stageInfo = getCreditStage(xp);

  useEffect(() => {
    async function loadSavedCount() {
      try {
        const list = await api.getSaved();
        if (Array.isArray(list)) setSavedCount(list.length);
      } catch {}
    }
    loadSavedCount();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setProfileOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = query.trim()
    ? SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_INDEX.slice(0, 5);

  const handleSelect = (to) => {
    setIsOpen(false);
    setQuery('');
    navigate(to);
  };

  const userEmail = session?.user?.email || user?.email;
  const dynamicUsername = extractUsername(userEmail, 'Scholar');
  const displayName = profile?.username || dynamicUsername || profile?.full_name?.split(' ')[0] || (student?.name && student.name !== 'Student Scholar' ? student.name.split(' ')[0] : 'Scholar');

  return (
    <header className="sticky top-0 z-30 flex h-16 sm:h-20 w-full shrink-0 items-center justify-between px-3 sm:px-6 bg-[#edf2f8]/90 dark:bg-[#222222]/95 backdrop-blur-md border-b border-slate-200/60 dark:border-[#333333] transition-colors">
      {/* Left: Mobile Toggle Button & Brand */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white dark:bg-[#2D2D2D] border border-slate-200 dark:border-[#3D3D3D] text-slate-600 dark:text-white shadow-2xs md:hidden cursor-pointer"
        >
          <Menu size={18} />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 md:hidden">
          <img src="/logo-icon-transparent.png" alt="LabXplore" className="h-7 w-7 object-contain" />
        </Link>
      </div>

      {/* Center: Robust Responsive Search Bar */}
      <div ref={containerRef} className="relative flex flex-1 items-center justify-center px-2 max-w-lg mx-2 sm:mx-4 min-w-[140px] sm:min-w-[240px]">
        <div className="relative flex w-full items-center rounded-full bg-white dark:bg-[#1A1A1A] px-3.5 py-1.5 sm:py-2 shadow-xs border border-slate-200 dark:border-[#3D3D3D] focus-within:border-sky-400 dark:focus-within:border-white transition-all">
          <Search size={15} className="text-slate-400 dark:text-[#A0A0A0] shrink-0 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={t('search.placeholder', 'Search experiments, topics...')}
            className="w-full min-w-0 bg-transparent text-xs sm:text-sm font-medium text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder:text-[#A0A0A0] outline-none"
          />

          {query ? (
            <button
              onClick={() => setQuery('')}
              className="mr-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="hidden xl:inline-flex mr-2 text-[10px] font-semibold text-slate-400 dark:text-[#A0A0A0] bg-slate-100 dark:bg-[#2D2D2D] px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#3D3D3D]">
              Ctrl K
            </kbd>
          )}

          {/* Search Button (Amber in Light, Pure White #FFFFFF in Dark) */}
          <button
            onClick={() => query && handleSelect(results[0]?.to || '/')}
            className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 hover:bg-amber-300 dark:bg-white dark:hover:bg-slate-200 text-slate-950 dark:text-[#1A1A1A] shadow-xs transition cursor-pointer"
            aria-label="Search"
          >
            <Search size={13} strokeWidth={2.5} />
          </button>

          {/* Instant Dropdown Results */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-[#2D2D2D] p-2 shadow-2xl z-50 border border-slate-200 dark:border-[#3D3D3D]">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#A0A0A0]">
                {query.trim() ? t('search.matchingResults', 'Matching Results') : t('search.suggestedExplorations', 'Suggested Explorations')}
              </div>
              {results.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 dark:text-[#A0A0A0]">
                  {t('search.noResults', 'No experiments found for')} "{query}"
                </div>
              ) : (
                results.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.title}
                      onClick={() => handleSelect(item.to)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition hover:bg-slate-100 dark:hover:bg-[#3D3D3D] cursor-pointer"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-[#222222] text-sky-600 dark:text-white">
                        <ItemIcon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-slate-800 dark:text-white">{item.title}</p>
                        <span className="text-[10px] text-slate-400 dark:text-[#A0A0A0]">{item.type}</span>
                      </div>
                      <ArrowRight size={13} className="text-slate-300 dark:text-[#A0A0A0]" />
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Controls & Badges */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Regional Language Selector */}
        {!isLiteMode && (
          <div className="relative hidden md:block" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs bg-white dark:bg-[#2D2D2D] text-slate-700 dark:text-white border-slate-200 dark:border-[#3D3D3D] hover:bg-slate-50 dark:hover:bg-[#3D3D3D] cursor-pointer"
              title="Switch Language"
            >
              <Languages size={13} className="text-sky-500 dark:text-white" />
              <span className="font-bold">
                {supportedLanguages.find((l) => l.code === currentLang)?.badge || 'EN'}
              </span>
              <ChevronDown size={11} className={`text-slate-400 dark:text-[#A0A0A0] transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-[#2D2D2D] p-2 shadow-2xl z-50 border border-slate-200 dark:border-[#3D3D3D] animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-[#3D3D3D] mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-[#A0A0A0]">
                    Languages
                  </span>
                </div>
                <div className="space-y-1">
                  {supportedLanguages.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs transition text-left cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 dark:bg-[#3D3D3D] text-sky-900 dark:text-white font-bold border border-sky-200 dark:border-white'
                            : 'text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3D3D3D]'
                        }`}
                      >
                        <span>{lang.native}</span>
                        {isSelected && <Check size={13} className="text-sky-600 dark:text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lite Mode Toggle */}
        <button
          type="button"
          onClick={toggleLiteMode}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs active:scale-95 cursor-pointer ${
            isLiteMode
              ? 'bg-amber-400 dark:bg-white text-slate-950 dark:text-[#1A1A1A] border-amber-500 dark:border-white font-black'
              : 'bg-white dark:bg-[#2D2D2D] text-slate-600 dark:text-[#A0A0A0] border-slate-200 dark:border-[#3D3D3D] hover:bg-slate-50 dark:hover:bg-[#3D3D3D] dark:hover:text-white'
          }`}
          title={isLiteMode ? "Lite Mode Active (Essential Functions Only) - Click to restore full AI mode" : "Click to activate Lite Mode (clean, simple, less clutter)"}
        >
          <Zap size={13} className={isLiteMode ? "text-slate-950 dark:text-[#1A1A1A] fill-current" : "text-amber-500 dark:text-white"} />
          <span className="hidden sm:inline">{isLiteMode ? 'Lite Mode (ON)' : 'Lite Mode'}</span>
        </button>

        {/* Theme Toggle Button (Sun / Moon) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border shadow-2xs transition-all active:scale-95 cursor-pointer bg-white dark:bg-[#2D2D2D] text-slate-700 dark:text-white border-slate-200 dark:border-[#3D3D3D] hover:bg-slate-50 dark:hover:bg-[#3D3D3D]"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme mode"
        >
          {isDark ? (
            <Sun size={15} className="text-white" />
          ) : (
            <Moon size={15} className="text-slate-600" />
          )}
        </button>

        {/* Credit Stage Capsule Button (Students Only) */}
        {!isTeacher && !isAdmin && !isLiteMode && (
          <button
            type="button"
            onClick={() => setStageModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 rounded-full bg-white dark:bg-[#2D2D2D] px-3 py-1.5 shadow-2xs border border-slate-200 dark:border-[#3D3D3D] hover:border-amber-400 dark:hover:border-white transition cursor-pointer text-xs font-bold text-slate-800 dark:text-white"
            title="Click to view Credit Stages & Status"
          >
            <span className="text-amber-500 dark:text-white font-mono">⚡ {xp.toLocaleString()} Credits</span>
            <span className="hidden 2xl:inline text-sky-800 dark:text-white bg-sky-50 dark:bg-[#1A1A1A] px-2 py-0.2 rounded-full text-[10px] border border-transparent dark:border-[#3D3D3D]">
              Stage {stageInfo.stage}
            </span>
          </button>
        )}

        {/* Notification Button */}
        {!isLiteMode && (
          <Link
            to="/daily-challenge"
            className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-[#2D2D2D] border border-slate-200 dark:border-[#3D3D3D] text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3D3D3D]"
            title="3 new lab notifications"
          >
            <Bell size={16} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 dark:bg-white text-[9px] font-bold text-slate-950 dark:text-[#1A1A1A]">
              3
            </span>
          </Link>
        )}

        {/* Tools / Experiments Bag Button */}
        {!isLiteMode && (
          <Link
            to="/saved"
            className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-[#2D2D2D] border border-slate-200 dark:border-[#3D3D3D] text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3D3D3D]"
            title={`${savedCount} saved experiments`}
          >
            <ShoppingBag size={16} />
            {savedCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 dark:bg-white text-[9px] font-bold text-slate-950 dark:text-[#1A1A1A]">
                {savedCount}
              </span>
            )}
          </Link>
        )}

        {/* User Avatar with Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="clay-btn-circle flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 text-slate-800 dark:text-white cursor-pointer dark:bg-[#2D2D2D] dark:border-[#3D3D3D]"
          >
            <UserAvatar
              name={displayName}
              email={userEmail}
              avatarUrl={profile?.avatar_url}
              size="sm"
            />
            <span className="text-xs font-bold text-slate-800 dark:text-white max-w-[100px] truncate">
              {displayName}
            </span>
            <ChevronDown size={14} className={`text-slate-400 dark:text-[#A0A0A0] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile / Settings Dropdown */}
          {profileOpen && (
            <div className="clay-card absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-[#2D2D2D] p-3 shadow-2xl z-50 border border-slate-100 dark:border-[#3D3D3D] animate-in fade-in slide-in-from-top-2">
              {isAuthenticated || userEmail ? (
                /* ================= LOGGED IN STATE ================= */
                <div>
                  {/* Exact Supabase Session Email & Dynamic Username Badge */}
                  <div className="px-2 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {profile?.full_name || displayName}
                      </p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 shrink-0">
                        @{dynamicUsername}
                      </span>
                    </div>
                    {userEmail && (
                      <p className="font-mono text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-1 select-all" title={userEmail}>
                        {userEmail}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                          isAdmin
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : isTeacher
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                        }`}
                      >
                        {profile?.role || 'student'}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {profile?.institution_name || 'DPS R.K. Puram'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 py-1">
                    {/* Direct Institutional Portal Links */}
                    {(isTeacher || isAdmin) && (
                      <Link
                        to="/teacher"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-black text-amber-950 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition"
                      >
                        <GraduationCap size={15} className="text-amber-700 dark:text-amber-400" />
                        <span>Teacher Cockpit</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-black text-emerald-950 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition"
                      >
                        <Building2 size={15} className="text-emerald-700 dark:text-emerald-400" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <User size={15} className="text-slate-400" /> My Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <Settings size={15} className="text-slate-400" /> Settings
                    </Link>

                    {/* Instant Role Persona Switcher - Non-Production / Dev Only */}
                    {(import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_SWITCHER === 'true') && (
                      <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 px-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
                          Dev Persona Switcher:
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              switchPersona('student');
                              navigate('/dashboard');
                              setProfileOpen(false);
                            }}
                            className={`px-1.5 py-1 rounded-lg text-[9px] font-bold transition cursor-pointer ${
                              !isTeacher && !isAdmin
                                ? 'bg-sky-500 text-white font-black shadow-2xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            Student
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              switchPersona('teacher');
                              navigate('/teacher');
                              setProfileOpen(false);
                            }}
                            className={`px-1.5 py-1 rounded-lg text-[9px] font-bold transition cursor-pointer ${
                              isTeacher
                                ? 'bg-amber-400 text-slate-950 font-black shadow-2xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            Teacher
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              switchPersona('admin');
                              navigate('/admin');
                              setProfileOpen(false);
                            }}
                            className={`px-1.5 py-1 rounded-lg text-[9px] font-bold transition cursor-pointer ${
                              isAdmin
                                ? 'bg-emerald-500 text-white font-black shadow-2xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Functional Logout Button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                      <button
                        onClick={async () => {
                          setProfileOpen(false);
                          try {
                            await supabase.auth.signOut();
                          } catch (err) {
                            console.warn('Supabase sign out error:', err);
                          }
                          await signOut();
                          navigate('/');
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= LOGGED OUT STATE ================= */
                <div className="space-y-3 py-1">
                  <div className="text-center px-1">
                    <p className="text-xs font-black text-slate-900 dark:text-slate-100">Welcome to LabXplore</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Sign in to save progress & sync credits</p>
                  </div>

                  {/* Supabase Google OAuth Button */}
                  <button
                    onClick={async () => {
                      setProfileOpen(false);
                      try {
                        const { error } = await supabase.auth.signInWithOAuth({
                          provider: 'google',
                          options: {
                            redirectTo: `${window.location.origin}/dashboard`,
                            queryParams: {
                              access_type: 'offline',
                              prompt: 'consent',
                            },
                          },
                        });
                        if (error) throw error;
                      } catch (err) {
                        console.error('Google OAuth trigger failed:', err);
                        navigate('/login');
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-black text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="flex items-center gap-2 my-2">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">or</span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                  </div>

                  <Link
                    to="/login"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <LogIn size={15} /> Sign In with Email
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Credit Stage & Status Modal */}
      <CreditStageModal
        isOpen={stageModalOpen}
        onClose={() => setStageModalOpen(false)}
        credits={xp}
      />
    </header>
  );
}

