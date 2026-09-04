import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase.js';
import { api } from '../api.js';

const AuthContext = createContext(null);

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
          full_name:
            data.full_name ||
            authUser.user_metadata?.full_name ||
            authUser.email?.split('@')[0] ||
            'Scholar',
          grade_level: data.grade_level || authUser.user_metadata?.grade_level || 'Grade 9-10',
          role: data.role || 'student',
        };
        setProfile(fullProfile);
        // Sync with backend SQLite
        api.updateStudent({
          name: fullProfile.full_name,
          level: fullProfile.level,
          xp: fullProfile.xp,
          xp_for_level: fullProfile.xp_for_level,
        }).catch(() => {});
        return fullProfile;
      }

      // If profile row doesn't exist yet, insert real user profile
      const initialProfile = {
        id: authUser.id,
        full_name:
          authUser.user_metadata?.full_name ||
          authUser.email?.split('@')[0] ||
          'Scholar',
        email: authUser.email,
        avatar_url: authUser.user_metadata?.avatar_url || '/clay/avatar.jpg',
        level: 1,
        xp: 0,
        xp_for_level: 1000,
        grade_level: authUser.user_metadata?.grade_level || 'Grade 9-10',
        role: 'student',
        streak_count: 1,
      };

      await supabase.from('profiles').upsert(initialProfile).catch(() => {});
      setProfile(initialProfile);
      api.updateStudent({
        name: initialProfile.full_name,
        level: initialProfile.level,
        xp: initialProfile.xp,
        xp_for_level: initialProfile.xp_for_level,
      }).catch(() => {});
      return initialProfile;
    } catch (err) {
      console.warn('Could not fetch Supabase profile:', err);
      const fallback = {
        id: authUser.id,
        full_name:
          authUser.user_metadata?.full_name ||
          authUser.email?.split('@')[0] ||
          'Scholar',
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

    // Clean up any legacy demo state
    try {
      localStorage.removeItem('labxplore_demo_user');
    } catch {}

    async function initAuth() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (initialSession?.user) {
          setSession(initialSession);
          setUser(initialSession.user);
          await loadProfile(initialSession.user);
        } else {
          setUser(null);
          setProfile(null);
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
        setSession(newSession);
        setUser(newSession.user);
        await loadProfile(newSession.user);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setProfile(null);
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

  // Sign out
  const signOut = async () => {
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
    setProfile((prev) => (prev ? { ...prev, ...updates } : updates));

    if (user) {
      try {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);
      } catch (err) {
        console.error('Failed to persist profile update to Supabase:', err);
      }
      try {
        await api.updateStudent({
          name: updates.full_name,
          level: updates.level,
          xp: updates.xp,
          xp_for_level: updates.xp_for_level,
        });
      } catch (e) {}
    }
  };

  // Add XP and handle leveling
  const addXp = async (amount) => {
    if (!amount || amount <= 0) return;

    setProfile((prev) => {
      if (!prev) return prev;
      let newXp = (prev.xp || 0) + amount;
      let newLevel = prev.level || 1;
      let newXpForLevel = prev.xp_for_level || 1000;

      while (newXp >= newXpForLevel) {
        newXp -= newXpForLevel;
        newLevel += 1;
        newXpForLevel = Math.round(newXpForLevel * 1.35);
      }

      const updated = {
        ...prev,
        xp: newXp,
        level: newLevel,
        xp_for_level: newXpForLevel,
      };

      if (user) {
        supabase
          .from('profiles')
          .update({
            xp: newXp,
            level: newLevel,
            xp_for_level: newXpForLevel,
          })
          .eq('id', user.id)
          .catch(() => {});
      }

      api.addXp(amount).catch(() => {});

      return updated;
    });
  };

  const value = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: !!user,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
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
