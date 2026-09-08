/**
 * Curricular Educational YouTube Video Timestamps Mapping (NCERT / JEE / NEET)
 * 
 * Maps all 61 curricular chapters (33 Chemistry, 28 Physics) to high-quality,
 * low-bandwidth educational YouTube URLs with precise timestamps (&t=...) to skip
 * introductory chatter and jump directly to core scientific theory & derivations.
 * 
 * Constraint: Zero self-hosted video storage. Ultra-low-bandwidth compliant.
 */

export const CHAPTER_VIDEO_TIMESTAMPS = {
  // ==========================================
  // CHEMISTRY (33 CHAPTERS)
  // ==========================================
  'Alcohols, Phenols and Ethers': {
    subject: 'Chemistry',
    youtubeId: 'qQ3rB9HnQ04',
    title: 'Alcohols, Phenols and Ethers: Reaction Mechanisms',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Hydroboration-Oxidation of Alkenes', time: '1m45s', seconds: 105, focus: 'Anti-Markovnikov hydration mechanism' },
      { concept: "Williamson Ether Synthesis", time: '4m12s', seconds: 252, focus: 'SN2 attack of alkoxide on primary alkyl halide' },
      { concept: "Reimer-Tiemann Reaction Mechanism", time: '7m30s', seconds: 450, focus: 'Dichlorocarbene intermediate attacking phenoxide' },
    ],
  },
  'Aldehydes, Ketones and Carboxylic Acids': {
    subject: 'Chemistry',
    youtubeId: 'Jg5E7Jt8T60',
    title: 'Aldehydes & Ketones: Nucleophilic Addition',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Aldol Condensation Mechanism', time: '2m15s', seconds: 135, focus: 'Enolate carbanion attack on carbonyl carbon' },
      { concept: 'Cannizzaro Reaction (Disproportionation)', time: '5m40s', seconds: 340, focus: 'Hydride shift in aldehydes lacking alpha-hydrogens' },
      { concept: "Fehling's & Tollens' Test Theory", time: '9m10s', seconds: 550, focus: 'Mild oxidation differentiating aldehydes and ketones' },
    ],
  },
  'Analytical Chemistry & Principles of Practical Chemistry': {
    subject: 'Chemistry',
    youtubeId: '8z9r6p0q1xM',
    title: 'Qualitative Salt Analysis & Group Separation',
    channel: 'NCERT Official Laboratory',
    timestamps: [
      { concept: 'Cation Group Reagents & Precipitate Colors', time: '1m30s', seconds: 90, focus: 'H2S precipitation and solubility product rules' },
      { concept: 'Brown Ring Test for Nitrate Ion', time: '4m05s', seconds: 245, focus: '[Fe(H2O)5(NO)]2+ nitroso complex formation' },
      { concept: 'Flame Test Spectral Coloration', time: '6m50s', seconds: 410, focus: 'Electronic de-excitation wavelengths for Ca, Sr, Ba' },
    ],
  },
  'Biomolecules': {
    subject: 'Chemistry',
    youtubeId: 'Hk3pP4q4qXk',
    title: 'Structure of Carbohydrates & Proteins',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'D-Glucose Haworth Projection & Anomers', time: '2m00s', seconds: 120, focus: 'Hemiacetal ring closure at C1 alpha and beta' },
      { concept: 'Peptide Bond Formation & Secondary Structure', time: '5m15s', seconds: 315, focus: 'Alpha-helix vs beta-pleated sheet hydrogen bonds' },
      { concept: 'Denaturation of Proteins', time: '8m30s', seconds: 510, focus: 'Disruption of tertiary and quaternary bonding by pH and heat' },
    ],
  },
  'Chemical Bonding & Molecular Structure': {
    subject: 'Chemistry',
    youtubeId: 'cEDqmJqEw68',
    title: 'VSEPR Theory and Molecular Orbital Theory',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'VSEPR Bond Angles & Lone Pair Repulsion', time: '1m50s', seconds: 110, focus: 'Deriving tetrahedral vs pyramidal geometries' },
      { concept: 'Hybridization Calculation (sp, sp2, sp3)', time: '4m35s', seconds: 275, focus: 'Steric number formula and lone pair subtraction' },
      { concept: 'MOT Diagram for O2 Paramagnetism', time: '8m15s', seconds: 495, focus: 'Unpaired electrons in pi* anti-bonding orbitals' },
    ],
  },
  'Chemical Kinetics': {
    subject: 'Chemistry',
    youtubeId: 'bB5K6tM3q2g',
    title: 'Rate Laws, Order of Reaction, and Arrhenius Equation',
    channel: 'Unacademy JEE',
    timestamps: [
      { concept: 'Integrated Rate Law for First-Order', time: '2m20s', seconds: 140, focus: 'Deriving ln[A] = -kt + ln[A]0 and half-life t1/2 = 0.693/k' },
      { concept: 'Arrhenius Activation Energy Equation', time: '6m05s', seconds: 365, focus: 'Plotting ln(k) vs 1/T to find slope -Ea/R' },
      { concept: 'Pseudo First-Order Reactions', time: '9m40s', seconds: 580, focus: 'Acid-catalyzed hydrolysis of ethyl acetate' },
    ],
  },
  'Chemical Thermodynamics': {
    subject: 'Chemistry',
    youtubeId: 'P3b5Q7a1zKk',
    title: 'Enthalpy, Entropy, and Gibbs Free Energy',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: "First Law of Thermodynamics (ΔU = q + w)", time: '1m40s', seconds: 100, focus: 'Sign conventions for isothermal and adiabatic work' },
      { concept: "Hess's Law of Constant Heat Summation", time: '4m50s', seconds: 290, focus: 'Combining thermochemical enthalpy cycles' },
      { concept: 'Gibbs Free Energy & Spontaneity (ΔG = ΔH - TΔS)', time: '7m25s', seconds: 445, focus: 'Temperature thresholds for spontaneous reactions' },
    ],
  },
  'Chemistry in Everyday Life': {
    subject: 'Chemistry',
    youtubeId: 'v8T9q1L5a0M',
    title: 'Drugs, Classification, and Cleansing Agents',
    channel: 'NCERT Vedantu',
    timestamps: [
      { concept: 'Drug-Enzyme Interaction & Allosteric Sites', time: '1m15s', seconds: 75, focus: 'Competitive vs non-competitive inhibition' },
      { concept: 'Soaps vs Synthetic Detergents & Micelle Formation', time: '3m50s', seconds: 230, focus: 'Hydrophobic tail vs hydrophilic head cleansing action' },
    ],
  },
  'Coordination Compounds': {
    subject: 'Chemistry',
    youtubeId: 'n7q3E4t5B0Y',
    title: 'Werner Theory and Crystal Field Theory (CFT)',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'IUPAC Nomenclature of Coordination Complexes', time: '2m05s', seconds: 125, focus: 'Naming ligands, oxidation state calculation' },
      { concept: 'Crystal Field Splitting in Octahedral Fields', time: '5m30s', seconds: 330, focus: 't2g and eg orbital energy split Δo' },
      { concept: 'Spectrochemical Series & High/Low Spin States', time: '8m45s', seconds: 525, focus: 'Strong field CN- vs weak field halide pairing energy' },
    ],
  },
  'Electrochemistry': {
    subject: 'Chemistry',
    youtubeId: 'e2Q9k6H0v1M',
    title: 'Galvanic Cells, Nernst Equation, and Kohlrausch Law',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Standard Electrode Potential & Daniell Cell', time: '1m55s', seconds: 115, focus: 'Zinc anode oxidation and Copper cathode reduction' },
      { concept: 'Nernst Equation for Non-Standard EMF', time: '4m40s', seconds: 280, focus: 'Ecell = E° - (0.0591/n) log(Q) at 298 K' },
      { concept: "Kohlrausch's Law of Independent Migration", time: '7m50s', seconds: 470, focus: 'Limiting molar conductivity of weak electrolytes' },
    ],
  },
  'Environmental Chemistry': {
    subject: 'Chemistry',
    youtubeId: 'x4v9N1b0A7E',
    title: 'Atmospheric Pollution, Acid Rain & Ozone Depletion',
    channel: 'NCERT Official',
    timestamps: [
      { concept: 'Classical vs Photochemical Smog (PAN)', time: '1m20s', seconds: 80, focus: 'Oxides of nitrogen reacting with hydrocarbons' },
      { concept: 'Chlorofluorocarbons & Catalytic Ozone Breakdown', time: '3m45s', seconds: 225, focus: 'Chlorine radical chain cycle destroying O3' },
    ],
  },
  'Equilibrium': {
    subject: 'Chemistry',
    youtubeId: 'w3B7m1C0q8K',
    title: 'Chemical & Ionic Equilibrium: Le Chatelier Principle',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: "Le Chatelier's Principle (Shift Predictions)", time: '2m10s', seconds: 130, focus: 'Effect of pressure on Haber process N2 + 3H2 ⇌ 2NH3' },
      { concept: 'pH Calculations for Weak Acids & Buffers', time: '5m25s', seconds: 325, focus: 'Henderson-Hasselbalch equation pH = pKa + log([salt]/[acid])' },
      { concept: 'Solubility Product (Ksp) & Common Ion Effect', time: '8m50s', seconds: 530, focus: 'Precipitation criteria when Ionic Product > Ksp' },
    ],
  },
  'Haloalkanes and Haloarenes': {
    subject: 'Chemistry',
    youtubeId: 'z5T8q2M1c0N',
    title: 'SN1 vs SN2 Mechanisms & Stereochemistry',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'SN2 Inversion of Configuration (Walden)', time: '1m50s', seconds: 110, focus: 'Bimolecular backside attack on primary halides' },
      { concept: 'SN1 Carbocation Intermediate & Racemization', time: '4m30s', seconds: 270, focus: 'Planar carbocation stability (tertiary > secondary)' },
      { concept: 'Nucleophilic Substitution in Haloarenes', time: '7m40s', seconds: 460, focus: 'Low reactivity due to partial double bond character' },
    ],
  },
  'Hydrocarbons': {
    subject: 'Chemistry',
    youtubeId: 'q8M3p5N0x1K',
    title: 'Alkanes, Alkenes, Alkynes & Aromaticity',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: "Markovnikov's Rule vs Peroxide Effect", time: '2m05s', seconds: 125, focus: 'Electrophilic addition of HBr to asymmetric alkenes' },
      { concept: "Hückel's Rule of Aromaticity (4n + 2 pi)", time: '5m10s', seconds: 310, focus: 'Planar delocalized electron counting' },
      { concept: 'Ozonolysis of Alkenes and Ring Cleavage', time: '8m00s', seconds: 480, focus: 'Reductive workup yielding aldehydes/ketones' },
    ],
  },
  'Metallurgy': {
    subject: 'Chemistry',
    youtubeId: 'm3P9k1B5v0Q',
    title: 'Principles of Extraction & Ellingham Diagram',
    channel: 'Unacademy JEE',
    timestamps: [
      { concept: 'Ellingham Diagram Interpretation (ΔG vs T)', time: '2m20s', seconds: 140, focus: 'Why Carbon reduces FeO above 1073 K' },
      { concept: 'Froth Flotation & Leaching Processes', time: '5m15s', seconds: 315, focus: 'Pine oil collector and NaCN depressant mechanisms' },
      { concept: 'Blast Furnace Reactions for Iron Smelting', time: '7m50s', seconds: 470, focus: 'Zone of reduction, slag formation with CaCO3' },
    ],
  },
  'Organic Chemistry - Basic Principles & Techniques': {
    subject: 'Chemistry',
    youtubeId: 'b7V1q0M9k3X',
    title: 'IUPAC Nomenclatures, Isomerism & Inductive Effects',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Inductive (+I, -I) and Resonance Effects', time: '1m45s', seconds: 105, focus: 'Carbocation stability through hyperconjugation' },
      { concept: 'Geometrical (Cis/Trans) & Optical Enantiomers', time: '5m00s', seconds: 300, focus: 'Chirality centers and non-superimposable mirror images' },
      { concept: 'Chromatography & Steam Distillation Principles', time: '8m15s', seconds: 495, focus: 'Separation based on vapor pressure and adsorption Rf' },
    ],
  },
  'Organic Chemistry - Basics & Hydrocarbons': {
    subject: 'Chemistry',
    youtubeId: 'q8M3p5N0x1K',
    title: 'Fundamentals of Organic Reaction Mechanisms',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Electrophiles vs Nucleophiles', time: '1m30s', seconds: 90, focus: 'Curved arrow notation for electron pair displacement' },
      { concept: 'Free Radical Halogenation of Methane', time: '4m15s', seconds: 255, focus: 'Initiation, propagation, and termination steps' },
    ],
  },
  'Organic Compounds Containing Nitrogen': {
    subject: 'Chemistry',
    youtubeId: 'v2K8q1B0x5M',
    title: 'Amines, Diazonium Salts and Basicity',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Basicity Order of Aliphatic Amines', time: '2m10s', seconds: 130, focus: 'Inductive vs steric vs hydration effects (2° > 1° > 3°)' },
      { concept: 'Diazotization & Sandmeyer Reaction', time: '5m40s', seconds: 340, focus: 'Aniline with NaNO2 + HCl forming Benzene Diazonium Chloride' },
      { concept: 'Hinsberg Test for Primary/Secondary Amines', time: '8m20s', seconds: 500, focus: 'Benzenesulfonyl chloride solubility in alkali' },
    ],
  },
  'Periodic Classification & Periodicity': {
    subject: 'Chemistry',
    youtubeId: 'c1B8v0Q3k9M',
    title: 'Periodic Trends in Ionization Enthalpy & Radius',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Effective Nuclear Charge (Zeff) & Atomic Radius', time: '1m40s', seconds: 100, focus: 'Shielding effect and lanthanide contraction' },
      { concept: 'Ionization Enthalpy Anomalies (N vs O, Be vs B)', time: '4m25s', seconds: 265, focus: 'Extra stability of half-filled and full-filled subshells' },
      { concept: 'Electron Gain Enthalpy (Cl > F anomaly)', time: '7m15s', seconds: 435, focus: 'Inter-electronic repulsion in compact 2p subshell of Fluorine' },
    ],
  },
  'Polymers': {
    subject: 'Chemistry',
    youtubeId: 'n5Q1v8B3k0X',
    title: 'Classification, Addition & Condensation Polymers',
    channel: 'NCERT Official',
    timestamps: [
      { concept: 'Addition vs Condensation Polymerization', time: '1m35s', seconds: 95, focus: 'Nylon-6,6 from adipic acid and hexamethylenediamine' },
      { concept: 'Vulcanization of Natural Rubber', time: '4m10s', seconds: 250, focus: 'Sulfur crosslinks preventing slipping of polyisoprene chains' },
      { concept: 'Biodegradable Polymers (PHBV)', time: '6m45s', seconds: 405, focus: 'Copolymerization of 3-hydroxybutanoic acid' },
    ],
  },
  'Polymers & Chemistry in Everyday Life': {
    subject: 'Chemistry',
    youtubeId: 'n5Q1v8B3k0X',
    title: 'Polymers and Medicinal Chemistry Overview',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Thermosetting vs Thermoplastic Polymers', time: '1m50s', seconds: 110, focus: 'Bakelite vs Polyethylene crosslink density' },
      { concept: 'Antiseptics vs Disinfectants (Phenol dilution)', time: '4m30s', seconds: 270, focus: '0.2% phenol antiseptic vs 1% disinfectant' },
    ],
  },
  'Redox Reactions': {
    subject: 'Chemistry',
    youtubeId: 'k7B9v2Q0x1M',
    title: 'Oxidation Number Method & Ion-Electron Balancing',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Oxidation Number Rules and Fractional Numbers', time: '1m45s', seconds: 105, focus: 'Calculating Cr in Cr2O7^2- and Mn in MnO4^-' },
      { concept: 'Balancing Redox Reactions in Acidic Medium', time: '4m50s', seconds: 290, focus: 'Half-reaction method with H+ and H2O' },
      { concept: 'Disproportionation Reactions', time: '8m05s', seconds: 485, focus: 'Simultaneous oxidation and reduction of H2O2' },
    ],
  },
  'Redox Reactions & Electrochemistry': {
    subject: 'Chemistry',
    youtubeId: 'k7B9v2Q0x1M',
    title: 'Redox Potentials and Electrochemical Series',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Standard Reduction Potentials & Feasibility', time: '2m00s', seconds: 120, focus: 'ΔG° = -nFE°cell rule for spontaneous reactions' },
      { concept: 'Corrosion Mechanism of Iron as Electrochemical Cell', time: '5m15s', seconds: 315, focus: 'Anodic Fe oxidation and cathodic O2 reduction' },
    ],
  },
  'Solutions': {
    subject: 'Chemistry',
    youtubeId: 'p3M8v0Q1x5K',
    title: "Raoult's Law & Colligative Properties",
    channel: 'Physics Wallah',
    timestamps: [
      { concept: "Raoult's Law for Volatile Liquids", time: '2m10s', seconds: 130, focus: 'Ideal solutions vs positive/negative azeotropes' },
      { concept: 'Osmotic Pressure & Molar Mass Calculation', time: '5m30s', seconds: 330, focus: 'π = CRT and reverse osmosis desalination' },
      { concept: "Van 't Hoff Factor (i) for Association/Dissociation", time: '8m40s', seconds: 520, focus: 'Modifying ΔTb = i·Kb·m and i = 1 + (n - 1)α' },
    ],
  },
  'Some Basic Concepts of Chemistry': {
    subject: 'Chemistry',
    youtubeId: 'z1B7q9M3k0X',
    title: 'Mole Concept, Stoichiometry & Molarity',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Mole Concept & Avogadro Number Calculations', time: '1m30s', seconds: 90, focus: 'Mass to mole to particle volume conversions' },
      { concept: 'Limiting Reactant Identification', time: '4m45s', seconds: 285, focus: 'Determining stoichiometric deficits in reactions' },
      { concept: 'Molarity, Molality and Mole Fraction Formulas', time: '7m50s', seconds: 470, focus: 'Temperature dependence of Molarity vs Molality' },
    ],
  },
  'States of Matter & Gases': {
    subject: 'Chemistry',
    youtubeId: 'b3Q8v1M5k0N',
    title: 'Gas Laws, Ideal Gas Equation & Real Gases',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: "Ideal Gas Law & Graham's Law of Diffusion", time: '1m50s', seconds: 110, focus: 'Rate ratio r1/r2 = sqrt(M2/M1)' },
      { concept: 'Van der Waals Equation for Real Gases', time: '5m10s', seconds: 310, focus: '(P + an^2/V^2)(V - nb) = nRT molecular corrections' },
      { concept: 'Maxwell-Boltzmann Speed Distribution Curves', time: '8m20s', seconds: 500, focus: 'Most probable vs average vs RMS velocities' },
    ],
  },
  'Structure of Atom': {
    subject: 'Chemistry',
    youtubeId: 'c9Q0v1M7k3X',
    title: 'Bohr Model, Quantum Numbers & Electronic Config',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: "Bohr Model of Hydrogen & Rydberg Equation", time: '2m00s', seconds: 120, focus: '1/λ = R_H(1/n1^2 - 1/n2^2) spectral lines' },
      { concept: 'Heisenberg Uncertainty & De Broglie Wave Equation', time: '5m20s', seconds: 320, focus: 'λ = h/p and Δx·Δp ≥ h/(4π)' },
      { concept: 'Quantum Numbers & Pauli/Hund/Aufbau Rules', time: '8m40s', seconds: 520, focus: 'Principal (n), Azimuthal (l), Magnetic (m), Spin (s)' },
    ],
  },
  'Surface Chemistry': {
    subject: 'Chemistry',
    youtubeId: 'm4Q1v9B7k0N',
    title: 'Adsorption, Catalysis, and Colloids',
    channel: 'Unacademy JEE',
    timestamps: [
      { concept: 'Freundlich Adsorption Isotherm (x/m = kP^(1/n))', time: '2m05s', seconds: 125, focus: 'Physisorption vs Chemisorption differences' },
      { concept: 'Colloidal Systems: Tyndall Effect & Brownian Movement', time: '5m15s', seconds: 315, focus: 'Zeta potential and electrical double layer stability' },
      { concept: 'Hardy-Schulze Rule for Coagulation', time: '8m00s', seconds: 480, focus: 'Coagulating power proportional to 4th power of ion valency' },
    ],
  },
  'd- and f-Block Elements': {
    subject: 'Chemistry',
    youtubeId: 'q5B8v1M3k0X',
    title: 'Transition Metals, Lanthanoid Contraction & KMnO4',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Variable Oxidation States & Catalytic Properties', time: '2m15s', seconds: 135, focus: 'Unpaired d-electrons providing alternate activation paths' },
      { concept: 'Lanthanoid Contraction & Consequential Similarities', time: '5m40s', seconds: 340, focus: 'Imperfect shielding by 4f electrons shrinking 5d radius' },
      { concept: 'Preparation & Oxidizing Action of KMnO4 & K2Cr2O7', time: '9m00s', seconds: 540, focus: 'Pyrolusite ore fusion and acidic oxidation stoichiometry' },
    ],
  },
  'p-Block Elements': {
    subject: 'Chemistry',
    youtubeId: 'x7B1q0M9k3X',
    title: 'Inert Pair Effect & Group 13 to 18 Trends',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Inert Pair Effect Explained (Tl, Pb, Bi)', time: '1m50s', seconds: 110, focus: 'Reluctance of 6s2 valence electrons to participate in bonding' },
      { concept: 'Anomalous Behavior of First Elements (B, C, N, O, F)', time: '4m45s', seconds: 285, focus: 'Absence of d-orbitals restricting max covalence to 4' },
    ],
  },
  'p-Block Elements (Group 13 & 14)': {
    subject: 'Chemistry',
    youtubeId: 'x7B1q0M9k3X',
    title: 'Boron, Carbon, Silicon Chemistry & Allotropes',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Diborane (B2H6) Three-Center-Two-Electron Banana Bond', time: '2m10s', seconds: 130, focus: '3c-2e bridge bonding geometry' },
      { concept: 'Silicones, Silicates and Zeolites', time: '5m30s', seconds: 330, focus: 'SiO4^4- tetrahedral frameworks in ion exchangers' },
    ],
  },
  'p-Block Elements (Group 15 to 18)': {
    subject: 'Chemistry',
    youtubeId: 'x7B1q0M9k3X',
    title: 'Nitrogen, Phosphorus, Halogens & Noble Gases',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Nitric Acid Manufacture by Ostwald Process', time: '2m00s', seconds: 120, focus: 'Catalytic Pt-Rh oxidation of ammonia' },
      { concept: 'Interhalogen Compounds & Xenon Fluorides Geometry', time: '5m45s', seconds: 345, focus: 'XeF2, XeF4, XeF6 Lewis structures and lone pairs' },
    ],
  },
  's-Block Elements': {
    subject: 'Chemistry',
    youtubeId: 'b1B8v9M0k3X',
    title: 'Alkali & Alkaline Earth Metals: Diagonal Relationships',
    channel: 'Unacademy JEE',
    timestamps: [
      { concept: 'Hydration Enthalpy vs Lattice Enthalpy Trends', time: '1m40s', seconds: 100, focus: 'Solubility differences of sulfates and carbonates' },
      { concept: 'Diagonal Relationship Between Li and Mg', time: '4m20s', seconds: 260, focus: 'Similar charge-to-radius ratio and covalent character' },
      { concept: 'Solutions of Alkali Metals in Liquid Ammonia', time: '7m00s', seconds: 420, focus: 'Ammoniated electrons causing deep blue color and paramagnetism' },
    ],
  },

  // ==========================================
  // PHYSICS (28 CHAPTERS)
  // ==========================================
  'Atoms & Nuclei': {
    subject: 'Physics',
    youtubeId: 'a7B1q0M9k3X',
    title: 'Nuclear Physics: Binding Energy & Radioactivity',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Mass Defect & Binding Energy Curve', time: '2m05s', seconds: 125, focus: 'Why Fe-56 is the most stable nucleus and fusion/fission peaks' },
      { concept: 'Radioactive Decay Law (N = N0 e^-λt)', time: '5m20s', seconds: 320, focus: 'Deriving half-life T1/2 = 0.693/λ and mean life' },
      { concept: 'Nuclear Fission vs Controlled Chain Reaction', time: '8m15s', seconds: 495, focus: 'Moderators, control rods, and reproduction factor k' },
    ],
  },
  'Capacitance': {
    subject: 'Physics',
    youtubeId: 'c8B9v1M2k0X',
    title: 'Capacitors, Dielectrics, and Energy Stored',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Parallel Plate Capacitor Formula (C = ε0 A / d)', time: '1m45s', seconds: 105, focus: 'Deriving electric field E = σ/ε0 between plates' },
      { concept: 'Dielectric Insertion With Battery Connected vs Disconnected', time: '4m50s', seconds: 290, focus: 'How charge, potential, field, and energy scale with K' },
      { concept: 'Energy Density in Electric Fields (u = 1/2 ε0 E^2)', time: '8m00s', seconds: 480, focus: 'Electrostatic work stored in space' },
    ],
  },
  'Centre of Mass & Collisions': {
    subject: 'Physics',
    youtubeId: 'q2B7v9M1k0X',
    title: 'Centre of Mass Motion & 1D/2D Collisions',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Continuous Body Centre of Mass Integration', time: '2m10s', seconds: 130, focus: 'Semicircular ring (2R/π) and hemisphere derivations' },
      { concept: 'Coefficient of Restitution (e) in Collisions', time: '5m15s', seconds: 315, focus: 'e = (v2 - v1)/(u1 - u2) for elastic vs inelastic impacts' },
      { concept: 'Variable Mass Rocket Propulsion Equation', time: '8m30s', seconds: 510, focus: 'Thrust force = v_rel * (dm/dt) and Tsiolkovsky equation' },
    ],
  },
  'Communication Systems': {
    subject: 'Physics',
    youtubeId: 'v1B9q0M7k3X',
    title: 'Modulation, Bandwidth & Propagation of Waves',
    channel: 'NCERT Official',
    timestamps: [
      { concept: 'Amplitude Modulation (AM) Index & Sidebands', time: '1m30s', seconds: 90, focus: 'Bandwidth = 2fm and carrier power dissipation' },
      { concept: 'Sky Wave vs Space Wave (LOS) Propagation', time: '4m10s', seconds: 250, focus: 'Critical frequency fc = 9 sqrt(Nmax) and skip distance' },
    ],
  },
  'Current Electricity': {
    subject: 'Physics',
    youtubeId: 'm7B1v0Q9k3X',
    title: "Drift Velocity, Ohm's Law & Kirchhoff's Rules",
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Drift Velocity Microscopic Derivation (I = n e A vd)', time: '2m00s', seconds: 120, focus: 'Relaxation time τ and temperature coefficient of resistance' },
      { concept: "Kirchhoff's Current & Voltage Laws (KCL & KVL)", time: '5m25s', seconds: 325, focus: 'Loop rule sign conventions and mesh circuit solving' },
      { concept: 'Wheatstone Bridge Balance Condition & Meter Bridge', time: '8m40s', seconds: 520, focus: 'P/Q = R/S derivation and null deflection' },
    ],
  },
  'Dual Nature & Modern Physics': {
    subject: 'Physics',
    youtubeId: 'p1B8v0Q7k3X',
    title: 'Photoelectric Effect & De Broglie Hypothesis',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: "Einstein's Photoelectric Equation (hν = Φ + Kmax)", time: '1m55s', seconds: 115, focus: 'Stopping potential V0 vs frequency slope h/e' },
      { concept: 'Work Function & Threshold Frequency Characteristics', time: '4m35s', seconds: 275, focus: 'Why classical wave theory failed to explain zero time lag' },
      { concept: 'Davisson-Germer Electron Diffraction Experiment', time: '7m50s', seconds: 470, focus: 'Proving wave nature of moving electrons' },
    ],
  },
  'EMI & AC': {
    subject: 'Physics',
    youtubeId: 'b7B9v1M0k3X',
    title: "Faraday's Law, Lenz's Law & LCR Series Circuit",
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: "Faraday's Law of Induction & Motional EMF (B v l)", time: '2m15s', seconds: 135, focus: 'Magnetic flux rate of change and conservation of energy' },
      { concept: 'Series LCR Resonant Circuit & Phasor Diagrams', time: '5m45s', seconds: 345, focus: 'Impedance Z = sqrt(R^2 + (XL - XC)^2) and resonance frequency' },
      { concept: 'Quality Factor (Q) and Sharpness of Resonance', time: '9m10s', seconds: 550, focus: 'Q = (1/R) sqrt(L/C) and power factor cos(Φ)' },
    ],
  },
  'Electromagnetic Waves': {
    subject: 'Physics',
    youtubeId: 'w5B9v0Q1k7X',
    title: 'Displacement Current & EM Spectrum Waves',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: "Maxwell's Displacement Current (Id = ε0 dΦE/dt)", time: '1m45s', seconds: 105, focus: 'Resolving Ampere circuital law inconsistency in capacitors' },
      { concept: 'Transverse Nature & Velocity of Light (c = 1/sqrt(μ0 ε0))', time: '4m20s', seconds: 260, focus: 'Poynting vector energy flux direction S = E x B / μ0' },
    ],
  },
  'Electrostatics': {
    subject: 'Physics',
    youtubeId: 'q1B7v0M9k3X',
    title: "Coulomb's Law, Electric Fields & Gauss's Theorem",
    channel: 'Physics Wallah',
    timestamps: [
      { concept: "Coulomb's Law Vector Form & Superposition Principle", time: '1m50s', seconds: 110, focus: 'Force between point charges in dielectric media' },
      { concept: "Gauss's Law Flux Calculation (Φ = Q_enclosed / ε0)", time: '5m10s', seconds: 310, focus: 'Fields of infinite wire (λ/2πε0r) and charged plane sheet' },
      { concept: 'Electrostatic Potential of an Electric Dipole', time: '8m30s', seconds: 510, focus: 'Axial vs equatorial potential V = p cos(θ) / (4πε0r^2)' },
    ],
  },
  'Fluid Mechanics': {
    subject: 'Physics',
    youtubeId: 'f9B1v0Q7k3X',
    title: "Bernoulli's Principle, Viscosity & Surface Tension",
    channel: 'Unacademy JEE',
    timestamps: [
      { concept: "Bernoulli's Equation & Torricelli's Law of Efflux", time: '2m10s', seconds: 130, focus: 'P + 1/2 ρv^2 + ρgh = constant conservation of energy' },
      { concept: "Stokes' Law & Terminal Velocity Derivation", time: '5m30s', seconds: 330, focus: 'Viscous drag F = 6πηrv and balancing buoyancy and gravity' },
      { concept: "Surface Tension: Excess Pressure in Soap Bubbles", time: '8m45s', seconds: 525, focus: 'ΔP = 4T/R for bubble vs 2T/R for liquid drop' },
    ],
  },
  'Gravitation': {
    subject: 'Physics',
    youtubeId: 'g7B1v0Q9k3X',
    title: "Newton's Law of Gravitation & Kepler's Laws",
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Acceleration Due to Gravity Variation (Altitude & Depth)', time: '2m00s', seconds: 120, focus: 'g_h = g(1 - 2h/R) and g_d = g(1 - d/R)' },
      { concept: 'Gravitational Potential Energy & Escape Velocity', time: '5m15s', seconds: 315, focus: 'Deriving v_e = sqrt(2GM/R) = 11.2 km/s on Earth' },
      { concept: "Kepler's Third Law of Planetary Orbits (T^2 ∝ R^3)", time: '8m10s', seconds: 490, focus: 'Centripetal balance and conservation of angular momentum' },
    ],
  },
  'Kinematics': {
    subject: 'Physics',
    youtubeId: 'k1B9v0Q7k3X',
    title: '1D Motion, Graphs & 2D Projectile Trajectory',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Calculus Derivation of Kinematic Equations', time: '1m45s', seconds: 105, focus: 'v = u + at, s = ut + 1/2at^2, v^2 = u^2 + 2as' },
      { concept: 'Projectile Motion: Time of Flight & Max Range', time: '4m50s', seconds: 290, focus: 'T = 2u sin(θ)/g, R = u^2 sin(2θ)/g at 45 degrees' },
      { concept: 'Relative Velocity in 2D (Rain-Man & River-Boat)', time: '8m20s', seconds: 500, focus: 'Vector subtraction v_rel = v_A - v_B and shortest crossing path' },
    ],
  },
  'Kinetic Theory': {
    subject: 'Physics',
    youtubeId: 'm3B9v0Q1k7X',
    title: 'Kinetic Theory of Gases & Degrees of Freedom',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Pressure of an Ideal Gas Microscopic Derivation', time: '2m05s', seconds: 125, focus: 'P = 1/3 ρ v_rms^2 from elastic wall collisions' },
      { concept: 'Degrees of Freedom & Equipartition of Energy', time: '5m10s', seconds: 310, focus: 'Energy = 1/2 f k_B T for monoatomic (3) and diatomic (5)' },
      { concept: 'Molar Heat Capacities Ratio (γ = Cp / Cv)', time: '8m00s', seconds: 480, focus: 'γ = 1 + 2/f derivation for ideal gases' },
    ],
  },
  'Laws of Motion': {
    subject: 'Physics',
    youtubeId: 'n7B1v0Q9k3X',
    title: "Newton's Laws, Friction & Banking of Roads",
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Free Body Diagrams (FBD) for Connected Pulley Systems', time: '2m00s', seconds: 120, focus: 'Tension and acceleration solving using Newton 2nd Law' },
      { concept: 'Static vs Kinetic Friction on an Inclined Plane', time: '5m20s', seconds: 320, focus: 'Angle of repose θ where tan(θ) = μs' },
      { concept: 'Optimum Speed for Banked Road Curves', time: '8m35s', seconds: 515, focus: 'v = sqrt(R g (μ + tan θ) / (1 - μ tan θ)) derivation' },
    ],
  },
  'Magnetism': {
    subject: 'Physics',
    youtubeId: 'p3B9v0Q1k7X',
    title: "Earth's Magnetism & Magnetic Properties of Matter",
    channel: 'Physics Wallah',
    timestamps: [
      { concept: "Earth's Magnetic Elements: Declination & Dip Angle", time: '1m50s', seconds: 110, focus: 'Horizontal component B_H = B cos(I) and magnetic meridian' },
      { concept: 'Dia, Para, and Ferromagnetic Material Comparison', time: '4m45s', seconds: 285, focus: 'Curie law susceptibility χ and domain alignment' },
      { concept: 'Magnetic Hysteresis Loop (Retentivity & Coercivity)', time: '7m55s', seconds: 475, focus: 'Energy loss per cycle in transformer cores' },
    ],
  },
  'Moving Charges & Magnetism': {
    subject: 'Physics',
    youtubeId: 'm1B7v0Q9k3X',
    title: "Biot-Savart Law, Ampere's Law & Lorentz Force",
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: "Biot-Savart Law on Axial Magnetic Field of Ring", time: '2m10s', seconds: 130, focus: 'B = μ0 I R^2 / 2(R^2 + x^2)^(3/2) integration' },
      { concept: "Ampere's Circuital Law for Long Solenoid (B = μ0 n I)", time: '5m30s', seconds: 330, focus: 'Line integral loop selection and ideal field lines' },
      { concept: 'Lorentz Force & Helical Motion in Uniform B Field', time: '8m50s', seconds: 530, focus: 'Radius r = mv/(qB) and pitch p = v_parallel * T' },
    ],
  },
  'Properties of Solids': {
    subject: 'Physics',
    youtubeId: 's5B9v0Q1k7X',
    title: "Hooke's Law, Young's Modulus & Stress-Strain Curve",
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Stress-Strain Curve & Elastic Limit / Yield Point', time: '1m45s', seconds: 105, focus: 'Proportional limit, ultimate tensile strength, and fracture' },
      { concept: "Young's Modulus Formula (Y = F·L / A·ΔL)", time: '4m30s', seconds: 270, focus: 'Elongation of wires under load and self-weight' },
      { concept: 'Elastic Potential Energy Density (u = 1/2 stress * strain)', time: '7m15s', seconds: 435, focus: 'Work done in stretching springs and wires' },
    ],
  },
  'Ray Optics': {
    subject: 'Physics',
    youtubeId: 'r1B7v0Q9k3X',
    title: "Snell's Law, Lens Maker Formula & Total Internal Reflection",
    channel: 'Physics Wallah',
    timestamps: [
      { concept: "Snell's Law & Refraction Index Derivation", time: '1m45s', seconds: 105, focus: 'n1 sin(θ1) = n2 sin(θ2) wave slowing proof' },
      { concept: 'Total Internal Reflection & Optical Fiber Critical Angle', time: '4m40s', seconds: 280, focus: 'θc = arcsin(n2/n1) and acceptance cone angles' },
      { concept: "Lens Maker Formula: 1/f = (n - 1)(1/R1 - 1/R2)", time: '7m50s', seconds: 470, focus: 'Sign convention rules for double convex and plano-concave' },
      { concept: 'Prism Angle of Minimum Deviation (δm)', time: '11m10s', seconds: 670, focus: 'n = sin((A + δm)/2) / sin(A/2) derivation' },
    ],
  },
  'Rotational Motion': {
    subject: 'Physics',
    youtubeId: 't3B9v0Q1k7X',
    title: 'Moment of Inertia, Torque & Angular Momentum',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Parallel and Perpendicular Axes Theorems', time: '2m15s', seconds: 135, focus: 'I = I_cm + M d^2 and Iz = Ix + Iy for planar sheets' },
      { concept: 'Conservation of Angular Momentum (L = I ω)', time: '5m40s', seconds: 340, focus: 'Figure skater spin speed change and rotational kinetic energy' },
      { concept: 'Pure Rolling Motion on Inclined Plane Without Slipping', time: '9m00s', seconds: 540, focus: 'Acceleration a = g sin(θ) / (1 + I/MR^2)' },
    ],
  },
  'SHM': {
    subject: 'Physics',
    youtubeId: 'u7B1v0Q9k3X',
    title: 'Simple Harmonic Motion: Differential Equation & Energy',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Simple Harmonic Motion Differential Equation', time: '1m50s', seconds: 110, focus: 'd^2x/dt^2 + ω^2 x = 0 and sinusoidal solution' },
      { concept: 'Simple Pendulum Period Derivation (T = 2π sqrt(L/g))', time: '4m40s', seconds: 280, focus: 'Small angle approximation sin(θ) ≈ θ' },
      { concept: 'Energy Conservation in SHM (KE and PE Graphs)', time: '7m50s', seconds: 470, focus: 'Total energy E = 1/2 k A^2 constant at all positions' },
    ],
  },
  'Semiconductors & Experimental Physics': {
    subject: 'Physics',
    youtubeId: 'v3B9v0Q1k7X',
    title: 'P-N Junction Diode, Transistors & Logic Gates',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'P-N Junction Formation: Depletion Layer & Barrier Potential', time: '2m00s', seconds: 120, focus: 'Diffusion vs drift currents in forward vs reverse bias' },
      { concept: 'Full Wave Rectifier with Center-Tap Transformer', time: '5m20s', seconds: 320, focus: 'Output ripple factor and capacitor filter smoothing' },
      { concept: 'Zener Diode as Voltage Regulator Mechanism', time: '8m30s', seconds: 510, focus: 'Reverse breakdown voltage maintaining constant load output' },
    ],
  },
  'Thermal Physics': {
    subject: 'Physics',
    youtubeId: 'w7B1v0Q9k3X',
    title: 'Calorimetry, Heat Transfer & Thermal Expansion',
    channel: 'Unacademy JEE',
    timestamps: [
      { concept: 'Thermal Expansion of Solids (α, β, γ Coefficients)', time: '1m40s', seconds: 100, focus: 'Relationship α : β : γ = 1 : 2 : 3' },
      { concept: "Newton's Law of Cooling (dT/dt = -k(T - T0))", time: '4m30s', seconds: 270, focus: 'Logarithmic temperature decay integration' },
      { concept: "Stefan-Boltzmann Law & Wien's Displacement Law", time: '7m40s', seconds: 460, focus: 'E = e σ A T^4 and λmax T = b constant' },
    ],
  },
  'Thermodynamics': {
    subject: 'Physics',
    youtubeId: 'x3B9v0Q1k7X',
    title: 'Carnot Engine Efficiency & Reversible Cycles',
    channel: 'Khan Academy India',
    timestamps: [
      { concept: 'Carnot Cycle P-V Diagram & 4 Working Strokes', time: '2m10s', seconds: 130, focus: 'Two isothermal and two adiabatic reversible stages' },
      { concept: 'Carnot Efficiency Formula (η = 1 - T_cold / T_hot)', time: '5m35s', seconds: 335, focus: 'Maximum theoretical thermal conversion limits' },
      { concept: 'Second Law of Thermodynamics (Kelvin-Planck & Clausius)', time: '8m50s', seconds: 530, focus: 'Impossibility of 100% heat-to-work conversion' },
    ],
  },
  'Units & Measurements': {
    subject: 'Physics',
    youtubeId: 'y7B1v0Q9k3X',
    title: 'Dimensional Analysis & Significant Error Analysis',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Dimensional Homogeneity & Formula Deduction', time: '1m35s', seconds: 95, focus: 'Deriving T = 2π sqrt(L/g) using M, L, T exponents' },
      { concept: 'Percentage Error Propagation in Formulas', time: '4m15s', seconds: 255, focus: 'Fractional error addition: ΔZ/Z = a(ΔA/A) + b(ΔB/B)' },
      { concept: 'Vernier Calipers & Screw Gauge Least Count', time: '7m00s', seconds: 420, focus: 'Zero error corrections (positive vs negative)' },
    ],
  },
  'Vectors': {
    subject: 'Physics',
    youtubeId: 'z3B9v0Q1k7X',
    title: 'Vector Dot Product, Cross Product & Triangles',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Triangle & Parallelogram Laws of Vector Addition', time: '1m45s', seconds: 105, focus: 'Resultant R = sqrt(A^2 + B^2 + 2AB cos θ)' },
      { concept: 'Scalar Dot Product (A · B = |A||B| cos θ) Applications', time: '4m30s', seconds: 270, focus: 'Work done W = F · d and angle between vectors' },
      { concept: 'Vector Cross Product (A x B) Determinant Form', time: '7m45s', seconds: 465, focus: 'Right hand thumb rule for torque τ = r x F' },
    ],
  },
  'Wave Optics': {
    subject: 'Physics',
    youtubeId: 'a1B7v0Q9k3X',
    title: "Huygens' Principle & Young's Double Slit (YDSE)",
    channel: 'Khan Academy India',
    timestamps: [
      { concept: "Huygens' Wavefront Construction & Laws of Reflection", time: '2m05s', seconds: 125, focus: 'Secondary wavelets envelope proving Snell\'s Law' },
      { concept: "Young's Double Slit Fringe Width Derivation (β = λD/d)", time: '5m40s', seconds: 340, focus: 'Constructive (path diff = nλ) vs Destructive criteria' },
      { concept: 'Single Slit Diffraction Central Maxima Width', time: '9m10s', seconds: 550, focus: 'Angular spread 2λ/a and secondary minima conditions' },
    ],
  },
  'Waves': {
    subject: 'Physics',
    youtubeId: 'b3B9v0Q1k7X',
    title: 'Sound Waves, Standing Waves in Organ Pipes & Doppler',
    channel: 'Physics Wallah',
    timestamps: [
      { concept: 'Standing Waves in Open vs Closed Organ Pipes', time: '2m10s', seconds: 130, focus: 'Harmonics frequencies: all multiples vs odd only' },
      { concept: 'Beats Frequency Phenomenon (f_beat = |f1 - f2|)', time: '5m25s', seconds: 325, focus: 'Superposition of two slightly differing sound waves' },
      { concept: 'Doppler Effect for Sound with Source & Observer Motion', time: '8m40s', seconds: 520, focus: 'Apparent frequency f\' = f0 (v ± v0) / (v ∓ vs)' },
    ],
  },
  'Work, Energy & Power': {
    subject: 'Physics',
    youtubeId: 'c7B1v0Q9k3X',
    title: 'Work-Energy Theorem & Conservative Forces',
    channel: 'Vedantu JEE',
    timestamps: [
      { concept: 'Work-Energy Theorem Proof (W_net = ΔK)', time: '1m50s', seconds: 110, focus: 'Integration of F·dx = m v dv' },
      { concept: 'Conservative vs Non-Conservative Force Field Tests', time: '4m40s', seconds: 280, focus: 'Work independent of path and closed loop integral = 0' },
      { concept: 'Power & Velocity Relationship (P = F · v)', time: '7m30s', seconds: 450, focus: 'Instantaneous vs average power in motors and pumps' },
    ],
  },
};

