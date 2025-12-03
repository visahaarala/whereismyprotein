import styles from './Food.module.scss';

import { useContext } from 'react';
import { FineliContext } from '../context/FineliContext';
import capitalize from '../functions/capitalize';

const Food = () => {
  const ctx = useContext(FineliContext);
  const [selectedFood] = ctx.selectedFoodState;
  const [lang] = ctx.languageState;

  return (
    <div
      className={styles.food}
      style={selectedFood ? {} : { display: 'none' }}
    >
      {selectedFood ? (
        <>
          <h2>{capitalize(selectedFood[lang])}</h2>
          <p>energy density (kcal / 100g)</p>
          <p>fat</p>
          <p>protein</p>
          <p>etc..</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Food;
