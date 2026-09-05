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
} from 'lucide-react';
import { api } from '../api.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import UserAvatar from './UserAvatar.jsx';

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
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const containerRef = useRef(null);
  const profileRef = useRef(null);
  const inputRef = useRef(null);

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
      {/* Left: Mobile Toggle Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="clay-btn-circle flex h-10 w-10 items-center justify-center text-slate-600 md:hidden"
        >
          <Menu size={18} />
        </button>
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
            placeholder="Search experiments, topics..."
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
                {query.trim() ? 'Matching Results' : 'Suggested Explorations'}
              </div>
              {results.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No experiments found for "{query}"
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

      {/* Right: Clay Notifications, Cart/Tools, and 3D Avatar Profile */}
      <div className="flex items-center gap-3 shrink-0">
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
    </header>
  );
}

