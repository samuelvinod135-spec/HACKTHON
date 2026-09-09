// Master Chemistry Experiments Catalog (107 Comprehensive CBSE/NCERT Experiments)
// Covers:
// - Class 10 Foundation Practicals (1-15)
// - Class 11 Practical Chemistry & Techniques (16-50)
// - Class 12 Qualitative Salt Analysis (51-75)
// - Class 12 Volumetric Quantitative Analysis & Titrations (76-85)
// - Class 12 Organic Functional Group Identification (86-95)
// - Class 12 Chemical Kinetics, Electrochemistry, Preparations & Biomolecules (96-107)

export const EXPERIMENTS_CATALOG = [
  {
    "id": "exp_c10_01_quicklime",
    "title": "Combination: Reaction of Quicklime (CaO) with Water",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To observe the combination reaction between Calcium Oxide (Quicklime) and water and study the temperature change.",
    "apparatus": [
      "Beaker (250 mL)",
      "Glass stirring rod",
      "Thermometer",
      "Spatula",
      "Watch glass"
    ],
    "chemicals": [
      "Calcium Oxide (Quicklime, CaO lumps)",
      "Distilled water",
      "Red and Blue Litmus paper"
    ],
    "procedure": [
      "Take about 10 g of quicklime lumps in a clean 250 mL beaker.",
      "Slowly add about 50 mL of distilled water to the beaker.",
      "Observe the vigorous hissing sound, bubbling, and generation of steam.",
      "Carefully touch the outside of the beaker or measure temperature with a thermometer.",
      "Test the resulting suspension (slaked lime) with red litmus paper."
    ],
    "chemicalEquation": "CaO(s) + H₂O(l) ──► Ca(OH)₂(aq) + Heat (ΔH = -63.7 kJ/mol)",
    "observation": "Hissing sound is heard, beaker becomes intensely hot to touch, white suspension is formed, red litmus turns blue.",
    "result": "The reaction is a highly exothermic combination reaction forming basic Calcium Hydroxide (Slaked Lime).",
    "explanation": "Quicklime vigorously combines with water in a combination reaction releasing high lattice and hydration enthalpy.",
    "safety": "Quicklime causes severe skin burns on contact with moisture; handle only with spatula and wear goggles.",
    "relatedReactions": [
      "Slaking of lime",
      "Limewater milky test with CO2"
    ],
    "vivaQuestions": [
      {
        "q": "Why does the temperature rise during this reaction?",
        "a": "Because bond formation between Ca2+, OH- and water molecules releases more energy than needed to break CaO lattice bonds (exothermic reaction)."
      },
      {
        "q": "Why does the solution turn red litmus blue?",
        "a": "Calcium hydroxide dissociates into Ca2+ and OH- ions in aqueous solution, creating an alkaline medium with pH > 12."
      },
      {
        "q": "What is slaked lime used for in construction?",
        "a": "Used for whitewashing walls; it reacts slowly with atmospheric CO2 to form a glossy, hard layer of CaCO3."
      }
    ]
  },
  {
    "id": "exp_c10_02_feso4_decomp",
    "title": "Decomposition: Thermal Decomposition of Ferrous Sulphate Crystals",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Medium",
    "aim": "To observe the thermal decomposition of Ferrous Sulphate crystals and detect evolved gases.",
    "apparatus": [
      "Boiling tube (hard glass)",
      "Test tube holder",
      "Bunsen burner",
      "Moist blue litmus paper",
      "Filter paper soaked in acidified K2Cr2O7"
    ],
    "chemicals": [
      "Ferrous sulphate crystals (FeSO4·7H2O, green vitriol)"
    ],
    "procedure": [
      "Take 2 g of dry green ferrous sulphate crystals in a clean, dry boiling tube.",
      "Hold the boiling tube with a test tube holder tilted away from yourself and others.",
      "Heat gently over the burner flame first, then strongly.",
      "Observe the color changes of the solid and the condensation of water droplets on the upper cooler walls.",
      "Waft the pungent burning sulphur smell gently toward your nose.",
      "Test the escaping fumes with moist blue litmus paper and acidified potassium dichromate paper."
    ],
    "chemicalEquation": "2 FeSO₄·7H₂O(s) ──(Δ)──► Fe₂O₃(s) + SO₂(g)↑ + SO₃(g)↑ + 14 H₂O(g)",
    "observation": "Green crystals first turn white (loss of water of crystallization) then brown-red (Fe2O3). Suffocating fumes of burning sulphur evolve that turn moist blue litmus red and turn orange dichromate paper green.",
    "result": "Ferrous sulphate undergoes thermal decomposition into ferric oxide residue and acidic sulphur dioxide/trioxide gases.",
    "explanation": "Endothermic breakdown of FeSO4 at high temperature yields solid Fe2O3 and acidic gases SO2 and SO3.",
    "safety": "SO2 and SO3 gases are choking, toxic and corrosive; never inhale directly. Perform in a well-ventilated fume area.",
    "relatedReactions": [
      "Lead nitrate decomposition",
      "Copper carbonate decomposition"
    ],
    "vivaQuestions": [
      {
        "q": "What is the color change of ferrous sulphate crystals upon initial heating?",
        "a": "Green FeSO4·7H2O loses its 7 water molecules of crystallization to become dirty white anhydrous FeSO4."
      },
      {
        "q": "Why does acidified potassium dichromate paper turn green?",
        "a": "SO2 reduces orange Cr(VI) in Cr2O7(2-) to green Cr(III) sulphate: Cr2(SO4)3."
      },
      {
        "q": "Is this reaction redox or non-redox?",
        "a": "It is an intramolecular redox decomposition where Fe(II) is oxidized to Fe(III) while S(VI) is partially reduced to S(IV) in SO2."
      }
    ]
  },
  {
    "id": "exp_c10_03_fe_cuso4_disp",
    "title": "Single Displacement: Iron Nails in Copper Sulphate Solution",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To observe the single displacement reaction between metallic iron and aqueous copper sulphate solution.",
    "apparatus": [
      "Two test tubes",
      "Test tube stand",
      "Sandpaper",
      "Thread",
      "Measuring cylinder (50 mL)"
    ],
    "chemicals": [
      "Copper(II) sulphate crystals (CuSO4·5H2O)",
      "Distilled water",
      "Clean iron nails"
    ],
    "procedure": [
      "Clean three iron nails thoroughly with sandpaper to expose shiny metallic iron.",
      "Prepare 20 mL of blue CuSO4 solution in a beaker.",
      "Pour 10 mL of CuSO4 solution into test tube A and 10 mL into test tube B (control).",
      "Tie two cleaned iron nails with a thread and immerse them into test tube A for 20 minutes.",
      "Take out the iron nails and compare them with the third unreacted iron nail.",
      "Compare the blue color intensity of test tube A with control test tube B."
    ],
    "chemicalEquation": "Fe(s) + CuSO₄(aq) ──► FeSO₄(aq) + Cu(s)↓",
    "observation": "The deep blue copper sulphate solution fades to light green (FeSO4). The submerged iron nails become coated with a reddish-brown deposit of metallic copper.",
    "result": "Iron displaces copper from copper sulphate because iron is more electropositive (more reactive) than copper.",
    "explanation": "Electrochemical displacement: Fe has standard reduction potential E° = -0.44 V while Cu has E° = +0.34 V. Iron readily oxidizes to Fe2+ while Cu2+ is reduced to Cu(s).",
    "safety": "Copper salts are harmful if ingested; wash hands after handling.",
    "relatedReactions": [
      "Zinc with copper sulphate",
      "Copper with silver nitrate"
    ],
    "vivaQuestions": [
      {
        "q": "Why does the blue color fade during the reaction?",
        "a": "Because hydrated Cu2+ ions responsible for the blue color are reduced and removed from the solution, replaced by pale green Fe2+ ions."
      },
      {
        "q": "What would happen if a copper wire was placed into ferrous sulphate solution?",
        "a": "No reaction would occur because copper is less reactive than iron and cannot displace Fe2+."
      },
      {
        "q": "Why must iron nails be cleaned with sandpaper before the experiment?",
        "a": "To remove the inert surface rust (Fe2O3·xH2O) and grease so metallic iron can directly contact Cu2+ ions."
      }
    ]
  },
  {
    "id": "exp_c10_04_na2so4_bacl2_doubledisp",
    "title": "Double Displacement: Precipitation of Barium Sulphate",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To observe the double displacement and precipitation reaction between Sodium Sulphate and Barium Chloride solutions.",
    "apparatus": [
      "Two test tubes",
      "Test tube rack",
      "Dropper",
      "Conical flask"
    ],
    "chemicals": [
      "Sodium sulphate solution (Na2SO4, 0.1 M)",
      "Barium chloride solution (BaCl2, 0.1 M)",
      "Dilute HCl"
    ],
    "procedure": [
      "Take approximately 3 mL of sodium sulphate solution in a clean test tube.",
      "Take approximately 3 mL of barium chloride solution in another test tube.",
      "Pour the barium chloride solution into the sodium sulphate test tube and mix.",
      "Observe the instant formation of a thick white precipitate.",
      "Add 2 mL of dilute HCl and check if the precipitate dissolves."
    ],
    "chemicalEquation": "Na₂SO₄(aq) + BaCl₂(aq) ──► BaSO₄(s)↓ (white ppt) + 2 NaCl(aq)",
    "observation": "An instantaneous insoluble white precipitate forms immediately upon mixing. The precipitate remains undissolved on adding dilute hydrochloric acid.",
    "result": "The mutual exchange of ions between reactants yields insoluble Barium Sulphate (precipitation reaction).",
    "explanation": "Ba2+ and SO4(2-) ions have an extremely low solubility product (Ksp = 1.1 x 10^-10), precipitating BaSO4 quantitatively.",
    "safety": "Soluble barium salts are toxic; handle with care and discard into designated heavy metal waste.",
    "relatedReactions": [
      "Lead nitrate with potassium iodide",
      "Silver nitrate with sodium chloride"
    ],
    "vivaQuestions": [
      {
        "q": "Why is BaSO4 precipitate insoluble in dilute HCl?",
        "a": "Because sulphuric acid is a strong acid; H+ ions from HCl cannot protonate sulphate ions sufficiently to shift the dissolution equilibrium."
      },
      {
        "q": "What type of reaction is this?",
        "a": "Double displacement (metathesis) and precipitation reaction."
      },
      {
        "q": "How is this reaction used in qualitative analysis?",
        "a": "It serves as the definitive confirmatory test for sulphate (SO4 2-) anions."
      }
    ]
  },
  {
    "id": "exp_c10_05_ph_testing",
    "title": "pH Analysis of Common Laboratory and Household Solutions",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To determine the pH of various samples using universal indicator solution and broad-range pH paper.",
    "apparatus": [
      "Spotting tile / white porcelain plate",
      "Clean droppers",
      "Standard pH color chart",
      "Test tubes"
    ],
    "chemicals": [
      "Dilute HCl",
      "Dilute NaOH",
      "Dilute CH3COOH",
      "Lemon juice",
      "Water",
      "0.1 M NaHCO3",
      "Universal indicator paper"
    ],
    "procedure": [
      "Place clean dry strips of pH paper on the white spotting tile.",
      "Using a clean glass rod or dropper, place a drop of dilute HCl on the first strip.",
      "Repeat for dilute NaOH, ethanoic acid, lemon juice, distilled water, and sodium bicarbonate using separate clean droppers.",
      "Observe the color developed immediately on each strip.",
      "Compare the observed colors with the standard pH color reference chart and record corresponding pH values."
    ],
    "chemicalEquation": "pH = -log₁₀[H⁺]",
    "observation": "Dilute HCl: Red (pH 1-2); Lemon juice: Orange (pH 2-3); CH3COOH: Yellow-orange (pH 3-4); Distilled water: Green (pH 7); NaHCO3: Blue-green (pH 8-9); NaOH: Violet/Purple (pH 13-14).",
    "result": "Acids have pH < 7, neutral water has pH = 7, and bases have pH > 7.",
    "explanation": "Universal indicator contains a mixture of dyes (thymol blue, methyl red, bromothymol blue, phenolphthalein) exhibiting a smooth color gradient across pH 0-14.",
    "safety": "Avoid skin contact with strong acids and bases.",
    "relatedReactions": [
      "Acid-base neutralization",
      "Buffer solutions"
    ],
    "vivaQuestions": [
      {
        "q": "What is the mathematical definition of pH?",
        "a": "pH is the negative logarithm to the base 10 of the hydronium ion concentration in moles per liter: pH = -log10[H3O+]."
      },
      {
        "q": "What happens to pH when an acid is diluted with water?",
        "a": "H+ concentration decreases, so pH increases toward 7."
      },
      {
        "q": "Can a neutral solution have a pH different from 7?",
        "a": "Yes, at temperatures above 25°C, Kw increases so neutral pH is slightly below 7 (e.g., pH 6.14 at 100°C)."
      }
    ]
  },
  {
    "id": "exp_c10_06_acids_bases_props",
    "title": "Comparative Chemical Properties of Acids and Bases",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Medium",
    "aim": "To study the reactions of dilute hydrochloric acid and sodium hydroxide with litmus, zinc granules, and solid sodium carbonate.",
    "apparatus": [
      "Test tubes",
      "Delivery tube",
      "Cork with single hole",
      "Burner",
      "Matchstick",
      "Litmus paper"
    ],
    "chemicals": [
      "Dilute HCl",
      "Dilute NaOH",
      "Zinc granules",
      "Solid Na2CO3",
      "Freshly prepared limewater [Ca(OH)2]"
    ],
    "procedure": [
      "Test 2 mL of HCl and NaOH with red and blue litmus papers.",
      "Add a zinc granule to 2 mL of dilute HCl in a test tube; repeat with 2 mL of dilute NaOH with gentle heating.",
      "Bring a burning matchstick to the mouth of the test tubes to test evolved gas.",
      "Add 0.5 g of solid Na2CO3 to 2 mL of dilute HCl; pass the evolved gas through limewater."
    ],
    "chemicalEquation": "Zn + 2 HCl ──► ZnCl₂ + H₂↑ ; Zn + 2 NaOH ──► Na₂ZnO₂ + H₂↑ ; Na₂CO₃ + 2 HCl ──► 2 NaCl + H₂O + CO₂↑",
    "observation": "Both HCl and warm NaOH react with zinc to liberate hydrogen gas that burns with a \"pop\" sound. HCl reacts with Na2CO3 to liberate CO2 which turns limewater milky.",
    "result": "Acids and amphoteric alkalis evolve hydrogen with active metals; acids liberate CO2 from carbonates.",
    "explanation": "Zn reacts with acids by displacement, and with strong base to form soluble sodium zincate (Na2ZnO2) liberating H2.",
    "safety": "Hydrogen gas is inflammable; keep gas generation tubes away from open naked flames.",
    "relatedReactions": [
      "Limewater milky test",
      "Pop sound test for H2"
    ],
    "vivaQuestions": [
      {
        "q": "Why does NaOH react with zinc to release hydrogen gas?",
        "a": "Because zinc is an amphoteric metal capable of reacting with both strong acids and strong alkalis."
      },
      {
        "q": "What is sodium zincate formula?",
        "a": "Na2ZnO2 (or Na2[Zn(OH)4])."
      },
      {
        "q": "Why does limewater turn milky with CO2?",
        "a": "Insoluble Calcium Carbonate (CaCO3) precipitate is formed."
      }
    ]
  },
  {
    "id": "exp_c10_07_reactivity_series",
    "title": "Electrochemical Reactivity Series of Metals",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Medium",
    "aim": "To establish the relative order of chemical reactivity among Zinc, Iron, Copper, and Aluminium by displacement reactions.",
    "apparatus": [
      "Spotting tile / 16 test tubes",
      "Test tube rack",
      "Sandpaper",
      "Droppers"
    ],
    "chemicals": [
      "ZnSO4 solution (0.1 M)",
      "FeSO4 solution (0.1 M)",
      "CuSO4 solution (0.1 M)",
      "Al2(SO4)3 solution (0.1 M)",
      "Clean strips of Zn, Fe, Cu, Al"
    ],
    "procedure": [
      "Clean metal strips of Zn, Fe, Cu, and Al with sandpaper.",
      "In row 1, add 2 mL of CuSO4 solution to 4 tubes and immerse Zn, Fe, Al, and Cu strips.",
      "In row 2, repeat using FeSO4 solution; in row 3 using ZnSO4 solution; in row 4 using Al2(SO4)3 solution.",
      "Leave undisturbed for 15 minutes and record whether displacement deposition occurs."
    ],
    "chemicalEquation": "3 Zn + Al₂(SO₄)₃ ──► No Reaction ; 2 Al + 3 CuSO₄ ──► Al₂(SO₄)₃ + 3 Cu",
    "observation": "Al displaces Zn, Fe, and Cu. Zn displaces Fe and Cu. Fe displaces only Cu. Cu displaces none.",
    "result": "The order of decreasing chemical reactivity is Al > Zn > Fe > Cu.",
    "explanation": "Metals with more negative reduction potentials lose valence electrons more readily, displacing lower metals from aqueous salt solutions.",
    "safety": "Handle metal strips carefully to prevent skin cuts.",
    "relatedReactions": [
      "Single displacement",
      "Galvanic cell EMF"
    ],
    "vivaQuestions": [
      {
        "q": "Why is aluminium more reactive than zinc?",
        "a": "Aluminium has a lower ionization energy and more negative standard reduction potential (E° = -1.66 V vs -0.76 V for Zn)."
      },
      {
        "q": "Why does aluminium sometimes react slowly initially?",
        "a": "Because of a tough, protective adherent surface layer of aluminium oxide (Al2O3)."
      },
      {
        "q": "Can copper displace silver from AgNO3?",
        "a": "Yes, Cu is more reactive than Ag (Cu + 2 AgNO3 -> Cu(NO3)2 + 2 Ag)."
      }
    ]
  },
  {
    "id": "exp_c10_08_acetic_acid_props",
    "title": "Chemical Properties and Reactions of Ethanoic (Acetic) Acid",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To study the physical properties and reactions of ethanoic acid with litmus, sodium bicarbonate, and alcohol.",
    "apparatus": [
      "Test tubes",
      "Dropper",
      "Test tube holder",
      "Delivery tube",
      "Burner",
      "Water bath"
    ],
    "chemicals": [
      "Glacial ethanoic acid",
      "Blue and Red litmus paper",
      "Solid NaHCO3",
      "Fresh limewater",
      "Ethanol",
      "Conc. H2SO4"
    ],
    "procedure": [
      "Note the odor and physical appearance of ethanoic acid.",
      "Add a drop of ethanoic acid to blue litmus paper.",
      "Add 1 mL of ethanoic acid to 0.5 g of sodium hydrogen carbonate in a test tube and pass gas through limewater.",
      "In another test tube, mix 1 mL of ethanoic acid, 1 mL of ethanol, and 4 drops of conc. H2SO4; warm in water bath for 5 minutes then pour into water."
    ],
    "chemicalEquation": "CH₃COOH + NaHCO₃ ──► CH₃COONa + H₂O + CO₂↑ ; CH₃COOH + C₂H₅OH ──(H⁺,Δ)──► CH₃COOC₂H₅ + H₂O",
    "observation": "Pungent vinegar odor; turns blue litmus red; brisk effervescence with NaHCO3 turning limewater milky; sweet fruity fragrance of ethyl ethanoate in ester test.",
    "result": "Ethanoic acid behaves as a monocarboxylic weak acid and undergoes esterification with ethanol.",
    "explanation": "Carboxylic -COOH group donates proton, decomposes bicarbonate to release CO2, and condenses with alcohol to form ester.",
    "safety": "Glacial acetic acid can cause skin blistering; handle conc. H2SO4 with extreme caution.",
    "relatedReactions": [
      "Esterification",
      "Fischer esterification"
    ],
    "vivaQuestions": [
      {
        "q": "What is glacial acetic acid?",
        "a": "100% pure anhydrous ethanoic acid, which freezes into ice-like crystals at 16.6°C (290 K)."
      },
      {
        "q": "Why is conc. H2SO4 added during esterification?",
        "a": "It acts as both an acid catalyst and a dehydrating agent to pull the reversible equilibrium toward ester products."
      },
      {
        "q": "How can you distinguish ethanoic acid from ethanol using a chemical test?",
        "a": "Ethanoic acid produces brisk effervescence of CO2 with NaHCO3, whereas ethanol does not react."
      }
    ]
  },
  {
    "id": "exp_c10_09_saponification",
    "title": "Saponification: Preparation of Soap from Vegetable Oil",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Medium",
    "aim": "To prepare a sample of soap by the alkaline hydrolysis of vegetable oil (saponification).",
    "apparatus": [
      "Beaker (250 mL)",
      "Glass rod",
      "Tripod stand with wire gauze",
      "Burner",
      "Filter paper",
      "Mould"
    ],
    "chemicals": [
      "Castor oil or Coconut oil (25 mL)",
      "20% Sodium Hydroxide (NaOH) solution (30 mL)",
      "Common salt (NaCl, sodium chloride, 10 g)"
    ],
    "procedure": [
      "Take 25 mL of vegetable oil in a 250 mL beaker.",
      "Add 30 mL of 20% NaOH solution with continuous stirring using a glass rod.",
      "Heat the mixture gently over a wire gauze with steady boiling for 15-20 minutes until a thick paste forms.",
      "Add about 10 g of common salt (NaCl) and stir thoroughly to precipitate the soap (salting out).",
      "Allow the mixture to cool down; soap separates and floats on the surface as a solid cake.",
      "Filter off the soap, wash with cold water, and press into a mold."
    ],
    "chemicalEquation": "Glyceryl Ester of Fatty Acid + 3 NaOH ──(Δ)──► Glycerol + 3 Sodium Carboxylate (Soap)",
    "observation": "The oily emulsion gradually turns into a thick soapy paste. Upon adding NaCl, solid soap curds separate cleanly from the aqueous glycerol layer.",
    "result": "Soap is successfully synthesized via alkaline ester hydrolysis and salted out using sodium chloride.",
    "explanation": "Triglycerides are saponified by hydroxide ions into glycerol and sodium salts of long-chain fatty acids (stearate, palmitate, oleate).",
    "safety": "Hot 20% NaOH is caustic; avoid boiling spillage and wear protective safety glasses.",
    "relatedReactions": [
      "Esterification",
      "Cleansing action of soap"
    ],
    "vivaQuestions": [
      {
        "q": "What is the role of common salt (NaCl) in soap preparation?",
        "a": "Salting out: increasing Na+ concentration decreases the solubility product of sodium carboxylates, causing soap to precipitate out."
      },
      {
        "q": "What is the byproduct formed during saponification?",
        "a": "Glycerol (propane-1,2,3-triol), an important commercial moisturizer and humectant."
      },
      {
        "q": "Why is soap basic in nature?",
        "a": "It is a salt of a weak acid (fatty acid) and a strong base (NaOH), so its aqueous solution hydrolyzes to give OH- ions."
      }
    ]
  },
  {
    "id": "exp_c10_10_soap_hard_water",
    "title": "Cleaning Capacity of Soap in Soft and Hard Water",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To compare the foaming and cleansing capacity of soap in soft water versus temporary and permanent hard water.",
    "apparatus": [
      "Three test tubes (labelled A, B, C)",
      "Test tube rack",
      "Ruler / scale",
      "Measuring cylinder",
      "Stopwatch"
    ],
    "chemicals": [
      "Distilled water",
      "Temporary hard water [Ca(HCO3)2]",
      "Permanent hard water (MgSO4 or CaCl2)",
      "Soap solution (1%)",
      "Detergent solution (1%)"
    ],
    "procedure": [
      "Take 10 mL of distilled water in tube A, 10 mL of temporary hard water in tube B, and 10 mL of permanent hard water in tube C.",
      "Add 1 mL of 1% soap solution to each tube using a pipette.",
      "Shake test tube A vigorously for 15 seconds; measure and record the height of foam formed and persistence time.",
      "Repeat the exact same shaking process for tubes B and C.",
      "Repeat the entire experiment using 1% synthetic detergent instead of soap."
    ],
    "chemicalEquation": "2 C₁₇H₃₅COONa + Ca²⁺ ──► (C₁₇H₃₅COO)₂Ca↓ (insoluble white scum) + 2 Na⁺",
    "observation": "Tube A (soft water) produces abundant persistent foam. Tubes B and C produce negligible foam and form sticky curdy white precipitates (scum). Synthetic detergent foams abundantly in all three tubes.",
    "result": "Soap is ineffective in hard water due to scum formation; synthetic detergents work effectively in both soft and hard water.",
    "explanation": "Divalent Ca2+ and Mg2+ ions precipitate insoluble calcium and magnesium carboxylates, consuming soap before lather can form.",
    "safety": "No special hazards; standard laboratory cleanliness.",
    "relatedReactions": [
      "Precipitation of calcium salts",
      "Micelle formation"
    ],
    "vivaQuestions": [
      {
        "q": "What causes temporary hardness vs permanent hardness?",
        "a": "Temporary hardness is caused by dissolved hydrogencarbonates of Ca and Mg; permanent hardness is caused by chlorides and sulphates of Ca and Mg."
      },
      {
        "q": "Why do synthetic detergents lather in hard water?",
        "a": "Their calcium and magnesium sulphonate salts are soluble in water, so no insoluble scum precipitate is formed."
      },
      {
        "q": "How can temporary hardness be removed easily in the laboratory?",
        "a": "By boiling: Ca(HCO3)2 decomposes into insoluble CaCO3 precipitate, water, and CO2."
      }
    ]
  },
  {
    "id": "exp_c10_11_so2_properties",
    "title": "Preparation of Sulphur Dioxide Gas and its Reducing Action",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Medium",
    "aim": "To prepare Sulphur Dioxide gas by the action of acid on sulphite and verify its acidic and reducing properties.",
    "apparatus": [
      "Round bottom flask with thistle funnel and delivery tube",
      "Gas jars",
      "Test tubes",
      "Burner"
    ],
    "chemicals": [
      "Sodium sulphite (Na2SO3)",
      "Dilute H2SO4",
      "Acidified Potassium Permanganate (KMnO4)",
      "Acidified Potassium Dichromate (K2Cr2O7)"
    ],
    "procedure": [
      "Place 5 g of sodium sulphite in the flask and add dilute H2SO4 through the thistle funnel.",
      "Collect SO2 gas in gas jars by upward displacement of air.",
      "Pass SO2 gas into a test tube containing acidified purple KMnO4 solution.",
      "Pass SO2 gas into another test tube containing acidified orange K2Cr2O7 solution."
    ],
    "chemicalEquation": "Na₂SO₃ + H₂SO₄ ──► Na₂SO₄ + H₂O + SO₂↑ ; 2 KMnO₄ + 5 SO₂ + 2 H₂O ──► K₂SO₄ + 2 MnSO₄ + 2 H₂SO₄",
    "observation": "Pungent suffocating gas with smell of burning sulphur evolves. It decolorizes purple KMnO4 to colorless Mn2+ and turns orange K2Cr2O7 to emerald green Cr3+.",
    "result": "SO2 is an acidic gas with powerful reducing properties in aqueous solution.",
    "explanation": "SO2 acts as a reducing agent in the presence of moisture by accepting oxygen to form sulphate (SO4 2-).",
    "safety": "SO2 is toxic and irritates respiratory tract; generate in a fume hood.",
    "relatedReactions": [
      "Redox titration with KMnO4",
      "Decomposition of thiosulphate"
    ],
    "vivaQuestions": [
      {
        "q": "Why does acidified potassium dichromate turn green?",
        "a": "Because Cr(VI) is reduced to Cr(III) ions [Cr2(SO4)3], which are green in aqueous solution."
      },
      {
        "q": "How can you collect SO2 gas?",
        "a": "By upward displacement of air because SO2 is roughly 2.2 times heavier than air."
      },
      {
        "q": "What is the oxidation state of sulphur in SO2 and in SO4 2-?",
        "a": "In SO2 it is +4, and in SO4 2- it is +6."
      }
    ]
  },
  {
    "id": "exp_c10_12_pbno32_decomp",
    "title": "Thermal Decomposition of Lead(II) Nitrate",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Medium",
    "aim": "To observe the thermal decomposition of Lead Nitrate crystals and identify the gaseous products.",
    "apparatus": [
      "Hard glass boiling tube",
      "Test tube holder",
      "Bunsen burner",
      "Glowing splint",
      "Moist blue litmus paper"
    ],
    "chemicals": [
      "Lead(II) nitrate crystals [Pb(NO3)2]"
    ],
    "procedure": [
      "Take about 2 g of dry white lead nitrate crystals in a dry boiling tube.",
      "Hold the boiling tube with a test tube holder and heat strongly over a burner flame.",
      "Observe the crackling sound (decrepitation) and color change of the solid.",
      "Notice the evolution of dense reddish-brown toxic fumes.",
      "Hold a glowing splint near the mouth of the boiling tube; hold moist blue litmus paper in the fumes."
    ],
    "chemicalEquation": "2 Pb(NO₃)₂(s) ──(Δ)──► 2 PbO(s) + 4 NO₂(g)↑ + O₂(g)↑",
    "observation": "Crackling sound; dense reddish-brown choking fumes of NO2 evolve that turn moist blue litmus red. Glowing splint rekindles proving oxygen release. Hot yellow residue of PbO coats the tube (red-brown when hot, yellow when cold).",
    "result": "Lead nitrate decomposes endothermically into lead monoxide, nitrogen dioxide, and oxygen.",
    "explanation": "Heavy metal nitrates decompose on heating to metal oxide, toxic NO2 gas and O2 gas.",
    "safety": "NO2 fumes are toxic; lead compounds are poisonous. Do not breathe fumes.",
    "relatedReactions": [
      "Thermal decomposition of nitrates",
      "Decrepitation"
    ],
    "vivaQuestions": [
      {
        "q": "What causes the decrepitation (crackling sound) during heating?",
        "a": "Rapid expansion and escape of tiny pockets of trapped moisture within the crystal lattice."
      },
      {
        "q": "Why is the solid residue red-brown when hot but yellow when cold?",
        "a": "Due to temperature-dependent crystal lattice deformation and electronic transition band shift of PbO (Litharge)."
      },
      {
        "q": "How do you prove the presence of oxygen gas evolved?",
        "a": "It rekindles a glowing splint introduced into the tube."
      }
    ]
  },
  {
    "id": "exp_c10_13_amphoteric_zinc",
    "title": "Amphoteric Behavior: Reaction of Zinc with Acid and Base",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To verify the amphoteric nature of Zinc by reacting it with both a strong acid and a strong base.",
    "apparatus": [
      "Two test tubes",
      "Test tube holder",
      "Bunsen burner",
      "Splint"
    ],
    "chemicals": [
      "Granulated Zinc",
      "Dilute Hydrochloric acid (2 M)",
      "Sodium Hydroxide solution (4 M)"
    ],
    "procedure": [
      "Take 2 clean test tubes and place a zinc granule in each.",
      "Add 3 mL of dilute HCl to the first test tube; note effervescence.",
      "Add 3 mL of 4 M NaOH to the second test tube and warm gently over burner flame.",
      "Test the gas liberated from both tubes with a burning splint."
    ],
    "chemicalEquation": "Zn + 2 HCl ──► ZnCl₂ + H₂↑ ; Zn + 2 NaOH + 2 H₂O ──(Δ)──► Na₂[Zn(OH)₄] + H₂↑",
    "observation": "Rapid bubbling in HCl; steady bubbling in hot NaOH. In both tubes, the gas burns with a characteristic pop sound.",
    "result": "Zinc displays amphoteric properties by reacting with both acid and base to evolve hydrogen gas.",
    "explanation": "Zinc forms Zn2+ salts with acids and complex zincate [Zn(OH)4]2- anions with concentrated alkalis.",
    "safety": "Hot concentrated NaOH is caustic; avoid boiling over.",
    "relatedReactions": [
      "Amphoteric aluminium",
      "Hydrogen evolution"
    ],
    "vivaQuestions": [
      {
        "q": "Name two other amphoteric elements.",
        "a": "Aluminium (Al) and Lead (Pb)."
      },
      {
        "q": "Why does zinc need heating to react with NaOH but reacts with HCl at room temp?",
        "a": "The activation energy for hydroxyl attack on zinc and breaking zinc-zinc metallic bonds in alkaline medium is higher."
      },
      {
        "q": "Write the IUPAC name of Na2[Zn(OH)4].",
        "a": "Sodium tetrahydroxidozincate(II)."
      }
    ]
  },
  {
    "id": "exp_c10_14_rusting_conditions",
    "title": "Investigation of Conditions Required for Rusting of Iron",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To demonstrate that both oxygen (air) and moisture (water) are mutually essential for the corrosion (rusting) of iron.",
    "apparatus": [
      "Three test tubes with rubber bungs",
      "Test tube rack",
      "Measuring cylinder"
    ],
    "chemicals": [
      "Clean shiny iron nails",
      "Distilled water",
      "Boiled distilled water",
      "Anhydrous Calcium Chloride (CaCl2)",
      "Cooking oil"
    ],
    "procedure": [
      "Tube 1: Place 3 nails submerged half-way in tap water exposed to atmospheric air.",
      "Tube 2: Place 3 nails in boiled distilled water (oxygen expelled) and cover with 1 cm layer of oil to seal from air.",
      "Tube 3: Place 3 nails with anhydrous CaCl2 (desiccant) and stopper tightly to provide dry air.",
      "Leave all three tubes undisturbed for 5 days and inspect nail surfaces daily."
    ],
    "chemicalEquation": "4 Fe(s) + 3 O₂(g) + 2x H₂O(l) ──► 2 Fe₂O₃·xH₂O(s) (Hydrated Iron(III) Oxide / Rust)",
    "observation": "Only the nails in Tube 1 show significant reddish-brown flakey rust. Nails in Tube 2 (no oxygen) and Tube 3 (no water) remain completely bright and rust-free.",
    "result": "Both oxygen and water are simultaneously indispensable for the electrochemical corrosion of iron.",
    "explanation": "Rusting is an electrochemical process: anodic oxidation Fe -> Fe2+ + 2e- coupled to cathodic oxygen reduction O2 + 4H+ + 4e- -> 2H2O.",
    "safety": "No special hazards.",
    "relatedReactions": [
      "Galvanization",
      "Cathodic protection"
    ],
    "vivaQuestions": [
      {
        "q": "Why was the water boiled in Tube 2?",
        "a": "Boiling expels all dissolved gases, specifically dissolved oxygen."
      },
      {
        "q": "What is the purpose of the oil layer in Tube 2?",
        "a": "It acts as an impermeable physical barrier preventing atmospheric oxygen from redissolving."
      },
      {
        "q": "What is sacrificial protection against rusting?",
        "a": "Attaching a more electropositive metal (like Zinc or Magnesium) that oxidizes preferentially instead of iron."
      }
    ]
  },
  {
    "id": "exp_c10_15_displacement_series",
    "title": "Displacement of Copper by Zinc: Thermochemical Effect",
    "classLevel": 10,
    "category": "Foundational Reactions",
    "difficulty": "Easy",
    "aim": "To observe the displacement of copper from copper sulphate solution by zinc dust and measure the temperature rise.",
    "apparatus": [
      "Polystyrene calorimeter / insulated beaker",
      "Thermometer (0.1°C precision)",
      "Stirrer",
      "Measuring cylinder"
    ],
    "chemicals": [
      "1.0 M Copper(II) sulphate solution (50 mL)",
      "Zinc dust (excess, 3 g)"
    ],
    "procedure": [
      "Place 50 mL of 1.0 M CuSO4 solution in an insulated cup.",
      "Record initial temperature T1 every 30 seconds for 2 minutes to ensure thermal equilibrium.",
      "Add 3 g of zinc dust all at once and stir continuously.",
      "Record temperature every 30 seconds until maximum temperature T2 is reached.",
      "Calculate enthalpy change ΔH = m·c·ΔT."
    ],
    "chemicalEquation": "Zn(s) + CuSO₄(aq) ──► ZnSO₄(aq) + Cu(s) (ΔH = -218 kJ/mol)",
    "observation": "Blue solution completely discharges to colorless within minutes; fine reddish-brown copper precipitates; temperature rises by ~20-25°C.",
    "result": "The displacement of copper by zinc is strongly exothermic.",
    "explanation": "Zinc loses electrons more easily than copper; the hydration energy of Zn2+ and formation of Zn-SO4 bonds exceeds that of Cu2+.",
    "safety": "Zinc dust is flammable; do not inhale.",
    "relatedReactions": [
      "Single displacement",
      "Thermochemistry"
    ],
    "vivaQuestions": [
      {
        "q": "Why is zinc dust used instead of a zinc rod?",
        "a": "Zinc dust provides a vastly larger surface area, accelerating reaction rate and achieving maximum temperature before heat loss occurs."
      },
      {
        "q": "Why is a polystyrene cup preferred over a glass beaker for thermometry?",
        "a": "Polystyrene is a thermal insulator with very low specific heat capacity, minimizing heat loss to surroundings."
      },
      {
        "q": "What color is the final solution?",
        "a": "Colorless, because Zn2+ has a fully filled d10 subshell with no d-d electron transitions."
      }
    ]
  },
  {
    "id": "exp_c11_16_glass_tubing",
    "title": "Basic Laboratory Techniques: Cutting, Bending, and Jet Drawing of Glass Tubing",
    "classLevel": 11,
    "category": "Lab Techniques",
    "difficulty": "Easy",
    "aim": "To carry out basic laboratory techniques: cutting, bending, and jet drawing of glass tubing and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Physical manipulation of borosilicate glass under Bunsen flame",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Basic Laboratory Techniques: Cutting, Bending, and Jet Drawing of Glass Tubing with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_17_cork_boring",
    "title": "Boring a Cork and Fitting Glass Tubing Airtight",
    "classLevel": 11,
    "category": "Lab Techniques",
    "difficulty": "Easy",
    "aim": "To carry out boring a cork and fitting glass tubing airtight and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Mechanical boring with cork borer and glycerol lubrication",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Boring a Cork and Fitting Glass Tubing Airtight with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_18_melting_point_benzoic",
    "title": "Determination of Melting Point of Benzoic Acid using Thiele Tube",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Medium",
    "aim": "To carry out determination of melting point of benzoic acid using thiele tube and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Pure C₆H₅COOH(s) ──(395 K)──► C₆H₅COOH(l)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Melting Point of Benzoic Acid using Thiele Tube with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_19_melting_point_naphthalene",
    "title": "Determination of Melting Point of Naphthalene",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out determination of melting point of naphthalene and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "C₁₀H₈(s) ──(353 K)──► C₁₀H₈(l)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Melting Point of Naphthalene with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_20_boiling_point_ethanol",
    "title": "Determination of Boiling Point of Ethanol using Capillary Method",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out determination of boiling point of ethanol using capillary method and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "C₂H₅OH(l) ──(351.4 K)──► C₂H₅OH(g)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Boiling Point of Ethanol using Capillary Method with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_21_boiling_point_acetone",
    "title": "Determination of Boiling Point of Acetone (Propan-2-one)",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out determination of boiling point of acetone (propan-2-one) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "CH₃COCH₃(l) ──(329 K)──► CH₃COCH₃(g)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Boiling Point of Acetone (Propan-2-one) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_22_std_oxalic_acid",
    "title": "Preparation of 250 mL of Standard 0.1 M Oxalic Acid Solution",
    "classLevel": 11,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Medium",
    "aim": "To carry out preparation of 250 ml of standard 0.1 m oxalic acid solution and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "H₂C₂O₄·2H₂O(s) ──(H₂O)──► 2 H⁺(aq) + C₂O₄²⁻(aq)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of 250 mL of Standard 0.1 M Oxalic Acid Solution with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_23_std_na2co3",
    "title": "Preparation of 250 mL of Standard 0.1 M Sodium Carbonate Solution",
    "classLevel": 11,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Medium",
    "aim": "To carry out preparation of 250 ml of standard 0.1 m sodium carbonate solution and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Na₂CO₃(s) ──(H₂O)──► 2 Na⁺(aq) + CO₃²⁻(aq)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of 250 mL of Standard 0.1 M Sodium Carbonate Solution with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_24_titration_hcl_na2co3",
    "title": "Determination of Strength of Given HCl using Standard Na₂CO₃ (Methyl Orange)",
    "classLevel": 11,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Medium",
    "aim": "To carry out determination of strength of given hcl using standard na₂co₃ (methyl orange) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Na₂CO₃ + 2 HCl ──► 2 NaCl + H₂O + CO₂",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Strength of Given HCl using Standard Na₂CO₃ (Methyl Orange) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_25_titration_naoh_oxalic",
    "title": "Determination of Strength of Given NaOH using Standard Oxalic Acid (Phenolphthalein)",
    "classLevel": 11,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Medium",
    "aim": "To carry out determination of strength of given naoh using standard oxalic acid (phenolphthalein) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "H₂C₂O₄ + 2 NaOH ──► Na₂C₂O₄ + 2 H₂O",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Strength of Given NaOH using Standard Oxalic Acid (Phenolphthalein) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_26_ph_fruit_juices",
    "title": "Determination of pH of Citrus Juices, Soft Drinks, and Soil Samples",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out determination of ph of citrus juices, soft drinks, and soil samples and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "pH = -log₁₀[H₃O⁺]",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of pH of Citrus Juices, Soft Drinks, and Soil Samples with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_27_common_ion_acetic",
    "title": "Study of pH Variation by Common Ion Effect (Acetic Acid + Sodium Acetate)",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Medium",
    "aim": "To carry out study of ph variation by common ion effect (acetic acid + sodium acetate) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "CH₃COOH ⇌ CH₃COO⁻ + H⁺ ; CH₃COONa ──► CH₃COO⁻ + Na⁺",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Study of pH Variation by Common Ion Effect (Acetic Acid + Sodium Acetate) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_28_buffer_capacity",
    "title": "Study of Buffer Action and Capacity in Ammonium Hydroxide / Ammonium Chloride",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Hard",
    "aim": "To carry out study of buffer action and capacity in ammonium hydroxide / ammonium chloride and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "NH₄⁺ + OH⁻ ⇌ NH₄OH ; NH₄OH + H⁺ ⇌ NH₄⁺ + H₂O",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Study of Buffer Action and Capacity in Ammonium Hydroxide / Ammonium Chloride with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_29_chem_eq_fe_scn",
    "title": "Chemical Equilibrium: Shift in Equilibrium of Fe³⁺ and SCN⁻ System",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Medium",
    "aim": "To carry out chemical equilibrium: shift in equilibrium of fe³⁺ and scn⁻ system and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Fe³⁺(yellow) + SCN⁻(colorless) ⇌ [Fe(SCN)]²⁺(blood-red)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Chemical Equilibrium: Shift in Equilibrium of Fe³⁺ and SCN⁻ System with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_30_chem_eq_co_cl",
    "title": "Chemical Equilibrium: Temperature and Concentration Shift in [Co(H₂O)₆]²⁺ and [CoCl₄]²⁻",
    "classLevel": 11,
    "category": "Physical Chemistry",
    "difficulty": "Hard",
    "aim": "To carry out chemical equilibrium: temperature and concentration shift in [co(h₂o)₆]²⁺ and [cocl₄]²⁻ and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "[Co(H₂O)₆]²⁺(pink) + 4 Cl⁻ + Heat ⇌ [CoCl₄]²⁻(deep blue) + 6 H₂O",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Chemical Equilibrium: Temperature and Concentration Shift in [Co(H₂O)₆]²⁺ and [CoCl₄]²⁻ with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_31_sol_starch",
    "title": "Preparation of Lyophilic Sol: Starch Sol in Water",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out preparation of lyophilic sol: starch sol in water and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Starch(s) + Hot H₂O ──► Starch Hydrosol (Lyophilic)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of Lyophilic Sol: Starch Sol in Water with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_32_sol_gum_acacia",
    "title": "Preparation of Lyophilic Sol: Gum Acacia Sol",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out preparation of lyophilic sol: gum acacia sol and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Gum Acacia + Warm H₂O ──► Lyophilic Sol",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of Lyophilic Sol: Gum Acacia Sol with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_33_sol_egg_albumin",
    "title": "Preparation of Lyophilic Sol: Egg Albumin Hydrosol",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out preparation of lyophilic sol: egg albumin hydrosol and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Albumin protein + Cold H₂O ──► Lyophilic Protein Sol",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of Lyophilic Sol: Egg Albumin Hydrosol with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_34_sol_feoh3",
    "title": "Preparation of Lyophobic Sol: Ferric Hydroxide [Fe(OH)₃] Hydrosol",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Medium",
    "aim": "To carry out preparation of lyophobic sol: ferric hydroxide [fe(oh)₃] hydrosol and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "FeCl₃(aq) + 3 H₂O(l) ──(boiling)──► Fe(OH)₃(sol, red-brown) + 3 HCl(aq)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of Lyophobic Sol: Ferric Hydroxide [Fe(OH)₃] Hydrosol with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_35_sol_aloh3",
    "title": "Preparation of Lyophobic Sol: Aluminium Hydroxide [Al(OH)₃] Sol",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Medium",
    "aim": "To carry out preparation of lyophobic sol: aluminium hydroxide [al(oh)₃] sol and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "AlCl₃(aq) + 3 H₂O(l) ──► Al(OH)₃(sol, white opalescent) + 3 HCl",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of Lyophobic Sol: Aluminium Hydroxide [Al(OH)₃] Sol with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_36_sol_as2s3",
    "title": "Preparation of Lyophobic Sol: Arsenious Sulphide [As₂S₃] Sol",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Hard",
    "aim": "To carry out preparation of lyophobic sol: arsenious sulphide [as₂s₃] sol and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "As₂O₃ + 3 H₂S ──► As₂S₃(sol, yellow) + 3 H₂O",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Preparation of Lyophobic Sol: Arsenious Sulphide [As₂S₃] Sol with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_37_dialysis_colloid",
    "title": "Purification of Colloidal Sol by Dialysis through Parchment / Cellophane Membrane",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Medium",
    "aim": "To carry out purification of colloidal sol by dialysis through parchment / cellophane membrane and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Colloid[Fe(OH)₃ + Cl⁻] ──(dialysis membrane)──► Pure Fe(OH)₃ sol + Dialyzed Cl⁻",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Purification of Colloidal Sol by Dialysis through Parchment / Cellophane Membrane with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_38_hardy_schulze_coagulation",
    "title": "Coagulation of Lyophobic Sol: Verification of Hardy-Schulze Rule (NaCl, BaCl₂, AlCl₃)",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Hard",
    "aim": "To carry out coagulation of lyophobic sol: verification of hardy-schulze rule (nacl, bacl₂, alcl₃) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Coagulating Power ∝ (Valency of counter ion)⁴",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Coagulation of Lyophobic Sol: Verification of Hardy-Schulze Rule (NaCl, BaCl₂, AlCl₃) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_39_emulsification_soaps",
    "title": "Comparative Study of Emulsifying Power of Different Soaps and Detergents",
    "classLevel": 11,
    "category": "Colloids & Surface Chemistry",
    "difficulty": "Easy",
    "aim": "To carry out comparative study of emulsifying power of different soaps and detergents and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Oil-in-Water Emulsion Stabilization by Amphiphilic Micelles",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Comparative Study of Emulsifying Power of Different Soaps and Detergents with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_40_chromatography_leaf_pigments",
    "title": "Ascending Paper Chromatography: Separation of Plant Pigments (Chlorophylls & Carotenoids)",
    "classLevel": 11,
    "category": "Separation Techniques",
    "difficulty": "Medium",
    "aim": "To carry out ascending paper chromatography: separation of plant pigments (chlorophylls & carotenoids) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Rf = (Distance moved by substance) / (Distance moved by solvent front)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Ascending Paper Chromatography: Separation of Plant Pigments (Chlorophylls & Carotenoids) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_41_chromatography_amino_acids",
    "title": "Separation of Amino Acids Mixture (Glycine, Alanine, Leucine) by Paper Chromatography",
    "classLevel": 11,
    "category": "Separation Techniques",
    "difficulty": "Hard",
    "aim": "To carry out separation of amino acids mixture (glycine, alanine, leucine) by paper chromatography and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Detection via Ninhydrin spray reagent (Ruhemann purple complex)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Separation of Amino Acids Mixture (Glycine, Alanine, Leucine) by Paper Chromatography with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_42_chromatography_cations",
    "title": "Paper Chromatographic Separation of Metal Cations (Pb²⁺, Cu²⁺, Cd²⁺)",
    "classLevel": 11,
    "category": "Separation Techniques",
    "difficulty": "Hard",
    "aim": "To carry out paper chromatographic separation of metal cations (pb²⁺, cu²⁺, cd²⁺) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Separation using acetone-HCl mobile phase and H₂S visualization",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Paper Chromatographic Separation of Metal Cations (Pb²⁺, Cu²⁺, Cd²⁺) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_43_enthalpy_cuso4_dissolution",
    "title": "Determination of Enthalpy of Solution of Copper Sulphate Pentahydrate",
    "classLevel": 11,
    "category": "Thermochemistry",
    "difficulty": "Medium",
    "aim": "To carry out determination of enthalpy of solution of copper sulphate pentahydrate and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "CuSO₄·5H₂O(s) + aq ──► CuSO₄(aq) (ΔH = +11.7 kJ/mol, endothermic)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Enthalpy of Solution of Copper Sulphate Pentahydrate with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_44_enthalpy_kno3_dissolution",
    "title": "Determination of Enthalpy of Solution of Potassium Nitrate (KNO₃)",
    "classLevel": 11,
    "category": "Thermochemistry",
    "difficulty": "Medium",
    "aim": "To carry out determination of enthalpy of solution of potassium nitrate (kno₃) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "KNO₃(s) + aq ──► K⁺(aq) + NO₃⁻(aq) (ΔH = +34.89 kJ/mol, endothermic)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Enthalpy of Solution of Potassium Nitrate (KNO₃) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_45_enthalpy_neutralization_strong",
    "title": "Determination of Enthalpy of Neutralization of Strong Acid (HCl) by Strong Base (NaOH)",
    "classLevel": 11,
    "category": "Thermochemistry",
    "difficulty": "Medium",
    "aim": "To carry out determination of enthalpy of neutralization of strong acid (hcl) by strong base (naoh) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "H⁺(aq) + OH⁻(aq) ──► H₂O(l) (ΔH = -57.1 kJ/mol)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Enthalpy of Neutralization of Strong Acid (HCl) by Strong Base (NaOH) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_46_enthalpy_neutralization_weak",
    "title": "Determination of Enthalpy of Neutralization of Weak Acid (CH₃COOH) by Strong Base (NaOH)",
    "classLevel": 11,
    "category": "Thermochemistry",
    "difficulty": "Hard",
    "aim": "To carry out determination of enthalpy of neutralization of weak acid (ch₃cooh) by strong base (naoh) and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "CH₃COOH + NaOH ──► CH₃COONa + H₂O (ΔH = -55.9 kJ/mol, 1.2 kJ for ionization)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Determination of Enthalpy of Neutralization of Weak Acid (CH₃COOH) by Strong Base (NaOH) with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_47_enthalpy_hbond_acetone_chloroform",
    "title": "Enthalpy Change in Intermolecular Hydrogen Bonding between Acetone and Chloroform",
    "classLevel": 11,
    "category": "Thermochemistry",
    "difficulty": "Hard",
    "aim": "To carry out enthalpy change in intermolecular hydrogen bonding between acetone and chloroform and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "CH₃COCH₃ + CHCl₃ ──► Cl₃C-H···O=C(CH₃)₂ (Exothermic H-Bond Complex)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Enthalpy Change in Intermolecular Hydrogen Bonding between Acetone and Chloroform with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_48_purif_cryst_cuso4",
    "title": "Purification of Impure Sample of Copper Sulphate by Recrystallization",
    "classLevel": 11,
    "category": "Preparations & Syntheses",
    "difficulty": "Easy",
    "aim": "To carry out purification of impure sample of copper sulphate by recrystallization and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Impure CuSO₄(aq) ──(evaporate & slow cooling)──► Pure Triclinic CuSO₄·5H₂O Crystals",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Purification of Impure Sample of Copper Sulphate by Recrystallization with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_49_purif_cryst_benzoic",
    "title": "Purification of Impure Benzoic Acid by Hot Water Recrystallization",
    "classLevel": 11,
    "category": "Preparations & Syntheses",
    "difficulty": "Easy",
    "aim": "To carry out purification of impure benzoic acid by hot water recrystallization and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Benzoic Acid(crude) ──(boiling water dissolution & filtration)──► Needle-like White Crystals",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Purification of Impure Benzoic Acid by Hot Water Recrystallization with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c11_50_lassaigne_nitrogen",
    "title": "Detection of Nitrogen in Organic Compound: Lassaigne's Sodium Fusion Test",
    "classLevel": 11,
    "category": "Qualitative Analysis",
    "difficulty": "Medium",
    "aim": "To carry out detection of nitrogen in organic compound: lassaigne's sodium fusion test and record quantitative and qualitative observations following standard CBSE Class 11 procedures.",
    "apparatus": [
      "Beaker (250 mL)",
      "Conical Flask",
      "Measuring cylinder",
      "Test tubes & rack",
      "Stirring rod",
      "Burner & wire gauze"
    ],
    "chemicals": [
      "Standard reagents and laboratory samples as specified in procedure",
      "Distilled water"
    ],
    "procedure": [
      "1. Assemble clean and calibrated glassware.",
      "2. Measure the exact stoichiometric quantities of reactants.",
      "3. Carry out the chemical transformation / measurement under constant controlled conditions.",
      "4. Observe phase changes, color shifts, precipitate formation, or thermal gradients.",
      "5. Record readings in systematic observation table and compute final result."
    ],
    "chemicalEquation": "Na + C + N ──(Δ)──► NaCN ; 6 NaCN + FeSO₄ + FeCl₃ ──► Fe₄[Fe(CN)₆]₃ (Prussian Blue)",
    "observation": "Distinct physical and chemical transformations observed adhering strictly to theoretical principles.",
    "result": "Successfully accomplished Detection of Nitrogen in Organic Compound: Lassaigne's Sodium Fusion Test with high precision and verified theoretical concepts.",
    "explanation": "Demonstrates fundamental physicochemical principles involving thermodynamics, chemical equilibria, and stoichiometry.",
    "safety": "Wear safety goggles, lab coat, and protective gloves. Handle heated glassware with tongs.",
    "relatedReactions": [
      "Equilibrium shift",
      "Colloids coagulation",
      "Titration"
    ],
    "vivaQuestions": [
      {
        "q": "What is the fundamental working principle of this experiment?",
        "a": "It relies on the established thermodynamic and spectroscopic laws governing chemical behavior in CBSE Class 11 practical syllabus."
      },
      {
        "q": "What precautions ensure high accuracy in this procedure?",
        "a": "Using analytical grade reagents, properly calibrated volumetric glassware, and repeating trials until concordant values are obtained."
      },
      {
        "q": "How does temperature influence the outcome?",
        "a": "Temperature directly affects equilibrium constants, solubility products, and reaction kinetics according to Arrhenius and Le Chatelier principles."
      }
    ]
  },
  {
    "id": "exp_c12_51_cat_nh4",
    "title": "Systematic Identification of Zero Group Cation: Ammonium (NH₄⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of zero group cation: ammonium (nh₄⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "NH₄⁺ + NaOH ──► NH₃↑ + H₂O ; 2 K₂[HgI₄] + NH₃ + 3 KOH ──► H₂N-Hg-O-Hg-I↓ (Brown ppt) + 7 KI + 2 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Zero Group Cation: Ammonium (NH₄⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_52_cat_pb2",
    "title": "Systematic Identification of Group I Cation: Lead(II) (Pb²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group i cation: lead(ii) (pb²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Pb²⁺ + 2 HCl ──► PbCl₂↓ (white) ; Pb²⁺ + 2 KI ──► PbI₂↓ (golden spangles) ; Pb²⁺ + K₂CrO₄ ──► PbCrO₄↓ (yellow)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group I Cation: Lead(II) (Pb²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_53_cat_cu2",
    "title": "Systematic Identification of Group II Cation: Copper(II) (Cu²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group ii cation: copper(ii) (cu²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Cu²⁺ + H₂S ──► CuS↓ (black) ; Cu²⁺ + 4 NH₄OH ──► [Cu(NH₃)₄]²⁺ (deep azure blue) ; 2 Cu²⁺ + K₄[Fe(CN)₆] ──► Cu₂[Fe(CN)₆]↓ (chocolate brown)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group II Cation: Copper(II) (Cu²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_54_cat_as3",
    "title": "Systematic Identification of Group II Cation: Arsenic(III) (As³⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Hard",
    "aim": "To perform systematic identification of group ii cation: arsenic(iii) (as³⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 As³⁺ + 3 H₂S ──► As₂S₃↓ (bright yellow, soluble in (NH₄)₂S)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group II Cation: Arsenic(III) (As³⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_55_cat_al3",
    "title": "Systematic Identification of Group III Cation: Aluminium (Al³⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group iii cation: aluminium (al³⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Al³⁺ + 3 NH₄OH ──► Al(OH)₃↓ (white gelatinous) ; Lake test: blue litmus adsorbed on Al(OH)₃ forms a floating red-free blue lake",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group III Cation: Aluminium (Al³⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_56_cat_fe3",
    "title": "Systematic Identification of Group III Cation: Iron(III) (Fe³⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group iii cation: iron(iii) (fe³⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Fe³⁺ + 3 NH₄OH ──► Fe(OH)₃↓ (reddish-brown) ; Fe³⁺ + SCN⁻ ──► [Fe(SCN)]²⁺ (deep blood-red solution)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group III Cation: Iron(III) (Fe³⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_57_cat_co2",
    "title": "Systematic Identification of Group IV Cation: Cobalt(II) (Co²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Hard",
    "aim": "To perform systematic identification of group iv cation: cobalt(ii) (co²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Co²⁺ + 7 KNO₂ + 2 CH₃COOH ──► K₃[Co(NO₂)₆]↓ (yellow Fischer salt) ; Co²⁺ + 4 SCN⁻ ──(in amyl alcohol/ether)──► [Co(SCN)₄]²⁻ (intense blue organic layer)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group IV Cation: Cobalt(II) (Co²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_58_cat_ni2",
    "title": "Systematic Identification of Group IV Cation: Nickel(II) (Ni²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group iv cation: nickel(ii) (ni²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Ni²⁺ + 2 DMG + 2 NH₄OH ──► [Ni(DMG)₂]↓ (brilliant scarlet red precipitate stabilized by intramol. H-bonds)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group IV Cation: Nickel(II) (Ni²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_59_cat_mn2",
    "title": "Systematic Identification of Group IV Cation: Manganese(II) (Mn²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Hard",
    "aim": "To perform systematic identification of group iv cation: manganese(ii) (mn²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Mn²⁺ + H₂S ──(NH₄OH)──► MnS↓ (buff/flesh colored) ; 2 Mn²⁺ + 5 PbO₂ + 10 HNO₃ ──► 2 HMnO₄ (purple permanganic acid) + 5 Pb(NO₃)₂ + 4 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group IV Cation: Manganese(II) (Mn²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_60_cat_zn2",
    "title": "Systematic Identification of Group IV Cation: Zinc(II) (Zn²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group iv cation: zinc(ii) (zn²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Zn²⁺ + 2 NaOH ──► Zn(OH)₂↓ (white) ──(excess NaOH)──► [Zn(OH)₄]²⁻ ; Rinmann green test with Co(NO₃)₂ forms green cobalt zincate (CoO·ZnO)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group IV Cation: Zinc(II) (Zn²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_61_cat_ba2",
    "title": "Systematic Identification of Group V Cation: Barium (Ba²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group v cation: barium (ba²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Ba²⁺ + K₂CrO₄ ──(CH₃COOH)──► BaCrO₄↓ (yellow ppt insoluble in acetic acid) ; Apple-green flame test through blue glass",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group V Cation: Barium (Ba²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_62_cat_sr2",
    "title": "Systematic Identification of Group V Cation: Strontium (Sr²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group v cation: strontium (sr²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Sr²⁺ + (NH₄)₂SO₄ ──► SrSO₄↓ (white ppt) ; Persistent crimson red flame coloration",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group V Cation: Strontium (Sr²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_63_cat_ca2",
    "title": "Systematic Identification of Group V Cation: Calcium (Ca²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group v cation: calcium (ca²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Ca²⁺ + (NH₄)₂C₂O₄ ──► CaC₂O₄↓ (white ppt insoluble in acetic acid, soluble in dil HCl) ; Brick-red flame coloration",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group V Cation: Calcium (Ca²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_64_cat_mg2",
    "title": "Systematic Identification of Group VI Cation: Magnesium (Mg²⁺)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of group vi cation: magnesium (mg²⁺) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Mg²⁺ + Na₂HPO₄ + NH₄OH ──► Mg(NH₄)PO₄↓ (white crystalline ppt) ; Magneson reagent forms a characteristic blue lake ppt",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Group VI Cation: Magnesium (Mg²⁺) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_65_an_co3",
    "title": "Systematic Identification of Dilute Acid Group Anion: Carbonate (CO₃²⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Easy",
    "aim": "To perform systematic identification of dilute acid group anion: carbonate (co₃²⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "CO₃²⁻ + 2 H⁺ ──► H₂O + CO₂↑ (brisk effervescence turning limewater milky)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Dilute Acid Group Anion: Carbonate (CO₃²⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_66_an_so3",
    "title": "Systematic Identification of Dilute Acid Group Anion: Sulphite (SO₃²⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of dilute acid group anion: sulphite (so₃²⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "SO₃²⁻ + 2 H⁺ ──► H₂O + SO₂↑ ; 3 SO₂ + Cr₂O₇²⁻ + 2 H⁺ ──► 2 Cr³⁺(green) + 3 SO₄²⁻ + H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Dilute Acid Group Anion: Sulphite (SO₃²⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_67_an_s2",
    "title": "Systematic Identification of Dilute Acid Group Anion: Sulphide (S²⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of dilute acid group anion: sulphide (s²⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "S²⁻ + 2 H⁺ ──► H₂S↑ (rotten egg odor) ; H₂S + Pb(CH₃COO)₂ ──► PbS↓ (shiny black) ; S²⁻ + [Fe(CN)₅NO]²⁻ ──► [Fe(CN)₅NOS]⁴⁻ (deep violet-purple)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Dilute Acid Group Anion: Sulphide (S²⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_68_an_no2",
    "title": "Systematic Identification of Dilute Acid Group Anion: Nitrite (NO₂⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of dilute acid group anion: nitrite (no₂⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 NO₂⁻ + H₂SO₄ ──► K₂SO₄ + NO↑ + NO₂↑ ; 2 NO₂⁻ + 2 I⁻ + 4 H⁺ ──► 2 NO + I₂ + 2 H₂O (turns starch paper deep blue)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Dilute Acid Group Anion: Nitrite (NO₂⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_69_an_ch3coo",
    "title": "Systematic Identification of Dilute Acid Group Anion: Acetate (CH₃COO⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of dilute acid group anion: acetate (ch₃coo⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "CH₃COO⁻ + H⁺ ──► CH₃COOH (vinegar odor) ; 3 CH₃COONa + FeCl₃ + 2 H₂O ──► [Fe₃(OH)₂(CH₃COO)₆]⁺ (blood-red) ──(boil)──► brown-red basic iron acetate",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Dilute Acid Group Anion: Acetate (CH₃COO⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_70_an_cl",
    "title": "Systematic Identification of Concentrated Acid Group Anion: Chloride (Cl⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Hard",
    "aim": "To perform systematic identification of concentrated acid group anion: chloride (cl⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "4 NaCl + K₂Cr₂O₇ + 6 H₂SO₄ ──► 2 CrO₂Cl₂↑ (deep red chromyl chloride vapors) ; CrO₂Cl₂ + 4 NaOH ──► Na₂CrO₄ + Pb(CH₃COO)₂ ──► PbCrO₄↓ (canary yellow)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Concentrated Acid Group Anion: Chloride (Cl⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_71_an_br",
    "title": "Systematic Identification of Concentrated Acid Group Anion: Bromide (Br⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Hard",
    "aim": "To perform systematic identification of concentrated acid group anion: bromide (br⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 KBr + MnO₂ + 2 H₂SO₄ ──► K₂SO₄ + MnSO₄ + 2 H₂O + Br₂↑ (reddish-brown vapors) ; Organic layer test: Cl₂ water + CCl₄ extracts free Br₂ into orange-red layer",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Concentrated Acid Group Anion: Bromide (Br⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_72_an_i",
    "title": "Systematic Identification of Concentrated Acid Group Anion: Iodide (I⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Hard",
    "aim": "To perform systematic identification of concentrated acid group anion: iodide (i⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 KI + conc. H₂SO₄ ──► K₂SO₄ + SO₂ + 2 H₂O + I₂↑ (dense violet choking vapors) ; Organic layer test: Cl₂ water + CCl₄ extracts I₂ into intense violet layer",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Concentrated Acid Group Anion: Iodide (I⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_73_an_no3",
    "title": "Systematic Identification of Concentrated Acid Group Anion: Nitrate (NO₃⁻) via Brown Ring Test",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Hard",
    "aim": "To perform systematic identification of concentrated acid group anion: nitrate (no₃⁻) via brown ring test following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "NO₃⁻ + 3 Fe²⁺ + 4 H⁺ ──► 3 Fe³⁺ + NO + 2 H₂O ; [Fe(H₂O)₆]²⁺ + NO ──► [Fe(H₂O)₅(NO)]²⁺ (dark brown ring at interface)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Concentrated Acid Group Anion: Nitrate (NO₃⁻) via Brown Ring Test with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_74_an_so4",
    "title": "Systematic Identification of Special Anion: Sulphate (SO₄²⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Easy",
    "aim": "To perform systematic identification of special anion: sulphate (so₄²⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "SO₄²⁻ + BaCl₂ ──► BaSO₄↓ (thick white precipitate insoluble in conc. HCl and conc. HNO₃)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Special Anion: Sulphate (SO₄²⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_75_an_po4",
    "title": "Systematic Identification of Special Anion: Phosphate (PO₄³⁻)",
    "classLevel": 12,
    "category": "Qualitative Salt Analysis",
    "difficulty": "Medium",
    "aim": "To perform systematic identification of special anion: phosphate (po₄³⁻) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "PO₄³⁻ + 12 (NH₄)₂MoO₄ + 24 H⁺ ──(conc. HNO₃, warm)──► (NH₄)₃[PMo₁₂O₄₀]↓ (canary yellow ammonium phosphomolybdate ppt)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Systematic Identification of Special Anion: Phosphate (PO₄³⁻) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_76_titr_kmno4_mohr",
    "title": "Redox Titration: Determination of Molarity of KMnO₄ using 0.05 M Mohr's Salt",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform redox titration: determination of molarity of kmno₄ using 0.05 m mohr's salt following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 KMnO₄ + 10 FeSO₄·(NH₄)₂SO₄ + 8 H₂SO₄ ──► K₂SO₄ + 2 MnSO₄ + 5 Fe₂(SO₄)₃ + 10 (NH₄)₂SO₄ + 8 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Redox Titration: Determination of Molarity of KMnO₄ using 0.05 M Mohr's Salt with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_77_titr_kmno4_oxalic_hot",
    "title": "Redox Titration: Standardization of KMnO₄ with Oxalic Acid at 333-343 K",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform redox titration: standardization of kmno₄ with oxalic acid at 333-343 k following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 KMnO₄ + 5 H₂C₂O₄ + 3 H₂SO₄ ──(60°C)──► K₂SO₄ + 2 MnSO₄ + 10 CO₂↑ + 8 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Redox Titration: Standardization of KMnO₄ with Oxalic Acid at 333-343 K with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_78_titr_oxalic_purity",
    "title": "Determination of Percentage Purity of Impure Oxalic Acid Commercial Sample",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform determination of percentage purity of impure oxalic acid commercial sample following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "% Purity = (Calculated pure weight / Weighed sample weight) × 100",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Determination of Percentage Purity of Impure Oxalic Acid Commercial Sample with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_79_titr_mohr_water_x",
    "title": "Determination of Water of Crystallization 'x' in FeSO₄·(NH₄)₂SO₄·xH₂O",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform determination of water of crystallization 'x' in feso₄·(nh₄)₂so₄·xh₂o following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "x = (Molecular weight found - 284) / 18",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Determination of Water of Crystallization 'x' in FeSO₄·(NH₄)₂SO₄·xH₂O with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_80_titr_k2cr2o7_mohr",
    "title": "Redox Titration: Standardization of K₂Cr₂O₇ using Mohr's Salt with Diphenylamine",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform redox titration: standardization of k₂cr₂o₇ using mohr's salt with diphenylamine following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "K₂Cr₂O₇ + 6 FeSO₄ + 7 H₂SO₄ ──► K₂SO₄ + Cr₂(SO₄)₃ + 3 Fe₂(SO₄)₃ + 7 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Redox Titration: Standardization of K₂Cr₂O₇ using Mohr's Salt with Diphenylamine with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_81_titr_iodometry_hypo",
    "title": "Iodometric Titration: Standardization of Sodium Thiosulphate with Standard K₂Cr₂O₇",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform iodometric titration: standardization of sodium thiosulphate with standard k₂cr₂o₇ following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "K₂Cr₂O₇ + 6 KI + 7 H₂SO₄ ──► Cr₂(SO₄)₃ + 4 K₂SO₄ + 3 I₂ ; 2 Na₂S₂O₃ + I₂ ──(starch)──► Na₂S₄O₆ + 2 NaI",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Iodometric Titration: Standardization of Sodium Thiosulphate with Standard K₂Cr₂O₇ with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_82_titr_iodometry_copper",
    "title": "Iodometric Determination of Copper Content in Brass Alloy / CuSO₄ Sample",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform iodometric determination of copper content in brass alloy / cuso₄ sample following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 Cu²⁺ + 4 I⁻ ──► Cu₂I₂↓ (white) + I₂ ; I₂ + 2 S₂O₃²⁻ ──► 2 I⁻ + S₄O₆²⁻",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Iodometric Determination of Copper Content in Brass Alloy / CuSO₄ Sample with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_83_titr_edta_hardness",
    "title": "Complexometric Titration: Determination of Total Hardness of Tap Water using 0.01 M EDTA",
    "classLevel": 12,
    "category": "Volumetric Analysis & Titration",
    "difficulty": "Hard",
    "aim": "To perform complexometric titration: determination of total hardness of tap water using 0.01 m edta following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Ca²⁺/Mg²⁺ + EDTA⁴⁻ ──(pH 10 ammoniacal buffer, Erio-T)──► [Ca-EDTA]²⁻ (Wine red to pure blue endpoint)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Complexometric Titration: Determination of Total Hardness of Tap Water using 0.01 M EDTA with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_84_titr_conductometry_strong",
    "title": "Conductometric Titration of Strong Acid (HCl) vs Strong Base (NaOH)",
    "classLevel": 12,
    "category": "Physical Chemistry",
    "difficulty": "Medium",
    "aim": "To perform conductometric titration of strong acid (hcl) vs strong base (naoh) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "H⁺(fast, λ=350) + Cl⁻ + Na⁺ + OH⁻ ──► H₂O + Na⁺ + Cl⁻ (Conductance drops to V-notch min, then rises with excess OH⁻)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Conductometric Titration of Strong Acid (HCl) vs Strong Base (NaOH) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_85_titr_potentiometry_redox",
    "title": "Potentiometric Titration of Fe²⁺ against Ce⁴⁺ using Platinum and Calomel Electrodes",
    "classLevel": 12,
    "category": "Physical Chemistry",
    "difficulty": "Hard",
    "aim": "To perform potentiometric titration of fe²⁺ against ce⁴⁺ using platinum and calomel electrodes following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Fe²⁺ + Ce⁴⁺ ──► Fe³⁺ + Ce³⁺ (Sharp inflection potential jump at equivalence point)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Potentiometric Titration of Fe²⁺ against Ce⁴⁺ using Platinum and Calomel Electrodes with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_86_org_unsaturation",
    "title": "Tests for Unsaturation: Decolorization of Bromine in CCl₄ and Baeyer Reagent (alk. KMnO₄)",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Easy",
    "aim": "To perform tests for unsaturation: decolorization of bromine in ccl₄ and baeyer reagent (alk. kmno₄) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "R-CH=CH-R + Br₂/CCl₄ ──► R-CHBr-CHBr-R (colorless) ; 3 R-CH=CH-R + 2 KMnO₄ + 4 H₂O ──► 3 R-CH(OH)-CH(OH)-R + 2 MnO₂↓(brown)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Tests for Unsaturation: Decolorization of Bromine in CCl₄ and Baeyer Reagent (alk. KMnO₄) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_87_org_alcohol_can",
    "title": "Tests for Alcoholic Group (-OH): Ceric Ammonium Nitrate (CAN) & Sodium Metal Effervescence",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Medium",
    "aim": "To perform tests for alcoholic group (-oh): ceric ammonium nitrate (can) & sodium metal effervescence following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 R-OH + 2 Na ──► 2 R-ONa + H₂↑ ; (NH₄)₂[Ce(NO₃)₆] + R-OH ──► [Ce(OR)(NO₃)₅]²⁻ (cherry red complex)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Tests for Alcoholic Group (-OH): Ceric Ammonium Nitrate (CAN) & Sodium Metal Effervescence with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_88_org_phenol_fecl3",
    "title": "Tests for Phenolic Group (Ar-OH): Neutral FeCl₃ Violet Coloration & Phthalein Dye Test",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Medium",
    "aim": "To perform tests for phenolic group (ar-oh): neutral fecl₃ violet coloration & phthalein dye test following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "6 C₆H₅OH + FeCl₃ ──► [Fe(OC₆H₅)₆]³⁻(deep violet) + 3 H⁺ + 3 Cl⁻ ; Phenol + Phthalic anhydride ──(conc. H₂SO₄, then NaOH)──► Phenolphthalein (intense pink)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Tests for Phenolic Group (Ar-OH): Neutral FeCl₃ Violet Coloration & Phthalein Dye Test with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_89_org_aldehyde_tollens",
    "title": "Tests for Aldehydic Group (-CHO): Tollen's Silver Mirror Test & Fehling's Cuprous Oxide Test",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Medium",
    "aim": "To perform tests for aldehydic group (-cho): tollen's silver mirror test & fehling's cuprous oxide test following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "R-CHO + 2 [Ag(NH₃)₂]⁺ + 3 OH⁻ ──► R-COO⁻ + 2 Ag↓(silver mirror) + 4 NH₃ + 2 H₂O ; R-CHO + 2 Cu²⁺ + 5 OH⁻ ──► R-COO⁻ + Cu₂O↓(red) + 3 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Tests for Aldehydic Group (-CHO): Tollen's Silver Mirror Test & Fehling's Cuprous Oxide Test with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_90_org_carbonyl_24dnp",
    "title": "General Test for Carbonyl Group (>C=O): Brady Reagent (2,4-DNP) Condensation",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Medium",
    "aim": "To perform general test for carbonyl group (>c=o): brady reagent (2,4-dnp) condensation following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "R₂C=O + H₂N-NH-C₆H₃(NO₂)₂ ──► R₂C=N-NH-C₆H₃(NO₂)₂↓ (crystalline yellow-orange 2,4-dinitrophenylhydrazone)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed General Test for Carbonyl Group (>C=O): Brady Reagent (2,4-DNP) Condensation with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_91_org_iodoform_test",
    "title": "Specific Test for Methyl Ketones & Secondary Alcohols: Iodoform Test (I₂/NaOH)",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Medium",
    "aim": "To perform specific test for methyl ketones & secondary alcohols: iodoform test (i₂/naoh) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "CH₃-CO-R + 3 I₂ + 4 NaOH ──► CHI₃↓ (bright yellow antiseptic crystals, m.p. 119°C) + R-COONa + 3 NaI + 3 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Specific Test for Methyl Ketones & Secondary Alcohols: Iodoform Test (I₂/NaOH) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_92_org_carboxylic_nahco3",
    "title": "Tests for Carboxylic Acid Group (-COOH): NaHCO₃ Brisk Effervescence & Esterification",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Easy",
    "aim": "To perform tests for carboxylic acid group (-cooh): nahco₃ brisk effervescence & esterification following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "R-COOH + NaHCO₃ ──► R-COONa + H₂O + CO₂↑ (turns limewater milky) ; R-COOH + C₂H₅OH ──(H⁺,Δ)──► R-COOC₂H₅ (fruity ester)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Tests for Carboxylic Acid Group (-COOH): NaHCO₃ Brisk Effervescence & Esterification with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_93_org_amine_carbylamine",
    "title": "Specific Test for Primary Amines (-NH₂): Carbylamine (Isocyanide) Foul Odor Test",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Hard",
    "aim": "To perform specific test for primary amines (-nh₂): carbylamine (isocyanide) foul odor test following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "R-NH₂ + CHCl₃ + 3 alc. KOH ──(Δ)──► R-N≡C (extremely obnoxious foul-smelling carbylamine) + 3 KCl + 3 H₂O",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Specific Test for Primary Amines (-NH₂): Carbylamine (Isocyanide) Foul Odor Test with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_94_org_amine_hinsberg",
    "title": "Distinction between 1°, 2°, and 3° Amines: Hinsberg Test with Benzenesulphonyl Chloride",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Hard",
    "aim": "To perform distinction between 1°, 2°, and 3° amines: hinsberg test with benzenesulphonyl chloride following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "1° Amine forms alkali-soluble sulphonamide; 2° Amine forms alkali-insoluble sulphonamide; 3° Amine does not react.",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Distinction between 1°, 2°, and 3° Amines: Hinsberg Test with Benzenesulphonyl Chloride with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_95_org_azo_dye_test",
    "title": "Specific Test for Primary Aromatic Amines: Diazotization and Azo Dye Coupling",
    "classLevel": 12,
    "category": "Organic Functional Groups",
    "difficulty": "Hard",
    "aim": "To perform specific test for primary aromatic amines: diazotization and azo dye coupling following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Ar-NH₂ + NaNO₂ + 2 HCl ──(0-5°C)──► Ar-N₂⁺Cl⁻ ; Ar-N₂⁺Cl⁻ + β-Naphthol ──(alkaline NaOH)──► Brilliant Scarlet Red Azo Dye",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Specific Test for Primary Aromatic Amines: Diazotization and Azo Dye Coupling with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_96_kinetics_thiosulphate_conc",
    "title": "Kinetics: Effect of Concentration on Rate of Reaction between Na₂S₂O₃ and HCl",
    "classLevel": 12,
    "category": "Chemical Kinetics",
    "difficulty": "Medium",
    "aim": "To perform kinetics: effect of concentration on rate of reaction between na₂s₂o₃ and hcl following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Na₂S₂O₃(aq) + 2 HCl(aq) ──► 2 NaCl + H₂O + SO₂↑ + S(s)↓ (colloidal sulphur cross obscuration time 1/t)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Kinetics: Effect of Concentration on Rate of Reaction between Na₂S₂O₃ and HCl with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_97_kinetics_thiosulphate_temp",
    "title": "Kinetics: Effect of Temperature on Reaction Rate and Determination of Activation Energy (Ea)",
    "classLevel": 12,
    "category": "Chemical Kinetics",
    "difficulty": "Hard",
    "aim": "To perform kinetics: effect of temperature on reaction rate and determination of activation energy (ea) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "k = A·e^(-Ea/RT) ; Plot log(1/t) vs 1/T yields slope = -Ea / 2.303 R",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Kinetics: Effect of Temperature on Reaction Rate and Determination of Activation Energy (Ea) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_98_kinetics_iodine_clock",
    "title": "Kinetics: Iodine Clock Reaction between Potassium Iodate and Sodium Sulphite",
    "classLevel": 12,
    "category": "Chemical Kinetics",
    "difficulty": "Hard",
    "aim": "To perform kinetics: iodine clock reaction between potassium iodate and sodium sulphite following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "IO₃⁻ + 3 HSO₃⁻ ──► I⁻ + 3 SO₄²⁻ + 3 H⁺ ; IO₃⁻ + 5 I⁻ + 6 H⁺ ──► 3 I₂ + 3 H₂O ──(starch)──► sudden deep blue flash",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Kinetics: Iodine Clock Reaction between Potassium Iodate and Sodium Sulphite with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_99_kinetics_h2o2_mno2",
    "title": "Kinetics: Catalytic Decomposition of Hydrogen Peroxide in the Presence of MnO₂",
    "classLevel": 12,
    "category": "Chemical Kinetics",
    "difficulty": "Medium",
    "aim": "To perform kinetics: catalytic decomposition of hydrogen peroxide in the presence of mno₂ following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "2 H₂O₂(aq) ──(MnO₂ catalyst)──► 2 H₂O(l) + O₂(g)↑ (Volume of O₂ evolved measured vs time)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Kinetics: Catalytic Decomposition of Hydrogen Peroxide in the Presence of MnO₂ with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_100_cell_daniell_emf",
    "title": "Electrochemistry: Measurement of EMF of Daniell Cell [Zn | Zn²⁺(1M) || Cu²⁺(1M) | Cu]",
    "classLevel": 12,
    "category": "Electrochemistry",
    "difficulty": "Medium",
    "aim": "To perform electrochemistry: measurement of emf of daniell cell [zn | zn²⁺(1m) || cu²⁺(1m) | cu] following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "E°cell = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = +0.34 - (-0.76) = +1.10 V",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Electrochemistry: Measurement of EMF of Daniell Cell [Zn | Zn²⁺(1M) || Cu²⁺(1M) | Cu] with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_101_cell_nernst_variation",
    "title": "Electrochemistry: Verification of Nernst Equation by Varying Cu²⁺ and Zn²⁺ Concentrations",
    "classLevel": 12,
    "category": "Electrochemistry",
    "difficulty": "Hard",
    "aim": "To perform electrochemistry: verification of nernst equation by varying cu²⁺ and zn²⁺ concentrations following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Ecell = E°cell - (0.0591 / 2) · log₁₀([Zn²⁺] / [Cu²⁺])",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Electrochemistry: Verification of Nernst Equation by Varying Cu²⁺ and Zn²⁺ Concentrations with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_102_prep_mohr_salt",
    "title": "Preparation of Double Salt: Ferrous Ammonium Sulphate (Mohr's Salt)",
    "classLevel": 12,
    "category": "Preparations & Syntheses",
    "difficulty": "Medium",
    "aim": "To perform preparation of double salt: ferrous ammonium sulphate (mohr's salt) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "FeSO₄ + (NH₄)₂SO₄ + 6 H₂O ──► FeSO₄·(NH₄)₂SO₄·6H₂O (Pale green monoclinic crystals)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Preparation of Double Salt: Ferrous Ammonium Sulphate (Mohr's Salt) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_103_prep_potash_alum",
    "title": "Preparation of Double Salt: Potash Alum [K₂SO₄·Al₂(SO₄)₃·24H₂O]",
    "classLevel": 12,
    "category": "Preparations & Syntheses",
    "difficulty": "Medium",
    "aim": "To perform preparation of double salt: potash alum [k₂so₄·al₂(so₄)₃·24h₂o] following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24 H₂O ──► K₂SO₄·Al₂(SO₄)₃·24H₂O (Regular octahedral transparent crystals)",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Preparation of Double Salt: Potash Alum [K₂SO₄·Al₂(SO₄)₃·24H₂O] with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_104_prep_potassium_trioxalatoferrate",
    "title": "Preparation of Coordination Complex: Potassium Trioxalatoferrate(III) Trihydrate",
    "classLevel": 12,
    "category": "Preparations & Syntheses",
    "difficulty": "Hard",
    "aim": "To perform preparation of coordination complex: potassium trioxalatoferrate(iii) trihydrate following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "FeCl₃ + 3 K₂C₂O₄ + 3 H₂O ──► K₃[Fe(C₂O₄)₃]·3H₂O (Emerald green fluorescent crystals) + 3 KCl",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Preparation of Coordination Complex: Potassium Trioxalatoferrate(III) Trihydrate with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_105_prep_acetanilide",
    "title": "Organic Synthesis: Preparation of Acetanilide from Aniline by Acetylation",
    "classLevel": 12,
    "category": "Preparations & Syntheses",
    "difficulty": "Medium",
    "aim": "To perform organic synthesis: preparation of acetanilide from aniline by acetylation following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "C₆H₅NH₂ + (CH₃CO)₂O ──(glacial CH₃COOH, Zn dust)──► C₆H₅NHCOCH₃ (White shiny flakes, m.p. 114°C) + CH₃COOH",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Organic Synthesis: Preparation of Acetanilide from Aniline by Acetylation with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_106_prep_aspirin",
    "title": "Organic Synthesis: Preparation of Aspirin (Acetylsalicylic Acid) from Salicylic Acid",
    "classLevel": 12,
    "category": "Preparations & Syntheses",
    "difficulty": "Medium",
    "aim": "To perform organic synthesis: preparation of aspirin (acetylsalicylic acid) from salicylic acid following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "C₆H₄(OH)COOH + (CH₃CO)₂O ──(conc. H₂SO₄, 60°C)──► C₆H₄(OCOCH₃)COOH (Aspirin crystals, m.p. 135°C) + CH₃COOH",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Organic Synthesis: Preparation of Aspirin (Acetylsalicylic Acid) from Salicylic Acid with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  },
  {
    "id": "exp_c12_107_biomolecules_tests",
    "title": "Biomolecules: Qualitative Tests for Carbohydrates (Molisch, Fehling) and Proteins (Biuret, Ninhydrin)",
    "classLevel": 12,
    "category": "Biomolecules",
    "difficulty": "Medium",
    "aim": "To perform biomolecules: qualitative tests for carbohydrates (molisch, fehling) and proteins (biuret, ninhydrin) following official CBSE/NCERT Class 12 chemistry laboratory guidelines.",
    "apparatus": [
      "Burette",
      "Pipette",
      "Conical flask",
      "Boiling tubes & rack",
      "Water bath",
      "Analytical balance",
      "Thermometer"
    ],
    "chemicals": [
      "Standard analytical grade laboratory reagents",
      "Distilled water"
    ],
    "procedure": [
      "1. Prepare the standard analytical solution or salt extract according to stoichiometry.",
      "2. Perform systematic preliminary tests, group separation, or controlled volumetric titration.",
      "3. Carry out the specific confirmatory chemical reaction.",
      "4. Observe distinctive color transitions, precipitation equilibria, or electrochemical potential jumps.",
      "5. Record concordant readings and compute the final quantitative / qualitative outcome."
    ],
    "chemicalEquation": "Molisch: α-Naphthol forms purple ring at junction ; Biuret: Peptide bonds + alkaline CuSO₄ ──► violet coordination complex",
    "observation": "Distinctive color transformations, precipitates, and volumetric endpoints recorded in exact agreement with theoretical chemistry.",
    "result": "Successfully completed Biomolecules: Qualitative Tests for Carbohydrates (Molisch, Fehling) and Proteins (Biuret, Ninhydrin) with high analytical accuracy.",
    "explanation": "Corresponds to core CBSE Class 12 practical syllabus incorporating advanced coordination, electrochemistry, redox, and organic reaction mechanisms.",
    "safety": "Follow strict laboratory safety guidelines. Toxic fumes should only be handled in a certified fume cupboard.",
    "relatedReactions": [
      "Redox Titration",
      "Qualitative Analysis",
      "Organic Functional Group Identification"
    ],
    "vivaQuestions": [
      {
        "q": "What is the chemical significance of the observed endpoint/reaction in this experiment?",
        "a": "It corresponds to the exact stoichiometric equivalence point or characteristic complex formation defined by the underlying equilibrium equation."
      },
      {
        "q": "What key precautions must be strictly observed?",
        "a": "Ensure all reagents are freshly standardized, prevent parallax error during burette meniscus readings, and control reaction temperature strictly."
      },
      {
        "q": "How is this practical relevant in industrial and clinical testing?",
        "a": "These analytical protocols form the bedrock of pharmaceutical quality control, alloy testing, and forensic chemical analysis."
      }
    ]
  }
];
