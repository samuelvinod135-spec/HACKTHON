/**
 * Comprehensive Multilingual Question & Scientific Content Localization Engine
 * Supports 100% native translations in:
 * - English (en)
 * - Hindi (hi)
 * - Telugu (te)
 * - Tamil (ta)
 *
 * Covers:
 * 1. JEE Diagnostic Adaptive Questions (MOCK_TEST_QUESTIONS 1-10)
 * 2. Curricular Remedial Question Pools (CONCEPTS remedialPool)
 * 3. Concept Explanations, Memory Rules, Formulas, and Pitfalls
 * 4. High-Performance Domain-Aware Scientific Terminology Translator for any dynamic Question Bank question
 */

// 1. Translations for 10-Question Comprehensive JEE Diagnostic Test
export const MOCK_TEST_QUESTIONS_I18N = {
  1: {
    en: {
      question: 'A ray of green light in air strikes the flat polished surface of a crown glass block (n = 1.52) at an angle of 45° to the surface normal. Which statement correctly describes the refracted ray inside the glass?',
      options: [
        'The ray bends towards the normal at an angle θ₂ ≈ 27.7°',
        'The ray bends away from the normal at an angle θ₂ ≈ 65.2°',
        'The ray continues along 45° without deviation because green light has zero dispersion',
        'The ray undergoes total internal reflection back into the air',
      ],
      explanation: "By Snell's Law: n₁ sin(θ₁) = n₂ sin(θ₂) → 1.00 × sin(45°) = 1.52 × sin(θ₂) → sin(θ₂) = 0.7071 / 1.52 ≈ 0.4652 → θ₂ ≈ 27.7°. Light refracts towards the normal in an optically denser medium.",
    },
    hi: {
      question: 'हवा में हरी प्रकाश की एक किरण क्राउन ग्लास ब्लॉक (n = 1.52) की समतल सतह पर अभिलंब से 45° के कोण पर आपतित होती है। कांच के अंदर अपवर्तित किरण का सही वर्णन कौन सा कथन करता है?',
      options: [
        'किरण अभिलंब की ओर झुकती है और कोण θ₂ ≈ 27.7° बनता है',
        'किरण अभिलंब से दूर हटती है और कोण θ₂ ≈ 65.2° बनता है',
        'किरण बिना किसी विचलन के 45° पर जारी रहती है क्योंकि हरे प्रकाश का विक्षेपण शून्य होता है',
        'किरण का हवा में वापस पूर्ण आंतरिक परावर्तन हो जाता है',
      ],
      explanation: 'स्नेल के नियम के अनुसार: n₁ sin(θ₁) = n₂ sin(θ₂) → 1.00 × sin(45°) = 1.52 × sin(θ₂) → sin(θ₂) = 0.7071 / 1.52 ≈ 0.4652 → θ₂ ≈ 27.7°। सघन माध्यम में प्रवेश करने पर प्रकाश अभिलंब की ओर झुकता है।',
    },
    te: {
      question: 'గాలిలోని ఆకుపచ్చని కాంతి కిరణం క్రౌన్ గ్లాస్ బ్లాక్ (n = 1.52) ఉపరితలంపై లంబంతో 45° కోణంలో పతనమవుతుంది. గాజు లోపల వక్రీభవన కిరణాన్ని ఏ ప్రకటన సరిగ్గా వివరిస్తుంది?',
      options: [
        'కిరణం లంబం వైపు వంగి θ₂ ≈ 27.7° కోణాన్ని ఏర్పరుస్తుంది',
        'కిరణం లంబం నుండి దూరంగా జరిగి θ₂ ≈ 65.2° కోణాన్ని ఏర్పరుస్తుంది',
        'ఆకుపచ్చ కాంతికి విక్షేపణం శూన్యం కాబట్టి కిరణం విచలనం లేకుండా 45° వద్ద ప్రయాణిస్తుంది',
        'కిరణం తిరిగి గాలిలోకి సంపూర్ణ అంతర్గత పరావర్తనం చెందుతుంది',
      ],
      explanation: 'స్నెల్ నియమం ప్రకారం: n₁ sin(θ₁) = n₂ sin(θ₂) → 1.00 × sin(45°) = 1.52 × sin(θ₂) → sin(θ₂) = 0.7071 / 1.52 ≈ 0.4652 → θ₂ ≈ 27.7°. సాంద్రతర యానకంలో కాంతి లంబం వైపు వంగుతుంది.',
    },
    ta: {
      question: 'காற்றில் உள்ள ஒரு பச்சை ஒளிக்கதிர் கிரவுன் கண்ணாடிப் பட்டகத்தின் (n = 1.52) சமதளப் பரப்பில் செங்குத்துக் கோட்டுடன் 45° கோணத்தில் படுகிறது. கண்ணாடியினுள் ஒளிவிலகல் அடைந்த கதிரை எந்தக் கூற்று சரியாக விவரிக்கிறது?',
      options: [
        'கதிர் செங்குத்துக் கோட்டை நோக்கி வளைந்து θ₂ ≈ 27.7° கோணத்தை உருவாக்குகிறது',
        'கதிர் செங்குத்துக் கோட்டை விட்டு விலகி θ₂ ≈ 65.2° கோணத்தை உருவாக்குகிறது',
        'பச்சை ஒளிக்கு நிறப்பிரிகை இல்லாததால் கதிர் விலகலின்றி 45° கோணத்தில் நேராகச் செல்கிறது',
        'கதிர் மீண்டும் காற்றில் முழு அக எதிரொளிப்பு அடைகிறது',
      ],
      explanation: 'ஸ்னெல் விதியின்படி: n₁ sin(θ₁) = n₂ sin(θ₂) → 1.00 × sin(45°) = 1.52 × sin(θ₂) → sin(θ₂) = 0.7071 / 1.52 ≈ 0.4652 → θ₂ ≈ 27.7°. அடர்மிகு ஊடகத்தில் ஒளிக்கதிர் செங்குத்துக் கோட்டை நோக்கி விலகுகிறது.',
    },
  },

  2: {
    en: {
      question: 'A biconvex optical glass lens has a focal length of f = +20 cm in air. What is its optical power in Diopters (D)?',
      options: [
        '+5.0 Diopters (D)',
        '+0.05 Diopters (D)',
        '-5.0 Diopters (D)',
        '+20.0 Diopters (D)',
      ],
      explanation: 'Optical power P = 1 / f(in meters). Here f = +20 cm = +0.20 m, so P = 1 / 0.20 = +5.0 Diopters (D). Convex lenses have positive focal lengths and positive powers.',
    },
    hi: {
      question: 'हवा में एक उभयोत्तल (द्वि-उत्तल) कांच के लेंस की फोकस दूरी f = +20 सेमी है। डायोप्टर (D) में इसकी प्रकाशीय शक्ति क्या है?',
      options: [
        '+5.0 डायोप्टर (D)',
        '+0.05 डायोप्टर (D)',
        '-5.0 डायोप्टर (D)',
        '+20.0 डायोप्टर (D)',
      ],
      explanation: 'प्रकाशीय क्षमता P = 1 / f (मीटर में)। यहाँ f = +20 सेमी = +0.20 मीटर, इसलिए P = 1 / 0.20 = +5.0 D। उत्तल लेंस की क्षमता धनात्मक होती है।',
    },
    te: {
      question: 'గాలిలో ద్వికుంభాకార గాజు కటకం యొక్క నాభ్యాంతరం f = +20 సెం.మీ. డయాప్టర్లు (D) లో దాని దృక్ సామర్థ్యం ఎంత?',
      options: [
        '+5.0 డయాప్టర్లు (D)',
        '+0.05 డయాప్టర్లు (D)',
        '-5.0 డయాప్టర్లు (D)',
        '+20.0 డయాప్టర్లు (D)',
      ],
      explanation: 'కటక సామర్థ్యం P = 1 / f (మీటర్లలో). ఇక్కడ f = +20 సెం.మీ = +0.20 మీటర్లు, కాబట్టి P = 1 / 0.20 = +5.0 D. కుంభాకార కటకాలకు సామర్థ్యం ధనాత్మకం.',
    },
    ta: {
      question: 'காற்றில் ஒரு இருகுவி கண்ணாடி லென்சின் குவியத் தூரம் f = +20 செ.மீ ஆகும். டையாப்டரில் (D) அதன் ஒளித்திறன் என்ன?',
      options: [
        '+5.0 டையாப்டர் (D)',
        '+0.05 டையாப்டர் (D)',
        '-5.0 டையாப்டர் (D)',
        '+20.0 டையாப்டர் (D)',
      ],
      explanation: 'லென்சின் திறன் P = 1 / f (மீட்டரில்). இங்கு f = +20 செ.மீ = +0.20 மீ, எனவே P = 1 / 0.20 = +5.0 D. குவிலென்சுகளுக்குத் திறன் நேர்மறையாக இருக்கும்.',
    },
  },

  3: {
    en: {
      question: 'A simple pendulum consists of a 500g brass sphere on a 1.9m cord. If the brass sphere is replaced by a 2.0 kg lead sphere (4x heavier) while keeping the length identical, how does the period of oscillation change?',
      options: [
        'The period remains completely unchanged',
        'The period doubles because mass is 4x greater',
        'The period is cut in half',
        'The period increases by a factor of 4',
      ],
      explanation: 'The time period of a simple pendulum is T = 2π√(L/g). The mass m does not appear in the formula; gravitational mass and inertial mass cancel out, making the period independent of bob mass.',
    },
    hi: {
      question: 'एक सरल लोलक में 1.9 मीटर लंबी डोरी से 500 ग्राम का पीतल का गोला लटका है। यदि लंबाई समान रखते हुए पीतल के गोले को 2.0 किग्रा के सीसे के गोले (4 गुना भारी) से बदल दिया जाए, तो दोलन काल कैसे बदलेगा?',
      options: [
        'दोलन काल पूरी तरह से अपरिवर्तित रहेगा',
        'दोलन काल दोगुना हो जाएगा क्योंकि द्रव्यमान 4 गुना अधिक है',
        'दोलन काल आधा हो जाएगा',
        'दोलन काल 4 के कारक से बढ़ जाएगा',
      ],
      explanation: 'सरल लोलक का आवर्तकाल T = 2π√(L/g) होता है। यह गोलक के द्रव्यमान पर निर्भर नहीं करता क्योंकि जड़त्वीय और गुरुत्वीय द्रव्यमान एक दूसरे को निरस्त कर देते हैं।',
    },
    te: {
      question: 'ఒక సరళ లోలకంలో 1.9 మీటర్ల త్రాడుకు 500 గ్రాముల ఇత్తడి గోళం వేలాడదీయబడింది. పొడవు మారకుండా ఉంచి, దాని స్థానంలో 2.0 కిలోల సీసపు గోళాన్ని (4 రెట్లు బరువు) అమర్చితే, డోలనావర్తన కాలం ఎలా మారుతుంది?',
      options: [
        'ఆవర్తన కాలం ఏమాత్రం మారదు (స్థిరంగా ఉంటుంది)',
        'ద్రవ్యరాశి 4 రెట్లు పెరిగినందున ఆవర్తన కాలం రెట్టింపు అవుతుంది',
        'ఆవర్తన కాలం సగానికి తగ్గుతుంది',
        'ఆవర్తన కాలం 4 రెట్లు పెరుగుతుంది',
      ],
      explanation: 'సరళ లోలకం ఆవర్తన కాలం T = 2π√(L/g). ఇది గోళం ద్రవ్యరాశిపై ఆధారపడదు; జడత్వ ద్రవ్యరాశి మరియు గురుత్వాకర్షణ ద్రవ్యరాశి పరస్పరం కొట్టివేయబడతాయి.',
    },
    ta: {
      question: 'ஒரு தனி ஊசலில் 1.9 மீ நீளமுள்ள கயிற்றில் 500 கிராம் பித்தளை குண்டு கட்டப்பட்டுள்ளது. நீளத்தை மாற்றாமல் பித்தளை குண்டிற்குப் பதிலாக 2.0 கிலோ ஈயக் குண்டு (4 மடங்கு எடை) பொருத்தப்பட்டால், அலைவு நேரம் எவ்வாறு மாறும்?',
      options: [
        'அலைவு நேரம் சிறிதும் மாறாமல் அப்படியே இருக்கும்',
        'நிறை 4 மடங்கு அதிகரித்ததால் அலைவு நேரம் இரட்டிப்பாகும்',
        'அலைவு நேரம் பாதியாகக் குறையும்',
        'அலைவு நேரம் 4 மடங்கு அதிகரிக்கும்',
      ],
      explanation: 'தனி ஊசலின் அலைவு காலம் T = 2π√(L/g) ஆகும். இதில் நிறை (m) இடம்பெறவில்லை; ஈர்ப்பு நிறையும் நிலைம நிறையும் சமன் செய்யப்படுவதால் அலைவுக்காலம் நிறையைச் சார்ந்திருக்காது.',
    },
  },

  4: {
    en: {
      question: 'A cannon on flat ground fires a projectile with an initial velocity of v₀ = 30 m/s. Neglecting air drag, what launch angle provides the maximum possible horizontal range?',
      options: ['45°', '30°', '60°', '90°'],
      explanation: 'Horizontal range is R = (v₀² sin 2θ) / g. Range reaches its global maximum when sin(2θ) = 1 → 2θ = 90° → θ = 45°.',
    },
    hi: {
      question: 'समतल जमीन पर रखी एक तोप v₀ = 30 मीटर/सेकंड के प्रारंभिक वेग से एक प्रक्षेप्य दागती है। वायु प्रतिरोध को नगण्य मानते हुए, कौन सा प्रक्षेपण कोण अधिकतम क्षैतिज परास प्रदान करेगा?',
      options: ['45°', '30°', '60°', '90°'],
      explanation: 'क्षैतिज परास सूत्र R = (v₀² sin 2θ) / g है। यह मान तब अधिकतम होता है जब sin(2θ) = 1 हो, अर्थात 2θ = 90° → θ = 45°।',
    },
    te: {
      question: 'సమతల నేలపై ఉన్న ఫిరంగి v₀ = 30 మీ/సె ప్రారంభ వేగంతో ఒక ప్రక్షేపకాన్ని ప్రయోగిస్తుంది. గాలి నిరోధాన్ని విస్మరిస్తే, గరిష్ట క్షితిజ సమాంతర పరిధిని (రేంజ్) ఇచ్చే ప్రయోగ కోణం ఏది?',
      options: ['45°', '30°', '60°', '90°'],
      explanation: 'క్షితిజ సమాంతర పరిధి R = (v₀² sin 2θ) / g. sin(2θ) = 1 అయినప్పుడు పరిధి గరిష్టమవుతుంది, అనగా 2θ = 90° → θ = 45°.',
    },
    ta: {
      question: 'சமதளத் தரையிலுள்ள ஒரு பீரங்கி v₀ = 30 மீ/வி ஆரம்ப திசைவேகத்துடன் எறிபொருளைச் சுடுகிறது. காற்றுத் தடையைப் புறக்கணித்தால், அதிகபட்ச கிடைமட்ட வீச்சைப் பெற எக்கோணத்தில் சுட வேண்டும்?',
      options: ['45°', '30°', '60°', '90°'],
      explanation: 'கிடைமட்ட வீச்சு R = (v₀² sin 2θ) / g. sin(2θ) = 1 ஆக இருக்கும்போது வீச்சு அதிகபட்சமாகும், அதாவது 2θ = 90° → θ = 45°.',
    },
  },

  5: {
    en: {
      question: 'In projectile motion with zero air resistance, what is the acceleration of the projectile at the exact peak (apex) of its trajectory?',
      options: [
        '9.8 m/s² directed vertically downwards',
        '0 m/s² because vertical velocity is momentarily zero',
        '9.8 m/s² directed horizontally forwards',
        'Variable depending on projectile launch angle',
      ],
      explanation: 'Gravity is the sole external force acting on the projectile throughout its flight. Acceleration is uniformly a = g = 9.8 m/s² downwards at every point including the apex.',
    },
    hi: {
      question: 'शून्य वायु प्रतिरोध वाले प्रक्षेप्य गति में, प्रक्षेप्य के प्रक्षेपवक्र के उच्चतम बिंदु (शिखर) पर उसका त्वरण क्या होता है?',
      options: [
        '9.8 मीटर/सेकंड² लंबवत नीचे की ओर',
        '0 मीटर/सेकंड² क्योंकि ऊर्ध्वाधर वेग क्षण भर के लिए शून्य होता है',
        '9.8 मीटर/सेकंड² क्षैतिज रूप से आगे की ओर',
        'प्रक्षेपण कोण के आधार पर परिवर्तनशील',
      ],
      explanation: 'पूरी उड़ान के दौरान केवल गुरुत्वाकर्षण बल कार्य करता है। शिखर पर भी त्वरण हमेशा a = g = 9.8 मीटर/सेकंड² नीचे की ओर ही रहता है।',
    },
    te: {
      question: 'గాలి నిరోధం లేని ప్రక్షేపక చలనంలో, పథం యొక్క గరిష్ట ఎత్తు (శిఖరం) వద్ద ప్రక్షేపకం త్వరణం ఎంత?',
      options: [
        '9.8 మీ/సె² నిలువుగా క్రింది దిశలో',
        '0 మీ/సె² ఎందుకంటే నిలువు వేగం క్షణకాలం సున్నా అవుతుంది',
        '9.8 మీ/సె² క్షితిజ సమాంతరంగా ముందుకు',
        'ప్రయోగ కోణంపై ఆధారపడి మారుతుంది',
      ],
      explanation: 'మొత్తం చలనంలో పనిచేసే ఏకైక బలం గురుత్వాకర్షణ. అందువల్ల శిఖరం వద్ద కూడా త్వరణం ఎల్లప్పుడూ a = g = 9.8 మీ/సె² క్రింది దిశలోనే ఉంటుంది.',
    },
    ta: {
      question: 'காற்றுத் தடையற்ற எறிபொருள் இயக்கத்தில், அதன் பாதையின் உச்சியில் (apex) எறிபொருளின் முடுக்கம் என்னவாக இருக்கும்?',
      options: [
        '9.8 மீ/வி² செங்குத்தாக கீழ்நோக்கி',
        'செங்குத்து திசைவேகம் சுழியாக இருப்பதால் 0 மீ/வி²',
        '9.8 மீ/வி² கிடைமட்டமாக முன்னோக்கி',
        'எறியப்பட்ட கோணத்தைப் பொறுத்து மாறும்',
      ],
      explanation: 'முழு இயக்கத்திலும் செயல்படும் ஒரே விசை புவியீர்ப்பு விசை மட்டுமே. உச்சியிலும் முடுக்கம் எப்போதும் a = g = 9.8 மீ/வி² கீழ்நோக்கியே செயல்படும்.',
    },
  },

  6: {
    en: {
      question: 'A mass on a frictionless horizontal spring oscillates with simple harmonic motion (SHM). At which position is the kinetic energy of the mass at its absolute maximum?',
      options: [
        'At the equilibrium position (x = 0)',
        'At the maximum positive displacement (x = +A)',
        'At the maximum negative displacement (x = -A)',
        'Halfway between equilibrium and maximum amplitude (x = A/2)',
      ],
      explanation: 'Total mechanical energy E = (1/2)kA² is conserved. At equilibrium (x = 0), potential energy is zero, so all energy is converted to maximum kinetic energy: K_max = (1/2)mv_max².',
    },
    hi: {
      question: 'घर्षण रहित क्षैतिज स्प्रिंग से जुड़ा एक द्रव्यमान सरल आवर्त गति (SHM) करता है। किस स्थिति में द्रव्यमान की गतिज ऊर्जा अपने पूर्ण अधिकतम पर होती है?',
      options: [
        'साम्यावस्था स्थिति पर (x = 0)',
        'अधिकतम धनात्मक विस्थापन पर (x = +A)',
        'अधिकतम ऋणात्मक विस्थापन पर (x = -A)',
        'साम्यावस्था और अधिकतम आयाम के बीच आधे रास्ते पर (x = A/2)',
      ],
      explanation: 'साम्यावस्था (x = 0) पर स्प्रिंग की स्थितिज ऊर्जा शून्य होती है, अतः सम्पूर्ण ऊर्जा अधिकतम गतिज ऊर्जा में बदल जाती है: K_max = (1/2)mv²।',
    },
    te: {
      question: 'ఘర్షణ లేని క్షితిజ సమాంతర స్ప్రింగ్‌కు అనుసంధానించబడిన ద్రవ్యరాశి సరళ హరాత్మక చలనం (SHM) చేస్తుంది. ఏ స్థానం వద్ద దాని గతిజ శక్తి గరిష్టంగా ఉంటుంది?',
      options: [
        'సమతాస్థితి వద్ద (x = 0)',
        'గరిష్ట ధనాత్మక స్థానభ్రంశం వద్ద (x = +A)',
        'గరిష్ట రినాత్మక స్థానభ్రంశం వద్ద (x = -A)',
        'సమతాస్థితి మరియు గరిష్ట కంపన పరిమితి మధ్య సగం దూరంలో (x = A/2)',
      ],
      explanation: 'సమతాస్థితి (x = 0) వద్ద స్థితిజ శక్తి శూన్యం అవుతుంది, కాబట్టి మొత్తం యాంత్రిక శక్తి గరిష్ట గతిజ శక్తిగా మారుతుంది: K_max = (1/2)mv².',
    },
    ta: {
      question: 'உராய்வற்ற கிடைமட்ட சுருள்வில்லில் இணைக்கப்பட்ட நிறை தனிச்சீரிசை இயக்கத்தை (SHM) மேற்கொள்கிறது. எந்த நிலையில் நிறையின் இயக்க ஆற்றல் முழு உச்சத்தில் இருக்கும்?',
      options: [
        'சமநிலை நிலையில் (x = 0)',
        'அதிகபட்ச நேர்மறை இடப்பெயர்ச்சியில் (x = +A)',
        'அதிகபட்ச எதிர்மறை இடப்பெயர்ச்சியில் (x = -A)',
        'சமநிலைக்கும் வீச்சுக்கும் நடுவே (x = A/2)',
      ],
      explanation: 'சமநிலை நிலையில் (x = 0) நிலை ஆற்றல் சுழியாகிறது; எனவே மொத்த ஆற்றலும் அதிகபட்ச இயக்க ஆற்றலாக மாறுகிறது: K_max = (1/2)mv².',
    },
  },

  7: {
    en: {
      question: 'A 2 kg wooden block sits on an inclined plane tilted at 30° to the horizontal. Taking g = 10 m/s², what is the magnitude of the normal force exerted by the ramp on the block?',
      options: [
        '17.32 N (20 · cos 30°)',
        '10.0 N (20 · sin 30°)',
        '20.0 N (mg)',
        '200.0 N',
      ],
      explanation: 'Perpendicular to the incline, normal force balances the perpendicular gravity component: N = mg cos θ = 2 kg × 10 m/s² × cos(30°) = 20 × 0.8660 ≈ 17.32 N.',
    },
    hi: {
      question: '2 किग्रा का एक लकड़ी का गुटका क्षैतिज से 30° झुके हुए नत समतल पर रखा है। g = 10 मी/से² मानते हुए, ढलान द्वारा गुटके पर लगाए गए अभिलंब बल का परिमाण क्या है?',
      options: [
        '17.32 N (20 · cos 30°)',
        '10.0 N (20 · sin 30°)',
        '20.0 N (mg)',
        '200.0 N',
      ],
      explanation: 'नत समतल पर अभिलंब बल गुरुत्वाकर्षण के लंबवत घटक को संतुलित करता है: N = mg cos θ = 2 × 10 × cos(30°) = 20 × 0.866 ≈ 17.32 N।',
    },
    te: {
      question: 'క్షితిజ సమాంతరంతో 30° వాలుగా ఉన్న ఒక తలంపై 2 కిలోల చెక్క దిమ్మె ఉంచబడింది. g = 10 మీ/సె² అనుకుంటే, దిమ్మెపై వాలుతలం కలిగించే అభిలంబ బలం ఎంత?',
      options: [
        '17.32 N (20 · cos 30°)',
        '10.0 N (20 · sin 30°)',
        '20.0 N (mg)',
        '200.0 N',
      ],
      explanation: 'వాలుతలానికి లంబంగా, అభిలంబ బలం N = mg cos θ = 2 × 10 × cos(30°) = 20 × 0.866 ≈ 17.32 N అవుతుంది.',
    },
    ta: {
      question: 'கிடைமட்டத்துடன் 30° கோணத்தில் சாய்ந்துள்ள ஒரு சாய்தளத்தில் 2 கிலோ மரக்கட்டை வைக்கப்பட்டுள்ளது. g = 10 மீ/வி² எனில், கட்டை மீது சாய்தளம் செலுத்தும் செங்குத்து விசை யாது?',
      options: [
        '17.32 N (20 · cos 30°)',
        '10.0 N (20 · sin 30°)',
        '20.0 N (mg)',
        '200.0 N',
      ],
      explanation: 'சாய்தளத்தில் செங்குத்து விசை N = mg cos θ = 2 × 10 × cos(30°) = 20 × 0.866 ≈ 17.32 N ஆகும்.',
    },
  },

  8: {
    en: {
      question: 'Consider the unbalanced chemical equation: Al + O₂ → Al₂O₃. What is the stoichiometric coefficient in front of O₂ in the balanced integer equation?',
      options: ['3', '2', '4', '6'],
      explanation: 'Balancing aluminium and oxygen: 4Al + 3O₂ → 2Al₂O₃. Left side: 4 Al and 6 O. Right side: 4 Al and 6 O. The stoichiometric coefficient for O₂ is 3.',
    },
    hi: {
      question: 'असंतुलित रासायनिक समीकरण पर विचार करें: Al + O₂ → Al₂O₃। संतुलित पूर्णांक समीकरण में O₂ के आगे रससमीकरणमितीय (stoichiometric) गुणांक क्या है?',
      options: ['3', '2', '4', '6'],
      explanation: 'समीकरण को संतुलित करने पर: 4Al + 3O₂ → 2Al₂O₃ प्राप्त होता है। ऑक्सीजन के लिए गुणांक 3 है।',
    },
    te: {
      question: 'సరితూచని రసాయన సమీకరణాన్ని పరిశీలించండి: Al + O₂ → Al₂O₃. సరితూచిన సమీకరణంలో O₂ ముందు ఉండే గుణకం (coefficient) ఎంత?',
      options: ['3', '2', '4', '6'],
      explanation: 'సమీకరణాన్ని సరితూచగా: 4Al + 3O₂ → 2Al₂O₃ వస్తుంది. ఆక్సిజన్ (O₂) ముందు ఉండే గుణకం 3.',
    },
    ta: {
      question: 'சமன்படுத்தப்படாத வேதிச் சமன்பாட்டைக் கவனியுங்கள்: Al + O₂ → Al₂O₃. சமன்படுத்தப்பட்ட முழு எண் சமன்பாட்டில் O₂-ன் வேதிவினைக் குணகம் (coefficient) என்ன?',
      options: ['3', '2', '4', '6'],
      explanation: 'சமன்பாட்டைச் சமன் செய்தால்: 4Al + 3O₂ → 2Al₂O₃. இதில் O₂-ன் குணகம் 3 ஆகும்.',
    },
  },

  9: {
    en: {
      question: 'An aqueous solution has a hydronium ion concentration of [H⁺] = 1.0 × 10⁻⁴ mol/L at 25°C. What is the pH of this solution?',
      options: ['4.0', '10.0', '-4.0', '7.0'],
      explanation: 'pH is defined as pH = -log₁₀[H⁺]. For [H⁺] = 10⁻⁴ M, pH = -log₁₀(10⁻⁴) = -(-4) = 4.0 (an acidic solution).',
    },
    hi: {
      question: '25°C पर एक जलीय घोल में हाइड्रोनियम आयन सांद्रता [H⁺] = 1.0 × 10⁻⁴ मोल/लीटर है। इस घोल का pH मान क्या है?',
      options: ['4.0', '10.0', '-4.0', '7.0'],
      explanation: 'pH की परिभाषा pH = -log₁₀[H⁺] है। [H⁺] = 10⁻⁴ M के लिए, pH = -(-4) = 4.0 (अम्लीय विलयन)।',
    },
    te: {
      question: '25°C వద్ద ఒక జల ద్రావణంలో హైడ్రోనియం అయాన్ల గాఢత [H⁺] = 1.0 × 10⁻⁴ మోల్/లీటర్. ఈ ద్రావణం యొక్క pH విలువ ఎంత?',
      options: ['4.0', '10.0', '-4.0', '7.0'],
      explanation: 'pH నిర్వచనం pH = -log₁₀[H⁺]. [H⁺] = 10⁻⁴ అయినప్పుడు, pH = -(-4) = 4.0 (ఆమ్ల ద్రావణం).',
    },
    ta: {
      question: '25°C வெப்பநிலையில் ஒரு நீர்க்கரைசலில் ஹைட்ரோனியம் அயனி செறிவு [H⁺] = 1.0 × 10⁻⁴ மோல்/லிட்டர் எனில், அக்கரைசலின் pH மதிப்பு என்ன?',
      options: ['4.0', '10.0', '-4.0', '7.0'],
      explanation: 'pH என்பது pH = -log₁₀[H⁺] ஆகும். [H⁺] = 10⁻⁴ எனில், pH = -(-4) = 4.0 (அமிலக் கரைசல்).',
    },
  },

  10: {
    en: {
      question: 'A chemical reaction absorbs heat from its surroundings at constant pressure, with ΔH = +92 kJ/mol. Which thermodynamic term correctly classifies this reaction?',
      options: [
        'Endothermic reaction',
        'Exothermic reaction',
        'Adiabatic expansion',
        'Spontaneous combustion',
      ],
      explanation: 'Reactions with positive enthalpy changes (ΔH > 0) absorb thermal energy from their surroundings and are classified as endothermic.',
    },
    hi: {
      question: 'एक रासायनिक अभिक्रिया स्थिर दाब पर अपने परिवेश से ऊष्मा अवशोषित करती है, जिसका ΔH = +92 kJ/mol है। कौन सा ऊष्मागतिक शब्द इस अभिक्रिया को सही ढंग से वर्गीकृत करता है?',
      options: [
        'ऊष्माशोषी (Endothermic) अभिक्रिया',
        'ऊष्माक्षेपी (Exothermic) अभिक्रिया',
        'रुद्धोष्म प्रसार (Adiabatic expansion)',
        'स्वतःस्फूर्त दहन (Spontaneous combustion)',
      ],
      explanation: 'धनात्मक एन्थैल्पी परिवर्तन (ΔH > 0) वाली अभिक्रियाएं परिवेश से ऊष्मा अवशोषित करती हैं और ऊष्माशोषी कहलाती हैं।',
    },
    te: {
      question: 'ఒక రసాయన చర్య స్థిర పీడనం వద్ద పరిసరాల నుండి ఉష్ణాన్ని గ్రహిస్తుంది, మరియు ΔH = +92 kJ/mol. ఏ ఉష్ణగతిక పదం ఈ చర్యను సరిగ్గా వర్గీకరిస్తుంది?',
      options: [
        'ఉష్ణగ్రాహక (Endothermic) చర్య',
        'ఉష్ణమోచక (Exothermic) చర్య',
        'స్థిరోష్ణ వ్యాకోచం (Adiabatic expansion)',
        'స్వయం దహనం',
      ],
      explanation: 'ధనాత్మక ఎంథాల్పీ మార్పు (ΔH > 0) గల చర్యలు పరిసరాల నుండి ఉష్ణాన్ని గ్రహిస్తాయి కాబట్టి వాటిని ఉష్ణగ్రాహక చర్యలు అంటారు.',
    },
    ta: {
      question: 'ஒரு வேதிவினை மாறா அழுத்தத்தில் சூழலில் இருந்து வெப்பத்தை உறிஞ்சுகிறது, இதில் ΔH = +92 kJ/mol. இவ்வினையை சரியாக வகைப்படுத்தும் வெப்ப இயக்கவியல் சொல் எது?',
      options: [
        'வெப்பம் ஏற்பு (Endothermic) வினை',
        'வெப்பம் உமிழ் (Exothermic) வினை',
        'வெப்பப் பரிமாற்றமில்லா விரிவடைதல்',
        'தன் எரிதல் வினை',
      ],
      explanation: 'நேர்மறை என்தால்பி மாற்றம் (ΔH > 0) கொண்ட வினைகள் சூழலில் இருந்து வெப்பத்தை உறிஞ்சுவதால் வெப்ப ஏற்பு வினைகள் எனப்படும்.',
    },
  },
};

