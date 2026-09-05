import { useState, useRef, useEffect, useCallback } from 'react';
import {
  RotateCw,
  Trash2,
  Sliders,
  Copy,
  Plus,
  Atom,
  Maximize2,
  Eye,
} from 'lucide-react';
import { traceRays } from '../../utils/opticsEngine.js';
import {
  updatePendulum,
  calculateProjectileTrajectory,
  updateSpring,
  calculateRampPhysics,
} from '../../utils/mechanicsEngine.js';
import { sounds } from '../../utils/soundEffects.js';

export default function PhysicsCanvas({
  components,
  selectedId,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  onDuplicateComponent,
  onOpenLensSettings,
  onDropNewComponent,
  env,
  running,
  elapsedMs,
  onTelemetryUpdate,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Dragging state on canvas
  const [draggingCompId, setDraggingCompId] = useState(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [rotatingCompId, setRotatingCompId] = useState(null);
  const [dragOverCanvas, setDragOverCanvas] = useState(false);

  // Animation frame & particles
  const photonOffsetRef = useRef(0);
  const pendulumStateRef = useRef({ theta: 0.6, omega: 0 });
  const springStateRef = useRef({ displacement: 40, velocity: 0 });
  const lastTimeRef = useRef(performance.now());

  // Grid snap helper
  const snap = useCallback(
    (val) => (env.snapToGrid ? Math.round(val / 20) * 20 : val),
    [env.snapToGrid]
  );

  // Handle Drag Over from Palette
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!dragOverCanvas) setDragOverCanvas(true);
  };

  const handleDragLeave = () => {
    setDragOverCanvas(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOverCanvas(false);
    try {
      const data = e.dataTransfer.getData('application/labxplore-physics-comp');
      if (!data) return;
      const compDef = JSON.parse(data);
      const rect = canvasRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      const newX = snap(Math.max(50, Math.min(rect.width - 50, rawX)));
      const newY = snap(Math.max(50, Math.min(rect.height - 50, rawY)));

      sounds.playSnap();
      onDropNewComponent(compDef, newX, newY);
    } catch (_) {}
  };

  // Canvas Mouse Down: Check component selection or rotation handle
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if clicked near rotation handle of selected component
    const selectedComp = components.find((c) => c.id === selectedId);
    if (selectedComp) {
      const rotHandleY = selectedComp.y - 48;
      const distToRot = Math.hypot(clickX - selectedComp.x, clickY - rotHandleY);
      if (distToRot < 14) {
        setRotatingCompId(selectedComp.id);
        sounds.playClick();
        return;
      }
    }

    // Check hit on components (top-most first)
    for (let i = components.length - 1; i >= 0; i--) {
      const c = components[i];
      const dist = Math.hypot(clickX - c.x, clickY - c.y);
      const hitRadius = getComponentHitRadius(c);

      if (dist <= hitRadius) {
        sounds.playClick();
        onSelectComponent(c.id);
        setDraggingCompId(c.id);
        dragOffsetRef.current = { x: clickX - c.x, y: clickY - c.y };

        // If clicking lens, trigger lens settings
        if (c.type === 'convex_lens' || c.type === 'concave_lens') {
          onOpenLensSettings(c);
        }
        return;
      }
    }

    // Clicked empty canvas
    onSelectComponent(null);
  };

  // Mouse Move: Drag or Rotate component
  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    if (rotatingCompId) {
      const comp = components.find((c) => c.id === rotatingCompId);
      if (!comp) return;
      const angleRad = Math.atan2(curY - comp.y, curX - comp.x) + Math.PI / 2;
      let angleDeg = Math.round((angleRad * 180) / Math.PI);
      if (env.snapToGrid) {
        angleDeg = Math.round(angleDeg / 15) * 15;
      }
      onUpdateComponent({ ...comp, rotation: (angleDeg + 360) % 360 });
      return;
    }

    if (draggingCompId) {
      const comp = components.find((c) => c.id === draggingCompId);
      if (!comp) return;
      const rawX = curX - dragOffsetRef.current.x;
      const rawY = curY - dragOffsetRef.current.y;
      const newX = snap(Math.max(40, Math.min(rect.width - 40, rawX)));
      const newY = snap(Math.max(40, Math.min(rect.height - 40, rawY)));

      if (newX !== comp.x || newY !== comp.y) {
        onUpdateComponent({ ...comp, x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    if (draggingCompId) {
      sounds.playSnap();
      setDraggingCompId(null);
    }
    if (rotatingCompId) {
      sounds.playClick();
      setRotatingCompId(null);
    }
  };

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = (timeNow) => {
      const dtSec = Math.min(0.05, (timeNow - lastTimeRef.current) / 1000);
      lastTimeRef.current = timeNow;

      // Handle retina high-DPI scaling
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Clear background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw 20px engineering grid
      drawGrid(ctx, width, height, env.snapToGrid);

      // 3. Update photon particle offset
      photonOffsetRef.current = (photonOffsetRef.current + 2) % 40;

      // 4. Trace optics rays
      const { rays, telemetry: opticsTelemetry } = traceRays(components, { width, height });

      // 5. Update mechanics if simulation is running
      let mechanicsTelemetry = {};
      const pendulumComp = components.find((c) => c.type === 'pendulum');
      if (pendulumComp) {
        if (running) {
          const res = updatePendulum(
            {
              ...pendulumStateRef.current,
              length: pendulumComp.params?.length ?? 180,
              mass: pendulumComp.params?.mass ?? 1.2,
            },
            dtSec,
            env
          );
          pendulumStateRef.current = res;
          mechanicsTelemetry = res;
        } else {
          mechanicsTelemetry = {
            velocity: 0,
            accel: 0,
            Ek: 0,
            Ep: 0,
          };
        }
      }

      // Check if projectile launcher is present
      const projComp = components.find((c) => c.type === 'projectile');
      if (projComp) {
        const traj = calculateProjectileTrajectory(projComp, env);
        drawProjectileTrajectory(ctx, traj, running, elapsedMs);
      }

      // Check if ramp is present
      const rampComp = components.find((c) => c.type === 'ramp');
      if (rampComp) {
        const rampData = calculateRampPhysics(rampComp, env);
        mechanicsTelemetry = {
          ...mechanicsTelemetry,
          accel: rampData.accel,
        };
      }

      // Send telemetry updates
      if (onTelemetryUpdate) {
        onTelemetryUpdate({
          ...opticsTelemetry,
          ...mechanicsTelemetry,
        });
      }

      // 6. Render Optical Light Rays (with neon glow & photon particles)
      drawOpticalRays(ctx, rays, photonOffsetRef.current);

      // 7. Render all physical components on the canvas
      components.forEach((comp) => {
        drawComponent(ctx, comp, comp.id === selectedId, pendulumStateRef.current, running, elapsedMs);
      });

      // 8. Render selection ring & rotate handle for active item
      const selectedComp = components.find((c) => c.id === selectedId);
      if (selectedComp) {
        drawSelectionOverlay(ctx, selectedComp);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [components, selectedId, env, running, elapsedMs, onTelemetryUpdate]);

  const selectedComp = components.find((c) => c.id === selectedId);

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative h-full w-full select-none overflow-hidden transition-all duration-200 ${
        dragOverCanvas
          ? 'bg-teal-50/50 ring-4 ring-inset ring-teal-400'
          : 'bg-white'
      }`}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="h-full w-full cursor-crosshair"
      />

      {/* Empty Canvas Placeholder */}
      {components.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-slate-300">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 border border-slate-200 text-slate-400 shadow-inner">
            <Atom size={34} />
          </div>
          <p className="mt-3 text-sm font-bold text-slate-600">Build Canvas is Empty</p>
          <p className="text-xs text-slate-400">
            Drag components from the right palette or click <b>Experiments</b> for presets
          </p>
        </div>
      )}

      {/* Floating Action Bar above Selected Component */}
      {selectedComp && !draggingCompId && !rotatingCompId && (
        <div
          className="clay-card pointer-events-auto absolute flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow-lg border border-slate-100/90 -translate-x-1/2 -translate-y-full mb-12 animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: Math.max(70, Math.min(window.innerWidth - 320, selectedComp.x)),
            top: Math.max(50, selectedComp.y - 35),
          }}
        >
          {(selectedComp.type === 'convex_lens' || selectedComp.type === 'concave_lens') && (
            <button
              onClick={() => onOpenLensSettings(selectedComp)}
              className="flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700 hover:bg-cyan-100 transition"
              title="Adjust Lens Curvature & Focal Length"
            >
              <Sliders size={12} /> Lens Controls
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onUpdateComponent({
                ...selectedComp,
                rotation: ((selectedComp.rotation || 0) + 15) % 360,
              });
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition"
            title="Rotate +15°"
          >
            <RotateCw size={12} />
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onDuplicateComponent(selectedComp);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition"
            title="Duplicate Component"
          >
            <Copy size={12} />
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onDeleteComponent(selectedComp.id);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition"
            title="Delete Component"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

// ===================== CANVAS RENDERING UTILS =====================

function drawGrid(ctx, width, height, snapToGrid) {
  const step = 20;
  ctx.save();
  ctx.strokeStyle = snapToGrid ? 'rgba(203, 213, 225, 0.4)' : 'rgba(226, 232, 240, 0.25)';
  ctx.lineWidth = 0.6;

  for (let x = 0; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw coordinate axis accent
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, height);
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.stroke();

  ctx.restore();
}

/**
 * High-performance Optical Ray Renderer with Neon Glow & Animated Photons
 */
function drawOpticalRays(ctx, rays, photonOffset) {
  if (!rays || rays.length === 0) return;

  rays.forEach((ray) => {
    const pts = ray.points;
    if (pts.length < 2) return;

    ctx.save();

    // 1. Outer Translucent Glow Aura
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = ray.color;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 6;
    ctx.shadowColor = ray.color;
    ctx.shadowBlur = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 2. Focused Bright Core
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = ray.color === '#ffffff' ? '#ffffff' : ray.color;
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = 2.0;
    ctx.shadowBlur = 4;
    ctx.stroke();

    // 3. Inner White Hot Centerline
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = '#ffffff';
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // 4. Photon particle dots streaming along each ray segment
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const segLen = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (segLen <= 0) continue;

      const spacing = 36;
      const numPhotons = Math.floor(segLen / spacing);
      for (let j = 0; j < numPhotons; j++) {
        const dist = (j * spacing + photonOffset) % segLen;
        const frac = dist / segLen;
        const px = p1.x + (p2.x - p1.x) * frac;
        const py = p1.y + (p2.y - p1.y) * frac;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  });
}

/**
 * Ballistic Projectile Parabolic Trajectory renderer
 */
function drawProjectileTrajectory(ctx, traj, running, elapsedMs) {
  if (!traj || !traj.points || traj.points.length < 2) return;
  const pts = traj.points;

  ctx.save();
  // Dashed parabolic trajectory
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = 'rgba(249, 115, 22, 0.6)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Vertex indicator
  const vertex = pts[Math.floor(pts.length / 2)];
  if (vertex) {
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '9px monospace';
    ctx.fillStyle = '#c2410c';
    ctx.fillText(`H_max: ${traj.maxHeight.toFixed(1)}m`, vertex.x + 8, vertex.y - 4);
  }

  // End impact range
  const endPt = pts[pts.length - 1];
  if (endPt) {
    ctx.font = '9px monospace';
    ctx.fillStyle = '#c2410c';
    ctx.fillText(`Range: ${traj.maxRange.toFixed(1)}m`, endPt.x - 30, endPt.y + 16);
  }

  ctx.restore();
}

/**
 * Draw component on canvas
 */
function drawComponent(ctx, comp, isSelected, pendulumState, running, elapsedMs) {
  ctx.save();
  ctx.translate(comp.x, comp.y);
  ctx.rotate(((comp.rotation || 0) * Math.PI) / 180);

  switch (comp.type) {
    case 'laser':
      drawLaserSource(ctx, comp);
      break;
    case 'convex_lens':
      drawConvexLens(ctx, comp);
      break;
    case 'concave_lens':
      drawConcaveLens(ctx, comp);
      break;
    case 'prism':
      drawPrism(ctx, comp);
      break;
    case 'mirror':
      drawPlaneMirror(ctx, comp);
      break;
    case 'pendulum':
      drawPendulum(ctx, comp, pendulumState);
      break;
    case 'projectile':
      drawProjectileLauncher(ctx, comp);
      break;
    case 'ramp':
      drawRamp(ctx, comp);
      break;
    case 'spring':
      drawSpringMass(ctx, comp, running, elapsedMs);
      break;
    default:
      drawGenericComponent(ctx, comp);
      break;
  }

  ctx.restore();
}

// 1. Laser Ray Box
function drawLaserSource(ctx, comp) {
  const count = comp.params?.beamCount ?? 5;
  const wl = comp.params?.wavelength || 'green';
  const color = wl === 'red' ? '#ef4444' : wl === 'blue' ? '#3b82f6' : wl === 'white' ? '#f8fafc' : '#10b981';

  // Laser Body Casing (Clay Industrial block)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(-45, -28, 70, 56, 12);
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Emitter Brass Aperture Ring
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.roundRect(25, -18, 14, 36, [0, 6, 6, 0]);
  ctx.fill();

  // Active glowing indicator LED
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(-24, 0, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Label
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('LASER', -12, -4);
  ctx.font = '8px monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText(`${count} RAYS`, -12, 10);
}

// 2. Convex Lens with Optical Axis and Focal Points F1, F2
function drawConvexLens(ctx, comp) {
  const height = comp.params?.lensHeight ?? 140;
  const f = comp.params?.focalLength ?? 160;
  const halfH = height / 2;
  const thickness = 26;

  // Dashed Optical Axis
  ctx.save();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-f - 40, 0);
  ctx.lineTo(f + 40, 0);
  ctx.stroke();

  // Focal points F1 and F2
  ctx.setLineDash([]);
  [-f, f].forEach((fx, idx) => {
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(fx, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#0369a1';
    ctx.fillText(`F${idx + 1}`, fx - 5, -8);
  });
  ctx.restore();

  // Biconvex Glass Body
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, -halfH);
  ctx.quadraticCurveTo(thickness, 0, 0, halfH);
  ctx.quadraticCurveTo(-thickness, 0, 0, -halfH);
  ctx.closePath();

  // Glass gradient
  const grad = ctx.createLinearGradient(-thickness, 0, thickness, 0);
  grad.addColorStop(0, 'rgba(186, 230, 253, 0.45)');
  grad.addColorStop(0.5, 'rgba(224, 242, 254, 0.85)');
  grad.addColorStop(1, 'rgba(186, 230, 253, 0.45)');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Center optical line
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.4)';
  ctx.setLineDash([2, 2]);
  ctx.beginPath();
  ctx.moveTo(0, -halfH + 4);
  ctx.lineTo(0, halfH - 4);
  ctx.stroke();

  // Lens Tag
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#0369a1';
  ctx.fillText(`f = +${f}px`, -18, halfH + 16);

  ctx.restore();
}

// 3. Concave Lens
function drawConcaveLens(ctx, comp) {
  const height = comp.params?.lensHeight ?? 140;
  const f = comp.params?.focalLength ?? 150;
  const halfH = height / 2;
  const capW = 24;
  const waistW = 8;

  // Dashed Optical Axis
  ctx.save();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-f - 40, 0);
  ctx.lineTo(f + 40, 0);
  ctx.stroke();

  // Focal points F1 and F2
  ctx.setLineDash([]);
  [-f, f].forEach((fx, idx) => {
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(fx, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#4f46e5';
    ctx.fillText(`-F${idx + 1}`, fx - 7, -8);
  });
  ctx.restore();

  // Concave Hourglass Body
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-capW / 2, -halfH);
  ctx.lineTo(capW / 2, -halfH);
  ctx.quadraticCurveTo(waistW / 2, 0, capW / 2, halfH);
  ctx.lineTo(-capW / 2, halfH);
  ctx.quadraticCurveTo(-waistW / 2, 0, -capW / 2, -halfH);
  ctx.closePath();

  const grad = ctx.createLinearGradient(-capW, 0, capW, 0);
  grad.addColorStop(0, 'rgba(224, 231, 255, 0.5)');
  grad.addColorStop(0.5, 'rgba(199, 210, 254, 0.85)');
  grad.addColorStop(1, 'rgba(224, 231, 255, 0.5)');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = 'rgba(99, 102, 241, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Tag
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#4f46e5';
  ctx.fillText(`f = -${f}px`, -18, halfH + 16);

  ctx.restore();
}

// 4. Triangular Prism
function drawPrism(ctx, comp) {
  const side = comp.params?.side ?? 110;
  const h = (Math.sqrt(3) / 2) * side;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, -(2 / 3) * h);
  ctx.lineTo(side / 2, (1 / 3) * h);
  ctx.lineTo(-side / 2, (1 / 3) * h);
  ctx.closePath();

  // Crystal glass fill
  const grad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
  grad.addColorStop(0, 'rgba(245, 208, 254, 0.6)');
  grad.addColorStop(0.5, 'rgba(250, 232, 255, 0.85)');
  grad.addColorStop(1, 'rgba(232, 121, 249, 0.5)');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = 'rgba(217, 70, 239, 0.85)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Refraction index text
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = '#86198f';
  ctx.fillText(`n=${comp.params?.refractiveIndex ?? 1.55}`, -16, 6);

  ctx.restore();
}

// 5. Plane Mirror
function drawPlaneMirror(ctx, comp) {
  const len = comp.params?.length ?? 130;
  const halfL = len / 2;

  ctx.save();
  // Reflective surface line
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-halfL, 0);
  ctx.lineTo(halfL, 0);
  ctx.stroke();

  // Hatch marks on the back of mirror
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  for (let x = -halfL + 6; x <= halfL; x += 12) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 6, 8);
    ctx.stroke();
  }
  ctx.restore();
}

// 6. Simple Pendulum
function drawPendulum(ctx, comp, state) {
  const L = comp.params?.length ?? 180;
  const theta = state?.theta ?? 0.6;
  const bobX = Math.sin(theta) * L;
  const bobY = Math.cos(theta) * L;

  ctx.save();
  // Pivot mount
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();

  // Cord
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(bobX, bobY);
  ctx.stroke();

  // Brass Bob
  const bobGrad = ctx.createRadialGradient(bobX - 4, bobY - 4, 2, bobX, bobY, 14);
  bobGrad.addColorStop(0, '#fde047');
  bobGrad.addColorStop(0.7, '#eab308');
  bobGrad.addColorStop(1, '#a16207');
  ctx.fillStyle = bobGrad;
  ctx.beginPath();
  ctx.arc(bobX, bobY, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

// 7. Projectile Launcher Cannon
function drawProjectileLauncher(ctx, comp) {
  const angle = comp.params?.angle ?? 45;
  const rad = (-angle * Math.PI) / 180;

  ctx.save();
  // Heavy base
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.roundRect(-24, 0, 48, 14, 4);
  ctx.fill();

  // Cannon barrel rotated to launch angle
  ctx.save();
  ctx.rotate(rad);
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.roundRect(-6, -10, 44, 20, 4);
  ctx.fill();
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Angle indicator arc
  ctx.fillStyle = '#c2410c';
  ctx.font = 'bold 9px monospace';
  ctx.fillText(`${angle}°`, 18, -12);

  ctx.restore();
}

// 8. Inclined Plane / Ramp
function drawRamp(ctx, comp) {
  const angle = comp.params?.angle ?? 30;
  const width = 160;
  const rad = (angle * Math.PI) / 180;
  const h = Math.tan(rad) * width;

  ctx.save();
  // Wedge
  ctx.beginPath();
  ctx.moveTo(-width / 2, h / 2);
  ctx.lineTo(width / 2, h / 2);
  ctx.lineTo(width / 2, -h / 2);
  ctx.closePath();

  ctx.fillStyle = 'rgba(254, 215, 170, 0.4)';
  ctx.fill();
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Sliding block on incline
  ctx.save();
  ctx.translate(0, 0);
  ctx.rotate(-rad);
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(-14, -20, 28, 20);
  ctx.strokeStyle = '#1d4ed8';
  ctx.strokeRect(-14, -20, 28, 20);
  ctx.restore();

  // Angle tag
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#9a3412';
  ctx.fillText(`θ = ${angle}° (μ = ${comp.params?.friction ?? 0.15})`, -width / 2 + 10, h / 2 + 14);

  ctx.restore();
}

// 9. Spring & Mass
function drawSpringMass(ctx, comp, running, elapsedMs) {
  const k = comp.params?.springConstant ?? 35;
  const stretch = running ? Math.sin((elapsedMs || 0) * 0.006) * 20 : 0;
  const totalH = 110 + stretch;

  ctx.save();
  // Ceiling
  ctx.fillStyle = '#475569';
  ctx.fillRect(-24, 0, 48, 6);

  // Coiled Spring Wire
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 6);
  const coils = 8;
  const step = (totalH - 30) / coils;
  for (let i = 0; i < coils; i++) {
    const y1 = 6 + i * step + step * 0.25;
    const y2 = 6 + i * step + step * 0.75;
    ctx.lineTo(-12, y1);
    ctx.lineTo(12, y2);
  }
  ctx.lineTo(0, totalH);
  ctx.stroke();

  // Weight block
  ctx.fillStyle = '#059669';
  ctx.beginPath();
  ctx.roundRect(-18, totalH, 36, 26, 6);
  ctx.fill();
  ctx.strokeStyle = '#065f46';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${comp.params?.mass ?? 1.5}kg`, -11, totalH + 16);

  ctx.restore();
}

// Generic fallback
function drawGenericComponent(ctx, comp) {
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(comp.type.toUpperCase().slice(0, 4), -12, 4);
}

/**
 * Selection Overlay with Rotation Handle and Bounding Box
 */
function drawSelectionOverlay(ctx, comp) {
  const r = getComponentHitRadius(comp) + 12;

  ctx.save();
  ctx.translate(comp.x, comp.y);
  ctx.rotate(((comp.rotation || 0) * Math.PI) / 180);

  // Dashed bounding circle/ring
  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Rotation Handle stem & knob
  ctx.strokeStyle = '#0d9488';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(0, -r - 20);
  ctx.stroke();

  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.arc(0, -r - 20, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -r - 20, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function getComponentHitRadius(comp) {
  switch (comp.type) {
    case 'laser': return 35;
    case 'convex_lens':
    case 'concave_lens': return (comp.params?.lensHeight || 140) / 2;
    case 'prism': return (comp.params?.side || 110) / 2;
    case 'mirror': return (comp.params?.length || 130) / 2;
    case 'pendulum': return 40;
    case 'projectile': return 30;
    case 'ramp': return 60;
    case 'spring': return 45;
    default: return 30;
  }
}
