// Comprehensive Modular Physics Component Catalog & Experiment Database
// Supports 7 key physics domains with configurable parameters, formulas, and presets.

export const PHYSICS_CATEGORIES = [
  'Optics',
  'Mechanics',
  'Measurement',
  'Waves & Sound',
  'Heat & Thermo',
  'Electricity & Mag',
  'Modern Physics',
];

export const GRAVITY_PRESETS = [
  { id: 'earth', name: 'Earth (9.8 m/s²)', value: 9.81 },
  { id: 'moon', name: 'Moon (1.6 m/s²)', value: 1.62 },
  { id: 'mars', name: 'Mars (3.7 m/s²)', value: 3.71 },
  { id: 'jupiter', name: 'Jupiter (24.8 m/s²)', value: 24.79 },
  { id: 'zero', name: 'Zero-G (0 m/s²)', value: 0 },
];

export const PHYSICS_COMPONENTS = [
  // ===================== OPTICS =====================
  {
    id: 'laser',
    type: 'laser',
    name: 'Laser Ray Box',
    category: 'Optics',
    tone: 'from-emerald-400 to-teal-600',
    description: 'Precision laser emitter supporting single or multi-ray parallel beams.',
    defaultParams: {
      beamCount: 5,
      beamSpacing: 16,
      wavelength: 'green',
      power: 10,
    },
    paramSchema: [
      { id: 'beamCount', label: 'Rays Count', type: 'slider', min: 1, max: 7, step: 2, unit: 'rays' },
      { id: 'beamSpacing', label: 'Beam Spacing', type: 'slider', min: 8, max: 32, step: 2, unit: 'px' },
      {
        id: 'wavelength',
        label: 'Wavelength',
        type: 'select',
        options: [
          { label: 'Green (532 nm)', value: 'green' },
          { label: 'Red (650 nm)', value: 'red' },
          { label: 'Blue (450 nm)', value: 'blue' },
          { label: 'Amber (590 nm)', value: 'amber' },
          { label: 'White (Multi-spectrum)', value: 'white' },
        ],
      },
    ],
    formula: {
      name: "Photon Energy",
      equation: "E = hf = hc / λ",
      latex: "E = h\\nu = \\frac{hc}{\\lambda}",
      desc: "Energy of photons depends inversely on wavelength. Planck constant h = 6.626×10⁻³⁴ J·s.",
    },
  },
  {
    id: 'convex_lens',
    type: 'convex_lens',
    name: 'Convex Lens',
    category: 'Optics',
    tone: 'from-cyan-400 to-blue-600',
    description: 'Converging biconvex lens with adjustable focal length, curvature, and refractive index.',
    defaultParams: {
      focalLength: 160,
      curvature: 55,
      refractiveIndex: 1.52,
      lensHeight: 140,
    },
    paramSchema: [
      { id: 'focalLength', label: 'Focal Length (f)', type: 'slider', min: 60, max: 320, step: 10, unit: 'px' },
      { id: 'curvature', label: 'Curvature Radius (R)', type: 'slider', min: 20, max: 120, step: 5, unit: 'mm' },
      { id: 'refractiveIndex', label: 'Refractive Index (n)', type: 'slider', min: 1.2, max: 2.4, step: 0.02, unit: '' },
      { id: 'lensHeight', label: 'Aperture Height', type: 'slider', min: 80, max: 200, step: 10, unit: 'px' },
    ],
    formula: {
      name: "Lens Maker's Equation",
      equation: "1/f = (n - 1)(1/R₁ - 1/R₂)",
      latex: "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
      desc: "Relates focal length f to the refractive index n and radii of curvature R₁ and R₂.",
    },
  },
  {
    id: 'concave_lens',
    type: 'concave_lens',
    name: 'Concave Lens',
    category: 'Optics',
    tone: 'from-sky-400 to-indigo-600',
    description: 'Diverging biconcave lens forming virtual focal points.',
    defaultParams: {
      focalLength: 150,
      curvature: 50,
      refractiveIndex: 1.52,
      lensHeight: 140,
    },
    paramSchema: [
      { id: 'focalLength', label: 'Focal Length (|f|)', type: 'slider', min: 60, max: 320, step: 10, unit: 'px' },
      { id: 'curvature', label: 'Curvature Radius (R)', type: 'slider', min: 20, max: 120, step: 5, unit: 'mm' },
      { id: 'refractiveIndex', label: 'Refractive Index (n)', type: 'slider', min: 1.2, max: 2.4, step: 0.02, unit: '' },
      { id: 'lensHeight', label: 'Aperture Height', type: 'slider', min: 80, max: 200, step: 10, unit: 'px' },
    ],
    formula: {
      name: "Thin Lens Divergence Formula",
      equation: "1/f = 1/v - 1/u",
      latex: "\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}",
      desc: "For diverging lenses, focal length f is negative, creating an upright, diminished virtual image.",
    },
  },
  {
    id: 'prism',
    type: 'prism',
    name: 'Triangular Prism',
    category: 'Optics',
    tone: 'from-fuchsia-400 to-pink-600',
    description: 'Dispersive equilateral glass prism splitting white light into rainbow spectral bands.',
    defaultParams: {
      side: 110,
      refractiveIndex: 1.55,
    },
    paramSchema: [
      { id: 'side', label: 'Prism Side Length', type: 'slider', min: 70, max: 160, step: 10, unit: 'px' },
      { id: 'refractiveIndex', label: 'Refractive Index (n)', type: 'slider', min: 1.3, max: 2.2, step: 0.02, unit: '' },
    ],
    formula: {
      name: "Snell's Law of Refraction",
      equation: "n₁ sin(θ₁) = n₂ sin(θ₂)",
      latex: "n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2)",
      desc: "Light bends toward the normal in denser optical media, dispersing by wavelength according to Cauchy's law.",
    },
  },
  {
    id: 'mirror',
    type: 'mirror',
    name: 'Plane Mirror',
    category: 'Optics',
    tone: 'from-slate-400 to-slate-600',
    description: 'Reflective optical plane demonstrating specular reflection.',
    defaultParams: {
      length: 130,
    },
    paramSchema: [
      { id: 'length', label: 'Mirror Length', type: 'slider', min: 60, max: 220, step: 10, unit: 'px' },
    ],
    formula: {
      name: "Law of Reflection",
      equation: "θᵢ = θᵣ",
      latex: "\\theta_i = \\theta_r",
      desc: "Angle of incidence equals angle of reflection with respect to surface normal.",
    },
  },

  // ===================== MECHANICS =====================
  {
    id: 'pendulum',
    type: 'pendulum',
    name: 'Simple Pendulum',
    category: 'Mechanics',
    tone: 'from-emerald-400 to-teal-600',
    description: 'Suspended oscillating mass executing harmonic motion.',
    defaultParams: {
      length: 180,
      mass: 1.2,
      theta0: 35,
    },
    paramSchema: [
      { id: 'length', label: 'String Length (L)', type: 'slider', min: 80, max: 260, step: 10, unit: 'cm' },
      { id: 'mass', label: 'Bob Mass (m)', type: 'slider', min: 0.2, max: 5.0, step: 0.2, unit: 'kg' },
      { id: 'theta0', label: 'Initial Release Angle', type: 'slider', min: 5, max: 65, step: 5, unit: '°' },
    ],
    formula: {
      name: "Pendulum Period",
      equation: "T = 2π √(L / g)",
      latex: "T = 2\\pi \\sqrt{\\frac{L}{g}}",
      desc: "Oscillation period depends solely on string length and local gravitational acceleration.",
    },
  },
  {
    id: 'projectile',
    type: 'projectile',
    name: 'Projectile Launcher',
    category: 'Mechanics',
    tone: 'from-orange-400 to-red-600',
    description: 'Cannon firing ballistics with parabolic trajectory telemetry.',
    defaultParams: {
      speed: 25,
      angle: 45,
      mass: 2.0,
    },
    paramSchema: [
      { id: 'speed', label: 'Muzzle Speed (v₀)', type: 'slider', min: 10, max: 60, step: 2, unit: 'm/s' },
      { id: 'angle', label: 'Launch Angle (θ)', type: 'slider', min: 10, max: 85, step: 5, unit: '°' },
      { id: 'mass', label: 'Shell Mass (m)', type: 'slider', min: 0.5, max: 10, step: 0.5, unit: 'kg' },
    ],
    formula: {
      name: "Horizontal Projectile Range",
      equation: "R = (v₀² sin(2θ)) / g",
      latex: "R = \\frac{v_0^2 \\sin(2\\theta)}{g}",
      desc: "Maximum horizontal distance covered in vacuum; optimal launch angle is 45°.",
    },
  },
  {
    id: 'ramp',
    type: 'ramp',
    name: 'Inclined Plane (Ramp)',
    category: 'Mechanics',
    tone: 'from-amber-400 to-orange-600',
    description: 'Slanted surface with customizable angle and coefficient of friction.',
    defaultParams: {
      angle: 30,
      friction: 0.15,
      mass: 2.0,
    },
    paramSchema: [
      { id: 'angle', label: 'Incline Angle (α)', type: 'slider', min: 5, max: 65, step: 5, unit: '°' },
      { id: 'friction', label: 'Friction Coeff (μ)', type: 'slider', min: 0, max: 0.8, step: 0.05, unit: '' },
      { id: 'mass', label: 'Block Mass (m)', type: 'slider', min: 0.5, max: 8, step: 0.5, unit: 'kg' },
    ],
    formula: {
      name: "Incline Net Acceleration",
      equation: "a = g (sin θ - μ cos θ)",
      latex: "a = g(\\sin\\theta - \\mu\\cos\\theta)",
      desc: "Acceleration down the slope is reduced by kinetic friction opposing motion.",
    },
  },
  {
    id: 'spring',
    type: 'spring',
    name: 'Spring & Mass',
    category: 'Mechanics',
    tone: 'from-lime-400 to-emerald-600',
    description: 'Hookean spring oscillator showing harmonic restoration.',
    defaultParams: {
      springConstant: 35,
      mass: 1.5,
      displacement: 40,
    },
    paramSchema: [
      { id: 'springConstant', label: 'Spring Constant (k)', type: 'slider', min: 10, max: 100, step: 5, unit: 'N/m' },
      { id: 'mass', label: 'Attached Mass (m)', type: 'slider', min: 0.2, max: 5.0, step: 0.2, unit: 'kg' },
      { id: 'displacement', label: 'Stretch (x)', type: 'slider', min: 10, max: 70, step: 5, unit: 'cm' },
    ],
    formula: {
      name: "Hooke's Law & Period",
      equation: "F = -kx | T = 2π √(m / k)",
      latex: "F = -kx, \\quad T = 2\\pi \\sqrt{\\frac{m}{k}}",
      desc: "Restoring force is linearly proportional to displacement from equilibrium.",
    },
  },
  {
    id: 'pulley',
    type: 'pulley',
    name: 'Pulley System',
    category: 'Mechanics',
    tone: 'from-slate-400 to-zinc-700',
    description: 'Atwood machine & block-and-tackle mechanical advantage.',
    defaultParams: {
      mass1: 2.0,
      mass2: 3.5,
      efficiency: 0.95,
    },
    paramSchema: [
      { id: 'mass1', label: 'Load Mass m₁', type: 'slider', min: 0.5, max: 10, step: 0.5, unit: 'kg' },
      { id: 'mass2', label: 'Effort Mass m₂', type: 'slider', min: 0.5, max: 10, step: 0.5, unit: 'kg' },
    ],
    formula: {
      name: "Atwood Acceleration",
      equation: "a = g (m₂ - m₁) / (m₁ + m₂)",
      latex: "a = g \\frac{m_2 - m_1}{m_1 + m_2}",
      desc: "Unbalanced gravitational force drives uniform system acceleration.",
    },
  },
  {
    id: 'buoyancy',
    type: 'buoyancy',
    name: 'Buoyancy Tank',
    category: 'Mechanics',
    tone: 'from-blue-400 to-sky-600',
    description: "Archimedes' principle: upthrust equal to weight of displaced fluid.",
    defaultParams: {
      fluidDensity: 1000,
      objectVolume: 0.002,
      objectDensity: 800,
    },
    paramSchema: [
      { id: 'fluidDensity', label: 'Fluid Density (ρ)', type: 'slider', min: 700, max: 1400, step: 50, unit: 'kg/m³' },
      { id: 'objectDensity', label: 'Solid Density (ρₛ)', type: 'slider', min: 300, max: 2500, step: 50, unit: 'kg/m³' },
    ],
    formula: {
      name: "Archimedes' Upthrust",
      equation: "F_b = ρ_fluid · V · g",
      latex: "F_b = \\rho_{fluid} V g",
      desc: "An immersed body experiences an upward buoyant force equal to displaced fluid weight.",
    },
  },

  // ===================== MEASUREMENT =====================
  {
    id: 'vernier',
    type: 'vernier',
    name: 'Vernier Calipers',
    category: 'Measurement',
    tone: 'from-violet-400 to-purple-600',
    description: 'High-precision dual scale caliper for internal and external dimensions.',
    defaultParams: {
      measuredWidth: 24.6,
      leastCount: 0.1,
    },
    paramSchema: [
      { id: 'measuredWidth', label: 'Jaws Separation', type: 'slider', min: 0, max: 80, step: 0.1, unit: 'mm' },
    ],
    formula: {
      name: "Vernier Reading Formula",
      equation: "Total = MSR + (VSR × LC)",
      latex: "\\text{Reading} = \\text{MSR} + (\\text{VSR} \\times \\text{LC})",
      desc: "Main Scale Reading plus Vernier Scale Reading multiplied by instrument Least Count.",
    },
  },
  {
    id: 'screw_gauge',
    type: 'screw_gauge',
    name: 'Screw Gauge',
    category: 'Measurement',
    tone: 'from-indigo-400 to-slate-600',
    description: 'Micrometer screw gauge for fine wire diameters and thin plates.',
    defaultParams: {
      pitch: 1.0,
      circularDivisions: 100,
      reading: 3.42,
    },
    paramSchema: [
      { id: 'reading', label: 'Thimble Spindle Gap', type: 'slider', min: 0, max: 15, step: 0.01, unit: 'mm' },
    ],
    formula: {
      name: "Micrometer Least Count",
      equation: "LC = Pitch / Total Divisions",
      latex: "\\text{LC} = \\frac{\\text{Pitch}}{\\text{Total Circular Divisions}}",
      desc: "Measures dimensions down to 0.01 mm precision with ratchet stop.",
    },
  },

  // ===================== WAVES & SOUND =====================
  {
    id: 'wave_gen',
    type: 'wave',
    name: 'Wave / Ripple Source',
    category: 'Waves & Sound',
    tone: 'from-teal-400 to-emerald-600',
    description: 'Oscillating ripple dipper generating 2D concentric wave fronts.',
    defaultParams: {
      frequency: 4,
      amplitude: 20,
      wavelength: 40,
    },
    paramSchema: [
      { id: 'frequency', label: 'Wave Frequency (f)', type: 'slider', min: 1, max: 15, step: 1, unit: 'Hz' },
      { id: 'amplitude', label: 'Wave Amplitude (A)', type: 'slider', min: 5, max: 50, step: 5, unit: 'px' },
    ],
    formula: {
      name: "Wave Velocity Equation",
      equation: "v = f · λ",
      latex: "v = f \\lambda",
      desc: "Speed of propagation equals the product of frequency and wavelength.",
    },
  },
  {
    id: 'doppler',
    type: 'doppler',
    name: 'Doppler Sound Source',
    category: 'Waves & Sound',
    tone: 'from-cyan-400 to-sky-600',
    description: 'Moving acoustic source demonstrating apparent pitch frequency shift.',
    defaultParams: {
      sourceSpeed: 80,
      baseFrequency: 440,
    },
    paramSchema: [
      { id: 'sourceSpeed', label: 'Source Speed (vₛ)', type: 'slider', min: 0, max: 200, step: 10, unit: 'm/s' },
    ],
    formula: {
      name: "Doppler Shift Equation",
      equation: "f' = f₀ · [v / (v ∓ vₛ)]",
      latex: "f' = f_0 \\left(\\frac{v}{v \\mp v_s}\\right)",
      desc: "Observed frequency increases as the emitter approaches and drops as it recedes.",
    },
  },

  // ===================== HEAT & THERMODYNAMICS =====================
  {
    id: 'gas_cylinder',
    type: 'gas_cylinder',
    name: 'Ideal Gas Cylinder',
    category: 'Heat & Thermo',
    tone: 'from-rose-400 to-amber-600',
    description: 'Movable piston containing gas particles showing Boyle & Charles law.',
    defaultParams: {
      temperatureK: 300,
      volumeL: 5.0,
      moles: 1.0,
    },
    paramSchema: [
      { id: 'temperatureK', label: 'Temperature (T)', type: 'slider', min: 150, max: 600, step: 10, unit: 'K' },
      { id: 'volumeL', label: 'Volume (V)', type: 'slider', min: 1, max: 10, step: 0.5, unit: 'L' },
    ],
    formula: {
      name: "Ideal Gas Law",
      equation: "P · V = n · R · T",
      latex: "PV = nRT",
      desc: "Universal gas law relating pressure, volume, temperature, and amount of substance.",
    },
  },

  // ===================== ELECTRICITY & MAGNETISM =====================
  {
    id: 'circuit_dc',
    type: 'circuit_dc',
    name: 'DC Circuit / Resistor',
    category: 'Electricity & Mag',
    tone: 'from-amber-400 to-yellow-600',
    description: 'Variable DC voltage source connected to ohmic resistor and ammeter.',
    defaultParams: {
      voltage: 12,
      resistance: 4.0,
    },
    paramSchema: [
      { id: 'voltage', label: 'EMF Voltage (V)', type: 'slider', min: 1, max: 48, step: 1, unit: 'V' },
      { id: 'resistance', label: 'Resistance (R)', type: 'slider', min: 1, max: 50, step: 1, unit: 'Ω' },
    ],
    formula: {
      name: "Ohm's Law & Power",
      equation: "V = I · R | P = V · I",
      latex: "V = IR, \\quad P = VI = I^2 R",
      desc: "Current flowing through a conductor is directly proportional to potential difference.",
    },
  },
  {
    id: 'magnet',
    type: 'magnet',
    name: 'Bar Magnet',
    category: 'Electricity & Mag',
    tone: 'from-red-500 to-blue-600',
    description: 'Dipole magnet displaying magnetic vector field lines.',
    defaultParams: {
      fieldStrength: 50,
    },
    paramSchema: [
      { id: 'fieldStrength', label: 'Field Strength (B)', type: 'slider', min: 10, max: 100, step: 5, unit: 'mT' },
    ],
    formula: {
      name: "Lorentz Force",
      equation: "F = q (E + v × B)",
      latex: "\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B})",
      desc: "Total electromagnetic force on a charge moving through electric and magnetic fields.",
    },
  },

  // ===================== MODERN PHYSICS =====================
  {
    id: 'photoelectric',
    type: 'photoelectric',
    name: 'Photoelectric Plate',
    category: 'Modern Physics',
    tone: 'from-purple-400 to-pink-600',
    description: 'UV radiation dislodging photoelectrons above threshold work function.',
    defaultParams: {
      workFunctionEv: 2.28, // Sodium
      photonEnergyEv: 3.5,
    },
    paramSchema: [
      { id: 'photonEnergyEv', label: 'Photon Energy (hν)', type: 'slider', min: 1.0, max: 6.0, step: 0.1, unit: 'eV' },
      { id: 'workFunctionEv', label: 'Work Function (Φ)', type: 'slider', min: 1.5, max: 5.0, step: 0.1, unit: 'eV' },
    ],
    formula: {
      name: "Einstein's Photoelectric Law",
      equation: "K_max = hν - Φ = e · V₀",
      latex: "K_{max} = h\\nu - \\Phi = eV_0",
      desc: "Maximum kinetic energy of ejected electrons equals photon energy minus work function.",
    },
  },
];

