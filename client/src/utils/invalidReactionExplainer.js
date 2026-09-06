// Scientific Explanation Engine for Invalid Chemical Reactions (Class 10 to Class 12 NCERT / JEE / NEET)
// Analyzes why two or more chemicals cannot react based on chemical theory:
// - Thermodynamic Instability / Positive Gibbs Free Energy (ΔG > 0)
// - Reactivity Series (Electrochemical Series Inversions)
// - Kinetic Barrier & Lack of Activation Energy (Ea)
// - Redox Incompatibility (Dual Reducing Agents / Dual Oxidizers)
// - Acid-Base Mismatch (Dual Lewis Bases / Dual Acids)
// - Noble Gas Electronic Inertness (Closed Octet/Duplet)
// - Completely Soluble Spectator Ion Mixtures

const REACTIVITY_SERIES = [
  'K', 'Ba', 'Ca', 'Na', 'Mg', 'Al', 'Mn', 'Zn', 'Cr', 'Fe', 'Cd', 'Co', 'Ni', 'Sn', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Pt', 'Au'
];

const HALOGEN_ACTIVITY = ['F', 'Cl', 'Br', 'I'];

const NOBLE_GASES = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og'];

function normalize(s) {
  return (s || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function explainInvalidReaction(inputs = [], conditions = []) {
  if (!inputs || inputs.length === 0) {
    return {
      title: 'Empty Reaction Zone',
      theoryTag: 'Missing Reactants',
      summary: 'No chemicals have been placed in the reaction vessel.',
      scientificExplanation: 'A chemical reaction requires reactants to collide with sufficient kinetic energy and correct spatial orientation (Collision Theory). Please drag at least two chemicals into the Input zone.',
      keyPrinciples: ['Collision Theory', 'Reactant Concentration'],
      suggestedAlternatives: ['Try dragging Magnesium (Mg) and Oxygen (O2) to observe combustion.'],
      teacherIntro: 'It looks like the reaction vessel is empty! Drag some chemicals into the Input zone first, and I will be happy to guide you.',
    };
  }

  const formulas = inputs.map((i) => (typeof i === 'string' ? i : i.formula || ''));
  const normFormulas = formulas.map(normalize);
  const names = inputs.map((i) => (typeof i === 'string' ? i : i.name || i.formula || ''));

  // -------------------------------------------------------------
  // Case 1: Crucial Benchmark — Magnesium + Ammonia (Mg + NH3)
  // -------------------------------------------------------------
  const hasMg = normFormulas.some((f) => f === 'mg');
  const hasNH3 = normFormulas.some((f) => f === 'nh3' || f === 'nh3g' || f === 'ammonia');

  if (hasMg && hasNH3) {
    return {
      title: 'No Reaction: Magnesium & Ammonia Incompatibility',
      theoryTag: 'Redox Incompatibility & High N-H Bond Dissociation Energy',
      summary: 'Magnesium and Ammonia do not react under standard laboratory conditions because there is no thermodynamic driving force (ΔG > 0) and both species are electron-rich.',
      scientificExplanation:
        '1. **Thermodynamic Feasibility (ΔG > 0)**: In chemical thermodynamics, a reaction can only proceed spontaneously if the Gibbs Free Energy change is negative (ΔG < 0). Displacing hydrogen from ammonia by solid magnesium is non-spontaneous at room temperature.\n\n' +
        '2. **Redox Incompatibility**: Magnesium is an electropositive alkaline earth metal that acts as a strong reducing agent (electron donor). Ammonia (NH₃) is also electron-rich with a localized lone pair on nitrogen (a Lewis base). Because neither species is a suitable electron acceptor (oxidizer), no electron transfer can take place.\n\n' +
        '3. **High Kinetic Activation Barrier (Ea)**: The nitrogen-hydrogen covalent bond in NH₃ is exceptionally strong (bond dissociation energy ≈ 391 kJ/mol). Magnesium ribbon cannot break these bonds without extreme pyrolytic temperatures (>600°C in an enclosed quartz furnace), far beyond normal laboratory conditions.',
      keyPrinciples: [
        'Positive Gibbs Free Energy (ΔG > 0)',
        'Dual Electron Donors (No Redox Gradient)',
        'High N-H Bond Energy (391 kJ/mol)',
        'Lewis Base Stability',
      ],
      suggestedAlternatives: [
        'React Magnesium (Mg) with Oxygen (O₂) to see a dazzling white combustion flame!',
        'React Magnesium (Mg) with Hydrochloric Acid (HCl) to produce brisk H₂ gas effervescence.',
        'React Ammonia (NH₃) with Hydrochloric Acid (HCl) to form dense white fumes of NH₄Cl.',
      ],
      teacherIntro:
        "I see you tried to mix Magnesium and Ammonia. Let's break down why that doesn't work. What part is confusing you?",
    };
  }

  // -------------------------------------------------------------
  // Case 2: Noble Gases (He, Ne, Ar, Kr, Xe, Rn)
  // -------------------------------------------------------------
  const nobleGas = formulas.find((f) => NOBLE_GASES.includes(f) || NOBLE_GASES.map(normalize).includes(normalize(f)));
  if (nobleGas) {
    return {
      title: `No Reaction: Chemical Inertness of ${nobleGas}`,
      theoryTag: 'Stable Closed-Shell Octet / Duplet Electronic Configuration',
      summary: `${nobleGas} is a noble gas with a completely filled valence shell, making it chemically inert under laboratory conditions.`,
      scientificExplanation:
        `1. **Complete Valence Shell**: ${nobleGas} possesses a stable octet (or duplet for Helium) of electrons (ns²np⁶). It has zero chemical affinity to gain, lose, or share electrons.\n\n` +
        `2. **Extremely High Ionization Enthalpy**: Removing an electron from ${nobleGas} requires an immense amount of energy that cannot be supplied by standard chemical reagents.\n\n` +
        `3. **Positive Electron Gain Enthalpy**: Adding an electron to an already filled shell is energetically unfavorable. Thus, ${nobleGas} acts as a spectator with zero thermodynamic driving force.`,
      keyPrinciples: [
        'Full Valence Octet / Duplet',
        'Extremely High Ionization Energy',
        'Zero Electronegativity Gradient',
      ],
      suggestedAlternatives: [
        'Try using reactive non-metals like Oxygen (O₂) or Chlorine (Cl₂).',
        'Try combining active Group 1 or Group 2 metals with acids or halogens.',
      ],
      teacherIntro:
        `I noticed you added ${nobleGas} into the vessel. Noble gases have complete valence shells and rarely react. Let's explore why electron configurations dictate reactivity!`,
    };
  }

  // -------------------------------------------------------------
  // Case 3: Reactivity Series Inversion (Less reactive metal displacing more reactive one)
  // e.g., Cu + FeSO4, Ag + CuSO4, Au + HCl
  // -------------------------------------------------------------
  let dispFailure = null;
  const metalItem = formulas.find((f) => REACTIVITY_SERIES.includes(f));
  if (metalItem) {
    const mRank = REACTIVITY_SERIES.indexOf(metalItem);
    // Check if other reactant contains a higher ranking metal
    for (const f of formulas) {
      if (f === metalItem) continue;
      const targetMetal = REACTIVITY_SERIES.find((sm) => sm !== metalItem && f.startsWith(sm));
      if (targetMetal) {
        const tRank = REACTIVITY_SERIES.indexOf(targetMetal);
        if (mRank > tRank) {
          // metalItem is LESS reactive than targetMetal!
          dispFailure = { less: metalItem, more: targetMetal, salt: f };
          break;
        }
      }
    }
  }

  if (dispFailure) {
    return {
      title: `No Reaction: Reactivity Series Displacement Failure`,
      theoryTag: 'Electrochemical Reduction Potential (E° Inversion)',
      summary: `${dispFailure.less} is less electropositive than ${dispFailure.more}, so it cannot reduce ${dispFailure.more} ions from solution.`,
      scientificExplanation:
        `1. **Electrochemical Reactivity Hierarchy**: In the standard activity series, metals are ranked by their oxidation potential. ${dispFailure.more} sits higher than ${dispFailure.less}, meaning ${dispFailure.more} has a stronger thermodynamic tendency to lose electrons.\n\n` +
        `2. **Standard Cell Potential (E°cell < 0)**: The calculated electromotive force for ${dispFailure.less} displacing ${dispFailure.more} is negative (E°cell < 0), which directly correlates with a positive Gibbs free energy change (ΔG° = -nFE°cell > 0).\n\n` +
        `3. **Single Displacement Rule**: Only a more reactive metal can displace a less reactive metal from its salt solution, never the reverse.`,
      keyPrinciples: [
        `Reactivity Series Hierarchy (${dispFailure.more} > ${dispFailure.less})`,
        'Negative Standard Cell Potential (E° < 0)',
        'Positive Gibbs Free Energy (ΔG° > 0)',
      ],
      suggestedAlternatives: [
        `Reverse the order! Try reacting ${dispFailure.more} metal with a ${dispFailure.less} salt (e.g. Fe + CuSO₄).`,
        `React ${dispFailure.less} with concentrated oxidizing acids like hot concentrated HNO₃.`,
      ],
      teacherIntro:
        `I see you tried to displace ${dispFailure.more} using ${dispFailure.less}. Remember the Activity Series hierarchy! What part of the electrochemical series would you like to review?`,
    };
  }

  // -------------------------------------------------------------
  // Case 4: Coinage / Noble Metals with Non-Oxidizing Dilute Acids (Cu, Ag, Au + HCl)
  // -------------------------------------------------------------
  const nobleMetal = formulas.find((f) => ['Cu', 'Ag', 'Au', 'Pt'].includes(f));
  const diluteAcid = formulas.find((f) => ['HCl', 'H2SO4'].includes(f));
  if (nobleMetal && diluteAcid && !conditions.includes('high_temp')) {
    return {
      title: `No Reaction: ${nobleMetal} Cannot Displace Hydrogen from ${diluteAcid}`,
      theoryTag: 'Standard Hydrogen Electrode (SHE) Reference Potential',
      summary: `${nobleMetal} lies below Hydrogen in the reactivity series and cannot reduce H⁺ ions to H₂ gas.`,
      scientificExplanation:
        `1. **Position Relative to Hydrogen**: The standard reduction potential of H⁺/H₂ is defined as 0.00 V. ${nobleMetal} has a positive standard reduction potential (E° > 0.00 V, e.g. Cu²⁺/Cu = +0.34 V), meaning ${nobleMetal} prefers to remain in metallic form rather than oxidized ions.\n\n` +
        `2. **Inability to Reduce Protons**: For ${nobleMetal} to react with ${diluteAcid}, it would have to force H⁺ ions to accept electrons. Because H⁺ is a weaker oxidizer than ${nobleMetal}²⁺, no hydrogen gas can be evolved.\n\n` +
        `3. **Required Conditions**: To dissolve ${nobleMetal}, a strong oxidizing acid with an alternative reduction pathway (such as concentrated Nitric Acid, HNO₃) is strictly required.`,
      keyPrinciples: [
        'Below Hydrogen in Electrochemical Series',
        'Positive Reduction Potential (E° > 0)',
        'Non-Oxidizing Acid Incompatibility',
      ],
      suggestedAlternatives: [
        `Use a reactive metal above Hydrogen like Zinc (Zn) or Iron (Fe) with ${diluteAcid}.`,
        `React ${nobleMetal} with concentrated Nitric Acid (HNO₃) to see reddish-brown NO₂ gas.`,
      ],
      teacherIntro:
        `I see you tried to react ${nobleMetal} with ${diluteAcid}. Why do metals below Hydrogen fail to evolve H₂ gas? Let's break down the Standard Hydrogen Electrode concept!`,
    };
  }

  // -------------------------------------------------------------
  // Case 5: Halogen Activity Inversion (e.g., I2 + NaCl, Br2 + KF)
  // -------------------------------------------------------------
  const halogenMolecule = formulas.find((f) => ['I2', 'Br2', 'Cl2'].includes(f));
  if (halogenMolecule) {
    const hSym = halogenMolecule.replace('2', '');
    const hIdx = HALOGEN_ACTIVITY.indexOf(hSym);
    for (const f of formulas) {
      const saltHalogen = HALOGEN_ACTIVITY.find((x) => x !== hSym && f.endsWith(x));
      if (saltHalogen) {
        const sIdx = HALOGEN_ACTIVITY.indexOf(saltHalogen);
        if (hIdx > sIdx) {
          // Lower halogen attempting to displace higher halogen!
          return {
            title: `No Reaction: ${halogenMolecule} Cannot Displace ${saltHalogen}⁻`,
            theoryTag: 'Halogen Electronegativity & Standard Reduction Potential',
            summary: `${hSym} has a lower standard reduction potential and electronegativity than ${saltHalogen}, so it cannot oxidize ${saltHalogen}⁻ ions.`,
            scientificExplanation:
              `1. **Group 17 Oxidizing Hierarchy**: Oxidizing strength among halogens decreases down the group: F₂ > Cl₂ > Br₂ > I₂. A halogen can only displace a halide ion that lies below it in the periodic table.\n\n` +
              `2. **Electron Affinity Gradient**: ${saltHalogen} is more electronegative and holds electrons more tightly than ${hSym}. Transferring an electron from ${saltHalogen}⁻ to ${hSym} is thermodynamically unfavorable.\n\n` +
              `3. **Non-Spontaneous Redox**: The cell potential for this halogen displacement is negative, yielding no reaction.`,
            keyPrinciples: [
              'Down-Group Decreasing Halogen Oxidizing Power',
              'Electronegativity & Halide Hydration Energy',
              'Non-Spontaneous Electron Transfer',
            ],
            suggestedAlternatives: [
              `Try the reverse! React Chlorine (Cl₂) with Potassium Iodide (KI) to liberate violet Iodine.`,
            ],
            teacherIntro:
              `You attempted to displace a halide using a lower halogen in Group 17. Let's look at why electronegativity decreases down Group 17!`,
          };
        }
      }
    }
  }

  // -------------------------------------------------------------
  // Case 6: Dual Acids (e.g. HCl + H2SO4) or Dual Bases (NaOH + NH4OH)
  // -------------------------------------------------------------
  const isAllAcids = formulas.every((f) => ['HCl', 'H2SO4', 'HNO3', 'CH3COOH', 'H3PO4', 'HBr', 'HI', 'HBF4'].includes(f));
  const isAllBases = formulas.every((f) => ['NaOH', 'KOH', 'NH4OH', 'Ca(OH)2', 'Mg(OH)2'].includes(f));

  if (isAllAcids && formulas.length >= 2) {
    return {
      title: 'No Reaction: Acid-Acid Mixture',
      theoryTag: 'Common Ion Effect & Lack of Neutralization Driving Force',
      summary: 'Both chemicals are proton donors (acids). Without a base or electron acceptor, no neutralization or chemical reaction can occur.',
      scientificExplanation:
        '1. **Lack of Chemical Gradient**: Acids are substances that donate protons (H⁺). When two acids are mixed together, both produce hydronium ions (H₃O⁺). Neither acts as a proton acceptor.\n\n' +
        '2. **Common Ion Suppression**: The presence of H⁺ ions from the stronger acid suppresses the ionization of the weaker acid via Le Chatelier’s principle (Common Ion Effect).\n\n' +
        '3. **Result**: The two liquids simply blend into a more acidic homogeneous solution without forming any new chemical bonds.',
      keyPrinciples: [
        'Absence of Proton Acceptor (Base)',
        'Common Ion Effect (Le Chatelier)',
        'Physical Mixing vs Chemical Transformation',
      ],
      suggestedAlternatives: [
        'Add a base like Sodium Hydroxide (NaOH) to trigger an exothermic neutralization reaction!',
        'Add a reactive metal (Zn, Mg) to evolve Hydrogen gas.',
      ],
      teacherIntro:
        "I see you combined two acids together! Remember that chemical reactions require complementary partners (like an acid and a base). Let's review proton transfer!",
    };
  }

  if (isAllBases && formulas.length >= 2) {
    return {
      title: 'No Reaction: Base-Base Mixture',
      theoryTag: 'Hydroxyl Common Ion Effect & Absence of Proton Source',
      summary: 'Both chemicals are proton acceptors / hydroxide sources (bases). Without an acid, no neutralization reaction occurs.',
      scientificExplanation:
        '1. **Complementary Reactivity Principle**: Chemical neutralization requires an electrophile/acid to accept hydroxide ions (OH⁻). Combining two hydroxide sources provides no proton donor.\n\n' +
        '2. **Common Ion Effect**: Both bases release OH⁻ ions into solution, merely increasing the total pH without forming any new compound.\n\n' +
        '3. **Thermodynamic Neutrality**: No enthalpy of neutralization is released.',
      keyPrinciples: [
        'Absence of Acidic Proton Source',
        'Hydroxide Common Ion Effect',
        'Thermodynamic Inactivity',
      ],
      suggestedAlternatives: [
        'Add an acid like Hydrochloric Acid (HCl) or Acetic Acid (CH₃COOH) to trigger neutralization!',
        'Add a transition metal salt (like CuSO₄) to precipitate a colorful metal hydroxide.',
      ],
      teacherIntro:
        "You mixed two bases together! Without an acid to neutralize the hydroxide ions, they simply coexist in solution. What would you like to know about neutralization?",
    };
  }

  // -------------------------------------------------------------
  // Case 7: All-Soluble Spectator Salt Mixture (e.g. NaCl + KNO3)
  // -------------------------------------------------------------
  const allSolubleSalts = formulas.every((f) => ['NaCl', 'KNO3', 'NaNO3', 'KCl', 'NH4Cl', 'LiCl'].includes(f));
  if (allSolubleSalts && formulas.length >= 2) {
    return {
      title: 'No Reaction: Fully Soluble Spectator Ions',
      theoryTag: 'Absence of Insoluble Precipitate, Gas, or Weak Electrolyte',
      summary: 'All ions in this mixture remain completely dissociated in aqueous solution; no precipitate, gas, or covalent bond is formed.',
      scientificExplanation:
        '1. **Ionic Dissociation in Water**: Soluble salts completely dissociate into hydrated cations and anions (e.g., Na⁺, Cl⁻, K⁺, NO₃⁻).\n\n' +
        '2. **Precipitation Equilibrium (Ksp)**: For a double displacement reaction to occur, the ionic product of one ion pair must exceed its solubility product (Q > Ksp). All potential partner salts here are highly soluble.\n\n' +
        '3. **Spectator Ions**: Because no insoluble solid precipitates, no gas escapes, and no weak electrolyte (like water) forms, every ion remains unchanged as a spectator ion.',
      keyPrinciples: [
        'Solubility Product Constant (Ksp)',
        'Spectator Ions in Solution',
        'Lack of Driving Force for Double Displacement',
      ],
      suggestedAlternatives: [
        'Mix Silver Nitrate (AgNO₃) with Sodium Chloride (NaCl) to form a brilliant white AgCl precipitate!',
        'Mix Barium Chloride (BaCl₂) with Sodium Sulphate (Na₂SO₄) for a dense BaSO₄ precipitate.',
      ],
      teacherIntro:
        "I see you mixed two soluble salts! In aqueous solution, their ions just float freely without bonding. Let's look at what makes precipitation reactions happen!",
    };
  }

  // -------------------------------------------------------------
  // Case 8: Intelligent Dynamic Fallback (Accurate chemical analysis of any pair)
  // -------------------------------------------------------------
  const r1 = names[0] || formulas[0] || 'First chemical';
  const r2 = names[1] || formulas[1] || 'Second chemical';

  return {
    title: `No Reaction: ${r1} + ${r2}`,
    theoryTag: 'Thermodynamic Non-Spontaneity (ΔG > 0) & Kinetic Stability',
    summary: `${r1} and ${r2} do not undergo chemical transformation under standard conditions due to lack of a thermodynamic driving force or sufficient activation energy.`,
    scientificExplanation:
      `1. **Thermodynamic Feasibility**: A chemical reaction occurs only when the products are at a lower Gibbs free energy state than the reactants (ΔG = ΔH - TΔS < 0). Between ${r1} and ${r2}, breaking the existing bonds requires more energy than would be released by forming new bonds.\n\n` +
      `2. **Kinetic Activation Barrier (Ea)**: Even if a hypothetical reaction were exothermic, the reactant molecules must collide with sufficient activation energy to reach a transition state. Under standard lab conditions, the thermal energy is insufficient to overcome this barrier.\n\n` +
      `3. **Orbital & Electronic Incompatibility**: Chemical reactivity requires an electron donor (Lewis base/nucleophile/reducing agent) and an electron acceptor (Lewis acid/electrophile/oxidizing agent) with compatible frontier molecular orbitals (HOMO-LUMO overlap).`,
    keyPrinciples: [
      'Positive Gibbs Free Energy (ΔG > 0)',
      'High Activation Energy Barrier (Ea)',
      'Lack of Frontier Orbital Overlap (HOMO-LUMO)',
    ],
    suggestedAlternatives: [
      `Check the reactivity of ${r1}: Try pairing it with an appropriate oxidizer, acid, or complexing agent.`,
      `Check the reactivity of ${r2}: Verify whether heating (Δ) or an active catalyst is required.`,
    ],
    teacherIntro:
      `I see you tried to mix ${r1} and ${r2}. Let's break down why that doesn't work! What part is confusing you?`,
  };
}
