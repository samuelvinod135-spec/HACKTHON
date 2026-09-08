import { create } from 'zustand';

// Pre-configured adaptive scaffolds tailored to CBSE/NCERT curriculum
const SCAFFOLD_CATALOG = {
  Kinematics: {
    topic: 'Kinematics',
    diagnosticGap: "Non-Linear Acceleration & Kinematic Equations (v² = u² + 2as)",
    visualGuideActive: true,
    visualGuideType: 'velocity_vectors',
    visualGuideDescription: 'Ambient velocity vector arrows & apex trajectory ghost path enabled',
    suggestedParameter: {
      controlId: 'launch-velocity',
      recommendedValue: '28 m/s',
      hint: 'Notice how initial velocity component vy dictates total air time.',
    },
    dynamicMicroExercise: {
      id: 'scaffold-kinematics-1',
      title: 'Autonomous Practice: 45° Trajectory Apex Calibration',
      equation: 'R = (u² sin 2θ) / g',
      taskPrompt: 'Adjust launch angle to exactly 45° and observe range maximization at 80m.',
      rewardCredits: 50,
      xpType: 'Kinematic Foundation',
    },
  },
  'Ray Optics': {
    topic: 'Ray Optics',
    diagnosticGap: "Snell's Law of Refraction & Convex Lens Convergence",
    visualGuideActive: true,
    visualGuideType: 'ghost_focal_guide',
    visualGuideDescription: 'Focal axis convergence guide & Snell normal vectors subtly highlighted',
    suggestedParameter: {
      controlId: 'focal-length-slider',
      recommendedValue: '170 px',
      hint: 'Biconvex lens focuses parallel laser rays at distance f = R / 2(n - 1).',
    },
    dynamicMicroExercise: {
      id: 'scaffold-optics-1',
      title: 'Autonomous Practice: Parallel Beam Focal Convergence',
      equation: '1/f = (n - 1)(1/R₁ - 1/R₂)',
      taskPrompt: 'Align laser box parallel to lens axis until focal convergence point sharpens.',
      rewardCredits: 50,
      xpType: 'Optics Intuition',
    },
  },
  Stoichiometry: {
    topic: 'Stoichiometry',
    diagnosticGap: 'Molar Ratios & Limiting Reagent Balance in Exothermic Reactions',
    visualGuideActive: true,
    visualGuideType: 'molar_ratio_pill',
    visualGuideDescription: 'Stoichiometric mole ratio balance indicator highlighted',
    suggestedParameter: {
      controlId: 'molar-ratio-slider',
      recommendedValue: '2 : 1 Ratio',
      hint: '2 moles of Magnesium react strictly with 1 mole of diatomic Oxygen.',
    },
    dynamicMicroExercise: {
      id: 'scaffold-stoich-1',
      title: 'Autonomous Practice: Balancing Magnesium Oxidation Moles',
      equation: '2Mg(s) + O₂(g) → 2MgO(s)',
      taskPrompt: 'Select stoichiometric coefficients to prevent unreacted excess oxygen.',
      rewardCredits: 50,
      xpType: 'Stoichiometric Precision',
    },
  },
  Thermodynamics: {
    topic: 'Thermodynamics',
    diagnosticGap: 'Exothermic Enthalpy Release (ΔH < 0) & Activation Energy',
    visualGuideActive: true,
    visualGuideType: 'enthalpy_graph_glow',
    visualGuideDescription: 'Reaction coordinate enthalpy profile subtly expanded',
    suggestedParameter: {
      controlId: 'temperature-slider',
      recommendedValue: 'ΔH = -1204 kJ/mol',
      hint: 'High negative enthalpy indicates intense lattice stabilization of MgO.',
    },
    dynamicMicroExercise: {
      id: 'scaffold-thermo-1',
      title: 'Autonomous Practice: Activation Energy Barrier Crossing',
      equation: 'k = A · e^(-Ea / RT)',
      taskPrompt: 'Raise Bunsen burner temperature past Activation Energy threshold.',
      rewardCredits: 50,
      xpType: 'Thermodynamic Insight',
    },
  },
};

