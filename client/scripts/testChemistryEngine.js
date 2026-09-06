import {
  ALL_REACTIONS,
  getReactionCount,
  matchReactionLocally,
} from '../src/data/massiveReactionsData.js';
import { ALL_118_ELEMENTS, getElementBySymbol, getElementByNumber } from '../src/data/elementsAnimeData.js';

console.log('🧪 Starting Comprehensive Chemistry Engine Verification...\n');

// 1. Verify 118 Elements
console.log('=== TEST 1: 118 Anime Champions Codex ===');
console.log(`Total Elements in Codex: ${ALL_118_ELEMENTS.length}`);
if (ALL_118_ELEMENTS.length !== 118) {
  throw new Error(`Expected 118 elements, got ${ALL_118_ELEMENTS.length}`);
}

const hydrogen = getElementBySymbol('H');
const oganesson = getElementByNumber(118);
const sodium = getElementBySymbol('Na');

console.log(`Element 1 (H): ${hydrogen.name} - "${hydrogen.animeTitle}" (Power: ${hydrogen.power})`);
console.log(`Element 11 (Na): ${sodium.name} - "${sodium.animeTitle}" (Affinity: ${sodium.affinity})`);
console.log(`Element 118 (Og): ${oganesson.name} - "${oganesson.animeTitle}" (Rarity: ${oganesson.rarity})`);

// 2. Verify Reaction Count (>2,000)
console.log('\n=== TEST 2: Reaction Count (>2,000 Reactions) ===');
const totalRx = getReactionCount();
console.log(`Total Verified Chemical Reactions: ${totalRx}`);
if (totalRx < 2000) {
  throw new Error(`Reaction count must be >2,000, got ${totalRx}`);
}
console.log('✅ Reaction count satisfies requirement (> 2,000 reactions)!');

// 3. Verify Specific High-Yield JEE/NEET Named Reactions
console.log('\n=== TEST 3: Crucial Organic & Inorganic Named Reactions ===');
const testCases = [
  { id: 'rx_diazotization', name: 'Diazotization of Aniline', inputs: ['C6H5NH2', 'NaNO2', 'HCl'], conds: ['0_5C'] },
  { id: 'rx_sandmeyer_cl', name: 'Sandmeyer (Chlorobenzene)', inputs: ['C6H5N2Cl', 'CuCl', 'HCl'], conds: ['room_temp'] },
  { id: 'rx_azo_coupling_phenol', name: 'Azo Coupling (Orange Dye)', inputs: ['C6H5N2Cl', 'C6H5OH', 'NaOH'], conds: ['alkaline_pH9_10'] },
  { id: 'rx_azo_coupling_aniline', name: 'Azo Coupling (Yellow Dye)', inputs: ['C6H5N2Cl', 'C6H5NH2'], conds: ['mild_acidic_pH4_5'] },
  { id: 'rx_azo_coupling_betanaphthol', name: 'Coupling with β-Naphthol (Scarlet Red)', inputs: ['C6H5N2Cl', 'beta_naphthol', 'NaOH'], conds: ['alkaline'] },
  { id: 'rx_aldol_condensation', name: 'Aldol Condensation', inputs: ['CH3CHO', 'NaOH_dil'], conds: ['heat'] },
  { id: 'rx_cannizzaro', name: 'Cannizzaro Reaction', inputs: ['HCHO', 'NaOH_conc'], conds: ['room_temp'] },
  { id: 'rx_clemmensen', name: 'Clemmensen Reduction', inputs: ['CH3COCH3', 'Zn_Hg', 'HCl_conc'], conds: ['reflux'] },
  { id: 'rx_tollens_test', name: "Tollens' Silver Mirror Test", inputs: ['CH3CHO', 'AgNO3', 'NH4OH', 'NaOH'], conds: ['warm_water_bath'] },
  { id: 'rx_iodoform_test', name: 'Iodoform Test', inputs: ['CH3COCH3', 'I2', 'NaOH'], conds: ['warm'] },
  { id: 'rx_finkelstein', name: 'Finkelstein Reaction', inputs: ['C2H5Cl', 'NaI', 'acetone'], conds: ['reflux'] },
  { id: 'rx_swarts', name: 'Swarts Reaction', inputs: ['CH3Br', 'AgF'], conds: ['heat'] },
  { id: 'rx_wurtz', name: 'Wurtz Reaction', inputs: ['CH3Cl', 'Na'], conds: ['dry_ether'] },
  { id: 'rx_saytzeff_elimination', name: 'Saytzeff E2 Elimination', inputs: ['CH3CH2CHBrCH3', 'KOH_alc'], conds: ['heat'] },
  { id: 'rx_brown_ring', name: 'Brown Ring Test for Nitrates', inputs: ['KNO3', 'FeSO4', 'H2SO4_conc'], conds: ['carefully_layered'] },
  { id: 'rx_nessler_ammonium', name: "Nessler's Reagent Test", inputs: ['NH4Cl', 'K2HgI4', 'KOH'], conds: ['alkaline'] },
  { id: 'rx_chromyl_chloride', name: 'Chromyl Chloride Test', inputs: ['NaCl', 'K2Cr2O7', 'H2SO4_conc'], conds: ['heat'] },
  { id: 'rx_flame_sodium', name: 'Flame Test Sodium', inputs: ['NaCl', 'Bunsen_Flame'], conds: ['high_temp'] },
];

let passed = 0;
for (const tc of testCases) {
  const match = matchReactionLocally(tc.inputs, tc.conds);
  if (!match) {
    console.error(`❌ FAILED to match: ${tc.name}`);
  } else {
    console.log(`✓ Matched: ${match.name} -> Equation: ${match.equation}`);
    passed++;
  }
}

console.log(`\nResults: ${passed} / ${testCases.length} master reaction test cases matched successfully!`);
if (passed === testCases.length) {
  console.log('🎉 ALL TESTS PASSED WITH 100% ACCURACY!');
} else {
  process.exit(1);
}
