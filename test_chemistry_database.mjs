import assert from 'assert';
import {
  getAllChemistryReactions,
  getChemistryReactionCount,
  getAllNamedReactions,
  getExperimentsCatalog,
  getMoleculesCatalog,
  searchChemistryReactions,
  balanceChemicalEquation,
  simulateReaction
} from './client/src/data/chemistry/chemistryDatabase.js';

console.log('🧪 Starting Comprehensive Chemistry Database & Engine Audit...');

// 1. Reaction Count Verification (Must be >= 10,000)
const totalCount = getChemistryReactionCount();
console.log(`[1/7] Total Chemical Reactions Count: ${totalCount}`);
assert(totalCount >= 10000, `Reaction count must be >= 10000, but found ${totalCount}`);

// 2. Class Distribution Verification
const all = getAllChemistryReactions();
const c10Count = all.filter(r => r.classLevel === 10).length;
const c11Count = all.filter(r => r.classLevel === 11).length;
const c12Count = all.filter(r => r.classLevel === 12).length;
console.log(`[2/7] Class-wise Distribution: Class 10: ${c10Count}, Class 11: ${c11Count}, Class 12: ${c12Count}`);
assert(c10Count > 500, `Class 10 reactions must be substantial, found ${c10Count}`);
assert(c11Count > 500, `Class 11 reactions must be substantial, found ${c11Count}`);
assert(c12Count > 1000, `Class 12 reactions must be substantial, found ${c12Count}`);

// 3. Named Reactions Verification
const named = getAllNamedReactions();
console.log(`[3/7] Named Reactions Count: ${named.length}`);
assert(named.length >= 30, `Named reactions must be >= 30, found ${named.length}`);
const sampleNamed = named[0];
assert(sampleNamed.name && sampleNamed.generalEquation && sampleNamed.mechanism, 'Named reaction must contain full pedagogical metadata');

// 4. Experiments Catalog Verification (Must be >= 100)
const experiments = getExperimentsCatalog();
console.log(`[4/7] Experiments Catalog Count: ${experiments.length}`);
assert(experiments.length >= 100, `Experiments catalog must be >= 100, found ${experiments.length}`);
const sampleExp = experiments.find(e => e.classLevel === 12 && e.category.includes('Titration'));
assert(sampleExp && sampleExp.procedure.length > 0 && sampleExp.vivaQuestions.length > 0, 'Experiment must contain full procedure and viva questions');

// 5. Molecules Catalog Verification (Must be >= 60)
const molecules = getMoleculesCatalog();
console.log(`[5/7] Molecules Catalog Count: ${molecules.length}`);
assert(molecules.length >= 60, `Molecules catalog must be >= 60, found ${molecules.length}`);

// 6. Search Functionality Verification
console.log(`[6/7] Testing Multi-Token Search...`);
const searchWater = searchChemistryReactions('esterification', {}, 10, 0);
assert(searchWater.length > 0, 'Search for esterification must yield results');
const searchC10 = searchChemistryReactions('', { classLevel: 'Class 10' }, 50, 0);
assert(searchC10.every(r => r.classLevel === 10), 'Class 10 filter must return only class 10 reactions');

// 7. Equation Balancer & Strict Zero-Fabrication Simulator
console.log(`[7/7] Testing Balancer & Strict Simulator...`);
const bal1 = balanceChemicalEquation('Al + HCl -> AlCl3 + H2');
assert(bal1.success, 'Al + HCl balancer must succeed');
assert(bal1.balancedEquation.includes('2 Al') && bal1.balancedEquation.includes('6 HCl'), `Expected 2 Al + 6 HCl, got ${bal1.balancedEquation}`);

const simMatch = simulateReaction(['NaOH', 'HCl']);
assert(simMatch.found, 'NaOH + HCl simulation must match');

const simFake = simulateReaction(['ImaginaryCompoundX', 'UnrealCompoundY']);
assert(!simMatch.found === false, 'Real match works');
assert(!simFake.found, 'Fake chemicals must NOT produce a reaction');
assert(simFake.message === 'Reaction not available in current educational database.', 'Must return exact zero-fabrication fallback text');

console.log('✅ ALL 7 AUDIT CRITERIA PASSED FLAWLESSLY!');
