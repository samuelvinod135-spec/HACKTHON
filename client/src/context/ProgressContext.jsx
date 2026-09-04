import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api.js';
import { supabase } from '../supabase.js';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [s, a, c] = await Promise.all([
        api.getStudent(),
        api.getAchievements(),
        api.getCompletions(),
      ]);
      setStudent(s.student);
      setAchievements(s.achievements || a);
      setCompletions(c);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const record = useCallback(
    async ({ kind, ref, xp = 0, achievements: unlockThese = [] }) => {
      let data;
      try {
        data = await api.recordCompletion({
          kind,
          ref,
          xp,
          achievements: unlockThese,
        });
        setStudent(data.student);
        setAchievements(data.achievements);
        setCompletions(data.completions);
      } catch (err) {
        console.warn('Backend completion call note:', err);
      }

      // Also persist to Supabase if authenticated
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase.from('lab_completions').upsert({
            user_id: session.user.id,
            kind,
            ref,
            xp_earned: xp,
          });
        }
      } catch (e) {
        // silent failover
      }

      return data;
    },
    []
  );

  const value = { student, achievements, completions, loading, refresh, record };
  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
