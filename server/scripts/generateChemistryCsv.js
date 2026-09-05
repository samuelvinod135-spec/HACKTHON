import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputFile = path.join(__dirname, '..', 'data', 'chemistry_questions.csv');

// JEE Chemistry Chapters and curated question templates
const CHAPTER_DEFINITIONS = [
  {
    chapter: 'Some Basic Concepts of Chemistry',
    topic: 'Mole Concept & Stoichiometry',
    templates: [
      {
        q: 'The number of moles of solute present in 1 liter of solution is defined as:',
        options: ['Molality', 'Molarity', 'Mole fraction', 'Normality'],
        correct: 'B',
        ans: 'Molarity',
        exp: 'Molarity (M) = moles of solute / volume of solution in liters.',
      },
      {
        q: 'How many atoms are present in 1 mole of oxygen gas (O₂)?',
        options: ['6.022 × 10²³', '1.204 × 10²⁴', '3.011 × 10²³', '2.408 × 10²⁴'],
        correct: 'B',
        ans: '1.204 × 10²⁴',
        exp: '1 mole of O₂ contains 2 moles of oxygen atoms = 2 × 6.022 × 10²³ = 1.204 × 10²⁴ atoms.',
      },
      {
        q: 'In the combustion of methane: CH₄ + 2O₂ → CO₂ + 2H₂O, how many moles of O₂ are required for 3 moles of CH₄?',
        options: ['3 moles', '6 moles', '2 moles', '8 moles'],
        correct: 'B',
        ans: '6 moles',
        exp: 'Stoichiometric ratio of CH₄ to O₂ is 1:2. Thus 3 moles of CH₄ require 3 × 2 = 6 moles of O₂.',
      },
      {
        q: 'Which concentration unit remains independent of temperature change?',
        options: ['Molarity', 'Molality', 'Normality', 'Formality'],
        correct: 'B',
        ans: 'Molality',
        exp: 'Molality is based on the mass of the solvent (kg), which does not change with temperature.',
      },
    ],
  },
  {
    chapter: 'Structure of Atom',
    topic: 'Quantum Numbers & Atomic Orbitals',
    templates: [
      {
        q: 'The maximum number of electrons that can be accommodated in a principal quantum shell n is given by:',
        options: ['2n', '2n²', 'n²', '4n + 2'],
        correct: 'B',
        ans: '2n²',
        exp: 'Each shell has n² orbitals, and each orbital can hold 2 electrons according to Pauli exclusion: 2n².',
      },
      {
        q: 'Which set of quantum numbers (n, l, m_l, s) is NOT permissible for an electron in an atom?',
        options: ['3, 2, -1, +1/2', '2, 1, 0, -1/2', '1, 1, 0, +1/2', '4, 3, +2, -1/2'],
        correct: 'C',
        ans: '1, 1, 0, +1/2',
        exp: 'For n = 1, the only permitted value for l is 0 (since l ranges from 0 to n-1). l = 1 is invalid.',
      },
      {
        q: 'The de Broglie wavelength associated with an electron moving with velocity v is given by:',
        options: ['h / (mv)', 'mv / h', 'h / (2mv)', 'm / (hv)'],
        correct: 'A',
        ans: 'h / (mv)',
        exp: 'de Broglie hypothesis relates wavelength to momentum: λ = h / p = h / (mv).',
      },
      {
        q: 'Heisenberg’s uncertainty principle is represented mathematically as:',
        options: ['Δx · Δp ≥ h/(4π)', 'Δx · Δp ≤ h/(2π)', 'Δx · Δv ≥ h/(4πm)', 'Δx · Δp = h/π'],
        correct: 'A',
        ans: 'Δx · Δp ≥ h/(4π)',
        exp: 'The product of uncertainties in position and momentum is at least h/(4π).',
      },
    ],
  },
  {
    chapter: 'Chemical Bonding & Molecular Structure',
    topic: 'VSEPR Theory & Hybridization',
    templates: [
      {
        q: 'What is the hybridization and molecular geometry of water (H₂O)?',
        options: ['sp, Linear', 'sp², Trigonal planar', 'sp³, Bent / V-shaped', 'sp³d, T-shaped'],
        correct: 'C',
        ans: 'sp³, Bent / V-shaped',
        exp: 'Oxygen in H₂O has 2 bonding pairs and 2 lone pairs (steric number 4 → sp³), with a bent geometry due to lp-lp repulsion.',
      },
      {
        q: 'Which molecule has a dipole moment of zero due to symmetrical shape?',
        options: ['NH₃', 'BF₃', 'SO₂', 'H₂O'],
        correct: 'B',
        ans: 'BF₃',
        exp: 'BF₃ has a symmetrical trigonal planar shape (sp²); the bond dipoles cancel each other out completely, giving μ = 0.',
      },
      {
        q: 'According to Molecular Orbital Theory, what is the bond order of the O₂ molecule?',
        options: ['1', '1.5', '2', '2.5'],
        correct: 'C',
        ans: '2',
        exp: 'Bond order = (N_b - N_a) / 2 = (10 - 6) / 2 = 2, indicating a stable double bond with paramagnetic character.',
      },
      {
        q: 'Which of the following compounds exhibits intramolecular hydrogen bonding?',
        options: ['o-Nitrophenol', 'p-Nitrophenol', 'Ethanol', 'Water'],
        correct: 'A',
        ans: 'o-Nitrophenol',
        exp: 'In ortho-nitrophenol, the -OH and -NO₂ groups are adjacent, forming a 6-membered chelate ring via intramolecular H-bonding.',
      },
    ],
  },
  {
    chapter: 'Chemical Thermodynamics',
    topic: 'Enthalpy, Entropy & Gibbs Free Energy',
    templates: [
      {
        q: 'For a process to be spontaneous at constant temperature and pressure, the change in Gibbs free energy (ΔG) must be:',
        options: ['Positive (> 0)', 'Negative (< 0)', 'Zero (= 0)', 'Infinite'],
        correct: 'B',
        ans: 'Negative (< 0)',
        exp: 'The criterion for spontaneity under constant T and P is ΔG < 0 (exergonic process).',
      },
      {
        q: 'The mathematical expression of the First Law of Thermodynamics is:',
        options: ['ΔU = q + w', 'ΔU = q - w', 'ΔH = ΔU + PΔV', 'ΔG = ΔH - TΔS'],
        correct: 'A',
        ans: 'ΔU = q + w',
        exp: 'By IUPAC convention, change in internal energy equals heat supplied to the system plus work done ON the system.',
      },
      {
        q: 'In an isolated system undergoing an irreversible spontaneous change, the total entropy change (ΔS_universe) is:',
        options: ['Always zero', 'Always positive', 'Always negative', 'Decreasing continuously'],
        correct: 'B',
        ans: 'Always positive',
        exp: 'The Second Law of Thermodynamics states that spontaneous processes in isolated systems lead to an increase in total entropy (ΔS > 0).',
      },
      {
        q: 'For an adiabatic reversible expansion of an ideal gas, which relationship is constant?',
        options: ['P · V', 'P · V^γ', 'T · V', 'P / T'],
        correct: 'B',
        ans: 'P · V^γ',
        exp: 'For a reversible adiabatic process involving an ideal gas, P · V^γ = constant, where γ = Cp / Cv.',
      },
    ],
  },
  {
    chapter: 'Equilibrium',
    topic: 'Chemical & Ionic Equilibrium',
    templates: [
      {
        q: 'According to Le Chatelier’s principle, increasing the pressure in the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) will:',
        options: ['Shift equilibrium to the left', 'Shift equilibrium to the right', 'Have no effect on equilibrium', 'Stop the reaction completely'],
        correct: 'B',
        ans: 'Shift equilibrium to the right',
        exp: 'Higher pressure favors the side with fewer gas moles (4 moles reactants → 2 moles product), shifting equilibrium forward.',
      },
      {
        q: 'What is the pH of a 1.0 × 10⁻³ M aqueous HCl solution at 25 °C?',
        options: ['1', '3', '7', '11'],
        correct: 'B',
        ans: '3',
        exp: 'HCl is a strong acid that dissociates completely: [H⁺] = 1.0 × 10⁻³ M. pH = -log[H⁺] = -log(10⁻³) = 3.',
      },
      {
        q: 'A buffer solution resists changes in pH because it consists of:',
        options: ['A strong acid and strong base', 'A weak acid and its conjugate base', 'A pure neutral salt', 'Concentrated sulfuric acid'],
        correct: 'B',
        ans: 'A weak acid and its conjugate base',
        exp: 'Buffers neutralize added small amounts of H⁺ or OH⁻ through reaction with the conjugate base or weak acid respectively.',
      },
      {
        q: 'For the dissolution of AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq), the solubility product constant is expressed as:',
        options: ['Ksp = [Ag⁺][Cl⁻]', 'Ksp = [Ag⁺] + [Cl⁻]', 'Ksp = [Ag⁺][Cl⁻] / [AgCl]', 'Ksp = [Ag⁺]²[Cl⁻]'],
        correct: 'A',
        ans: 'Ksp = [Ag⁺][Cl⁻]',
        exp: 'The pure solid AgCl activity is unity, so the solubility product expression is simply Ksp = [Ag⁺][Cl⁻].',
      },
    ],
  },
  {
    chapter: 'Redox Reactions & Electrochemistry',
    topic: 'Electrochemical Cells & Nernst Equation',
    templates: [
      {
        q: 'In a Daniell cell (Zn-Cu), the oxidation half-reaction occurs at the:',
        options: ['Cathode', 'Anode', 'Salt bridge', 'External voltmeter'],
        correct: 'B',
        ans: 'Anode',
        exp: 'Oxidation (loss of electrons: Zn → Zn²⁺ + 2e⁻) always occurs at the anode of an electrochemical cell.',
      },
      {
        q: 'The standard reduction potential of Zn²⁺/Zn is -0.76 V and Cu²⁺/Cu is +0.34 V. The standard EMF of the cell is:',
        options: ['+0.42 V', '+1.10 V', '-1.10 V', '+0.76 V'],
        correct: 'B',
        ans: '+1.10 V',
        exp: 'E°cell = E°cathode - E°anode = +0.34 V - (-0.76 V) = +1.10 V.',
      },
      {
        q: 'According to Faraday’s First Law of Electrolysis, the mass of substance deposited (m) is directly proportional to:',
        options: ['Temperature', 'Quantity of electric charge passed (Q)', 'Electrolyte volume', 'Electrode area only'],
        correct: 'B',
        ans: 'Quantity of electric charge passed (Q)',
        exp: 'm = Z · Q = Z · I · t, where Z is the electrochemical equivalent and Q is the charge in coulombs.',
      },
      {
        q: 'The Nernst equation connects the cell potential (E) with reaction quotient (Q) at 298 K as:',
        options: ['E = E° - (0.0591/n) log Q', 'E = E° + (0.0591/n) log Q', 'E = E° · log Q', 'E = E° / (nF)'],
        correct: 'A',
        ans: 'E = E° - (0.0591/n) log Q',
        exp: 'At 298 K, (2.303 RT / F) ≈ 0.0591 V, giving E = E° - (0.0591 / n) log Q.',
      },
    ],
  },
  {
    chapter: 'Chemical Kinetics',
    topic: 'Rate Laws & Arrhenius Equation',
    templates: [
      {
        q: 'For a first-order chemical reaction, the half-life period (t₁/₂) is:',
        options: ['Directly proportional to initial concentration [A]₀', 'Independent of initial concentration [A]₀', 'Inversely proportional to [A]₀²', 'Proportional to square root of [A]₀'],
        correct: 'B',
        ans: 'Independent of initial concentration [A]₀',
        exp: 'For first-order kinetics, t₁/₂ = 0.693 / k, which is strictly independent of the initial reactant concentration.',
      },
      {
        q: 'The unit of rate constant for a zero-order reaction is:',
        options: ['s⁻¹', 'mol L⁻¹ s⁻¹', 'L mol⁻¹ s⁻¹', 'L² mol⁻² s⁻¹'],
        correct: 'B',
        ans: 'mol L⁻¹ s⁻¹',
        exp: 'Rate = k[A]⁰ = k. Since rate has units of concentration/time (mol L⁻¹ s⁻¹), the zero-order rate constant has the same units.',
      },
      {
        q: 'According to the Arrhenius equation k = A · e^(-Ea / RT), a catalyst accelerates a reaction by:',
        options: ['Increasing activation energy (Ea)', 'Decreasing activation energy (Ea)', 'Increasing temperature (T)', 'Changing reaction enthalpy (ΔH)'],
        correct: 'B',
        ans: 'Decreasing activation energy (Ea)',
        exp: 'A catalyst provides an alternative reaction pathway with a lower activation energy barrier, greatly increasing rate constant k.',
      },
      {
        q: 'If the rate law for 2A + B → C is Rate = k[A]²[B], what is the overall order of the reaction?',
        options: ['First order', 'Second order', 'Third order', 'Zero order'],
        correct: 'C',
        ans: 'Third order',
        exp: 'Overall order is the sum of exponents in the rate equation: 2 (with respect to A) + 1 (with respect to B) = 3.',
      },
    ],
  },
  {
    chapter: 'Solutions',
    topic: 'Colligative Properties & Raoult’s Law',
    templates: [
      {
        q: 'According to Raoult’s law, the partial vapor pressure of a solvent in solution is proportional to its:',
        options: ['Molarity', 'Mole fraction', 'Mass percentage', 'Osmotic pressure'],
        correct: 'B',
        ans: 'Mole fraction',
        exp: 'P_solvent = P°_solvent · X_solvent, where X is the mole fraction of the solvent in the solution.',
      },
      {
        q: 'Which of the following is NOT a colligative property of dilute solutions?',
        options: ['Relative lowering of vapor pressure', 'Elevation in boiling point', 'Optical rotation', 'Depression in freezing point'],
        correct: 'C',
        ans: 'Optical rotation',
        exp: 'Optical rotation depends on the chiral molecular structure, not solely on the number of solute particles present.',
      },
      {
        q: 'For a solute that undergoes complete dimerization in a solvent (2A ⇌ A₂), the van ‘t Hoff factor (i) is:',
        options: ['0.5', '1.0', '1.5', '2.0'],
        correct: 'A',
        ans: '0.5',
        exp: 'For complete association into dimers: i = 1 - (1 - 1/n)α = 1 - (1 - 1/2)(1) = 0.5.',
      },
      {
        q: 'The osmotic pressure (Π) of a solution containing molar concentration C at absolute temperature T is given by:',
        options: ['Π = C · R · T', 'Π = C / (R · T)', 'Π = R · T / C', 'Π = C² · R · T'],
        correct: 'A',
        ans: 'Π = C · R · T',
        exp: 'van ‘t Hoff equation for osmotic pressure is Π = CRT = (n / V)RT.',
      },
    ],
  },
  {
    chapter: 'Periodic Classification & Periodicity',
    topic: 'Atomic Trends & Ionization Enthalpy',
    templates: [
      {
        q: 'Across a period from left to right in the modern periodic table, atomic radii generally:',
        options: ['Increase', 'Decrease', 'Remain constant', 'Increase then decrease'],
        correct: 'B',
        ans: 'Decrease',
        exp: 'Effective nuclear charge (Z_eff) increases across a period pulling electrons closer to the nucleus, decreasing atomic radius.',
      },
      {
        q: 'Why does Nitrogen have a higher first ionization enthalpy than Oxygen?',
        options: ['Nitrogen is more electronegative', 'Nitrogen has a stable half-filled 2p³ subshell', 'Oxygen has higher screening effect', 'Nitrogen has larger atomic size'],
        correct: 'B',
        ans: 'Nitrogen has a stable half-filled 2p³ subshell',
        exp: 'Nitrogen configuration is 1s² 2s² 2p³ (extra stable half-filled), requiring more energy to remove an electron than Oxygen (2p⁴).',
      },
      {
        q: 'Which element exhibits the highest electronegativity value on the Pauling scale?',
        options: ['Chlorine', 'Oxygen', 'Fluorine', 'Nitrogen'],
        correct: 'C',
        ans: 'Fluorine',
        exp: 'Fluorine has the highest electronegativity of all elements (approx 4.0 on the Pauling scale) due to small size and high effective nuclear pull.',
      },
      {
        q: 'Which property describes elements that can behave as both an acid and a base?',
        options: ['Allotropic', 'Amphoteric', 'Isomeric', 'Polymorphic'],
        correct: 'B',
        ans: 'Amphoteric',
        exp: 'Amphoteric oxides/hydroxides (such as Al₂O₃, ZnO) react with both strong acids and strong bases to yield salts and water.',
      },
    ],
  },
  {
    chapter: 'Organic Chemistry - Basics & Hydrocarbons',
    topic: 'IUPAC, Isomerism & Electrophiles',
    templates: [
      {
        q: 'What is the IUPAC name of CH₃-CH(CH₃)-CH₂-CH₃?',
        options: ['2-Methylbutane', 'Isopentane', '3-Methylbutane', 'Pentane'],
        correct: 'A',
        ans: '2-Methylbutane',
        exp: 'The longest carbon chain has 4 carbons (butane), numbered from left to give the methyl substituent the lowest locant (2).',
      },
      {
        q: 'According to Markovnikov’s rule, the addition of HBr to propene (CH₃-CH=CH₂) predominantly yields:',
        options: ['1-Bromopropane', '2-Bromopropane', '1,2-Dibromopropane', '2,2-Dibromopropane'],
        correct: 'B',
        ans: '2-Bromopropane',
        exp: 'The electrophilic H⁺ adds to the carbon with more hydrogen atoms (C1) to form the more stable 2° carbocation intermediate, yielding 2-bromopropane.',
      },
      {
        q: 'Which species functions as a classic electrophile in aromatic substitution?',
        options: ['NO₂⁺ (Nitronium ion)', 'OH⁻', 'NH₃', 'Cl⁻'],
        correct: 'A',
        ans: 'NO₂⁺ (Nitronium ion)',
        exp: 'NO₂⁺ is electron deficient with a positive formal charge, acting as an active electrophile in the nitration of benzene.',
      },
      {
        q: 'Which of the following compounds exhibits geometrical (cis-trans) isomerism?',
        options: ['Ethene', 'Propene', 'But-2-ene', '2-Methylpropene'],
        correct: 'C',
        ans: 'But-2-ene',
        exp: 'But-2-ene (CH₃-CH=CH-CH₃) has two different groups attached to each double-bonded carbon, allowing cis and trans configurations.',
      },
    ],
  },
  {
    chapter: 'Coordination Compounds',
    topic: 'Ligands, Werner Theory & Crystal Field',
    templates: [
      {
        q: 'What is the oxidation state of Iron in potassium ferrocyanide K₄[Fe(CN)₆]?',
        options: ['+2', '+3', '+4', '0'],
        correct: 'A',
        ans: '+2',
        exp: '4(+1) + Fe + 6(-1) = 0 → Fe - 2 = 0 → Fe = +2.',
      },
      {
        q: 'Which of the following ligands is a classic bidentate chelating ligand?',
        options: ['Ammonia (NH₃)', 'Chloride (Cl⁻)', 'Ethylenediamine (en)', 'Cyanide (CN⁻)'],
        correct: 'C',
        ans: 'Ethylenediamine (en)',
        exp: 'Ethylenediamine (H₂N-CH₂-CH₂-NH₂) coordinates through two donor nitrogen atoms to a single metal center, forming a stable 5-membered chelate ring.',
      },
      {
        q: 'According to Crystal Field Theory, for an octahedral d⁶ strong-field complex (e.g. [Fe(CN)₆]⁴⁻), the electronic configuration is:',
        options: ['t₂g⁴ eg²', 't₂g⁶ eg⁰', 't₂g³ eg³', 't₂g⁵ eg¹'],
        correct: 'B',
        ans: 't₂g⁶ eg⁰',
        exp: 'Strong field ligands like CN⁻ create large crystal field splitting (Δ_o > P), causing all 6 d-electrons to pair up in the lower t₂g orbitals (diamagnetic low-spin).',
      },
      {
        q: 'The coordination number of Cobalt in the complex ion [Co(NH₃)₆]³⁺ is:',
        options: ['3', '4', '6', '12'],
        correct: 'C',
        ans: '6',
        exp: 'Six monodentate NH₃ molecules coordinate to the central Co³⁺ cation, giving coordination number 6.',
      },
    ],
  },
];

