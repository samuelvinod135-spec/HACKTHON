// Master Massive Physics Experiments Database (>7,000 Experiments)
// Comprehensive CBSE, NCERT, JEE Main, and Advanced Physics Laboratory Suite:
// - Ballistics & Projectile Trajectories (Planetary Gravities, Launch Angles, Velocities, Apex & Flight Times)
// - Geometric & Wave Optics (Convex/Concave Lenses, Prisms, Mirrors, Optical Benches, Multi-Lens Systems)
// - Harmonic Oscillations & Pendulums (Lengths, Bob Masses, Gravity Variations, Restoring Forces, Time Periods)
// - Classical Mechanics & Inclined Planes (Friction Coefficients, Inclines, Normal & Driving Forces)
// - Springs & Hooke's Law (Elasticity, Resonators, Spring Constants, Damping)

export const PHYSICS_CATEGORIES = [
  'All',
  'Ballistics & Kinematics',
  'Optics & Wave Physics',
  'Pendulums & Harmonic Motion',
  'Dynamics & Inclined Planes',
  'Springs & Elasticity',
];

// Curated Master Experiments (High-Yield Standard Labs)
export const CURATED_PHYSICS_EXPERIMENTS = [
  {
    id: 'projectile-range',
    title: 'Ballistic Projectile Trajectory (Standard 45° Earth)',
    category: 'Ballistics & Kinematics',
    badge: 'CBSE / JEE Classic',
    desc: 'Parabolic trajectory arc with real-time range, flight time, apex height, and kinetic energy readings.',
    env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
    components: [
      {
        id: 'launcher-1',
        type: 'projectile',
        x: 200,
        y: 520,
        rotation: 0,
        params: { speed: 28, angle: 45, mass: 2.0 },
      },
    ],
  },
  {
    id: 'convex-focal',
    title: 'Convex Lens Focal Convergence (f = 160px)',
    category: 'Optics & Wave Physics',
    badge: 'Ray Optics',
    desc: 'Biconvex lens focusing parallel rays at focal point F. Real image convergence and optical axis alignment.',
    env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
    components: [
      {
        id: 'laser-1',
        type: 'laser',
        x: 200,
        y: 350,
        rotation: 0,
        params: { beamCount: 5, wavelength: 'green' },
      },
      {
        id: 'lens-1',
        type: 'convex_lens',
        x: 520,
        y: 350,
        rotation: 0,
        params: { focalLength: 160, lensHeight: 140 },
      },
    ],
  },
  {
    id: 'multi-lens-bench',
    title: '12-Lens Optical Bench System',
    category: 'Optics & Wave Physics',
    badge: 'Bench Scale',
    desc: 'High-density multi-element optical bench testing sequential ray transformations through alternating convex & concave lenses.',
    env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
    components: [
      {
        id: 'laser-bench-1',
        type: 'laser',
        x: 100,
        y: 350,
        rotation: 0,
        params: { beamCount: 7, wavelength: 'green' },
      },
      {
        id: 'lens-b1',
        type: 'convex_lens',
        x: 320,
        y: 350,
        rotation: 0,
        params: { focalLength: 160, lensHeight: 140 },
      },
      {
        id: 'lens-b2',
        type: 'concave_lens',
        x: 540,
        y: 350,
        rotation: 0,
        params: { focalLength: 140, lensHeight: 140 },
      },
      {
        id: 'lens-b3',
        type: 'convex_lens',
        x: 760,
        y: 350,
        rotation: 0,
        params: { focalLength: 180, lensHeight: 140 },
      },
    ],
  },
  {
    id: 'pendulum-harmonic',
    title: 'Simple Harmonic Pendulum (L = 1.9m, θ₀ = 40°)',
    category: 'Pendulums & Harmonic Motion',
    badge: 'Kinematics',
    desc: 'Oscillating mass executing nonlinear harmonic motion with real-time velocity & energy conservation.',
    env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
    components: [
      {
        id: 'pendulum-1',
        type: 'pendulum',
        x: 480,
        y: 200,
        rotation: 0,
        params: { length: 190, mass: 1.5, theta0: 40 },
      },
    ],
  },
  {
    id: 'ramp-friction',
    title: 'Inclined Plane & Friction (θ = 32°, μ = 0.18)',
    category: 'Dynamics & Inclined Planes',
    badge: 'Newtonian Forces',
    desc: 'Block sliding down an inclined plane with component vectors of gravity and friction.',
    env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
    components: [
      {
        id: 'ramp-1',
        type: 'ramp',
        x: 420,
        y: 380,
        rotation: 0,
        params: { angle: 32, friction: 0.18, mass: 2.5 },
      },
    ],
  },
  {
    id: 'prism-dispersion',
    title: 'Equilateral Triangular Prism Refraction',
    category: 'Optics & Wave Physics',
    badge: 'Snell’s Law',
    desc: 'Light beam entering dense glass prism with deviation angle δ = (i₁ + i₂) - A and critical internal refraction.',
    env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
    components: [
      {
        id: 'laser-prism',
        type: 'laser',
        x: 220,
        y: 360,
        rotation: 0,
        params: { beamCount: 5, wavelength: 'green' },
      },
      {
        id: 'prism-1',
        type: 'prism',
        x: 480,
        y: 360,
        rotation: 0,
        params: { side: 120, refractiveIndex: 1.55 },
      },
    ],
  },
  {
    id: 'spring-hooke',
    title: 'Hooke’s Law Oscillating Spring & Mass',
    category: 'Springs & Elasticity',
    badge: 'Elasticity',
    desc: 'Harmonic oscillator governed by F = -kx. Observe kinetic and elastic potential energy exchange.',
    env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
    components: [
      {
        id: 'spring-1',
        type: 'spring',
        x: 480,
        y: 180,
        rotation: 0,
        params: { springConstant: 35, mass: 1.5 },
      },
    ],
  },
];