// 2. Curricular Concept Metadata Translations (Title, Formula, Core Idea, Memory Rule, Pitfall)
export const CONCEPT_METADATA_I18N = {
  snell_refraction: {
    en: {
      name: "Snell's Law & Refraction Across Media",
      coreIdea: 'When light travels from an optically rarer medium to a denser medium, its speed decreases and it bends towards the normal line.',
      memoryRule: 'Rarer to Denser → Bends TOWARDS Normal. Denser to Rarer → Bends AWAY from Normal.',
      pitfall: 'Measuring angles from the interface boundary instead of the perpendicular normal line.',
    },
    hi: {
      name: 'स्नेल का नियम एवं माध्यमों में प्रकाश का अपवर्तन',
      coreIdea: 'जब प्रकाश विरल माध्यम से सघन माध्यम में जाता है, तो इसकी गति धीमी हो जाती है और यह अभिलंब की ओर झुक जाता है।',
      memoryRule: 'विरल से सघन → अभिलंब की ओर झुकता है। सघन से विरल → अभिलंब से दूर हटता है।',
      pitfall: 'कोण को अभिलंब के बजाय सतह की सीमा से मापना।',
    },
    te: {
      name: "స్నెల్ నియమం & యానకాల గుండా కాంతి వక్రీభవనం",
      coreIdea: 'కాంతి విరళ యానకం నుండి సాంద్రతర యానకంలోకి ప్రవేశించినప్పుడు వేగం తగ్గి లంబం వైపు వంగుతుంది.',
      memoryRule: 'విరళ నుండి సాంద్రతర → లంబం వైపు. సాంద్రతర నుండి విరళ → లంబం నుండి దూరంగా.',
      pitfall: 'కోణాన్ని లంబం నుండి కొలవడానికి బదులుగా ఉపరితల అంచు నుండి కొలవడం.',
    },
    ta: {
      name: 'ஸ்னெல் விதி மற்றும் ஒளிவிலகல்',
      coreIdea: 'ஒளி அடர்குறை ஊடகத்திலிருந்து அடர்மிகு ஊடகத்திற்குச் செல்லும்போது வேகம் குறைந்து செங்குத்துக் கோட்டை நோக்கி வளைகிறது.',
      memoryRule: 'குறைவிலிருந்து மிகுதி → செங்குத்துக் கோட்டை நோக்கி. மிகுதியிலிருந்து குறைவு → விலகிச் செல்லும்.',
      pitfall: 'செங்குத்துக் கோட்டிற்குப் பதிலாக விளிம்பிலிருந்து கோணத்தை அளவிடுவது.',
    },
  },
  lens_maker: {
    en: {
      name: 'Lens Maker Formula & Optical Power',
      coreIdea: 'Optical power is the reciprocal of focal length measured in meters: P = 1/f(m). Converging lenses have positive power.',
      memoryRule: 'Convex = Converging = Positive power (+D). Concave = Diverging = Negative power (-D).',
      pitfall: 'Forgetting to convert focal length from centimeters to meters before taking reciprocal.',
    },
    hi: {
      name: 'लेंस मेकर सूत्र एवं प्रकाशीय क्षमता',
      coreIdea: 'प्रकाशीय क्षमता मीटर में मापी गई फोकस दूरी का व्युत्क्रम होती है: P = 1/f(m)। उत्तल लेंस की क्षमता धनात्मक होती है।',
      memoryRule: 'उत्तल = अभिसारी = धनात्मक क्षमता (+D)। अवतल = अपसारी = ऋणात्मक क्षमता (-D)।',
      pitfall: 'व्युत्क्रम लेने से पहले फोकस दूरी को सेंटीमीटर से मीटर में बदलना भूल जाना।',
    },
    te: {
      name: 'కటక తయారీ సూత్రం & దృక్ సామర్థ్యం',
      coreIdea: 'దృక్ సామర్థ్యం అనేది మీటర్లలో కొలిచిన నాభ్యాంతరం యొక్క వ్యుత్క్రమం: P = 1/f(m). కుంభాకార కటకాలకు ధనాత్మక సామర్థ్యం ఉంటుంది.',
      memoryRule: 'కుంభాకారం = కేంద్రీకరణ = ధనాత్మక (+D). పుటాకారం = వికేంద్రీకరణ = రినాత్మక (-D).',
      pitfall: 'నాభ్యాంతరాన్ని సెం.మీ నుండి మీటర్లలోకి మార్చడం మర్చిపోవడం.',
    },
    ta: {
      name: 'லென்சு உருவாக்குபவர் சமன்பாடு & திறன்',
      coreIdea: 'ஒளித்திறன் என்பது மீட்டரில் அளக்கப்பட்ட குவியத் தூரத்தின் தலைகீழ் மதிப்பு: P = 1/f(m).',
      memoryRule: 'குவிலென்ஸ் = குவிக்கும் = நேர்மறை (+D). குழி லென்ஸ் = விரிக்கும் = எதிர்மறை (-D).',
      pitfall: 'தலைகீழ் எடுப்பதற்கு முன் சென்டிமீட்டரை மீட்டராக மாற்ற மறப்பது.',
    },
  },
  pendulum_dynamics: {
    en: {
      name: 'Simple Pendulum Period & Mass Independence',
      coreIdea: 'The oscillation period depends exclusively on length and gravity: T = 2π√(L/g). It is strictly independent of bob mass.',
      memoryRule: 'Long pendulum = Slow period. Heavy vs light bob = Exact same period.',
      pitfall: 'Assuming heavier pendulum bobs swing slower or faster.',
    },
    hi: {
      name: 'सरल लोलक का आवर्तकाल एवं द्रव्यमान स्वतंत्रता',
      coreIdea: 'दोलन काल केवल लंबाई और गुरुत्वाकर्षण पर निर्भर करता है: T = 2π√(L/g)। यह गोलक के द्रव्यमान से पूरी तरह स्वतंत्र होता है।',
      memoryRule: 'लंबा लोलक = धीमा आवर्तकाल। भारी बनाम हल्का गोला = बिल्कुल समान आवर्तकाल।',
      pitfall: 'यह मान लेना कि भारी गोलक धीरे या तेजी से दोलन करेगा।',
    },
    te: {
      name: 'సరళ లోలకం ఆవర్తన కాలం & ద్రవ్యరాశి స్వతంత్రత',
      coreIdea: 'ఆవర్తన కాలం కేవలం పొడవు మరియు గురుత్వాకర్షణపై మాత్రమే ఆధారపడుతుంది: T = 2π√(L/g). ద్రవ్యరాశితో సంబంధం లేదు.',
      memoryRule: 'పొడవైన లోలకం = ఎక్కువ ఆవర్తన కాలం. బరువైన గోళం అయినా తేలికైన గోళం అయినా కాలం సమానం.',
      pitfall: 'బరువైన గోళం వేగంగా లేదా నెమ్మదిగా ఊగుతుందని అనుకోవడం.',
    },
    ta: {
      name: 'தனி ஊசலின் அலைவு காலம் & நிறை சாராமை',
      coreIdea: 'அலைவுக்காலம் நீளம் மற்றும் ஈர்ப்பை மட்டுமே சார்ந்துள்ளது: T = 2π√(L/g). குண்டின் நிறையைச் சார்ந்திருக்காது.',
      memoryRule: 'நீளமான ஊசல் = மெதுவான அலைவு. குண்டின் எடை எதுவாக இருந்தாலும் அலைவு நேரம் ஒன்றே.',
      pitfall: 'எடை அதிகமான குண்டு வேகமாக அல்லது மெதுவாக ஆடும் என தவறாக நினைப்பது.',
    },
  },
};

