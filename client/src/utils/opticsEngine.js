// 2D Ray Tracing & Optics Simulation Engine
// Implements Snell's Law, Lens Maker's Equation, Specular Reflection, Cauchy Dispersion, and TIR

export const WAVELENGTH_COLORS = {
  white: '#ffffff',
  red: '#ff3b30',     // 650 nm
  amber: '#ff9500',   // 590 nm
  green: '#34c759',   // 532 nm
  cyan: '#00c7be',    // 490 nm
  blue: '#007aff',    // 450 nm
  violet: '#0369a1',  // 405 nm (Deep Sky Blue ray)
};

// Cauchy's Dispersion formula for optical glass
export function getRefractiveIndexForWavelength(baseN, wavelengthNm) {
  if (!wavelengthNm || wavelengthNm === 'white') return baseN;
  const wlUm = wavelengthNm / 1000; // Convert nm to micrometers
  const B = 0.0042; // Cauchy constant for typical crown/flint glass
  return baseN + B / (wlUm * wlUm);
}

// Helper: Line segment intersection
export function lineSegmentIntersection(p1, p2, p3, p4) {
  const x1 = p1.x, y1 = p1.y;
  const x2 = p2.x, y2 = p2.y;
  const x3 = p3.x, y3 = p3.y;
  const x4 = p4.x, y4 = p4.y;

  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (Math.abs(denom) < 1e-9) return null; // Parallel

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1),
      distA: ua,
      distB: ub,
    };
  }
  return null;
}

// Helper: Ray vs Line segment intersection
export function raySegmentIntersection(rayOrigin, rayDir, p1, p2) {
  const x1 = p1.x, y1 = p1.y;
  const x2 = p2.x, y2 = p2.y;
  const dx = rayDir.x, dy = rayDir.y;

  const denom = dy * (x2 - x1) - dx * (y2 - y1);
  if (Math.abs(denom) < 1e-9) return null;

  // t is distance along ray, s is parameter [0, 1] along segment p1->p2
  const t = ((y1 - rayOrigin.y) * (x2 - x1) - (x1 - rayOrigin.x) * (y2 - y1)) / denom;
  const s = (dx * (y1 - rayOrigin.y) - dy * (x1 - rayOrigin.x)) / denom;

  if (t > 0.001 && s >= 0 && s <= 1) {
    return {
      point: {
        x: rayOrigin.x + t * dx,
        y: rayOrigin.y + t * dy,
      },
      dist: t,
      segmentParam: s,
    };
  }
  return null;
}

/**
 * Trace all light rays emitted by optical sources across optical components
 */
