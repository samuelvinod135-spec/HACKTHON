import { R } from './helper.js';

// Additional combination, displacement & neutralization reactions
export default [
  // Metal + acid (extra)
  R([['Pb', 'HNO3'], [], ['PbNO3', 'H2', 'NO2'], 'brown_gas', 'Pb + 4HNO3 -> Pb(NO3)2 + 2NO2 + 2H2O']),
  R([['Sn', 'HCl'], [], ['SnCl2', 'H2'], 'squeaky_pop', 'Sn + 2HCl -> SnCl2 + H2']),
  R([['Ca', 'HCl'], [], ['CaCl2', 'H2'], 'squeaky_pop', 'Ca + 2HCl -> CaCl2 + H2']),
  R([['Ba', 'H2O'], [], ['BaOH2', 'H2'], 'squeaky_pop', 'Ba + 2H2O -> Ba(OH)2 + H2']),
  R([['Mg', 'HNO3'], [], ['MgNO3', 'H2'], 'squeaky_pop', 'Mg + 2HNO3 -> Mg(NO3)2 + H2']),
  R([['Zn', 'HNO3'], [], ['ZnNO3', 'H2'], 'squeaky_pop', 'Zn + 2HNO3 -> Zn(NO3)2 + H2']),

  // Metal oxide + acid (extra)
  R([['Fe2O3', 'H2SO4'], [], ['Fe2SO4', 'H2O'], 'color_clear_pink', 'Fe2O3 + 3H2SO4 -> Fe2(SO4)3 + 3H2O']),
  R([['Al2O3', 'H2SO4'], [], ['Al2SO4', 'H2O'], 'heat_light', 'Al2O3 + 3H2SO4 -> Al2(SO4)3 + 3H2O']),
  R([['ZnO', 'HNO3'], [], ['ZnNO3', 'H2O'], 'heat_light', 'ZnO + 2HNO3 -> Zn(NO3)2 + H2O']),
  R([['CuO', 'HNO3'], [], ['CuNO3', 'H2O'], 'color_clear_blue', 'CuO + 2HNO3 -> Cu(NO3)2 + H2O']),
  R([['MgO', 'H2SO4'], [], ['MgSO4', 'H2O'], 'heat_light', 'MgO + H2SO4 -> MgSO4 + H2O']),

  // Metal hydroxide + acid (extra neutralizations)
  R([['NaOH', 'HNO3'], [], ['NaNO3', 'H2O'], 'heat_light', 'NaOH + HNO3 -> NaNO3 + H2O']),
  R([['KOH', 'H2SO4'], [], ['K2SO4', 'H2O'], 'heat_light', '2KOH + H2SO4 -> K2SO4 + 2H2O']),
  R([['NaOH', 'H3PO4'], [], ['Na3PO4', 'H2O'], 'heat_light', '3NaOH + H3PO4 -> Na3PO4 + 3H2O']),
  R([['MgOH2', 'HNO3'], [], ['MgNO3', 'H2O'], 'heat_light', 'Mg(OH)2 + 2HNO3 -> Mg(NO3)2 + 2H2O']),
  R([['CaOH2', 'HNO3'], [], ['CaNO3', 'H2O'], 'heat_light', 'Ca(OH)2 + 2HNO3 -> Ca(NO3)2 + 2H2O']),
  R([['AlOH3', 'H2SO4'], [], ['Al2SO4', 'H2O'], 'heat_light', '2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O']),

  // Metal displacement (extra)
  R([['Mg', 'FeSO4'], [], ['MgSO4', 'Fe'], 'color_clear_blue', 'Mg + FeSO4 -> MgSO4 + Fe']),
  R([['Mg', 'CuSO4'], [], ['MgSO4', 'Cu'], 'color_clear_blue', 'Mg + CuSO4 -> MgSO4 + Cu']),
  R([['Al', 'FeSO4'], [], ['Al2SO4', 'Fe'], 'color_clear_blue', '2Al + 3FeSO4 -> Al2(SO4)3 + 3Fe']),
  R([['Zn', 'AgNO3'], [], ['ZnNO3', 'Ag'], 'precipitate', 'Zn + 2AgNO3 -> Zn(NO3)2 + 2Ag']),
  R([['Fe', 'AgNO3'], [], ['FeNO3', 'Ag'], 'precipitate', 'Fe + 2AgNO3 -> Fe(NO3)2 + 2Ag']),
  R([['Mg', 'PbNO3'], [], ['MgNO3', 'Pb'], 'precipitate', 'Mg + Pb(NO3)2 -> Mg(NO3)2 + Pb']),

  // More combination
  R([['Ca', 'O2'], ['heat'], ['CaO'], 'heat_light', '2Ca + O2 -> 2CaO']),
  R([['Ba', 'O2'], ['heat'], ['BaO'], 'heat_light', '2Ba + O2 -> 2BaO']),
  R([['Ag', 'O2'], ['heat'], ['Ag2O'], 'black_solid', '4Ag + O2 -> 2Ag2O']),
  R([['Pb', 'O2'], ['heat'], ['PbO'], 'heat_light', '2Pb + O2 -> 2PbO']),

  // Halogen + metal (extra)
  R([['Na', 'Cl2'], [], ['NaCl'], 'white_fumes', '2Na + Cl2 -> 2NaCl']),
  R([['K', 'Cl2'], [], ['KCl'], 'white_fumes', '2K + Cl2 -> 2KCl']),
  R([['Mg', 'O2'], ['heat'], ['MgO'], 'white_light', '2Mg + O2 -> 2MgO']),

  // Displacement of hydrogen / water splitting
  R([['C', 'H2O'], ['heat'], ['CO', 'H2'], 'colorless_gas', 'C + H2O -> CO + H2']),
  R([['CH4', 'H2O'], ['catalyst', 'heat'], ['CO', 'H2'], 'colorless_gas', 'CH4 + H2O -> CO + 3H2']),
  R([['Ca', 'Cl2'], [], ['CaCl2'], 'white_fumes', 'Ca + Cl2 -> CaCl2']),

  // Double displacement producing gases (extra)
  R([['NaHCO3', 'H2SO4'], [], ['Na2SO4', 'H2O', 'CO2'], 'bubbling', '2NaHCO3 + H2SO4 -> Na2SO4 + 2H2O + 2CO2']),
  R([['K2CO3', 'HCl'], [], ['KCl', 'H2O', 'CO2'], 'bubbling', 'K2CO3 + 2HCl -> 2KCl + H2O + CO2']),
  R([['AgNO3', 'NaBr'], [], ['AgBr', 'NaNO3'], 'precipitate_yellow', 'AgNO3 + NaBr -> AgBr + NaNO3']),
  R([['AgNO3', 'KI'], [], ['AgI', 'KNO3'], 'precipitate_yellow', 'AgNO3 + KI -> AgI + KNO3']),
];
