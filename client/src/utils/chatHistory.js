/**
 * Chatbot Conversation History & Session Management Utility
 * Persists multiple chat sessions in localStorage with search capabilities.
 */

const STORAGE_KEY = 'labxplore_chat_sessions';

export function getSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const sessions = JSON.parse(raw);
    return Array.isArray(sessions) ? sessions : [];
  } catch (err) {
    console.error('Failed to read chat sessions from localStorage:', err);
    return [];
  }
}

export function saveSessions(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save chat sessions to localStorage:', err);
  }
}

export function saveSession({ id, title, messages = [], context = {} }) {
  if (!messages || messages.length === 0) return null;

  const sessions = getSessions();
  const sessionId = id || `session-${Date.now()}`;
  const now = new Date().toISOString();

  // Determine an auto-title from the first user message if not provided
  let sessionTitle = title;
  if (!sessionTitle) {
    const firstUserMsg = messages.find((m) => m.sender === 'user');
    sessionTitle = firstUserMsg
      ? firstUserMsg.text.slice(0, 45) + (firstUserMsg.text.length > 45 ? '...' : '')
      : (context.domain ? `${context.domain} Inquiry` : 'Science Chat');
  }

  const existingIdx = sessions.findIndex((s) => s.id === sessionId);
  const sessionData = {
    id: sessionId,
    title: sessionTitle,
    preview: messages[messages.length - 1]?.text?.slice(0, 80) || '',
    messageCount: messages.length,
    messages,
    context,
    updatedAt: now,
    createdAt: existingIdx >= 0 ? sessions[existingIdx].createdAt : now,
  };

  if (existingIdx >= 0) {
    sessions[existingIdx] = sessionData;
  } else {
    sessions.unshift(sessionData);
  }

  // Cap history at 50 sessions to conserve space
  const trimmed = sessions.slice(0, 50);
  saveSessions(trimmed);
  return sessionData;
}

export function deleteSession(id) {
  const sessions = getSessions().filter((s) => s.id !== id);
  saveSessions(sessions);
  return sessions;
}

export function searchSessions(query = '') {
  const sessions = getSessions();
  const q = query.trim().toLowerCase();
  if (!q) return sessions;

  return sessions.filter((session) => {
    const inTitle = (session.title || '').toLowerCase().includes(q);
    const inPreview = (session.preview || '').toLowerCase().includes(q);
    const inMessages = session.messages?.some((m) =>
      (m.text || '').toLowerCase().includes(q)
    );
    return inTitle || inPreview || inMessages;
  });
}
