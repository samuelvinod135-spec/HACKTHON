import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import ChemistryWorkspace from '../components/ChemistryWorkspace.jsx';

export default function ChemistryLab() {
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
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md shadow-blue-200/60">
          <FlaskConical size={20} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chemistry Lab</h2>
          <p className="text-xs text-gray-400">Build · Simulate · Observe</p>
        </div>
      </div>

      <ChemistryWorkspace />
    </div>
  );
}
