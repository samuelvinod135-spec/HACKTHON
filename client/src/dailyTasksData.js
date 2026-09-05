// Progressive Day-by-Day Task-Based Experiment Catalog
// Replaces static MCQs with authentic interactive lab investigations.

export const DAILY_TASKS = [
  {
    day: 1,
    id: 'day-1-snell',
    title: "Day 1 Task: Simulate Snell's Law with a Convex Lens",
    category: 'Optics',
    track: 'Optics',
    difficulty: 'Foundational',
    xpReward: 100,
    goal: 'Align a 5-ray green laser source through a biconvex lens and observe exact focal convergence.',
    description:
      'Set up an optical bench with a multi-beam laser ray box and a biconvex lens. Adjust the lens curvature and focal length so that the 5 parallel rays converge sharply onto the focal point F₂.',
    targetCondition: {
      component: 'convex_lens',
      property: 'focalLength',
      min: 150,
      max: 180,
      targetDesc: 'Set focal length f between 150px and 180px with active laser rays converging.',
    },
    formula: {
      name: "Lens Maker's Equation",
      equation: "1/f = (n - 1)(1/R₁ - 1/R₂)",
      explanation:
        'Refraction across both curved glass surfaces bends parallel rays towards the optical center line, converging at distance f.',
    },
    presetId: 'convex-focus',
    steps: [
      'Position the Laser Ray Box on the left of the canvas.',
      'Drop a Convex Lens in the path of the rays.',
      'Adjust the Focal Length slider to ~170px in the Lens Controls popover.',
      'Verify that all 5 rays cross at the focal point.',
    ],
  },
  {
    day: 2,
    id: 'day-2-pendulum',
    title: 'Day 2 Task: Calibrate a Harmonic Pendulum',
    category: 'Mechanics',
    track: 'Mechanics',
    difficulty: 'Foundational',
    xpReward: 100,
    goal: 'Construct a pendulum of string length 1.9m and verify that its period matches the theoretical T = 2.77s.',
    targetCondition: {
      component: 'pendulum',
      property: 'length',
      min: 180,
      max: 200,
      targetDesc: 'Set string length to ~190cm and run simulation under Earth gravity (9.8 m/s²).',
    },
    formula: {
      name: 'Pendulum Period Law',
      equation: 'T = 2π √(L / g)',
      explanation:
        'The period of a simple pendulum is strictly independent of the mass of the bob and depends only on string length and gravitational acceleration.',
    },
    presetId: 'pendulum-harmonic',
    steps: [
      'Drop the Simple Pendulum onto the center of the canvas.',
      'Adjust string length to 190 cm using the inspector.',
      'Click "Start Sim" and monitor the Live Readings telemetry.',
      'Observe the periodic velocity and kinetic/potential energy oscillation.',
    ],
  },
  {
    day: 3,
    id: 'day-3-prism',
    title: "Day 3 Task: Split White Light with Newton's Prism",
    category: 'Optics',
    track: 'Optics',
    difficulty: 'Intermediate',
    xpReward: 120,
    goal: 'Demonstrate chromatic dispersion by directing a white light beam through a triangular glass prism.',
    targetCondition: {
      component: 'prism',
      property: 'refractiveIndex',
      min: 1.5,
      max: 1.7,
      targetDesc: 'Direct white laser through prism (n ≥ 1.55) to trigger Cauchy dispersion.',
    },
    formula: {
      name: "Cauchy's Dispersion Formula",
      equation: 'n(λ) = n₀ + B / λ²',
      explanation:
        'Shorter wavelengths (violet/blue) experience a higher refractive index than longer wavelengths (red), bending through larger angles.',
    },
    presetId: 'prism-dispersion',
    steps: [
      'Select a Laser Ray Box and set wavelength to "White (Multi-spectrum)".',
      'Position an Equilateral Triangular Prism at an angle to the beam.',
      'Observe the emergence of the 7-color rainbow spectrum (ROYGBIV).',
      'Verify that violet rays deviate more than red rays.',
    ],
  },
  {
    day: 4,
    id: 'day-4-projectile',
    title: 'Day 4 Task: Optimize Ballistic Projectile Range',
    category: 'Mechanics',
    track: 'Mechanics',
    difficulty: 'Intermediate',
    xpReward: 120,
    goal: 'Configure a projectile cannon at the optimal 45° launch angle to reach an 80m target distance.',
    targetCondition: {
      component: 'projectile',
      property: 'angle',
      min: 44,
      max: 46,
      targetDesc: 'Set muzzle velocity to 28 m/s at 45° launch angle.',
    },
    formula: {
      name: 'Horizontal Range Equation',
      equation: 'R = (v₀² sin 2θ) / g',
      explanation:
        'Maximum range on level ground occurs at θ = 45° because sin(2 × 45°) = sin(90°) = 1.',
    },
    presetId: 'projectile-range',
    steps: [
      'Place the Projectile Launcher in the lower left canvas.',
      'Set launch angle to 45° and muzzle speed to 28 m/s.',
      'Start simulation and inspect the parabolic trajectory in the telemetry stream.',
      'Confirm maximum horizontal range reaches 80 meters.',
    ],
  },
  {
    day: 5,
    id: 'day-5-spring',
    title: "Day 5 Task: Balance Hooke's Elastic Equilibrium",
    category: 'Mechanics',
    track: 'Mechanics',
    difficulty: 'Intermediate',
    xpReward: 130,
    goal: 'Test spring-mass harmonic oscillation and calculate the restoring force constant k = 35 N/m.',
    targetCondition: {
      component: 'spring',
      property: 'springConstant',
      min: 30,
      max: 40,
      targetDesc: 'Attach a 1.5kg mass to a spring with k=35 N/m and observe oscillation.',
    },
    formula: {
      name: "Hooke's Law & Natural Period",
      equation: 'F = -kx | T = 2π √(m / k)',
      explanation:
        'Restoring force is linear with stretch. The oscillation period is inversely proportional to spring stiffness.',
    },
    presetId: null,
    steps: [
      'Drag the Spring & Mass component from the palette to the canvas.',
      'Set Spring Constant to 35 N/m and mass to 1.5 kg.',
      'Start simulation and observe harmonic motion at ~0.77 Hz.',
      'Check mechanical energy conservation in the live readings panel.',
    ],
  },
  {
    day: 6,
    id: 'day-6-ramp',
    title: 'Day 6 Task: Calculate Critical Friction on an Incline',
    category: 'Mechanics',
    track: 'Mechanics',
    difficulty: 'Advanced',
    xpReward: 140,
    goal: 'Determine the angle of repose and calculate net acceleration on a slanted ramp with friction.',
    targetCondition: {
      component: 'ramp',
      property: 'angle',
      min: 25,
      max: 35,
      targetDesc: 'Set incline angle to 30° with friction coefficient μ = 0.18.',
    },
    formula: {
      name: 'Inclined Plane Dynamics',
      equation: 'a = g (sin θ - μ cos θ)',
      explanation:
        'Gravitational component parallel to the slope drives motion, opposed by kinetic friction fk = μ mg cos θ.',
    },
    presetId: 'ramp-friction',
    steps: [
      'Drop the Inclined Plane (Ramp) component onto the canvas.',
      'Set incline angle to 30° and friction coefficient to 0.18.',
      'Start simulation and record the net downhill acceleration of 3.38 m/s².',
      'Test reducing angle below 10.2° to observe static equilibrium where a = 0.',
    ],
  },
  {
    day: 7,
    id: 'day-7-concave',
    title: 'Day 7 Task: Map Virtual Focus with a Concave Lens',
    category: 'Optics',
    track: 'Optics',
    difficulty: 'Advanced',
    xpReward: 150,
    goal: 'Verify negative focal length divergence using a biconcave lens and trace virtual rays back to -140px.',
    targetCondition: {
      component: 'concave_lens',
      property: 'focalLength',
      min: 130,
      max: 150,
      targetDesc: 'Set concave lens focal length to |f| = 140px with blue laser rays.',
    },
    formula: {
      name: 'Diverging Lens Equation',
      equation: '1/f = 1/v - 1/u (where f < 0)',
      explanation:
        'A concave lens causes parallel incident light rays to diverge outwards as if originating from a virtual focus point behind the lens.',
    },
    presetId: 'concave-diverge',
    steps: [
      'Place a Laser Ray Box set to blue wavelength.',
      'Add a Concave Lens in the ray path.',
      'Click the lens to open the Lens Controls and set focal length to 140px.',
      'Verify that rays spread outward symmetrically from the virtual focus at -F₁.',
    ],
  },
];

// Helper to filter tasks by student level or track
export function getRecommendedTasks(studentLevel = 1, selectedTrack = 'All') {
  return DAILY_TASKS.filter((task) => {
    const matchesTrack = selectedTrack === 'All' || task.track === selectedTrack;
    return matchesTrack;
  });
}
