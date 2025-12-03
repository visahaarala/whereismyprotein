import { useContext } from 'react';
import styles from './Results.module.scss';
import { FineliContext } from '../context/FineliContext';
import capitalize from '../functions/capitalize';

const Results = () => {
  const ctx = useContext(FineliContext);
  const [foodsOnPage] = ctx.foodsOnPageState;
  const [lang] = ctx.languageState;

  return (
    <div className={styles.results}>
      {foodsOnPage.map((food) => (
        <p key={food.id}>
          {capitalize(food[lang])}
          {food.scientific ? <span>{capitalize(food.scientific)}</span> : <></>}
        </p>
      ))}
    </div>
  );
};

export default Results;
