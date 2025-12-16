import styles from './Food.module.scss';

import capitalize from '../../../util/capitalize';
import Bar from './Bar';
import CloseIcon from '../../../svg/CloseIcon';
import { useContext } from 'react';
import { FineliContext } from '../../../context/FineliContext';
import energyDensity from '../../../util/getEnergyDensity';
import getEnergyDistribution from '../../../util/getEnergyDistribution';
import Toggle from '../Search/Toggle';

const Food = () => {
  const { state, dispatch } = useContext(FineliContext);

  const { selectedFood } = state;

  if (!selectedFood) {
    return <></>;
  }

  const { energy } = selectedFood;

  const pctgs = getEnergyDistribution(selectedFood);

  const carbsTotalPctg =
    pctgs.starch + pctgs.sugar + pctgs.sugarAlcohol + pctgs.organicAcid;

  const url = `https://fineli.fi/fineli/${state.language}/elintarvikkeet/${selectedFood.id}`;

  return (
    <div
      className={styles.food}
      onClick={() =>
        dispatch({
          type: 'SET_SELECTED_FOOD',
          payload: { ...state, selectedFood: null },
        })
      }
    >
      <div className={styles.lang} onClick={(e) => e.stopPropagation()}>
        <Toggle type={'TOGGLE_LANGUAGE'} isOn={state.language === 'fi'} />
        <span>Finnish</span>
      </div>
      {state.selectedFood ? (
        <div className={styles.selectedFood}>
          <div className={styles.title}>
            <h2>
              {capitalize(selectedFood[state.language])}
              {selectedFood.scientific ? (
                <span>({capitalize(selectedFood.scientific)})</span>
              ) : (
                <></>
              )}
            </h2>
            <div className={`settingsIcon ${styles.settingsIcon}`}>
              <CloseIcon />
            </div>
          </div>
          <h5>
            Energy density: {energyDensity(energy)}%
            <span>
              ({Math.round(energy / 4.184)}
              kcal/100g)
            </span>
          </h5>
          <Bar
            percentage={energy / 37}
            fillStyle={{ backgroundColor: '#2c3539' }}
          />
          <h3>Energy distribution</h3>
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
          <h5>Alcohol: {pctgs.alcohol}%</h5>
          <Bar
            percentage={pctgs.alcohol}
            fillStyle={{ backgroundColor: '#ff9c46' }}
          />
        </div>
      ) : (
        <></>
      )}
      <a href={url} onClick={(e) => e.stopPropagation()}>
        {url}
      </a>
    </div>
  );
};

export default Food;
