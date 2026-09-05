/**
 * Automated Verification Suite for LabXplore Science AI Virtual Teaching Assistant
 * 
 * Verifies:
 * 1. Strict Domain Enforcement (Physics & Chemistry queries succeed).
 * 2. Out-of-bounds topics (Coding, History, Pop Culture, etc.) are strictly declined with the mandated fallback.
 * 3. Contextual Prompts Generation across Physics, Chemistry, Daily Challenge, and Mock Tests.
 * 4. API Endpoints functionality and payload correctness.
 */

import assert from 'node:assert';

const BASE_URL = 'http://localhost:5174/api';
const MANDATED_FALLBACK =
  'I am an expert assistant dedicated solely to Physics and Chemistry! Please ask me a question related to your science experiments or concepts.';

async function postChat(message, context = {}) {
  const res = await fetch(`${BASE_URL}/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

async function getPrompts(context = {}) {
  const params = new URLSearchParams();
  if (context.path) params.set('path', context.path);
  if (context.activeExperiment) params.set('activeExperiment', context.activeExperiment);
  const res = await fetch(`${BASE_URL}/chat/context-prompts?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

async function runTests() {
  console.log('🧪 Starting LabXplore Science Chatbot Verification Suite...\n');
  let passed = 0;
  let total = 0;

  function check(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
    }
  }

  // ---- TEST GROUP 1: In-Domain Physics Questions ----
  console.log('--- 1. Testing Physics Domain Queries ---');

  const snellRes = await postChat("Explain Snell's law of refraction and how light bends", {
    path: '/physics',
    activeExperiment: 'Ray Optics',
  });
  check('Physics: Snell\'s Law is accepted and explained', () => {
    assert.strictEqual(snellRes.isScienceRelated, true);
    assert(snellRes.reply.includes("Snell's Law") || snellRes.reply.includes("Snell"));
    assert(snellRes.reply.includes("n1") || snellRes.reply.includes("n₁") || snellRes.reply.includes("n_1"));
    assert(Array.isArray(snellRes.suggestedPrompts));
  });

  const lensRes = await postChat("What is the difference between a convex and concave lens?", {
    path: '/physics',
    activeExperiment: 'Ray Optics',
  });
  check('Physics: Lens optics is accepted', () => {
    assert.strictEqual(lensRes.isScienceRelated, true);
    assert(lensRes.reply.includes("Convex"));
    assert(lensRes.reply.includes("Concave"));
  });

  const pendulumRes = await postChat("Why doesn't mass affect the period of a pendulum?", {
    path: '/physics',
    activeExperiment: 'Harmonic Pendulum',
  });
  check('Physics: Pendulum mechanics is accepted', () => {
    assert.strictEqual(pendulumRes.isScienceRelated, true);
    assert(pendulumRes.reply.includes("Pendulum") || pendulumRes.reply.includes("period"));
  });

  // ---- TEST GROUP 2: In-Domain Chemistry Questions ----
  console.log('\n--- 2. Testing Chemistry Domain Queries ---');

  const mgRes = await postChat("Why does magnesium burn with a dazzling white light?", {
    path: '/chemistry',
    activeExperiment: 'Magnesium Combustion',
  });
  check('Chemistry: Magnesium combustion is accepted', () => {
    assert.strictEqual(mgRes.isScienceRelated, true);
    assert(mgRes.reply.includes("Magnesium") || mgRes.reply.includes("MgO"));
    assert(mgRes.reply.includes("white"));
  });

  const precipRes = await postChat("What causes a precipitate to form in a chemical reaction?", {
    path: '/chemistry',
  });
  check('Chemistry: Precipitation reaction is accepted', () => {
    assert.strictEqual(precipRes.isScienceRelated, true);
    assert(precipRes.reply.includes("precipitate") || precipRes.reply.includes("insoluble"));
  });

  // ---- TEST GROUP 3: Strict Out-of-Bounds Rejection ----
  console.log('\n--- 3. Testing Strict Out-of-Bounds Rejections ---');

  const oobQueries = [
    { name: 'Coding/Python', query: 'Can you write a python script to sort an array?' },
    { name: 'History', query: 'Who was the first emperor of Ancient Rome?' },
    { name: 'Pop Culture / Movies', query: 'What is your favorite Hollywood movie?' },
    { name: 'Sports', query: 'Who won the soccer world cup final?' },
    { name: 'Pure Calculus', query: 'What is the derivative of x^3 + tan(x)?' },
    { name: 'Cooking Recipe', query: 'Give me a recipe for cooking pasta bolognese' },
  ];

  for (const item of oobQueries) {
    const res = await postChat(item.query, { path: '/physics' });
    check(`Out-of-Bounds Rejection: ${item.name}`, () => {
      assert.strictEqual(res.isScienceRelated, false, `Query "${item.query}" was not marked out-of-bounds`);
      assert.strictEqual(res.reply, MANDATED_FALLBACK, `Did not return exact mandated fallback for ${item.name}`);
    });
  }

  // ---- TEST GROUP 4: Greetings & Identity ----
  console.log('\n--- 4. Testing Greetings & Identity ---');

  const greetingRes = await postChat('Hello!', {
    path: '/physics',
    activeExperiment: 'Ray Optics',
  });
  check('Greeting introduces Science Assistant with context', () => {
    assert.strictEqual(greetingRes.isScienceRelated, true);
    assert(greetingRes.reply.includes('Virtual Teaching Assistant') || greetingRes.reply.includes('LabXplore'));
    assert(greetingRes.reply.includes('Ray Optics') || greetingRes.reply.includes('physics'));
  });

  // ---- TEST GROUP 5: Contextual Suggested Prompts ----
  console.log('\n--- 5. Testing Contextual Prompts ---');

  const physicsPrompts = await getPrompts({ path: '/physics', activeExperiment: 'Ray Optics' });
  check('Physics Context Prompts received', () => {
    assert(Array.isArray(physicsPrompts.prompts));
    assert(physicsPrompts.prompts.length >= 3);
    assert(physicsPrompts.prompts.some((p) => p.toLowerCase().includes('lens') || p.toLowerCase().includes('snell')));
  });

  const chemPrompts = await getPrompts({ path: '/chemistry' });
  check('Chemistry Context Prompts received', () => {
    assert(Array.isArray(chemPrompts.prompts));
    assert(chemPrompts.prompts.length >= 3);
    assert(chemPrompts.prompts.some((p) => p.toLowerCase().includes('magnesium') || p.toLowerCase().includes('reaction')));
  });

  const mockTestPrompts = await getPrompts({ path: '/mock-tests' });
  check('Mock Test Context Prompts received', () => {
    assert(Array.isArray(mockTestPrompts.prompts));
    assert(mockTestPrompts.prompts.length >= 3);
  });

  console.log('\n================================================================================');
  console.log(`📊 SCIENCE CHATBOT TEST RESULTS: ${passed} / ${total} CHECKS PASSED (${((passed / total) * 100).toFixed(1)}%)`);
  console.log('================================================================================');

  if (passed === total) {
    console.log('🎉 ALL SCIENCE CHATBOT TESTS PASSED WITH 100% ACCURACY!');
  } else {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
