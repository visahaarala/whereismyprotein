import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import styles from './Limits.module.scss';
import { FineliContext } from '../../../context/OldFineliContext';
import type { FineliEnergy, MacroLimits } from '../../../@types';
import RangeSlider from './RangeSlider';

const PERCENTAGE_MARGIN = 10;

const Limits = () => {
  const ctx = useContext(FineliContext);
  const setMacroLimits = ctx.macroLimitsState[1];
  // const setEnergyLimit = ctx.energyLimitState[1];

  console.log('ctx.macroLimitsState', ctx.macroLimitsState);
  console.log('ctx.energyLimitState', ctx.energyLimitState);

  const [showDensity, setShowDensity] = useState(false);
  const [showDistribution, setShowDistribution] = useState(false);

  // energy density
  const energyDensityMinState = useState(0);
  const energyDensityMaxState = useState(100);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sliderStates: {
    [key in keyof FineliEnergy]: {
      minState: [number, Dispatch<SetStateAction<number>>];
      maxState: [number, Dispatch<SetStateAction<number>>];
    };
  } = {
    fiber: { minState: useState(0), maxState: useState(100) },
    fat: { minState: useState(0), maxState: useState(100) },
    protein: { minState: useState(0), maxState: useState(100) },
    sugar: { minState: useState(0), maxState: useState(100) },
    starch: { minState: useState(0), maxState: useState(100) },
    organic_acid: { minState: useState(0), maxState: useState(100) },
    sugar_alcohol: { minState: useState(0), maxState: useState(100) },
  };

  const [latestChangeKey, setLatestChangeKey] = useState<
    keyof FineliEnergy | undefined
  >();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (latestChangeKey) {
        const sliderKeys = Object.keys(sliderStates) as (keyof FineliEnergy)[];

        // MIN
        {
          let sumOfOthers = 0;
          sliderKeys.forEach((key) => {
            if (key !== latestChangeKey) {
              sumOfOthers += sliderStates[key].minState[0];
            }
          });
          const targetMaxSumOfOthers =
            100 - PERCENTAGE_MARGIN - sliderStates[latestChangeKey].minState[0];

          const multiplyOthersBy = targetMaxSumOfOthers / sumOfOthers;
          if (multiplyOthersBy < 1) {
            sliderKeys.forEach((key) => {
              if (key !== latestChangeKey) {
                const [min, setMin] = sliderStates[key].minState;
                setMin(min * multiplyOthersBy);
              }
            });
          }
        }

        // MAX
        {
          let sumOfOthers = 0;
          sliderKeys.forEach((key) => {
            if (key !== latestChangeKey) {
              sumOfOthers = sliderStates[key].maxState[0];
            }
          });
          sliderKeys.forEach((key) => {
            if (key !== latestChangeKey) {
              sumOfOthers += sliderStates[key].maxState[0];
            }
          });
          const targetMinSumOfOthers =
            100 + PERCENTAGE_MARGIN - sliderStates[latestChangeKey].maxState[0];
          const multiplyOthersBy = targetMinSumOfOthers / sumOfOthers;
          if (multiplyOthersBy > 1) {
            sliderKeys.forEach((key) => {
              if (key !== latestChangeKey) {
                const [max, setMax] = sliderStates[key].maxState;
                setMax(max * multiplyOthersBy);
              }
            });
          }
        }
        setLatestChangeKey(undefined);
      }
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [latestChangeKey, sliderStates]);

  useEffect(() => {
    // update context when sliders have updated, that is, when latestChangeKey is back to undefined
    if (latestChangeKey === undefined) {
      const macroLimits: Partial<MacroLimits> = {};
      (Object.keys(sliderStates) as (keyof FineliEnergy)[]).forEach((key) => {
        macroLimits[key] = {
          min: Math.round(sliderStates[key].minState[0]),
          max: Math.round(sliderStates[key].maxState[0]),
        };
      });
      console.log('updateContext', macroLimits);
      setMacroLimits(macroLimits as MacroLimits);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestChangeKey]);

  // useEffect(() => {
  //   setEnergyLimit({
  //     min: energyDensityMinState[0],
  //     max: energyDensityMaxState[0],
  //   });
  // }, [energyDensityMinState, energyDensityMaxState, setEnergyLimit]);

  const resetDensity = () => {
    energyDensityMinState[1](0);
    energyDensityMaxState[1](100);
  };

  const resetDistribution = () => {
    (Object.keys(sliderStates) as (keyof FineliEnergy)[]).forEach((key) => {
      sliderStates[key].minState[1](0);
      sliderStates[key].maxState[1](100);
    });
  };

  return (
    <div className={styles.limits}>
      <div>
        <div className={styles.header}>
          <span>Energy density</span>
          <button onClick={resetDensity}>reset</button>
          <div onClick={() => setShowDensity(!showDensity)}>
            {showDensity ? 'hide' : 'show'}
          </div>
        </div>
        {showDensity ? (
          <RangeSlider<{ energy_density: number }>
            key='energy_density'
            name='energy_density'
            margin={PERCENTAGE_MARGIN}
            minState={energyDensityMinState}
            maxState={energyDensityMaxState}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        <div className={styles.header}>
          <span>Energy distribution</span>
          <button onClick={resetDistribution}>reset</button>
          <div onClick={() => setShowDistribution(!showDistribution)}>
            {showDistribution ? 'hide' : 'show'}
          </div>
        </div>
        {showDistribution ? (
          (Object.keys(sliderStates) as (keyof FineliEnergy)[]).map((key) => (
            <RangeSlider<FineliEnergy>
              key={key}
              name={key}
              margin={PERCENTAGE_MARGIN}
              minState={sliderStates[key].minState}
              maxState={sliderStates[key].maxState}
              setLatestChangeKey={setLatestChangeKey}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Limits;
