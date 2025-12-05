import styles from './Food.module.scss';

import { useContext } from 'react';
import { FineliContext } from '../context/FineliContext';
import capitalize from '../functions/capitalize';
import type { FineliEnergy } from '../@types/types';
import Bar from './Bar';

const Food = () => {
  const ctx = useContext(FineliContext);
  const food = ctx.selectedFoodState[0];
  const [lang] = ctx.languageState;
  const setSelectedFood = ctx.selectedFoodState[1];

  if (!food) {
    return <></>;
  }

  const {
    energy,
    fat,
    protein,
    sugar,
    starch,
    sugarAlcohol,
    organicAcid,
    fiber,
  } = food;

  const kcal: FineliEnergy = {
    fat: fat * 9,
    protein: protein * 4,
    fiber: fiber * 2,
    sugar: sugar * 4,
    starch: starch * 4,
    sugarAlcohol: sugarAlcohol ? sugarAlcohol * 2.4 : 0,
    organicAcid: organicAcid ? organicAcid * 3 : 0,
  };

  const keys = Object.keys(kcal) as [keyof FineliEnergy];

  let totalKcal = 0;
  keys.forEach((key) => (totalKcal += kcal[key]));

  const partialPctgs: Partial<FineliEnergy> = {};
  keys.forEach(
    (key) => (partialPctgs[key] = Math.round((kcal[key] / totalKcal) * 100))
  );
  const pctgs = partialPctgs as FineliEnergy;

  const carbsTotalPctg =
    pctgs.starch + pctgs.sugar + pctgs.sugarAlcohol + pctgs.organicAcid;

  return (
    <div
      className={styles.food}
      style={food ? {} : { display: 'none' }}
      onClick={() => setSelectedFood(undefined)}
    >
      {food ? (
        <>
          <h3>{capitalize(food[lang])}</h3>
          <h5>
            Energy density: {Math.round(energy / 37)}% (
            {Math.round(energy / 4.184)}
            kcal/100g)
          </h5>
          <Bar
            percentage={energy / 37}
            fillStyle={{ backgroundColor: '#2c3539' }}
          />
          <div className='hr' />
          <h5>Fiber: {pctgs.fiber}%</h5>
          <Bar
            percentage={pctgs.fiber}
            fillStyle={{ backgroundColor: 'green' }}
          />
          <h5>Fat: {pctgs.fat}%</h5>
          <Bar
            percentage={pctgs.fat}
            fillStyle={{ backgroundColor: 'brown' }}
          />
          <h5>Protein: {pctgs.protein}%</h5>
          <Bar
            percentage={pctgs.protein}
            fillStyle={{ backgroundColor: 'purple' }}
          />
          <h5>Carbohydrates: {carbsTotalPctg}%</h5>
          <Bar
            name='Sugar'
            percentage={pctgs.sugar}
            fillStyle={{ backgroundColor: '#ff6347' }}
          />
          <Bar
            name='Starch'
            percentage={pctgs.starch}
            // fillStyle={{ backgroundColor: '#eaf516' }}
            fillStyle={{ backgroundColor: '#fdbd01' }}
          />
          <Bar
            name='Organic acids'
            percentage={pctgs.organicAcid}
            fillStyle={{ backgroundColor: '#a0d000' }}
          />
          <Bar
            name='Sugar alcolhols'
            percentage={pctgs.sugarAlcohol}
            fillStyle={{ backgroundColor: '#44b3d7' }}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Food;
