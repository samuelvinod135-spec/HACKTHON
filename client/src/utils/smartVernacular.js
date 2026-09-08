import React from 'react';

/**
 * Curated Scientific Technical Keywords Registry
 * 
 * Crucial Pedagogical Rule: These terms must strictly remain in English even when 
 * the surrounding conceptual narrative is rendered in regional vernacular (Tamil, Hindi),
 * ensuring students retain standardized JEE/NEET/NCERT exam nomenclature.
 */
export const ENGLISH_TECH_KEYWORDS = [
  'Enthalpy',
  'Velocity',
  'Thermodynamics',
  'Exothermic',
  'Endothermic',
  'Stoichiometry',
  'Electronegativity',
  'Refraction',
  'Kinematics',
  'Oxidation',
  'Reduction',
  'Catalyst',
  'Activation Energy',
  'Spectrophotometry',
  'Titration',
  'Molarity',
  'Molar Mass',
  'Biconvex Lens',
  'Focal Length',
  'Simple Pendulum',
  'Momentum',
  'Harmonic',
  'Precipitate',
  'Magnesium Oxide',
  'Magnesium Ribbon',
  'Oxygen',
  'Bunsen Burner',
  'Electrolysis',
  'Cauchy Dispersion',
  'Arrhenius Equation',
  "Snell's Law",
  "Newton's Prism",
  'Refractive Index',
  'Angle of Repose',
  'Spring Constant',
  'Diverging Lens',
  'Convex Lens',
  'Concave Lens',
  'Equilibrium',
  'Entropy',
  'Gibbs Free Energy',
  'Le Chatelier',
];

// Build regex dynamically with longest keywords first to prevent partial word collisions
const KEYWORD_PATTERN = new RegExp(
  `\\b(${[...ENGLISH_TECH_KEYWORDS].sort((a, b) => b.length - a.length).map((k) => k.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`,
  'gi'
);

/**
 * Renders vernacular text while strictly preserving and visually highlighting
 * English scientific technical keywords.
 * 
 * @param {string} text - The input text in regional language (or English)
 * @param {boolean} [isVernacularMode=true] - Whether Smart Vernacular mode is active
 * @returns {React.ReactNode} Array of React nodes with highlighted keywords
 */
export function renderSmartVernacular(text, isVernacularMode = true) {
  if (!text || typeof text !== 'string') return text;
  if (!isVernacularMode) return text;

  const parts = [];
  let lastIndex = 0;
  let match;

  // Reset regex state
  KEYWORD_PATTERN.lastIndex = 0;

  while ((match = KEYWORD_PATTERN.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = KEYWORD_PATTERN.lastIndex;

    // Push text preceding the technical keyword
    if (matchStart > lastIndex) {
      parts.push(text.substring(lastIndex, matchStart));
    }

    const keyword = match[0];
    parts.push(
      React.createElement(
        'span',
        {
          key: `tech-kw-${matchStart}`,
          className:
            'mx-0.5 inline-flex items-center gap-1 rounded-md border border-sky-200 bg-sky-50 px-1.5 py-0.5 font-mono text-[11px] font-black text-sky-800 shadow-xs transition hover:border-sky-400 hover:bg-sky-100',
          title: 'Standardized English Technical Keyword Preserved',
        },
        React.createElement('span', null, keyword),
        React.createElement(
          'span',
          { className: 'text-[9px] font-extrabold text-sky-500 uppercase tracking-tighter' },
          'EN'
        )
      )
    );

    lastIndex = matchEnd;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Checks if a string contains any of the protected English scientific technical keywords.
 */
export function containsTechnicalKeyword(text) {
  if (!text || typeof text !== 'string') return false;
  KEYWORD_PATTERN.lastIndex = 0;
  return KEYWORD_PATTERN.test(text);
}
