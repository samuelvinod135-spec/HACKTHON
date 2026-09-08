/**
 * Vernacular Chemistry Modules Schema & Data
 * 
 * Standardized schema for NCERT / CBSE Class 10/11/12 Chemistry Modules
 * featuring parallel vernacular explanations (Hindi, Tamil, English)
 * structured according to the 'Smart Vernacular' pedagogical rule:
 * English technical keywords remain uncorrupted for STEM rigor.
 */

export const VERNACULAR_CHEMISTRY_MODULES = [
  {
    id: 'chem-magnesium-combustion',
    slug: 'magnesium-combustion',
    chapter: 'Chemical Reactions and Equations',
    grade: 'Class 10 / Foundational',
    title: {
      en: 'Combustion of Magnesium Ribbon & Enthalpy Release',
      hi: 'Magnesium Ribbon का दहन और Enthalpy विमुक्ति',
      ta: 'Magnesium Ribbon எரிதல் மற்றும் Enthalpy வெளியீடு',
    },
    equation: '2Mg(s) + O₂(g) → 2MgO(s)  [ΔH = -1204 kJ/mol]',
    technicalKeywords: [
      'Magnesium Ribbon',
      'Oxygen',
      'Magnesium Oxide',
      'Exothermic',
      'Enthalpy',
      'Activation Energy',
      'Bunsen Burner',
      'Oxidation',
    ],
    objective: {
      en: 'To observe the Exothermic Oxidation of Magnesium Ribbon in atmospheric Oxygen, measure Enthalpy change, and verify the basic nature of Magnesium Oxide.',
      hi: 'वायुमंडलीय Oxygen में Magnesium Ribbon के Exothermic Oxidation का प्रेक्षण करना, Enthalpy परिवर्तन मापना, और Magnesium Oxide की क्षारीय प्रकृति की पुष्टि करना।',
      ta: 'வளிமண்டல Oxygen உடன் Magnesium Ribbon நிகழ்த்தும் Exothermic Oxidation வினையைக் கவனித்து, Enthalpy மாற்றத்தை அளவிட்டு, Magnesium Oxide காரத்தன்மையை உறுதி செய்தல்.',
    },
    procedureSteps: [
      {
        step: 1,
        en: 'Clean a 3cm strip of Magnesium Ribbon with sandpaper to remove the inert basic carbonate layer.',
        hi: 'निष्क्रिय परत हटाने के लिए रेगमाल से 3cm लंबे Magnesium Ribbon को साफ करें।',
        ta: 'செயலற்ற கார்பனேட் அடுக்கை அகற்ற 3 செ.மீ நீளமுள்ள Magnesium Ribbon துண்டை மணர்த்தாள் கொண்டு தேய்க்கவும்.',
      },
      {
        step: 2,
        en: 'Hold the ribbon with crucible tongs over the blue flame of a Bunsen Burner until Activation Energy threshold is attained.',
        hi: 'चिमीटी से पकड़कर Magnesium Ribbon को Bunsen Burner की नीली लौ पर गर्म करें जब तक Activation Energy प्राप्त न हो जाए।',
        ta: 'Activation Energy வரம்பை அடையும் வரை ஒரு Bunsen Burner நீலச் சுடரில் இடுக்கியால் பிடித்துக் காட்டவும்.',
      },
      {
        step: 3,
        en: 'Observe the dazzling white light emission and collect the resulting white powder of Magnesium Oxide in a watch glass.',
        hi: 'तीव्र चमकदार सफेद प्रकाश का प्रेक्षण करें और वॉच ग्लास में बने सफेद Magnesium Oxide पाउडर को इकट्ठा करें।',
        ta: 'கண் கூசும் வெண்மையான ஒளியைக் கவனித்து, உருவாகும் வெண்மையான Magnesium Oxide துகள்களைக் கண்ணாடித் தட்டில் சேகரிக்கவும்.',
      },
    ],
    theoryExplanation: {
      en: 'Magnesium loses two valence electrons to Oxygen in a vigorous Exothermic reaction. The high negative Enthalpy of formation (ΔH = -1204 kJ/mol) reflects intense lattice stabilization of the ionic Magnesium Oxide crystal.',
      hi: 'तीव्र Exothermic अभिक्रिया में Magnesium दो संयोजी इलेक्ट्रॉन Oxygen को प्रदान करता है। अत्यधिक ऋणात्मक Enthalpy मान (-1204 kJ/mol) आयनिक Magnesium Oxide क्रिस्टल की सुदृढ़ जालक ऊर्जा को प्रदर्शित करता है।',
      ta: 'ஒரு தீவிரமான Exothermic வினையில் Magnesium தனது இரண்டு இணைதிறன் எலக்ட்ரான்களை Oxygen க்கு வழங்கி Oxidation அடைகிறது. உயர் எதிர்மறை Enthalpy மதிப்பு (-1204 kJ/mol) அயனி Magnesium Oxide படிகத்தின் நிலைப்புத்தன்மையைக் காட்டுகிறது.',
    },
    safetyWarning: {
      en: 'Intense ultraviolet emission. Do not stare directly into the burning Magnesium Ribbon without protective UV goggles.',
      hi: 'तीव्र पराबैंगनी (UV) विकिरण। सुरक्षा चश्मे के बिना जलते हुए Magnesium Ribbon को सीधे न देखें।',
      ta: 'தீவிர புற ஊதாக் கதிர்வீச்சு (UV). பாதுகாப்பு கண்ணாடி அணியாமல் எரியும் Magnesium Ribbon ஐ நேரடியாக உற்றுப் பார்க்கக் கூடாது.',
    },
  },
  {
    id: 'chem-acid-base-titration',
    slug: 'acid-base-titration',
    chapter: 'Acids, Bases and Salts',
    grade: 'Class 11 / Higher Secondary',
    title: {
      en: 'Neutralization Stoichiometry & Titration Curve',
      hi: 'उदासीनीकरण Stoichiometry और Titration वक्र',
      ta: 'நடுநிலையாக்கல் Stoichiometry மற்றும் Titration வளைவு',
    },
    equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)  [ΔH = -57.3 kJ/mol]',
    technicalKeywords: [
      'Titration',
      'Stoichiometry',
      'Molarity',
      'Enthalpy',
      'Equilibrium',
      'Neutralization',
      'Phenolphthalein',
    ],
    objective: {
      en: 'Determine the exact Molarity of unknown hydrochloric acid via quantitative volumetric Titration, observing sharp indicator transition at Equilibrium.',
      hi: 'मात्रात्मक volumetric Titration द्वारा अज्ञात हाइड्रोक्लोरिक एसिड की सटीक Molarity ज्ञात करें और Equilibrium पर सूचक का रंग परिवर्तन देखें।',
      ta: 'அளவீட்டு முறை Titration மூலம் அறியப்படாத அமிலத்தின் சரியான Molarity யைக் கணக்கிட்டு, Equilibrium நிலையில் வண்ண மாற்றத்தை உறுதி செய்தல்.',
    },
    theoryExplanation: {
      en: 'Standard enthalpy of Neutralization for strong acid-strong base is constant (-57.3 kJ/mol) because net reaction is formation of water from hydronium and hydroxide ions according to exact Stoichiometry.',
      hi: 'प्रबल अम्ल-प्रबल क्षार की Neutralization की मानक Enthalpy (-57.3 kJ/mol) स्थिर रहती है क्योंकि वास्तविक अभिक्रिया सटीक Stoichiometry के अनुसार जल का निर्माण है।',
      ta: 'வலுவான அமிலம்-வலுவான காரத்தின் Neutralization Enthalpy மாறிலியாக (-57.3 kJ/mol) இருக்கும், ஏனெனில் உண்மையான வினை சரியான Stoichiometry படி நீர் மூலக்கூறு உருவாக்கம் மட்டுமே.',
    },
  },
];