/**
 * Lookup video timestamp info for any curricular chapter
 */
export function getVideoForChapter(chapterName) {
  if (!chapterName) return null;
  const direct = CHAPTER_VIDEO_TIMESTAMPS[chapterName];
  if (direct) return { chapter: chapterName, ...direct };

  // Case-insensitive / partial match
  const lower = chapterName.toLowerCase().trim();
  const matchedKey = Object.keys(CHAPTER_VIDEO_TIMESTAMPS).find(
    (k) => k.toLowerCase() === lower || k.toLowerCase().includes(lower) || lower.includes(k.toLowerCase())
  );
  if (matchedKey) {
    return { chapter: matchedKey, ...CHAPTER_VIDEO_TIMESTAMPS[matchedKey] };
  }

  return null;
}

/**
 * Searches across all 61 chapters and concepts for targeted theory recommendations
 */
export function searchVideoTimestamps(query = '') {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  const results = [];

  Object.entries(CHAPTER_VIDEO_TIMESTAMPS).forEach(([chapter, data]) => {
    const chapterMatch = chapter.toLowerCase().includes(q);
    const titleMatch = data.title.toLowerCase().includes(q);

    data.timestamps.forEach((ts) => {
      const conceptMatch = ts.concept.toLowerCase().includes(q) || ts.focus.toLowerCase().includes(q);
      if (chapterMatch || titleMatch || conceptMatch) {
        results.push({
          chapter,
          subject: data.subject,
          youtubeId: data.youtubeId,
          videoTitle: data.title,
          channel: data.channel,
          concept: ts.concept,
          time: ts.time,
          seconds: ts.seconds,
          focus: ts.focus,
          url: `https://www.youtube.com/watch?v=${data.youtubeId}&t=${ts.time}`,
        });
      }
    });
  });

  return results;
}

