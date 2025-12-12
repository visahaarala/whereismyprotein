import { distributionKeys } from '../../../util/variables';
import styles from './Limits.module.scss';
import RangeSlider from './RangeSlider';

export const PERCENTAGE_MARGIN = 10;

const Limits = () => {
  return (
    <div className={styles.limits}>
      <RangeSlider
        name='energyDensity'
        margin={PERCENTAGE_MARGIN}
        dispatchType='SET_LIMITS'
      />
      <div className={styles.distributionTitle}>
        <span>Energy distribution</span>
        <button>reset</button>
      </div>
      {distributionKeys.map((key) => (
        <RangeSlider
          key={key}
          name={key}
          margin={PERCENTAGE_MARGIN}
          dispatchType='SET_LIMITS'
        />
      ))}
    </div>
  );
};

export default Limits;
