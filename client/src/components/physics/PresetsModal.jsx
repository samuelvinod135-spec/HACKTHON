import { X, Sparkles, ArrowRight } from 'lucide-react';
import { PRESET_EXPERIMENTS } from '../../physicsData.js';
import { sounds } from '../../utils/soundEffects.js';

export default function PresetsModal({ isOpen, onClose, onSelectPreset }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="clay-card relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-md">
              <Sparkles size={20} />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Physics Experiment Presets
              </h3>
              <p className="text-xs text-slate-400">
                Load ready-to-run optical and mechanical laboratory setups
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Preset Cards Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto p-1">
          {PRESET_EXPERIMENTS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                sounds.playSimStart();
                onSelectPreset(preset);
                onClose();
              }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-left shadow-xs transition hover:border-teal-300 hover:bg-white hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    {preset.category}
                  </span>
                  {preset.badge && (
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                      {preset.badge}
                    </span>
                  )}
                </div>
                <h4 className="mt-2 text-xs font-bold text-slate-900 group-hover:text-teal-700 transition">
                  {preset.title}
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                  {preset.desc}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100/80 pt-2 text-[11px] font-semibold text-teal-600">
                <span>Load Experiment</span>
                <ArrowRight size={13} className="transition group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
