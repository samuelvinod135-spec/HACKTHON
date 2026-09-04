import { R } from './helper.js';

// Single displacement reactions — Class 10/11/12 (reactivity series)
export default [
  // Metal + acid -> salt + hydrogen
  R([['Zn', 'HCl'], [], ['ZnCl2', 'H2'], 'squeaky_pop', 'Zn + 2HCl -> ZnCl2 + H2']),
  R([['Zn', 'H2SO4'], [], ['ZnSO4', 'H2'], 'squeaky_pop', 'Zn + H2SO4 -> ZnSO4 + H2']),
  R([['Mg', 'HCl'], [], ['MgCl2', 'H2'], 'squeaky_pop', 'Mg + 2HCl -> MgCl2 + H2']),
  R([['Mg', 'H2SO4'], [], ['MgSO4', 'H2'], 'squeaky_pop', 'Mg + H2SO4 -> MgSO4 + H2']),
  R([['Fe', 'HCl'], [], ['FeCl2', 'H2'], 'squeaky_pop', 'Fe + 2HCl -> FeCl2 + H2']),
  R([['Fe', 'H2SO4'], [], ['FeSO4', 'H2'], 'squeaky_pop', 'Fe + H2SO4 -> FeSO4 + H2']),
  R([['Al', 'HCl'], [], ['AlCl3', 'H2'], 'squeaky_pop', '2Al + 6HCl -> 2AlCl3 + 3H2']),
  R([['Al', 'H2SO4'], [], ['Al2SO4', 'H2'], 'squeaky_pop', '2Al + 3H2SO4 -> Al2(SO4)3 + 3H2']),
  R([['Na', 'HCl'], [], ['NaCl', 'H2'], 'squeaky_pop', '2Na + 2HCl -> 2NaCl + H2']),

  // Reactive metal displaces less reactive metal from salt solution
  R([['Fe', 'CuSO4'], [], ['FeSO4', 'Cu'], 'color_clear_blue', 'Fe + CuSO4 -> FeSO4 + Cu']),
  R([['Zn', 'CuSO4'], [], ['ZnSO4', 'Cu'], 'color_clear_blue', 'Zn + CuSO4 -> ZnSO4 + Cu']),
  R([['Al', 'CuSO4'], [], ['Al2SO4', 'Cu'], 'color_clear_blue', '2Al + 3CuSO4 -> Al2(SO4)3 + 3Cu']),
  R([['Zn', 'FeSO4'], [], ['ZnSO4', 'Fe'], 'color_clear_blue', 'Zn + FeSO4 -> ZnSO4 + Fe']),
  R([['Mg', 'ZnSO4'], [], ['MgSO4', 'Zn'], 'precipitate', 'Mg + ZnSO4 -> MgSO4 + Zn']),
  R([['Cu', 'AgNO3'], [], ['CuNO3', 'Ag'], 'precipitate', 'Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag']),
  R([['Zn', 'PbNO3'], [], ['ZnNO3', 'Pb'], 'precipitate', 'Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb']),
  R([['Fe', 'CuCl2'], [], ['FeCl2', 'Cu'], 'color_clear_blue', 'Fe + CuCl2 -> FeCl2 + Cu']),

  // Metal + water -> metal hydroxide + hydrogen
  R([['Na', 'H2O'], [], ['NaOH', 'H2'], 'squeaky_pop', '2Na + 2H2O -> 2NaOH + H2']),
  R([['K', 'H2O'], [], ['KOH', 'H2'], 'squeaky_pop', '2K + 2H2O -> 2KOH + H2']),
  R([['Ca', 'H2O'], [], ['CaOH2', 'H2'], 'squeaky_pop', 'Ca + 2H2O -> Ca(OH)2 + H2']),
  R([['Mg', 'H2O'], ['heat'], ['MgOH2', 'H2'], 'squeaky_pop', 'Mg + 2H2O -> Mg(OH)2 + H2']),
  R([['Fe', 'H2O'], ['heat'], ['Fe3O4', 'H2'], 'green_rust', '3Fe + 4H2O -> Fe3O4 + 4H2']),

  // Metal oxide + acid
  R([['ZnO', 'HCl'], [], ['ZnCl2', 'H2O'], 'heat_light', 'ZnO + 2HCl -> ZnCl2 + H2O']),
  R([['CuO', 'HCl'], [], ['CuCl2', 'H2O'], 'color_clear_blue', 'CuO + 2HCl -> CuCl2 + H2O']),
  R([['CuO', 'H2SO4'], [], ['CuSO4', 'H2O'], 'color_clear_blue', 'CuO + H2SO4 -> CuSO4 + H2O']),
  R([['Fe2O3', 'HCl'], [], ['FeCl3', 'H2O'], 'color_clear_pink', 'Fe2O3 + 6HCl -> 2FeCl3 + 3H2O']),
  R([['MgO', 'HCl'], [], ['MgCl2', 'H2O'], 'heat_light', 'MgO + 2HCl -> MgCl2 + H2O']),
  R([['Al2O3', 'HCl'], [], ['AlCl3', 'H2O'], 'heat_light', 'Al2O3 + 6HCl -> 2AlCl3 + 3H2O']),
  R([['ZnO', 'H2SO4'], [], ['ZnSO4', 'H2O'], 'heat_light', 'ZnO + H2SO4 -> ZnSO4 + H2O']),

  // Non-metal / halogen displacement
  R([['Cl2', 'NaBr'], [], ['NaCl', 'Br2'], 'color_clear_pink', 'Cl2 + 2NaBr -> 2NaCl + Br2']),
  R([['Cl2', 'KI'], [], ['KCl', 'I2'], 'precipitate', 'Cl2 + 2KI -> 2KCl + I2']),
  R([['Br2', 'KI'], [], ['KBr', 'I2'], 'precipitate', 'Br2 + 2KI -> 2KBr + I2']),
  R([['Cl2', 'FeCl2'], [], ['FeCl3'], 'color_clear_pink', 'Cl2 + 2FeCl2 -> 2FeCl3']),
  R([['Cl2', 'H2S'], [], ['HCl', 'S'], 'precipitate_yellow', 'Cl2 + H2S -> 2HCl + S']),
  R([['Cl2', 'H2O'], ['sunlight'], ['HCl', 'O2'], 'bubbling', '2Cl2 + 2H2O -> 4HCl + O2']),
  R([['H2', 'CuO'], ['heat'], ['Cu', 'H2O'], 'black_solid', 'H2 + CuO -> Cu + H2O']),
  R([['C', 'CuO'], ['heat'], ['Cu', 'CO2'], 'colorless_gas', 'C + 2CuO -> 2Cu + CO2']),
  R([['C', 'Fe2O3'], ['heat'], ['Fe', 'CO2'], 'colorless_gas', '3C + 2Fe2O3 -> 4Fe + 3CO2']),
  R([['Mg', 'CO2'], ['heat'], ['MgO', 'C'], 'heat_light', '2Mg + CO2 -> 2MgO + C']),
  R([['Zn', 'CuO'], ['heat'], ['ZnO', 'Cu'], 'black_solid', 'Zn + CuO -> ZnO + Cu']),
];
