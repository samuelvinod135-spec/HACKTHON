import { matchReactionLocally } from './data/massiveReactionsData.js';

const BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';

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

async function request(path, options = {}) {
  try {
    const res = await fetch(BASE + path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    
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
      return await request('/chat/message', {
        method: 'POST',
        body: JSON.stringify({ message, context, geminiApiKey }),
      });
    } catch {
      // Direct client-side Gemini fallback if backend is unreachable
      if (geminiApiKey) {
        try {
          const resp = await fetch(
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
            }
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

      return {
        reply: `Here is the scientific breakdown for **${message}**:\n\n1. **Core Principle**: Observed in Physics & Chemistry laboratories under standard temperature and pressure.\n2. **Apparatus & Observation**: Monitor color changes, effervescence, or refractive deflection on the LabXplore canvas.\n3. **Pro Tip**: Use the Bunsen burner or multi-chemical glassware on the Chemistry workspace to simulate real-time transformations!`,
        isScienceRelated: true,
        timestamp: new Date().toISOString(),
      };
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
