import type { UsdaFood } from '../../types';
import { categories } from './categories';
import { rows, header } from './foods';
import { rdiValues } from './rdiValues';

export default () => {
  const foodsList: UsdaFood[] = [];
  for (const row of rows) {
    const food: Partial<UsdaFood> = {};

    food.id = row[header.indexOf('id')];

    food.description = row[header.indexOf('description')];

    food.raw = food.description.includes(', raw');

    food.category = categories[row[header.indexOf('categoryId')]];

    food.energy = Number(row[header.indexOf('energy')]); // kJ

    food.protein = Math.round(
      (Number(row[header.indexOf('protein')]) /
        food.energy /
        rdiValues.protein) *
        100
    ); // % of RDI

    food.fiber = Math.round(
      (Number(row[header.indexOf('fiber')]) / food.energy / rdiValues.fiber) *
        100
    ); // % of RDI

    food.eaas = rdiValues.eaas.map((eaaCombo) => {
      const { names, abbreviations, rdi } = eaaCombo;
      let grams = 0;
      for (const name of names) {
        grams += Number(row[header.indexOf(name)]);
      }
      const pctgOfRdi = Math.round((grams / food.energy! / rdi) * 100);

      if (!food.minEaaPctg || food.minEaaPctg > pctgOfRdi) {
        food.minEaaPctg = pctgOfRdi;
      }

      return { names, abbreviations, pctgOfRdi };
    });

    foodsList.push(food as UsdaFood);
  }
  return foodsList;
};