const EXAM_LEVELS = [
  { level: 'Main-Easy', xp: 5, prefix: 'In a standard fundamental scenario,' },
  { level: 'Main-Moderate', xp: 10, prefix: 'For a JEE Main application,' },
  { level: 'Main-Hard', xp: 15, prefix: 'In an advanced analytical context,' },
  { level: 'Advanced', xp: 20, prefix: 'For a quantitative JEE Advanced conceptual analysis,' },
];

function generateChemistryQuestions() {
  const rows = [];
  rows.push([
    'id',
    'subject',
    'chapter',
    'topic',
    'exam_level',
    'question_type',
    'question',
    'option_A',
    'option_B',
    'option_C',
    'option_D',
    'correct_option',
    'answer',
    'explanation',
    'source',
    'xp',
  ]);

  let globalId = 1;

  for (const ch of CHAPTER_DEFINITIONS) {
    // Generate 100 questions per chapter
    for (let i = 0; i < 100; i++) {
      const template = ch.templates[i % ch.templates.length];
      const levelInfo = EXAM_LEVELS[i % EXAM_LEVELS.length];
      const cleanChapterName = ch.chapter.replace(/[^a-zA-Z0-9]/g, '_');
      const id = `CHEM_${String(globalId).padStart(4, '0')}_${cleanChapterName}`;

      let questionText = template.q;
      if (levelInfo.level !== 'Main-Easy') {
        questionText = `${levelInfo.prefix} ${template.q.charAt(0).toLowerCase() + template.q.slice(1)}`;
      }

      rows.push([
        id,
        'Chemistry',
        `"${ch.chapter.replace(/"/g, '""')}"`,
        `"${ch.topic.replace(/"/g, '""')}"`,
        levelInfo.level,
        'MCQ',
        `"${questionText.replace(/"/g, '""')}"`,
        `"${template.options[0].replace(/"/g, '""')}"`,
        `"${template.options[1].replace(/"/g, '""')}"`,
        `"${template.options[2].replace(/"/g, '""')}"`,
        `"${template.options[3].replace(/"/g, '""')}"`,
        template.correct,
        `"${template.ans.replace(/"/g, '""')}"`,
        `"${template.exp.replace(/"/g, '""')}"`,
        'Original JEE Chemistry question collection for LabXplore',
        levelInfo.xp,
      ]);
      globalId++;
    }
  }

  const csvContent = rows.map((r) => r.join(',')).join('\n');
  fs.writeFileSync(outputFile, csvContent, 'utf8');
  console.log(`Generated ${rows.length - 1} chemistry questions in ${outputFile}`);
}

generateChemistryQuestions();
