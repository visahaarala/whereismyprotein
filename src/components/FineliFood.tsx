import styles from './FineliFood.module.scss';

import type { FineliFoodType, LanguageType } from '../@types/types';
import type { Dispatch, SetStateAction } from 'react';
import capitalize from '../functions/capitalize';

const FineliFood = ({
  food,
  lang,
  setSelectedFood,
}: {
  food: FineliFoodType | undefined;
  lang: LanguageType;
  setSelectedFood: Dispatch<SetStateAction<FineliFoodType | undefined>>;
}) => {
  if (!food) {
    return <></>;
  } else {
    return (
      <div className={styles.fineliFood}>
        <h2>{capitalize(food[lang])}</h2>
        <button onClick={() => setSelectedFood(undefined)}>close</button>
      </div>
    );
  }
};

export default FineliFood;
