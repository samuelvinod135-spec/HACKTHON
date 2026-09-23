import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api.js';
import { supabase } from '../supabase.js';
import { useAuth } from './AuthContext.jsx';
import { useAutonomousProfileStore } from '../store/useAutonomousProfileStore.js';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { user, profile } = useAuth();
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
      setStudent(
        s?.student || {
          name: profile?.full_name || profile?.username || 'Scholar',
          level: profile?.level ?? 1,
          xp: profile?.xp ?? 0,
          xp_for_level: profile?.xp_for_level ?? 1000,
        }
      );
      setAchievements(s?.achievements || a || []);
      setCompletions(c || []);
      try {
        useAutonomousProfileStore.getState().syncFromCompletions(c || []);
      } catch {}
    } catch (err) {
      console.warn('ProgressContext refresh fallback:', err);
      setStudent((prev) => prev || {
        name: profile?.full_name || 'Scholar',
        level: profile?.level ?? 1,
        xp: profile?.xp ?? 0,
        xp_for_level: profile?.xp_for_level ?? 1000,
      });
      setAchievements((prev) => (prev?.length > 0 ? prev : []));
      setCompletions((prev) => (prev?.length > 0 ? prev : []));
    } finally {
      setLoading(false);
    }
  }, [profile?.full_name, profile?.username, profile?.level, profile?.xp, profile?.xp_for_level]);

  // When user ID changes (or new user logs in), reset state immediately and refresh
  useEffect(() => {
    setStudent({
      name: profile?.full_name || profile?.username || 'Scholar',
      level: profile?.level ?? 1,
      xp: profile?.xp ?? 0,
      xp_for_level: profile?.xp_for_level ?? 1000,
    });
    setAchievements([]);
    setCompletions([]);
    refresh();
  }, [user?.id, refresh]);

  // Listen to global user-changed and auth-signout events
  useEffect(() => {
    const handleUserChanged = () => {
      refresh();
    };
    const handleSignOut = () => {
      setStudent({ name: 'Scholar', level: 1, xp: 0, xp_for_level: 1000 });
      setAchievements([]);
      setCompletions([]);
      try {
        useAutonomousProfileStore.getState().resetProfile();
      } catch {}
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('labxplore:user-changed', handleUserChanged);
      window.addEventListener('labxplore:auth-signout', handleSignOut);
      return () => {
        window.removeEventListener('labxplore:user-changed', handleUserChanged);
        window.removeEventListener('labxplore:auth-signout', handleSignOut);
      };
    }
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
        if (data?.student) setStudent(data.student);
        if (data?.achievements) setAchievements(data.achievements);
        if (data?.completions) setCompletions(data.completions);
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

  const resetProgress = useCallback(async () => {
    try {
      await api.resetStudentData();
    } catch {}
    setStudent({ name: profile?.full_name || 'Scholar', level: 1, xp: 0, xp_for_level: 1000 });
    setAchievements([]);
    setCompletions([]);
  }, [profile?.full_name]);

  const value = { student, achievements, completions, loading, refresh, record, resetProgress };
  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
