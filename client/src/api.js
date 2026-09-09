import { matchReactionLocally } from './data/massiveReactionsData.js';
import { getOfflineFallbackResponse } from './data/offlineFallbackData.js';

const BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';

/**
 * Executes a network fetch with an AbortController timeout (default 10000ms for cloud boot resilience).
 */
export async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Emits the graceful network degradation event to notify the UI toast
 */
export function notifyNetworkFallback(reason = 'latency') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('labxplore:network-fallback', {
        detail: {
          message: 'Network latency detected. Loading locally cached module...',
          reason,
          timestamp: Date.now(),
        },
      })
    );
  }
}

// Dynamically extracts active user id for multi-tenant SQLite headers
function getActiveUserId() {
  try {
    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('sb-') && k.endsWith('-auth-token')) {
          const raw = localStorage.getItem(k);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed?.user?.id) return parsed.user.id;
          }
        }
      }
    }
  } catch {}
  return '1';
}

// Safe localStorage helper
function getLocal(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

async function request(path, options = {}, timeoutMs = 10000) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-user-id': getActiveUserId(),
      ...(options.headers || {}),
    };
    const res = await fetchWithTimeout(
      BASE + path,
      {
        ...options,
        headers,
      },
      timeoutMs
    );
    
    // Check if the server returned HTML (SPA fallback on Vercel) instead of JSON
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      throw new Error(`Endpoint returned HTML instead of JSON: ${path}`);
    }

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    // Graceful offline & static-deployment fallbacks
    if (path === '/student') {
      const savedStudent = getLocal('labxplore_local_student', {
        name: 'Scholar',
        level: 1,
        xp: 0,
        xp_for_level: 1000,
      });
      return { student: savedStudent, achievements: [] };
    }

    if (path === '/achievements') {
      return getLocal('labxplore_local_achievements', []);
    }

    if (path === '/completions') {
      return getLocal('labxplore_local_completions', []);
    }

    if (path === '/saved') {
      return getLocal('labxplore_saved_experiments', []);
    }

    throw err;
  }
}

