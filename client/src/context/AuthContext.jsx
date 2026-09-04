import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase.js';

const AuthContext = createContext(null);

const DEMO_STUDENT = {
  id: 'demo-alex-chen',
  isDemo: true,
  email: 'alex.chen@labxplore.edu',
  full_name: 'Alex Chen',
  username: 'alexchen',
  avatar_url: '/clay/avatar.jpg',
  level: 13,
  xp: 4250,
  xp_for_level: 6000,
  grade_level: 'Grade 10',
  role: 'student',
  streak_count: 7,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch or construct profile from Supabase
  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (data && !error) {
        const fullProfile = {
          ...data,
          email: authUser.email,
          level: data.level || 1,
          xp: data.xp || 0,
          xp_for_level: data.xp_for_level || 1000,
          avatar_url: data.avatar_url || '/clay/avatar.jpg',
          full_name: data.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Student',
        };
        setProfile(fullProfile);
        return fullProfile;
      }

      // If trigger hasn't fired yet or row missing, create it
      const fallback = {
        id: authUser.id,
        full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Student',
        email: authUser.email,
        avatar_url: authUser.user_metadata?.avatar_url || '/clay/avatar.jpg',
        level: 1,
        xp: 0,
        xp_for_level: 1000,
        grade_level: authUser.user_metadata?.grade_level || 'Grade 9-10',
        role: 'student',
        streak_count: 1,
      };

      await supabase.from('profiles').upsert(fallback).catch(() => {});
      setProfile(fallback);
      return fallback;
    } catch (err) {
      console.warn('Could not fetch Supabase profile:', err);
      const fallback = {
        id: authUser.id,
        full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Student',
        email: authUser.email,
        avatar_url: '/clay/avatar.jpg',
        level: 1,
        xp: 0,
        xp_for_level: 1000,
        grade_level: 'Grade 9-10',
      };
      setProfile(fallback);
      return fallback;
    }
  }, []);

  // Initialize session & listen to auth changes
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (initialSession?.user) {
          setSession(initialSession);
          setUser(initialSession.user);
          await loadProfile(initialSession.user);
        } else {
          // Check for saved demo user
          const savedDemo = localStorage.getItem('labxplore_demo_user');
          if (savedDemo) {
            try {
              const parsed = JSON.parse(savedDemo);
              setUser({ id: parsed.id, email: parsed.email, isDemo: true });
              setProfile(parsed);
            } catch {
              localStorage.removeItem('labxplore_demo_user');
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      if (newSession?.user) {
        localStorage.removeItem('labxplore_demo_user');
        setSession(newSession);
        setUser(newSession.user);
        await loadProfile(newSession.user);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setProfile(null);
        localStorage.removeItem('labxplore_demo_user');
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [loadProfile]);

  // Sign up with Email & Password
  const signUpWithEmail = async ({ email, password, fullName, gradeLevel }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            grade_level: gradeLevel || 'Grade 9-10',
            avatar_url: '/clay/avatar.jpg',
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await loadProfile(data.user);
      }
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Email & Password
  const signInWithEmail = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await loadProfile(data.user);
      }
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Continue with Google OAuth
  const signInWithGoogle = async () => {
    try {
      const redirectTo = `${window.location.origin}/dashboard`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error('Google OAuth error:', err);
      return { data: null, error: err };
    }
  };

  // Demo Login (Alex Chen, Level 13)
  const demoLogin = () => {
    localStorage.setItem('labxplore_demo_user', JSON.stringify(DEMO_STUDENT));
    setUser({ id: DEMO_STUDENT.id, email: DEMO_STUDENT.email, isDemo: true });
    setProfile(DEMO_STUDENT);
    setSession({ access_token: 'demo-token', user: DEMO_STUDENT });
  };

  // Sign out
  const signOut = async () => {
    localStorage.removeItem('labxplore_demo_user');
    setUser(null);
    setSession(null);
    setProfile(null);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Signout note:', err);
    }
  };

  // Update profile
  const updateProfile = async (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));

    if (user && !user.isDemo) {
      try {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);
      } catch (err) {
        console.error('Failed to persist profile update:', err);
      }
    } else if (user?.isDemo) {
      const updated = { ...DEMO_STUDENT, ...updates };
      localStorage.setItem('labxplore_demo_user', JSON.stringify(updated));
    }
  };

  // Add XP and handle leveling
  const addXp = async (amount) => {
    if (!amount || amount <= 0) return;

    setProfile((prev) => {
      const current = prev || DEMO_STUDENT;
      let newXp = (current.xp || 0) + amount;
      let newLevel = current.level || 1;
      let newXpForLevel = current.xp_for_level || 1000;

      while (newXp >= newXpForLevel) {
        newXp -= newXpForLevel;
        newLevel += 1;
        newXpForLevel = Math.round(newXpForLevel * 1.35);
      }

      const updated = {
        ...current,
        xp: newXp,
        level: newLevel,
        xp_for_level: newXpForLevel,
      };

      if (user && !user.isDemo) {
        supabase
          .from('profiles')
          .update({
            xp: newXp,
            level: newLevel,
            xp_for_level: newXpForLevel,
          })
          .eq('id', user.id)
          .catch(() => {});
      } else if (user?.isDemo) {
        localStorage.setItem('labxplore_demo_user', JSON.stringify(updated));
      }

      return updated;
    });
  };

  const value = {
    user,
    session,
    profile: profile || DEMO_STUDENT,
    loading,
    isAuthenticated: !!user,
    isDemo: !!user?.isDemo,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    demoLogin,
    signOut,
    updateProfile,
    addXp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
