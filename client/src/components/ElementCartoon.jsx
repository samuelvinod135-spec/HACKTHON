import React from 'react';
import { getElementBySymbol, ELEMENT_AFFINITIES } from '../data/elementsAnimeData.js';

/**
 * Cartoon character mascot component for elements and compounds.
 * Renders unique anime chibi champions for all 118 elements inspired by
 * the anime periodic table poster, plus custom compound characters.
 */
export default function ElementCartoon({ formula = '', size = 'md', className = '' }) {
  const norm = formula.replace(/[0-9()]/g, '').trim();
  const f = formula.trim();

  // Dimension scaling
  const dim = size === 'lg' ? 48 : size === 'sm' ? 24 : 34;

  // Check if this matches one of our 118 periodic table elements
  const el = getElementBySymbol(norm) || getElementBySymbol(f);

  if (el) {
    const aff = ELEMENT_AFFINITIES[el.affinity] || ELEMENT_AFFINITIES.AERO;
    const baseColor = el.colorHex || aff.color;
    const theme = el.avatarTheme || 'default';

    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop select-none ${className}`}>
        {/* Background Aura / Halo */}
        <circle cx="24" cy="25" r="18" fill={`url(#el-grad-${el.number})`} stroke={baseColor} strokeWidth="2.5" />

        {/* Dynamic Anime Headwear / Crest depending on Theme */}
        {theme.includes('cloud') && (
          <g>
            <path d="M16 11 C16 6 22 6 24 9 C26 6 32 6 32 11" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="7" r="2.5" fill="#38bdf8" />
          </g>
        )}

        {theme.includes('sun') || theme.includes('monarch') || theme.includes('king') ? (
          <g>
            <polygon points="17,9 20,4 23,8 25,4 28,8 31,4 34,9" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
            <circle cx="25.5" cy="5" r="1.5" fill="#ffffff" />
          </g>
        ) : null}

        {theme.includes('flame') || theme.includes('pyro') || theme.includes('horns') || theme.includes('demon') ? (
          <g>
            <path d="M16 12 C13 7 15 3 17 5 C19 7 18 10 18 12 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
            <path d="M32 12 C35 7 33 3 31 5 C29 7 30 10 30 12 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
          </g>
        ) : null}

        {theme.includes('ninja') || theme.includes('shinobi') || theme.includes('ronin') ? (
          <g>
            <rect x="9" y="14" width="30" height="6" rx="2" fill="#0284c7" />
            <circle cx="24" cy="17" r="2.5" fill="#facc15" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="6" y1="17" x2="9" y2="17" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ) : null}

        {theme.includes('samurai') || theme.includes('knight') || theme.includes('helm') || theme.includes('paladin') ? (
          <g>
            <path d="M14 14 Q24 7 34 14 L32 17 Q24 12 16 17 Z" fill="#475569" stroke="#1e293b" strokeWidth="1" />
            <polygon points="24,6 26,11 22,11" fill="#facc15" />
          </g>
        ) : null}

        {theme.includes('kitsune') || theme.includes('wolf') || theme.includes('cat') ? (
          <g>
            <polygon points="12,14 16,5 20,13" fill={baseColor} stroke="#ffffff" strokeWidth="1" />
            <polygon points="14,12 16,8 18,12" fill="#fed7aa" />
            <polygon points="36,14 32,5 28,13" fill={baseColor} stroke="#ffffff" strokeWidth="1" />
            <polygon points="34,12 32,8 30,12" fill="#fed7aa" />
          </g>
        ) : null}

        {theme.includes('valkyrie') || theme.includes('angel') || theme.includes('winged') ? (
          <g>
            <path d="M10 18 Q5 12 12 9 Q11 15 15 16" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.2" />
            <path d="M38 18 Q43 12 36 9 Q37 15 33 16" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.2" />
          </g>
        ) : null}

        {theme.includes('golem') || theme.includes('titan') || theme.includes('steampunk') ? (
          <g>
            <rect x="14" y="8" width="20" height="4" rx="2" fill="#334155" />
            <circle cx="20" cy="10" r="1.5" fill="#facc15" />
            <circle cx="28" cy="10" r="1.5" fill="#facc15" />
          </g>
        ) : null}

        {/* Eyes: Dynamic Expression */}
        {theme.includes('spark') || theme.includes('star') ? (
          <g fill="#0284c7">
            <polygon points="17,21 18,23 20,23 18.5,24.5 19,26.5 17,25 15,26.5 15.5,24.5 14,23 16,23" />
            <polygon points="31,21 32,23 34,23 32.5,24.5 33,26.5 31,25 29,26.5 29.5,24.5 28,23 30,23" />
          </g>
        ) : theme.includes('ninja') || theme.includes('rogue') || theme.includes('assassin') ? (
          <g>
            {/* Focused piercing anime eyes */}
            <path d="M15 22 L20 25 L16 26 Z" fill="#0f172a" />
            <path d="M33 22 L28 25 L32 26 Z" fill="#0f172a" />
            <circle cx="17.5" cy="23.5" r="1" fill="#ffffff" />
            <circle cx="30.5" cy="23.5" r="1" fill="#ffffff" />
          </g>
        ) : (
          <g>
            {/* Big Shiny Kawaii Anime Eyes */}
            <circle cx="18" cy="24" r="4.2" fill="#0f172a" />
            <circle cx="30" cy="24" r="4.2" fill="#0f172a" />
            <circle cx="19.2" cy="22.5" r="1.6" fill="#ffffff" />
            <circle cx="31.2" cy="22.5" r="1.6" fill="#ffffff" />
            <circle cx="16.8" cy="25.2" r="0.8" fill="#ffffff" />
            <circle cx="28.8" cy="25.2" r="0.8" fill="#ffffff" />
          </g>
        )}

        {/* Rosy Anime Cheeks */}
        <circle cx="13" cy="29" r="2.5" fill="#f43f5e" opacity="0.55" />
        <circle cx="35" cy="29" r="2.5" fill="#f43f5e" opacity="0.55" />

        {/* Happy Anime Mouth */}
        <path d="M21 31 Q24 35 27 31" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Affinity Mini Badge in bottom right */}
        <g transform="translate(28, 28) scale(0.65)">
          <circle cx="12" cy="12" r="11" fill="#ffffff" stroke={aff.color} strokeWidth="2.5" />
          <text x="12" y="16" fontSize="12" textAnchor="middle" fill="#0f172a" fontWeight="bold">
            {aff.icon}
          </text>
        </g>

        <defs>
          <linearGradient id={`el-grad-${el.number}`} x1="10" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.65" stopColor={aff.bg} />
            <stop offset="1" stopColor={baseColor} stopOpacity="0.85" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Compound Avatars (Water, Acids, Benzene, Salts)
  if (norm.includes('C6H5') || norm.includes('Benzene') || f.includes('C6H6')) {
    // Benzene Ring Champion: Hexagonal shield mascot
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        <polygon points="24,6 38,15 38,33 24,42 10,33 10,15" fill="url(#bz-grad)" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="9" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3 2" fill="none" />
        <circle cx="20" cy="22" r="2.5" fill="#0f172a" />
        <circle cx="28" cy="22" r="2.5" fill="#0f172a" />
        <circle cx="21" cy="21" r="1" fill="#ffffff" />
        <circle cx="29" cy="21" r="1" fill="#ffffff" />
        <path d="M22 28 Q24 31 26 28" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="bz-grad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm.includes('HCl') || norm.includes('H2SO4') || norm.includes('HNO3')) {
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        <path d="M24 6 C24 6 10 22 10 30 C10 38 16 43 24 43 C32 43 38 38 38 30 C38 22 24 6 24 6 Z" fill="url(#acid-grad)" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="18" cy="28" r="3" fill="#0c4a6e" />
        <circle cx="30" cy="28" r="3" fill="#0c4a6e" />
        <circle cx="19" cy="27" r="1.2" fill="#ffffff" />
        <circle cx="31" cy="27" r="1.2" fill="#ffffff" />
        <path d="M20 35 Q25 38 28 34" stroke="#0c4a6e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="acid-grad" x1="12" y1="8" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#bae6fd" />
            <stop offset="1" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Default Expressive Mascot
  return (
    <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
      <circle cx="24" cy="25" r="18" fill="url(#def-chem-grad)" stroke="#0ea5e9" strokeWidth="2.5" />
      <path d="M12 18 Q24 10 36 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" fill="none" />
      <circle cx="18" cy="23" r="3.5" fill="#0f172a" />
      <circle cx="30" cy="23" r="3.5" fill="#0f172a" />
      <circle cx="19" cy="21.5" r="1.4" fill="#ffffff" />
      <circle cx="31" cy="21.5" r="1.4" fill="#ffffff" />
      <path d="M19 30 Q24 35 29 30" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="28" r="2.5" fill="#facc15" opacity="0.8" />
      <circle cx="34" cy="28" r="2.5" fill="#facc15" opacity="0.8" />
      <defs>
        <linearGradient id="def-chem-grad" x1="10" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e0f2fe" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
