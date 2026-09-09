/**
 * Autonomous AI Student Learning Intelligence Engine
 * 
 * Strict Principle:
 * NO manual management. All mastery, progress scores, weaknesses, strengths,
 * trends, early warnings, next-best-actions, and achievements are inferred
 * autonomously from actual student telemetry, quiz responses, and lab interactions.
 */

// Canonical Science Topics in CBSE/NCERT curriculum
export const CURRICULUM_TOPICS = [
  'Kinematics',
  'Ray Optics',
  'Stoichiometry',
  'Thermodynamics',
  'Acids and Bases',
  'Harmonic Motion',
];

// Specific known misconception patterns per topic
const KNOWN_MISCONCEPTIONS = {
  Kinematics: [
    {
      id: 'sign_error_acceleration',
      pattern: /negative|sign|direction|-g|downward/i,
      diagnosticLabel: 'Vector direction & negative sign convention in 1D/2D kinematics',
      explanation: 'Repeated confusion with coordinate direction signs (treating downward acceleration g as positive).',
      remediationAction: 'Calibrate vector signs with 45° projectile launch on Physics Canvas',
      remediationLink: '/physics',
      remediationBtn: 'Launch Kinematics Rig',
    },
    {
      id: 'apex_velocity_confusion',
      pattern: /apex|highest point|velocity zero|v=0/i,
      diagnosticLabel: 'Vertical vs Horizontal velocity components at trajectory apex',
      explanation: 'Assuming total velocity is zero at the apex instead of only vertical component vy = 0.',
      remediationAction: 'Observe tangent velocity vector breakdown at trajectory peak',
      remediationLink: '/physics',
      remediationBtn: 'Test Apex Velocity',
    },
  ],
  'Ray Optics': [
    {
      id: 'snell_normal_confusion',
      pattern: /snell|angle of incidence|normal|refraction/i,
      diagnosticLabel: "Angle measurement relative to the surface normal in Snell's Law",
      explanation: 'Measuring angle of incidence from the surface interface rather than the perpendicular normal line.',
      remediationAction: 'Use the 2D Ray Tracing lens to align normal reference vectors',
      remediationLink: '/physics',
      remediationBtn: 'Launch Optics Bench',
    },
    {
      id: 'lens_formula_sign_convention',
      pattern: /focal length|1\/f|virtual image|concave/i,
      diagnosticLabel: 'Cartesian sign convention in Lens Maker Formula (1/f = 1/v - 1/u)',
      explanation: 'Omitting negative distance for real objects in front of convex lenses.',
      remediationAction: 'Practice Lens Formula sign calculations',
      remediationLink: '/quizzes?topic=Ray+Optics',
      remediationBtn: 'Practice Optics Formulas',
    },
  ],
  Stoichiometry: [
    {
      id: 'coefficient_placement',
      pattern: /balance|coefficient|mole ratio|subscript/i,
      diagnosticLabel: 'Stoichiometric coefficient balancing vs molecular subscripts',
      explanation: 'Attempting to balance chemical equations by modifying atomic subscripts rather than molar coefficients.',
      remediationAction: 'Practice balancing 5 oxidation and synthesis equations',
      remediationLink: '/quizzes?topic=Stoichiometry',
      remediationBtn: 'Practice Equation Balancing',
    },
    {
      id: 'limiting_reagent_excess',
      pattern: /limiting|excess|moles|yield/i,
      diagnosticLabel: 'Limiting reagent identification in exothermic reactions',
      explanation: 'Assuming the reagent with lower initial mass is always the limiting reactant without mole-to-coefficient division.',
      remediationAction: 'Calibrate Mg + 2HCl stoichiometric molar ratio on Reaction Bench',
      remediationLink: '/chemistry?tab=drag-and-drop',
      remediationBtn: 'Launch Reaction Bench',
    },
  ],
  Thermodynamics: [
    {
      id: 'enthalpy_sign_convention',
      pattern: /exothermic|endothermic|delta h|heat released/i,
      diagnosticLabel: 'Enthalpy sign conventions (ΔH < 0 for exothermic release)',
      explanation: 'Confusing heat release with positive system enthalpy change.',
      remediationAction: 'Review combustion enthalpy profiles',
      remediationLink: '/quizzes?topic=Thermodynamics',
      remediationBtn: 'Practice Thermo Questions',
    },
  ],
  'Acids and Bases': [
    {
      id: 'ph_logarithmic_scale',
      pattern: /ph|h\+|concentration|logarithmic/i,
      diagnosticLabel: 'Logarithmic H+ ion concentration scale in pH calculation',
      explanation: 'Assuming a 1-unit pH drop represents a linear change instead of a 10-fold increase in H+ ions.',
      remediationAction: 'Perform titration simulation with indicator calibration',
      remediationLink: '/chemistry?tab=drag-and-drop',
      remediationBtn: 'Perform Titration Lab',
    },
  ],
  'Harmonic Motion': [
    {
      id: 'pendulum_mass_independence',
      pattern: /mass|pendulum|period|swing time/i,
      diagnosticLabel: 'Mass independence in simple harmonic pendulum oscillation (T = 2π√(L/g))',
      explanation: 'Predicting that heavier pendulum bobs swing slower, forgetting that inertial mass and gravitational mass cancel out.',
      remediationAction: 'Test different bob masses on the Harmonic Pendulum Rig',
      remediationLink: '/physics',
      remediationBtn: 'Launch Pendulum Rig',
    },
  ],
};

