import { R } from './helper.js';

// Redox reactions — Class 10/11/12
export default [
  // Metal + oxygen (oxidation)
  R([['MG', 'O2'], ['heat'], ['MgO'], 'white_light', '2Mg + O2 -> 2MgO']),
  R([['Fe', 'O2'], ['high_temp'], ['Fe3O4'], 'green_rust', '3Fe + 2O2 -> Fe3O4']),
  R([['Cu', 'O2'], ['heat'], ['CuO'], 'black_solid', '2Cu + O2 -> 2CuO']),
  // Reduction of oxides with hydrogen/carbon (reduction)
  R([['CuO', 'H2'], ['heat'], ['Cu', 'H2O'], 'black_solid', 'CuO + H2 -> Cu + H2O']),
  R([['Fe2O3', 'CO'], ['heat'], ['Fe', 'CO2'], 'colorless_gas', 'Fe2O3 + 3CO -> 2Fe + 3CO2']),
  R([['ZnO', 'C'], ['heat'], ['Zn', 'CO'], 'colorless_gas', 'ZnO + C -> Zn + CO']),
  R([['PbO', 'C'], ['heat'], ['Pb', 'CO'], 'colorless_gas', 'PbO + C -> Pb + CO']),
  R([['CuO', 'C'], ['heat'], ['Cu', 'CO2'], 'colorless_gas', '2CuO + C -> 2Cu + CO2']),
  R([['Fe2O3', 'H2'], ['heat'], ['Fe', 'H2O'], 'heat_light', 'Fe2O3 + 3H2 -> 2Fe + 3H2O']),
  R([['Mg', 'CO2'], ['heat'], ['MgO', 'C'], 'white_light', '2Mg + CO2 -> 2MgO + C']),

  // Displacement as redox
  R([['Zn', 'CuSO4'], [], ['ZnSO4', 'Cu'], 'color_clear_blue', 'Zn + CuSO4 -> ZnSO4 + Cu']),
  R([['Fe', 'CuSO4'], [], ['FeSO4', 'Cu'], 'color_clear_blue', 'Fe + CuSO4 -> FeSO4 + Cu']),
  R([['Mg', 'H2O'], ['heat'], ['MgO', 'H2'], 'squeaky_pop', 'Mg + H2O -> MgO + H2']),

  // Peroxide redox
  R([['H2O2', 'MnO2'], [], ['H2O', 'O2'], 'bubbling', '2H2O2 -> 2H2O + O2 (MnO2 catalyst)']),
  R([['H2O2', 'FeCl3'], [], ['H2O', 'O2'], 'bubbling', '2H2O2 -> 2H2O + O2 (Fe3+ catalyst)']),

  // Acidic/alkaline potassium permanganate oxidations (representative)
  R([['KMnO4', 'FeSO4'], ['catalyst'], ['MnSO4', 'Fe2SO4', 'K2SO4', 'H2O'], 'color_clear', '2KMnO4 + 10FeSO4 + 8H2SO4 -> K2SO4 + 2MnSO4 + 5Fe2(SO4)3 + 8H2O']),
  R([['K2Cr2O7', 'H2SO4'], [], ['K2SO4', 'Cr2SO4', 'O2', 'H2O'], 'color_clear_orange', 'K2Cr2O7 -> K2SO4 + Cr2(SO4)3 + H2O + O2']),

  // Oxidation of metals to ions
  R([['Na', 'H2O'], [], ['NaOH', 'H2'], 'squeaky_pop', '2Na + 2H2O -> 2NaOH + H2']),
  R([['Ca', 'H2O'], [], ['CaOH2', 'H2'], 'squeaky_pop', 'Ca + 2H2O -> Ca(OH)2 + H2']),
  R([['K', 'H2O'], [], ['KOH', 'H2'], 'squeaky_pop', '2K + 2H2O -> 2KOH + H2']),

  // Combustion (redox) reactions
  R([['CH4', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'CH4 + 2O2 -> CO2 + 2H2O']),
  R([['C2H5OH', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'C2H5OH + 3O2 -> 2CO2 + 3H2O']),
  R([['C', 'O2'], ['heat'], ['CO2'], 'heat_light', 'C + O2 -> CO2']),
  R([['C', 'O2'], ['heat'], ['CO'], 'heat_light', '2C + O2 -> 2CO']),
  R([['C2H4', 'O2'], ['heat'], ['CO2', 'H2O'], 'heat_light', 'C2H4 + 3O2 -> 2CO2 + 2H2O']),

  // Oxidation of sulphur dioxide
  R([['SO2', 'O2'], ['catalyst'], ['SO3'], 'colorless_gas', '2SO2 + O2 -> 2SO3']),
];
