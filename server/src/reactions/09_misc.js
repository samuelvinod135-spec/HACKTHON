import { R } from './helper.js';

// Miscellaneous & additional reactions (Class 11/12 named, electrochemical)
export default [
  // Thermit / thermite reaction
  R([['Al', 'Fe2O3'], ['heat'], ['Al2O3', 'Fe'], 'heat_light', '2Al + Fe2O3 -> Al2O3 + 2Fe']),
  R([['Al', 'CuO'], ['heat'], ['Al2O3', 'Cu'], 'heat_light', '2Al + 3CuO -> Al2O3 + 3Cu']),

  // Metallurgy steps
  R([['ZnS', 'O2'], ['heat'], ['ZnO', 'SO2'], 'colorless_gas', '2ZnS + 3O2 -> 2ZnO + 2SO2']),
  R([['ZnO', 'C'], ['heat'], ['Zn', 'CO'], 'colorless_gas', 'ZnO + C -> Zn + CO']),
  R([['Cu2S', 'O2'], ['heat'], ['Cu', 'SO2'], 'colorless_gas', 'Cu2S + O2 -> 2Cu + SO2']),
  R([['Fe2O3', 'CO'], ['heat'], ['Fe', 'CO2'], 'colorless_gas', 'Fe2O3 + 3CO -> 2Fe + 3CO2']),
  R([['PbS', 'O2'], ['heat'], ['PbO', 'SO2'], 'colorless_gas', '2PbS + 3O2 -> 2PbO + 2SO2']),
  R([['PbO', 'C'], ['heat'], ['Pb', 'CO'], 'colorless_gas', 'PbO + C -> Pb + CO']),

  // Electrochemical / batteries (representative)
  R([['Zn', 'CuSO4'], [], ['ZnSO4', 'Cu'], 'color_clear_blue', 'Zn + CuSO4 -> ZnSO4 + Cu']),
  R([['Pb', 'PbO2', 'H2SO4'], ['electricity'], ['PbSO4', 'H2O'], 'heat_light', 'Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O']),

  // Sodium extraction / Down's process
  R([['NaCl'], ['electricity'], ['Na', 'Cl2'], 'colorless_gas', '2NaCl -> 2Na + Cl2']),

  // Aluminium extraction
  R([['Al2O3'], ['electricity'], ['Al', 'O2'], 'heat_light', '2Al2O3 -> 4Al + 3O2']),

  // Mannheim-type / industrial
  R([['NaCl', 'H2SO4'], ['heat'], ['NaHSO4', 'HCl'], 'white_fumes', 'NaCl + H2SO4 -> NaHSO4 + HCl']),
  R([['NaHSO4', 'NaCl'], ['heat'], ['Na2SO4', 'HCl'], 'white_fumes', 'NaHSO4 + NaCl -> Na2SO4 + HCl']),

  // Effervescence / evolution (double-check acid carbonate)
  R([['MgCO3', 'HCl'], [], ['MgCl2', 'H2O', 'CO2'], 'bubbling', 'MgCO3 + 2HCl -> MgCl2 + H2O + CO2']),
  R([['Na2CO3', 'HNO3'], [], ['NaNO3', 'H2O', 'CO2'], 'bubbling', 'Na2CO3 + 2HNO3 -> 2NaNO3 + H2O + CO2']),
  R([['BaCO3', 'HCl'], [], ['BaCl2', 'H2O', 'CO2'], 'bubbling', 'BaCO3 + 2HCl -> BaCl2 + H2O + CO2']),
  R([['CuCO3', 'H2SO4'], [], ['CuSO4', 'H2O', 'CO2'], 'bubbling', 'CuCO3 + H2SO4 -> CuSO4 + H2O + CO2']),

  // Ammonium salt + base -> ammonia (test)
  R([['NH4Cl', 'CaOH2'], ['heat'], ['CaCl2', 'NH3', 'H2O'], 'pungent_gas', '2NH4Cl + Ca(OH)2 -> CaCl2 + 2NH3 + 2H2O']),
  R([['NH4NO3', 'NaOH'], ['heat'], ['NaNO3', 'NH3', 'H2O'], 'pungent_gas', 'NH4NO3 + NaOH -> NaNO3 + NH3 + H2O']),

  // More precipitation
  R([['BaCl2', 'AgNO3'], [], ['AgCl', 'BaNO3'], 'precipitate', 'BaCl2 + 2AgNO3 -> 2AgCl + Ba(NO3)2']),
  R([['NiCl2', 'NaOH'], [], ['NiOH2', 'NaCl'], 'precipitate', 'NiCl2 + 2NaOH -> Ni(OH)2 + 2NaCl']),
  R([['CoCl2', 'NaOH'], [], ['CoOH2', 'NaCl'], 'precipitate_blue', 'CoCl2 + 2NaOH -> Co(OH)2 + 2NaCl']),
  R([['PbNO3', 'Na2CO3'], [], ['PbCO3', 'NaNO3'], 'precipitate', 'Pb(NO3)2 + Na2CO3 -> PbCO3 + 2NaNO3']),
  R([['MgSO4', 'BaCl2'], [], ['BaSO4', 'MgCl2'], 'precipitate', 'MgSO4 + BaCl2 -> BaSO4 + MgCl2']),
  R([['K2SO4', 'BaCl2'], [], ['BaSO4', 'KCl'], 'precipitate', 'K2SO4 + BaCl2 -> BaSO4 + 2KCl']),
  R([['Na2SO4', 'PbNO3'], [], ['PbSO4', 'NaNO3'], 'precipitate', 'Na2SO4 + Pb(NO3)2 -> PbSO4 + 2NaNO3']),
  R([['AgNO3', 'Na2CO3'], [], ['Ag2CO3', 'NaNO3'], 'precipitate', '2AgNO3 + Na2CO3 -> Ag2CO3 + 2NaNO3']),
  R([['ZnSO4', 'BaCl2'], [], ['BaSO4', 'ZnCl2'], 'precipitate', 'ZnSO4 + BaCl2 -> BaSO4 + ZnCl2']),

  // Oxidation states / redox extra
  R([['Fe', 'Cl2'], ['heat'], ['FeCl3'], 'heat_light', '2Fe + 3Cl2 -> 2FeCl3']),
  R([['Cu', 'Cl2'], ['heat'], ['CuCl2'], 'color_clear_blue', 'Cu + Cl2 -> CuCl2']),
  R([['Mg', 'Cl2'], ['heat'], ['MgCl2'], 'white_fumes', 'Mg + Cl2 -> MgCl2']),
  R([['Zn', 'Cl2'], ['heat'], ['ZnCl2'], 'white_fumes', 'Zn + Cl2 -> ZnCl2']),
  R([['Na', 'O2'], [], ['Na2O'], 'heat_light', '4Na + O2 -> 2Na2O']),
];
