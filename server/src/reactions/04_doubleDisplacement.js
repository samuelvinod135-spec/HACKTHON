import { R } from './helper.js';

// Double displacement reactions — Class 10/11/12
export default [
  // Precipitation reactions
  R([['AgNO3', 'NaCl'], [], ['AgCl', 'NaNO3'], 'precipitate', 'AgNO3 + NaCl -> AgCl + NaNO3']),
  R([['AgNO3', 'HCl'], [], ['AgCl', 'HNO3'], 'precipitate', 'AgNO3 + HCl -> AgCl + HNO3']),
  R([['AgNO3', 'KCl'], [], ['AgCl', 'KNO3'], 'precipitate', 'AgNO3 + KCl -> AgCl + KNO3']),
  R([['BaCl2', 'Na2SO4'], [], ['BaSO4', 'NaCl'], 'precipitate', 'BaCl2 + Na2SO4 -> BaSO4 + 2NaCl']),
  R([['BaCl2', 'H2SO4'], [], ['BaSO4', 'HCl'], 'precipitate', 'BaCl2 + H2SO4 -> BaSO4 + 2HCl']),
  R([['BaCl2', 'CuSO4'], [], ['BaSO4', 'CuCl2'], 'precipitate', 'BaCl2 + CuSO4 -> BaSO4 + CuCl2']),
  R([['PbNO3', 'NaCl'], [], ['PbCl2', 'NaNO3'], 'precipitate', 'Pb(NO3)2 + 2NaCl -> PbCl2 + 2NaNO3']),
  R([['PbNO3', 'KI'], [], ['PbI2', 'KNO3'], 'precipitate_yellow', 'Pb(NO3)2 + 2KI -> PbI2 + 2KNO3']),
  R([['PbNO3', 'Na2SO4'], [], ['PbSO4', 'NaNO3'], 'precipitate', 'Pb(NO3)2 + Na2SO4 -> PbSO4 + 2NaNO3']),
  R([['FeCl3', 'NaOH'], [], ['FeOH3', 'NaCl'], 'precipitate', 'FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl']),
  R([['CuSO4', 'NaOH'], [], ['CuOH2', 'Na2SO4'], 'precipitate_blue', 'CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4']),
  R([['CuSO4', 'KOH'], [], ['CuOH2', 'K2SO4'], 'precipitate_blue', 'CuSO4 + 2KOH -> Cu(OH)2 + K2SO4']),
  R([['MgSO4', 'NaOH'], [], ['MgOH2', 'Na2SO4'], 'precipitate', 'MgSO4 + 2NaOH -> Mg(OH)2 + Na2SO4']),
  R([['ZnSO4', 'NaOH'], [], ['ZnOH2', 'Na2SO4'], 'precipitate', 'ZnSO4 + 2NaOH -> Zn(OH)2 + Na2SO4']),
  R([['Al2SO4', 'NaOH'], [], ['AlOH3', 'Na2SO4'], 'precipitate', 'Al2(SO4)3 + 6NaOH -> 2Al(OH)3 + 3Na2SO4']),
  R([['CaCl2', 'Na2CO3'], [], ['CaCO3', 'NaCl'], 'precipitate', 'CaCl2 + Na2CO3 -> CaCO3 + 2NaCl']),
  R([['CaCl2', 'NaHCO3'], [], ['CaCO3', 'NaCl', 'H2O', 'CO2'], 'bubbling', 'CaCl2 + 2NaHCO3 -> CaCO3 + 2NaCl + H2O + CO2']),
  R([['CaOH2', 'Na2CO3'], [], ['CaCO3', 'NaOH'], 'precipitate', 'Ca(OH)2 + Na2CO3 -> CaCO3 + 2NaOH']),
  R([['BaCl2', 'Na2CO3'], [], ['BaCO3', 'NaCl'], 'precipitate', 'BaCl2 + Na2CO3 -> BaCO3 + 2NaCl']),
  R([['KCl', 'AgNO3'], [], ['AgCl', 'KNO3'], 'precipitate', 'KCl + AgNO3 -> AgCl + KNO3']),
  R([['MgCl2', 'AgNO3'], [], ['MgNO3', 'AgCl'], 'precipitate', 'MgCl2 + 2AgNO3 -> Mg(NO3)2 + 2AgCl']),
  R([['Na2CO3', 'AgNO3'], [], ['Ag2CO3', 'NaNO3'], 'precipitate', 'Na2CO3 + 2AgNO3 -> Ag2CO3 + 2NaNO3']),
  R([['ZnCl2', 'Na2CO3'], [], ['ZnCO3', 'NaCl'], 'precipitate', 'ZnCl2 + Na2CO3 -> ZnCO3 + 2NaCl']),

  // Acid-Base neutralization (all produce salt + water)
  R([['HCl', 'NaOH'], [], ['NaCl', 'H2O'], 'heat_light', 'HCl + NaOH -> NaCl + H2O']),
  R([['HCl', 'KOH'], [], ['KCl', 'H2O'], 'heat_light', 'HCl + KOH -> KCl + H2O']),
  R([['HCl', 'CaOH2'], [], ['CaCl2', 'H2O'], 'heat_light', '2HCl + Ca(OH)2 -> CaCl2 + 2H2O']),
  R([['HCl', 'NH3'], [], ['NH4Cl', 'H2O'], 'white_fumes', 'HCl + NH3 -> NH4Cl']),
  R([['HCl', 'MgOH2'], [], ['MgCl2', 'H2O'], 'heat_light', '2HCl + Mg(OH)2 -> MgCl2 + 2H2O']),
  R([['HCl', 'AlOH3'], [], ['AlCl3', 'H2O'], 'heat_light', '3HCl + Al(OH)3 -> AlCl3 + 3H2O']),
  R([['H2SO4', 'NaOH'], [], ['Na2SO4', 'H2O'], 'heat_light', 'H2SO4 + 2NaOH -> Na2SO4 + 2H2O']),
  R([['H2SO4', 'KOH'], [], ['K2SO4', 'H2O'], 'heat_light', 'H2SO4 + 2KOH -> K2SO4 + 2H2O']),
  R([['H2SO4', 'CaOH2'], [], ['CaSO4', 'H2O'], 'precipitate', 'H2SO4 + Ca(OH)2 -> CaSO4 + 2H2O']),
  R([['H2SO4', 'NH3'], [], ['NH4SO4', 'H2O'], 'white_fumes', 'H2SO4 + 2NH3 -> (NH4)2SO4']),
  R([['HNO3', 'NaOH'], [], ['NaNO3', 'H2O'], 'heat_light', 'HNO3 + NaOH -> NaNO3 + H2O']),
  R([['HNO3', 'KOH'], [], ['KNO3', 'H2O'], 'heat_light', 'HNO3 + KOH -> KNO3 + H2O']),
  R([['HNO3', 'NH3'], [], ['NH4NO3'], 'white_fumes', 'HNO3 + NH3 -> NH4NO3']),
  R([['CH3COOH', 'NaOH'], [], ['CH3COONa', 'H2O'], 'heat_light', 'CH3COOH + NaOH -> CH3COONa + H2O']),
  R([['H3PO4', 'NaOH'], [], ['Na3PO4', 'H2O'], 'heat_light', 'H3PO4 + 3NaOH -> Na3PO4 + 3H2O']),

  // Acid + carbonate / bicarbonate -> salt + water + CO2
  R([['HCl', 'Na2CO3'], [], ['NaCl', 'H2O', 'CO2'], 'bubbling', '2HCl + Na2CO3 -> 2NaCl + H2O + CO2']),
  R([['HCl', 'NaHCO3'], [], ['NaCl', 'H2O', 'CO2'], 'bubbling', 'HCl + NaHCO3 -> NaCl + H2O + CO2']),
  R([['HCl', 'CaCO3'], [], ['CaCl2', 'H2O', 'CO2'], 'bubbling', '2HCl + CaCO3 -> CaCl2 + H2O + CO2']),
  R([['H2SO4', 'Na2CO3'], [], ['Na2SO4', 'H2O', 'CO2'], 'bubbling', 'H2SO4 + Na2CO3 -> Na2SO4 + H2O + CO2']),
  R([['H2SO4', 'CaCO3'], [], ['CaSO4', 'H2O', 'CO2'], 'bubbling', 'H2SO4 + CaCO3 -> CaSO4 + H2O + CO2']),
  R([['HNO3', 'Na2CO3'], [], ['NaNO3', 'H2O', 'CO2'], 'bubbling', '2HNO3 + Na2CO3 -> 2NaNO3 + H2O + CO2']),
  R([['CH3COOH', 'NaHCO3'], [], ['CH3COONa', 'H2O', 'CO2'], 'bubbling', 'CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2']),

  // Salt exchange producing water via weak base
  R([['NaHCO3', 'NaOH'], ['heat'], ['Na2CO3', 'H2O'], 'bubbling', 'NaHCO3 + NaOH -> Na2CO3 + H2O']),

  // Double displacement with precipitation of metal hydroxides/salts
  R([['CuCl2', 'Na2S'], [], ['CuS', 'NaCl'], 'black_solid', 'CuCl2 + Na2S -> CuS + 2NaCl']),
  R([['FeCl3', 'AgNO3'], [], ['AgCl', 'FeNO3'], 'precipitate', 'FeCl3 + 3AgNO3 -> 3AgCl + Fe(NO3)3']),
];
