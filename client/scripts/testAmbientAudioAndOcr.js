/**
 * Automated Test Suite for Hackathon Features
 * Tests OCR presets, ambient audio presets, and component integrity
 */

import { DEMO_PRESET_PROBLEMS } from '../src/utils/ocrSolverHelper.js';
import fs from 'fs';
import path from 'path';

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

console.log('🧪 Testing Hackathon Innovations (Snap & Solve OCR + Pomodoro Audio + Scaffolding)...\n');

// 1. Test OCR Presets
console.log('--- Test Suite 1: Snap & Solve OCR Presets ---');
assert(Array.isArray(DEMO_PRESET_PROBLEMS), 'DEMO_PRESET_PROBLEMS is an array');
assert(DEMO_PRESET_PROBLEMS.length === 3, `Has 3 high-quality preset problems (got ${DEMO_PRESET_PROBLEMS.length})`);

DEMO_PRESET_PROBLEMS.forEach((preset) => {
  assert(!!preset.id, `Preset [${preset.id}] has valid ID`);
  assert(!!preset.title, `Preset [${preset.id}] has title`);
  assert(!!preset.extractedText, `Preset [${preset.id}] has extracted OCR text`);
  assert(Array.isArray(preset.steps) && preset.steps.length >= 3, `Preset [${preset.id}] has >= 3 derivation steps`);
  assert(!!preset.finalAnswer, `Preset [${preset.id}] has verified final answer`);
});

// 2. Test Ambient Audio Engine File
console.log('\n--- Test Suite 2: Ambient Audio Engine File Structure ---');
const audioEnginePath = path.resolve('client/src/utils/ambientAudioEngine.js');
assert(fs.existsSync(audioEnginePath), 'ambientAudioEngine.js exists');
const audioContent = fs.readFileSync(audioEnginePath, 'utf8');
assert(audioContent.includes('startSpaceship'), 'Audio engine contains startSpaceship method');
assert(audioContent.includes('startBubblingLab'), 'Audio engine contains startBubblingLab method');
assert(audioContent.includes('startCosmicRain'), 'Audio engine contains startCosmicRain method');
assert(audioContent.includes('getAnalyserData'), 'Audio engine contains getAnalyserData for visualizer');

// 3. Test Pages Existence
console.log('\n--- Test Suite 3: New Feature Page Components ---');
const pages = [
  'client/src/pages/SnapAndSolvePage.jsx',
  'client/src/pages/PomodoroPage.jsx',
  'client/src/pages/SandboxLabPage.jsx',
  'client/src/pages/PeerBattlesPage.jsx',
  'client/src/pages/SpacedRepetitionPage.jsx',
  'client/src/components/SnapAndSolve/SnapAndSolveView.jsx',
  'client/src/components/Pomodoro/PomodoroStudyRoom.jsx',
];

pages.forEach((p) => {
  const fullPath = path.resolve(p);
  assert(fs.existsSync(fullPath), `File exists: ${p}`);
});

// 4. Test App.jsx Routes & Sidebar Links
console.log('\n--- Test Suite 4: App Routing & Sidebar Registration ---');
const appContent = fs.readFileSync(path.resolve('client/src/App.jsx'), 'utf8');
assert(appContent.includes('/snap-solve'), 'App.jsx contains /snap-solve route');
assert(appContent.includes('/pomodoro'), 'App.jsx contains /pomodoro route');
assert(appContent.includes('/sandbox'), 'App.jsx contains /sandbox route');
assert(appContent.includes('/battles'), 'App.jsx contains /battles route');
assert(appContent.includes('/spaced-repetition'), 'App.jsx contains /spaced-repetition route');

const sidebarContent = fs.readFileSync(path.resolve('client/src/components/Sidebar.jsx'), 'utf8');
assert(sidebarContent.includes('HACKATHON_MENU'), 'Sidebar.jsx defines HACKATHON_MENU');
assert(sidebarContent.includes('Snap & Solve'), 'Sidebar.jsx contains Snap & Solve menu item');
assert(sidebarContent.includes('Pomodoro Lounge'), 'Sidebar.jsx contains Pomodoro Lounge menu item');

console.log('\n========================================');
console.log(`🏁 Verification Result: ${passed}/${total} tests passed!`);
console.log('========================================\n');