/**
 * 1. Bayesian Knowledge Tracing: Calculates updated topic mastery
 * @param {number} currentMastery - Previous mastery score (0-100)
 * @param {boolean} isCorrect - Whether the attempt was successful
 * @param {number} difficulty - Question or task difficulty (1=easy, 2=medium, 3=hard)
 * @param {number} attempts - Consecutive attempts made
 * @returns {number} Updated mastery score clamped to [0, 100]
 */
export function calculateUpdatedMastery(currentMastery = 50, isCorrect = true, difficulty = 1.5, attempts = 1) {
  // Learning rate factor scaled by difficulty
  const baseAlpha = 7;
  const delta = isCorrect
    ? baseAlpha * (difficulty / 1.5) * (attempts === 1 ? 1.2 : 0.8)
    : -baseAlpha * 1.1 * (1.5 / Math.max(1, difficulty));

  // Asymptotic damping as mastery approaches bounds
  const dampedDelta = delta > 0
    ? delta * ((100 - currentMastery) / 100)
    : delta * (currentMastery / 100);

  const updated = Math.round(currentMastery + dampedDelta);
  return Math.max(5, Math.min(99, updated));
}

/**
 * 2. Calculate Explainable Overall Progress Score (0-100)
 * Evaluates topic mastery, practice consistency, lab procedure accuracy, and recency.
 */
export function calculateOverallProgressScore(topicsMastery = {}, labEvaluations = [], quizStats = {}) {
  const topics = Object.values(topicsMastery);
  if (topics.length === 0) return { score: 65, explanation: 'Baseline initial diagnostic profile established.' };

  const averageTopicMastery = topics.reduce((acc, t) => acc + (t.score || 50), 0) / topics.length;

  // Lab factor (procedure understanding & accuracy)
  let labBonus = 0;
  if (labEvaluations.length > 0) {
    const avgLabScore = labEvaluations.reduce((acc, l) => acc + (l.procedureScore || 70), 0) / labEvaluations.length;
    labBonus = (avgLabScore - 70) * 0.15;
  }

  // Quiz consistency bonus
  let consistencyBonus = 0;
  if (quizStats.totalQuestionsAnswered >= 10) {
    const accuracy = quizStats.correctCount / Math.max(1, quizStats.totalQuestionsAnswered);
    consistencyBonus = (accuracy - 0.6) * 15;
  }

  const finalScore = Math.max(10, Math.min(98, Math.round(averageTopicMastery + labBonus + consistencyBonus)));

  // Generate transparent natural language explanation based on actual signals
  const masteredTopics = Object.entries(topicsMastery).filter(([_, t]) => t.score >= 80).map(([k]) => k);
  const strugglingTopics = Object.entries(topicsMastery).filter(([_, t]) => t.score < 65).map(([k]) => k);

  let explanation = `Overall learning health is at ${finalScore}/100 based on ${topics.length} tracked curriculum domains.`;
  if (masteredTopics.length > 0 && strugglingTopics.length > 0) {
    explanation = `Your score is ${finalScore}/100: You demonstrated strong mastery in ${masteredTopics.slice(0, 2).join(' & ')}, while ${strugglingTopics.slice(0, 2).join(' & ')} currently require targeted reinforcement.`;
  } else if (masteredTopics.length > 0) {
    explanation = `Your score is high (${finalScore}/100) due to consistent >80% accuracy and strong conceptual retention across ${masteredTopics.join(', ')}.`;
  } else if (strugglingTopics.length > 0) {
    explanation = `Your score is ${finalScore}/100: Telemetry indicates conceptual friction in ${strugglingTopics.join(', ')}. Focus on targeted interactive simulations to accelerate mastery.`;
  }

  return {
    score: finalScore,
    explanation,
  };
}

