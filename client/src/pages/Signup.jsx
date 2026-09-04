import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle, isAuthenticated } = useAuth();

  const [fullName, setFullName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 9-10');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [googleNotice, setGoogleNotice] = useState(null);

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  // Apple-style discrete strength bars
  const getPasswordScore = () => {
    if (!password) return 0;
    let score = 1;
    if (password.length >= 6) score++;
    if (password.length >= 8 && /[0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
    return score; // 1..4
  };

  const score = getPasswordScore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!fullName.trim()) {
      setError('Please provide your full student name.');
      return;
    }
    if (!email.trim() || !password) {
      setError('Please provide a valid email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    const { data, error: authErr } = await signUpWithEmail({
      email,
      password,
      fullName: fullName.trim(),
      gradeLevel,
    });
    setLoading(false);

    if (authErr) {
      setError(authErr.message || 'Unable to complete registration. Please try again.');
    } else {
      if (data?.session) {
        navigate('/dashboard');
      } else {
        setSuccessMsg('Account provisioned successfully. Verification email dispatched to your inbox.');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setGoogleNotice(null);
    const { error: gErr } = await signInWithGoogle();
    if (gErr) {
      setGoogleNotice(
        gErr.message.includes('provider is not enabled')
          ? 'Google OAuth can be enabled in your Supabase Dashboard. In the meantime, use Email & Password registration!'
          : gErr.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center py-12 px-6 sm:px-8 relative overflow-hidden font-sans antialiased text-[#1d1d1f]">
      {/* Subtle Apple Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-purple-200/30 to-blue-200/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Minimal Top Nav Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
        >
          ← Return to Studio
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
        {/* Floating Frosted Sheet Card */}
        <div className="apple-card p-8 sm:p-10 rounded-3xl border border-white/90 shadow-2xl">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-black mx-auto mb-4 shadow-sm">
              ✦
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Create your Student ID
            </h1>
            <p className="text-xs text-neutral-500 mt-1 font-normal">
              Access virtual laboratories, reaction engines, and research telemetry.
            </p>
          </div>

          {/* Cupertino Segmented Control */}
          <div className="apple-segmented flex mb-6">
            <Link
              to="/login"
              className="flex-1 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 text-center transition-colors font-medium"
            >
              Sign In
            </Link>
            <button
              type="button"
              className="flex-1 py-1.5 text-xs apple-segmented-item-active"
            >
              Create Account
            </button>
          </div>

          {/* Alerts */}
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

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
            <button
              type="button"
              onClick={handleGoogleSignUp}
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

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2.5 transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.93-12.01-14.54-6.84-10.45-12.09-21.87-15.75-34.28-3.67-12.41-5.5-23.71-5.5-33.89 0-14.28 3.52-25.79 10.56-34.52 7.04-8.73 16.03-13.19 26.97-13.38 4.7 0 10.05 1.25 16.05 3.76 6 2.51 9.87 3.82 11.61 3.94 2.21 0 6.22-1.35 12.04-4.06 5.82-2.71 10.99-3.97 15.52-3.78 11.59.54 20.76 4.79 27.52 12.76-10.15 6.13-15.11 14.77-14.88 25.93.22 8.71 3.49 15.93 9.82 21.66 6.33 5.73 13.97 9.07 22.92 10.03-2.02 6.06-4.51 12.07-7.46 18.04zM119.22 31.02c0-7.14 2.61-13.88 7.83-20.22 5.22-6.34 11.75-10.46 19.59-12.36.11 1.09.16 1.96.16 2.61 0 7.02-2.73 13.89-8.19 20.61-5.46 6.72-12 10.87-19.63 12.45-.11-1.09-.16-1.96-.16-2.61z" />
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-black/[0.06]"></div>
            <span className="flex-shrink mx-3 text-neutral-400 text-[11px] font-medium tracking-wide uppercase">
              or create with email
            </span>
            <div className="flex-grow border-t border-black/[0.06]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Chen"
                required
                className="apple-input w-full px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Curriculum / Academic Level
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="apple-input w-full px-3.5 py-2.5 text-xs text-neutral-900 bg-white"
              >
                <option value="Middle School (Grade 6-8)">Middle School (Grade 6–8)</option>
                <option value="Grade 9-10">High School (Grade 9–10)</option>
                <option value="Grade 11-12 (AP Prep)">High School (Grade 11–12 / AP Prep)</option>
                <option value="College / Lifelong">University / Lifelong Explorer</option>
                <option value="Educator / Teacher">Educator / Lab Instructor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.chen@school.edu"
                required
                className="apple-input w-full px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

              {/* Apple Segmented Strength Bar */}
              {password && (
                <div className="flex gap-1.5 mt-2">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        score >= bar ? 'bg-neutral-900' : 'bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <p className="text-[11px] text-neutral-500 leading-normal pt-1">
              By registering, you agree to the LabXplore Scientific Safety Protocols and Student Privacy Charter.
            </p>

            {/* Jet Black Primary Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full apple-btn-black py-3 text-xs font-semibold flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Student ID</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Minimal Footer Note */}
        <p className="text-center text-xs text-neutral-400 mt-6 font-normal">
          Already have a student account?{' '}
          <Link to="/login" className="font-semibold text-neutral-900 hover:underline">
            Sign In here →
          </Link>
        </p>
      </div>
    </div>
  );
}
