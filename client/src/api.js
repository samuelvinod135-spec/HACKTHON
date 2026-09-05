const BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  getStudent: () => request('/student'),
  updateStudent: (payload) =>
    request('/student', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  getAchievements: () => request('/achievements'),
  getCompletions: () => request('/completions'),
  recordCompletion: (payload) =>
    request('/completions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  unlockAchievement: (slug) =>
    request(`/achievements/${slug}/unlock`, { method: 'POST' }),
  addXp: (amount) =>
    request('/xp', { method: 'POST', body: JSON.stringify({ amount }) }),
  getSaved: () => request('/saved'),
  saveExperiment: (payload) =>
    request('/saved', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  unsaveExperiment: (id) =>
    request(`/saved/${id}`, {
      method: 'DELETE',
    }),
  matchReaction: (inputs, conditions) =>
    request('/reactions/match', {
      method: 'POST',
      body: JSON.stringify({ inputs, conditions }),
    }),
  sendChatMessage: (message, context = {}) => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    return request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message, context, geminiApiKey }),
    });
  },
  getChatContextPrompts: (context = {}) => {
    const params = new URLSearchParams();
    if (context.path) params.set('path', context.path);
    if (context.activeExperiment) params.set('activeExperiment', context.activeExperiment);
    return request(`/chat/context-prompts?${params.toString()}`);
  },
  getQuestions: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.set(k, v);
    });
    return request(`/questions?${query.toString()}`);
  },
  getQuestionChapters: (subject) => {
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    return request(`/questions/chapters${query}`);
  },
  getQuestionStats: () => request('/questions/stats'),
};

