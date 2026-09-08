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
} from 'lucide-react';
import { api } from '../api.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import UserAvatar from './UserAvatar.jsx';
import CreditStageModal from './CreditStages/CreditStageModal.jsx';
import { getCreditStage } from '../utils/creditStages.js';
import { usePerformance } from '../context/PerformanceContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

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
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const { isLiteMode, toggleLiteMode } = usePerformance();
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

  const name = profile?.full_name?.split(' ')[0] || (student?.name ? student.name.split(' ')[0] : 'Scholar');

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full shrink-0 items-center justify-between px-4 sm:px-8 transition-all">
      {/* Left: Mobile Toggle Button & Brand */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="clay-btn-circle flex h-10 w-10 items-center justify-center text-slate-600 md:hidden"
        >
          <Menu size={18} />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 md:hidden">
          <img src="/logo-icon-transparent.png" alt="LabXplore" className="h-8 w-8 object-contain" />
        </Link>
      </div>

      {/* Center: Clay Capsule Search Bar (matches reference image) */}
      <div ref={containerRef} className="relative flex flex-1 justify-center px-2 max-w-xl mx-auto">
        <div className="clay-card relative flex w-full max-w-[480px] items-center rounded-full bg-white px-4 py-2 shadow-sm">
          <Search size={16} className="text-slate-400 shrink-0 mr-2.5" />
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
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 outline-none"
          />

          {query ? (
            <button
              onClick={() => setQuery('')}
              className="mr-2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="hidden lg:inline-flex mr-2 text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
              ⌘K
            </kbd>
          )}

          {/* Yellow Circular Clay Search Button on the Right */}
          <button
            onClick={() => query && handleSelect(results[0]?.to || '/')}
            className="clay-btn-yellow flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-900 shadow-sm"
            aria-label="Search"
          >
            <Search size={14} strokeWidth={2.5} />
          </button>

          {/* Instant Dropdown Results */}
          {isOpen && (
            <div className="clay-card absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white p-2 shadow-xl z-50">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {query.trim() ? t('search.matchingResults', 'Matching Results') : t('search.suggestedExplorations', 'Suggested Explorations')}
              </div>
              {results.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  {t('search.noResults', 'No experiments found for')} "{query}"
                </div>
              ) : (
                results.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.title}
                      onClick={() => handleSelect(item.to)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition hover:bg-slate-50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ItemIcon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-slate-800">{item.title}</p>
                        <span className="text-[10px] text-slate-400">{item.type}</span>
                      </div>
                      <ArrowRight size={13} className="text-slate-300" />
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Regional Language Selector, Lite Mode, Clay Credit Stage Capsule, Notifications, Cart/Tools, and 3D Avatar Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Regional Language Selector (Offline Cached) */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-black transition-all border shadow-xs bg-white text-slate-700 border-sky-200 hover:border-sky-400 hover:bg-sky-50 active:scale-95 cursor-pointer"
            title="Switch Language (English, हिन्दी, தமிழ், తెలుగు) - 100% Offline Cached"
          >
            <Languages size={14} className="text-sky-600" />
            <span className="font-bold text-slate-800">
              {supportedLanguages.find((l) => l.code === currentLang)?.native || 'English'}
            </span>
            <span className="bg-sky-100 text-sky-700 text-[10px] font-extrabold px-1.5 py-0.2 rounded uppercase">
              {supportedLanguages.find((l) => l.code === currentLang)?.badge || 'EN'}
            </span>
            <ChevronDown size={12} className={`text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {langDropdownOpen && (
            <div className="clay-card absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl z-50 border border-sky-100 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Regional Languages
                </span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <Check size={10} /> Offline Ready
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
                          ? 'bg-sky-50 text-sky-900 font-black border border-sky-200'
                          : 'text-slate-700 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{lang.native}</span>
                        <span className="text-[10px] text-slate-400">{lang.label} ({lang.script})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {lang.badge}
                        </span>
                        {isSelected && <Check size={14} className="text-sky-600 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Lite Mode Performance Toggle */}
        <button
          type="button"
          onClick={toggleLiteMode}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-black transition-all border shadow-xs active:scale-95 cursor-pointer ${
            isLiteMode
              ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-amber-400/20 animate-pulse'
              : 'bg-white text-slate-600 border-sky-100 hover:bg-sky-50 hover:text-sky-700'
          }`}
          title={isLiteMode ? "Lite Mode Active (30 FPS, Flat CSS, Low Compute) - Click to restore 60 FPS" : "Click to activate Lite Mode for low-spec demo devices"}
        >
          <Zap size={13} className={isLiteMode ? "text-slate-950 fill-slate-950" : "text-amber-500"} />
          <span className="hidden md:inline">{isLiteMode ? 'Lite Mode' : 'Lite Mode'}</span>
        </button>

        {/* Credit Stage Capsule Button */}
        <button
          type="button"
          onClick={() => setStageModalOpen(true)}
          className="clay-card hidden sm:flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm border border-sky-200 hover:border-amber-400 transition cursor-pointer active:scale-95"
          title="Click to view Credit Stages & Status"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 text-slate-950 text-[10px] font-black shadow-2xs">
            ⚡
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-slate-900 font-mono">{xp.toLocaleString()} Credits</span>
            <span className="text-sky-400 font-medium">·</span>
            <span className="text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full text-[10px] font-black border border-sky-200">
              Stage {stageInfo.stage}: {stageInfo.title}
            </span>
          </div>
        </button>

        {/* Notification Button with Clay '3' Badge */}
        <Link
          to="/daily-challenge"
          className="clay-btn-circle relative flex h-10 w-10 items-center justify-center text-slate-600"
          title="3 new lab notifications"
        >
          <Bell size={18} />
          <span className="clay-btn-yellow absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-slate-900 shadow-xs">
            3
          </span>
        </Link>

        {/* Tools / Experiments Bag Button with Clay Badge */}
        <Link
          to="/saved"
          className="clay-btn-circle relative flex h-10 w-10 items-center justify-center text-slate-600"
          title={`${savedCount} saved experiments`}
        >
          <ShoppingBag size={18} />
          {savedCount > 0 && (
            <span className="clay-btn-yellow absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-slate-900 shadow-xs">
              {savedCount}
            </span>
          )}
        </Link>

        {/* User Avatar with Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="clay-btn-circle flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 text-slate-800"
          >
            <UserAvatar
              name={profile?.full_name || student?.name}
              email={user?.email}
              avatarUrl={profile?.avatar_url}
              size="sm"
            />
            <span className="text-xs font-bold text-slate-800">
              {profile?.full_name?.split(' ')[0] || (student?.name ? student.name.split(' ')[0] : 'Scholar')}
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="clay-card absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">
                  {profile?.full_name || student?.name || 'Science Scholar'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Level {profile?.level ?? (student?.level ?? 1)} · {profile?.grade_level || 'Student'}
                </p>
                {user?.email && (
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{user.email}</p>
                )}
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <User size={15} className="text-slate-400" /> My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <Settings size={15} className="text-slate-400" /> Settings
                </Link>

                {isAuthenticated ? (
                  <button
                    onClick={async () => {
                      setProfileOpen(false);
                      await signOut();
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-sky-600 hover:bg-sky-50 transition"
                  >
                    <LogIn size={15} /> Sign In
                  </Link>
                )}
              </div>
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