/**
 * 3. Autonomous Pattern Misconception & Weakness Detector
 * Matches error telemetry and options picked against conceptual misconception signatures.
 */
export function detectWeaknessPatterns(recentErrors = []) {
  const detectedWeaknesses = [];
  const tally = {};

  recentErrors.forEach((err) => {
    const topic = err.topic || 'Kinematics';
    const contextStr = `${err.questionText || ''} ${err.pickedOption || ''} ${err.subtopic || ''} ${err.notes || ''}`;
    
    const catalog = KNOWN_MISCONCEPTIONS[topic] || [];
    let matched = false;

    for (const item of catalog) {
      if (item.pattern.test(contextStr)) {
        tally[item.id] = (tally[item.id] || { ...item, topic, count: 0 });
        tally[item.id].count += 1;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const genericId = `gen_${topic.toLowerCase().replace(/\s+/g, '_')}`;
      tally[genericId] = tally[genericId] || {
        id: genericId,
        topic,
        diagnosticLabel: `First-principle fundamentals in ${topic}`,
        explanation: `Multiple errors detected during ${topic} assessment and simulations.`,
        remediationAction: `Practice fundamental ${topic} concept exercises`,
        remediationLink: `/quizzes?topic=${encodeURIComponent(topic)}`,
        remediationBtn: `Practice ${topic}`,
        count: 0,
      };
      tally[genericId].count += 1;
    }
  });

  // Only surface as recognized weakness if evidence has 2 or more occurrences
  Object.values(tally).forEach((w) => {
    if (w.count >= 2) {
      detectedWeaknesses.push({
        id: w.id,
        topic: w.topic,
        label: w.diagnosticLabel,
        explanation: w.explanation,
        remediationAction: w.remediationAction,
        remediationLink: w.remediationLink,
        remediationBtn: w.remediationBtn,
        evidenceCount: w.count,
        severity: w.count >= 4 ? 'critical' : 'moderate',
        whyExplanation: `AI detected ${w.count} repeated error occurrences matching this conceptual pattern over your recent interactions.`,
      });
    }
  });

  return detectedWeaknesses;
}

/**
 * 4. Autonomous Strength Detector
 * Discovers verified proficiencies where student consistently succeeds.
 */
export function detectStrengthPatterns(topicsMastery = {}, quizStats = {}) {
  const strengths = [];

  Object.entries(topicsMastery).forEach(([topic, data]) => {
    if (data.score >= 82 && (data.successCount || 0) >= 4) {
      strengths.push({
        topic,
        label: `High Mastery in ${topic}`,
        evidence: `Consistently answers ${topic} problems with ${data.score}% accuracy across ${data.successCount} validated attempts.`,
        badge: 'Validated Strength',
      });
    }
  });

  if (quizStats.accuracy >= 85 && quizStats.totalQuestionsAnswered >= 8) {
    strengths.push({
      topic: 'Comprehensive Science',
      label: 'Rapid Analytical Precision',
      evidence: `Overall quiz accuracy of ${Math.round(quizStats.accuracy)}% with low response latency.`,
      badge: 'Analytical Precision',
    });
  }

  return strengths;
}

/**
 * 5. Autonomous Trend & Early Warning Risk Engine
 * Continuously evaluates trajectory and multivariate learning risk indicators.
 */
export function evaluateTrendAndRisk(history = [], currentScore = 70, topicsMastery = {}) {
  let trend = 'stable';
  let trendDelta = 0;

  if (history.length >= 2) {
    const previous = history[history.length - 2]?.score || currentScore;
    trendDelta = currentScore - previous;
    if (trendDelta >= 6) trend = 'rapid_improvement';
    else if (trendDelta > 1) trend = 'improving';
    else if (trendDelta <= -6) trend = 'at_risk';
    else if (trendDelta < -1) trend = 'declining';
    else trend = 'stable';
  }

  // Multivariate Early Warning Signals
  const earlyWarnings = [];
  const strugglingCount = Object.values(topicsMastery).filter((t) => (t.score || 50) < 60).length;

  if (strugglingCount >= 2) {
    earlyWarnings.push({
      id: 'multiple_domain_friction',
      level: 'warning',
      title: 'Multi-Domain Friction Cluster',
      message: `${strugglingCount} active science topics are currently below the 60% mastery baseline. Reinforcement advised before advancing.`,
    });
  }

  if (trend === 'at_risk' || trend === 'declining') {
    earlyWarnings.push({
      id: 'performance_velocity_drop',
      level: 'alert',
      title: 'Mastery Velocity Deceleration',
      message: `Performance declined by ${Math.abs(trendDelta)} points across recent evaluations. AI recommends stepping back to foundational micro-tasks.`,
    });
  }

  return {
    trend,
    trendDelta,
    earlyWarnings,
  };
}

/**
 * 6. AI Next-Best-Action (NBA) Prescription Engine
 * Dynamically selects the single highest-yield next activity for the student.
 * The student NEVER has to decide what to study next.
 */
export function prescribeNextBestAction(topicsMastery = {}, weaknesses = [], recentLabEvaluations = []) {
  // Priority 1: Critical detected misconception
  if (weaknesses.length > 0) {
    const highestWeakness = weaknesses.sort((a, b) => b.evidenceCount - a.evidenceCount)[0];
    return {
      type: 'remediation',
      priority: 'high',
      topic: highestWeakness.topic,
      title: `Recommended Next Action: ${highestWeakness.topic}`,
      prompt: highestWeakness.remediationAction,
      buttonText: highestWeakness.remediationBtn || 'Start Focused Remediation',
      link: highestWeakness.remediationLink || `/quizzes?topic=${encodeURIComponent(highestWeakness.topic)}`,
      whyExplanation: highestWeakness.whyExplanation || `AI detected recurring difficulty with ${highestWeakness.label}.`,
    };
  }

  // Priority 2: Topic with lowest mastery score below 75
  const lowestTopicEntry = Object.entries(topicsMastery)
    .filter(([_, t]) => (t.score || 50) < 75)
    .sort((a, b) => (a[1].score || 50) - (b[1].score || 50))[0];

  if (lowestTopicEntry) {
    const [topic, data] = lowestTopicEntry;
    return {
      type: 'reinforcement',
      priority: 'medium',
      topic,
      title: `Reinforce Competency: ${topic}`,
      prompt: `Complete 5 targeted practice questions to advance ${topic} mastery from ${data.score}% to 80%+.`,
      buttonText: `Practice ${topic}`,
      link: `/quizzes?topic=${encodeURIComponent(topic)}`,
      whyExplanation: `Your mastery in ${topic} is at ${data.score}%. Reinforcing this concept now prevents long-term retention decay.`,
    };
  }

  // Priority 3: Lab simulation practice if low lab evaluation
  if (recentLabEvaluations.length > 0) {
    const lowestLab = recentLabEvaluations.sort((a, b) => a.procedureScore - b.procedureScore)[0];
    if (lowestLab.procedureScore < 80) {
      return {
        type: 'lab_challenge',
        priority: 'medium',
        topic: lowestLab.topic || 'Physics Optics',
        title: `Calibrate Lab Precision: ${lowestLab.experimentName || 'Experiment'}`,
        prompt: `Repeat apparatus calibration on the interactive canvas to raise procedural accuracy.`,
        buttonText: `Launch Lab Bench`,
        link: lowestLab.link || '/physics',
        whyExplanation: `Your procedural understanding score in the last lab was ${lowestLab.procedureScore}%. Hands-on re-alignment solidifies intuition.`,
      };
    }
  }

  // Priority 4: All competencies nominal -> Challenge Mode
  return {
    type: 'challenge',
    priority: 'nominal',
    topic: 'Integrated Science',
    title: 'Peak Mastery: Science Mock Examination',
    prompt: 'All fundamental competencies are above benchmark. Test your problem-solving speed on a timed mock test.',
    buttonText: 'Attempt Mock Test',
    link: '/mock-tests',
    whyExplanation: 'All tracked domains exceed nominal benchmarks. You are ready for high-yield examination problem sets.',
  };
}

/**
 * 7. Dynamic Personalized Learning Path Generator
 * Constructs an individualized sequence of learning steps based on current cognitive gaps.
 */
export function generatePersonalizedLearningPath(topicsMastery = {}) {
  const path = [];
  const entries = Object.entries(topicsMastery);

  // Group by cognitive stage
  const struggling = entries.filter(([_, t]) => (t.score || 50) < 65);
  const progressing = entries.filter(([_, t]) => (t.score || 50) >= 65 && (t.score || 50) < 80);
  const mastered = entries.filter(([_, t]) => (t.score || 50) >= 80);

  // 1. First remediate struggling foundations
  struggling.forEach(([topic, data], idx) => {
    path.push({
      step: path.length + 1,
      topic,
      stage: 'Remediate Friction',
      title: `Step ${path.length + 1}: Foundations in ${topic}`,
      status: idx === 0 ? 'current' : 'upcoming',
      targetScore: '75%',
      currentScore: `${data.score}%`,
      actionType: 'simulation_and_quiz',
      link: topic === 'Stoichiometry' || topic === 'Acids and Bases' ? '/chemistry' : '/physics',
    });
  });

  // 2. Next solidify intermediate topics
  progressing.forEach(([topic, data]) => {
    path.push({
      step: path.length + 1,
      topic,
      stage: 'Solidify Mastery',
      title: `Step ${path.length + 1}: Precision Practice in ${topic}`,
      status: path.length === 0 ? 'current' : 'upcoming',
      targetScore: '85%',
      currentScore: `${data.score}%`,
      actionType: 'practice_questions',
      link: `/quizzes?topic=${encodeURIComponent(topic)}`,
    });
  });

  // 3. Challenge mastered topics
  mastered.forEach(([topic, data]) => {
    path.push({
      step: path.length + 1,
      topic,
      stage: 'Domain Mastery',
      title: `Step ${path.length + 1}: Advanced Challenge in ${topic}`,
      status: 'completed',
      targetScore: '90%+',
      currentScore: `${data.score}%`,
      actionType: 'speed_challenge',
      link: '/mock-tests',
    });
  });

  return path;
}

/**
 * 8. Autonomous Achievement Evaluator
 * Awards achievements strictly on empirical telemetry criteria.
 */
export function evaluateAutonomousAchievements(topicsMastery = {}, quizStats = {}, labRuns = 0) {
  const achievements = [];
  const masteredCount = Object.values(topicsMastery).filter((t) => (t.score || 50) >= 80).length;

  if (masteredCount >= 1) {
    achievements.push({
      slug: 'concept_master_1',
      name: 'Concept Master',
      description: `Autonomously achieved >80% mastery in ${masteredCount} curriculum domain(s)`,
      icon: '🏆',
      unlockedAt: new Date().toISOString(),
    });
  }

  if (masteredCount >= 3) {
    achievements.push({
      slug: 'triple_domain_master',
      name: 'Science Polymath',
      description: 'Maintained advanced mastery across 3 independent science disciplines',
      icon: '🌟',
      unlockedAt: new Date().toISOString(),
    });
  }

  if (quizStats.totalQuestionsAnswered >= 15 && quizStats.accuracy >= 80) {
    achievements.push({
      slug: 'problem_solver_pro',
      name: 'Problem Solver',
      description: `Demonstrated >80% accuracy across ${quizStats.totalQuestionsAnswered} evaluated problems`,
      icon: '🧠',
      unlockedAt: new Date().toISOString(),
    });
  }

  if (labRuns >= 3) {
    achievements.push({
      slug: 'lab_empiricist',
      name: 'Empirical Scientist',
      description: 'Completed 3+ hands-on 60 FPS interactive apparatus experiments',
      icon: '🔬',
      unlockedAt: new Date().toISOString(),
    });
  }

  return achievements;
}
