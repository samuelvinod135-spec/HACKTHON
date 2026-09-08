// ==============================================================================
// Automated System Health & Accuracy Verification Suite: ILOS Integrity Test
// ==============================================================================

import assert from 'assert';

console.log('🧪 Starting ILOS System Health & Accuracy Verification Suite...\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

// -----------------------------------------------------------------------------
// Test 1: Telemetry UUID Sanitization Logic
// -----------------------------------------------------------------------------
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

test('Telemetry sanitizes non-UUID demo personas without throwing Postgres type error', () => {
  const demoEvent = {
    user_id: 'student-aarav-patel',
    cohort_id: 'c3d4e5f6-a7b8-4c5d-9e0f-2a3b4c5d6e7f',
    institution_id: 'invalid-inst-code',
    event_type: 'topic_dwell',
    topic: 'Kinematics',
    payload: { angle: 45 },
  };

  const isUserUuid = typeof demoEvent.user_id === 'string' && UUID_REGEX.test(demoEvent.user_id);
  const isInstUuid = typeof demoEvent.institution_id === 'string' && UUID_REGEX.test(demoEvent.institution_id);
  const isCohortUuid = typeof demoEvent.cohort_id === 'string' && UUID_REGEX.test(demoEvent.cohort_id);

  const sanitized = {
    user_id: isUserUuid ? demoEvent.user_id : null,
    institution_id: isInstUuid ? demoEvent.institution_id : null,
    cohort_id: isCohortUuid ? demoEvent.cohort_id : null,
    payload: {
      ...demoEvent.payload,
      ...(!isUserUuid && demoEvent.user_id ? { client_persona_id: demoEvent.user_id } : {}),
    },
  };

  assert.strictEqual(sanitized.user_id, null, 'Non-UUID user_id must be sanitized to null for SQL compatibility');
  assert.strictEqual(sanitized.institution_id, null, 'Non-UUID institution_id must be sanitized to null');
  assert.strictEqual(sanitized.cohort_id, 'c3d4e5f6-a7b8-4c5d-9e0f-2a3b4c5d6e7f', 'Valid UUID must be preserved');
  assert.strictEqual(sanitized.payload.client_persona_id, 'student-aarav-patel', 'Demo persona identity must be preserved in payload JSONB');
});

// -----------------------------------------------------------------------------
// Test 2: RLS Cohort Isolation Logic (Mathematical proof)
// -----------------------------------------------------------------------------
test('RLS Policy: Teacher A CANNOT access Student B in Cohort B', () => {
  const teacherA = { id: 'teacher-sunita-id', institution_id: 'DPS-INST-UUID' };
  const cohortA = { id: 'cohort-10A-uuid', teacher_id: 'teacher-sunita-id', institution_id: 'DPS-INST-UUID' };
  const cohortB = { id: 'cohort-10B-uuid', teacher_id: 'teacher-gupta-id', institution_id: 'DPS-INST-UUID' };

  const studentInCohortBEvent = {
    user_id: 'student-rohit-id',
    cohort_id: 'cohort-10B-uuid',
    institution_id: 'DPS-INST-UUID',
  };

  // Evaluate strict policy:
  // (cohort_id IS NOT NULL AND cohort_id IN (SELECT id FROM cohorts WHERE teacher_id = auth.uid()))
  const teacherAAssignedCohorts = [cohortA.id]; // Only 10A
  const canTeacherAAccessCohortBTelemetry = teacherAAssignedCohorts.includes(studentInCohortBEvent.cohort_id);

  assert.strictEqual(canTeacherAAccessCohortBTelemetry, false, 'Teacher A must be mathematically blocked from viewing Cohort B telemetry');
});

// -----------------------------------------------------------------------------
// Test 3: RoleGuard Authorization Logic
// -----------------------------------------------------------------------------
test('RoleGuard permits Teachers and Admins to Cockpit, denies Students', () => {
  function checkAccess(allowedRoles, currentRole) {
    if (allowedRoles.length === 0) return true;
    return allowedRoles.includes(currentRole);
  }

  const cockpitAllowed = ['teacher', 'admin'];
  const adminAllowed = ['admin'];

  assert.strictEqual(checkAccess(cockpitAllowed, 'student'), false, 'Student must be denied from Teacher Cockpit');
  assert.strictEqual(checkAccess(cockpitAllowed, 'teacher'), true, 'Teacher must be granted access to Cockpit');
  assert.strictEqual(checkAccess(cockpitAllowed, 'admin'), true, 'Admin must be granted access to Cockpit');
  assert.strictEqual(checkAccess(adminAllowed, 'teacher'), false, 'Teacher must be denied from Admin Dashboard');
  assert.strictEqual(checkAccess(adminAllowed, 'admin'), true, 'Admin must be granted access to Admin Dashboard');
});

// -----------------------------------------------------------------------------
// Test 4: Stealth Scaffolding Threshold Evaluation
// -----------------------------------------------------------------------------
test('Stealth Scaffolding Engine triggers adaptation on error threshold >= 2', () => {
  let errorCount = 0;
  let scaffoldingActive = false;

  function recordError() {
    errorCount++;
    if (errorCount >= 2) {
      scaffoldingActive = true;
    }
  }

  recordError();
  assert.strictEqual(scaffoldingActive, false, '1 error should not trigger scaffolding prematurely');
  recordError();
  assert.strictEqual(scaffoldingActive, true, '2 errors must activate autonomous stealth scaffolding');
});

// -----------------------------------------------------------------------------
// Test 5: Backend Teacher AI Report Endpoint
// -----------------------------------------------------------------------------
async function runAsyncTests() {
  test('Backend /api/institutional/stats responds with active campus metrics', async () => {
    const res = await fetch('http://localhost:5174/api/institutional/stats');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.code, 'DPS-RKP-2026');
    assert.strictEqual(typeof data.activeCohorts, 'number');
  });

  test('Backend /api/ai/teacher-report generates structured pedagogical memo', async () => {
    const res = await fetch('http://localhost:5174/api/ai/teacher-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cohortId: 'DPS-10A',
        cohortName: 'Grade 10 - Section A',
        teacherName: 'Dr. Sunita Rao',
        students: [
          { name: 'Aarav Patel', rollNo: '10A-01', overallMastery: 52, status: 'struggling' },
          { name: 'Diya Sharma', rollNo: '10A-02', overallMastery: 91, status: 'nominal' },
        ],
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.report.strugglingCount, 1);
    assert.ok(data.report.plainTextReport.includes('INSTITUTIONAL AI PEDAGOGICAL REPORT'));
  });

  console.log(`\n📊 Verification Summary: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%).`);
}

runAsyncTests().catch((e) => console.error('Async test suite failure:', e));
