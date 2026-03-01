import styles from './Food.module.scss';

import capitalize from '../../util/capitalize';
import Bar from '../Common/Bar';
import CloseIcon from '../../svg/CloseIcon';
import { useContext } from 'react';
import { FineliContext } from '../../context/FineliContext';
import energyDensity from '../../util/getEnergyDensity';
import getEnergyDistribution from '../../util/getEnergyDistribution';
import Toggle from '../Common/Toggle';
import isMobile from '../../util/isMobile';

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

  const kcal = energy / 4.184;

  return (
    <div
      className={styles.food}
      onClick={() =>
        isMobile() &&
        dispatch({
          type: 'SET_SELECTED_FOOD',
          payload: { ...state, selectedFood: null },
        })
      }
    >
      <div className={styles.lang} onClick={(e) => e.stopPropagation()}>
        <Toggle
          name='Finnish'
          isOn={state.language === 'fi'}
          toggleIsOn={() => dispatch({ type: 'TOGGLE_LANGUAGE' })}
        />
      </div>
      {state.selectedFood ? (
        <div className={styles.selectedFood}>
          <div className={styles.title}>
            <h2>
              {capitalize(selectedFood[state.language])}
              {selectedFood.scientific ? (
                <>
                  <br />
                  <span>({capitalize(selectedFood.scientific)})</span>
                </>
              ) : (
                <></>
              )}
            </h2>
            {!isMobile() ? (
              <div
                className={`settingsIcon ${styles.settingsIcon}`}
                onClick={() =>
                  dispatch({
                    type: 'SET_SELECTED_FOOD',
                    payload: { ...state, selectedFood: null },
                  })
                }
              >
                <CloseIcon />
              </div>
            ) : (
              <></>
            )}
          </div>
          <h5>Energy density: {energyDensity(energy)}%</h5>
          <small>
            ({Math.round(kcal)}
            kcal/100g &rarr; {(2000 / kcal / 10).toFixed(2)} kg to 2000kcal)
          </small>
          <Bar percentage={energy / 37} />
          <h3>Energy distribution</h3>
          <h5>Fiber: {pctgs.fiber}%</h5>
          <Bar percentage={pctgs.fiber} />
          <h5>Fat: {pctgs.fat}%</h5>
          <Bar percentage={pctgs.fat} />
          <h5>Protein: {pctgs.protein}%</h5>
          <Bar percentage={pctgs.protein} />
          <h5>Carbohydrates: {carbsTotalPctg}%</h5>
          <Bar text={`Sugar: ${pctgs.sugar}%`} percentage={pctgs.sugar} />
          <Bar text={`Starch: ${pctgs.starch}%`} percentage={pctgs.starch} />
          <Bar
            text={`Organic acids: ${pctgs.organicAcid}%`}
            percentage={pctgs.organicAcid}
          />
          <Bar
            text={`Sugar alcolhols: ${pctgs.sugarAlcohol}%`}
            percentage={pctgs.sugarAlcohol}
          />
          <h5>Alcohol: {pctgs.alcohol}%</h5>
          <Bar percentage={pctgs.alcohol} />
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