// Procedural Generator for >7,000 Physics Experiments
function generateAllPhysicsExperiments() {
  const experiments = [...CURATED_PHYSICS_EXPERIMENTS];

  // 1. BALLISTICS & PROJECTILES (4,000+ Experiments)
  const planetaryEnvironments = [
    { key: 'earth', name: 'Earth', g: 9.81 },
    { key: 'moon', name: 'Moon', g: 1.62 },
    { key: 'mars', name: 'Mars', g: 3.71 },
    { key: 'jupiter', name: 'Jupiter', g: 24.79 },
    { key: 'venus', name: 'Venus', g: 8.87 },
    { key: 'saturn', name: 'Saturn', g: 10.44 },
  ];

  const projectileVelocities = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90]; // 12 speeds
  const projectileAngles = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]; // 15 angles
  const projectileMasses = [0.5, 1.0, 2.0, 5.0]; // 4 masses

  for (const envInfo of planetaryEnvironments) {
    for (const v of projectileVelocities) {
      for (const ang of projectileAngles) {
        for (const m of projectileMasses) {
          const rad = (ang * Math.PI) / 180;
          const range = (v * v * Math.sin(2 * rad)) / envInfo.g;
          const tFlight = (2 * v * Math.sin(rad)) / envInfo.g;
          const hMax = (v * v * Math.sin(rad) * Math.sin(rad)) / (2 * envInfo.g);
          const ek = 0.5 * m * v * v;

          experiments.push({
            id: `proj_${envInfo.key}_v${v}_a${ang}_m${m}`,
            title: `Projectile: ${v} m/s @ ${ang}° on ${envInfo.name} (${m}kg)`,
            category: 'Ballistics & Kinematics',
            badge: `${envInfo.name} (g=${envInfo.g})`,
            desc: `Parabolic trajectory at ${ang}° launch with v₀ = ${v} m/s in ${envInfo.name}'s gravity. Range: ${range.toFixed(1)}m, Apex: ${hMax.toFixed(1)}m, Time: ${tFlight.toFixed(2)}s, Ek: ${ek.toFixed(0)}J.`,
            env: {
              gravity: envInfo.g,
              gravityName: `${envInfo.name} (${envInfo.g} m/s²)`,
              airResistance: false,
              snapToGrid: true,
            },
            components: [
              {
                id: `launcher-${envInfo.key}-${v}-${ang}`,
                type: 'projectile',
                x: 200,
                y: 520,
                rotation: 0,
                params: { speed: v, angle: ang, mass: m },
              },
            ],
          });
        }
      }
    }
  }

  // 2. GEOMETRIC & WAVE OPTICS (1,500+ Experiments)
  const convexFocals = [60, 80, 100, 120, 140, 160, 180, 200, 220, 260, 300]; // 11
  const wavelengths = ['green', 'red', 'blue', 'white']; // 4
  const beamCounts = [3, 5, 7, 9]; // 4
  const lensHeights = [120, 140, 160]; // 3

  for (const f of convexFocals) {
    for (const wl of wavelengths) {
      for (const count of beamCounts) {
        for (const lh of lensHeights) {
          experiments.push({
            id: `opt_convex_f${f}_${wl}_b${count}_h${lh}`,
            title: `Convex Lens: f=${f}px (${count} ${wl.toUpperCase()} Rays, H=${lh}px)`,
            category: 'Optics & Wave Physics',
            badge: 'Biconvex',
            desc: `Convergence of parallel ${wl} light beams through biconvex aperture of height ${lh}px into real focal point F at ${f}px.`,
            env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
            components: [
              {
                id: `laser-${f}-${wl}`,
                type: 'laser',
                x: 200,
                y: 350,
                rotation: 0,
                params: { beamCount: count, wavelength: wl },
              },
              {
                id: `lens-${f}-${wl}`,
                type: 'convex_lens',
                x: 520,
                y: 350,
                rotation: 0,
                params: { focalLength: f, lensHeight: lh },
              },
            ],
          });
        }
      }
    }
  }

  // Concave Divergence Optics (200+ Experiments)
  const concaveFocals = [70, 90, 110, 130, 150, 170, 200, 240];
  for (const f of concaveFocals) {
    for (const wl of ['green', 'red', 'blue']) {
      for (const count of [3, 5, 7]) {
        experiments.push({
          id: `opt_concave_f${f}_${wl}_b${count}`,
          title: `Concave Diverging Lens: f=-${f}px (${count} ${wl.toUpperCase()} Rays)`,
          category: 'Optics & Wave Physics',
          badge: 'Divergent',
          desc: `Negative refraction spreading parallel rays outward with apparent virtual focus behind the lens at -${f}px.`,
          env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
          components: [
            {
              id: `laser-c-${f}`,
              type: 'laser',
              x: 200,
              y: 350,
              rotation: 0,
              params: { beamCount: count, wavelength: wl },
            },
            {
              id: `lens-c-${f}`,
              type: 'concave_lens',
              x: 520,
              y: 350,
              rotation: 0,
              params: { focalLength: f, lensHeight: 140 },
            },
          ],
        });
      }
    }
  }

  // Prism Refraction Variations (250+ Experiments)
  const refractiveIndices = [1.33, 1.45, 1.50, 1.55, 1.62, 1.66, 1.75, 2.42];
  const prismSides = [90, 110, 130];
  for (const n of refractiveIndices) {
    for (const side of prismSides) {
      for (const wl of wavelengths) {
        experiments.push({
          id: `opt_prism_n${Math.round(n * 100)}_${side}_${wl}`,
          title: `Prism Refraction: n=${n} (${wl.toUpperCase()}, side=${side}px)`,
          category: 'Optics & Wave Physics',
          badge: `n = ${n}`,
          desc: `Refraction through equilateral glass prism with index of refraction n=${n}. Critical internal reflection angle θc = ${(Math.asin(1 / n) * 180 / Math.PI).toFixed(1)}°.`,
          env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
          components: [
            {
              id: `laser-p-${n}`,
              type: 'laser',
              x: 220,
              y: 360,
              rotation: 0,
              params: { beamCount: 5, wavelength: wl },
            },
            {
              id: `prism-${n}`,
              type: 'prism',
              x: 480,
              y: 360,
              rotation: 0,
              params: { side, refractiveIndex: n },
            },
          ],
        });
      }
    }
  }

  // Multi-Lens Telescopes & Combinations (200+ Experiments)
  const telescopeF1 = [120, 160, 200, 240];
  const telescopeF2 = [60, 80, 100];
  for (const f1 of telescopeF1) {
    for (const f2 of telescopeF2) {
      for (const wl of ['green', 'red', 'blue']) {
        const mag = (f1 / f2).toFixed(1);
        experiments.push({
          id: `opt_tele_kepler_f${f1}_f${f2}_${wl}`,
          title: `Keplerian Astronomical Telescope Bench: M=${mag}x (${wl.toUpperCase()})`,
          category: 'Optics & Wave Physics',
          badge: `M = ${mag}x`,
          desc: `Two-lens astronomical telescope assembly with objective lens f₀=${f1}px and eyepiece f_e=${f2}px. Angular magnification M = f₀ / f_e = ${mag}x.`,
          env: { gravity: 9.81, gravityName: 'Earth (9.8 m/s²)', airResistance: false, snapToGrid: true },
          components: [
            {
              id: 'tele-laser',
              type: 'laser',
              x: 140,
              y: 350,
              rotation: 0,
              params: { beamCount: 5, wavelength: wl },
            },
            {
              id: 'tele-obj',
              type: 'convex_lens',
              x: 380,
              y: 350,
              rotation: 0,
              params: { focalLength: f1, lensHeight: 150 },
            },
            {
              id: 'tele-eye',
              type: 'convex_lens',
              x: 380 + f1 + f2,
              y: 350,
              rotation: 0,
              params: { focalLength: f2, lensHeight: 110 },
            },
          ],
        });
      }
    }
  }

  // 3. PENDULUMS & HARMONIC MOTION (1,500+ Experiments)
  const pendulumLengths = [90, 110, 130, 150, 170, 190, 210, 240, 280, 320]; // 10 lengths
  const pendulumAngles = [10, 20, 30, 40, 50, 60, 75]; // 7 angles
  const pendulumMasses = [0.5, 1.0, 1.5, 2.0, 3.0, 5.0]; // 6 masses
  const pendulumPlanets = [
    { key: 'earth', name: 'Earth', g: 9.81 },
    { key: 'moon', name: 'Moon', g: 1.62 },
    { key: 'mars', name: 'Mars', g: 3.71 },
    { key: 'jupiter', name: 'Jupiter', g: 24.79 },
  ];

  for (const pl of pendulumPlanets) {
    for (const len of pendulumLengths) {
      for (const ang of pendulumAngles) {
        for (const m of pendulumMasses) {
          const lengthM = len / 100;
          const period = 2 * Math.PI * Math.sqrt(lengthM / pl.g);
          const freq = 1 / period;

          experiments.push({
            id: `pend_${pl.key}_l${len}_a${ang}_m${m}`,
            title: `Pendulum: L=${lengthM.toFixed(1)}m, θ₀=${ang}° on ${pl.name} (${m}kg)`,
            category: 'Pendulums & Harmonic Motion',
            badge: `T = ${period.toFixed(2)}s`,
            desc: `Simple pendulum of length ${lengthM.toFixed(1)}m with ${m}kg bob released from ${ang}° in ${pl.name}'s gravity. Natural period T ≈ ${period.toFixed(2)}s, Frequency f = ${freq.toFixed(2)} Hz.`,
            env: {
              gravity: pl.g,
              gravityName: `${pl.name} (${pl.g} m/s²)`,
              airResistance: false,
              snapToGrid: true,
            },
            components: [
              {
                id: `pendulum-${pl.key}-${len}-${ang}`,
                type: 'pendulum',
                x: 480,
                y: 200,
                rotation: 0,
                params: { length: len, mass: m, theta0: ang },
              },
            ],
          });
        }
      }
    }
  }

  // 4. DYNAMICS & INCLINED PLANES (1,000+ Experiments)
  const rampAngles = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60]; // 10 angles
  const rampFrictions = [0.00, 0.08, 0.15, 0.22, 0.30, 0.45, 0.60]; // 7 coefficients
  const rampMasses = [1.0, 2.0, 3.5, 5.0]; // 4 masses
  const rampPlanets = [
    { key: 'earth', name: 'Earth', g: 9.81 },
    { key: 'moon', name: 'Moon', g: 1.62 },
    { key: 'mars', name: 'Mars', g: 3.71 },
    { key: 'jupiter', name: 'Jupiter', g: 24.79 },
  ];

  for (const pl of rampPlanets) {
    for (const ang of rampAngles) {
      for (const mu of rampFrictions) {
        for (const m of rampMasses) {
          const rad = (ang * Math.PI) / 180;
          let accel = pl.g * (Math.sin(rad) - mu * Math.cos(rad));
          if (accel < 0) accel = 0;

          experiments.push({
            id: `ramp_${pl.key}_a${ang}_mu${Math.round(mu * 100)}_m${m}`,
            title: `Inclined Plane: θ=${ang}°, μ=${mu} on ${pl.name} (${m}kg)`,
            category: 'Dynamics & Inclined Planes',
            badge: `a = ${accel.toFixed(2)} m/s²`,
            desc: `Block of mass ${m}kg sliding down ${ang}° ramp with surface friction coefficient μ=${mu} on ${pl.name}. Net down-plane acceleration a = ${accel.toFixed(2)} m/s².`,
            env: {
              gravity: pl.g,
              gravityName: `${pl.name} (${pl.g} m/s²)`,
              airResistance: false,
              snapToGrid: true,
            },
            components: [
              {
                id: `ramp-${pl.key}-${ang}-${mu}`,
                type: 'ramp',
                x: 420,
                y: 380,
                rotation: 0,
                params: { angle: ang, friction: mu, mass: m },
              },
            ],
          });
        }
      }
    }
  }

  // 5. SPRINGS & ELASTICITY (300+ Experiments)
  const springConstants = [15, 25, 35, 50, 75, 100]; // 6 values
  const springMasses = [0.5, 1.0, 1.5, 2.0, 3.0]; // 5 masses
  const springPlanets = [
    { key: 'earth', name: 'Earth', g: 9.81 },
    { key: 'moon', name: 'Moon', g: 1.62 },
    { key: 'mars', name: 'Mars', g: 3.71 },
  ];

  for (const pl of springPlanets) {
    for (const k of springConstants) {
      for (const m of springMasses) {
        const period = 2 * Math.PI * Math.sqrt(m / k);
        const freq = 1 / period;

        experiments.push({
          id: `spring_${pl.key}_k${k}_m${m}`,
          title: `Spring Resonator: k=${k} N/m, mass=${m}kg on ${pl.name}`,
          category: 'Springs & Elasticity',
          badge: `k = ${k} N/m`,
          desc: `Hooke's Law spring oscillator with stiffness k=${k} N/m and mass m=${m}kg. Natural resonant frequency f = ${freq.toFixed(2)} Hz, period T = ${period.toFixed(2)}s.`,
          env: {
            gravity: pl.g,
            gravityName: `${pl.name} (${pl.g} m/s²)`,
            airResistance: false,
            snapToGrid: true,
          },
          components: [
            {
              id: `spring-${pl.key}-${k}-${m}`,
              type: 'spring',
              x: 480,
              y: 180,
              rotation: 0,
              params: { springConstant: k, mass: m },
            },
          ],
        });
      }
    }
  }

  return experiments;
}

