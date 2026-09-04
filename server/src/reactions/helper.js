// Compact reaction tuple → full reaction object
// [inputs[], conditions[], outputs[], observationKey, equation]
export function R(row) {
  const [inputs, conditions, outputs, observation, equation] = row;
  return {
    inputs,
    conditions,
    outputs,
    observation: observation || 'heat_light',
    equation: equation || `${inputs.join(' + ')}  ${conditions.length ? `[${conditions.join(', ')}]` : ''} -> ${outputs.join(' + ')}`,
  };
}

export function combine(...groups) {
  return groups.flat();
}
