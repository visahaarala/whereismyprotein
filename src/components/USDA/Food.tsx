import styles from './Food.module.scss';

import capitalize from '../../util/capitalize';
import CloseIcon from '../../svg/CloseIcon';
import { useContext } from 'react';
import energyDensity from '../../util/getEnergyDensity';
import { UsdaContext } from '../../context/UsdaContext';
import Bar from '../Common/Bar';
import BarThousand from '../Common/BarThousand';

const Food = () => {
  const { state, dispatch } = useContext(UsdaContext);

  const { selectedFood } = state;

  if (!selectedFood) {
    return <></>;
  }

  const { description, energy, protein, fiber, eaas, minEaaPctg } =
    selectedFood;

  const kcal = energy / 4.184;

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
      <div className={styles.selectedFood}>
        <div className={styles.title}>
          <h2>{capitalize(description)}</h2>
          <div className={`settingsIcon ${styles.settingsIcon}`}>
            <CloseIcon />
          </div>
        </div>
        <h5>Energy density: {energyDensity(energy)}%</h5>
        <small>
          ({Math.round(kcal)}
          kcal/100g &rarr; {(2000 / kcal / 10).toFixed(2)} kg to 2000kcal)
        </small>

        <Bar percentage={energyDensity(energy)} />

        <h3>% of RDI</h3>

        <h5>{`Fiber: ${fiber}%`}</h5>
        <BarThousand />
        <BarThousand pctg={fiber} />

        <h5>{`Protein: ${protein}%`}</h5>
        <BarThousand />
        <BarThousand pctg={protein} />

        <h5>{`Essential amino acids, min: ${minEaaPctg}%`}</h5>
        <BarThousand />
        {eaas.map((eaa) => {
          const name = eaa.names.map((n) => capitalize(n)).join(' & ');
          return (
            <BarThousand
              key={name}
              text={`${name}: ${eaa.pctgOfRdi}%`}
              pctg={eaa.pctgOfRdi}
            />
          );
        })}
      </div>
      <a
        href={`https://tools.myfooddata.com/protein-calculator/${selectedFood.id}/200cals/`}
        onClick={(e) => e.stopPropagation()}
      >
        https://tools.myfooddata.com/protein-calculator/{selectedFood.id}
        /200cals/
      </a>
    </div>
  );
};

export default Food;