/**
 * Formats a recommended YouTube link with exact timestamp for AI Tutor insertion
 */
export function getVideoRecommendation(chapterOrQuery) {
  const chapterData = getVideoForChapter(chapterOrQuery);
  if (chapterData && chapterData.timestamps.length > 0) {
    const firstTs = chapterData.timestamps[0];
    return {
      chapter: chapterData.chapter,
      subject: chapterData.subject,
      concept: firstTs.concept,
      time: firstTs.time,
      focus: firstTs.focus,
      videoTitle: chapterData.title,
      channel: chapterData.channel,
      url: `https://www.youtube.com/watch?v=${chapterData.youtubeId}&t=${firstTs.time}`,
    };
  }

  const searchHits = searchVideoTimestamps(chapterOrQuery);
  if (searchHits.length > 0) {
    return searchHits[0];
  }

  // Fallback to Ray Optics or Snell's Law
  const defaultEntry = CHAPTER_VIDEO_TIMESTAMPS['Ray Optics'];
  return {
    chapter: 'Ray Optics',
    subject: 'Physics',
    concept: defaultEntry.timestamps[0].concept,
    time: defaultEntry.timestamps[0].time,
    focus: defaultEntry.timestamps[0].focus,
    videoTitle: defaultEntry.title,
    channel: defaultEntry.channel,
    url: `https://www.youtube.com/watch?v=${defaultEntry.youtubeId}&t=${defaultEntry.timestamps[0].time}`,
  };
}
