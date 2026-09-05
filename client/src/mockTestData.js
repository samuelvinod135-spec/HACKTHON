// Adaptive Mock Test Engine Data
// 10-question comprehensive diagnostic test, concept prediction bank, micro-lessons,
// and dynamically generated 5-question remedial practice sets.

export const CONCEPTS = {
  snell_refraction: {
    id: 'snell_refraction',
    name: "Snell's Law & Refraction Across Media",
    category: 'Optics',
    formula: 'n₁ sin(θ₁) = n₂ sin(θ₂)',
    coreIdea:
      'When light travels from an optically rarer medium (lower n₁) to a denser medium (higher n₂), its wave velocity decreases and the ray bends TOWARDS the surface normal. Conversely, entering a rarer medium causes light to bend AWAY from the normal.',
    memoryRule: 'Rarer to Denser → Bends TOWARDS Normal (RAD-T). Denser to Rarer → Bends AWAY from Normal (DAR-A).',
    commonPitfall:
      'Measuring angles from the interface boundary instead of the surface normal perpendicular line, or confusing refractive index with mass density.',
    remedialPool: [
      {
        q: 'A ray of light enters crown glass (n = 1.52) from air (n = 1.00) at an incident angle of 45°. What happens to the ray?',
        options: [
          'It bends towards the normal line (θ₂ < 45°)',
          'It bends away from the normal line (θ₂ > 45°)',
          'It continues straight without any angular deviation',
          'It undergoes total internal reflection back into air',
        ],
        answer: 0,
        explanation: 'Because glass is optically denser than air (1.52 > 1.00), light slows down and refracts towards the normal (θ₂ = 27.7° < 45°).',
      },
      {
        q: 'If the refractive index of water is 1.33 and that of diamond is 2.42, in which medium does light travel faster?',
        options: [
          'Diamond, because of its crystal lattice',
          'Water, because speed v = c / n is higher for lower n',
          'Both media have identical speed of light',
          'Speed depends on beam intensity, not refractive index',
        ],
        answer: 1,
        explanation: 'Wave velocity in a medium is v = c / n. Since water has a smaller n (1.33 < 2.42), light propagates significantly faster in water.',
      },
      {
        q: 'What is the critical angle condition for Total Internal Reflection (TIR)?',
        options: [
          'Light must travel from a denser medium to a rarer medium with θ₁ > θc',
          'Light must travel from a rarer medium to a denser medium at 90°',
          'Light must strike a plane silvered mirror at 0° incidence',
          'Both media must have identical refractive indices',
        ],
        answer: 0,
        explanation: 'TIR only occurs when light attempts to cross from a denser medium into a rarer medium at an angle of incidence greater than the critical angle θc = arcsin(n₂/n₁).',
      },
      {
        q: 'A ray strikes glass perpendicular to the surface (angle of incidence θ₁ = 0° with the normal). What is the angle of refraction?',
        options: [
          '90°',
          '45°',
          '0°',
          'Depends on the glass thickness',
        ],
        answer: 2,
        explanation: 'By Snell\'s law: n₁ sin(0°) = n₂ sin(θ₂) → sin(θ₂) = 0 → θ₂ = 0°. Normal incident rays pass through without changing direction.',
      },
      {
        q: 'If the angle of incidence in medium 1 is 30° and the refracted angle in medium 2 is 15°, what is the relative index n₂ / n₁?',
        options: [
          'sin(30°) / sin(15°) ≈ 1.93',
          'sin(15°) / sin(30°) = 0.518',
          '30 / 15 = 2.00',
          '15 / 30 = 0.50',
        ],
        answer: 0,
        explanation: 'From n₁ sin θ₁ = n₂ sin θ₂, the ratio n₂ / n₁ = sin θ₁ / sin θ₂ = sin(30°) / sin(15°) = 0.5 / 0.2588 ≈ 1.93.',
      },
      {
        q: 'Why do swimming pools appear shallower than they actually are when viewed from above?',
        options: [
          'Diffraction around the edges of the pool',
          'Light rays from the bottom refract AWAY from the normal as they exit water into air',
          'Total internal reflection off the pool tiles',
          'Dispersion of blue wavelengths in water',
        ],
        answer: 1,
        explanation: 'Light rays coming from the bottom bend away from the normal upon exiting into air, so their back-projections form a virtual image higher up (apparent depth = real depth / n).',
      },
    ],
  },

  lens_maker: {
    id: 'lens_maker',
    name: "Lens Maker's Equation & Power of Lenses",
    category: 'Optics',
    formula: '1/f = (n - 1)(1/R₁ - 1/R₂) | P = 1/f',
    coreIdea:
      'A convex (converging) lens has positive focal length (f > 0) and positive optical power in diopters. A concave (diverging) lens has negative focal length (f < 0). Increasing surface curvature (smaller radius R) increases optical power and shortens focal length.',
    memoryRule: 'Sharper curve (smaller R) = Stronger bending = Shorter focal length f.',
    commonPitfall:
      'Confusing radius of curvature R with focal length f. For a symmetric biconvex glass lens (n ≈ 1.5), f is approximately equal to R.',
    remedialPool: [
      {
        q: 'A biconvex glass lens has focal length f = +0.25 m. What is its optical power?',
        options: [
          '+4.0 Diopters (D)',
          '-4.0 Diopters (D)',
          '+0.25 Diopters (D)',
          '+2.5 Diopters (D)',
        ],
        answer: 0,
        explanation: 'Optical power P = 1 / f(in meters) = 1 / 0.25 = +4.0 D.',
      },
      {
        q: 'If a symmetric biconvex lens with R = 20 cm is made of glass (n = 1.5), what is its focal length?',
        options: [
          '10 cm',
          '20 cm',
          '40 cm',
          '5 cm',
        ],
        answer: 1,
        explanation: 'By lens maker: 1/f = (1.5 - 1)(1/20 - (-1/20)) = 0.5 * (2/20) = 1/20 → f = 20 cm.',
      },
      {
        q: 'When a convex glass lens (n = 1.5) is immersed in water (n = 1.33), what happens to its focal length?',
        options: [
          'It increases (lens becomes weaker)',
          'It decreases (lens becomes stronger)',
          'It remains completely unchanged',
          'It turns into a diverging lens',
        ],
        answer: 0,
        explanation: 'Because the relative index (nglass/nwater - 1) = (1.5/1.33 - 1) ≈ 0.128 is much smaller than in air (1.5 - 1 = 0.5), light bends less and the focal length increases roughly 4-fold.',
      },
      {
        q: 'What type of image is formed by a concave (diverging) lens for a real object?',
        options: [
          'Always virtual, erect, and diminished',
          'Always real, inverted, and magnified',
          'Real or virtual depending on object distance',
          'Inverted and enlarged at infinity',
        ],
        answer: 0,
        explanation: 'A diverging lens always diverges incoming rays, meaning rays never physically converge. Traced backwards, they form a virtual, upright, diminished image between the lens and the focal point.',
      },
      {
        q: 'If two thin lenses of focal lengths f₁ = +20 cm and f₂ = -50 cm are placed in contact, what is the combined focal length?',
        options: [
          '+33.3 cm',
          '-30.0 cm',
          '+70.0 cm',
          '+10.0 cm',
        ],
        answer: 0,
        explanation: 'Combined power P = P₁ + P₂ → 1/F = 1/f₁ + 1/f₂ = 1/20 - 1/50 = (5 - 2)/100 = 3/100 → F = 100/3 ≈ +33.3 cm.',
      },
    ],
  },

  pendulum_dynamics: {
    id: 'pendulum_dynamics',
    name: 'Simple Pendulum Harmonic Motion & Gravity',
    category: 'Mechanics',
    formula: 'T = 2π √(L / g)',
    coreIdea:
      'The period of a simple pendulum depends strictly on the length of the suspension cord L and the local gravitational acceleration g. It is INDEPENDENT of the mass of the bob and independent of amplitude for small oscillations (θ < 15°).',
    memoryRule: 'Longer string = Slower swing (longer T). Heavier bob = NO change in T!',
    commonPitfall:
      'Thinking a heavier bob swings faster or slower. Gravity accelerates all masses equally in free fall ($g = F/m$).',
    remedialPool: [
      {
        q: 'If you quadruple the mass of a pendulum bob from 1 kg to 4 kg, what happens to its period of oscillation?',
        options: [
          'The period remains completely unchanged',
          'The period doubles',
          'The period is halved',
          'The period quadruples',
        ],
        answer: 0,
        explanation: 'Period T = 2π√(L/g) does not contain mass m. Gravitational restoring force and inertia both scale with mass, cancelling out perfectly.',
      },
      {
        q: 'To double the period of a pendulum, how must you alter the length of the string?',
        options: [
          'Increase length by a factor of 4',
          'Increase length by a factor of 2',
          'Decrease length by a factor of 2',
          'Increase length by a factor of 8',
        ],
        answer: 0,
        explanation: 'Since T ∝ √L, doubling T requires quadrupling L: T\' = 2π√(4L/g) = 2 · (2π√(L/g)) = 2T.',
      },
      {
        q: 'A pendulum clock calibrated on Earth (g = 9.8 m/s²) is transported to the Moon (g = 1.6 m/s²). How does it behave?',
        options: [
          'It runs slower (period is longer)',
          'It runs faster (period is shorter)',
          'It keeps the exact same time',
          'It stops oscillating completely',
        ],
        answer: 0,
        explanation: 'Because lunar gravity is lower (g = 1.6 < 9.8), T = 2π√(L/g) increases by √(9.8/1.6) ≈ 2.47 times, making each tick slower.',
      },
      {
        q: 'At what point in its swing does a pendulum bob achieve maximum kinetic energy?',
        options: [
          'At the lowest point (equilibrium position)',
          'At the extreme amplitude peaks',
          'Halfway between equilibrium and peak',
          'Kinetic energy remains constant throughout',
        ],
        answer: 0,
        explanation: 'At the lowest point, potential energy is at its minimum, so by conservation of mechanical energy (E = Ek + Ep), kinetic energy and velocity reach their maximum.',
      },
      {
        q: 'What is the length of a "seconds pendulum" (a pendulum with period T = 2.0 seconds) on Earth where g = 9.81 m/s²?',
        options: [
          '~0.994 meters (approx. 1 meter)',
          '~0.497 meters',
          '~2.000 meters',
          '~0.250 meters',
        ],
        answer: 0,
        explanation: 'T = 2π√(L/g) → 2.0 = 2π√(L/9.81) → 1 = π² L / 9.81 → L = 9.81 / π² ≈ 0.994 m.',
      },
    ],
  },

  projectile_motion: {
    id: 'projectile_motion',
    name: 'Ballistic Projectile Trajectory & Parabolic Range',
    category: 'Mechanics',
    formula: 'R = (v₀² sin 2θ) / g | H = (v₀ sin θ)² / (2g)',
    coreIdea:
      'Projectile motion is a combination of constant horizontal velocity (ax = 0) and constant downward vertical gravitational acceleration (ay = -g). Maximum horizontal range on level ground occurs at launch angle θ = 45°. Complementary angles (e.g., 30° and 60°) achieve the exact same range.',
    memoryRule: '45° gives MAX range. Angles that add to 90° (e.g. 30° & 60°) land at the SAME spot!',
    commonPitfall:
      'Thinking velocity at the apex is zero. At the highest point, vertical velocity vy = 0, but horizontal velocity vx = v0 cos θ is STILL active!',
    remedialPool: [
      {
        q: 'A cannon fires a shell at 40 m/s at an angle of 30°. What other angle produces the same horizontal range?',
        options: [
          '60° (complementary angle: 90° - 30°)',
          '45°',
          '15°',
          '75°',
        ],
        answer: 0,
        explanation: 'Range depends on sin(2θ). Since sin(2 × 30°) = sin(60°) and sin(2 × 60°) = sin(120°) = sin(60°), complementary angles (θ and 90° - θ) yield identical ranges.',
      },
      {
        q: 'What is the speed of a projectile at the apex (highest point) of its flight if launched with speed v₀ at angle θ?',
        options: [
          'v₀ cos(θ)',
          'Zero',
          'v₀',
          'v₀ sin(θ)',
        ],
        answer: 0,
        explanation: 'At the top of the trajectory, vertical velocity vy = 0, but horizontal velocity is unaffected by gravity and remains vx = v₀ cos(θ).',
      },
      {
        q: 'If launch velocity is doubled from 20 m/s to 40 m/s at the same launch angle, what happens to the maximum range?',
        options: [
          'It quadruples (4x larger)',
          'It doubles (2x larger)',
          'It stays the same',
          'It increases by √2',
        ],
        answer: 0,
        explanation: 'Range formula R = v₀² sin(2θ) / g is proportional to the square of initial speed v₀². Doubling v₀ multiplies range by 2² = 4.',
      },
      {
        q: 'During flight in a vacuum, what is the acceleration of the projectile at its highest point?',
        options: [
          '9.8 m/s² directed downwards',
          '0 m/s²',
          '9.8 m/s² directed horizontally',
          'Depends on the mass of the projectile',
        ],
        answer: 0,
        explanation: 'Gravity acts continuously throughout the entire flight. Acceleration is constant at g = 9.8 m/s² downwards at all points, including the apex.',
      },
      {
        q: 'Two balls are launched horizontally from the same cliff edge at the same instant: Ball A at 10 m/s and Ball B at 30 m/s. Which hits the ground first?',
        options: [
          'Both hit the ground at the exact same time',
          'Ball A hits first because it travels less distance',
          'Ball B hits first because of greater momentum',
          'Depends on their relative masses',
        ],
        answer: 0,
        explanation: 'Vertical motion is completely independent of horizontal motion. Both start with zero initial vertical velocity (vy0 = 0) and fall under the same acceleration g through the same vertical height h, so t = √(2h/g) is identical.',
      },
    ],
  },

  hooke_elasticity: {
    id: 'hooke_elasticity',
    name: "Hooke's Law & Spring-Mass Dynamics",
    category: 'Mechanics',
    formula: 'F = -kx | T = 2π √(m / k)',
    coreIdea:
      'The restoring force exerted by an elastic spring is directly proportional to displacement x from equilibrium but in the opposite direction. Stiffer springs (higher k) produce faster oscillations (shorter period T).',
    memoryRule: 'Stiff spring (big k) = Snappy vibration (short T). Heavy mass (big m) = Sluggish vibration (long T).',
    commonPitfall:
      'Forgetting the negative sign in F = -kx, which signifies that the force always acts towards the equilibrium position.',
    remedialPool: [
      {
        q: 'A 2 kg mass hangs from a spring with spring constant k = 200 N/m. How much does the spring stretch in equilibrium (g = 10 m/s²)?',
        options: [
          '0.10 m (10 cm)',
          '0.01 m (1 cm)',
          '1.00 m (100 cm)',
          '0.50 m (50 cm)',
        ],
        answer: 0,
        explanation: 'At equilibrium, gravitational weight equals restoring spring force: mg = kx → x = mg / k = (2 × 10) / 200 = 20 / 200 = 0.10 m = 10 cm.',
      },
      {
        q: 'How does the period of oscillation change if the spring constant is quadrupled (4k)?',
        options: [
          'The period is halved (T / 2)',
          'The period doubles (2T)',
          'The period quadruples (4T)',
          'The period remains unchanged',
        ],
        answer: 0,
        explanation: 'Period T = 2π√(m/k). Multiplying k by 4 gives T\' = 2π√(m/4k) = (1/2) · 2π√(m/k) = T / 2.',
      },
      {
        q: 'How much potential energy is stored in a spring with k = 100 N/m stretched by 0.2 meters?',
        options: [
          '2.0 Joules',
          '20.0 Joules',
          '10.0 Joules',
          '4.0 Joules',
        ],
        answer: 0,
        explanation: 'Elastic potential energy Ep = (1/2) k x² = 0.5 × 100 × (0.2)² = 50 × 0.04 = 2.0 J.',
      },
      {
        q: 'If two identical springs of spring constant k are connected in parallel, what is the effective spring constant?',
        options: [
          '2k',
          'k / 2',
          'k',
          '4k',
        ],
        answer: 0,
        explanation: 'In parallel, both springs stretch by the same displacement x, so total force F = kx + kx = 2kx. Effective constant keff = 2k.',
      },
      {
        q: 'What is the acceleration of a spring-mass oscillator at its maximum amplitude A?',
        options: [
          'Maximum acceleration: a_max = (k / m) · A',
          'Zero acceleration',
          'Constant velocity with no acceleration',
          'Half of maximum acceleration',
        ],
        answer: 0,
        explanation: 'At peak displacement x = A, restoring force F = kA is at its maximum, so by Newton\'s second law, acceleration a = F/m = (k/m)A is also at its peak.',
      },
    ],
  },

  ramp_friction: {
    id: 'ramp_friction',
    name: 'Inclined Plane Dynamics & Friction',
    category: 'Mechanics',
    formula: 'a = g(sin θ - μ cos θ) | N = mg cos θ',
    coreIdea:
      'On an incline of angle θ, gravity is split into two components: mg sin θ pulling down the slope, and mg cos θ pressing into the surface (producing normal force N = mg cos θ). Friction fk = μN = μ mg cos θ opposes sliding.',
    memoryRule: 'sin slides down, cos presses into surface. Angle of repose: tan(θ) = μ.',
    commonPitfall:
      'Assuming normal force is always N = mg. On an inclined plane, N is reduced to mg cos θ!',
    remedialPool: [
      {
        q: 'What is the normal force on a 4 kg box on an incline tilted at 60° (g = 10 m/s²)?',
        options: [
          '20 N',
          '40 N',
          '34.6 N',
          '0 N',
        ],
        answer: 0,
        explanation: 'Normal force N = mg cos(θ) = 4 × 10 × cos(60°) = 40 × 0.5 = 20 N.',
      },
      {
        q: 'A block just begins to slide down an inclined ramp when the angle reaches 45°. What is the coefficient of static friction μs?',
        options: [
          '1.00',
          '0.50',
          '0.71',
          '0.86',
        ],
        answer: 0,
        explanation: 'At the critical angle of repose, mg sin θ = μ mg cos θ → μ = tan(θ). Since tan(45°) = 1.00, the coefficient of friction is 1.00.',
      },
      {
        q: 'If an inclined plane is completely frictionless (μ = 0), what is the acceleration of any object sliding down it?',
        options: [
          'g sin(θ)',
          'g',
          'g cos(θ)',
          'g tan(θ)',
        ],
        answer: 0,
        explanation: 'With μ = 0, a = g(sin θ - 0) = g sin θ. Mass cancels out, meaning all frictionless objects slide with identical acceleration.',
      },
      {
        q: 'As the incline angle θ is steepened from 10° to 70°, what happens to the normal force and the parallel gravitational force?',
        options: [
          'Normal force decreases, while parallel driving force increases',
          'Both normal force and parallel force increase',
          'Normal force increases, while parallel driving force decreases',
          'Both remain unchanged',
        ],
        answer: 0,
        explanation: 'As θ increases, cos(θ) decreases (reducing normal force N = mg cos θ), while sin(θ) increases (increasing downhill force F = mg sin θ).',
      },
      {
        q: 'A 5 kg block slides down a 30° frictionless ramp (g = 10 m/s²). What is its acceleration?',
        options: [
          '5.0 m/s²',
          '8.66 m/s²',
          '10.0 m/s²',
          '2.5 m/s²',
        ],
        answer: 0,
        explanation: 'a = g sin(30°) = 10 × 0.5 = 5.0 m/s².',
      },
    ],
  },

  doppler_effect: {
    id: 'doppler_effect',
    name: 'Acoustic Doppler Pitch Shift',
    category: 'Waves & Sound',
    formula: "f' = f₀ · [v / (v ∓ vₛ)]",
    coreIdea:
      'When an acoustic sound source moves towards an observer, wave crests are compressed in front of it, resulting in shorter observed wavelength and HIGHER perceived frequency (higher pitch). As it recedes, frequency drops.',
    memoryRule: 'Approaching = Waves compressed = HIGHER pitch. Receding = Waves stretched = LOWER pitch.',
    commonPitfall:
      'Assuming the sound travels faster when the source moves. Sound wave speed v depends ONLY on the properties of the transmitting medium, not the emitter velocity!',
    remedialPool: [
      {
        q: 'An ambulance siren emits a 500 Hz tone while rushing towards a stationary listener. What frequency does the listener hear?',
        options: [
          'Higher than 500 Hz',
          'Lower than 500 Hz',
          'Exactly 500 Hz',
          'Zero frequency',
        ],
        answer: 0,
        explanation: 'Because the ambulance is approaching, wave fronts are compressed in front of it, so the listener detects more wave crests per second (higher frequency).',
      },
      {
        q: 'Does the speed of the sound waves in air change when the source moves faster?',
        options: [
          'No, sound speed is determined solely by the air temperature and medium properties',
          'Yes, sound speed increases by the speed of the car',
          'Yes, sound speed drops to zero',
          'Only for supersonic aircraft',
        ],
        answer: 0,
        explanation: 'Sound wave speed v depends strictly on medium elasticity and density (v = √(γRT/M)). Source motion changes observed wavelength and frequency, NOT the propagation speed in the medium.',
      },
      {
        q: 'If a police car siren emits 600 Hz and races away from a listener at 34 m/s (speed of sound = 340 m/s), what frequency is heard?',
        options: [
          '~545 Hz',
          '~660 Hz',
          '~600 Hz',
          '~300 Hz',
        ],
        answer: 0,
        explanation: "For a receding source: f' = f₀ · [v / (v + vs)] = 600 · [340 / (340 + 34)] = 600 · (340 / 374) ≈ 545.45 Hz.",
      },
      {
        q: 'What astronomical observation provided primary evidence that the universe is expanding based on the Doppler effect for light?',
        options: [
          'Cosmological Redshift of distant galaxies',
          'Blueshift of stellar spectra',
          'Solar eclipse coronas',
          'Gravitational lensing by dark matter',
        ],
        answer: 0,
        explanation: 'Light from receding galaxies is stretched to longer (redder) wavelengths, known as cosmological redshift, directly analogous to the acoustic Doppler pitch drop.',
      },
      {
        q: 'What occurs when a supersonic jet travels at exactly the speed of sound (Mach 1)?',
        options: [
          'Wave fronts pile up to create a high-pressure shock wave (sonic boom)',
          'Sound waves cease to exist',
          'The jet becomes invisible',
          'Frequency drops to 0 Hz',
        ],
        answer: 0,
        explanation: 'At Mach 1, the aircraft keeps pace with its own sound waves, causing pressure disturbances to constructively interfere into an intense conical shock wave heard as a sonic boom.',
      },
    ],
  },

  circuits_ohms: {
    id: 'circuits_ohms',
    name: "Ohm's Law & Electrical Power",
    category: 'Electricity & Mag',
    formula: 'V = I · R | P = V · I = I²R = V² / R',
    coreIdea:
      'Current I through an ohmic conductor is directly proportional to applied voltage V and inversely proportional to electrical resistance R. Electrical energy dissipation (Joule heating) scales with the square of the current (P = I²R).',
    memoryRule: 'V = IR. Double the voltage = Double the current. Double the resistance = Half the current.',
    commonPitfall:
      'Adding parallel resistors like series resistors. In parallel, 1/Req = 1/R₁ + 1/R₂, so equivalent resistance is always SMALLER than the smallest individual branch resistor!',
    remedialPool: [
      {
        q: 'A 12V automotive battery is connected across a 4Ω headlight resistor. What current flows through the circuit?',
        options: [
          '3.0 Amperes',
          '48.0 Amperes',
          '0.33 Amperes',
          '16.0 Amperes',
        ],
        answer: 0,
        explanation: 'By Ohm\'s law: I = V / R = 12 / 4 = 3.0 A.',
      },
      {
        q: 'How much electrical power is dissipated as heat by a 3A current flowing through a 4Ω resistor?',
        options: [
          '36 Watts',
          '12 Watts',
          '48 Watts',
          '72 Watts',
        ],
        answer: 0,
        explanation: 'Power P = I² · R = (3)² × 4 = 9 × 4 = 36 W (also P = V · I = 12 × 3 = 36 W).',
      },
      {
        q: 'Two 6Ω resistors are wired in parallel. What is their total equivalent resistance?',
        options: [
          '3.0 Ω',
          '12.0 Ω',
          '6.0 Ω',
          '1.5 Ω',
        ],
        answer: 0,
        explanation: 'For identical parallel resistors: Req = R / N = 6 / 2 = 3.0 Ω (or 1/Req = 1/6 + 1/6 = 2/6 = 1/3 → Req = 3 Ω).',
      },
      {
        q: 'If the voltage across an incandescent lamp is doubled from 110V to 220V (assuming constant resistance), how does the dissipated power change?',
        options: [
          'Power quadruples (4x greater)',
          'Power doubles (2x greater)',
          'Power remains the same',
          'Power increases by 8x',
        ],
        answer: 0,
        explanation: 'Because P = V² / R, doubling V results in (2V)² / R = 4 · (V² / R), quadrupling the power output.',
      },
      {
        q: 'According to Kirchhoff\'s Current Law (junction rule), what is the sum of currents entering any electrical node?',
        options: [
          'Exactly equal to the sum of currents leaving the node',
          'Always zero regardless of connections',
          'Equal to the circuit supply voltage',
          'Depends on the wire thickness',
        ],
        answer: 0,
        explanation: 'Kirchhoff\'s Junction Law is a direct statement of conservation of electric charge: charge cannot accumulate or vanish at a junction point, so Σ I_in = Σ I_out.',
      },
    ],
  },

  photoelectric_effect: {
    id: 'photoelectric_effect',
    name: "Einstein's Photoelectric Effect & Photons",
    category: 'Modern Physics',
    formula: 'K_max = hν - Φ = e · V₀',
    coreIdea:
      'Light consists of quantized packets of energy called photons (E = hν). Electrons are ejected from a metal plate only if the incoming photon energy exceeds the metal work function Φ (cutoff threshold frequency ν₀ = Φ/h). Increasing light intensity increases the number of emitted electrons, but NOT their kinetic energy.',
    memoryRule: 'Frequency (color) controls electron ENERGY. Intensity (brightness) controls electron COUNT.',
    commonPitfall:
      'Believing brighter red light will eventually eject electrons if given enough time. In wave theory this was expected, but quantum mechanics showed that sub-threshold photons cannot eject electrons regardless of intensity!',
    remedialPool: [
      {
        q: 'If a metal has a work function Φ = 2.0 eV and is illuminated with 1.5 eV photons, what is the maximum kinetic energy of emitted photoelectrons?',
        options: [
          'No electrons are emitted at all (0 eV)',
          '0.5 eV',
          '3.5 eV',
          '2.0 eV',
        ],
        answer: 0,
        explanation: 'Because photon energy (1.5 eV) is below the threshold work function (2.0 eV), no electrons can overcome the binding energy and none are ejected.',
      },
      {
        q: 'What happens to the emitted photoelectrons if you increase the BRIGHTNESS (intensity) of light whose frequency is above threshold?',
        options: [
          'More photoelectrons are ejected per second, but their maximum kinetic energy remains unchanged',
          'The kinetic energy of each electron increases',
          'The work function of the metal decreases',
          'The stopping potential increases',
        ],
        answer: 0,
        explanation: 'Higher intensity means more photons per second, ejecting a higher current of electrons, but each individual photon still transfers the exact same energy E = hν.',
      },
      {
        q: 'If the incident photon energy is 4.5 eV and the metal work function is 2.5 eV, what is the stopping potential V₀?',
        options: [
          '2.0 Volts',
          '7.0 Volts',
          '4.5 Volts',
          '1.8 Volts',
        ],
        answer: 0,
        explanation: 'K_max = E - Φ = 4.5 - 2.5 = 2.0 eV. Since K_max = e · V₀, the stopping potential required to halt the fastest electrons is exactly 2.0 V.',
      },
      {
        q: 'Who was awarded the 1921 Nobel Prize in Physics specifically for discovering the law of the photoelectric effect?',
        options: [
          'Albert Einstein',
          'Max Planck',
          'Niels Bohr',
          'Ernest Rutherford',
        ],
        answer: 0,
        explanation: 'Albert Einstein was awarded the 1921 Nobel Prize in Physics for his service to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect.',
      },
      {
        q: 'Which characteristic of light determines whether photoelectrons will be liberated from a target metal plate?',
        options: [
          'Frequency / Wavelength of the incident light',
          'Brightness / Amplitude of the light beam',
          'Duration of illumination exposure',
          'Surface area of the light beam spotlight',
        ],
        answer: 0,
        explanation: 'Liberation depends strictly on individual photon energy E = hν exceeding the work function, so frequency (or inversely, wavelength) is the governing factor.',
      },
    ],
  },

  ideal_gas_law: {
    id: 'ideal_gas_law',
    name: 'Ideal Gas Equation & Kinetic Theory',
    category: 'Heat & Thermo',
    formula: 'P · V = n · R · T',
    coreIdea:
      'The macroscopic state of an ideal gas is governed by pressure P, volume V, absolute temperature T (in Kelvin), and quantity of moles n. At constant temperature (Boyle\'s law), pressure is inversely proportional to volume.',
    memoryRule: 'Temperature MUST be in Kelvin (K = °C + 273.15). Halving volume doubles pressure.',
    commonPitfall:
      'Plugging in temperature in Celsius instead of Kelvin, or confusing gauge pressure with absolute pressure.',
    remedialPool: [
      {
        q: 'If the volume of an ideal gas is compressed to half its initial volume (V / 2) at constant temperature, what happens to the gas pressure?',
        options: [
          'Pressure doubles (2P)',
          'Pressure is halved (P / 2)',
          'Pressure quadruples (4P)',
          'Pressure remains constant',
        ],
        answer: 0,
        explanation: 'By Boyle\'s law (PV = constant), halving volume forces molecules into tighter space, doubling collision frequency with container walls so P\' = 2P.',
      },
      {
        q: 'What is absolute zero on the Celsius temperature scale?',
        options: [
          '-273.15 °C',
          '0 °C',
          '-100.00 °C',
          '-459.67 °C',
        ],
        answer: 0,
        explanation: 'Absolute zero corresponds to 0 Kelvin, which is -273.15 °C, the theoretical point where molecular thermal kinetic motion reaches a minimum.',
      },
      {
        q: 'A rigid sealed canister of gas (constant volume) is heated from 300 K to 600 K. How does its pressure change?',
        options: [
          'Pressure doubles (2P)',
          'Pressure quadruples',
          'Pressure stays the same because volume is constant',
          'Pressure drops by half',
        ],
        answer: 0,
        explanation: 'By Gay-Lussac\'s law (P/T = constant when V is constant), doubling absolute temperature doubles the kinetic energy and pressure of the gas.',
      },
      {
        q: 'What is the volume occupied by 1.0 mole of any ideal gas at Standard Temperature and Pressure (STP: 0°C, 1 atm)?',
        options: [
          '22.4 Liters',
          '1.0 Liter',
          '100.0 Liters',
          '11.2 Liters',
        ],
        answer: 0,
        explanation: 'At STP (273.15 K and 101.325 kPa), V = nRT/P = (1 × 8.314 × 273.15) / 101325 ≈ 0.0224 m³ = 22.4 Liters.',
      },
      {
        q: 'Average kinetic energy of an ideal gas particle is directly proportional to what macroscopic quantity?',
        options: [
          'Absolute temperature T (in Kelvin)',
          'Gas pressure P',
          'Molecular mass M',
          'Container volume V',
        ],
        answer: 0,
        explanation: 'From kinetic theory: Average kinetic energy per molecule is E_k = (3/2) k_B T, meaning temperature is a direct measure of average molecular kinetic motion.',
      },
    ],
  },
};