// ===================== PRE-BUILT EXPERIMENTS =====================
export const PRESET_EXPERIMENTS = [
  {
    id: 'convex-focus',
    title: 'Convex Lens Focal Convergence',
    category: 'Optics',
    badge: 'Optics Priority',
    desc: '5 parallel laser rays refracting through a biconvex lens and converging exactly at the focal point.',
    components: [
      {
        id: 'laser-1',
        type: 'laser',
        x: 180,
        y: 350,
        rotation: 0,
        params: { beamCount: 5, beamSpacing: 18, wavelength: 'green', power: 10 },
      },
      {
        id: 'lens-1',
        type: 'convex_lens',
        x: 480,
        y: 350,
        rotation: 0,
        params: { focalLength: 170, curvature: 55, refractiveIndex: 1.52, lensHeight: 160 },
      },
    ],
  },
  {
    id: 'concave-diverge',
    title: 'Concave Lens Ray Divergence',
    category: 'Optics',
    badge: 'Optics',
    desc: 'Parallel light rays spreading outward with a virtual focal point behind the lens.',
    components: [
      {
        id: 'laser-2',
        type: 'laser',
        x: 180,
        y: 350,
        rotation: 0,
        params: { beamCount: 5, beamSpacing: 16, wavelength: 'blue', power: 10 },
      },
      {
        id: 'lens-2',
        type: 'concave_lens',
        x: 480,
        y: 350,
        rotation: 0,
        params: { focalLength: 140, curvature: 45, refractiveIndex: 1.52, lensHeight: 160 },
      },
    ],
  },
  {
    id: 'prism-dispersion',
    title: "Newton's Prism Dispersion",
    category: 'Optics',
    badge: 'Spectroscopy',
    desc: 'White laser beam splitting into distinct rainbow colors via Cauchy wavelength dispersion.',
    components: [
      {
        id: 'laser-3',
        type: 'laser',
        x: 160,
        y: 320,
        rotation: 12,
        params: { beamCount: 1, wavelength: 'white', power: 12 },
      },
      {
        id: 'prism-1',
        type: 'prism',
        x: 460,
        y: 340,
        rotation: 15,
        params: { side: 130, refractiveIndex: 1.62 },
      },
    ],
  },
  {
    id: 'pendulum-harmonic',
    title: 'Simple Harmonic Pendulum',
    category: 'Mechanics',
    badge: 'Kinematics',
    desc: 'Oscillating mass executing nonlinear harmonic motion with real-time velocity & energy conservation.',
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
    id: 'projectile-range',
    title: 'Ballistic Projectile Trajectory',
    category: 'Mechanics',
    badge: 'Dynamics',
    desc: 'Parabolic trajectory arc with real-time range, flight time, and kinetic energy readings.',
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
    id: 'ramp-friction',
    title: 'Inclined Plane & Friction',
    category: 'Mechanics',
    badge: 'Forces',
    desc: 'Block sliding down an inclined plane with component vectors of gravity and friction.',
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
];
