/**
 * LabXplore Science Virtual Teaching Assistant Engine
 * 
 * Strict Domain Enforcement:
 * - Exclusively answers Physics & Chemistry queries.
 * - Out-of-bounds topics (history, programming, pure mathematics, general trivia, politics, etc.)
 *   are politely declined with the mandated fallback message.
 * - Educational, encouraging, and Socratic pedagogical tone.
 */

export const STRICT_SYSTEM_PROMPT = `You are a friendly, expert Physics and Chemistry virtual teaching assistant for the LabXplore interactive science platform.

PRIMARY DIRECTIVE:
You must ONLY answer questions, explain concepts, or provide help strictly related to Physics and Chemistry (including optics, mechanics, thermodynamics, waves, electromagnetism, chemical reactions, stoichiometry, atomic theory, and laboratory experiments).

OUT-OF-BOUNDS HANDLING:
If a user asks a question about any other topic (such as history, programming, pure mathematics without physics context, general knowledge, pop culture, sports, or casual conversation), you must politely decline.
You MUST respond with:
"I am an expert assistant dedicated solely to Physics and Chemistry! Please ask me a question related to your science experiments or concepts."

TONE & STUDENT-FRIENDLY PEDAGOGY:
- Warm, enthusiastic, encouraging, and EASY for middle and high-school students to understand.
- Avoid overly academic, dry jargon. Use relatable analogies (e.g., sparklers for combustion, playground swings for pendulums).
- NEVER output raw, unrendered LaTeX code like \\mathbf{...}, \\text{...}, or \\xrightarrow{...}.
- Always format chemical equations clearly and cleanly, for example:
  [REACTION: 2Mg + O₂ → 2MgO | Magnesium + Oxygen → Magnesium Oxide]
- Clearly explain: (1) What goes in (reactants), (2) What you see in the lab (observations like bright light or ash), and (3) What comes out (products).
- Connect explanations to interactive experiments on the LabXplore canvas.`;

export const FALLBACK_DECLINE_MESSAGE =
  'I am an expert assistant dedicated solely to Physics and Chemistry! Please ask me a question related to your science experiments or concepts.';

// Science domain keywords and concept categories
const SCIENCE_DOMAINS = [
  // Physics - Optics
  'optic', 'lens', 'convex', 'concave', 'refraction', 'reflection', 'snell', 'focal',
  'prism', 'dispersion', 'wavelength', 'spectrum', 'rainbow', 'cauchy', 'light', 'ray',
  'mirror', 'focal length', 'diffraction', 'interference', 'laser', 'index of refraction',
  // Physics - Mechanics
  'pendulum', 'gravity', 'mass', 'velocity', 'acceleration', 'force', 'friction', 'incline',
  'ramp', 'projectile', 'trajectory', 'hooke', 'spring', 'pulley', 'torque', 'momentum',
  'kinetic energy', 'potential energy', 'work', 'newton', 'period', 'oscillation', 'weight',
  'mechanics', 'damping', 'air resistance',
  // Physics - Waves & Acoustics
  'wave', 'frequency', 'amplitude', 'period', 'doppler', 'sound', 'harmonic', 'standing wave',
  'hertz', 'vibration', 'resonance',
  // Physics - Electromagnetism & Modern
  'circuit', 'ohm', 'voltage', 'current', 'resistance', 'magnet', 'lorentz', 'flux',
  'electric field', 'magnetic field', 'coulomb', 'electron', 'proton', 'neutron', 'photon',
  'quantum', 'thermodynamics', 'entropy', 'heat', 'temperature', 'conduction', 'convection',
  // Chemistry - General & Reactions
  'chemical', 'reaction', 'reactant', 'product', 'combustion', 'precipitate', 'effervescence',
  'catalyst', 'stoichiometry', 'molar', 'mole', 'acid', 'base', 'ph', 'titration', 'neutralization',
  'oxidation', 'reduction', 'redox', 'synthesis', 'decomposition', 'single replacement', 'double replacement',
  // Chemistry - Chemicals & Compounds
  'magnesium', 'mgo', 'oxygen', 'hydrogen', 'chlorine', 'hydrochloric', 'hcl', 'naoh', 'sodium',
  'calcium', 'co2', 'carbon dioxide', 'limewater', 'ash', 'oxide', 'element', 'compound', 'atom',
  'molecule', 'valence', 'periodic table', 'metal', 'nonmetal', 'bond', 'ionic', 'covalent',
  // Lab / Experiment references
  'lab', 'experiment', 'beaker', 'test tube', 'crucible', 'bunsen', 'apparatus', 'calibrat',
];

