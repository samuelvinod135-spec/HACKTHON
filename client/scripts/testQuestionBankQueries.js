import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://htgsiuqtlfdebxepsslh.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Z3NpdXF0bGZkZWJ4ZXBzc2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MTgxNTYsImV4cCI6MjEwMjI5NDE1Nn0.d_3FLVrNK-3jc8drkTKqRAey1eWlsQr4lNmauy4Wz8E';

async function runTests() {
  console.log('🧪 Starting Question Bank Supabase & API Verification Tests...\n');
  let passed = 0;
  let total = 0;

  function assert(condition, name) {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name}`);
    }
  }

  // TEST 1: Supabase Direct REST Query for Quiz (chapter = 'Kinematics', limit = 10)
  console.log('--- Test Suite 1: Quiz Query ("Fetch 10 questions where chapter = Kinematics") ---');
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/question_bank?chapter=eq.Kinematics&limit=10`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const data = await res.json();

    assert(res.ok, 'Supabase REST HTTP 200 OK');
    assert(Array.isArray(data), 'Response is an array');
    assert(data.length === 10, `Returned exactly 10 questions (got ${data.length})`);
    assert(
      data.every((q) => q.chapter === 'Kinematics'),
      'Every question belongs to chapter "Kinematics"'
    );
    assert(
      data.every((q) => q.question && q.option_a && q.correct_option && q.answer),
      'All 10 questions contain question text, options, and answers'
    );
  } catch (err) {
    console.error('Test 1 failed:', err);
    assert(false, 'Supabase REST Query Kinematics');
  }

  // TEST 2: Supabase Direct REST Query for Mock Test (exam_level = 'Main-Moderate', limit = 50)
  console.log('\n--- Test Suite 2: Mock Test Query ("Fetch 50 questions where exam_level = Main-Moderate") ---');
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/question_bank?exam_level=eq.Main-Moderate&limit=50`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const data = await res.json();

    assert(res.ok, 'Supabase REST HTTP 200 OK');
    assert(Array.isArray(data), 'Response is an array');
    assert(data.length === 50, `Returned exactly 50 questions (got ${data.length})`);
    assert(
      data.every((q) => q.exam_level === 'Main-Moderate'),
      'Every question has exam_level "Main-Moderate"'
    );
    assert(
      data.every((q) => q.question && q.answer && q.correct_option),
      'All 50 questions have valid question text, answer, and correct_option'
    );
  } catch (err) {
    console.error('Test 2 failed:', err);
    assert(false, 'Supabase REST Query Main-Moderate');
  }

  // TEST 3: Local Express API endpoint (/api/questions?chapter=Kinematics&limit=10)
  console.log('\n--- Test Suite 3: Local Backend API Quiz Endpoint ---');
  try {
    const res = await fetch('http://localhost:5174/api/questions?chapter=Kinematics&limit=10&random=true');
    const data = await res.json();

    assert(res.ok, 'Local Express API HTTP 200 OK');
    assert(data.questions && data.questions.length === 10, 'Returned 10 questions');
    assert(
      data.questions.every((q) => q.chapter.toLowerCase() === 'kinematics'),
      'All local questions belong to Kinematics'
    );
  } catch (err) {
    console.error('Test 3 failed:', err);
    assert(false, 'Local API Kinematics');
  }

  // TEST 4: Local Express API endpoint (/api/questions?exam_level=Main-Moderate&limit=50)
  console.log('\n--- Test Suite 4: Local Backend API Mock Test Endpoint ---');
  try {
    const res = await fetch('http://localhost:5174/api/questions?exam_level=Main-Moderate&limit=50&random=true');
    const data = await res.json();

    assert(res.ok, 'Local Express API HTTP 200 OK');
    assert(data.questions && data.questions.length === 50, 'Returned 50 questions');
    assert(
      data.questions.every((q) => q.exam_level.toLowerCase() === 'main-moderate'),
      'All local questions have exam_level "Main-Moderate"'
    );
  } catch (err) {
    console.error('Test 4 failed:', err);
    assert(false, 'Local API Main-Moderate');
  }

  // TEST 5: Total Question Bank Volume and Chapter Coverage
  console.log('\n--- Test Suite 5: Question Bank Health & Integrity ---');
  try {
    const res = await fetch('http://localhost:5174/api/questions/stats');
    const stats = await res.json();

    assert(stats.total === 25000, `Total Question Bank collection size is 25,000 questions (got ${stats.total})`);
    assert(stats.chaptersCount >= 55, `Question Bank spans ${stats.chaptersCount} chapters across Physics & Chemistry`);
    assert(
      stats.bySubject.some((s) => s.subject === 'Physics' && s.count === 13300),
      'Physics question count is 13,300'
    );
    assert(
      stats.bySubject.some((s) => s.subject === 'Chemistry' && s.count === 11700),
      'Chemistry question count is 11,700'
    );
  } catch (err) {
    console.error('Test 5 failed:', err);
    assert(false, 'Question Bank Stats');
  }

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
