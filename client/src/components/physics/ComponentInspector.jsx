import { X, Sliders, Trash2, Copy, RotateCw } from 'lucide-react';
import { PHYSICS_COMPONENTS } from '../../physicsData.js';
import { sounds } from '../../utils/soundEffects.js';

export default function ComponentInspector({ component, onChange, onDelete, onDuplicate, onClose }) {
  if (!component) return null;

  const def = PHYSICS_COMPONENTS.find((c) => c.type === component.type || c.id === component.type);
  const schemas = def?.paramSchema || [];
  const params = component.params || {};

  const handleParamChange = (id, val) => {
    sounds.playTick();
    onChange({
      ...component,
      params: {
        ...params,
        [id]: val,
      },
    });
  };

  const handleRotate = () => {
    sounds.playClick();
    const newRot = ((component.rotation || 0) + 15) % 360;
    onChange({
      ...component,
      rotation: newRot,
    });
  };

  return (
    <div
      className="clay-card absolute right-4 top-20 z-30 w-76 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-slate-100/90"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-700 shadow-xs">
            <Sliders size={15} />
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-800">{def?.name || component.type}</h4>
            <span className="text-[10px] text-slate-400 font-medium">{def?.category || 'Component'}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X size={14} />
        </button>
      </div>

      {/* Rotation control */}
      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs">
        <span className="font-semibold text-slate-600">Orientation:</span>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-800">{component.rotation || 0}°</span>
          <button
            onClick={handleRotate}
            className="flex h-6 w-6 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 shadow-xs hover:bg-slate-50"
            title="Rotate +15°"
          >
            <RotateCw size={12} />
          </button>
        </div>
      </div>

      {/* Parameters */}
      <div className="mt-3 space-y-3 max-h-64 overflow-y-auto pr-1">
        {schemas.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-3">No tweakable parameters</p>
        ) : (
          schemas.map((s) => {
            const val = params[s.id] ?? s.min;

            if (s.type === 'select') {
              return (
                <div key={s.id} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                    <span>{s.label}</span>
                  </div>
                  <select
                    value={val}
                    onChange={(e) => handleParamChange(s.id, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-teal-500"
                  >
                    {s.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={s.id} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">{s.label}</span>
                  <span className="font-mono font-bold text-teal-700">
                    {typeof val === 'number' ? val.toFixed(s.step < 1 ? 2 : 0) : val} {s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={val}
                  onChange={(e) => handleParamChange(s.id, parseFloat(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-teal-600"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <button
          onClick={onDuplicate}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
        >
          <Copy size={12} /> Duplicate
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 rounded-xl bg-red-50 border border-red-200/60 px-2.5 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-100 transition"
        >
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
}
