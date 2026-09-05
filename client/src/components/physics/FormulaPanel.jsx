import { BookOpen, X, Sparkles, Lightbulb } from 'lucide-react';
import { PHYSICS_COMPONENTS } from '../../physicsData.js';

export default function FormulaPanel({ activeType, customFormula, onClose }) {
  const componentDef = PHYSICS_COMPONENTS.find(
    (c) => c.type === activeType || c.id === activeType
  );
  const formula = customFormula || componentDef?.formula || {
    name: "Snell's Law & Lens Maker",
    equation: "n₁ sin(θ₁) = n₂ sin(θ₂) | 1/f = (n - 1)(1/R₁ - 1/R₂)",
    desc: "Light changes direction when crossing boundaries of differing refractive indices.",
  };

  return (
    <div className="clay-card pointer-events-auto w-72 rounded-2xl bg-white/95 p-3.5 shadow-xl backdrop-blur-md border border-slate-100/90 transition-all">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
            <BookOpen size={13} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Key Formula</p>
            <p className="text-[9px] text-slate-400 font-medium">Theoretical foundation</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Formula Title */}
      <p className="text-xs font-bold text-slate-800">{formula.name}</p>

      {/* Formula Display Box */}
      <div className="my-2.5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50/50 p-2.5 text-center border border-sky-100/80 shadow-inner">
        <p className="font-mono text-sm font-black text-slate-900 tracking-wide">
          {formula.equation}
        </p>
      </div>

      {/* Educational Note */}
      <div className="flex items-start gap-1.5 text-[10px] leading-relaxed text-slate-500">
        <Lightbulb size={13} className="shrink-0 text-amber-500 mt-0.5" />
        <p>{formula.desc}</p>
      </div>
    </div>
  );
}
