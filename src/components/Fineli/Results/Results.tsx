import { useContext, useEffect, useRef } from 'react';
import styles from './Results.module.scss';
import capitalize from '../../../functions/capitalize';
import { FineliContext } from '../../../context/FineliContext';

const Results = () => {
  const { state, dispatch } = useContext(FineliContext);
  const resultsRef = useRef<HTMLDivElement>(null);

  const resultsOnPage = state.results.slice(
    state.pageIndex * 100,
    (state.pageIndex + 1) * 100
  );

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current!.scrollTop = 0;
    }
  }, [state.pageIndex]);

  return (
    <div
      className={styles.results}
      style={state.selectedFood ? { display: 'none' } : {}}
      id='FineliResults'
      ref={resultsRef}
    >
      {resultsOnPage.map((food) => (
        <p
          key={food.id}
          onClick={() =>
            dispatch({
              type: 'SET_SELECTED_FOOD',
              payload: { selectedFood: food },
            })
          }
        >
          {capitalize(food[state.language])}
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
