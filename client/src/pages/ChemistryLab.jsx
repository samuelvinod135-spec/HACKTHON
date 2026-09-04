import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import ChemistryWorkspace from '../components/ChemistryWorkspace.jsx';

export default function ChemistryLab() {
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
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600 border border-sky-200/60">
          <FlaskConical size={20} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Chemistry Lab</h2>
          <p className="text-xs text-slate-400">Reactions · Stoichiometry · Molecular Synthesis</p>
        </div>
      </div>

      <ChemistryWorkspace />
    </div>
  );
}
