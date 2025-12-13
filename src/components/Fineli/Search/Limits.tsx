import styles from './Limits.module.scss';
import RangeSlider from './RangeSlider';

export const PERCENTAGE_MARGIN = 5;

const Limits = () => {

  return (
    <div className={styles.limits}>
      <RangeSlider
        name='energyDensity'
        margin={PERCENTAGE_MARGIN}
        dispatchType='SET_LIMITS'
      />

      <p>Energy distribution</p>

      <RangeSlider
        name='fiber'
        margin={PERCENTAGE_MARGIN}
        dispatchType='SET_LIMITS'
        // type='min'
      />
      <RangeSlider
        name='protein'
        margin={PERCENTAGE_MARGIN}
        dispatchType='SET_LIMITS'
        // type='min'
      />
      <RangeSlider
        name='sugar'
        margin={PERCENTAGE_MARGIN}
        dispatchType='SET_LIMITS'
        // type='max'
      />
      <RangeSlider
        name='fat'
        margin={PERCENTAGE_MARGIN}
        dispatchType='SET_LIMITS'
        // type='max'
      />
    </div>
  );
};

export default Limits;
