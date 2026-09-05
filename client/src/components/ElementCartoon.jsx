import React from 'react';

/**
 * Cartoon character mascot component for elements and compounds.
 * Gives each chemical a friendly, tactile, and educational personality.
 */
export default function ElementCartoon({ formula = '', size = 'md', className = '' }) {
  const norm = formula.replace(/[0-9()]/g, '').trim();
  const f = formula.trim();

  // Dimension scaling
  const dim = size === 'lg' ? 44 : size === 'sm' ? 24 : 32;

  // Custom Cartoon Avatars for Key Elements
  if (norm === 'Na' || f === 'Na') {
    // Sodium: Hyperactive, fiery energetic spark mascot with flame tuft and rosy cheeks
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Head/Body: Warm energetic amber-golden glow */}
        <circle cx="24" cy="26" r="18" fill="url(#na-grad)" stroke="#f59e0b" strokeWidth="2.5" />
        {/* Spark/Flame Hair Tuft */}
        <path d="M24 8 C22 14 17 14 19 19 C22 17 26 17 29 19 C31 14 26 14 24 8 Z" fill="#facc15" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="24" cy="13" r="2.5" fill="#ffffff" />
        {/* Excited Eyes ( > < ) */}
        <path d="M16 23 L20 26 L16 29" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 23 L28 26 L32 29" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Rosy Cheeks */}
        <circle cx="14" cy="30" r="3" fill="#f87171" opacity="0.6" />
        <circle cx="34" cy="30" r="3" fill="#f87171" opacity="0.6" />
        {/* Big Happy Open Mouth */}
        <path d="M21 31 Q24 37 27 31 Z" fill="#78350f" />
        <path d="M22 34 Q24 36 26 34" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
        {/* Sparkle Glint */}
        <path d="M37 13 L39 16 L42 16 L39.5 18 L40.5 21 L37 19 L33.5 21 L34.5 18 L32 16 L35 16 Z" fill="#fef08a" />
        <defs>
          <linearGradient id="na-grad" x1="12" y1="12" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#fde047" />
            <stop offset="1" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'Ca' || f === 'Ca') {
    // Calcium: Sturdy chalk-white/cream shield mascot with confident wink and tooth gleam
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Shield/Bone Shaped Head */}
        <rect x="8" y="10" width="32" height="30" rx="14" fill="url(#ca-grad)" stroke="#94a3b8" strokeWidth="2.5" />
        {/* Cute Bone Crown Accent */}
        <path d="M16 11 Q20 7 24 10 Q28 7 32 11" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Left Eye: Confident Wink ( ^ ) */}
        <path d="M16 25 Q19 21 22 25" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Right Eye: Big Shiny Open Eye */}
        <circle cx="30" cy="24" r="4.5" fill="#334155" />
        <circle cx="31.5" cy="22.5" r="1.8" fill="#ffffff" />
        <circle cx="28.5" cy="25.5" r="0.8" fill="#ffffff" />
        {/* Confident Smile with Tooth Gleam */}
        <path d="M19 32 Q24 37 29 32" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <polygon points="29,30 32,32 29,34" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
        {/* Rosy Blush */}
        <ellipse cx="14" cy="29" rx="2.5" ry="1.5" fill="#fecaca" />
        <ellipse cx="34" cy="29" rx="2.5" ry="1.5" fill="#fecaca" />
        <defs>
          <linearGradient id="ca-grad" x1="10" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.7" stopColor="#f8fafc" />
            <stop offset="1" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'Zn' || f === 'Zn') {
    // Zinc: Silvery metallic helmet buddy with star-sparkle eyes (★_★)
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Silvery Metallic Round Head */}
        <circle cx="24" cy="25" r="18" fill="url(#zn-grad)" stroke="#64748b" strokeWidth="2.5" />
        {/* Metallic Specular Highlight Curve */}
        <path d="M12 18 Q24 10 36 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" fill="none" />
        {/* Star Eyes (★ ★) */}
        <g fill="#0284c7">
          <polygon points="18,19 19.5,23 23,23 20.5,25.5 21.5,29.5 18,27 14.5,29.5 15.5,25.5 13,23 16.5,23" />
          <polygon points="30,19 31.5,23 35,23 32.5,25.5 33.5,29.5 30,27 26.5,29.5 27.5,25.5 25,23 28.5,23" />
        </g>
        {/* Cute Cool Grin */}
        <path d="M20 32 Q24 35 28 32" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Antenna / Spark Indicator */}
        <line x1="24" y1="7" x2="24" y2="2" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="2" r="2.5" fill="#38bdf8" />
        <defs>
          <linearGradient id="zn-grad" x1="12" y1="10" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f1f5f9" />
            <stop offset="0.5" stopColor="#cbd5e1" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'Mg' || f === 'Mg') {
    // Magnesium: Radiant silvery ribbon character with curly ribbon hair and glowing flare sparks
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Silvery Luminous Head */}
        <circle cx="24" cy="26" r="17" fill="url(#mg-grad)" stroke="#94a3b8" strokeWidth="2.5" />
        {/* Ribbon Curl Hair on Top */}
        <path d="M17 14 C17 8 24 6 24 11 C24 6 31 8 31 14" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
        {/* Big Sparkling Kawaii Eyes ( ✧ ◡ ✧ ) */}
        <circle cx="17" cy="24" r="4.5" fill="#0f172a" />
        <circle cx="31" cy="24" r="4.5" fill="#0f172a" />
        {/* Star Catchlights */}
        <polygon points="17,21 18,23 20,23 18.5,24.5 19,26.5 17,25 15,26.5 15.5,24.5 14,23 16,23" fill="#ffffff" />
        <polygon points="31,21 32,23 34,23 32.5,24.5 33,26.5 31,25 29,26.5 29.5,24.5 28,23 30,23" fill="#ffffff" />
        {/* Soft Smiling Mouth */}
        <path d="M21 31 Q24 34 27 31" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Pink Glow Cheeks */}
        <circle cx="13" cy="29" r="2.5" fill="#f472b6" opacity="0.6" />
        <circle cx="35" cy="29" r="2.5" fill="#f472b6" opacity="0.6" />
        {/* Sparkle Glint in air */}
        <path d="M38 10 L39.5 13 L42 13 L40 14.5 L40.8 17 L38 15.5 L35.2 17 L36 14.5 L34 13 L36.5 13 Z" fill="#38bdf8" />
        <defs>
          <linearGradient id="mg-grad" x1="12" y1="12" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#e2e8f0" />
            <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'O' || norm === 'O2' || f === 'O2') {
    // Oxygen: Breezy cyan bubble with swirling wind cheeks and smiling eyes
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Puffy Breezy Head */}
        <circle cx="24" cy="24" r="18" fill="url(#o2-grad)" stroke="#0284c7" strokeWidth="2.5" />
        {/* Wind swirl tuft on top */}
        <path d="M24 10 C21 5 28 4 27 8" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Smiling Closed Eyes ( ᵔ ᵕ ᵔ ) */}
        <path d="M15 22 Q19 18 21 22" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M27 22 Q29 18 33 22" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Sweet Open Smile */}
        <path d="M20 28 Q24 33 28 28 Z" fill="#0369a1" />
        {/* Swirling breeze on cheeks */}
        <path d="M12 26 C13 28 15 28 16 27" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M36 26 C35 28 33 28 32 27" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="o2-grad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e0f2fe" />
            <stop offset="0.6" stopColor="#bae6fd" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'H' || norm === 'H2' || f === 'H2') {
    // Hydrogen: Lightweight floating cloud bubble buddy with big curious eyes
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Cloud/Puffy Head */}
        <path d="M16 34 C11 34 8 30 9 25 C9 20 13 18 16 18 C17 13 22 10 27 12 C31 9 37 12 37 17 C41 18 43 23 41 27 C43 32 39 34 35 34 Z" fill="url(#h2-grad)" stroke="#38bdf8" strokeWidth="2.2" />
        {/* Big Curious Kawaii Eyes */}
        <circle cx="21" cy="23" r="3.5" fill="#0f172a" />
        <circle cx="31" cy="23" r="3.5" fill="#0f172a" />
        <circle cx="22" cy="21.5" r="1.5" fill="#ffffff" />
        <circle cx="32" cy="21.5" r="1.5" fill="#ffffff" />
        {/* Tiny 'O' Mouth */}
        <circle cx="26" cy="28" r="2" fill="#0f172a" />
        {/* Little Floating Bubbles */}
        <circle cx="10" cy="14" r="2" fill="#bae6fd" />
        <circle cx="38" cy="11" r="2.5" fill="#bae6fd" />
        <defs>
          <linearGradient id="h2-grad" x1="10" y1="12" x2="38" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f0f9ff" />
            <stop offset="0.7" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#7dd3fc" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'Fe' || f === 'Fe') {
    // Iron: Sturdy metallic robot buddy with magnet horns and tough smile
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Square/Rounded Robot Head */}
        <rect x="9" y="11" width="30" height="28" rx="8" fill="url(#fe-grad)" stroke="#475569" strokeWidth="2.5" />
        {/* Magnet Horns on sides */}
        <path d="M5 18 L9 18 L9 24 L5 24 Z" fill="#ef4444" stroke="#475569" strokeWidth="1.5" />
        <path d="M39 18 L43 18 L43 24 L39 24 Z" fill="#3b82f6" stroke="#475569" strokeWidth="1.5" />
        {/* Curious Robot Screen Eyes */}
        <rect x="14" y="18" width="8" height="7" rx="2" fill="#0f172a" />
        <rect x="26" y="18" width="8" height="7" rx="2" fill="#0f172a" />
        <circle cx="18" cy="21" r="1.8" fill="#38bdf8" />
        <circle cx="30" cy="21" r="1.8" fill="#38bdf8" />
        {/* Metallic Grin */}
        <line x1="17" y1="31" x2="31" y2="31" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="fe-grad" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#cbd5e1" />
            <stop offset="0.5" stopColor="#94a3b8" />
            <stop offset="1" stopColor="#64748b" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'Cu' || f === 'Cu') {
    // Copper: Penny bronze character with warm smiling eyes
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        <circle cx="24" cy="25" r="18" fill="url(#cu-grad)" stroke="#b45309" strokeWidth="2.5" />
        <path d="M12 18 Q24 11 36 18" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" fill="none" />
        {/* Happy Eyes */}
        <circle cx="18" cy="23" r="3.5" fill="#451a03" />
        <circle cx="30" cy="23" r="3.5" fill="#451a03" />
        <circle cx="19" cy="21.5" r="1.3" fill="#ffffff" />
        <circle cx="31" cy="21.5" r="1.3" fill="#ffffff" />
        {/* Smile */}
        <path d="M19 30 Q24 35 29 30" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="28" r="2.5" fill="#f59e0b" opacity="0.6" />
        <circle cx="34" cy="28" r="2.5" fill="#f59e0b" opacity="0.6" />
        <defs>
          <linearGradient id="cu-grad" x1="10" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fed7aa" />
            <stop offset="0.5" stopColor="#fb923c" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'Cl' || norm === 'Cl2' || f === 'Cl2') {
    // Chlorine: Mischievous green gas sprite
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        <circle cx="24" cy="25" r="17" fill="url(#cl-grad)" stroke="#15803d" strokeWidth="2.5" />
        {/* Playful curved cat eyes */}
        <path d="M15 22 Q18 19 21 22" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M27 22 Q30 19 33 22" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Playful Cat mouth :3 */}
        <path d="M20 29 Q22 32 24 29 Q26 32 28 29" stroke="#14532d" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="28" r="2" fill="#86efac" />
        <circle cx="35" cy="28" r="2" fill="#86efac" />
        <defs>
          <linearGradient id="cl-grad" x1="10" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#86efac" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'MgO' || f === 'MgO') {
    // Magnesium Oxide: Fluffy powdery white ash star mascot!
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Cloud / Powdery Ash Outline */}
        <path d="M14 36 C8 36 6 30 9 25 C6 20 11 16 15 16 C17 10 24 8 28 12 C33 9 39 12 38 18 C43 19 44 26 41 30 C43 35 38 36 34 36 Z" fill="url(#mgo-grad)" stroke="#94a3b8" strokeWidth="2.2" />
        {/* Star Sparkle Catchlights */}
        <polygon points="19,20 20,22 22,22 20.5,23.5 21,25.5 19,24 17,25.5 17.5,23.5 16,22 18,22" fill="#0f172a" />
        <polygon points="29,20 30,22 32,22 30.5,23.5 31,25.5 29,24 27,25.5 27.5,23.5 26,22 28,22" fill="#0f172a" />
        {/* Innocent Happy Mouth */}
        <path d="M21 28 Q24 32 27 28" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Sparkling Glints */}
        <circle cx="39" cy="14" r="2.5" fill="#facc15" />
        <circle cx="10" cy="18" r="2" fill="#facc15" />
        <defs>
          <linearGradient id="mgo-grad" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.7" stopColor="#f8fafc" />
            <stop offset="1" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'HCl' || norm === 'H2SO4' || norm === 'HNO3') {
    // Acid: Zesty energetic droplet mascot with playful smirk
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        {/* Droplet Shape */}
        <path d="M24 6 C24 6 10 22 10 30 C10 38 16 43 24 43 C32 43 38 38 38 30 C38 22 24 6 24 6 Z" fill="url(#acid-grad)" stroke="#e11d48" strokeWidth="2.5" />
        {/* Confident Smirk Eyes */}
        <circle cx="18" cy="28" r="3" fill="#881337" />
        <circle cx="30" cy="28" r="3" fill="#881337" />
        <circle cx="19" cy="27" r="1.2" fill="#ffffff" />
        <circle cx="31" cy="27" r="1.2" fill="#ffffff" />
        {/* Playful Smirk */}
        <path d="M20 35 Q25 38 28 34" stroke="#881337" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="acid-grad" x1="12" y1="8" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fecdd3" />
            <stop offset="0.6" stopColor="#fb7185" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm === 'H2O') {
    // Water: Happy droplet character
    return (
      <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
        <path d="M24 6 C24 6 10 22 10 30 C10 38 16 43 24 43 C32 43 38 38 38 30 C38 22 24 6 24 6 Z" fill="url(#water-grad)" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="18" cy="28" r="3.5" fill="#0c4a6e" />
        <circle cx="30" cy="28" r="3.5" fill="#0c4a6e" />
        <circle cx="19" cy="26.5" r="1.5" fill="#ffffff" />
        <circle cx="31" cy="26.5" r="1.5" fill="#ffffff" />
        <path d="M20 34 Q24 38 28 34" stroke="#0c4a6e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="water-grad" x1="12" y1="8" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bae6fd" />
            <stop offset="0.6" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Default Scientific Cartoon Mascot (Round smiling buddy with safety goggles/gleam)
  return (
    <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" className={`hover-cartoon-pop ${className}`}>
      <circle cx="24" cy="25" r="18" fill="url(#def-grad)" stroke="#0284c7" strokeWidth="2.5" />
      <path d="M12 18 Q24 10 36 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" fill="none" />
      <circle cx="18" cy="23" r="3.5" fill="#0f172a" />
      <circle cx="30" cy="23" r="3.5" fill="#0f172a" />
      <circle cx="19" cy="21.5" r="1.4" fill="#ffffff" />
      <circle cx="31" cy="21.5" r="1.4" fill="#ffffff" />
      <path d="M19 30 Q24 35 29 30" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="28" r="2.5" fill="#bae6fd" opacity="0.8" />
      <circle cx="34" cy="28" r="2.5" fill="#bae6fd" opacity="0.8" />
      <defs>
        <linearGradient id="def-grad" x1="10" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0f9ff" />
          <stop offset="0.6" stopColor="#e0f2fe" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
