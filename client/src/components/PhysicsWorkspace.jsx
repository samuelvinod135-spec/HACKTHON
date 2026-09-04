import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Save,
  Pencil,
  Search,
  ChevronDown,
  GripVertical,
  Atom,
  TrendingUp,
  Magnet,
  Waves,
  Rocket,
  Timer,
  Box,
  Gauge,
  X,
  BookOpen,
  Maximize2,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

const DURATION_MS = 8000;
const CATEGORIES = ['Mechanics', 'Waves & Optics', 'Forces'];

const COMPONENTS = [
  { id: 'pendulum', name: 'Pendulum', category: 'Mechanics' },
  { id: 'projectile', name: 'Projectile', category: 'Mechanics' },
  { id: 'pulley', name: 'Pulley', category: 'Mechanics' },
  { id: 'ramp', name: 'Ramp', category: 'Mechanics' },
  { id: 'spring', name: 'Spring', category: 'Forces' },
  { id: 'magnet', name: 'Magnet', category: 'Forces' },
  { id: 'lens', name: 'Lens', category: 'Waves & Optics' },
  { id: 'wave', name: 'Wave Source', category: 'Waves & Optics' },
];

function ComponentIcon({ id, size = 20 }) {
  const p = { size };
  switch (id) {
    case 'pendulum': return <Timer {...p} />;
    case 'projectile': return <Rocket {...p} />;
    case 'pulley': return <Box {...p} />;
    case 'ramp': return <TrendingUp {...p} />;
    case 'spring': return <Waves {...p} />;
    case 'magnet': return <Magnet {...p} />;
    case 'lens': return <Atom {...p} />;
    case 'wave': return <Waves {...p} />;
    default: return <Atom {...p} />;
  }
}

function ComponentTone({ id }) {
  switch (id) {
    case 'pendulum': return 'from-blue-400 to-cyan-500';
    case 'projectile': return 'from-orange-400 to-red-500';
    case 'pulley': return 'from-slate-400 to-slate-600';
    case 'ramp': return 'from-violet-400 to-purple-500';
    case 'spring': return 'from-green-400 to-emerald-500';
    case 'magnet': return 'from-rose-400 to-red-500';
    case 'lens': return 'from-cyan-400 to-teal-500';
    case 'wave': return 'from-amber-400 to-orange-500';
    default: return 'from-neon-blue to-neon-cyan';
  }
}