// Topics explicitly considered non-science (out-of-bounds)
const OUT_OF_BOUNDS_KEYWORDS = [
  // Programming & Tech
  'python', 'javascript', 'html', 'css', 'react', 'java', 'c++', 'sql', 'coding', 'code',
  'debug', 'algorithm', 'software', 'programming', 'function in python', 'loop in js',
  // History & Social Studies
  'world war', 'ancient rome', 'president', 'dynasty', 'revolution in 17', 'french revolution',
  'cold war', 'civil war', 'monarchy', 'emperor', 'history of',
  // Pure Mathematics (non-physics)
  'calculus proof', 'derivative of x^3', 'integral of tan', 'pythagorean proof', 'matrix multiplication',
  'linear algebra determinant', 'quadratic formula history',
  // Pop Culture & General
  'movie', 'actor', 'song', 'celebrity', 'football', 'soccer', 'nba', 'recipe', 'cooking pasta',
  'weather in new york', 'stock market', 'bitcoin', 'crypto', 'dating advice', 'joke about animals',
];

function matchesKeyword(text, keyword) {
  // Escape regex characters except spaces
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'i');
  return regex.test(text);
}

/**
 * Checks whether a user message belongs to the Physics or Chemistry domain.
 */
export function classifyScienceIntent(message) {
  if (!message || typeof message !== 'string') return false;
  const text = message.toLowerCase().trim();

  // Allow friendly science greetings or asking who the bot is
  if (/^(hi|hello|hey|help|who are you|what can you do|good morning|good afternoon)[!?.]*$/i.test(text)) {
    return 'GREETING';
  }

  // Check for distinct out-of-bounds topics first
  const hasOutOfBounds = OUT_OF_BOUNDS_KEYWORDS.some((kw) => matchesKeyword(text, kw));
  if (hasOutOfBounds) {
    // Only allow if there's clear explicit physics or chemistry context that isn't just a coding or general question
    const hasStrongScience = SCIENCE_DOMAINS.some((kw) => matchesKeyword(text, kw));
    // If the question is asking how to code/program something or about history, decline even if it mentions a physics word
    if (!hasStrongScience || text.includes('code') || text.includes('function') || text.includes('python') || text.includes('javascript')) {
      return false;
    }
  }

  // Check for science domain keywords with word boundaries
  const isScience = SCIENCE_DOMAINS.some((kw) => matchesKeyword(text, kw));
  return isScience;
}

/**
 * Generate contextual suggested prompts based on the user's current location in LabXplore.
 */
export function getContextPrompts(context = {}) {
  const { path = '', activeExperiment = '' } = context;

  if (path.includes('/physics')) {
    if (activeExperiment && activeExperiment.toLowerCase().includes('optic')) {
      return [
        "Why do light rays converge when passing through a convex lens?",
        "What is Snell's Law and how do I calculate the refracted angle?",
        "How does focal length change the distance of the real image?",
        "Why does a triangular prism disperse white light into a rainbow?",
      ];
    }
    if (activeExperiment && activeExperiment.toLowerCase().includes('pendulum')) {
      return [
        "Why doesn't the bob's mass affect the period of a simple pendulum?",
        "How do I double the period of a pendulum using string length?",
        "What happens to the pendulum's oscillation frequency on the Moon?",
        "Where is kinetic energy maximum during a pendulum swing?",
      ];
    }
    return [
      "How does Snell's Law govern refraction in convex lenses?",
      "What formula calculates the period of a simple pendulum?",
      "Why is a 45° launch angle optimal for maximum projectile range?",
      "How does Hooke's Law explain spring oscillations?",
    ];
  }

  if (path.includes('/chemistry')) {
    return [
      "Why does Magnesium burn with a blinding, dazzling white light?",
      "What is the balanced equation for Magnesium combustion (2Mg + O₂)?",
      "What chemical substance makes up the white ash residue?",
      "What is the difference between an exothermic and endothermic reaction?",
    ];
  }

  if (path.includes('/daily-challenge')) {
    return [
      "Can you give me a hint for today's laboratory challenge?",
      "How do I calibrate the optical focus for the Day 1 challenge?",
      "What is the target period for the Day 2 pendulum task?",
      "Explain the Cauchy dispersion equation for the Newton's Prism task.",
    ];
  }

  if (path.includes('/mock-tests')) {
    return [
      "Can you explain the difference between rare and dense optical media?",
      "How does Snell's Law determine bending towards or away from normal?",
      "What is the difference between a real and virtual image?",
      "Can you review the key formulas for kinematics and lenses?",
    ];
  }

  // Default platform prompts
  return [
    "How does refraction work in a convex lens?",
    "Why does magnesium combustion produce a dazzling white flare?",
    "What determines the period of a pendulum?",
    "Can you explain Newton's second law of motion?",
  ];
}

