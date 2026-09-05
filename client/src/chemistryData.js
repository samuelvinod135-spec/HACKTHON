// Frontend mirror of the chemical catalog for palette rendering.
// The authoritative reaction database lives on the server (320+ reactions).

export const CATEGORIES = [
  'Metals',
  'Non-Metals',
  'Acids',
  'Bases',
  'Salts',
  'Gases',
  'Action Arrows',
];

export const MATERIAL_CHEMICALS = [
  // Metals
  { id: 'na', formula: 'Na', name: 'Sodium', category: 'Metals', phase: 's', tone: 'from-slate-200 to-slate-400' },
  { id: 'k', formula: 'K', name: 'Potassium', category: 'Metals', phase: 's', tone: 'from-slate-100 to-slate-300' },
  { id: 'ca', formula: 'Ca', name: 'Calcium', category: 'Metals', phase: 's', tone: 'from-slate-300 to-slate-400' },
  { id: 'mg', formula: 'Mg', name: 'Magnesium', category: 'Metals', phase: 's', tone: 'from-slate-100 to-slate-200' },
  { id: 'zn', formula: 'Zn', name: 'Zinc', category: 'Metals', phase: 's', tone: 'from-slate-300 to-slate-500' },
  { id: 'fe', formula: 'Fe', name: 'Iron', category: 'Metals', phase: 's', tone: 'from-slate-400 to-slate-600' },
  { id: 'cu', formula: 'Cu', name: 'Copper', category: 'Metals', phase: 's', tone: 'from-orange-400 to-amber-700' },
  { id: 'al', formula: 'Al', name: 'Aluminium', category: 'Metals', phase: 's', tone: 'from-slate-200 to-slate-400' },
  { id: 'ag', formula: 'Ag', name: 'Silver', category: 'Metals', phase: 's', tone: 'from-slate-100 to-slate-300' },
  { id: 'pb', formula: 'Pb', name: 'Lead', category: 'Metals', phase: 's', tone: 'from-slate-500 to-slate-700' },
  { id: 'ba', formula: 'Ba', name: 'Barium', category: 'Metals', phase: 's', tone: 'from-slate-300 to-slate-400' },

  // Non-Metals
  { id: 'c', formula: 'C', name: 'Carbon', category: 'Non-Metals', phase: 's', tone: 'from-zinc-600 to-zinc-900' },
  { id: 's', formula: 'S', name: 'Sulphur', category: 'Non-Metals', phase: 's', tone: 'from-yellow-300 to-yellow-600' },
  { id: 'p', formula: 'P', name: 'Phosphorus', category: 'Non-Metals', phase: 's', tone: 'from-amber-300 to-red-500' },
  { id: 'h2r', formula: 'H2', name: 'Hydrogen', category: 'Non-Metals', phase: 'g', tone: 'from-sky-300 to-blue-500' },
  { id: 'cl2r', formula: 'Cl2', name: 'Chlorine', category: 'Non-Metals', phase: 'g', tone: 'from-green-300 to-green-500' },

  // Acids
  { id: 'hcl', formula: 'HCl', name: 'Hydrochloric Acid', category: 'Acids', phase: 'aq', tone: 'from-rose-300 to-rose-500' },
  { id: 'h2so4', formula: 'H2SO4', name: 'Sulphuric Acid', category: 'Acids', phase: 'aq', tone: 'from-amber-200 to-amber-400' },
  { id: 'hno3', formula: 'HNO3', name: 'Nitric Acid', category: 'Acids', phase: 'aq', tone: 'from-yellow-100 to-yellow-300' },
  { id: 'ch3cooh', formula: 'CH3COOH', name: 'Acetic Acid', category: 'Acids', phase: 'aq', tone: 'from-orange-200 to-orange-400' },
  { id: 'h3po4', formula: 'H3PO4', name: 'Phosphoric Acid', category: 'Acids', phase: 'aq', tone: 'from-teal-200 to-cyan-400' },

  // Bases
  { id: 'naoh', formula: 'NaOH', name: 'Sodium Hydroxide', category: 'Bases', phase: 'aq', tone: 'from-sky-200 to-sky-400' },
  { id: 'koh', formula: 'KOH', name: 'Potassium Hydroxide', category: 'Bases', phase: 'aq', tone: 'from-sky-100 to-sky-300' },
  { id: 'caoh2', formula: 'Ca(OH)2', name: 'Calcium Hydroxide', category: 'Bases', phase: 'aq', tone: 'from-cyan-100 to-cyan-300' },
  { id: 'nh3b', formula: 'NH3', name: 'Ammonia', category: 'Bases', phase: 'aq', tone: 'from-lime-200 to-lime-400' },
  { id: 'mgoh2', formula: 'Mg(OH)2', name: 'Magnesium Hydroxide', category: 'Bases', phase: 's', tone: 'from-teal-100 to-teal-300' },

  // Salts
  { id: 'nacl', formula: 'NaCl', name: 'Sodium Chloride', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'caco3', formula: 'CaCO3', name: 'Calcium Carbonate', category: 'Salts', phase: 's', tone: 'from-slate-100 to-slate-200' },
  { id: 'bao', formula: 'BaO', name: 'Barium Oxide', category: 'Salts', phase: 's', tone: 'from-slate-200 to-slate-300' },
  { id: 'bao2', formula: 'BaO2', name: 'Barium Peroxide', category: 'Salts', phase: 's', tone: 'from-slate-100 to-slate-200' },
  { id: 'mgo', formula: 'MgO', name: 'Magnesium Oxide', category: 'Salts', phase: 's', tone: 'from-slate-50 to-slate-200' },
  { id: 'zno', formula: 'ZnO', name: 'Zinc Oxide', category: 'Salts', phase: 's', tone: 'from-yellow-100 to-yellow-300' },
  { id: 'cuo', formula: 'CuO', name: 'Copper(II) Oxide', category: 'Salts', phase: 's', tone: 'from-zinc-700 to-zinc-900' },
  { id: 'fe2o3', formula: 'Fe2O3', name: 'Iron Oxide', category: 'Salts', phase: 's', tone: 'from-red-800 to-red-950' },
  { id: 'alg_2', formula: 'Al2O3', name: 'Aluminium Oxide', category: 'Salts', phase: 's', tone: 'from-slate-200 to-slate-300' },
  { id: 'na2o', formula: 'Na2O', name: 'Sodium Oxide', category: 'Salts', phase: 's', tone: 'from-slate-50 to-slate-200' },
  { id: 'agcl', formula: 'AgCl', name: 'Silver Chloride', category: 'Salts', phase: 's', tone: 'from-slate-100 to-slate-300' },
  { id: 'baso4', formula: 'BaSO4', name: 'Barium Sulphate', category: 'Salts', phase: 's', tone: 'from-slate-50 to-slate-200' },
  { id: 'pbno3', formula: 'Pb(NO3)2', name: 'Lead Nitrate', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'cuso4', formula: 'CuSO4', name: 'Copper Sulphate', category: 'Salts', phase: 'aq', tone: 'from-blue-400 to-blue-600' },
  { id: 'znso4', formula: 'ZnSO4', name: 'Zinc Sulphate', category: 'Salts', phase: 'aq', tone: 'from-sky-100 to-sky-300' },
  { id: 'feso4', formula: 'FeSO4', name: 'Iron Sulphate', category: 'Salts', phase: 'aq', tone: 'from-emerald-300 to-emerald-500' },
  { id: 'kclo3', formula: 'KClO3', name: 'Potassium Chlorate', category: 'Salts', phase: 's', tone: 'from-slate-50 to-slate-200' },
  { id: 'cacl2', formula: 'CaCl2', name: 'Calcium Chloride', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'bacl2', formula: 'BaCl2', name: 'Barium Chloride', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'nh4cl', formula: 'NH4Cl', name: 'Ammonium Chloride', category: 'Salts', phase: 'aq', tone: 'from-blue-100 to-blue-300' },
  { id: 'mgcl2', formula: 'MgCl2', name: 'Magnesium Chloride', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'zncl2', formula: 'ZnCl2', name: 'Zinc Chloride', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-300' },
  { id: 'fecl3', formula: 'FeCl3', name: 'Iron(III) Chloride', category: 'Salts', phase: 'aq', tone: 'from-amber-300 to-amber-500' },
  { id: 'h2o', formula: 'H2O', name: 'Water', category: 'Salts', phase: 'l', tone: 'from-sky-300 to-sky-500' },
  { id: 'na2co3', formula: 'Na2CO3', name: 'Sodium Carbonate', category: 'Salts', phase: 'aq', tone: 'from-slate-50 to-slate-200' },
  { id: 'nahco3', formula: 'NaHCO3', name: 'Sodium Bicarbonate', category: 'Salts', phase: 's', tone: 'from-slate-50 to-slate-200' },
  { id: 'kno3', formula: 'KNO3', name: 'Potassium Nitrate', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-200' },
  { id: 'agno3', formula: 'AgNO3', name: 'Silver Nitrate', category: 'Salts', phase: 'aq', tone: 'from-slate-100 to-slate-200' },

  // Gases
  { id: 'co2', formula: 'CO2', name: 'Carbon Dioxide', category: 'Gases', phase: 'g', tone: 'from-slate-200 to-slate-400' },
  { id: 'so2', formula: 'SO2', name: 'Sulphur Dioxide', category: 'Gases', phase: 'g', tone: 'from-yellow-200 to-yellow-400' },
  { id: 'o2', formula: 'O2', name: 'Oxygen Gas', category: 'Gases', phase: 'g', tone: 'from-cyan-200 to-cyan-400' },
  { id: 'h2g', formula: 'H2', name: 'Hydrogen Gas', category: 'Gases', phase: 'g', tone: 'from-sky-200 to-blue-400' },
  { id: 'cl2g', formula: 'Cl2', name: 'Chlorine Gas', category: 'Gases', phase: 'g', tone: 'from-green-200 to-green-400' },
  { id: 'n2', formula: 'N2', name: 'Nitrogen Gas', category: 'Gases', phase: 'g', tone: 'from-teal-200 to-sky-300' },
  { id: 'nh3g', formula: 'NH3', name: 'Ammonia Gas', category: 'Gases', phase: 'g', tone: 'from-lime-200 to-lime-300' },
  { id: 'no2', formula: 'NO2', name: 'Nitrogen Dioxide', category: 'Gases', phase: 'g', tone: 'from-red-300 to-red-500' },
  { id: 'h2s', formula: 'H2S', name: 'Hydrogen Sulphide', category: 'Gases', phase: 'g', tone: 'from-yellow-200 to-yellow-300' },
  { id: 'ch4', formula: 'CH4', name: 'Methane', category: 'Gases', phase: 'g', tone: 'from-blue-200 to-blue-400' },

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