export const api = {
  getStudent: () => request('/student'),
  
  updateStudent: (payload) => {
    try {
      const curr = getLocal('labxplore_local_student', { name: 'Scholar', level: 1, xp: 0, xp_for_level: 1000 });
      setLocal('labxplore_local_student', { ...curr, ...payload });
    } catch {}
    return request('/student', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).catch(() => ({ student: payload }));
  },

  getAchievements: () => request('/achievements'),
  
  getCompletions: () => request('/completions'),
  
  recordCompletion: (payload) => {
    try {
      const completions = getLocal('labxplore_local_completions', []);
      completions.push({ id: `comp-${Date.now()}`, ...payload, timestamp: new Date().toISOString() });
      setLocal('labxplore_local_completions', completions);

      const student = getLocal('labxplore_local_student', { name: 'Scholar', level: 1, xp: 0, xp_for_level: 1000 });
      student.xp = (student.xp || 0) + (payload.xp || 0);
      setLocal('labxplore_local_student', student);
    } catch {}
    return request('/completions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch(() => ({
      student: getLocal('labxplore_local_student'),
      achievements: getLocal('labxplore_local_achievements', []),
      completions: getLocal('labxplore_local_completions', []),
    }));
  },

  unlockAchievement: (slug) =>
    request(`/achievements/${slug}/unlock`, { method: 'POST' }).catch(() => ({ unlocked: slug })),

  addXp: (amount) => {
    try {
      const student = getLocal('labxplore_local_student', { name: 'Scholar', level: 1, xp: 0, xp_for_level: 1000 });
      student.xp = (student.xp || 0) + (amount || 0);
      setLocal('labxplore_local_student', student);
    } catch {}
    return request('/xp', { method: 'POST', body: JSON.stringify({ amount }) }).catch(() => ({ xp: amount }));
  },

  getSaved: () => request('/saved'),

  saveExperiment: (payload) => {
    try {
      const list = getLocal('labxplore_saved_experiments', []);
      const item = { id: 'saved-' + Date.now(), ...payload, createdAt: new Date().toISOString() };
      list.unshift(item);
      setLocal('labxplore_saved_experiments', list);
    } catch {}
    return request('/saved', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch(() => payload);
  },

  unsaveExperiment: (id) => {
    try {
      const list = getLocal('labxplore_saved_experiments', []);
      setLocal('labxplore_saved_experiments', list.filter((x) => x.id !== id));
    } catch {}
    return request(`/saved/${id}`, { method: 'DELETE' }).catch(() => ({ removed: id }));
  },

  matchReaction: async (inputs, conditions) => {
    try {
      return await request('/reactions/match', {
        method: 'POST',
        body: JSON.stringify({ inputs, conditions }),
      });
    } catch {
      // Local fallback using massive reactions engine
      const localMatch = matchReactionLocally(inputs, conditions);
      return { match: localMatch };
    }
  },

  sendChatMessage: async (message, context = {}) => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    try {
      return await request(
        '/chat/message',
        {
          method: 'POST',
          body: JSON.stringify({ message, context, geminiApiKey }),
        },
        3000
      );
    } catch {
      // Direct client-side Gemini fallback if backend is unreachable (with 3000ms timeout)
      if (geminiApiKey) {
        try {
          const resp = await fetchWithTimeout(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `You are LabXplore Science AI, an expert Physics and Chemistry tutor. Explain clearly with analogies, reactants, and products:\n${message}`,
                      },
                    ],
                  },
                ],
              }),
            },
            3000
          );
          if (resp.ok) {
            const data = await resp.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return {
                reply: text,
                isScienceRelated: true,
                timestamp: new Date().toISOString(),
              };
            }
          }
        } catch {}
      }

      // Latency threshold exceeded (>3000ms) or network offline:
      // Trigger toast event and return hardcoded pre-saved JSON fallback response
      notifyNetworkFallback('chat_latency');
      return getOfflineFallbackResponse(message, context);
    }
  },

  generateSmartNotes: async (data = {}) => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const message =
      data.message ||
      `Generate Smart Revision Notes for ${data.experiment?.name || data.problem?.title || 'Laboratory Investigation'}`;

    try {
      return await request(
        '/chat/message',
        {
          method: 'POST',
          body: JSON.stringify({
            message,
            context: data,
            geminiApiKey,
            mode: 'smart_notes',
          }),
        },
        3000
      );
    } catch {
      const exp = data.experiment || {};
      const prob = data.problem || {};
      const title = exp.name || prob.title || 'Laboratory Investigation';
      const eq = exp.equation || prob.formula || prob.finalAnswer || '';
      const obs = exp.description || exp.observation || 'Observed distinct thermodynamic color transition and state shift.';
      const relev = exp.jeeRelevance || prob.explanation || 'Core curriculum NCERT / JEE / NEET milestone.';

      const fallbackReply = `### 📝 AI Smart Revision Notes: ${title}

#### 📌 Key Definitions
• **Fundamental Principle:** ${title} demonstrates conservation of mass and energy transformation under stoichiometric balance.
• **Exam Importance:** ${relev}

#### ⚡ Core Formulas & Equations
• **Primary Balanced Expression:** \`${eq || '2Mg + O₂ → 2MgO | n₁·sin(θ₁) = n₂·sin(θ₂)'}\`
• **Mathematical Relation:** Reactant proportions and energy transfer directly govern thermodynamic product yield.

#### 🔬 Key Laboratory Observations
• **Visual Indicators:** ${obs}
• **Practical Safety & Calibration:** Maintain constant ambient conditions and verify apparatus alignment before measurements.`;

      notifyNetworkFallback('smart_notes_latency');
      return {
        reply: fallbackReply,
        isScienceRelated: true,
        source: 'offline_local_synthesizer',
        timestamp: new Date().toISOString(),
      };
    }
  },

  solveOcrProblem: async (imageData, problemMetadata = {}) => {
    try {
      return await request(
        '/ocr/solve',
        {
          method: 'POST',
          body: JSON.stringify({ imageData, problemMetadata }),
        },
        3000
      );
    } catch {
      notifyNetworkFallback('ocr_latency');
      return getOfflineFallbackResponse(`photo ocr ${problemMetadata.title || ''}`, problemMetadata);
    }
  },

  getChatContextPrompts: (context = {}) => {
    const params = new URLSearchParams();
    if (context.path) params.set('path', context.path);
    if (context.activeExperiment) params.set('activeExperiment', context.activeExperiment);
    return request(`/chat/context-prompts?${params.toString()}`).catch(() => ({
      prompts: [
        'How does Benzene Diazonium Chloride undergo Sandmeyer reaction?',
        'What is the difference between Aldol and Cannizzaro reaction?',
        'Explain Finkelstein and Swarts reactions for haloalkanes.',
      ],
    }));
  },

  getQuestions: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.set(k, v);
    });
    return request(`/questions?${query.toString()}`).catch(() => ({ questions: [] }));
  },

  getQuestionChapters: (subject) => {
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    return request(`/questions/chapters${query}`).catch(() => ({ chapters: [] }));
  },

  getQuestionStats: () => request('/questions/stats').catch(() => ({ count: 0 })),
};
