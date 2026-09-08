import { create } from 'zustand';
import { supabase } from '../supabase.js';

const STORAGE_KEY = 'labxplore_learning_style_weights';

const INITIAL_WEIGHTS = {
  visual_simulation: 0.333,
  textual_derivation: 0.333,
  numerical_practice: 0.334,
};

function loadStoredWeights() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        typeof parsed.visual_simulation === 'number' &&
        typeof parsed.textual_derivation === 'number' &&
        typeof parsed.numerical_practice === 'number'
      ) {
        return normalizeWeights(parsed);
      }
    }
  } catch {}
  return INITIAL_WEIGHTS;
}

function normalizeWeights(weights) {
  const v = Math.max(0.05, Number(weights.visual_simulation) || 0.05);
  const t = Math.max(0.05, Number(weights.textual_derivation) || 0.05);
  const n = Math.max(0.05, Number(weights.numerical_practice) || 0.05);
  const sum = v + t + n;
  return {
    visual_simulation: Number((v / sum).toFixed(3)),
    textual_derivation: Number((t / sum).toFixed(3)),
    numerical_practice: Number((n / sum).toFixed(3)),
  };
}

let syncTimeout = null;

export const usePreferenceStore = create((set, get) => ({
  weights: loadStoredWeights(),
  topPreference: 'visual_simulation',
  lastInteraction: null,

  /**
   * Dynamically increases a learning style weight based on user engagement,
   * then normalizes all 3 metrics so they sum to exactly 1.0.
   * 
   * @param {'visual_simulation' | 'textual_derivation' | 'numerical_practice'} dimension 
   * @param {number} boostAmount - Positive decimal amount (default 0.05)
   * @param {string} [context] - Context label (e.g., '3d_canvas_exploration', 'formula_derivation_reading')
   */
  recordInteraction: (dimension, boostAmount = 0.05, context = '') => {
    if (!['visual_simulation', 'textual_derivation', 'numerical_practice'].includes(dimension)) {
      console.warn(`Invalid learning style dimension: ${dimension}`);
      return;
    }

    set((state) => {
      const current = { ...state.weights };
      current[dimension] = (current[dimension] || 0.333) + Math.abs(boostAmount);

      const normalized = normalizeWeights(current);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch {}

      // Calculate top preference
      const entries = Object.entries(normalized);
      entries.sort((a, b) => b[1] - a[1]);
      const topPreference = entries[0][0];

      return {
        weights: normalized,
        topPreference,
        lastInteraction: { dimension, timestamp: Date.now(), context },
      };
    });

    // Debounced sync with Supabase profiles table
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      get().syncToSupabase();
    }, 2000);
  },

  /**
   * Resets weights back to equal 33.3% distribution
   */
  resetWeights: () => {
    set({
      weights: INITIAL_WEIGHTS,
      topPreference: 'visual_simulation',
      lastInteraction: null,
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WEIGHTS));
    } catch {}
    get().syncToSupabase();
  },

  /**
   * Returns formatted percentage metrics for UI rendering
   */
  getPercentages: () => {
    const { weights } = get();
    return {
      visual_simulation: Math.round(weights.visual_simulation * 100),
      textual_derivation: Math.round(weights.textual_derivation * 100),
      numerical_practice: Math.round(weights.numerical_practice * 100),
    };
  },

  /**
   * Returns human-readable metadata for the top preference
   */
  getTopPreferenceDetails: () => {
    const { weights, topPreference } = get();
    const map = {
      visual_simulation: {
        id: 'visual_simulation',
        label: 'Visual Simulation',
        badge: 'Canvas & Optics Bench',
        description: 'Learns best through interactive 3D simulations, ray tracing, and color change reactions.',
        color: 'sky',
        pct: Math.round(weights.visual_simulation * 100),
      },
      textual_derivation: {
        id: 'textual_derivation',
        label: 'Textual Derivation',
        badge: 'Laws & Proofs',
        description: 'Learns best through first-principles theoretical derivations, formulas, and structured notes.',
        color: 'amber',
        pct: Math.round(weights.textual_derivation * 100),
      },
      numerical_practice: {
        id: 'numerical_practice',
        label: 'Numerical Practice',
        badge: 'Calculations & Sliders',
        description: 'Learns best through quantitative problem solving, formula substitution, and parameter tuning.',
        color: 'emerald',
        pct: Math.round(weights.numerical_practice * 100),
      },
    };
    return map[topPreference] || map.visual_simulation;
  },

  /**
   * Syncs the current weights to public.profiles in Supabase
   */
  syncToSupabase: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { weights } = get();
      await supabase
        .from('profiles')
        .update({ learning_style_weights: weights })
        .eq('id', user.id);
    } catch (err) {
      // Offline fallback is already handled by localStorage
    }
  },

  /**
   * Initializes weights from user profile on login
   */
  initializeFromProfile: (profileWeights) => {
    if (
      profileWeights &&
      typeof profileWeights.visual_simulation === 'number' &&
      typeof profileWeights.textual_derivation === 'number' &&
      typeof profileWeights.numerical_practice === 'number'
    ) {
      const normalized = normalizeWeights(profileWeights);
      const entries = Object.entries(normalized).sort((a, b) => b[1] - a[1]);
      set({
        weights: normalized,
        topPreference: entries[0][0],
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch {}
    }
  },
}));
