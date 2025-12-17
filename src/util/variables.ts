import type { EAAs, FineliEnergyDistribution } from '../types';

export const distributionKeys: (keyof FineliEnergyDistribution)[] = [
  'fiber',
  'fat',
  'protein',
  'sugar',
];

export const PERCENTAGE_MARGIN = 5;

export const eaas: (keyof EAAs)[] = [
  'tryptophan',
  'threonine',
  'isoleucine',
  'leucine',
  'lysine',
  'methionine',
  'cystine',
  'phenylalanine',
  'tyrosine',
  'valine',
  'histidine',
];
