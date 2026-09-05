import { Sliders, X, Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/soundEffects.js';

const GLASS_PRESETS = [
  { name: 'Water', n: 1.33 },
  { name: 'Crown Glass', n: 1.52 },
  { name: 'Flint Glass', n: 1.66 },
  { name: 'Diamond', n: 2.42 },
];

export default function LensSettingsPopover({ lens, onChange, onClose }) {
  if (!lens) return null;

  const isConvex = lens.type === 'convex_lens';
  const params = lens.params || {};
  const f = params.focalLength ?? 160;
  const curvature = params.curvature ?? 55;
  const n = params.refractiveIndex ?? 1.52;
  const height = params.lensHeight ?? 140;

  const updateParam = (key, val) => {
    sounds.playTick();
    onChange({
      ...lens,
      params: {
        ...params,
        [key]: val,
      },
    });
  };

  const handleCurvatureChange = (newCurv) => {
    // When curvature changes, recalculate focal length by lens maker equation:
    // f = R / (2 * (n - 1)) * visual_scale
    const newF = Math.round((newCurv / (2 * (n - 1))) * 3.2);
    sounds.playTick();
    onChange({
      ...lens,
      params: {
        ...params,
        curvature: newCurv,
        focalLength: Math.max(50, Math.min(350, newF)),
      },
    });
  };

  const handleNChange = (newN) => {
    const newF = Math.round((curvature / (2 * (newN - 1))) * 3.2);
    sounds.playTick();
    onChange({
      ...lens,
      params: {
        ...params,
        refractiveIndex: newN,
        focalLength: Math.max(50, Math.min(350, newF)),
      },
    });
  };

  return (
    <div
      className="clay-card absolute z-40 w-84 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-md border border-slate-100/80 animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: Math.min(window.innerWidth - 380, Math.max(16, lens.x + 30)),
        top: Math.min(window.innerHeight - 440, Math.max(70, lens.y - 120)),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 shadow-xs">
            <Sliders size={15} />
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              {isConvex ? 'Convex Lens Controls' : 'Concave Lens Controls'}
            </h4>
            <p className="text-[10px] text-slate-400">Snell's Law & Curvature Refraction</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          title="Close Popover"
        >
          <X size={14} />
        </button>
      </div>

      {/* Optical Schematic Badge */}
      <div className="mt-2.5 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-1.5 text-[11px]">
        <span className="text-slate-500 font-medium">Power (Diopters D):</span>
        <span className="font-mono font-bold text-cyan-700">
          {(1000 / (f * (isConvex ? 1 : -1))).toFixed(2)} D
        </span>
      </div>

      {/* Slider: Focal Length */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700">Focal Length (f):</span>
          <span className="font-mono font-bold text-cyan-600">{f} px</span>
        </div>
        <input
          type="range"
          min="60"
          max="320"
          step="5"
          value={f}
          onChange={(e) => updateParam('focalLength', parseFloat(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cyan-600"
        />
        <div className="flex justify-between text-[9px] text-slate-400">
          <span>Short (High Power)</span>
          <span>Long (Gentle)</span>
        </div>
      </div>

      {/* Slider: Curvature Radius */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700">Curvature Radius (R):</span>
          <span className="font-mono font-bold text-blue-600">{curvature} mm</span>
        </div>
        <input
          type="range"
          min="25"
          max="110"
          step="5"
          value={curvature}
          onChange={(e) => handleCurvatureChange(parseFloat(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
        />
        <div className="flex justify-between text-[9px] text-slate-400">
          <span>Curved (Thick)</span>
          <span>Flatter (Thin)</span>
        </div>
      </div>

      {/* Slider: Refractive Index */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700">Refractive Index (n):</span>
          <span className="font-mono font-bold text-indigo-600">{n.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="1.25"
          max="2.42"
          step="0.02"
          value={n}
          onChange={(e) => handleNChange(parseFloat(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600"
        />

        {/* Preset Material Pills */}
        <div className="mt-1 flex flex-wrap gap-1 pt-1">
          {GLASS_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleNChange(p.n)}
              className={`rounded-md px-2 py-0.5 text-[9px] font-semibold transition ${
                Math.abs(n - p.n) < 0.03
                  ? 'bg-cyan-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p.name} ({p.n})
            </button>
          ))}
        </div>
      </div>

      {/* Slider: Lens Aperture Height */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700">Aperture Height:</span>
          <span className="font-mono font-bold text-slate-600">{height} px</span>
        </div>
        <input
          type="range"
          min="80"
          max="220"
          step="10"
          value={height}
          onChange={(e) => updateParam('lensHeight', parseFloat(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-slate-600"
        />
      </div>

      {/* Footer Info */}
      <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Sparkles size={11} className="text-cyan-500" />
          Real-time Snell refraction
        </span>
        <button
          onClick={() => {
            sounds.playClick();
            onChange({
              ...lens,
              params: {
                focalLength: 160,
                curvature: 55,
                refractiveIndex: 1.52,
                lensHeight: 140,
              },
            });
          }}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition"
          title="Reset to default"
        >
          <RotateCcw size={10} /> Reset
        </button>
      </div>
    </div>
  );
}
