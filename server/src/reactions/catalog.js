// Chemical catalog: identity of every draggable component.
// formula is used to match reactions. category maps to palette folders.
// phase: s=solid, l=liquid, g=gas, aq=aqueous solution
export const CATEGORIES = [
  'Metals',
  'Non-Metals',
  'Acids',
  'Bases',
  'Salts',
  'Gases',
  'Action Arrows',
];

export const CHEMICALS = [
  // ---- Metals ----
  { id: 'na', formula: 'Na', name: 'Sodium', category: 'Metals', phase: 's', color: '#d4d4d4' },
  { id: 'k', formula: 'K', name: 'Potassium', category: 'Metals', phase: 's', color: '#c0c0c0' },
  { id: 'ca', formula: 'Ca', name: 'Calcium', category: 'Metals', phase: 's', color: '#b0b7c6' },
  { id: 'mg', formula: 'Mg', name: 'Magnesium', category: 'Metals', phase: 's', color: '#cfd6e0' },
  { id: 'zn', formula: 'Zn', name: 'Zinc', category: 'Metals', phase: 's', color: '#9aa7b8' },
  { id: 'fe', formula: 'Fe', name: 'Iron', category: 'Metals', phase: 's', color: '#8c8c8c' },
  { id: 'cu', formula: 'Cu', name: 'Copper', category: 'Metals', phase: 's', color: '#e58f65' },
  { id: 'al', formula: 'Al', name: 'Aluminium', category: 'Metals', phase: 's', color: '#c9d0d8' },
  { id: 'ag', formula: 'Ag', name: 'Silver', category: 'Metals', phase: 's', color: '#d9d9d9' },
  { id: 'pb', formula: 'Pb', name: 'Lead', category: 'Metals', phase: 's', color: '#6b7280' },
  { id: 'ba', formula: 'Ba', name: 'Barium', category: 'Metals', phase: 's', color: '#aabbcc' },

  // ---- Non-Metals ----
  { id: 'c', formula: 'C', name: 'Carbon', category: 'Non-Metals', phase: 's', color: '#3f3f46' },
  { id: 's', formula: 'S', name: 'Sulphur', category: 'Non-Metals', phase: 's', color: '#eab308' },
  { id: 'p', formula: 'P', name: 'Phosphorus', category: 'Non-Metals', phase: 's', color: '#f59e0b' },
  { id: 'h', formula: 'H2', name: 'Hydrogen Gas', category: 'Non-Metals', phase: 'g', color: '#a5b4fc' },
  { id: 'cl', formula: 'Cl2', name: 'Chlorine Gas', category: 'Non-Metals', phase: 'g', color: '#86efac' },

  // ---- Acids ----
  { id: 'hcl', formula: 'HCl', name: 'Hydrochloric Acid', category: 'Acids', phase: 'aq', color: '#fda4a4' },
  { id: 'h2so4', formula: 'H2SO4', name: 'Sulphuric Acid', category: 'Acids', phase: 'aq', color: '#fcd34d' },
  { id: 'hno3', formula: 'HNO3', name: 'Nitric Acid', category: 'Acids', phase: 'aq', color: '#fef3c7' },
  { id: 'ch3cooh', formula: 'CH3COOH', name: 'Acetic Acid', category: 'Acids', phase: 'aq', color: '#fed7aa' },
  { id: 'h3po4', formula: 'H3PO4', name: 'Phosphoric Acid', category: 'Acids', phase: 'aq', color: '#e9d5ff' },

  // ---- Bases / Alkalis ----
  { id: 'naoh', formula: 'NaOH', name: 'Sodium Hydroxide', category: 'Bases', phase: 'aq', color: '#bae6fd' },
  { id: 'koh', formula: 'KOH', name: 'Potassium Hydroxide', category: 'Bases', phase: 'aq', color: '#e0f2fe' },
  { id: 'caoh2', formula: 'Ca(OH)2', name: 'Calcium Hydroxide', category: 'Bases', phase: 'aq', color: '#cffafe' },
  { id: 'nh3', formula: 'NH3', name: 'Ammonia', category: 'Bases', phase: 'aq', color: '#d9f99d' },
  { id: 'mgoh2', formula: 'Mg(OH)2', name: 'Magnesium Hydroxide', category: 'Bases', phase: 's', color: '#ccfbf1' },
  { id: 'aloh3', formula: 'Al(OH)3', name: 'Aluminium Hydroxide', category: 'Bases', phase: 's', color: '#dbeafe' },

  // ---- Salts / Compounds ----
  { id: 'nacl', formula: 'NaCl', name: 'Sodium Chloride', category: 'Salts', phase: 'aq', color: '#e2e8f0' },
  { id: 'caco3', formula: 'CaCO3', name: 'Calcium Carbonate', category: 'Salts', phase: 's', color: '#f1f5f9' },
  { id: 'bao', formula: 'BaO', name: 'Barium Oxide', category: 'Salts', phase: 's', color: '#e4e4e7' },
  { id: 'bao2', formula: 'BaO2', name: 'Barium Peroxide', category: 'Salts', phase: 's', color: '#f4f4f5' },
  { id: 'mgo', formula: 'MgO', name: 'Magnesium Oxide', category: 'Salts', phase: 's', color: '#fafafa' },
  { id: 'zno', formula: 'ZnO', name: 'Zinc Oxide', category: 'Salts', phase: 's', color: '#fde68a' },
  { id: 'cuo', formula: 'CuO', name: 'Copper(II) Oxide', category: 'Salts', phase: 's', color: '#292524' },
  { id: 'feo', formula: 'FeO', formulaAlt: 'Fe2O3', name: 'Iron Oxide', category: 'Salts', phase: 's', color: '#7f1d1d' },
  { id: 'fe2o3', formula: 'Fe2O3', name: 'Iron(III) Oxide', category: 'Salts', phase: 's', color: '#7f1d1d' },
  { id: 'fe3o4', formula: 'Fe3O4', name: 'Magnetite', category: 'Salts', phase: 's', color: '#27272a' },
  { id: 'al2o3', formula: 'Al2O3', name: 'Aluminium Oxide', category: 'Salts', phase: 's', color: '#e5e7eb' },
  { id: 'na2o', formula: 'Na2O', name: 'Sodium Oxide', category: 'Salts', phase: 's', color: '#f8fafc' },
  { id: 'agcl', formula: 'AgCl', name: 'Silver Chloride', category: 'Salts', phase: 's', color: '#e5e7eb' },
  { id: 'baso4', formula: 'BaSO4', name: 'Barium Sulphate', category: 'Salts', phase: 's', color: '#f8fafc' },
  { id: 'pbno3', formula: 'Pb(NO3)2', name: 'Lead Nitrate', category: 'Salts', phase: 'aq', color: '#e2e8f0' },
  { id: 'pbso4', formula: 'PbSO4', name: 'Lead Sulphate', category: 'Salts', phase: 's', color: '#e2e8f0' },
  { id: 'kno3', formula: 'KNO3', name: 'Potassium Nitrate', category: 'Salts', phase: 'aq', color: '#f5f5f4' },
  { id: 'agno3', formula: 'AgNO3', name: 'Silver Nitrate', category: 'Salts', phase: 'aq', color: '#e5e7eb' },
  { id: 'cuso4', formula: 'CuSO4', name: 'Copper Sulphate', category: 'Salts', phase: 'aq', color: '#60a5fa' },
  { id: 'znso4', formula: 'ZnSO4', name: 'Zinc Sulphate', category: 'Salts', phase: 'aq', color: '#e0f2fe' },
  { id: 'feso4', formula: 'FeSO4', name: 'Iron Sulphate', category: 'Salts', phase: 'aq', color: '#a7f3d0' },
  { id: 'nh4cl', formula: 'NH4Cl', name: 'Ammonium Chloride', category: 'Salts', phase: 'aq', color: '#dbeafe' },
  { id: 'bacl2', formula: 'BaCl2', name: 'Barium Chloride', category: 'Salts', phase: 'aq', color: '#e2e8f0' },
  { id: 'cacl2', formula: 'CaCl2', name: 'Calcium Chloride', category: 'Salts', phase: 'aq', color: '#e2e8f0' },
  { id: 'kcl', formula: 'KCl', name: 'Potassium Chloride', category: 'Salts', phase: 'aq', color: '#e2e8f0' },
  { id: 'kclo3', formula: 'KClO3', name: 'Potassium Chlorate', category: 'Salts', phase: 's', color: '#f5f5f4' },
  { id: 'mgcl2', formula: 'MgCl2', name: 'Magnesium Chloride', category: 'Salts', phase: 'aq', color: '#eef2f7' },
  { id: 'zncl2', formula: 'ZnCl2', name: 'Zinc Chloride', category: 'Salts', phase: 'aq', color: '#eef2f7' },
  { id: 'fecl3', formula: 'FeCl3', name: 'Iron(III) Chloride', category: 'Salts', phase: 'aq', color: '#fde68a' },
  { id: 'h2o', formula: 'H2O', name: 'Water', category: 'Salts', phase: 'l', color: '#bae6fd' },
  { id: 'co2', formula: 'CO2', name: 'Carbon Dioxide', category: 'Gases', phase: 'g', color: '#d1d5db' },
  { id: 'so2', formula: 'SO2', name: 'Sulphur Dioxide', category: 'Gases', phase: 'g', color: '#fef08a' },
  { id: 'so3', formula: 'SO3', name: 'Sulphur Trioxide', category: 'Gases', phase: 'g', color: '#fde047' },
  { id: 'no', formula: 'NO', name: 'Nitric Oxide', category: 'Gases', phase: 'g', color: '#cbd5e1' },
  { id: 'no2', formula: 'NO2', name: 'Nitrogen Dioxide', category: 'Gases', phase: 'g', color: '#fca5a5' },
  { id: 'n2', formula: 'N2', name: 'Nitrogen Gas', category: 'Gases', phase: 'g', color: '#c7d2fe' },
  { id: 'o2', formula: 'O2', name: 'Oxygen Gas', category: 'Gases', phase: 'g', color: '#a5f3fc' },
  { id: 'nh3g', formula: 'NH3', name: 'Ammonia Gas', category: 'Gases', phase: 'g', color: '#d9f99d' },
  { id: 'h2g', formula: 'H2', name: 'Hydrogen Gas', category: 'Gases', phase: 'g', color: '#a5b4fc' },
  { id: 'cl2g', formula: 'Cl2', name: 'Chlorine Gas', category: 'Gases', phase: 'g', color: '#86efac' },
  { id: 'h2s', formula: 'H2S', name: 'Hydrogen Sulphide', category: 'Gases', phase: 'g', color: '#fef08a' },
  { id: 'p2o5', formula: 'P2O5', name: 'Phosphorus Pentoxide', category: 'Salts', phase: 's', color: '#fef3c7' },
  { id: 'na2co3', formula: 'Na2CO3', name: 'Sodium Carbonate', category: 'Salts', phase: 'aq', color: '#f8fafc' },
  { id: 'nahco3', formula: 'NaHCO3', name: 'Sodium Bicarbonate', category: 'Salts', phase: 's', color: '#f8fafc' },
  { id: 'ch4', formula: 'CH4', name: 'Methane', category: 'Gases', phase: 'g', color: '#bfdbfe' },
  { id: 'c2h5oh', formula: 'C2H5OH', name: 'Ethanol', category: 'Salts', phase: 'l', color: '#f3f4f6' },
  { id: 'c2h4', formula: 'C2H4', name: 'Ethene', category: 'Gases', phase: 'g', color: '#dbeafe' },
];