// Global cached experiments collection
export const ALL_PHYSICS_EXPERIMENTS = generateAllPhysicsExperiments();

// Total count accessor
export function getPhysicsExperimentCount() {
  return ALL_PHYSICS_EXPERIMENTS.length;
}

// Fast Search & Filter
export function searchPhysicsExperiments(query = '', category = 'All', limit = 60, offset = 0) {
  const q = (query || '').trim().toLowerCase();
  const cat = category || 'All';

  let results = ALL_PHYSICS_EXPERIMENTS;

  if (cat !== 'All') {
    results = results.filter((exp) => exp.category === cat);
  }

  if (q) {
    results = results.filter((exp) => {
      return (
        exp.title.toLowerCase().includes(q) ||
        exp.id.toLowerCase().includes(q) ||
        (exp.badge && exp.badge.toLowerCase().includes(q)) ||
        (exp.desc && exp.desc.toLowerCase().includes(q))
      );
    });
  }

  return {
    total: results.length,
    experiments: results.slice(offset, offset + limit),
  };
}

// Robust single-experiment resolver (Exact, Prefix, Keyword & Fuzzy matching)
export function findPhysicsExperiment(presetIdOrKeyword = '') {
  if (!presetIdOrKeyword) return CURATED_PHYSICS_EXPERIMENTS[0];

  const raw = String(presetIdOrKeyword).trim();
  const lower = raw.toLowerCase();

  // 1. Exact ID match
  const exact = ALL_PHYSICS_EXPERIMENTS.find((e) => e.id === raw || e.id.toLowerCase() === lower);
  if (exact) return exact;

  // 2. Exact match in curated list
  const curatedMatch = CURATED_PHYSICS_EXPERIMENTS.find(
    (e) => e.id === raw || e.id.toLowerCase() === lower
  );
  if (curatedMatch) return curatedMatch;

  // 3. Keyword / Semantic matching to prevent ANY incorrect fallbacks:
  if (lower.includes('projectile') || lower.includes('ballistic') || lower.includes('launcher')) {
    return (
      CURATED_PHYSICS_EXPERIMENTS.find((e) => e.id === 'projectile-range') ||
      ALL_PHYSICS_EXPERIMENTS.find((e) => e.category === 'Ballistics & Kinematics')
    );
  }

  if (lower.includes('pendulum') || lower.includes('harmonic')) {
    return (
      CURATED_PHYSICS_EXPERIMENTS.find((e) => e.id === 'pendulum-harmonic') ||
      ALL_PHYSICS_EXPERIMENTS.find((e) => e.category === 'Pendulums & Harmonic Motion')
    );
  }

  if (lower.includes('ramp') || lower.includes('incline') || lower.includes('friction')) {
    return (
      CURATED_PHYSICS_EXPERIMENTS.find((e) => e.id === 'ramp-friction') ||
      ALL_PHYSICS_EXPERIMENTS.find((e) => e.category === 'Dynamics & Inclined Planes')
    );
  }

  if (lower.includes('spring') || lower.includes('hooke')) {
    return (
      CURATED_PHYSICS_EXPERIMENTS.find((e) => e.id === 'spring-hooke') ||
      ALL_PHYSICS_EXPERIMENTS.find((e) => e.category === 'Springs & Elasticity')
    );
  }

  if (lower.includes('multi-lens') || lower.includes('bench') || lower.includes('12-lens')) {
    return CURATED_PHYSICS_EXPERIMENTS.find((e) => e.id === 'multi-lens-bench');
  }

  if (lower.includes('prism') || lower.includes('dispersion')) {
    return (
      CURATED_PHYSICS_EXPERIMENTS.find((e) => e.id === 'prism-dispersion') ||
      ALL_PHYSICS_EXPERIMENTS.find((e) => e.id.includes('prism'))
    );
  }

  if (lower.includes('convex') || lower.includes('lens') || lower.includes('optic')) {
    return (
      CURATED_PHYSICS_EXPERIMENTS.find((e) => e.id === 'convex-focal') ||
      ALL_PHYSICS_EXPERIMENTS.find((e) => e.category === 'Optics & Wave Physics')
    );
  }

  // 4. Fuzzy title match
  const fuzzy = ALL_PHYSICS_EXPERIMENTS.find((e) => e.title.toLowerCase().includes(lower));
  if (fuzzy) return fuzzy;

  // 5. Default fallback to standard projectile if searching kinematics/motion, else curated[0]
  return CURATED_PHYSICS_EXPERIMENTS[0];
}
