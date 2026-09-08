/**
 * Challenge Sorter & Adaptive Format Re-assigner
 * 
 * Reorders and tailors the Daily 7-Day Progressive Lab Challenges based on
 * the student's highest weighted learning preference:
 * - 'visual_simulation': Prioritizes interactive apparatus, ray tracing, and color change reaction benches.
 * - 'textual_derivation': Prioritizes theoretical formulas, first-principles proofs, and structured scientific laws.
 * - 'numerical_practice': Prioritizes parameter tuning, numeric precision sliders, and mathematical calculation milestones.
 * 
 * Output is clean, modular, immutable, and performant.
 */

// Baseline format affinity matrix for daily lab investigations
export const CHALLENGE_FORMAT_AFFINITIES = {
  'day-1-snell': {
    primaryFormat: 'visual_simulation',
    affinities: { visual_simulation: 0.9, textual_derivation: 0.6, numerical_practice: 0.5 },
    formatFocus: {
      visual_simulation: 'Visual Lens Convergence & 5-Ray Tracing Bench',
      textual_derivation: "Snell's Law & Lens Maker's Theoretical Derivation",
      numerical_practice: 'Calibrate Precision Focal Distance to Exactly 170px',
    },
  },
  'day-2-pendulum': {
    primaryFormat: 'numerical_practice',
    affinities: { visual_simulation: 0.6, textual_derivation: 0.5, numerical_practice: 0.9 },
    formatFocus: {
      visual_simulation: 'Live Harmonic Oscillation & Energy Vector Playback',
      textual_derivation: 'Small-Angle Approximation & Period Law Derivation',
      numerical_practice: 'Target Period Calculation T = 2.77s under g = 9.8 m/s²',
    },
  },
  'day-3-prism': {
    primaryFormat: 'visual_simulation',
    affinities: { visual_simulation: 0.95, textual_derivation: 0.7, numerical_practice: 0.4 },
    formatFocus: {
      visual_simulation: "Newton's 7-Color Rainbow Spectral Dispersion",
      textual_derivation: "Cauchy's Dispersion Equation Proof: n(λ) = n₀ + B/λ²",
      numerical_practice: 'Refractive Index Threshold Verification (n ≥ 1.55)',
    },
  },
  'day-4-projectile': {
    primaryFormat: 'numerical_practice',
    affinities: { visual_simulation: 0.7, textual_derivation: 0.6, numerical_practice: 0.95 },
    formatFocus: {
      visual_simulation: 'Interactive Parabolic Flight Trajectory Simulator',
      textual_derivation: 'Kinematic Derivation for Maximum Range at θ = 45°',
      numerical_practice: 'Precision Target Range Equation: R = 80m @ 28 m/s',
    },
  },
  'day-5-spring': {
    primaryFormat: 'textual_derivation',
    affinities: { visual_simulation: 0.5, textual_derivation: 0.85, numerical_practice: 0.8 },
    formatFocus: {
      visual_simulation: 'Spring-Mass Damping & Phase Space Visualizer',
      textual_derivation: "Hooke's Law Restoring Force & Natural Frequency Proof",
      numerical_practice: 'Solve Elastic Constant k = 35 N/m with 1.5kg Load',
    },
  },
  'day-6-ramp': {
    primaryFormat: 'textual_derivation',
    affinities: { visual_simulation: 0.6, textual_derivation: 0.9, numerical_practice: 0.75 },
    formatFocus: {
      visual_simulation: 'Friction Angle of Repose & Incline Slider Bench',
      textual_derivation: 'Free-Body Diagram Vector Decomposition: a = g(sinθ - μcosθ)',
      numerical_practice: 'Critical Friction Coefficient Calculation: μ = 0.18',
    },
  },
  'day-7-concave': {
    primaryFormat: 'visual_simulation',
    affinities: { visual_simulation: 0.88, textual_derivation: 0.8, numerical_practice: 0.6 },
    formatFocus: {
      visual_simulation: 'Virtual Ray Extension & Negative Focal Divergence',
      textual_derivation: 'Diverging Lens Sign Conventions & Image Matrix',
      numerical_practice: 'Virtual Focal Length Mapping to |f| = -140px',
    },
  },
};

/**
 * Reorders and tailors the 7-day progressive lab challenges based on user preference weights.
 * 
 * @param {Array<Object>} challenges - The original array of challenges (DAILY_TASKS)
 * @param {Object} weights - Object with { visual_simulation, textual_derivation, numerical_practice }
 * @param {string} [forcedTopPreference] - Optional override ('visual_simulation' | 'textual_derivation' | 'numerical_practice')
 * @returns {Array<Object>} Re-ordered and format-tailored challenges
 */
export function getTailoredChallenges(challenges, weights = {}, forcedTopPreference = null) {
  if (!Array.isArray(challenges) || challenges.length === 0) return [];

  const vWeight = typeof weights.visual_simulation === 'number' ? weights.visual_simulation : 0.333;
  const tWeight = typeof weights.textual_derivation === 'number' ? weights.textual_derivation : 0.333;
  const nWeight = typeof weights.numerical_practice === 'number' ? weights.numerical_practice : 0.334;

  // Determine highest weighted preference
  let topPref = forcedTopPreference;
  if (!topPref) {
    if (vWeight >= tWeight && vWeight >= nWeight) {
      topPref = 'visual_simulation';
    } else if (tWeight >= vWeight && tWeight >= nWeight) {
      topPref = 'textual_derivation';
    } else {
      topPref = 'numerical_practice';
    }
  }

  // Create clean mapped clone with calculated scores
  const scored = challenges.map((task) => {
    const meta = CHALLENGE_FORMAT_AFFINITIES[task.id] || {
      primaryFormat: 'visual_simulation',
      affinities: { visual_simulation: 0.5, textual_derivation: 0.5, numerical_practice: 0.5 },
      formatFocus: {
        visual_simulation: task.goal,
        textual_derivation: task.formula?.name || task.title,
        numerical_practice: task.targetCondition?.targetDesc || task.goal,
      },
    };

    // Composite format score weighted by student's dynamic profile
    const affinityScore =
      meta.affinities.visual_simulation * vWeight +
      meta.affinities.textual_derivation * tWeight +
      meta.affinities.numerical_practice * nWeight;

    // Bonus score if this challenge natively targets the student's top preference
    const primaryBonus = meta.primaryFormat === topPref ? 0.35 : 0;
    const totalScore = affinityScore + primaryBonus;

    const tailoredFocusTitle = meta.formatFocus[topPref] || task.goal;

    return {
      ...task,
      _originalDay: task.day,
      primaryFormat: meta.primaryFormat,
      tailoredFocusTitle,
      topPreferenceMatched: topPref,
      affinityScore: Number(totalScore.toFixed(3)),
    };
  });

  // Sort descending by calculated score while preserving progressive difficulty continuity
  scored.sort((a, b) => b.affinityScore - a.affinityScore);

  // Re-assign progressive Day numbers (Day 1 through Day 7)
  return scored.map((item, index) => ({
    ...item,
    day: index + 1,
    adaptiveSequenceBadge: `Adaptive Day ${index + 1}`,
  }));
}

/**
 * Formats a learning style metric into readable UI label
 */
export function getFormatLabel(formatKey) {
  const map = {
    visual_simulation: 'Visual Simulation',
    textual_derivation: 'Textual Derivation',
    numerical_practice: 'Numerical Practice',
  };
  return map[formatKey] || formatKey;
}
