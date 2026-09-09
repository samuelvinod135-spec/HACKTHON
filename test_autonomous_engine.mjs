import {
  calculateUpdatedMastery,
  calculateOverallProgressScore,
  detectWeaknessPatterns,
  detectStrengthPatterns,
  evaluateTrendAndRisk,
  prescribeNextBestAction,
  generatePersonalizedLearningPath,
  evaluateAutonomousAchievements,
} from './client/src/services/autonomousLearningEngine.js';

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('🚀 Running Comprehensive Autonomous Learning Intelligence Suite...\n');

// 1. Bayesian Dynamic Mastery Updates
console.log('--- Test 1: Bayesian Knowledge Tracing & Dynamic Mastery ---');
const initial = 60;
const correctUp = calculateUpdatedMastery(initial, true, 1.5, 1);
assert(correctUp > initial, `Correct attempt increased score from ${initial} to ${correctUp}`);
const wrongDown = calculateUpdatedMastery(initial, false, 1.5, 1);
assert(wrongDown < initial, `Incorrect attempt decreased score from ${initial} to ${wrongDown}`);
const asymptoticUpper = calculateUpdatedMastery(98, true, 2.0, 1);
assert(asymptoticUpper <= 99, `Asymptotic damping prevents score overflow at top: ${asymptoticUpper}`);
const asymptoticLower = calculateUpdatedMastery(8, false, 1.0, 1);
assert(asymptoticLower >= 5, `Asymptotic damping prevents score dropping below floor: ${asymptoticLower}`);

// 2. Explainable Learning Health Score
console.log('\n--- Test 2: Explainable Learning Health Score ---');
const mockMastery = {
  Kinematics: { score: 55, successCount: 3, errorCount: 4 },
  'Ray Optics': { score: 90, successCount: 12, errorCount: 1 },
  Stoichiometry: { score: 50, successCount: 2, errorCount: 4 },
  'Acids and Bases': { score: 94, successCount: 15, errorCount: 0 },
};
const labEvals = [
  { procedureScore: 92, conceptScore: 88, accuracyScore: 90 },
];
const quizStats = { totalQuestionsAnswered: 20, correctCount: 15 };
const health = calculateOverallProgressScore(mockMastery, labEvals, quizStats);
assert(health.score >= 50 && health.score <= 100, `Health score is within realistic bound: ${health.score}`);
assert(typeof health.explanation === 'string' && health.explanation.length > 20, `Provides transparent explanation: "${health.explanation}"`);
assert(health.explanation.includes('Optics') || health.explanation.includes('Acids'), `Explanation cites actual tracked topics`);

// 3. Pattern-Based Weakness Discovery
console.log('\n--- Test 3: Autonomous Misconception Pattern Detection ---');
const errorTelemetry = [
  { topic: 'Kinematics', questionText: 'Projectile at apex has downward acceleration -g', pickedOption: 'Positive acceleration' },
  { topic: 'Kinematics', questionText: 'Freefall velocity vector direction sign convention', pickedOption: 'Negative sign omitted' },
  { topic: 'Stoichiometry', questionText: 'Balancing equation Al + O2 -> Al2O3', pickedOption: 'Changed subscript to 3 instead of balancing coefficients' },
  { topic: 'Stoichiometry', questionText: 'Balancing coefficients for combustion', pickedOption: 'Subscript altered' },
];
const weaknesses = detectWeaknessPatterns(errorTelemetry);
assert(weaknesses.length >= 2, `Detected ${weaknesses.length} distinct misconception patterns`);
const kinematicsWeakness = weaknesses.find((w) => w.topic === 'Kinematics');
assert(kinematicsWeakness && kinematicsWeakness.label.includes('sign'), `Identified kinematics sign convention misconception: "${kinematicsWeakness?.label}"`);
assert(kinematicsWeakness.remediationLink && kinematicsWeakness.remediationBtn, `Provides direct remediation link and CTA button: "${kinematicsWeakness?.remediationBtn}" -> ${kinematicsWeakness?.remediationLink}`);

// 4. Verified Strength Detection
console.log('\n--- Test 4: Empirical Strength Detection ---');
const strengths = detectStrengthPatterns(mockMastery, { accuracy: 88, totalQuestionsAnswered: 15 });
assert(strengths.length >= 2, `Detected ${strengths.length} empirical strengths`);
const opticsStrength = strengths.find((s) => s.topic === 'Ray Optics');
assert(opticsStrength && opticsStrength.evidence.includes('90%'), `Optics strength cites empirical accuracy evidence: "${opticsStrength?.evidence}"`);

// 5. Trend & Multivariate Early Warning System
console.log('\n--- Test 5: Trend & Early Warning Risk Engine ---');
const historyDeclining = [
  { score: 82, timestamp: '2026-09-07T00:00:00Z' },
  { score: 72, timestamp: '2026-09-08T00:00:00Z' },
];
const trendResult = evaluateTrendAndRisk(historyDeclining, 70, mockMastery);
assert(trendResult.trend === 'declining' || trendResult.trend === 'at_risk', `Correctly flagged declining trajectory: ${trendResult.trend}`);
assert(trendResult.earlyWarnings.length > 0, `Surfaced early warning signals: ${trendResult.earlyWarnings[0]?.title}`);

// 6. Next-Best-Action Prescription Engine
console.log('\n--- Test 6: Next-Best-Action (NBA) Prescription ---');
const nba = prescribeNextBestAction(mockMastery, weaknesses, labEvals);
assert(nba.type === 'remediation', `Highest priority NBA is targeted remediation`);
assert(nba.buttonText && nba.buttonText.length > 0, `Has 1-click execution CTA: "${nba.buttonText}"`);
assert(nba.whyExplanation && nba.whyExplanation.length > 0, `Provides transparent pedagogical rationale: "${nba.whyExplanation}"`);

// 7. Dynamic Personalized Learning Path
console.log('\n--- Test 7: Dynamic Personalized Learning Path ---');
const path = generatePersonalizedLearningPath(mockMastery);
assert(path.length === Object.keys(mockMastery).length, `Generated path contains all curriculum entries: ${path.length} steps`);
assert(path[0].stage === 'Remediate Friction', `First step targets cognitive friction remediation: "${path[0].title}"`);
assert(path[path.length - 1].stage === 'Domain Mastery', `Final step challenges mastered competencies`);

// 8. Empirical Autonomous Achievements
console.log('\n--- Test 8: Autonomous Achievement Evaluator ---');
const achievements = evaluateAutonomousAchievements(mockMastery, { totalQuestionsAnswered: 20, accuracy: 85 }, 4);
assert(achievements.length >= 3, `Unlocked ${achievements.length} achievements purely through empirical metrics`);
assert(achievements.some((a) => a.slug === 'lab_empiricist'), `Awarded Empirical Scientist for >=3 lab runs`);

console.log(`\n==================================================`);
console.log(`🎯 Results: ${passed} / ${total} Tests Passed (${Math.round((passed / total) * 100)}%)`);
console.log(`==================================================\n`);

if (passed !== total) {
  process.exit(1);
}
