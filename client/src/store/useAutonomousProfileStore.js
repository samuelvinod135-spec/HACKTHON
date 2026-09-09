import { create } from 'zustand';
import {
  CURRICULUM_TOPICS,
  calculateUpdatedMastery,
  calculateOverallProgressScore,
  detectWeaknessPatterns,
  detectStrengthPatterns,
  evaluateTrendAndRisk,
  prescribeNextBestAction,
  generatePersonalizedLearningPath,
  evaluateAutonomousAchievements,
} from '../services/autonomousLearningEngine.js';

const STORAGE_KEY = 'labxplore_autonomous_profile_v2';

const INITIAL_TOPIC_MASTERY = {
  Kinematics: { score: 62, successCount: 6, errorCount: 4, attempts: 10, lastUpdated: new Date().toISOString() },
  'Ray Optics': { score: 88, successCount: 16, errorCount: 2, attempts: 18, lastUpdated: new Date().toISOString() },
  Stoichiometry: { score: 54, successCount: 5, errorCount: 5, attempts: 10, lastUpdated: new Date().toISOString() },
  Thermodynamics: { score: 76, successCount: 11, errorCount: 3, attempts: 14, lastUpdated: new Date().toISOString() },
  'Acids and Bases': { score: 92, successCount: 20, errorCount: 1, attempts: 21, lastUpdated: new Date().toISOString() },
  'Harmonic Motion': { score: 70, successCount: 8, errorCount: 3, attempts: 11, lastUpdated: new Date().toISOString() },
};

