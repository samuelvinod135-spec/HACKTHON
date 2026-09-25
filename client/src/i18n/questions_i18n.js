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
    'Law of Definite Proportions': 'స్థిర నిష్పత్తి నియమం',
    'Law of Conservation of Mass': 'ద్రవ్యరాశి నిత్యత్వ నియమం',
    'Avogadro’s Law': 'అవోగాడ్రో నియమం',
    'Law of Multiple Proportions': 'గుణిత నిష్పత్తి నియమం',
    'Inverse proportionality with system mass squared': 'వ్యవస్థ ద్రవ్యరాశి వర్గంతో విలోమానుపాతం',
    'Zero response across all applied potential gradients': 'అన్ని సంభావ్య ప్రవణతలలో శూన్య ప్రతిస్పందన',
    'Independent variation without boundary constraints': 'సరిహద్దు పరిమితులు లేని స్వతంత్ర మార్పు',

    'Law of Definite Proportions': 'స్థిర నిష్పత్తి నియమం',
    'Law of Conservation of Mass': 'ద్రవ్యరాశి నిత్యత్వ నియమం',
    'Avogadro’s Law': 'అవోగాడ్రో నియమం',
    'Law of Multiple Proportions': 'గుణిత నిష్పత్తి నియమం',
    'Inverse proportionality with system mass squared': 'వ్యవస్థ ద్రవ్యరాశి వర్గంతో విలోమానుపాతం',
    'Zero response across all applied potential gradients': 'అన్ని సంభావ్య ప్రవణతలలో శూన్య ప్రతిస్పందన',
    'Independent variation without boundary constraints': 'సరిహద్దు పరిమితులు లేని స్వతంత్ర మార్పు',
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
    'Law of Definite Proportions': 'மாறா விகித விதி',
    'Law of Conservation of Mass': 'பொருண்மை அழியா விதி',
    'Avogadro’s Law': 'அவகாட்ரோ விதி',
    'Law of Multiple Proportions': 'பெருக்கல் விகித விதி',
    'Inverse proportionality with system mass squared': 'அமைப்பின் நிறையின் இருமடியுடன் எதிர்த்தகவு',
    'Zero response across all applied potential gradients': 'அனைத்து மின்னழுத்த சாய்வுகளிலும் சுழி மறுமொழி',
    'Independent variation without boundary constraints': 'எல்லைக் கட்டுப்பாடுகள் இல்லாத தன்னிச்சையான மாறுபாடு',

    'Law of Definite Proportions': 'மாறா விகித விதி',
    'Law of Conservation of Mass': 'பொருண்மை அழியா விதி',
    'Avogadro’s Law': 'அவகாட்ரோ விதி',
    'Law of Multiple Proportions': 'பெருக்கல் விகித விதி',
    'Inverse proportionality with system mass squared': 'அமைப்பின் நிறையின் இருமடியுடன் எதிர்த்தகவு',
    'Zero response across all applied potential gradients': 'அனைத்து மின்னழுத்த சாய்வுகளிலும் சுழி மறுமொழி',
    'Independent variation without boundary constraints': 'எல்லைக் கட்டுப்பாடுகள் இல்லாத தன்னிச்சையான மாறுபாடு',
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

// 3. Complete Vernacular Names for all 56 JEE Physics & Chemistry Chapters
export const CHAPTER_NAMES_I18N = {
  // Physics (28)
  'Units & Measurements': { hi: 'इकाइयाँ और मापन', te: 'ప్రమాణాలు మరియు కొలతలు', ta: 'அலகுகளும் அளவீடுகளும்' },
  'Vectors': { hi: 'सदिश (वेक्टर)', te: 'సదిశలు (వెక్టార్లు)', ta: 'வெக்டர்கள்' },
  'Kinematics': { hi: 'शुद्ध गतिकी (Kinematics)', te: 'శుద్ధ గతిక శాస్త్రం', ta: 'இயக்கவியல்' },
  'Laws of Motion': { hi: 'गति के नियम', te: 'గమన నియమాలు', ta: 'இயக்க விதிகள்' },
  'Work, Energy & Power': { hi: 'कार्य, ऊर्जा और शक्ति', te: 'పని, శక్తి & సామర్థ్యం', ta: 'வேலை, ஆற்றல் மற்றும் திறன்' },
  'Centre of Mass & Collisions': { hi: 'द्रव्यमान केंद्र और संघट्ट', te: 'ద్రవ్యరాశి కేంద్రం & ఢీకొనడాలు', ta: 'நிறை மையம் மற்றும் மோதல்கள்' },
  'Rotational Motion': { hi: 'घूर्णन गति', te: 'భ్రమణ గమనం', ta: 'சுழற்சி இயக்கம்' },
  'Gravitation': { hi: 'गुरुत्वाकर्षण', te: 'గురుత్వాకర్షణ', ta: 'ஈர்ப்பியல்' },
  'Properties of Solids': { hi: 'ठोस पदार्थों के गुण', te: 'ఘనపదార్థాల ధర్మాలు', ta: 'திண்மங்களின் பண்புகள்' },
  'Fluid Mechanics': { hi: 'तरल यांत्रिकी', te: 'ద్రవ యాంత్రిక శాస్త్రం', ta: 'பாய்ம இயக்கவியல்' },
  'Thermal Physics': { hi: 'ऊष्मीय भौतिकी', te: 'ఉష్ణ భౌతికశాస్త్రం', ta: 'வெப்ப இயற்பியல்' },
  'Thermodynamics': { hi: 'ऊष्मागतिकी', te: 'ఉష్ణగతిక శాస్త్రం', ta: 'வெப்ப இயக்கவியல்' },
  'Kinetic Theory': { hi: 'अणुगति सिद्धांत', te: 'వాయువుల అణుచలన సిద్ధాంతం', ta: 'இயக்கவியல் கொள்கை' },
  'SHM': { hi: 'सरल आवर्त गति (SHM)', te: 'సరళ హరాత్మక చలనం (SHM)', ta: 'சீரிசை இயக்கம் (SHM)' },
  'Waves': { hi: 'तरंगें', te: 'తరంగాలు', ta: 'அலைகள்' },
  'Electrostatics': { hi: 'स्थिरवैद्युतिकी', te: 'స్థిరవిద్యుత్ శాస్త్రం', ta: 'நிலைமின்னியல்' },
  'Capacitance': { hi: 'धारिता (Capacitance)', te: 'కెపాసిటెన్స్ (ధారణశక్తి)', ta: 'மின்தேக்கம்' },
  'Current Electricity': { hi: 'धारा विद्युत', te: 'విద్యుత్ ప్రవాహం', ta: 'மின்னோட்டவியல்' },
  'Magnetism': { hi: 'चुंबकत्व', te: 'అయస్కాంతత్వం', ta: 'காந்தவியல்' },
  'Moving Charges & Magnetism': { hi: 'गतिमान आवेश और चुंबकत्व', te: 'చలించే ఆవేశాలు & అయస్కాంతత్వం', ta: 'இயங்கும் மின்னூட்டங்களும் காந்தவியலும்' },
  'EMI & AC': { hi: 'विद्युतचुंबकीय प्रेरण और प्रत्यावर्ती धारा', te: 'విద్యుదయస్కాంత ప్రేరణ & ఏసీ', ta: 'மின்காந்தத் தூண்டலும் மாறுதிசை மின்னோட்டமும்' },
  'Electromagnetic Waves': { hi: 'विद्युतचुंबकीय तरंगें', te: 'విద్యుదయస్కాంత తరంగాలు', ta: 'மின்காந்த அலைகள்' },
  'Ray Optics': { hi: 'किरण प्रकाशिकी', te: 'కిరణ దృశాశాస్త్రం', ta: 'கதிர் ஒளியியல்' },
  'Wave Optics': { hi: 'तरंग प्रकाशिकी', te: 'తరంగ దృశాశాస్త్రం', ta: 'அலை ஒளியியல்' },
  'Dual Nature & Modern Physics': { hi: 'विकिरण की द्वैत प्रकृति और आधुनिक भौतिकी', te: 'ద్వంద్వ స్వభావం & ఆధునిక భౌతికశాస్త్రం', ta: 'பருப்பொருளின் இரட்டைப் பண்பும் நவீன இயற்பியலும்' },
  'Atoms & Nuclei': { hi: 'परमाणु और नाभिक', te: 'పరమాణువులు మరియు కేంద్రకాలు', ta: 'அணுக்களும் உட்கருக்களும்' },
  'Semiconductors & Experimental Physics': { hi: 'अर्धचालक और प्रायोगिक भौतिकी', te: 'అర్ధవాహకాలు & ప్రయోగశాల భౌతికశాస్త్రం', ta: 'குறைக்கடத்திகளும் செய்முறை இயற்பியலும்' },
  'Communication Systems': { hi: 'संचार प्रणालियाँ', te: 'సమాచార వ్యవస్థలు', ta: 'தகவல் தொடர்பு அமைப்புகள்' },

  // Chemistry (28)
  'Some Basic Concepts of Chemistry': { hi: 'रसायन विज्ञान की कुछ मूल अवधारणाएँ', te: 'రసాయన శాస్త్ర ప్రాథమిక భావనలు', ta: 'வேதியியலின் சில அடிப்படைக் கருத்துக்கள்' },
  'Structure of Atom': { hi: 'परमाणु की संरचना', te: 'పరమాణు నిర్మాణం', ta: 'அணு அமைப்பு' },
  'Periodic Classification & Periodicity': { hi: 'तत्वों का आवर्त वर्गीकरण और आवर्तिता', te: 'ఆవర్తన వర్గీకరణ & ఆవర్తన ధర్మాలు', ta: 'தனிமங்களின் வகைப்பாடும் ஆவர்த்தனமும்' },
  'Chemical Bonding & Molecular Structure': { hi: 'रासायनिक आबंधन और आण्विक संरचना', te: 'రసాయన బంధం & అణు నిర్మాణం', ta: 'வேதிப் பிணைப்பும் மூலக்கூறு அமைப்பும்' },
  'States of Matter & Gases': { hi: 'द्रव्य की अवस्थाएँ और गैसें', te: 'పదార్థ స్థితులు & వాయువులు', ta: 'பருப்பொருளின் நிலைகளும் வாயுக்களும்' },
  'Chemical Thermodynamics': { hi: 'रासायनिक ऊष्मागतिकी', te: 'రసాయన ఉష్ణగతిక శాస్త్రం', ta: 'வேதி வெப்ப இயக்கவியல்' },
  'Equilibrium': { hi: 'साम्यावस्था (Equilibrium)', te: 'సమతాస్థితి', ta: 'சமநிலை' },
  'Redox Reactions': { hi: 'रेडॉक्स अभिक्रियाएँ (अपचयोपचय)', te: 'రెడాక్స్ చర్యలు', ta: 'ஆக்சிஜனேற்ற ஒடுக்க வினைகள்' },
  'Electrochemistry': { hi: 'विद्युत रसायन', te: 'విద్యుత్ రసాయన శాస్త్రం', ta: 'மின்வேதியியல்' },
  'Chemical Kinetics': { hi: 'रासायनिक बलगतिकी', te: 'రసాయన గతిశాస్త్రం', ta: 'வேதி வினைவேகவியல்' },
  'Surface Chemistry': { hi: 'पृष्ठ रसायन', te: 'ఉపరితల రసాయన శాస్త్రం', ta: 'மேற்பரப்பு வேதியியல்' },
  'Metallurgy': { hi: 'धातुकर्म (Metallurgy)', te: 'లోహ సంగ్రహణ శాస్త్రం', ta: 'உலோகவியல்' },
  's-Block Elements': { hi: 's-ब्लॉक के तत्व', te: 's-బ్లాక్ మూలకాలు', ta: 's-தொகுதி தனிமங்கள்' },
  'p-Block Elements (Group 13 & 14)': { hi: 'p-ब्लॉक तत्व (समूह 13 और 14)', te: 'p-బ్లాక్ మూలకాలు (గ్రూప్ 13 & 14)', ta: 'p-தொகுதி தனிமங்கள் (தொகுதி 13 & 14)' },
  'p-Block Elements (Group 15 to 18)': { hi: 'p-ब्लॉक तत्व (समूह 15 से 18)', te: 'p-బ్లాక్ మూలకాలు (గ్రూప్ 15 నుండి 18)', ta: 'p-தொகுதி தனிமங்கள் (தொகுதி 15 முதல் 18 வரை)' },
  'd- and f-Block Elements': { hi: 'd- और f-ब्लॉक के तत्व', te: 'd- మరియు f-బ్లాక్ మూలకాలు', ta: 'd மற்றும் f-தொகுதி தனிமங்கள்' },
  'Coordination Compounds': { hi: 'उपसहसंयोजन यौगिक', te: 'సమన్వయ సమ్మేళనాలు', ta: 'அணைவுச் சேர்மங்கள்' },
  'Environmental Chemistry': { hi: 'पर्यावरणीय रसायन विज्ञान', te: 'పర్యావరణ రసాయన శాస్త్రం', ta: 'சுற்றுச்சூழல் வேதியியல்' },
  'Organic Chemistry - Basic Principles & Techniques': { hi: 'कार्बनिक रसायन - बुनियादी सिद्धांत और तकनीकें', te: 'సేంద్రీయ రసాయన శాస్త్రం - ప్రాథమిక సూత్రాలు & పద్ధతులు', ta: 'கரிம வேதியியல் - அடிப்படைக் கோட்பாடுகளும் உத்திகளும்' },
  'Hydrocarbons': { hi: 'हाइड्रोकार्बन', te: 'హైడ్రోకార్బన్లు', ta: 'ஹைட்ரோகார்பன்கள்' },
  'Haloalkanes and Haloarenes': { hi: 'हैलोऐल्केन और हैलोऐरीन', te: 'హాలోఆల్కేన్లు మరియు హాలోఆరీన్లు', ta: 'ஹாலோஆல்கேன்கள் மற்றும் ஹாலோஅரீன்கள்' },
  'Alcohols, Phenols and Ethers': { hi: 'ऐल्कोहॉल, फ़ीनॉल और ईथर', te: 'ఆల్కహాల్‌లు, ఫినాల్‌లు మరియు ఈథర్‌లు', ta: 'ஆல்கஹால்கள், பீனால்கள் மற்றும் ஈதர்கள்' },
  'Aldehydes, Ketones and Carboxylic Acids': { hi: 'ऐल्डिहाइड, कीटोन और कार्बोक्सिलिक अम्ल', te: 'ఆల్డిహైడ్‌లు, కీటోన్‌లు మరియు కార్బాక్సిలిక్ ఆమ్లాలు', ta: 'ஆல்டிஹைடுகள், கீட்டோன்கள் மற்றும் கார்பாக்சிலிக் அமிலங்கள்' },
  'Organic Compounds Containing Nitrogen': { hi: 'नाइट्रोजन युक्त कार्बनिक यौगिक', te: 'నైట్రోజన్ కలిగిన సేంద్రీయ సమ్మేళనాలు', ta: 'நைட்ரஜன் கொண்ட கரிமச் சேர்மங்கள்' },
  'Biomolecules': { hi: 'जैव-अणु (Biomolecules)', te: 'జీవాణువులు', ta: 'உயிரியல் மூலக்கூறுகள்' },
  'Polymers': { hi: 'बहुलक (Polymers)', te: 'పాలిమర్లు', ta: 'பாலிமர்கள்' },
  'Polymers & Chemistry in Everyday Life': { hi: 'बहुलक और दैनिक जीवन में रसायन विज्ञान', te: 'పాలిమర్లు & నిత్యజీవితంలో రసాయన శాస్త్రం', ta: 'பாலிமர்களும் அன்றாட வாழ்வில் வேதியியலும்' },
  'Chemistry in Everyday Life': { hi: 'दैनिक जीवन में रसायन विज्ञान', te: 'నిత్యజీవితంలో రసాయన శాస్త్రం', ta: 'அன்றாட வாழ்வில் வேதியியல்' },
  'Analytical Chemistry & Principles of Practical Chemistry': { hi: 'विश्लेषणात्मक रसायन और प्रायोगिक सिद्धांत', te: 'విశ్లేషణాత్మక రసాయన శాస్త్రం & ప్రయోగ సూత్రాలు', ta: 'பகுப்பாய்வு வேதியியலும் செய்முறை தத்துவங்களும்' }
};

