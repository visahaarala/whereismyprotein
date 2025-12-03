import { useContext } from 'react';
import styles from './Results.module.scss';
import { FineliContext } from '../context/FineliContext';
import capitalize from '../functions/capitalize';

const Results = () => {
  const ctx = useContext(FineliContext);
  const [foodsOnPage] = ctx.foodsOnPageState;
  const [lang] = ctx.languageState;
  const [selectedFood, setSelectedFood] = ctx.selectedFoodState;

  return (
    <div
      className={styles.results}
      style={selectedFood ? { display: 'none' } : {}}
    >
      {foodsOnPage.map((food) => (
        <p key={food.id} onClick={() => setSelectedFood(food)}>
          {capitalize(food[lang])}
          {food.scientific ? (
            <span>({capitalize(food.scientific)})</span>
          ) : (
            <></>
          )}
        </p>
      ))}
    </div>
  );
};

export default Results;