export function traceRays(components, canvasBounds = { width: 1200, height: 750 }) {
  const sources = components.filter((c) => c.type === 'laser' || c.type === 'wave');
  const opticalElements = components.filter(
    (c) =>
      c.type === 'convex_lens' ||
      c.type === 'concave_lens' ||
      c.type === 'prism' ||
      c.type === 'mirror' ||
      c.type === 'semicircle'
  );

  const tracedRays = [];
  const telemetry = {
    incidentAngleDeg: 0,
    refractedAngleDeg: 0,
    focalDistancePx: 0,
    criticalAngleDeg: 0,
    activeRayCount: 0,
  };

  sources.forEach((src) => {
    const angleRad = ((src.rotation || 0) * Math.PI) / 180;
    const beamCount = src.params?.beamCount ?? 5;
    const beamSpacing = src.params?.beamSpacing ?? 16;
    const wavelength = src.params?.wavelength || 'green';
    const isWhite = wavelength === 'white';
    const baseColor = WAVELENGTH_COLORS[wavelength] || '#34c759';

    // Unit direction of the laser beam
    const dirX = Math.cos(angleRad);
    const dirY = Math.sin(angleRad);

    // Perpendicular vector for parallel rays
    const perpX = -Math.sin(angleRad);
    const perpY = Math.cos(angleRad);

    const offsets = [];
    if (beamCount === 1) {
      offsets.push(0);
    } else {
      const half = (beamCount - 1) / 2;
      for (let i = 0; i < beamCount; i++) {
        offsets.push((i - half) * beamSpacing);
      }
    }

    offsets.forEach((offset) => {
      const startX = src.x + perpX * offset;
      const startY = src.y + perpY * offset;

      if (isWhite) {
        // Multi-wavelength rainbow rays
        const spectrum = [
          { wl: 650, color: WAVELENGTH_COLORS.red },
          { wl: 590, color: WAVELENGTH_COLORS.amber },
          { wl: 532, color: WAVELENGTH_COLORS.green },
          { wl: 490, color: WAVELENGTH_COLORS.cyan },
          { wl: 450, color: WAVELENGTH_COLORS.blue },
          { wl: 405, color: WAVELENGTH_COLORS.violet },
        ];
        spectrum.forEach((spec) => {
          const ray = traceSingleRay(
            { x: startX, y: startY },
            { x: dirX, y: dirY },
            spec.color,
            spec.wl,
            opticalElements,
            canvasBounds,
            telemetry
          );
          tracedRays.push(ray);
        });
      } else {
        const ray = traceSingleRay(
          { x: startX, y: startY },
          { x: dirX, y: dirY },
          baseColor,
          wavelength === 'green' ? 532 : wavelength === 'red' ? 650 : 450,
          opticalElements,
          canvasBounds,
          telemetry
        );
        tracedRays.push(ray);
      }
    });
  });

  telemetry.activeRayCount = tracedRays.length;
  return { rays: tracedRays, telemetry };
}

/**
 * Traces a single ray path through potential multiple reflections/refractions
 */
function traceSingleRay(origin, dir, color, wavelengthNm, elements, bounds, telemetry, depth = 0) {
  // Task 1: Support complex optical benches with up to 50 sequential lens interactions
  const maxIntersections = 50;
  const points = [origin];
  const virtualRays = [];
  let currentOrigin = { ...origin };
  let currentDir = { ...dir };
  let lastHitElement = null;
  let reachedInfinity = false;

  for (let step = 0; step < maxIntersections; step++) {
    // 1. Collect all forward intersections from all optical elements
    const candidateHits = [];

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      // Prevent ray from self-intersecting with the exact element it just exited
      const minAcceptableDist = el === lastHitElement ? 2.0 : 0.01;

      const hit = checkElementIntersection(currentOrigin, currentDir, el);
      if (hit && hit.dist > minAcceptableDist) {
        candidateHits.push({
          hit,
          element: el,
          dist: hit.dist,
        });
      }
    }

    // 2. Strictly sort candidate hits by forward distance along ray vector (Task 1)
    // Guarantees overlapping or closely spaced lenses are never skipped
    candidateHits.sort((a, b) => a.dist - b.dist);

    if (candidateHits.length === 0) {
      // 3. Infinite Ray Extension: Final ray extends to infinity (Task 2)
      const edgePoint = extendToCanvasEdge(currentOrigin, currentDir, bounds);
      points.push(edgePoint);
      reachedInfinity = true;
      break;
    }

    // Strictly select the closest element along the forward ray path
    const closest = candidateHits[0];
    const closestHit = closest.hit;
    const hitElement = closest.element;
    lastHitElement = hitElement;

    // Record hit point
    points.push(closestHit.point);

    // Calculate optical response (Refraction or Reflection)
    const interaction = handleOpticalInteraction(
      closestHit,
      currentDir,
      hitElement,
      wavelengthNm,
      telemetry
    );

    if (!interaction || interaction.terminate) {
      break;
    }

    // Add internal through-points (e.g. traversal through concave lens body)
    if (interaction.throughPoints && interaction.throughPoints.length > 0) {
      points.push(...interaction.throughPoints);
    }

    if (interaction.virtualPoints && interaction.virtualPoints.length > 0) {
      virtualRays.push(interaction.virtualPoints);
    }

    currentOrigin = interaction.newOrigin;
    currentDir = interaction.newDir;
  }

  // Safety: If maxIntersections was exhausted, ensure final ray still extends to infinity
  if (!reachedInfinity && points.length > 0) {
    const finalEdgePoint = extendToCanvasEdge(currentOrigin, currentDir, bounds);
    points.push(finalEdgePoint);
  }

  return {
    color,
    points,
    wavelengthNm,
    virtualPoints: virtualRays.length > 0 ? virtualRays[0] : null,
    allVirtualRays: virtualRays,
  };
}

