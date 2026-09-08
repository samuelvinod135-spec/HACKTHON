import { create } from 'zustand';
import { supabase } from '../supabase.js';

// Pre-seeded topic telemetry baseline for rich institutional reporting
const INITIAL_TOPIC_STATS = {
  'Kinematics': {
    topic: 'Kinematics',
    dwellMs: 1420000, // ~23 mins
    errorCount: 4,
    successCount: 11,
    interactionsCount: 45,
    lastActive: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    status: 'struggling', // flagged by stealth engine
  },
  'Ray Optics': {
    topic: 'Ray Optics',
    dwellMs: 2100000, // 35 mins
    errorCount: 1,
    successCount: 19,
    interactionsCount: 78,
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'nominal',
  },
  'Stoichiometry': {
    topic: 'Stoichiometry',
    dwellMs: 1800000, // 30 mins
    errorCount: 5,
    successCount: 8,
    interactionsCount: 38,
    lastActive: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    status: 'struggling',
  },
  'Thermodynamics': {
    topic: 'Thermodynamics',
    dwellMs: 980000,
    errorCount: 2,
    successCount: 14,
    interactionsCount: 32,
    lastActive: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: 'nominal',
  },
  'Acids and Bases': {
    topic: 'Acids and Bases',
    dwellMs: 2450000,
    errorCount: 1,
    successCount: 22,
    interactionsCount: 65,
    lastActive: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    status: 'mastered',
  },
  'Harmonic Motion': {
    topic: 'Harmonic Motion',
    dwellMs: 1150000,
    errorCount: 3,
    successCount: 9,
    interactionsCount: 29,
    lastActive: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'nominal',
  },
};

export const useTelemetryStore = create((set, get) => ({
  events: [],
  topicStats: INITIAL_TOPIC_STATS,
  activeTimers: {},

  /**
   * Log an event into memory ring buffer
   */
  logEvent: (event) => {
    const enriched = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...event,
    };

    set((state) => {
      const topic = event.topic || 'General Science';
      const existing = state.topicStats[topic] || {
        topic,
        dwellMs: 0,
        errorCount: 0,
        successCount: 0,
        interactionsCount: 0,
        lastActive: new Date().toISOString(),
        status: 'nominal',
      };

      const isError = event.event_type === 'quiz_error' || event.event_type === 'task_fail' || event.error_count > 0;
      const isSuccess = event.success_flag !== false && !isError;

      const newErrors = existing.errorCount + (isError ? (event.error_count || 1) : 0);
      const newSuccess = existing.successCount + (isSuccess ? 1 : 0);
      const newDwell = existing.dwellMs + (event.dwell_time_ms || 0);

      // Evaluate status based on empirical telemetry
      let status = 'nominal';
      const totalAttempts = newErrors + newSuccess;
      const successRate = totalAttempts > 0 ? (newSuccess / totalAttempts) : 1;

      if (newErrors >= 3 || successRate < 0.6) {
        status = 'struggling';
      } else if (successRate >= 0.85 && totalAttempts >= 8) {
        status = 'mastered';
      }

      return {
        events: [enriched, ...state.events.slice(0, 99)], // keep last 100
        topicStats: {
          ...state.topicStats,
          [topic]: {
            ...existing,
            dwellMs: newDwell,
            errorCount: newErrors,
            successCount: newSuccess,
            interactionsCount: existing.interactionsCount + 1,
            lastActive: new Date().toISOString(),
            status,
          },
        },
      };
    });
  },

  startTopicTimer: (topic) => {
    set((state) => ({
      activeTimers: {
        ...state.activeTimers,
        [topic]: Date.now(),
      },
    }));
  },

  stopTopicTimer: (topic) => {
    const state = get();
    const start = state.activeTimers[topic];
    if (!start) return 0;
    const elapsed = Date.now() - start;

    set((prev) => {
      const copy = { ...prev.activeTimers };
      delete copy[topic];
      return { activeTimers: copy };
    });

    state.logEvent({
      event_type: 'topic_dwell',
      topic,
      dwell_time_ms: elapsed,
      success_flag: true,
    });

    return elapsed;
  },

  getTopicMasteryScore: (topic) => {
    const stats = get().topicStats[topic];
    if (!stats) return 75;
    const total = stats.errorCount + stats.successCount;
    if (total === 0) return 75;
    const rate = stats.successCount / total;
    return Math.round(rate * 100);
  },

  getAllTopicSummaries: () => {
    const stats = get().topicStats;
    return Object.values(stats);
  },

  /**
   * Resets in-memory telemetry buffer and topic stats on user logout
   */
  resetStore: () => {
    set({
      events: [],
      activeTimers: {},
      topicStats: INITIAL_TOPIC_STATS,
    });
  },
}));