function CanvasComponent({ id, animate, value }) {
  const angle = value || 0;
  switch (id) {
    case 'pendulum':
      return (
        <svg width="110" height="110" viewBox="0 0 110 110">
          <line x1="55" y1="0" x2={55 + Math.sin(angle) * 45} y2={10 + Math.cos(angle) * 45} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <circle cx="55" cy="5" r="4" fill="#94a3b8" />
          <circle cx={55 + Math.sin(angle) * 45} cy={10 + Math.cos(angle) * 45} r="9" fill="url(#physBob)" />
          <defs>
            <linearGradient id="physBob" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'projectile':
      return (
        <div className="relative flex items-center">
          <Rocket size={30} className={animate ? 'animate-pulse text-orange-400' : 'text-orange-400'} />
        </div>
      );
    case 'ramp':
      return (
        <svg width="90" height="60" viewBox="0 0 90 60">
          <polygon points="0,58 90,10 90,58" fill="rgba(139,92,246,0.25)" stroke="rgba(167,139,250,0.7)" strokeWidth="1.5" />
          <circle cx="34" cy="36" r="6" fill="#e2e8f0" className={animate ? 'animate-bounce' : ''} />
        </svg>
      );
    case 'magnet':
      return (
        <div className={`flex h-12 w-24 items-end gap-1 ${animate ? 'animate-pulse' : ''}`}>
          <div className="h-8 w-10 rounded-t-full bg-gradient-to-b from-red-500 to-red-700" />
          <div className="h-8 w-10 rounded-t-full bg-gradient-to-b from-slate-300 to-slate-500" />
        </div>
      );
    case 'spring':
      return (
        <svg width="70" height="70" viewBox="0 0 70 70">
          {animate && <line x1="35" y1="12" x2="35" y2="58" stroke="#22d3ee" strokeWidth="2" />}
          <path d="M10 58 Q20 50 30 58 Q40 50 50 58" fill="none" stroke="#34d399" strokeWidth="2" />
        </svg>
      );
    default:
      return <Atom size={34} className="text-neon-cyan" />;
  }
}

export default function PhysicsWorkspace() {
  const { record } = useProgress();

  const [title, setTitle] = useState('Untitled Physics Workspace');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCategory, setShowCategory] = useState(false);

  const [canvasItems, setCanvasItems] = useState([
    { id: 'pendulum', x: 50, y: 55 },
  ]);
  const [dragOver, setDragOver] = useState(false);

  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [accel, setAccel] = useState(0);
  const [angle, setAngle] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showRef, setShowRef] = useState(true);

  const rafRef = useRef(null);
  const startRef = useRef(0);
  const runId = useRef(0);

  const run = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setElapsed(0);
    startRef.current = performance.now();
    const id = ++runId.current;

    const tick = () => {
      if (runId.current !== id) return;
      const t = performance.now() - startRef.current;
      const p = Math.min(1, t / DURATION_MS);
      setElapsed(t);
      setAngle(0.6 * Math.cos(p * 2 * Math.PI * 1.2));
      setVelocity(0.6 * 2 * Math.PI * 1.2 * Math.sin(p * 2 * Math.PI * 1.2));
      setAccel(0.6 * (2 * Math.PI * 1.2) ** 2 * Math.cos(p * 2 * Math.PI * 1.2));
      if (t < DURATION_MS) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setRunning(false);
        setSaved(true);
        record({ kind: 'experiment', ref: 'Pendulum Motion', xp: 100, achievements: ['physicist'] });
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [running, record]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); runId.current++; }, []);

  const progress = Math.min(1, elapsed / DURATION_MS);

  const startTitleEdit = () => { setTitleDraft(title); setEditingTitle(true); };
  const commitTitle = () => { setTitle(titleDraft.trim() || 'Untitled Physics Workspace'); setEditingTitle(false); };

  const handleDragStart = (e, comp) => {
    e.dataTransfer.setData('application/labxplore-tool', comp.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData('application/labxplore-tool');
    const comp = COMPONENTS.find((c) => c.id === id);
    if (!comp) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(92, Math.max(8, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(92, Math.max(8, ((e.clientY - rect.top) / rect.height) * 100));
    setCanvasItems((items) => [...items.filter((i) => i.id !== comp.id), { id: comp.id, x, y }]);
  };

  const removeComponent = (e, id) => {
    e.stopPropagation();
    setCanvasItems((items) => items.filter((i) => i.id !== id));
  };

  const visibleComponents = COMPONENTS.filter(
    (c) =>
      (category === 'All' || c.category === category) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-2.5rem)] flex-col overflow-hidden rounded-2xl" data-testid="physics-workspace">
      {/* Top toolbar */}
      <div className="glass-strong flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-t-2xl px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitTitle();
                if (e.key === 'Escape') setEditingTitle(false);
              }}
              className="w-56 rounded-lg border border-neon-blue/40 bg-black/30 px-2 py-1 text-sm font-semibold text-white outline-none"
            />
          ) : (
            <button
              onClick={startTitleEdit}
              className="group flex items-center gap-2 text-sm font-semibold text-white"
              title="Edit project name"
            >
              {title}
              <Pencil size={14} className="text-slate-500 opacity-0 transition group-hover:opacity-100 hover:text-neon-blue" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 md:flex">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Gauge size={12} className="text-neon-blue" />
              <b className="text-neon-blue">{velocity.toFixed(1)} m/s</b>
            </span>
            <span className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <TrendingUp size={12} className="text-cyan-400" />
              <b className="text-cyan-300">{accel.toFixed(1)} m/s²</b>
            </span>
            <span className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Timer size={12} className="text-neon-purple" />
              <b className="font-mono text-white">{fmtTime(DURATION_MS - elapsed)}</b>
            </span>
          </div>

          <button
            onClick={() => setShowRef((s) => !s)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10"
            title="Toggle reference panel"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Reference</span>
          </button>

          <button
            onClick={run}
            disabled={running}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 text-xs font-bold text-white shadow-lg shadow-neon-blue/30 transition hover:brightness-110 disabled:opacity-50"
            data-testid="run-button"
          >
            <Play size={14} />
            {running ? 'Simulating…' : 'Start Simulation'}
          </button>

          <button
            onClick={() => setSaved(true)}
            disabled={running}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            <Save size={14} />
            Save / Export
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative flex-1 overflow-hidden transition-colors ${
            dragOver
              ? 'bg-neon-blue/10 ring-2 ring-inset ring-neon-blue/40'
              : 'bg-navy-900 ring-1 ring-inset ring-white/10'
          }`}
          data-testid="canvas"
          style={{
            backgroundImage: 'radial-gradient(rgba(59,130,246,0.16) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        >
          {canvasItems.map((item) => (
            <div
              key={item.id}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div className="group relative rounded-lg p-2 transition hover:bg-white/5">
                <button
                  onClick={(e) => removeComponent(e, item.id)}
                  className="absolute -right-1 -top-1 z-10 hidden h-5 w-5 items-center justify-center rounded-full bg-red-500/90 text-white shadow group-hover:flex"
                  title="Remove"
                >
                  <X size={12} />
                </button>
                <CanvasComponent id={item.id} animate={running} value={running ? angle : 0.6} />
              </div>
            </div>
          ))}

          {canvasItems.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-slate-600">
              <Atom size={44} />
              <p className="mt-3 text-sm">Drag physics components from the palette</p>
            </div>
          )}

          {showRef && (
            <div className="absolute bottom-3 left-3 w-64 rounded-xl border border-white/10 bg-navy-950/80 p-3 backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neon-blue">
                  Live Readings
                </p>
                <button onClick={() => setShowRef(false)} className="text-slate-500 hover:text-white">
                  <X size={12} />
                </button>
              </div>
              <div className="space-y-1.5">
                <Row label="Velocity" value={`${velocity.toFixed(1)} m/s`} color="text-neon-blue" />
                <Row label="Acceleration" value={`${accel.toFixed(1)} m/s²`} color="text-cyan-300" />
                <Row label="Timer" value={fmtTime(DURATION_MS - elapsed)} color="text-white" mono />
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-3 border-t border-white/10 pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neon-purple">
                  Key Formula
                </p>
                <p className="mt-1 text-center text-sm font-bold text-white">
                  T = 2π <span className="text-neon-blue">√(L/g)</span>
                </p>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                A pendulum's period depends on string length and gravity, not the
                mass of the bob.
              </p>
            </div>
          )}

          <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Build Canvas
          </span>
          <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-slate-600">
            <Maximize2 size={12} /> Drag components to build
          </span>
        </div>

        {/* Right palette */}
        <div className="flex w-60 shrink-0 flex-col border-l border-white/10 bg-navy-850/70 backdrop-blur-md">
          <div className="border-b border-white/10 p-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Components
            </p>
            <div className="relative">
              <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components…"
                className="w-full rounded-lg border border-white/10 bg-black/30 py-1.5 pl-8 pr-2 text-xs text-white placeholder-slate-500 outline-none focus:border-neon-blue/50"
              />
            </div>
            <div className="relative mt-2">
              <button
                onClick={() => setShowCategory((s) => !s)}
                className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10"
              >
                {category}
                <ChevronDown size={13} className={showCategory ? 'rotate-180' : ''} />
              </button>
              {showCategory && (
                <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-white/10 bg-navy-800 shadow-xl">
                  {['All', ...CATEGORIES].map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCategory(c); setShowCategory(false); }}
                      className={`block w-full px-3 py-1.5 text-left text-xs transition hover:bg-white/10 ${
                        category === c ? 'text-neon-blue' : 'text-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {visibleComponents.length === 0 ? (
              <p className="text-center text-xs text-slate-600">No components found</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {visibleComponents.map((comp) => (
                  <div
                    key={comp.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, comp)}
                    className="group flex cursor-grab flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-2.5 text-center transition hover:border-neon-blue/40 hover:bg-white/10 active:cursor-grabbing"
                  >
                    <GripVertical size={12} className="self-end text-slate-600 opacity-0 transition group-hover:opacity-100" />
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${ComponentTone({ id: comp.id })} text-white shadow`}>
                      <ComponentIcon id={comp.id} size={18} />
                    </span>
                    <span className="text-[10px] font-medium leading-tight text-slate-200">
                      {comp.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <p className="text-[10px] text-slate-500">Drag items onto the canvas to build your experiment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function fmtTime(ms) {
  const total = Math.max(0, ms);
  const s = Math.floor(total / 1000);
  const cs = Math.floor((total % 1000) / 10);
  return `${String(s).padStart(2, '0')}:${String(cs).padStart(2, '0')}`;
}

function Row({ label, value, color, mono }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1 text-[11px]">
      <span className="text-slate-400">{label}</span>
      <span className={`font-bold ${color} ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}