/**
 * Checks ray intersection with a specific optical element
 */
function checkElementIntersection(origin, dir, element) {
  const rotRad = ((element.rotation || 0) * Math.PI) / 180;
  const elX = element.x;
  const elY = element.y;

  if (element.type === 'convex_lens') {
    // Treat convex lens aperture as a line segment oriented perpendicular to optical axis
    const height = element.params?.lensHeight || 140;
    const halfH = height / 2;

    const perpX = -Math.sin(rotRad);
    const perpY = Math.cos(rotRad);

    const p1 = {
      x: elX - perpX * halfH,
      y: elY - perpY * halfH,
    };
    const p2 = {
      x: elX + perpX * halfH,
      y: elY + perpY * halfH,
    };

    const hit = raySegmentIntersection(origin, dir, p1, p2);
    if (hit) {
      const toHitX = hit.point.x - elX;
      const toHitY = hit.point.y - elY;
      const signedOffset = toHitX * perpX + toHitY * perpY;

      return {
        ...hit,
        element,
        signedOffset,
        lensCenter: { x: elX, y: elY },
        normalAngle: rotRad,
      };
    }
    return null;
  }

  if (element.type === 'concave_lens') {
    // Comprehensive dual-boundary concave lens (front and back hourglass curves)
    const height = element.params?.lensHeight || 140;
    const halfH = height / 2;
    const waistW = 8;
    const capW = 24;
    const Kc = (capW - waistW) / (2 * halfH * halfH);

    const cos = Math.cos(rotRad);
    const sin = Math.sin(rotRad);
    const u0 = (origin.x - elX) * cos + (origin.y - elY) * sin;
    const v0 = -(origin.x - elX) * sin + (origin.y - elY) * cos;
    const du = dir.x * cos + dir.y * sin;
    const dv = -dir.x * sin + dir.y * cos;

    const solveQuad = (A, B, C) => {
      if (Math.abs(A) < 1e-9) {
        if (Math.abs(B) < 1e-9) return null;
        const t = -C / B;
        return t > 0.001 ? t : null;
      }
      const disc = B * B - 4 * A * C;
      if (disc < 0) return null;
      const sqrtD = Math.sqrt(disc);
      const t1 = (-B - sqrtD) / (2 * A);
      const t2 = (-B + sqrtD) / (2 * A);
      const valid = [t1, t2].filter((t) => t > 0.001);
      return valid.length ? Math.min(...valid) : null;
    };

    // 1. Front curved face: u = -waistW/2 - Kc * v^2
    const tFront = solveQuad(Kc * dv * dv, 2 * Kc * v0 * dv + du, u0 + waistW / 2 + Kc * v0 * v0);
    let hitFront = null;
    if (tFront !== null) {
      const vHit = v0 + tFront * dv;
      if (Math.abs(vHit) <= halfH + 0.5) {
        const uHit = -waistW / 2 - Kc * vHit * vHit;
        hitFront = {
          t: tFront,
          face: 'front',
          vOffset: vHit,
          uOffset: uHit,
          point: {
            x: elX + uHit * cos - vHit * sin,
            y: elY + uHit * sin + vHit * cos,
          },
        };
      }
    }

    // 2. Back curved face: u = +waistW/2 + Kc * v^2
    const tBack = solveQuad(Kc * dv * dv, 2 * Kc * v0 * dv - du, -u0 + waistW / 2 + Kc * v0 * v0);
    let hitBack = null;
    if (tBack !== null) {
      const vHit = v0 + tBack * dv;
      if (Math.abs(vHit) <= halfH + 0.5) {
        const uHit = waistW / 2 + Kc * vHit * vHit;
        hitBack = {
          t: tBack,
          face: 'back',
          vOffset: vHit,
          uOffset: uHit,
          point: {
            x: elX + uHit * cos - vHit * sin,
            y: elY + uHit * sin + vHit * cos,
          },
        };
      }
    }

    const candidates = [hitFront, hitBack].filter(Boolean).sort((a, b) => a.t - b.t);
    if (candidates.length > 0) {
      const best = candidates[0];
      return {
        point: best.point,
        dist: best.t,
        element,
        face: best.face,
        signedOffset: best.vOffset,
        uOffset: best.uOffset,
        lensCenter: { x: elX, y: elY },
        normalAngle: rotRad,
        halfH,
        waistW,
        capW,
        Kc,
        rotRad,
      };
    }
    return null;
  }

  if (element.type === 'mirror') {
    const length = element.params?.length || 120;
    const halfL = length / 2;
    const p1 = {
      x: elX - Math.cos(rotRad) * halfL,
      y: elY - Math.sin(rotRad) * halfL,
    };
    const p2 = {
      x: elX + Math.cos(rotRad) * halfL,
      y: elY + Math.sin(rotRad) * halfL,
    };

    const hit = raySegmentIntersection(origin, dir, p1, p2);
    if (hit) {
      // Surface normal perpendicular to mirror
      let normal = {
        x: -Math.sin(rotRad),
        y: Math.cos(rotRad),
      };
      // Ensure normal faces incoming ray
      if (dir.x * normal.x + dir.y * normal.y > 0) {
        normal.x = -normal.x;
        normal.y = -normal.y;
      }
      return {
        ...hit,
        element,
        normal,
      };
    }
    return null;
  }

  if (element.type === 'prism') {
    // Triangular prism with 3 edges
    const side = element.params?.side || 110;
    const h = (Math.sqrt(3) / 2) * side;

    // Triangle vertices relative to center
    const localVerts = [
      { x: 0, y: -(2 / 3) * h },
      { x: side / 2, y: (1 / 3) * h },
      { x: -side / 2, y: (1 / 3) * h },
    ];

    // Rotate and translate vertices
    const worldVerts = localVerts.map((v) => {
      const rx = v.x * Math.cos(rotRad) - v.y * Math.sin(rotRad);
      const ry = v.x * Math.sin(rotRad) + v.y * Math.cos(rotRad);
      return { x: elX + rx, y: elY + ry };
    });

    // Check intersection with all 3 faces
    let bestHit = null;
    for (let i = 0; i < 3; i++) {
      const v1 = worldVerts[i];
      const v2 = worldVerts[(i + 1) % 3];
      const hit = raySegmentIntersection(origin, dir, v1, v2);
      if (hit && (!bestHit || hit.dist < bestHit.dist)) {
        // Face normal pointing outward
        const edgeX = v2.x - v1.x;
        const edgeY = v2.y - v1.y;
        const edgeLen = Math.hypot(edgeX, edgeY);
        let normal = {
          x: -edgeY / edgeLen,
          y: edgeX / edgeLen,
        };
        if (dir.x * normal.x + dir.y * normal.y > 0) {
          normal.x = -normal.x;
          normal.y = -normal.y;
        }
        bestHit = {
          ...hit,
          element,
          normal,
          v1,
          v2,
        };
      }
    }
    return bestHit;
  }

  return null;
}

