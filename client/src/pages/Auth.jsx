import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FlaskConical,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Atom,
  CheckCircle2,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Auth() {
  const navigate = useNavigate();
  const { student, refresh } = useProgress();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('science123');
  const [name, setName] = useState('Alex Chen');
  const [grade, setGrade] = useState('Grade 9 (Secondary)');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(mode === 'login' ? 'Logged in successfully! Redirecting...' : 'Account created! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 700);
    }, 500);
  };

  const handleDemoLogin = () => {
    setEmail('alex@example.com');
    setPassword('science123');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Welcome back, Alex! Loading dashboard...');
      setTimeout(() => {
        navigate('/');
      }, 500);
    }, 300);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10">
      {/* Decorative 3D Clay floating items in background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-12 w-24 h-24 opacity-80 animate-pulse hidden md:block">
          <img src="/clay/flask.jpg" alt="Clay Flask" className="rounded-3xl shadow-lg transform -rotate-12" />
        </div>
        <div className="absolute bottom-16 right-16 w-28 h-28 opacity-75 hidden md:block">
          <img src="/clay/cradle.jpg" alt="Clay Physics" className="rounded-3xl shadow-lg transform rotate-6" />
        </div>
      </div>

      {/* Main Clay Card */}
      <div className="clay-card relative w-full max-w-md p-7 sm:p-9 shadow-2xl z-10">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="M9 3h6" />
              <path d="M10 3v4.5L5.5 17a3 3 0 0 0 2.5 4h8a3 3 0 0 0 2.5-4L14 7.5V3" />
              <ellipse cx="12" cy="14" rx="7" ry="2.5" transform="rotate(-15 12 14)" strokeWidth="1.5" strokeOpacity="0.85" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
            Lab<span className="text-blue-600">Xplore</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Virtual science laboratory and interactive simulations
          </p>
        </div>

        {/* Mode Switcher Pill */}
        <div className="clay-input mt-6 flex p-1.5 rounded-full bg-slate-100">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
              mode === 'login'
                ? 'clay-pill-active shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'clay-pill-active shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-2">
                Student Full Name
              </label>
              <div className="clay-input flex items-center px-4 py-2.5">
                <User size={16} className="text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 outline-none placeholder-slate-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-2">
              Email Address
            </label>
            <div className="clay-input flex items-center px-4 py-2.5">
              <Mail size={16} className="text-slate-400 mr-2.5 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 outline-none placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 ml-2 mr-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              {mode === 'login' && (
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-blue-600 hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="clay-input flex items-center px-4 py-2.5">
              <Lock size={16} className="text-slate-400 mr-2.5 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 outline-none placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-slate-400 hover:text-slate-600 ml-2"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {successMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="clay-btn-yellow mt-2 flex w-full items-center justify-center gap-2 py-3 text-sm font-bold text-slate-900 shadow-md transition"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to LabXplore' : 'Create Free Student Account'}
            {!loading && <ArrowRight size={15} />}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="clay-btn-circle w-full py-2.5 px-4 text-xs font-bold text-indigo-700 bg-purple-50 hover:bg-purple-100 transition flex items-center justify-center gap-2"
          >
            <Sparkles size={14} className="text-indigo-500" />
            1-Click Demo Login as Alex (Level 13)
          </button>
        </div>

        {/* Social / School Portal Logins */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Or continue with
          </p>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="clay-card flex-1 py-2 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Google
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="clay-card flex-1 py-2 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              School ID
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] text-slate-400">
          By signing in, you agree to LabXplore's Terms of Service and Educational Privacy Policy.
        </p>
      </div>
    </div>
  );
}
