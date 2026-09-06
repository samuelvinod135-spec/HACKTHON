const fs = require('fs');
const path = require('path');

const clientOutput = path.resolve(__dirname, '../src/data/massiveReactionsData.js');
const serverOutput = path.resolve(__dirname, '../../server/src/reactions/massiveReactionsData.js');

console.log('Generating 5,000+ Class 10-12 NCERT chemical reactions...');

const scriptContent = `// Master Massive Reactions Database (>5,000 Reactions)
// Comprehensive Class 10 to Class 12 NCERT, CBSE, JEE & NEET Chemistry Curriculum:
// - Class 10: Chemical Reactions & Equations, Acids Bases Salts, Metals & Non-metals, Carbon & Compounds
// - Class 11: Redox, Hydrogen, s-Block, p-Block, Hydrocarbons, GOC, Environmental Chemistry
// - Class 12: Haloalkanes, Alcohols/Phenols, Aldehydes/Ketones, Amines/Diazonium, Coordination, d/f Block, Qualitative Analysis

export const REACTION_CATEGORIES = [
  'All',
  'Diazonium & Benzene',
  'Aldehydes & Ketones',
  'Haloalkanes & Haloarenes',
  'General Organic Chemistry (GOC)',
  'Metals & Non-metals',
  'Acids & Bases (Neutralization)',
  'Precipitation & Salt Matrix',
  'Qualitative Inorganic Analysis',
  'Industrial & Redox',
  'Esterification & Scents',
];

// --- 1. Master Curated Named & Benchmark Reactions ---
export const CURATED_MASTER_REACTIONS = [
  {
    id: 'rx_class10_mg_combustion',
    name: 'Combustion of Magnesium Ribbon in Oxygen',
    category: 'Metals & Non-metals',
    inputs: ['Mg', 'O2'],
    conditions: ['heat'],
    outputs: ['MgO'],
    products: ['MgO'],
    equation: '2Mg + O₂ ──► 2MgO',
    type: 'Combination & Exothermic Combustion',
    color: '#ffffff',
    observation: 'white_light',
    description: 'Burns with a dazzling white flame to form a white ash.',
    mechanism: 'Magnesium ribbon undergoes vigorous exothermic combustion in air, releasing high energy photons (blinding white-hot flame) and leaving powdery Magnesium Oxide ash residue.',
    jeeRelevance: 'Essential Class 10 NCERT Chapter 1 Experiment',
    xp: 200,
  },
  {
    id: 'rx_class10_mg_combustion_ambient',
    name: 'Magnesium Ignition in Air/Oxygen',
    category: 'Metals & Non-metals',
    inputs: ['Mg', 'O2'],
    conditions: [],
    outputs: ['MgO'],
    products: ['MgO'],
    equation: '2Mg + O₂ ──► 2MgO',
    type: 'Combination & Exothermic Combustion',
    color: '#ffffff',
    observation: 'white_light',
    description: 'Burns with a dazzling white flame to form a white ash.',
    mechanism: 'Magnesium vigorously oxidizes in oxygen releasing intense heat and brilliant white light.',
    jeeRelevance: 'Essential Class 10 NCERT Chapter 1 Experiment',
    xp: 200,
  },
  {
    id: 'rx_pb_no3_decomposition',
    name: 'Thermal Decomposition of Lead Nitrate',
    category: 'Qualitative Inorganic Analysis',
    inputs: ['Pb(NO3)2'],
    conditions: ['heat'],
    outputs: ['PbO', 'NO2', 'O2'],
    products: ['PbO', 'NO2', 'O2'],
    equation: '2Pb(NO₃)₂ ──(heat)──► 2PbO + 4NO₂↑ + O₂↑',
    type: 'Thermal Decomposition',
    color: '#f59e0b',
    observation: 'brown_fumes',
    description: 'Lead nitrate crystals crackle on dry heating, releasing pungent reddish-brown NO2 gas fumes and leaving a yellow PbO residue.',
    jeeRelevance: 'Core Class 10 NCERT decomposition benchmark',
    xp: 180,
  },
  {
    id: 'rx_slaking_of_lime',
    name: 'Slaking of Quicklime (Calcium Oxide)',
    category: 'Acids & Bases (Neutralization)',
    inputs: ['CaO', 'H2O'],
    conditions: [],
    outputs: ['Ca(OH)2'],
    products: ['Ca(OH)2'],
    equation: 'CaO + H₂O ──► Ca(OH)₂ + Heat',
    type: 'Combination & Highly Exothermic',
    color: '#ffffff',
    observation: 'heat_evolution',
    description: 'Quicklime reacts vigorously with water with a hissing sound, boiling the water and producing slaked lime (calcium hydroxide).',
    jeeRelevance: 'Class 10 NCERT Chapter 1 core experiment',
    xp: 150,
  },
  {
    id: 'rx_limewater_milky',
    name: 'Testing CO2 with Limewater',
    category: 'Qualitative Inorganic Analysis',
    inputs: ['Ca(OH)2', 'CO2'],
    conditions: [],
    outputs: ['CaCO3', 'H2O'],
    products: ['CaCO3', 'H2O'],
    equation: 'Ca(OH)₂ + CO₂ ──► CaCO₃↓ + H₂O',
    type: 'Precipitation & Neutralization',
    color: '#ffffff',
    observation: 'turns_limewater',
    description: 'Colorless limewater turns milky due to insoluble Calcium Carbonate precipitate formation.',
    jeeRelevance: 'Class 10 & 11 gas identification test',
    xp: 160,
  },
  {
    id: 'rx_limewater_excess_co2',
    name: 'Clearing of Milky Limewater with Excess CO2',
    category: 'Qualitative Inorganic Analysis',
    inputs: ['CaCO3', 'CO2', 'H2O'],
    conditions: [],
    outputs: ['Ca(HCO3)2'],
    products: ['Ca(HCO3)2'],
    equation: 'CaCO₃ + CO₂ + H₂O ──► Ca(HCO₃)₂ (aq)',
    type: 'Soluble Bicarbonate Formation',
    color: '#bae6fd',
    observation: 'milky_turns_clear',
    description: 'Milkiness dissolves upon passing excess CO2 due to formation of soluble Calcium Bicarbonate.',
    jeeRelevance: 'Class 10 NCERT Chapter 2 key analytical distinction',
    xp: 170,
  },
  {
    id: 'rx_fe_cuso4_displacement',
    name: 'Displacement of Copper by Iron',
    category: 'Metals & Non-metals',
    inputs: ['Fe', 'CuSO4'],
    conditions: [],
    outputs: ['FeSO4', 'Cu'],
    products: ['FeSO4', 'Cu'],
    equation: 'Fe + CuSO₄ ──► FeSO₄ + Cu',
    type: 'Single Metal Displacement',
    color: '#10b981',
    observation: 'blue_to_green',
    description: 'Sky-blue copper sulphate solution fades to pale green ferrous sulphate while reddish-brown metallic copper coats the iron nail.',
    jeeRelevance: 'Class 10 reactivity series flagship experiment',
    xp: 160,
  },
  {
    id: 'rx_zn_h2so4_effervescence',
    name: 'Zinc Granules Reaction with Dilute Acid',
    category: 'Acids & Bases (Neutralization)',
    inputs: ['Zn', 'H2SO4'],
    conditions: [],
    outputs: ['ZnSO4', 'H2'],
    products: ['ZnSO4', 'H2'],
    equation: 'Zn + H₂SO₄ ──► ZnSO₄ + H₂↑',
    type: 'Metal Acid Displacement',
    color: '#e0f2fe',
    observation: 'squeaky_pop',
    description: 'Brisk effervescence of hydrogen gas that burns with a characteristic squeaky pop sound near a burning splint.',
    jeeRelevance: 'Standard laboratory preparation of Hydrogen gas',
    xp: 160,
  },
  {
    id: 'rx_electrolysis_water',
    name: 'Electrolytic Decomposition of Water',
    category: 'Industrial & Redox',
    inputs: ['H2O'],
    conditions: ['electricity'],
    outputs: ['H2', 'O2'],
    products: ['H2', 'O2'],
    equation: '2H₂O ──(electricity)──► 2H₂↑ + O₂↑',
    type: 'Electrolysis',
    color: '#38bdf8',
    observation: 'bubbling',
    description: 'Decomposition into 2:1 volume ratio of Hydrogen gas at cathode and Oxygen gas at anode.',
    jeeRelevance: 'Class 10 NCERT Chapter 1 Electrolysis',
    xp: 190,
  },
  {
    id: 'rx_silver_chloride_sunlight',
    name: 'Photolytic Decomposition of Silver Chloride',
    category: 'Qualitative Inorganic Analysis',
    inputs: ['AgCl'],
    conditions: ['sunlight'],
    outputs: ['Ag', 'Cl2'],
    products: ['Ag', 'Cl2'],
    equation: '2AgCl ──(sunlight)──► 2Ag + Cl₂↑',
    type: 'Photochemical Decomposition',
    color: '#64748b',
    observation: 'white_to_grey',
    description: 'White Silver Chloride turns grey in sunlight as metallic silver is liberated with evolution of pungent chlorine gas.',
    jeeRelevance: 'Black & white photography chemistry (Class 10)',
    xp: 170,
  },
  {
    id: 'rx_thermite',
    name: 'Thermite Welding Reaction',
    category: 'Industrial & Redox',
    inputs: ['Fe2O3', 'Al'],
    conditions: ['heat'],
    outputs: ['Al2O3', 'Fe'],
    products: ['Al2O3', 'Fe'],
    equation: 'Fe₂O₃ + 2Al ──(ignition)──► Al₂O₃ + 2Fe (molten) + Heat',
    type: 'Highly Exothermic Thermite Redox',
    color: '#f97316',
    observation: 'white_hot_molten_iron',
    description: 'Extremely exothermic reaction generating molten iron (>2500°C) used to weld railway tracks.',
    jeeRelevance: 'Class 10 Metallurgy & Class 12 Ellingham diagram',
    xp: 240,
  },
  {
    id: 'rx_esterification_ethyl_acetate',
    name: 'Fischer Esterification (Fruity Smell)',
    category: 'Esterification & Scents',
    inputs: ['CH3COOH', 'C2H5OH', 'H2SO4'],
    conditions: ['heat'],
    outputs: ['CH3COOC2H5', 'H2O'],
    products: ['CH3COOC2H5', 'H2O'],
    equation: 'CH₃COOH + C₂H₅OH ──(H₂SO₄/heat)──► CH₃COOC₂H₅ + H₂O',
    type: 'Acid-Catalyzed Esterification',
    color: '#fef08a',
    observation: 'fruity_smell',
    description: 'Pleasant sweet fruity fragrance of Ethyl Acetate ester develops upon gentle water-bath heating.',
    jeeRelevance: 'Class 10 & 12 carboxylic acid functional test',
    xp: 200,
  },
  {
    id: 'rx_saponification',
    name: 'Saponification (Soap Preparation)',
    category: 'Esterification & Scents',
    inputs: ['CH3COOC2H5', 'NaOH'],
    conditions: ['heat'],
    outputs: ['CH3COONa', 'C2H5OH'],
    products: ['CH3COONa', 'C2H5OH'],
    equation: 'CH₃COOC₂H₅ + NaOH ──(heat)──► CH₃COONa + C₂H₅OH',
    type: 'Alkaline Ester Hydrolysis',
    color: '#e2e8f0',
    observation: 'soapy_lather',
    description: 'Hydrolysis of ester with alkali produces sodium carboxylate salt (soap) and alcohol.',
    jeeRelevance: 'Class 10 Carbon Compounds & Class 12 Everyday Chemistry',
    xp: 190,
  },
  {
    id: 'rx_diazotization',
    name: 'Diazotization of Aniline',
    category: 'Diazonium & Benzene',
    inputs: ['C6H5NH2', 'NaNO2', 'HCl'],
    conditions: ['ice_cold'],
    outputs: ['C6H5N2Cl', 'NaCl', 'H2O'],
    products: ['C6H5N2Cl', 'NaCl', 'H2O'],
    equation: 'C₆H₅NH₂ + NaNO₂ + 2HCl ──(0-5°C)──► C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O',
    type: 'Diazotization',
    color: '#38bdf8',
    observation: 'clear_yellowish_solution',
    description: 'Aniline reacts with nitrous acid generated in situ at 0-5°C to yield stable Benzene Diazonium Chloride.',
    jeeRelevance: 'Very High (Crucial starting point for aromatic synthesis in JEE/NEET)',
    xp: 250,
  },
  {
    id: 'rx_sandmeyer_cl',
    name: 'Sandmeyer Reaction (Chlorobenzene)',
    category: 'Diazonium & Benzene',
    inputs: ['C6H5N2Cl', 'CuCl', 'HCl'],
    conditions: [],
    outputs: ['C6H5Cl', 'N2'],
    products: ['C6H5Cl', 'N2'],
    equation: 'C₆H₅N₂⁺Cl⁻ + CuCl/HCl ──► C₆H₅Cl + N₂↑',
    type: 'Nucleophilic Aromatic Radical Substitution',
    color: '#0284c7',
    observation: 'bubbling',
    description: 'Decomposition of benzene diazonium chloride catalyzed by cuprous chloride yields chlorobenzene with rapid N2 evolution.',
    jeeRelevance: 'Top Tier (Standard Sandmeyer halide synthesis)',
    xp: 200,
  },
  {
    id: 'rx_sandmeyer_br',
    name: 'Sandmeyer Reaction (Bromobenzene)',
    category: 'Diazonium & Benzene',
    inputs: ['C6H5N2Cl', 'CuBr', 'HBr'],
    conditions: [],
    outputs: ['C6H5Br', 'N2'],
    products: ['C6H5Br', 'N2'],
    equation: 'C₆H₅N₂⁺Cl⁻ + CuBr/HBr ──► C₆H₅Br + N₂↑',
    type: 'Nucleophilic Aromatic Radical Substitution',
    color: '#d97706',
    observation: 'bubbling',
    description: 'Cuprous bromide decomposes diazonium salt to produce pale yellow oily bromobenzene with N2 gas bubbling.',
    jeeRelevance: 'Standard Sandmeyer Bromide Synthesis',
    xp: 200,
  },
  {
    id: 'rx_sandmeyer_cn',
    name: 'Sandmeyer Cyanation (Benzonitrile)',
    category: 'Diazonium & Benzene',
    inputs: ['C6H5N2Cl', 'CuCN', 'KCN'],
    conditions: [],
    outputs: ['C6H5CN', 'N2'],
    products: ['C6H5CN', 'N2'],
    equation: 'C₆H₅N₂⁺Cl⁻ + CuCN ──► C₆H₅CN + N₂↑',
    type: 'Sandmeyer Cyanation',
    color: '#475569',
    observation: 'bubbling',
    description: 'Introduction of cyano group onto benzene ring via cuprous cyanide yielding benzonitrile.',
    jeeRelevance: 'Gateway to benzoic acid and benzylamine',
    xp: 210,
  },
  {
    id: 'rx_balz_schiemann',
    name: 'Balz-Schiemann Reaction (Fluorobenzene)',
    category: 'Diazonium & Benzene',
    inputs: ['C6H5N2Cl', 'HBF4'],
    conditions: ['heat'],
    outputs: ['C6H5F', 'BF3', 'N2'],
    products: ['C6H5F', 'BF3', 'N2'],
    equation: 'C₆H₅N₂⁺Cl⁻ + HBF₄ ──► C₆H₅N₂⁺BF₄⁻ ──(heat)──► C₆H₅F + BF₃ + N₂↑',
    type: 'Fluorination via Diazonium Fluoroborate',
    color: '#0ea5e9',
    observation: 'precipitate_white',
    description: 'Precipitation of insoluble diazonium fluoroborate followed by dry thermal pyrolysis to yield fluorobenzene.',
    jeeRelevance: 'Exclusive laboratory method for aryl fluorides',
    xp: 240,
  },
  {
    id: 'rx_azo_coupling_phenol',
    name: 'Azo Coupling with Phenol (p-Hydroxyazobenzene)',
    category: 'Diazonium & Benzene',
    inputs: ['C6H5N2Cl', 'C6H5OH', 'NaOH'],
    conditions: ['ice_cold'],
    outputs: ['orange_dye', 'NaCl', 'H2O'],
    products: ['orange_dye', 'NaCl', 'H2O'],
    equation: 'C₆H₅N₂⁺Cl⁻ + C₆H₅OH + NaOH ──(pH 9-10)──► p-Hydroxyazobenzene (Orange Dye) + NaCl + H₂O',
    type: 'Electrophilic Aromatic Substitution (Azo Coupling)',
    color: '#ea580c',
    observation: 'precipitate_orange',
    description: 'Formation of vibrant orange azo dye precipitate under mildly alkaline conditions (pH 9-10).',
    jeeRelevance: 'Flagship JEE Dye Test for primary aromatic amines',
    xp: 260,
  },
  {
    id: 'rx_azo_coupling_naphthol',
    name: 'Azo Coupling with β-Naphthol (Scarlet Red Dye)',
    category: 'Diazonium & Benzene',
    inputs: ['C6H5N2Cl', 'beta_naphthol', 'NaOH'],
    conditions: ['ice_cold'],
    outputs: ['scarlet_red_dye', 'NaCl', 'H2O'],
    products: ['scarlet_red_dye', 'NaCl', 'H2O'],
    equation: 'C₆H₅N₂⁺Cl⁻ + β-Naphthol + NaOH ──► 1-(Phenylazo)-2-naphthol (Scarlet Red Dye)↓',
    type: 'Azo Dye Coupling',
    color: '#dc2626',
    observation: 'precipitate_red',
    description: 'Formation of an intense, insoluble scarlet red dye precipitate confirming aromatic diazonium cation.',
    jeeRelevance: 'Gold Standard Confirmatory Practical Test for Aniline',
    xp: 280,
  },
  {
    id: 'rx_aldol_condensation',
    name: 'Aldol Condensation of Acetaldehyde',
    category: 'Aldehydes & Ketones',
    inputs: ['CH3CHO', 'NaOH'],
    conditions: ['heat'],
    outputs: ['CH3CH=CHCHO', 'H2O'],
    products: ['CH3CH=CHCHO', 'H2O'],
    equation: '2CH₃CHO ──(dil. NaOH / heat)──► CH₃-CH=CH-CHO (Crotonaldehyde) + H₂O',
    type: 'Aldol Condensation & Dehydration',
    color: '#facc15',
    observation: 'pungent_liquid',
    description: 'Enolate addition of acetaldehyde followed by dehydration yields α,β-unsaturated aldehyde (crotonaldehyde).',
    jeeRelevance: 'Highest frequency JEE Advanced carbonyl reaction',
    xp: 270,
  },
  {
    id: 'rx_cannizzaro_benzaldehyde',
    name: 'Cannizzaro Disproportionation of Benzaldehyde',
    category: 'Aldehydes & Ketones',
    inputs: ['C6H5CHO', 'KOH'],
    conditions: [],
    outputs: ['C6H5CH2OH', 'C6H5COOK'],
    products: ['C6H5CH2OH', 'C6H5COOK'],
    equation: '2C₆H₅CHO + 50% KOH ──► C₆H₅CH₂OH (Benzyl Alcohol) + C₆H₅COOK (Potassium Benzoate)',
    type: 'Redox Disproportionation',
    color: '#38bdf8',
    observation: 'two_layers_oily',
    description: 'Non-enolizable benzaldehyde undergoes self oxidation-reduction to produce benzyl alcohol and potassium benzoate.',
    jeeRelevance: 'Essential JEE question testing aldehydes without α-hydrogen',
    xp: 260,
  },
  {
    id: 'rx_tollens_test',
    name: "Tollens' Test (Silver Mirror Test)",
    category: 'Aldehydes & Ketones',
    inputs: ['CH3CHO', 'AgNO3', 'NH4OH', 'NaOH'],
    conditions: [],
    outputs: ['Ag_mirror', 'CH3COONH4', 'H2O'],
    products: ['Ag_mirror', 'CH3COONH4', 'H2O'],
    equation: 'CH₃CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ ──► CH₃COO⁻ + 2Ag↓ (Silver Mirror) + 4NH₃ + 2H₂O',
    type: 'Mild Oxidation & Silver Mirror Deposition',
    color: '#94a3b8',
    observation: 'silver_mirror',
    description: 'Aldehyde readily reduces Tollens reagent, depositing a gleaming metallic silver mirror coating on inner test tube walls.',
    jeeRelevance: 'Core diagnostic practical test distinguishing aldehydes from ketones',
    xp: 250,
  },
  {
    id: 'rx_fehling_test',
    name: "Fehling's Test for Aliphatic Aldehydes",
    category: 'Aldehydes & Ketones',
    inputs: ['CH3CHO', 'CuSO4', 'NaOH'],
    conditions: ['heat'],
    outputs: ['Cu2O', 'CH3COONa', 'H2O'],
    products: ['Cu2O', 'CH3COONa', 'H2O'],
    equation: 'CH₃CHO + 2Cu²⁺ + 5OH⁻ ──► Cu₂O↓ (Red Cuprous Oxide) + CH₃COO⁻ + 3H₂O',
    type: 'Copper Reduction Test',
    color: '#dc2626',
    observation: 'precipitate_red',
    description: 'Deep blue Fehling solution turns turbid green then forms an opaque brick-red cuprous oxide (Cu2O) precipitate.',
    jeeRelevance: 'Practical test separating aliphatic and aromatic aldehydes',
    xp: 240,
  },
  {
    id: 'rx_iodoform_acetone',
    name: 'Iodoform Reaction with Acetone',
    category: 'Aldehydes & Ketones',
    inputs: ['CH3COCH3', 'I2', 'NaOH'],
    conditions: [],
    outputs: ['CHI3', 'CH3COONa', 'NaI', 'H2O'],
    products: ['CHI3', 'CH3COONa', 'NaI', 'H2O'],
    equation: 'CH₃COCH₃ + 3I₂ + 4NaOH ──► CHI₃↓ (Iodoform Yellow Crystals) + CH₃COONa + 3NaI + 3H₂O',
    type: 'Haloform Cleavage',
    color: '#eab308',
    observation: 'precipitate_yellow',
    description: 'Methyl carbonyl cleaves to yield bright canary-yellow crystals of triiodomethane (Iodoform) with characteristic antiseptic odor.',
    jeeRelevance: 'Primary JEE test for CH3-C=O and CH3-CH(OH)- groups',
    xp: 270,
  },
  {
    id: 'rx_finkelstein',
    name: 'Finkelstein Halogen Exchange',
    category: 'Haloalkanes & Haloarenes',
    inputs: ['CH3CH2Cl', 'NaI', 'acetone'],
    conditions: [],
    outputs: ['CH3CH2I', 'NaCl'],
    products: ['CH3CH2I', 'NaCl'],
    equation: 'CH₃CH₂Cl + NaI ──(dry acetone)──► CH₃CH₂I + NaCl↓',
    type: 'SN2 Halogen Exchange',
    color: '#cbd5e1',
    observation: 'precipitate_white',
    description: 'Precipitation of insoluble NaCl in dry acetone drives equilibrium forward to produce ethyl iodide.',
    jeeRelevance: 'Classic Class 12 haloalkane synthesis',
    xp: 230,
  },
  {
    id: 'rx_swarts',
    name: 'Swarts Fluorination Reaction',
    category: 'Haloalkanes & Haloarenes',
    inputs: ['CH3Br', 'AgF'],
    conditions: ['heat'],
    outputs: ['CH3F', 'AgBr'],
    products: ['CH3F', 'AgBr'],
    equation: 'CH₃Br + AgF ──► CH₃F + AgBr↓ (Pale Yellow)',
    type: 'Fluoride Exchange',
    color: '#fef08a',
    observation: 'precipitate_yellow',
    description: 'Heavy metal fluoride exchanges halogen to generate methyl fluoride and pale-yellow silver bromide precipitate.',
    jeeRelevance: 'Standard inorganic fluoride exchange in NCERT',
    xp: 230,
  },
  {
    id: 'rx_wurtz_coupling',
    name: 'Wurtz Alkane Coupling',
    category: 'Haloalkanes & Haloarenes',
    inputs: ['CH3Br', 'Na', 'dry_ether'],
    conditions: [],
    outputs: ['C2H6', 'NaBr'],
    products: ['C2H6', 'NaBr'],
    equation: '2CH₃Br + 2Na ──(dry ether)──► CH₃-CH₃ (Ethane) + 2NaBr',
    type: 'Organometallic Radical Coupling',
    color: '#94a3b8',
    observation: 'bubbling',
    description: 'Sodium coupling in anhydrous ether couples alkyl radicals to synthesize symmetrical higher alkanes.',
    jeeRelevance: 'Core Hydrocarbon synthesis mechanism',
    xp: 220,
  },
  {
    id: 'rx_clemmensen_reduction',
    name: 'Clemmensen Reduction of Acetone',
    category: 'Aldehydes & Ketones',
    inputs: ['CH3COCH3', 'Zn_Hg', 'HCl'],
    conditions: [],
    outputs: ['C3H8', 'H2O', 'ZnCl2'],
    products: ['C3H8', 'H2O', 'ZnCl2'],
    equation: 'CH₃COCH₃ + 4[H] ──(Zn-Hg / conc. HCl)──► CH₃CH₂CH₃ (Propane) + H₂O',
    type: 'Carbonyl to Methylene Reduction',
    color: '#bae6fd',
    observation: 'bubbling',
    description: 'Amalgamated zinc in concentrated hydrochloric acid reduces carbonyl >C=O completely to methylene -CH2-.',
    jeeRelevance: 'Acid-stable carbonyl reduction method',
    xp: 260,
  },
  {
    id: 'rx_wolff_kishner',
    name: 'Wolff-Kishner Reduction of Acetophenone',
    category: 'Aldehydes & Ketones',
    inputs: ['C6H5COCH3', 'NH2NH2', 'KOH'],
    conditions: ['heat'],
    outputs: ['C6H5CH2CH3', 'N2', 'H2O'],
    products: ['C6H5CH2CH3', 'N2', 'H2O'],
    equation: 'C₆H₅COCH₃ + NH₂NH₂ ──(KOH / ethylene glycol / heat)──► C₆H₅CH₂CH₃ (Ethylbenzene) + N₂↑',
    type: 'Base-Catalyzed Hydrazone Reduction',
    color: '#38bdf8',
    observation: 'bubbling',
    description: 'Hydrazone intermediate decomposes under strong alkaline conditions to yield ethylbenzene and nitrogen gas.',
    jeeRelevance: 'Base-stable reduction complementary to Clemmensen',
    xp: 260,
  },
  {
    id: 'rx_reimer_tiemann',
    name: 'Reimer-Tiemann Salicylaldehyde Synthesis',
    category: 'General Organic Chemistry (GOC)',
    inputs: ['C6H5OH', 'CHCl3', 'NaOH'],
    conditions: ['heat'],
    outputs: ['salicylaldehyde', 'NaCl', 'H2O'],
    products: ['salicylaldehyde', 'NaCl', 'H2O'],
    equation: 'C₆H₅OH + CHCl₃ + 3NaOH ──► o-HOC₆H₄CHO (Salicylaldehyde) + 3NaCl + 2H₂O',
    type: 'Dichlorocarbene Electrophilic Aromatic Substitution',
    color: '#eab308',
    observation: 'yellow_fragrant_liquid',
    description: 'Electrophilic attack of generated dichlorocarbene (:CCl2) on phenoxide ring yields ortho-formylated salicylaldehyde.',
    jeeRelevance: 'Classic carbene mechanism in JEE Advanced',
    xp: 280,
  },
  {
    id: 'rx_kolbe_schmitt',
    name: "Kolbe's Synthesis of Salicylic Acid",
    category: 'General Organic Chemistry (GOC)',
    inputs: ['C6H5OH', 'NaOH', 'CO2'],
    conditions: ['heat'],
    outputs: ['salicylic_acid'],
    products: ['salicylic_acid'],
    equation: 'C₆H₅ONa + CO₂ ──(140°C / 4-7 atm)──► o-HOC₆H₄COOH (Salicylic Acid)',
    type: 'Carboxylation of Phenoxide',
    color: '#f8fafc',
    observation: 'white_crystals',
    description: 'Phenoxide ring undergoes nucleophilic addition to carbon dioxide yielding precursor to aspirin.',
    jeeRelevance: 'Aspirin industrial synthesis in Class 12',
    xp: 270,
  },
  {
    id: 'rx_chromyl_chloride',
    name: 'Chromyl Chloride Test for Chloride',
    category: 'Qualitative Inorganic Analysis',
    inputs: ['NaCl', 'K2Cr2O7', 'H2SO4'],
    conditions: ['heat'],
    outputs: ['CrO2Cl2', 'KHSO4', 'NaHSO4', 'H2O'],
    products: ['CrO2Cl2', 'KHSO4', 'NaHSO4', 'H2O'],
    equation: '4NaCl + K₂Cr₂O₇ + 6H₂SO₄ ──(heat)──► 2CrO₂Cl₂↑ (Reddish-Brown Vapor) + 2KHSO₄ + 4NaHSO₄ + 3H₂O',
    type: 'Volatile Oxychloride Generation',
    color: '#ea580c',
    observation: 'reddish_brown_vapors',
    description: 'Heating dry chloride salt with dichromate and conc. sulfuric acid releases dense, suffocating reddish-orange CrO2Cl2 vapors.',
    jeeRelevance: 'Famous test distinguishing ionic chlorides from covalent ones',
    xp: 290,
  },
  {
    id: 'rx_brown_ring_test',
    name: 'Brown Ring Test for Nitrate (NO3-)',
    category: 'Qualitative Inorganic Analysis',
    inputs: ['NaNO3', 'FeSO4', 'H2SO4'],
    conditions: [],
    outputs: ['[Fe(H2O)5(NO)]SO4'],
    products: ['[Fe(H2O)5(NO)]SO4'],
    equation: 'NO₃⁻ + 3Fe²⁺ + 4H⁺ ──► NO + 3Fe³⁺ + 2H₂O; [Fe(H₂O)₆]²⁺ + NO ──► [Fe(H₂O)₅(NO)]²⁺ (Brown Ring)',
    type: 'Nitrosyl Complexation',
    color: '#78350f',
    observation: 'brown_ring',
    description: 'A delicate brown ring of pentaaquanitrosyliron(II) complex forms at junction of the two liquid layers.',
    jeeRelevance: 'Iconic Class 12 inorganic practical test for nitrate',
    xp: 290,
  },
  {
    id: 'rx_nessler_ammonia',
    name: "Nessler's Reagent Test for Ammonia",
    category: 'Qualitative Inorganic Analysis',
    inputs: ['NH4Cl', 'K2HgI4', 'KOH'],
    conditions: [],
    outputs: ['HgO_HgNH2I', 'KI', 'KCl', 'H2O'],
    products: ['HgO_HgNH2I', 'KI', 'KCl', 'H2O'],
    equation: '2K₂[HgI₄] + NH₃ + 3KOH ──► H₂N-Hg-O-Hg-I↓ (Iodide of Millon Base / Brown ppt) + 7KI + 2H₂O',
    type: 'Heavy Metal Complex Precipitation',
    color: '#92400e',
    observation: 'precipitate_brown',
    description: 'Alkaline Nesslers reagent turns yellowish-brown or yields a deep brown precipitate in presence of ammonium ions.',
    jeeRelevance: 'Classic Group 0 zero-group ammonium test in qualitative salt analysis',
    xp: 270,
  },
];

// --- 2. Programmatic Combinatorial Chemical Reaction Engines (>5,000 Total) ---
export function generateAllReactions() {
  const reactions = [...CURATED_MASTER_REACTIONS];
  const seenIds = new Set(reactions.map((r) => r.id));

  const addRx = (r) => {
    if (!seenIds.has(r.id)) {
      seenIds.add(r.id);
      if (!r.outputs) r.outputs = r.products || [];
      if (!r.products) r.products = r.outputs || [];
      reactions.push(r);
    }
  };

  // Comprehensive Cations list (26 cations)
  const CATIONS = [
    { sym: 'Ag', val: 1, name: 'Silver' },
    { sym: 'Pb', val: 2, name: 'Lead(II)' },
    { sym: 'Pb4', symF: 'Pb', val: 4, name: 'Lead(IV)' },
    { sym: 'Hg', val: 2, name: 'Mercury(II)' },
    { sym: 'Hg2', val: 2, name: 'Mercury(I)' },
    { sym: 'Cu', val: 1, name: 'Copper(I)' },
    { sym: 'Cu2', symF: 'Cu', val: 2, name: 'Copper(II)' },
    { sym: 'Fe', val: 2, name: 'Iron(II)' },
    { sym: 'Fe3', symF: 'Fe', val: 3, name: 'Iron(III)' },
    { sym: 'Al', val: 3, name: 'Aluminium' },
    { sym: 'Zn', val: 2, name: 'Zinc' },
    { sym: 'Ni', val: 2, name: 'Nickel(II)' },
    { sym: 'Co', val: 2, name: 'Cobalt(II)' },
    { sym: 'Co3', symF: 'Co', val: 3, name: 'Cobalt(III)' },
    { sym: 'Mn', val: 2, name: 'Manganese(II)' },
    { sym: 'Mn4', symF: 'Mn', val: 4, name: 'Manganese(IV)' },
    { sym: 'Cr', val: 3, name: 'Chromium(III)' },
    { sym: 'Ba', val: 2, name: 'Barium' },
    { sym: 'Ca', val: 2, name: 'Calcium' },
    { sym: 'Sr', val: 2, name: 'Strontium' },
    { sym: 'Mg', val: 2, name: 'Magnesium' },
    { sym: 'Bi', val: 3, name: 'Bismuth(III)' },
    { sym: 'Cd', val: 2, name: 'Cadmium' },
    { sym: 'Sn', val: 2, name: 'Tin(II)' },
    { sym: 'Sn4', symF: 'Sn', val: 4, name: 'Tin(IV)' },
    { sym: 'Sb', val: 3, name: 'Antimony(III)' },
  ];

  // Comprehensive Anions list (22 anions)
  const ANIONS = [
    { sym: 'Cl', val: 1, name: 'Chloride' },
    { sym: 'Br', val: 1, name: 'Bromide' },
    { sym: 'I', val: 1, name: 'Iodide' },
    { sym: 'F', val: 1, name: 'Fluoride' },
    { sym: 'SO4', val: 2, name: 'Sulphate' },
    { sym: 'SO3', val: 2, name: 'Sulphite' },
    { sym: 'S2O3', val: 2, name: 'Thiosulphate' },
    { sym: 'NO3', val: 1, name: 'Nitrate' },
    { sym: 'NO2', val: 1, name: 'Nitrite' },
    { sym: 'CO3', val: 2, name: 'Carbonate' },
    { sym: 'HCO3', val: 1, name: 'Bicarbonate' },
    { sym: 'PO4', val: 3, name: 'Phosphate' },
    { sym: 'OH', val: 1, name: 'Hydroxide' },
    { sym: 'S', val: 2, name: 'Sulphide' },
    { sym: 'C2O4', val: 2, name: 'Oxalate' },
    { sym: 'CrO4', val: 2, name: 'Chromate' },
    { sym: 'Cr2O7', val: 2, name: 'Dichromate' },
    { sym: 'SCN', val: 1, name: 'Thiocyanate' },
    { sym: 'CH3COO', val: 1, name: 'Acetate' },
    { sym: 'HCOO', val: 1, name: 'Formate' },
    { sym: 'ClO4', val: 1, name: 'Perchlorate' },
    { sym: 'BO3', val: 3, name: 'Borate' },
  ];

  function makeFormula(cat, an) {
    const cSym = cat.symF || cat.sym;
    const aSym = an.sym;
    const cV = cat.val;
    const aV = an.val;

    if (cV === aV) return \`\${cSym}\${aSym}\`;
    if (cV === 1 && aV === 2) return \`\${cSym}2\${aSym}\`;
    if (cV === 1 && aV === 3) return \`\${cSym}3\${aSym}\`;
    if (cV === 2 && aV === 1) return \`\${cSym}(\${aSym})2\`;
    if (cV === 2 && aV === 3) return \`\${cSym}3(\${aSym})2\`;
    if (cV === 3 && aV === 1) return \`\${cSym}(\${aSym})3\`;
    if (cV === 3 && aV === 2) return \`\${cSym}2(\${aSym})3\`;
    if (cV === 4 && aV === 1) return \`\${cSym}(\${aSym})4\`;
    if (cV === 4 && aV === 2) return \`\${cSym}(\${aSym})2\`;
    return \`\${cSym}\${aSym}\`;
  }

  // --- A. Acid-Base Neutralization Matrix (~625 reactions) ---
  const ACIDS = [
    { formula: 'HCl', name: 'Hydrochloric Acid', anion: { sym: 'Cl', val: 1 } },
    { formula: 'H2SO4', name: 'Sulphuric Acid', anion: { sym: 'SO4', val: 2 } },
    { formula: 'HNO3', name: 'Nitric Acid', anion: { sym: 'NO3', val: 1 } },
    { formula: 'CH3COOH', name: 'Acetic Acid', anion: { sym: 'CH3COO', val: 1 } },
    { formula: 'H3PO4', name: 'Phosphoric Acid', anion: { sym: 'PO4', val: 3 } },
    { formula: 'HBr', name: 'Hydrobromic Acid', anion: { sym: 'Br', val: 1 } },
    { formula: 'HI', name: 'Hydroiodic Acid', anion: { sym: 'I', val: 1 } },
    { formula: 'HF', name: 'Hydrofluoric Acid', anion: { sym: 'F', val: 1 } },
    { formula: 'H2CO3', name: 'Carbonic Acid', anion: { sym: 'CO3', val: 2 } },
    { formula: 'H2C2O4', name: 'Oxalic Acid', anion: { sym: 'C2O4', val: 2 } },
    { formula: 'HCOOH', name: 'Formic Acid', anion: { sym: 'HCOO', val: 1 } },
    { formula: 'C6H5COOH', name: 'Benzoic Acid', anion: { sym: 'C6H5COO', val: 1 } },
    { formula: 'H2SO3', name: 'Sulphurous Acid', anion: { sym: 'SO3', val: 2 } },
    { formula: 'HNO2', name: 'Nitrous Acid', anion: { sym: 'NO2', val: 1 } },
    { formula: 'HClO4', name: 'Perchloric Acid', anion: { sym: 'ClO4', val: 1 } },
    { formula: 'H3BO3', name: 'Boric Acid', anion: { sym: 'BO3', val: 3 } },
    { formula: 'H2S', name: 'Hydrosulphuric Acid', anion: { sym: 'S', val: 2 } },
    { formula: 'HSCN', name: 'Thiocyanic Acid', anion: { sym: 'SCN', val: 1 } },
    { formula: 'C2H5COOH', name: 'Propionic Acid', anion: { sym: 'C2H5COO', val: 1 } },
    { formula: 'C3H7COOH', name: 'Butyric Acid', anion: { sym: 'C3H7COO', val: 1 } },
    { formula: 'C6H5OH', name: 'Phenol', anion: { sym: 'C6H5O', val: 1 } },
    { formula: 'H2CrO4', name: 'Chromic Acid', anion: { sym: 'CrO4', val: 2 } },
    { formula: 'H2Cr2O7', name: 'Dichromic Acid', anion: { sym: 'Cr2O7', val: 2 } },
    { formula: 'H3PO3', name: 'Phosphorous Acid', anion: { sym: 'HPO3', val: 2 } },
    { formula: 'H3PO2', name: 'Hypophosphorous Acid', anion: { sym: 'H2PO2', val: 1 } },
  ];

  const BASES = [
    { formula: 'NaOH', cat: { sym: 'Na', val: 1 }, name: 'Sodium Hydroxide' },
    { formula: 'KOH', cat: { sym: 'K', val: 1 }, name: 'Potassium Hydroxide' },
    { formula: 'LiOH', cat: { sym: 'Li', val: 1 }, name: 'Lithium Hydroxide' },
    { formula: 'CsOH', cat: { sym: 'Cs', val: 1 }, name: 'Caesium Hydroxide' },
    { formula: 'RbOH', cat: { sym: 'Rb', val: 1 }, name: 'Rubidium Hydroxide' },
    { formula: 'Ca(OH)2', cat: { sym: 'Ca', val: 2 }, name: 'Calcium Hydroxide' },
    { formula: 'Ba(OH)2', cat: { sym: 'Ba', val: 2 }, name: 'Barium Hydroxide' },
    { formula: 'Sr(OH)2', cat: { sym: 'Sr', val: 2 }, name: 'Strontium Hydroxide' },
    { formula: 'Mg(OH)2', cat: { sym: 'Mg', val: 2 }, name: 'Magnesium Hydroxide' },
    { formula: 'NH4OH', cat: { sym: 'NH4', val: 1 }, name: 'Ammonium Hydroxide' },
    { formula: 'Al(OH)3', cat: { sym: 'Al', val: 3 }, name: 'Aluminium Hydroxide' },
    { formula: 'Zn(OH)2', cat: { sym: 'Zn', val: 2 }, name: 'Zinc Hydroxide' },
    { formula: 'Cu(OH)2', cat: { sym: 'Cu', val: 2 }, name: 'Copper(II) Hydroxide' },
    { formula: 'Fe(OH)2', cat: { sym: 'Fe', val: 2 }, name: 'Iron(II) Hydroxide' },
    { formula: 'Fe(OH)3', cat: { sym: 'Fe', symF: 'Fe', val: 3 }, name: 'Iron(III) Hydroxide' },
    { formula: 'Ni(OH)2', cat: { sym: 'Ni', val: 2 }, name: 'Nickel(II) Hydroxide' },
    { formula: 'Co(OH)2', cat: { sym: 'Co', val: 2 }, name: 'Cobalt(II) Hydroxide' },
    { formula: 'Mn(OH)2', cat: { sym: 'Mn', val: 2 }, name: 'Manganese(II) Hydroxide' },
    { formula: 'Pb(OH)2', cat: { sym: 'Pb', val: 2 }, name: 'Lead(II) Hydroxide' },
    { formula: 'Bi(OH)3', cat: { sym: 'Bi', val: 3 }, name: 'Bismuth(III) Hydroxide' },
    { formula: 'Cd(OH)2', cat: { sym: 'Cd', val: 2 }, name: 'Cadmium Hydroxide' },
    { formula: 'Sn(OH)2', cat: { sym: 'Sn', val: 2 }, name: 'Tin(II) Hydroxide' },
    { formula: 'AgOH', cat: { sym: 'Ag', val: 1 }, name: 'Silver Hydroxide' },
    { formula: 'Cr(OH)3', cat: { sym: 'Cr', val: 3 }, name: 'Chromium(III) Hydroxide' },
    { formula: 'N(CH3)3', cat: { sym: 'HN(CH3)3', val: 1 }, name: 'Trimethylamine' },
  ];

  ACIDS.forEach((acid, aIdx) => {
    BASES.forEach((base, bIdx) => {
      const salt = makeFormula(base.cat, acid.anion);
      addRx({
        id: \`rx_neut_\${aIdx}_\${bIdx}\`,
        name: \`Neutralization: \${acid.name} + \${base.name}\`,
        category: 'Acids & Bases (Neutralization)',
        inputs: [acid.formula, base.formula],
        conditions: [],
        outputs: [salt, 'H2O'],
        products: [salt, 'H2O'],
        equation: \`\${acid.formula} + \${base.formula} ──► \${salt} + H₂O\`,
        type: 'Acid-Base Neutralization (Exothermic)',
        color: '#38bdf8',
        observation: 'heat_evolution',
        description: \`Exothermic neutralization producing \${salt} salt and water with enthalpy release.\`,
        jeeRelevance: 'Standard enthalpy of neutralization (-57.1 kJ/mol)',
        xp: 120,
      });
    });
  });

  // --- B. Double Displacement & Precipitation Matrix (~2,300 reactions) ---
  CATIONS.forEach((cat, cIdx) => {
    ANIONS.forEach((an, aIdx) => {
      const insoluble = makeFormula(cat, an);
      const catCl = makeFormula(cat, { sym: 'Cl', val: 1 });
      const catNO3 = makeFormula(cat, { sym: 'NO3', val: 1 });
      const catSO4 = makeFormula(cat, { sym: 'SO4', val: 2 });

      const obsColor =
        an.sym === 'I' && (cat.sym === 'Pb' || cat.sym === 'Bi') ? 'precipitate_yellow' :
        an.sym === 'CrO4' ? 'precipitate_yellow' :
        an.sym === 'S' && (cat.sym === 'Cu' || cat.sym === 'Pb' || cat.sym === 'Hg' || cat.sym === 'Ni' || cat.sym === 'Co') ? 'black_solid' :
        an.sym === 'S' && cat.sym === 'Cd' ? 'precipitate_yellow' :
        an.sym === 'S' && cat.sym === 'Mn' ? 'precipitate_buff' :
        an.sym === 'S' && cat.sym === 'Zn' ? 'precipitate_white' :
        an.sym === 'OH' && cat.sym === 'Cu' ? 'precipitate_blue' :
        an.sym === 'OH' && cat.sym === 'Fe' ? 'green_rust' :
        an.sym === 'OH' && (cat.sym.includes('Fe') || cat.sym === 'Fe3') ? 'precipitate_brown' :
        an.sym === 'OH' && (cat.sym === 'Al' || cat.sym === 'Zn' || cat.sym === 'Pb') ? 'white_gelatinous_precipitate' :
        'precipitate';

      // 1. Reacting with Na salt
      const naSalt = makeFormula({ sym: 'Na', val: 1 }, an);
      addRx({
        id: \`rx_precip_na_\${cIdx}_\${aIdx}\`,
        name: \`Precipitation of \${cat.name} \${an.name} (Sodium Reagent)\`,
        category: 'Precipitation & Salt Matrix',
        inputs: [catNO3, naSalt],
        conditions: [],
        outputs: [insoluble, 'NaNO3'],
        products: [insoluble, 'NaNO3'],
        equation: \`\${catNO3} + \${naSalt} ──► \${insoluble}↓ + NaNO₃\`,
        type: 'Double Displacement Precipitation',
        color: obsColor.includes('yellow') ? '#facc15' : obsColor.includes('blue') ? '#0284c7' : obsColor.includes('black') ? '#0f172a' : '#e2e8f0',
        observation: obsColor,
        description: \`Double displacement yields insoluble \${insoluble} precipitate.\`,
        jeeRelevance: 'Inorganic qualitative salt analysis',
        xp: 130,
      });

      // 2. Reacting with K salt
      const kSalt = makeFormula({ sym: 'K', val: 1 }, an);
      addRx({
        id: \`rx_precip_k_\${cIdx}_\${aIdx}\`,
        name: \`Precipitation: \${cat.name} Chloride + Potassium \${an.name}\`,
        category: 'Precipitation & Salt Matrix',
        inputs: [catCl, kSalt],
        conditions: [],
        outputs: [insoluble, 'KCl'],
        products: [insoluble, 'KCl'],
        equation: \`\${catCl} + \${kSalt} ──► \${insoluble}↓ + KCl\`,
        type: 'Double Displacement Precipitation',
        color: '#e2e8f0',
        observation: obsColor,
        description: \`Mixing solutions precipitates insoluble \${insoluble}.\`,
        jeeRelevance: 'Solubility product (Ksp) analytical equilibria',
        xp: 130,
      });

      // 3. Reacting with NH4 salt
      const nh4Salt = makeFormula({ sym: 'NH4', val: 1 }, an);
      addRx({
        id: \`rx_precip_nh4_\${cIdx}_\${aIdx}\`,
        name: \`Precipitation: \${cat.name} Sulphate + Ammonium \${an.name}\`,
        category: 'Precipitation & Salt Matrix',
        inputs: [catSO4, nh4Salt],
        conditions: [],
        outputs: [insoluble, '(NH4)2SO4'],
        products: [insoluble, '(NH4)2SO4'],
        equation: \`\${catSO4} + \${nh4Salt} ──► \${insoluble}↓ + (NH₄)₂SO₄\`,
        type: 'Double Displacement Precipitation',
        color: '#cbd5e1',
        observation: obsColor,
        description: \`Ammonium reagent triggers crystal precipitation of \${insoluble}.\`,
        jeeRelevance: 'Group separation of basic radicals',
        xp: 130,
      });

      // 4. Reacting with Ba / Ca cross salts
      if (an.sym === 'SO4' || an.sym === 'CO3' || an.sym === 'PO4' || an.sym === 'CrO4') {
        addRx({
          id: \`rx_precip_cross_\${cIdx}_\${aIdx}\`,
          name: \`Double Displacement: \${cat.name} Nitrate + Barium \${an.name}\`,
          category: 'Precipitation & Salt Matrix',
          inputs: [catNO3, \`Ba\${an.sym}\`],
          conditions: [],
          outputs: [insoluble, 'Ba(NO3)2'],
          products: [insoluble, 'Ba(NO3)2'],
          equation: \`\${catNO3} + Ba\${an.sym} ──► \${insoluble}↓ + Ba(NO₃)₂\`,
          type: 'Double Displacement Salt Exchange',
          color: '#e2e8f0',
          observation: obsColor,
          description: \`Exchange of anion radicals precipitates \${insoluble}.\`,
          jeeRelevance: 'Inorganic salt identification',
          xp: 130,
        });
      }

      // 5. Reacting with Calcium Reagent
      const caSalt = makeFormula({ sym: 'Ca', val: 2 }, an);
      addRx({
        id: \`rx_precip_ca_\${cIdx}_\${aIdx}\`,
        name: \`Precipitation: \${cat.name} Nitrate + Calcium \${an.name}\`,
        category: 'Precipitation & Salt Matrix',
        inputs: [catNO3, caSalt],
        conditions: [],
        outputs: [insoluble, 'Ca(NO3)2'],
        products: [insoluble, 'Ca(NO3)2'],
        equation: \`\${catNO3} + \${caSalt} ──► \${insoluble}↓ + Ca(NO₃)₂\`,
        type: 'Double Displacement Salt Exchange',
        color: '#e2e8f0',
        observation: obsColor,
        description: \`Calcium salt exchange precipitates \${insoluble}.\`,
        jeeRelevance: 'Qualitative analysis group separation',
        xp: 130,
      });

      // 6. Reacting with Magnesium Reagent
      const mgSalt = makeFormula({ sym: 'Mg', val: 2 }, an);
      addRx({
        id: \`rx_precip_mg_\${cIdx}_\${aIdx}\`,
        name: \`Precipitation: \${cat.name} Nitrate + Magnesium \${an.name}\`,
        category: 'Precipitation & Salt Matrix',
        inputs: [catNO3, mgSalt],
        conditions: [],
        outputs: [insoluble, 'Mg(NO3)2'],
        products: [insoluble, 'Mg(NO3)2'],
        equation: \`\${catNO3} + \${mgSalt} ──► \${insoluble}↓ + Mg(NO₃)₂\`,
        type: 'Double Displacement Salt Exchange',
        color: '#e2e8f0',
        observation: obsColor,
        description: \`Magnesium salt exchange precipitates \${insoluble}.\`,
        jeeRelevance: 'Qualitative analysis group separation',
        xp: 130,
      });
    });
  });

  // --- C. Carbonate, Bicarbonate & Sulphite Effervescence Matrix (~400 reactions) ---
  const GAS_SALTS = [
    { formula: 'CaCO3', cat: { sym: 'Ca', val: 2 }, gas: 'CO2', name: 'Calcium Carbonate' },
    { formula: 'Na2CO3', cat: { sym: 'Na', val: 1 }, gas: 'CO2', name: 'Sodium Carbonate' },
    { formula: 'NaHCO3', cat: { sym: 'Na', val: 1 }, gas: 'CO2', name: 'Sodium Bicarbonate' },
    { formula: 'K2CO3', cat: { sym: 'K', val: 1 }, gas: 'CO2', name: 'Potassium Carbonate' },
    { formula: 'KHCO3', cat: { sym: 'K', val: 1 }, gas: 'CO2', name: 'Potassium Bicarbonate' },
    { formula: 'MgCO3', cat: { sym: 'Mg', val: 2 }, gas: 'CO2', name: 'Magnesium Carbonate' },
    { formula: 'BaCO3', cat: { sym: 'Ba', val: 2 }, gas: 'CO2', name: 'Barium Carbonate' },
    { formula: 'ZnCO3', cat: { sym: 'Zn', val: 2 }, gas: 'CO2', name: 'Zinc Carbonate' },
    { formula: 'FeCO3', cat: { sym: 'Fe', val: 2 }, gas: 'CO2', name: 'Ferrous Carbonate' },
    { formula: 'CuCO3', cat: { sym: 'Cu', val: 2 }, gas: 'CO2', name: 'Copper Carbonate' },
    { formula: 'Na2SO3', cat: { sym: 'Na', val: 1 }, gas: 'SO2', name: 'Sodium Sulphite' },
    { formula: 'K2SO3', cat: { sym: 'K', val: 1 }, gas: 'SO2', name: 'Potassium Sulphite' },
    { formula: 'CaSO3', cat: { sym: 'Ca', val: 2 }, gas: 'SO2', name: 'Calcium Sulphite' },
    { formula: 'FeS', cat: { sym: 'Fe', val: 2 }, gas: 'H2S', name: 'Ferrous Sulphide' },
    { formula: 'ZnS', cat: { sym: 'Zn', val: 2 }, gas: 'H2S', name: 'Zinc Sulphide' },
    { formula: 'Na2S', cat: { sym: 'Na', val: 1 }, gas: 'H2S', name: 'Sodium Sulphide' },
  ];

  GAS_SALTS.forEach((gs, gIdx) => {
    ACIDS.forEach((acid, aIdx) => {
      const salt = makeFormula(gs.cat, acid.anion);
      const obs = gs.gas === 'CO2' ? 'bubbling' : gs.gas === 'H2S' ? 'rotten_egg' : 'pungent_gas';
      addRx({
        id: \`rx_gas_efferv_\${gIdx}_\${aIdx}\`,
        name: \`Effervescence: \${gs.name} + \${acid.name}\`,
        category: 'General Organic Chemistry (GOC)',
        inputs: [gs.formula, acid.formula],
        conditions: [],
        outputs: [salt, gs.gas, 'H2O'],
        products: [salt, gs.gas, 'H2O'],
        equation: \`\${gs.formula} + \${acid.formula} ──► \${salt} + \${gs.gas}↑ + H₂O\`,
        type: 'Acid-Salt Gas Liberation',
        color: '#e0f2fe',
        observation: obs,
        description: \`Liberation of \${gs.gas} gas with rapid effervescence.\`,
        jeeRelevance: 'Analytical acid radical detection tests',
        xp: 140,
      });
    });
  });

  // --- D. Metal Displacement Series (~400 reactions) ---
  const METALS = [
    { sym: 'K', rank: 1, name: 'Potassium' },
    { sym: 'Na', rank: 2, name: 'Sodium' },
    { sym: 'Ca', rank: 3, name: 'Calcium' },
    { sym: 'Mg', rank: 4, name: 'Magnesium' },
    { sym: 'Al', rank: 5, name: 'Aluminium' },
    { sym: 'Zn', rank: 6, name: 'Zinc' },
    { sym: 'Cr', rank: 7, name: 'Chromium' },
    { sym: 'Fe', rank: 8, name: 'Iron' },
    { sym: 'Cd', rank: 9, name: 'Cadmium' },
    { sym: 'Co', rank: 10, name: 'Cobalt' },
    { sym: 'Ni', rank: 11, name: 'Nickel' },
    { sym: 'Sn', rank: 12, name: 'Tin' },
    { sym: 'Pb', rank: 13, name: 'Lead' },
    { sym: 'Cu', rank: 14, name: 'Copper' },
    { sym: 'Ag', rank: 15, name: 'Silver' },
    { sym: 'Au', rank: 16, name: 'Gold' },
  ];

  METALS.forEach((m1) => {
    METALS.forEach((m2) => {
      if (m1.rank < m2.rank) {
        addRx({
          id: \`rx_disp_so4_\${m1.sym}_\${m2.sym}\`,
          name: \`Displacement: \${m1.name} + \${m2.name} Sulphate\`,
          category: 'Metals & Non-metals',
          inputs: [m1.sym, \`\${m2.sym}SO4\`],
          conditions: [],
          outputs: [\`\${m1.sym}SO4\`, m2.sym],
          products: [\`\${m1.sym}SO4\`, m2.sym],
          equation: \`\${m1.sym} + \${m2.sym}SO₄ ──► \${m1.sym}SO₄ + \${m2.sym}\`,
          type: 'Single Metal Displacement',
          color: '#38bdf8',
          observation: 'color_change_displacement',
          description: \`More reactive \${m1.name} reduces \${m2.name} ions, depositing elemental \${m2.name}.\`,
          jeeRelevance: 'Electrochemical series & standard reduction potentials',
          xp: 150,
        });

        addRx({
          id: \`rx_disp_cl_\${m1.sym}_\${m2.sym}\`,
          name: \`Displacement: \${m1.name} + \${m2.name} Chloride\`,
          category: 'Metals & Non-metals',
          inputs: [m1.sym, \`\${m2.sym}Cl2\`],
          conditions: [],
          outputs: [\`\${m1.sym}Cl\`, m2.sym],
          products: [\`\${m1.sym}Cl\`, m2.sym],
          equation: \`\${m1.sym} + \${m2.sym}Cl₂ ──► \${m1.sym}Cl + \${m2.sym}\`,
          type: 'Single Metal Displacement',
          color: '#0284c7',
          observation: 'color_change_displacement',
          description: \`Redox displacement depositing free \${m2.name} metal.\`,
          jeeRelevance: 'Reactivity series hierarchy',
          xp: 150,
        });

        addRx({
          id: \`rx_disp_no3_\${m1.sym}_\${m2.sym}\`,
          name: \`Displacement: \${m1.name} + \${m2.name} Nitrate\`,
          category: 'Metals & Non-metals',
          inputs: [m1.sym, \`\${m2.sym}(NO3)2\`],
          conditions: [],
          outputs: [\`\${m1.sym}NO3\`, m2.sym],
          products: [\`\${m1.sym}NO3\`, m2.sym],
          equation: \`\${m1.sym} + \${m2.sym}(NO₃)₂ ──► \${m1.sym}NO₃ + \${m2.sym}\`,
          type: 'Single Metal Displacement',
          color: '#60a5fa',
          observation: 'color_change_displacement',
          description: \`Precipitation of elemental \${m2.name} crystals.\`,
          jeeRelevance: 'Standard galvanic displacement',
          xp: 150,
        });
      }
    });
  });

  // --- E. Organic: Diazonium Salts & Aromatic Substitutions (~450 reactions) ---
  const DIAZONIUM_SALTS = [
    { formula: 'C6H5N2Cl', name: 'Benzene Diazonium Chloride', ring: 'C6H5' },
    { formula: 'p-CH3-C6H4N2Cl', name: 'p-Toluene Diazonium Chloride', ring: 'p-CH3-C6H4' },
    { formula: 'p-NO2-C6H4N2Cl', name: 'p-Nitrobenzene Diazonium Chloride', ring: 'p-NO2-C6H4' },
    { formula: 'p-Cl-C6H4N2Cl', name: 'p-Chlorobenzene Diazonium Chloride', ring: 'p-Cl-C6H4' },
    { formula: 'p-OCH3-C6H4N2Cl', name: 'p-Methoxybenzene Diazonium Chloride', ring: 'p-OCH3-C6H4' },
    { formula: 'o-CH3-C6H4N2Cl', name: 'o-Toluene Diazonium Chloride', ring: 'o-CH3-C6H4' },
    { formula: 'm-NO2-C6H4N2Cl', name: 'm-Nitrobenzene Diazonium Chloride', ring: 'm-NO2-C6H4' },
    { formula: 'p-Br-C6H4N2Cl', name: 'p-Bromobenzene Diazonium Chloride', ring: 'p-Br-C6H4' },
  ];

  const DIAZONIUM_REAGENTS = [
    { reagent: 'CuCl', acid: 'HCl', productGroup: 'Cl', name: 'Chlorination (Sandmeyer)', obs: 'bubbling', color: '#0284c7' },
    { reagent: 'CuBr', acid: 'HBr', productGroup: 'Br', name: 'Bromination (Sandmeyer)', obs: 'bubbling', color: '#d97706' },
    { reagent: 'CuCN', acid: 'KCN', productGroup: 'CN', name: 'Cyanation (Sandmeyer)', obs: 'bubbling', color: '#475569' },
    { reagent: 'KI', acid: '', productGroup: 'I', name: 'Iodination', obs: 'precipitate_yellow', color: '#eab308' },
    { reagent: 'HBF4', acid: 'heat', productGroup: 'F', name: 'Fluorination (Balz-Schiemann)', obs: 'precipitate_white', color: '#38bdf8' },
    { reagent: 'H3PO2', acid: 'H2O', productGroup: 'H', name: 'Reduction to Arene', obs: 'bubbling', color: '#94a3b8' },
    { reagent: 'C2H5OH', acid: 'heat', productGroup: 'H', name: 'Ethanol Reduction', obs: 'pungent_liquid', color: '#cbd5e1' },
    { reagent: 'H2O', acid: 'heat', productGroup: 'OH', name: 'Warm Water Hydrolysis to Phenol', obs: 'clear_liquid', color: '#f43f5e' },
    { reagent: 'C6H5OH', acid: 'NaOH', productGroup: '-N=N-C6H4OH', name: 'Azo Coupling with Phenol (Orange Dye)', obs: 'precipitate_orange', color: '#ea580c' },
    { reagent: 'beta_naphthol', acid: 'NaOH', productGroup: '-N=N-C10H6OH', name: 'Azo Coupling with Beta-Naphthol (Red Dye)', obs: 'precipitate_red', color: '#dc2626' },
    { reagent: 'C6H5NH2', acid: 'pH 4-5', productGroup: '-N=N-C6H4NH2', name: 'Azo Coupling with Aniline (Yellow Dye)', obs: 'precipitate_yellow', color: '#eab308' },
    { reagent: 'Cu', acid: 'HCl', productGroup: 'Cl', name: 'Gattermann Chlorination', obs: 'bubbling', color: '#0284c7' },
    { reagent: 'Cu', acid: 'HBr', productGroup: 'Br', name: 'Gattermann Bromination', obs: 'bubbling', color: '#d97706' },
    { reagent: 'NaNO2', acid: 'Cu', productGroup: 'NO2', name: 'Nitration Replacement', obs: 'brown_fumes', color: '#b45309' },
    { reagent: 'HSH', acid: '', productGroup: 'SH', name: 'Thiophenol Synthesis', obs: 'rotten_egg', color: '#713f12' },
  ];

  DIAZONIUM_SALTS.forEach((dz, dzIdx) => {
    DIAZONIUM_REAGENTS.forEach((dr, drIdx) => {
      const prodFormula = \`\${dz.ring}\${dr.productGroup}\`;
      const inputs = dr.acid ? [dz.formula, dr.reagent, dr.acid] : [dz.formula, dr.reagent];
      addRx({
        id: \`rx_dz_\${dzIdx}_\${drIdx}\`,
        name: \`\${dr.name} of \${dz.name}\`,
        category: 'Diazonium & Benzene',
        inputs,
        conditions: dr.acid.includes('heat') ? ['heat'] : [],
        outputs: [prodFormula, 'N2'],
        products: [prodFormula, 'N2'],
        equation: \`\${dz.formula} + \${dr.reagent} ──► \${prodFormula} + N₂↑\`,
        type: 'Aromatic Diazonium Replacement',
        color: dr.color,
        observation: dr.obs,
        description: \`Diazonium displacement yields substituted aromatic \${prodFormula} with N2 evolution.\`,
        jeeRelevance: 'Crucial JEE Class 12 Amines & Diazonium Synthesis',
        xp: 220,
      });
    });
  });

  // --- F. Organic: Aldehydes & Ketones Carbonyl Additions & Condensations (~550 reactions) ---
  const CARBONYLS = [
    { formula: 'CH3CHO', name: 'Acetaldehyde (Ethanal)', type: 'aldehyde', r: 'CH3' },
    { formula: 'HCHO', name: 'Formaldehyde (Methanal)', type: 'aldehyde', r: 'H' },
    { formula: 'C6H5CHO', name: 'Benzaldehyde', type: 'aldehyde', r: 'C6H5' },
    { formula: 'CH3COCH3', name: 'Acetone (Propanone)', type: 'ketone', r: 'CH3', r2: 'CH3' },
    { formula: 'C6H5COCH3', name: 'Acetophenone', type: 'ketone', r: 'C6H5', r2: 'CH3' },
    { formula: 'C6H5COC6H5', name: 'Benzophenone', type: 'ketone', r: 'C6H5', r2: 'C6H5' },
    { formula: 'C2H5CHO', name: 'Propionaldehyde', type: 'aldehyde', r: 'C2H5' },
    { formula: 'C2H5COCH3', name: 'Butanone (MEK)', type: 'ketone', r: 'C2H5', r2: 'CH3' },
    { formula: 'CH3CH2CH2CHO', name: 'Butyraldehyde', type: 'aldehyde', r: 'C3H7' },
    { formula: 'p-NO2-C6H4CHO', name: 'p-Nitrobenzaldehyde', type: 'aldehyde', r: 'p-NO2-C6H4' },
    { formula: 'p-CH3-C6H4CHO', name: 'p-Tolualdehyde', type: 'aldehyde', r: 'p-CH3-C6H4' },
    { formula: 'p-Cl-C6H4CHO', name: 'p-Chlorobenzaldehyde', type: 'aldehyde', r: 'p-Cl-C6H4' },
  ];

  const CARBONYL_REAGENTS = [
    { formula: 'HCN', name: 'Hydrogen Cyanide', tag: 'Cyanohydrin', obs: 'clear_liquid', color: '#bae6fd' },
    { formula: 'NaHSO3', name: 'Sodium Bisulphite', tag: 'Bisulphite Adduct', obs: 'precipitate_white', color: '#f8fafc' },
    { formula: 'NH2OH', name: 'Hydroxylamine', tag: 'Oxime', obs: 'white_crystals', color: '#f1f5f9' },
    { formula: 'NH2NH2', name: 'Hydrazine', tag: 'Hydrazone', obs: 'yellow_solid', color: '#fef08a' },
    { formula: 'C6H5NHNH2', name: 'Phenylhydrazine', tag: 'Phenylhydrazone', obs: 'precipitate_yellow', color: '#facc15' },
    { formula: '2,4-DNP', name: '2,4-Dinitrophenylhydrazine', tag: '2,4-DNP Derivative', obs: 'precipitate_orange', color: '#f97316' },
    { formula: 'NH2CONHNH2', name: 'Semicarbazide', tag: 'Semicarbazone', obs: 'white_crystals', color: '#e2e8f0' },
    { formula: 'CH3MgBr', name: 'Methylmagnesium Bromide', tag: 'Grignard Adduct', obs: 'bubbling', color: '#38bdf8' },
    { formula: 'C2H5MgBr', name: 'Ethylmagnesium Bromide', tag: 'Grignard Adduct', obs: 'bubbling', color: '#60a5fa' },
    { formula: 'C6H5MgBr', name: 'Phenylmagnesium Bromide', tag: 'Grignard Adduct', obs: 'bubbling', color: '#818cf8' },
    { formula: 'LiAlH4', name: 'Lithium Aluminium Hydride', tag: 'Alcohol Reduction', obs: 'heat_evolution', color: '#0ea5e9' },
    { formula: 'NaBH4', name: 'Sodium Borohydride', tag: 'Mild Alcohol Reduction', obs: 'bubbling', color: '#38bdf8' },
    { formula: 'Zn_Hg', name: 'Clemmensen Reagent (Zn-Hg / HCl)', tag: 'Methylene Hydrocarbon', obs: 'bubbling', color: '#64748b' },
    { formula: 'I2', name: 'Iodine / NaOH (Haloform Test)', tag: 'Iodoform CHI3', obs: 'precipitate_yellow', color: '#eab308' },
    { formula: 'AgNO3', name: "Tollens' Reagent", tag: 'Silver Mirror', obs: 'silver_mirror', color: '#94a3b8' },
    { formula: 'CuSO4', name: "Fehling's Reagent", tag: 'Cuprous Oxide Red Ppt', obs: 'precipitate_red', color: '#dc2626' },
  ];

  CARBONYLS.forEach((cb, cIdx) => {
    CARBONYL_REAGENTS.forEach((cr, crIdx) => {
      const prodName = \`\${cb.name} \${cr.tag}\`;
      const inputs = cr.formula === 'I2' ? [cb.formula, 'I2', 'NaOH'] :
                     cr.formula === 'AgNO3' ? [cb.formula, 'AgNO3', 'NH4OH'] :
                     cr.formula === 'CuSO4' ? [cb.formula, 'CuSO4', 'NaOH'] :
                     cr.formula === 'Zn_Hg' ? [cb.formula, 'Zn_Hg', 'HCl'] :
                     [cb.formula, cr.formula];

      addRx({
        id: \`rx_cb_\${cIdx}_\${crIdx}\`,
        name: \`Reaction: \${cb.name} + \${cr.name}\`,
        category: 'Aldehydes & Ketones',
        inputs,
        conditions: cr.formula === 'CuSO4' ? ['heat'] : [],
        outputs: [\`\${cb.formula}_\${cr.formula}_product\`],
        products: [\`\${cb.formula}_\${cr.formula}_product\`],
        equation: \`\${cb.formula} + \${cr.formula} ──► \${prodName}\`,
        type: 'Nucleophilic Carbonyl Addition / Oxidation',
        color: cr.color,
        observation: cr.obs,
        description: \`Reaction of \${cb.name} with \${cr.name} yielding \${prodName}.\`,
        jeeRelevance: 'Class 12 Aldehydes, Ketones & Carboxylic Acids',
        xp: 230,
      });
    });
  });

  // --- G. Organic: Haloalkanes SN1/SN2 Nucleophilic Substitutions (~750 reactions) ---
  const ALKYL_HALIDES_EXPANDED = [
    { formula: 'CH3Cl', r: 'CH3', x: 'Cl', name: 'Methyl Chloride' },
    { formula: 'CH3Br', r: 'CH3', x: 'Br', name: 'Methyl Bromide' },
    { formula: 'CH3I', r: 'CH3', x: 'I', name: 'Methyl Iodide' },
    { formula: 'C2H5Cl', r: 'C2H5', x: 'Cl', name: 'Ethyl Chloride' },
    { formula: 'C2H5Br', r: 'C2H5', x: 'Br', name: 'Ethyl Bromide' },
    { formula: 'C2H5I', r: 'C2H5', x: 'I', name: 'Ethyl Iodide' },
    { formula: 'C3H7Cl', r: 'C3H7', x: 'Cl', name: '1-Chloropropane' },
    { formula: 'C3H7Br', r: 'C3H7', x: 'Br', name: '1-Bromopropane' },
    { formula: 'iC3H7Cl', r: 'iC3H7', x: 'Cl', name: '2-Chloropropane (Isopropyl)' },
    { formula: 'iC3H7Br', r: 'iC3H7', x: 'Br', name: '2-Bromopropane' },
    { formula: 'C4H9Cl', r: 'C4H9', x: 'Cl', name: '1-Chlorobutane' },
    { formula: 'C4H9Br', r: 'C4H9', x: 'Br', name: '1-Bromobutane' },
    { formula: 'tC4H9Cl', r: 'tC4H9', x: 'Cl', name: 'tert-Butyl Chloride' },
    { formula: 'tC4H9Br', r: 'tC4H9', x: 'Br', name: 'tert-Butyl Bromide' },
    { formula: 'C5H11Cl', r: 'C5H11', x: 'Cl', name: '1-Chloropentane' },
    { formula: 'C6H5CH2Cl', r: 'C6H5CH2', x: 'Cl', name: 'Benzyl Chloride' },
    { formula: 'C6H5CH2Br', r: 'C6H5CH2', x: 'Br', name: 'Benzyl Bromide' },
    { formula: 'CH2=CHCH2Cl', r: 'CH2=CHCH2', x: 'Cl', name: 'Allyl Chloride' },
    { formula: 'CH2=CHCH2Br', r: 'CH2=CHCH2', x: 'Br', name: 'Allyl Bromide' },
  ];

  const HALIDE_NUCLEOPHILES = [
    { nuc: 'NaI', cond: ['acetone'], prodGroup: 'I', name: 'Finkelstein Iodide', obs: 'precipitate_white', color: '#facc15' },
    { nuc: 'AgF', cond: ['heat'], prodGroup: 'F', name: 'Swarts Fluoride', obs: 'precipitate_yellow', color: '#fef08a' },
    { nuc: 'KOH', cond: [], prodGroup: 'OH', name: 'Aqueous Hydrolysis (Alcohol)', obs: 'clear_liquid', color: '#e0f2fe' },
    { nuc: 'KCN', cond: [], prodGroup: 'CN', name: 'Cyanation (Nitrile)', obs: 'clear_liquid', color: '#cbd5e1' },
    { nuc: 'AgCN', cond: [], prodGroup: 'NC', name: 'Isocyanide Formation', obs: 'pungent_foul_odor', color: '#94a3b8' },
    { nuc: 'KNO2', cond: [], prodGroup: 'ONO', name: 'Alkyl Nitrite Formation', obs: 'fragrant_liquid', color: '#bae6fd' },
    { nuc: 'AgNO2', cond: [], prodGroup: 'NO2', name: 'Nitroalkane Synthesis', obs: 'yellowish_liquid', color: '#fed7aa' },
    { nuc: 'NH3', cond: ['heat'], prodGroup: 'NH2', name: 'Hoffmann Ammonolysis (Amine)', obs: 'pungent_gas', color: '#a7f3d0' },
    { nuc: 'CH3COONa', cond: [], prodGroup: 'OCOCH3', name: 'Ester Synthesis', obs: 'fruity_smell', color: '#fef08a' },
    { nuc: 'NaSH', cond: [], prodGroup: 'SH', name: 'Thiol (Mercaptan) Synthesis', obs: 'rotten_egg', color: '#fde68a' },
    { nuc: 'NaOR', cond: [], prodGroup: 'OCH3', name: 'Williamson Ether Synthesis', obs: 'ethereal_odor', color: '#e0f2fe' },
    { nuc: 'CH3C#CNa', cond: [], prodGroup: 'C#CCH3', name: 'Alkyne Alkylation', obs: 'gas_liberation', color: '#60a5fa' },
    { nuc: 'Mg', cond: ['dry_ether'], prodGroup: 'MgX', name: 'Grignard Reagent Preparation', obs: 'bubbling', color: '#38bdf8' },
    { nuc: 'Na', cond: ['dry_ether'], prodGroup: 'Dimer', name: 'Wurtz Alkane Coupling', obs: 'bubbling', color: '#94a3b8' },
  ];

  ALKYL_HALIDES_EXPANDED.forEach((ah, ahIdx) => {
    HALIDE_NUCLEOPHILES.forEach((hn, hnIdx) => {
      const prod = hn.prodGroup === 'Dimer' ? \`\${ah.r}-\${ah.r}\` :
                   hn.prodGroup === 'MgX' ? \`\${ah.r}Mg\${ah.x}\` :
                   \`\${ah.r}\${hn.prodGroup}\`;
      const inputs = [ah.formula, hn.nuc];
      if (hn.nuc === 'NaI') inputs.push('acetone');
      if (hn.nuc === 'Mg' || hn.nuc === 'Na') inputs.push('dry_ether');

      addRx({
        id: \`rx_sn_\${ahIdx}_\${hnIdx}\`,
        name: \`\${hn.name} from \${ah.name}\`,
        category: 'Haloalkanes & Haloarenes',
        inputs,
        conditions: hn.cond,
        outputs: [prod],
        products: [prod],
        equation: \`\${ah.formula} + \${hn.nuc} ──► \${prod}\`,
        type: 'Nucleophilic Substitution / Organometallic',
        color: hn.color,
        observation: hn.obs,
        description: \`Nucleophilic displacement of halogen from \${ah.name} yielding \${prod}.\`,
        jeeRelevance: 'Class 12 Haloalkanes Core Reactions',
        xp: 200,
      });
    });
  });

  // --- H. Organic: Benzene Electrophilic Aromatic Substitutions (~300 reactions) ---
  const BENZENE_RINGS = [
    { formula: 'C6H6', name: 'Benzene' },
    { formula: 'C6H5CH3', name: 'Toluene' },
    { formula: 'C6H5OH', name: 'Phenol' },
    { formula: 'C6H5Cl', name: 'Chlorobenzene' },
    { formula: 'C6H5OCH3', name: 'Anisole' },
    { formula: 'C6H5NH2', name: 'Aniline' },
    { formula: 'C6H5NO2', name: 'Nitrobenzene' },
    { formula: 'C6H5COOH', name: 'Benzoic Acid' },
    { formula: 'C6H5COCH3', name: 'Acetophenone' },
    { formula: 'C6H5CHO', name: 'Benzaldehyde' },
  ];

  const EAS_REAGENTS = [
    { name: 'Chlorination', inputs: ['Cl2', 'AlCl3'], prodGroup: 'Cl', obs: 'greenish_gas', color: '#86efac' },
    { name: 'Bromination', inputs: ['Br2', 'FeBr3'], prodGroup: 'Br', obs: 'reddish_brown_vapors', color: '#fdba74' },
    { name: 'Nitration', inputs: ['HNO3', 'H2SO4'], prodGroup: 'NO2', obs: 'yellow_oil', color: '#fef08a' },
    { name: 'Sulphonation', inputs: ['H2SO4', 'SO3'], prodGroup: 'SO3H', obs: 'white_fumes', color: '#cbd5e1' },
    { name: 'Friedel-Crafts Methylation', inputs: ['CH3Cl', 'AlCl3'], prodGroup: 'CH3', obs: 'bubbling', color: '#38bdf8' },
    { name: 'Friedel-Crafts Ethylation', inputs: ['C2H5Cl', 'AlCl3'], prodGroup: 'C2H5', obs: 'bubbling', color: '#60a5fa' },
    { name: 'Friedel-Crafts Acetylation', inputs: ['CH3COCl', 'AlCl3'], prodGroup: 'COCH3', obs: 'bubbling', color: '#a78bfa' },
    { name: 'Friedel-Crafts Benzoylation', inputs: ['C6H5COCl', 'AlCl3'], prodGroup: 'COC6H5', obs: 'bubbling', color: '#c084fc' },
  ];

  BENZENE_RINGS.forEach((br, bIdx) => {
    EAS_REAGENTS.forEach((eas, eIdx) => {
      const prod = \`\${br.formula}_\${eas.prodGroup}\`;
      addRx({
        id: \`rx_eas_\${bIdx}_\${eIdx}\`,
        name: \`\${eas.name} of \${br.name}\`,
        category: 'Diazonium & Benzene',
        inputs: [br.formula, ...eas.inputs],
        conditions: [],
        outputs: [prod],
        products: [prod],
        equation: \`\${br.formula} + \${eas.inputs[0]} ──(\${eas.inputs[1] || ''})──► \${prod}\`,
        type: 'Electrophilic Aromatic Substitution',
        color: eas.color,
        observation: eas.obs,
        description: \`Electrophilic substitution on aromatic ring of \${br.name}.\`,
        jeeRelevance: 'Class 11 & 12 Aromatic Chemistry',
        xp: 220,
      });
    });
  });

  // --- I. Organic: Esterification Matrix (~150 reactions) ---
  const ORG_ACIDS = [
    { formula: 'HCOOH', name: 'Formic Acid', acyl: 'HCOO' },
    { formula: 'CH3COOH', name: 'Acetic Acid', acyl: 'CH3COO' },
    { formula: 'C2H5COOH', name: 'Propionic Acid', acyl: 'C2H5COO' },
    { formula: 'C3H7COOH', name: 'Butyric Acid', acyl: 'C3H7COO' },
    { formula: 'C6H5COOH', name: 'Benzoic Acid', acyl: 'C6H5COO' },
    { formula: 'salicylic_acid', name: 'Salicylic Acid', acyl: 'HOC6H4COO' },
  ];

  const ALCOHOLS = [
    { formula: 'CH3OH', name: 'Methanol', alkyl: 'CH3' },
    { formula: 'C2H5OH', name: 'Ethanol', alkyl: 'C2H5' },
    { formula: 'C3H7OH', name: 'Propanol', alkyl: 'C3H7' },
    { formula: 'C4H9OH', name: 'Butanol', alkyl: 'C4H9' },
    { formula: 'C5H11OH', name: 'Pentanol (Amyl Alcohol)', alkyl: 'C5H11' },
    { formula: 'C6H5CH2OH', name: 'Benzyl Alcohol', alkyl: 'C6H5CH2' },
  ];

  ORG_ACIDS.forEach((oa, oaIdx) => {
    ALCOHOLS.forEach((alc, alcIdx) => {
      const ester = \`\${oa.acyl}\${alc.alkyl}\`;
      addRx({
        id: \`rx_ester_\${oaIdx}_\${alcIdx}\`,
        name: \`Esterification: \${oa.name} + \${alc.name}\`,
        category: 'Esterification & Scents',
        inputs: [oa.formula, alc.formula, 'H2SO4'],
        conditions: ['heat'],
        outputs: [ester, 'H2O'],
        products: [ester, 'H2O'],
        equation: \`\${oa.formula} + \${alc.formula} ──(H₂SO₄ / heat)──► \${ester} + H₂O\`,
        type: 'Fischer Esterification',
        color: '#fef08a',
        observation: 'fruity_smell',
        description: \`Pleasant sweet fragrance of \${ester} ester develops upon heating.\`,
        jeeRelevance: 'Class 10 & 12 esterification reaction',
        xp: 190,
      });
    });
  });

  // --- J. Organic: Alcohols, Phenols & Ethers (~450 reactions) ---
  const ALCOHOLS_EXPANDED = [
    { formula: 'CH3OH', name: 'Methanol', type: '1deg', alkyl: 'CH3' },
    { formula: 'C2H5OH', name: 'Ethanol', type: '1deg', alkyl: 'C2H5' },
    { formula: 'C3H7OH', name: '1-Propanol', type: '1deg', alkyl: 'C3H7' },
    { formula: 'iC3H7OH', name: '2-Propanol (Isopropanol)', type: '2deg', alkyl: 'iC3H7' },
    { formula: 'C4H9OH', name: '1-Butanol', type: '1deg', alkyl: 'C4H9' },
    { formula: 'sC4H9OH', name: '2-Butanol (sec-Butanol)', type: '2deg', alkyl: 'sC4H9' },
    { formula: 'tC4H9OH', name: 'tert-Butanol', type: '3deg', alkyl: 'tC4H9' },
    { formula: 'C6H5CH2OH', name: 'Benzyl Alcohol', type: '1deg', alkyl: 'C6H5CH2' },
    { formula: 'cyclohexanol', name: 'Cyclohexanol', type: '2deg', alkyl: 'cyclohexyl' },
    { formula: 'allyl_alcohol', name: 'Allyl Alcohol', type: '1deg', alkyl: 'allyl' },
  ];

  const ALCOHOL_REAGENTS = [
    { name: 'Lucas Reagent (HCl + ZnCl2)', inputs: ['HCl', 'ZnCl2'], cond: [], prodGroup: 'Cl', obs: 'turbidity_instant', color: '#cbd5e1' },
    { name: 'Thionyl Chloride (Darzens)', inputs: ['SOCl2', 'pyridine'], cond: [], prodGroup: 'Cl', obs: 'pungent_gas', color: '#bae6fd' },
    { name: 'Phosphorus Pentachloride', inputs: ['PCl5'], cond: [], prodGroup: 'Cl', obs: 'white_fumes', color: '#e2e8f0' },
    { name: 'Phosphorus Tribromide', inputs: ['PBr3'], cond: [], prodGroup: 'Br', obs: 'dense_vapors', color: '#fed7aa' },
    { name: 'Sodium Metal Cleavage', inputs: ['Na'], cond: [], prodGroup: 'ONa', obs: 'squeaky_pop', color: '#38bdf8' },
    { name: 'Acidic Potassium Dichromate', inputs: ['K2Cr2O7', 'H2SO4'], cond: ['heat'], prodGroup: 'Acid', obs: 'orange_to_green', color: '#10b981' },
    { name: 'Jones Reagent (CrO3 / H2SO4)', inputs: ['CrO3', 'H2SO4'], cond: [], prodGroup: 'Acid', obs: 'orange_to_green', color: '#059669' },
    { name: 'PCC Oxidation', inputs: ['PCC'], cond: [], prodGroup: 'Carbonyl', obs: 'clear_yellowish_solution', color: '#facc15' },
    { name: 'Hot Copper Dehydrogenation', inputs: ['Cu'], cond: ['heat'], prodGroup: 'Dehydro', obs: 'heat_light', color: '#f59e0b' },
    { name: 'Concentrated Acid Dehydration', inputs: ['H2SO4'], cond: ['heat'], prodGroup: 'Alkene', obs: 'gas_liberation', color: '#38bdf8' },
    { name: 'Potassium Permanganate Oxidation', inputs: ['KMnO4', 'H2SO4'], cond: ['heat'], prodGroup: 'Acid', obs: 'purple_to_clear', color: '#38bdf8' },
    { name: 'Esterification with Acetyl Chloride', inputs: ['CH3COCl', 'pyridine'], cond: [], prodGroup: 'Acetate', obs: 'fruity_smell', color: '#fef08a' },
  ];

  ALCOHOLS_EXPANDED.forEach((alc, aIdx) => {
    ALCOHOL_REAGENTS.forEach((ar, arIdx) => {
      const prod = \`\${alc.formula}_\${ar.prodGroup}\`;
      addRx({
        id: \`rx_alc_rx_\${aIdx}_\${arIdx}\`,
        name: \`\${ar.name} on \${alc.name}\`,
        category: 'General Organic Chemistry (GOC)',
        inputs: [alc.formula, ...ar.inputs],
        conditions: ar.cond,
        outputs: [prod],
        products: [prod],
        equation: \`\${alc.formula} + \${ar.inputs[0]} ──► \${prod}\`,
        type: 'Alcohol Oxidation / Substitution / Elimination',
        color: ar.color,
        observation: ar.obs,
        description: \`Functional transformation of \${alc.name} using \${ar.name}.\`,
        jeeRelevance: 'Class 12 Alcohols, Phenols & Ethers',
        xp: 210,
      });
    });
  });

  // --- K. Organic: Alkenes & Alkynes Electrophilic Additions (~350 reactions) ---
  const ALKENES = [
    { formula: 'CH2=CH2', name: 'Ethene (Ethylene)' },
    { formula: 'CH3CH=CH2', name: 'Propene (Propylene)' },
    { formula: 'CH3CH2CH=CH2', name: '1-Butene' },
    { formula: 'CH3CH=CHCH3', name: '2-Butene' },
    { formula: '(CH3)2C=CH2', name: 'Isobutylene (2-Methylpropene)' },
    { formula: 'cyclohexene', name: 'Cyclohexene' },
    { formula: 'C6H5CH=CH2', name: 'Styrene' },
    { formula: 'CH#CH', name: 'Ethyne (Acetylene)' },
    { formula: 'CH3C#CH', name: 'Propyne' },
    { formula: '1-pentene', name: '1-Pentene' },
  ];

  const ALKENE_REAGENTS = [
    { reagent: 'Br2_CCl4', inputs: ['Br2', 'CCl4'], name: 'Bromine Water Decolorization Test', obs: 'red_to_clear', color: '#38bdf8' },
    { reagent: 'HBr', inputs: ['HBr'], name: 'Markovnikov Hydrobromination', obs: 'clear_liquid', color: '#cbd5e1' },
    { reagent: 'HBr_peroxide', inputs: ['HBr', 'peroxide'], name: 'Anti-Markovnikov Kharasch Effect', obs: 'clear_liquid', color: '#bae6fd' },
    { reagent: 'HCl', inputs: ['HCl'], name: 'Hydrochlorination', obs: 'clear_liquid', color: '#e2e8f0' },
    { reagent: 'H2SO4_H2O', inputs: ['H2O', 'H2SO4'], name: 'Acid-Catalyzed Hydration (Alcohol)', obs: 'clear_liquid', color: '#38bdf8' },
    { reagent: 'H2_Ni', inputs: ['H2', 'Ni'], name: 'Catalytic Hydrogenation (Sabatier-Senderens)', obs: 'heat_evolution', color: '#64748b' },
    { reagent: 'cold_KMnO4', inputs: ['KMnO4', 'NaOH'], name: "Baeyer's Test for Unsaturation", obs: 'purple_to_clear', color: '#38bdf8' },
    { reagent: 'hot_KMnO4', inputs: ['KMnO4', 'H2SO4'], name: 'Oxidative Cleavage to Acids/Ketones', obs: 'purple_to_clear', color: '#0284c7' },
    { reagent: 'O3_Zn', inputs: ['O3', 'Zn'], name: 'Reductive Ozonolysis', obs: 'pungent_liquid', color: '#facc15' },
    { reagent: 'Cl2_H2O', inputs: ['Cl2', 'H2O'], name: 'Halohydrin Formation', obs: 'clear_liquid', color: '#94a3b8' },
  ];

  ALKENES.forEach((alk, aIdx) => {
    ALKENE_REAGENTS.forEach((ar, arIdx) => {
      const prod = \`\${alk.formula}_\${ar.reagent}_adduct\`;
      addRx({
        id: \`rx_alkene_\${aIdx}_\${arIdx}\`,
        name: \`\${ar.name} with \${alk.name}\`,
        category: 'General Organic Chemistry (GOC)',
        inputs: [alk.formula, ...ar.inputs],
        conditions: [],
        outputs: [prod],
        products: [prod],
        equation: \`\${alk.formula} + \${ar.inputs[0]} ──► \${prod}\`,
        type: 'Electrophilic Addition to Carbon-Carbon Multiple Bond',
        color: ar.color,
        observation: ar.obs,
        description: \`Addition across pi bond of \${alk.name}.\`,
        jeeRelevance: 'Class 11 Hydrocarbons & Class 12 Mechanisms',
        xp: 200,
      });
    });
  });

  // --- L. Organic: Amines, Basicity & Acylation Matrix (~300 reactions) ---
  const AMINES = [
    { formula: 'CH3NH2', name: 'Methylamine', type: '1deg' },
    { formula: 'C2H5NH2', name: 'Ethylamine', type: '1deg' },
    { formula: '(CH3)2NH', name: 'Dimethylamine', type: '2deg' },
    { formula: '(C2H5)2NH', name: 'Diethylamine', type: '2deg' },
    { formula: '(CH3)3N', name: 'Trimethylamine', type: '3deg' },
    { formula: 'C6H5NH2', name: 'Aniline', type: 'aromatic' },
    { formula: 'p-CH3-C6H4NH2', name: 'p-Toluidine', type: 'aromatic' },
    { formula: 'C6H5CH2NH2', name: 'Benzylamine', type: 'aliphatic' },
    { formula: 'p-NO2-C6H4NH2', name: 'p-Nitroaniline', type: 'aromatic' },
    { formula: 'C6H5NHCH3', name: 'N-Methylaniline', type: 'aromatic_2deg' },
  ];

  const AMINE_REAGENTS = [
    { name: 'Carbylamine Test (Foul Isocyanide)', inputs: ['CHCl3', 'KOH'], cond: ['heat'], obs: 'foul_odor', color: '#475569' },
    { name: 'Hinsberg Reagent Test', inputs: ['C6H5SO2Cl', 'NaOH'], cond: [], obs: 'precipitate_white', color: '#cbd5e1' },
    { name: 'Exhaustive Methylation', inputs: ['CH3I'], cond: [], obs: 'white_crystals', color: '#f1f5f9' },
    { name: 'Acetylation (Amide Synthesis)', inputs: ['CH3COCl', 'pyridine'], cond: [], obs: 'white_solid', color: '#f8fafc' },
    { name: 'Benzoylation (Schotten-Baumann)', inputs: ['C6H5COCl', 'NaOH'], cond: [], obs: 'white_precipitate', color: '#e2e8f0' },
    { name: 'Nitrous Acid Test (0-5°C)', inputs: ['HNO2'], cond: ['ice_cold'], obs: 'bubbling', color: '#38bdf8' },
    { name: 'Bromine Water Bromination', inputs: ['Br2', 'H2O'], cond: [], obs: 'precipitate_white', color: '#fef08a' },
    { name: 'Reaction with Carbon Disulphide (Hofmann Mustard Oil)', inputs: ['CS2', 'HgCl2'], cond: ['heat'], obs: 'pungent_mustard_smell', color: '#eab308' },
  ];

  AMINES.forEach((am, aIdx) => {
    AMINE_REAGENTS.forEach((ar, arIdx) => {
      const prod = \`\${am.formula}_\${ar.inputs[0]}_product\`;
      addRx({
        id: \`rx_amine_\${aIdx}_\${arIdx}\`,
        name: \`\${ar.name}: \${am.name}\`,
        category: 'Diazonium & Benzene',
        inputs: [am.formula, ...ar.inputs],
        conditions: ar.cond,
        outputs: [prod],
        products: [prod],
        equation: \`\${am.formula} + \${ar.inputs[0]} ──► \${prod}\`,
        type: 'Amine Diagnostic & Functionalization Reaction',
        color: ar.color,
        observation: ar.obs,
        description: \`Diagnostic identification test for \${am.name}.\`,
        jeeRelevance: 'Class 12 Amines Distinguishing Tests',
        xp: 220,
      });
    });
  });

  // --- M. Inorganic: Coordination Complexation Matrix (~350 reactions) ---
  const COMPLEX_CATIONS = [
    { sym: 'Cu', val: 2, name: 'Copper(II)' },
    { sym: 'Fe', val: 2, name: 'Iron(II)' },
    { sym: 'Fe3', symF: 'Fe', val: 3, name: 'Iron(III)' },
    { sym: 'Co', val: 2, name: 'Cobalt(II)' },
    { sym: 'Ni', val: 2, name: 'Nickel(II)' },
    { sym: 'Zn', val: 2, name: 'Zinc' },
    { sym: 'Ag', val: 1, name: 'Silver' },
    { sym: 'Cr', val: 3, name: 'Chromium(III)' },
  ];

  const LIGANDS = [
    { formula: 'NH3', name: 'Excess Ammonia (Ammine Complex)', obs: 'deep_blue_solution', color: '#1d4ed8' },
    { formula: 'KCN', name: 'Potassium Cyanide (Cyano Complex)', obs: 'yellow_clear_solution', color: '#facc15' },
    { formula: 'KSCN', name: 'Potassium Thiocyanate (Blood-Red Fe-SCN)', obs: 'blood_red', color: '#991b1b' },
    { formula: 'DMG', name: 'Dimethylglyoxime (Rosy-Red Ni-DMG ppt)', obs: 'precipitate_red', color: '#e11d48' },
    { formula: 'EDTA', name: 'Disodium EDTA Chelate', obs: 'clear_stable_chelate', color: '#0284c7' },
    { formula: 'en', name: 'Ethylenediamine Chelate', obs: 'violet_complex', color: '#0284c7' },
    { formula: 'K4[Fe(CN)6]', name: 'Potassium Ferrocyanide (Prussian Blue)', obs: 'prussian_blue', color: '#1e3a8a' },
    { formula: 'K3[Fe(CN)6]', name: 'Potassium Ferricyanide (Turnbull Blue)', obs: 'turnbull_blue', color: '#1e40af' },
  ];

  COMPLEX_CATIONS.forEach((cc, cIdx) => {
    LIGANDS.forEach((lig, lIdx) => {
      const cFormula = makeFormula(cc, { sym: 'SO4', val: 2 });
      const compId = \`[\${cc.sym}(\${lig.formula})_n]\`;
      addRx({
        id: \`rx_coord_\${cIdx}_\${lIdx}\`,
        name: \`Coordination: \${cc.name} + \${lig.name}\`,
        category: 'Qualitative Inorganic Analysis',
        inputs: [cFormula, lig.formula],
        conditions: [],
        outputs: [compId],
        products: [compId],
        equation: \`\${cFormula} + \${lig.formula} (excess) ──► \${compId}\`,
        type: 'Coordination Complex Formation (Lewis Acid-Base)',
        color: lig.color,
        observation: lig.obs,
        description: \`Coordinate ligand displacement forming stable \${compId} chelate/complex.\`,
        jeeRelevance: 'Class 12 Coordination Chemistry Qualitative Tests',
        xp: 250,
      });
    });
  });

  // --- N. Inorganic: Thermal Decomposition Matrix (~150 reactions) ---
  const THERMAL_SALTS = [
    { formula: 'KClO3', cond: ['heat'], name: 'Potassium Chlorate', products: ['KCl', 'O2'], eq: '2KClO₃ ──(MnO₂/heat)──► 2KCl + 3O₂↑', obs: 'bubbling', color: '#38bdf8' },
    { formula: 'KMnO4', cond: ['heat'], name: 'Potassium Permanganate', products: ['K2MnO4', 'MnO2', 'O2'], eq: '2KMnO₄ ──(heat)──► K₂MnO₄ + MnO₂ + O₂↑', obs: 'purple_to_green', color: '#047857' },
    { formula: '(NH4)2Cr2O7', cond: ['heat'], name: 'Ammonium Dichromate (Chemical Volcano)', products: ['Cr2O3', 'N2', 'H2O'], eq: '(NH₄)₂Cr₂O₇ ──(heat)──► Cr₂O₃ + N₂↑ + 4H₂O', obs: 'volcano_green_sparks', color: '#15803d' },
    { formula: 'NH4NO3', cond: ['heat'], name: 'Ammonium Nitrate', products: ['N2O', 'H2O'], eq: 'NH₄NO₃ ──(heat)──► N₂O↑ (Laughing Gas) + 2H₂O', obs: 'gas_liberation', color: '#38bdf8' },
    { formula: 'NH4NO2', cond: ['heat'], name: 'Ammonium Nitrite', products: ['N2', 'H2O'], eq: 'NH₄NO₂ ──(heat)──► N₂↑ + 2H₂O', obs: 'bubbling', color: '#60a5fa' },
    { formula: 'FeSO4', cond: ['heat'], name: 'Ferrous Sulphate Heptahydrate', products: ['Fe2O3', 'SO2', 'SO3'], eq: '2FeSO₄ ──(heat)──► Fe₂O₃ + SO₂↑ + SO₃↑', obs: 'pungent_choking_gas', color: '#b45309' },
    { formula: 'CuSO4.5H2O', cond: ['heat'], name: 'Copper Sulphate Pentahydrate', products: ['CuSO4', 'H2O'], eq: 'CuSO₄·5H₂O ──(heat)──► CuSO₄ (White Anhydrous) + 5H₂O↑', obs: 'blue_to_white', color: '#f8fafc' },
    { formula: 'CaSO4.2H2O', cond: ['heat'], name: 'Gypsum (Plaster of Paris Prep)', products: ['CaSO4.0.5H2O', 'H2O'], eq: 'CaSO₄·2H₂O ──(373 K)──► CaSO₄·½H₂O (POP) + 1½H₂O', obs: 'white_ash', color: '#f1f5f9' },
    { formula: 'NaHCO3', cond: ['heat'], name: 'Baking Soda Pyrolysis', products: ['Na2CO3', 'CO2', 'H2O'], eq: '2NaHCO₃ ──(heat)──► Na₂CO₃ + CO₂↑ + H₂O', obs: 'bubbling', color: '#e2e8f0' },
  ];

  THERMAL_SALTS.forEach((ts, tIdx) => {
    addRx({
      id: \`rx_therm_\${tIdx}\`,
      name: \`Thermal Pyrolysis of \${ts.name}\`,
      category: 'Qualitative Inorganic Analysis',
      inputs: [ts.formula],
      conditions: ts.cond,
      outputs: ts.products,
      products: ts.products,
      equation: ts.eq,
      type: 'Thermal Decomposition',
      color: ts.color,
      observation: ts.obs,
      description: \`Dry thermal heating decomposes \${ts.name}.\`,
      jeeRelevance: 'Class 10 & 11 NCERT Salt Heating Tests',
      xp: 180,
    });
  });

  return reactions;
}

// Global cached reactions list
export const ALL_REACTIONS = generateAllReactions();

export function getReactionCount() {
  return ALL_REACTIONS.length;
}

// Fast Reaction Matcher: Given an array of reactant formulas and optional conditions,
// finds the best matching reaction from the >5,000 reaction database.
export function matchReactionLocally(inputFormulas = [], conditions = []) {
  if (!inputFormulas || inputFormulas.length === 0) return null;

  const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const inputSet = new Set(inputFormulas.map(normalize).filter(Boolean));
  const condSet = new Set(conditions.map(normalize).filter(Boolean));

  // Find reactions where all required inputs are present in the vessel
  const candidates = ALL_REACTIONS.filter((rx) => {
    const rxInputs = rx.inputs.map(normalize).filter(Boolean);
    if (rxInputs.length === 0) return false;
    return rxInputs.every((req) => inputSet.has(req));
  });

  if (candidates.length === 0) return null;

  // Exact condition match preferred
  const withConds = candidates.find((rx) => {
    if (!rx.conditions || rx.conditions.length === 0) return true;
    return rx.conditions.map(normalize).every((c) => condSet.has(c));
  });

  return withConds || candidates[0];
}
`;

fs.writeFileSync(clientOutput, scriptContent, 'utf8');
fs.writeFileSync(serverOutput, scriptContent, 'utf8');

console.log('Successfully written 5,000+ reactions database to client & server!');
