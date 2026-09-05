/**
 * Student Notepad & Question Pointer Storage Utility
 * Persists personal notes and pinned/bookmarked questions in localStorage.
 */

const STORAGE_KEY = 'labxplore_student_notes';

export function getNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const notes = JSON.parse(raw);
    return Array.isArray(notes) ? notes : [];
  } catch (err) {
    console.error('Failed to read notes from localStorage:', err);
    return [];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save notes to localStorage:', err);
  }
}

export function saveNote({
  id,
  title,
  content = '',
  tags = [],
  pinnedQuestion = null,
}) {
  const notes = getNotes();
  const noteId = id || `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  const existingIdx = notes.findIndex((n) => n.id === noteId);
  const noteData = {
    id: noteId,
    title: title || (pinnedQuestion ? `Question: ${pinnedQuestion.chapter || 'Science'}` : 'Untitled Note'),
    content,
    tags: Array.isArray(tags) ? tags : [],
    pinnedQuestion: pinnedQuestion || null,
    resolved: false,
    updatedAt: now,
    createdAt: existingIdx >= 0 ? notes[existingIdx].createdAt : now,
  };

  if (existingIdx >= 0) {
    notes[existingIdx] = { ...notes[existingIdx], ...noteData };
  } else {
    notes.unshift(noteData);
  }

  saveNotes(notes);
  return noteData;
}

/**
 * Directly pin a question from Quiz or Chat into the student's Notepad
 */
export function pinQuestionToNotes({
  id,
  question,
  chapter = 'General',
  subject = 'Science',
  options = [],
  answer = '',
  correct_option = '',
  explanation = '',
  studentComment = '',
}) {
  const notes = getNotes();
  // Check if question is already pinned
  const existing = notes.find(
    (n) => n.pinnedQuestion && (n.pinnedQuestion.id === id || n.pinnedQuestion.question === question)
  );

  if (existing) {
    if (studentComment) {
      existing.content = studentComment;
      existing.updatedAt = new Date().toISOString();
      saveNotes(notes);
    }
    return existing;
  }

  return saveNote({
    title: `📌 ${chapter}: ${question.slice(0, 50)}...`,
    content: studentComment || 'Marked as difficult to understand. Review this concept with the science chatbot.',
    tags: [subject, chapter, 'Needs Understanding'],
    pinnedQuestion: {
      id: id || `q-${Date.now()}`,
      question,
      chapter,
      subject,
      options,
      answer,
      correct_option,
      explanation,
    },
  });
}

export function deleteNote(id) {
  const notes = getNotes().filter((n) => n.id !== id);
  saveNotes(notes);
  return notes;
}

export function toggleNoteResolved(id) {
  const notes = getNotes().map((n) => {
    if (n.id === id) {
      return { ...n, resolved: !n.resolved, updatedAt: new Date().toISOString() };
    }
    return n;
  });
  saveNotes(notes);
  return notes;
}

export function searchNotes(query = '', filterSubject = 'All') {
  const notes = getNotes();
  const q = query.trim().toLowerCase();

  return notes.filter((n) => {
    // Subject filter
    if (filterSubject !== 'All') {
      const matchSub =
        (n.pinnedQuestion && n.pinnedQuestion.subject === filterSubject) ||
        n.tags.some((t) => t.toLowerCase() === filterSubject.toLowerCase());
      if (!matchSub) return false;
    }

    if (!q) return true;

    const inTitle = (n.title || '').toLowerCase().includes(q);
    const inContent = (n.content || '').toLowerCase().includes(q);
    const inQuestion = n.pinnedQuestion && (n.pinnedQuestion.question || '').toLowerCase().includes(q);
    const inChapter = n.pinnedQuestion && (n.pinnedQuestion.chapter || '').toLowerCase().includes(q);
    const inTags = n.tags.some((t) => t.toLowerCase().includes(q));

    return inTitle || inContent || inQuestion || inChapter || inTags;
  });
}