/**
 * Built-in pedagogical Socratic Science AI response generator.
 * Provides high-accuracy, encouraging answers for physics and chemistry questions.
 */
export function generateScienceResponse(message, context = {}) {
  const intent = classifyScienceIntent(message);

  // 1. Out-of-bounds handling
  if (!intent) {
    return {
      reply: FALLBACK_DECLINE_MESSAGE,
      isScienceRelated: false,
      suggestedPrompts: getContextPrompts(context),
    };
  }

  // 2. Greeting / identity handler
  if (intent === 'GREETING') {
    const contextMention = context.activeExperiment
      ? ` I see you are currently in the **${context.activeExperiment}** workspace!`
      : context.path?.includes('/physics')
      ? ' I see you are exploring the **Physics Laboratory**!'
      : context.path?.includes('/chemistry')
      ? ' I see you are working in the **Chemistry Laboratory**!'
      : '';

    return {
      reply: `Hello there, young scientist! 👋 I am your **LabXplore Virtual Teaching Assistant**, dedicated exclusively to **Physics & Chemistry**.\n\n${contextMention}\n\nHow can I guide your scientific inquiry today? You can ask me to explain an experiment, derive a formula, or help troubleshoot your observations!`,
      isScienceRelated: true,
      suggestedPrompts: getContextPrompts(context),
    };
  }

  const query = message.toLowerCase();

  // 3. Optics & Lenses (Physics)
  if (query.includes('snell') || (query.includes('refract') && query.includes('law'))) {
    return {
      reply: `### 🔭 Snell's Law: How Light Bends! 🌊

Hey! Have you ever noticed how a straw looks bent or broken when sitting in a glass of water? That is **refraction**!

Light travels at different speeds through different materials. When light passes from air into water or glass, it slows down and pivots:

[EQUATION: n₁ · sin(θ₁) = n₂ · sin(θ₂) | Snell's Law of Refraction]

#### 💡 The Easy Rule of Thumb:
* **Air ➔ Glass (Speeding up ➔ Slowing down):** The light ray slows down and bends **towards** the normal line (the imaginary 90° line).
* **Glass ➔ Air (Slowing down ➔ Speeding up):** The light ray speeds back up and bends **away** from the normal line.

*Try dragging a Convex Lens onto the Physics canvas and shoot a laser ray through it to watch it bend right to the focal point!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "What is a focal point?",
        "Why does a glass prism make a rainbow?",
        "What is the difference between convex and concave lenses?",
      ],
    };
  }

  if (query.includes('lens') || query.includes('convex') || query.includes('concave') || query.includes('focal')) {
    return {
      reply: `### 🔍 Lenses: Convex vs. Concave Made Simple!

Lenses use curved glass to steer light rays where we want them to go:

[EQUATION: 1/f = 1/do + 1/di | The Thin Lens Equation]

#### 1. Convex Lens (The "Converging" Lens)
* **Shape:** Thicker in the middle, thinner at the edges (like an almond or magnifying glass).
* **What it does:** It pulls incoming parallel light rays together to meet at a single bright spot called the **focal point (f)**.
* **Where you see it:** Magnifying glasses, your own eye's lens, and camera lenses!

#### 2. Concave Lens (The "Diverging" Lens)
* **Shape:** Thinner in the middle, thicker at the edges (curving inward like a cave).
* **What it does:** It spreads incoming light rays outward, making objects look smaller and right-side up.
* **Where you see it:** Peepholes in front doors and eyeglasses for nearsightedness!

💡 **Try it in LabXplore:** Click the gear icon on the lens in the Physics Lab to calibrate the focal length from 80px to 280px and watch the rays refocus in real time!`,
      isScienceRelated: true,
      suggestedPrompts: [
        "How do magnifying glasses make images bigger?",
        "What is a real vs virtual image?",
        "How does Snell's Law work?",
      ],
    };
  }

  if (query.includes('prism') || query.includes('dispersion') || query.includes('rainbow') || query.includes('cauchy')) {
    return {
      reply: `### 🌈 Newton's Prism: Splitting White Light into a Rainbow!

Did you know that plain white sunlight is actually a secret mixture of all 7 rainbow colors (**VIBGYOR**)?

[EQUATION: White Light ➔ Violet + Blue + Green + Yellow + Orange + Red | Dispersion of Light]

#### Why does a triangular glass prism separate them?
* Each color of light travels as a wave with a slightly different wavelength:
  * **Violet light** has tiny, short waves (~400 nm). It bumps into glass atoms more, slows down the most, and **bends the sharpest angle**!
  * **Red light** has longer, lazy waves (~700 nm). It cruises through easily and **bends the least**.
* Because each color bends at a slightly different angle, they spread out like a fan, revealing the complete rainbow!

*In the LabXplore Physics Lab, place a triangular Prism on the canvas and switch on White Light to see all 7 colorful rays appear!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "Why is the sky blue?",
        "What is total internal reflection?",
        "How does Snell's Law explain light bending?",
      ],
    };
  }

  // 4. Mechanics (Physics)
  if (query.includes('pendulum') || query.includes('period') || query.includes('string length')) {
    return {
      reply: `### ⏱️ The Simple Pendulum: Playground Swing Physics! 🎪

Think of a pendulum just like a swing at the playground:

[EQUATION: T = 2π × √(L / g) | Pendulum Swing Time Formula]

#### The Big Surprise: Why Doesn't Mass Matter?
Whether a tiny toddler or a heavy adult sits on a swing, **the swing takes the exact same time to go back and forth!**
* Gravity pulls harder on heavier objects, but heavier objects also take more force to push (inertia).
* The mass completely cancels out!

#### What DOES change the swing time?
* **String Length (L):** A longer string takes longer to swing. To double the time (2×), you need a string **4× longer**!
* **Gravity (g):** On the Moon where gravity is weaker, the pendulum swings in slow motion!

*In the Physics Lab, drag the Pendulum slider to test different string lengths and watch the timer count the seconds!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "How do I double the swing time of a pendulum?",
        "What would happen to a pendulum on the Moon?",
        "Where is kinetic energy highest during a swing?",
      ],
    };
  }

  if (query.includes('projectile') || query.includes('trajectory') || query.includes('45')) {
    return {
      reply: `### 🎯 Projectile Motion: Launching Cannonballs! 🚀

Whenever you throw a basketball or fire a cannon, gravity constantly pulls it down while it flies forward:

[EQUATION: Range = (v² × sin(2θ)) / g | Maximum Range at 45° Launch Angle]

#### Why is 45° the magic launch angle?
* If you shoot **too high (e.g. 75°)**: It goes super high in the air, but doesn't travel forward very far.
* If you shoot **too flat (e.g. 15°)**: It travels forward quickly, but hits the ground almost immediately.
* **45° is the perfect sweet spot!** It gives the ball just enough height to stay in the air while maximizing forward speed.

*Test it on the Physics Build Canvas! Angle your cannon at 45° and see how far the ball flies!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "How does air resistance change the flight path?",
        "What is the formula for maximum height?",
        "How does launch speed affect distance?",
      ],
    };
  }

  if (query.includes('hooke') || query.includes('spring')) {
    return {
      reply: `### 🌀 Hooke's Law: Bouncy Springs! 🛋️

**Hooke's Law** tells us how springs stretch and bounce back:

[EQUATION: F = -k · x | Hooke's Elastic Restoring Force]

* **Displacement (x):** How far you pull or push the spring from its resting spot.
* **Stiffness (k):** How tough the spring is. A mattress spring has a high $k$, while a ballpoint pen spring has a low $k$.
* **The Negative Sign:** It means the spring always pulls **backward** in the opposite direction of where you pulled it!

*A heavier weight bounces slower, while a stiffer spring snaps back faster!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "What is elastic potential energy?",
        "How does damping affect spring oscillations?",
        "What happens if a spring exceeds its elastic limit?",
      ],
    };
  }

  // 5. Chemistry & Reactions
  if (query.includes('magnesium') || query.includes('mgo') || query.includes('combustion') || query.includes('white light') || query.includes('ash')) {
    return {
      reply: `### ⚗️ Burning Magnesium: A Mini Sparkler in the Lab! 🎆

Hey! Imagine holding a shiny silver strip of **Magnesium ribbon (Mg)** with tongs and holding it over a Bunsen burner flame. Here is what happens in simple, easy-to-understand science terms:

[REACTION: 2Mg + O₂ → 2MgO | Magnesium + Oxygen → Magnesium Oxide]

#### 1. What Goes In & What Happens?
* 🧲 **The Starting Materials (Reactants):**
  You take shiny **Magnesium metal (2Mg)** and let it react with **Oxygen gas (O₂)** from the air around us when heated.
* ⚡ **The Blinding White Light:**
  Once it catches fire, it burns with an **intense, dazzling white flame**—just like a holiday sparkler or camera flash! *(Safety rule: Never stare straight at it without UV goggles!)*
* 🍚 **The Ending Product (White Ash):**
  When the flame goes out, the shiny metal is completely gone! In its place, you are left with a soft, crumbly white powder: **Magnesium Oxide (2MgO)**.

#### 2. Why Does It Make So Much Light & Heat?
Magnesium atoms *really* want to give away 2 electrons, and Oxygen atoms *love* to take them. When they snap together to make **MgO**, they release a huge burst of stored chemical energy as bright light and heat (an **exothermic reaction**)!

💡 **Try it yourself right now on the canvas:**
1. Drag **Mg** and **O₂** into the **Reactants — Input** box on your left.
2. Drop the **Heat (Δ)** action arrow in the middle.
3. Click the yellow **Run Simulation** button at the top to watch the dazzling white flare explode and collect your white MgO powder!`,
      isScienceRelated: true,
      suggestedPrompts: [
        "Why is the flame so bright?",
        "What happens if we mix the white MgO ash in water?",
        "Is magnesium combustion a synthesis or decomposition reaction?",
      ],
    };
  }

  if (query.includes('precipitate') || query.includes('insoluble')) {
    return {
      reply: `### 🧪 What is a Precipitate? The Magic Solid in a Liquid! ✨

Imagine pouring two clear, see-through liquids together into a beaker... and suddenly, a **cloudy solid appears out of nowhere!** That solid is called a **precipitate**.

[REACTION: Lead Nitrate + Potassium Iodide → Lead Iodide (Yellow Solid) + Potassium Nitrate]

#### How does it work?
1. Both starting liquids have dissolved salt particles swimming freely in water.
2. When mixed, certain positive ions and negative ions attract each other so strongly that water can't hold them apart!
3. They snap together into tiny solid crystals that swirl in the liquid and slowly settle to the bottom like snow in a snowglobe.

*You can test precipitation reactions right here in the LabXplore Chemistry Lab!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "What color is a Lead Iodide precipitate?",
        "How do we separate a precipitate from liquid (filtration)?",
        "What are common solubility rules?",
      ],
    };
  }

  if (query.includes('acid') || query.includes('base') || query.includes('ph') || query.includes('neutralization')) {
    return {
      reply: `### 💧 Acids & Bases: The Ultimate Chemistry Balancing Act!

Think of acids and bases as chemical opposites:

[REACTION: HCl + NaOH → NaCl + H₂O | Hydrochloric Acid + Sodium Hydroxide → Table Salt + Water]

* **Acids (pH < 7):** Sour liquids full of active H⁺ ions (like lemon juice or vinegar).
* **Bases (pH > 7):** Bitter, slippery liquids full of OH⁻ ions (like soap or baking soda).
* **Neutralization:** When you mix an acid and a base together in the right amounts, the H⁺ and OH⁻ join hands to make pure **neutral Water (H₂O)** and ordinary **Salt (NaCl)**!

💡 *Neutralization also releases gentle warmth, which is why the test tube feels warm to the touch!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "What is the pH scale?",
        "What happens when you mix vinegar and baking soda?",
        "How do pH indicators change colors?",
      ],
    };
  }

  if (query.includes('newton') && (query.includes('law') || query.includes('first') || query.includes('second') || query.includes('third'))) {
    return {
      reply: `### 🍎 Newton's 3 Laws of Motion: The Rules of the Universe!

Sir Isaac Newton figured out the 3 basic rules for how everything in the universe moves:

[EQUATION: Force = Mass × Acceleration | F = m · a]

1. **Law of Laziness (Inertia):**
   Things keep doing what they are already doing! A soccer ball won't move until you kick it, and once rolling in space, it would never stop unless gravity or friction slows it down.
2. **The Push Equation (F = m · a):**
   Heavy things take a bigger push to speed up! Kicking a bowling ball takes way more muscle than kicking a balloon.
3. **Action & Reaction:**
   Whenever you push something, it pushes right back on you! When you jump off a skateboard, your feet push the board backward as you fly forward.

*In the LabXplore Physics sandbox, toggle zero gravity to watch Newton's inertia in pure action!*`,
      isScienceRelated: true,
      suggestedPrompts: [
        "What is the difference between mass and weight?",
        "How does friction stop moving objects?",
        "How does a rocket fly using Newton's third law?",
      ],
    };
  }

  // 6. Generic Science Assistant Fallback (Encouraging and Educational)
  return {
    reply: `### 🔬 Let's Explore "${message.trim()}" Together! 🌟

That is an awesome science question!

Here is how scientists break down ideas like this:
1. **The Core Clue:** What forces, rays of light, or chemical particles are at work here?
2. **The Nature Rule:** Is energy moving, turning into heat, or being saved?
3. **Try it in LabXplore:** You can set up an experiment right now on the canvas to see it with your own eyes!

Which specific part would you like to explore deeper? I can explain how the math works, give you an experiment tip, or walk through what happens step by step!`,
      isScienceRelated: true,
      suggestedPrompts: getContextPrompts(context),
    };
}

