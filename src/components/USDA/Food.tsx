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

  const { description, energy, protein, fiber, eaas, minEaaPctg } = selectedFood;

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
        <h5>
          Energy density: {energyDensity(energy)}%
          <span>
            ({Math.round(energy / 4.184)}
            kcal/100g)
          </span>
        </h5>

        <Bar
          percentage={energyDensity(energy)}
          // style={{ backgroundColor: 'var(--background-color-usda-tab)' }}
        />

        <h3>% of RDI</h3>

        <h5>{`Fiber: ${fiber}%`}</h5>
        <BarThousand
          pctg={fiber}
          // style={{ backgroundColor: 'var(--background-color-usda-tab)' }}
        />

        <h5>{`Protein: ${protein}%`}</h5>
        <BarThousand
          pctg={protein}
          // style={{ backgroundColor: 'var(--background-color-usda-tab)' }}
        />

        <h5>{`Essential amino acids, min: ${minEaaPctg}%`}</h5>
        {eaas.map((eaa) => {
          const name = eaa.names.map((n) => capitalize(n)).join(' & ');
          return (
            <BarThousand
              key={name}
              text={`${name}: ${eaa.pctgOfRdi}%`}
              pctg={eaa.pctgOfRdi}
              // style={{ backgroundColor: 'var(--background-color-usda-tab)' }}
            />
          );
        })}
      </div>
      <a
        href={`https://tools.myfooddata.com/protein-calculator/${selectedFood.id}/200cals/`}
        onClick={(e) => e.stopPropagation()}
      >
        tools.myfooddata.com/protein-calculator
      </a>
    </div>
  );
};

export default Food;
