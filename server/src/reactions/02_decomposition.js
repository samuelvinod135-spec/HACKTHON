import { R } from './helper.js';

// Decomposition reactions — Class 10/11/12
export default [
  // Thermal decomposition of carbonates
  R([['CaCO3'], ['heat'], ['CaO', 'CO2'], 'colorless_gas', 'CaCO3 -> CaO + CO2']),
  R([['MgCO3'], ['heat'], ['MgO', 'CO2'], 'colorless_gas', 'MgCO3 -> MgO + CO2']),
  R([['Na2CO3'], ['heat'], ['Na2O', 'CO2'], 'colorless_gas', 'Na2CO3 -> Na2O + CO2']),
  R([['BaCO3'], ['heat'], ['BaO', 'CO2'], 'colorless_gas', 'BaCO3 -> BaO + CO2']),
  R([['ZnCO3'], ['heat'], ['ZnO', 'CO2'], 'colorless_gas', 'ZnCO3 -> ZnO + CO2']),
  R([['PbCO3'], ['heat'], ['PbO', 'CO2'], 'colorless_gas', 'PbCO3 -> PbO + CO2']),

  // Thermal decomposition of nitrates
  R([['PbNO3'], ['heat'], ['PbO', 'NO2', 'O2'], 'brown_gas', '2Pb(NO3)2 -> 2PbO + 4NO2 + O2']),
  R([['KNO3'], ['heat'], ['KNO2', 'O2'], 'colorless_gas', '2KNO3 -> 2KNO2 + O2']),
  R([['NaNO3'], ['heat'], ['NaNO2', 'O2'], 'colorless_gas', '2NaNO3 -> 2NaNO2 + O2']),
  R([['AgNO3'], ['heat'], ['Ag', 'NO2', 'O2'], 'brown_gas', '2AgNO3 -> 2Ag + 2NO2 + O2']),
  R([['CuNO3'], ['heat'], ['CuO', 'NO2', 'O2'], 'brown_gas', '2Cu(NO3)2 -> 2CuO + 4NO2 + O2']),
  R([['MgNO3'], ['heat'], ['MgO', 'NO2', 'O2'], 'brown_gas', '2Mg(NO3)2 -> 2MgO + 4NO2 + O2']),

  // Hydroxide decomposition
  R([['CaOH2'], ['heat'], ['CaO', 'H2O'], 'heat_light', 'Ca(OH)2 -> CaO + H2O']),
  R([['MgOH2'], ['heat'], ['MgO', 'H2O'], 'heat_light', 'Mg(OH)2 -> MgO + H2O']),
  R([['NaOH'], ['electricity'], ['Na', 'H2', 'O2'], 'squeaky_pop', '2NaOH -> 2Na + H2 + O2']),

  // Chlorate decomposition
  R([['KClO3'], ['catalyst', 'heat'], ['KCl', 'O2'], 'colorless_gas', '2KClO3 -> 2KCl + 3O2']),

  // Peroxide decomposition
  R([['BaO2'], ['heat'], ['BaO', 'O2'], 'colorless_gas', '2BaO2 -> 2BaO + O2']),
  R([['H2O2'], ['catalyst'], ['H2O', 'O2'], 'bubbling', '2H2O2 -> 2H2O + O2']),

  // Hydrate decomposition
  R([['CuSO4·5H2O'], ['heat'], ['CuSO4', 'H2O'], 'blue_to_white', 'CuSO4·5H2O -> CuSO4 + 5H2O']),

  // Photochemical decomposition (examples)
  R([['AgCl'], ['sunlight'], ['Ag', 'Cl2'], 'black_solid', '2AgCl -> 2Ag + Cl2']),
  R([['AgBr'], ['sunlight'], ['Ag', 'Br2'], 'black_solid', '2AgBr -> 2Ag + Br2']),
  R([['H2O2'], ['sunlight'], ['H2O', 'O2'], 'bubbling', '2H2O2 -> 2H2O + O2']),
  R([['HNO3'], ['sunlight'], ['H2O', 'NO2', 'O2'], 'brown_gas', '4HNO3 -> 2H2O + 4NO2 + O2']),

  // Electrolysis decomposition
  R([['H2O'], ['electricity'], ['H2', 'O2'], 'bubbling', '2H2O -> 2H2 + O2']),
  R([['NaCl'], ['electricity'], ['Na', 'Cl2'], 'colorless_gas', '2NaCl -> 2Na + Cl2']),
  R([['Al2O3'], ['electricity'], ['Al', 'O2'], 'heat_light', '2Al2O3 -> 4Al + 3O2']),

  // Metal oxide decomposition
  R([['ZnO'], ['heat'], ['Zn', 'O2'], 'colorless_gas', '2ZnO -> 2Zn + O2']),
  R([['Fe3O4'], ['heat'], ['Fe', 'O2'], 'heat_light', '2Fe3O4 -> 6Fe + 4O2']),
];
