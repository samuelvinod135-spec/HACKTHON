import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabase.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useTelemetryStore } from '../store/useTelemetryStore.js';
import { useStealthScaffoldingStore } from '../store/useStealthScaffoldingStore.js';

// In-memory batch queue to guarantee 60 FPS performance without blocking simulation frames
let eventQueue = [];
let flushTimeout = null;

async function flushTelemetryQueue() {
  if (eventQueue.length === 0) return;
  const batch = [...eventQueue];
  eventQueue = [];

  try {
    // Write batch to Supabase student_telemetry_events
    await supabase.from('student_telemetry_events').insert(
      batch.map((ev) => ({
        user_id: ev.user_id || null,
        institution_id: ev.institution_id || null,
        cohort_id: ev.cohort_id || null,
        event_type: ev.event_type,
        topic: ev.topic,
        subtopic: ev.subtopic || null,
        dwell_time_ms: ev.dwell_time_ms || 0,
        error_count: ev.error_count || 0,
        success_flag: ev.success_flag !== false,
        payload: ev.payload || {},
        recorded_at: ev.timestamp || new Date().toISOString(),
      }))
    );
  } catch (err) {
    // Offline resilience: silent fallback to local storage buffer
    try {
      const stored = JSON.parse(localStorage.getItem('labxplore_telemetry_offline_queue') || '[]');
      localStorage.setItem(
        'labxplore_telemetry_offline_queue',
        JSON.stringify([...stored.slice(-200), ...batch])
      );
    } catch {}
  }
}

function scheduleFlush() {
  if (flushTimeout) return;
  // Use requestIdleCallback if available, or 4000ms debounce
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    flushTimeout = setTimeout(() => {
      window.requestIdleCallback(() => {
        flushTelemetryQueue();
        flushTimeout = null;
      });
    }, 4000);
  } else {
    flushTimeout = setTimeout(() => {
      flushTelemetryQueue();
      flushTimeout = null;
    }, 4000);
  }
}

/**
 * Lightweight, non-blocking pervasive telemetry hook
 */
export function useTelemetry(activeTopic = null, activeSubtopic = null) {
  const { user, profile } = useAuth();
  const logEventToStore = useTelemetryStore((s) => s.logEvent);
  const evaluateScaffolding = useStealthScaffoldingStore((s) => s.evaluateTelemetryEvent);

  const topicRef = useRef(activeTopic);
  const subtopicRef = useRef(activeSubtopic);
  const dwellStartRef = useRef(Date.now());

  topicRef.current = activeTopic;
  subtopicRef.current = activeSubtopic;

  // Track an explicit interaction without blocking rendering
  const trackInteraction = useCallback(
    (topic, subtopic, payload = {}, eventType = 'simulation_interaction') => {
      const ev = {
        user_id: user?.id || profile?.id,
        institution_id: profile?.institution_id,
        cohort_id: profile?.cohort_id,
        event_type: eventType,
        topic: topic || topicRef.current || 'General Science',
        subtopic: subtopic || subtopicRef.current,
        payload,
        success_flag: true,
        timestamp: new Date().toISOString(),
      };

      // 1. Instantly update local store for UI feedback
      logEventToStore(ev);

      // 2. Feed local Stealth Scaffolding engine for zero-friction client-side adaptation
      evaluateScaffolding(ev);

      // 3. Queue for background async batch push
      eventQueue.push(ev);
      scheduleFlush();
    },
    [user?.id, profile?.id, profile?.institution_id, profile?.cohort_id, logEventToStore, evaluateScaffolding]
  );

  // Track student mistake or conceptual failure
  const trackError = useCallback(
    (topic, subtopic, errorDetails = {}, eventType = 'quiz_error') => {
      const ev = {
        user_id: user?.id || profile?.id,
        institution_id: profile?.institution_id,
        cohort_id: profile?.cohort_id,
        event_type: eventType,
        topic: topic || topicRef.current || 'General Science',
        subtopic: subtopic || subtopicRef.current,
        error_count: 1,
        success_flag: false,
        payload: errorDetails,
        timestamp: new Date().toISOString(),
      };

      logEventToStore(ev);
      evaluateScaffolding(ev);
      eventQueue.push(ev);
      scheduleFlush();
    },
    [user?.id, profile?.id, profile?.institution_id, profile?.cohort_id, logEventToStore, evaluateScaffolding]
  );

  // Automatically record dwell time on mount/unmount of topics
  useEffect(() => {
    if (!activeTopic) return;
    dwellStartRef.current = Date.now();

    return () => {
      const dwellMs = Date.now() - dwellStartRef.current;
      if (dwellMs > 1000) {
        const ev = {
          user_id: user?.id || profile?.id,
          institution_id: profile?.institution_id,
          cohort_id: profile?.cohort_id,
          event_type: 'topic_dwell',
          topic: activeTopic,
          subtopic: subtopicRef.current,
          dwell_time_ms: dwellMs,
          success_flag: true,
          timestamp: new Date().toISOString(),
        };

        logEventToStore(ev);
        evaluateScaffolding(ev);
        eventQueue.push(ev);
        scheduleFlush();
      }
    };
  }, [activeTopic, user?.id, profile?.id, profile?.institution_id, profile?.cohort_id, logEventToStore, evaluateScaffolding]);

  return {
    trackInteraction,
    trackError,
  };
}
