import styles from './Limits.module.scss';
import RangeSlider from '../../Common/RangeSlider';
import { FineliContext } from '../../../context/FineliContext';
import { useContext } from 'react';

export const PERCENTAGE_MARGIN = 5;

const Limits = () => {
  const { state, dispatch } = useContext(FineliContext);

  return (
    <div className={styles.limits}>
      <RangeSlider
        name='energyDensity'
        margin={PERCENTAGE_MARGIN}
        value={state.energyDensity}
        setValue={(energyDensity) =>
          dispatch({ type: 'SET_LIMITS', payload: { energyDensity } })
        }
      />

      <h6>Energy distribution</h6>

      <RangeSlider
        name='fiber'
        margin={PERCENTAGE_MARGIN}
        value={state.fiber}
        setValue={(fiber) =>
          dispatch({ type: 'SET_LIMITS', payload: { fiber } })
        }
      />
      <RangeSlider
        name='protein'
        margin={PERCENTAGE_MARGIN}
        value={state.protein}
        setValue={(protein) =>
          dispatch({ type: 'SET_LIMITS', payload: { protein } })
        }
      />
      <RangeSlider
        name='sugar'
        margin={PERCENTAGE_MARGIN}
        value={state.sugar}
        setValue={(sugar) =>
          dispatch({ type: 'SET_LIMITS', payload: { sugar } })
        }
      />
      <RangeSlider
        name='fat'
        margin={PERCENTAGE_MARGIN}
        value={state.fat}
        setValue={(fat) => dispatch({ type: 'SET_LIMITS', payload: { fat } })}
      />
    </div>
  );
};

export default Limits;