// 4. Standard JEE Question Level & Context Prefixes
export const QUESTION_PREFIXES = [
  { en: 'In a standard foundational situation,', hi: 'एक मानक आधारभूत स्थिति में,', te: 'ప్రామాణిక ప్రాథమిక సందర్భంలో,', ta: 'ஒரு நிலையான அடிப்படை சூழலில்,' },
  { en: 'For a JEE Main conceptual application,', hi: 'जेईई मेन वैचारिक अनुप्रयोग के लिए,', te: 'జేఈఈ మెయిన్ భావనాత్మక అప్లికేషన్ కోసం,', ta: 'ஜேஇஇ முதன்மை கருத்தியல் பயன்பாட்டிற்கு,' },
  { en: 'In an advanced analytical context,', hi: 'एक उन्नत विश्लेषणात्मक संदर्भ में,', te: 'ఉన్నత విశ్లేషణాత్మక సందర్భంలో,', ta: 'ஒரு மேம்பட்ட பகுப்பாய்வு சூழலில்,' },
  { en: 'For a quantitative JEE Advanced level evaluation,', hi: 'मात्रात्मक जेईई एडवांस्ड स्तर के मूल्यांकन के लिए,', te: 'పరిమాణాత్మక జేఈఈ అడ్వాన్స్‌డ్ స్థాయి మూల్యాంకనం కోసం,', ta: 'அளவுசார்ந்த ஜேஇஇ அட்வான்ஸ்ட் நிலை மதிப்பீட்டிற்கு,' },
  { en: 'In a foundational context,', hi: 'एक आधारभूत संदर्भ में,', te: 'ప్రాథమిక సందర్భంలో,', ta: 'அடிப்படை சூழலில்,' },
  { en: 'For a standard JEE Main test,', hi: 'मानक जेईई मेन परीक्षा के लिए,', te: 'ప్రామాణిక జేఈఈ మెయిన్ పరీక్ష కోసం,', ta: 'நிலையான ஜேஇஇ முதன்மைத் தேர்வுக்கு,' },
  { en: 'Under advanced analytical conditions,', hi: 'उन्नत विश्लेषणात्मक परिस्थितियों में,', te: 'అధునాతన విశ్లేషణాత్మక పరిస్థితులలో,', ta: 'மேம்பட்ட பகுப்பாய்வு நிலைமைகளில்,' },
  { en: 'In a rigorous JEE Advanced evaluation,', hi: 'एक कठिन जेईई एडवांस्ड मूल्यांकन में,', te: 'కఠినమైన జేఈఈ అడ్వాన్స్‌డ్ మూల్యాంకనంలో,', ta: 'கடுமையான ஜேஇஇ அட்வான்ஸ்ட் மதிப்பீட்டில்,' },
  { en: 'For a system satisfying the stated assumptions,', hi: 'कथित मान्यताओं को पूरा करने वाली प्रणाली के लिए,', te: 'పేర్కొన్న ఊహలను సంతృప్తిపరిచే వ్యవస్థ కోసం,', ta: 'கூறப்பட்ட அனுமானங்களை பூர்த்தி செய்யும் அமைப்பிற்கு,' },
  { en: 'During an idealized experiment,', hi: 'एक आदर्श प्रयोग के दौरान,', te: 'ఆదర్శవంతమైన ప్రయోగం సమయంలో,', ta: 'ஒரு கருத்தியல் சோதனையின் போது,' },
  { en: 'For a quantitative JEE-style analysis,', hi: 'मात्रात्मक जेईई-शैली विश्लेषण के लिए,', te: 'పరిమాణాత్మక జేఈఈ శైలి విశ్లేషణ కోసం,', ta: 'அளவுசார்ந்த ஜேஇஇ பாணி பகுப்பாய்விற்கு,' },
  { en: 'Under standard laboratory conditions,', hi: 'मानक प्रयोगशाला परिस्थितियों में,', te: 'ప్రామాణిక ప్రయోగశాల పరిస్థితులలో,', ta: 'நிலையான ஆய்வக நிலைமைகளில்,' },
  { en: 'In a rigorous laboratory setup,', hi: 'एक सटीक प्रयोगशाला व्यवस्था में,', te: 'ఖచ్చితమైన ప్రయోగశాల అమరికలో,', ta: 'கடுமையான ஆய்வக அமைப்பில்,' },
  { en: 'For a JEE Main application,', hi: 'जेईई मेन अनुप्रयोग के लिए,', te: 'జేఈఈ మెయిన్ అప్లికేషన్ కోసం,', ta: 'ஜேஇஇ முதன்மை பயன்பாட்டிற்கு,' },
  { en: 'For a quantitative JEE Advanced conceptual analysis,', hi: 'मात्रात्मक जेईई एडवांस्ड वैचारिक विश्लेषण के लिए,', te: 'పరిమాణాత్మక జేఈఈ అడ్వాన్స్‌డ్ విశ్లేషణ కోసం,', ta: 'அளவுசார்ந்த ஜேஇஇ அட்வான்ஸ்ட் பகுப்பாய்விற்கு,' },
  { en: 'In a standard conceptual situation,', hi: 'एक मानक वैचारिक स्थिति में,', te: 'ప్రామాణిక భావనాత్మక సందర్భంలో,', ta: 'ஒரு நிலையான கருத்தியல் சூழலில்,' }
];

export function translateChapterName(chap, lang) {
  if (!chap || lang === 'en') return chap;
  const trimmed = chap.trim();
  const match = CHAPTER_NAMES_I18N[trimmed];
  if (match && match[lang]) return match[lang];
  return chap;
}

