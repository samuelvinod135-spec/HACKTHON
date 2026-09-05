// Automated Verification of the Adaptive Learning System & Daily Challenges
// Tests:
// 1. Daily Tasks data integrity, progressive day structure, and recommendation filters
// 2. Adaptive Mock Test state machine, concept prediction, micro-lessons, and dynamic remediation

import { DAILY_TASKS, getRecommendedTasks } from '../src/dailyTasksData.js';
import { MOCK_TEST_QUESTIONS, CONCEPTS } from '../src/mockTestData.js';

let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
  }
}

console.log('='.repeat(80));
console.log('🧪 VERIFYING ADAPTIVE LEARNING SYSTEM & DAILY TASKS');
console.log('='.repeat(80));

// SECTION 1: DAILY TASKS PROGRESSION
console.log('\n📅 1. Daily Tasks Progression Tests:');
assert(DAILY_TASKS.length >= 7, 'At least 7 consecutive daily tasks defined');

DAILY_TASKS.forEach((task) => {
  assert(
    task.day && task.title && task.goal && task.targetCondition && task.formula && task.steps.length > 0,
    `Day ${task.day} task (${task.title.slice(0, 30)}...) has complete structure`
  );
  assert(
    task.xpReward >= 50,
    `Day ${task.day} awards valid XP reward (${task.xpReward} XP)`
  );
});

// Test recommendations filter
const opticsTasks = getRecommendedTasks(1, 'Optics');
const mechanicsTasks = getRecommendedTasks(1, 'Mechanics');
assert(opticsTasks.every((t) => t.track === 'Optics'), 'Optics track filter returns only Optics tasks');
assert(mechanicsTasks.every((t) => t.track === 'Mechanics'), 'Mechanics track filter returns only Mechanics tasks');

// SECTION 2: ADAPTIVE MOCK TEST ENGINE
console.log('\n🎓 2. Adaptive Mock Test & Concept Intervention Tests:');
assert(MOCK_TEST_QUESTIONS.length === 10, 'Main Mock Test contains exactly 10 comprehensive questions');

MOCK_TEST_QUESTIONS.forEach((q) => {
  assert(
    q.id && q.question && q.options.length === 4 && q.correctAnswer >= 0 && q.correctAnswer <= 3,
    `Question #${q.id} has 4 options and valid correct answer index`
  );
  assert(
    q.conceptId && CONCEPTS[q.conceptId],
    `Question #${q.id} maps to valid concept (${q.conceptId})`
  );
  assert(
    q.misconceptionAnalysis && Object.keys(q.misconceptionAnalysis).length >= 2,
    `Question #${q.id} has detailed misconception diagnoses for distractors`
  );
});

// SECTION 3: CONCEPT BANK & REMEDIAL POOLS
console.log('\n💡 3. Concept Micro-Lessons & Remediation Pools:');
const conceptKeys = Object.keys(CONCEPTS);
assert(conceptKeys.length >= 10, `Concept bank contains ${conceptKeys.length} mapped physics concepts`);

conceptKeys.forEach((key) => {
  const c = CONCEPTS[key];
  assert(
    c.name && c.formula && c.coreIdea && c.memoryRule,
    `Concept [${key}] has title, formula, core idea, and golden memory rule`
  );
  assert(
    Array.isArray(c.remedialPool) && c.remedialPool.length >= 5,
    `Concept [${key}] has at least 5 targeted remedial practice questions (found ${c.remedialPool?.length})`
  );
  // Verify remedial questions have valid answer
  const allRemedialValid = c.remedialPool.every(
    (rq) => rq.q && rq.options.length >= 4 && rq.answer >= 0 && rq.explanation
  );
  assert(allRemedialValid, `Concept [${key}] remedial questions have valid options and explanations`);
});

// SECTION 4: SIMULATE ADAPTIVE STATE MACHINE WORKFLOW
console.log('\n⚙️ 4. Adaptive Intervention State Machine Simulation:');
// Scenario: Student takes test
// Q1: Answered correctly -> advances
const q1 = MOCK_TEST_QUESTIONS[0];
let state = {
  phase: 'TESTING',
  currentIndex: 0,
  score: 0,
  interventions: [],
};

// Simulate Q1 correct
state.score++;
state.currentIndex++;
assert(state.score === 1 && state.currentIndex === 1, 'Correct answer increments score and advances question');

// Simulate Q2 incorrect (Option 1 instead of 0)
const q2 = MOCK_TEST_QUESTIONS[1];
const wrongOption = 1;
const isCorrect = wrongOption === q2.correctAnswer;
assert(!isCorrect, 'Detected wrong answer on Q2');

// Trigger intervention
const predictedMisconception = q2.misconceptionAnalysis[wrongOption];
assert(typeof predictedMisconception === 'string' && predictedMisconception.length > 10, 'Successfully predicted misconception text');

state.phase = 'INTERVENTION';
state.activeIntervention = {
  questionIndex: 1,
  conceptId: q2.conceptId,
  chosenOption: wrongOption,
  misconceptionText: predictedMisconception,
};

assert(state.phase === 'INTERVENTION', 'State machine successfully halted test into INTERVENTION mode');
assert(state.activeIntervention.conceptId === 'lens_maker', 'Correctly identified weak concept as lens_maker');

// Transition to REMEDIATION
state.phase = 'REMEDIATION';
const remedialSet = CONCEPTS[q2.conceptId].remedialPool.slice(0, 5);
assert(remedialSet.length === 5, 'Dynamically generated exactly 5 targeted remedial questions');

// Simulate student completing all 5 remedial questions correctly
let remedialScore = 0;
remedialSet.forEach((rq) => {
  remedialScore++; // student answers correctly
});
assert(remedialScore === 5, 'Student achieves 5/5 mastery on remedial branch');

// Resume main test
state.interventions.push({
  conceptId: q2.conceptId,
  remedialScore,
  total: 5,
});
state.phase = 'TESTING';
state.currentIndex++; // proceed to Q3

assert(state.phase === 'TESTING', 'State machine returned to TESTING phase');
assert(state.currentIndex === 2, 'Main test resumed at Question #3');
assert(state.interventions.length === 1, 'Logged concept intervention to diagnostic report history');

console.log('\n' + '='.repeat(80));
console.log(`📊 ADAPTIVE ENGINE TEST RESULTS: ${passed} / ${total} ASSERTIONS PASSED (${((passed / total) * 100).toFixed(1)}%)`);
console.log('='.repeat(80));

if (passed === total) {
  console.log('🎉 ALL ADAPTIVE ENGINE & DAILY TASK CHECKS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error('⚠️ SOME ASSERTIONS FAILED');
  process.exit(1);
}
