// Frontend chemical & apparatus catalog for Chemistry Workspace.
// Integrates all 118 Anime Elements, key Organic Compounds (Diazonium, Haloalkanes, Aldehydes, Benzene),
// and Laboratory Apparatus (Beakers, Test Tubes, Bunsen Burner Fire Equipment).

import { ALL_118_ELEMENTS } from './data/elementsAnimeData.js';

export const APPARATUS_ITEMS = [
  { id: 'app_beaker_250', name: 'Beaker (250 mL)', capacity: 250, type: 'beaker', icon: '🧪', desc: 'Standard borosilicate glass beaker for mixing & heating' },
  { id: 'app_beaker_500', name: 'Beaker (500 mL)', capacity: 500, type: 'beaker', icon: '🍶', desc: 'Large capacity beaker for exothermic bulk reactions' },
  { id: 'app_test_tube', name: 'Test Tube (50 mL)', capacity: 50, type: 'test_tube', icon: '🧪', desc: 'Slender cylindrical tube mounted in wooden/acrylic rack' },
  { id: 'app_erlenmeyer', name: 'Erlenmeyer Flask', capacity: 250, type: 'flask', icon: '⚗️', desc: 'Conical neck flask ideal for swirling without spillage' },
  { id: 'app_bunsen_burner', name: 'Bunsen Burner ("Fire Fire")', type: 'burner', icon: '🔥', desc: 'Dual-flame thermal source: Luminous Yellow vs Roaring Sky Blue flame' },
  { id: 'app_pipette', name: 'Precision Dropper / Pipette', type: 'dropper', icon: '💧', desc: 'Accurately delivers drops of liquid reagent into vessels' },
  { id: 'app_glass_stirrer', name: 'Glass Stirring Rod', type: 'stirrer', icon: '🪄', desc: 'Agitates solution to accelerate diffusion and reaction kinetics' },
];

export const CATEGORIES = [
  'All',
  '118 Elements (Anime)',
  'Diazonium & Benzene',
  'Aldehydes & Ketones',
  'Haloalkanes & Alkyls',
  'Acids',
  'Bases',
  'Salts & Reagents',
  'Gases',
  'Action Arrows',
];

// Convert 118 elements into palette materials
const ELEMENT_MATERIALS = ALL_118_ELEMENTS.map((el) => ({
  id: `el_${el.symbol.toLowerCase()}`,
  formula: el.symbol,
  name: `${el.name} (${el.animeTitle.split('(')[0].trim()})`,
  category: '118 Elements (Anime)',
  phase: el.category.includes('Gas') ? 'g' : el.symbol === 'Hg' || el.symbol === 'Br' ? 'l' : 's',
  tone: 'from-sky-100 to-amber-200',
  number: el.number,
  affinity: el.affinity,
  animeTitle: el.animeTitle,
  power: el.power,
  reactivity: el.reactivity,
}));