/**
 * Call Google Gemini API using the provided API key.
 */
export async function callGeminiAPI(apiKey, message, context = {}) {
  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const systemInstruction = `${STRICT_SYSTEM_PROMPT}

CURRENT LAB CONTEXT:
The student is currently active in:
- Path: ${context.path || '/chemistry'}
- Experiment: ${context.activeExperiment || 'General Science'}
- Title: ${context.title || 'LabXplore'}

CRITICAL FORMATTING RULES:
1. Keep the tone warm, exciting, clear, and easy for students to understand.
2. NEVER output raw LaTeX backslashes (no \\mathbf, no \\text, no \\xrightarrow).
3. If writing a chemical reaction, format it as: [REACTION: 2Mg + O2 -> 2MgO | Magnesium + Oxygen -> Magnesium Oxide].
4. If writing a physics formula, format it as: [EQUATION: n1 * sin(θ1) = n2 * sin(θ2) | Snell's Law].`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 1024,
      },
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) {
    throw new Error('Gemini API returned empty candidate text');
  }

  const isDecline = text.includes(FALLBACK_DECLINE_MESSAGE);
  return {
    reply: text,
    isScienceRelated: !isDecline,
    suggestedPrompts: getContextPrompts(context),
    source: 'gemini',
    model,
  };
}

