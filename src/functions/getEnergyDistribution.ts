import type { EnergyDistribution, FineliFood } from '../@types';

export default (food: FineliFood) => {
  const { fat, protein, sugar, starch, sugarAlcohol, organicAcid, fiber } =
    food;

  const kcal: EnergyDistribution = {
    fat: fat * 9,
    protein: protein * 4,
    fiber: fiber * 2,
    sugar: sugar * 4,
    starch: starch * 4,
    sugarAlcohol: sugarAlcohol ? sugarAlcohol * 2.4 : 0,
    organicAcid: organicAcid ? organicAcid * 3 : 0,
  };

  const keys = Object.keys(kcal) as [keyof EnergyDistribution];

  let totalKcal = 0;
  keys.forEach((key) => (totalKcal += kcal[key]));

  const partialPctgs: Partial<EnergyDistribution> = {};
  keys.forEach(
    (key) => (partialPctgs[key] = Math.round((kcal[key] / totalKcal) * 100))
  );
  
  return partialPctgs as EnergyDistribution;
};
