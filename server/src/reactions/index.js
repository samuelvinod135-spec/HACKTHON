import combination from './01_combination.js';
import decomposition from './02_decomposition.js';
import displacement from './03_displacement.js';
import doubleDisplacement from './04_doubleDisplacement.js';
import redox from './05_redox.js';
import organic from './06_organic.js';
import gasPrep from './07_gasPrep.js';
import moreCombination from './08_moreCombination.js';
import misc from './09_misc.js';
import { CHEMICALS, CATEGORIES, CONDITIONS, OBSERVATIONS, norm } from './catalog.js';

import { ALL_REACTIONS } from './massiveReactions.js';

export const REACTIONS = [
  ...ALL_REACTIONS,
  ...combination,
  ...decomposition,
  ...displacement,
  ...doubleDisplacement,
  ...redox,
  ...organic,
  ...gasPrep,
  ...moreCombination,
  ...misc,
];

export function count() {
  return REACTIONS.length;
}

// Match a reaction given a set of input formula strings and condition strings.
// inputsRequired: array of formulas (e.g. ['Mg','O2']), conditions: e.g. ['heat']
export function matchReaction(inputs, conditions = []) {
  const have = new Set(inputs.map(norm).filter(Boolean));
  const condHave = new Set(conditions.map(norm).filter(Boolean));

  // Fetch input formulas for candidates
  const candidates = REACTIONS.filter((r) => {
    // every required input must be present
    const need = r.inputs.filter(Boolean);
    if (need.length !== have.size) return false;
    for (const n of need) {
      if (!have.has(norm(n))) return false;
    }
    return true;
  });

  if (candidates.length === 0) return null;

  // Prefer exact condition match, then any, then first
  const exact = candidates.find(
    (r) =>
      r.conditions.filter(Boolean).length === condHave.size &&
      r.conditions.filter(Boolean).every((c) => condHave.has(norm(c)))
  );
  if (exact) return exact;

  const withCond = candidates.find(
    (r) => r.conditions.filter(Boolean).every((c) => condHave.has(norm(c)))
  );
  if (withCond) return withCond;

  return candidates[0];
}

export function categories() {
  return CATEGORIES;
}

export function catalog() {
  return CHEMICALS;
}

export function conditions() {
  return CONDITIONS;
}

export function observations() {
  return OBSERVATIONS;
}
