import { Link } from 'react-router-dom';
import { ArrowLeft, Atom } from 'lucide-react';
import PhysicsWorkspace from '../components/PhysicsWorkspace.jsx';

export default function PhysicsLab() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          title="Back to dashboard"
        >
          <ArrowLeft size={16} />
        </Link>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-cyan-500 text-white shadow-lg">
          <Atom size={20} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Physics Lab</h2>
          <p className="text-xs text-slate-400">Build · Simulate · Observe</p>
        </div>
      </div>

      <PhysicsWorkspace />
    </div>
  );
}