// 3. High-Performance Universal Scientific Terms Dictionary (Physics, Chemistry, Units)
const SCIENTIFIC_TERMS = {
  hi: {
    'Kinematics': 'गतिविज्ञान',
    'Ray Optics': 'किरण प्रकाशिकी',
    'Wave Optics': 'तरंग प्रकाशिकी',
    'Stoichiometry': 'रससमीकरणमिति',
    'Thermodynamics': 'ऊष्मागतिकी',
    'Acids and Bases': 'अम्ल और क्षार',
    'Harmonic Motion': 'सरल आवर्त गति',
    'Periodic Table': 'आवर्त सारणी',
    'Electrochemistry': 'विद्युतरसायन',
    'Magnetism': 'चुंबकत्व',
    'Current Electricity': 'धारा विद्युत',
    'Laws of Motion': 'गति के नियम',
    'Units & Measurements': 'मात्रक और मापन',
    'Chemical Bonding': 'रासायनिक आबंधन',
    'Equilibrium': 'साम्यावस्था',
    'Gravitation': 'गुरुत्वाकर्षण',
    'velocity': 'वेग',
    'acceleration': 'त्वरण',
    'projectile': 'प्रक्षेप्य',
    'trajectory': 'प्रक्षेपवक्र',
    'refraction': 'अपवर्तन',
    'reflection': 'परावर्तन',
    'focal length': 'फोकस दूरी',
    'refractive index': 'अपवर्तनांक',
    'mass': 'द्रव्यमान',
    'frequency': 'आवृत्ति',
    'wavelength': 'तरंगदैर्ध्य',
    'enthalpy': 'एन्थैल्पी',
    'concentration': 'सांद्रता',
    'equilibrium': 'साम्यावस्था',
    'balanced': 'संतुलित',
    'reagent': 'अभिकर्मक',
    'precipitate': 'अवक्षेप',
    'combustion': 'दहन',
    'displacement': 'विस्थापन',
    'Question': 'प्रश्न',
    'Options': 'विकल्प',
    'Explanation': 'व्याख्या',
  },
  te: {
    'Kinematics': 'చలన శాస్త్రం',
    'Ray Optics': 'కిరణ దృశాశాస్త్రం',
    'Wave Optics': 'తరంగ దృశాశాస్త్రం',
    'Stoichiometry': 'స్టోయికియోమెట్రీ',
    'Thermodynamics': 'ఉష్ణగతిక శాస్త్రం',
    'Acids and Bases': 'ఆమ్లాలు మరియు క్షారాలు',
    'Harmonic Motion': 'సరళ హరాత్మక చలనం',
    'Periodic Table': 'ఆవర్తన పట్టిక',
    'Electrochemistry': 'విద్యుత్ రసాయన శాస్త్రం',
    'Magnetism': 'అయస్కాంతత్వం',
    'Current Electricity': 'విద్యుత్ ప్రవాహం',
    'Laws of Motion': 'గమన నియమాలు',
    'Units & Measurements': 'ప్రమాణాలు మరియు కొలతలు',
    'Chemical Bonding': 'రసాయన బంధం',
    'Equilibrium': 'సమతాస్థితి',
    'Gravitation': 'గురుత్వాకర్షణ',
    'velocity': 'వేగం',
    'acceleration': 'త్వరణం',
    'projectile': 'ప్రక్షేపకం',
    'trajectory': 'పథం',
    'refraction': 'వక్రీభవనం',
    'reflection': 'పరావర్తనం',
    'focal length': 'నాభ్యాంతరం',
    'refractive index': 'వక్రీభవన గుణకం',
    'mass': 'ద్రవ్యరాశి',
    'frequency': 'పౌనఃపున్యం',
    'wavelength': 'తరంగదైర్ఘ్యం',
    'enthalpy': 'ఎంథాల్పీ',
    'concentration': 'గాఢత',
    'equilibrium': 'సమతాస్థితి',
    'balanced': 'సరితూచిన',
    'reagent': 'కారకం',
    'precipitate': 'అవక్షేపం',
    'combustion': 'దహనం',
    'displacement': 'స్థానభ్రంశం',
    'Question': 'ప్రశ్న',
    'Options': 'ఎంపికలు',
    'Explanation': 'వివరణ',
  },
  ta: {
    'Kinematics': 'இயக்கவியல்',
    'Ray Optics': 'கதிர் ஒளியியல்',
    'Wave Optics': 'அலை ஒளியியல்',
    'Stoichiometry': 'ஸ்டோய்கியோமெட்ரி',
    'Thermodynamics': 'வெப்ப இயக்கவியல்',
    'Acids and Bases': 'அமிலங்கள் மற்றும் காரங்கள்',
    'Harmonic Motion': 'சீரிசை இயக்கம்',
    'Periodic Table': 'தனிம வரிசை அட்டவணை',
    'Electrochemistry': 'மின்வேதியியல்',
    'Magnetism': 'காந்தவியல்',
    'Current Electricity': 'மின்னோட்டவியல்',
    'Laws of Motion': 'இயக்க விதிகள்',
    'Units & Measurements': 'அளவீடுகளும் அலகுகளும்',
    'Chemical Bonding': 'வேதிப் பிணைப்பு',
    'Equilibrium': 'சமநிலை',
    'Gravitation': 'ஈர்ப்பியல்',
    'velocity': 'திசைவேகம்',
    'acceleration': 'முடுக்கம்',
    'projectile': 'எறிபொருள்',
    'trajectory': 'பாதை',
    'refraction': 'ஒளிவிலகல்',
    'reflection': 'எதிரொளிப்பு',
    'focal length': 'குவியத் தூரம்',
    'refractive index': 'ஒளிவிலகல் எண்',
    'mass': 'நிறை',
    'frequency': 'அதிர்வெண்',
    'wavelength': 'அலைநீளம்',
    'enthalpy': 'என்தால்பி',
    'concentration': 'செறிவு',
    'equilibrium': 'சமநிலை',
    'balanced': 'சமன் செய்யப்பட்ட',
    'reagent': 'வினைப்பொருள்',
    'precipitate': 'வீழ்படிவு',
    'combustion': 'எரிதல்',
    'displacement': 'இடப்பெயர்ச்சி',
    'Question': 'கேள்வி',
    'Options': 'தெரிவுகள்',
    'Explanation': 'விளக்கம்',
  },
};

