import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { signInWithIdentifier, signInWithGoogle, isAuthenticated } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleNotice, setGoogleNotice] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!identifier.trim() || !password) {
      setError('Please enter your student username or email, along with your password.');
      return;
    }

    setLoading(true);
    const { error: authErr } = await signInWithIdentifier({
      identifier: identifier.trim(),
      password,
    });
    setLoading(false);

    if (authErr) {
      setError(authErr.message || 'Incorrect credentials. Please check your username or password.');
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
          ? 'Google OAuth can be enabled anytime in your Supabase Dashboard. Use your Student Username or Email to sign in!'
          : gErr.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col justify-center py-8 sm:py-14 px-4 sm:px-6 relative overflow-hidden font-sans antialiased text-slate-800">
      {/* Ambient Orbs (Sky Blue + Warm Yellow) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[400px] bg-sky-200/40 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-amber-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Top Return Link */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <Link
          to="/"
          className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-200 shadow-xs"
        >
          ← Return to Studio
        </Link>
      </div>

      <div className="w-full max-w-[420px] mx-auto relative z-10 pt-8 sm:pt-0">
        {/* Card */}
        <div className="card-sky-glass p-6 sm:p-9 rounded-3xl shadow-xl">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white flex items-center justify-center font-black mx-auto mb-3 shadow-md shadow-sky-500/25">
              <span className="text-xl">🧪</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Sign in to <span className="text-sky-500">LabXplore</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your credentials to access your research notebooks.
            </p>
          </div>

          {/* Segmented Switcher */}
          <div className="segmented-sky-yellow grid grid-cols-2 gap-1 mb-5 p-1">
            <button
              type="button"
              className="py-2 text-xs font-bold segmented-item-yellow-active text-center"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="py-2 text-xs font-bold text-slate-600 hover:text-sky-700 text-center transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {googleNotice && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{googleNotice}</span>
            </div>
          )}

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-sky-50 text-slate-700 font-bold text-xs sm:text-sm border-2 border-sky-100 shadow-xs flex items-center justify-center gap-2.5 transition-all hover:border-sky-300 mb-4 min-h-[44px]"
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

          {/* Divider */}
          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-sky-100"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
              or student username / email
            </span>
            <div className="flex-grow border-t border-sky-100"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Student Username or Email
              </label>
              <input
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. samuelvinod135 or student@school.edu"
                required
                className="input-sky-clean w-full px-3.5 py-2.5 sm:py-3 text-base sm:text-xs placeholder-slate-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset verification dispatched.')}
                  className="text-[11px] font-bold text-sky-600 hover:text-sky-800"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-sky-clean w-full px-3.5 py-2.5 sm:py-3 pr-10 text-base sm:text-xs placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-400 border-sky-300"
                />
                <span className="text-xs text-slate-600">Remember this workstation</span>
              </label>
            </div>

            {/* Radiant Yellow Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-yellow-primary py-3.5 text-sm font-bold shadow-md mt-2 min-h-[44px]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 mt-5 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-sky-600 hover:underline">
            Create Free Student ID →
          </Link>
        </p>
      </div>
    </div>
  );
}