/**
 * Top-level message processor.
 * Connects to Google Gemini API (if key is configured), OpenAI, or falls back to local Science Teaching Engine.
 */
export async function processChatMessage(message, context = {}, overrideApiKey = '') {
  // Pre-check strict domain guardrails
  const intent = classifyScienceIntent(message);
  if (!intent) {
    return {
      reply: FALLBACK_DECLINE_MESSAGE,
      isScienceRelated: false,
      suggestedPrompts: getContextPrompts(context),
      source: 'guardrail',
    };
  }

  // 1. Check for Gemini API key (passed from client or environment)
  const geminiKey =
    overrideApiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY;

  if (geminiKey) {
    try {
      return await callGeminiAPI(geminiKey, message, context);
    } catch (err) {
      console.warn('Gemini API error, falling back to local science engine:', err.message);
    }
  }

  // 2. Check for OpenAI API key
  if (process.env.OPENAI_API_KEY) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: STRICT_SYSTEM_PROMPT },
            {
              role: 'system',
              content: `Active user context: ${JSON.stringify(context)}. Keep response educational, encouraging, and strictly within Physics and Chemistry.`,
            },
            { role: 'user', content: message },
          ],
          temperature: 0.3,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          const isDecline = reply.includes(FALLBACK_DECLINE_MESSAGE);
          return {
            reply,
            isScienceRelated: !isDecline,
            suggestedPrompts: getContextPrompts(context),
            source: 'openai',
          };
        }
      }
    } catch (err) {
      console.warn('OpenAI request failed, falling back to local science engine:', err.message);
    }
  }

  // 3. High-accuracy local science teaching assistant engine
  return generateScienceResponse(message, context);
}

