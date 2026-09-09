import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase.js';
import { api } from '../api.js';
import { useTelemetryStore } from '../store/useTelemetryStore.js';
import { useStealthScaffoldingStore } from '../store/useStealthScaffoldingStore.js';
import { usePreferenceStore } from '../store/usePreferenceStore.js';

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
        // Fetch institution name if assigned
        let institutionName = 'Independent Scholar (Direct)';
        let cohortName = 'Self-Paced Discovery';

        if (data.school_code || data.institution_id) {
          const { data: instData } = await supabase
            .from('institutions')
            .select('name, code')
            .or(`id.eq.${data.institution_id || '00000000-0000-0000-0000-000000000000'},code.eq.${data.school_code || 'NONE'}`)
            .maybeSingle();
          if (instData?.name) institutionName = instData.name;
        }

        if (data.cohort_id) {
          const { data: cohortData } = await supabase
            .from('cohorts')
            .select('name')
            .eq('id', data.cohort_id)
            .maybeSingle();
          if (cohortData?.name) cohortName = cohortData.name;
        }

        const fullProfile = {
          ...data,
          email: authUser.email || data.email,
          username: data.username || authUser.user_metadata?.username || authUser.email?.split('@')[0],
          level: data.level || 1,
          xp: data.xp || 0,
          xp_for_level: data.xp_for_level || 1000,
          avatar_url: data.avatar_url && !data.avatar_url.includes('/clay/avatar.jpg') ? data.avatar_url : '',
          full_name:
            data.full_name ||
            authUser.user_metadata?.full_name ||
            data.username ||
            authUser.email?.split('@')[0] ||
            'Scholar',
          grade_level: data.grade_level || authUser.user_metadata?.grade_level || 'Grade 9-10',
          role: data.role || 'student',
          institution_id: data.institution_id || null,
          cohort_id: data.cohort_id || null,
          school_code: data.school_code || 'DPS-RKP-2026',
          institution_name: institutionName,
          cohort_name: cohortName,
        };

        setProfile(fullProfile);

        // Keep local SQLite student synchronized with real logged-in user
        api.updateStudent({
          name: fullProfile.full_name,
          level: fullProfile.level,
          xp: fullProfile.xp,
          xp_for_level: fullProfile.xp_for_level,
        }).catch(() => {});

        return fullProfile;
      }

      // If profile row doesn't exist yet, insert real user profile
      const derivedUsername =
        authUser.user_metadata?.username ||
        authUser.email?.split('@')[0] ||
        'student';

      const initialProfile = {
        id: authUser.id,
        full_name:
          authUser.user_metadata?.full_name ||
          derivedUsername,
        username: derivedUsername,
        email: authUser.email,
        avatar_url: '',
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
        username: authUser.user_metadata?.username || authUser.email?.split('@')[0],
        email: authUser.email,
        avatar_url: '',
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

    // Purge any legacy demo keys from browser storage
    try {
      localStorage.removeItem('labxplore_demo_user');
      sessionStorage.removeItem('labxplore_demo_user');
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

  // Sign up with Email & Password (with username support)
  const signUpWithEmail = async ({ email, password, fullName, username, gradeLevel }) => {
    setLoading(true);
    try {
      const cleanUsername = (username || fullName || email.split('@')[0])
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '');

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            username: cleanUsername,
            grade_level: gradeLevel || 'Grade 9-10',
            avatar_url: '',
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

  // Sign in with Username OR Email
  const signInWithIdentifier = async ({ identifier, password }) => {
    setLoading(true);
    try {
      const cleanId = (identifier || '').trim();
      if (!cleanId) {
        throw new Error('Please provide your student username or email address.');
      }
      if (!password) {
        throw new Error('Please enter your account password.');
      }

      let emailToUse = cleanId;

      // If user typed a username without @, look up their registered email
      if (!cleanId.includes('@')) {
        // 1. Try our high-speed secure RPC function
        try {
          const { data: rpcEmail, error: rpcErr } = await supabase
            .rpc('get_email_by_username', { p_username: cleanId });

          if (rpcEmail && !rpcErr) {
            emailToUse = rpcEmail;
          }
        } catch (e) {
          console.warn('RPC lookup note:', e);
        }

        // 2. If RPC did not return an email, query profiles table directly
        if (!emailToUse.includes('@')) {
          const { data: profileRow } = await supabase
            .from('profiles')
            .select('email')
            .or(`username.ilike.${cleanId},full_name.ilike.${cleanId}`)
            .maybeSingle();

          if (profileRow?.email) {
            emailToUse = profileRow.email;
          } else {
            throw new Error(`No student account found with username "${cleanId}". Please check your spelling or sign in with your email address.`);
          }
        }
      }

      // Execute Supabase password authentication with the resolved email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
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

  // Aliases for compatibility
  const signInWithEmail = (args) => {
    return signInWithIdentifier({
      identifier: args.identifier || args.email || args.username,
      password: args.password,
    });
  };

  const signInWithUsername = (args) => {
    return signInWithIdentifier({
      identifier: args.username || args.identifier,
      password: args.password,
    });
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

  // Sign out with complete cache & Zustand store purge
  const signOut = async () => {
    setUser(null);
    setSession(null);
    setProfile(null);

    // 1. Purge all in-memory Zustand stores to prevent cross-account state leakage
    try {
      useTelemetryStore.getState().resetStore?.();
      useStealthScaffoldingStore.getState().resetStore?.();
      usePreferenceStore.getState().resetWeights?.();
    } catch (storeErr) {
      console.warn('Store purge note:', storeErr);
    }

    // 2. Clear all sensitive local/session storage keys
    try {
      localStorage.removeItem('labxplore_learning_style_weights');
      localStorage.removeItem('labxplore_telemetry_offline_queue');
      localStorage.removeItem('labxplore_demo_user');
      localStorage.removeItem('labxplore_cached_user');
      localStorage.removeItem('labxplore_local_student');
      localStorage.removeItem('labxplore_local_achievements');
      localStorage.removeItem('labxplore_local_completions');
      localStorage.removeItem('labxplore_saved_experiments');
      localStorage.removeItem('labxplore_autonomous_profile_v2');
      localStorage.removeItem('labxplore_completed_tasks');

      // 100% Comprehensive iterative purge of all labxplore keys
      const keysToPurge = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('labxplore_')) {
          keysToPurge.push(key);
        }
      }
      keysToPurge.forEach((k) => localStorage.removeItem(k));

      sessionStorage.clear();
    } catch (storageErr) {
      console.warn('Storage purge note:', storageErr);
    }

    // 3. Clear ProgressContext across browser sessions
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('labxplore:auth-signout'));
      }
    } catch {}

    // 4. Supabase Auth sign out
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
          name: updates.full_name || updates.name,
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

  // Phase 1: School ID / Invite Code enrollment & auto-mapping to Teacher's Cohort
  const enrollWithSchoolCode = async ({ schoolCode, cohortCode }) => {
    if (!schoolCode) throw new Error('Please provide a valid School ID / Invite code.');
    const cleanCode = schoolCode.trim().toUpperCase();

    if (user?.id) {
      try {
        const { data, error } = await supabase.rpc('assign_student_by_school_code', {
          p_user_id: user.id,
          p_school_code: cleanCode,
          p_cohort_code: cohortCode || null,
        });
        if (data && data.success) {
          setProfile((prev) => ({
            ...prev,
            school_code: cleanCode,
            institution_id: data.institution_id,
            institution_name: data.institution_name,
            cohort_name: data.cohort_name,
            cohort_id: data.cohort_id,
          }));
          return { success: true, ...data };
        }
      } catch (e) {
        console.warn('RPC assign_student_by_school_code note:', e);
      }
    }

    // High-fidelity fallback mapping
    const institutionName = cleanCode.includes('KV')
      ? 'Kendriya Vidyalaya IIT Powai'
      : 'Delhi Public School R.K. Puram';
    const cohortName = cohortCode ? `Section ${cohortCode}` : 'Grade 10 - Section A';

    setProfile((prev) => ({
      ...(prev || {}),
      school_code: cleanCode,
      institution_name: institutionName,
      cohort_name: cohortName,
      role: prev?.role || 'student',
    }));

    return { success: true, institution_name: institutionName, cohort_name: cohortName };
  };

  // Instant Persona Switcher for Hackathon & Institutional Demonstration
  const switchPersona = (role) => {
    if (role === 'teacher') {
      setProfile({
        id: 'teacher-sunita-rao',
        full_name: 'Dr. Sunita Rao',
        username: 'sunita_rao',
        email: 'sunita.rao@dpsrkp.net',
        role: 'teacher',
        level: 18,
        xp: 14500,
        xp_for_level: 20000,
        grade_level: 'Faculty / Grade 10 Lead',
        school_code: 'DPS-RKP-2026',
        institution_name: 'Delhi Public School R.K. Puram',
        cohort_name: 'Grade 10 - Section A',
        cohort_id: 'c3d4e5f6-a7b8-4c5d-9e0f-2a3b4c5d6e7f',
        avatar_url: '',
      });
    } else if (role === 'admin') {
      setProfile({
        id: 'admin-principal-sharma',
        full_name: 'Principal V. Sharma',
        username: 'principal_sharma',
        email: 'principal@dpsrkp.net',
        role: 'admin',
        level: 25,
        xp: 32000,
        xp_for_level: 40000,
        grade_level: 'Institutional Executive',
        school_code: 'DPS-RKP-2026',
        institution_name: 'Delhi Public School R.K. Puram',
        cohort_name: 'Institutional Global Scope',
        cohort_id: null,
        avatar_url: '',
      });
    } else {
      setProfile({
        id: user?.id || 'student-aarav-patel',
        full_name: 'Aarav Patel',
        username: 'aarav_patel',
        email: user?.email || 'aarav.patel@student.dpsrkp.net',
        role: 'student',
        level: 4,
        xp: 2850,
        xp_for_level: 3500,
        grade_level: 'Grade 10',
        school_code: 'DPS-RKP-2026',
        institution_name: 'Delhi Public School R.K. Puram',
        cohort_name: 'Grade 10 - Section A',
        cohort_id: 'c3d4e5f6-a7b8-4c5d-9e0f-2a3b4c5d6e7f',
        assigned_teacher_name: 'Dr. Sunita Rao',
        avatar_url: '',
      });
    }
  };

  const isTeacher = profile?.role === 'teacher';
  const isAdmin = profile?.role === 'admin';
  const isStudent = !isTeacher && !isAdmin;

  const value = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: !!user || !!profile,
    isTeacher,
    isAdmin,
    isStudent,
    enrollWithSchoolCode,
    switchPersona,
    signUpWithEmail,
    signInWithIdentifier,
    signInWithEmail,
    signInWithUsername,
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