// ---- Action Arrow conditions ----
export const CONDITIONS = [
  { id: 'heat', name: 'Heat (Δ)', symbol: 'Δ' },
  { id: 'electricity', name: 'Electricity', symbol: '⚡' },
  { id: 'sunlight', name: 'Sunlight', symbol: '☀' },
  { id: 'catalyst', name: 'Catalyst', symbol: 'cat.' },
  { id: 'pressure', name: 'Pressure', symbol: 'P' },
  { id: 'high_temp', name: 'High Temp', symbol: 'T' },
];

// ---- Observation keys -> visual effect ----
export const OBSERVATIONS = {
  white_light: 'dazzling white light',
  bubbling: 'effervescence / gas bubbling',
  color_clear_pink: 'solution turns pink',
  color_clear_blue: 'solution turns blue',
  precipitate: 'form a white precipitate',
  precipitate_yellow: 'form a yellow precipitate',
  precipitate_blue: 'form a blue precipitate',
  green_rust: 'greenish rust formed',
  brown_gas: 'brown gas released',
  squeaky_pop: 'popping sound (hydrogen)',
  turns_limewater: 'limewater turns milky',
  blue_to_white: 'blue crystals turn white',
  heat_light: 'releases heat & light',
  black_solid: 'black solid formed',
  colorless_gas: 'colourless gas released',
  white_fumes: 'white fumes formed',
  color_clear: 'colourless solution (decolourises permanganate)',
  color_clear_orange: 'orange dichromate turns green',
  fruity_smell: 'fruity smell of ester produced',
  solid_formed: 'solid polymer formed',
  greenish_gas: 'pale green chlorine gas released',
  pungent_gas: 'pungent smelling gas detected',
  rotten_egg: 'rotten egg smell (H2S) detected',
  blood_red: 'blood-red colour formed',
};

export function chemicalById(id) {
  return CHEMICALS.find((c) => c.id === id);
}

export function formulaSet(chemicals) {
  return new Set(chemicals.map((c) => c.formula).filter(Boolean));
}

// Normalize a formula for robust matching: strip brackets/hydration separators
export function norm(f) {
  if (!f) return '';
  return String(f)
    .toUpperCase()
    .replace(/[()·.\s]/g, '');
}