export const MATERIAL_CHEMICALS = [
  // Organic: Benzene & Diazonium
  { id: 'c6h5n2cl', formula: 'C6H5N2Cl', name: 'Benzene Diazonium Chloride', category: 'Diazonium & Benzene', phase: 'aq', tone: 'from-sky-200 to-blue-400' },
  { id: 'c6h6', formula: 'C6H6', name: 'Benzene', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-slate-200 to-slate-400' },
  { id: 'c6h5nh2', formula: 'C6H5NH2', name: 'Aniline', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-amber-200 to-amber-400' },
  { id: 'c6h5oh', formula: 'C6H5OH', name: 'Phenol (Carbolic Acid)', category: 'Diazonium & Benzene', phase: 's', tone: 'from-rose-100 to-rose-300' },
  { id: 'c6h5no2', formula: 'C6H5NO2', name: 'Nitrobenzene (Oil of Mirbane)', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-yellow-200 to-yellow-400' },
  { id: 'c6h5cl', formula: 'C6H5Cl', name: 'Chlorobenzene', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-sky-200 to-slate-400' },
  { id: 'c6h5br', formula: 'C6H5Br', name: 'Bromobenzene', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-amber-300 to-orange-500' },
  { id: 'c6h5i', formula: 'C6H5I', name: 'Iodobenzene', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-slate-300 to-slate-600' },
  { id: 'c6h5f', formula: 'C6H5F', name: 'Fluorobenzene', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-sky-100 to-sky-300' },
  { id: 'c6h5cn', formula: 'C6H5CN', name: 'Benzonitrile', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-slate-200 to-slate-400' },
  { id: 'c6h5ch3', formula: 'C6H5CH3', name: 'Toluene', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-sky-100 to-sky-300' },
  { id: 'c6h5coch3', formula: 'C6H5COCH3', name: 'Acetophenone', category: 'Diazonium & Benzene', phase: 'l', tone: 'from-slate-100 to-slate-300' },
  { id: 'beta_naphthol', formula: 'beta_naphthol', name: 'β-Naphthol (2-Naphthol)', category: 'Diazonium & Benzene', phase: 's', tone: 'from-red-100 to-rose-300' },

  // Organic: Aldehydes & Ketones
  { id: 'ch3cho', formula: 'CH3CHO', name: 'Acetaldehyde (Ethanal)', category: 'Aldehydes & Ketones', phase: 'l', tone: 'from-yellow-100 to-amber-300' },
  { id: 'c6h5cho', formula: 'C6H5CHO', name: 'Benzaldehyde (Oil of Bitter Almonds)', category: 'Aldehydes & Ketones', phase: 'l', tone: 'from-amber-200 to-orange-300' },
  { id: 'hcho', formula: 'HCHO', name: 'Formaldehyde (Methanal)', category: 'Aldehydes & Ketones', phase: 'g', tone: 'from-slate-100 to-sky-200' },
  { id: 'ch3coch3', formula: 'CH3COCH3', name: 'Acetone (Propanone)', category: 'Aldehydes & Ketones', phase: 'l', tone: 'from-sky-100 to-sky-300' },
  { id: 'ch3cn', formula: 'CH3CN', name: 'Acetonitrile', category: 'Aldehydes & Ketones', phase: 'l', tone: 'from-slate-100 to-slate-300' },

  // Organic: Haloalkanes & Alkyls
  { id: 'ch3cl', formula: 'CH3Cl', name: 'Methyl Chloride', category: 'Haloalkanes & Alkyls', phase: 'g', tone: 'from-sky-200 to-blue-300' },
  { id: 'ch3br', formula: 'CH3Br', name: 'Methyl Bromide', category: 'Haloalkanes & Alkyls', phase: 'g', tone: 'from-amber-200 to-amber-400' },
  { id: 'ch3i', formula: 'CH3I', name: 'Methyl Iodide', category: 'Haloalkanes & Alkyls', phase: 'l', tone: 'from-yellow-200 to-yellow-500' },
  { id: 'c2h5cl', formula: 'C2H5Cl', name: 'Ethyl Chloride', category: 'Haloalkanes & Alkyls', phase: 'g', tone: 'from-sky-100 to-sky-300' },
  { id: 'c2h5br', formula: 'C2H5Br', name: 'Ethyl Bromide', category: 'Haloalkanes & Alkyls', phase: 'l', tone: 'from-amber-100 to-amber-300' },
  { id: 'c2h5i', formula: 'C2H5I', name: 'Ethyl Iodide', category: 'Haloalkanes & Alkyls', phase: 'l', tone: 'from-yellow-100 to-yellow-400' },
  { id: 'chcl3', formula: 'CHCl3', name: 'Chloroform (Trichloromethane)', category: 'Haloalkanes & Alkyls', phase: 'l', tone: 'from-slate-200 to-slate-400' },
  { id: 'ccl4', formula: 'CCl4', name: 'Carbon Tetrachloride', category: 'Haloalkanes & Alkyls', phase: 'l', tone: 'from-slate-300 to-slate-500' },

  // Acids
  { id: 'hcl', formula: 'HCl', name: 'Hydrochloric Acid', category: 'Acids', phase: 'aq', tone: 'from-rose-300 to-rose-500' },
  { id: 'h2so4', formula: 'H2SO4', name: 'Sulphuric Acid', category: 'Acids', phase: 'aq', tone: 'from-amber-200 to-amber-400' },
  { id: 'hno3', formula: 'HNO3', name: 'Nitric Acid', category: 'Acids', phase: 'aq', tone: 'from-yellow-100 to-yellow-300' },
  { id: 'ch3cooh', formula: 'CH3COOH', name: 'Acetic Acid', category: 'Acids', phase: 'aq', tone: 'from-orange-200 to-orange-400' },
  { id: 'h3po4', formula: 'H3PO4', name: 'Phosphoric Acid', category: 'Acids', phase: 'aq', tone: 'from-teal-200 to-cyan-400' },
  { id: 'h3po2', formula: 'H3PO2', name: 'Hypophosphorous Acid', category: 'Acids', phase: 'aq', tone: 'from-sky-200 to-blue-300' },
  { id: 'hbf4', formula: 'HBF4', name: 'Fluoroboric Acid', category: 'Acids', phase: 'aq', tone: 'from-sky-100 to-sky-300' },

  // Bases
  { id: 'naoh', formula: 'NaOH', name: 'Sodium Hydroxide', category: 'Bases', phase: 'aq', tone: 'from-sky-200 to-sky-400' },
  { id: 'koh', formula: 'KOH', name: 'Potassium Hydroxide', category: 'Bases', phase: 'aq', tone: 'from-sky-100 to-sky-300' },
  { id: 'nh4oh', formula: 'NH4OH', name: 'Ammonium Hydroxide', category: 'Bases', phase: 'aq', tone: 'from-cyan-100 to-cyan-300' },
  { id: 'caoh2', formula: 'Ca(OH)2', name: 'Calcium Hydroxide (Limewater)', category: 'Bases', phase: 'aq', tone: 'from-slate-100 to-slate-200' },
  { id: 'mgoh2', formula: 'Mg(OH)2', name: 'Magnesium Hydroxide', category: 'Bases', phase: 's', tone: 'from-teal-100 to-teal-300' },

  // Salts & Reagents
  { id: 'nano2', formula: 'NaNO2', name: 'Sodium Nitrite', category: 'Salts & Reagents', phase: 's', tone: 'from-yellow-100 to-yellow-200' },
  { id: 'cucl', formula: 'CuCl', name: 'Copper(I) Chloride', category: 'Salts & Reagents', phase: 's', tone: 'from-emerald-200 to-emerald-400' },
  { id: 'cubr', formula: 'CuBr', name: 'Copper(I) Bromide', category: 'Salts & Reagents', phase: 's', tone: 'from-amber-200 to-amber-400' },
  { id: 'cucn', formula: 'CuCN', name: 'Copper(I) Cyanide', category: 'Salts & Reagents', phase: 's', tone: 'from-slate-200 to-slate-300' },
  { id: 'ki', formula: 'KI', name: 'Potassium Iodide', category: 'Salts & Reagents', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'alcl3', formula: 'AlCl3', name: 'Anhydrous Aluminium Chloride', category: 'Salts & Reagents', phase: 's', tone: 'from-slate-100 to-slate-200' },
  { id: 'fecl3', formula: 'FeCl3', name: 'Iron(III) Chloride', category: 'Salts & Reagents', phase: 'aq', tone: 'from-amber-300 to-amber-500' },
  { id: 'agno3', formula: 'AgNO3', name: 'Silver Nitrate', category: 'Salts & Reagents', phase: 'aq', tone: 'from-slate-100 to-slate-200' },
  { id: 'kmno4', formula: 'KMnO4', name: 'Potassium Permanganate', category: 'Salts & Reagents', phase: 'aq', tone: 'from-sky-300 to-blue-500' },
  { id: 'k2cr2o7', formula: 'K2Cr2O7', name: 'Potassium Dichromate', category: 'Salts & Reagents', phase: 'aq', tone: 'from-orange-300 to-amber-500' },
  { id: 'feso4', formula: 'FeSO4', name: 'Ferrous Sulphate', category: 'Salts & Reagents', phase: 'aq', tone: 'from-emerald-300 to-emerald-500' },
  { id: 'k2hgi4', formula: 'K2HgI4', name: "Nessler's Reagent", category: 'Salts & Reagents', phase: 'aq', tone: 'from-amber-200 to-yellow-400' },
  { id: 'dmg', formula: 'DMG', name: 'Dimethylglyoxime', category: 'Salts & Reagents', phase: 's', tone: 'from-rose-200 to-red-400' },
  { id: 'caco3', formula: 'CaCO3', name: 'Calcium Carbonate', category: 'Salts & Reagents', phase: 's', tone: 'from-slate-100 to-slate-200' },
  { id: 'nahco3', formula: 'NaHCO3', name: 'Sodium Bicarbonate', category: 'Salts & Reagents', phase: 's', tone: 'from-slate-50 to-slate-200' },
  { id: 'nacl', formula: 'NaCl', name: 'Sodium Chloride', category: 'Salts & Reagents', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'cuso4', formula: 'CuSO4', name: 'Copper Sulphate', category: 'Salts & Reagents', phase: 'aq', tone: 'from-sky-300 to-blue-500' },
  { id: 'zn_hg', formula: 'Zn_Hg', name: 'Zinc Amalgam (Clemmensen Reagent)', category: 'Salts & Reagents', phase: 's', tone: 'from-slate-300 to-slate-400' },
  { id: 'nh2nh2', formula: 'NH2NH2', name: 'Hydrazine (Wolff-Kishner Reagent)', category: 'Salts & Reagents', phase: 'l', tone: 'from-sky-100 to-sky-200' },
  { id: 'dry_ether', formula: 'dry_ether', name: 'Dry Ether (Anhydrous Solvent)', category: 'Salts & Reagents', phase: 'l', tone: 'from-sky-50 to-sky-100' },
  { id: 'acetone', formula: 'acetone', name: 'Dry Acetone (Finkelstein Solvent)', category: 'Salts & Reagents', phase: 'l', tone: 'from-sky-100 to-sky-200' },

  // Gases
  { id: 'co2', formula: 'CO2', name: 'Carbon Dioxide', category: 'Gases', phase: 'g', tone: 'from-slate-200 to-slate-400' },
  { id: 'so2', formula: 'SO2', name: 'Sulphur Dioxide', category: 'Gases', phase: 'g', tone: 'from-yellow-200 to-yellow-400' },
  { id: 'o2', formula: 'O2', name: 'Oxygen Gas', category: 'Gases', phase: 'g', tone: 'from-cyan-200 to-cyan-400' },
  { id: 'h2g', formula: 'H2', name: 'Hydrogen Gas', category: 'Gases', phase: 'g', tone: 'from-sky-200 to-blue-400' },
  { id: 'cl2g', formula: 'Cl2', name: 'Chlorine Gas', category: 'Gases', phase: 'g', tone: 'from-green-200 to-green-400' },
  { id: 'n2', formula: 'N2', name: 'Nitrogen Gas', category: 'Gases', phase: 'g', tone: 'from-teal-200 to-sky-300' },
  { id: 'nh3g', formula: 'NH3', name: 'Ammonia Gas', category: 'Gases', phase: 'g', tone: 'from-lime-200 to-lime-300' },

  // 118 Elements (Anime)
  ...ELEMENT_MATERIALS,

  // Action Arrows
  { id: 'arrow_heat', arrow: 'heat', name: 'Heat Arrow', symbol: 'Δ', category: 'Action Arrows' },
  { id: 'arrow_electricity', arrow: 'electricity', name: 'Electricity', symbol: '⚡', category: 'Action Arrows' },
  { id: 'arrow_sunlight', arrow: 'sunlight', name: 'Sunlight', symbol: '☀', category: 'Action Arrows' },
  { id: 'arrow_catalyst', arrow: 'catalyst', name: 'Catalyst', symbol: 'cat.', category: 'Action Arrows' },
  { id: 'arrow_pressure', arrow: 'pressure', name: 'Pressure', symbol: 'P', category: 'Action Arrows' },
  { id: 'arrow_hightemp', arrow: 'high_temp', name: 'High Temp', symbol: 'T', category: 'Action Arrows' },
];

export function materialById(id) {
  return MATERIAL_CHEMICALS.find((m) => m.id === id);
}

export function materialByFormula(formula) {
  if (!formula) return null;
  const f = formula.trim();
  return MATERIAL_CHEMICALS.find((m) => m.formula.toLowerCase() === f.toLowerCase()) || null;
}