/**
 * Computes new ray direction after hitting an optical component
 */
function handleOpticalInteraction(hit, incidentDir, element, wavelengthNm, telemetry) {
  const { type, params = {} } = element;

  if (type === 'convex_lens') {
    const baseFocalLength = params.focalLength ?? 160;
    const baseN = params.refractiveIndex ?? 1.52;
    const curvatureR = params.curvature ?? 50;

    // Refractive index with dispersion
    const effectiveN = getRefractiveIndexForWavelength(baseN, wavelengthNm);

    // Lens Maker Equation: 1/f = (n - 1) * 2 / R  => f = R / (2 * (n - 1))
    const lensMakerF = (curvatureR / (2 * (effectiveN - 1))) * 3.2;
    const focalLength = params.useExactFocal ? baseFocalLength : (params.focalLength ?? lensMakerF);

    telemetry.focalDistancePx = Math.round(focalLength);

    // Optical axis direction
    const optAxisRad = ((element.rotation || 0) * Math.PI) / 180;

    // Signed offset from optical center along the lens aperture
    const yOffset = hit.signedOffset;

    // Deflection angle relative to optical axis (converges toward axis):
    const deflection = -Math.atan(yOffset / focalLength);

    const currentRayAngle = Math.atan2(incidentDir.y, incidentDir.x);
    const newRayAngle = currentRayAngle + deflection;

    const newDir = {
      x: Math.cos(newRayAngle),
      y: Math.sin(newRayAngle),
    };

    telemetry.incidentAngleDeg = Math.round((Math.abs(currentRayAngle - optAxisRad) * 180) / Math.PI);
    telemetry.refractedAngleDeg = Math.round((Math.abs(newRayAngle - optAxisRad) * 180) / Math.PI);

    return {
      newOrigin: {
        x: hit.point.x + newDir.x * 0.5,
        y: hit.point.y + newDir.y * 0.5,
      },
      newDir,
    };
  }

  if (type === 'concave_lens') {
    const baseFocalLength = Math.abs(params.focalLength ?? 140);
    const baseN = params.refractiveIndex ?? 1.52;
    const curvatureR = params.curvature ?? 50;

    // Refractive index with dispersion
    const effectiveN = getRefractiveIndexForWavelength(baseN, wavelengthNm);

    // Lens Maker Equation for biconcave diverging lens:
    // 1/f = (n - 1) * (-2 / R) => |f| = R / (2 * (n - 1))
    const lensMakerF = (curvatureR / (2 * (effectiveN - 1))) * 3.2;
    const focalLength = params.useExactFocal ? baseFocalLength : (params.focalLength ? Math.abs(params.focalLength) : lensMakerF);

    // Record signed negative focal length for diverging concave lens
    telemetry.focalDistancePx = -Math.round(focalLength);

    const rotRad = ((element.rotation || 0) * Math.PI) / 180;
    const cos = Math.cos(rotRad);
    const sin = Math.sin(rotRad);
    const elX = element.x;
    const elY = element.y;

    const waistW = hit.waistW ?? 8;
    const capW = hit.capW ?? 24;
    const halfH = hit.halfH ?? ((params.lensHeight || 140) / 2);
    const Kc = hit.Kc ?? ((capW - waistW) / (2 * halfH * halfH));

    const vOffset = hit.signedOffset;
    const hitFace = hit.face || 'front';

    // The ray traverses through the glass body to exit from the opposite concave face
    const exitFace = hitFace === 'front' ? 'back' : 'front';
    const uExit = exitFace === 'back'
      ? (waistW / 2 + Kc * vOffset * vOffset)
      : (-waistW / 2 - Kc * vOffset * vOffset);

    const exitPoint = {
      x: elX + uExit * cos - vOffset * sin,
      y: elY + uExit * sin + vOffset * cos,
    };

    // Forward component along optical axis
    const du = incidentDir.x * cos + incidentDir.y * sin;
    const forwardSign = du >= 0 ? 1 : -1;

    // Diverging refraction angle (deflects away from optical axis):
    // deltaTheta = forwardSign * atan(vOffset / |f|)
    const deflection = forwardSign * Math.atan(vOffset / focalLength);

    const currentRayAngle = Math.atan2(incidentDir.y, incidentDir.x);
    const newRayAngle = currentRayAngle + deflection;

    const newDir = {
      x: Math.cos(newRayAngle),
      y: Math.sin(newRayAngle),
    };

    telemetry.incidentAngleDeg = Math.round((Math.abs(currentRayAngle - rotRad) * 180) / Math.PI);
    telemetry.refractedAngleDeg = Math.round((Math.abs(newRayAngle - rotRad) * 180) / Math.PI);

    // Virtual focal point behind the lens from which exiting rays appear to diverge
    const virtualFocusDist = forwardSign * focalLength;
    const virtualFocusPoint = {
      x: elX - virtualFocusDist * cos,
      y: elY - virtualFocusDist * sin,
    };

    return {
      throughPoints: [exitPoint],
      newOrigin: {
        x: exitPoint.x + newDir.x * 0.8,
        y: exitPoint.y + newDir.y * 0.8,
      },
      newDir,
      virtualPoints: [virtualFocusPoint, exitPoint],
    };
  }

  if (type === 'mirror') {
    // Specular reflection: r = d - 2*(d.n)*n
    const n = hit.normal;
    const dDotN = incidentDir.x * n.x + incidentDir.y * n.y;
    const reflDir = {
      x: incidentDir.x - 2 * dDotN * n.x,
      y: incidentDir.y - 2 * dDotN * n.y,
    };

    telemetry.incidentAngleDeg = Math.round(Math.acos(Math.abs(dDotN)) * 180 / Math.PI);
    telemetry.refractedAngleDeg = telemetry.incidentAngleDeg;

    return {
      newOrigin: {
        x: hit.point.x + reflDir.x * 0.5,
        y: hit.point.y + reflDir.y * 0.5,
      },
      newDir: reflDir,
    };
  }

  if (type === 'prism') {
    // Accurate Snell's law refraction through glass prism
    const baseN = params.refractiveIndex ?? 1.54;
    const n = getRefractiveIndexForWavelength(baseN, wavelengthNm);

    telemetry.criticalAngleDeg = Math.round(Math.asin(1 / n) * 180 / Math.PI);

    const normal = hit.normal;
    const cosI = -(incidentDir.x * normal.x + incidentDir.y * normal.y);
    const eta = 1.0 / n; // Air (1.0) into glass (n)
    const sinT2 = eta * eta * (1.0 - cosI * cosI);

    if (sinT2 > 1.0) {
      // Total Internal Reflection
      const dDotN = incidentDir.x * normal.x + incidentDir.y * normal.y;
      const tirDir = {
        x: incidentDir.x - 2 * dDotN * normal.x,
        y: incidentDir.y - 2 * dDotN * normal.y,
      };
      return {
        newOrigin: { x: hit.point.x + tirDir.x * 0.5, y: hit.point.y + tirDir.y * 0.5 },
        newDir: tirDir,
      };
    }

    const cosT = Math.sqrt(1.0 - sinT2);
    const refrDir = {
      x: eta * incidentDir.x + (eta * cosI - cosT) * normal.x,
      y: eta * incidentDir.y + (eta * cosI - cosT) * normal.y,
    };

    telemetry.incidentAngleDeg = Math.round(Math.acos(Math.abs(cosI)) * 180 / Math.PI);
    telemetry.refractedAngleDeg = Math.round(Math.acos(Math.abs(cosT)) * 180 / Math.PI);

    return {
      newOrigin: {
        x: hit.point.x + refrDir.x * 0.5,
        y: hit.point.y + refrDir.y * 0.5,
      },
      newDir: refrDir,
    };
  }

  return { terminate: true };
}

/**
 * Extends ray infinitely to canvas bounds / infinity (Task 2)
 * Ensures final rays shoot to infinity without terminating prematurely or clipping at a fixed box.
 */
export function extendToCanvasEdge(origin, dir, bounds) {
  const len = Math.hypot(dir.x, dir.y);
  const ndx = len > 1e-9 ? dir.x / len : 1;
  const ndy = len > 1e-9 ? dir.y / len : 0;

  // Arbitrarily massive ray length multiplier (e.g., 25,000px) that scales dynamically
  // with our newly implemented Zoom/Pan coordinates and canvas bounds
  const baseInfinity = 25000;
  const dynamicSpan = bounds ? Math.max(bounds.width || 0, bounds.height || 0) * 15 : 0;
  const infiniteRayLength = Math.max(baseInfinity, dynamicSpan);

  return {
    x: origin.x + ndx * infiniteRayLength,
    y: origin.y + ndy * infiniteRayLength,
  };
}
