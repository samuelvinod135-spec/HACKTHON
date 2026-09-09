import assert from 'assert';
import {
  ALL_PHYSICS_EXPERIMENTS,
  CURATED_PHYSICS_EXPERIMENTS,
  getPhysicsExperimentCount,
  searchPhysicsExperiments,
  findPhysicsExperiment,
  PHYSICS_CATEGORIES,
} from './client/src/data/massivePhysicsData.js';

console.log('🧪 Running Comprehensive Physics Lab & Experiment Database Verification...\n');

// 1. Check Experiment Count
const count = getPhysicsExperimentCount();
console.log(`[TEST 1] Total Physics Experiments Generated: ${count}`);
assert(count >= 7000, `Expected at least 7000 experiments, got ${count}`);
console.log('✅ PASS: Database contains > 7,000 experiments (Total: ' + count + ')\n');

// 2. Test Projectile Preset Resolution
console.log('[TEST 2] Verifying Projectile Preset Resolution:');
const p1 = findPhysicsExperiment('projectile');
const p2 = findPhysicsExperiment('projectile-range');
const p3 = findPhysicsExperiment('ballistic');
const p4 = findPhysicsExperiment('launcher');

console.log(`  Query 'projectile' -> ID: ${p1.id}, Title: ${p1.title}`);
console.log(`  Query 'projectile-range' -> ID: ${p2.id}, Title: ${p2.title}`);
console.log(`  Query 'ballistic' -> ID: ${p3.id}, Title: ${p3.title}`);
console.log(`  Query 'launcher' -> ID: ${p4.id}, Title: ${p4.title}`);

assert.strictEqual(p1.components[0].type, 'projectile', 'Query projectile should yield projectile apparatus');
assert.strictEqual(p2.components[0].type, 'projectile', 'Query projectile-range should yield projectile apparatus');
assert.strictEqual(p3.components[0].type, 'projectile', 'Query ballistic should yield projectile apparatus');
assert.strictEqual(p4.components[0].type, 'projectile', 'Query launcher should yield projectile apparatus');
console.log('✅ PASS: Projectile preset is correctly resolved without ever falling back to optics lenses!\n');

// 3. Test Optics, Pendulum, and Dynamics Preset Resolutions
console.log('[TEST 3] Verifying Other Apparatus Resolutions:');
const pend = findPhysicsExperiment('pendulum');
const convex = findPhysicsExperiment('convex-lens');
const multi = findPhysicsExperiment('multi-lens-bench');
const ramp = findPhysicsExperiment('ramp');

assert.strictEqual(pend.components[0].type, 'pendulum', 'Query pendulum should yield pendulum');
assert.strictEqual(convex.components[0].type, 'laser', 'Query convex should yield laser + lens setup');
assert.strictEqual(multi.id, 'multi-lens-bench', 'Query multi-lens-bench should yield 12-lens bench');
assert.strictEqual(ramp.components[0].type, 'ramp', 'Query ramp should yield inclined plane');
console.log('✅ PASS: All apparatus types resolve to their exact corresponding lab setups.\n');

// 4. Test Search Functionality Across Categories
console.log('[TEST 4] Verifying Categorical Search:');
for (const cat of PHYSICS_CATEGORIES) {
  if (cat === 'All') continue;
  const res = searchPhysicsExperiments('', cat, 10, 0);
  console.log(`  Category '${cat}': Found ${res.total} experiments`);
  assert(res.total > 0, `Category ${cat} should contain experiments`);
  assert(res.experiments.length <= 10, 'Should respect limit parameter');
  assert.strictEqual(res.experiments[0].category, cat, 'Category must match');
}
console.log('✅ PASS: All categories properly populated and filtered.\n');

// 5. Planetary Gravity Invariance & Telemetry Calculations
console.log('[TEST 5] Verifying Planetary Gravity Variations:');
const moonExp = searchPhysicsExperiments('Moon', 'Ballistics & Kinematics', 5, 0);
const jupExp = searchPhysicsExperiments('Jupiter', 'Ballistics & Kinematics', 5, 0);
console.log(`  Moon Ballistics: ${moonExp.total} setups`);
console.log(`  Jupiter Ballistics: ${jupExp.total} setups`);
assert(moonExp.total > 100, 'Should have varied Moon setups');
assert(jupExp.total > 100, 'Should have varied Jupiter setups');
assert(moonExp.experiments[0].env.gravity < 2.0, 'Moon gravity should be ~1.62');
assert(jupExp.experiments[0].env.gravity > 20.0, 'Jupiter gravity should be ~24.79');
console.log('✅ PASS: Planetary environments correctly configured with physical constants.\n');

console.log('🎉 ALL 5/5 PHYSICS LAB SUITE TESTS PASSED PERFECTLY!\n');
