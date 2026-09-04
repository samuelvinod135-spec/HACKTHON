import { R } from './helper.js';

// Laboratory gas preparations & characteristic tests — Class 10/11/12
export default [
  // Carbon dioxide
  R([['CaCO3', 'HCl'], [], ['CaCl2', 'H2O', 'CO2'], 'bubbling', 'CaCO3 + 2HCl -> CaCl2 + H2O + CO2']),
  R([['Na2CO3', 'HCl'], [], ['NaCl', 'H2O', 'CO2'], 'bubbling', 'Na2CO3 + 2HCl -> 2NaCl + H2O + CO2']),
  R([['NaHCO3', 'HCl'], [], ['NaCl', 'H2O', 'CO2'], 'bubbling', 'NaHCO3 + HCl -> NaCl + H2O + CO2']),
  R([['CaCO3', 'H2SO4'], ['heat'], ['CaSO4', 'H2O', 'CO2'], 'bubbling', 'CaCO3 + H2SO4 -> CaSO4 + H2O + CO2']),
  R([['CO2', 'CaOH2'], [], ['CaCO3', 'H2O'], 'turns_limewater', 'CO2 + Ca(OH)2 -> CaCO3 + H2O']),
  R([['CO2', 'NaOH'], [], ['Na2CO3', 'H2O'], 'heat_light', 'CO2 + 2NaOH -> Na2CO3 + H2O']),

  // Hydrogen gas
  R([['Zn', 'HCl'], [], ['ZnCl2', 'H2'], 'squeaky_pop', 'Zn + 2HCl -> ZnCl2 + H2']),
  R([['Zn', 'H2SO4'], [], ['ZnSO4', 'H2'], 'squeaky_pop', 'Zn + H2SO4 -> ZnSO4 + H2']),
  R([['Na', 'H2O'], [], ['NaOH', 'H2'], 'squeaky_pop', '2Na + 2H2O -> 2NaOH + H2']),
  R([['Al', 'NaOH'], ['heat'], ['NaAlO2', 'H2'], 'squeaky_pop', '2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2']),
  R([['Mg', 'H2O'], ['heat'], ['MgOH2', 'H2'], 'squeaky_pop', 'Mg + 2H2O -> Mg(OH)2 + H2']),

  // Oxygen gas
  R([['KClO3'], ['catalyst', 'heat'], ['KCl', 'O2'], 'colorless_gas', '2KClO3 -> 2KCl + 3O2']),
  R([['H2O2'], ['catalyst'], ['H2O', 'O2'], 'bubbling', '2H2O2 -> 2H2O + O2']),
  R([['KMnO4'], ['heat'], ['K2MnO4', 'MnO2', 'O2'], 'colorless_gas', '2KMnO4 -> K2MnO4 + MnO2 + O2']),

  // Chlorine gas
  R([['MnO2', 'HCl'], ['heat'], ['MnCl2', 'Cl2', 'H2O'], 'greenish_gas', 'MnO2 + 4HCl -> MnCl2 + Cl2 + 2H2O']),
  R([['KMnO4', 'HCl'], ['heat'], ['KCl', 'MnCl2', 'Cl2', 'H2O'], 'greenish_gas', '2KMnO4 + 16HCl -> 2KCl + 2MnCl2 + 5Cl2 + 8H2O']),

  // Ammonia gas
  R([['NH4Cl', 'CaOH2'], ['heat'], ['CaCl2', 'NH3', 'H2O'], 'pungent_gas', '2NH4Cl + Ca(OH)2 -> CaCl2 + 2NH3 + 2H2O']),
  R([['NH4Cl', 'NaOH'], ['heat'], ['NaCl', 'NH3', 'H2O'], 'pungent_gas', 'NH4Cl + NaOH -> NaCl + NH3 + H2O']),
  R([['NH3', 'HCl'], [], ['NH4Cl'], 'white_fumes', 'NH3 + HCl -> NH4Cl']),

  // Sulphur dioxide
  R([['Cu', 'H2SO4'], ['heat'], ['CuSO4', 'SO2', 'H2O'], 'colorless_gas', 'Cu + 2H2SO4 -> CuSO4 + SO2 + 2H2O']),
  R([['Na2SO3', 'HCl'], [], ['NaCl', 'SO2', 'H2O'], 'colorless_gas', 'Na2SO3 + 2HCl -> 2NaCl + SO2 + H2O']),
  R([['S', 'O2'], ['heat'], ['SO2'], 'colorless_gas', 'S + O2 -> SO2']),

  // Nitric oxide / nitrogen dioxide
  R([['Cu', 'HNO3'], ['heat'], ['CuNO3', 'NO2', 'H2O'], 'brown_gas', 'Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O']),
  R([['Cu', 'HNO3'], [], ['CuNO3', 'NO', 'H2O'], 'colorless_gas', '3Cu + 8HNO3 -> 3Cu(NO3)2 + 2NO + 4H2O']),
  R([['Zn', 'HNO3'], [], ['ZnNO3', 'N2O', 'H2O'], 'colorless_gas', '4Zn + 10HNO3 -> 4Zn(NO3)2 + N2O + 5H2O']),

  // Hydrogen sulphide
  R([['FeS', 'HCl'], [], ['FeCl2', 'H2S'], 'rotten_egg', 'FeS + 2HCl -> FeCl2 + H2S']),
  R([['FeS', 'H2SO4'], [], ['FeSO4', 'H2S'], 'rotten_egg', 'FeS + H2SO4 -> FeSO4 + H2S']),
  R([['H2S', 'CuSO4'], [], ['CuS', 'H2SO4'], 'black_solid', 'H2S + CuSO4 -> CuS + H2SO4']),
  R([['H2S', 'PbNO3'], [], ['PbS', 'HNO3'], 'black_solid', 'H2S + Pb(NO3)2 -> PbS + 2HNO3']),

  // Nitrogen gas
  R([['NH4Cl', 'NaNO2'], ['heat'], ['NaCl', 'N2', 'H2O'], 'colorless_gas', 'NH4Cl + NaNO2 -> NaCl + N2 + 2H2O']),

  // Testing ions / characteristic precipitates
  R([['FeCl3', 'KSCN'], [], ['FeSCN3', 'KCl'], 'blood_red', 'FeCl3 + 3KSCN -> Fe(SCN)3 + 3KCl']),
  R([['CuSO4', 'NH3'], [], ['CuNH3SO4'], 'color_clear_blue', 'CuSO4 + 4NH3 -> [Cu(NH3)4]SO4']),
  R([['NH4Cl', 'NaOH'], ['heat'], ['NaCl', 'NH3', 'H2O'], 'pungent_gas', 'NH4Cl + NaOH -> NaCl + NH3 + H2O']),
];
