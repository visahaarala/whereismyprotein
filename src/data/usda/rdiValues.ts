import type { EAAs } from '../../types';

// Essential Amino Acids
// WHO values
// source: https://en.wikipedia.org/wiki/Essential_amino_acid
// rdi: mg per kg body weight
const eaas: {
  names: (keyof EAAs)[];
  abbreviations: string[];
  rdi: number; // mg per kg
}[] = [
  {
    names: ['histidine'],
    abbreviations: ['H'],
    rdi: 10,
  },
  {
    names: ['isoleucine'],
    abbreviations: ['I'],
    rdi: 20,
  },
  {
    names: ['leucine'],
    abbreviations: ['L'],
    rdi: 39,
  },
  {
    names: ['lysine'],
    abbreviations: ['K'],
    rdi: 30,
  },
  {
    names: ['methionine', 'cystine'],
    abbreviations: ['M', 'C'],
    rdi: 14.5,
  },
  {
    names: ['phenylalanine', 'tyrosine'],
    abbreviations: ['F', 'Y'],
    rdi: 25,
  },
  {
    names: ['threonine'],
    abbreviations: ['T'],
    rdi: 15,
  },
  {
    names: ['tryptophan'],
    abbreviations: ['W'],
    rdi: 4,
  },
  {
    names: ['valine'],
    abbreviations: ['V'],
    rdi: 26,
  },
];

// calculations are for 70kg individuals, 2000kcal per day
// difficult to find essential amino acid RDI values in relation to body weight and daily calories
// 70kg & 2000kcal derived from Valine values in https://tools.myfooddata.com/protein-calculator/ and the source of WHO EAA info
// https://en.wikipedia.org/wiki/Essential_amino_acid

const bodyWeight = 70; // kg
const energyRdi = 8368; // (2000 * 4.184), kJ

// mg/kg * kg/kJ / 1000 = g/kJ
for (const eaa of eaas) {
  eaa.rdi = (eaa.rdi * bodyWeight) / energyRdi / 1000; // g/kJ
}

// recommended protein min. 10% of daily energy
// 1g of protein is 4kcal or 17kJ
const protein = 1 / 10 / 17;

// // source: USDA & National Institute of Health
// const fiberPerKcal = 14 / 1000; // g/kcal
const fiber = 14 / (1000 * 4.184); // g/kJ

export const rdiValues = {
  eaas, // g/kJ
  fiber, // g/kJ
  protein, // g/kJ
};
