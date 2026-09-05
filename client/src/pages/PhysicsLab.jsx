import { Link } from 'react-router-dom';
import { ArrowLeft, Atom, Sparkles, Compass } from 'lucide-react';
import PhysicsWorkspace from '../components/PhysicsWorkspace.jsx';

export default function PhysicsLab() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-3">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="clay-btn-circle flex h-9 w-9 items-center justify-center text-slate-500 hover:text-slate-900"
            title="Back to dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-400 text-white shadow-md">
            <Atom size={20} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-tight text-slate-900">Physics Lab</h2>
              <span className="rounded-md bg-teal-100/80 border border-teal-200 px-2 py-0.5 text-[10px] font-extrabold text-teal-800">
                Snell's Law & Dynamics
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive 2D Ray Tracing · Lens Maker Equation · Newtonian Mechanics
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-100 shadow-xs">
            <Sparkles size={12} className="text-teal-500" />
            <span>High-DPI Canvas</span>
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-100 shadow-xs">
            <Compass size={12} className="text-sky-500" />
            <span>Snell Refraction</span>
          </span>
        </div>
      </div>

      {/* Physics Workspace Centerpiece */}
      <PhysicsWorkspace />
    </div>
  );
}
