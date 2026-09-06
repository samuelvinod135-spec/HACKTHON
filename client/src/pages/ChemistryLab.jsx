import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import ChemistryWorkspace from '../components/ChemistryWorkspace.jsx';

export default function ChemistryLab() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4">
      {/* Clay UI Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 shadow-xs transition hover:bg-sky-100 active:scale-95"
            title="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-500 text-white shadow-md shadow-sky-500/20">
            <FlaskConical size={22} />
          </span>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Chemistry Gamified Studio</span>
              <span className="rounded-full bg-yellow-300/80 px-2 py-0.5 text-[10px] font-black text-slate-900 uppercase">
                118 Anime Champions · 2,209 Reactions
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Interactive Glassware · Bunsen Fire Controls · Diazonium & Benzene · Haloalkanes · Aldehydes & Ketones
            </p>
          </div>
        </div>
      </div>

      <ChemistryWorkspace />
    </div>
  );
}
