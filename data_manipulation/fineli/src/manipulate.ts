console.log('manipulating data..');

import { Food } from './@types/types';
import { loadCsv } from './helpers/functions';
import { writeFileSync } from 'fs';

//
// FOODS
//
{
  // food ID, name, PROCESS & IGCLASS
  const foodCsv = loadCsv('./csv-utf8/food.csv');
  // component values
  const compValueCsv = loadCsv('./csv-utf8/component_value.csv');
  // scientific names
  const txCsv = loadCsv('./csv-utf8/foodname_TX.csv');

  const foods: Food[] = [];
  let id: number | undefined = undefined;
  let food: Partial<Food> = {};
  compValueCsv.rows.forEach((row) => {
    const newId = Number(row[0]);
    if (newId !== id) {
      // CHECK IF OLD FOOD HAS ALL DATA & PUSH
      if (
        food.id !== undefined &&
        food.name !== undefined &&
        // food.igclass !== undefined &&
        // food.process !== undefined &&
        food.raw !== undefined && // NEW = käsittelemätön tai tuore
        food.energy !== undefined &&
        food.fiber !== undefined &&
        food.protein !== undefined &&
        food.fat !== undefined &&
        food.sugar !== undefined &&
        food.starch !== undefined
      ) {
        foods.push(food as Food);
      }

      // CREATE NEW FOOD OBJECT
      id = newId;
      food = { id };

      // ADD SCIENTIFIC NAME
      const txCsvRow = txCsv.rows.find((row) => row[0] === String(id));
      if (txCsvRow) {
        food.scientific = txCsvRow[1];
      }

      // ADD NAME, PROCESS & IGCLASS
      const foodCsvRow = foodCsv.rows.find((row) => row[0] === String(id));
      if (foodCsvRow) {
        food.name = foodCsvRow[1];
        // food.process = foodCsvRow[3];
        // food.igclass = foodCsvRow[5];
        food.raw = foodCsvRow[3] === 'RAW'; // NEW = käsittelemätön tai tuore
        food.igclassp = foodCsvRow[6];
      }
    }
    if (row[1] === 'ENERC') {
      food.energy = Number(row[2].replace(',', '.'));
    }
    if (row[1] === 'SUGAR') {
      food.sugar = Number(row[2].replace(',', '.'));
    }
    if (row[1] === 'FAT') {
      food.fat = Number(row[2].replace(',', '.'));
    }
    if (row[1] === 'PROT') {
      food.protein = Number(row[2].replace(',', '.'));
    }
    if (row[1] === 'STARCH') {
      food.starch = Number(row[2].replace(',', '.'));
    }
    if (row[1] === 'FIBC') {
      food.fiber = Number(row[2].replace(',', '.'));
    }
  });

  // // CONSOLE LOG TEST
  // const kjToKCal = 4.184;
  // console.log(
  //   data
  //     .filter((food) => food.scientific)
  //     .slice(-10)
  //     .map((food) => {
  //       return {
  //         food,
  //         carbsSum: Math.round(food.sugar + food.starch),
  //         kcal: Math.round(food.energy / kjToKCal),
  //         kcalSum: Math.round(
  //           food.sugar * 4 +
  //             food.starch * 4 +
  //             food.protein * 4 +
  //             food.fat * 9 +
  //             food.fiber * 2
  //         ),
  //       };
  //     })
  // );
  console.log('foods with required info:', foods.length);

  {
    // WRITE JSON FILE
    const header = Object.keys(foods.find((food) => food.scientific)!);
    const rows = foods.map((food) =>
      header.map((key) => food[key as keyof Food])
    );
    const json = `export const foods = { header: ${JSON.stringify(
      header
    )}, rows: ${JSON.stringify(rows)}};`;

    writeFileSync('./output/foods.ts', json);
    console.log('foods data written to ./output/foods.ts');
  }
}

//
// IGCLASS & PROCESS
//
import { foods } from './output/foods';
{
  const process: { [key: string]: string } = {};
  const processCsv = loadCsv('./csv-utf8/process_FI.csv');
  processCsv.rows.forEach((row) => (process[row[0]] = row[1]));

  const igClassCsv = loadCsv('./csv-utf8/igclass_FI.csv');
  const igclassAll: { [key: string]: string } = {};
  igClassCsv.rows.forEach((row) => (igclassAll[row[0]] = row[1]));

  const igclassp: { [key: string]: string } = {};
  const igclasspIndex = foods.header.indexOf('igclassp');
  foods.rows.forEach((row) => {
    const newIgclassp = String(row[igclasspIndex]);
    if (!Object.keys(igclassp).includes(newIgclassp)) {
      igclassp[newIgclassp] = igclassAll[newIgclassp];
    }
  });

  const igclass: { [key: string]: string } = {};
  for (const key of Object.keys(igclassAll)) {
    if (!Object.keys(igclassp).includes(key)) {
      igclass[key] = igclassAll[key];
    }
  }

  // const json =
  //   `export const igclassp: { [key: string]: string } = ${JSON.stringify(
  //     igclassp
  //   )};\n\n` +
  //   `export const igclass: { [key: string]: string } = ${JSON.stringify(
  //     igclass
  //   )};\n\n` +
  //   `export const process: { [key: string]: string } = ${JSON.stringify(
  //     process
  //   )};\n`;

  const json = `export const igclassp: { [key: string]: string } = ${JSON.stringify(
    igclassp
  )};`;
  //   `export const igclass: { [key: string]: string } = ${JSON.stringify(
  //     igclass
  //   )};\n\n` +
  //   `export const process: { [key: string]: string } = ${JSON.stringify(
  //     process
  //   )};\n`;

  writeFileSync('./output/categories.ts', json);
  console.log('igClasses and processes written to ./output/categories.ts');
}

/*
QUESTION TO FINELI:
eufdname .csv file includes essential amino acids. Is there a database available with that info?
*/
