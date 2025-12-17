import styles from './Limits.module.scss';
import RangeSlider from '../Common/RangeSlider';
import { FineliContext } from '../../context/FineliContext';
import { useContext } from 'react';

const Limits = () => {
  const { state, dispatch } = useContext(FineliContext);

  return (
    <div className={styles.limits}>
      <h6>Energy density</h6>

      <RangeSlider
        value={state.energyDensity}
        setValue={(energyDensity) =>
          dispatch({ type: 'SET_LIMITS', payload: { energyDensity } })
        }
      />

      <h6>Energy distribution</h6>

      <RangeSlider
        name='Fiber'
        value={state.fiber}
        setValue={(fiber) =>
          dispatch({ type: 'SET_LIMITS', payload: { fiber } })
        }
      />
      <RangeSlider
        name='Protein'
        value={state.protein}
        setValue={(protein) =>
          dispatch({ type: 'SET_LIMITS', payload: { protein } })
        }
      />
      <RangeSlider
        name='Sugar'
        value={state.sugar}
        setValue={(sugar) =>
          dispatch({ type: 'SET_LIMITS', payload: { sugar } })
        }
      />
      <RangeSlider
        name='Fat'
        value={state.fat}
        setValue={(fat) => dispatch({ type: 'SET_LIMITS', payload: { fat } })}
      />
    </div>
  );
};

export default Limits;
