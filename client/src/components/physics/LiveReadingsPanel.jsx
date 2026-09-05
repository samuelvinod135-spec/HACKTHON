import { Activity, Gauge, TrendingUp, Timer, Sparkles, Compass, Zap, X } from 'lucide-react';

export default function LiveReadingsPanel({ telemetry, isOpticsMode, elapsedMs, running, onClose }) {
  const {
    velocity = 0,
    accel = 0,
    Ek = 0,
    Ep = 0,
    incidentAngleDeg = 0,
    refractedAngleDeg = 0,
    focalDistancePx = 0,
    criticalAngleDeg = 0,
    activeRayCount = 0,
  } = telemetry || {};

  return (
    <div className="clay-card pointer-events-auto w-72 rounded-2xl bg-white/95 p-3.5 shadow-xl backdrop-blur-md border border-slate-100/90 transition-all">
      {/* Header */}
      <div className="mb-2.5 flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <Activity size={13} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Live Readings</p>
            <p className="text-[9px] text-slate-400 font-medium">Real-time telemetry stream</p>
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

      {/* Metrics List */}
      <div className="space-y-1.5">
        {/* Stopwatch Timer */}
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Timer size={13} className="text-slate-400" />
            <span>Sim Timer</span>
          </span>
          <span className="font-mono font-bold text-slate-800">{fmtTime(elapsedMs)}</span>
        </div>

        {/* Ray Optics Specific Telemetry */}
        {isOpticsMode ? (
          <>
            <div className="flex items-center justify-between rounded-xl bg-cyan-50/70 px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-cyan-800">
                <Sparkles size={13} className="text-cyan-600" />
                <span>Active Rays</span>
              </span>
              <span className="font-mono font-bold text-cyan-700">{activeRayCount}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Compass size={13} className="text-blue-500" />
                <span>Incident θ₁</span>
              </span>
              <span className="font-mono font-bold text-blue-600">{incidentAngleDeg}°</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Compass size={13} className="text-teal-500" />
                <span>Refracted θ₂</span>
              </span>
              <span className="font-mono font-bold text-teal-600">{refractedAngleDeg}°</span>
            </div>

            {focalDistancePx > 0 && (
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
                <span className="text-slate-500">Focal Length (f)</span>
                <span className="font-mono font-bold text-indigo-600">{focalDistancePx} px</span>
              </div>
            )}

            {criticalAngleDeg > 0 && (
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
                <span className="text-slate-500">Critical Angle (θc)</span>
                <span className="font-mono font-bold text-amber-600">{criticalAngleDeg}°</span>
              </div>
            )}
          </>
        ) : (
          /* Mechanics Telemetry */
          <>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Gauge size={13} className="text-emerald-500" />
                <span>Velocity</span>
              </span>
              <span className="font-mono font-bold text-emerald-600">{velocity.toFixed(2)} m/s</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <TrendingUp size={13} className="text-teal-500" />
                <span>Acceleration</span>
              </span>
              <span className="font-mono font-bold text-teal-600">{accel.toFixed(2)} m/s²</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Zap size={13} className="text-amber-500" />
                <span>Kinetic Energy</span>
              </span>
              <span className="font-mono font-bold text-amber-600">{Ek.toFixed(2)} J</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Zap size={13} className="text-sky-500" />
                <span>Potential Energy</span>
              </span>
              <span className="font-mono font-bold text-sky-600">{Ep.toFixed(2)} J</span>
            </div>
          </>
        )}
      </div>

      {/* Energy / Activity Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-[9px] text-slate-400 font-semibold mb-1">
          <span>Simulation Stream</span>
          <span className={running ? 'text-emerald-500 font-bold animate-pulse' : 'text-slate-400'}>
            {running ? '● Active' : '○ Standby'}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 transition-all duration-300"
            style={{ width: running ? '100%' : '20%' }}
          />
        </div>
      </div>
    </div>
  );
}

function fmtTime(ms) {
  const total = Math.max(0, ms || 0);
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const cs = Math.floor((total % 1000) / 10);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}
