import { R } from './helper.js';

// Organic chemistry reactions — Class 11/12
export default [
  // Combustion
  R([['CH4', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'CH4 + 2O2 -> CO2 + 2H2O']),
  R([['C2H6', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', '2C2H6 + 7O2 -> 4CO2 + 6H2O']),
  R([['C3H8', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'C3H8 + 5O2 -> 3CO2 + 4H2O']),
  R([['C2H4', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'C2H4 + 3O2 -> 2CO2 + 2H2O']),
  R([['C2H5OH', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'C2H5OH + 3O2 -> 2CO2 + 3H2O']),

  // Addition reactions to alkenes
  R([['C2H4', 'H2'], ['catalyst'], ['C2H6'], 'colorless_gas', 'C2H4 + H2 -> C2H6 (hydrogenation)']),
  R([['C2H4', 'Cl2'], [], ['C2H4Cl2'], 'colorless_gas', 'C2H4 + Cl2 -> C2H4Cl2 (halogenation)']),
  R([['C2H4', 'Br2'], [], ['C2H4Br2'], 'color_clear_pink', 'C2H4 + Br2 -> C2H4Br2']),
  R([['C2H4', 'H2O'], ['catalyst'], ['C2H5OH'], 'colorless_gas', 'C2H4 + H2O -> C2H5OH (hydration)']),
  R([['C2H4', 'H2'], ['heat'], ['C2H6'], 'colorless_gas', 'C2H4 + H2 -> C2H6']),

  // Substitution (halogenation of alkanes)
  R([['CH4', 'Cl2'], ['sunlight'], ['CH3Cl', 'HCl'], 'white_fumes', 'CH4 + Cl2 -> CH3Cl + HCl']),
  R([['CH3Cl', 'Cl2'], ['sunlight'], ['CH2Cl2', 'HCl'], 'white_fumes', 'CH3Cl + Cl2 -> CH2Cl2 + HCl']),

  // Esterification (alcohol + acid)
  R([['C2H5OH', 'CH3COOH'], ['catalyst'], ['CH3COOC2H5', 'H2O'], 'fruity_smell', 'C2H5OH + CH3COOH -> CH3COOC2H5 + H2O']),
  R([['CH3OH', 'CH3COOH'], ['catalyst'], ['CH3COOCH3', 'H2O'], 'fruity_smell', 'CH3OH + CH3COOH -> CH3COOCH3 + H2O']),
  R([['C2H5OH', 'HNO3'], ['catalyst'], ['C2H5NO3', 'H2O'], 'fruity_smell', 'C2H5OH + HNO3 -> C2H5NO3 + H2O']),

  // Fermentation
  R([['C6H12O6', ''], ['catalyst'], ['C2H5OH', 'CO2'], 'bubbling', 'C6H12O6 -> 2C2H5OH + 2CO2']),

  // Saponification (ester + NaOH)
  R([['C3H5OOCR', 'NaOH'], ['heat'], ['C3H5OH', 'RCOONa'], 'heat_light', 'Ester + NaOH -> glycerol + soap']),

  // Dehydration of alcohol
  R([['C2H5OH'], ['catalyst', 'heat'], ['C2H4', 'H2O'], 'colorless_gas', 'C2H5OH -> C2H4 + H2O']),

  // Oxidation of ethanol -> ethanal -> ethanoic acid
  R([['C2H5OH', 'O2'], ['catalyst'], ['CH3CHO', 'H2O'], 'colorless_gas', '2C2H5OH + O2 -> 2CH3CHO + 2H2O']),
  R([['CH3CHO', 'O2'], ['catalyst'], ['CH3COOH'], 'colorless_gas', '2CH3CHO + O2 -> 2CH3COOH']),
  R([['C2H5OH', 'O2'], ['catalyst'], ['CH3COOH', 'H2O'], 'color_clear_pink', 'C2H5OH + O2 -> CH3COOH + H2O']),

  // Acetylene (ethyne) reactions
  R([['CaC2', 'H2O'], [], ['C2H2', 'CaOH2'], 'bubbling', 'CaC2 + 2H2O -> C2H2 + Ca(OH)2']),
  R([['C2H2', '2H2'], ['catalyst'], ['C2H6'], 'colorless_gas', 'C2H2 + 2H2 -> C2H6']),

  // Polymerization (representative)
  R([['C2H4'], ['catalyst', 'pressure'], ['POLYETHENE'], 'solid_formed', 'nC2H4 -> (-CH2-CH2-)n']),

  // Glucose/other sugar reaction with limewater
  R([['C6H12O6', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'C6H12O6 + 6O2 -> 6CO2 + 6H2O']),

  // Soap with hard water (representative)
  R([['C17H35COONa', 'CaCl2'], [], ['C17H35COOCa', 'NaCl'], 'precipitate', '2C17H35COONa + CaCl2 -> (C17H35COO)2Ca + 2NaCl']),
  R([['C17H35COONa', 'MgCl2'], [], ['C17H35COOMg', 'NaCl'], 'precipitate', '2C17H35COONa + MgCl2 -> (C17H35COO)2Mg + 2NaCl']),
];
