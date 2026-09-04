const BASE = '/api';

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
};