// 10-Question Main Mock Test
export const MOCK_TEST_QUESTIONS = [
  {
    id: 1,
    question:
      'A ray of green light in air strikes the flat polished surface of a crown glass block (n = 1.52) at an angle of 45° to the surface normal. Which statement correctly describes the refracted ray inside the glass?',
    options: [
      'The ray bends towards the normal at an angle θ₂ ≈ 27.7°',
      'The ray bends away from the normal at an angle θ₂ ≈ 65.2°',
      'The ray continues along 45° without deviation because green light has zero dispersion',
      'The ray undergoes total internal reflection back into the air',
    ],
    correctAnswer: 0,
    conceptId: 'snell_refraction',
    misconceptionAnalysis: {
      1: 'Believed light bends away from the normal in a denser medium instead of towards it.',
      2: 'Assumed light does not deviate when crossing media of different refractive indices.',
      3: 'Confused external refraction with total internal reflection (which only happens from denser to rarer media).',
    },
  },
  {
    id: 2,
    question:
      'A biconvex optical glass lens has a focal length of f = +20 cm in air. What is its optical power in Diopters (D)?',
    options: [
      '+5.0 Diopters (D)',
      '+0.05 Diopters (D)',
      '-5.0 Diopters (D)',
      '+20.0 Diopters (D)',
    ],
    correctAnswer: 0,
    conceptId: 'lens_maker',
    misconceptionAnalysis: {
      1: 'Forgot to convert centimeters to meters when calculating optical power P = 1/f(m).',
      2: 'Confused converging convex lens (positive power) with diverging concave lens (negative power).',
      3: 'Equated power directly to focal length without taking the reciprocal.',
    },
  },
  {
    id: 3,
    question:
      'A simple pendulum consists of a 500g brass sphere on a 1.9m cord. If the brass sphere is replaced by a 2.0 kg lead sphere (4x heavier) while keeping the length identical, how does the period of oscillation change?',
    options: [
      'The period remains completely unchanged',
      'The period doubles because mass is 4x greater',
      'The period is cut in half',
      'The period increases by a factor of 4',
    ],
    correctAnswer: 0,
    conceptId: 'pendulum_dynamics',
    misconceptionAnalysis: {
      1: 'Assumed period depends on mass, believing heavier bobs take longer to oscillate.',
      2: 'Believed heavier bobs swing faster due to stronger gravitational pull without accounting for inertia.',
      3: 'Confused pendulum period with momentum.',
    },
  },
  {
    id: 4,
    question:
      'A cannon on flat ground fires a projectile with an initial velocity of v₀ = 30 m/s. Neglecting air drag, what launch angle provides the maximum possible horizontal range?',
    options: [
      '45°',
      '30°',
      '60°',
      '90°',
    ],
    correctAnswer: 0,
    conceptId: 'projectile_motion',
    misconceptionAnalysis: {
      1: 'Selected 30° erroneously thinking flatter trajectory increases ground roll.',
      2: 'Selected 60° thinking higher altitude provides more time in the air without considering forward speed.',
      3: 'Selected 90° which produces maximum height, but zero horizontal range.',
    },
  },
  {
    id: 5,
    question:
      'A spring with spring constant k = 100 N/m is stretched by x = 0.2 meters from its equilibrium position. What is the elastic potential energy stored in the spring?',
    options: [
      '2.0 Joules',
      '20.0 Joules',
      '10.0 Joules',
      '0.4 Joules',
    ],
    correctAnswer: 0,
    conceptId: 'hooke_elasticity',
    misconceptionAnalysis: {
      1: 'Used formula F = kx (giving 20 N force) instead of energy Ep = (1/2)kx².',
      2: 'Omitted the 1/2 factor in potential energy (kx² = 4 J).',
      3: 'Computed kx² with incorrect decimal placement.',
    },
  },
  {
    id: 6,
    question:
      'A wooden block rests on an inclined wooden ramp. As the ramp is gradually tilted upwards from 0° to 30°, what happens to the normal contact force exerted by the ramp on the block?',
    options: [
      'The normal force decreases because N = mg cos(θ) and cos(θ) decreases as θ increases',
      'The normal force increases because gravity pulls the block harder against the slope',
      'The normal force remains constant at N = mg regardless of angle',
      'The normal force drops immediately to zero',
    ],
    correctAnswer: 0,
    conceptId: 'ramp_friction',
    misconceptionAnalysis: {
      1: 'Believed steeper slopes increase perpendicular surface pressure.',
      2: 'Assumed normal force on an incline is always identical to flat ground weight (N = mg).',
      3: 'Confused inclined ramp with free fall.',
    },
  },
  {
    id: 7,
    question:
      'A high-speed passenger train sounding its 800 Hz horn approaches a station platform at 34 m/s (sound speed in air = 340 m/s). What frequency does a passenger waiting on the platform perceive?',
    options: [
      '888.9 Hz (Higher pitch due to wave crest compression)',
      '720.0 Hz (Lower pitch due to train speed subtraction)',
      '800.0 Hz (Identical pitch because train horn frequency does not change)',
      '1600.0 Hz (Double pitch)',
    ],
    correctAnswer: 0,
    conceptId: 'doppler_effect',
    misconceptionAnalysis: {
      1: 'Subtracted frequency as if the train were receding away from the observer.',
      2: 'Assumed Doppler effect only affects loudness rather than observed pitch frequency.',
      3: 'Multiplied frequency by speed ratio without using the Doppler reciprocal formula.',
    },
  },
  {
    id: 8,
    question:
      'An electric heater operates on a 120V household line and draws a steady current of 5.0 Amperes. What is the electrical resistance and power rating of the heater?',
    options: [
      'R = 24 Ω and Power = 600 W',
      'R = 600 Ω and Power = 24 W',
      'R = 4.8 Ω and Power = 120 W',
      'R = 12 Ω and Power = 300 W',
    ],
    correctAnswer: 0,
    conceptId: 'circuits_ohms',
    misconceptionAnalysis: {
      1: 'Swapped the numerical values for resistance and power.',
      2: 'Calculated R = I / V instead of R = V / I.',
      3: 'Omitted current factor in power calculation P = VI.',
    },
  },
  {
    id: 9,
    question:
      'A cesium cathode with work function Φ = 1.9 eV is irradiated with ultraviolet photons of energy E = 3.4 eV. What is the maximum kinetic energy of the ejected photoelectrons?',
    options: [
      '1.5 eV',
      '5.3 eV',
      '1.9 eV',
      'Zero (no electrons are emitted)',
    ],
    correctAnswer: 0,
    conceptId: 'photoelectric_effect',
    misconceptionAnalysis: {
      1: 'Added photon energy and work function instead of subtracting: K_max = hν - Φ.',
      2: 'Assumed kinetic energy is capped at the work function value.',
      3: 'Believed 3.4 eV is below threshold, when in fact 3.4 eV > 1.9 eV.',
    },
  },
  {
    id: 10,
    question:
      'An ideal gas inside a cylinder with a movable piston is compressed isothermally (at constant temperature) so that its volume is reduced to 1/3 of its initial volume. What happens to its pressure?',
    options: [
      'The pressure triples (3P)',
      'The pressure is reduced to 1/3 (P / 3)',
      'The pressure remains unchanged because temperature is constant',
      'The pressure increases by 9x',
    ],
    correctAnswer: 0,
    conceptId: 'ideal_gas_law',
    misconceptionAnalysis: {
      1: 'Assumed pressure decreases along with volume instead of being inversely proportional (P ∝ 1/V).',
      2: 'Equated constant temperature with constant pressure.',
      3: 'Squared the compression factor unnecessarily.',
    },
  },
];
