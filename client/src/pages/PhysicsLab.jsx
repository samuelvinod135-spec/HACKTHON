import { Link } from 'react-router-dom';
import { ArrowLeft, Atom } from 'lucide-react';
import PhysicsWorkspace from '../components/PhysicsWorkspace.jsx';

export default function PhysicsLab() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition hover:bg-gray-50 hover:text-gray-700"
          title="Back to dashboard"
        >
          <ArrowLeft size={16} />
        </Link>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-200/60">
          <Atom size={20} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Physics Lab</h2>
          <p className="text-xs text-gray-400">Build · Simulate · Observe</p>
        </div>
      </div>

      <PhysicsWorkspace />
    </div>
  );
}