const INITIAL_ERRORS = [
  {
    id: 'seed_err_1',
    topic: 'Kinematics',
    questionText: 'A ball thrown upwards has downward acceleration -g at apex',
    pickedOption: 'Positive direction acceleration',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'seed_err_2',
    topic: 'Kinematics',
    questionText: 'Vector direction sign of velocity during freefall downward',
    pickedOption: 'Positive sign',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'seed_err_3',
    topic: 'Stoichiometry',
    questionText: 'Balancing equation Al + O2 -> Al2O3 by changing subscript',
    pickedOption: 'Change O2 subscript to 3',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'seed_err_4',
    topic: 'Stoichiometry',
    questionText: 'Balancing coefficient placement for 2Mg + O2',
    pickedOption: 'Mg2 + O2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

const INITIAL_LAB_EVALUATIONS = [
  {
    id: 'lab_optics_init',
    topic: 'Ray Optics',
    experimentName: 'Snell Law Refraction & Critical Angle Bench',
    procedureScore: 94,
    conceptScore: 90,
    accuracyScore: 92,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    link: '/physics',
  },
  {
    id: 'lab_chem_init',
    topic: 'Stoichiometry',
    experimentName: 'Exothermic Neutralization & Gas Evolution',
    procedureScore: 72,
    conceptScore: 68,
    accuracyScore: 70,
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    link: '/chemistry?tab=drag-and-drop',
  },
];

const INITIAL_QUIZ_STATS = {
  totalQuestionsAnswered: 24,
  correctCount: 18,
  accuracy: 75,
};

function recomputeAll(topicsMastery, recentErrors, labEvaluations, quizStats, history = [], labRuns = 2) {
  const overall = calculateOverallProgressScore(topicsMastery, labEvaluations, quizStats);
  const weaknesses = detectWeaknessPatterns(recentErrors);
  const strengths = detectStrengthPatterns(topicsMastery, quizStats);
  const trendData = evaluateTrendAndRisk(history, overall.score, topicsMastery);
  const nextBestAction = prescribeNextBestAction(topicsMastery, weaknesses, labEvaluations);
  const learningPath = generatePersonalizedLearningPath(topicsMastery);
  const achievements = evaluateAutonomousAchievements(topicsMastery, quizStats, labRuns);

  return {
    overallScore: overall.score,
    overallExplanation: overall.explanation,
    weaknesses,
    strengths,
    trend: trendData.trend,
    trendDelta: trendData.trendDelta,
    earlyWarnings: trendData.earlyWarnings,
    nextBestAction,
    learningPath,
    achievements,
  };
}

function getInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.topicsMastery) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[AutonomousProfileStore] Failed to load cached profile, fallback to seed:', err);
  }

  const baseHistory = [
    { score: 68, timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
    { score: 71, timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
    { score: 74, timestamp: new Date(Date.now() - 86400000).toISOString() },
  ];

  const computed = recomputeAll(
    INITIAL_TOPIC_MASTERY,
    INITIAL_ERRORS,
    INITIAL_LAB_EVALUATIONS,
    INITIAL_QUIZ_STATS,
    baseHistory,
    2
  );

  return {
    topicsMastery: INITIAL_TOPIC_MASTERY,
    recentErrors: INITIAL_ERRORS,
    labEvaluations: INITIAL_LAB_EVALUATIONS,
    quizStats: INITIAL_QUIZ_STATS,
    history: baseHistory,
    labRuns: 2,
    ...computed,
    lastComputedAt: new Date().toISOString(),
  };
}

export const useAutonomousProfileStore = create((set, get) => ({
  ...getInitialState(),

  /**
   * Autonomous Quiz Response Ingestion
   * Zero manual intervention. Telemetry feeds directly from answer submissions.
   */
  recordQuizResponse: ({
    topic = 'Kinematics',
    isCorrect = false,
    difficulty = 1.5,
    questionText = '',
    pickedOption = '',
    subtopic = '',
    notes = '',
  }) => {
    set((state) => {
      const currentTopic = state.topicsMastery[topic] || {
        score: 50,
        successCount: 0,
        errorCount: 0,
        attempts: 0,
        lastUpdated: new Date().toISOString(),
      };

      const updatedScore = calculateUpdatedMastery(
        currentTopic.score,
        isCorrect,
        difficulty,
        currentTopic.attempts + 1
      );

      const updatedTopicsMastery = {
        ...state.topicsMastery,
        [topic]: {
          ...currentTopic,
          score: updatedScore,
          successCount: currentTopic.successCount + (isCorrect ? 1 : 0),
          errorCount: currentTopic.errorCount + (isCorrect ? 0 : 1),
          attempts: currentTopic.attempts + 1,
          lastUpdated: new Date().toISOString(),
        },
      };

      let updatedErrors = state.recentErrors;
      if (!isCorrect) {
        const newError = {
          id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          topic,
          questionText,
          pickedOption,
          subtopic,
          notes,
          timestamp: new Date().toISOString(),
        };
        // Retain last 30 errors for pattern detection
        updatedErrors = [newError, ...state.recentErrors].slice(0, 30);
      }

      const totalAnswered = state.quizStats.totalQuestionsAnswered + 1;
      const correctCount = state.quizStats.correctCount + (isCorrect ? 1 : 0);
      const updatedQuizStats = {
        totalQuestionsAnswered: totalAnswered,
        correctCount,
        accuracy: Math.round((correctCount / totalAnswered) * 100),
      };

      const computed = recomputeAll(
        updatedTopicsMastery,
        updatedErrors,
        state.labEvaluations,
        updatedQuizStats,
        state.history,
        state.labRuns
      );

      const updatedHistory = [
        ...state.history,
        { score: computed.overallScore, timestamp: new Date().toISOString() },
      ].slice(-20);

      const newState = {
        ...state,
        topicsMastery: updatedTopicsMastery,
        recentErrors: updatedErrors,
        quizStats: updatedQuizStats,
        history: updatedHistory,
        ...computed,
        lastComputedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        console.error('[AutonomousProfileStore] Save failed:', e);
      }

      return newState;
    });
  },

  /**
   * Autonomous Lab Interaction Ingestion
   * Zero manual intervention. Captures procedural accuracy and concept understanding
   * from 60fps canvas ray tracing, pendulum swings, or chemistry titrations.
   */
  recordLabInteraction: ({
    topic = 'Ray Optics',
    experimentName = 'Apparatus Calibration',
    procedureScore = 85,
    conceptScore = 80,
    accuracyScore = 82,
    link = '/physics',
  }) => {
    set((state) => {
      const newEvaluation = {
        id: `lab_${Date.now()}`,
        topic,
        experimentName,
        procedureScore: Math.max(0, Math.min(100, Math.round(procedureScore))),
        conceptScore: Math.max(0, Math.min(100, Math.round(conceptScore))),
        accuracyScore: Math.max(0, Math.min(100, Math.round(accuracyScore))),
        timestamp: new Date().toISOString(),
        link,
      };

      const updatedLabEvaluations = [newEvaluation, ...state.labEvaluations].slice(0, 15);
      const newLabRuns = state.labRuns + 1;

      // Also slightly boost topic mastery if lab was executed with high procedural score
      const currentTopic = state.topicsMastery[topic] || { score: 60, successCount: 0, errorCount: 0, attempts: 0 };
      const labDelta = procedureScore >= 80 ? 3 : -2;
      const updatedTopicScore = Math.max(10, Math.min(98, currentTopic.score + labDelta));

      const updatedTopicsMastery = {
        ...state.topicsMastery,
        [topic]: {
          ...currentTopic,
          score: updatedTopicScore,
          lastUpdated: new Date().toISOString(),
        },
      };

      const computed = recomputeAll(
        updatedTopicsMastery,
        state.recentErrors,
        updatedLabEvaluations,
        state.quizStats,
        state.history,
        newLabRuns
      );

      const updatedHistory = [
        ...state.history,
        { score: computed.overallScore, timestamp: new Date().toISOString() },
      ].slice(-20);

      const newState = {
        ...state,
        topicsMastery: updatedTopicsMastery,
        labEvaluations: updatedLabEvaluations,
        labRuns: newLabRuns,
        history: updatedHistory,
        ...computed,
        lastComputedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        console.error('[AutonomousProfileStore] Save failed:', e);
      }

      return newState;
    });
  },

  /**
   * Reset on user logout or session switch
   */
  resetProfile: () => {
    localStorage.removeItem(STORAGE_KEY);
    set(getInitialState());
  },
}));

// Listen for global auth signout event to guarantee no state leakage
if (typeof window !== 'undefined') {
  window.addEventListener('labxplore:auth-signout', () => {
    try {
      useAutonomousProfileStore.getState().resetProfile();
    } catch (e) {
      console.warn('[AutonomousProfileStore] Reset error on signout:', e);
    }
  });
}
