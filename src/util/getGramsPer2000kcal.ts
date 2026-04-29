import type { FineliFood } from '../types';

export default (food: FineliFood) => {
  const kcal = food.energy / 4.184;
  return Math.floor(food.fiber * (2000 / kcal));
};
