// Mock localStorage for Node.js test environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => {
    mockStorage[key] = String(val);
  },
  removeItem: (key) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const k of Object.keys(mockStorage)) delete mockStorage[k];
  },
};

import {
  getSessions,
  saveSession,
  deleteSession,
  searchSessions,
} from '../src/utils/chatHistory.js';
import {
  getNotes,
  saveNote,
  deleteNote,
  toggleNoteResolved,
  searchNotes,
  pinQuestionToNotes,
} from '../src/utils/studentNotes.js';
import { SCIENCE_LIBRARY } from '../src/data/scienceLibraryData.js';

async function runTests() {
  console.log('🧪 Testing New Chatbot Features (New Chat, Search, History, Libraries, Notes)...\n');
  let passed = 0;
  let total = 0;

  function assert(cond, name) {
    total++;
    if (cond) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name}`);
    }
  }

  // TEST SUITE 1: Chat Sessions & History Management
  console.log('--- Test Suite 1: Chat Sessions & History ---');
  localStorage.clear();

  const session1 = saveSession({
    id: 'test-session-1',
    title: 'Kinematics Projectile Range Discussion',
    messages: [
      { id: '1', sender: 'user', text: 'How do I calculate range of a projectile?' },
      { id: '2', sender: 'assistant', text: 'Horizontal range R = (u^2 sin 2theta) / g.' },
    ],
    context: { domain: 'Physics' },
  });

  const session2 = saveSession({
    id: 'test-session-2',
    title: 'Magnesium Oxidation and White Light',
    messages: [
      { id: '1', sender: 'user', text: 'Why does magnesium burn with dazzling light?' },
      { id: '2', sender: 'assistant', text: 'The reaction 2Mg + O2 -> 2MgO is intensely exothermic.' },
    ],
    context: { domain: 'Chemistry' },
  });

  const allSessions = getSessions();
  assert(allSessions.length === 2, `Created 2 sessions (got ${allSessions.length})`);
  assert(allSessions[0].id === 'test-session-2', 'Most recent session is at top');

  // Search sessions
  const searchResults1 = searchSessions('projectile');
  assert(searchResults1.length === 1 && searchResults1[0].id === 'test-session-1', 'Search found projectile session');

  const searchResults2 = searchSessions('magnesium');
  assert(searchResults2.length === 1 && searchResults2[0].id === 'test-session-2', 'Search found magnesium session');

  const searchResultsEmpty = searchSessions('biology');
  assert(searchResultsEmpty.length === 0, 'Search for non-existent term returns empty array');

  // Delete session
  deleteSession('test-session-1');
  const afterDelete = getSessions();
  assert(afterDelete.length === 1 && afterDelete[0].id === 'test-session-2', 'Session successfully deleted');

  // TEST SUITE 2: Student Notepad & Question Pinning
  console.log('\n--- Test Suite 2: Student Notepad & Question Pointer ---');
  localStorage.clear();

  // 1. Save standard text note
  const note1 = saveNote({
    title: 'Formulas to memorize for tomorrow',
    content: 'Remember that centripetal acceleration is v^2/r and directed toward the center.',
    tags: ['Physics', 'Mechanics'],
  });

  assert(note1.id.startsWith('note-'), 'Note ID generated properly');
  assert(getNotes().length === 1, 'Note saved in localStorage');

  // 2. Pin difficult question from Quiz
  const pinnedQ = pinQuestionToNotes({
    id: 'PHY_0001_Kinematics',
    question: 'A particle starts from rest with acceleration 2 m/s². Its speed after 5 s is:',
    chapter: 'Kinematics',
    subject: 'Physics',
    options: ['5 m/s', '10 m/s', '15 m/s', '25 m/s'],
    answer: '10 m/s',
    correct_option: 'B',
    explanation: 'v = u + at = 0 + 2*5 = 10 m/s.',
    studentComment: "I couldn't understand why initial velocity u is zero when it says 'starts from rest'.",
  });

  assert(pinnedQ && pinnedQ.pinnedQuestion, 'Question pointer attached to note');
  assert(getNotes().length === 2, 'Both personal note and pinned question exist');

  // 3. Search notes
  const notesFound = searchNotes('Kinematics');
  assert(notesFound.length === 1, 'Search found pinned Kinematics question note');

  const notesFoundByContent = searchNotes('centripetal');
  assert(notesFoundByContent.length === 1, 'Search found personal note by content text');

  // 4. Toggle resolved
  toggleNoteResolved(pinnedQ.id);
  const reloaded = getNotes().find((n) => n.id === pinnedQ.id);
  assert(reloaded.resolved === true, 'Toggled note resolved status to true');

  // TEST SUITE 3: Science Library Reference Data
  console.log('\n--- Test Suite 3: Science Library Data Integrity ---');
  assert(SCIENCE_LIBRARY.length >= 15, `Science library contains ${SCIENCE_LIBRARY.length} items`);
  assert(
    SCIENCE_LIBRARY.every((item) => item.title && item.formula && item.subject && item.prompt),
    'Every library item has title, formula, subject, and AI prompt'
  );

  const physicsItems = SCIENCE_LIBRARY.filter((i) => i.subject === 'Physics');
  const chemistryItems = SCIENCE_LIBRARY.filter((i) => i.subject === 'Chemistry');
  assert(physicsItems.length >= 5, `Has ${physicsItems.length} Physics reference items`);
  assert(chemistryItems.length >= 5, `Has ${chemistryItems.length} Chemistry reference items`);

  console.log(`\n========================================`);
  console.log(`🏁 Verification Result: ${passed}/${total} tests passed!`);
  console.log(`========================================\n`);

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