// 5. Pattern Matchers for 25,000 Questions Bank
export const QUESTION_PATTERNS = [
  {
    regex: /Which law of chemical combination is illustrated by pairs of compounds like CO and CO₂\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'CO और CO₂ जैसे यौगिकों के युग्म द्वारा रासायनिक संयोजन के किस नियम को दर्शाया गया है?';
      if (lang === 'te') return 'CO మరియు CO₂ వంటి సమ్మేళనాల జతల ద్వారా రసాయన సంయోగం యొక్క ఏ నియమం వివరించబడింది?';
      if (lang === 'ta') return 'CO மற்றும் CO₂ போன்ற சேர்மங்களின் இணைகளால் எந்த வேதிச்சேர்க்கை விதி விளக்கப்படுகிறது?';
    }
  },
  {
    regex: /What is the conjugate base of (.*?)\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[1]} का संयुग्मी क्षार (Conjugate base) क्या है?`;
      if (lang === 'te') return `${m[1]} యొక్క సంయుగ్మ క్షారం ఏమిటి?`;
      if (lang === 'ta') return `${m[1]} இன் இணை காரம் என்ன?`;
    }
  },
  {
    regex: /What is the conjugate acid of (.*?)\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[1]} का संयुग्मी अम्ल (Conjugate acid) क्या है?`;
      if (lang === 'te') return `${m[1]} యొక్క సంయుగ్మ ఆమ్లం ఏమిటి?`;
      if (lang === 'ta') return `${m[1]} இன் இணை அமிலம் என்ன?`;
    }
  },

  {
    regex: /In the study of (.*?), which relationship accurately models fundamental interactions under idealized conditions?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} के अध्ययन में, कौन सा संबंध आदर्श परिस्थितियों में मौलिक अंतःक्रियाओं को सटीक रूप से मॉडल करता है?`;
      if (lang === 'te') return `${c} అధ్యయనంలో, ఆదర్శ పరిస్థితులలో ప్రాథమిక పరస్పర చర్యలను ఏ సంబంధం ఖచ్చితంగా మోడల్ చేస్తుంది?`;
      if (lang === 'ta') return `${c} பற்றிய ஆய்வில், சிறந்த சூழ்நிலைகளில் அடிப்படை தொடர்புகளை எந்த தொடர்பு துல்லியமாக மாதிரியாக்குகிறது?`;
    }
  },
  {
    regex: /In (.*?), which principle governs molecular transformations under standard thermodynamic conditions?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} में, कौन सा सिद्धांत मानक ऊष्मागतिक परिस्थितियों में आणविक परिवर्तनों को नियंत्रित करता है?`;
      if (lang === 'te') return `${c} లో, ప్రామాణిక ఉష్ణగతిక పరిస్థితులలో పరమాణు పరివర్తనలను ఏ సూత్రం నియంత్రిస్తుంది?`;
      if (lang === 'ta') return `${c} இல், நிலையான வெப்ப இயக்கவியல் நிலைமைகளில் மூலக்கூறு மாற்றங்களை எந்த தத்துவம் நிர்வகிக்கிறது?`;
    }
  },
  {
    regex: /For a physical system governed by (.*?), if parameter X is ([-+]?\d+(\.\d+)?) units and response rate Y is ([-+]?\d+(\.\d+)?) units\/s, what is the integrated effect over 5 s\?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} द्वारा शासित एक भौतिक प्रणाली के लिए, यदि पैरामीटर X ${m[2]} इकाइयाँ है और प्रतिक्रिया दर Y ${m[4]} इकाइयाँ/से है, तो 5 सेकंड में एकीकृत प्रभाव क्या है?`;
      if (lang === 'te') return `${c} చే నియంత్రించబడే భౌతిక వ్యవస్థలో, పారామీటర్ X విలువ ${m[2]} యూనిట్లు మరియు ప్రతిస్పందన రేటు Y విలువ ${m[4]} యూనిట్లు/సె అయితే, 5 సెకన్లలో సమగ్ర ప్రభావం ఎంత?`;
      if (lang === 'ta') return `${c} ஆல் நிர்வகிக்கப்படும் ஒரு இயற்பியல் அமைப்பிற்கு, அளவுரு X என்பது ${m[2]} அலகுகள் மற்றும் மறுமொழி விகிதம் Y என்பது ${m[4]} அலகுகள்/வி எனில், 5 வினாடிகளில் ஒட்டுமொத்த ஒருங்கிணைந்த விளைவு என்ன?`;
    }
  },
  {
    regex: /In an idealized experiment on (.*?), when the operating frequency is multiplied by factor ([-+]?\d+(\.\d+)?), the resonant response wavelength varies as:/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} पर एक आदर्श प्रयोग में, जब परिचालन आवृत्ति को ${m[2]} के गुणक से गुणा किया जाता है, तो अनुनादी प्रतिक्रिया तरंग दैर्ध्य इस प्रकार परिवर्तित होती है:`;
      if (lang === 'te') return `${c} పై ఆదర్శవంతమైన ప్రయోగంలో, ఆపరేటింగ్ పౌనఃపున్యం ${m[2]} గుణకంతో గుణించబడినప్పుడు, అనునాద ప్రతిస్పందన తరంగదైర్ఘ్యం ఎలా మారుతుంది:`;
      if (lang === 'ta') return `${c} தொடர்பான ஒரு கருத்தியல் சோதனையில், செயல்பாட்டு அதிர்வெண் ${m[2]} காரணியால் பெருக்கப்படும் போது, ஒத்ததிர்வு அலைநீளம் எவ்வாறு மாறுபடும்:`;
    }
  },
  {
    regex: /Which conservation principle strictly constrains non-dissipative transitions in (.*?)\?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} में गैर-अपव्ययी संक्रमणों को कौन सा संरक्षण सिद्धांत कड़ाई से नियंत्रित करता है?`;
      if (lang === 'te') return `${c} లో విచ్ఛిన్నం కాని పరివర్తనలను ఏ పరిరక్షణ సూత్రం ఖచ్చితంగా నియంత్రిస్తుంది?`;
      if (lang === 'ta') return `${c} இல் ஆற்றல் இழப்பற்ற மாற்றங்களை எந்த அழியா விதி கண்டிப்பாகக் கட்டுப்படுத்துகிறது?`;
    }
  },
  {
    regex: /Under standard conditions for (.*?), what is the dimensional formula of the characteristic energy density\?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} के लिए मानक परिस्थितियों में, विशिष्ट ऊर्जा घनत्व का विमीय सूत्र क्या है?`;
      if (lang === 'te') return `${c} కోసం ప్రామాణిక పరిస్థితులలో, విలక్షణ శక్తి సాంద్రత యొక్క మితి సూత్రం ఏమిటి?`;
      if (lang === 'ta') return `${c} க்கான நிலையான நிபந்தனைகளில், சிறப்பியல்பு ஆற்றல் அடர்த்தியின் பரிமாண வாய்பாடு என்ன?`;
    }
  },
  {
    regex: /In chemical transformations within (.*?), how does the equilibrium constant K vary if the forward reaction is exothermic and temperature is raised by ([-+]?\d+(\.\d+)?) K\?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} के भीतर रासायनिक परिवर्तनों में, यदि अग्र अभिक्रिया ऊष्माक्षेपी है और तापमान में ${m[2]} K की वृद्धि की जाती है, तो साम्यावस्था स्थिरांक K कैसे परिवर्तित होता है?`;
      if (lang === 'te') return `${c} పరిధిలోని రసాయన మార్పులలో, పురోగామి చర్య ఉష్ణమోచక చర్య అయి ఉష్ణోగ్రతను ${m[2]} K పెంచితే, సమతాస్థితి స్థిరాంకం K ఎలా మారుతుంది?`;
      if (lang === 'ta') return `${c} இன் வேதி மாற்றங்களில், முன்னோக்கு வினை வெப்ப உமிழ் வினையாக இருந்து வெப்பநிலை ${m[2]} K உயர்த்தப்பட்டால் சமநிலை மாறிலி K எவ்வாறு மாறுபடும்?`;
    }
  },
  {
    regex: /For a reaction system in (.*?) involving ([-+]?\d+(\.\d+)?) reacting species, what is the molecularity of an elementary bimolecular collision step\?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} में ${m[2]} अभिकर्मक प्रजातियों वाली एक अभिक्रिया प्रणाली के लिए, प्राथमिक द्वि-आण्विक संघट्ट चरण की आणविकता क्या है?`;
      if (lang === 'te') return `${c} లో ${m[2]} రసాయన భాగస్వాములు గల ప్రతిచర్యా వ్యవస్థలో, ప్రాథమిక ద్వి-అణు తాకిడి దశ యొక్క అణుశీలత ఎంత?`;
      if (lang === 'ta') return `${c} இல் ${m[2]} வினைபடு பொருட்களைக் கொண்ட ஒரு வினை அமைப்பில், அடிப்படை இருமூலக்கூறு மோதல் படியின் மூலக்கூறு எண் என்ன?`;
    }
  },
  {
    regex: /Which parameter remains strictly zero for an ideal solution formed by mixing components in (.*?)\?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} में घटकों को मिलाकर बनाए गए एक आदर्श विलयन के लिए कौन सा पैरामीटर पूरी तरह से शून्य रहता है?`;
      if (lang === 'te') return `${c} లోని భాగాలను కలపడం ద్వారా ఏర్పడిన ఆదర్శ ద్రావణానికి ఏ పారామీటర్ ఖచ్చితంగా సున్నాగా ఉంటుంది?`;
      if (lang === 'ta') return `${c} இல் கூறுகளைக் கலந்து உருவாக்கப்படும் ஒரு நல்லியல்பு கரைசலுக்கு எந்த அளவுரு கண்டிப்பாக பூஜ்ஜியமாக இருக்கும்?`;
    }
  },
  {
    regex: /In (.*?), what is the oxidation state of the central coordinating element when forming a neutral complex with ligands of formal charge -1 and \+1 in ratio ([-+]?\d+(\.\d+)?):1\?/i,
    render: (m, lang) => {
      const c = translateChapterName(m[1], lang);
      if (lang === 'hi') return `${c} में, -1 और +1 औपचारिक आवेश वाले लिगेंड के साथ ${m[2]}:1 के अनुपात में एक उदासीन संकुल बनाते समय केंद्रीय उपसहसंयोजक तत्व की ऑक्सीकरण अवस्था क्या है?`;
      if (lang === 'te') return `${c} లో, -1 మరియు +1 ఆవేశాలు గల లిగాండ్‌లతో ${m[2]}:1 నిష్పత్తిలో తటస్థ సమ్మేళనాన్ని ఏర్పరిచేటప్పుడు కేంద్ర మూలకం యొక్క ఆక్సీకరణ స్థితి ఎంత?`;
      if (lang === 'ta') return `${c} இல், -1 மற்றும் +1 மின்சுமை கொண்ட ஈனிகளுடன் ${m[2]}:1 என்ற விகிதத்தில் நடுநிலை அணைவுச் சேர்மத்தை உருவாக்கும்போது மைய தனிமத்தின் ஆக்ஸிஜனேற்ற எண் என்ன?`;
    }
  },
  {
    regex: /A particle moves with initial velocity ([-+]?\d+(\.\d+)?) m\/s and constant acceleration ([-+]?\d+(\.\d+)?) m\/s² for ([-+]?\d+(\.\d+)?) s\. What is its final velocity\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return `एक कण प्रारंभिक वेग ${m[1]} मी/से और स्थिर त्वरण ${m[3]} मी/से² के साथ ${m[5]} सेकंड तक गति करता है। इसका अंतिम वेग क्या है?`;
      if (lang === 'te') return `ఒక కణం ప్రారంభ వేగం ${m[1]} మీ/సె మరియు స్థిర త్వరణం ${m[3]} మీ/సె² తో ${m[5]} సెకన్లు కదులుతుంది. దాని తుది వేగం ఎంత?`;
      if (lang === 'ta') return `ஒரு துகள் தொடக்க திசைவேகம் ${m[1]} மீ/வி மற்றும் மாறா முடுக்கம் ${m[3]} மீ/வி² உடன் ${m[5]} வினாடிகள் இயங்குகிறது. அதன் இறுதி திசைவேகம் என்ன?`;
    }
  },
  {
    regex: /A car traveling at ([-+]?\d+(\.\d+)?) m\/s accelerates uniformly at ([-+]?\d+(\.\d+)?) m\/s² over time interval ([-+]?\d+(\.\d+)?) s\. Find displacement\./i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[1]} मी/से की गति से चल रही एक कार ${m[5]} सेकंड के समय अंतराल में ${m[3]} मी/से² की दर से एकसमान रूप से त्वरित होती है। विस्थापन ज्ञात कीजिए।`;
      if (lang === 'te') return `${m[1]} మీ/సె వేగంతో ప్రయాణిస్తున్న కారు ${m[5]} సెకన్ల కాలంలో ${m[3]} మీ/సె² స్థిర త్వరణాన్ని పొందుతుంది. దాని స్థానభ్రంశాన్ని కనుగొనండి.`;
      if (lang === 'ta') return `${m[1]} மீ/வி வேகத்தில் செல்லும் ஒரு கார் ${m[5]} வினாடிகளில் ${m[3]} மீ/வி² சீரான முடுக்கம் அடைகிறது. இடப்பெயர்ச்சியைக் காண்க.`;
    }
  },
  {
    regex: /A projectile is launched from ground with speed ([-+]?\d+(\.\d+)?) m\/s at angle ([-+]?\d+(\.\d+)?)° to horizontal \(g=([-+]?\d+(\.\d+)?) m\/s²\)\. The maximum height reached is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `एक प्रक्षेप्य को जमीन से क्षैतिज से ${m[3]}° के कोण पर ${m[1]} मी/से की गति से प्रक्षेपित किया जाता है (g=${m[5]} मी/से²)। प्राप्त अधिकतम ऊँचाई है:`;
      if (lang === 'te') return `ఒక ప్రక్షేపకం క్షితిజ సమాంతరంతో ${m[3]}° కోణంలో భూమి నుండి ${m[1]} మీ/సె వేగంతో ప్రయోగించబడింది (g=${m[5]} మీ/సె²). అది చేరిన గరిష్ట ఎత్తు:`;
      if (lang === 'ta') return `ஒரு எறிபொருள் தரையிலிருந்து கிடைத்தளத்திற்கு ${m[3]}° கோணத்தில் ${m[1]} மீ/வி வேகத்தில் ஏவப்படுகிறது (g=${m[5]} மீ/வி²). அடைந்த பெரும உயரம்:`;
    }
  },
  {
    regex: /In circular motion with radius ([-+]?\d+(\.\d+)?) m and linear speed ([-+]?\d+(\.\d+)?) m\/s, the centripetal acceleration is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[1]} मीटर त्रिज्या और ${m[3]} मी/से की रैखिक गति वाले वृत्तीय गति में, अभिकेंद्रीय त्वरण है:`;
      if (lang === 'te') return `${m[1]} మీటర్ల వ్యాసార్థం మరియు ${m[3]} మీ/సె సరళ వేగం గల వృత్తాకార చలనంలో, అభికేంద్ర త్వరణం:`;
      if (lang === 'ta') return `${m[1]} மீ ஆரம் மற்றும் ${m[3]} மீ/வி நேரியல் வேகம் கொண்ட வட்ட இயக்கத்தில், மையநோக்கு முடுக்கம்:`;
    }
  },
  {
    regex: /What are the dimensions of universal gravitational constant G in terms of M, L, T\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'M, L, T के पदों में सार्वत्रिक गुरुत्वाकर्षण स्थिरांक G की विमाएँ क्या हैं?';
      if (lang === 'te') return 'M, L, T ల పరంగా విశ్వ గురుత్వాకర్షణ స్థిరాంకం G యొక్క మితులు ఏమిటి?';
      if (lang === 'ta') return 'M, L, T அடிப்படையில் உலகளாவிய ஈர்ப்பு மாறிலி G இன் பரிமாணங்கள் என்ன?';
    }
  },
  {
    regex: /If percentage error in measuring radius of a sphere is ([-+]?\d+(\.\d+)?)%, the percentage error in its volume calculation is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `यदि किसी गोले की त्रिज्या मापने में प्रतिशत त्रुटि ${m[1]}% है, तो इसके आयतन की गणना में प्रतिशत त्रुटि होगी:`;
      if (lang === 'te') return `ఒక గోళం వ్యాసార్థాన్ని కొలవడంలో శాతం లోపం ${m[1]}% అయితే, దాని ఘనపరిమాణ గణనలో శాతం లోపం:`;
      if (lang === 'ta') return `ஒரு கோளத்தின் ஆரத்தை அளவிடுவதில் சதவீதப் பிழை ${m[1]}% எனில், அதன் பருமன் கணக்கீட்டில் உள்ள சதவீதப் பிழை:`;
    }
  },
  {
    regex: /Which physical quantity has the same dimensional formula as impulse\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'किस भौतिक राशि का विमीय सूत्र आवेग (Impulse) के समान है?';
      if (lang === 'te') return 'ఏ భౌతిక రాశికి ప్రచోదనం (Impulse) వలె అదే మితి సూత్రం ఉంటుంది?';
      if (lang === 'ta') return 'எந்த இயற்பியல் அளவு கணத்தாக்கின் (Impulse) அதே பரிமாண வாய்ப்பாட்டைக் கொண்டுள்ளது?';
    }
  },
  {
    regex: /A vernier caliper has ([-+]?\d+) vernier divisions coinciding with ([-+]?\d+) main scale divisions \(([-+]?\d+) MSD = ([-+]?\d+) mm\)\. Least count is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `एक वर्नियर कैलिपर्स में ${m[1]} वर्नियर भाग मुख्य पैमाने के ${m[2]} भागों से संपाती होते हैं (${m[3]} MSD = ${m[4]} मिमी)। इसका अल्पतमांक (Least count) है:`;
      if (lang === 'te') return `ఒక వెర్నియర్ కాలిపర్స్‌లో ${m[1]} వెర్నియర్ విభాగాలు ${m[2]} ప్రధాన స్కేల్ విభాగాలతో ఏకీభవిస్తాయి (${m[3]} MSD = ${m[4]} mm). దాని కనీస కొలత (Least count):`;
      if (lang === 'ta') return `ஒரு வெர்னியர் காலிபரில் ${m[1]} வெர்னியர் பிரிவுகள் ${m[2]} முதன்மை அளவுகோல் பிரிவுகளுடன் பொருந்துகின்றன (${m[3]} MSD = ${m[4]} மிமீ). அதன் மீச்சிற்றளவு (Least count):`;
    }
  },
  {
    regex: /A constant horizontal force of ([-+]?\d+(\.\d+)?) N acts on a frictionless block of mass ([-+]?\d+(\.\d+)?) kg\. Its acceleration is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[3]} किग्रा द्रव्यमान के घर्षण रहित गुटके पर ${m[1]} N का एक स्थिर क्षैतिज बल कार्य करता है। इसका त्वरण है:`;
      if (lang === 'te') return `${m[3]} కిలోల ద్రవ్యరాశి గల ఘర్షణ రహిత దిమ్మెపై ${m[1]} N స్థిర సమాంతర బలం పనిచేస్తుంది. దాని త్వరణం:`;
      if (lang === 'ta') return `${m[3]} கிகி நிறையுள்ள உராய்வற்ற கட்டையின் மீது ${m[1]} N மாறா கிடைத்தள விசை செயல்படுகிறது. அதன் முடுக்கம்:`;
    }
  },
  {
    regex: /A block of mass ([-+]?\d+(\.\d+)?) kg rests on rough floor with coefficient of static friction μ_s = ([-+]?\d+(\.\d+)?) \(g = ([-+]?\d+(\.\d+)?) m\/s²\)\. Limiting static friction is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[1]} किग्रा द्रव्यमान का एक गुटका एक खुरदरे फर्श पर रखा है जिसका स्थैतिक घर्षण गुणांक μ_s = ${m[3]} है (g = ${m[5]} मी/से²)। सीमांत स्थैतिक घर्षण है:`;
      if (lang === 'te') return `${m[1]} కిలోల ద్రవ్యరాశి గల దిమ్మె μ_s = ${m[3]} స్థైతిక ఘర్షణ గుణకం గల గరుకు నేలపై ఉంది (g = ${m[5]} మీ/సె²). గరిష్ట స్థైతిక ఘర్షణ:`;
      if (lang === 'ta') return `${m[1]} கிகி நிறையுள்ள கட்டை ஒன்று μ_s = ${m[3]} என்ற நிலை உராய்வுக் குணகம் கொண்ட சொரசொரப்பான தளத்தில் உள்ளது (g = ${m[5]} மீ/வி²). பெரும நிலை உராய்வு விசை:`;
    }
  },
  {
    regex: /When a horse pulls a cart forward, the reaction force that accelerates the horse forward is exerted by:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'जब कोई घोड़ा गाड़ी को आगे खींचता है, तो घोड़े को आगे त्वरित करने वाला प्रतिक्रिया बल किसके द्वारा लगाया जाता है:';
      if (lang === 'te') return 'ఒక గుర్రం బండిని ముందుకు లాగినప్పుడు, గుర్రాన్ని ముందుకు కదిలించే ప్రతిచర్య బలం దేని ద్వారా ప్రయోగించబడుతుంది:';
      if (lang === 'ta') return 'ஒரு குதிரை வண்டியை முன்னோக்கி இழுக்கும்போது, குதிரையை முன்னோக்கி முடுக்கும் எதிர்வினை விசை யாரால் செலுத்தப்படுகிறது:';
    }
  },
  {
    regex: /A passenger in a lift feels weightless when the lift cable snaps because acceleration is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'लिफ्ट की केबल टूटने पर उसमें सवार यात्री भारहीनता महसूस करता है क्योंकि त्वरण होता है:';
      if (lang === 'te') return 'లిఫ్ట్ కేబుల్ తెగిపోయినప్పుడు ప్రయాణీకుడు బరువులేని అనుభూతిని పొందుతాడు, ఎందుకంటే త్వరణం:';
      if (lang === 'ta') return 'மின்தூக்கியின் கம்பி அறுந்து விழும்போது பயணி எடையற்ற நிலையை உணர்கிறார் ஏனெனில் முடுக்கம்:';
    }
  },
  {
    regex: /Calculate the kinetic energy of a body of mass ([-+]?\d+(\.\d+)?) kg moving with uniform speed ([-+]?\d+(\.\d+)?) m\/s\./i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[3]} मी/से की एकसमान गति से चल रहे ${m[1]} किग्रा द्रव्यमान वाले पिंड की गतिज ऊर्जा की गणना कीजिए।`;
      if (lang === 'te') return `${m[3]} మీ/సె స్థిర వేగంతో కదులుతున్న ${m[1]} కిలోల ద్రవ్యరాశి గల వస్తువు యొక్క గతిజ శక్తిని లెక్కించండి.`;
      if (lang === 'ta') return `${m[3]} மீ/வி சீரான வேகத்தில் இயங்கும் ${m[1]} கிகி நிறையுள்ள பொருளின் இயக்க ஆற்றலைக் கணக்கிடுக.`;
    }
  },
  {
    regex: /A force F = ([-+]?\d+(\.\d+)?) N displaces an object by ([-+]?\d+(\.\d+)?) m in the direction of the force\. Work done is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `F = ${m[1]} N का एक बल किसी वस्तु को बल की दिशा में ${m[3]} मीटर विस्थापित करता है। किया गया कार्य है:`;
      if (lang === 'te') return `F = ${m[1]} N బలం ఒక వస్తువును బలం దిశలోనే ${m[3]} మీటర్లు స్థానభ్రంశం చెందిస్తుంది. జరిగిన పని:`;
      if (lang === 'ta') return `விசையின் திசையிலேயே ஒரு பொருளை ${m[3]} மீ தூரம் நகர்த்த F = ${m[1]} N விசை செயல்படுகிறது. செய்யப்பட்ட வேலை:`;
    }
  },
  {
    regex: /Work done by a conservative force along any closed path is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'किसी बंद पथ पर एक संरक्षी बल द्वारा किया गया कार्य होता है:';
      if (lang === 'te') return 'ఏదైనా సంవృత మార్గంలో సంరక్షణ బలం చేసే పని:';
      if (lang === 'ta') return 'எந்தவொரு மூடிய பாதையிலும் ஒரு ஆற்றல் மாற்றா விசையினால் செய்யப்படும் வேலை:';
    }
  },
  {
    regex: /An electric motor lifts a ([-+]?\d+(\.\d+)?) kg load by ([-+]?\d+(\.\d+)?) m in ([-+]?\d+(\.\d+)?) s \(g=([-+]?\d+(\.\d+)?) m\/s²\)\. Power delivered is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `एक इलेक्ट्रिक मोटर ${m[1]} किग्रा के भार को ${m[5]} सेकंड में ${m[3]} मीटर ऊपर उठाती है (g=${m[7]} मी/से²)। प्रदत्त शक्ति है:`;
      if (lang === 'te') return `ఒక విద్యుత్ మోటారు ${m[1]} కిలోల బరువును ${m[5]} సెకన్లలో ${m[3]} మీటర్ల ఎత్తుకు ఎత్తుతుంది (g=${m[7]} మీ/సె²). అందించబడిన సామర్థ్యం:`;
      if (lang === 'ta') return `ஒரு மின் மோட்டார் ${m[1]} கிகி எடையை ${m[5]} வினாடிகளில் ${m[3]} மீ உயரத்திற்கு தூக்குகிறது (g=${m[7]} மீ/வி²). வெளிப்படுத்தப்பட்ட திறன்:`;
    }
  },
  {
    regex: /Moment of inertia of a uniform disc of mass ([-+]?\d+(\.\d+)?) kg and radius ([-+]?\d+(\.\d+)?) m about its central perpendicular axis is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `${m[1]} किग्रा द्रव्यमान और ${m[3]} मीटर त्रिज्या वाली एकसमान चकती का उसके केंद्रीय लंबवत अक्ष के परितः जड़त्व आघूर्ण है:`;
      if (lang === 'te') return `${m[1]} కిలోల ద్రవ్యరాశి మరియు ${m[3]} మీటర్ల వ్యాసార్థం గల ఏకరీతి డిస్క్ యొక్క కేంద్ర లంబ అక్షం పరంగా జడత్వ భ్రామకం:`;
      if (lang === 'ta') return `${m[1]} கிகி நிறையும் ${m[3]} மீ ஆரமும் கொண்ட ஒரு சீரான வட்டத்தட்டின் மைய செங்குத்து அச்சை பொருத்து நிலைமத் திருப்புத்திறன்:`;
    }
  },
  {
    regex: /If net external torque on a rotating system is zero, which quantity remains strictly conserved\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'यदि किसी घूर्णन प्रणाली पर कुल बाह्य बल आघूर्ण (टॉर्क) शून्य है, तो कौन सी राशि कड़ाई से संरक्षित रहती है?';
      if (lang === 'te') return 'భ్రమణ వ్యవస్థపై నికర బాహ్య టార్క్ సున్నా అయితే, ఏ రాశి ఖచ్చితంగా స్థిరంగా ఉంటుంది?';
      if (lang === 'ta') return 'சுழலும் அமைப்பின் மீதான மொத்த வெளிப்புற திருப்புவிசை சுழியாக இருந்தால், எந்த அளவு கண்டிப்பாக மாறாமல் இருக்கும்?';
    }
  },
  {
    regex: /A sphere of radius R rolls without slipping on a flat surface with center-of-mass speed v\. Ratio of rotational to translational KE is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'त्रिज्या R का एक गोला द्रव्यमान केंद्र वेग v के साथ समतल सतह पर बिना फिसले लुढ़कता है। घूर्णन और स्थानांतरण गतिज ऊर्जा का अनुपात है:';
      if (lang === 'te') return 'R వ్యాసార్థం గల గోళం జారకుండా v వేగంతో చదునైన ఉపరితలంపై దొర్లుతుంది. భ్రమణ మరియు సరళ గతిజ శక్తుల నిష్పత్తి:';
      if (lang === 'ta') return 'R ஆரமுள்ள ஒரு கோளம் சறுக்கலின்றி v வேகத்துடன் தட்டையான பரப்பில் உருள்கிறது. சுழற்சி மற்றும் நேரியல் இயக்க ஆற்றல்களின் விகிதம்:';
    }
  },
  {
    regex: /The perpendicular axis theorem I_z = I_x \+ I_y is strictly valid for:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'लंबवत अक्ष प्रमेय I_z = I_x + I_y किसके लिए कड़ाई से मान्य है:';
      if (lang === 'te') return 'లంబ అక్షాల సిద్ధాంతం I_z = I_x + I_y దేనికి మాత్రమే వర్తిస్తుంది:';
      if (lang === 'ta') return 'செங்குத்து அச்சுத் தேற்றம் I_z = I_x + I_y எதற்கு மட்டுமே செல்லுபடியாகும்:';
    }
  },
  {
    regex: /If radius of Earth shrinks by ([-+]?\d+(\.\d+)?)% while keeping its mass constant, the acceleration due to gravity g on its surface will:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `यदि पृथ्वी का द्रव्यमान स्थिर रखते हुए उसकी त्रिज्या ${m[1]}% सिकुड़ जाए, तो उसकी सतह पर गुरुत्वीय त्वरण g होगा:`;
      if (lang === 'te') return `భూమి ద్రవ్యరాశి స్థిరంగా ఉంచి, దాని వ్యాసార్థం ${m[1]}% తగ్గితే, ఉపరితలంపై గురుత్వ త్వరణం g:`;
      if (lang === 'ta') return `பூமியின் நிறை மாறாமல் அதன் ஆரம் ${m[1]}% சுருங்கினால், அதன் மேற்பரப்பில் புவியீர்ப்பு முடுக்கம் g:`;
    }
  },
  {
    regex: /The escape velocity from the surface of a planet with mass M and radius R is given by:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'द्रव्यमान M और त्रिज्या R वाले किसी ग्रह की सतह से पलायन वेग का सूत्र है:';
      if (lang === 'te') return 'M ద్రవ్యరాశి మరియు R వ్యాసార్థం గల గ్రహ ఉపరితలం నుండి పలాయన వేగం సూత్రం:';
      if (lang === 'ta') return 'M நிறையும் R ஆரமும் கொண்ட ஒரு கோளின் மேற்பரப்பிலிருந்து விடுபடு திசைவேகம்:';
    }
  },
  {
    regex: /A satellite is orbiting close to Earth surface with orbital speed v_o\. The escape speed v_e is related by:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'एक उपग्रह पृथ्वी की सतह के निकट कक्षीय गति v_o से परिक्रमा कर रहा है। पलायन गति v_e का संबंध है:';
      if (lang === 'te') return 'ఒక ఉపగ్రహం భూ ఉపరితలానికి దగ్గరగా v_o కక్ష్యా వేగంతో పరిభ్రమిస్తోంది. పలాయన వేగం v_e తో సంబంధం:';
      if (lang === 'ta') return 'ஒரு செயற்கைக்கோள் பூமிக்கு அருகில் v_o சுற்றுப்பாதை வேகத்தில் சுற்றுகிறது. விடுபடு வேகம் v_e உடனான தொடர்பு:';
    }
  },
  {
    regex: /According to Kepler’s Third Law, the square of orbital period T is proportional to:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'केप्लर के तीसरे नियम के अनुसार, कक्षीय आवर्तकाल T का वर्ग किसके समानुपाती होता है:';
      if (lang === 'te') return 'కెప్లర్ మూడవ నియమం ప్రకారం, కక్ష్యా ఆవర్తన కాలం T యొక్క వర్గం దేనికి అనులోమానుపాతంలో ఉంటుంది:';
      if (lang === 'ta') return 'கெப்ளரின் மூன்றாம் விதியின்படி, சுழற்சி காலத்தின் இருமடி (T²) எதற்கு நேர்விகிதத்தில் இருக்கும்:';
    }
  },
  {
    regex: /Two identical point charges Q are placed distance r apart in vacuum\. If distance is halved, the electrostatic force becomes:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'निर्वात में दो समान बिंदु आवेश Q एक दूसरे से दूरी r पर रखे गए हैं। यदि दूरी आधी कर दी जाए, तो स्थिरवैद्युत बल हो जाता है:';
      if (lang === 'te') return 'శూన్యంలో r దూరంలో రెండు సమాన బిందు ఆవేశాలు Q ఉంచబడ్డాయి. దూరం సగానికి తగ్గితే, స్థిర విద్యుత్ బలం:';
      if (lang === 'ta') return 'வெற்றிடத்தில் r தூரத்தில் இரண்டு சமமான புள்ளி மின்னூட்டங்கள் Q வைக்கப்பட்டுள்ளன. தூரம் பாதியாகக் குறைக்கப்பட்டால், நிலைமின்னியல் விசை:';
    }
  },
  {
    regex: /The number of moles of solute present in 1 liter of solution is defined as:/i,
    render: (m, lang) => {
      if (lang === 'hi') return '1 लीटर विलयन में उपस्थित विलेय के मोलों की संख्या को क्या कहा जाता है:';
      if (lang === 'te') return '1 లీటర్ ద్రావణంలో కరిగి ఉన్న ద్రావితం యొక్క మోల్స్ సంఖ్యను ఏమంటారు:';
      if (lang === 'ta') return '1 லிட்டர் கரைசலில் உள்ள கரைபொருளின் மோல்களின் எண்ணிக்கை எவ்வாறு வரையறுக்கப்படுகிறது:';
    }
  },
  {
    regex: /How many atoms are present in 1 mole of oxygen gas \(O₂\)\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return '1 मोल ऑक्सीजन गैस (O₂) में कितने परमाणु उपस्थित होते हैं?';
      if (lang === 'te') return '1 మోల్ ఆక్సిజన్ వాయువు (O₂) లో ఎన్ని పరమాణువులు ఉంటాయి?';
      if (lang === 'ta') return '1 மோல் ஆக்ஸிஜன் வாயுவில் (O₂) எத்தனை அணுக்கள் உள்ளன?';
    }
  },
  {
    regex: /In the combustion of methane: CH₄ \+ 2O₂ → CO₂ \+ 2H₂O, how many moles of O₂ are required for ([-+]?\d+(\.\d+)?) moles of CH₄\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return `मीथेन के दहन में: CH₄ + 2O₂ → CO₂ + 2H₂O, ${m[1]} मोल CH₄ के लिए कितने मोल O₂ की आवश्यकता होती है?`;
      if (lang === 'te') return `మీథేన్ దహన చర్యలో: CH₄ + 2O₂ → CO₂ + 2H₂O, ${m[1]} మోల్ CH₄ కొరకు ఎన్ని మోల్స్ O₂ అవసరం?`;
      if (lang === 'ta') return `மீத்தேன் எரிதல் வினையில்: CH₄ + 2O₂ → CO₂ + 2H₂O, ${m[1]} மோல் CH₄ க்கு எத்தனை மோல் O₂ தேவைப்படுகிறது?`;
    }
  },
  {
    regex: /Which concentration unit remains independent of temperature change\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'कौन सी सांद्रता इकाई तापमान परिवर्तन से स्वतंत्र रहती है?';
      if (lang === 'te') return 'ఏ గాఢత ప్రమాణం ఉష్ణోగ్రత మార్పుపై ఆధారపడదు?';
      if (lang === 'ta') return 'எந்த செறிவு அலகு வெப்பநிலை மாற்றத்தினால் பாதிக்கப்படுவதில்லை?';
    }
  },
  {
    regex: /The maximum number of electrons that can be accommodated in a principal quantum shell n is given by:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'मुख्य क्वांटम कोश n में समाहित किए जा सकने वाले इलेक्ट्रॉनों की अधिकतम संख्या दी जाती है:';
      if (lang === 'te') return 'ప్రధాన క్వాంటం కక్ష్య n లో ఉండగల గరిష్ట ఎలక్ట్రాన్ల సంఖ్య సూత్రం:';
      if (lang === 'ta') return 'முதன்மை குவாண்டம் கூடு n இல் இடமளிக்கக்கூடிய அதிகபட்ச எலக்ட்ரான்களின் எண்ணிக்கை:';
    }
  },
  {
    regex: /The de Broglie wavelength associated with an electron moving with velocity v is given by:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'वेग v से गतिमान इलेक्ट्रॉन से संबद्ध डी ब्रोग्ली तरंग दैर्ध्य का सूत्र है:';
      if (lang === 'te') return 'v వేగంతో కదిలే ఎలక్ట్రాన్‌తో అనుబంధించబడిన డి బ్రోగ్లీ తరంగదైర్ఘ్యం:';
      if (lang === 'ta') return 'v திசைவேகத்தில் இயங்கும் ஒரு எலக்ட்ரானுடன் தொடர்புடைய டி பிராக்லி அலைநீளம்:';
    }
  },
  {
    regex: /Heisenberg’s uncertainty principle is represented mathematically as:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'हाइजेनबर्ग के अनिश्चितता सिद्धांत को गणितीय रूप से कैसे दर्शाया जाता है:';
      if (lang === 'te') return 'హైసెన్‌బర్గ్ అనిశ్చితత్వ సూత్రం యొక్క గణిత సమీకరణం:';
      if (lang === 'ta') return 'ஹைசன்பர்க்கின் நிச்சயமற்ற தத்துவத்தின் கணித வடிவம்:';
    }
  },
  {
    regex: /What is the hybridization and molecular geometry of water \(H₂O\)\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'जल (H₂O) का संकरण और आणविक ज्यामिति क्या है?';
      if (lang === 'te') return 'నీరు (H₂O) అణువు యొక్క సంకరీకరణం మరియు అణు జ్యామితి ఏమిటి?';
      if (lang === 'ta') return 'நீரின் (H₂O) இனக்கலப்பு மற்றும் மூலக்கூறு வடிவம் என்ன?';
    }
  },
  {
    regex: /Which molecule has a dipole moment of zero due to symmetrical shape\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'सममित आकृति के कारण किस अणु का द्विध्रुव आघूर्ण शून्य होता है?';
      if (lang === 'te') return 'సౌష్టవ ఆకారం కారణంగా ఏ అణువు యొక్క ద్విధ్రువ భ్రామకం సున్నాగా ఉంటుంది?';
      if (lang === 'ta') return 'சீரான சமச்சீர் வடிவம் காரணமாக எந்த மூலக்கூறின் இருமுனைத் திருப்புத்திறன் பூஜ்ஜியமாகும்?';
    }
  },
  {
    regex: /According to Molecular Orbital Theory, what is the bond order of the O₂ molecule\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'आणविक कक्षक सिद्धांत (MOT) के अनुसार, O₂ अणु का बंध क्रम (Bond Order) क्या है?';
      if (lang === 'te') return 'అణు ఆర్బిటాల్ సిద్ధాంతం ప్రకారం, O₂ అణువు యొక్క బంధ క్రమం ఎంత?';
      if (lang === 'ta') return 'மூலக்கூறு ஆர்பிட்டால் கொள்கையின்படி, O₂ மூலக்கூறின் பிணைப்புத் தரம் என்ன?';
    }
  },
  {
    regex: /Which of the following compounds exhibits intramolecular hydrogen bonding\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'निम्नलिखित में से कौन सा यौगिक अंतःआण्विक हाइड्रोजन बंध प्रदर्शित करता है?';
      if (lang === 'te') return 'క్రింది వాటిలో ఏ సమ్మేళనం అంతర-అణు హైడ్రోజన్ బంధాన్ని ప్రదర్శిస్తుంది?';
      if (lang === 'ta') return 'பின்வரும் சேர்மங்களில் எது மூலக்கூறினுள் நிகழும் ஹைட்ரஜன் பிணைப்பை வெளிப்படுத்துகிறது?';
    }
  },
  {
    regex: /For a process to be spontaneous at constant temperature and pressure, the change in Gibbs free energy \(ΔG\) must be:/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'स्थिर तापमान और दबाव पर किसी प्रक्रम के स्वतःस्फूर्त होने के लिए, गिब्स मुक्त ऊर्जा (ΔG) में परिवर्तन होना चाहिए:';
      if (lang === 'te') return 'స్థిర ఉష్ణోగ్రత మరియు పీడనం వద్ద ఒక ప్రక్రియ ఆకస్మికంగా జరగడానికి, గిబ్స్ స్వేచ్ఛా శక్తి మార్పు (ΔG) ఎలా ఉండాలి:';
      if (lang === 'ta') return 'மாறா வெப்பநிலை மற்றும் அழுத்தத்தில் ஒரு செயல் தன்னிச்சையாக நிகழ, கிப்ஸ் கட்டற்ற ஆற்றல் மாற்றம் (ΔG) எவ்வாறு இருக்க வேண்டும்:';
    }
  },
  {
    regex: /If a quantity has dimensions M\^a L\^b T\^c, which expression has the same dimensions\?/i,
    render: (m, lang) => {
      if (lang === 'hi') return 'यदि किसी भौतिक राशि की विमाएँ M^a L^b T^c हैं, तो किस व्यंजक की विमाएँ समान हैं?';
      if (lang === 'te') return 'ఒక రాశికి M^a L^b T^c మితులు ఉంటే, ఏ సమాసానికి అవే మితులు ఉంటాయి?';
      if (lang === 'ta') return 'ஒரு அளவின் பரிமாணங்கள் M^a L^b T^c எனில், எந்தக் கோவை அதே பரிமாணங்களைக் கொண்டுள்ளது?';
    }
  },
  {
    regex: /A measured length is reported as ([-+]?\d+(\.\d+)?) cm\. The number of significant figures is:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `एक मापी गई लंबाई ${m[1]} सेमी बताई गई है। इसमें सार्थक अंकों की संख्या है:`;
      if (lang === 'te') return `కొలిచిన పొడవు ${m[1]} సెం.మీ గా నివేదించబడింది. సార్థక సంఖ్యల సంఖ్య:`;
      if (lang === 'ta') return `அளவிடப்பட்ட நீளம் ${m[1]} செ.மீ எனக் குறிப்பிடப்படுகிறது. இதில் உள்ள முக்கிய எண்ணுருக்களின் எண்ணிக்கை:`;
    }
  },
  {
    regex: /If x=\(([-+]?\d+(\.\d+)?)±([-+]?\d+(\.\d+)?)%?\) cm, the percentage uncertainty in x is approximately:/i,
    render: (m, lang) => {
      if (lang === 'hi') return `यदि x=(${m[1]}±${m[3]}) सेमी है, तो x में प्रतिशत अनिश्चितता लगभग है:`;
      if (lang === 'te') return `x=(${m[1]}±${m[3]}) సెం.మీ అయితే, x లో శాతం అనిశ్చితి సుమారుగా:`;
      if (lang === 'ta') return `x=(${m[1]}±${m[3]}) செ.மீ எனில், x இன் சதவீத நிச்சயமற்ற தன்மை தோராயமாக:`;
    }
  }
];

