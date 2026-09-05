// 2D Ray Tracing & Optics Simulation Engine
// Implements Snell's Law, Lens Maker's Equation, Specular Reflection, Cauchy Dispersion, and TIR

export const WAVELENGTH_COLORS = {
  white: '#ffffff',
  red: '#ff3b30',     // 650 nm
  amber: '#ff9500',   // 590 nm
  green: '#34c759',   // 532 nm
  cyan: '#00c7be',    // 490 nm
  blue: '#007aff',    // 450 nm
  violet: '#af52de',  // 405 nm
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
  const maxDepth = 6;
  const points = [origin];
  let currentOrigin = { ...origin };
  let currentDir = { ...dir };

  for (let step = 0; step < maxDepth; step++) {
    // Find closest intersection among all optical elements
    let closestHit = null;
    let hitElement = null;

    elements.forEach((el) => {
      const hit = checkElementIntersection(currentOrigin, currentDir, el);
      if (hit && (!closestHit || hit.dist < closestHit.dist)) {
        closestHit = hit;
        hitElement = el;
      }
    });

    if (!closestHit) {
      // Ray extends to edge of canvas
      const edgePoint = extendToCanvasEdge(currentOrigin, currentDir, bounds);
      points.push(edgePoint);
      break;
    }

    // Record hit point
    points.push(closestHit.point);

    // Calculate response (Refraction or Reflection)
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

    currentOrigin = interaction.newOrigin;
    currentDir = interaction.newDir;
  }

  return {
    color,
    points,
    wavelengthNm,
  };
}

/**
 * Checks ray intersection with a specific optical element
 */
function checkElementIntersection(origin, dir, element) {
  const rotRad = ((element.rotation || 0) * Math.PI) / 180;
  const elX = element.x;
  const elY = element.y;

  if (element.type === 'convex_lens' || element.type === 'concave_lens') {
    // Treat lens aperture as a line segment oriented perpendicular to optical axis
    const height = element.params?.lensHeight || 140;
    const halfH = height / 2;

    // Aperture line segment perpendicular to optical axis
    // When rotRad = 0, optical axis is horizontal (x), so aperture is vertical (y)
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
      // Signed distance from lens optical center along aperture
      const toHitX = hit.point.x - elX;
      const toHitY = hit.point.y - elY;
      const signedOffset = toHitX * perpX + toHitY * perpY;

      return {
        ...hit,
        element,
        signedOffset,
        lensCenter: { x: elX, y: elY },
        normalAngle: rotRad, // Optical axis direction
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

  if (type === 'convex_lens' || type === 'concave_lens') {
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

    // Deflection angle relative to optical axis:
    // Convex lens deflects toward axis: deltaTheta = -yOffset / focalLength
    // Concave lens deflects away from axis: deltaTheta = +yOffset / |focalLength|
    const isConvex = type === 'convex_lens';
    const deflection = isConvex
      ? -Math.atan(yOffset / focalLength)
      : Math.atan(yOffset / Math.abs(focalLength));

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
 * Extends ray to edge of canvas bounds
 */
function extendToCanvasEdge(origin, dir, bounds) {
  let t = 2000;
  if (dir.x > 0) t = Math.min(t, (bounds.width - origin.x) / dir.x);
  else if (dir.x < 0) t = Math.min(t, -origin.x / dir.x);

  if (dir.y > 0) t = Math.min(t, (bounds.height - origin.y) / dir.y);
  else if (dir.y < 0) t = Math.min(t, -origin.y / dir.y);

  t = Math.max(0, t);

  return {
    x: origin.x + dir.x * t,
    y: origin.y + dir.y * t,
  };
}
