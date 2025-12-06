import { useContext, useEffect } from 'react';
import CloseIcon from '../svg/CloseIcon';
import styles from './Settings.module.scss';
import { FineliContext } from '../context/FineliContext';
import getFoods from '../data/fineli/getFoods';
import Slider from './Slider';
import Toggle from './Toggle';

const Settings = () => {
  const ctx = useContext(FineliContext);
  const setShowSettings = ctx.showSettingsState[1];
  const [onlyRaw] = ctx.onlyRawState;
  const [onlyScientific] = ctx.onlyScientificState;
  const [settingsResults, setSettingsResults] = ctx.settingsResultsState;
  const setSelectedFood = ctx.selectedFoodState[1];
  const setPageIndex = ctx.pageIndexState[1];

  useEffect(() => {
    setSettingsResults(
      getFoods()
        .filter((food) => !onlyRaw || food.raw)
        .filter((food) => !onlyScientific || food.scientific)
    );
    setSelectedFood(undefined);
    setPageIndex(0);
  }, [
    onlyRaw,
    onlyScientific,
    setSettingsResults,
    setSelectedFood,
    setPageIndex,
  ]);

  return (
    <div className={styles.settings}>
      <div className={styles.top}>
        <div>
          <h2>Settings</h2>
          <div
            className={styles.settingsIcon}
            onClick={() => setShowSettings(false)}
          >
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.property}>
          <span>Unprocessed or raw</span>
          <Toggle state={ctx.onlyRawState} />
        </div>
        <div className={styles.property}>
          <span>Has a scientific name</span>
          <Toggle state={ctx.onlyScientificState} />
        </div>
        {/* for THOUGHTS version, add some presets for health & weight loss */}
        {/* sliders for energy density, fat, protein, etc... */}
        <div className={styles.line} />
        <Slider />
        <Slider />
        <Slider />
        <div className={styles.line} />
        <div>{settingsResults.length} results</div>
      </div>
    </div>
  );
};

export default Settings;