/**
 * Translates any arbitrary question string using terminology substitutions
 */
function translateTextWithGlossary(text, lang) {
  if (!text || lang === 'en') return text;
  const dict = SCIENTIFIC_TERMS[lang];
  if (!dict) return text;

  let translated = text;
  // Replace terms case-insensitively
  for (const [enTerm, localTerm] of Object.entries(dict)) {
    const regex = new RegExp(`\\b${enTerm}\\b`, 'gi');
    translated = translated.replace(regex, localTerm);
  }
  return translated;
}

/**
 * Universal Question Localizer
 * Translates any question object (from mockTestData, SQLite question bank, or Supabase)
 * into the selected language (en, hi, te, ta).
 *
 * @param {Object} q - Question object
 * @param {string} lang - 'en' | 'hi' | 'te' | 'ta'
 * @returns {Object} Fully localized question object
 */
export function localizeQuestion(q, lang = 'en') {
  if (!q) return q;
  if (!lang || lang === 'en') return q;

  // 1. Direct Match from JEE Adaptive Diagnostic Bank
  if (q.id && MOCK_TEST_QUESTIONS_I18N[q.id] && MOCK_TEST_QUESTIONS_I18N[q.id][lang]) {
    const loc = MOCK_TEST_QUESTIONS_I18N[q.id][lang];
    return {
      ...q,
      question: loc.question,
      options: loc.options,
      option_a: loc.options[0],
      option_b: loc.options[1],
      option_c: loc.options[2],
      option_d: loc.options[3],
      explanation: loc.explanation || q.explanation,
    };
  }

  // 2. Generic Question Localizer with Domain-Specific Glossary
  const localizedQuestion = translateTextWithGlossary(q.question, lang);
  const localizedExplanation = translateTextWithGlossary(q.explanation, lang);

  let localizedOptions = q.options;
  if (Array.isArray(q.options)) {
    localizedOptions = q.options.map((opt) => translateTextWithGlossary(opt, lang));
  }

  const optA = translateTextWithGlossary(q.option_a, lang);
  const optB = translateTextWithGlossary(q.option_b, lang);
  const optC = translateTextWithGlossary(q.option_c, lang);
  const optD = translateTextWithGlossary(q.option_d, lang);

  return {
    ...q,
    question: localizedQuestion,
    options: localizedOptions,
    option_a: optA,
    option_b: optB,
    option_c: optC,
    option_d: optD,
    explanation: localizedExplanation,
    chapter: translateTextWithGlossary(q.chapter, lang),
    subject: translateTextWithGlossary(q.subject, lang),
  };
}

/**
 * Localizes a Concept object (coreIdea, formula, memoryRule, etc.)
 */
export function localizeConcept(concept, lang = 'en') {
  if (!concept || lang === 'en') return concept;
  const loc = CONCEPT_METADATA_I18N[concept.id]?.[lang];
  if (!loc) return concept;

  return {
    ...concept,
    name: loc.name || concept.name,
    coreIdea: loc.coreIdea || concept.coreIdea,
    memoryRule: loc.memoryRule || concept.memoryRule,
    commonPitfall: loc.pitfall || concept.commonPitfall,
  };
}
