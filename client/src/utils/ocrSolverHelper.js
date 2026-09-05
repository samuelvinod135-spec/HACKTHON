/**
 * OCR Problem Solver Data & Helper for Snap & Solve
 * Includes demo handwritten presets and structured step-by-step solutions
 */

export const DEMO_PRESET_PROBLEMS = [
  {
    id: 'kinematics_projectile',
    title: 'Kinematics: 45° Projectile Motion',
    subject: 'Physics',
    chapter: 'Motion in a Plane',
    difficulty: 'Main-Moderate',
    handwrittenBadge: 'Handwritten Problem · Exam Prep',
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23fdfbf7"/><line x1="40" y1="340" x2="560" y2="340" stroke="%23334155" stroke-width="2.5"/><path d="M 60 340 Q 260 80 460 340" fill="none" stroke="%232563eb" stroke-width="3" stroke-dasharray="6,4"/><text x="50" y="55" font-family="cursive, serif" font-size="18" fill="%230f172a" font-weight="bold">Q. A projectile is launched at θ = 45° with u = 20 m/s.</text><text x="50" y="85" font-family="cursive, serif" font-size="16" fill="%23334155">Calculate: (a) Time of flight, (b) Max height (H_max),</text><text x="50" y="115" font-family="cursive, serif" font-size="16" fill="%23334155">and (c) Total Horizontal Range (R). [Take g = 9.8 m/s²]</text><text x="70" y="320" font-family="sans-serif" font-size="14" fill="%232563eb" font-weight="bold">u = 20 m/s ↗ 45°</text><line x1="260" y1="340" x2="260" y2="210" stroke="%23ef4444" stroke-width="2" stroke-dasharray="4,4"/><text x="268" y="270" font-family="sans-serif" font-size="13" fill="%23ef4444" font-weight="bold">H_max = ?</text><line x1="60" y1="360" x2="460" y2="360" stroke="%2310b981" stroke-width="2"/><text x="240" y="380" font-family="sans-serif" font-size="14" fill="%2310b981" font-weight="bold">Range R = ?</text></svg>',
    extractedText: 'A projectile is launched from ground level at an angle θ = 45° with initial velocity u = 20 m/s. Calculate:\n(a) Total Time of Flight (T)\n(b) Maximum Height Reached (H_max)\n(c) Horizontal Range (R)\n[Assume g = 9.8 m/s² and negligible air drag]',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Given Parameters & Resolve Components',
        description: 'Resolve the initial velocity vector into perpendicular horizontal ($u_x$) and vertical ($u_y$) components.',
        math: 'u = 20 \\text{ m/s}, \\quad \\theta = 45^\\circ, \\quad g = 9.8 \\text{ m/s}^2',
        substeps: [
          'Horizontal component: $u_x = u \\cos 45^\\circ = 20 \\times \\frac{1}{\\sqrt{2}} = 14.14\\text{ m/s}$ (constant, as $a_x = 0$)',
          'Vertical component: $u_y = u \\sin 45^\\circ = 20 \\times \\frac{1}{\\sqrt{2}} = 14.14\\text{ m/s}$ (subject to downward gravity $g$)',
        ],
      },
      {
        stepNumber: 2,
        title: 'Calculate Total Time of Flight (T)',
        description: 'Using the vertical kinematic displacement equation $s_y = u_y T - \\frac{1}{2}gT^2 = 0$:',
        math: 'T = \\frac{2 u \\sin \\theta}{g} = \\frac{2 \\times 20 \\times \\sin(45^\\circ)}{9.8} = \\frac{28.28}{9.8} \\approx 2.89 \\text{ seconds}',
      },
      {
        stepNumber: 3,
        title: 'Determine Maximum Height (H_max)',
        description: 'At the apex of the trajectory, the vertical velocity momentarily becomes zero ($v_y = 0$):',
        math: 'H_{\\max} = \\frac{u^2 \\sin^2 \\theta}{2g} = \\frac{20^2 \\times (\\sin 45^\\circ)^2}{2 \\times 9.8} = \\frac{400 \\times 0.5}{19.6} = \\frac{200}{19.6} \\approx 10.20 \\text{ meters}',
      },
      {
        stepNumber: 4,
        title: 'Compute Horizontal Range (R)',
        description: 'Because there is no horizontal acceleration, Range = Horizontal velocity × Total time of flight:',
        math: 'R = u_x \\times T = \\frac{u^2 \\sin(2\\theta)}{g} = \\frac{20^2 \\times \\sin(90^\\circ)}{9.8} = \\frac{400 \\times 1}{9.8} \\approx 40.82 \\text{ meters}',
      },
    ],
    finalAnswer: 'Time of Flight T = 2.89 s | Maximum Height H_max = 10.20 m | Horizontal Range R = 40.82 m',
    tips: 'For any projectile launched on level ground, the maximum horizontal range always occurs when θ = 45° because sin(2θ) reaches its maximum value of 1.',
  },
  {
    id: 'chemistry_haber_yield',
    title: 'Chemistry: Haber Process & Stoichiometric Yield',
    subject: 'Chemistry',
    chapter: 'Stoichiometry & Chemical Equilibrium',
    difficulty: 'Main-Moderate',
    handwrittenBadge: 'Handwritten Lab Note · Stoichiometry',
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23fdfbf7"/><rect x="30" y="30" width="540" height="340" rx="12" fill="%23ffffff" stroke="%23e2e8f0" stroke-width="2"/><text x="50" y="70" font-family="cursive, serif" font-size="18" fill="%230f172a" font-weight="bold">Q. Nitrogen and Hydrogen synthesize ammonia:</text><text x="70" y="115" font-family="sans-serif" font-size="20" fill="%230284c7" font-weight="bold">N₂(g) + 3H₂(g) ⇌ 2NH₃(g)</text><text x="50" y="165" font-family="cursive, serif" font-size="16" fill="%23334155">Given: 28.0 g of N₂ gas reacts with excess H₂.</text><text x="50" y="195" font-family="cursive, serif" font-size="16" fill="%23334155">In the lab experiment, 25.5 g of NH₃ is isolated.</text><text x="50" y="240" font-family="cursive, serif" font-size="16" fill="%230f172a" font-weight="bold">Find: (a) Theoretical yield of NH₃ in grams,</text><text x="50" y="270" font-family="cursive, serif" font-size="16" fill="%230f172a" font-weight="bold">and (b) Percentage Yield of the reaction.</text><text x="50" y="325" font-family="sans-serif" font-size="13" fill="%2364748b">[Molar masses: N = 14.0 g/mol, H = 1.0 g/mol]</text></svg>',
    extractedText: 'Nitrogen gas reacts with hydrogen gas to synthesize ammonia according to the balanced equation:\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g)\nIf 28.0 g of N₂ reacts completely with excess H₂, and 25.5 g of NH₃ is experimentally collected, calculate:\n(a) Theoretical yield of NH₃ (in grams)\n(b) The percentage yield (%) of this reaction',
    steps: [
      {
        stepNumber: 1,
        title: 'Calculate Molar Masses of Reactants & Products',
        description: 'Determine the molecular weight of the limiting reactant ($N_2$) and the produced compound ($NH_3$).',
        math: 'M(N_2) = 2 \\times 14.01 = 28.02 \\text{ g/mol}, \\quad M(NH_3) = 14.01 + 3(1.008) = 17.034 \\text{ g/mol}',
      },
      {
        stepNumber: 2,
        title: 'Convert Mass of N₂ to Moles',
        description: 'Using the molar mass of molecular nitrogen:',
        math: 'n(N_2) = \\frac{\\text{Mass}}{\\text{Molar Mass}} = \\frac{28.0 \\text{ g}}{28.02 \\text{ g/mol}} \\approx 1.00 \\text{ mole of } N_2',
      },
      {
        stepNumber: 3,
        title: 'Apply Mole Ratio from Balanced Chemical Equation',
        description: 'From $1 \\text{ mol } N_2 \\rightarrow 2 \\text{ mol } NH_3$:',
        math: 'n(NH_3)_{\\text{theoretical}} = 1.00 \\text{ mol } N_2 \\times \\frac{2 \\text{ mol } NH_3}{1 \\text{ mol } N_2} = 2.00 \\text{ moles of } NH_3',
      },
      {
        stepNumber: 4,
        title: 'Determine Theoretical Yield (Grams)',
        description: 'Multiply theoretical moles by the molar mass of ammonia:',
        math: '\\text{Mass}(NH_3) = 2.00 \\text{ mol} \\times 17.034 \\text{ g/mol} = 34.07 \\text{ grams}',
      },
      {
        stepNumber: 5,
        title: 'Compute Percentage Yield',
        description: 'Calculate the ratio of actual laboratory yield to theoretical stoichiometric yield:',
        math: '\\% \\text{ Yield} = \\left( \\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\right) \\times 100\\% = \\left( \\frac{25.5 \\text{ g}}{34.07 \\text{ g}} \\right) \\times 100\\% \\approx 74.84\\%',
      },
    ],
    finalAnswer: 'Theoretical Yield = 34.07 g NH₃ | Percentage Yield = 74.84%',
    tips: 'In industrial Haber reactors, 100% yield is impossible because ammonia synthesis is reversible (exothermic equilibrium) and limited by Le Chatelier\'s principle.',
  },
  {
    id: 'optics_concave_mirror',
    title: 'Optics: Concave Spherical Mirror Ray Tracing',
    subject: 'Physics',
    chapter: 'Ray Optics & Optical Instruments',
    difficulty: 'Main-Moderate',
    handwrittenBadge: 'Handwritten Ray Diagram · Geometrical Optics',
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23fdfbf7"/><line x1="30" y1="200" x2="550" y2="200" stroke="%23334155" stroke-width="2"/><path d="M 500 60 A 180 180 0 0 1 500 340" fill="none" stroke="%230284c7" stroke-width="5"/><text x="40" y="55" font-family="cursive, serif" font-size="18" fill="%230f172a" font-weight="bold">Q. An object (h = 4 cm) is placed at u = -30 cm in front</text><text x="40" y="85" font-family="cursive, serif" font-size="16" fill="%23334155">of a concave mirror of radius of curvature R = 40 cm.</text><text x="40" y="120" font-family="cursive, serif" font-size="16" fill="%23334155">Find: (a) Image position (v), (b) Size & Nature of image (h\').</text><line x1="120" y1="200" x2="120" y2="120" stroke="%2310b981" stroke-width="3"/><text x="100" y="110" font-family="sans-serif" font-size="12" fill="%2310b981" font-weight="bold">Object (h=4cm)</text><circle cx="300" cy="200" r="4" fill="%23ef4444"/><text x="295" y="225" font-family="sans-serif" font-size="13" fill="%23ef4444" font-weight="bold">C</text><circle cx="400" cy="200" r="4" fill="%232563eb"/><text x="395" y="225" font-family="sans-serif" font-size="13" fill="%232563eb" font-weight="bold">F</text><text x="495" y="190" font-family="sans-serif" font-size="14" fill="%230284c7" font-weight="bold">P</text></svg>',
    extractedText: 'An object of height h = 4.0 cm is placed at a distance u = -30.0 cm in front of a concave mirror having a radius of curvature R = 40.0 cm. Find:\n(a) The position of the formed image (v)\n(b) The height of the image (h\') and magnification (m)\n(c) The nature of the image (real or virtual, erect or inverted)',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Cartesian Sign Convention & Focal Length',
        description: 'For a concave mirror, both center of curvature and focus lie on the reflective side (left, negative).',
        math: 'f = \\frac{R}{2} = \\frac{-40.0}{2} = -20.0 \\text{ cm}, \\quad u = -30.0 \\text{ cm}, \\quad h = +4.0 \\text{ cm}',
      },
      {
        stepNumber: 2,
        title: 'Use Mirror Formula to Find Image Distance (v)',
        description: 'Mirror Formula: $\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$',
        math: '\\frac{1}{v} = \\frac{1}{f} - \\frac{1}{u} = \\frac{1}{-20} - \\frac{1}{-30} = -\\frac{1}{20} + \\frac{1}{30} = \\frac{-3 + 2}{60} = -\\frac{1}{60}',
        substeps: ['Taking the reciprocal: $v = -60.0\\text{ cm}$ (the image is formed 60 cm in front of the mirror)'],
      },
      {
        stepNumber: 3,
        title: 'Calculate Lateral Magnification (m) and Image Height (h\')',
        description: 'Using $m = -\\frac{v}{u} = \\frac{h\'}{h}$:',
        math: 'm = -\\left( \\frac{-60.0}{-30.0} \\right) = -2.0, \\quad h\' = m \\times h = -2.0 \\times 4.0 = -8.0 \\text{ cm}',
      },
      {
        stepNumber: 4,
        title: 'State Image Characteristics & Nature',
        description: 'Based on the negative sign of $v$ and $m$:',
        math: '\\text{Nature: Real, Inverted, and Magnified (twice the object height)}',
      },
    ],
    finalAnswer: 'Image Position v = -60.0 cm | Image Height h\' = -8.0 cm (Inverted, Magnified, Real)',
    tips: 'Whenever the object lies between the Center of Curvature (C) and Focus (F), a concave mirror always casts an enlarged, inverted, and real image beyond C.',
  },
];
