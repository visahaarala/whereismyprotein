import type { FineliEnergyDistribution } from '../types';

export const distributionKeys: (keyof FineliEnergyDistribution)[] = [
  'fiber',
  'fat',
  'protein',
  'sugar',
];

export const PERCENTAGE_MARGIN = 5;
