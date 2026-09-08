import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabase.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useTelemetryStore } from '../store/useTelemetryStore.js';
import { useStealthScaffoldingStore } from '../store/useStealthScaffoldingStore.js';

// In-memory batch queue to guarantee 60 FPS performance without blocking simulation frames
let eventQueue = [];
let flushTimeout = null;

// Strict UUID v4 / PostgreSQL UUID regex validator
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function flushTelemetryQueue() {
  if (eventQueue.length === 0) return;
  const batch = [...eventQueue];
  eventQueue = [];

  const sanitizedBatch = batch.map((ev) => {
    const isUserUuid = typeof ev.user_id === 'string' && UUID_REGEX.test(ev.user_id);
    const isInstUuid = typeof ev.institution_id === 'string' && UUID_REGEX.test(ev.institution_id);
    const isCohortUuid = typeof ev.cohort_id === 'string' && UUID_REGEX.test(ev.cohort_id);

    return {
      user_id: isUserUuid ? ev.user_id : null,
      institution_id: isInstUuid ? ev.institution_id : null,
      cohort_id: isCohortUuid ? ev.cohort_id : null,
      event_type: ev.event_type,
      topic: ev.topic,
      subtopic: ev.subtopic || null,
      dwell_time_ms: ev.dwell_time_ms || 0,
      error_count: ev.error_count || 0,
      success_flag: ev.success_flag !== false,
      payload: {
        ...(ev.payload || {}),
        ...(!isUserUuid && ev.user_id ? { client_persona_id: ev.user_id } : {}),
      },
      recorded_at: ev.timestamp || new Date().toISOString(),
    };
  });

  try {
    // Write sanitized batch to Supabase student_telemetry_events
    await supabase.from('student_telemetry_events').insert(sanitizedBatch);
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
 * Drains stored offline events from localStorage back to Supabase when connectivity restores
 */
export async function drainOfflineQueue() {
  try {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('labxplore_telemetry_offline_queue');
    if (!raw) return;
    const stored = JSON.parse(raw);
    if (!Array.isArray(stored) || stored.length === 0) return;

    const sanitizedBatch = stored.map((ev) => {
      const isUserUuid = typeof ev.user_id === 'string' && UUID_REGEX.test(ev.user_id);
      const isInstUuid = typeof ev.institution_id === 'string' && UUID_REGEX.test(ev.institution_id);
      const isCohortUuid = typeof ev.cohort_id === 'string' && UUID_REGEX.test(ev.cohort_id);

      return {
        user_id: isUserUuid ? ev.user_id : null,
        institution_id: isInstUuid ? ev.institution_id : null,
        cohort_id: isCohortUuid ? ev.cohort_id : null,
        event_type: ev.event_type,
        topic: ev.topic,
        subtopic: ev.subtopic || null,
        dwell_time_ms: ev.dwell_time_ms || 0,
        error_count: ev.error_count || 0,
        success_flag: ev.success_flag !== false,
        payload: {
          ...(ev.payload || {}),
          ...(!isUserUuid && ev.user_id ? { client_persona_id: ev.user_id } : {}),
          replayed_from_offline: true,
        },
        recorded_at: ev.timestamp || new Date().toISOString(),
      };
    });

    const { error } = await supabase.from('student_telemetry_events').insert(sanitizedBatch);
    if (!error) {
      localStorage.removeItem('labxplore_telemetry_offline_queue');
      console.log(`[Telemetry] Auto-drained and synced ${sanitizedBatch.length} offline events to Supabase`);
    }
  } catch (err) {
    console.warn('[Telemetry] Offline drain retry note:', err);
  }
}

// Auto-attach online reconnect sync listener
if (typeof window !== 'undefined') {
  window.addEventListener('online', drainOfflineQueue);
  // Also attempt initial sync if there's internet
  if (navigator.onLine) {
    setTimeout(drainOfflineQueue, 2000);
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
