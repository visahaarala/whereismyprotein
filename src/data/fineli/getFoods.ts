import type { FineliFoodType } from '../../@types/types';
import { foods } from './foods';

export default () => {
  const foodsList: FineliFoodType[] = [];
  for (const row of foods.rows) {
    const newFood: { [key: string]: number | string | boolean | null } = {};
    for (const index in foods.header) {
      newFood[foods.header[index] as string] = row[index];
    }
    foodsList.push(newFood as FineliFoodType);
  }
  return foodsList;
};
