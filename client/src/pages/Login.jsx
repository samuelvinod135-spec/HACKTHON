import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Lock,
  Mail,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { signInWithEmail, signInWithGoogle, demoLogin, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleNotice, setGoogleNotice] = useState(null);

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const { error: authErr } = await signInWithEmail({ email, password });
    setLoading(false);

    if (authErr) {
      setError(authErr.message || 'Incorrect credentials. Please verify your email and password.');
    } else {
      navigate('/dashboard');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleNotice(null);
    const { error: gErr } = await signInWithGoogle();
    if (gErr) {
      setGoogleNotice(
        gErr.message.includes('provider is not enabled')
          ? 'Google OAuth can be enabled anytime in your Supabase Dashboard. In the meantime, use Email & Password or 1-Click Demo!'
          : gErr.message
      );
    }
  };

  const handleDemoSignIn = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center py-12 px-6 sm:px-8 relative overflow-hidden font-sans antialiased text-[#1d1d1f]">
      {/* Subtle Apple Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-200/40 to-indigo-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Minimal Top Nav Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
        >
          ← Return to Studio
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[420px] relative z-10">
        {/* Floating Frosted Sheet Card */}
        <div className="apple-card p-8 sm:p-10 rounded-3xl border border-white/90 shadow-2xl">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-black mx-auto mb-4 shadow-sm">
              ✦
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Sign in to LabXplore
            </h1>
            <p className="text-xs text-neutral-500 mt-1 font-normal">
              Enter your student ID or email to access your research notebooks.
            </p>
          </div>

          {/* Cupertino Segmented Control */}
          <div className="apple-segmented flex mb-6">
            <button
              type="button"
              className="flex-1 py-1.5 text-xs apple-segmented-item-active"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="flex-1 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 text-center transition-colors font-medium"
            >
              Create Account
            </Link>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50/80 border border-red-200/80 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {googleNotice && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-800 text-xs flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{googleNotice}</span>
            </div>
          )}

          {/* Social Sign-in Buttons */}
          <div className="space-y-2.5 mb-6">
            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs border border-black/[0.08] shadow-xs flex items-center justify-center gap-2.5 transition-all hover:border-black/[0.15]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Apple Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2.5 transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.93-12.01-14.54-6.84-10.45-12.09-21.87-15.75-34.28-3.67-12.41-5.5-23.71-5.5-33.89 0-14.28 3.52-25.79 10.56-34.52 7.04-8.73 16.03-13.19 26.97-13.38 4.7 0 10.05 1.25 16.05 3.76 6 2.51 9.87 3.82 11.61 3.94 2.21 0 6.22-1.35 12.04-4.06 5.82-2.71 10.99-3.97 15.52-3.78 11.59.54 20.76 4.79 27.52 12.76-10.15 6.13-15.11 14.77-14.88 25.93.22 8.71 3.49 15.93 9.82 21.66 6.33 5.73 13.97 9.07 22.92 10.03-2.02 6.06-4.51 12.07-7.46 18.04zM119.22 31.02c0-7.14 2.61-13.88 7.83-20.22 5.22-6.34 11.75-10.46 19.59-12.36.11 1.09.16 1.96.16 2.61 0 7.02-2.73 13.89-8.19 20.61-5.46 6.72-12 10.87-19.63 12.45-.11-1.09-.16-1.96-.16-2.61z" />
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>

          {/* Minimal Divider */}
          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-black/[0.06]"></div>
            <span className="flex-shrink mx-3 text-neutral-400 text-[11px] font-medium tracking-wide uppercase">
              or student email
            </span>
            <div className="flex-grow border-t border-black/[0.06]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@school.edu"
                  required
                  className="apple-input w-full px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset verification link dispatched.')}
                  className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="apple-input w-full px-3.5 py-2.5 pr-10 text-xs text-neutral-900 placeholder-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300"
                />
                <span className="text-xs text-neutral-600 font-normal">Remember this workstation</span>
              </label>
            </div>

            {/* Jet Black Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full apple-btn-black py-3 text-xs font-semibold flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Cupertino Developer / Quick Demo Profile Chip */}
          <div className="mt-6 pt-5 border-t border-black/[0.06]">
            <p className="text-[11px] font-medium text-neutral-400 mb-2.5 text-center">
              Evaluation & Guest Access
            </p>
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full p-2.5 rounded-2xl bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.05] transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white shadow-xs">
                  <img src="/clay/avatar.jpg" alt="Alex Chen" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Alex Chen</p>
                  <p className="text-[11px] text-neutral-500 font-mono">Level 13 · 4,250 XP</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 pr-1 group-hover:translate-x-0.5 transition-transform">
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Minimal Footer Note */}
        <p className="text-center text-xs text-neutral-400 mt-6 font-normal">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-neutral-900 hover:underline">
            Create Student ID →
          </Link>
        </p>
      </div>
    </div>
  );
}
