import type { UsdaFood } from '../../types';
import { categories } from './categories';
import { rows, header } from './foods';

export default () => {
  const foodsList: UsdaFood[] = [];
  for (const row of rows) {
    const newFood: { [key: string]: number | string | undefined } = {};
    for (const index in header) {
      newFood[header[index] as string] = row[index];
    }

    // set category
    newFood.category = categories[newFood.categoryId!];
    delete newFood.categoryId;

    foodsList.push(newFood as UsdaFood);
  }

  console.log(foodsList);
  return foodsList;
};
