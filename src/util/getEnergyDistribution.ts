import type { FineliEnergyDistribution, FineliFood } from '../types';

export default (food: FineliFood) => {
  const {
    fat,
    protein,
    sugar,
    starch,
    sugarAlcohol,
    organicAcid,
    alcohol,
    fiber,
  } = food;

  const kcal: FineliEnergyDistribution = {
    fat: fat * 9,
    protein: protein * 4,
    fiber: fiber * 2,
    sugar: sugar * 4,
    starch: starch * 4,
    sugarAlcohol: sugarAlcohol * 2.4,
    organicAcid: organicAcid * 3,
    alcohol: alcohol * 7,
  };

  const keys = Object.keys(kcal) as [keyof FineliEnergyDistribution];

  let totalKcal = 0;
  keys.forEach((key) => (totalKcal += kcal[key]));

  const partialPctgs: Partial<FineliEnergyDistribution> = {};
  keys.forEach((key) => {
    if (totalKcal === 0) {
      partialPctgs[key] = 0;
    } else {
      partialPctgs[key] = Math.round((kcal[key] / totalKcal) * 100);
    }
  });

  return partialPctgs as FineliEnergyDistribution;
};