// 6. Vocabulary Terms for Sentences and Stems
export const SCIENTIFIC_TERMS = {
  hi: {
    'electric potential': 'विद्युत विभव (Electric potential)',
    'capacitance of an isolated conductor': 'एक विलगित चालक की धारिता',
    'increasing plate separation makes capacitance': 'प्लेटों के बीच की दूरी बढ़ाने पर धारिता',
    'energy stored in a capacitor': 'संधारित्र में संचित ऊर्जा',
    "ohm's law for an ohmic conductor": "ओमीय चालक के लिए ओम का नियम",
    'electrical resistance of a uniform wire': 'एकसमान तार का विद्युत प्रतिरोध',
    'in a series circuit, the current through ideal series elements': 'श्रेणी परिपथ में आदर्श श्रेणी तत्वों से होकर बहने वाली धारा',
    'magnetic field lines around a bar magnet form': 'छड़ चुंबक के चारों ओर चुंबकीय क्षेत्र रेखाएं बनाती हैं',
    'magnetic dipole in a uniform field experiences torque tending to': 'एकसमान क्षेत्र में चुंबकीय द्विध्रुव पर ऐसा टॉर्क लगता है जो प्रवृत्त करता है',
    'sI unit of magnetic flux is': 'चुंबकीय फ्लक्स की SI इकाई है',
    'charged particle moving parallel to a uniform magnetic field experiences magnetic force': 'एकसमान चुंबकीय क्षेत्र के समानांतर गतिमान आवेशित कण पर लगने वाला चुंबकीय बल',
    'magnetic force on a moving charge is perpendicular to': 'गतिमान आवेश पर चुंबकीय बल किसके लंबवत होता है',
    'SI unit of magnetic field is': 'चुंबकीय क्षेत्र की SI इकाई है',
    "faraday's law relates induced emf to rate of change of": 'फैराडे का नियम प्रेरित emf को किसके परिवर्तन की दर से संबंधित करता है',
    'in a pure inductor connected to AC, current': 'प्रत्यावर्ती धारा (AC) से जुड़े शुद्ध प्रेरक में धारा',
    'SI unit of inductance is': 'प्रेरकत्व की SI इकाई है',
    'electromagnetic waves can propagate through': 'विद्युतचुंबकीय तरंगें किस माध्यम से संचरित हो सकती हैं',
    'in vacuum, all electromagnetic waves have the same': 'निर्वात में सभी विद्युतचुंबकीय तरंगों का समान होता है',
    'visible light is a part of the': 'दृश्य प्रकाश किसका एक भाग है',
    'for a convex lens, a ray parallel to the principal axis refracts through': 'उत्तल लेंस के लिए मुख्य अक्ष के समानांतर किरण अपवर्तित होकर गुजरती है',
    'refractive index is the ratio of speed of light in vacuum to speed in': 'अपवर्तनांक निर्वात में प्रकाश की चाल का किसमें प्रकाश की चाल से अनुपात है',
    'total internal reflection requires light to travel from': 'पूर्ण आंतरिक परावर्तन के लिए प्रकाश को किस माध्यम से किसमें यात्रा करनी होती है',
    "young's double-slit experiment demonstrates": 'यंग का द्वि-स्लिट प्रयोग क्या प्रदर्शित करता है',
    'for constructive interference, path difference is': 'संपोषी व्यतिकरण के लिए पथांतर होता है',
    'diffraction becomes prominent when aperture size is comparable to': 'विवर्तन तब प्रमुख हो जाता है जब छिद्र का आकार किसके बराबर होता है',
    'photoelectric effect supports the': 'प्रकाश-वैद्युत प्रभाव किसका समर्थन करता है',
    'photon energy is': 'फोटॉन की ऊर्जा होती है',
    'de Broglie wavelength is inversely proportional to': 'डी ब्रोग्ली तरंगदैर्ध्य किसके व्युत्क्रमानुपाती होती है',
    'atomic number of an element equals the number of': 'किसी तत्व का परमाणु क्रमांक किसके बराबर होता है',
    'radioactive decay is generally described as': 'रेडियोधर्मी क्षय को सामान्यतः वर्णित किया जाता है',
    'binding energy of a nucleus is related to': 'नाभिक की बंधन ऊर्जा किससे संबंधित होती है',
    'pure semiconductor is called': 'शुद्ध अर्धचालक को क्या कहा जाता है',
    'p-type semiconductor has majority carriers that are': 'p-प्रकार के अर्धचालक में बहुसंख्यक वाहक होते हैं',
    'diode is commonly used for': 'डायोड का उपयोग आमतौर पर किसके लिए किया जाता है',
    'Action and reaction forces': 'क्रिया और प्रतिक्रिया बल',
    'Power is the rate of': 'शक्ति किसकी दर है',
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
    'Explanation': 'व्याख्या'
  },
  te: {
    'electric potential': 'విద్యుత్ పొటెన్షియల్',
    'capacitance of an isolated conductor': 'ఒక వివిక్త వాహకం యొక్క కెపాసిటెన్స్',
    'increasing plate separation makes capacitance': 'పలకల మధ్య దూరాన్ని పెంచినప్పుడు కెపాసిటెన్స్',
    'energy stored in a capacitor': 'కెపాసిటర్‌లో నిల్వ ఉన్న శక్తి',
    "ohm's law for an ohmic conductor": "ఓమిక్ వాహకం కోసం ఓమ్ నియమం",
    'electrical resistance of a uniform wire': 'ఏకరీతి తీగ యొక్క విద్యుత్ నిరోధం',
    'in a series circuit, the current through ideal series elements': 'శ్రేణి వలయంలో ఆదర్శ శ్రేణి మూలకాల గుండా ప్రవహించే కరెంట్',
    'magnetic field lines around a bar magnet form': 'దండాయస్కాంతం చుట్టూ అయస్కాంత క్షేత్ర రేఖలు ఏర్పరుస్తాయి',
    'magnetic dipole in a uniform field experiences torque tending to': 'ఏకరీతి క్షేత్రంలో అయస్కాంత ద్విధ్రువం పొందే టార్క్ దేనికి మొగ్గు చూపుతుంది',
    'sI unit of magnetic flux is': 'అయస్కాంత ఫ్లక్స్ యొక్క SI ప్రమాణం',
    'charged particle moving parallel to a uniform magnetic field experiences magnetic force': 'సమాంతరంగా చలించే ఆవేశిత కణంపై అయస్కాంత బలం',
    'magnetic force on a moving charge is perpendicular to': 'చలించే ఆవేశంపై అయస్కాంత బలం దేనికి లంబంగా ఉంటుంది',
    'SI unit of magnetic field is': 'అయస్కాంత క్షేత్రం యొక్క SI ప్రమాణం',
    "faraday's law relates induced emf to rate of change of": 'ఫెరడే నియమం ప్రేరిత emf ను దేని మార్పు రేటుతో అనుసంధానిస్తుంది',
    'in a pure inductor connected to AC, current': 'AC కి అనుసంధానించబడిన శుద్ధ ఇండక్టర్‌లో కరెంట్',
    'SI unit of inductance is': 'ప్రేరకత్వం యొక్క SI ప్రమాణం',
    'electromagnetic waves can propagate through': 'విద్యుదయస్కాంత తరంగాలు ప్రసారమయ్యే మాధ్యమం',
    'in vacuum, all electromagnetic waves have the same': 'శూన్యంలో అన్ని విద్యుదయస్కాంత తరంగాలకు సమానంగా ఉండేది',
    'visible light is a part of the': 'దృశ్య కాంతి దేనిలో భాగం',
    'for a convex lens, a ray parallel to the principal axis refracts through': 'కుంభాకార కటకంలో ప్రధానాక్షానికి సమాంతరంగా వచ్చే కిరణం వక్రీభవనం చెంది వెళ్లే మార్గం',
    'refractive index is the ratio of speed of light in vacuum to speed in': 'వక్రీభవన గుణకం అనేది శూన్యంలో కాంతి వేగానికి దేనిలోని వేగానికి గల నిష్పత్తి',
    'total internal reflection requires light to travel from': 'సంపూర్ణ అంతర్గత పరావర్తనం కోసం కాంతి ప్రయాణించాల్సిన దిశ',
    "young's double-slit experiment demonstrates": 'యంగ్ డబుల్ స్లిట్ ప్రయోగం దేనిని రుజువు చేస్తుంది',
    'for constructive interference, path difference is': 'సంపోషక వ్యతికరణం కోసం పథ భేదం',
    'diffraction becomes prominent when aperture size is comparable to': 'రంధ్రం పరిమాణం దేనికి సమానంగా ఉన్నప్పుడు వివర్తనం స్పష్టంగా కనిపిస్తుంది',
    'photoelectric effect supports the': 'కాంతి విద్యుత్ ప్రభావం దేనిని సమర్థిస్తుంది',
    'photon energy is': 'ఫోటాన్ శక్తి సూత్రం',
    'de Broglie wavelength is inversely proportional to': 'డి బ్రోగ్లీ తరంగదైర్ఘ్యం దేనికి విలోమానుపాతంలో ఉంటుంది',
    'atomic number of an element equals the number of': 'ఒక మూలకం యొక్క పరమాణు సంఖ్య దేనికి సమానం',
    'radioactive decay is generally described as': 'రేడియోధార్మిక క్షయం సాధారణంగా ఎలా వివరించబడుతుంది',
    'binding energy of a nucleus is related to': 'కేంద్రకం యొక్క బంధన శక్తి దేనికి సంబంధించినది',
    'pure semiconductor is called': 'శుద్ధ అర్ధవాహకాన్ని ఏమంటారు',
    'p-type semiconductor has majority carriers that are': 'p-రకం అర్ధవాహకంలో మెజారిటీ వాహకాలు',
    'diode is commonly used for': 'డయోడ్ సాధారణంగా దేనికి ఉపయోగించబడుతుంది',
    'Action and reaction forces': 'చర్య మరియు ప్రతిచర్య బలాలు',
    'Power is the rate of': 'సామర్థ్యం అనేది దేని రేటు',
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
    'Explanation': 'వివరణ'
  },
  ta: {
    'electric potential': 'மின்னழுத்தம் (Electric potential)',
    'capacitance of an isolated conductor': 'தனித்த கடத்தியின் மின்தேக்குத்திறன்',
    'increasing plate separation makes capacitance': 'தட்டுகளுக்கிடையேயான இடைவெளியை அதிகரித்தால் மின்தேக்குத்திறன்',
    'energy stored in a capacitor': 'மின்தேக்கியில் சேமிக்கப்பட்ட ஆற்றல்',
    "ohm's law for an ohmic conductor": "ஓமிக் கடத்திக்கான ஓம் விதி",
    'electrical resistance of a uniform wire': 'சீரான கம்பியின் மின் தடை',
    'in a series circuit, the current through ideal series elements': 'தொடர் மின்சுற்றில் உறுப்புகளின் வழியே பாயும் மின்னோட்டம்',
    'magnetic field lines around a bar magnet form': 'சட்ட காந்தத்தைச் சுற்றியுள்ள காந்தப்புலக் கோடுகள் அமைப்பது',
    'magnetic dipole in a uniform field experiences torque tending to': 'சீரான புலத்தில் உள்ள காந்த இருமுனை உணரும் திருப்புவிசை',
    'sI unit of magnetic flux is': 'காந்தப் பாயத்தின் SI அலகு',
    'charged particle moving parallel to a uniform magnetic field experiences magnetic force': 'சீரான காந்தப்புலத்திற்கு இணையாக இயங்கும் மின்துகளின் மீதான காந்த விசை',
    'magnetic force on a moving charge is perpendicular to': 'இயங்கும் மின்துகள் மீதான காந்த விசை எதற்கு செங்குத்தாக இருக்கும்',
    'SI unit of magnetic field is': 'காந்தப்புலத்தின் SI அலகு',
    "faraday's law relates induced emf to rate of change of": 'பாரடே விதி தூண்டப்பட்ட மின்னியக்கு விசையை எதன் மாற்ற வீதத்துடன் இணைக்கிறது',
    'in a pure inductor connected to AC, current': 'மாறுதிசை மின்னோட்டத்தில் தூய மின்தூண்டியில் மின்னோட்டம்',
    'SI unit of inductance is': 'மின்தூண்டலின் SI அலகு',
    'electromagnetic waves can propagate through': 'மின்காந்த அலைகள் பரவக்கூடிய ஊடகம்',
    'in vacuum, all electromagnetic waves have the same': 'வெற்றிடத்தில் அனைத்து மின்காந்த அலைகளும் சமமாகப் பெற்றிருப்பது',
    'visible light is a part of the': 'கண்ணுறு ஒளி என்பது எதன் ஒரு பகுதியாகும்',
    'for a convex lens, a ray parallel to the principal axis refracts through': 'குவிலென்சில் முதன்மை அச்சுக்கு இணையாக வரும் கதிர் ஒளிவிலகலுக்குப் பின் செல்வது',
    'refractive index is the ratio of speed of light in vacuum to speed in': 'ஒளிவிலகல் எண் என்பது வெற்றிடத்தில் ஒளியின் திசைவேகத்திற்கும் எதற்கும் இடையிலான விகிதம்',
    'total internal reflection requires light to travel from': 'முழு அக எதிரொளிப்பு நிகழ ஒளி எந்த ஊடகத்திலிருந்து எதற்குச் செல்ல வேண்டும்',
    "young's double-slit experiment demonstrates": 'யங்கின் இரட்டைப் பிளவு சோதனை நிரூபிப்பது',
    'for constructive interference, path difference is': 'ஆக்கக் குறுக்கீட்டு விளைவுக்கு பாதை வேறுபாடு',
    'diffraction becomes prominent when aperture size is comparable to': 'துளையின் அளவு எதற்கு இணையாக இருக்கும்போது விளிம்பு விளைவு தெளிவாகும்',
    'photoelectric effect supports the': 'ஒளிமின் விளைவு எதனை ஆதரிக்கிறது',
    'photon energy is': 'ஃபோட்டான் ஆற்றல் வாய்ப்பாடு',
    'de Broglie wavelength is inversely proportional to': 'டி பிராக்லி அலைநீளம் எதற்கு எதிர்த்தகவில் இருக்கும்',
    'atomic number of an element equals the number of': 'ஒரு தனிமத்தின் அணு எண் எதற்குச் சமம்',
    'radioactive decay is generally described as': 'கதிரியக்கச் சிதைவு பொதுவாக எவ்வாறு விவரிக்கப்படுகிறது',
    'binding energy of a nucleus is related to': 'உட்கருவின் பிணைப்பு ஆற்றல் எதனுடன் தொடர்புடையது',
    'pure semiconductor is called': 'தூய குறைக்கடத்தி இவ்வாறு அழைக்கப்படுகிறது',
    'p-type semiconductor has majority carriers that are': 'p-வகை குறைக்கடத்தியில் பெரும்பான்மை ஊர்திகள்',
    'diode is commonly used for': 'டையோடு பொதுவாக எதற்காகப் பயன்படுகிறது',
    'Action and reaction forces': 'செயல் மற்றும் எதிர்ச்செயல் விசைகள்',
    'Power is the rate of': 'திறன் என்பது எதன் வீதமாகும்',
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
    'Explanation': 'விளக்கம்'
  }
};

