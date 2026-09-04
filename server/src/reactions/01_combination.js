import { R } from './helper.js';

// Combination (synthesis) reactions — Class 10/11/12
export default [
  // Metal + Oxygen
  R([['Mg', 'O2'], ['heat'], ['MgO'], 'white_light', '2Mg + O2 -> 2MgO']),
  R([['Na', 'O2'], ['heat'], ['Na2O'], 'heat_light', '4Na + O2 -> 2Na2O']),
  R([['K', 'O2'], ['heat'], ['Na2O'], 'heat_light', '4K + O2 -> 2K2O']),
  R([['Ca', 'O2'], ['heat'], ['CaO'], 'heat_light', '2Ca + O2 -> 2CaO']),
  R([['Zn', 'O2'], ['heat'], ['ZnO'], 'heat_light', '2Zn + O2 -> 2ZnO']),
  R([['Fe', 'O2'], ['heat'], ['Fe2O3'], 'green_rust', '4Fe + 3O2 -> 2Fe2O3']),
  R([['Cu', 'O2'], ['heat'], ['CuO'], 'black_solid', '2Cu + O2 -> 2CuO']),
  R([['Al', 'O2'], ['heat'], ['Al2O3'], 'heat_light', '4Al + 3O2 -> 2Al2O3']),
  R([['C', 'O2'], ['heat'], ['CO2'], 'heat_light', 'C + O2 -> CO2']),
  R([['S', 'O2'], ['heat'], ['SO2'], 'heat_light', 'S + O2 -> SO2']),
  R([['P', 'O2'], ['heat'], ['P2O5'], 'white_light', '4P + 5O2 -> 2P2O5']),
  R([['H2', 'O2'], ['heat'], ['H2O'], 'heat_light', '2H2 + O2 -> 2H2O']),
  R([['N2', 'O2'], ['electricity'], ['NO'], 'colorless_gas', 'N2 + O2 -> 2NO']),

  // Non-metal + Oxygen
  R([['C', 'O2'], ['heat'], ['CO2'], 'heat_light', 'C + O2 -> CO2']),
  R([['N2', 'H2'], ['catalyst', 'pressure'], ['NH3'], 'colorless_gas', 'N2 + 3H2 -> 2NH3']),
  R([['NH3', 'O2'], ['catalyst'], ['NO', 'H2O'], 'brown_gas', '4NH3 + 5O2 -> 4NO + 6H2O']),

  // Metal oxide + water (base formation)
  R([['Na2O', 'H2O'], [], ['NaOH'], 'heat_light', 'Na2O + H2O -> 2NaOH']),
  R([['K2O', 'H2O'], [], ['KOH'], 'heat_light', 'K2O + H2O -> 2KOH']),
  R([['CaO', 'H2O'], [], ['CaOH2'], 'heat_light', 'CaO + H2O -> Ca(OH)2']),
  R([['MgO', 'H2O'], [], ['MgOH2'], 'heat_light', 'MgO + H2O -> Mg(OH)2']),
  R([['BaO', 'H2O'], [], ['BaOH2'], 'heat_light', 'BaO + H2O -> Ba(OH)2']),

  // Non-metal oxide + water (acid formation)
  R([['CO2', 'H2O'], [], ['H2CO3'], 'color_clear_pink', 'CO2 + H2O -> H2CO3']),
  R([['SO2', 'H2O'], [], ['H2SO3'], 'color_clear_pink', 'SO2 + H2O -> H2SO3']),
  R([['SO3', 'H2O'], [], ['H2SO4'], 'color_clear_pink', 'SO3 + H2O -> H2SO4']),
  R([['NO', 'O2'], [], ['NO2'], 'brown_gas', '2NO + O2 -> 2NO2']),
  R([['NO2', 'H2O'], ['oxygen'], ['HNO3', 'NO'], 'brown_gas', '3NO2 + H2O -> 2HNO3 + NO']),
  R([['NO2', 'H2O'], ['oxygen'], ['HNO3'], 'brown_gas', '4NO2 + O2 + 2H2O -> 4HNO3']),
  R([['P2O5', 'H2O'], [], ['H3PO4'], 'color_clear_pink', 'P2O5 + 3H2O -> 2H3PO4']),

  // Salt + water (hydration)
  R([['CuSO4', 'H2O'], [], ['CuSO4·5H2O'], 'blue_to_white', 'CuSO4 + 5H2O -> CuSO4·5H2O']),

  // Combination forming salts
  R([['Na', 'Cl2'], ['heat'], ['NaCl'], 'heat_light', '2Na + Cl2 -> 2NaCl']),
  R([['Fe', 'S'], ['heat'], ['FeS'], 'heat_light', 'Fe + S -> FeS']),
  R([['Ca', 'Cl2'], ['heat'], ['CaCl2'], 'heat_light', 'Ca + Cl2 -> CaCl2']),
  R([['Zn', 'S'], ['heat'], ['ZnS'], 'heat_light', 'Zn + S -> ZnS']),
  R([['Cu', 'S'], ['heat'], ['CuS'], 'black_solid', 'Cu + S -> CuS']),
  R([['Fe', 'Cl2'], ['heat'], ['FeCl3'], 'heat_light', '2Fe + 3Cl2 -> 2FeCl3']),
  R([['Mg', 'Cl2'], ['heat'], ['MgCl2'], 'heat_light', 'Mg + Cl2 -> MgCl2']),
  R([['Al', 'Cl2'], ['heat'], ['AlCl3'], 'heat_light', '2Al + 3Cl2 -> 2AlCl3']),

  // Carbon monoxide further oxidation / carbon chemistry
  R([['CO2', 'C'], ['heat'], ['CO'], 'colorless_gas', 'CO2 + C -> 2CO']),
  R([['Fe2O3', 'CO'], ['heat'], ['Fe', 'CO2'], 'heat_light', 'Fe2O3 + 3CO -> 2Fe + 3CO2']),

  // Ammonia / ammonium combination
  R([['NH3', 'HCl'], [], ['NH4Cl'], 'white_fumes', 'NH3 + HCl -> NH4Cl']),
  R([['NH3', 'H2SO4'], [], ['NH4SO4'], 'white_fumes', '2NH3 + H2SO4 -> (NH4)2SO4']),
  R([['NH3', 'HNO3'], [], ['NH4NO3'], 'white_fumes', 'NH3 + HNO3 -> NH4NO3']),

  // Sulphuric acid manufacturing (Contact process)
  R([['S', 'O2'], ['heat'], ['SO2'], 'colorless_gas', 'S + O2 -> SO2']),
  R([['SO2', 'O2'], ['catalyst'], ['SO3'], 'colorless_gas', '2SO2 + O2 -> 2SO3']),
  R([['SO3', 'H2O'], [], ['H2SO4'], 'color_clear_pink', 'SO3 + H2O -> H2SO4']),

  // Haber / ammonia
  R([['N2', 'H2'], ['catalyst', 'pressure'], ['NH3'], 'colorless_gas', 'N2 + 3H2 -> 2NH3']),

  // Phosphorus / halogen combinations
  R([['P', 'Cl2'], ['heat'], ['PCl3'], 'white_fumes', '2P + 3Cl2 -> 2PCl3']),
];
