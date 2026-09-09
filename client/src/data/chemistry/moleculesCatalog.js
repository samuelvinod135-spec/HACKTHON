// Master Molecules Catalog (65 Key Organic & Inorganic Molecules)
// Features IUPAC names, formulas, SMILES, molecular weights, geometries, hybridizations, functional groups, and 2D chemical colors.

export const MOLECULES_CATALOG = [
  {
    "id": "mol_water",
    "name": "Water (Oxidane)",
    "formula": "H2O",
    "iupacName": "Oxidane",
    "commonName": "Water",
    "molecularWeight": 18.015,
    "geometry": "Bent (104.5°)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Hydroxyl"
    ],
    "category": "Inorganic Solvent",
    "color": "#38bdf8",
    "smiles": "O",
    "desc": "Universal polar solvent with high dielectric constant and hydrogen bonding network."
  },
  {
    "id": "mol_ammonia",
    "name": "Ammonia",
    "formula": "NH3",
    "iupacName": "Azane",
    "commonName": "Ammonia",
    "molecularWeight": 17.031,
    "geometry": "Trigonal Pyramidal (107.8°)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Amine"
    ],
    "category": "Inorganic Base",
    "color": "#60a5fa",
    "smiles": "N",
    "desc": "Lewis base and classical neutral ligand in transition metal complexes."
  },
  {
    "id": "mol_hcl",
    "name": "Hydrogen Chloride",
    "formula": "HCl",
    "iupacName": "Chlorane",
    "commonName": "Hydrochloric Acid Gas",
    "molecularWeight": 36.458,
    "geometry": "Linear",
    "hybridization": "Unpaired/Pure p",
    "functionalGroups": [
      "Hydrogen Halide"
    ],
    "category": "Inorganic Acid",
    "color": "#f87171",
    "smiles": "Cl",
    "desc": "Strong mineral acid that completely dissociates in water to H3O+ and Cl-."
  },
  {
    "id": "mol_h2so4",
    "name": "Sulphuric Acid",
    "formula": "H2SO4",
    "iupacName": "Sulfuric acid",
    "commonName": "Oil of Vitriol",
    "molecularWeight": 98.079,
    "geometry": "Tetrahedral around S",
    "hybridization": "sp³d² / sp³",
    "functionalGroups": [
      "Sulphonic/Sulphate"
    ],
    "category": "Inorganic Acid",
    "color": "#fb923c",
    "smiles": "OS(=O)(=O)O",
    "desc": "King of chemicals; powerful dehydrating agent, non-volatile diprotic acid, and industrial catalyst."
  },
  {
    "id": "mol_hno3",
    "name": "Nitric Acid",
    "formula": "HNO3",
    "iupacName": "Nitric acid",
    "commonName": "Aqua Fortis",
    "molecularWeight": 63.012,
    "geometry": "Trigonal Planar around N",
    "hybridization": "sp²",
    "functionalGroups": [
      "Nitro/Nitrate"
    ],
    "category": "Inorganic Acid",
    "color": "#f43f5e",
    "smiles": "O[N+](=O)[O-]",
    "desc": "Strong monoprotic acid and vigorous oxidizing agent used in nitration and aqua regia."
  },
  {
    "id": "mol_co2",
    "name": "Carbon Dioxide",
    "formula": "CO2",
    "iupacName": "Carbon dioxide",
    "commonName": "Dry Ice (solid)",
    "molecularWeight": 44.01,
    "geometry": "Linear (180°)",
    "hybridization": "sp",
    "functionalGroups": [
      "Carbonyl Oxide"
    ],
    "category": "Inorganic Gas",
    "color": "#94a3b8",
    "smiles": "O=C=O",
    "desc": "Non-polar linear molecule with polar C=O bonds whose dipole moments cancel."
  },
  {
    "id": "mol_h2o2",
    "name": "Hydrogen Peroxide",
    "formula": "H2O2",
    "iupacName": "Dioxidane",
    "commonName": "Hydrogen Peroxide",
    "molecularWeight": 34.014,
    "geometry": "Open book / non-planar (111.5°)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Peroxide (-O-O-)"
    ],
    "category": "Inorganic Oxidizer",
    "color": "#38bdf8",
    "smiles": "OO",
    "desc": "Antiseptic, eco-friendly bleaching agent, and strong oxidizer with unstable O-O peroxy bond."
  },
  {
    "id": "mol_so2",
    "name": "Sulphur Dioxide",
    "formula": "SO2",
    "iupacName": "Sulfur dioxide",
    "commonName": "Sulphur Dioxide",
    "molecularWeight": 64.066,
    "geometry": "Bent (119°)",
    "hybridization": "sp²",
    "functionalGroups": [
      "Sulphite"
    ],
    "category": "Inorganic Gas",
    "color": "#facc15",
    "smiles": "O=S=O",
    "desc": "Pungent suffocating gas with strong reducing properties in moist environments."
  },
  {
    "id": "mol_chcl3",
    "name": "Chloroform (Trichloromethane)",
    "formula": "CHCl3",
    "iupacName": "Trichloromethane",
    "commonName": "Chloroform",
    "molecularWeight": 119.38,
    "geometry": "Tetrahedral",
    "hybridization": "sp³",
    "functionalGroups": [
      "Trihalomethane"
    ],
    "category": "Organic Solvent",
    "color": "#a78bfa",
    "smiles": "ClC(Cl)Cl",
    "desc": "Dense non-flammable organic solvent; undergoes Carbylamine reaction and photo-oxidizes to phosgene."
  },
  {
    "id": "mol_ccl4",
    "name": "Carbon Tetrachloride",
    "formula": "CCl4",
    "iupacName": "Tetrachloromethane",
    "commonName": "Carbon Tet",
    "molecularWeight": 153.82,
    "geometry": "Regular Tetrahedral (109.5°)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Polyhalide"
    ],
    "category": "Organic Solvent",
    "color": "#64748b",
    "smiles": "ClC(Cl)(Cl)Cl",
    "desc": "Symmetrical non-polar solvent with zero dipole moment; historically used as fire extinguisher (Pyrene)."
  },
  {
    "id": "mol_methane",
    "name": "Methane",
    "formula": "CH4",
    "iupacName": "Methane",
    "commonName": "Marsh Gas / Natural Gas",
    "molecularWeight": 16.043,
    "geometry": "Tetrahedral (109.5°)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Alkane"
    ],
    "category": "Alkanes",
    "color": "#10b981",
    "smiles": "C",
    "desc": "Simplest alkane; major component of compressed natural gas (CNG) and biogas."
  },
  {
    "id": "mol_ethane",
    "name": "Ethane",
    "formula": "C2H6",
    "iupacName": "Ethane",
    "commonName": "Ethane",
    "molecularWeight": 30.07,
    "geometry": "Tetrahedral carbons",
    "hybridization": "sp³",
    "functionalGroups": [
      "Alkane"
    ],
    "category": "Alkanes",
    "color": "#10b981",
    "smiles": "CC",
    "desc": "Exhibits staggered and eclipsed conformers with a 12.5 kJ/mol torsional barrier."
  },
  {
    "id": "mol_propane",
    "name": "Propane",
    "formula": "C3H8",
    "iupacName": "Propane",
    "commonName": "LPG component",
    "molecularWeight": 44.097,
    "geometry": "Tetrahedral carbons",
    "hybridization": "sp³",
    "functionalGroups": [
      "Alkane"
    ],
    "category": "Alkanes",
    "color": "#10b981",
    "smiles": "CCC",
    "desc": "Liquefied petroleum gas fuel, undergoes free radical halogenation at 1° and 2° positions."
  },
  {
    "id": "mol_butane",
    "name": "n-Butane",
    "formula": "C4H10",
    "iupacName": "Butane",
    "commonName": "Butane",
    "molecularWeight": 58.124,
    "geometry": "Tetrahedral carbons (zigzag chain)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Alkane"
    ],
    "category": "Alkanes",
    "color": "#10b981",
    "smiles": "CCCC",
    "desc": "Constituent of domestic LPG cylinders; four conformers (anti, gauche, eclipsed, fully eclipsed)."
  },
  {
    "id": "mol_isobutane",
    "name": "Isobutane (2-Methylpropane)",
    "formula": "C4H10",
    "iupacName": "2-Methylpropane",
    "commonName": "Isobutane",
    "molecularWeight": 58.124,
    "geometry": "Branched tetrahedral",
    "hybridization": "sp³",
    "functionalGroups": [
      "Alkane"
    ],
    "category": "Alkanes",
    "color": "#10b981",
    "smiles": "CC(C)C",
    "desc": "Chain isomer of butane containing a tertiary C-H bond that undergoes rapid radical bromination."
  },
  {
    "id": "mol_ethene",
    "name": "Ethene (Ethylene)",
    "formula": "C2H4",
    "iupacName": "Ethene",
    "commonName": "Ethylene",
    "molecularWeight": 28.054,
    "geometry": "Planar (120°)",
    "hybridization": "sp²",
    "functionalGroups": [
      "Alkene (C=C)"
    ],
    "category": "Alkenes",
    "color": "#22c55e",
    "smiles": "C=C",
    "desc": "Industrial precursor to polyethylene; acts as natural plant ripening hormone."
  },
  {
    "id": "mol_propene",
    "name": "Propene (Propylene)",
    "formula": "C3H6",
    "iupacName": "Propene",
    "commonName": "Propylene",
    "molecularWeight": 42.081,
    "geometry": "Planar alkene center",
    "hybridization": "sp² / sp³",
    "functionalGroups": [
      "Alkene (C=C)"
    ],
    "category": "Alkenes",
    "color": "#22c55e",
    "smiles": "CC=C",
    "desc": "Asymmetric alkene obeying Markownikoff rule during electrophilic HX additions."
  },
  {
    "id": "mol_ethyne",
    "name": "Ethyne (Acetylene)",
    "formula": "C2H2",
    "iupacName": "Ethyne",
    "commonName": "Acetylene",
    "molecularWeight": 26.038,
    "geometry": "Linear (180°)",
    "hybridization": "sp",
    "functionalGroups": [
      "Alkyne (C#C)"
    ],
    "category": "Alkynes",
    "color": "#84cc16",
    "smiles": "C#C",
    "desc": "Acidic sp-hybridized terminal hydrogen atoms; forms red copper acetylide and silver acetylide."
  },
  {
    "id": "mol_propyne",
    "name": "Propyne (Methylacetylene)",
    "formula": "C3H4",
    "iupacName": "Propyne",
    "commonName": "Methylacetylene",
    "molecularWeight": 40.065,
    "geometry": "Linear alkyne with tetrahedral methyl",
    "hybridization": "sp / sp³",
    "functionalGroups": [
      "Alkyne (C#C)"
    ],
    "category": "Alkynes",
    "color": "#84cc16",
    "smiles": "CC#C",
    "desc": "Terminal alkyne; reacts with ammoniacal cuprous chloride and Tollen reagent."
  },
  {
    "id": "mol_cyclohexane",
    "name": "Cyclohexane",
    "formula": "C6H12",
    "iupacName": "Cyclohexane",
    "commonName": "Hexamethylene",
    "molecularWeight": 84.162,
    "geometry": "Chair conformation (pucker)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Cycloalkane"
    ],
    "category": "Cycloalkanes",
    "color": "#14b8a6",
    "smiles": "C1CCCCC1",
    "desc": "Strain-free alicyclic hydrocarbon; chair conformation has axial and equatorial C-H bonds."
  },
  {
    "id": "mol_benzene",
    "name": "Benzene",
    "formula": "C6H6",
    "iupacName": "Benzene",
    "commonName": "Benzol",
    "molecularWeight": 78.114,
    "geometry": "Planar hexagonal ring (120°)",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aromatic (6π)"
    ],
    "category": "Aromatics",
    "color": "#06b6d4",
    "smiles": "c1ccccc1",
    "desc": "Prototypical aromatic system with delocalized pi sextet obeying Huckel (4n+2) rule; resonance energy 150.6 kJ/mol."
  },
  {
    "id": "mol_toluene",
    "name": "Toluene (Methylbenzene)",
    "formula": "C7H8",
    "iupacName": "Methylbenzene",
    "commonName": "Toluene",
    "molecularWeight": 92.141,
    "geometry": "Planar ring with tetrahedral methyl",
    "hybridization": "sp² / sp³",
    "functionalGroups": [
      "Arene",
      "Alkyl"
    ],
    "category": "Aromatics",
    "color": "#06b6d4",
    "smiles": "Cc1ccccc1",
    "desc": "Ortho/para-directing activating ring; undergoes side-chain halogenation or ring nitration to TNT."
  },
  {
    "id": "mol_naphthalene",
    "name": "Naphthalene",
    "formula": "C10H8",
    "iupacName": "Naphthalene",
    "commonName": "Mothball Chemical",
    "molecularWeight": 128.174,
    "geometry": "Planar fused bicyclic ring",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aromatic (10π)"
    ],
    "category": "Aromatics",
    "color": "#06b6d4",
    "smiles": "c1ccc2ccccc2c1",
    "desc": "Bicyclic aromatic hydrocarbon; undergoes facile sublimation and electrophilic substitution at alpha-position."
  },
  {
    "id": "mol_anthracene",
    "name": "Anthracene",
    "formula": "C14H10",
    "iupacName": "Anthracene",
    "commonName": "Anthracene",
    "molecularWeight": 178.234,
    "geometry": "Planar tricyclic fused ring",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aromatic (14π)"
    ],
    "category": "Aromatics",
    "color": "#06b6d4",
    "smiles": "c1ccc2cc3ccccc3cc2c1",
    "desc": "Linear tricyclic aromatic arene; reactive at 9,10 meso positions towards Diels-Alder and oxidation."
  },
  {
    "id": "mol_biphenyl",
    "name": "Biphenyl",
    "formula": "C12H10",
    "iupacName": "1,1'-Biphenyl",
    "commonName": "Diphenyl",
    "molecularWeight": 154.212,
    "geometry": "Twisted biaryl (~44° in solution)",
    "hybridization": "sp²",
    "functionalGroups": [
      "Biaryl Aromatic"
    ],
    "category": "Aromatics",
    "color": "#06b6d4",
    "smiles": "c1ccc(cc1)-c2ccccc2",
    "desc": "Directly linked phenyl rings; model compound for sterically hindered atropisomerism."
  },
  {
    "id": "mol_styrene",
    "name": "Styrene (Ethenylbenzene)",
    "formula": "C8H8",
    "iupacName": "Phenylethene",
    "commonName": "Styrene monomer",
    "molecularWeight": 104.152,
    "geometry": "Planar conjugated system",
    "hybridization": "sp²",
    "functionalGroups": [
      "Vinyl",
      "Phenyl"
    ],
    "category": "Aromatics",
    "color": "#06b6d4",
    "smiles": "C=Cc1ccccc1",
    "desc": "Monomer for polystyrene production; vinyl pi bond conjugates directly with benzene ring."
  },
  {
    "id": "mol_chlorobenzene",
    "name": "Chlorobenzene",
    "formula": "C6H5Cl",
    "iupacName": "Chlorobenzene",
    "commonName": "Phenyl Chloride",
    "molecularWeight": 112.557,
    "geometry": "Planar ring",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aryl Halide"
    ],
    "category": "Haloarenes",
    "color": "#3b82f6",
    "smiles": "Clc1ccccc1",
    "desc": "Low reactivity in nucleophilic substitution due to partial double bond character of C-Cl bond from resonance."
  },
  {
    "id": "mol_bromobenzene",
    "name": "Bromobenzene",
    "formula": "C6H5Br",
    "iupacName": "Bromobenzene",
    "commonName": "Phenyl Bromide",
    "molecularWeight": 157.01,
    "geometry": "Planar ring",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aryl Halide"
    ],
    "category": "Haloarenes",
    "color": "#3b82f6",
    "smiles": "Brc1ccccc1",
    "desc": "Synthesizes phenylmagnesium bromide (Grignard reagent) on reaction with magnesium in dry ether."
  },
  {
    "id": "mol_methanol",
    "name": "Methanol (Methyl Alcohol)",
    "formula": "CH3OH",
    "iupacName": "Methanol",
    "commonName": "Wood Spirit",
    "molecularWeight": 32.042,
    "geometry": "Tetrahedral carbon, bent oxygen",
    "hybridization": "sp³",
    "functionalGroups": [
      "Alcohol (-OH)"
    ],
    "category": "Alcohols",
    "color": "#10b981",
    "smiles": "CO",
    "desc": "Simplest alcohol; toxic upon ingestion due to enzymatic oxidation into formaldehyde and formic acid."
  },
  {
    "id": "mol_ethanol",
    "name": "Ethanol (Ethyl Alcohol)",
    "formula": "C2H5OH",
    "iupacName": "Ethanol",
    "commonName": "Grain Alcohol",
    "molecularWeight": 46.069,
    "geometry": "Tetrahedral carbons, bent oxygen",
    "hybridization": "sp³",
    "functionalGroups": [
      "Alcohol (-OH)"
    ],
    "category": "Alcohols",
    "color": "#10b981",
    "smiles": "CCO",
    "desc": "Primary aliphatic alcohol, infinitely miscible in water, gives positive Iodoform test."
  },
  {
    "id": "mol_isopropanol",
    "name": "Isopropanol (Propan-2-ol)",
    "formula": "C3H8O",
    "iupacName": "Propan-2-ol",
    "commonName": "Rubbing Alcohol",
    "molecularWeight": 60.096,
    "geometry": "Tetrahedral carbons, bent oxygen",
    "hybridization": "sp³",
    "functionalGroups": [
      "Secondary Alcohol"
    ],
    "category": "Alcohols",
    "color": "#10b981",
    "smiles": "CC(C)O",
    "desc": "Secondary alcohol; oxidized cleanly to acetone by Jones reagent or hot Cu at 573 K."
  },
  {
    "id": "mol_tert_butanol",
    "name": "tert-Butanol (2-Methylpropan-2-ol)",
    "formula": "C4H10O",
    "iupacName": "2-Methylpropan-2-ol",
    "commonName": "tert-Butyl Alcohol",
    "molecularWeight": 74.123,
    "geometry": "Bulky tetrahedral carbon",
    "hybridization": "sp³",
    "functionalGroups": [
      "Tertiary Alcohol"
    ],
    "category": "Alcohols",
    "color": "#10b981",
    "smiles": "CC(C)(C)O",
    "desc": "Tertiary alcohol; resists mild oxidation and undergoes instant turbidity with Lucas reagent."
  },
  {
    "id": "mol_ethylene_glycol",
    "name": "Ethylene Glycol (Ethane-1,2-diol)",
    "formula": "C2H6O2",
    "iupacName": "Ethane-1,2-diol",
    "commonName": "Glycol / Antifreeze",
    "molecularWeight": 62.068,
    "geometry": "Gauche conformer with intramol. H-bond",
    "hybridization": "sp³",
    "functionalGroups": [
      "Vicinal Diol"
    ],
    "category": "Alcohols",
    "color": "#10b981",
    "smiles": "OCCO",
    "desc": "Automobile engine coolant / antifreeze; lowers freezing point and raises boiling point of radiator water."
  },
  {
    "id": "mol_glycerol",
    "name": "Glycerol (Propane-1,2,3-triol)",
    "formula": "C3H8O3",
    "iupacName": "Propane-1,2,3-triol",
    "commonName": "Glycerine",
    "molecularWeight": 92.094,
    "geometry": "Viscous hydrogen bonded chain",
    "hybridization": "sp³",
    "functionalGroups": [
      "Triol"
    ],
    "category": "Alcohols",
    "color": "#10b981",
    "smiles": "OCC(O)CO",
    "desc": "Viscous trihydric alcohol obtained as major byproduct during saponification of vegetable oils."
  },
  {
    "id": "mol_phenol",
    "name": "Phenol (Carbolic Acid)",
    "formula": "C6H5OH",
    "iupacName": "Phenol",
    "commonName": "Carbolic Acid",
    "molecularWeight": 94.113,
    "geometry": "Planar ring with sp2-bonded oxygen",
    "hybridization": "sp²",
    "functionalGroups": [
      "Phenolic (-OH)"
    ],
    "category": "Phenols",
    "color": "#eab308",
    "smiles": "Oc1ccccc1",
    "desc": "More acidic than alcohols (pKa 10) due to phenoxide resonance stabilization; turns neutral FeCl3 violet."
  },
  {
    "id": "mol_o_cresol",
    "name": "o-Cresol (2-Methylphenol)",
    "formula": "C7H8O",
    "iupacName": "2-Methylphenol",
    "commonName": "ortho-Cresol",
    "molecularWeight": 108.14,
    "geometry": "Planar aromatic",
    "hybridization": "sp²",
    "functionalGroups": [
      "Phenol",
      "Methyl"
    ],
    "category": "Phenols",
    "color": "#eab308",
    "smiles": "Cc1ccccc1O",
    "desc": "Antiseptic disinfectant isomer found in coal tar creosote."
  },
  {
    "id": "mol_picric_acid",
    "name": "Picric Acid (2,4,6-Trinitrophenol)",
    "formula": "C6H3N3O7",
    "iupacName": "2,4,6-Trinitrophenol",
    "commonName": "Picric Acid",
    "molecularWeight": 229.104,
    "geometry": "Planar polynitro aromatic",
    "hybridization": "sp²",
    "functionalGroups": [
      "Phenol",
      "Trinitro"
    ],
    "category": "Phenols",
    "color": "#eab308",
    "smiles": "Oc1c(cc(cc1[N+](=O)[O-])[N+](=O)[O-])[N+](=O)[O-]",
    "desc": "Strongly acidic organic compound (pKa 0.38, comparable to mineral acids) due to three -M nitro groups."
  },
  {
    "id": "mol_diethyl_ether",
    "name": "Diethyl Ether (Ethoxyethane)",
    "formula": "C4H10O",
    "iupacName": "Ethoxyethane",
    "commonName": "Ether / Sulphuric Ether",
    "molecularWeight": 74.123,
    "geometry": "Bent C-O-C bond angle (111.7°)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Ether (-O-)"
    ],
    "category": "Ethers",
    "color": "#8b5cf6",
    "smiles": "CCOCC",
    "desc": "Highly volatile, flammable anaesthetic; inert aprotic solvent for Grignard and organometallic reactions."
  },
  {
    "id": "mol_anisole",
    "name": "Anisole (Methoxybenzene)",
    "formula": "C7H8O",
    "iupacName": "Methoxybenzene",
    "commonName": "Anisole",
    "molecularWeight": 108.14,
    "geometry": "Planar ring with methoxy group",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aromatic Ether"
    ],
    "category": "Ethers",
    "color": "#8b5cf6",
    "smiles": "COc1ccccc1",
    "desc": "Methoxy lone pairs donate into benzene ring by resonance (+R effect), directing EAS to ortho and para positions."
  },
  {
    "id": "mol_thf",
    "name": "Tetrahydrofuran (THF)",
    "formula": "C4H8O",
    "iupacName": "Oxolane",
    "commonName": "THF",
    "molecularWeight": 72.107,
    "geometry": "Envelope conformational ring",
    "hybridization": "sp³",
    "functionalGroups": [
      "Cyclic Ether"
    ],
    "category": "Ethers",
    "color": "#8b5cf6",
    "smiles": "C1CCOC1",
    "desc": "Polar aprotic cyclic ether; coordinates strongly with Lewis acids and organoboranes."
  },
  {
    "id": "mol_formaldehyde",
    "name": "Formaldehyde (Methanal)",
    "formula": "HCHO",
    "iupacName": "Methanal",
    "commonName": "Formalin (40% aq)",
    "molecularWeight": 30.026,
    "geometry": "Trigonal Planar (120°)",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aldehyde (-CHO)"
    ],
    "category": "Aldehydes",
    "color": "#f97316",
    "smiles": "C=O",
    "desc": "Simplest aldehyde; gas that dissolves in water to form formalin; undergoes Cannizzaro reaction."
  },
  {
    "id": "mol_acetaldehyde",
    "name": "Acetaldehyde (Ethanal)",
    "formula": "CH3CHO",
    "iupacName": "Ethanal",
    "commonName": "Acetaldehyde",
    "molecularWeight": 44.053,
    "geometry": "Planar carbonyl carbon",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aldehyde (-CHO)"
    ],
    "category": "Aldehydes",
    "color": "#f97316",
    "smiles": "CC=O",
    "desc": "Undergoes aldol condensation, Tollen silver mirror test, Fehling test, and positive iodoform test."
  },
  {
    "id": "mol_benzaldehyde",
    "name": "Benzaldehyde",
    "formula": "C6H5CHO",
    "iupacName": "Benzaldehyde",
    "commonName": "Oil of Bitter Almonds",
    "molecularWeight": 106.124,
    "geometry": "Planar conjugated system",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aromatic Aldehyde"
    ],
    "category": "Aldehydes",
    "color": "#f97316",
    "smiles": "O=Cc1ccccc1",
    "desc": "Lacks alpha-hydrogen, undergoes Cannizzaro reaction and Benzoin condensation."
  },
  {
    "id": "mol_cinnamaldehyde",
    "name": "Cinnamaldehyde",
    "formula": "C9H8O",
    "iupacName": "3-Phenylprop-2-enal",
    "commonName": "Cinnamon Oil",
    "molecularWeight": 132.162,
    "geometry": "Trans-conjugated enal",
    "hybridization": "sp²",
    "functionalGroups": [
      "α,β-Unsaturated Aldehyde"
    ],
    "category": "Aldehydes",
    "color": "#f97316",
    "smiles": "O=CC=Cc1ccccc1",
    "desc": "Naturally occurring flavor compound responsible for the scent and flavor of cinnamon."
  },
  {
    "id": "mol_acetone",
    "name": "Acetone (Propan-2-one)",
    "formula": "CH3COCH3",
    "iupacName": "Propan-2-one",
    "commonName": "Dimethyl Ketone",
    "molecularWeight": 58.08,
    "geometry": "Trigonal Planar carbonyl",
    "hybridization": "sp²",
    "functionalGroups": [
      "Ketone (>C=O)"
    ],
    "category": "Ketones",
    "color": "#ec4899",
    "smiles": "CC(=O)C",
    "desc": "Simplest ketone; versatile polar aprotic solvent, gives positive Iodoform and 2,4-DNP tests."
  },
  {
    "id": "mol_acetophenone",
    "name": "Acetophenone",
    "formula": "C6H5COCH3",
    "iupacName": "1-Phenylethan-1-one",
    "commonName": "Methyl Phenyl Ketone",
    "molecularWeight": 120.151,
    "geometry": "Conjugated aromatic carbonyl",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aromatic Methyl Ketone"
    ],
    "category": "Ketones",
    "color": "#ec4899",
    "smiles": "CC(=O)c1ccccc1",
    "desc": "Methyl ketone giving positive iodoform test and synthesized via Friedel-Crafts acylation of benzene."
  },
  {
    "id": "mol_benzophenone",
    "name": "Benzophenone",
    "formula": "C13H10O",
    "iupacName": "Diphenylmethanone",
    "commonName": "Diphenyl Ketone",
    "molecularWeight": 182.222,
    "geometry": "Non-coplanar twisted biaryl ketone",
    "hybridization": "sp²",
    "functionalGroups": [
      "Diaryl Ketone"
    ],
    "category": "Ketones",
    "color": "#ec4899",
    "smiles": "O=C(c1ccccc1)c2ccccc2",
    "desc": "Photoinitiator and sunscreen UV-absorber; resists Fehling, Tollen, and Iodoform reactions."
  },
  {
    "id": "mol_cyclohexanone",
    "name": "Cyclohexanone",
    "formula": "C6H10O",
    "iupacName": "Cyclohexanone",
    "commonName": "Pimelic Ketone",
    "molecularWeight": 98.145,
    "geometry": "Chair with sp2 carbonyl",
    "hybridization": "sp²",
    "functionalGroups": [
      "Cyclic Ketone"
    ],
    "category": "Ketones",
    "color": "#ec4899",
    "smiles": "O=C1CCCCC1",
    "desc": "Key industrial intermediate for Nylon-6 synthesis via conversion to cyclohexanone oxime and caprolactam."
  },
  {
    "id": "mol_formic_acid",
    "name": "Formic Acid (Methanoic Acid)",
    "formula": "HCOOH",
    "iupacName": "Methanoic acid",
    "commonName": "Formic Acid",
    "molecularWeight": 46.025,
    "geometry": "Planar carboxyl group",
    "hybridization": "sp²",
    "functionalGroups": [
      "Carboxylic Acid",
      "Aldehydic H-C=O"
    ],
    "category": "Carboxylic Acids",
    "color": "#f59e0b",
    "smiles": "C(=O)O",
    "desc": "Present in ant venom; unique among carboxylic acids in acting as a reducing agent (reduces Tollen reagent)."
  },
  {
    "id": "mol_acetic_acid",
    "name": "Acetic Acid (Ethanoic Acid)",
    "formula": "CH3COOH",
    "iupacName": "Ethanoic acid",
    "commonName": "Vinegar",
    "molecularWeight": 60.052,
    "geometry": "Planar carboxyl carbon",
    "hybridization": "sp²",
    "functionalGroups": [
      "Carboxylic Acid"
    ],
    "category": "Carboxylic Acids",
    "color": "#f59e0b",
    "smiles": "CC(=O)O",
    "desc": "Weak carboxylic acid; dimerizes in non-polar solvents via two strong intermolecular hydrogen bonds."
  },
  {
    "id": "mol_benzoic_acid",
    "name": "Benzoic Acid",
    "formula": "C6H5COOH",
    "iupacName": "Benzoic acid",
    "commonName": "Dracylic Acid",
    "molecularWeight": 122.123,
    "geometry": "Planar conjugated ring-carboxyl",
    "hybridization": "sp²",
    "functionalGroups": [
      "Aromatic Carboxylic Acid"
    ],
    "category": "Carboxylic Acids",
    "color": "#f59e0b",
    "smiles": "O=C(O)c1ccccc1",
    "desc": "White crystalline solid, food preservative (sodium benzoate precursor); meta-directing in EAS."
  },
  {
    "id": "mol_salicylic_acid",
    "name": "Salicylic Acid",
    "formula": "C7H6O3",
    "iupacName": "2-Hydroxybenzoic acid",
    "commonName": "Salicylic Acid",
    "molecularWeight": 138.122,
    "geometry": "Planar with intramol. H-bond",
    "hybridization": "sp²",
    "functionalGroups": [
      "Carboxylic Acid",
      "Phenolic -OH"
    ],
    "category": "Carboxylic Acids",
    "color": "#f59e0b",
    "smiles": "O=C(O)c1ccccc1O",
    "desc": "Precursor to Aspirin; intramolecular hydrogen bonding increases acidity compared to benzoic acid."
  },
  {
    "id": "mol_oxalic_acid",
    "name": "Oxalic Acid",
    "formula": "H2C2O4",
    "iupacName": "Ethanedioic acid",
    "commonName": "Oxalic Acid",
    "molecularWeight": 90.034,
    "geometry": "Planar dicarboxylic acid",
    "hybridization": "sp²",
    "functionalGroups": [
      "Dicarboxylic Acid"
    ],
    "category": "Carboxylic Acids",
    "color": "#f59e0b",
    "smiles": "O=C(O)C(=O)O",
    "desc": "Primary volumetric standard; quantitative reducing agent against acidified KMnO4 at 60°C."
  },
  {
    "id": "mol_ethyl_acetate",
    "name": "Ethyl Acetate",
    "formula": "CH3COOC2H5",
    "iupacName": "Ethyl ethanoate",
    "commonName": "Acetic Ether",
    "molecularWeight": 88.106,
    "geometry": "Trigonal planar ester carbon",
    "hybridization": "sp²",
    "functionalGroups": [
      "Ester (-COO-)"
    ],
    "category": "Esters",
    "color": "#d97706",
    "smiles": "CCOC(=O)C",
    "desc": "Pleasant fruity odor; volatile solvent for cellulose nitrate, varnishes, and decaffeination."
  },
  {
    "id": "mol_acetyl_chloride",
    "name": "Acetyl Chloride",
    "formula": "CH3COCl",
    "iupacName": "Ethanoyl chloride",
    "commonName": "Acetyl Chloride",
    "molecularWeight": 78.498,
    "geometry": "Planar carbonyl",
    "hybridization": "sp²",
    "functionalGroups": [
      "Acyl Halide (-COCl)"
    ],
    "category": "Acid Derivatives",
    "color": "#ef4444",
    "smiles": "CC(=O)Cl",
    "desc": "Highly reactive acetylating reagent; hydrolyzes vigorously with moisture releasing white HCl fumes."
  },
  {
    "id": "mol_acetic_anhydride",
    "name": "Acetic Anhydride",
    "formula": "(CH3CO)2O",
    "iupacName": "Ethanoic anhydride",
    "commonName": "Acetic Anhydride",
    "molecularWeight": 102.089,
    "geometry": "V-shaped C-O-C anhydride bridge",
    "hybridization": "sp²",
    "functionalGroups": [
      "Acid Anhydride"
    ],
    "category": "Acid Derivatives",
    "color": "#ef4444",
    "smiles": "CC(=O)OC(=O)C",
    "desc": "Standard industrial acetylation reagent for preparing Aspirin, cellulose acetate, and acetanilide."
  },
  {
    "id": "mol_methylamine",
    "name": "Methylamine",
    "formula": "CH3NH2",
    "iupacName": "Methanamine",
    "commonName": "Monomethylamine",
    "molecularWeight": 31.057,
    "geometry": "Pyramidal nitrogen (106°)",
    "hybridization": "sp³",
    "functionalGroups": [
      "Primary Amine (-NH2)"
    ],
    "category": "Amines",
    "color": "#8b5cf6",
    "smiles": "CN",
    "desc": "Fishy smelling alkaline gas; more basic than ammonia due to +I inductive electron release of methyl group."
  },
  {
    "id": "mol_ethylamine",
    "name": "Ethylamine",
    "formula": "C2H5NH2",
    "iupacName": "Ethanamine",
    "commonName": "Ethylamine",
    "molecularWeight": 45.084,
    "geometry": "Pyramidal nitrogen",
    "hybridization": "sp³",
    "functionalGroups": [
      "Primary Amine (-NH2)"
    ],
    "category": "Amines",
    "color": "#8b5cf6",
    "smiles": "CCN",
    "desc": "Water-soluble aliphatic amine; undergoes Carbylamine test and reacts with HNO2 evolving N2 gas quantitatively."
  },
  {
    "id": "mol_aniline",
    "name": "Aniline (Benzenamine)",
    "formula": "C6H5NH2",
    "iupacName": "Benzenamine",
    "commonName": "Aminobenzene",
    "molecularWeight": 93.129,
    "geometry": "Partially planarized nitrogen (~39° inversion barrier)",
    "hybridization": "sp²",
    "functionalGroups": [
      "Primary Aromatic Amine"
    ],
    "category": "Amines",
    "color": "#8b5cf6",
    "smiles": "Nc1ccccc1",
    "desc": "Weaker base than aliphatic amines due to lone pair resonance into benzene ring; diazotizes at 0-5°C."
  },
  {
    "id": "mol_acetamide",
    "name": "Acetamide",
    "formula": "CH3CONH2",
    "iupacName": "Ethanamide",
    "commonName": "Acetamide",
    "molecularWeight": 59.068,
    "geometry": "Planar amide system (resonance)",
    "hybridization": "sp²",
    "functionalGroups": [
      "Amide (-CONH2)"
    ],
    "category": "Amides",
    "color": "#a855f7",
    "smiles": "CC(=O)N",
    "desc": "Planar amide with restricted C-N bond rotation (partial double bond character); undergoes Hofmann bromamide reaction."
  },
  {
    "id": "mol_nitrobenzene",
    "name": "Nitrobenzene",
    "formula": "C6H5NO2",
    "iupacName": "Nitrobenzene",
    "commonName": "Oil of Mirbane",
    "molecularWeight": 123.111,
    "geometry": "Planar nitro-phenyl conjugation",
    "hybridization": "sp²",
    "functionalGroups": [
      "Nitro (-NO2)"
    ],
    "category": "Nitro Compounds",
    "color": "#f43f5e",
    "smiles": "O=[N+]([O-])c1ccccc1",
    "desc": "Almond scented dense pale yellow oil; reduced by Fe/HCl to aniline and by Zn/NH4Cl to phenylhydroxylamine."
  },
  {
    "id": "mol_urea",
    "name": "Urea (Carbamide)",
    "formula": "NH2CONH2",
    "iupacName": "Diaminomethanal",
    "commonName": "Carbamide",
    "molecularWeight": 60.056,
    "geometry": "Planar",
    "hybridization": "sp²",
    "functionalGroups": [
      "Diamide"
    ],
    "category": "Amides",
    "color": "#a855f7",
    "smiles": "NC(=O)N",
    "desc": "First organic molecule synthesized from inorganic ammonium cyanate by Friedrich Wöhler in 1828."
  },
  {
    "id": "mol_d_glucose",
    "name": "D-Glucose",
    "formula": "C6H12O6",
    "iupacName": "(2R,3S,4R,5R)-2,3,4,5,6-Pentahydroxyhexanal",
    "commonName": "Dextrose / Grape Sugar",
    "molecularWeight": 180.156,
    "geometry": "Pyranose chair / open chain",
    "hybridization": "sp³ (carbons)",
    "functionalGroups": [
      "Aldohexose",
      "Polyhydroxy"
    ],
    "category": "Biomolecules",
    "color": "#10b981",
    "smiles": "OCC1OC(O)C(O)C(O)C1O",
    "desc": "Primary metabolic fuel of living cells; exists in alpha and beta anomeric forms that undergo mutarotation."
  },
  {
    "id": "mol_glycine",
    "name": "Glycine",
    "formula": "C2H5NO2",
    "iupacName": "2-Aminoethanoic acid",
    "commonName": "Glycine",
    "molecularWeight": 75.067,
    "geometry": "Zwitterionic tetrahedral",
    "hybridization": "sp³ / sp²",
    "functionalGroups": [
      "Amino Acid (Zwitterion)"
    ],
    "category": "Biomolecules",
    "color": "#10b981",
    "smiles": "NCC(=O)O",
    "desc": "Only non-chiral proteinogenic amino acid; exists as dipolar zwitterion +H3N-CH2-COO- with isoelectric point 5.97."
  },
  {
    "id": "mol_aspirin",
    "name": "Aspirin (Acetylsalicylic Acid)",
    "formula": "C9H8O4",
    "iupacName": "2-Acetyloxybenzoic acid",
    "commonName": "Aspirin",
    "molecularWeight": 180.159,
    "geometry": "Planar aromatic core",
    "hybridization": "sp²",
    "functionalGroups": [
      "Ester",
      "Carboxylic Acid"
    ],
    "category": "Pharmaceuticals",
    "color": "#ef4444",
    "smiles": "CC(=O)Oc1ccccc1C(=O)O",
    "desc": "Widely used analgesic, antipyretic, and anti-inflammatory nonsteroidal drug that irreversibly inhibits COX enzymes."
  }
];