// 7. Options Vocabulary
export const OPTIONS_TERMS = {
  hi: {
    'Law of Definite Proportions': 'स्थिर अनुपात का नियम',
    'Law of Conservation of Mass': 'द्रव्यमान संरक्षण का नियम',
    'Avogadro’s Law': 'आवोगाद्रो का नियम',
    'Law of Multiple Proportions': 'गुणित अनुपात का नियम',
    'Inverse proportionality with system mass squared': 'प्रणाली के द्रव्यमान के वर्ग के व्युत्क्रमानुपाती',
    'Zero response across all applied potential gradients': 'लागू विभव प्रवणता पर शून्य प्रतिक्रिया',
    'Independent variation without boundary constraints': 'सीमा प्रतिबंधों के बिना स्वतंत्र भिन्नता',
    'Conservation of total mechanical energy': 'कुल यांत्रिक ऊर्जा का संरक्षण',
    'Conservation of linear velocity': 'रैखिक वेग का संरक्षण',
    'Conservation of static pressure only': 'केवल स्थैतिक दबाव का संरक्षण',
    'Independent mass loss': 'स्वतंत्र द्रव्यमान हानि',
    'K decreases': 'K घटता है',
    'K increases': 'K बढ़ता है',
    'K remains unchanged': 'K अपरिवर्तित रहता है',
    'K becomes zero': 'K शून्य हो जाता है',
    'The ground on the horse': 'घोड़े पर जमीन द्वारा',
    'The cart on the horse': 'घोड़े पर गाड़ी द्वारा',
    'The horse on the ground': 'जमीन पर घोड़े द्वारा',
    'Internal muscular energy': 'आंतरिक पेशीय ऊर्जा',
    'g downwards': 'नीचे की ओर g',
    'g upwards': 'ऊपर की ओर g',
    'zero': 'शून्य',
    'Zero': 'शून्य',
    'infinite': 'अनंत',
    'Infinite': 'अनंत',
    'Linear momentum': 'रैखिक संवेग',
    'Angular momentum': 'कोणीय संवेग',
    'Force': 'बल',
    'Pressure': 'दबाव',
    'Molality': 'मोललता (Molality)',
    'Molarity': 'मोलरता (Molarity)',
    'Mole fraction': 'मोल अंश',
    'Normality': 'सामान्यता (Normality)',
    'Positive (> 0)': 'धनात्मक (> 0)',
    'Negative (< 0)': 'ऋणात्मक (< 0)',
    'Zero (= 0)': 'शून्य (= 0)'
  },
  te: {
    'Law of Definite Proportions': 'స్థిర నిష్పత్తి నియమం',
    'Law of Conservation of Mass': 'ద్రవ్యరాశి నిత్యత్వ నియమం',
    'Avogadro’s Law': 'అవోగాడ్రో నియమం',
    'Law of Multiple Proportions': 'గుణిత నిష్పత్తి నియమం',
    'Inverse proportionality with system mass squared': 'వ్యవస్థ ద్రవ్యరాశి వర్గంతో విలోమానుపాతం',
    'Zero response across all applied potential gradients': 'అన్ని సంభావ్య ప్రవణతలలో శూన్య ప్రతిస్పందన',
    'Independent variation without boundary constraints': 'సరిహద్దు పరిమితులు లేని స్వతంత్ర మార్పు',
    'Conservation of total mechanical energy': 'మొత్తం యాంత్రిక శక్తి పరిరక్షణ',
    'Conservation of linear velocity': 'సరళ వేగం పరిరక్షణ',
    'Conservation of static pressure only': 'స్థిర పీడన పరిరక్షణ మాత్రమే',
    'Independent mass loss': 'స్వతంత్ర ద్రవ్యరాశి నష్టం',
    'K decreases': 'K తగ్గుతుంది',
    'K increases': 'K పెరుగుతుంది',
    'K remains unchanged': 'K మారదు',
    'K becomes zero': 'K సున్నా అవుతుంది',
    'The ground on the horse': 'గుర్రంపై నేల',
    'The cart on the horse': 'గుర్రంపై బండి',
    'The horse on the ground': 'నేలపై గుర్రం',
    'Internal muscular energy': 'అంతర్గత కండరాల శక్తి',
    'g downwards': 'క్రింది దిశలో g',
    'g upwards': 'పై దిశలో g',
    'zero': 'సున్నా',
    'Zero': 'సున్నా',
    'infinite': 'అనంతం',
    'Infinite': 'అనంతం',
    'Linear momentum': 'సరళ ద్రవ్యవేగం',
    'Angular momentum': 'కోణీయ ద్రవ్యవేగం',
    'Force': 'బలం',
    'Pressure': 'పీడనం',
    'Molality': 'మోలాలిటీ',
    'Molarity': 'మోలారిటీ',
    'Mole fraction': 'మోల్ భాగం',
    'Normality': 'నార్మాలిటీ',
    'Positive (> 0)': 'ధనాత్మకం (> 0)',
    'Negative (< 0)': 'ఋణాత్మకం (< 0)',
    'Zero (= 0)': 'సున్నా (= 0)'
  },
  ta: {
    'Law of Definite Proportions': 'மாறா விகித விதி',
    'Law of Conservation of Mass': 'பொருண்மை அழியா விதி',
    'Avogadro’s Law': 'அவகாட்ரோ விதி',
    'Law of Multiple Proportions': 'பெருக்கல் விகித விதி',
    'Inverse proportionality with system mass squared': 'அமைப்பின் நிறையின் இருமடியுடன் எதிர்த்தகவு',
    'Zero response across all applied potential gradients': 'அனைத்து மின்னழுத்த சாய்வுகளிலும் சுழி மறுமொழி',
    'Independent variation without boundary constraints': 'எல்லைக் கட்டுப்பாடுகள் இல்லாத தன்னிச்சையான மாறுபாடு',
    'Conservation of total mechanical energy': 'மொத்த இயந்திர ஆற்றல் அழிவின்மை',
    'Conservation of linear velocity': 'நேரியல் திசைவேக அழிவின்மை',
    'Conservation of static pressure only': 'நிலையான அழுத்த அழிவின்மை மட்டுமே',
    'Independent mass loss': 'தனித்த நிறை இழப்பு',
    'K decreases': 'K குறைகிறது',
    'K increases': 'K அதிகரிக்கிறது',
    'K remains unchanged': 'K மாறாது',
    'K becomes zero': 'K பூஜ்ஜியமாகிறது',
    'The ground on the horse': 'குதிரையின் மீது தரை',
    'The cart on the horse': 'குதிரையின் மீது வண்டி',
    'The horse on the ground': 'தரையின் மீது குதிரை',
    'Internal muscular energy': 'உள் தசை ஆற்றல்',
    'g downwards': 'கீழ்நோக்கி g',
    'g upwards': 'மேல்நோக்கி g',
    'zero': 'பூஜ்ஜியம்',
    'Zero': 'பூஜ்ஜியம்',
    'infinite': 'முடிவிலி',
    'Infinite': 'முடிவிலி',
    'Linear momentum': 'நேரியல் உந்தம்',
    'Angular momentum': 'கோண உந்தம்',
    'Force': 'விசை',
    'Pressure': 'அழுத்தம்',
    'Molality': 'மோலாலிட்டி',
    'Molarity': 'மோலாரிட்டி',
    'Mole fraction': 'மோல் பின்னம்',
    'Normality': 'நார்மாலிட்டி',
    'Positive (> 0)': 'நேர்மறை (> 0)',
    'Negative (< 0)': 'எதிர்மறை (< 0)',
    'Zero (= 0)': 'பூஜ்ஜியம் (= 0)'
  }
};

