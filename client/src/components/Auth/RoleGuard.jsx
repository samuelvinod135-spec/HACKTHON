import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Enterprise Role Guard for Institutional Learning Operating System (ILOS)
 * Strictly prevents students and unauthorized roles from accessing Teacher Cockpit and Admin Portals.
 */
export default function RoleGuard({ allowedRoles = [] }) {
  const { profile, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent shadow-md" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider animate-pulse">
            Verifying Institutional Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const currentRole = profile?.role || 'student';
  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(currentRole);

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-inner">
          <ShieldAlert size={36} />
        </div>
        <h2 className="mt-5 text-2xl font-black text-slate-900 tracking-tight">
          Restricted Institutional Area
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Your current active account role (<strong>{currentRole.toUpperCase()}</strong>) does not have authorization to view this institutional portal. This view is strictly restricted to authorized <strong>{allowedRoles.join(' / ').toUpperCase()}</strong> personnel.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
          >
            <ArrowLeft size={14} />
            <span>Return to Student Dashboard</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          >
            <LogIn size={14} />
            <span>Switch Role on Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
