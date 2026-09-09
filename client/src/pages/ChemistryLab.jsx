import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  FlaskConical,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import ChemistryHub from '../components/chemistry/ChemistryHub.jsx';
import StealthScaffoldingOverlay from '../components/StealthScaffolding/StealthScaffoldingOverlay.jsx';
import { useTelemetry } from '../hooks/useTelemetry.js';

export default function ChemistryLab({ initialTab = 'dashboard' }) {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const activeTab = tabFromUrl || initialTab || 'dashboard';

  // Pervasive non-blocking student telemetry ingestion for Chemistry Bench
  useTelemetry('Stoichiometry', 'Reagents & Reaction Bench');

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4">
      {/* Top Header Navigation Bar */}
      <div className="flex items-center justify-between gap-3 rounded-3xl border border-sky-100 bg-white p-3.5 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-700 shadow-xs transition hover:bg-sky-100 active:scale-95 cursor-pointer"
            title="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-500 text-white shadow-md shadow-sky-500/20">
            <FlaskConical size={20} />
          </span>
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{t('chemistry.title', 'Chemistry Virtual Laboratory & Reaction Studio')}</span>
              <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-slate-900 shadow-xs">
                10,000+ Reactions
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              {t('chemistry.subtitle', 'Explore 10,977+ reactions, 107 CBSE practicals, 18+ lab apparatus, and named reaction mechanisms')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
          >
            <span>Exit to Portal</span>
          </Link>
        </div>
      </div>

      {/* Autonomous Stealth Scaffolding HUD for Stoichiometry & Reactions */}
      <StealthScaffoldingOverlay currentTopic="Stoichiometry" />

      {/* Unified Master Chemistry Hub */}
      <ChemistryHub initialTab={activeTab === 'drag-and-drop' ? 'workspace' : activeTab} />
    </div>
  );
}
