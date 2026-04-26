import type { EAAs, FineliEnergyDistribution, FineliPreset } from '../types';

export const fineliPresets: FineliPreset[] = [
  '',
  'Fruits',
  'Vegetables',
  'Nuts & seeds',
  'Legumes (wet & dry)',
  'Grains',
  'Animal products',
  'Visan energia',
  // ANIMALS
];

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