/**
 * Translates an individual option string
 */
export function translateOptionString(opt, lang = 'en') {
  if (!opt || lang === 'en') return opt;
  const str = String(opt).trim();

    // Handle dynamic pattern "Conservation of energy and momentum governing..."
  const consMatch = str.match(/Conservation of energy and momentum governing (.*)/i);
  if (consMatch) {
    const c = translateChapterName(consMatch[1], lang);
    if (lang === 'hi') return `${c} को नियंत्रित करने वाले ऊर्जा और संवेग का संरक्षण`;
    if (lang === 'te') return `${c} ను నియంత్రించే శక్తి మరియు ద్రవ్యవేగ సంరక్షణ`;
    if (lang === 'ta') return `${c} ஐ நிர்வகிக்கும் ஆற்றல் மற்றும் உந்த அழிவின்மை`;
  }

  // Direct match
  if (OPTIONS_TERMS[lang] && OPTIONS_TERMS[lang][str]) {
    return OPTIONS_TERMS[lang][str];
  }

  // Handle numerical units: "5 units" -> "5 इकाइयाँ" / "5 యూనిట్లు" / "5 அலகுகள்"
  const unitMatch = str.match(/^([-+]?\d+(\.\d+)?)\s*units$/i);
  if (unitMatch) {
    if (lang === 'hi') return `${unitMatch[1]} इकाइयाँ`;
    if (lang === 'te') return `${unitMatch[1]} యూనిట్లు`;
    if (lang === 'ta') return `${unitMatch[1]} அலகுகள்`;
  }

  // Handle m/s, m/s2, m, N, J, W, mol
  const msMatch = str.match(/^([-+]?\d+(\.\d+)?)\s*m\/s$/i);
  if (msMatch) {
    if (lang === 'hi') return `${msMatch[1]} मी/से`;
    if (lang === 'te') return `${msMatch[1]} మీ/సె`;
    if (lang === 'ta') return `${msMatch[1]} மீ/வி`;
  }

  const ms2Match = str.match(/^([-+]?\d+(\.\d+)?)\s*m\/s²$/i);
  if (ms2Match) {
    if (lang === 'hi') return `${ms2Match[1]} मी/से²`;
    if (lang === 'te') return `${ms2Match[1]} మీ/సె²`;
    if (lang === 'ta') return `${ms2Match[1]} மீ/வி²`;
  }

  const mMatch = str.match(/^([-+]?\d+(\.\d+)?)\s*m$/i);
  if (mMatch) {
    if (lang === 'hi') return `${mMatch[1]} मीटर`;
    if (lang === 'te') return `${mMatch[1]} మీటర్లు`;
    if (lang === 'ta') return `${mMatch[1]} மீட்டர்`;
  }

  const nMatch = str.match(/^([-+]?\d+(\.\d+)?)\s*N$/i);
  if (nMatch) {
    if (lang === 'hi') return `${nMatch[1]} N (न्यूटन)`;
    if (lang === 'te') return `${nMatch[1]} N (న్యూటన్లు)`;
    if (lang === 'ta') return `${nMatch[1]} N (நியூட்டன்)`;
  }

  return translateTextWithGlossary(str, lang);
}

