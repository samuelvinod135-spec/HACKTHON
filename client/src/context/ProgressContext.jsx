import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api.js';

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
      const data = await api.recordCompletion({
        kind,
        ref,
        xp,
        achievements: unlockThese,
      });
      setStudent(data.student);
      setAchievements(data.achievements);
      setCompletions(data.completions);
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
