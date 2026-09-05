import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Save,
  Pencil,
  RotateCcw,
  Sliders,
  Sparkles,
  BookOpen,
  Activity,
  Layers,
  ChevronRight,
  Maximize2,
  Share2,
  Check,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import PhysicsCanvas from './physics/PhysicsCanvas.jsx';
import PhysicsPalette from './physics/PhysicsPalette.jsx';
import EnvironmentControls from './physics/EnvironmentControls.jsx';
import LensSettingsPopover from './physics/LensSettingsPopover.jsx';
import ComponentInspector from './physics/ComponentInspector.jsx';
import LiveReadingsPanel from './physics/LiveReadingsPanel.jsx';
import FormulaPanel from './physics/FormulaPanel.jsx';
import PresetsModal from './physics/PresetsModal.jsx';
import { PRESET_EXPERIMENTS, PHYSICS_COMPONENTS } from '../physicsData.js';
import { sounds } from '../utils/soundEffects.js';

export default function PhysicsWorkspace() {
  const { record } = useProgress();

  // Project title
  const [title, setTitle] = useState('Ray Optics & Focal Refraction Lab');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const [savedToast, setSavedToast] = useState(false);

  // Environment Settings
  const [env, setEnv] = useState({
    gravity: 9.81,
    gravityName: 'Earth (9.8 m/s²)',
    airResistance: false,
    snapToGrid: true,
  });

  // Simulation clock state
  const [running, setRunning] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);

  // Canvas Components - default with high-priority Ray Optics setup
  const [components, setComponents] = useState(() => {
    const defaultPreset = PRESET_EXPERIMENTS[0]; // Convex Lens Focal Convergence
    return defaultPreset.components.map((c, idx) => ({
      ...c,
      id: `${c.type}-${idx + 1}`,
    }));
  });

  // Selected item
  const [selectedId, setSelectedId] = useState('lens-1');
  const [lensPopoverOpen, setLensPopoverOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [presetsModalOpen, setPresetsModalOpen] = useState(false);

  // Panels visibility
  const [showLiveReadings, setShowLiveReadings] = useState(true);
  const [showFormula, setShowFormula] = useState(true);

  // Telemetry stream
  const [telemetry, setTelemetry] = useState({
    velocity: 0,
    accel: 0,
    Ek: 0,
    Ep: 0,
    incidentAngleDeg: 0,
    refractedAngleDeg: 0,
    focalDistancePx: 170,
    criticalAngleDeg: 41,
    activeRayCount: 5,
  });

  // Simulation timer loop
  const rafRef = useRef(null);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const tick = (now) => {
      if (running) {
        const delta = now - lastTimeRef.current;
        setElapsedMs((prev) => prev + delta);
      }
      lastTimeRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  // Selected component reference
  const selectedComp = components.find((c) => c.id === selectedId);

  // Check if active workspace is predominantly optics
  const isOpticsMode =
    components.some((c) => c.type === 'laser' || c.type === 'convex_lens' || c.type === 'concave_lens' || c.type === 'prism') ||
    selectedComp?.type === 'convex_lens' ||
    selectedComp?.type === 'concave_lens' ||
    selectedComp?.type === 'laser';

  // Component Management
  const handleDropNewComponent = useCallback((compDef, x, y) => {
    const newId = `${compDef.type}-${Date.now()}`;
    const newComp = {
      id: newId,
      type: compDef.type,
      x,
      y,
      rotation: 0,
      params: { ...compDef.defaultParams },
    };

    setComponents((prev) => [...prev, newComp]);
    setSelectedId(newId);

    if (newComp.type === 'convex_lens' || newComp.type === 'concave_lens') {
      setLensPopoverOpen(true);
    }

    record({
      kind: 'experiment',
      ref: `Added ${compDef.name}`,
      xp: 25,
      achievements: ['tinkerer'],
    });
  }, [record]);

  const handleUpdateComponent = useCallback((updated) => {
    setComponents((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }, []);

  const handleDeleteComponent = useCallback((id) => {
    sounds.playClick();
    setComponents((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setLensPopoverOpen(false);
      setInspectorOpen(false);
    }
  }, [selectedId]);

  const handleDuplicateComponent = useCallback((comp) => {
    sounds.playSnap();
    const dup = {
      ...comp,
      id: `${comp.type}-${Date.now()}`,
      x: comp.x + 30,
      y: comp.y + 30,
    };
    setComponents((prev) => [...prev, dup]);
    setSelectedId(dup.id);
  }, []);

  const handleSelectPreset = useCallback((preset) => {
    setComponents(
      preset.components.map((c, i) => ({
        ...c,
        id: `${c.type}-${Date.now()}-${i}`,
      }))
    );
    setTitle(preset.title);
    setElapsedMs(0);
    setRunning(true);
    setSelectedId(null);
    setLensPopoverOpen(false);

    record({
      kind: 'experiment',
      ref: preset.title,
      xp: 50,
      achievements: ['explorer'],
    });
  }, [record]);

  const handleReset = () => {
    setElapsedMs(0);
    setRunning(false);
  };

  const handleSaveWorkspace = () => {
    sounds.playSimStart();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
    record({
      kind: 'experiment',
      ref: `Saved ${title}`,
      xp: 40,
    });
  };

  return (
    <div
      className="clay-card relative flex h-[calc(100vh-8.5rem)] min-h-[580px] flex-col overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-xl"
      data-testid="physics-workspace"
    >
      {/* ================= TOP TOOLBAR ================= */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-100/90 bg-white/80 px-5 py-3 backdrop-blur-md">
        {/* Left: Editable Title & Status */}
        <div className="flex items-center gap-3">
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => {
                setTitle(titleDraft.trim() || 'Untitled Physics Lab');
                setEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setTitle(titleDraft.trim() || 'Untitled Physics Lab');
                  setEditingTitle(false);
                }
                if (e.key === 'Escape') setEditingTitle(false);
              }}
              className="w-64 rounded-xl border border-teal-400 bg-teal-50/50 px-3 py-1 text-sm font-bold text-slate-900 outline-none"
            />
          ) : (
            <button
              onClick={() => {
                setTitleDraft(title);
                setEditingTitle(true);
              }}
              className="group flex items-center gap-2 text-sm font-extrabold text-slate-900 hover:text-teal-700 transition"
              title="Click to rename experiment"
            >
              <span>{title}</span>
              <Pencil
                size={13}
                className="text-slate-300 opacity-0 transition group-hover:opacity-100 group-hover:text-teal-600"
              />
            </button>
          )}

          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500">
            {components.length} components
          </span>
        </div>

        {/* Right: Environment Controls & Actions */}
        <div className="flex items-center gap-2">
          {/* Environment Controls: Gravity, Air Resistance, Snap, Play/Pause */}
          <EnvironmentControls
            env={env}
            onEnvChange={setEnv}
            running={running}
            onTogglePlay={() => setRunning((r) => !r)}
            onReset={handleReset}
            onOpenPresets={() => setPresetsModalOpen(true)}
          />

          {/* Overlays toggle buttons */}
          <button
            onClick={() => setShowLiveReadings((s) => !s)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold shadow-xs transition ${
              showLiveReadings
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold'
                : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
            title="Toggle Live Readings Telemetry"
          >
            <Activity size={13} className={showLiveReadings ? 'text-emerald-600' : 'text-slate-400'} />
            <span className="hidden sm:inline">Telemetry</span>
          </button>

          <button
            onClick={() => setShowFormula((s) => !s)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold shadow-xs transition ${
              showFormula
                ? 'bg-sky-50 border border-sky-200 text-sky-700 font-bold'
                : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
            title="Toggle Key Formula Card"
          >
            <BookOpen size={13} className={showFormula ? 'text-sky-600' : 'text-slate-400'} />
            <span className="hidden sm:inline">Formula</span>
          </button>

          {/* Save / Export */}
          <button
            onClick={handleSaveWorkspace}
            className="clay-card flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
            title="Save experiment setup"
          >
            {savedToast ? <Check size={14} className="text-emerald-600" /> : <Save size={14} />}
            <span className="hidden sm:inline">{savedToast ? 'Saved!' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* ================= MAIN WORKSPACE BODY ================= */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* CENTER: Canvas Engine */}
        <div className="relative flex-1 overflow-hidden bg-white">
          <PhysicsCanvas
            components={components}
            selectedId={selectedId}
            onSelectComponent={(id) => {
              setSelectedId(id);
              const comp = components.find((c) => c.id === id);
              if (!comp || (comp.type !== 'convex_lens' && comp.type !== 'concave_lens')) {
                setLensPopoverOpen(false);
              }
            }}
            onUpdateComponent={handleUpdateComponent}
            onDeleteComponent={handleDeleteComponent}
            onDuplicateComponent={handleDuplicateComponent}
            onOpenLensSettings={(lens) => {
              setSelectedId(lens.id);
              setLensPopoverOpen(true);
            }}
            onDropNewComponent={handleDropNewComponent}
            env={env}
            running={running}
            elapsedMs={elapsedMs}
            onTelemetryUpdate={setTelemetry}
          />

          {/* Bottom Left Overlays: Live Readings & Key Formula */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex flex-col gap-3">
            {showLiveReadings && (
              <LiveReadingsPanel
                telemetry={telemetry}
                isOpticsMode={isOpticsMode}
                elapsedMs={elapsedMs}
                running={running}
                onClose={() => setShowLiveReadings(false)}
              />
            )}

            {showFormula && (
              <FormulaPanel
                activeType={selectedComp?.type || (isOpticsMode ? 'convex_lens' : 'pendulum')}
                onClose={() => setShowFormula(false)}
              />
            )}
          </div>

          {/* Floating Lens Settings Popover (When a Lens is Selected) */}
          {lensPopoverOpen && selectedComp && (selectedComp.type === 'convex_lens' || selectedComp.type === 'concave_lens') && (
            <LensSettingsPopover
              lens={selectedComp}
              onChange={handleUpdateComponent}
              onClose={() => setLensPopoverOpen(false)}
            />
          )}

          {/* Floating Component Inspector (Non-lens or when opened) */}
          {inspectorOpen && selectedComp && selectedComp.type !== 'convex_lens' && selectedComp.type !== 'concave_lens' && (
            <ComponentInspector
              component={selectedComp}
              onChange={handleUpdateComponent}
              onDelete={() => handleDeleteComponent(selectedComp.id)}
              onDuplicate={() => handleDuplicateComponent(selectedComp)}
              onClose={() => setInspectorOpen(false)}
            />
          )}

          {/* Canvas Watermark / Hint */}
          <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 bg-white/70 px-3 py-1 rounded-full backdrop-blur-xs border border-slate-100 shadow-xs">
            <Maximize2 size={12} />
            <span>Interactive Ray & Dynamics Canvas</span>
          </div>
        </div>

        {/* RIGHT: Searchable Component Palette */}
        <PhysicsPalette
          onSelectComponent={(comp) => {
            // Clicking a component in palette auto-adds it near the center
            handleDropNewComponent(comp, 450, 320);
          }}
        />
      </div>

      {/* Experiment Presets Modal */}
      <PresetsModal
        isOpen={presetsModalOpen}
        onClose={() => setPresetsModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}
