import { Link } from 'react-router-dom';
import { ArrowLeft, Atom } from 'lucide-react';
import PhysicsWorkspace from '../components/PhysicsWorkspace.jsx';

export default function PhysicsLab() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-xs transition hover:bg-slate-50 hover:text-slate-900"
          title="Back to dashboard"
        >
          <ArrowLeft size={16} />
        </Link>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 border border-teal-200/60">
          <Atom size={20} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Physics Lab</h2>
          <p className="text-xs text-slate-400">Kinematics · Mechanics · Wave Optics</p>
        </div>
      </div>

      <PhysicsWorkspace />
    </div>
  );
}