/**
 * Translates any arbitrary question string using terminology substitutions
 */
export function translateTextWithGlossary(text, lang) {
  if (!text || lang === 'en') return text;
  const dict = SCIENTIFIC_TERMS[lang];
  if (!dict) return text;

  let translated = text;
  for (const [enTerm, localTerm] of Object.entries(dict)) {
    const regex = new RegExp(`\\b${enTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    translated = translated.replace(regex, localTerm);
  }
  return translated;
}

/**
 * Translates a complete question stem using Regex Patterns or Fallback Dictionary
 */
export function translateQuestionStem(rawQ, lang = 'en') {
  if (!rawQ || lang === 'en') return rawQ;
  let q = rawQ.trim();
  let prefixTrans = '';

  for (const p of QUESTION_PREFIXES) {
    if (q.startsWith(p.en)) {
      prefixTrans = p[lang] + ' ';
      q = q.slice(p.en.length).trim();
      break;
    }
  }

  for (const pat of QUESTION_PATTERNS) {
    const match = q.match(pat.regex);
    if (match) {
      return prefixTrans + pat.render(match, lang);
    }
  }

  // Fallback: translate chapter names and terms
  for (const [enChap, locObj] of Object.entries(CHAPTER_NAMES_I18N)) {
    if (q.includes(enChap)) {
      q = q.replaceAll(enChap, locObj[lang]);
    }
  }
  return prefixTrans + translateTextWithGlossary(q, lang);
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
      chapter: translateChapterName(q.chapter || '', lang),
      subject: translateTextWithGlossary(q.subject || '', lang),
    };
  }

  // 2. High-Performance Template-Matching Vernacular Localizer
  const localizedQuestion = translateQuestionStem(q.question, lang);
  const localizedExplanation = translateTextWithGlossary(q.explanation || '', lang);

  let localizedOptions = q.options;
  if (Array.isArray(q.options)) {
    localizedOptions = q.options.map((opt) => translateOptionString(opt, lang));
  }

  const optA = translateOptionString(q.option_a, lang);
  const optB = translateOptionString(q.option_b, lang);
  const optC = translateOptionString(q.option_c, lang);
  const optD = translateOptionString(q.option_d, lang);

  return {
    ...q,
    question: localizedQuestion,
    options: localizedOptions,
    option_a: optA,
    option_b: optB,
    option_c: optC,
    option_d: optD,
    explanation: localizedExplanation,
    chapter: translateChapterName(q.chapter || '', lang),
    subject: translateTextWithGlossary(q.subject || '', lang),
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
