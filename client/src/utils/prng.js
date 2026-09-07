/**
 * Mulberry32 Seeded Pseudo-Random Number Generator (PRNG)
 * 
 * Ensures reproducible, deterministic question generation and simulation
 * constraints for live hackathon demos when VITE_DEMO_MODE=true.
 */

// Default demo seed (Hex for 'DEMO' / 0x44454D4F)
export const DEFAULT_DEMO_SEED = 0x44454d4f;

const envDemoMode =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DEMO_MODE) ??
  (typeof process !== 'undefined' && process.env && process.env.VITE_DEMO_MODE);

export const isDemoMode = envDemoMode === 'true' || envDemoMode === true;

/**
 * Creates a mulberry32 32-bit generator function for a given integer seed.
 * Produces deterministic numbers in [0, 1).
 */
export function createMulberry32(initialSeed = DEFAULT_DEMO_SEED) {
  let s = (typeof initialSeed === 'number' ? initialSeed : DEFAULT_DEMO_SEED) >>> 0;
  return function mulberry32() {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Active singleton generator for the session
let globalGenerator = createMulberry32(DEFAULT_DEMO_SEED);

/**
 * Resets the demo PRNG generator back to the initial seed
 */
export function resetDemoSeed(seed = DEFAULT_DEMO_SEED) {
  globalGenerator = createMulberry32(seed);
}

/**
 * Returns a pseudo-random float in [0, 1).
 * If VITE_DEMO_MODE is true, uses Mulberry32 PRNG.
 * Otherwise falls back to native Math.random().
 */
export function seededRandom() {
  if (isDemoMode) {
    return globalGenerator();
  }
  return Math.random();
}

/**
 * Deterministically generates an integer in [min, max)
 */
export function seededInt(min, max) {
  return Math.floor(seededRandom() * (max - min)) + min;
}

/**
 * Picks a random item from an array using the PRNG
 */
export function seededChoice(arr) {
  if (!arr || arr.length === 0) return undefined;
  const index = Math.floor(seededRandom() * arr.length);
  return arr[index];
}

/**
 * Deterministic Fisher-Yates shuffle of an array
 */
export function seededShuffle(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
