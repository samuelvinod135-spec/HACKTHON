/**
 * Credit & XP Stage Status Engine for LabXplore
 * Maps student accumulated XP/credits to progressive stages, ranks, perks, and fine status.
 * Aesthetics: 100% Clay UI using White, Sky Blue, and Banana Yellow.
 */

export const CREDIT_STAGES = [
  {
    stage: 1,
    title: 'Junior Inquirer',
    subtitle: 'Foundational Discovery & Laboratory Initiation',
    minCredits: 0,
    maxCredits: 500,
    badgeColor: 'sky',
    status: 'Initiate Scholar',
    perks: [
      'Access to 25,000+ Question Bank',
      'Basic Kinematics & Chemistry Sandbox Rigs',
      'Daily Science Challenges & Pointers',
    ],
    description: 'Master fundamental physical units, linear kinematics, and balancing foundational chemical reactions.',
  },
  {
    stage: 2,
    title: 'Kinetic Apprentice',
    subtitle: 'Dynamic Problem Solving & Motion Mastery',
    minCredits: 500,
    maxCredits: 1500,
    badgeColor: 'yellow',
    status: 'Field Experimenter',
    perks: [
      'Real-Time 1v1 Peer Battles Unlocked',
      '60 FPS Ray Optics Refraction Simulator',
      'Snap & Solve AI Formula Derivations',
    ],
    description: 'Accelerate through projectile vectors, Newton free body diagrams, and stoichiometry reactions.',
  },
  {
    stage: 3,
    title: 'Molecular Specialist',
    subtitle: 'Advanced Thermodynamic & Bonding Mechanics',
    minCredits: 1500,
    maxCredits: 3000,
    badgeColor: 'sky',
    status: 'Master Specialist',
    perks: [
      'Procedural Ambient Audio Study Lounge',
      'Spaced Repetition Decay Predictions',
      'Adaptive Physics & Chemistry Mock Test Engine',
    ],
    description: 'Solve complex equilibrium constants, Carnot engine entropy, and electrochemistry cells.',
  },
  {
    stage: 4,
    title: 'Quantum Pioneer',
    subtitle: 'High-Velocity Analytical Rigor & Precision',
    minCredits: 3000,
    maxCredits: 5000,
    badgeColor: 'yellow',
    status: 'Senior Investigator',
    perks: [
      'Instant OCR Handwritten Formula Recognition',
      'Priority AI Science Chatbot Problem Solver',
      'Custom Celestial Gravity & Refraction Controls',
    ],
    description: 'Navigate wave-particle optics, magnetic Lorentz deflection, and advanced molecular orbital theory.',
  },
  {
    stage: 5,
    title: 'Atomic Alchemist',
    subtitle: 'Apex Experimental & Theoretical Excellence',
    minCredits: 5000,
    maxCredits: 8000,
    badgeColor: 'sky',
    status: 'Honorary Research Fellow',
    perks: [
      'Multiplayer Ranked Duel Host Privileges',
      'Full Laboratory Notebook Cloud Export',
      'Tactile Banana Yellow & Sky Blue Master Seals',
    ],
    description: 'Formulate bespoke chemical syntheses, Arrhenius rate derivations, and harmonic oscillations.',
  },
  {
    stage: 6,
    title: 'Cosmic Grandmaster',
    subtitle: 'Ultimate Transcendent Scientific Mastery',
    minCredits: 8000,
    maxCredits: 999999,
    badgeColor: 'yellow',
    status: 'LabXplore Grandmaster',
    perks: [
      'Unlimited High-Order Multidisciplinary Derivations',
      'Hall of Fame Permanent Laurels Recognition',
      'Universal Laboratory Access Privileges',
    ],
    description: 'Attained supreme mastery across all physics domains, chemical kinetics, and empirical derivations.',
  },
];

/**
 * Returns comprehensive stage metadata, fine progress percentage, and next milestone credits.
 */
export function getCreditStage(credits = 0) {
  const current = Math.max(0, Number(credits) || 0);

  for (let i = CREDIT_STAGES.length - 1; i >= 0; i--) {
    if (current >= CREDIT_STAGES[i].minCredits) {
      const stage = CREDIT_STAGES[i];
      const nextStage = CREDIT_STAGES[i + 1] || null;
      const range = (stage.maxCredits - stage.minCredits) || 1000;
      const progressInStage = current - stage.minCredits;
      const pct = nextStage ? Math.min(100, Math.max(0, Math.round((progressInStage / range) * 100))) : 100;
      const creditsToNext = nextStage ? Math.max(0, nextStage.minCredits - current) : 0;

      return {
        ...stage,
        currentCredits: current,
        progressPct: pct,
        creditsToNext,
        nextStageTitle: nextStage?.title || 'Apex Stage Reached',
        isMaxStage: !nextStage,
      };
    }
  }

  return {
    ...CREDIT_STAGES[0],
    currentCredits: current,
    progressPct: 0,
    creditsToNext: 500,
    nextStageTitle: CREDIT_STAGES[1].title,
    isMaxStage: false,
  };
}
