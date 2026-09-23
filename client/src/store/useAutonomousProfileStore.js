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

const ZERO_TOPIC_MASTERY = CURRICULUM_TOPICS.reduce((acc, topic) => {
  acc[topic] = { score: 0, successCount: 0, errorCount: 0, attempts: 0, lastUpdated: new Date().toISOString() };
  return acc;
}, {});

const ZERO_QUIZ_STATS = {
  totalQuestionsAnswered: 0,
  correctCount: 0,
  accuracy: 0,
};

function recomputeAll(topicsMastery, recentErrors, labEvaluations, quizStats, history = [], labRuns = 0) {
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
    console.warn('[AutonomousProfileStore] Failed to load cached profile, initializing at zero:', err);
  }

  const baseHistory = [
    { score: 0, timestamp: new Date().toISOString() },
  ];

  const computed = recomputeAll(
    ZERO_TOPIC_MASTERY,
    [],
    [],
    ZERO_QUIZ_STATS,
    baseHistory,
    0
  );

  return {
    topicsMastery: ZERO_TOPIC_MASTERY,
    recentErrors: [],
    labEvaluations: [],
    quizStats: ZERO_QUIZ_STATS,
    history: baseHistory,
    labRuns: 0,
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
   * Synchronize autonomous intelligence state from verified database completions
   */
  syncFromCompletions: (completions = []) => {
    set((state) => {
      if (!Array.isArray(completions) || completions.length === 0) {
        const fresh = getInitialState();
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        return fresh;
      }

      const experiments = completions.filter((c) => c.kind === 'experiment' || c.kind === 'observation');
      const quizzes = completions.filter((c) => c.kind === 'quiz' || c.kind === 'challenge');
      const labRuns = experiments.length;

      const labEvaluations = experiments.map((exp, idx) => ({
        id: `lab_eval_${exp.id || idx}`,
        topic: exp.ref?.includes('Optic') || exp.ref?.includes('Lens') || exp.ref?.includes('Projectile') ? 'Ray Optics' : 'Stoichiometry',
        experimentName: exp.ref || 'Lab Experiment',
        procedureScore: 85,
        conceptScore: 85,
        accuracyScore: 85,
        timestamp: exp.completed_at || new Date().toISOString(),
        link: exp.ref?.includes('Optic') || exp.ref?.includes('Projectile') ? '/physics' : '/chemistry?tab=drag-and-drop',
      }));

      const quizStats = {
        totalQuestionsAnswered: quizzes.length * 5,
        correctCount: Math.round(quizzes.length * 4),
        accuracy: quizzes.length > 0 ? 80 : 0,
      };

      const computed = recomputeAll(
        state.topicsMastery,
        state.recentErrors,
        labEvaluations,
        quizStats,
        state.history,
        labRuns
      );

      const newState = {
        ...state,
        labEvaluations,
        quizStats,
        labRuns,
        ...computed,
        lastComputedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch {}

      return newState;
    });
  },

  /**
   * Reset on user logout or session switch
   */
  resetProfile: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    set(getInitialState());
  },
}));

// Listen for global auth signout and user change events to guarantee no state leakage
if (typeof window !== 'undefined') {
  window.addEventListener('labxplore:auth-signout', () => {
    try {
      useAutonomousProfileStore.getState().resetProfile();
    } catch (e) {
      console.warn('[AutonomousProfileStore] Reset error on signout:', e);
    }
  });

  window.addEventListener('labxplore:user-changed', () => {
    try {
      useAutonomousProfileStore.getState().resetProfile();
    } catch (e) {
      console.warn('[AutonomousProfileStore] Reset error on user-changed:', e);
    }
  });
}