export const useStealthScaffoldingStore = create((set, get) => ({
  // Active struggling topics flagged for this student
  strugglingTopics: ['Kinematics', 'Stoichiometry'],
  
  // Topic error counters for real-time tracking
  topicErrorCounters: {
    Kinematics: 3,
    Stoichiometry: 2,
    'Ray Optics': 0,
    Thermodynamics: 1,
  },

  // Active environmental scaffolding configurations
  activeScaffolds: {
    Kinematics: SCAFFOLD_CATALOG.Kinematics,
    Stoichiometry: SCAFFOLD_CATALOG.Stoichiometry,
  },

  // Log of recent autonomous AI actions (for Teacher Cockpit ingestion)
  interventionHistory: [
    {
      id: 'int-1',
      topic: 'Kinematics',
      timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
      action: 'Enabled Trajectory Velocity Vectors & Injected 45° Range Calibration Exercise',
      severity: 'moderate_struggle',
      resolved: false,
    },
    {
      id: 'int-2',
      topic: 'Stoichiometry',
      timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
      action: 'Subtly Highlighted 2:1 Magnesium Molar Ratio Indicator',
      severity: 'moderate_struggle',
      resolved: false,
    },
  ],

  /**
   * Evaluates incoming telemetry events in real-time on the client.
   * Zero latency, zero server bottlenecks, massive concurrency.
   */
  evaluateTelemetryEvent: (event) => {
    const topic = event.topic;
    if (!topic) return;

    const isError =
      event.event_type === 'quiz_error' ||
      event.event_type === 'task_fail' ||
      event.error_count > 0;

    const isSuccess = event.success_flag === true && !isError;

    set((state) => {
      const currentErrors = (state.topicErrorCounters[topic] || 0) + (isError ? 1 : 0);
      const isAlreadyStruggling = state.strugglingTopics.includes(topic);

      // Trigger condition: 2 or more errors in a topic activates Stealth Scaffolding
      if (isError && currentErrors >= 2 && !isAlreadyStruggling) {
        const scaffoldData = SCAFFOLD_CATALOG[topic] || {
          topic,
          diagnosticGap: `Conceptual fundamentals in ${topic}`,
          visualGuideActive: true,
          visualGuideType: 'ambient_guidance_glow',
          visualGuideDescription: `Guidance indicators active for ${topic}`,
          dynamicMicroExercise: {
            id: `scaffold-${topic}-${Date.now()}`,
            title: `Practice: First Principles in ${topic}`,
            equation: 'Target Reinforcement',
            taskPrompt: `Review fundamental relationships in ${topic} to solidify intuition.`,
            rewardCredits: 40,
          },
        };

        const newIntervention = {
          id: `int-${Date.now()}`,
          topic,
          timestamp: new Date().toISOString(),
          action: `Stealth Scaffolding deployed: ${scaffoldData.visualGuideDescription}`,
          severity: currentErrors >= 4 ? 'critical_lag' : 'moderate_struggle',
          resolved: false,
        };

        return {
          topicErrorCounters: { ...state.topicErrorCounters, [topic]: currentErrors },
          strugglingTopics: [...state.strugglingTopics, topic],
          activeScaffolds: { ...state.activeScaffolds, [topic]: scaffoldData },
          interventionHistory: [newIntervention, ...state.interventionHistory],
        };
      }

      // If student achieves 2 consecutive successes in struggling topic, quietly resolve scaffold
      if (isSuccess && isAlreadyStruggling && currentErrors > 0) {
        const remainingErrors = Math.max(0, currentErrors - 1);
        if (remainingErrors === 0) {
          const updatedStruggling = state.strugglingTopics.filter((t) => t !== topic);
          const updatedScaffolds = { ...state.activeScaffolds };
          delete updatedScaffolds[topic];

          return {
            topicErrorCounters: { ...state.topicErrorCounters, [topic]: 0 },
            strugglingTopics: updatedStruggling,
            activeScaffolds: updatedScaffolds,
            interventionHistory: [
              {
                id: `int-resolved-${Date.now()}`,
                topic,
                timestamp: new Date().toISOString(),
                action: `Autonomous Remediation Succeeded: Student restored mastery in ${topic}`,
                severity: 'resolved',
                resolved: true,
              },
              ...state.interventionHistory,
            ],
          };
        }

        return {
          topicErrorCounters: { ...state.topicErrorCounters, [topic]: remainingErrors },
        };
      }

      return {
        topicErrorCounters: { ...state.topicErrorCounters, [topic]: currentErrors },
      };
    });
  },

  /**
   * Manually test trigger scaffolding for demonstrational purposes
   */
  triggerScaffoldingForTopic: (topic) => {
    const catalogItem = SCAFFOLD_CATALOG[topic] || SCAFFOLD_CATALOG.Kinematics;
    set((state) => ({
      strugglingTopics: state.strugglingTopics.includes(topic)
        ? state.strugglingTopics
        : [...state.strugglingTopics, topic],
      activeScaffolds: { ...state.activeScaffolds, [topic]: catalogItem },
      interventionHistory: [
        {
          id: `manual-${Date.now()}`,
          topic,
          timestamp: new Date().toISOString(),
          action: `Simulated diagnostic struggle: Deployed ${catalogItem.visualGuideDescription}`,
          severity: 'moderate_struggle',
          resolved: false,
        },
        ...state.interventionHistory,
      ],
    }));
  },

  /**
   * Manually resolve scaffolding
   */
  resolveScaffoldingForTopic: (topic) => {
    set((state) => {
      const updated = { ...state.activeScaffolds };
      delete updated[topic];
      return {
        strugglingTopics: state.strugglingTopics.filter((t) => t !== topic),
        activeScaffolds: updated,
      };
    });
  },
}));
